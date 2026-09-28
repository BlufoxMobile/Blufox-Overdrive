import * as T from './three.module.js';
import {LOOKS,DEFAULT_GRADE,lookFor,HASH,horizonColor,makeSkyDome,
        circuitEnvironment,prewarmEnvironments,studioRoom,disposeEnvironments} from './graphics-env.js';
import {panoFor,rebakeWhenPainted} from './panorama.js';

/* ============================================================================
   BLUFOX OVERDRIVE — the frame
   ----------------------------------------------------------------------------
   Public API (engine.js depends on these and they do not change):
     trackRight, signedCurvature, RaceLook, makeSky, studioEnvironment, softShadow
   Added:
     applyCircuitLook, circuitEnvironment, prewarmEnvironments, horizonColor,
     setQuality, getQuality, QUALITY_TIERS, LOOKS

   The chain, in order, and nothing else:
     scene → MSAA HDR target → threshold blur (⅓ res, H then V)
           → composite: optional FXAA fetch, bloom add, exposure, ACES, sRGB,
             per-circuit lift/gain/gamma, saturation, vignette, dither → screen

   No motion blur, no radial speed warp, no chromatic aberration, no anamorphic
   streaks, no film grain. Version B drowned in those and Jeff called it Atari.
   ========================================================================== */

// The chase camera looks along the route, so its screen-right axis is forward × up.
export function trackRight(forward){return new T.Vector3(-forward.z,0,forward.x).normalize();}
export function signedCurvature(a,b,distance){let angle=Math.atan2(b.x,b.z)-Math.atan2(a.x,a.z);angle=((angle+Math.PI)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-Math.PI;return -angle/distance;}

export {LOOKS,horizonColor,circuitEnvironment,prewarmEnvironments,disposeEnvironments};

/* ------------------------------------------------------------------- quality
   Jeff's one-word review of the last build was "choppy", so every pass here has
   to be droppable. A tier is a budget, not a preference: the frame is measured
   and the tier walks down on its own if the device cannot hold the rate. It
   never walks back up — an oscillating renderer looks worse than a cheap one.

   msaa      samples on the offscreen HDR target (0 = none, FXAA takes over)
   bloomDiv  blur runs at 1/N of the target's resolution
   bloom     false skips the two blur passes and the bloom fetch entirely
             (nothing ships with it off — see the measured costs below)
   shadow    directional shadow-map size; 0 turns the whole shadow pass off and
             leaves the (much cheaper) contact blobs under the karts
   scale     render scale of the 3-D image; the composite upsamples to the canvas
   ========================================================================== */
/* Costs measured in the real game (SwiftShader, 844x390, track 0, see
   scratch/look-bench.py): scene render ~1180 ms, of which the directional
   shadow map is ~160 ms (13%); the two bloom blurs are 8 ms (0.7%); the
   composite is 27 ms (2.3%) and folding FXAA into it adds 8.6 ms (0.7%).
   So bloom survives every tier — dropping it would cost the neon identity of
   the whole game to save under one percent. What gets cut, in order, is
   shadow-map resolution, then MSAA, then the shadow pass, then pixels. */
export const QUALITY_TIERS={
 ultra :{msaa:4,bloomDiv:3,bloom:true,shadow:2048,scale:1   },
 high  :{msaa:4,bloomDiv:3,bloom:true,shadow:1024,scale:1   },
 medium:{msaa:2,bloomDiv:4,bloom:true,shadow:1024,scale:0.85},
 low   :{msaa:0,bloomDiv:4,bloom:true,shadow:0,   scale:0.72}};
const TIER_ORDER=['ultra','high','medium','low'];

function gpuName(renderer){
 try{
  const gl=renderer.getContext(),ext=gl.getExtension('WEBGL_debug_renderer_info');
  return ext?String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)||''):'';
 }catch(e){return '';}
}

/* Opening bid. Deliberately generous — the adaptive step below is the safety
   net, and starting a phone at "low" would throw away image quality on the many
   phones that can hold 60 at high. */
