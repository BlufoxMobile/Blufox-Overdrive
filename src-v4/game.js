import {DRIVERS,TRACKS,ITEMS,trackPoint,mod} from './data.js';
import {Race} from './simulation.js';
import {Engine} from './engine.js';
import {preloadKarts,kartsReady} from './actors.js';
import {preloadPanoramas,panoramaReady} from './panorama.js';
import {createAudio} from './audio.js';
import * as Feel from './feel.js';

/* ============================================================================
   BLUFOX OVERDRIVE — the orchestrator.

   Owns: the screens, the HUD, the settings, and the single per-frame order of
   operations that keeps six independently built modules from fighting:

     pacer.tick   -> one trustworthy dt for everything
     input.update -> analog steer, drift/item edges, scheme arbitration
     driveInput   -> speed-shaped steer + the rookie barrier assist
     race.update  -> the handling model, now clamped by the world's own barrier
     chase.update -> camera placed in TRACK space, before anything renders
     cue.update   -> corner readability
     engine.sync  -> meshes follow the sim, then the frame is composited
     HUD          -> last, so it reports what was actually drawn
   ========================================================================== */

const $=id=>document.getElementById(id);
const html=document.documentElement;
const clamp=(v,a,b)=>v<a?a:v>b?b:v;

/* ------------------------------------------------------------- persistence */
const SAVE_KEY='blufox-overdrive';
let saved={};
try{saved=JSON.parse(localStorage.getItem(SAVE_KEY)||'{}');}catch(e){saved={};}
let records=saved.records||{};

const DIFF_ATTR={easy:'rookie',normal:'pro',hard:'ace'};

const settings={
 scheme:saved.scheme||(Feel.shouldDefaultToTilt()?'tilt':'buttons'),
 sensitivity:typeof saved.sensitivity==='number'?saved.sensitivity:1,
 invert:!!saved.invert,
 difficulty:Feel.DIFFICULTY[saved.difficulty]?saved.difficulty:Feel.DEFAULT_DIFFICULTY,
 music:typeof saved.music==='number'?saved.music:.7,
 sfx:typeof saved.sfx==='number'?saved.sfx:.85,
 quality:saved.quality||null,
 tiltSeen:!!saved.tiltSeen
};
let selectedDriver=Number.isInteger(saved.driver)?clamp(saved.driver,0,7):0;
let selectedTrack=Number.isInteger(saved.track)?clamp(saved.track,0,5):0;

function save(){
 try{localStorage.setItem(SAVE_KEY,JSON.stringify({
  driver:selectedDriver,track:selectedTrack,records,sound:sound.enabled,
  scheme:settings.scheme,sensitivity:settings.sensitivity,invert:settings.invert,
  difficulty:settings.difficulty,music:settings.music,sfx:settings.sfx,
  quality:settings.quality,tiltSeen:settings.tiltSeen
 }));}catch(e){}
}

/* ------------------------------------------------------------------- audio
   The real score. audio.js is a full procedural soundtrack — six circuit songs
   plus menu / results / victory, 40 one-shots, continuous engine, drift and
   scrape voices, and an intensity curve that unlocks stems as the race tightens.
   This object is only the wiring: WHEN to unlock the context, WHICH song a
   screen wants, and what to feed it every frame.

   Three things it has to get right:
     * iOS will not start an AudioContext outside a real gesture, so unlock()
       is driven from the sound toggle AND from a capture-phase listener on the
       first tap/keypress anywhere, which removes itself once the context runs.
     * the node budget is halved when the renderer is on its low tier, because
       the audio thread and the render thread share a phone.
     * nothing here may throw when there is no WebAudio at all; every call into
       audio.js already no-ops before init(). */
const audio=createAudio();

/* One engine voice per kart, but only the nearest few get a real one — the
   engine() call is fed a distance-attenuated volume and audio.js culls the
   quiet ones. Slot = driver id, which is unique across the grid. */
const ENGINE_KINDS=['classic','bike','buggy','hover','hotrod','wedge','truck','van'];

