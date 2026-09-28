/* ============================================================================
   BLUFOX OVERDRIVE — painted panoramic backdrops
   ----------------------------------------------------------------------------
   Each circuit has a hand-painted 2048×878 panorama (AI art, Sept 2026) in
   assets/sky-<name>.webp, horizon at the vertical centre. It is wrapped on a
   camera-locked cylinder 1500 m out — two mirrored copies around 360° — and
   drawn between the procedural sky dome and the world, fading into the dome at
   the zenith and into the fog colour below the horizon. One draw call.

   The same painting is also placed inside the circuit's PMREM room, so paint
   and chrome reflect the real skyline rather than a stand-in gradient.

   Everything here degrades: with no file, no network, or a slow link, the
   procedural dome shows through (the cylinder's alpha stays 0) and the game is
   exactly what it was before the paintings existed.
   ========================================================================== */
import * as T from './three.module.js';
import {lookFor,HASH,setEnvironmentExtra,invalidateEnvironment,circuitEnvironment} from './graphics-env.js';

const FILES=['afterglow','megastore','lakefront','frostbyte','canyon','galaxy'];
export const PANO=[
 {horizonV:.56, sunU:.5,sunV:.5,  bright:1.05,flare:0,  fog:0x2a2a6a,haze:.22},
 {horizonV:.62, sunU:.5,sunV:.1,  bright:1.00,flare:0,  fog:0x9aa2d6,haze:.18},
 {horizonV:.505,sunU:.5,sunV:.475,bright:1.08,flare:1,  fog:0xc9b08e,haze:.28},
 {horizonV:.5,  sunU:.5,sunV:.5,  bright:1.05,flare:0,  fog:0x7a8fd0,haze:.30},
 {horizonV:.5,  sunU:.5,sunV:.49, bright:1.05,flare:.9, fog:0xb86a3a,haze:.28},
 {horizonV:.5,  sunU:.5,sunV:.5,  bright:1.00,flare:0,  fog:0x2a2e80,haze:.16},
];
export function panoFor(index){return PANO[index|0]||PANO[0];}

const PANO_R=1500,PANO_ASPECT=2048/878;
/* two mirrored copies around 360°, squashed a little so more of the painting
   fits inside the chase camera's vertical field of view */
function panoHeight(){return (Math.PI*PANO_R/PANO_ASPECT)*.72;}

let base='';
export function setPanoramaBase(url){base=url;}

const cache=new Map();   // index -> {tex, ready, fns}
const loader=new T.TextureLoader();
function record(index){
 index|=0;
 if(cache.has(index))return cache.get(index);
 const rec={tex:null,ready:false,fns:[],failed:false};
 cache.set(index,rec);
 loader.load(base+'assets/sky-'+FILES[index]+'.webp',t=>{
  t.colorSpace=T.SRGBColorSpace;
  t.wrapS=T.MirroredRepeatWrapping;t.wrapT=T.ClampToEdgeWrapping;
  t.minFilter=T.LinearMipmapLinearFilter;t.magFilter=T.LinearFilter;
  t.generateMipmaps=true;t.anisotropy=4;t.needsUpdate=true;
  rec.tex=t;rec.ready=true;
  const fns=rec.fns;rec.fns=[];
  for(const f of fns){try{f(t);}catch(e){}}
 },undefined,()=>{rec.failed=true;rec.fns=[];});
 return rec;
}
export function panoramaOnReady(index,fn){const r=record(index);r.ready?fn(r.tex):r.fns.push(fn);}
export function panoramaReady(index){const r=cache.get(index|0);return !!(r&&r.ready);}
/* Start all six downloads (about 1.7 MB) — called from the boot screen. */
export function preloadPanoramas(){
 return Promise.all(FILES.map((_,i)=>new Promise(res=>{
  const r=record(i);
  if(r.ready||r.failed)return res();
  r.fns.push(()=>res());
  // a failed load resolves too, via a poll, so the boot never hangs on art
  const poll=()=>{if(r.failed||r.ready)res();else setTimeout(poll,250);};
  setTimeout(poll,250);
 })));
}