function detectTier(renderer){
 const caps=renderer.capabilities;
 if(!caps.isWebGL2)return 'low';
 const nav=typeof navigator!=='undefined'?navigator:{};
 const ua=nav.userAgent||'';
 const gpu=gpuName(renderer);
 const software=/SwiftShader|Software|llvmpipe|Microsoft Basic/i.test(gpu);
 const phone=/Android|iPhone|iPod|Mobile|iPad|Tablet/i.test(ua);
 const cores=nav.hardwareConcurrency||4;
 const mem=nav.deviceMemory||4;
 // A software renderer is a verification harness, not a player's phone. Keep it
 // on the shipping path so the screenshots we judge are the real image.
 if(software)return 'high';
 if(!phone)return 'ultra';
 // Phones. Apple's tile-based GPUs resolve MSAA inside tile memory, so 4×
 // is close to free there — and iOS Safari reports neither hardwareConcurrency
 // nor deviceMemory, so the core/memory test below would wrongly demote every
 // iPhone. Name them explicitly; the watchdog catches an older one.
 const ios=/iPhone|iPad|iPod/i.test(ua)||(/Macintosh/.test(ua)&&(nav.maxTouchPoints|0)>1);
 if(ios||/Apple/i.test(gpu))return 'high';
 if(cores<=4||mem<=3)return 'medium';
 return 'high';
}

let activeLook=null;
let lastApplied=null;   // {renderer,scene,index} so a tier change can re-apply

/* The circuit's key light. The engine parks the sun at a fixed offset from the
   player every frame, which used to mean the sky showed a sun low and ahead
   while the shading came from straight overhead — the two disagreeing is the
   loudest "this is a video game" tell there is. We re-aim it per circuit just
   before the frame is drawn, from the same direction the sky's sun is painted,
   lifted off the horizon enough that shadows stay a believable length. */
const keyLight={light:null,dir:new T.Vector3(0,1,0),dist:62};
const _sunPos=new T.Vector3();
function aimKeyLight(){
 const k=keyLight.light;
 if(!k||!k.parent||!k.target)return;
 _sunPos.copy(k.target.position).addScaledVector(keyLight.dir,keyLight.dist);
 if(!k.position.equals(_sunPos))k.position.copy(_sunPos);
}

export function getQuality(){return activeLook?activeLook.tier:null;}
export function setQuality(name){
 if(!activeLook||!QUALITY_TIERS[name])return false;
 activeLook.setTier(name,true);
 if(lastApplied)applyCircuitLook(lastApplied.renderer,lastApplied.scene,lastApplied.index);
 return true;
}

/* -------------------------------------------------------------------- shaders */
const VERT=`varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}`;

const BLUR_FRAG=`varying vec2 vUv;uniform sampler2D source;uniform vec2 stepSize;uniform float threshold;
 vec3 tap(vec2 p){vec3 c=texture2D(source,p).rgb;float m=max(c.r,max(c.g,c.b));return c*max(0.,m-threshold)/max(.001,m);}
 void main(){vec3 c=tap(vUv)*.227027;
  c+=(tap(vUv+stepSize*1.384615)+tap(vUv-stepSize*1.384615))*.316216;
  c+=(tap(vUv+stepSize*3.230769)+tap(vUv-stepSize*3.230769))*.070270;
  gl_FragColor=vec4(c,1.);}`;

/* Composite. FXAA is folded in here rather than run as its own full-screen pass:
   on a phone an extra full-resolution write+read costs more than the five taps
   do, and the edge test works perfectly well on a Reinhard-compressed luma of
   the HDR image. This is the fallback for contexts that cannot give us 4× MSAA
   on a render target — jagged edges were the number one reason the last build
   read as an old console, so the frame is never left raw. */