const sound={
 enabled:saved.sound!==false,
 started:false,
 wanted:null,
 wantedOpts:null,

 /* Safe to call as often as you like; only the first one from inside a gesture
    actually starts anything. A player who has turned sound off gets no
    AudioContext at all — the score is 3000 lines of oscillators and there is no
    reason to build the graph for somebody who muted it. */
 init(){
  if(this.started)return true;
  if(!this.enabled)return false;
  const low=!!(engine&&engine.quality==='low');
  if(!audio.unlock({lowPower:low}))return false;
  this.started=true;
  audio.musicVol(settings.music);
  audio.sfxVol(settings.sfx);
  audio.mute(!this.enabled);
  if(this.wanted!==null)audio.setMusic(this.wanted,Object.assign({fade:260},this.wantedOpts||{}));
  return true;
 },
 /* The song a screen wants. Remembered even before the context exists so the
    first unlock starts the right thing rather than silence. */
 play(id,opts){
  const same=this.started&&this.wanted===id&&audio.musicId()===audio.trackSong(id);
  this.wanted=id;this.wantedOpts=opts||null;
  if(!this.started)return;
  if(same&&!(opts&&opts.restart))return;
  audio.setMusic(id,Object.assign({fade:id==='menu'?420:300},opts||{}));
 },
 /* The intensity curve is a one-pole filter with a ~1.5s time constant, and it
    survives between races — so without this a rematch opened at the volume the
    last one finished at. Settle it back to a standing start on the grid. */
 resetIntensity(){
  if(!this.started)return;
  for(let i=0;i<14;i++)audio.raceIntensity({position:8,field:8,lap:1,laps:3,
   speed:0,topSpeed:60,boost:false,drift:false,dt:.25});
 },
 click(kind){if(this.started)audio.click(kind);},
 toggle(){
  this.enabled=!this.enabled;
  if(this.enabled)this.init();
  audio.mute(!this.enabled);
  if(this.enabled)audio.click('select');
  this.label();save();
 },
 label(){const b=$('sound');if(!b)return;
  b.innerHTML='♪ <span>'+(this.enabled?'ON':'OFF')+'</span>';
  b.setAttribute('aria-label',this.enabled?'Mute sound':'Enable sound');},

 /* Everything that is not the race: kill the moving parts, keep the song.
    Latched, because this is called from every menu frame and the drift and
    scrape voices are created lazily on first call — re-asserting zero sixty
    times a second would allocate them just to hold them silent. */
 idle(){
  if(!this.started||this._idle)return;
  this._idle=true;
  audio.stopEngines();audio.drift(0,0);audio.scrape(0,0);
 },

 /* Per frame, during a race. */
 frame(dt){
  if(!this.started||!race)return;
  this._idle=false;
  const p=race.player,live=race.countdown<=0&&!race.finished;
  const top=47+DRIVERS[selectedDriver].speed*1.6;

  /* the player's own engine, dead centre */
  audio.engine(p.id,{on:live,rpm:clamp(p.speed/top,0,1),
   load:clamp(.35+Math.abs(p.steer||0)*.5+(p.boost>0?.25:0),0,1),
   boost:p.boost>0?1:0,vol:1,pan:0,kind:ENGINE_KINDS[p.id]});

  /* rivals, attenuated by how far up or down the road they are and panned by
     which side of us they are on. audio.js keeps only the loudest few. */
  for(const r of race.racers){
   if(r===p)continue;
   const gap=signedGap(r.distance-p.distance,race.length);
   const near=Math.abs(gap);
   const v=near>46?0:(1-near/46)*(1-near/46)*.85;
   audio.engine(r.id,{on:live&&v>.02&&r.finish===null,
    rpm:clamp(r.speed/top,0,1),load:.5,boost:r.boost>0?1:0,
    vol:v,pan:clamp((r.lane-p.lane)/9,-1,1)*(near<8?1:.55),
    kind:ENGINE_KINDS[r.id]});
  }

  /* the score's own intensity curve, and the two continuous voices */
  if(live)audio.raceIntensity({position:race.position,field:8,lap:race.lap,laps:3,
   speed:p.speed,topSpeed:top,boost:p.boost>0,drift:p.drifting,dt});
  audio.drift(live&&p.drifting?clamp(.45+p.speed/90,0,1):0,clamp(p.drift/3.2,0,1));
  audio.scrape(live?clamp(p.wallScrape||0,0,1):0,p.speed);
 }
};
/* Shortest signed distance around the loop, so a rival 5 m ahead of the line is
   5 m away and not a lap away. */
function signedGap(d,len){
 if(!(len>0))return d;
 let x=mod(d+len/2,len)-len/2;
 return x;
}

/* THE GESTURE. iOS only starts an AudioContext from inside a real user gesture,
   and a synthetic click from our own code does not count. Capture phase so a
   tap that lands on any button still unlocks first, and the listeners take
   themselves off as soon as the context is genuinely running. */
const GESTURES=['pointerdown','touchend','keydown'];
function primeAudio(){
 sound.init();
 if(audio.ready&&audio.ctx&&audio.ctx.state==='running')
  for(const ev of GESTURES)removeEventListener(ev,primeAudio,true);
}
for(const ev of GESTURES)addEventListener(ev,primeAudio,true);

/* --------------------------------------------------------------- app state */
let engine=null,portraits=[],race=null,analysis=null;
let state='home',paused=false,raf=0;
let toastTimer=0,hintTimer=0,itemRoll=0,lastItem=null,resultTimer=0;
const courseImages=new Map();let thumbnailJob=false;

const pacer=new Feel.FramePacer();
const chase=new Feel.ChaseCamera();
const cue=new Feel.CornerCue({shoulder:10});
const input=Feel.createInput({
 scheme:settings.scheme,
 tilt:{sensitivity:settings.sensitivity,invert:settings.invert},
 pad:{sensitivity:settings.sensitivity}
});

/* ------------------------------------------------------------------ format */
function formatTime(s){
 if(!(s>=0))return '--:--.--';
 const m=Math.floor(s/60),sec=Math.floor(s%60),cs=Math.floor(s*100%100);
 return String(m).padStart(2,'0')+':'+String(sec).padStart(2,'0')+'.'+String(cs).padStart(2,'0');
}
const ORD=['','1ST','2ND','3RD','4TH','5TH','6TH','7TH','8TH'];
const hex=c=>'#'+c.toString(16).padStart(6,'0');

/* ----------------------------------------------------------------- screens */
function screen(name){
 state=name;
 document.querySelectorAll('.screen').forEach(el=>el.classList.toggle('active',el.id===name));
 $('menu').hidden=false;
 $('hud').hidden=true;
 $('modal').hidden=true;
 $('speedLines').classList.remove('boosting');
 paused=false;html.setAttribute('data-paused','0');
 input.releaseAll();
 if(name==='garage')selectDriver(selectedDriver);
 if(name==='circuits'){selectTrack(selectedTrack);buildThumbnails();}
 if(name==='settings')syncSettingsUi();
 sound.idle();
 sound.play('menu');
}

