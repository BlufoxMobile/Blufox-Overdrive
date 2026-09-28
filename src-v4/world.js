import * as T from './three.module.js';
import {TRACKS,trackPoint,mod} from './data.js';
import {dressCircuit,LOW_DETAIL_SCALE} from './world-props.js';

/* ============================================================================
   BLUFOX OVERDRIVE — the world, and the single source of truth for the walls
   ----------------------------------------------------------------------------
   Jeff: "you could drive through walls and barriers."

   He was right, and the reason was arithmetic. The old build drew the guardrail
   from one set of numbers and clamped the kart with another:

       engine.js  trackDetails()  rail panels at lane |13.5|, 0.25 thick
                                  -> inner face |13.375|
                  trackDetails()  solid outer wall skirt at |13.9|
                  dashes()        bollards at |13.2| (60 per side, gaps between)
       simulation.js line 28      if(Math.abs(r.lane)>11.4) ... clamp

   With a kart 2.7 m across, the painted boundary and the collision boundary
   never touched. Worse, the rail panels were an InstancedMesh with each panel
   0.74 of its slot, so 26% of the lap had a literal hole in the fence.

   Here there is ONE number. `barrierFaceAt(t, side)` returns the lateral
   offset of the inner face of the guardrail. The mesh is swept along exactly
   that function, and `laneLimitAt(t, side)` is that same function minus the
   kart's half-width. They cannot drift apart, because there is nothing to
   drift: change the function and both the wall you see and the wall you hit
   move together. scratch/world-collision-test.mjs samples the baked vertex
   buffer all the way round and proves it.

   Everything in this module is authored once at loadTrack() time and merged by
   material. Jeff's other verdict was "choppy", so the budget is the design:
   a circuit is a handful of draw calls, not a scene graph.
   ========================================================================== */

/* ------------------------------------------------------------------ metrics */
/* LANE_LIMIT is the anchor and it is deliberately the old 11.4. Jeff loves how
   this thing drives; the fix is to move the fence to the kart, not the kart to
   the fence. Everything else in the cross-section is derived from it. */
/* The eight karts in actors.js are not the same width — measured solid
   half-widths run 1.296 (Pixel) to 1.698 (Onyx). One constant would either
   let the heavyweight's wheels sink into the rail or leave the light karts
   stopping in mid-air, which is the exact class of bug this module exists to
   kill. So the WALL is the fixed thing and the limit is the wall minus THIS
   kart's half-width: Onyx genuinely cannot get as close to the barrier as
   Pixel can, which is both correct and a nice bit of character.

   KART_HALF_WIDTH below is only the reference used to place the wall, chosen
   so the median kart lands on the 11.4 lane limit the handling was tuned at. */
const KART_HALF_WIDTH = 1.40;   // reference kart; racers may override per driver
const LANE_LIMIT      = 11.4;   // reference lane limit — the value Jeff's handling was tuned at
const BARRIER_FACE    = LANE_LIMIT + KART_HALF_WIDTH;   // 12.80 — inner face of the rail
const BARRIER_THICK   = 0.52;
const BARRIER_HEIGHT  = 1.18;
const ROAD_HALF       = 12.0;   // painted asphalt edge
const SHOULDER_LANE   = 10.0;   // grip starts falling off past here (unchanged from the old sim)
const DECK_HALF       = 15.4;   // structural deck / run-off shelf
const SEGMENTS        = 720;    // frames around the lap; matches engine.frame()'s lookup

/* What each tier actually cuts. The scenery thins with `detail`, but on the
   cheap tiers most of the triangles are the ribbon itself, so the ribbon has to
   thin too: a coarser structural deck, a coarser barrier sweep, no rail posts,
   no deck skirt. The barrier stays exact at whatever resolution it is built —
   see barrierFaceAt() — it just gets sampled less often, and the test below
   re-measures at the built resolution rather than assuming 720.             */
const LOD={
 high  :{deck:1,barrier:1,posts:true ,skirt:true },
 medium:{deck:2,barrier:1,posts:true ,skirt:true },
 low   :{deck:2,barrier:2,posts:false,skirt:false}};

export const METRICS = Object.freeze({
 kartHalfWidth:KART_HALF_WIDTH, laneLimit:LANE_LIMIT, barrierFace:BARRIER_FACE,
 barrierThickness:BARRIER_THICK, barrierHeight:BARRIER_HEIGHT, roadHalfWidth:ROAD_HALF,
 shoulderLane:SHOULDER_LANE, deckHalfWidth:DECK_HALF, segments:SEGMENTS
});

/* ------------------------------------------------------- deliberate openings
   A section is only wider than LANE_LIMIT when it says so here, and the sweep
   reads the same table, so a gap can never be an accident of two numbers
   disagreeing. `face` is where the barrier's inner face moves to across the
   span; `blend` is how many t-units the move takes at each end. `surface`
   drives the grip penalty out there so the extra room costs you time.

   Frostbyte's is a real feature: the outside of the long left-hander opens into
   a snow run-off, so a missed apex is survivable but slow. Signal Canyon's is
   a sand trap on the outside of the last corner. Nothing else on any circuit
   is open, and the test asserts that too.                                     */
const RUNOFFS = {
 3:[{from:.335,to:.452,side: 1,face:14.45,blend:.022,surface:'snow'}],
 4:[{from:.706,to:.784,side:-1,face:14.20,blend:.018,surface:'sand'}]
};

/* ------------------------------------------------------------------ helpers */
/* Mirrors graphics.js so world.js has no build-order dependency on the frame
   module. If either of these two lines ever changes there, change it here. */
