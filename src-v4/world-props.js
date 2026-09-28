import * as T from './three.module.js';

/* ============================================================================
   BLUFOX OVERDRIVE — set dressing for the six circuits
   ----------------------------------------------------------------------------
   Jeff's phone shot of the old build shows the problem in one frame: the
   buildings are untextured boxes, the roadside is empty, and the horizon is a
   gradient. This file's whole job is to make each circuit read as a *place*,
   and to do it inside a draw-call budget, because "choppy" was the other half
   of his verdict.

   Then he played the next build: "several of the levels have big walls built
   into the racetracks. That's odd, and you essentially drive through the
   walls." He was right twice over. Some scenery was simply too close and too
   big (ice slabs at the apex, arch legs at 15 m, a showroom wall at 46 m), and
   the rest was authored as "N metres to the left of frame t" on laps that fold
   back on themselves to within ~100 m, so a mesa 250 m left of one straight
   landed squarely on another. Nothing collides out there except the guardrail,
   so a kart running wide drove straight into the rock.

   The rules every circuit here follows now:
     - THREE BANDS, measured from the road centreline (asphalt edge is 12 m,
       guardrail 12.8 m).
         near   < 30 m   only things a kart could plausibly pass: curbs, cones,
                         bollards, poles, lamps, palms and pines, rocks and
                         snowbanks under a metre, kiosks, carts, small boards.
         mid   30-60 m   stands, billboards on legs, shelving islands, cliffs,
                         the el, station modules — the things the track weaves
                         past.
         far   60 m +    skyline, mesas, peaks, the headland, the far station.
       scratch/walls-clearance-test.mjs measures every bake and fails the build
       if anything wall-like (tall, wide, not overhead) is inside 30 m.
     - Anything in the mid or far band is placed through far()/place(), which
       asks world.farFrom() whether the spot is clear of every OTHER part of
       the lap. If it is not, the prop is not built. Ever.
     - Nothing is a naked box. Facades carry a tiled window texture, rock is
       flat-shaded and layered, structures have a silhouette above the skyline.
     - Everything merges. Props are baked into the caller's material batches
       (see Shop in world.js), so a whole circuit is ~10-14 draw calls.
     - Detail scales. ctx.detail thins every count, so the low tier is the same
       place with less of it, not a different place.
     - Nothing here creates a Light. Lighting belongs to graphics.js; what we
       add are emissive surfaces and additive glow cards, which cost nothing.
   ========================================================================== */

export const LOW_DETAIL_SCALE=.45;

/* the near/mid boundary — keep in step with CLEAR in the clearance test */
export const NEAR_BAND=30;

const clamp=(v,a,b)=>v<a?a:v>b?b:v;
const HAS_DOM=typeof document!=='undefined';
const hex=n=>'#'+(n>>>0&0xffffff).toString(16).padStart(6,'0');
/* every count in this file runs through here, so one slider thins a circuit */
const D=(ctx,n)=>Math.max(2,Math.round(n*clamp(ctx.detail,.2,1.4)));

/* ------------------------------------------------------------------ canvas */
function canvas(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;return[c,c.getContext('2d')];}
function texture(c,{repeat=true,srgb=true}={}){
 const t=new T.CanvasTexture(c);
 if(repeat)t.wrapS=t.wrapT=T.RepeatWrapping;
 if(srgb)t.colorSpace=T.SRGBColorSpace;
 t.anisotropy=4;return t;
}

/* A tower facade: dark stone, floor slabs, and windows that are mostly OFF.
   The first pass of this looked like static, because every cell was lit and
   every cell was tiny. A real skyline is dark with a scatter of warm rooms and
   the odd bright floor, so that is what this draws: four wide bays per tile,
   a strong horizontal slab line, and one accent colour used sparingly. */
function facadeTexture(rand,palette,base=0x0a1022,cols=4,rows=9,lit=.34){
 if(!HAS_DOM)return null;
 const [c,ctx]=canvas(64,128);
 ctx.fillStyle=hex(base);ctx.fillRect(0,0,64,128);
 const cw=64/cols,ch=128/rows;
 for(let y=0;y<rows;y++){
  /* a whole floor lit now and then reads as an office at night */
  const floorLit=rand()<.13;
  for(let x=0;x<cols;x++){
   const on=floorLit||rand()<lit;
   if(on){
    const accent=rand()<.22;
    ctx.fillStyle=hex(accent?palette[(rand()*palette.length)|0]:0xffe6bb);
    ctx.globalAlpha=.42+rand()*.5;
   }else{
    ctx.fillStyle=hex(base);ctx.globalAlpha=1;
   }
   ctx.fillRect(x*cw+cw*.16,y*ch+ch*.18,cw*.68,ch*.5);
   ctx.globalAlpha=1;
  }
  /* slab line and a faint spandrel below it */
  ctx.fillStyle='rgba(0,0,0,.55)';ctx.fillRect(0,y*ch+ch*.70,64,Math.max(1,ch*.12));
  ctx.fillStyle='rgba(255,255,255,.05)';ctx.fillRect(0,y*ch+ch*.68,64,1);
 }
 /* a vertical service core so the tile does not tile obviously */
 ctx.fillStyle='rgba(0,0,0,.35)';ctx.fillRect(cw*2-1,0,2,128);
 return texture(c);
}
/* Soft round falloff — light pools, sun glow, headlight spill. */
function radialTexture(inner='rgba(255,255,255,1)',outer='rgba(255,255,255,0)'){
 if(!HAS_DOM)return null;
 const [c,ctx]=canvas(128,128);
 const g=ctx.createRadialGradient(64,64,0,64,64,64);
 g.addColorStop(0,inner);g.addColorStop(.45,'rgba(255,255,255,.35)');g.addColorStop(1,outer);
 ctx.fillStyle=g;ctx.fillRect(0,0,128,128);
 return texture(c,{repeat:false});
}
/* Banded sedimentary rock for the canyon, and ice striations for the summit. */
function bandTexture(colors,jitter=8){
 if(!HAS_DOM)return null;
 const [c,ctx]=canvas(16,128);
 for(let y=0;y<128;y++){
  const col=colors[(y/128*colors.length)|0]||colors[0];
  ctx.fillStyle=hex(col);ctx.globalAlpha=.82+(y%3)*.06;
  ctx.fillRect(0,y,16,1);
 }
 ctx.globalAlpha=.18;
 for(let i=0;i<jitter;i++){ctx.fillStyle='#000';ctx.fillRect(0,(i*128/jitter)|0,16,1+((i*7)%3));}
 return texture(c);
}

/* A board on the <side> rail should face the racing line; a board you drive
   towards should face back down the track. Getting these two angles right is
   the difference between readable signage and mirrored gibberish. */
const faceTrack=(ry,side)=>ry+side*Math.PI/2;
const faceOncoming=ry=>ry+Math.PI;
function sign(ctx,tex,placements){
 if(!tex||!placements||!placements.length)return null;
 const m=ctx.signBoard(tex,placements);
 if(m)ctx.shop.mesh(m);
 return m;
}

/* ---------------------------------------------------------------- placing
   far():   sample frame t at lateral `lat`, but only if that spot is `need`
            metres clear of every OTHER part of the lap. Null otherwise.
   place(): the same with a few retries at fresh random offsets, for the big
            far-band scenery where a skipped mesa would leave a hole.        */
function far(ctx,t,lat,h,need){
 const f=ctx.sample(t,lat,h);
 return ctx.farFrom(t,f.p.x,f.p.z,need)?f:null;
}
function place(ctx,t,latFn,h,need,tries=4){
 for(let k=0;k<tries;k++){const f=far(ctx,t,latFn(),h,need);if(f)return f;}
 return null;
}

/* -------------------------------------------------------------- primitives */
function groundPlane(ctx,y,color,size=3400,mat='matte'){
 ctx.shop.put('box',mat,0,y-30,0,size,60,size,color,0,0,0);
}
/* A swept skirt either side of the deck — beach, snow bank, canyon shoulder.

   This one earned a hard lesson. The first version ran out to 120 m and its
   height was measured from each frame's own road level, so on a circuit with
   real elevation (Frostbyte's hill is 18) the skirt belonging to a high
   section reared up in front of a low one and filled the screen with a wall
   of snow. A track-following skirt is only safe close in; past about 40 m the
   ground has to be FLAT, at an absolute height, like ground actually is.
   `drop` must be <= 0: the apron slopes away from the road or lies flat, and
   never rears up beside it.                                                 */
const SKIRT_MAX=40;
/* Anything standing on the skirt has to stand ON it: sample the same linear
   drop the apron uses, or palms end up hovering over the beach. */