function selectDriver(i){
 selectedDriver=i;
 const d=DRIVERS[i];
 const img=$('driverPreview');
 img.src=portraits[i]||'';
 img.alt=d.name+' in their racing kart';
 $('driverName').textContent=d.name;
 $('driverClass').textContent=d.title;
 $('driverDesc').textContent=d.desc;
 const feature=document.querySelector('.driver-feature');
 if(feature)feature.style.setProperty('--driver-color',hex(d.accent));
 $('stats').innerHTML=[['SPEED',d.speed],['HANDLING',d.handling],['ACCEL',d.accel]]
  .map(([label,n])=>`<div><span>${label}</span><div class="bar"><i style="width:${n*20}%"></i></div></div>`).join('');
 document.querySelectorAll('.driver-card').forEach((b,j)=>{
  b.classList.toggle('selected',j===i);b.setAttribute('aria-pressed',String(j===i));
 });
 save();
}

/* The route, normalised into a 0..100 box so the SVG viewBox is TIGHT around
   the circuit. It used to be drawn into a 200x130 viewBox with the route only
   filling the middle 100 units, so the 40px card badge rendered a ~20px ring in
   a 40px plate — a white smudge rather than a map. Fitting the path to the box
   lets the badge show the actual shape of the circuit at the size it is. */
const MAP_BOX=100;
function mapGeom(track){
 const n=144;
 const points=Array.from({length:n},(_,i)=>trackPoint(track,i/n));
 const xs=points.map(p=>p.x),zs=points.map(p=>p.z);
 const minX=Math.min(...xs),maxX=Math.max(...xs),minZ=Math.min(...zs),maxZ=Math.max(...zs);
 const scale=Math.min(MAP_BOX/(maxX-minX||1),MAP_BOX/(maxZ-minZ||1));
 const cx=(maxX+minX)/2,cz=(maxZ+minZ)/2,h=MAP_BOX/2;
 const at=p=>[h+(p.x-cx)*scale,h+(p.z-cz)*scale];
 const d=points.map((p,i)=>{const[x,y]=at(p);return `${i?'L':'M'}${x.toFixed(1)},${y.toFixed(1)}`;}).join(' ')+'Z';
 const[sx,sy]=at(points[0]);
 return {d,sx:sx.toFixed(1),sy:sy.toFixed(1)};
}
/* A little air so the stroke and its glow are never clipped by the viewport. */
const MAP_VIEWBOX='-9 -9 118 118';

async function buildThumbnails(){
 if(thumbnailJob)return;
 thumbnailJob=true;
 try{
  for(let i=0;i<6;i++){
   if(state!=='circuits')break;
   if(courseImages.has(i))continue;
   await new Promise(r=>requestAnimationFrame(r));
   if(state!=='circuits')break;
   const src=engine.thumbnail(i);
   courseImages.set(i,src);
   const el=document.querySelector(`[data-track="${i}"] .track-visual`);
   if(!el)continue;
   const img=document.createElement('img');
   img.className='course-image';img.alt=TRACKS[i].name+' race view';img.src=src;
   el.prepend(img);el.classList.add('rendered');
  }
 }catch(e){console.warn('Circuit preview unavailable',e);}
 finally{thumbnailJob=false;}
}

function selectTrack(i){
 selectedTrack=i;
 document.querySelectorAll('.track-card').forEach((b,j)=>{
  b.classList.toggle('selected',j===i);b.setAttribute('aria-pressed',String(j===i));
 });
 const t=TRACKS[i];
 $('trackSelected').textContent=t.name;
 $('trackDetails').textContent=t.desc+(records[i]?' Best: '+formatTime(records[i]):'');
 save();
}

/* ------------------------------------------------------------------- modal */
function modal(htmlText){
 $('modalContent').innerHTML=htmlText;
 $('modal').hidden=false;
 requestAnimationFrame(()=>{const b=$('modalContent').querySelector('button');b&&b.focus();});
}
function closeModal(){$('modal').hidden=true;}

function howTo(){
 sound.init();sound.click('select');
 modal(`<p class="eyebrow">WELCOME TO THE GRID</p><h2>Make every<br><em>corner count.</em></h2>
 <div class="how-row"><b>STEER</b><span>Tilt the phone, drag anywhere on the left of the glass, or use ◀ / ▶ and the arrow keys. Your kart accelerates automatically.</span></div>
 <div class="how-row"><b>DRIFT</b><span>Hold DRIFT (Shift) while steering. Charge the ring, then release for a boost.</span></div>
 <div class="how-row"><b>POWER-UPS</b><span>Drive through the ? boxes. Tap the item button or press Space. An XB8 MODEM hunts the kart in front of you — swerve hard if one is on your tail.</span></div>
 <div class="how-row"><b>WIN</b><span>Three laps. Seven rivals. Stay off the shoulders and hit the bright boost strips.</span></div>
 <p>Best played in landscape with sound on.</p><button class="primary" id="closeHow">GOT IT <span>→</span></button>`);
 $('closeHow').onclick=()=>{closeModal();$('play').focus();};
}

