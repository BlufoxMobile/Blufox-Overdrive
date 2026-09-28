import {DRIVERS,TRACKS,mod} from './data.js';
/* ============================================================================
   BLUFOX OVERDRIVE — the handling model. Jeff loves how this drives, so the
   numbers are the ones he played. Two classes of change only:

   1. The WALL. The lane limit, the shoulder grip falloff and the side-by-side
      shove all now ask `this.world` (world.js) where the barrier is, instead of
      each carrying its own magic number. That is the fix for "you could drive
      through walls and barriers": the mesh and the clamp are now the same
      function. With no world attached the FALLBACK below reproduces the old
      literals byte for byte, so the module still runs standalone.

   2. feel.js SIM_PATCHES 1-5, all applied:
        analog-steer, analog-drift-gate, analog-centre-rate,
        difficulty-rubber-band, low-speed-authority.
      Patch 1 is the mechanical root of "difficult to play": the player's
      steering was quantised to -1/0/+1 and every analog scheme (tilt, pad,
      stick) was thrown away at the door.
   ========================================================================== */

/* Matches world.js METRICS.shoulderLane. Kept as a literal so this file has no
   import of three.js and can still be run headless. */
const SHOULDER_LANE=10;

/* ------------------------------------------------------------ THE XB8 MODEM
   The red shell. Thrown forward from an item box, it hunts the nearest kart
   ahead, bounces off the rail, and bursts on whatever it hits.

   The projectiles live in a fixed pool (`race.modems`) so neither the sim nor
   the renderer allocates per throw: engine.js keeps one mesh per slot and reads
   `state` — 0 idle, 1 flying, 2 bursting (a short timer for the impact flash).

   Turn authority is the whole balance. A kart's lateral speed tops out near
   8 m/s (control * (.45+.55*speed/55) in update()), so a modem allowed 9.5 m/s
   of lateral speed but only 34 m/s^2 of lateral acceleration can be dodged by
   a committed swerve at the last moment — and only just. Its forward speed is
   the thrower's plus 28 m/s, floored so a stunned thrower's modem still catches
   the field. */
export const MODEM_POOL=12;
const MODEM_RANGE=140;        // metres ahead it will lock on within
const MODEM_LIFE=5;           // seconds of flight with nothing to chase
const MODEM_LAUNCH=28;        // m/s added to the thrower's speed
const MODEM_MIN_SPEED=62;     // never slower than a kart at full chat
const MODEM_MAX_LAT=9.5;      // m/s lateral, ~15% over a kart's best
const MODEM_LAT_ACCEL=30;     // m/s^2 — how fast it can reverse a swerve
const MODEM_LAT_GAIN=2.8;     // lateral speed per metre of lane error: the lag that makes it dodgeable
const MODEM_HALF=.55;         // its own half-width against the barrier
const MODEM_BOUNCES=3;        // survives this many rail hits; the next one kills it
const MODEM_HIT_ALONG=2.6;    // hit window along the road (plus the swept step)
const MODEM_HIT_LANE=2.0;     // hit window across it

/* Item drop weights by where you are in the field: GIG BOOST / xFI SHIELD /
   XB8 MODEM / DEAD ZONE. The modem is the common mid-pack drop; the leader
   mostly gets defence, the tail mostly gets speed. */
const ITEM_WEIGHTS=[
 [22,40,16,22],   // 1st-2nd
 [28,14,42,16],   // 3rd-6th
 [52,10,32,6]     // 7th-8th
];

/* Used when no world is attached (unit tests, the old harnesses). Identical
   arithmetic to the pre-world simulation. */
const FALLBACK_WORLD={
 laneLimitAt(){return 11.4;},
 gripAt(t,lane){const a=Math.abs(lane);return a>SHOULDER_LANE?Math.max(.65,1-(a-SHOULDER_LANE)*.16):1;},
 clampLane(r){const lim=11.4;if(Math.abs(r.lane)<=lim)return 0;const side=Math.sign(r.lane)||1;
  const impact=Math.max(0,r.lateralSpeed*side);
  r.lane=side*lim;r.lateralSpeed*=-.18;r.speed*=.995;r.wallSide=side;
  r.wallScrape=Math.min(1.4,(r.wallScrape||0)+.28);return impact;}
};