function onSkirt(ctx,t,lat,drop,from=15.4,to=SKIRT_MAX,extra=0){
 const a=clamp((Math.abs(lat)-from)/(to-from),0,1);
 return ctx.sample(t,lat,-.34+(drop+.34)*a+extra);
}
function apron(ctx,from,to,drop,color,mat='matte'){
 to=Math.min(to,SKIRT_MAX);drop=Math.min(drop,-.34);
 /* a smooth slope needs half the frames the road does */
 const b=ctx.shop.batch(mat),F=ctx.frames.filter((_,i)=>i%2===0||i===ctx.frames.length-1);
 b.strip(F,()=>({lat:from,h:-.34}),()=>({lat:to,h:drop}),()=>color);
 b.strip(F,()=>({lat:-to,h:drop}),()=>({lat:-from,h:-.34}),()=>color);
}
/* Additive card lying on a surface: light pools, sun glitter, shadow-free glow */
function pool(ctx,x,y,z,w,h,color,ry,dim){
 /* Euler XYZ composes Rz first, so the in-plane spin goes in rz and the
    -90deg about X lays the card on the road afterwards. The colour is knocked
    down before it is baked: additive blending plus bloom turns anything near
    full brightness into a white hole in the middle of the racing line. */
 const k=dim===undefined?.07:dim;
 const c=(((color>>16&255)*k|0)<<16)|(((color>>8&255)*k|0)<<8)|((color&255)*k|0);
 ctx.shop.putUV('plane','pool',x,y,z,w,h,1,c,0,1,-Math.PI/2,ry||0);
}
function lampPost(ctx,t,side,color,h=7.4,reach=2.9){
 const face=ctx.barrierFaceAt(t,side);
 const f=ctx.sample(t,side*(face+1.35),0);
 const ry=Math.atan2(f.dir.x,f.dir.z);
 ctx.shop.put('box','gloss',f.p.x,f.p.y+h/2,f.p.z,.26,h,.26,0x2a3552,0,ry,0);
 const arm=ctx.sample(t,side*(face+1.35-reach/2),h);
 ctx.shop.put('box','gloss',arm.p.x,arm.p.y,arm.p.z,reach,.18,.22,0x2a3552,0,ry,0);
 const head=ctx.sample(t,side*(face+1.35-reach),h-.12);
 ctx.shop.put('box','glow',head.p.x,head.p.y,head.p.z,1.15,.16,.5,color,0,ry,0);
 const lit=ctx.sample(t,side*(face-reach),.055);
 pool(ctx,lit.p.x,lit.p.y,lit.p.z,7.5,9,color,ry);
}
/* A short bollard with a lit cap — the near-band edge cue on the city and
   space circuits, the way snow poles are on the summit. */
function bollard(ctx,t,side,color,h=.95){
 const f=ctx.sample(t,side*(ctx.barrierFaceAt(t,side)+1.05),0),ry=Math.atan2(f.dir.x,f.dir.z);
 ctx.shop.put('box','gloss',f.p.x,f.p.y+h/2,f.p.z,.3,h,.3,0x2a3552,0,ry,0);
 ctx.shop.put('box','glow',f.p.x,f.p.y+h+.05,f.p.z,.32,.1,.32,color,0,ry,0);
}
/* Traffic cones in a loose cluster on the outside of a corner exit. */
function cones(ctx,t,side,n,color=0xff7a2a){
 const face=ctx.barrierFaceAt(t,side);
 for(let k=0;k<n;k++){
  const f=ctx.sample(t+k*.0022,side*(face+1.5+(k%2)*.7),0);
  ctx.shop.put('cone','matte',f.p.x,f.p.y+.38,f.p.z,.5,.76,.5,color,0,0,0);
  ctx.shop.put('box','matte',f.p.x,f.p.y+.03,f.p.z,.62,.06,.62,0x2b2b33,0,0,0);
 }
}
/* Bleachers: a wedge of stepped rows with a speckled crowd band. Mid band —
   the front row starts at NEAR_BAND+2 from the centreline and is nudged out
   further if a curve brings either end closer than that. */
function grandstand(ctx,t,side,len=34,rows=7,base=0x21304d){
 const f0=ctx.sample(t,0,0),ry=Math.atan2(f0.dir.x,f0.dir.z);
 let front=NEAR_BAND+2.6;
 for(let k=0;k<6;k++){
  const a=ctx.sample(t-len*.5/ctx.length,side*front,0),b=ctx.sample(t+len*.5/ctx.length,side*front,0);
  const d=Math.min(ctx.distToTrack(a.p.x,a.p.z),ctx.distToTrack(b.p.x,b.p.z));
  if(d>=NEAR_BAND+1.2)break;
  front+=NEAR_BAND+1.2-d+.4;
 }
 for(let r=0;r<rows;r++){
  const lat=side*(front+r*1.6);
  const p=ctx.sample(t,lat,0);
  ctx.shop.put('box','matte',p.p.x,p.p.y+.9+r*1.15,p.p.z,1.6,.4,len,r%2?base:base+0x0a0f18,0,ry,0);
  /* crowd — one speckle strip per row, cheap and reads as people at speed */
  ctx.shop.put('box','glow',p.p.x,p.p.y+1.45+r*1.15,p.p.z,1.1,.7,len*.98,
   [0xd8e4ff,0xffd9a8,0xffb2c8,0xbfe9ff][r%4],0,ry,0);
 }
 const back=ctx.sample(t,side*(front+rows*1.6),0);
 ctx.shop.put('box','matte',back.p.x,back.p.y+rows*.62,back.p.z,.7,rows*1.3,len,0x18233c,0,ry,0);
 /* a canopy with the circuit colour on its fascia, so the stand reads as one */
 const mid=ctx.sample(t,side*(front+rows*.8),0);
 ctx.shop.put('box','matte',mid.p.x,mid.p.y+rows*1.3+1.2,mid.p.z,rows*1.6+1.6,.3,len+2,0x18233c,0,ry,0);
 ctx.shop.put('box','glow',ctx.sample(t,side*(front-.2),0).p.x,mid.p.y+rows*1.3+1.0,ctx.sample(t,side*(front-.2),0).p.z,.2,.36,len+2,ctx.track.neon,0,ry,0);
}
/* A billboard on two legs, mid band, facing the racing line. */
function billboard(ctx,tex,t,side,w=13,h=2.7,lat=NEAR_BAND+4,y=6.4,leg=0x222e4a){
 if(!tex)return;
 const f=ctx.sample(t,side*lat,y),ry=Math.atan2(f.dir.x,f.dir.z);
 sign(ctx,tex,[{x:f.p.x,y:f.p.y,z:f.p.z,w,h,ry:faceTrack(ry,side)}]);
 for(const e of [-1,1]){
  const l=ctx.sample(t+e*w*.36/ctx.length,side*lat,0);
  ctx.shop.put('box','gloss',l.p.x,l.p.y+y/2-h/2,l.p.z,.34,y-h,.34,leg,0,ry,0);
 }
}
/* Distance markers: 300 / 200 / 100 boards into the braking zones. */
function distanceBoards(ctx,tex,count,side){
 if(!tex)return null;
 const pl=[];
 for(const t of count){
  const f=ctx.sample(t,side*(ctx.barrierFaceAt(t,side)+1.0),1.35);
  pl.push({x:f.p.x,y:f.p.y,z:f.p.z,w:2.2,h:1.5,ry:faceOncoming(Math.atan2(f.dir.x,f.dir.z))});
 }
 return sign(ctx,tex,pl);
}

/* ------------------------------------------------------------------ trees
   Trees are the one tall thing allowed in the near band: a trunk you could
   clip and a canopy over your head is a tree, not a wall. Each kind is its
   own named function because the clearance test exempts them BY NAME.      */
function palm(ctx,f,h,lean,ry){
 const {shop}=ctx;
 for(let s=0;s<4;s++){
  const y=f.p.y-.4+h*(s+.5)/4;
  shop.put('cyl6','matte',f.p.x+lean*s*.7,y,f.p.z+lean*s*.4,.42-s*.05,h/4+.06,.42-s*.05,0x7a5b3c,lean*.25,0,lean*.25);
 }
 const tx=f.p.x+lean*2.8,tz=f.p.z+lean*1.6,ty=f.p.y-.4+h;
 for(let k=0;k<8;k++){
  const a=ry+k*.785;
  shop.put('cone6','matte',tx+Math.sin(a)*1.7,ty+.35,tz+Math.cos(a)*1.7,
   1.15,3.7,.22,k%2?0x2f9a5c:0x3cb26a,1.15,a,0);
 }
 shop.put('ballTiny','matte',tx,ty+.2,tz,.9,.7,.9,0x6d5232,0,0,0);
}
function pine(ctx,f,base,h,s,rand){
 const {shop}=ctx;
 shop.put('cyl6','matte',f.p.x,base+h*.14,f.p.z,.42*s,h*.3,.42*s,0x4a3a30,0,0,0);
 for(let k=0;k<4;k++){
  const y=base+h*(.22+k*.21),r=(2.5-k*.48)*s;
  shop.put('cone6','matte',f.p.x,y,f.p.z,r,h*.36,r,k===3?0xdff0fb:[0x1f4a3c,0x24553f,0x1b4335][k%3],0,rand()*.5,0);
 }
}
function tree(ctx,f,h,r,leaf,trunk=0x3b2c22){
 const {shop}=ctx;
 shop.put('cyl6','matte',f.p.x,f.p.y+h*.5,f.p.z,.4,h,.4,trunk,0,0,0);
 shop.put('ballTiny','matte',f.p.x,f.p.y+h+r*.55,f.p.z,r*2,r*1.6,r*2,leaf,0,0,0);
}
function cactus(ctx,f,h,rand){
 const {shop}=ctx;
 const g=[0x4f7d3c,0x5a8a44,0x467238][(rand()*3)|0];
 shop.put('cyl6','matte',f.p.x,f.p.y+h/2,f.p.z,.6,h,.6,g,0,0,0);
 for(const s of [-1,1]){
  if(rand()<.3)continue;
  const ay=f.p.y+h*(.35+rand()*.25);
  shop.put('cyl6','matte',f.p.x+s*.7,ay,f.p.z,.42,.9,.42,g,0,0,Math.PI/2);
  shop.put('cyl6','matte',f.p.x+s*1.05,ay+.75,f.p.z,.42,1.5,.42,g,0,0,0);
 }
}