/* -------------------------------------------------------------------- race */
function startRace(){
 sound.init();sound.click('select');
 closeModal();
 const btn=$('start');
 btn.disabled=true;btn.textContent='BUILDING THE GRID…';
 /* The eight driver models are ~1.3 MB each. Await them here, behind the
    button label, so the race starts with the real cast rather than swapping
    karts mid-countdown. preloadKarts() never rejects — a missing file just
    means that driver keeps the procedural kart. Capped so a dead connection
    can't hold the start hostage. */
 const artReady = panoramaReady(selectedTrack) ? Promise.resolve() : preloadPanoramas();
 const modelsReady = Promise.race([
   Promise.all([kartsReady() ? Promise.resolve() : preloadKarts(), artReady]),
   new Promise(r=>setTimeout(r,12000))]);
 modelsReady.then(()=>setTimeout(()=>{
  try{
   engine.loadTrack(selectedTrack);
   chase.reset();
   analysis=Feel.buildTrackAnalysis(engine,TRACKS[selectedTrack]);
   race=new Race(selectedTrack,selectedDriver,engine.length,t=>engine.curvature(t),Math.random,engine.trackWorld);
   race.setWorld(engine.trackWorld,engine.halfWidths);
   Feel.applyDifficulty(race,settings.difficulty);
   state='race';paused=false;html.setAttribute('data-paused','0');
   input.releaseAll();
   $('menu').hidden=true;$('hud').hidden=false;closeModal();
   $('raceTrack').textContent=TRACKS[selectedTrack].name.toUpperCase();
   $('lapTotal').textContent='3';$('fieldSize').textContent='8';
   $('bestLap').textContent='--:--.--';$('lapTime').textContent='00:00.00';
   $('countdown').textContent='3';
   $('raceHint').hidden=false;$('raceHint').style.opacity='1';
   hintTimer=7;toastTimer=0;itemRoll=0;lastItem=null;
   clearTimeout(resultTimer);
   $('toast').classList.remove('show');$('toast').textContent='';
   pacer.reset&&pacer.reset();
   drawMinimap();
   chase.update(.016,race,engine,engine.camera,input,analysis);
   engine.sync(race,.016);
   updateHud(.016);
   /* the circuit's own song, from the top: the final-lap key change cleared in
      case the last race ended on it, and the arrangement opened at grid level
      so the score builds through the race rather than starting at the climax */
   audio.finalLap(false);
   sound.resetIntensity();
   sound.play(selectedTrack,{restart:true,intensity:.22,fade:240});
   audio.duck(.7,420);
  }catch(err){
   console.error(err);
   $('loadError').hidden=false;
  }finally{
   btn.disabled=false;btn.innerHTML='START YOUR ENGINES <span>↗</span>';
  }
 },35));
}

function togglePause(){
 if(state!=='race'||(race&&race.finished))return;
 paused=!paused;
 input.releaseAll();
 html.setAttribute('data-paused',paused?'1':'0');
 if(paused){
  sound.idle();
  modal(`<p class="eyebrow">TAKE A BREATHER</p><h2>Race <em>paused.</em></h2>
  <p>${Math.round(pacer.fps)} FPS · ${engine.quality.toUpperCase()} QUALITY</p>
  <button class="primary" id="resume">BACK TO THE RACE <span>→</span></button>
  <button class="secondary" id="restart">RESTART RACE</button>
  <button class="secondary" id="leave">CHOOSE CIRCUIT</button>`);
  $('resume').onclick=togglePause;
  $('restart').onclick=startRace;
  $('leave').onclick=()=>screen('circuits');
 }else closeModal();
}

function showToast(text,type){
 const el=$('toast');
 el.textContent=text;el.classList.add('show');
 toastTimer=1.8;
 if(type==='hit')Feel.haptic('hit');
}

/* The XB8 modem's events, routed to the one-shots audio.js already has for a
   homing projectile rather than through raceEvent(), whose 'boost' branch
   would play the boost-pad sting for a throw. The victim's own 'XB8 HIT YOU!'
   is a plain 'hit' and goes through raceEvent() like any other hit. */
const XB8_SFX={
 'XB8 AWAY!':['missile',{}],
 'XB8 INCOMING!':['missile',{vol:.45}],
 'XB8 BLOCKED BY SHIELD':['shieldBreak',{vol:.8}]
};
function xb8Audio(text){
 if(!sound.started)return false;
 if(text.indexOf('XB8 HIT ')===0)return audio.sfx('missileHit'),true;
 const s=XB8_SFX[text];
 if(!s)return false;
 audio.sfx(s[0],s[1]);return true;
}

function events(){
 for(const e of race.events){
  /* audio.js's raceEvent() takes simulation.js's emit() pair verbatim — the
     countdown, the lap chime and the final-lap key change, the item stings, the
     barrier knock — so nothing has to be translated on the way through. */
  if(sound.started&&!(e.type!=='hit'&&xb8Audio(e.text)))audio.raceEvent(e.text,e.type);
  if(e.type==='count')continue;
  showToast(e.text,e.type);
  /* Shake on a BANG, never on a grind. Kicking the camera every frame the kart
     was rubbing the rail pinned the shake at full and made it unwatchable. */
  if(e.type==='hit')chase.kick(e.text==='SCRAPE!'?.34:.6);
 }
 race.events=[];
}

function useItem(){
 if(state!=='race'||paused||!race)return;
 if(race.useItem()){events();Feel.haptic('item');}
}