const COMBINE_FRAG=`varying vec2 vUv;
uniform sampler2D source;
#ifdef USE_BLOOM
uniform sampler2D bloom;uniform float bloomStrength;
#endif
uniform float boost,exposure,saturation,vignette;uniform vec3 lift,gain,gammaC;
uniform vec2 texel;
${HASH}
vec3 aces(vec3 x){return clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14),0.,1.);}
#ifdef USE_FXAA
// Perceptual luma of an HDR sample: compress first, or a bright sky reads as
// one flat value and every edge in it is missed.
float luma(vec3 c){float l=dot(c,vec3(.299,.587,.114));return l/(1.+l);}
vec3 resolve(){
 vec3 m=texture2D(source,vUv).rgb;
 float lM=luma(m),
  lNW=luma(texture2D(source,vUv+vec2(-1.,-1.)*texel).rgb),
  lNE=luma(texture2D(source,vUv+vec2( 1.,-1.)*texel).rgb),
  lSW=luma(texture2D(source,vUv+vec2(-1., 1.)*texel).rgb),
  lSE=luma(texture2D(source,vUv+vec2( 1., 1.)*texel).rgb);
 float lo=min(lM,min(min(lNW,lNE),min(lSW,lSE))),hi=max(lM,max(max(lNW,lNE),max(lSW,lSE)));
 if(hi-lo<max(.0125,hi*.10))return m;
 vec2 dir=vec2(-((lNW+lNE)-(lSW+lSE)),((lNW+lSW)-(lNE+lSE)));
 float red=max((lNW+lNE+lSW+lSE)*.03125,.0078125);
 dir=clamp(dir*(1./(min(abs(dir.x),abs(dir.y))+red)),-8.,8.)*texel;
 vec3 a=.5*(texture2D(source,vUv+dir*(1./3.-.5)).rgb+texture2D(source,vUv+dir*(2./3.-.5)).rgb);
 vec3 b=a*.5+.25*(texture2D(source,vUv-dir*.5).rgb+texture2D(source,vUv+dir*.5).rgb);
 float lB=luma(b);
 return (lB<lo||lB>hi)?a:b;}
#else
vec3 resolve(){return texture2D(source,vUv).rgb;}
#endif
void main(){
 vec2 radial=vUv-.5;
 vec3 c=resolve();
#ifdef USE_BLOOM
 c+=texture2D(bloom,vUv).rgb*bloomStrength;
#endif
 c=aces(c*exposure);
 c=pow(c,vec3(1./2.2));
 c=pow(clamp(c*gain+lift,0.,1.),gammaC);          // per-circuit lift/gain/gamma
 float l=dot(c,vec3(.2126,.7152,.0722));
 c=mix(vec3(l),c,saturation);
 float edge=smoothstep(.20,.74,length(radial));
 c*=1.-edge*vignette;
 c+=vec3(.015,.055,.065)*edge*boost;              // boost only: faint cool edge lift
 c+=(hash12(gl_FragCoord.xy)-.5)*(1./255.);       // kill 8-bit gradient banding
 gl_FragColor=vec4(clamp(c,0.,1.),1.);}`;

/* ------------------------------------------------------------------ RaceLook */
export class RaceLook{
 constructor(renderer){
  this.renderer=renderer;
  const caps=renderer.capabilities;
  this.maxSamples=caps.isWebGL2?(caps.maxSamples|0):0;
  this.hdr=caps.isWebGL2&&renderer.extensions.has('EXT_color_buffer_float');
  const opts={type:this.hdr?T.HalfFloatType:T.UnsignedByteType,
              minFilter:T.LinearFilter,magFilter:T.LinearFilter,
              depthBuffer:true,stencilBuffer:false};
  this.target=new T.WebGLRenderTarget(1,1,opts);
  this.blurA=new T.WebGLRenderTarget(1,1,{...opts,depthBuffer:false});
  this.blurB=this.blurA.clone();

  this.scene=new T.Scene();this.camera=new T.Camera();
  this.quad=new T.Mesh(new T.PlaneGeometry(2,2));this.quad.frustumCulled=false;this.scene.add(this.quad);

  this.blur=new T.ShaderMaterial({depthTest:false,depthWrite:false,
   uniforms:{source:{value:null},stepSize:{value:new T.Vector2()},threshold:{value:1}},
   vertexShader:VERT,fragmentShader:BLUR_FRAG});

  this.combine=new T.ShaderMaterial({depthTest:false,depthWrite:false,
   defines:{USE_BLOOM:'',USE_FXAA:''},
   uniforms:{source:{value:this.target.texture},bloom:{value:this.blurB.texture},
    boost:{value:0},exposure:{value:DEFAULT_GRADE.exposure},bloomStrength:{value:DEFAULT_GRADE.bloom},
    saturation:{value:DEFAULT_GRADE.sat},vignette:{value:DEFAULT_GRADE.vig},
    texel:{value:new T.Vector2()},
    lift:{value:new T.Vector3(...DEFAULT_GRADE.lift)},gain:{value:new T.Vector3(...DEFAULT_GRADE.gain)},
    gammaC:{value:new T.Vector3(...DEFAULT_GRADE.gamma)}},
   vertexShader:VERT,fragmentShader:COMBINE_FRAG});

  this.track=-1;this.grade=DEFAULT_GRADE;
  // Frame-time watchdog. Only real-hardware-shaped numbers count: a 700 ms
  // frame is a software renderer or a stalled tab, and dropping quality would
  // not help either of them.
  this.frameTimes=[];this.lastFrameStamp=0;this.tierCooldown=0;this.autoTier=true;
  this.prof=null;

  this.tier='high';this.setTier(detectTier(renderer),false);
  activeLook=this;
  if(typeof window!=='undefined')window.__blufoxLook=this;  // verification hook
  this.resize();
 }