/* ========================================================================== */
/* 0 · CHICAGO AFTERGLOW — neon towers, the el, wet asphalt, street light      */
/* ========================================================================== */
function chicago(ctx){
 const {shop,track,rand}=ctx;
 groundPlane(ctx,ctx.baseY-16,0x05091a);
 apron(ctx,15.4,40,-13,0x0a1226);

 /* One facade tile is 4 windows across and 9 floors up. Sizing the repeat in
    METRES (not "once per window") is what stops the mip chain averaging the
    whole skyline to flat grey, which is exactly how the old build looked. */
 const FAC_W=4*3.4,FAC_H=9*3.6;
 const uvFor=(w,h)=>[Math.max(1,Math.round(w/FAC_W)),Math.max(2,Math.round(h/FAC_H))];
 const fac=facadeTexture(rand,[track.neon,track.secondary,0xffe9b5,0x9fd8ff],0x080e20,4,9,.3);
 shop.register('facade',new T.MeshStandardMaterial({map:fac,emissiveMap:fac,emissive:0xffffff,
  emissiveIntensity:.62,vertexColors:true,metalness:.3,roughness:.55}));
 shop.register('pool',new T.MeshBasicMaterial({map:radialTexture(),vertexColors:true,
  transparent:true,opacity:.5,blending:T.AdditiveBlending,side:T.DoubleSide,depthWrite:false}));

 /* the skyline: two depth bands so the city has a middle distance. The mid
    band starts at 40 m; the far band at 100 m, and both are checked against
    the whole lap so a far tower cannot land on the back straight. */
 const N=D(ctx,76);
 for(let i=0;i<N;i++){
  const t=i/N,side=i%2?1:-1;
  const near=rand()<.5;
  const w=near?12+rand()*14:20+rand()*34;
  const d=near?11+rand()*13:20+rand()*28;
  const h=near?22+rand()*44:55+rand()*115;
  const half=Math.hypot(w,d)*.5+1;
  const f=place(ctx,t,()=>side*(half+(near?46+rand()*24:100+rand()*130)),0,NEAR_BAND+half);
  if(!f)continue;
  const tint=[0x6d84ad,0x51648c,0x8497bb,0x415675,0x7a6f9e][i%5];
  const y=f.p.y-15+h/2;
  shop.putUV('box','facade',f.p.x,y,f.p.z,w,h,d,tint,rand()*.25-.12,uvFor(w,h));
  /* setback + crown, so the silhouette is not a row of dominoes */
  if(rand()<.55){
   const h2=6+rand()*20;
   shop.putUV('box','facade',f.p.x,y+h/2+h2/2,f.p.z,w*.62,h2,d*.62,tint,0,uvFor(w*.62,h2));
   shop.put('box','glow',f.p.x,y+h/2+h2+.5,f.p.z,w*.28,1,d*.28,i%3?track.neon:track.secondary,0,0,0);
  }else{
   shop.put('box','glow',f.p.x,y+h/2+.35,f.p.z,w*.96,.5,d*.96,i%3?track.neon:track.secondary,0,0,0);
  }
  /* a vertical neon spine on the near towers */
  if(near&&rand()<.5)shop.put('box','glow',f.p.x+(side>0?-w/2-.1:w/2+.1),y,f.p.z,.2,h*.8,.2,track.neon,0,0,0);
 }

 /* the el: a girder deck on pillars, and a lit train on it. Mid band, 44 m
    out, so the pillars stand well off the road and the deck is overhead. */
 const EL=-44,A=.06,B=.44,segs=D(ctx,46);
 for(let i=0;i<=segs;i++){
  const t=A+(B-A)*i/segs,f=far(ctx,t,EL,0,12);if(!f)continue;
  const ry=Math.atan2(f.dir.x,f.dir.z);
  const y=f.p.y+8.4,len=(B-A)*ctx.length/segs*1.06;
  shop.put('box','gloss',f.p.x,y,f.p.z,6.4,.55,len,0x2c3b57,0,ry,0);
  shop.put('box','gloss',f.p.x,y+.9,f.p.z,.35,1.4,len,0x35466a,0,ry,0);
  if(i%4===0){shop.put('box','gloss',f.p.x,(y+f.p.y-15)/2,f.p.z,1.5,y-(f.p.y-15),1.5,0x263350,0,ry,0);}
 }
 for(let c=0;c<5;c++){
  const t=.17+c*.021,f=far(ctx,t,EL,0,12);if(!f)continue;
  const ry=Math.atan2(f.dir.x,f.dir.z);
  const y=f.p.y+10.1;
  shop.put('box','gloss',f.p.x,y,f.p.z,3.5,2.9,26,0xb9c6de,0,ry,0);
  shop.put('box','glow',f.p.x,y+.45,f.p.z,3.62,1.15,24,0xfff3d0,0,ry,0);
 }

 /* near band: street lighting pooling on the wet road, lit bollards between
    the lamps, street trees on the verge, cones on the corner exits */
 const L=D(ctx,30);
 for(let i=0;i<L;i++)lampPost(ctx,i/L,i%2?1:-1,0xffe9c0);
 const Bn=D(ctx,34);
 for(let i=0;i<Bn;i++)bollard(ctx,(i+.5)/Bn,i%2?1:-1,i%3?track.neon:track.secondary);
 const Tn=D(ctx,22);
 for(let i=0;i<Tn;i++){
  const t=(i+.3)/Tn,side=i%2?1:-1;
  const f=onSkirt(ctx,t,side*(20+rand()*7),-13);
  tree(ctx,f,3.2+rand()*1.4,1.7+rand()*.6,[0x2f6b47,0x3a7a52,0x2a5e40][i%3]);
 }
 for(const [t,s] of [[.31,-1],[.67,1],[.88,-1]])cones(ctx,t,s,3);

 /* signage: three big boards facing the driver, mid band on legs */
 const s1=ctx.signTexture('CHICAGO  AFTERGLOW','#8ff4ff','#101b3c',768,160);
 const s2=ctx.signTexture('BLUFOX  MOBILE','#ffd8f4','#2b0f47',768,160);
 const s3=ctx.signTexture('GIGABIT  DOWNTOWN','#ffe6b0','#33163a',768,160);
 [[s1,.21],[s2,.55],[s3,.79]].forEach(([tex,t],k)=>billboard(ctx,tex,t,k%2?1:-1,15,3.1,NEAR_BAND+5,7.5));

 /* crowd at the two big corners */
 grandstand(ctx,.30,-1,40,7);
 grandstand(ctx,.66, 1,40,7);

 /* reflected neon smeared along the wet asphalt */
 const R=D(ctx,48);
 for(let i=0;i<R;i++){
  const t=i/R,side=i%2?1:-1,f=ctx.sample(t,side*11.1,.035);
  shop.put('box','haze',f.p.x,f.p.y,f.p.z,.9,.008,5+rand()*7,i%2?track.neon:track.secondary,
   0,Math.atan2(f.dir.x,f.dir.z),0);
 }
}

