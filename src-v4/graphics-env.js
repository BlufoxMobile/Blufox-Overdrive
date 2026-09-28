import * as T from './three.module.js';

/* ============================================================================
   BLUFOX OVERDRIVE — worlds, skies and image-based lighting
   ----------------------------------------------------------------------------
   This file owns everything that makes a circuit feel like a *place*: the sky
   gradient you see, the room its reflections come from, how deep the fog runs,
   the sun, and the colour grade. graphics.js owns the frame (render targets,
   antialiasing, bloom, tonemap) and imports from here.

   The important idea: the six circuits each get their own little HDR room —
   a sky dome plus emissive panels, bands, lamps and window columns — baked
   once through PMREMGenerator and cached. That bake is a load-time cost and
   never a per-frame one. Everything a MeshStandardMaterial does that reads as
   "expensive" (paint with a sheen, chrome that picks up the city, snow that
   takes colour from the sky) comes from that map.
   ========================================================================== */

/* ---------------------------------------------------------------- look table
   env.shapes entries are compact tuples, first element is the kind:
     ['card',  x,y,z, w,h,      r,g,b]        flat emissive panel aimed at origin
     ['ball',  x,y,z, radius,   r,g,b]        a lamp / the sun / a star
     ['band',  y, radius, height, r,g,b]      horizontal ring seen from inside
     ['cols',  count, radius, y, w,h, r,g,b, var]  ring of vertical strips
   Colours are LINEAR and freely exceed 1 — these are real HDR sources, and the
   >1 ones are what put a highlight on a curved surface instead of a flat wash.
   ========================================================================== */