/* --------------------------------------------------------------------- HUD */
function updateHud(dt){
 const p=race.player;
 const pos=race.position;
 $('position').textContent=pos;
 $('positionSuffix').textContent=ORD[pos].slice(1);
 $('lap').textContent=race.lap;
 $('timer').textContent=formatTime(race.time);
 $('lapTime').textContent=formatTime(race.lapElapsed);
 $('bestLap').textContent=race.bestLap===null?'--:--.--':formatTime(race.bestLap);

 const kmh=Math.round(p.speed*3.6);
 $('speed').textContent=kmh;
 $('speedo').style.setProperty('--spd',clamp(p.speed/58,0,1).toFixed(3));

 const charge=clamp(p.drift/3.2,0,1);
 const stage=p.drift>1.9?'2':p.drift>.65?'1':'0';
 $('driftMeter').style.width=(charge*100).toFixed(1)+'%';
 $('boostMeter').style.width=(clamp(p.boost/2.8,0,1)*100).toFixed(1)+'%';
 $('charge').setAttribute('data-stage',stage);
 const drift=$('drift');
 drift.style.setProperty('--charge',charge.toFixed(3));
 drift.setAttribute('data-stage',stage);
 $('driftLabel').textContent=p.drift>1.9?'RELEASE: ULTRA BOOST':p.drift>.65?'RELEASE TO BOOST':'HOLD DRIFT + STEER';

 /* item button: empty -> a short roulette on pickup -> ready */
 if(p.item!==lastItem){
  if(p.item!==null&&lastItem===null)itemRoll=.5;
  lastItem=p.item;
 }
 if(itemRoll>0)itemRoll=Math.max(0,itemRoll-dt);
 const item=p.item===null?null:ITEMS[p.item];
 const el=$('item');
 const wanted=item?(itemRoll>0?'rolling':'ready'):'empty';
 if(el.getAttribute('data-state')!==wanted)el.setAttribute('data-state',wanted);
 el.classList.toggle('ready',!!item&&itemRoll<=0);
 $('itemIcon').textContent=item?item.icon:'◇';
 $('itemName').textContent=item?item.name:'NO ITEM';
 el.setAttribute('aria-label',item?'Use '+item.name+': '+item.description:'No power-up collected');

 $('speedLines').classList.toggle('boosting',p.boost>0);

 /* corner cue, from feel.js — time based, not distance based */
 const c=$('cornerCue');
 c.firstElementChild.textContent=cue.active?cue.arrow:'↑';
 c.lastElementChild.textContent=cue.active?cue.text:(cue.crest?'BLIND CREST':'KEEP IT FLOWING');
 c.classList.toggle('tight',cue.active&&(cue.severity>=3||cue.risk>.6));

 updateStandings();

 if(toastTimer>0){toastTimer-=dt;if(toastTimer<=0)$('toast').classList.remove('show');}
 if(hintTimer>0){hintTimer-=dt;if(hintTimer<=0)$('raceHint').hidden=true;}
}

const standingRows=[];
function updateStandings(){
 const list=$('positionList');
 if(!standingRows.length)for(const li of list.children)standingRows.push(li);
 const order=race.ranking();
 for(let i=0;i<order.length&&i<standingRows.length;i++){
  const r=order[i],li=standingRows[i],d=DRIVERS[r.id];
  const gap=r===race.player?'—':
   (r.finish!==null?formatTime(r.finish):
    (r.distance>race.player.distance?'+':'-')+Math.abs(r.distance-race.player.distance).toFixed(0)+'m');
  if(li._name!==d.name){li.children[1].style.setProperty('--c',hex(d.color));li.children[2].textContent=d.name;li._name=d.name;}
  li.children[0].textContent=i+1;
  if(li._gap!==gap){li.children[3].textContent=gap;li._gap=gap;}
  li.classList.toggle('is-you',r===race.player);
 }
}

/* Minimap. The UI agent asked for a near-white route and a fatter player dot:
   at 104 px wide on a phone the old #a2c3e688 line was invisible in daylight. */
function drawMinimap(){
 const canvas=$('minimap'),ctx=canvas.getContext('2d');
 ctx.clearRect(0,0,180,150);
 if(!engine.frames||!race)return;
 const pts=engine.frames;
 if(mapCache.frames!==pts){
  let minX=Infinity,maxX=-Infinity,minZ=Infinity,maxZ=-Infinity;
  for(const f of pts){
   if(f.p.x<minX)minX=f.p.x;if(f.p.x>maxX)maxX=f.p.x;
   if(f.p.z<minZ)minZ=f.p.z;if(f.p.z>maxZ)maxZ=f.p.z;
  }
  mapCache.frames=pts;
  mapCache.scale=Math.min(148/(maxX-minX),118/(maxZ-minZ));
  mapCache.cx=(minX+maxX)/2;mapCache.cz=(minZ+maxZ)/2;
 }
 const {scale,cx,cz}=mapCache;
 const px=p=>90+(p.x-cx)*scale, py=p=>75+(p.z-cz)*scale;
 ctx.beginPath();
 for(let i=0;i<pts.length-1;i+=6){const p=pts[i].p;if(i===0)ctx.moveTo(px(p),py(p));else ctx.lineTo(px(p),py(p));}
 ctx.closePath();
 ctx.lineJoin=ctx.lineCap='round';
 ctx.strokeStyle='#04091e';ctx.lineWidth=9;ctx.stroke();
 ctx.strokeStyle='#eef8ff';ctx.lineWidth=3.2;ctx.stroke();
 const n=pts.length-1;
 for(const r of [...race.racers].sort((a,b)=>Number(a.isPlayer)-Number(b.isPlayer))){
  const p=pts[Math.floor(mod(r.distance/engine.length,1)*n)].p;
  ctx.beginPath();ctx.arc(px(p),py(p),r.isPlayer?6:3.2,0,Math.PI*2);
  ctx.fillStyle=r.isPlayer?'#ffffff':hex(DRIVERS[r.id].color);
  ctx.fill();
  if(r.isPlayer){ctx.strokeStyle='#39ddff';ctx.lineWidth=3;ctx.stroke();}
 }
}
const mapCache={frames:null,scale:1,cx:0,cz:0};