/* ========================================================================== */
/* 1 · XFINITY MEGASTORE — a showroom you race through                         */
/* ========================================================================== */
function megastore(ctx){
 const {shop,track,rand}=ctx;
 /* Mid-value walls, not white ones. The brightness in a showroom comes from
    the troffers overhead; painting the walls near-white just blows the whole
    far half of the frame out to haze under ACES. */
 const floorCol=0xb4bcd0,wallCol=0x99a3ba,ceilCol=0x8d97ad,dark=0x39425c,skirt=0x49536d;

 /* THE HALL. The last version swept a wall along the track at 46 m, which
    put it in the road wherever the lap folded back on itself, and made a
    corridor out of what should be a warehouse. This is one enormous flat
    room around the whole lap — walls 70 m beyond the circuit's footprint,
    a flat ceiling 30 m up, a flat floor — and the track is a raised racing
    platform inside it. Twelve boxes; the horizon problem is still gone. */
 const B=ctx.bounds,M=70;
 const x0=B.minX-M,x1=B.maxX+M,z0=B.minZ-M,z1=B.maxZ+M;
 const cx=(x0+x1)/2,cz=(z0+z1)/2,W=x1-x0,Dp=z1-z0;
 const floorY=ctx.baseY-3.8,ceilY=ctx.baseY+30,H=ceilY-floorY;
 apron(ctx,15.4,40,-3.4,floorCol);                                   // gently down to the floor
 shop.put('box','matte',cx,floorY-30,cz,W+2,60,Dp+2,floorCol,0,0,0);  // floor
 shop.put('box','matte',cx,ceilY+.5,cz,W+2,1,Dp+2,ceilCol,0,0,0);     // ceiling
 const wall=(x,z,sx,sz)=>{
  shop.put('box','matte',x,floorY+H/2,z,sx,H,sz,wallCol,0,0,0);
  /* three bands up each wall: dark skirting, a lit brand stripe, and a dark
     fascia under the ceiling. Without them the hall fogs out to one flat
     value and the driver has nothing to judge distance against. */
  const inx=x===cx?0:(x<cx?1:-1),inz=z===cz?0:(z<cz?1:-1);
  const bx=x+inx*.55,bz=z+inz*.55,bsx=sx===1?.12:sx,bsz=sz===1?.12:sz;
  shop.put('box','matte',bx,floorY+1.1,bz,bsx,2.2,bsz,skirt,0,0,0);
  shop.put('box','matte',bx,ceilY-2.2,bz,bsx,3.2,bsz,dark,0,0,0);
  shop.put('box','glow',bx,floorY+10.5,bz,bsx,1.6,bsz,track.neon,0,0,0);
  shop.put('box','glow',bx,floorY+12.4,bz,bsx,.5,bsz,0xeef2fa,0,0,0);
  /* pilasters every 40 m for rhythm along a 600 m wall */
  const n=Math.round((sx===1?sz:sx)/40);
  for(let k=1;k<n;k++){
   const px=sx===1?x+inx*.8:x0+(x1-x0)*k/n,pz=sz===1?z+inz*.8:z0+(z1-z0)*k/n;
   shop.put('box','matte',px,floorY+H/2,pz,2.4,H,2.4,dark,0,0,0);
  }
 };
 wall(x0,cz,1,Dp);wall(x1,cz,1,Dp);wall(cx,z0,W,1);wall(cx,z1,W,1);

 shop.register('pool',new T.MeshBasicMaterial({map:radialTexture(),vertexColors:true,
  transparent:true,opacity:.55,blending:T.AdditiveBlending,side:T.DoubleSide,depthWrite:false}));

 /* ceiling: trusses across the hall with troffer rows between them — a real
    warehouse grid, at absolute height, that reads as a lit ceiling from
    anywhere on the lap */
 const rows=Math.round(Dp/24);
 for(let k=0;k<=rows;k++){
  const z=z0+Dp*k/rows;
  shop.put('box','gloss',cx,ceilY-1.1,z,W,.5,.6,0x8e97ad,0,0,0);
  if(k<rows)shop.put('box','glow',cx,ceilY-1.4,z+Dp/rows/2,W,.16,2.4,0xfdfefe,0,0,0);
 }
 /* and a run of troffers that follows the racing line, so the lap itself is
    the best-lit thing in the room, with their pools on the floor */
 const Tn=D(ctx,40);
 for(let i=0;i<Tn;i++){
  const t=i/Tn,f=ctx.sample(t,0,0),ry=Math.atan2(f.dir.x,f.dir.z);
  for(const d of [-1,1]){
   const p=ctx.sample(t,d*7,0);
   shop.put('box','glow',p.p.x,ceilY-1.9,p.p.z,2.6,.16,ctx.length/Tn*.92,0xfdfefe,0,ry,0);
   if(i%2===0)pool(ctx,p.p.x,p.p.y+.06,p.p.z,20,22,0xfff6e6,ry);
  }
 }
 /* showroom columns on a 60 m grid, floor to ceiling, never inside the near
    band. A column is a thing you weave past; it gives the hall its scale. */
 const gx=Math.round(W/60),gz=Math.round(Dp/60);
 for(let i=1;i<gx;i++)for(let k=1;k<gz;k++){
  const x=x0+W*i/gx,z=z0+Dp*k/gz;
  if(ctx.distToTrack(x,z)<NEAR_BAND+3)continue;
  shop.put('box','matte',x,floorY+H/2,z,1.8,H,1.8,0x8790a8,0,0,0);
  shop.put('box','glow',x,floorY+10.5,z,1.9,1.2,1.9,track.secondary,0,0,0);
 }

 /* aisle gates over the track every ~150 m: legs at 34 m, a lit beam 12 m
    up. A repeating near/far frame is the single strongest depth cue an
    interior has, and it costs 40 boxes. */
 const P=D(ctx,10),GL=NEAR_BAND+4;
 for(let i=0;i<P;i++){
  const t=(i+.35)/P,f=ctx.sample(t,0,0),ry=Math.atan2(f.dir.x,f.dir.z);
  shop.put('box','matte',f.p.x,f.p.y+12.2,f.p.z,GL*2+2.6,1.6,1.4,dark,0,ry+Math.PI/2,0);
  shop.put('box','glow',f.p.x,f.p.y+11.2,f.p.z,GL*2,.3,1.6,i%2?track.neon:track.secondary,0,ry+Math.PI/2,0);
  for(const d of [-1,1]){
   const q=far(ctx,t,d*GL,0,NEAR_BAND+2);if(!q)continue;
   shop.put('box','matte',q.p.x,(q.p.y+f.p.y+13)/2,q.p.z,2.6,f.p.y+13-q.p.y,1.6,dark,0,ry,0);
  }
 }

 /* shelving islands in the mid band, three aisles deep, aligned with the
    track so you race down the aisles rather than into the end-caps */
 const bays=D(ctx,44);
 const boxCols=[0x6a3fd0,0x2fb8e8,0xff7ab8,0xffc857,0x4ad6a8,0xe9ecf5];
 for(let i=0;i<bays;i++){
  const t=i/bays,side=i%2?1:-1;
  const lat=side*(NEAR_BAND+5+(i%3)*11);
  const len=Math.min(24,ctx.length/bays*.8),h=7.2;
  const f=far(ctx,t,lat,0,NEAR_BAND+len*.5+2);if(!f)continue;
  const ry=Math.atan2(f.dir.x,f.dir.z);
  for(const e of [-.5,.5]){
   const q=ctx.sample(t+e*len*.96/ctx.length,lat,0);
   shop.put('box','gloss',q.p.x,q.p.y+h/2,q.p.z,2.6,h,.26,0x59637d,0,ry,0);
  }
  shop.put('box','gloss',f.p.x,f.p.y+h,f.p.z,2.7,.2,len,0x59637d,0,ry,0);
  for(let s=0;s<4;s++){
   const y=f.p.y+1.0+s*1.7;
   shop.put('box','matte',f.p.x,y,f.p.z,2.6,.12,len,0xc9cfdd,0,ry,0);
   /* stock in runs, not one box per slot — same read at a third of the
      triangles, which is what a phone actually notices */
   const n=Math.max(2,Math.round(len/6.5));
   for(let k=0;k<n;k++){
    if(rand()<.12)continue;
    const along=(k+.5)/n-.5;
    const q=ctx.sample(t+along*len/ctx.length,lat,0);
    shop.put('box','matte',q.p.x,y+.6,q.p.z,2.0,1.05,len/n*.86,boxCols[(k+i)%boxCols.length],0,ry,0);
   }
  }
  shop.put('box','glow',f.p.x,f.p.y+h+.6,f.p.z,2.8,.8,len*.3,i%2?track.neon:track.secondary,0,ry,0);
  shop.put('box','matte',f.p.x,f.p.y+.3,f.p.z,2.8,.6,len,0x4b5570,0,ry,0);
 }

 /* near band: display kiosks — a podium, a device, a small halo — shopping
    carts left on the verge, and floor decals. All under head height. */
 const K=D(ctx,22);
 for(let i=0;i<K;i++){
  const t=(i+.5)/K,side=i%2?1:-1;
  const f=ctx.sample(t,side*17.6,0),ry=Math.atan2(f.dir.x,f.dir.z);
  shop.put('cyl6','gloss',f.p.x,f.p.y+.5,f.p.z,2.2,1.0,2.2,0xe7eaf3,0,ry,0);
  shop.put('box','gloss',f.p.x,f.p.y+1.15,f.p.z,1.3,.3,1.3,0x8f98ae,0,ry,0);
  shop.put('box','glow',f.p.x,f.p.y+1.85,f.p.z,1.0,1.3,.12,i%2?track.secondary:track.neon,0,ry,0);
  shop.put('ring','glow',f.p.x,f.p.y+1.9,f.p.z,3.4,3.4,3.4,track.neon,Math.PI/2,ry,0);
 }
 const C=D(ctx,26);
 for(let i=0;i<C;i++){
  const t=(i+.15)/C,side=i%2?1:-1;
  const f=ctx.sample(t,side*(16.2+rand()*3.5),0),ry=rand()*6.3;
  shop.put('box','gloss',f.p.x,f.p.y+.75,f.p.z,.9,.7,1.05,0x9aa3b8,0,ry,0);
  shop.put('box','gloss',f.p.x,f.p.y+.22,f.p.z,.8,.1,1.0,0x6b7386,0,ry,0);
  shop.put('box','matte',f.p.x,f.p.y+1.15,f.p.z,.95,.06,.06,0xd8432b,0,ry,0);
  if(rand()<.6)shop.put('box','matte',f.p.x,f.p.y+1.25,f.p.z,.6,.35,.7,boxCols[i%boxCols.length],0,ry,0);
 }

 /* hanging aisle signage in the mid band, and huge brand boards on the far
    walls — one texture each, one draw each */
 const a1=ctx.signTexture('xfinity','#ffffff','#5b2fd6',640,200);
 const a2=ctx.signTexture('UNLIMITED  SPEED','#0b1730','#7ee6ff',768,160);
 const a3=ctx.signTexture('BLUFOX  MOBILE','#ffffff','#1e2a52',768,160);
 const a4=ctx.signTexture('AISLE  5G','#22103f','#ffd166',512,160);
 const SL=NEAR_BAND+4;
 [[a1,10],[a2,12],[a3,10],[a4,9]].forEach(([tex,w],k)=>{
  if(!tex)return;
  const pl=[];
  for(let i=0;i<5;i++){
   const t=(k*.25+i*.2+.04)%1,side=(i+k)%2?1:-1;
   const f=far(ctx,t,side*SL,0,NEAR_BAND+w*.5);if(!f)continue;
   const ry=Math.atan2(f.dir.x,f.dir.z),y=f.p.y+9.5;
   pl.push({x:f.p.x,y,z:f.p.z,w,h:w*.28,ry:faceTrack(ry,side)});
   shop.put('box','gloss',f.p.x,(y+w*.14+ceilY)/2,f.p.z,.11,ceilY-y-w*.14,.11,0x7b8499,0,ry,0);
  }
  /* wall boards: two per texture on alternate walls */
  const bw=64,bh=bw*(k===0?.31:.21),by=floorY+H*.55;
  if(k%2===0){pl.push({x:x0+1.2,y:by,z:cz+(k?-120:120),w:bw,h:bh,ry:Math.PI/2});pl.push({x:x1-1.2,y:by,z:cz+(k?120:-120),w:bw,h:bh,ry:-Math.PI/2});}
  else{pl.push({x:cx+(k===1?-140:140),y:by,z:z0+1.2,w:bw,h:bh,ry:0});pl.push({x:cx+(k===1?140:-140),y:by,z:z1-1.2,w:bw,h:bh,ry:Math.PI});}
  sign(ctx,tex,pl);
 });

 /* checkout crowd behind the rail on two corners */
 grandstand(ctx,.34,1,36,6,0xdfe4f0);
 grandstand(ctx,.78,-1,36,6,0xdfe4f0);
}

