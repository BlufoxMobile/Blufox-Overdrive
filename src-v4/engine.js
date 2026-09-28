import * as T from './three.module.js';
import {TRACKS,mod} from './data.js';
import {RaceLook,makeSky,studioEnvironment,applyCircuitLook,
        setQuality,getQuality,QUALITY_TIERS} from './graphics.js';
import {makePanorama,makeSunSprite,placeSunSprite} from './panorama.js';
import {makeKart,updateKart,disposeKart,preloadKarts,kartsReady} from './actors.js';
import {buildTrack,METRICS} from './world.js';
import {loadModel} from './assets.js';
import {MODEM_POOL} from './simulation.js';

/* ============================================================================
   BLUFOX OVERDRIVE — the engine, which is now only glue.

   Everything this file used to build itself now comes from a module:
     graphics.js  the frame (MSAA/FXAA, bloom, ACES, per-circuit grade, tiers)
     world.js     the circuit — road, barriers, markings, gantry, scenery, AND
                  the single source of truth for where the wall is
     actors.js    the eight karts and their drivers
     feel.js      input, chase camera, corner cues, frame pacing (game.js wires)

   What is left here: the renderer, the scene, the race props (pickups, boost
   pads, traps, sparks), the per-frame push of simulation state onto meshes, and
   the two offline renders the menus want (driver portraits, circuit thumbnails).

   TONE MAPPING. RaceLook's composite ends in exposure -> ACES -> sRGB, so the
   renderer's own tonemap looks redundant — but graphics.js's per-circuit grades
   and world.js's materials were BOTH authored and screenshotted with
   ACESFilmicToneMapping + exposure 1.1 on the renderer (scratch/look-sheet.html,
   scratch/world-preview.html). Dropping it here made every circuit read one
   stop hot and washed the Megastore's floor out to white. Match the modules.

   BRIGHT CIRCUITS. look.render()'s fourth argument caps exposure and bloom for
   a daylight circuit. world.js's harness passes it for 1, 2 and 3; the old
   engine only passed 2 and 3, which is why the Megastore bloomed.
   ========================================================================== */

/* Daylight circuits: the composite caps exposure and bloom for these. */
const BRIGHT=new Set([1,2,3]);
/* Where each circuit photographs best for its menu card, and how far up the
   road the hero kart sits there. Signal Canyon is the one that needed its own
   numbers: at t=0.34 the road drops away under the kart, so it is pulled in and
   moved to a spot with the canyon wall behind it. */
const THUMB_T=[.30,.115,.55,.30,.285,.62];
const THUMB_KART=[10.5,10.5,10.5,10.5,9.2,10.5];
const KART_LIFT=.12;           // metres the kart body sits above the ribbon
const PARTICLES=120;
const FLASHES=16;              // pooled impact / shatter sprites
const TRAIL_N=9;               // samples in a modem's trail ribbon
const TRAIL_STEP=1.25;         // metres of travel between samples (~10 m trail)
const MODEM_LIFT=.5;           // metres the modem flies above the road
const MODEM_SCALE=1.7;         // in-flight scale of the 1.1 m model
const PICKUP_COOLDOWN=4;       // simulation.js: p.cooldown=4 on pickup

function disposeGroup(group){
 const geos=new Set(),mats=new Set(),textures=new Set();
 group.traverse(o=>{
  if(o.shadow&&o.shadow.map){o.shadow.map.dispose();o.shadow.map=null;}
  if(o.geometry)geos.add(o.geometry);
  if(o.material)for(const m of (Array.isArray(o.material)?o.material:[o.material])){
   mats.add(m);for(const key of ['map','emissiveMap','alphaMap'])if(m[key])textures.add(m[key]);
  }
 });
 geos.forEach(g=>g.dispose());mats.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());
}