export const LOOKS=[
{ // 0 · Chicago Afterglow — neon city, late night, wet-looking asphalt
  name:'Chicago Afterglow',
  sky:{top:0x050a24,mid:0x151c48,horizon:0x323a72,ground:0x222a58,haze:0x3a7fc0,hazeAmt:.20,
       sun:[-.50,.20,-.72],sunColor:0xffb27a,sunStrength:.10,stars:.30,neb:0,nebColor:0x000000,nebAxis:[0,1,0]},
  env:{intensity:1.62,shapes:[
       ['card',  0, 46,-14, 90,90,  .26,.34,.66],   // sky bowl overhead
       ['card',-30,  9, 10,  8,34,  .14,2.60,3.40], // cyan strip, driver's left
       ['card', 32,  7,-16,  7,28, 2.30, .50,3.20], // magenta strip, driver's right
       ['card',  0, 17,-48, 40,24,  .70, .88,1.30], // distant lit facade
       ['card', 22,  4, 27, 14, 8, 1.60,1.00, .52], // warm shopfront bounce
       ['cols', 18, 44, 14, 3.2,30, .30,.52,1.05, .85], // lit tower windows all round
       ['ball',-16,  3, 34, 1.1, 6.0,3.2,1.2],      // street lamp, warm
       ['ball', 20,  3,-36, 1.0, 1.2,4.0,6.0],      // street lamp, cool
       ['band',-2.5, 52, 5,  .10,.26,.46],          // dark street level, gives a horizon edge
       ['card',  0,-10,  0,140,140, .040,.055,.100]]}, // wet asphalt bounce
  fog:{tint:.94,density:.00185},
  sun:{color:0xc3d4ff,intensity:1.65,radius:22,dir:[-.50,.55,-.67]},
  hemi:{sky:0xa8bcff,ground:0x1b2348,intensity:.84},rim:{intensity:1.6},
  grade:{exposure:1.05,bloom:.34,threshold:.85,sat:1.10,
         lift:[.002,.006,.016],gain:[1.00,1.01,1.05],gamma:[1.00,1.00,.985],vig:.17}},

{ // 1 · Xfinity Megastore — a supersized showroom: dark ceiling, blazing light banks
  name:'Xfinity Megastore',
  sky:{top:0x5f5a86,mid:0x7d76a4,horizon:0xcfc9e4,ground:0x8d87b0,haze:0xfff0ff,hazeAmt:.10,
       sun:[-.50,.36,-.72],sunColor:0xffffff,sunStrength:.03,stars:0,neb:0,nebColor:0x000000,nebAxis:[0,1,0]},
  env:{intensity:1.25,shapes:[
       // A 3×3 grid of ceiling troffers instead of two big slabs: the gaps
       // between them are what make a glossy hood read as a showroom floor.
       ['card',-26, 30,-22, 16,16, 3.30,3.35,3.55],
       ['card',  0, 30,-22, 16,16, 3.30,3.35,3.55],
       ['card', 26, 30,-22, 16,16, 3.30,3.35,3.55],
       ['card',-26, 30,  0, 16,16, 3.00,3.05,3.25],
       ['card',  0, 31,  0, 16,16, 3.60,3.62,3.80],
       ['card', 26, 30,  0, 16,16, 3.00,3.05,3.25],
       ['card',-26, 30, 22, 16,16, 3.30,3.35,3.55],
       ['card',  0, 30, 22, 16,16, 3.30,3.35,3.55],
       ['card', 26, 30, 22, 16,16, 3.30,3.35,3.55],
       ['card',-42, 10,  0, 22,40,  .95, .42,2.15], // purple brand wall
       ['card', 42,  8,  0, 18,34,  .32,1.70,2.30], // cyan brand wall
       ['band', 16, 50, 9, .55,.56,.70],            // pale upper wall band
       ['card',  0,-11,  0,150,150, .30,.31,.37]]}, // pale polished floor
  fog:{tint:.97,density:.00150},
  sun:{color:0xfff7f0,intensity:2.45,radius:20,dir:[-.34,.88,-.34]},
  hemi:{sky:0xf1efff,ground:0x6a6087,intensity:1.05},rim:{intensity:1.2},
  grade:{exposure:1.00,bloom:.28,threshold:1.00,sat:1.07,
         lift:[.004,.004,.008],gain:[1.02,1.01,1.02],gamma:[1.00,1.00,.998],vig:.14}},

{ // 2 · Lakefront Rush — golden coastal afternoon over open water
  name:'Lakefront Rush',
  sky:{top:0x1650c4,mid:0x5fb0e8,horizon:0xd9e7e9,ground:0x9cc0d0,haze:0xffc276,hazeAmt:.18,
       sun:[-.50,.14,-.72],sunColor:0xffd49a,sunStrength:1.0,stars:0,neb:0,nebColor:0x000000,nebAxis:[0,1,0]},
  env:{intensity:1.12,shapes:[
       ['ball',-34, 10,-49, 4.2, 50.0,33.0,17.0],   // the sun — small and fierce, so it makes a highlight
       ['card',  0, 44,  0, 90,90,  .90,1.35,2.20], // blue sky bowl
       ['card', 34,  6, 40, 40,14,  .95, .92, .86], // hazy bright horizon behind
       ['card',-20, 22, 30, 22,10, 1.65,1.62,1.58], // cloud bank, sunward
       ['card', 26, 26,-30, 18, 8, 1.10,1.14,1.22], // cloud bank, opposite
       ['band',  1.2, 56, 3.2, .72,.80,.86],        // bright water horizon line
       ['card',  0,-10,  0,160,160, .17,.34,.44]]}, // lake bounce
  fog:{tint:.97,density:.00092},
  sun:{color:0xffeec2,intensity:3.25,radius:24,dir:[-.46,.40,-.79]},
  hemi:{sky:0xc6e6ff,ground:0x2c6f8a,intensity:.42},rim:{intensity:.8},
  grade:{exposure:.97,bloom:.22,threshold:1.15,sat:1.17,
         lift:[.008,.004,-.002],gain:[1.050,1.012,.962],gamma:[.988,1.00,1.018],vig:.15}},

{ // 3 · Frostbyte Summit — overcast alpine. Bright, but never a white-out: the
  //     dark ridgeline band is doing the work of separating snow from sky.
  name:'Frostbyte Summit',
  sky:{top:0x4d7aa6,mid:0x8fb6d6,horizon:0xd2e5f4,ground:0xa9c8de,haze:0xe6f3ff,hazeAmt:.14,
       sun:[-.42,.28,-.75],sunColor:0xfff4e0,sunStrength:.80,stars:0,neb:0,nebColor:0x000000,nebAxis:[0,1,0]},
  env:{intensity:.68,shapes:[
       ['card',  0, 46,  0,120,120, 1.30,1.46,1.76], // flat overcast dome
       ['ball',-30, 26,-40, 9.0, 7.60,7.30,6.60],    // sun burning through cloud
       ['band',  4, 54, 15, .085,.115,.175],         // ridgeline: a dark ring of rock
       ['band', 14, 54,  7, .40,.50,.66],            // pale cloud shelf above it
       ['card', 34, 12, 30, 26,12,  .30, .36, .50],  // shaded valley side
       ['card',  0,-10,  0,180,180, .46,.52,.60]]},  // snow bounce
  fog:{tint:.86,density:.00118},
  sun:{color:0xfff4e6,intensity:2.35,radius:24,dir:[-.42,.58,-.70]},
  hemi:{sky:0xd6ecff,ground:0xa9c6dd,intensity:.46},rim:{intensity:.7},
  grade:{exposure:.93,bloom:.20,threshold:1.20,sat:1.09,
         lift:[-.004,.000,.008],gain:[.988,1.005,1.048],gamma:[1.030,1.008,.982],vig:.18}},

{ // 4 · Signal Canyon — dusk desert, low hot sun against cooling rock
  name:'Signal Canyon',
  sky:{top:0x1b0d33,mid:0x4d2350,horizon:0x9e4c55,ground:0x53293a,haze:0xff8442,hazeAmt:.155,
       sun:[-.56,.075,-.72],sunColor:0xff8c40,sunStrength:.85,stars:.16,neb:0,nebColor:0x000000,nebAxis:[0,1,0]},
  env:{intensity:1.05,shapes:[
       ['ball',-38,  5,-49, 4.6, 30.0,11.0,3.4],    // low sun, right on the deck
       ['card',  0, 40,  0, 90,90,  .30, .22, .56], // deep violet zenith
       ['band',  6, 50, 14, .175,.075,.055],        // canyon wall ring
       ['card',-24, 14,-40, 30,16, 1.85, .78, .34], // sunlit rock face
       ['card', 40, 16, 34, 30,22,  .30, .34, .86], // cool opposite-sky fill
       ['ball', 30,  2, 24, .8, 3.0,.9,4.0],        // a lone relay light
       ['card',  0,-10,  0,150,150, .20,.085,.060]]}, // red rock bounce
  fog:{tint:.80,density:.00190},
  sun:{color:0xffc59c,intensity:2.30,radius:23,dir:[-.54,.30,-.79]},
  hemi:{sky:0xc9a8ce,ground:0x5d3030,intensity:.42},rim:{intensity:1.1},
  grade:{exposure:.92,bloom:.28,threshold:1.00,sat:1.06,
         lift:[.004,-.002,.006],gain:[1.015,.992,1.005],gamma:[.995,1.005,1.005],vig:.21}},

{ // 5 · Gigabit Galaxy — orbital, near-black with hard saturated key lights
  name:'Gigabit Galaxy',
  sky:{top:0x01020c,mid:0x050818,horizon:0x0c0f2c,ground:0x02030e,groundMix:.35,haze:0x4a2f9a,hazeAmt:.12,
       sun:[-.50,.20,-.72],sunColor:0x9fb6ff,sunStrength:.20,stars:1.0,neb:.34,nebColor:0x3a2a7a,nebAxis:[.42,.30,-.86]},
  env:{intensity:2.05,shapes:[
       ['card',-40, 11,-12, 12,36, 1.90, .62,3.40], // violet key
       ['card', 40,  7, 16, 10,30,  .34,2.60,3.30], // cyan key
       ['card',  0, 40,-28, 30,30, 1.90,2.00,2.55], // cold white top light
       ['cols',  9, 46, 6, 1.6,14, .90,.35,2.20, .9],// far station running lights
       ['ball',-12, 20, 40, 1.6, 3.0,3.4,5.0],      // a distant sun
       ['band',-4, 44, 3, .06,.20,.34],             // track glow ring
       ['card',  0,-11,  0,120,120, .075,.09,.24]]},
  fog:{tint:.95,density:.00105},
  sun:{color:0xcdd8ff,intensity:1.45,radius:21,dir:[-.48,.62,-.62]},
  hemi:{sky:0x8f9dff,ground:0x121a38,intensity:.68},rim:{intensity:1.8},
  grade:{exposure:1.04,bloom:.40,threshold:.78,sat:1.18,
         lift:[-.008,-.008,.000],gain:[1.00,1.00,1.06],gamma:[1.02,1.01,.985],vig:.20}}];