 /* ------------------------------------------------------------- quality tier */
 setTier(name,manual){
  const t=QUALITY_TIERS[name];if(!t)return;
  this.tier=name;this.spec=t;
  if(manual)this.autoTier=false;
  // Ask for what the tier wants, take what the GPU will actually give.
  this.samples=Math.min(t.msaa,this.maxSamples);
  this.useFxaa=this.samples<4;
  const d=this.combine.defines;
  if((d.USE_BLOOM!==undefined)!==!!t.bloom||(d.USE_FXAA!==undefined)!==!!this.useFxaa){
   if(t.bloom)d.USE_BLOOM='';else delete d.USE_BLOOM;
   if(this.useFxaa)d.USE_FXAA='';else delete d.USE_FXAA;
   this.combine.needsUpdate=true;
  }
  this.resize();
 }

 dropTier(){
  const i=TIER_ORDER.indexOf(this.tier);
  if(i<0||i>=TIER_ORDER.length-1)return false;
  this.setTier(TIER_ORDER[i+1],false);
  if(lastApplied)applyCircuitLook(lastApplied.renderer,lastApplied.scene,lastApplied.index);
  return true;
 }

 /* Per-circuit grade. Safe to call every frame; it only writes uniforms. */
 setTrack(index){
  const g=lookFor(index).grade;if(!g)return;this.track=index;this.grade=g;
  const u=this.combine.uniforms;
  u.exposure.value=g.exposure;u.bloomStrength.value=g.bloom;u.saturation.value=g.sat;u.vignette.value=g.vig;
  u.lift.value.set(...g.lift);u.gain.value.set(...g.gain);u.gammaC.value.set(...g.gamma);
 }

 resize(){
  const size=this.renderer.getDrawingBufferSize(new T.Vector2());
  const scale=this.spec?this.spec.scale:1;
  const w=Math.max(1,Math.round(size.x*scale)),h=Math.max(1,Math.round(size.y*scale));
  this.target.setSize(w,h);
  this.target.samples=this.samples|0;
  this.combine.uniforms.texel.value.set(1/w,1/h);
  const div=this.spec?this.spec.bloomDiv:3;
  const bw=Math.max(1,Math.floor(w/div)),bh=Math.max(1,Math.floor(h/div));
  this.blurA.setSize(bw,bh);this.blurB.setSize(bw,bh);
 }

 /* ------------------------------------------------------------------ profiling
    beginProfile() makes every pass synchronous with gl.finish() so the numbers
    are real GPU time rather than queue time. It is a measurement mode, not a
    shipping one — it costs a stall per pass. */
 beginProfile(){this.prof={frames:0,scene:0,bloom:0,combine:0,total:0};}
 endProfile(){const p=this.prof;this.prof=null;return p;}
 profileReport(){
  const p=this.prof;if(!p||!p.frames)return null;
  const n=p.frames;
  return {tier:this.tier,samples:this.samples,fxaa:this.useFxaa,bloom:!!this.spec.bloom,
          frames:n,size:[this.target.width,this.target.height],
          scene:+(p.scene/n).toFixed(2),bloomPass:+(p.bloom/n).toFixed(2),
          combine:+(p.combine/n).toFixed(2),total:+(p.total/n).toFixed(2)};
 }