export class Engine{
 constructor(canvas){
  this.renderer=new T.WebGLRenderer({canvas,antialias:true,alpha:false,
   powerPreference:'high-performance',stencil:false});
  this.renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));
  this.renderer.outputColorSpace=T.SRGBColorSpace;
  this.renderer.toneMapping=T.ACESFilmicToneMapping;
  this.renderer.toneMappingExposure=1.1;
  this.renderer.shadowMap.enabled=true;
  this.renderer.shadowMap.type=T.PCFSoftShadowMap;

  this.environmentTarget=studioEnvironment(this.renderer);
  this.look=new RaceLook(this.renderer);

  this.camera=new T.PerspectiveCamera(56,innerWidth/innerHeight,.2,2400);
  this.scene=new T.Scene();
  this.scene.environment=this.environmentTarget.texture;
  this.stage=new T.Group();
  this.scene.add(this.stage);

  this.racerMeshes=[];this.pickupMeshes=[];this.padMeshes=[];this.trapMeshes=[];
  this.halfWidths=new Array(8).fill(METRICS.kartHalfWidth);
  this.time=0;this.lastTrack=-1;this.trackWorld=null;this.frames=null;this.length=0;
  this.kartDetail=null;
  /* Track-independent effects live OUTSIDE the stage so loadTrack() never
     disposes them: the modem pool (whose meshes may share the loaded GLB's
     geometry), their trails, and the flash sprites. Built once. */
  this.fx=new T.Group();
  this.scene.add(this.fx);
  this.buildFx();
  /* The XB8 model. It may never arrive (no file, offline) and that is fine:
     every pool slot already carries the procedural stand-in, and refitModems()
     swaps the real thing in whenever it does. */
  this.xb8Master=null;
  loadModel('xb8').then(g=>{this.xb8Master=g;this.refitModems();}).catch(()=>{});
  this.resize();
  this._onResize=()=>this.resize();
  addEventListener('resize',this._onResize);
 }

 /* --------------------------------------------------------------- quality */
 get quality(){return getQuality()||'high';}
 /* Called by the settings screen. Re-tiers the frame, the karts and the world. */
 setQuality(name){
  if(!QUALITY_TIERS[name])return false;
  setQuality(name);
  const index=this.lastTrack;
  this.disposeKarts();
  if(index>=0){this.lastTrack=-1;this.loadTrack(index);}
  return true;
 }

 resize(){
  const w=Math.max(1,innerWidth),h=Math.max(1,innerHeight);
  this.renderer.setSize(w,h);
  this.camera.aspect=w/h;this.camera.updateProjectionMatrix();
  this.look&&this.look.resize();
 }

 /* ------------------------------------------------------- track geometry
    Delegated wholesale to world.js so the mesh and the collision boundary are
    the same numbers. `frame` and `curvature` keep their old signatures. */
 frame(t,lane=0,height=0){return this.trackWorld.sampleAt(t,lane,height);}
 curvature(t){return this.trackWorld.curvature(t);}
 laneLimit(t,side,half){return this.trackWorld.laneLimitAt(t,side,half);}

 disposeKarts(){
  for(const k of this.racerMeshes){if(k.parent)k.parent.remove(k);disposeKart(k);}
  this.racerMeshes=[];
 }

 loadTrack(index){
  if(this.lastTrack===index)return;
  this.lastTrack=index;

  this.disposeKarts();
  if(this.trackWorld){this.trackWorld.dispose();this.trackWorld=null;}
  this.scene.remove(this.stage);
  disposeGroup(this.stage);
  this.stage=new T.Group();
  this.scene.add(this.stage);
  this.pickupMeshes=[];this.padMeshes=[];this.trapMeshes=[];

  const track=TRACKS[index];this.track=track;
  const tier=this.quality;

  this.scene.background=null;                       // the dome covers the frame
  this.scene.fog=new T.FogExp2(track.fog,index===5?.0012:index===2?.0015:.0019);
  this.stage.add(makeSky(index));
  /* the painted skyline, over the dome and under everything else; its sun
     glow is depth-tested so the world occludes it */
  this.panorama=makePanorama(index);
  this.stage.add(this.panorama);
  this.sunSprite=makeSunSprite(index);
  if(this.sunSprite)this.stage.add(this.sunSprite);

  /* ---- the circuit ---- */
  const w=buildTrack(index,{quality:tier});
  this.trackWorld=w;
  this.stage.add(w.group);
  this.frames=w.frames;
  this.length=w.length;
  this.curve=w.curve;

  /* ---- lights. applyCircuitLook() retunes colour, intensity, the shadow
     frustum and the key direction per circuit, and re-aims the key light every
     frame from the same direction the sky paints its sun. ---- */
  const hemi=new T.HemisphereLight(0xc5d5ff,track.ground,2.25);
  this.stage.add(hemi);
  const sun=new T.DirectionalLight(0xffffff,2.1);
  sun.position.set(-30,50,25);
  sun.castShadow=true;
  sun.shadow.mapSize.set(1024,1024);
  this.sun=sun;
  this.stage.add(sun);this.stage.add(sun.target);
  const rim=new T.DirectionalLight(track.neon,1.7);
  rim.position.set(70,20,-80);
  this.stage.add(rim);

  applyCircuitLook(this.renderer,this.scene,index);

  /* ---- the cast ---- */
  const detail=tier==='low'?'low':'high';
  this.kartDetail=detail;
  /* makeKart() hands back the procedural kart at once and swaps the driver's
     GLB in underneath — synchronously when preloadKarts() has already run,
     otherwise when the file lands, at which point the kart is re-measured so
     the collision width matches the mesh on screen. */
  for(let i=0;i<8;i++){
   const kart=makeKart(i,{detail,onModel:k=>{if(this.racerMeshes[i]===k)this.halfWidths[i]=measureHalfWidth(k);}});
   kart.visible=false;
   this.racerMeshes.push(kart);
   this.stage.add(kart);
   this.halfWidths[i]=measureHalfWidth(kart);
  }

  this.buildProps(track);
  this.time=0;
 }

 /* Race props the world does not own: power-up cubes, boost strips, traps and
    the spark buffer. */
 buildProps(track){
  /* ---- item box ---------------------------------------------------------
     A Mario Kart item box is the most recognisable object in a kart game and
     the old one was a 1.65 m opaque purple die. This one is 2.2 m, half
     transparent so you see INTO it, glossy (low roughness, strong env map),
     with a bright core, a soft glow and a "?" sprite that always faces the
     camera. It tumbles slowly and hovers at nose height. On pickup it
     collapses and throws shards (sync()), then pops back in with a little
     overshoot when its cooldown ends.

     Draw order inside one box, back to front: glow sprite, core, the cube's
     faces, then the "?" (over the faces, so the glass never dims it), then
     the edges. renderOrder is the primary sort key
     for transparent objects, so this holds however the camera moves. The
     cube does not write depth, so the things inside it are never hidden by
     its own near faces. */
  const cubeGeo=new T.BoxGeometry(2.2,2.2,2.2);
  const cubeMat=new T.MeshStandardMaterial({color:0xc2a4ff,emissive:0x5a1fff,emissiveIntensity:.85,
   metalness:.1,roughness:.05,envMapIntensity:2,transparent:true,opacity:.46,depthWrite:false});
  const edgeMat=new T.LineBasicMaterial({color:0xfaf4ff});
  const coreGeo=new T.IcosahedronGeometry(.42,0);
  const coreMat=new T.MeshBasicMaterial({color:0xf0e4ff,transparent:true,opacity:.95,
   blending:T.AdditiveBlending,depthWrite:false});
  /* own textures, not the fx pool's: disposeGroup() takes the stage's
     textures with it on the next loadTrack() */
  const glowMat=new T.SpriteMaterial({map:radialTexture(),color:0x9a5cff,transparent:true,opacity:.6,
   blending:T.AdditiveBlending,depthWrite:false});
  const qMat=new T.SpriteMaterial({map:questionTexture(),transparent:true,depthWrite:false});
  const edgeGeo=new T.EdgesGeometry(cubeGeo);
  for(let i=0;i<15;i++){
   const g=new T.Group();
   const glow=new T.Sprite(glowMat);glow.scale.set(4.2,4.2,1);glow.renderOrder=1;g.add(glow);
   const core=new T.Mesh(coreGeo,coreMat);core.renderOrder=2;g.add(core);
   const cube=new T.Mesh(cubeGeo,cubeMat);cube.renderOrder=3;g.add(cube);
   const q=new T.Sprite(qMat);q.scale.set(1.9,1.9,1);q.renderOrder=4;g.add(q);
   const edges=new T.LineSegments(edgeGeo,edgeMat);edges.renderOrder=5;g.add(edges);
   g.userData.cube=cube;g.userData.edges=edges;g.userData.core=core;g.userData.q=q;
   g.userData.cd=0;g.userData.spawn=0;
   this.stage.add(g);this.pickupMeshes.push(g);
  }
  /* ---- boost strip ----------------------------------------------------
     The old one was a translucent neon slab with three flattened cones blended
     additively on top: under ACES + bloom that is a pale smear with a white
     core, and at 190 km/h it read as a puddle rather than a thing somebody put
     there on purpose.

     What a boost strip should read as is a piece of TRACK FURNITURE, so it is
     built as one now: a dark inset bed let into the road, a bright border of
     the circuit's own neon around it, and three chevrons running forward
     through it and fading out at each end.

     The bed and the border are OPAQUE. That is deliberate and it is the whole
     reason this reads cleanly: four coplanar translucent quads a centimetre
     apart sort unstably against each other, which is how the first attempt
     ended up drawing its neon backing plate on top of its own dark bed and
     bloomed the result to white. Opaque geometry is depth-sorted by the GPU and
     cannot get that wrong. Only the chevrons are transparent, and they are the
     only thing above the bed.

     Cost per strip: three flat unlit meshes plus three chevrons; six strips. */
  /* The panel is exactly the size of the trigger: simulation.js gives you the
     boost within 2.7 of the pad's lane and 3.5 m of its distance, so the bed is
     5.4 x 7.0 and what you can see is what you can hit. */
  const neon=new T.Color(track.neon);
  const bedMat=new T.MeshBasicMaterial({color:neon.clone().multiplyScalar(.13)});
  /* DoubleSide on the two rings only: they are hand-wound index buffers, and a
     flat decal that vanishes because its winding came out backwards is not a
     bug worth leaving available. */
  const frameMat=new T.MeshBasicMaterial({color:neon,side:T.DoubleSide});
  const innerMat=new T.MeshBasicMaterial({color:neon.clone().lerp(WHITE,.25),
   transparent:true,opacity:.42,depthWrite:false,side:T.DoubleSide});
  const chevMat=new T.MeshBasicMaterial({color:neon.clone().lerp(WHITE,.48),
   transparent:true,opacity:.92,depthWrite:false});
  const bedGeo=flatPlane(5.4,7.0);
  const frameGeo=flatBorder(5.86,7.46,.23);
  const innerGeo=flatBorder(5.06,6.66,.10);
  const chevGeo=chevronGeometry(1.8,1.62,.95);
  for(let i=0;i<6;i++){
   const g=new T.Group();
   const bed=new T.Mesh(bedGeo,bedMat);bed.position.y=.02;g.add(bed);
   const frame=new T.Mesh(frameGeo,frameMat);frame.position.y=.022;g.add(frame);
   const inner=new T.Mesh(innerGeo,innerMat);inner.position.y=.05;inner.renderOrder=2;g.add(inner);
   /* Three NESTED chevrons at fixed stations, not three scrolling through a
      wrap. Seen from a chase camera the strip is viewed almost end-on, so a
      thin chevron foreshortens into a squiggle; these are deep and thick enough
      to still read as arrows at 30 degrees, and being fixed they can be big
      enough to overlap without anything popping when it recycles. */
   const chevs=[];
   for(let j=0;j<3;j++){
    const a=new T.Mesh(chevGeo,chevMat);
    a.position.set(0,.052,-1.95+j*1.95);a.renderOrder=3;g.add(a);chevs.push(a);
   }
   g.userData.chevrons=chevs;
   this.stage.add(g);this.padMeshes.push(g);
  }
  /* ---- DEAD ZONE trap -----------------------------------------------------
     Was a thin pink torus lying on the road — invisible until you were on it.
     A hazard has to read from 50 m, so it is now a chunky ring, a dark disc
     with a spinning hazard cross, and a 5 m beacon of light rising off it.
     The beacon is additive with vertex colours that fade to black at the top,
     which is a free alpha gradient. Trigger radius in simulation.js is
     3 m along / 2.4 m across; the ring is 1.7 m so what you see is what you
     hit. */
  const ringGeo=new T.TorusGeometry(1.7,.27,8,26);
  const ringMat=new T.MeshStandardMaterial({color:0xff4fb0,emissive:0xff1e8e,emissiveIntensity:1.1,
   metalness:.2,roughness:.3});
  const discGeo=new T.CircleGeometry(1.55,26);discGeo.rotateX(-Math.PI/2);
  const discMat=new T.MeshBasicMaterial({color:0x4a0a33,transparent:true,opacity:.7,depthWrite:false});
  const barGeo=new T.BoxGeometry(2.7,.08,.34);
  const barMat=new T.MeshBasicMaterial({color:0xffb3e2,transparent:true,opacity:.95,
   blending:T.AdditiveBlending,depthWrite:false});
  const beamGeo=new T.CylinderGeometry(.1,.62,5.2,10,1,true);
  {const pos=beamGeo.attributes.position,col=new Float32Array(pos.count*3);
   for(let i=0;i<pos.count;i++){const k=Math.max(0,Math.min(1,(pos.getY(i)+2.6)/5.2));const f=(1-k)*(1-k);
    col[i*3]=1*f;col[i*3+1]=.32*f;col[i*3+2]=.72*f;}
   beamGeo.setAttribute('color',new T.BufferAttribute(col,3));}
  const beamMat=new T.MeshBasicMaterial({vertexColors:true,transparent:true,opacity:.75,
   blending:T.AdditiveBlending,depthWrite:false,side:T.DoubleSide});
  for(let i=0;i<20;i++){
   const g=new T.Group();
   const ring=new T.Mesh(ringGeo,ringMat);ring.rotation.x=Math.PI/2;ring.position.y=.3;g.add(ring);
   const disc=new T.Mesh(discGeo,discMat);disc.position.y=.06;g.add(disc);
   const cross=new T.Group();cross.position.y=.16;
   const b1=new T.Mesh(barGeo,barMat);b1.rotation.y=Math.PI/4;cross.add(b1);
   const b2=new T.Mesh(barGeo,barMat);b2.rotation.y=-Math.PI/4;cross.add(b2);
   g.add(cross);
   const beam=new T.Mesh(beamGeo,beamMat);beam.position.y=2.6;g.add(beam);
   g.userData.ring=ring;g.userData.cross=cross;g.userData.beam=beam;
   g.visible=false;
   this.stage.add(g);this.trapMeshes.push(g);
  }
  this.particleData=Array.from({length:PARTICLES},()=>({life:0,v:new T.Vector3()}));
  this.particlePositions=new Float32Array(PARTICLES*3);
  this.particleColors=new Float32Array(PARTICLES*3);
  this.particlePositions.fill(-9999);
  const pg=new T.BufferGeometry();
  pg.setAttribute('position',new T.BufferAttribute(this.particlePositions,3));
  pg.setAttribute('color',new T.BufferAttribute(this.particleColors,3));
  this.particles=new T.Points(pg,new T.PointsMaterial({size:.55,vertexColors:true,
   transparent:true,opacity:.92,depthWrite:false,sizeAttenuation:true}));
  this.particles.frustumCulled=false;
  this.stage.add(this.particles);
  this.particleCursor=0;
 }

 spark(pos,dir,right,color,count,speed){
  for(let n=0;n<count;n++){
   const idx=this.particleCursor++%PARTICLES,part=this.particleData[idx],a=idx*3;
   part.life=.25+Math.random()*.35;
   part.v.copy(dir).multiplyScalar(-speed).addScaledVector(right,(Math.random()-.5)*9);
   part.v.y=1+Math.random()*3;
   this.particlePositions.set([pos.x,pos.y,pos.z],a);
   this.particleColors.set([color.r,color.g,color.b],a);
  }
 }

 /* ---------------------------------------------------------------- effects
    Built once, in the constructor, outside the stage. */
 buildFx(){
  this.flashTex=radialTexture();

  /* impact / shatter flashes: camera-facing sprites, one material each so
     colour and fade are per slot */
  this.flashes=[];this.flashCursor=0;
  for(let i=0;i<FLASHES;i++){
   const s=new T.Sprite(new T.SpriteMaterial({map:this.flashTex,color:0xffffff,transparent:true,
    opacity:0,blending:T.AdditiveBlending,depthWrite:false}));
   s.visible=false;s.userData.life=0;s.userData.dur=.3;s.userData.size=3;
   this.fx.add(s);this.flashes.push(s);
  }

  /* the modem pool: MODEM_POOL slots, each a spinning body plus a trail
     ribbon whose vertices are rewritten in place every frame it is flying */
  this.modemGeo={
   capsule:new T.CapsuleGeometry(.19,.72,5,14),
   ring:new T.TorusGeometry(.225,.045,8,28),
   slot:new T.BoxGeometry(.16,.05,.05)
  };
  this.modemMat={
   shell:new T.MeshStandardMaterial({color:0xf4f6fb,metalness:.05,roughness:.32,envMapIntensity:1.2}),
   ring:new T.MeshBasicMaterial({color:0x7cf6ff}),
   glow:new T.SpriteMaterial({map:this.flashTex,color:0x2fd6ff,transparent:true,opacity:.9,
    blending:T.AdditiveBlending,depthWrite:false}),
   slot:new T.MeshBasicMaterial({color:0x101828}),
   trail:new T.MeshBasicMaterial({vertexColors:true,transparent:true,opacity:1,
    blending:T.AdditiveBlending,depthWrite:false,side:T.DoubleSide})
  };
  this.modemSlots=[];
  for(let i=0;i<MODEM_POOL;i++){
   const g=new T.Group();g.visible=false;
   /* 1.1 m is the real thing's height; in flight it is scaled up so it reads
      as a projectile from a chase camera at 190 km/h, and wears a cyan glow */
   const body=new T.Group();body.scale.setScalar(MODEM_SCALE);g.add(body);
   body.add(this.makeModemFallback());
   const glow=new T.Sprite(this.modemMat.glow);glow.scale.set(3.4,3.4,1);glow.position.y=.95;glow.renderOrder=7;g.add(glow);
   /* trail: TRAIL_N samples, two verts each, colours baked bright-to-black
      from head to tail so additive blending fades it for free */
   const geo=new T.BufferGeometry();
   const pos=new Float32Array(TRAIL_N*2*3);
   const col=new Float32Array(TRAIL_N*2*3);
   for(let s=0;s<TRAIL_N;s++){const f=1-s/(TRAIL_N-1),k=f*f;
    for(let v=0;v<2;v++){const a=(s*2+v)*3;col[a]=.36*k;col[a+1]=.94*k;col[a+2]=1*k;}}
   const idx=[];for(let s=0;s<TRAIL_N-1;s++){const a=s*2;idx.push(a,a+1,a+2, a+1,a+3,a+2);}
   geo.setIndex(idx);
   geo.setAttribute('position',new T.BufferAttribute(pos,3));
   geo.setAttribute('color',new T.BufferAttribute(col,3));
   const trail=new T.Mesh(geo,this.modemMat.trail);
   trail.frustumCulled=false;trail.visible=false;trail.renderOrder=6;
   this.fx.add(trail);
   this.fx.add(g);
   this.modemSlots.push({group:g,body:body,trail:trail,tpos:pos,
    hist:new Float32Array(TRAIL_N*3),histN:0,lastState:0,lastBounces:0,spin:Math.random()*6});
  }
 }

 /* The stand-in when the GLB is not there: a rounded white tower with a
    glowing cyan ring near the top and a dark status slot — 1.1 m, upright,
    standing on y=0 like the normalised asset. */
 makeModemFallback(){
  const g=new T.Group();
  const shell=new T.Mesh(this.modemGeo.capsule,this.modemMat.shell);
  shell.position.y=.55;shell.castShadow=true;g.add(shell);
  const ring=new T.Mesh(this.modemGeo.ring,this.modemMat.ring);
  ring.rotation.x=Math.PI/2;ring.position.y=.86;g.add(ring);
  const slot=new T.Mesh(this.modemGeo.slot,this.modemMat.slot);
  slot.position.set(0,.5,.2);g.add(slot);
  return g;
 }

 /* Swap the loaded model into every pool slot. Safe to call any time. */
 refitModems(){
  if(!this.xb8Master||!this.modemSlots)return;
  for(const m of this.modemSlots){
   while(m.body.children.length)m.body.remove(m.body.children[0]);
   m.body.add(this.xb8Master.clone(true));
  }
 }

 /* Feed the modem's current position into its trail. hist[0] is always the
    live head; the rest shift down one whenever the head has moved TRAIL_STEP
    from the previous sample, so the ribbon's length is in metres, not frames.
    The ribbon is then rebuilt in place: a flat strip tapering from .5 m at
    the head to nothing at the tail. */
 pushTrail(s,x,y,z){
  const h=s.hist;
  if(s.histN===0){for(let k=0;k<TRAIL_N;k++){h[k*3]=x;h[k*3+1]=y;h[k*3+2]=z;}s.histN=1;}
  else{
   const dx=x-h[3],dy=y-h[4],dz=z-h[5];
   if(dx*dx+dy*dy+dz*dz>=TRAIL_STEP*TRAIL_STEP)
    for(let k=TRAIL_N-1;k>=1;k--){h[k*3]=h[(k-1)*3];h[k*3+1]=h[(k-1)*3+1];h[k*3+2]=h[(k-1)*3+2];}
   h[0]=x;h[1]=y;h[2]=z;
  }
  const p=s.tpos;
  for(let k=0;k<TRAIL_N;k++){
   const a=Math.max(0,k-1)*3,b=Math.min(TRAIL_N-1,k+1)*3;
   let ddx=h[a]-h[b],ddz=h[a+2]-h[b+2];
   const n=Math.hypot(ddx,ddz)||1;ddx/=n;ddz/=n;
   const w=.95*(1-k/(TRAIL_N-1));
   const px=-ddz*w,pz=ddx*w,o=k*6;
   p[o]=h[k*3]+px;p[o+1]=h[k*3+1];p[o+2]=h[k*3+2]+pz;
   p[o+3]=h[k*3]-px;p[o+4]=h[k*3+1];p[o+5]=h[k*3+2]-pz;
  }
  s.trail.geometry.attributes.position.needsUpdate=true;
 }

 /* A camera-facing burst of light at `pos`, `size` metres across, fading
    over `dur` seconds. */
 flash(pos,size,dur,hex){
  const s=this.flashes[this.flashCursor++%FLASHES];
  s.position.copy(pos);s.visible=true;
  s.userData.life=dur;s.userData.dur=dur;s.userData.size=size;
  s.material.color.setHex(hex);s.material.opacity=1;
  s.scale.set(size*.4,size*.4,1);
 }

 /* ------------------------------------------------------------------ frame
    game.js positions the camera (feel.ChaseCamera) BEFORE calling this. */
 sync(race,dt){
  this.time+=dt;
  const p=race.player,len=this.length;

  for(const r of race.racers){
   const g=this.racerMeshes[r.id];
   if(!g)continue;
   g.visible=true;
   const f=this.frame(r.distance/len,r.lane,KART_LIFT);
   g.position.copy(f.p);
   const yaw=Math.atan2(f.dir.x,f.dir.z)+(r.drifting?-r.driftDir*.30:-(r.steer||0)*.14);
   g.rotation.set(-Math.asin(Math.max(-1,Math.min(1,f.dir.y))),yaw,0);
   if(r.stun>0)g.rotation.y+=Math.sin(r.stun*12)*.35;
   /* actors.js owns the kart's own animation: lean, squat, wheel spin, the
      driver looking into the corner, flame and shield. */
   const st=KART_STATE;
   st.speed=r.speed;st.speedN=r.speed/56;st.steer=r.steer||0;
   st.drift=r.drifting?Math.min(1,r.drift/3.2):0;st.driftDir=r.driftDir||0;
   st.boost=r.boost;st.airborne=false;
   updateKart(g,st,dt);
   g.userData.shield.visible=r.shield>0;
  }

  /* item boxes: tumble, hover, shatter on pickup, pop back on respawn */
  for(let i=0;i<race.pickups.length;i++){
   const pk=race.pickups[i],g=this.pickupMeshes[i];if(!g)continue;
   const u=g.userData,cd=pk.cooldown;
   const f=this.frame(pk.distance/len,pk.lane,1.75+Math.sin(this.time*2+i)*.22);
   g.position.copy(f.p);
   if(u.cd<=0&&cd>0){                       // just taken: shards and a flash
    SPARK_COLOR.setHex(0xc9a4ff);
    this.spark(f.p,f.dir,f.right,SPARK_COLOR,14,-3);
    this.flash(f.p,4.5,.32,0xd7bfff);
   }
   if(u.cd>0&&cd<=0)u.spawn=.55;            // just respawned: pop in
   u.cd=cd;
   let k=1;
   if(cd>0){const age=PICKUP_COOLDOWN-cd;if(age<.16)k=1-age/.16;else k=0;}
   else if(u.spawn>0){u.spawn-=dt;k=easeOutBack(1-Math.max(0,u.spawn)/.55);}
   g.visible=k>.02;
   if(!g.visible)continue;
   g.scale.set(k,k,k);
   g.rotation.set(.42,this.time*.9+i*1.3,.3);
   u.core.rotation.set(this.time*1.7,-this.time*2.1,0);
   const pulse=.88+.12*Math.sin(this.time*5+i);
   u.core.scale.set(pulse,pulse,pulse);
  }
  /* Boost strips: place the panel, then run the chevrons forward through it.
     They wrap, so each one is scaled to nothing at both ends of its travel —
     a chevron that simply teleported back to the start popped every 0.8s. */
  race.pads.forEach((pd,i)=>{
   const g=this.padMeshes[i];if(!g)return;
   const f=this.frame(pd.distance/len,pd.lane,.06);
   g.position.copy(f.p);g.rotation.y=Math.atan2(f.dir.x,f.dir.z);
   const chevs=g.userData.chevrons;
   if(!chevs)return;
   /* A pulse that runs back to front along the three, so the strip reads as
      something switched on and pushing rather than a painted decal. */
   for(let j=0;j<chevs.length;j++){
    const a=chevs[j];
    const p=.5+.5*Math.sin(this.time*4.2-j*1.15);
    const k=.84+p*.26;
    a.scale.set(k,1,k);
    a.position.z=-1.95+j*1.95+p*.22;
   }
  });
  for(let i=0;i<this.trapMeshes.length;i++){
   const g=this.trapMeshes[i],trap=race.traps[i];
   g.visible=!!trap;
   if(!trap)continue;
   const f=this.frame(trap.distance/len,trap.lane,0);
   g.position.copy(f.p);
   const u=g.userData;
   u.cross.rotation.y=this.time*2.2;
   const pulse=1+.07*Math.sin(this.time*7+i);
   u.ring.scale.set(pulse,pulse,1);
   /* the beacon breathes, and dies down over the trap's last two seconds */
   const fade=Math.min(1,trap.life/2);
   u.beam.scale.set(1,fade*(.9+.1*Math.sin(this.time*3+i)),1);
   u.beam.visible=fade>.05;
  }

  /* ---- XB8 modems: the pool mirrors race.modems slot for slot ---- */
  for(let i=0;i<this.modemSlots.length;i++){
   const s=this.modemSlots[i],m=race.modems[i];
   if(!m){s.group.visible=s.trail.visible=false;continue;}
   if(m.state===1){
    const f=this.frame(m.distance/len,m.lane,MODEM_LIFT);
    if(s.lastState!==1){                   // launched this frame: reset the trail
     s.histN=0;s.lastBounces=m.bounces;
     s.group.visible=s.trail.visible=true;
    }
    s.group.position.copy(f.p);
    s.group.position.y+=Math.sin(this.time*9+i)*.05;
    s.spin+=dt*2.6;
    s.body.rotation.y=s.spin;
    s.group.rotation.set(-Math.asin(Math.max(-1,Math.min(1,f.dir.y))),Math.atan2(f.dir.x,f.dir.z),m.lateralSpeed*-.02);
    if(m.bounces!==s.lastBounces){         // hit the rail: sparks off the barrier
     s.lastBounces=m.bounces;
     SPARK_COLOR.setHex(0x8df4ff);
     this.spark(f.p,f.dir,f.right,SPARK_COLOR,6,4);
     this.flash(f.p,1.6,.18,0xbdf6ff);
    }
    this.pushTrail(s,f.p.x,f.p.y-.12,f.p.z);
   }else{
    if(m.state===2&&s.lastState!==2){      // burst this frame
     const f=this.frame(m.distance/len,m.lane,MODEM_LIFT);
     SPARK_COLOR.setHex(m.impact?0xffffff:0x8df4ff);
     this.spark(f.p,f.dir,f.right,SPARK_COLOR,m.impact?22:8,m.impact?9:4);
     this.flash(f.p,m.impact?7.5:3,m.impact?.5:.24,m.impact?0x9fefff:0x8de9ff);
     if(m.impact)this.flash(f.p,3.2,.22,0xffffff);
    }
    s.group.visible=false;
    /* the trail lingers through the burst so the hit reads as "it got there" */
    s.trail.visible=m.state===2;
   }
   s.lastState=m.state;
  }

  /* ---- flashes ---- */
  for(let i=0;i<FLASHES;i++){
   const s=this.flashes[i];if(!s.visible)continue;
   const u=s.userData;u.life-=dt;
   if(u.life<=0){s.visible=false;continue;}
   const x=1-u.life/u.dur;                 // 0 -> 1 over its life
   const sz=u.size*(.4+.6*Math.sqrt(x));
   s.scale.set(sz,sz,1);
   s.material.opacity=1-x*x;
  }

  /* ---- sparks: drift smoke, and the barrier scrape world.js reports ---- */
  for(let j=0;j<PARTICLES;j++){
   const part=this.particleData[j];
   if(part.life>0){
    part.life-=dt;const a=j*3;
    this.particlePositions[a]+=part.v.x*dt;
    this.particlePositions[a+1]+=part.v.y*dt;
    this.particlePositions[a+2]+=part.v.z*dt;
    part.v.y-=8*dt;
    if(part.life<=0)this.particlePositions[a+1]=-9999;
   }
  }
  const t=mod(p.distance,len)/len;
  if(p.drifting&&p.drift>.25){
   const f=this.frame(t-1/len,p.lane,.3);
   SPARK_COLOR.setHex(p.drift>1.9?0xffa44f:0x66eaff);
   this.spark(f.p,f.dir,f.right,SPARK_COLOR,4,8);
  }
  if(p.wallScrape>.05&&this.trackWorld){
   const c=this.trackWorld.contactPoint(p);
   SPARK_COLOR.setHex(0xffd27a);
   this.spark(c.p,c.dir,c.right,SPARK_COLOR,Math.min(4,1+Math.round(p.wallScrape*3)),5);
  }
  this.particles.geometry.attributes.position.needsUpdate=true;
  this.particles.geometry.attributes.color.needsUpdate=true;

  /* The key light follows the player so the shadow frustum stays over the
     karts; graphics.js re-aims its position from the circuit's sun direction. */
  const here=this.frame(t,p.lane);
  this.sun.target.position.copy(here.p);
  this.sun.target.updateMatrixWorld();
  placeSunSprite(this.sunSprite,this.panorama,this.camera);

  this.look.render(this.scene,this.camera,p.boost>0?1:0,BRIGHT.has(this.lastTrack));
 }

 /* ------------------------------------------------------------- menu art */
 /* Eight driver portraits as data URLs, rendered right now with whatever kart
    is available. Boot calls this before the GLBs can have arrived, so when
    they have not, the models are loaded in the background and the portraits
    re-rendered. The returned array is then updated IN PLACE (game.js keeps a
    reference to it for the garage hero image), every <img> still showing an
    old portrait is swapped, `this.portraitsReady` resolves with the array and
    `this.onPortraits(list)` fires if game.js set one. */
 portraits(){
  const out=this.renderPortraits();
  this.portraits=out;
  if(kartsReady()){this.portraitsReady=Promise.resolve(out);return out;}
  this.portraitsReady=preloadKarts().then(()=>{
   const fresh=this.renderPortraits();
   if(typeof document!=='undefined')document.querySelectorAll('img').forEach(img=>{
    const i=out.indexOf(img.getAttribute('src'));if(i>=0)img.src=fresh[i];
   });
   out.splice(0,out.length,...fresh);
   if(this.onPortraits)this.onPortraits(out);
   return out;
  });
  return out;
 }

 renderPortraits(){
  const scene=new T.Scene();
  scene.environment=this.environmentTarget.texture;
  scene.add(new T.HemisphereLight(0xb9e9ff,0x232447,2.2));
  const light=new T.DirectionalLight(0xffffff,3.1);light.position.set(4,7,5);scene.add(light);
  const rim=new T.DirectionalLight(0x8774ff,2.2);rim.position.set(-5,3,-5);scene.add(rim);
  /* A touch closer than the procedural karts were framed: the GLBs carry a
     real face, and the portrait is where Jeff meets the cast. */
  const cam=new T.PerspectiveCamera(32,1.2,.1,100);
  cam.position.set(5.5,3.6,7.3);cam.lookAt(0,1.25,0);
  const ratio=this.renderer.getPixelRatio();
  const tone=this.renderer.toneMapping,exposure=this.renderer.toneMappingExposure;
  this.renderer.toneMapping=T.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.05;
  this.renderer.setPixelRatio(1);
  this.renderer.setSize(600,500,false);
  this.renderer.setClearColor(0x000000,0);
  const out=[];
  for(let i=0;i<8;i++){
   const kart=makeKart(i);
   scene.add(kart);
   this.renderer.render(scene,cam);
   out.push(this.renderer.domElement.toDataURL('image/png'));
   scene.remove(kart);disposeKart(kart);
  }
  this.renderer.setClearColor(0x000000,1);
  this.renderer.toneMapping=tone;this.renderer.toneMappingExposure=exposure;
  this.renderer.setPixelRatio(ratio);
  this.resize();
  return out;
 }

 thumbnail(index){
  this.loadTrack(index);
  const ratio=this.renderer.getPixelRatio(),fov=this.camera.fov;
  this.renderer.setPixelRatio(1);
  /* Rendered at the card's own 2.5:1 so object-fit:cover crops nothing and the
     kart stays where it was framed. */
  this.renderer.setSize(640,256,false);
  this.look.resize();
  this.camera.aspect=640/256;this.camera.fov=44;this.camera.updateProjectionMatrix();
  /* Framed like a race shot, not a road survey: the kart is the subject.
     The old framing put it 7.6 m from a camera aimed 18 m up the road, which is
     15 degrees below the view axis — 85% of the way down a 2.5:1 card, so every
     kart was half-cropped by the bottom edge and sitting under the circuit's own
     theme label. Signal Canyon, which drops away at t=0.34, lost it altogether.
     Closing the gap between the kart and the aim point (10.5 m vs 15 m) lifts it
     to about two thirds down, and putting it right of centre clears the theme
     label on the left and the route badge on the right. */
  const t=THUMB_T[index]!==undefined?THUMB_T[index]:.11;
  const kd=THUMB_KART[index]!==undefined?THUMB_KART[index]:10.5;
  const cam=this.frame(t,-.6,3.1),ahead=this.frame(t+15/this.length,0,1.55);
  this.camera.position.copy(cam.p);this.camera.lookAt(ahead.p);
  const kart=this.racerMeshes[0],f=this.frame(t+kd/this.length,1.6,KART_LIFT);
  kart.visible=true;
  kart.position.copy(f.p);
  kart.rotation.set(-Math.asin(Math.max(-1,Math.min(1,f.dir.y))),Math.atan2(f.dir.x,f.dir.z),0);
  this.sun.target.position.copy(f.p);this.sun.target.updateMatrixWorld();
  placeSunSprite(this.sunSprite,this.panorama,this.camera);
  this.look.render(this.scene,this.camera,0,BRIGHT.has(index));
  const src=this.renderer.domElement.toDataURL('image/webp',.82);
  kart.visible=false;
  this.renderer.setPixelRatio(ratio);
  this.camera.fov=fov;
  this.resize();
  return src;
 }

 /* A slow fly-round for the menus. */
 renderPreview(dt){
  if(!this.frames)return;
  this.time+=dt;
  const f=this.frame(mod(this.time*.009,1),0,34),a=this.frame(mod(this.time*.009+.03,1));
  this.camera.position.copy(f.p).addScaledVector(f.right,40);
  this.camera.lookAt(a.p);
  this.look.render(this.scene,this.camera,0,BRIGHT.has(this.lastTrack));
 }
}