export const DEFAULT_GRADE=LOOKS[0].grade;
export function lookFor(index){return LOOKS[index|0]||LOOKS[0];}

/* -------------------------------------------------------------------- shaders */

// Cheap 1-tap value hash, used for gradient dithering. Banding in a dark sky is
// the single loudest "cheap render" tell; a ±0.5/255 dither erases it for free.
export const HASH=`float hash12(vec2 p){vec3 q=fract(vec3(p.xyx)*.1031);q+=dot(q,q.yzx+33.33);return fract((q.x+q.y)*q.z);}`;

const SKY_FRAG=`varying vec3 vDir;
uniform vec3 topColor,midColor,horizonColor,groundColor,hazeColor,sunColor,nebColor,sunDir,nebAxis;
uniform float hazeAmt,hazeLift,hazeSharp,sunStrength,stars,neb,dither;
${HASH}
float hash13(vec3 p){p=fract(p*.1031);p+=dot(p,p.yzx+33.33);return fract((p.x+p.y)*p.z);}
void main(){
 vec3 d=normalize(vDir);float h=d.y,up=max(0.,h);
 vec3 c=mix(horizonColor,midColor,smoothstep(0.,.17,up));
 c=mix(c,topColor,smoothstep(.06,.80,up));
 c=mix(c,groundColor,smoothstep(0.,-.13,h));
 c+=hazeColor*hazeAmt*exp(-abs(h-hazeLift)*hazeSharp);
 float a=max(0.,dot(d,sunDir));
 c+=sunColor*(pow(a,26.)*.26+pow(a,300.)*.60+pow(a,5000.)*3.2)*sunStrength;
 if(neb>0.){float b=exp(-pow(dot(d,nebAxis)*2.5,2.));c+=nebColor*b*neb;}
 if(stars>0.){
  vec3 s=d*74.,cell=floor(s);float r=hash13(cell+.5);
  if(r>.974){vec3 o=vec3(hash13(cell+1.7),hash13(cell+4.1),hash13(cell+7.3))-.5;
   float dist=length(fract(s)-.5-o*.55);
   c+=vec3(.86,.92,1.)*smoothstep(.22,0.,dist)*(r-.974)*26.*stars*smoothstep(-.05,.18,h);}}
 c+=(hash12(gl_FragCoord.xy)-.5)*dither;
 gl_FragColor=vec4(max(c,0.),1.);}`;