/* ----------------------------------------------------------------- results */
function finish(){
 state='results';
 $('countdown').textContent='FINISH!';
 $('raceHint').hidden=true;
 if(sound.started){audio.finishRace(race.position);audio.finalLap(false);}
 sound.idle();
 $('speedLines').classList.remove('boosting');
 const time=race.player.finish;
 const isBest=!records[selectedTrack]||time<records[selectedTrack];
 if(isBest)records[selectedTrack]=time;
 save();
 const pos=race.position,order=race.ranking();
 /* The results song lands with the board, not with the flag — the finish
    fanfare and the crowd need the two seconds in between to themselves. */
 setTimeout(()=>{if(state==='results')sound.play(pos===1?'victory':'results');},1400);
 clearTimeout(resultTimer);
 resultTimer=setTimeout(()=>{
  if(state!=='results')return;
  $('countdown').textContent='';
  $('hud').hidden=true;$('menu').hidden=false;
  document.querySelectorAll('.screen').forEach(el=>el.classList.toggle('active',el.id==='results'));
  $('resultsTrack').textContent=TRACKS[selectedTrack].name;
  $('resultPlace').innerHTML=String(pos)+'<small>'+ORD[pos].slice(1)+'</small>';
  $('resultTag').textContent=isBest?'NEW PERSONAL BEST':pos===1?'FLAWLESS RUN':'KEEP PUSHING';
  $('resultTime').textContent=formatTime(time);
  $('resultBest').textContent=formatTime(race.bestLap);
  $('resultsList').innerHTML=order.map((r,i)=>{
   const d=DRIVERS[r.id];
   const val=r.finish!==null?(i===0?formatTime(r.finish):'+'+(r.finish-order[0].finish).toFixed(2))
    :Math.min(99,Math.floor(r.distance/(race.length*3)*100))+'%';
   return `<li class="${r.isPlayer?'is-you':''}"><b>${i+1}</b><i style="--c:${hex(d.color)}"></i>`+
          `<span>${d.name}${r.isPlayer?' · YOU':''}</span><em>${val}</em></li>`;
  }).join('');
 },1000);
}

/* ---------------------------------------------------------------- settings */
function setScheme(name){
 settings.scheme=name;
 /* feel.js owns this now: assigning `scheme` hands ownership of the wheel to
    exactly one source and switches the others off at the listener. */
 input.scheme=name;
 html.setAttribute('data-scheme',name);
 document.querySelectorAll('[data-scheme-option]').forEach(b=>{
  const on=b.dataset.schemeOption===name;
  b.classList.toggle('on',on);b.setAttribute('aria-checked',String(on));
 });
 if(name==='tilt')enableTilt();
 save();
}
function setDifficulty(key){
 settings.difficulty=key;
 if(race)Feel.applyDifficulty(race,key);
 document.querySelectorAll('[data-difficulty]').forEach(b=>{
  const on=DIFF_ATTR[b.dataset.difficulty]===key;
  b.classList.toggle('on',on);b.setAttribute('aria-checked',String(on));
 });
 save();
}
function setQualityTier(name){
 settings.quality=name;
 html.setAttribute('data-quality',name);
 document.querySelectorAll('[data-quality-option]').forEach(b=>{
  const on=b.dataset.qualityOption===name;
  b.classList.toggle('on',on);b.setAttribute('aria-checked',String(on));
 });
 try{
  engine.setQuality(name);
  /* loadTrack() built a NEW World, so a race in flight would still be clamping
     against the old one. Same numbers either way, but a stale reference is how
     a collision bug comes back. */
  if(race&&engine.trackWorld){
   race.setWorld(engine.trackWorld,engine.halfWidths);
   race.length=engine.length;
   analysis=Feel.buildTrackAnalysis(engine,TRACKS[selectedTrack]);
   chase.reset();
  }
 }catch(e){console.warn('Quality change failed',e);}
 /* The score gives up voices with the renderer. audio.js's fuller low-power
    mode (shorter reverb tail, perc / counter / fx stems dropped) can only be
    chosen at init(), so a tier picked mid-session gets the node ceiling only —
    which is the part that actually protects the frame rate. */
 if(sound.started)audio.budget(name==='low'?90:150,name==='low'?2:4);
 save();
}
function setSensitivity(v){
 settings.sensitivity=v;
 input.setSensitivity(v);
 $('tiltSensitivity').value=String(v);
 $('tiltSensitivity').style.setProperty('--v',((v-.4)/2.1).toFixed(3));
 $('tiltSensitivityValue').textContent=v.toFixed(1)+'×';
 save();
}
function setInvert(on){
 settings.invert=on;
 input.setInvert(on);
 $('invertTilt').setAttribute('aria-checked',String(on));
 save();
}
function setVolume(which,v){
 settings[which]=v;
 const slider=$(which==='music'?'musicVolume':'sfxVolume');
 slider.value=String(v);slider.style.setProperty('--v',v.toFixed(3));
 $(which==='music'?'musicVolumeValue':'sfxVolumeValue').textContent=Math.round(v*100)+'%';
 if(which==='music')audio.musicVol(v);else audio.sfxVol(v);
 save();
}
function syncSettingsUi(){
 setScheme(settings.scheme);
 setDifficulty(settings.difficulty);
 setSensitivity(settings.sensitivity);
 setInvert(settings.invert);
 setVolume('music',settings.music);
 setVolume('sfx',settings.sfx);
 const q=settings.quality||engine.quality;
 html.setAttribute('data-quality',q);
 document.querySelectorAll('[data-quality-option]').forEach(b=>{
  const on=b.dataset.qualityOption===q;
  b.classList.toggle('on',on);b.setAttribute('aria-checked',String(on));
 });
}