const WHITE=new T.Color(0xffffff);

/* A plane lying flat in XZ, +Y up. PlaneGeometry is authored in XY, so this
   bakes the rotation into the buffer once instead of paying for a transform on
   every strip. */
function flatPlane(w,d){
 const g=new T.PlaneGeometry(w,d);
 g.rotateX(-Math.PI/2);
 return g;
}

/* A rectangular border lying flat in XZ: the outline of a w x d rectangle,
   `t` metres thick, drawn inwards from the outer edge. Eight vertices, eight
   triangles, and — unlike a big translucent quad behind the bed — it cannot
   cover anything it is not meant to cover. */
function flatBorder(w,d,t){
 const g=new T.BufferGeometry();
 const X=w/2,Z=d/2,x=X-t,z=Z-t;
 const p=new Float32Array([
  -X,0,-Z,  X,0,-Z,  X,0,Z,  -X,0,Z,      // outer ring, CW from back-left
  -x,0,-z,  x,0,-z,  x,0,z,  -x,0,z       // inner ring
 ]);
 g.setAttribute('position',new T.BufferAttribute(p,3));
 const n=new Float32Array(24);for(let i=1;i<24;i+=3)n[i]=1;
 g.setAttribute('normal',new T.BufferAttribute(n,3));
 const idx=[];
 for(let i=0;i<4;i++){
  const a=i,b=(i+1)%4,c=4+((i+1)%4),e=4+i;
  idx.push(a,c,b, a,e,c);
 }
 g.setIndex(idx);
 return g;
}