const SKY_VERT_INFINITE=`varying vec3 vDir;void main(){vDir=position;vec4 p=projectionMatrix*mat4(mat3(viewMatrix))*modelMatrix*vec4(position,1.);gl_Position=p.xyww;}`;
const SKY_VERT_SOLID=`varying vec3 vDir;void main(){vDir=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;

// The haze band peaks a couple of degrees ABOVE the horizon, so h=0 can stay
// dark enough for fog to match it while the sky still gets a glow that reads.
const HAZE_LIFT=.052,HAZE_SHARP=15.;

/* Linear colour the sky resolves to looking dead at the horizon. Fog is derived
   from it, which is what removes the hard band where ground meets sky. */
export function horizonColor(index){
 const s=lookFor(index).sky;
 return new T.Color(s.horizon).add(new T.Color(s.haze).multiplyScalar(s.hazeAmt*Math.exp(-HAZE_LIFT*HAZE_SHARP)));
}

export function skyMaterial(index,{infinite=true,dither=1/255}={}){
 const s=lookFor(index).sky;
 const below=new T.Color(s.ground).lerp(new T.Color(s.horizon),s.groundMix===undefined?.75:s.groundMix);
 return new T.ShaderMaterial({side:T.BackSide,depthWrite:false,depthTest:infinite,fog:false,toneMapped:false,
  uniforms:{topColor:{value:new T.Color(s.top)},midColor:{value:new T.Color(s.mid)},
   horizonColor:{value:new T.Color(s.horizon)},groundColor:{value:below},
   hazeColor:{value:new T.Color(s.haze)},hazeAmt:{value:s.hazeAmt},
   hazeLift:{value:HAZE_LIFT},hazeSharp:{value:HAZE_SHARP},
   sunColor:{value:new T.Color(s.sunColor)},sunDir:{value:new T.Vector3(...s.sun).normalize()},
   sunStrength:{value:s.sunStrength},stars:{value:s.stars},neb:{value:s.neb},
   nebColor:{value:new T.Color(s.nebColor)},nebAxis:{value:new T.Vector3(...s.nebAxis).normalize()},
   dither:{value:dither}},
  vertexShader:infinite?SKY_VERT_INFINITE:SKY_VERT_SOLID,fragmentShader:SKY_FRAG});
}

export function makeSkyDome(index){
 const sky=new T.Mesh(new T.SphereGeometry(1000,32,20),skyMaterial(index,{infinite:true,dither:1/255}));
 sky.renderOrder=-20;sky.frustumCulled=false;sky.userData.circuit=index;
 return sky;
}

/* -------------------------------------------------------- environment builder */
function emissive(r,g,b,side=T.DoubleSide){
 const m=new T.MeshBasicMaterial({side,toneMapped:false,fog:false});
 m.color.setRGB(r,g,b,T.LinearSRGBColorSpace);
 return m;
}
function seeded(seed){return()=>{seed|=0;seed=seed+0x6d2b79f5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}

/* Turn one shape tuple into meshes inside the little room. */
function addShape(scene,spec,rand){
 const kind=spec[0];
 if(kind==='card'){
  const[,x,y,z,w,h,r,g,b]=spec;
  const p=new T.Mesh(new T.PlaneGeometry(w,h),emissive(r,g,b));
  p.position.set(x,y,z);p.lookAt(0,0,0);scene.add(p);return;
 }
 if(kind==='ball'){
  const[,x,y,z,rad,r,g,b]=spec;
  const p=new T.Mesh(new T.SphereGeometry(rad,12,8),emissive(r,g,b,T.FrontSide));
  p.position.set(x,y,z);scene.add(p);return;
 }
 if(kind==='band'){
  const[,y,rad,hgt,r,g,b]=spec;
  const p=new T.Mesh(new T.CylinderGeometry(rad,rad,hgt,40,1,true),emissive(r,g,b,T.BackSide));
  p.position.y=y;scene.add(p);return;
 }
 if(kind==='cols'){
  // A ring of vertical strips — city windows, station running lights. The
  // brightness jitter is what stops a chrome surface reflecting a flat ribbon.
  const[,count,rad,y,w,h,r,g,b,vary]=spec;
  for(let i=0;i<count;i++){
   const a=(i/count)*Math.PI*2+rand()*.16;
   const k=1+(rand()-.35)*(vary===undefined?.8:vary)*2;
   const hh=h*(.55+rand()*.9);
   const p=new T.Mesh(new T.PlaneGeometry(w,hh),emissive(r*k,g*k,b*k));
   p.position.set(Math.cos(a)*rad,y+(rand()-.5)*h*.35,Math.sin(a)*rad);
   p.lookAt(0,p.position.y,0);scene.add(p);
  }
  return;
 }
}

/* PMREM bakes, cached per circuit. Load-time cost only — never per frame. */
const envCache=new Map();

/* panorama.js registers a hook here that drops the circuit's painted backdrop
   into the room before it is baked. Kept as a hook so this file never imports
   the painting code (which imports this file). */
let envExtra=null;
export function setEnvironmentExtra(fn){envExtra=fn;}
export function invalidateEnvironment(index){
 const key=index|0,t=envCache.get(key);
 if(t){envCache.delete(key);t.dispose?.();}
}

export function buildEnvironmentScene(index){
 const look=lookFor(index);
 const s=new T.Scene();
 const dome=new T.Mesh(new T.SphereGeometry(80,32,20),skyMaterial(index,{infinite:false,dither:0}));
 dome.renderOrder=-1;s.add(dome);
 const rand=seeded(1337+index*977);
 for(const spec of look.env.shapes)addShape(s,spec,rand);
 if(envExtra){try{envExtra(s,index);}catch(e){}}
 return s;
}

export function circuitEnvironment(renderer,index){
 const key=index|0;
 if(envCache.has(key))return envCache.get(key);
 const s=buildEnvironmentScene(key);
 const gen=new T.PMREMGenerator(renderer);
 gen.compileEquirectangularShader?.();
 const target=gen.fromScene(s,.035,.5,240);
 gen.dispose();
 s.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});
 envCache.set(key,target);
 return target;
}

export function hasEnvironment(index){return envCache.has(index|0);}

export function disposeEnvironments(){
 for(const t of envCache.values())t.dispose?.();
 envCache.clear();
}

/* Bake the six circuit rooms off the critical path, one per tick, so the first
   race never stalls on a PMREM and nothing has to bake mid-frame. */
export function prewarmEnvironments(renderer){
 let i=0;
 const step=()=>{
  while(i<LOOKS.length&&envCache.has(i))i++;
  if(i>=LOOKS.length)return;
  try{circuitEnvironment(renderer,i);}catch(e){}
  i++;setTimeout(step,0);
 };
 setTimeout(step,0);
}

/* A neutral room for menus, garage portraits and circuit thumbnails: a soft
   overhead key, a cool fill from behind, one warm kicker, a dark floor. */
let studioTarget=null;
export function studioRoom(renderer){
 if(studioTarget)return studioTarget;
 const s=new T.Scene();
 const dome=new T.Mesh(new T.SphereGeometry(60,32,20),new T.ShaderMaterial({side:T.BackSide,depthWrite:false,toneMapped:false,
  uniforms:{},vertexShader:SKY_VERT_SOLID,
  fragmentShader:`varying vec3 vDir;void main(){float h=normalize(vDir).y;
   vec3 c=mix(vec3(.055,.062,.085),vec3(.16,.19,.28),smoothstep(-.6,.5,h));
   c=mix(c,vec3(.30,.35,.48),smoothstep(.25,1.,h));gl_FragColor=vec4(c,1.);}`}));
 dome.renderOrder=-1;s.add(dome);
 const rand=seeded(99);
 for(const spec of [
  ['card',-14,11,  4, 16,16, 3.4,3.7,4.3],   // key, camera left
  ['card', 14, 6, -6, 11,20,  .95,1.05,2.3], // cool fill, camera right
  ['card',  0,20,  2, 34,10, 4.6,4.7,5.0],   // overhead softbox
  ['card',  0, 3, 20, 18,10,  .55,1.25,1.7], // rim from behind
  ['ball',-20, 4,-14, 1.4, 5.0,2.4,1.1],     // warm kicker
  ['card',  0,-9,  0, 70,70,  .17,.19,.24]]) addShape(s,spec,rand);
 const gen=new T.PMREMGenerator(renderer);
 studioTarget=gen.fromScene(s,.04,.5,200);
 gen.dispose();
 s.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});
 return studioTarget;
}