async function enableTilt(){
 try{
  const ok=await input.enableTilt();
  const btn=$('tiltEnable');
  if(btn)btn.textContent=ok?'MOTION ACCESS ON':'MOTION UNAVAILABLE';
  return ok;
 }catch(e){return false;}
}

function showTiltPrompt(){
 if(settings.tiltSeen||!Feel.shouldDefaultToTilt())return;
 $('tiltPrompt').hidden=false;
}
function dismissTiltPrompt(useTilt){
 settings.tiltSeen=true;
 $('tiltPrompt').hidden=true;
 setScheme(useTilt?'tilt':'buttons');
 if(useTilt)input.recalibrateTilt();
 save();
}

/* ------------------------------------------------------------- frame pacing
   The watchdog inside graphics.js drops the tier on its own; this reports what
   is actually happening so the game is honest about its frame rate rather than
   claiming the tier the player picked. */
let healthAt=0;
function reportHealth(){
 const now=performance.now();
 if(now-healthAt<1000)return;
 healthAt=now;
 /* The graphics watchdog drops the tier on its own when the frame slips. If the
    settings screen still claimed HIGH the game would be lying about what it is
    drawing, so the control follows the renderer rather than the other way. */
 const tier=engine.quality;
 if(html.getAttribute('data-quality')!==tier){
  html.setAttribute('data-quality',tier);
  document.querySelectorAll('[data-quality-option]').forEach(b=>{
   const on=b.dataset.qualityOption===tier;
   b.classList.toggle('on',on);b.setAttribute('aria-checked',String(on));
  });
  /* Deliberately NOT persisted. graphics.js turns its own watchdog off the
     moment a tier is chosen by hand, so writing an auto-drop to localStorage
     would silently disable adaptive quality for good after one bad second. */
  /* The audio thread and the render thread are on the same phone: when the
     renderer gives up a tier, the score gives up voices too. */
  if(sound.started)audio.budget(tier==='low'?90:150,tier==='low'?2:4);
 }
 window.__blufoxHealth={fps:Math.round(pacer.fps),tier,hitches:pacer.hitches,
  slow:+pacer.slowRatio.toFixed(2),frames:pacer.frames};
}

/* --------------------------------------------------------------- main loop */
function animate(now){
 raf=requestAnimationFrame(animate);
 const dt=pacer.tick(now);
 if(state==='race'&&race&&!paused){
  input.update(dt);
  if(input.itemPressed)useItem();
  Feel.driveInput(input,race);
  race.update(dt,input);
  events();
  if(race.countdown>0)$('countdown').textContent=String(Math.ceil(race.countdown));
  else if(race.time<.7)$('countdown').textContent='GO!';
  else if($('countdown').textContent)$('countdown').textContent='';
  chase.update(dt,race,engine,engine.camera,input,analysis);
  cue.update(race,engine,analysis);
  engine.sync(race,dt);
  updateHud(dt);
  drawMinimap();
  sound.frame(dt);
  reportHealth();
  if(race.finished)finish();
 }else{
  if(input.enabled&&state!=='race')input.update(dt);
  sound.idle();
 }
}