const trackRight=f=>new T.Vector3(-f.z,0,f.x).normalize();
const signedCurvature=(a,b,d)=>{let x=Math.atan2(b.x,b.z)-Math.atan2(a.x,a.z);x=((x+Math.PI)%(Math.PI*2)+Math.PI*2)%(Math.PI*2)-Math.PI;return -x/d;};
const HAS_DOM=typeof document!=='undefined';
const clamp=(v,a,b)=>v<a?a:v>b?b:v;
const smooth=x=>{x=clamp(x,0,1);return x*x*(3-2*x);};
export function rng(seed){return()=>{seed|=0;seed=seed+0x6d2b79f5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}

const _v=new T.Vector3(),_n3=new T.Matrix3(),_col=new T.Color(),_m4=new T.Matrix4(),_q=new T.Quaternion(),_e=new T.Euler();

/* Unit geometries, authored once and re-used by every merge. Keeping the
   segment counts low here is the cheapest triangle saving in the whole game. */
const UNIT={};
function unit(name){
 if(UNIT[name])return UNIT[name];
 let g;
 switch(name){
  case 'box':      g=new T.BoxGeometry(1,1,1);break;
  case 'plane':    g=new T.PlaneGeometry(1,1);break;
  case 'cyl':      g=new T.CylinderGeometry(.5,.5,1,10);break;
  case 'cyl6':     g=new T.CylinderGeometry(.5,.5,1,6);break;
  case 'tube':     g=new T.CylinderGeometry(.5,.5,1,8,1,true);break;
  case 'cone':     g=new T.ConeGeometry(.5,1,9);break;
  case 'cone4':    g=new T.ConeGeometry(.5,1,4);break;
  case 'cone6':    g=new T.ConeGeometry(.5,1,6);break;
  case 'ball':     g=new T.SphereGeometry(.5,12,8);break;
  case 'ballLow':  g=new T.SphereGeometry(.5,8,6);break;
  case 'ballTiny': g=new T.SphereGeometry(.5,6,4);break;   // 36 tris: snowbanks, canopies, balls
  case 'rock':     g=new T.IcosahedronGeometry(.5,0);break;
  case 'rock1':    g=new T.IcosahedronGeometry(.5,1);break;
  case 'torus':    g=new T.TorusGeometry(.5,.06,5,20);break;
  case 'ring':     g=new T.TorusGeometry(.5,.011,4,28);break;
  default: g=new T.BoxGeometry(1,1,1);
 }
 if(!g.attributes.uv)g.setAttribute('uv',new T.Float32BufferAttribute(new Float32Array(g.attributes.position.count*2),2));
 return UNIT[name]=g;
}

/* ------------------------------------------------------------------- Batch
   One merged, vertex-coloured BufferGeometry per material. Everything static
   in a circuit lands in one of six of these, so the whole world is six draws
   plus signage. Instancing would have been the other answer, but merging wins
   here: the props are all different shapes and an InstancedMesh per shape is
   more draw calls than one merged buffer per material.                       */
export class Batch{
 constructor(material){this.material=material;this.pos=[];this.nor=[];this.uv=[];this.col=[];this.idx=[];this.count=0;}
 get empty(){return this.count===0;}
 /* Test hook. scratch/walls-clearance-test.mjs sets this to be told about
    every bake — (batch, firstVertex, endVertex, 'add'|'strip') — so it can
    measure how close each prop sits to the road. Null in the game.        */
 static onAppend=null;
 /* Bake one transformed copy of `geo` with a flat colour. */
 add(geo,matrix,color,uvScale){
  const p=geo.attributes.position.array,n=geo.attributes.normal.array,u=geo.attributes.uv?geo.attributes.uv.array:null;
  const nm=_n3.getNormalMatrix(matrix),base=this.count,c=_col.setHex(color>>>0);
  const cr=c.r,cg=c.g,cb=c.b;
  /* uvScale may be a number or [u,v] — a tower needs its windows sized in
     metres on both axes, not squashed into a square repeat. */
  const su=uvScale===undefined?1:(uvScale.length?uvScale[0]:uvScale);
  const sv=uvScale===undefined?1:(uvScale.length?uvScale[1]:uvScale);
  for(let i=0,j=0;i<p.length;i+=3,j+=2){
   _v.set(p[i],p[i+1],p[i+2]).applyMatrix4(matrix);this.pos.push(_v.x,_v.y,_v.z);
   _v.set(n[i],n[i+1],n[i+2]).applyMatrix3(nm).normalize();this.nor.push(_v.x,_v.y,_v.z);
   this.col.push(cr,cg,cb);
   this.uv.push(u?u[j]*su:0,u?u[j+1]*sv:0);
  }
  const verts=p.length/3;
  if(geo.index){const a=geo.index.array;for(let i=0;i<a.length;i++)this.idx.push(a[i]+base);}
  else for(let i=0;i<verts;i++)this.idx.push(i+base);
  this.count+=verts;
  if(Batch.onAppend)Batch.onAppend(this,base,this.count,'add');
 }
 /* A swept quad ribbon between two edge functions. This is how the road, the
    curbs and — crucially — the barrier are all built, so the barrier is one
    unbroken surface with no instancing gaps to squeeze through. */
 strip(frames,edgeA,edgeB,colorAt,uvAt){
  const n=frames.length-1,base=this.count;
  for(let i=0;i<n;i++){
   const f0=frames[i],f1=frames[i+1];
   const a0=edgeA(i),b0=edgeB(i),a1=edgeA(i+1),b1=edgeB(i+1);
   const c=_col.setHex((colorAt?colorAt(i):0xffffff)>>>0),cr=c.r,cg=c.g,cb=c.b;
   const v0=uvAt?uvAt(i):i/n*40,v1=uvAt?uvAt(i+1):(i+1)/n*40;
   const q=[[f0,a0,0,v0],[f0,b0,1,v0],[f1,a1,0,v1],[f1,b1,1,v1]];
   const o=this.count;
   for(const [f,e,u,v] of q){
    _v.copy(f.p).addScaledVector(f.right,e.lat);_v.y+=e.h;
    this.pos.push(_v.x,_v.y,_v.z);this.uv.push(u,v);this.col.push(cr,cg,cb);this.nor.push(0,1,0);
   }
   this.idx.push(o,o+1,o+2,o+1,o+3,o+2);
   this.count+=4;
  }
  this.recomputeFrom(base);
  if(Batch.onAppend)Batch.onAppend(this,base,this.count,'strip');
 }
 recomputeFrom(base){
  /* Flat-shade whatever was just appended: strips want hard creases between
     the road, the curb lip and the rail face, not one averaged normal. */
  const P=this.pos,N=this.nor,I=this.idx;
  for(let k=0;k<I.length;k+=3){
   const a=I[k],b=I[k+1],c=I[k+2];
   if(a<base&&b<base&&c<base)continue;
   const ax=P[a*3],ay=P[a*3+1],az=P[a*3+2];
   const ux=P[b*3]-ax,uy=P[b*3+1]-ay,uz=P[b*3+2]-az;
   const vx=P[c*3]-ax,vy=P[c*3+1]-ay,vz=P[c*3+2]-az;
   let nx=uy*vz-uz*vy,ny=uz*vx-ux*vz,nz=ux*vy-uy*vx;
   const l=Math.hypot(nx,ny,nz)||1;nx/=l;ny/=l;nz/=l;
   for(const id of [a,b,c]){N[id*3]=nx;N[id*3+1]=ny;N[id*3+2]=nz;}
  }
 }
 mesh(){
  const g=new T.BufferGeometry();
  g.setAttribute('position',new T.Float32BufferAttribute(this.pos,3));
  g.setAttribute('normal',new T.Float32BufferAttribute(this.nor,3));
  g.setAttribute('uv',new T.Float32BufferAttribute(this.uv,2));
  g.setAttribute('color',new T.Float32BufferAttribute(this.col,3));
  g.setIndex(this.idx.length>65535?new T.Uint32BufferAttribute(this.idx,1):new T.Uint16BufferAttribute(this.idx,1));
  g.computeBoundingSphere();
  const m=new T.Mesh(g,this.material);m.matrixAutoUpdate=false;
  return m;
 }
}

/* ------------------------------------------------------------------- Shop
   The prop vocabulary the six circuits are written against. Every call here is
   a bake into a merged buffer, not a new object in the scene. */
class Shop{
 constructor(quality){
  this.quality=quality;
  const std=(o)=>new T.MeshStandardMaterial(Object.assign({vertexColors:true},o));
  this.mats={
   matte : std({metalness:.06,roughness:.86}),
   stone : std({metalness:.02,roughness:.95,flatShading:true}),
   gloss : std({metalness:.66,roughness:.26}),
   wet   : std({metalness:.55,roughness:.12}),
   glow  : new T.MeshBasicMaterial({vertexColors:true}),
   haze  : new T.MeshBasicMaterial({vertexColors:true,transparent:true,opacity:.34,blending:T.AdditiveBlending,depthWrite:false}),
   glass : std({metalness:.9,roughness:.06,transparent:true,opacity:.34,depthWrite:false})
  };
  this.batches={};
  this.extra=[];         // meshes that cannot merge (textured signage, sprites)
 }
 batch(name){return this.batches[name]||(this.batches[name]=new Batch(this.mats[name]||this.mats.matte));}
 /* A circuit can bring its own material (a tiled facade, a water surface).
    One registered material is one extra draw call and no more. */
 register(name,material){this.mats[name]=material;const b=this.batches[name];if(b)b.material=material;return name;}
 /* place(kind, batchName, position, scale, rotation, colour) */
 put(kind,into,x,y,z,sx,sy,sz,color,rx,ry,rz){
  _e.set(rx||0,ry||0,rz||0);_q.setFromEuler(_e);
  _m4.compose(_v.set(x,y,z),_q,new T.Vector3(sx,sy===undefined?sx:sy,sz===undefined?sx:sz));
  this.batch(into).add(unit(kind),_m4,color===undefined?0xffffff:color);
 }
 /* Same, but repeating the material's texture — how the towers get windows
    without one box per window. */
 putUV(kind,into,x,y,z,sx,sy,sz,color,ry,uvScale,rx,rz){
  _e.set(rx||0,ry||0,rz||0);_q.setFromEuler(_e);
  _m4.compose(_v.set(x,y,z),_q,new T.Vector3(sx,sy===undefined?sx:sy,sz===undefined?sx:sz));
  this.batch(into).add(unit(kind),_m4,color===undefined?0xffffff:color,uvScale||1);
 }
 box(into,x,y,z,sx,sy,sz,color,ry){this.put('box',into,x,y,z,sx,sy,sz,color,0,ry,0);}
 mesh(m){this.extra.push(m);return m;}
 flush(group){
  let tris=0,draws=0;
  for(const name of Object.keys(this.batches)){
   const b=this.batches[name];if(b.empty)continue;
   const m=b.mesh();m.name='batch:'+name;
   m.castShadow=name==='matte'||name==='stone'||name==='gloss';
   m.receiveShadow=m.castShadow;
   group.add(m);tris+=b.idx.length/3;draws++;
  }
  for(const m of this.extra){group.add(m);draws++;
   const g=m.geometry;if(g&&g.index)tris+=g.index.count/3;else if(g&&g.attributes.position)tris+=g.attributes.position.count/3;}
  this.batches={};this.extra=[];
  return {tris,draws};
 }
}

/* --------------------------------------------------------------- signage */
export function signTexture(text,color='#d9fbff',bg='#101c38',w=512,h=128,font){
 if(!HAS_DOM)return null;
 const c=document.createElement('canvas');c.width=w;c.height=h;
 const ctx=c.getContext('2d');
 ctx.fillStyle=bg;ctx.fillRect(0,0,w,h);
 ctx.strokeStyle=color;ctx.lineWidth=Math.max(3,h*.035);ctx.strokeRect(ctx.lineWidth,ctx.lineWidth,w-ctx.lineWidth*2,h-ctx.lineWidth*2);
 ctx.fillStyle=color;ctx.textAlign='center';ctx.textBaseline='middle';
 ctx.font=font||('900 '+Math.floor(h*.52)+'px Arial, sans-serif');
 ctx.fillText(text,w/2,h*.54,w*.88);
 const tex=new T.CanvasTexture(c);tex.colorSpace=T.SRGBColorSpace;tex.anisotropy=4;return tex;
}
/* All the planes that share one texture go into one geometry -> one draw. */
export function signBoard(tex,placements,doubleSided=true){
 if(!tex)return null;
 const b=new Batch(new T.MeshBasicMaterial({map:tex,side:doubleSided?T.DoubleSide:T.FrontSide,transparent:false}));
 for(const p of placements){
  _e.set(p.rx||0,p.ry||0,p.rz||0);_q.setFromEuler(_e);
  _m4.compose(_v.set(p.x,p.y,p.z),_q,new T.Vector3(p.w,p.h,1));
  b.add(unit('plane'),_m4,0xffffff);
 }
 return b.mesh();
}

/* ============================================================================ */
export class World{
 constructor(index,opts={}){
  this.index=index;this.track=TRACKS[index];
  this.quality=opts.quality==='low'?'low':opts.quality==='medium'?'medium':'high';
  this.detail=opts.detail!==undefined?opts.detail:(this.quality==='low'?LOW_DETAIL_SCALE:this.quality==='medium'?.72:1);
  this.lod=LOD[this.quality];
  this.meshSegments=SEGMENTS/this.lod.barrier;
  this.group=new T.Group();this.group.name='circuit:'+this.track.name;
  this.stats={triangles:0,draws:0,parts:{}};
  this.buildSpine();
  this.buildSurface();
  this.buildBarrier();
  this.buildMarkings();
  this.buildGantry();
  this.buildScenery();
 }

 /* ------------------------------------------------------------- the spine */
 buildSpine(){
  const pts=Array.from({length:48},(_,i)=>{const p=trackPoint(this.track,i/48);return new T.Vector3(p.x,p.y,p.z);});
  this.curve=new T.CatmullRomCurve3(pts,true,'catmullrom',.5);
  this.curve.arcLengthDivisions=1500;
  this.length=this.curve.getLength();
  this.frames=Array.from({length:SEGMENTS+1},(_,i)=>{
   const t=i/SEGMENTS,p=this.curve.getPointAt(t),v=this.curve.getTangentAt(t).normalize();
   return {p,v,right:trackRight(v)};
  });
  this.baseY=this.frames.reduce((m,f)=>Math.min(m,f.p.y),Infinity);
  /* footprint of the whole lap, for scenery that has to enclose it */
  this.bounds=this.frames.reduce((b,f)=>({
   minX:Math.min(b.minX,f.p.x),maxX:Math.max(b.maxX,f.p.x),
   minZ:Math.min(b.minZ,f.p.z),maxZ:Math.max(b.maxZ,f.p.z),
   minY:Math.min(b.minY,f.p.y),maxY:Math.max(b.maxY,f.p.y)}),
   {minX:Infinity,maxX:-Infinity,minZ:Infinity,maxZ:-Infinity,minY:Infinity,maxY:-Infinity});
  /* curvature per frame, cached — the curb and camber authoring both want it */
  this.decimate=step=>step<2?this.frames:this.frames.filter((_,i)=>i%step===0||i===SEGMENTS);
  this.curveAt=new Float32Array(SEGMENTS+1);
  for(let i=0;i<=SEGMENTS;i++){
   const a=this.frames[(i-1+SEGMENTS)%SEGMENTS].v,b=this.frames[(i+1)%SEGMENTS].v;
   this.curveAt[i]=signedCurvature(a,b,this.length*2/SEGMENTS);
  }
 }
 /* Identical maths to the old engine.frame(), so nothing in the sim shifts. */
 sampleAt(t,lane=0,height=0){
  const v=mod(t,1)*SEGMENTS,i=Math.floor(v),f=v-i,a=this.frames[i],b=this.frames[i+1];
  const p=a.p.clone().lerp(b.p,f);
  const dir=a.v.clone().lerp(b.v,f).normalize();
  const right=a.right.clone().lerp(b.right,f).normalize();
  p.addScaledVector(right,lane);p.y+=height;
  return {p,dir,right};
 }
 frame(t,lane,height){return this.sampleAt(t,lane,height);}
 /* Is world point (x,z) at least `need` metres from every part of the lap
    EXCEPT the stretch around t? Jeff: "several of the levels have big walls
    built into the racetracks... you essentially drive through the walls."
    The scenery was authored as "so many metres to the left of frame t", and
    every one of these laps folds back on itself to within ~100 m, so a mesa
    placed 250 m left of one straight landed squarely on another straight —
    a wall in the road that the guardrail (correctly) did not collide with.
    Every large prop goes through this before it is baked, and the clearance
    test in scratch/walls-clearance-test.mjs measures the result.           */
 farFrom(t,x,z,need){
  const F=this.frames,N=SEGMENTS,skip=Math.round(N*.045),ti=Math.round(mod(t,1)*N),n2=need*need;
  for(let i=0;i<N;i++){
   let d=Math.abs(i-ti);if(d>N/2)d=N-d;
   if(d<=skip)continue;
   const dx=F[i].p.x-x,dz=F[i].p.z-z;
   if(dx*dx+dz*dz<n2)return false;
  }
  return true;
 }
 /* Shortest horizontal distance from (x,z) to the road centreline anywhere. */
 distToTrack(x,z){
  let best=Infinity;
  for(const f of this.frames){const dx=f.p.x-x,dz=f.p.z-z,d=dx*dx+dz*dz;if(d<best)best=d;}
  return Math.sqrt(best);
 }
 curvature(t){const v=mod(t,1)*SEGMENTS,i=Math.floor(v),f=v-i;return this.curveAt[i]*(1-f)+this.curveAt[(i+1)%(SEGMENTS+1)]*f;}

 /* =========================================================== THE BOUNDARY
    Everything about where the wall is lives in these four methods. The mesh
    reads them; the simulation reads them; nothing else decides.             */

 /* Lateral offset of the inner face of the guardrail at lap fraction t. */
 barrierFaceAt(t,side){
  const list=RUNOFFS[this.index];
  if(!list)return BARRIER_FACE;
  const u=mod(t,1);
  let face=BARRIER_FACE;
  for(const r of list){
   if(r.side!==side)continue;
   /* wrap-safe span test */
   let a=r.from,b=r.to,x=u;
   if(b<a){if(x<a)x+=1;b+=1;}
   const w=smooth((x-a)/r.blend)*smooth((b-x)/r.blend);
   if(w>0)face=Math.max(face,BARRIER_FACE+(r.face-BARRIER_FACE)*w);
  }
  return face;
 }
 /* The only lane clamp in the game. `half` is this kart's half-width; leave it
    out for the reference kart. */
 laneLimitAt(t,side,half){return this.barrierFaceAt(t,side)-(half||KART_HALF_WIDTH);}
 /* Which run-off (if any) the kart is standing in, for the grip penalty. */
 runoffAt(t,side){
  const list=RUNOFFS[this.index];if(!list)return null;
  const u=mod(t,1);
  for(const r of list){
   if(r.side!==side)continue;
   let a=r.from,b=r.to,x=u;if(b<a){if(x<a)x+=1;b+=1;}
   if(x>a-r.blend&&x<b+r.blend)return r;
  }
  return null;
 }
 /* Top-speed multiplier for how far off the racing line the kart is.
    Replaces simulation.js's hard-coded `if(Math.abs(r.lane)>10)`.          */
 gripAt(t,lane){
  const a=Math.abs(lane);
  if(a<=SHOULDER_LANE)return 1;
  const side=Math.sign(lane)||1;
  const ro=this.runoffAt(t,side);
  if(ro&&a>ROAD_HALF){
   /* off the asphalt entirely and into the deliberate run-off: it costs you */
   const deep=clamp((a-ROAD_HALF)/2.4,0,1);
   return clamp(.58-(ro.surface==='snow'?.14:.10)*deep,.38,1);
  }
  return Math.max(.65,1-(a-SHOULDER_LANE)*.16);
 }
 /* The wall hit. Called once per racer per tick in place of simulation.js's
    `if(Math.abs(r.lane)>11.4){...}`. Returns the closing speed of the impact
    in m/s (0 when there was no contact) so the engine can spark and rumble.

    Rules it has to obey, from the brief: believable scrape and speed loss,
    never a dead stop, never stuck outside the world, never squeezing through. */
 clampLane(r,dt){
  const t=mod(r.distance,this.length)/this.length;
  const side=r.lane>=0?1:-1;
  const limit=this.laneLimitAt(t,side,r.halfWidth);
  if(Math.abs(r.lane)<=limit){
   if(r.wallScrape)r.wallScrape=Math.max(0,r.wallScrape-dt*3.2);
   return 0;
  }
  const impact=Math.max(0,r.lateralSpeed*side);   // how hard it was closing
  r.lane=side*limit;                              // never outside the world
  if(impact>3.6){
   /* a proper hit: bounce off the rail and lose real speed, scaled by angle */
   r.lateralSpeed=-side*Math.min(impact*.30,7.5);
   r.speed*=1-Math.min(.24,impact*.0135);
  }else{
   /* leaning on it: stay pinned, bleed speed while the bodywork rubs */
   r.lateralSpeed=-side*.75;
   r.speed-=r.speed*Math.min(.45,dt*.62);
  }
  r.speed=Math.max(r.speed,9);                    // never a dead stop
  r.wallScrape=Math.min(1.4,(r.wallScrape||0)+.28+impact*.05);
  r.wallSide=side;
  return impact;
 }

 /* ========================================================= road + barrier */
 roadTexture(){
  if(!HAS_DOM)return null;
  const c=document.createElement('canvas');c.width=c.height=128;
  const ctx=c.getContext('2d'),im=ctx.createImageData(128,128),random=rng(12+this.index);
  for(let i=0;i<im.data.length;i+=4){const n=150+random()*70;im.data[i]=im.data[i+1]=im.data[i+2]=n;im.data[i+3]=255;}
  ctx.putImageData(im,0,0);
  const tex=new T.CanvasTexture(c);tex.wrapS=tex.wrapT=T.RepeatWrapping;tex.colorSpace=T.SRGBColorSpace;tex.anisotropy=4;
  return tex;
 }
 buildSurface(){
  const tk=this.track,F=this.frames,shop=new Shop(this.quality);
  const wet=this.index===0||this.index===1||this.index===2; // wet city asphalt, polished showroom floor, lakefront spray
  const road=new T.MeshStandardMaterial({color:tk.road,metalness:wet?.52:.3,roughness:wet?.16:.42,vertexColors:false});
  const tex=this.roadTexture();if(tex){road.map=tex;}
  road.side=T.DoubleSide;

  /* asphalt */
  const rb=new Batch(road);
  const vScale=this.length/24;
  rb.strip(F,()=>({lat:-ROAD_HALF,h:0}),()=>({lat:ROAD_HALF,h:0}),null,i=>i/SEGMENTS*vScale);
  /* uv across the road so the noise does not stretch */
  {const uv=rb.uv;for(let i=0;i<uv.length;i+=2)uv[i]*=4;}
  const roadMesh=rb.mesh();roadMesh.name='road';roadMesh.receiveShadow=true;
  this.group.add(roadMesh);this.stats.parts.road=rb.idx.length/3;

  /* curb / rumble band, asphalt edge out to the rail face. Red-and-white
     through the corners, quiet neon edging on the straights. */
  /* Race curbs belong on the apexes. Everywhere else this is plain concrete
     edging: high-frequency stripes down a straight strobe horribly at speed
     on a phone, which is exactly the kind of noise Jeff called "difficult". */
  const curbA=0xe8434f,curbB=0xf4f8ff;
  const plain=this.index===3?0xcfe0ee:this.index===1?0xb9c0d2:this.index===4?0x8a6046:0x2c3752;
  const curbColor=i=>{
   const c=Math.abs(this.curveAt[i]);
   if(c>.0030)return (i>>1)%2?curbA:curbB;
   if(c>.0018){const w=(i>>1)%2?curbA:curbB;return (i>>2)%2?w:plain;}
   return plain;
  };
  const band=shop.batch('curb');
  band.material=new T.MeshStandardMaterial({vertexColors:true,metalness:.15,roughness:.55});
  const CURB_OUT=BARRIER_FACE-.03;    // clear of the rail face so nothing z-fights
  band.strip(F,()=>({lat:ROAD_HALF,h:.012}),()=>({lat:CURB_OUT,h:.11}),curbColor);
  band.strip(F,()=>({lat:-CURB_OUT,h:.11}),()=>({lat:-ROAD_HALF,h:.012}),curbColor);
  /* the outer lip, so the curb reads as raised from a low camera */
  band.strip(F,()=>({lat:CURB_OUT,h:0}),()=>({lat:CURB_OUT,h:.11}),curbColor);
  band.strip(F,()=>({lat:-CURB_OUT,h:.11}),()=>({lat:-CURB_OUT,h:0}),curbColor);

  /* structural deck under everything, and the outer shelf / run-off apron */
  const deck=shop.batch('matte');
  const DF=this.decimate(this.lod.deck);
  const apron=this.index===3?0xdfeefb:this.index===4?0xb07a55:this.index===2?0x9a8a63:0x1a2336;
  const deckLat=i=>this.barrierFaceAt(i/SEGMENTS,1)+BARRIER_THICK;
  const deckLatL=i=>-(this.barrierFaceAt(i/SEGMENTS,-1)+BARRIER_THICK);
  const dstep=this.lod.deck;
  deck.strip(DF,i=>({lat:deckLat(i*dstep),h:-.02}),()=>({lat:DECK_HALF,h:-.35}),()=>apron);
  deck.strip(DF,()=>({lat:-DECK_HALF,h:-.35}),i=>({lat:deckLatL(i*dstep),h:-.02}),()=>apron);
  if(this.lod.skirt){
   deck.strip(DF,()=>({lat:DECK_HALF,h:-.4}),()=>({lat:-DECK_HALF,h:-.4}),()=>0x0d1322);   // underside
   deck.strip(DF,()=>({lat:DECK_HALF,h:-.35}),()=>({lat:DECK_HALF,h:-2.6}),()=>0x141b2e);
   deck.strip(DF,()=>({lat:-DECK_HALF,h:-2.6}),()=>({lat:-DECK_HALF,h:-.35}),()=>0x141b2e);
  }

  const s=shop.flush(this.group);
  this.stats.parts.surface=s.tris;this.stats.triangles+=s.tris+rb.idx.length/3;this.stats.draws+=s.draws+1;
 }

 /* One continuous swept solid per side, driven by barrierFaceAt(). No
    instances, no slots, no gaps. This is the mesh the test measures. */
 buildBarrier(){
  const tk=this.track,bstep=this.lod.barrier,F=this.decimate(bstep),N=this.meshSegments;
  const railMat=new T.MeshStandardMaterial({vertexColors:true,metalness:.55,roughness:.3});
  const b=new Batch(railMat);
  const capMat=new T.MeshBasicMaterial({vertexColors:true});
  const cap=new Batch(capMat);
  /* The rail has to read as a wall from a chase camera in one glance: a dark
     kick plate at the bottom, a light body above it, a bright cap, and a lit
     pinstripe. Version A's rail was a translucent panel and it read as nothing. */
  const wallTop =this.index===3?0x8fb8d4:this.index===4?0xb48468:this.index===1?0x9aa5bd:0x7c8cb4;
  const wallBody=this.index===3?0xd6e9f7:this.index===4?0x9a6249:this.index===1?0xeef1f8:0x44557c;
  const wallKick=this.index===3?0x3f5f7c:this.index===4?0x5d3a2c:this.index===1?0x4b5570:0x1b2440;
  /* One colour, not two. A two-tone candy stripe running past at 160 km/h is
     visual noise; a single continuous lit line is the edge cue the driver
     actually uses to place the kart. */
  /* 70% of the circuit's neon: at full value the additive bloom turns the two
     rails into a solid white bar at the vanishing point and eats the corner. */
  const dim=(c,k)=>((((c>>16&255)*k|0)<<16)|(((c>>8&255)*k|0)<<8)|((c&255)*k|0));
  const stripeCol=dim(tk.neon,.72);
  const stripe=()=>stripeCol;
  const KICK=.42;

  for(const side of [1,-1]){
   const face=i=>side*this.barrierFaceAt(i/N,side);
   const back=i=>side*(this.barrierFaceAt(i/N,side)+BARRIER_THICK);
   const inner=i=>({lat:face(i),h:0});
   const innerKick=i=>({lat:face(i),h:KICK});
   const innerTop=i=>({lat:face(i),h:BARRIER_HEIGHT});
   const outerTop=i=>({lat:back(i),h:BARRIER_HEIGHT+.06});
   const outerBase=i=>({lat:back(i),h:-.05});
   /* Winding flips with the side so every face points where it should: the
      inner face at the road, the cap at the sky, the outer face outward.
      strip() takes (A,B) and the normal is (B-A) x forward. */
   if(side>0){
    b.strip(F,inner,innerKick,()=>wallKick);           // kick plate -> -right
    b.strip(F,innerKick,innerTop,()=>wallBody);        // inner face -> -right
    b.strip(F,innerTop,outerTop,()=>wallTop);          // top cap    -> +up
    b.strip(F,outerTop,outerBase,()=>wallKick);        // outer face -> +right
   }else{
    b.strip(F,innerKick,inner,()=>wallKick);
    b.strip(F,innerTop,innerKick,()=>wallBody);
    b.strip(F,outerTop,innerTop,()=>wallTop);
    b.strip(F,outerBase,outerTop,()=>wallKick);
   }
   /* the lit pinstripe along the top of the rail — this is the line the driver
      actually reads at speed. 15 mm proud of the face so it cannot z-fight. */
   const lo=i=>({lat:face(i)-side*.015,h:BARRIER_HEIGHT-.34}),hi=i=>({lat:face(i)-side*.015,h:BARRIER_HEIGHT-.06});
   if(side>0)cap.strip(F,lo,hi,stripe);else cap.strip(F,hi,lo,stripe);
  }
  /* posts on the outer side, every ~7 m, so the rail has rhythm going past */
  if(this.lod.posts){const step=Math.max(4,Math.round(7/(this.length/SEGMENTS)));
   for(let i=0;i<SEGMENTS;i+=step)for(const side of [1,-1]){
    const t=i/SEGMENTS,off=this.barrierFaceAt(t,side)+BARRIER_THICK-.02;
    const f=this.sampleAt(t,side*off,0);
    _e.set(0,Math.atan2(f.dir.x,f.dir.z),0);_q.setFromEuler(_e);
    _m4.compose(_v.set(f.p.x,f.p.y+BARRIER_HEIGHT*.5,f.p.z),_q,new T.Vector3(.34,BARRIER_HEIGHT+.5,.34));
    b.add(unit('box'),_m4,wallTop);
   }}
  const m1=b.mesh();m1.name='barrier';m1.castShadow=true;m1.receiveShadow=true;this.group.add(m1);
  const m2=cap.mesh();m2.name='barrier-stripe';this.group.add(m2);
  this.barrierMesh=m1;
  this.stats.parts.barrier=(b.idx.length+cap.idx.length)/3;
  this.stats.triangles+=this.stats.parts.barrier;this.stats.draws+=2;
 }

 /* Centre dashes, edge lines, corner boards, distance markers. */
 buildMarkings(){
  const tk=this.track,shop=new Shop(this.quality);
  const paint=shop.batch('glow');
  const N=Math.round(200*clamp(this.detail,.5,1));
  for(let i=0;i<N;i++){
   const t=i/N,f=this.sampleAt(t),ry=Math.atan2(f.dir.x,f.dir.z);
   /* dashed centre line */
   shop.put('box','glow',f.p.x,f.p.y+.03,f.p.z,.22,.02,3.2,0xdfeaff,0,ry,0);
   /* solid outer edge lines, right at the asphalt edge */
   for(const s of [-1,1]){
    const p=f.p.clone().addScaledVector(f.right,s*(ROAD_HALF-.32));
    shop.put('box','glow',p.x,p.y+.03,p.z,.34,.02,this.length/N*.96,0xbcd2ea,0,ry,0);
   }
  }
  /* run-off surfaces get their own colour so the opening reads as deliberate */
  const list=RUNOFFS[this.index];
  if(list)for(const r of list){
   const span=mod(r.to-r.from,1),steps=Math.max(6,Math.round(span*SEGMENTS/6));
   for(let i=0;i<=steps;i++){
    const t=mod(r.from+span*i/steps,1),f=this.sampleAt(t),ry=Math.atan2(f.dir.x,f.dir.z);
    const face=this.barrierFaceAt(t,r.side);
    if(face<=BARRIER_FACE+.05)continue;
    const mid=(ROAD_HALF+face)/2,w=face-ROAD_HALF;
    const p=f.p.clone().addScaledVector(f.right,r.side*mid);
    shop.put('box','matte',p.x,p.y+.06,p.z,w,.1,span*this.length/steps*1.05,r.surface==='snow'?0xf2f9ff:0xd8b27a,0,ry,0);
   }
  }
  /* corner direction boards and distance markers, placed off the curvature */
  const boards=[],marks=[];
  const cornerTex=this._cornerTex=signTexture('›  ›  ›','#e2feff','#122340',384,128);
  const cornerTexL=this._cornerTexL=signTexture('‹  ‹  ‹','#e2feff','#122340',384,128);
  const M=Math.round(26*clamp(this.detail,.5,1));
  for(let i=0;i<M;i++){
   const t=i/M,c=this.curvature(t);
   if(Math.abs(c)<.0022)continue;
   const side=c>0?-1:1;
   /* Real-world chevron board size, low on a short post. The 6.4 x 2.1 m
      version stood taller than the kart and read as the first of the walls. */
   const f=this.sampleAt(t,side*(BARRIER_FACE+3.0),1.5);
   const ry=Math.atan2(f.dir.x,f.dir.z)+Math.PI;
   (c>0?boards:marks).push({x:f.p.x,y:f.p.y,z:f.p.z,w:3.9,h:1.3,ry});
   /* post */
   shop.put('box','matte',f.p.x,f.p.y-1.0,f.p.z,.2,1.0,.2,0x3a465f,0,ry,0);
  }
  if(cornerTex&&boards.length)shop.mesh(signBoard(cornerTex,boards));
  if(cornerTexL&&marks.length)shop.mesh(signBoard(cornerTexL,marks));

  const s=shop.flush(this.group);
  this.stats.parts.markings=s.tris;this.stats.triangles+=s.tris;this.stats.draws+=s.draws;
 }

 /* Start gantry, grid, banners — the furniture that says "this is a circuit".
    Two shops: one in gantry-local space that gets parented to the start frame,
    one in world space for anything that follows the track.                    */
 buildGantry(){
  const tk=this.track;
  const local=new Shop(this.quality),world=new Shop(this.quality);
  const post=0x16203c,px=BARRIER_FACE+.9;
  const B=(x,y,z,sx,sy,sz,c,into)=>local.put('box',into||'gloss',x,y,z,sx,sy,sz,c,0,0,0);
  for(const s of [-1,1]){
   B(s*px,5.2,0,1.5,10.4,1.8,post);
   B(s*px,10.6,0,2.2,.7,2.4,post);
   local.put('box','glow',s*(px-.82),5.2,.95,.14,9.4,.12,tk.neon,0,0,0);
   local.put('box','glow',s*(px-.82),5.2,-.95,.14,9.4,.12,tk.secondary,0,0,0);
   B(s*(px+1.1),1.3,0,1.1,2.6,3.4,0x202c48);                 // marshal post
  }
  B(0,11.35,0,px*2+2.4,1.5,1.9,post);
  B(0,12.4,0,px*2,.35,2.2,0x2a3a5f);
  local.put('box','glow',0,10.5,1,px*2,.12,.1,tk.neon,0,0,0);
  local.put('box','glow',0,10.5,-1,px*2,.12,.1,tk.secondary,0,0,0);
  const bannerTex=this._bannerTex=signTexture('BLUFOX   OVERDRIVE','#d9fbff','#122a52',1024,192);
  if(bannerTex)local.mesh(signBoard(bannerTex,[
   {x:0,y:11.35,z:1.05,w:px*2,h:2.1},{x:0,y:11.35,z:-1.05,w:px*2,h:2.1,ry:Math.PI}]));

  const g=new T.Group();
  const f0=this.sampleAt(0);
  g.position.copy(f0.p);g.rotation.y=Math.atan2(f0.dir.x,f0.dir.z);
  const ls=local.flush(g);
  this.group.add(g);
  this.stats.parts.gantry=ls.tris;this.stats.triangles+=ls.tris;this.stats.draws+=ls.draws;

  /* sponsor banners hung on the rail down the pit straight, one texture, one draw */
  const bandTex=this._bandTex=signTexture('BLUFOX MOBILE  ·  C³  ·  CONNECTED TO WIN','#bff2ff','#2a1a55',1024,96);
  if(bandTex){
   const pl=[],step=.0058;
   for(let i=0;i<15;i++){
    const t=mod(.955+i*step,1),f=this.sampleAt(t),ry=Math.atan2(f.dir.x,f.dir.z);
    for(const s of [-1,1]){
     const p=f.p.clone().addScaledVector(f.right,s*(this.barrierFaceAt(t,s)-.04));
     pl.push({x:p.x,y:p.y+.68,z:p.z,w:this.length*step*1.04,h:.66,ry:ry+s*Math.PI/2});
    }
   }
   world.mesh(signBoard(bandTex,pl));
  }
  /* start/finish checker and the grid boxes, in world space so they take the camber */
  for(let x=0;x<12;x++)for(let z=0;z<3;z++){
   const f=this.sampleAt(z*1.9/this.length,x*2-11,.035);
   world.put('box','glow',f.p.x,f.p.y,f.p.z,2,.03,1.9,(x+z)%2?0x0d1526:0xeef7ff,0,Math.atan2(f.dir.x,f.dir.z),0);
  }
  for(let i=0;i<8;i++){
   const f=this.sampleAt(mod(-(7+(i>>1)*7.5)/this.length,1),(i%2?1:-1)*4.6,.035);
   world.put('box','glow',f.p.x,f.p.y,f.p.z,3.2,.03,.16,0xdbe9ff,0,Math.atan2(f.dir.x,f.dir.z),0);
  }
  const ws=world.flush(this.group);
  this.stats.triangles+=ws.tris;this.stats.draws+=ws.draws;
 }

 buildScenery(){
  const shop=new Shop(this.quality);
  const ctx={
   shop,world:this,track:this.track,index:this.index,length:this.length,frames:this.frames,
   detail:this.detail,quality:this.quality,metrics:METRICS,baseY:this.baseY,bounds:this.bounds,
   rand:rng(this.track.seed+7),
   sample:(t,lane,h)=>this.sampleAt(t,lane,h),
   curvature:t=>this.curvature(t),
   barrierFaceAt:(t,s)=>this.barrierFaceAt(t,s),
   farFrom:(t,x,z,need)=>this.farFrom(t,x,z,need),
   distToTrack:(x,z)=>this.distToTrack(x,z),
   signTexture,signBoard,put:(...a)=>shop.put(...a),mesh:m=>shop.mesh(m)
  };
  dressCircuit(this.index,ctx);
  const s=shop.flush(this.group);
  this.stats.parts.scenery=s.tris;this.stats.triangles+=s.tris;this.stats.draws+=s.draws;
 }

 /* ------------------------------------------------------------------ misc */
 /* Where to put a spark burst when clampLane() reports a hit. */
 contactPoint(r){
  const t=mod(r.distance,this.length)/this.length,side=r.wallSide||(r.lane>=0?1:-1);
  return this.sampleAt(t,side*(this.barrierFaceAt(t,side)-.12),.55);
 }
 /* Measured straight off the baked vertex buffer — what the test compares
    the lane limit against, and what proves the two cannot disagree. */
 measureBarrier(t,side){
  const g=this.barrierMesh.geometry,pos=g.attributes.position.array;
  const f=this.sampleAt(t);
  let best=Infinity;
  const px=f.p.x,py=f.p.y,pz=f.p.z,rx=f.right.x,rz=f.right.z;
  let dx=f.dir.x,dz=f.dir.z;const dl=Math.hypot(dx,dz)||1;dx/=dl;dz/=dl;
  /* Only the ring of vertices belonging to this slice. The window is narrower
     than half a segment so a neighbouring ring on a tight corner — or another
     part of the lap passing close by — cannot be mistaken for this wall. */
  const tol=this.length/this.meshSegments*.45;
  for(let i=0;i<pos.length;i+=3){
   const ox=pos[i]-px,oy=pos[i+1]-py,oz=pos[i+2]-pz;
   if(Math.abs(ox*dx+oz*dz)>tol)continue;
   if(oy<.02||oy>BARRIER_HEIGHT+.5)continue;       // only the standing wall
   const lat=ox*rx+oz*rz;
   if(lat*side<=0||Math.abs(lat)>DECK_HALF+4)continue;
   const a=Math.abs(lat);
   if(a<best)best=a;
  }
  return best;
 }
 dispose(){
  const geos=new Set(),mats=new Set(),texs=new Set();
  this.group.traverse(o=>{
   if(o.geometry)geos.add(o.geometry);
   if(o.material)for(const m of (Array.isArray(o.material)?o.material:[o.material])){
    mats.add(m);for(const k of ['map','emissiveMap','alphaMap'])if(m[k])texs.add(m[k]);
   }
  });
  geos.forEach(g=>g.dispose());mats.forEach(m=>m.dispose());texs.forEach(t=>t.dispose());
  this.group.clear();
 }
}

/* ----------------------------------------------------------------- factory */
export function buildTrack(index,opts={}){return new World(index|0,opts);}
export default buildTrack;

/* ============================================================================
   WIRING (for whoever owns engine.js and simulation.js — I do not)

   engine.loadTrack(index):
     const w = buildTrack(index, {quality: getQuality() || 'high'});
     this.trackWorld = w;
     this.world.add(w.group);
     this.frames = w.frames;
     this.length = w.length;
     this.frame  = (t,lane,h) => w.sampleAt(t,lane,h);
     this.curvature = t => w.curvature(t);
     // then drop ribbon(), dashes(), gate(), environment(), trackDetails()
     // and roadTexture() from engine.js; world.js builds all of that.
     // Pass the world to the Race so the sim can see the wall:
     //   race = new Race(track, driver, engine.length, t=>engine.curvature(t));
     //   race.world = engine.trackWorld;

   simulation.js — three lines, and they are the whole bug fix:

     line 24   if(Math.abs(r.lane)>10)top*=Math.max(.65,1-(Math.abs(r.lane)-10)*.16);
       becomes top *= this.world.gripAt(mod(r.distance,this.length)/this.length, r.lane);

     line 28   if(Math.abs(r.lane)>11.4){r.lane=Math.sign(r.lane)*11.4;
                 r.lateralSpeed*=-.18;r.speed*=.995;}
       becomes const impact = this.world.clampLane(r, dt);
               if(impact > 3.6 && r.isPlayer) this.emit('SCRAPE','hit');

     line 37   a.lane=Math.max(-12,Math.min(12,a.lane+dir*dt*5));   // and b
       becomes the same clamp against this.world.laneLimitAt(t, side) so a
       side-by-side shove cannot push a rival through the rail either.

     line 22   drift requires Math.abs(r.lane)<10.2 — that 10.2 is the same
       magic number as the old 10; use METRICS.shoulderLane + 0.2.

   Per-kart width: set r.halfWidth once when the race is built, from the mesh
   the actors module hands back —

     const b=new T.Box3().setFromObject(kartChassis);
     racer.halfWidth = Math.max(-b.min.x, b.max.x);     // solid parts only:
     // skip the contact-shadow plane and the shield sphere, both of which are
     // transparent and much wider than the bodywork.

   Leave it unset and every kart uses the 1.40 m reference, which is fine but
   puts Onyx 0.3 m into the rail and Pixel 0.1 m short of it.

   For sparks / rumble / sound on a hit: clampLane() returns the closing speed
   in m/s and sets r.wallScrape (0..1.4, decays) and r.wallSide.
   world.contactPoint(r) gives the world-space point to emit particles from.
   ========================================================================== */