/* ========================================================================== */
/* 2 · LAKEFRONT RUSH — water, piers, palms, beach, a golden sun               */
/* ========================================================================== */
function lakefront(ctx){
 const {shop,track,rand}=ctx;
 /* water: one big low-roughness slab. The env map does the rest. */
 shop.register('water',new T.MeshStandardMaterial({color:0x1d7fa0,metalness:.92,roughness:.07,vertexColors:true}));
 shop.put('box','water',0,ctx.baseY-15.5,0,4200,2,4200,0x2a93b4,0,0,0);
 shop.register('pool',new T.MeshBasicMaterial({map:radialTexture(),vertexColors:true,
  transparent:true,opacity:.6,blending:T.AdditiveBlending,side:T.DoubleSide,depthWrite:false}));

 /* beach: sand between the deck and the waterline, with a wet darker hem */
 apron(ctx,15.4,40,-10.5,0xe4cf9c);
 /* the flat beach beyond the skirt, and a wet hem where it meets the water */
 groundPlane(ctx,ctx.baseY-12.6,0xe4cf9c,150);
 groundPlane(ctx,ctx.baseY-13.6,0xcbb488,215);

 /* the sun, low and golden, plus its glitter path across the water */
 shop.put('ball','glow',-520,120,-980,150,150,150,0xffd489,0,0,0);
 shop.putUV('plane','pool',-520,116,-960,760,520,1,0x584322,Math.atan2(520,960),1,0,0);
 for(let i=0;i<14;i++){
  const z=-900+i*62,w=200-i*9;
  shop.putUV('plane','pool',-520*(1-i*.02),ctx.baseY-13.9,z,w,26,1,0x6a5433,0,1,-Math.PI/2,0);
 }

 /* palms on the beach, 20-34 m out: a trunk you could clip, a crown overhead */
 const P=D(ctx,72);
 for(let i=0;i<P;i++){
  const t=i/P,side=i%2?1:-1;
  const f=onSkirt(ctx,t,side*(20+rand()*14),-10.5);
  palm(ctx,f,7+rand()*5,(rand()-.5)*.5,rand()*6.28);
 }
 /* near band: a low wooden beach fence along the outside of the rail, in
    stretches, and beach balls in the sand */
 const Fn=D(ctx,70);
 for(let i=0;i<Fn;i++){
  const t=i/Fn;if((i>>3)%3===2)continue;
  const side=i%2?1:-1,f=ctx.sample(t,side*(ctx.barrierFaceAt(t,side)+2.1),-.15),ry=Math.atan2(f.dir.x,f.dir.z);
  shop.put('box','matte',f.p.x,f.p.y+.45,f.p.z,.14,.9,.14,0xc7ad83,0,ry,0);
  shop.put('box','matte',f.p.x,f.p.y+.72,f.p.z,.06,.06,ctx.length/Fn*2.1,0xd8c39b,0,ry,0);
 }
 for(let i=0;i<D(ctx,18);i++){
  const f=onSkirt(ctx,rand(),(i%2?1:-1)*(19+rand()*9),-10.5);
  shop.put('ballTiny','matte',f.p.x,f.p.y+.3,f.p.z,.7,.7,.7,[0xff5f5f,0xffd93d,0x5ec9ff][i%3],0,0,0);
 }

 /* piers marching out over the water, with pilings and lamp heads. They sit
    15 m below the road, so a pier is never a wall — but a plank under another
    part of the lap would poke out from under the deck, so each is checked. */
 const piers=D(ctx,6);
 for(let i=0;i<piers;i++){
  const t=(i+.4)/piers,side=i%2?1:-1;
  const ry=Math.atan2(ctx.sample(t).dir.x,ctx.sample(t).dir.z);
  let s=0;
  for(;s<11;s++){
   const lat=side*(26+s*6.5);
   const f=far(ctx,t,lat,0,18);if(!f)break;
   const y=ctx.baseY-12.2;
   shop.put('box','matte',f.p.x,y+1.1,f.p.z,6.4,.4,6.6,0xa98a62,0,ry,0);
   shop.put('box','matte',f.p.x,y-1.2,f.p.z,.5,4.4,.5,0x6d573c,0,ry,0);
   if(s%3===0){
    shop.put('box','matte',f.p.x,y+2.3,f.p.z,.24,2.4,.24,0x6d573c,0,ry,0);
    shop.put('ballLow','glow',f.p.x,y+3.5,f.p.z,.7,.7,.7,0xfff0c4,0,0,0);
   }
  }
  /* a sailboat moored at the end */
  const end=far(ctx,t,side*(26+s*6.5+8),0,20);if(!end)continue;
  shop.put('ballLow','matte',end.p.x,ctx.baseY-14.2,end.p.z,7,2.2,2.6,0xf2f5fb,0,ry,0);
  shop.put('cone','matte',end.p.x,ctx.baseY-11.3,end.p.z,5.4,7.6,.2,0xfdfefe,0,ry,0);
 }

 /* beach furniture: umbrellas where the sand is wide, two lifeguard chairs */
 const U=D(ctx,26);
 for(let i=0;i<U;i++){
  const t=(i+.2)/U,side=i%2?1:-1;
  const f=onSkirt(ctx,t,side*(29+rand()*10),-10.5);
  shop.put('box','matte',f.p.x,f.p.y+1.2,f.p.z,.14,2.4,.14,0xbda37a,0,0,0);
  shop.put('cone','matte',f.p.x,f.p.y+2.7,f.p.z,3.4,1.2,3.4,[0xff7a6b,0x6fd0e6,0xffd166][i%3],0,0,0);
 }
 for(const [t,side] of [[.28,1],[.72,-1]]){
  const f=onSkirt(ctx,t,side*30,-10.5),ry=Math.atan2(f.dir.x,f.dir.z);
  for(const a of [-.8,.8])for(const b of [-.8,.8])shop.put('box','matte',f.p.x+a,f.p.y+1.2,f.p.z+b,.16,2.4,.16,0xf2f2ee,0,0,0);
  shop.put('box','matte',f.p.x,f.p.y+2.4,f.p.z,2.2,.16,2.2,0xf2f2ee,0,ry,0);
  shop.put('box','matte',f.p.x,f.p.y+3.0,f.p.z,1.9,1.1,.12,0xf2f2ee,0,ry,0);
  shop.put('box','matte',f.p.x,f.p.y+3.9,f.p.z,2.6,.12,2.6,0xd9463a,0,ry,0);
 }

 /* headland with low buildings on the inside of the lake — far band, and
    every one is checked against the lap, because this is the "gigantic
    cream slab" Jeff drove through: a 40 m building 250 m left of one straight
    was 0 m from the next. */
 const H=D(ctx,30);
 for(let i=0;i<H;i++){
  const t=i/H,w=16+rand()*26,d=16+rand()*24,h=12+rand()*26;
  const f=place(ctx,t,()=>-(120+rand()*180),0,NEAR_BAND+Math.hypot(w,d)*.5+2);
  if(!f)continue;
  shop.put('box','matte',f.p.x,ctx.baseY-13.4+h/2,f.p.z,w,h,d,[0xdcd3c2,0xc8bda9,0xe6ded0][i%3],0,rand(),0);
  if(rand()<.35)shop.put('cone','matte',f.p.x,ctx.baseY-13.4+h+2,f.p.z,18,5,18,0xa8553f,0,0,0);
 }

 /* moored boats on the water in the mid band, so the lake side of the lap
    is not an empty sheet; hulls sit 14 m below the road */
 const Bt=D(ctx,22);
 for(let i=0;i<Bt;i++){
  const t=(i+.5)/Bt,side=i%2?1:-1;
  const f=far(ctx,t,side*(48+rand()*60),0,26);if(!f)continue;
  const ry=rand()*6.3;
  shop.put('ballTiny','matte',f.p.x,ctx.baseY-14.2,f.p.z,5.5+rand()*3,1.8,2.2,[0xf2f5fb,0xffe7c2,0xd9f1ff][i%3],0,ry,0);
  shop.put('cone','matte',f.p.x,ctx.baseY-10.8,f.p.z,3.6+rand()*2,6.4,.16,0xfdfefe,0,ry,0);
 }
 /* buoy lines on the water, 45-70 m out: cheap, and they say "lake" */
 const By=D(ctx,30);
 for(let i=0;i<By;i++){
  const t=(i+.5)/By,side=i%2?1:-1;
  const f=far(ctx,t,side*(45+(i%3)*12),0,22);if(!f)continue;
  shop.put('ballTiny','glow',f.p.x,ctx.baseY-14.0,f.p.z,.9,.9,.9,i%2?0xff7a3d:0xf4f7ff,0,0,0);
 }
 /* the city across the water: a distant skyline, far band, opposite the sun */
 const Sk=D(ctx,34);
 for(let i=0;i<Sk;i++){
  const t=i/Sk,w=18+rand()*30,d=w*(.7+rand()*.6),h=30+rand()*90;
  const f=place(ctx,t,()=>(520+rand()*260),0,NEAR_BAND+40+Math.hypot(w,d)*.5,3);
  if(!f||f.p.x<-200)continue;
  shop.put('box','matte',f.p.x,ctx.baseY-13.4+h/2,f.p.z,w,h,d,[0xa9bccb,0x98adbf,0xb7c7d3][i%3],0,rand(),0);
 }
 const s1=ctx.signTexture('LAKEFRONT  RUSH','#0d2b33','#7ff0e0',768,160);
 for(let i=0;i<3;i++)billboard(ctx,s1,.15+i*.33,-1,13,2.7,NEAR_BAND+4,6.2,0xe8e2d4);
 grandstand(ctx,.5,1,40,7,0xe7ded0);
}