/* -------------------------------------------------------------------- boot */
try{
 engine=new Engine($('world'));
 if(settings.quality)engine.setQuality(settings.quality);
 portraits=engine.portraits();
 preloadPanoramas();   // 1.7 MB of skylines, fetched while the player is in the menus
 { const ka=$('keyartShot'); if(ka){ka.onerror=()=>ka.removeAttribute('src'); ka.src='assets/keyart-title.webp';} }

 $('drivers').innerHTML=DRIVERS.map((d,i)=>
  `<button class="driver-card" data-driver="${i}" aria-label="Choose ${d.name}" aria-pressed="false">`+
  `<span class="num">0${i+1}</span><img src="${portraits[i]}" alt="" draggable="false"><strong>${d.name}</strong></button>`).join('');
 document.querySelectorAll('[data-driver]').forEach(b=>b.onclick=()=>{
  sound.click('move');Feel.haptic('ui');selectDriver(Number(b.dataset.driver));});

 $('trackGrid').innerHTML=TRACKS.map((t,i)=>
  `<button class="track-card" data-track="${i}" aria-pressed="false">`+
  `<div class="track-visual" style="--track-color:${hex(t.secondary)}66;--track-light:${hex(t.neon)}">`+
  `<span class="track-num">0${i+1}</span>`+
  `<svg viewBox="${MAP_VIEWBOX}" role="img" aria-label="${t.name} circuit layout">`+
  ((g=>`<path d="${g.d}"/><circle cx="${g.sx}" cy="${g.sy}" r="7"/>`)(mapGeom(t)))+`</svg>`+
  `<span class="track-theme">${t.theme}</span></div>`+
  `<div class="track-info"><strong>${t.name}</strong><small>${t.difficulty} · 3 laps${records[i]?' · '+formatTime(records[i]):''}</small></div></button>`).join('');
 document.querySelectorAll('[data-track]').forEach(b=>b.onclick=()=>{
  sound.click('move');Feel.haptic('ui');selectTrack(Number(b.dataset.track));});

 /* The item roulette's glyphs come from ITEMS, so index.html cannot drift
    from data.js (it still carried the SIGNAL PULSE bolt). */
 {const roll=$('itemRoulette');if(roll)roll.querySelectorAll('i').forEach((el,i)=>{el.textContent=ITEMS[i%ITEMS.length].icon;});}

 sound.label();
 selectDriver(selectedDriver);
 selectTrack(selectedTrack);
 syncSettingsUi();

 /* ---- input wiring ---- */
 input.attach({
  surface:$('steerPad'),left:$('left'),right:$('right'),
  drift:$('drift'),item:$('item'),brake:$('brake'),look:$('look'),
  keyTarget:window
 });
 html.setAttribute('data-look','1');

 /* ---- navigation ---- */
 $('play').onclick=()=>{sound.init();sound.click('select');screen('garage');showTiltPrompt();};
 $('brand').onclick=()=>{sound.click('back');screen('home');};
 $('how').onclick=howTo;
 $('settingsHome').onclick=()=>{sound.click('select');screen('settings');};
 $('settingsBtn').onclick=()=>{sound.click('select');screen('settings');};
 $('chooseTrack').onclick=()=>{sound.click('select');screen('circuits');};
 $('start').onclick=startRace;
 $('sound').onclick=()=>sound.toggle();
 document.querySelectorAll('[data-back]').forEach(b=>b.onclick=()=>{
  sound.click('back');screen(b.dataset.back);});
 $('pause').onclick=()=>{sound.click('back');togglePause();};

 /* ---- results ---- */
 $('raceAgain').onclick=startRace;
 $('nextCircuit').onclick=()=>{sound.click('select');selectedTrack=(selectedTrack+1)%6;screen('circuits');};
 $('changeDriver').onclick=()=>{sound.click('back');screen('garage');};

 /* ---- settings controls ---- */
 document.querySelectorAll('[data-scheme-option]').forEach(b=>b.onclick=()=>{
  sound.click();setScheme(b.dataset.schemeOption);});
 document.querySelectorAll('[data-difficulty]').forEach(b=>b.onclick=()=>{
  sound.click();setDifficulty(DIFF_ATTR[b.dataset.difficulty]);});
 document.querySelectorAll('[data-quality-option]').forEach(b=>b.onclick=()=>{
  sound.click();setQualityTier(b.dataset.qualityOption);});
 $('tiltSensitivity').oninput=e=>setSensitivity(parseFloat(e.target.value));
 $('musicVolume').oninput=e=>setVolume('music',parseFloat(e.target.value));
 $('sfxVolume').oninput=e=>setVolume('sfx',parseFloat(e.target.value));
 $('invertTilt').onclick=()=>{sound.click();setInvert(!settings.invert);};
 $('calibrate').onclick=async()=>{
  sound.click();Feel.haptic('ui');
  await enableTilt();
  input.recalibrateTilt();
  const b=$('calibrate').querySelector('b');
  if(b){b.textContent='◎ CENTRED';setTimeout(()=>{b.textContent='◎ CALIBRATE TILT';},1400);}
 };
 $('tiltEnable').onclick=()=>{sound.click();enableTilt();};
 $('tiltPromptEnable').onclick=async()=>{await enableTilt();dismissTiltPrompt(true);};
 $('tiltPromptSkip').onclick=()=>dismissTiltPrompt(false);
 $('rotateDismiss').onclick=()=>$('rotate').setAttribute('data-dismissed','1');

 /* ---- global keys ---- */
 addEventListener('keydown',e=>{
  if(e.code==='Escape'&&!e.repeat){
   if(!$('modal').hidden&&state!=='race'){closeModal();return;}
   togglePause();
  }
 });
 addEventListener('blur',()=>{input.releaseAll();if(state==='race'&&!paused)togglePause();});
 document.addEventListener('visibilitychange',()=>{
  if(document.hidden){audio.suspend();if(state==='race'&&!paused)togglePause();}
  else audio.resume();});
 $('world').addEventListener('webglcontextlost',e=>{
  e.preventDefault();
  if(state==='race'&&!paused)togglePause();
  $('loadError').hidden=false;});
 addEventListener('contextmenu',e=>{if(state==='race')e.preventDefault();});

 html.setAttribute('data-scheme',settings.scheme);
 html.setAttribute('data-paused','0');
 raf=requestAnimationFrame(animate);

 /* Verification hooks. Nothing in the game reads these. */
 window.__blufox={get race(){return race;},get engine(){return engine;},
  get input(){return input;},get chase(){return chase;},get cue(){return cue;},
  audio,sound,pacer,settings,startRace,screen:s=>screen(s),
  select:(d,t)=>{selectDriver(d);selectTrack(t);}};
}catch(err){
 console.error('Unable to initialize race',err);
 $('loadError').hidden=false;
}