const VS=`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*viewMatrix*modelMatrix*vec4(position,1.);}`;
const FS=`varying vec2 vUv;
uniform sampler2D map;uniform float ready,bright,horizonV,haze,topFade,dither;uniform vec3 fogColor;
${HASH}
void main(){
 float hv=1.-horizonV;
 // remap so the painting's horizon lands on the cylinder's vertical centre
 float v=vUv.y<.5?mix(0.,hv,vUv.y*2.):mix(hv,1.,(vUv.y-.5)*2.);
 vec3 c=texture2D(map,vec2(vUv.x*2.,v)).rgb*bright;
 float a=ready;
 a*=1.-smoothstep(1.-topFade,1.,vUv.y);          // hand over to the dome at the zenith
 float below=smoothstep(.5,.30,vUv.y);             // 0 at horizon -> 1 well below
 float near=exp(-abs(vUv.y-.5)*22.);               // thin horizon haze
 c=mix(c,fogColor,clamp(below*.92+near*haze,0.,1.));
 c+=(hash12(gl_FragCoord.xy)-.5)*dither;
 gl_FragColor=vec4(max(c,0.),a);}`;

/* world-space unit directions (two mirrored copies) to the painted sun */
function sunDirs(index,rotY){
 const po=panoFor(index),su=po.sunU,sv=po.sunV,hz=po.horizonV,H=panoHeight();
 const y=sv<=hz?((hz-sv)/hz)*H*.5:-((sv-hz)/(1-hz))*H*.5;
 const out=[];
 for(const th of[su*Math.PI,2*Math.PI-su*Math.PI]){
  const x=PANO_R*Math.sin(th),z=PANO_R*Math.cos(th),c=Math.cos(rotY),s=Math.sin(rotY);
  out.push(new T.Vector3(x*c+z*s,y,-x*s+z*c).normalize());
 }
 return out;
}

export function makePanorama(index){
 const look=lookFor(index),po=panoFor(index);
 const geo=new T.CylinderGeometry(PANO_R,PANO_R,panoHeight(),72,1,true);
 const mat=new T.ShaderMaterial({side:T.BackSide,transparent:true,depthWrite:false,depthTest:true,fog:false,toneMapped:false,
  uniforms:{map:{value:null},ready:{value:0},bright:{value:po.bright},horizonV:{value:po.horizonV},
   haze:{value:po.haze},topFade:{value:.22},fogColor:{value:new T.Color(0)},dither:{value:1/255}},
  vertexShader:VS,fragmentShader:FS});
 const mesh=new T.Mesh(geo,mat);
 mesh.renderOrder=-19;mesh.frustumCulled=false;mesh.name='panorama';mesh.userData.circuit=index;
 // rotate so the painting's centre (its sun) faces the circuit's sun bearing
 const sd=look.sun.dir||look.sky.sun;
 mesh.rotation.y=Math.atan2(sd[0],sd[2])-Math.PI/2;
 mesh.userData.sunDirs=sunDirs(index,mesh.rotation.y);
 mesh.onBeforeRender=(r,scene,cam)=>{
  // camera-locked in XZ so there is no parallax swim; Y stays on the horizon
  mesh.position.x=cam.position.x;mesh.position.z=cam.position.z;
  if(scene.fog)mat.uniforms.fogColor.value.copy(scene.fog.color);
 };
 panoramaOnReady(index,t=>{mat.uniforms.map.value=t;mat.uniforms.ready.value=1;});
 return mesh;
}

/* Depth-tested sun glow: occluded per pixel by buildings and walls, blooms in
   post. Only circuits with a painted sun (flare > 0) get one. */