 /* ------------------------------------------------------------------- render */
 render(scene,camera,boost=0,bright=false){
  const r=this.renderer;
  this.lastScene=scene;this.lastCamera=camera;   // introspection for the bench harness
  aimKeyLight();
  if(scene.userData&&scene.userData.circuit!==undefined&&scene.userData.circuit!==this.track)this.setTrack(scene.userData.circuit);
  const g=this.grade||DEFAULT_GRADE;
  const spec=this.spec;
  const P=this.prof,gl=P?r.getContext():null;
  const now=()=>{if(gl)gl.finish();return (typeof performance!=='undefined'?performance:Date).now();};
  const t0=P?now():0;

  r.setRenderTarget(this.target);r.render(scene,camera);
  const t1=P?now():0;

  if(spec.bloom){
   this.quad.material=this.blur;
   const u=this.blur.uniforms;
   u.source.value=this.target.texture;
   u.stepSize.value.set(2/this.blurA.width,0);
   u.threshold.value=bright?Math.max(1.25,g.threshold):g.threshold;
   r.setRenderTarget(this.blurA);r.render(this.scene,this.camera);
   u.source.value=this.blurA.texture;
   u.stepSize.value.set(0,2/this.blurA.height);
   u.threshold.value=0;
   r.setRenderTarget(this.blurB);r.render(this.scene,this.camera);
  }
  const t2=P?now():0;

  this.quad.material=this.combine;
  const u=this.combine.uniforms;
  u.boost.value=boost;
  u.exposure.value=bright?Math.min(g.exposure,.95):g.exposure;
  u.bloomStrength.value=bright?Math.min(g.bloom,.22):g.bloom;
  r.setRenderTarget(null);r.render(this.scene,this.camera);
  const t3=P?now():0;

  if(P){P.frames++;P.scene+=t1-t0;P.bloom+=t2-t1;P.combine+=t3-t2;P.total+=t3-t0;}
  this.watchdog();
 }

 /* Rolling frame-period check. Two consecutive slow windows step the tier down
    once; then a cooldown, so a single hitch (a track load, a GC pause) can
    never cascade the whole renderer to "low". */
 watchdog(){
  if(!this.autoTier||this.prof)return;
  const t=(typeof performance!=='undefined'?performance:Date).now();
  const prev=this.lastFrameStamp;this.lastFrameStamp=t;
  if(!prev)return;
  const dt=t-prev;
  if(this.tierCooldown>0){this.tierCooldown--;return;}
  if(dt>200)return;                       // software renderer or stalled tab
  const f=this.frameTimes;f.push(dt);
  if(f.length<60)return;
  f.sort((a,b)=>a-b);
  const median=f[f.length>>1];
  this.frameTimes=[];
  if(median>26){                          // slower than ~38fps, sustained
   this.slowWindows=(this.slowWindows||0)+1;
   if(this.slowWindows>=2){this.slowWindows=0;this.tierCooldown=180;this.dropTier();}
  }else this.slowWindows=0;
 }

 dispose(){for(const t of[this.target,this.blurA,this.blurB])t.dispose();
  for(const m of[this.blur,this.combine])m.dispose();
  this.quad.geometry.dispose();if(activeLook===this)activeLook=null;}
}

/* ------------------------------------------------------------------- the sky
   makeSky() is called by the engine inside loadTrack(), but the lights and the
   scene it belongs to do not exist yet at that moment, so installing the rest
   of the circuit's look is deferred to the first time the dome is drawn — at
   which point onBeforeRender hands us both the renderer and the scene.        */
export function makeSky(index){
 const sky=makeSkyDome(index);
 sky.onBeforeRender=(renderer,scene)=>{
  if(sky.userData.applied===scene)return;
  sky.userData.applied=scene;
  applyCircuitLook(renderer,scene,index);
 };
 return sky;
}

/* A neutral room for menus, garage portraits and circuit thumbnails. Kept under
   the original name and signature so engine.js is untouched. */
export function studioEnvironment(renderer){
 if(renderer.shadowMap){renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;}
 const target=studioRoom(renderer);
 prewarmEnvironments(renderer);
 return target;
}

/* ------------------------------------------------------- per-circuit lighting
   Swaps in the circuit's environment map, retunes fog for depth, and refits the
   sun's shadow so its texels land on the road around the karts instead of being
   spread over sixty metres of empty ground. Written to survive a scene graph
   that is not exactly what we expect — everything is guarded.                  */