/* ========================================================================== */
/* 3 · FROSTBYTE SUMMIT — pines, snow banks, ice cliffs, a descent with a view */
/* ========================================================================== */
function frostbyte(ctx){
 const {shop,track,rand}=ctx;
 groundPlane(ctx,ctx.baseY-13.5,0xdae9f6);
 apron(ctx,15.4,40,-11,0xeaf4fb);
 const iceTex=bandTexture([0xbfe0f2,0xd8ecf8,0xa9d2ea,0xe8f5fd],10);
 shop.register('ice',new T.MeshStandardMaterial({map:iceTex,vertexColors:true,metalness:.18,
  roughness:.3,transparent:true,opacity:.92}));
 shop.register('pool',new T.MeshBasicMaterial({map:radialTexture(),vertexColors:true,
  transparent:true,opacity:.5,blending:T.AdditiveBlending,side:T.DoubleSide,depthWrite:false}));

 /* snow banks heaped against the outside of the rail — under a metre, so
    they read as a snowbank and not a wall */
 const B=D(ctx,150);
 for(let i=0;i<B;i++){
  const t=i/B,side=i%2?1:-1;
  const lat=side*(ctx.barrierFaceAt(t,side)+2.2+rand()*1.6);
  const f=ctx.sample(t,lat,0);
  shop.put('ballTiny','matte',f.p.x,f.p.y-.45,f.p.z,4+rand()*3.5,1.4+rand()*1.2,4+rand()*4,0xf6fbff,0,rand(),0);
 }
 /* Ice rubble on the corners: low chunks where the old build had 4 m ice
    slabs on the apex. */
 const W=D(ctx,80);
 for(let i=0;i<W;i++){
  const t=i/W,c=ctx.curvature(t);
  if(Math.abs(c)<.0022)continue;
  const side=c>0?-1:1;
  const f=ctx.sample(t,side*(ctx.barrierFaceAt(t,side)+2.6+rand()*1.5),0);
  shop.put('rock','ice',f.p.x,f.p.y+.25,f.p.z,1.6+rand()*1.2,.9+rand()*.5,1.4+rand()*1.2,0xe4f3fd,rand(),rand()*6,rand());
 }
 /* The mountainside, mid band: snowy outcrops that SLOPE away from the road.
    The vertical ice cliffs that were here cleared the 30 m rule and still
    read as a slab beside you — a mountain is a slope, not a face. Each is a
    rock cone with a snow cap, 55-80 m out, checked against the lap. */
 const Oc=D(ctx,44);
 for(let i=0;i<Oc;i++){
  const t=(i+.5)/Oc,side=i%2?1:-1;
  const w=26+rand()*26,d=w*(.8+rand()*.4),h=11+rand()*14,half=Math.hypot(w,d)*.5;
  const f=place(ctx,t,()=>side*(NEAR_BAND+14+half+rand()*18),0,NEAR_BAND+half+2,3);
  if(!f)continue;
  const ry=rand()*6;
  shop.put('cone6','stone',f.p.x,ctx.baseY-13.5+h*.5,f.p.z,w,h,d,0x8ea9c4,0,ry,0);
  shop.put('cone6','stone',f.p.x,ctx.baseY-13.5+h*.83,f.p.z,w*.42,h*.34,w*.4,0xf4fbff,0,ry,0);
  if(rand()<.5)shop.put('rock','ice',f.p.x+(rand()-.5)*w*.4,ctx.baseY-13.5+h*.25,f.p.z+(rand()-.5)*w*.4,w*.3,h*.5,w*.28,0xd4e9f7,rand(),ry,rand()*.4);
 }
 /* pines: four stacked cones on a trunk, snow-capped, in three depth bands */
 const P=D(ctx,230);
 for(let i=0;i<P;i++){
  const t=i/P,side=i%2?1:-1;
  const band=rand();
  const s=band<.42?1:band<.8?1.8:2.8,h=(6+rand()*4)*s;
  let f,base;
  if(band<.42){f=onSkirt(ctx,t,side*(20+rand()*16),-11);base=f.p.y-.3;}
  else{f=far(ctx,t,side*(band<.8?44+rand()*80:130+rand()*160),0,NEAR_BAND+3*s);if(!f)continue;base=ctx.baseY-13.5;}
  pine(ctx,f,base,h,s,rand);
 }
 /* distant peaks, big and cheap, so the descent has somewhere to descend to.
    A 300 m peak is the one thing that must never touch the lap. */
 for(let i=0;i<D(ctx,16);i++){
  const t=i/16,w=150+rand()*180,d=150+rand()*180,h=140+rand()*230;
  /* a 300 m cone must start its slope a long way out, not 30 m out */
  const f=place(ctx,t,()=>(i%2?1:-1)*(420+rand()*520),0,NEAR_BAND+60+Math.hypot(w,d)*.5,5);
  if(!f)continue;
  shop.put('cone6','stone',f.p.x,ctx.baseY-13.5+h/2,f.p.z,w,h,d,0x93b0cc,0,rand(),0);
  shop.put('cone6','stone',f.p.x,ctx.baseY-13.5+h*.86,f.p.z,w*.36,h*.3,d*.36,0xf4fbff,0,rand(),0);
 }
 /* orange-tipped snow poles along the rail — the classic alpine read */
 const S=D(ctx,80);
 for(let i=0;i<S;i++){
  const t=i/S,side=i%2?1:-1;
  const f=ctx.sample(t,side*(ctx.barrierFaceAt(t,side)+1.1),0),ry=Math.atan2(f.dir.x,f.dir.z);
  shop.put('box','matte',f.p.x,f.p.y+1.5,f.p.z,.12,3,.12,0xf2f7fc,0,ry,0);
  shop.put('box','glow',f.p.x,f.p.y+2.85,f.p.z,.16,.5,.16,0xff8a3d,0,ry,0);
 }
 /* slalom gate flags on the verge, alternating red and blue */
 const G=D(ctx,30);
 for(let i=0;i<G;i++){
  const t=(i+.5)/G,side=i%2?1:-1;
  const f=onSkirt(ctx,t,side*(17.5+rand()*4),-11),ry=Math.atan2(f.dir.x,f.dir.z);
  shop.put('box','matte',f.p.x,f.p.y+1.0,f.p.z,.08,2.0,.08,0x2a3552,0,ry,0);
  shop.put('box','matte',f.p.x,f.p.y+1.65,f.p.z,.06,.55,.9,i%2?0xe63946:0x2f6df6,0,ry,0);
 }
 /* the snow run-off's marker gate — it is a feature, so it is signposted */
 const ro=ctx.signTexture('RUN-OFF','#2a3d55','#eaf4fb',384,128);
 if(ro)distanceBoards(ctx,ro,[.33,.455],1);
 const s1=ctx.signTexture('FROSTBYTE  SUMMIT','#123047','#cbeaff',768,160);
 for(let i=0;i<3;i++)billboard(ctx,s1,.1+i*.34,-1,12,2.5,NEAR_BAND+4,5.8,0x3f5f7c);
 const L=D(ctx,18);
 for(let i=0;i<L;i++)lampPost(ctx,i/L,i%2?1:-1,0xd7f0ff,6.6,2.6);
}