export class Race{
 constructor(trackIndex,driverIndex,length,curvature=()=>0,random=Math.random,world=null){this.track=TRACKS[trackIndex];this.trackIndex=trackIndex;this.driverIndex=driverIndex;this.length=length;this.curvature=curvature;this.random=random;this.world=world||FALLBACK_WORLD;this.time=0;this.countdown=3.2;this.finished=false;this.events=[];this.traps=[];this.pickups=[];this.pads=[];this.player=null;this.racers=[];this.lapTimes=[];
 /* LAP TIMING STARTS AT THE LINE. The grid sits 28 m behind the start/finish
    line (world.js paints the checker at distance 0 and the grid boxes at -7 to
    -29.5), so timing lap 1 from the green light measured a different thing than
    laps 2 and 3 did: the run-up to the line was folded into it, and the lap
    board was comparing a rolling lap against a standing one. `lapStart` is now
    null until the player actually crosses distance 0, and every boundary is
    interpolated to the sub-frame instant the kart passed it rather than being
    quantised to whichever frame noticed. Race `time` still runs from GO. */
 this.lapStart=null;this.bestLap=null;
 this.modems=[];for(let i=0;i<MODEM_POOL;i++)this.modems.push({state:0,distance:0,lane:0,speed:0,lateralSpeed:0,owner:null,target:null,life:0,bounces:0,bounceFlash:0,burst:0,impact:false});
 for(let i=0;i<8;i++){const id=i===0?driverIndex:(driverIndex+i)%8;const racer={id,isPlayer:i===0,distance:i===0?-28:-(i-1)*4,lane:(i%2?1:-1)*4,speed:0,steer:0,lateralSpeed:0,boost:0,shield:0,stun:0,drift:0,drifting:false,driftDir:0,item:null,finish:null,hitCooldown:0,halfWidth:undefined,wallScrape:0,wallSide:0,aiSkill:.91+random()*.09,targetLane:(random()-.5)*14,aiThink:0,aiItemTimer:5+random()*8};this.racers.push(racer);if(i===0)this.player=racer;}
 for(let i=0;i<15;i++)this.pickups.push({distance:(i+0.45)*length/15,lane:[-7,0,7][i%3],cooldown:0});
 for(let i=0;i<6;i++)this.pads.push({distance:(i+.7)*length/6,lane:i%2?6:-6});
 }
 /* Attach the built world after construction. Also stamps each racer's solid
    half-width so a heavy kart genuinely cannot get as close to the rail as a
    light one — see world.js's wiring note. */
 setWorld(world,halfWidths){if(world)this.world=world;if(halfWidths)for(const r of this.racers)if(halfWidths[r.id]!==undefined)r.halfWidth=halfWidths[r.id];return this;}
 emit(text,type='info'){this.events.push({text,type});}
 ranking(){return [...this.racers].sort((a,b)=>{if(a.finish!==null&&b.finish!==null)return a.finish-b.finish;if(a.finish!==null)return -1;if(b.finish!==null)return 1;return b.distance-a.distance;});}
 get position(){return this.ranking().indexOf(this.player)+1;}
 get lap(){return Math.max(1,Math.min(3,Math.floor(this.player.distance/this.length)+1));}
 /* Returns what happened: 'hit', 'blocked' (shield ate it) or 'immune'
    (inside hitCooldown — two modems cannot stack on one kart). */
 hit(racer,by){if(racer.hitCooldown>0)return 'immune';if(racer.shield>0){racer.shield=0;racer.hitCooldown=1;if(racer.isPlayer)this.emit('SHIELD BLOCKED THE HIT');return 'blocked';}racer.stun=1.25;racer.speed*=.48;racer.hitCooldown=2.2;if(racer.isPlayer)this.emit(by==='xb8'?'XB8 HIT YOU!':'SIGNAL LOST!','hit');return 'hit';}
 useItem(r=this.player){if(this.countdown>0||this.finished||r.item===null)return false;const item=r.item;r.item=null;
 if(item===0){r.boost=2.8;if(r.isPlayer)this.emit('GIG BOOST!','boost');}
 if(item===1){r.shield=7;if(r.isPlayer)this.emit('xFI SHIELD ONLINE');}
 if(item===2)this.throwModem(r);
 if(item===3){this.traps.push({distance:mod(r.distance-7,this.length),lane:r.lane,life:18,owner:r});if(this.traps.length>20)this.traps.shift();if(r.isPlayer)this.emit('DEAD ZONE DEPLOYED');}return true;}
 /* ---- XB8 MODEM ---------------------------------------------------------- */
 /* Nearest live kart physically ahead of `distance` on the loop, within
    `range` metres, ignoring `skip` (the thrower). Physically ahead is the
    mod() gap: a kart a lap down but ten metres up the road is still the one
    you would hit. */
 nearestAhead(distance,range,skip){let best=null,bestD=range;for(const x of this.racers){if(x===skip||x.finish!==null)continue;const d=mod(x.distance-distance,this.length);if(d>0&&d<bestD){bestD=d;best=x;}}return best;}
 throwModem(r){
  let m=null;for(const x of this.modems){if(x.state===0){m=x;break;}}
  if(!m){m=this.modems[0];for(const x of this.modems)if(x.state===1&&x.life<m.life)m=x;}   // pool full: recycle the oldest in flight
  m.state=1;m.distance=r.distance+4.5;m.lane=r.lane;m.speed=Math.max(MODEM_MIN_SPEED,r.speed+MODEM_LAUNCH);
  m.lateralSpeed=r.lateralSpeed*.5;m.owner=r;m.target=null;m.life=MODEM_LIFE;m.bounces=0;m.bounceFlash=0;m.burst=0;m.impact=false;
  if(r.isPlayer)this.emit('XB8 AWAY!','boost');
  return m;
 }
 burstModem(m,impact){m.state=2;m.burst=.45;m.impact=impact;m.target=null;}
 updateModems(dt){
  const W=this.world,len=this.length;
  for(const m of this.modems){
   if(m.state===2){m.burst-=dt;if(m.burst<=0)m.state=0;continue;}
   if(m.state!==1)continue;
   m.life-=dt;if(m.bounceFlash>0)m.bounceFlash-=dt;
   if(m.life<=0){this.burstModem(m,false);continue;}
   /* lock-on: keep a target while it is still ahead and in range, otherwise
      pick the nearest one. Re-acquiring every frame would let two karts
      side by side make it dither between them. */
   if(m.target){const d=mod(m.target.distance-m.distance,len);if(m.target.finish!==null||d<=0||d>MODEM_RANGE*1.15)m.target=null;}
   if(!m.target){m.target=this.nearestAhead(m.distance,MODEM_RANGE,m.owner);if(m.target&&m.target.isPlayer&&m.target.hitCooldown<=0)this.emit('XB8 INCOMING!','warn');}
   const old=m.distance;m.distance+=m.speed*dt;
   /* steer: lateral speed chases the target's lane, but only as fast as the
      turn-rate bound lets it — that bound is what makes a last-second
      swerve work. With nothing to chase it straightens out. */
   const want=m.target?Math.max(-MODEM_MAX_LAT,Math.min(MODEM_MAX_LAT,(m.target.lane-m.lane)*MODEM_LAT_GAIN)):0;
   const step=MODEM_LAT_ACCEL*dt,da=want-m.lateralSpeed;
   m.lateralSpeed+=da>step?step:da<-step?-step:da;
   m.lane+=m.lateralSpeed*dt;
   /* the rail: the same laneLimitAt the karts hit, with the modem's own width */
   const t=mod(m.distance,len)/len,side=m.lane>=0?1:-1,lim=W.laneLimitAt(t,side,MODEM_HALF);
   if(Math.abs(m.lane)>lim){
    m.lane=side*lim;m.lateralSpeed=-side*Math.max(3,Math.abs(m.lateralSpeed)*.85);
    m.bounces++;m.bounceFlash=.3;
    if(m.bounces>MODEM_BOUNCES){this.burstModem(m,false);continue;}
   }
   /* impact, swept over the step so a 90 m/s modem cannot tunnel through a
      kart between two ticks. The thrower is never a candidate. */
   const mid=(old+m.distance)/2,half=(m.distance-old)/2+MODEM_HIT_ALONG;
   for(const x of this.racers){
    if(x===m.owner||x.finish!==null)continue;
    const dd=mod(x.distance-mid+len/2,len)-len/2;
    if(Math.abs(dd)<half&&Math.abs(x.lane-m.lane)<MODEM_HIT_LANE){this.modemImpact(m,x);break;}
   }
  }
 }
 modemImpact(m,x){
  const res=this.hit(x,'xb8');
  m.lane=x.lane;this.burstModem(m,true);
  if(m.owner&&m.owner.isPlayer){
   if(res==='hit')this.emit('XB8 HIT '+DRIVERS[x.id].name.toUpperCase(),'boost');
   else if(res==='blocked')this.emit('XB8 BLOCKED BY SHIELD','boost');
  }
 }
 /* What an item box hands out, weighted by where the kart is in the field. */
 rollItem(r){
  let ahead=0;for(const x of this.racers)if(x!==r&&x.finish===null&&x.distance>r.distance)ahead++;
  const w=ahead<=1?ITEM_WEIGHTS[0]:ahead<=5?ITEM_WEIGHTS[1]:ITEM_WEIGHTS[2];
  let v=this.random()*(w[0]+w[1]+w[2]+w[3]);
  for(let i=0;i<3;i++){v-=w[i];if(v<0)return i;}
  return 3;
 }
 update(dt,input={}){dt=Math.min(.05,Math.max(0,dt));this.events=[];if(this.finished)return;
 if(this.countdown>0){let old=Math.ceil(this.countdown);this.countdown-=dt;if(Math.ceil(this.countdown)!==old)this.emit(this.countdown>0?String(Math.ceil(this.countdown)):'GO!','count');return;}
 this.time+=dt;this.pickups.forEach(p=>p.cooldown=Math.max(0,p.cooldown-dt));this.traps.forEach(t=>t.life-=dt);this.traps=this.traps.filter(t=>t.life>0);
 const W=this.world;
 for(const r of this.racers){if(r.finish!==null)continue;const d=DRIVERS[r.id];r.boost=Math.max(0,r.boost-dt);r.shield=Math.max(0,r.shield-dt);r.stun=Math.max(0,r.stun-dt);r.hitCooldown=Math.max(0,r.hitCooldown-dt);const tAt=mod(r.distance,this.length)/this.length;const curve=this.curvature(tAt);let steer=0,drift=false;
 if(r.isPlayer){steer=typeof input.steer==='number'?Math.max(-1,Math.min(1,input.steer)):(input.right?1:0)-(input.left?1:0);drift=!!input.drift&&Math.abs(steer)>.15&&r.speed>20&&Math.abs(r.lane)<SHOULDER_LANE+.2;if(input.brake)r.speed=Math.max(0,r.speed-dt*35);}
 else{r.aiThink-=dt;if(r.aiThink<0){r.targetLane=(this.random()-.5)*14;r.aiThink=1.5+this.random()*2.5;}steer=Math.max(-1,Math.min(1,(r.targetLane-r.lane)*.24+curve*r.speed*r.speed*.036/(6+d.handling)));drift=Math.abs(curve)>.003&&this.random()<.9;r.aiItemTimer-=dt;
  /* A modem is held until somebody is actually in front of it to hunt;
     everything else goes on the timer as before. */
  if(r.item!==null&&r.aiItemTimer<0){if(r.item===2&&!this.nearestAhead(r.distance,MODEM_RANGE*.85,r))r.aiItemTimer=.4;else{this.useItem(r);r.aiItemTimer=3+this.random()*5;}}}
 let top=47+d.speed*1.6;if(!r.isPlayer){const delta=this.player.distance-r.distance;const rb=this.rubberBand||.045,rd=this.rubberDist||1600;top*=r.aiSkill+Math.max(-rb,Math.min(rb,delta/rd));}if(r.boost>0)top*=1.45;if(r.stun>0)top*=.42;top*=W.gripAt(tAt,r.lane);
 r.speed+=(top-r.speed)*Math.min(1,dt*(.9+d.accel*.12));
 r.steer+=(steer-r.steer)*(1-Math.exp(-dt*(Math.abs(steer)<.02?18:12)));
 const control=(5+d.handling*.8)*this.track.grip*(drift?1.12:1);const outward=-curve*r.speed*r.speed*.022/(drift?1.25:1);const targetLateral=r.steer*control*(.45+.55*r.speed/55)+outward;r.lateralSpeed+=(targetLateral-r.lateralSpeed)*(1-Math.exp(-dt*(this.track.grip<.8?8:14)));r.lane+=r.lateralSpeed*dt;
 if(drift&&r.stun<=0){r.drift=Math.min(3.2,r.drift+dt);r.driftDir=Math.sign(steer);r.drifting=true;}else if(r.drifting){if(r.drift>.65){r.boost=Math.max(r.boost,r.drift>1.9?2:1.1);if(r.isPlayer)this.emit(r.drift>1.9?'ULTRA DRIFT!':'DRIFT BOOST!','boost');}r.drift=0;r.drifting=false;r.driftDir=0;}
 const oldDist=r.distance;r.distance+=r.speed*dt;const along=mod(r.distance,this.length);
 /* The wall, clamped at the position the kart actually ENDS the tick at.
    Clamping before the distance step left a few centimetres of overrun where
    a run-off closes back up (Frostbyte t=0.44), because the barrier had moved
    inward under the kart between the clamp and the step. */
 const impact=W.clampLane(r,dt);if(impact>3.6&&r.isPlayer)this.emit('SCRAPE!','hit');
 for(const p of this.pickups){if(p.cooldown<=0&&Math.abs(along-p.distance)<3&&Math.abs(r.lane-p.lane)<2.7&&r.item===null){r.item=this.rollItem(r);p.cooldown=4;if(r.isPlayer)this.emit('POWER-UP READY');}}
 for(const p of this.pads){if(Math.abs(along-p.distance)<3.5&&Math.abs(r.lane-p.lane)<2.7){if(r.boost<.3&&r.isPlayer)this.emit('BOOST STRIP!','boost');r.boost=Math.max(r.boost,1.2);}}
 for(const t of this.traps){if(t.life>0&&t.owner!==r&&Math.abs(along-t.distance)<3&&Math.abs(r.lane-t.lane)<2.4){t.life=0;this.hit(r);}}
 /* The player crossing the start/finish line for the first time: lap 1 starts
    HERE, not at the green light. */
 if(r.isPlayer&&this.lapStart===null&&oldDist<0&&r.distance>=0)this.lapStart=this.crossedAt(r,0);
 if(Math.floor(oldDist/this.length)<Math.floor(r.distance/this.length)&&r.isPlayer&&r.distance>this.length*.9&&r.distance<this.length*3){const at=this.crossedAt(r,Math.floor(r.distance/this.length)*this.length);const lapTime=at-(this.lapStart===null?0:this.lapStart);this.lapStart=at;this.lapTimes.push(lapTime);if(this.bestLap===null||lapTime<this.bestLap)this.bestLap=lapTime;this.emit(this.lap===3?'FINAL LAP!':'LAP 2 / 3','lap');}
 if(r.distance>=this.length*3){r.finish=this.crossedAt(r,this.length*3);if(r.isPlayer){const lapTime=r.finish-(this.lapStart===null?0:this.lapStart);this.lapTimes.push(lapTime);if(this.bestLap===null||lapTime<this.bestLap)this.bestLap=lapTime;this.finished=true;}}
 }
 this.updateModems(dt);
 /* Side-by-side contact. The shove used to be clamped at a flat +/-12, which is
    outside the rail — a rival could be pushed straight through the fence. */
 for(let i=0;i<8;i++)for(let j=i+1;j<8;j++){const a=this.racers[i],b=this.racers[j];if(a.finish!==null||b.finish!==null)continue;if(Math.abs(a.distance-b.distance)<2.6&&Math.abs(a.lane-b.lane)<2.1){const dir=a.lane>=b.lane?1:-1;
  a.lane=this.limitLane(a,a.lane+dir*dt*5);b.lane=this.limitLane(b,b.lane-dir*dt*5);
  const fast=a.speed>b.speed?a:b;fast.speed=Math.max(10,fast.speed-dt*12);}}
 }
 /* The instant a racer passed `marker` metres, interpolated inside the tick it
    was noticed in. At 50 m/s one frame is 0.8 m, so without this every lap and
    every finish carried up to a frame of slop — enough to move a personal best. */
 crossedAt(r,marker){return this.time-(r.distance-marker)/Math.max(1,r.speed);}
 /* Seconds the player has been on the current lap. Zero until the line. */
 get lapElapsed(){return this.lapStart===null?0:Math.max(0,this.time-this.lapStart);}
 /* Clamp a proposed lane against the same barrier the kart is drawn hitting. */
 limitLane(r,lane){const t=mod(r.distance,this.length)/this.length,side=lane>=0?1:-1;
  const limit=this.world.laneLimitAt(t,side,r.halfWidth);
  return Math.abs(lane)>limit?side*limit:lane;}
}