export function applyCircuitLook(renderer,scene,index){
 const look=lookFor(index);
 if(!look||!scene)return;
 scene.userData.circuit=index;
 lastApplied={renderer,scene,index};

 try{
  const env=circuitEnvironment(renderer,index);
  if(env&&env.texture){
   scene.environment=env.texture;
   // scene.environmentIntensity scales every MeshStandardMaterial's envMap in
   // one place, which is the whole point of doing IBL scene-wide.
   scene.environmentIntensity=look.env.intensity;
  }
 }catch(e){/* keep whatever environment was already set */}
 rebakeWhenPainted(renderer,scene,index);

 if(scene.fog){
  // Fog resolves to the sky's own horizon colour, scaled a little darker so
  // distant geometry still has a silhouette instead of dissolving into it.
  // With a painted backdrop the fog takes the painting's own horizon colour,
  // so the ground dissolves into the picture instead of into a gradient.
  const po=panoFor(index);
  if(po&&po.fog!==undefined)scene.fog.color.setHex(po.fog).multiplyScalar(look.fog.tint===undefined?.90:look.fog.tint);
  else scene.fog.color.copy(horizonColor(index)).multiplyScalar(look.fog.tint===undefined?.90:look.fog.tint);
  if(scene.fog.density!==undefined)scene.fog.density=look.fog.density;
 }

 const spec=activeLook?activeLook.spec:QUALITY_TIERS.high;
 const maxTex=renderer.capabilities?.maxTextureSize||2048;
 const shadowSize=Math.min(spec.shadow||0,maxTex);
 let rimDone=false;
 scene.traverse(o=>{
  if(o.isHemisphereLight){
   o.color.setHex(look.hemi.sky);o.intensity=look.hemi.intensity;
   // The bounce colour matters more than it sounds: it is what stops a dark
   // road crushing to black and what puts snow light back under the karts.
   if(look.hemi.ground!==undefined)o.groundColor.setHex(look.hemi.ground);
   return;}
  if(!o.isDirectionalLight)return;
  if(o.shadow&&o.shadow.camera&&(o.castShadow||o.userData.blufoxSun)){
   o.userData.blufoxSun=true;
   o.color.setHex(look.sun.color);o.intensity=look.sun.intensity;
   keyLight.light=o;
   // Sky sun if the look does not name a key direction, with the elevation
   // floored so a sunset does not throw hundred-metre shadows.
   const d=look.sun.dir||look.sky.sun;
   keyLight.dir.set(d[0],Math.max(d[1],.30),d[2]).normalize();
   if(!shadowSize){o.castShadow=false;}
   else{
    o.castShadow=true;
    const c=o.shadow.camera,rad=look.sun.radius;
    c.left=-rad;c.right=rad;c.top=rad;c.bottom=-rad;c.near=18;c.far=118;c.updateProjectionMatrix();
    if(o.shadow.mapSize.x!==shadowSize){
     o.shadow.mapSize.set(shadowSize,shadowSize);
     if(o.shadow.map){o.shadow.map.dispose();o.shadow.map=null;}
    }
    // Tight frustum ⇒ small texels ⇒ the old bias over-darkens; scale it down.
    // 1024 over a 44 m frustum is ~4 cm a texel: soft enough for PCF to feather,
    // fine enough that a kart still reads as a kart on the road.
    o.shadow.bias=-.00022;
    o.shadow.normalBias=.022;
   }
  }else if(!rimDone){rimDone=true;o.intensity=look.rim.intensity;}
 });

 if(activeLook)activeLook.setTrack(index);
}

/* -------------------------------------------------------------- contact shadow
   The soft blob under each kart. Cheap, always correct, and it carries the
   contact darkening that a shadow map can never sell on its own — it is also
   the only ground shadow left once the quality tier drops to "low".           */
export function softShadow(){
 const c=document.createElement('canvas');c.width=c.height=128;
 const x=c.getContext('2d');
 const g=x.createRadialGradient(64,64,1,64,64,63);
 for(let i=0;i<=20;i++){
  const t=i/20;
  // Dark and tight where the kart meets the road, gone well before the quad's
  // edge so there is never a visible disc.
  const a=Math.pow(Math.max(0,1-t),2.0)*.95*(1-Math.pow(t,5));
  g.addColorStop(t,`rgba(0,0,0,${a.toFixed(4)})`);
 }
 x.fillStyle=g;x.fillRect(0,0,128,128);
 const tex=new T.CanvasTexture(c);
 tex.minFilter=T.LinearMipmapLinearFilter;tex.magFilter=T.LinearFilter;
 tex.generateMipmaps=true;tex.wrapS=tex.wrapT=T.ClampToEdgeWrapping;
 return tex;
}

if(typeof window!=='undefined'){window.__blufoxGraphics={setQuality,getQuality,QUALITY_TIERS};}