/* ========================================================================== */
/* 4 · SIGNAL CANYON — mesas, hoodoos, arches, antenna masts, a low warm sun   */
/* ========================================================================== */
function canyon(ctx){
 const {shop,track,rand}=ctx;
 groundPlane(ctx,ctx.baseY-13.5,0x6b3a30);
 apron(ctx,15.4,40,-11,0x8a4b38);
 const rockTex=bandTexture([0x9b5a42,0xb8704e,0x7f4636,0xc98a5e,0x8d5140],14);
 shop.register('rockband',new T.MeshStandardMaterial({map:rockTex,vertexColors:true,metalness:.02,
  roughness:.95,flatShading:true}));
 shop.register('pool',new T.MeshBasicMaterial({map:radialTexture(),vertexColors:true,
  transparent:true,opacity:.55,blending:T.AdditiveBlending,side:T.DoubleSide,depthWrite:false}));

 /* the low sun and its haze bar across the canyon mouth */
 shop.put('ball','glow',620,70,-880,110,110,110,0xffb072,0,0,0);
 shop.putUV('plane','pool',620,70,-860,620,360,1,0x5c3720,Math.atan2(-620,860),1,0,0);

 /* mesas: layered flat-topped blocks in two depth bands, every one checked
    against the whole lap. This is the red wall Jeff drove into: a 250 m mesa
    placed off one straight sat on top of the next. */
 const M=D(ctx,58),mesaTops=[];
 for(let i=0;i<M;i++){
  const t=i/M,side=i%2?1:-1;
  const near=rand()<.4;
  const h=near?26+rand()*36:60+rand()*120;
  const w=near?30+rand()*36:70+rand()*130;
  const d=w*(.7+rand()*.6);
  const half=Math.hypot(w,d)*.5;
  const f=place(ctx,t,()=>side*(half+(near?NEAR_BAND+14+rand()*30:NEAR_BAND+110+rand()*200)),0,NEAR_BAND+half+2,5);
  if(!f)continue;
  const ry=rand();
  shop.putUV('box','rockband',f.p.x,ctx.baseY-13.5+h*.46,f.p.z,w,h*.92,d,0xc98d63,ry,[1,h/9]);
  shop.putUV('box','rockband',f.p.x,ctx.baseY-13.5+h*.95,f.p.z,w*.82,h*.12,d*.8,0xb4754d,ry,[1,1]);
  if(near)shop.putUV('box','rockband',f.p.x+(rand()-.5)*w*.3,ctx.baseY-13.5+h*.3,f.p.z+(rand()-.5)*d*.3,w*.4,h*.55,w*.35,0xa96c4c,ry+.4,[1,h/14]);
  if(!near)mesaTops.push({x:f.p.x,z:f.p.z,y:ctx.baseY-13.5+h*1.01});
 }
 /* canyon walls in the mid band, on the outside of the corners: the course
    is cut into the rock, but the rock starts 40 m out and frames the bend */
 const Cw=D(ctx,60);
 for(let i=0;i<Cw;i++){
  const t=i/Cw,c=ctx.curvature(t);
  if(Math.abs(c)<.0016)continue;
  const side=c>0?-1:1,bh=9+rand()*13,bw=10+rand()*10,bl=ctx.length/Cw*2.4;
  const b=far(ctx,t,side*(NEAR_BAND+14+rand()*14+bw*.5),0,NEAR_BAND+Math.hypot(bw,bl)*.5+4);
  if(!b)continue;
  const ry=Math.atan2(b.dir.x,b.dir.z);
  shop.putUV('box','rockband',b.p.x,b.p.y+bh/2-5,b.p.z,bw,bh,bl,0xb8744f,ry,[1,bh/6]);
  shop.putUV('box','rockband',b.p.x,b.p.y+bh-5.5,b.p.z,bw*.75,bh*.18,bl*.85,0xa3623f,ry,[1,1]);
  /* a talus slope at the foot, so the face rises out of scree, not out of a line */
  const foot=ctx.sample(t,side*(NEAR_BAND+10+rand()*4),0);
  shop.put('cone6','stone',foot.p.x,foot.p.y-2.2,foot.p.z,bw*1.3,3.6,bl*.8,0x8a4b38,0,ry,0);
 }
 /* hoodoos on the shoulder: stacked discs, wide-narrow-wide, under 4 m across
    and under 8 m tall — a pillar you pass, not a wall */
 const H=D(ctx,70);
 for(let i=0;i<H;i++){
  const t=i/H,side=i%2?1:-1;
  const f=onSkirt(ctx,t,side*(22+rand()*14),-11);
  const h=3.5+rand()*4.2,base=f.p.y-.3;
  let y=base;
  for(let k=0;k<5;k++){
   const r=(1.3+Math.sin(k*1.9+i)*.55)*(1-k*.06);
   shop.put('cyl6','rockband',f.p.x,y+h/10,f.p.z,r*2,h/5,r*1.7,[0xb87a52,0xa06544,0xcb9367][k%3],0,i*.7,0);
   y+=h/5;
  }
  shop.put('rock','rockband',f.p.x,y+.4,f.p.z,2.6,1.3,2.3,0x9c6144,rand(),i,0);
 }
 /* rock arches spanning the circuit — legs in the mid band, 36 m out, and
    the span high enough overhead that the arch frames the road */
 for(const t of [.13,.62]){
  const f0=ctx.sample(t),ry=Math.atan2(f0.dir.x,f0.dir.z);
  const span=72,top=22,LEG=NEAR_BAND+6;
  let ok=true;
  for(const s of [-1,1])if(!far(ctx,t,s*LEG,0,NEAR_BAND+8))ok=false;
  if(!ok)continue;
  for(const s of [-1,1]){
   const leg=ctx.sample(t,s*LEG,0);
   shop.putUV('box','rockband',leg.p.x,leg.p.y+top*.4,leg.p.z,10,top*.94,14,0xb2724d,ry,[1,3]);
  }
  for(let k=0;k<11;k++){
   const a=Math.PI*(k+.5)/11;
   const lat=-Math.cos(a)*span/2;
   const hy=Math.sin(a)*6.5+top*.72;
   const p=ctx.sample(t,lat,hy);
   shop.putUV('box','rockband',p.p.x,p.p.y,p.p.z,span/11*1.25,5.5,13,0xc2825a,ry,[1,1],0,-Math.cos(a)*.6);
  }
 }
 /* antenna masts on the far mesa tops — this is Signal Canyon after all */
 const A=Math.min(D(ctx,10),mesaTops.length);
 for(let i=0;i<A;i++){
  const m=mesaTops[Math.floor(i*mesaTops.length/A)];
  const base=m.y,h=26+rand()*26;
  for(let k=0;k<6;k++){
   const y=base+h*k/6,w=2.6*(1-k/8);
   shop.put('box','gloss',m.x,y+h/12,m.z,w,h/6,w,0x8d94a6,0,.4,0);
   shop.put('box','gloss',m.x,y+h/12,m.z,w*1.35,.16,w*1.35,0x77809a,0,.4,0);
  }
  shop.put('ballLow','glow',m.x,base+h+1.2,m.z,1.1,1.1,1.1,0xff4d5e,0,0,0);
  shop.put('box','gloss',m.x,base+h*.72,m.z,5.6,.5,.5,0xa9b2c6,0,.4,0);
 }
 /* near band: scrub, boulders and saguaros on the sand shoulder */
 const S=D(ctx,130);
 for(let i=0;i<S;i++){
  const t=i/S,side=i%2?1:-1;
  const f=onSkirt(ctx,t,side*(17+rand()*22),-11);
  const r=rand();
  if(r<.45)shop.put('rock','stone',f.p.x,f.p.y-.3,f.p.z,1.4+rand()*2.6,1+rand()*1.6,1.4+rand()*2.4,[0x8a5540,0x6f4334,0xa06a4c][i%3],rand(),rand()*6,rand());
  else if(r<.72){
   shop.put('ballLow','matte',f.p.x,f.p.y,f.p.z,1.5+rand(),.9,1.5+rand(),0x6d7a44,0,0,0);
   shop.put('ballLow','matte',f.p.x+.8,f.p.y-.2,f.p.z-.5,1.1,.7,1.1,0x7c8a4e,0,0,0);
  }else cactus(ctx,f,2.4+rand()*2.2,rand);
 }
 const L=D(ctx,20);
 for(let i=0;i<L;i++)lampPost(ctx,i/L,i%2?1:-1,0xffc88a,7,2.8);
 const s1=ctx.signTexture('SIGNAL  CANYON','#2a1206','#ffbf7a',768,160);
 const s2=ctx.signTexture('5G  EVERYWHERE','#3a1226','#ff7f9c',768,160);
 [[s1,.27],[s2,.7]].forEach(([tex,t],k)=>billboard(ctx,tex,t,k%2?1:-1,14,2.9,NEAR_BAND+4,6.6,0x6a5344));
 const ro=ctx.signTexture('SAND','#3a2412','#e8c48a',384,128);
 if(ro)distanceBoards(ctx,ro,[.70,.787],-1);
 grandstand(ctx,.42,1,38,7,0x7d5a44);
}