/* A chevron: a V-shaped band pointing down +Z, flat in XZ. Two quads, eight
   vertices. A cone with three segments (what this used to be) is a triangle,
   and a triangle on the road reads as a shard; a chevron reads as "forward".
   @param {number} w   half-width of the V
   @param {number} d   how far the point leads the tips
   @param {number} th  band thickness along Z */
function chevronGeometry(w,d,th){
 const g=new T.BufferGeometry();
 const p=new Float32Array([
  -w,0,0,   0,0,d,   0,0,d-th,  -w,0,-th,
   0,0,d,   w,0,0,   w,0,-th,    0,0,d-th
 ]);
 g.setAttribute('position',new T.BufferAttribute(p,3));
 const n=new Float32Array(24);for(let i=1;i<24;i+=3)n[i]=1;
 g.setAttribute('normal',new T.BufferAttribute(n,3));
 /* Wound so the faces point +Y. Getting this backwards is silent: the chevrons
    are simply back-face culled and the strip renders as an empty panel. */
 g.setIndex([0,1,2, 0,2,3, 4,5,6, 4,6,7]);
 return g;
}

/* Overshoot-and-settle, for the item box popping back in. */
function easeOutBack(x){const c=1.9;x=Math.max(0,Math.min(1,x));return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2);}