let sunTex=null;
export function makeSunSprite(index){
 const look=lookFor(index),po=panoFor(index);
 if(!po.flare)return null;
 if(!sunTex){
  const c=document.createElement('canvas');c.width=c.height=128;
  const x=c.getContext('2d'),g=x.createRadialGradient(64,64,0,64,64,64);
  g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.12,'rgba(255,255,255,.85)');
  g.addColorStop(.3,'rgba(255,255,255,.28)');g.addColorStop(.6,'rgba(255,255,255,.07)');g.addColorStop(1,'rgba(255,255,255,0)');
  x.fillStyle=g;x.fillRect(0,0,128,128);
  const h=x.createLinearGradient(0,64,128,64);
  h.addColorStop(0,'rgba(255,255,255,0)');h.addColorStop(.5,'rgba(255,255,255,.35)');h.addColorStop(1,'rgba(255,255,255,0)');
  x.fillStyle=h;x.fillRect(0,61,128,6);
  sunTex=new T.CanvasTexture(c);sunTex.colorSpace=T.SRGBColorSpace;
 }
 const m=new T.MeshBasicMaterial({map:sunTex,color:0xffffff,blending:T.AdditiveBlending,depthWrite:false,depthTest:true,
  transparent:true,toneMapped:false,fog:false,side:T.DoubleSide});
 m.color.setHex(look.sun.color).multiplyScalar(1.15*po.flare);
 const sp=new T.Mesh(new T.PlaneGeometry(1,1),m);
 sp.scale.set(260,260,1);sp.renderOrder=-18;sp.frustumCulled=false;sp.name='sunflare';
 return sp;
}

/* Per frame: put the glow on whichever mirrored sun copy is most in front of
   the camera, 1400 m out along that direction. */
const _fwd=new T.Vector3();
export function placeSunSprite(sprite,panorama,camera){
 if(!sprite||!panorama)return;
 const f=camera.getWorldDirection(_fwd);
 let best=null,bd=-2;
 for(const q of panorama.userData.sunDirs){const k=q.dot(f);if(k>bd){bd=k;best=q;}}
 sprite.visible=bd>.2;
 if(best){sprite.position.copy(camera.position).addScaledVector(best,1400);sprite.quaternion.copy(camera.quaternion);}
}

/* ---------------------------------------------------- painted reflections
   The painting goes inside the PMREM room as a 70 m cylinder with the same
   horizon remap, so glossy paint reflects the skyline. If the file arrives
   after the room was baked, the room is baked again and swapped in. */
const painted=new Set();
setEnvironmentExtra((scene,index)=>{
 const rec=cache.get(index|0);
 if(!rec||!rec.ready){painted.delete(index|0);return;}
 const po=panoFor(index),H=(Math.PI*70)/PANO_ASPECT,hv=1-po.horizonV;
 const g=new T.CylinderGeometry(70,70,H,48,1,true),uv=g.attributes.uv;
 for(let k=0;k<uv.count;k++){
  const u=uv.getX(k),v=uv.getY(k);
  uv.setXY(k,u*2,v<.5?hv*v*2:hv+(1-hv)*(v-.5)*2);
 }
 const m=new T.MeshBasicMaterial({map:rec.tex,side:T.BackSide,toneMapped:false,fog:false});
 const c=new T.Mesh(g,m);
 const look=lookFor(index),sd=look.sun.dir||look.sky.sun;
 c.rotation.y=Math.atan2(sd[0],sd[2])-Math.PI/2;c.renderOrder=0;
 scene.add(c);
 painted.add(index|0);
});
export function rebakeWhenPainted(renderer,scene,index){
 index|=0;
 panoramaOnReady(index,()=>{
  if(painted.has(index))return;
  try{
   invalidateEnvironment(index);
   const env=circuitEnvironment(renderer,index);
   if(scene&&scene.userData.circuit===index&&env&&env.texture)scene.environment=env.texture;
  }catch(e){}
 });
}