/* ========================================================================== */
/* 5 · GIGABIT GALAXY — an orbital circuit over a planet                       */
/* ========================================================================== */
/* A 60 m hoop the track passes through. Centre 22 m up, so the tube crosses
   road level 20 m out — clear of the deck and its skirt — and the crown is
   52 m overhead. Named so the clearance test can exempt it: a thin hoop you
   drive through is a gate, not a wall. */
function dockingRing(ctx,t,c){
 const f=ctx.sample(t,0,0),ry=Math.atan2(f.dir.x,f.dir.z);
 ctx.shop.put('ring','glow',f.p.x,f.p.y+22,f.p.z,60,60,60,c,0,ry,0);
 ctx.shop.put('ring','haze',f.p.x,f.p.y+22,f.p.z,64,64,64,c,0,ry,0);
 for(const s of [-1,1]){
  const p=ctx.sample(t,s*(NEAR_BAND+2),0);
  ctx.shop.put('box','gloss',p.p.x,p.p.y+2,p.p.z,1.4,5,1.4,0x3c4472,0,ry,0);
  ctx.shop.put('box','glow',p.p.x,p.p.y+4.7,p.p.z,1.5,.4,1.5,c,0,ry,0);
 }
}
function galaxy(ctx){
 const {shop,track,rand}=ctx;
 shop.register('pool',new T.MeshBasicMaterial({map:radialTexture(),vertexColors:true,
  transparent:true,opacity:.55,blending:T.AdditiveBlending,side:T.DoubleSide,depthWrite:false}));

 /* starfield — one Points draw, not geometry */
 const star=[],N=D(ctx,900);
 for(let i=0;i<N;i++){
  const r=900+rand()*1400,a=rand()*6.283,e=(rand()-.5)*1.4;
  star.push(Math.cos(a)*r*Math.cos(e),140+Math.sin(e)*r*.7,Math.sin(a)*r*Math.cos(e));
 }
 const sg=new T.BufferGeometry();
 sg.setAttribute('position',new T.Float32BufferAttribute(star,3));
 shop.mesh(new T.Points(sg,new T.PointsMaterial({color:0xdfe8ff,size:2.1,sizeAttenuation:true,
  transparent:true,opacity:.92,depthWrite:false,fog:false})));

 /* the planet below and behind, with a ring */
 shop.put('ball','matte',380,-420,-1150,620,620,620,0x5b49b8,0,0,0);
 shop.put('ballLow','glow',380,-420,-1150,634,634,634,0x2b2a60,0,0,0);
 const ring=new T.Mesh(new T.TorusGeometry(560,26,3,72),new T.MeshBasicMaterial({color:0x9d7ff0,transparent:true,opacity:.5,side:T.DoubleSide,fog:false}));
 ring.position.set(380,-420,-1150);ring.rotation.set(1.25,.35,.42);shop.mesh(ring);

 /* the deck's underside truss and the pylons that hold the circuit up */
 const Tn=D(ctx,110);
 for(let i=0;i<Tn;i++){
  const t=i/Tn,f=ctx.sample(t,0,0),ry=Math.atan2(f.dir.x,f.dir.z);
  const len=ctx.length/Tn;
  shop.put('box','gloss',f.p.x,f.p.y-4.2,f.p.z,2.2,1.4,len*1.02,0x3c4472,0,ry,0);
  for(const s of [-1,1]){
   const p=ctx.sample(t,s*11,0);
   shop.put('box','gloss',p.p.x,p.p.y-2.3,p.p.z,.7,3.4,.7,0x323a63,0,ry,i%2?.4:-.4);
  }
  if(i%5===0){
   const p=ctx.sample(t,0,0);
   shop.put('box','gloss',p.p.x,p.p.y-7.6,p.p.z,26,.7,1.2,0x3c4472,0,ry+Math.PI/2,0);
   shop.put('box','glow',p.p.x,p.p.y-7.9,p.p.z,24,.18,.4,track.secondary,0,ry+Math.PI/2,0);
  }
 }
 /* data-stream light: two glowing ribbons running alongside the circuit */
 const F=ctx.frames.filter((_,i)=>i%2===0||i===ctx.frames.length-1),stream=shop.batch('haze');
 for(const s of [-1,1])for(const off of [0,1]){
  const lat=s*(17.5+off*2.6),h=.55+off*1.0;   // knee-high light guides, not a lit fence
  stream.strip(F,()=>({lat,h}),()=>({lat:lat+s*1.4,h:h+.05}),
   i=>((i+off*7)>>2)%2?track.neon:track.secondary);
 }
 /* near band: lit bollards and small relay pods on the verge */
 const Bn=D(ctx,40);
 for(let i=0;i<Bn;i++)bollard(ctx,(i+.5)/Bn,i%2?1:-1,i%2?track.neon:track.secondary,1.1);
 const Pd=D(ctx,16);
 for(let i=0;i<Pd;i++){
  const t=(i+.3)/Pd,side=i%2?1:-1,f=ctx.sample(t,side*(18+rand()*4),0);
  shop.put('box','gloss',f.p.x,f.p.y+.6,f.p.z,.22,1.2,.22,0x9aa4c6,0,0,0);
  shop.put('ballTiny','gloss',f.p.x,f.p.y+1.5,f.p.z,1.1,.9,1.1,0xb9c2e0,0,0,0);
  shop.put('box','glow',f.p.x,f.p.y+2.05,f.p.z,.12,.3,.12,0xff4d5e,0,0,0);
 }

 /* station structures: modules, solar wings, dishes — mid band, 50-90 m out
    and mostly overhead, checked against the lap so nothing floats in the
    road on the far side of the loop */
 const S=D(ctx,44);
 for(let i=0;i<S;i++){
  const t=i/S,side=i%2?1:-1;
  const l=8+rand()*16,y=6+rand()*28;
  const f=far(ctx,t,side*(NEAR_BAND+22+rand()*40),y,NEAR_BAND+l*.5+10);if(!f)continue;
  const ry=Math.atan2(f.dir.x,f.dir.z);
  shop.put('cyl','gloss',f.p.x,f.p.y,f.p.z,4.4+rand()*2,l,4.4+rand()*2,0xb9c2e0,0,ry,Math.PI/2);
  shop.put('box','glow',f.p.x,f.p.y+2.4,f.p.z,l*.8,.3,.6,i%2?track.neon:track.secondary,0,ry,0);
  /* solar wings, either side of the module along the track's right vector */
  for(const s2 of [-1,1]){
   const wx=f.p.x+f.right.x*s2*7.5,wz=f.p.z+f.right.z*s2*7.5;
   shop.put('box','gloss',wx,f.p.y,wz,12,.25,5.5,0x2c3a8c,0,ry+Math.PI/2,.25*s2);
   shop.put('box','gloss',wx,f.p.y+.16,wz,11.4,.06,5,0x4f6ce0,0,ry+Math.PI/2,.25*s2);
  }
  if(rand()<.4){
   shop.put('cone','gloss',f.p.x,f.p.y+4.6,f.p.z,6.4,3.2,6.4,0xdfe6fb,Math.PI,ry,0);
   shop.put('box','gloss',f.p.x,f.p.y+3,f.p.z,.3,2.4,.3,0x9aa4c6,0,ry,0);
  }
 }
 /* docking rings the circuit threads through */
 const R=D(ctx,9);
 for(let i=0;i<R;i++)dockingRing(ctx,(i+.5)/R,i%2?track.neon:track.secondary);
 /* a distant sibling station so the sky is not empty */
 for(let i=0;i<D(ctx,10);i++){
  const t=i/10,w=26+rand()*30,d=10+rand()*14;
  const f=place(ctx,t,()=>(i%2?1:-1)*(360+rand()*520),90+rand()*160,NEAR_BAND+Math.hypot(w,d)*.5);
  if(!f)continue;
  shop.put('box','gloss',f.p.x,f.p.y,f.p.z,w,8+rand()*12,d,0x7e88b4,rand(),rand()*6,rand());
  shop.put('box','glow',f.p.x,f.p.y+5,f.p.z,22,.8,7,track.secondary,0,0,0);
 }
 const s1=ctx.signTexture('GIGABIT  GALAXY','#e9e2ff','#251a5c',768,160);
 for(let i=0;i<3;i++)billboard(ctx,s1,.18+i*.33,-1,13,2.7,NEAR_BAND+4,6.4,0x3c4472);
 const L=D(ctx,22);
 for(let i=0;i<L;i++)lampPost(ctx,i/L,i%2?1:-1,0xa9d8ff,5.6,2.4);
}

const CIRCUITS=[chicago,megastore,lakefront,frostbyte,canyon,galaxy];
export function dressCircuit(index,ctx){(CIRCUITS[index|0]||chicago)(ctx);}
export default dressCircuit;