/* A soft radial glow: white core falling to transparent. Shared by every
   flash sprite and the item box's inner glow. */
function radialTexture(){
 const c=document.createElement('canvas');c.width=c.height=128;
 const g=c.getContext('2d');
 const grad=g.createRadialGradient(64,64,0,64,64,64);
 grad.addColorStop(0,'rgba(255,255,255,1)');
 grad.addColorStop(.28,'rgba(255,255,255,.85)');
 grad.addColorStop(.6,'rgba(255,255,255,.22)');
 grad.addColorStop(1,'rgba(255,255,255,0)');
 g.fillStyle=grad;g.fillRect(0,0,128,128);
 const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t;
}

/* The item box's "?": a fat white glyph with a violet glow, drawn once. */
function questionTexture(){
 const c=document.createElement('canvas');c.width=c.height=128;
 const g=c.getContext('2d');
 g.textAlign='center';g.textBaseline='middle';
 g.font='900 104px "Arial Black", Arial, Helvetica, sans-serif';
 g.shadowColor='rgba(170,90,255,.95)';g.shadowBlur=18;
 g.lineWidth=10;g.strokeStyle='#4a17b8';g.strokeText('?',64,70);
 g.shadowBlur=0;
 g.fillStyle='#ffffff';g.fillText('?',64,70);
 const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t;
}

/* Reused every frame: updateKart() only reads the fields. */
const KART_STATE={speed:0,speedN:0,steer:0,drift:0,driftDir:0,boost:0,airborne:false};
const SPARK_COLOR=new T.Color();

/* The kart's solid half-width, for world.laneLimitAt(). Only meshes that cast
   a shadow are solid bodywork — the contact-shadow quad, the shield bubble and
   the flame are all much wider and all transparent, so a plain
   Box3.setFromObject() (which ignores `visible`) would report Onyx at 2.05 m. */
const _box=new T.Box3(),_tmp=new T.Box3();
function measureHalfWidth(kart){
 kart.updateWorldMatrix(true,true);
 _box.makeEmpty();
 kart.traverse(o=>{
  if(!o.isMesh||!o.castShadow||!o.geometry)return;
  if(!o.geometry.boundingBox)o.geometry.computeBoundingBox();
  _tmp.copy(o.geometry.boundingBox).applyMatrix4(o.matrixWorld);
  _box.union(_tmp);
 });
 if(_box.isEmpty())return METRICS.kartHalfWidth;
 return Math.max(-_box.min.x,_box.max.x);
}

export {measureHalfWidth};
export default Engine;
