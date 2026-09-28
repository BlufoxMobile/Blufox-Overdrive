/* ============================================================================
 * feel.js — BLUFOX OVERDRIVE
 * How the game feels in the hand: input, chase camera, corner readability,
 * frame pacing and difficulty tuning.
 *
 * Jeff's verdict on the rejected build was "difficult to play" and "choppy",
 * but he liked "the turn the screen to turn the car approach" and said the
 * landscape framing was "action packed... engaging". Everything here exists to
 * keep that energy and fix the control.
 *
 * DESIGN RULES OBSERVED THROUGHOUT
 *  - No allocation in the per-frame path. Every object here is built once at
 *    construction and mutated in place. No `new`, no array literals, no
 *    closures created inside update().
 *  - All smoothing is `x += (target - x) * (1 - exp(-dt * rate))`, which is
 *    frame-rate independent, so a 30fps phone and a 120fps phone feel the same.
 *  - Nothing snaps. Snapping is what makes a chase camera nauseating.
 *  - The camera is damped in TRACK space (arc-length, lane, height) and only
 *    converted to world space at the very end. It therefore cannot cut a corner
 *    into a barrier or sink through the road — it is always over the ribbon by
 *    construction. See ChaseCamera for the full argument.
 *
 * DEPENDENCIES: none. Not even three.js — the camera talks to a
 * THREE.PerspectiveCamera through `position.set(x,y,z)`, `lookAt(x,y,z)`,
 * `rotateZ(a)` and `fov`, all of which take plain numbers.
 *
 * TYPICAL WIRING (orchestrator):
 *
 *   import * as Feel from './feel.js';
 *   const pacer  = new Feel.FramePacer();
 *   const input  = Feel.createInput({ tilt:true });     // one live object
 *   const chase  = new Feel.ChaseCamera();
 *   let analysis = null, cue = new Feel.CornerCue();
 *
 *   // after engine.loadTrack(i):
 *   analysis = Feel.buildTrackAnalysis(engine, TRACKS[i]);
 *   chase.reset();
 *   Feel.applyDifficulty(race, Feel.loadDifficulty());
 *
 *   function animate(now){
 *     const dt = pacer.tick(now);                 // clamped + hitch-proofed
 *     input.update(dt);                           // fills input.steer etc
 *     race.update(dt, input);                     // simulation.js reads it
 *     chase.update(dt, race, engine, engine.camera, input, analysis);
 *     cue.update(race, engine, analysis);          // HUD agent renders cue.*
 *   }
 * ========================================================================== */

/* ---------------------------------------------------------------------------
 * 0. Tiny math helpers (all monomorphic, all inlined by the JIT)
 * ------------------------------------------------------------------------ */

const PI2 = Math.PI * 2;
const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);
const clamp1 = v => (v < -1 ? -1 : v > 1 ? 1 : v);
const mod1 = v => ((v % 1) + 1) % 1;
/** Wrap to (-PI, PI]. */
const wrapPi = a => { a = (a + Math.PI) % PI2; if (a < 0) a += PI2; return a - Math.PI; };
/** Frame-rate independent exponential approach. rate is "per second". */
const approach = (cur, target, rate, dt) => cur + (target - cur) * (1 - Math.exp(-dt * rate));

/**
 * Dead zone + response curve, the two knobs that decide whether a control feels
 * twitchy or dead.
 *
 *  - The dead zone is *rescaled*, not merely subtracted-and-clipped, so leaving
 *    the dead zone does not produce a step. A raw step at the dead-zone edge is
 *    the single most common cause of "twitchy" tilt steering.
 *  - The curve is the classic cubic blend  n*(k + (1-k)*n^2). At n=0 the slope
 *    is k (gentle near centre: small corrections are easy), at n=1 the output
 *    is exactly 1 and the slope is 3-2k (firm at the edges: full lock still
 *    means full lock). k=0.45 gives slope 0.45 at centre, 2.1 at the edge.
 *
 * @param {number} raw    signed input, in the same units as `range`
 * @param {number} dead   dead zone, same units
 * @param {number} range  input value that should map to full lock
 * @param {number} k      centre gentleness, 0.2 (very gentle) .. 1 (linear)
 * @returns {number} -1..1
 */
export function shape(raw, dead, range, k) {
  const a = Math.abs(raw);
  if (a <= dead) return 0;                       // exact zero: rest is rest
  const span = range - dead;
  let n = span > 1e-6 ? (a - dead) / span : 0;
  if (n > 1) n = 1;
  const curved = n * (k + (1 - k) * n * n);
  return raw < 0 ? -curved : curved;
}

/* ---------------------------------------------------------------------------
 * 1. FramePacer — "it was choppy" is a named complaint, so this is not optional
 * ------------------------------------------------------------------------ */

/**
 * Turns `requestAnimationFrame` timestamps into a dt the simulation can trust.
 *
 * Three separate jobs:
 *
 *  1. CLAMP. dt is hard-limited to [minDt, maxDt]. A tab that was backgrounded
 *     for 4 seconds must not advance the race 4 seconds and teleport the kart
 *     through a wall. (simulation.js clamps to 0.05 internally as well; this
 *     clamp exists so the *camera* and the input filters get the same dt.)
 *
 *  2. HITCH ABSORPTION. A single long frame — a GC pause, a shader compile, iOS
 *     deciding to reflow the address bar — produces one huge dt. Feeding that
 *     straight in makes the kart jump, which reads as much worse than the
 *     dropped frame itself. When dt exceeds `spikeRatio` x the running average,
 *     we hand back the average instead and let the world run fractionally slow
 *     for one frame. Nobody can see 16ms of missing time; everybody can see a
 *     kart jump two metres.
 *
 *  3. VSYNC SNAPPING. rAF timestamps jitter by a millisecond or two even on a
 *     perfectly paced 60Hz display. If dt is within `snapTol` of a common
 *     refresh interval we snap it to that interval exactly. This removes a
 *     visible low-amplitude judder in the scenery that is otherwise very hard
 *     to diagnose and is, on a phone, a large part of what "choppy" means.
 *
 * Also keeps cheap health telemetry (`fps`, `hitches`, `slowRatio`) so a
 * quality-scaling agent can drop resolution on a device that cannot keep up.
 */
export class FramePacer {
  constructor(opts) {
    const o = opts || {};
    this.maxDt = o.maxDt != null ? o.maxDt : 0.050;   // 20fps floor
    this.minDt = o.minDt != null ? o.minDt : 0.004;   // 250fps ceiling
    this.spikeRatio = o.spikeRatio != null ? o.spikeRatio : 2.2;
    this.snapTol = o.snapTol != null ? o.snapTol : 0.0012;
    this.smoothRate = o.smoothRate != null ? o.smoothRate : 0.10;
    this.slowFrameDt = o.slowFrameDt != null ? o.slowFrameDt : 0.024; // ~>41fps is "slow"
    /**
     * How many long frames in a row we are willing to call a hitch before we
     * accept that this is simply how fast the device is. Without this the
     * absorber is a trap: a phone that genuinely runs at 20fps would have every
     * single frame absorbed, `avg` would stay pinned at 1/60, and the whole
     * game would run three times slower than real time forever. Found by
     * running the real build on the software renderer, where every frame is
     * long; it does not show up in a synthetic test that feeds nice numbers.
     */
    this.maxAbsorb = o.maxAbsorb != null ? o.maxAbsorb : 3;

    this.last = 0;
    this.avg = 1 / 60;        // running average of good frames
    this.dt = 1 / 60;         // last value handed out
    this.raw = 1 / 60;        // last value before clamping/absorption
    this.rawAvg = 1 / 60;     // average of RAW frame times, hitches included
    this.fps = 60;            // honest frame rate, from rawAvg
    this._runLong = 0;
    this.hitches = 0;         // frames absorbed since reset
    this.frames = 0;
    this.slowFrames = 0;
    this.slowRatio = 0;
    this._snaps = [1 / 120, 1 / 90, 1 / 60, 1 / 50, 1 / 30]; // built once
  }

  /** Call once per rAF. @param {number} now performance.now()-style ms */
  tick(now) {
    if (!this.last) { this.last = now; this.dt = this.avg; return this.dt; }
    let dt = (now - this.last) / 1000;
    this.last = now;
    if (!(dt > 0)) dt = this.avg;            // NaN / zero / backwards clock
    this.raw = dt;

    // (2) hitch absorption, before the clamp so we also catch 60ms..maxDt spikes
    let hitch = false;
    if (dt > this.avg * this.spikeRatio && dt > 0.028) {
      if (this._runLong < this.maxAbsorb) { hitch = true; this._runLong++; dt = this.avg; }
      else {
        // Sustained: this is the device's real speed, not a hitch. Catch the
        // baseline up quickly so we stop mislabelling every frame.
        this._runLong = 0;
        this.avg += (Math.min(dt, this.maxDt) - this.avg) * 0.5;
      }
    } else this._runLong = 0;

    // (1) clamp
    if (dt > this.maxDt) dt = this.maxDt;
    else if (dt < this.minDt) dt = this.minDt;

    // (3) vsync snap
    const snaps = this._snaps;
    for (let i = 0; i < snaps.length; i++) {
      const s = snaps[i];
      if (dt > s - this.snapTol && dt < s + this.snapTol) { dt = s; break; }
    }

    // telemetry + running average (good frames only, so one hitch cannot
    // poison the baseline and cause a cascade of false hitches)
    this.frames++;
    if (hitch) this.hitches++;
    else this.avg += (dt - this.avg) * this.smoothRate;
    if (this.raw > this.slowFrameDt) this.slowFrames++;
    this.slowRatio = this.frames > 0 ? this.slowFrames / this.frames : 0;
    this.rawAvg += (Math.min(this.raw, 1) - this.rawAvg) * 0.10;
    this.fps = 1 / this.rawAvg;   // what the player actually sees
    this.dt = dt;
    return dt;
  }

  /** Call when the race starts, or after a pause, so the first dt is sane. */
  reset() {
    this.last = 0; this.avg = 1 / 60; this.dt = 1 / 60; this.rawAvg = 1 / 60;
    this.frames = 0; this.hitches = 0; this.slowFrames = 0; this.slowRatio = 0;
    this._runLong = 0; this.fps = 60;
  }
}

/* ---------------------------------------------------------------------------
 * 2. OneEuro — the smoothing filter for tilt
 * ------------------------------------------------------------------------ */

/**
 * A one-euro filter (Casiez, Roussel & Vogel 2012), ~20 lines and exactly the
 * right tool for a hand-held sensor.
 *
 * A plain low-pass has to choose between "kills hand tremor" and "does not lag
 * a deliberate movement". One-euro does both: the cutoff frequency rises with
 * the measured speed of the signal. When the hand is still it filters hard, so
 * a resting hand produces a dead-still kart; when the player actually leans
 * into a corner the cutoff opens up and the lag collapses to a few
 * milliseconds. This is what separates tilt steering that feels precise from
 * tilt steering that feels like steering a boat.
 *
 * No allocation: three numbers of state.
 */
export class OneEuro {
  constructor(minCutoff, beta, dCutoff) {
    this.minCutoff = minCutoff != null ? minCutoff : 1.1;  // Hz at rest
    this.beta = beta != null ? beta : 0.55;                // speed coefficient
    this.dCutoff = dCutoff != null ? dCutoff : 1.0;        // Hz for the derivative
    this.x = 0; this.dx = 0; this.started = false;
  }
  static _alpha(cutoff, dt) {
    const tau = 1 / (PI2 * cutoff);
    return 1 / (1 + tau / dt);
  }
  filter(value, dt) {
    if (!this.started) { this.started = true; this.x = value; this.dx = 0; return value; }
    if (!(dt > 0)) return this.x;
    const dRaw = (value - this.x) / dt;
    const ad = OneEuro._alpha(this.dCutoff, dt);
    this.dx += ad * (dRaw - this.dx);
    const cutoff = this.minCutoff + this.beta * Math.abs(this.dx);
    const a = OneEuro._alpha(cutoff, dt);
    this.x += a * (value - this.x);
    return this.x;
  }
  reset(value) { this.started = value != null; this.x = value || 0; this.dx = 0; }
}

/* ---------------------------------------------------------------------------
 * 3. TiltSteering — his favourite control, so it gets the most care
 * ------------------------------------------------------------------------ */

/**
 * HOW THE ANGLE IS DERIVED, AND WHY IT CANNOT INVERT
 * --------------------------------------------------
 * `deviceorientation` gives alpha/beta/gamma in the DEVICE frame. From beta and
 * gamma alone (alpha, the compass heading, is deliberately ignored — it drifts
 * and it is irrelevant to steering) the world's *down* vector in device
 * coordinates is exactly:
 *
 *     gx =  cos(beta) * sin(gamma)
 *     gy = -sin(beta)
 *     gz = -cos(beta) * cos(gamma)
 *
 * The screen frame is the device frame rotated about the shared z axis (the
 * screen normal) by `screen.orientation.angle`. So:
 *
 *     sx = gx*cos(t) - gy*sin(t)
 *     sy = gx*sin(t) + gy*cos(t)
 *     sz = gz
 *
 * Then the steering angle is
 *
 *     steerAngle = atan2(sx, hypot(sy, sz))
 *
 * i.e. how far gravity has moved off the screen's vertical plane. Read it as
 * "which way would a marble roll across the screen, and how hard". This one
 * expression is the whole trick, and it has three properties we need:
 *
 *  1. PITCH INDEPENDENT. Tilting the phone towards or away from your face moves
 *     gravity between sy and sz, and `hypot(sy,sz)` is unchanged. A player
 *     holding the phone near-vertical, at 45 degrees, or flat in their lap all
 *     get the same steering response from the same wrist rotation. Most naive
 *     implementations use gamma directly and go haywire when the phone is flat.
 *  2. ORIENTATION SAFE. Landscape-left and landscape-right differ only by
 *     `screen.orientation.angle` (90 vs 270), which is applied above, so the
 *     sign is correct in both without a special case.
 *  3. SELF-CHECKING. When the phone is held anything like upright, sy must be
 *     negative — gravity points towards the bottom of the screen. If we see a
 *     confidently positive sy we know the platform reports the rotation with
 *     the opposite sign, and we flip `angleSign` once. That turns a
 *     famously-inconsistent platform constant into something measured rather
 *     than remembered.
 *
 * Sign: rotating the phone anticlockwise as you look at it (left edge down) is
 * "turn the wheel left". That puts gravity towards screen -x, so sx < 0, so
 * steerAngle < 0, which is the simulation's "left". No negation anywhere.
 *
 * iOS 13+ : `DeviceOrientationEvent.requestPermission()` must be called from
 * inside a real user gesture or it rejects, and without it the event simply
 * never fires — silently. See `requestTiltPermission` and `tiltNeedsPermission`.
 */
export class TiltSteering {
  constructor(opts) {
    const o = opts || {};
    /** full-lock wrist angle in radians at sensitivity 1 (24 deg) */
    this.baseRange = o.range != null ? o.range : 0.42;
    /** dead zone in radians (~1.7 deg) */
    this.dead = o.dead != null ? o.dead : 0.030;
    /** centre gentleness for shape(); lower = gentler around centre */
    this.curve = o.curve != null ? o.curve : 0.45;
    /** 0.5 (lazy) .. 2 (hair trigger). 1 = 24 deg for full lock. */
    this.sensitivity = o.sensitivity != null ? o.sensitivity : 1;
    /** flips steering for a player who wants it backwards */
    this.invert = !!o.invert;
    /** continuous re-centre while the player is not really steering */
    this.autoTrim = o.autoTrim !== false;

    this.value = 0;          // shaped, smoothed, -1..1  <-- the output
    this.angle = 0;          // current raw steer angle, radians
    this.reference = 0;      // calibrated neutral, radians
    this.magnitude = 0;      // |gravity| horizontal confidence, 0..1
    this.available = false;  // has the API
    this.live = false;       // events are actually arriving
    this.permission = 'unknown'; // unknown | granted | denied | not-required
    this.calibrated = false;
    this.screenAngle = 0;
    this.angleSign = 1;      // set by the self-check described above
    this.samples = 0;

    this._filter = new OneEuro(o.minCutoff != null ? o.minCutoff : 1.2,
                               o.beta != null ? o.beta : 0.6, 1.0);
    this._calSum = 0; this._calN = 0; this._calWant = 0;
    this._lastEvent = 0;
    this._quietFor = 0;
    this._prevAngle = 0;
    this._sy = 0; this._sx = 0; this._sz = -1;
    this._flipChecked = false;
    this._onOrient = this._onOrient.bind(this);
    this._onMotion = this._onMotion.bind(this);
    this._onScreen = this._onScreen.bind(this);
    this._motionAttached = false;
    this.available = typeof window !== 'undefined' &&
      (typeof window.DeviceOrientationEvent !== 'undefined' ||
       typeof window.DeviceMotionEvent !== 'undefined');
  }

  /** True on iOS 13+ where a gesture-scoped permission prompt is mandatory. */
  static needsPermission() {
    return typeof window !== 'undefined' &&
      typeof window.DeviceOrientationEvent !== 'undefined' &&
      typeof window.DeviceOrientationEvent.requestPermission === 'function';
  }

  /**
   * MUST be called synchronously from a user gesture handler (pointerdown on a
   * button). Anything else — a promise continuation, a timeout, page load —
   * and iOS rejects without a prompt and tilt silently never works.
   * @returns {Promise<boolean>}
   */
  async requestPermission() {
    if (!TiltSteering.needsPermission()) { this.permission = 'not-required'; return true; }
    try {
      const res = await window.DeviceOrientationEvent.requestPermission();
      this.permission = res === 'granted' ? 'granted' : 'denied';
      return res === 'granted';
    } catch (e) {
      this.permission = 'denied';
      return false;
    }
  }

  /** Attach listeners. Safe to call twice. */
  start() {
    if (this._started || typeof window === 'undefined') return;
    this._started = true;
    this._readScreenAngle();
    window.addEventListener('deviceorientation', this._onOrient, { passive: true });
    if (window.screen && window.screen.orientation && window.screen.orientation.addEventListener)
      window.screen.orientation.addEventListener('change', this._onScreen);
    window.addEventListener('orientationchange', this._onScreen);
    // Some Android browsers never fire `deviceorientation` but do fire
    // `devicemotion`. If nothing has arrived shortly after we start, fall back.
    this._fallbackTimer = setTimeout(() => {
      if (!this.live && typeof window.DeviceMotionEvent !== 'undefined') {
        window.addEventListener('devicemotion', this._onMotion, { passive: true });
        this._motionAttached = true;
      }
    }, 1200);
    this.recalibrate();
  }

  stop() {
    if (!this._started || typeof window === 'undefined') return;
    this._started = false;
    clearTimeout(this._fallbackTimer);
    window.removeEventListener('deviceorientation', this._onOrient);
    if (this._motionAttached) window.removeEventListener('devicemotion', this._onMotion);
    this._motionAttached = false;
    if (window.screen && window.screen.orientation && window.screen.orientation.removeEventListener)
      window.screen.orientation.removeEventListener('change', this._onScreen);
    window.removeEventListener('orientationchange', this._onScreen);
    this.live = false; this.value = 0; this._filter.reset();
  }

  /**
   * Re-calibrate to whatever angle the player is actually holding the phone at.
   * Averages the next `samples` readings rather than snapping to one, so a
   * twitch at the moment of tapping "CALIBRATE" does not become the new
   * neutral. Called automatically on start and on every orientation change.
   */
  recalibrate(samples) {
    this._calWant = samples != null ? samples : 14;
    this._calSum = 0; this._calN = 0;
    this.calibrated = false;
    this._flipChecked = false;
    this._filter.reset();
    this.value = 0;
  }

  _readScreenAngle() {
    let a = 0;
    if (typeof window === 'undefined') { this.screenAngle = 0; return; }
    if (window.screen && window.screen.orientation && typeof window.screen.orientation.angle === 'number')
      a = window.screen.orientation.angle;
    else if (typeof window.orientation === 'number') a = window.orientation;
    this.screenAngle = ((a % 360) + 360) % 360;
  }

  _onScreen() {
    this._readScreenAngle();
    // Landscape-left -> landscape-right is a 180 degree change. Re-deriving the
    // neutral (and re-running the sy self-check) is the only way to guarantee
    // we never hand back an inverted steer across the rotation.
    this.recalibrate(10);
  }

  /** Feed a gravity vector already expressed in DEVICE coordinates. */
  _ingest(gx, gy, gz) {
    // Math.hypot is variadic and allocates in V8; this runs every sensor event.
    const len = Math.sqrt(gx * gx + gy * gy + gz * gz);
    if (!(len > 0.2)) return;                         // free-fall / garbage
    gx /= len; gy /= len; gz /= len;

    const t = this.screenAngle * this.angleSign * Math.PI / 180;
    const c = Math.cos(t), s = Math.sin(t);
    const sx = gx * c - gy * s;
    const sy = gx * s + gy * c;
    const sz = gz;
    this._sx = sx; this._sy = sy; this._sz = sz;

    // Self-check (see class doc): with the phone anything like upright, gravity
    // must point towards the bottom of the screen.
    if (!this._flipChecked && Math.abs(sy) > 0.45) {
      this._flipChecked = true;
      if (sy > 0) { this.angleSign = -this.angleSign; this._calSum = 0; this._calN = 0; return; }
    }

    const angle = Math.atan2(sx, Math.sqrt(sy * sy + sz * sz));
    this.angle = angle;
    this.magnitude = clamp(Math.sqrt(sx * sx + sy * sy) / 0.6, 0, 1);
    this.samples++;
    this.live = true;
    this._lastEvent = 0;

    if (this._calN < this._calWant) {
      this._calSum += angle; this._calN++;
      if (this._calN >= this._calWant) {
        this.reference = this._calSum / this._calN;
        this.calibrated = true;
      }
    }
  }

  _onOrient(e) {
    if (e.beta == null || e.gamma == null) return;
    const b = e.beta * Math.PI / 180, g = e.gamma * Math.PI / 180;
    const cb = Math.cos(b);
    this._ingest(cb * Math.sin(g), -Math.sin(b), -cb * Math.cos(g));
  }

  _onMotion(e) {
    const a = e.accelerationIncludingGravity;
    if (!a || a.x == null) return;
    // accelerationIncludingGravity points opposite to gravity, hence the sign.
    this._ingest(-a.x, -a.y, -a.z);
  }

  /**
   * Advance the filter and produce `this.value`. Call once per frame.
   * @returns {number} -1..1, exactly 0 when the phone is at its neutral angle.
   */
  update(dt) {
    if (!this.live) { this.value = 0; return 0; }
    this._lastEvent += dt;
    if (this._lastEvent > 1.5) { this.live = false; this.value = 0; return 0; } // sensor died

    const rel = wrapPi(this.angle - this.reference);
    const range = this.baseRange / clamp(this.sensitivity, 0.4, 2.5);
    let v = shape(rel, this.dead, range, this.curve);
    v = this._filter.filter(v, dt);
    if (Math.abs(v) < 0.0025) v = 0;                 // returns cleanly to rest
    v = clamp1(v);
    this.value = this.invert ? -v : v;

    // Slow auto-trim. Only while the player is demonstrably not steering: small
    // output AND a still wrist. Cornering holds a large steady angle, so this
    // cannot creep the neutral away during a long corner, but it does follow a
    // player who slowly reclines over a three-lap race.
    if (this.autoTrim && this.calibrated) {
      const rate = Math.abs(wrapPi(this.angle - this._prevAngle)) / Math.max(dt, 1e-4);
      if (Math.abs(this.value) < 0.20 && rate < 0.25) {
        this._quietFor += dt;
        if (this._quietFor > 1.2) this.reference = approach(this.reference, this.angle, 0.25, dt);
      } else this._quietFor = 0;
    }
    this._prevAngle = this.angle;
    return this.value;
  }
}

/** Convenience for the settings screen: does this device need the iOS prompt? */
export const tiltNeedsPermission = () => TiltSteering.needsPermission();

/**
 * Should tilt be the default scheme here? True on a touch device with motion
 * sensors — i.e. a phone, which is the primary target and the device Jeff was
 * holding when he said he liked "the turn the screen to turn the car approach".
 *
 * THE GESTURE RULE, because getting this wrong is silent and total: on iOS 13+
 * `DeviceOrientationEvent.requestPermission()` only prompts when it is called
 * from inside a real user gesture. Not from page load, not from a `setTimeout`,
 * not from a promise continuation after an `await`. If it is called anywhere
 * else it rejects with no prompt and `deviceorientation` never fires again for
 * that page load — tilt appears to be simply broken, with no error anywhere.
 *
 * So the UI needs a button, and its handler must be:
 *
 *     tiltButton.addEventListener('pointerdown', () => {
 *       input.enableTilt().then(ok => { ... });      // call, THEN await
 *     });
 *
 * Do not put an `await` before `enableTilt()`. There is also a "CALIBRATE"
 * control to wire to `input.recalibrateTilt()`; the player will want it the
 * first time they change how they are sitting.
 */
export function shouldDefaultToTilt() {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  const touch = (navigator.maxTouchPoints || 0) > 0 || 'ontouchstart' in window;
  const motion = typeof window.DeviceOrientationEvent !== 'undefined';
  return touch && motion;
}

/* ---------------------------------------------------------------------------
 * 4. TouchPad — analog, left half, floating origin
 * ------------------------------------------------------------------------ */

/**
 * Drag anywhere on the left half of the screen. The origin is wherever the
 * thumb lands, which means the player never has to find a control; and it
 * FLOATS: if the thumb reaches full lock and keeps going, the origin slides
 * along with it, so the thumb can run out of physical travel at the edge of the
 * glass and the player can still come back to centre by moving the other way.
 * Without this, a thumb that runs out of screen is stuck at full lock, which is
 * exactly the "difficult to play" failure mode on a phone.
 *
 * Only horizontal movement is read. Vertical drag is ignored deliberately —
 * thumbs arc, and an arcing thumb that also brakes feels broken.
 */
export class TouchPad {
  constructor(opts) {
    const o = opts || {};
    this.enabled = o.enabled !== false;
    /** px of travel for full lock, at a nominal 390px-tall phone */
    this.travel = o.travel != null ? o.travel : 78;
    this.dead = o.dead != null ? o.dead : 4;      // px
    this.curve = o.curve != null ? o.curve : 0.5;
    this.sensitivity = o.sensitivity != null ? o.sensitivity : 1;
    /** fraction of the viewport width that is steering surface */
    this.zone = o.zone != null ? o.zone : 0.55;
    /** top fraction of the screen reserved for HUD (no steering there) */
    this.topGuard = o.topGuard != null ? o.topGuard : 0.22;

    this.value = 0;
    this.active = false;
    this.originX = 0;
    this.x = 0;
    this.pointerId = -1;
    this._filter = new OneEuro(3.0, 0.4, 1.0);   // lighter than tilt; touch is already smooth
    this._el = null;
    this._down = this._down.bind(this);
    this._move = this._move.bind(this);
    this._up = this._up.bind(this);
  }

  /** @param {HTMLElement} el usually the canvas or a full-screen overlay */
  attach(el) {
    if (this._el) this.detach();
    this._el = el;
    el.addEventListener('pointerdown', this._down);
    el.addEventListener('pointermove', this._move);
    el.addEventListener('pointerup', this._up);
    el.addEventListener('pointercancel', this._up);
    el.addEventListener('lostpointercapture', this._up);
  }

  detach() {
    const el = this._el; if (!el) return;
    el.removeEventListener('pointerdown', this._down);
    el.removeEventListener('pointermove', this._move);
    el.removeEventListener('pointerup', this._up);
    el.removeEventListener('pointercancel', this._up);
    el.removeEventListener('lostpointercapture', this._up);
    this._el = null; this.release();
  }

  release() { this.active = false; this.pointerId = -1; this.value = 0; this._filter.reset(0); }

  _inZone(e) {
    const w = (this._el && this._el.clientWidth) || (typeof innerWidth !== 'undefined' ? innerWidth : 844);
    const h = (this._el && this._el.clientHeight) || (typeof innerHeight !== 'undefined' ? innerHeight : 390);
    return e.clientX <= w * this.zone && e.clientY >= h * this.topGuard;
  }

  _down(e) {
    if (!this.enabled || this.active) return;
    // A press on a HUD button must never also start a steer drag.
    if (e.target && e.target.closest && e.target.closest('button,[data-nosteer]')) return;
    if (!this._inZone(e)) return;
    this.active = true;
    this.pointerId = e.pointerId;
    this.originX = e.clientX;
    this.x = e.clientX;
    this._filter.reset(0);
    if (this._el && this._el.setPointerCapture) { try { this._el.setPointerCapture(e.pointerId); } catch (err) {} }
  }

  _move(e) {
    if (!this.active || e.pointerId !== this.pointerId) return;
    this.x = e.clientX;
    const t = this._travelPx();
    const d = this.x - this.originX;
    // Floating origin: never let the offset exceed full lock; drag the origin.
    if (d > t) this.originX = this.x - t;
    else if (d < -t) this.originX = this.x + t;
  }

  _up(e) { if (this.active && e.pointerId === this.pointerId) this.release(); }

  _travelPx() {
    const h = (this._el && this._el.clientHeight) || (typeof innerHeight !== 'undefined' ? innerHeight : 390);
    // Scale travel with the short edge so a tablet is not hypersensitive.
    return Math.max(34, this.travel * (h / 390)) / clamp(this.sensitivity, 0.4, 2.5);
  }

  update(dt) {
    // A pad that has been switched off mid-drag (the player changed scheme with
    // a thumb down) must let go of the wheel, not keep asserting its last value.
    if (!this.enabled && this.active) this.release();
    if (!this.active) {
      // Ease back to centre rather than dropping to zero, so lifting the thumb
      // mid-corner does not snap the kart straight.
      this.value = approach(this.value, 0, 16, dt);
      if (Math.abs(this.value) < 0.004) this.value = 0;
      return this.value;
    }
    const t = this._travelPx();
    let v = shape(this.x - this.originX, this.dead, t, this.curve);
    v = this._filter.filter(v, dt);
    if (Math.abs(v) < 0.004) v = 0;
    this.value = clamp1(v);
    return this.value;
  }
}

/* ---------------------------------------------------------------------------
 * 5. Digital sources: on-screen arrows, keyboard, gamepad
 * ------------------------------------------------------------------------ */

/**
 * Version A's #left / #right buttons. Some people simply prefer buttons and
 * they must stay.
 *
 * Two details that matter:
 *  - `pointerdown`, never `click`. `click` waits for pointerup, which on a
 *    phone means every steering input is late by however long the finger is
 *    down. This alone makes a game feel unresponsive.
 *  - The output RAMPS rather than snapping to +/-1. A digital button that
 *    slams the steering to full lock in one frame is the twitchiest possible
 *    control; 0.13s to full lock is still instant to a human but lets the
 *    handling model settle.
 */
export class HoldButtons {
  constructor(opts) {
    const o = opts || {};
    this.rise = o.rise != null ? o.rise : 9;    // per second towards the target
    this.fall = o.fall != null ? o.fall : 15;   // per second back to centre
    /** false when another scheme owns steering — see InputHub._applyScheme */
    this.enabled = o.enabled !== false;
    this.value = 0;
    this.left = false;
    this.right = false;
    this._bound = [];
  }

  /**
   * @param {HTMLElement} el
   * @param {'left'|'right'} dir
   */
  bind(el, dir) {
    if (!el) return;
    const self = this;
    const down = e => {
      e.preventDefault();
      if (!self.enabled) return;
      if (dir === 'left') self.left = true; else self.right = true;
      el.classList.add('pressed');
      try { el.setPointerCapture(e.pointerId); } catch (err) {}
    };
    const up = e => {
      if (dir === 'left') self.left = false; else self.right = false;
      el.classList.remove('pressed');
    };
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    el.addEventListener('lostpointercapture', up);
    this._bound.push([el, down, up]);
  }

  releaseAll() { this.left = this.right = false; this.value = 0; for (const b of this._bound) b[0].classList.remove('pressed'); }

  update(dt) {
    const target = (this.right ? 1 : 0) - (this.left ? 1 : 0);
    const rate = target === 0 ? this.fall : this.rise;
    this.value = approach(this.value, target, rate, dt);
    if (target === 0 && Math.abs(this.value) < 0.004) this.value = 0;
    return this.value;
  }
}

/** Keyboard steering with the same ramp as the on-screen arrows. */
export class KeyboardSteering {
  constructor(opts) {
    const o = opts || {};
    this.rise = o.rise != null ? o.rise : 10;
    this.fall = o.fall != null ? o.fall : 16;
    this.value = 0;
    this.left = false; this.right = false;
    this.drift = false; this.brake = false; this.look = false;
    this.itemEdge = 0; this.driftEdge = 0;
    this._down = this._down.bind(this);
    this._up = this._up.bind(this);
  }
  attach(target) {
    this._target = target || window;
    this._target.addEventListener('keydown', this._down);
    this._target.addEventListener('keyup', this._up);
  }
  detach() {
    if (!this._target) return;
    this._target.removeEventListener('keydown', this._down);
    this._target.removeEventListener('keyup', this._up);
    this._target = null;
  }
  releaseAll() { this.left = this.right = this.drift = this.brake = this.look = false; this.value = 0; }
  _down(e) {
    switch (e.code) {
      case 'ArrowLeft': case 'KeyA': this.left = true; e.preventDefault(); break;
      case 'ArrowRight': case 'KeyD': this.right = true; e.preventDefault(); break;
      case 'ShiftLeft': case 'ShiftRight':
        if (!this.drift) this.driftEdge++; this.drift = true; e.preventDefault(); break;
      case 'ArrowDown': case 'KeyS': this.brake = true; e.preventDefault(); break;
      case 'KeyC': this.look = true; break;
      case 'Space': if (!e.repeat) this.itemEdge++; e.preventDefault(); break;
      default: break;
    }
  }
  _up(e) {
    switch (e.code) {
      case 'ArrowLeft': case 'KeyA': this.left = false; break;
      case 'ArrowRight': case 'KeyD': this.right = false; break;
      case 'ShiftLeft': case 'ShiftRight': this.drift = false; break;
      case 'ArrowDown': case 'KeyS': this.brake = false; break;
      case 'KeyC': this.look = false; break;
      default: break;
    }
  }
  update(dt) {
    const target = (this.right ? 1 : 0) - (this.left ? 1 : 0);
    this.value = approach(this.value, target, target === 0 ? this.fall : this.rise, dt);
    if (target === 0 && Math.abs(this.value) < 0.004) this.value = 0;
    return this.value;
  }
}

/**
 * Gamepad. Polled, because the Gamepad API has no events for axes.
 * Standard mapping: left stick X or dpad steers, A/RT drift, X/LT item, B brake.
 */
export class GamepadSteering {
  constructor(opts) {
    const o = opts || {};
    this.dead = o.dead != null ? o.dead : 0.14;
    this.curve = o.curve != null ? o.curve : 0.5;
    this.sensitivity = o.sensitivity != null ? o.sensitivity : 1;
    this.value = 0; this.connected = false;
    this.drift = false; this.brake = false; this.item = false; this.look = false;
    this.driftEdge = 0; this.itemEdge = 0;
    this._pDrift = false; this._pItem = false;
  }
  update() {
    this.connected = false; this.value = 0;
    if (typeof navigator === 'undefined' || !navigator.getGamepads) return 0;
    const pads = navigator.getGamepads();
    let pad = null;
    for (let i = 0; i < pads.length; i++) if (pads[i] && pads[i].connected) { pad = pads[i]; break; }
    if (!pad) { this.drift = this.brake = this.item = false; this._pDrift = this._pItem = false; return 0; }
    this.connected = true;
    const ax = pad.axes && pad.axes.length > 0 ? pad.axes[0] : 0;
    let raw = shape(ax, this.dead, 1 / clamp(this.sensitivity, 0.4, 2.5), this.curve);
    const b = pad.buttons || [];
    const hit = i => !!(b[i] && (b[i].pressed || b[i].value > 0.5));
    if (hit(14)) raw = -1; else if (hit(15)) raw = 1;      // dpad overrides
    this.value = clamp1(raw);
    const drift = hit(0) || hit(7) || hit(5);
    const item = hit(2) || hit(6) || hit(4);
    this.brake = hit(1);
    this.look = hit(3);
    if (drift && !this._pDrift) this.driftEdge++;
    if (item && !this._pItem) this.itemEdge++;
    this._pDrift = drift; this._pItem = item;
    this.drift = drift; this.item = item;
    return this.value;
  }
}

/* ---------------------------------------------------------------------------
 * 6. InputHub — one live object, read once per frame
 * ------------------------------------------------------------------------ */

/**
 * The single object the game reads. Created once, mutated in place forever, so
 * reading input costs nothing and allocates nothing.
 *
 * Shape (all fields always present):
 *   steer         -1..1 analog, the authoritative steering value
 *   left, right   booleans derived from `steer`, ONLY so that an unmodified
 *                 simulation.js still works (it reads left/right). See
 *                 SIM_PATCHES — with the one-line analog patch applied the
 *                 simulation reads `steer` and these become cosmetic.
 *   drift         held
 *   driftPressed  true for exactly one frame on the press edge
 *   item          held
 *   itemPressed   true for exactly one frame on the press edge
 *   brake         held
 *   look          held (look-behind camera)
 *   source        which scheme currently owns steering
 *
 * SCHEME ARBITRATION. All schemes run at once — a player can pick up a gamepad
 * mid-race, or grab the arrows when tilt annoys them, with no settings trip.
 * The owner is whichever scheme last produced meaningful movement, and it keeps
 * ownership until it has been quiet for `handoff` seconds. Touch and buttons
 * are explicit acts and pre-empt tilt immediately; tilt only reclaims after the
 * finger has been off for a moment. Without this rule, a resting thumb and a
 * tilted phone fight each other and the kart wobbles.
 */
export class InputHub {
  constructor(opts) {
    const o = opts || {};
    this.tilt = new TiltSteering(o.tilt);
    this.pad = new TouchPad(o.pad);
    this.buttons = new HoldButtons(o.buttons);
    this.keys = new KeyboardSteering(o.keys);
    this.gamepad = new GamepadSteering(o.gamepad);

    /** 'tilt' | 'pad' | 'buttons' | 'auto'  — 'auto' lets every scheme in.
        Assigning this propagates ownership to the sources; see _applyScheme. */
    this._scheme = 'auto';
    this.scheme = o.scheme || 'auto';
    this.handoff = o.handoff != null ? o.handoff : 0.35;
    this.enabled = true;

    // THE live object. Never replaced.
    this.steer = 0;
    this.left = false;
    this.right = false;
    this.drift = false;
    this.driftPressed = false;
    this.item = false;
    this.itemPressed = false;
    this.brake = false;
    this.look = false;
    this.source = 'none';

    /** threshold above which `left`/`right` are reported true (legacy path) */
    this.digitalThreshold = o.digitalThreshold != null ? o.digitalThreshold : 0.22;

    this._owner = 'none';
    this._quiet = 0;
    this._driftHeld = false;
    this._itemHeld = false;
    this._driftQueue = 0;
    this._itemQueue = 0;
    this._btnDrift = false;
    this._btnBrake = false;
    this._btnLook = false;
    this._bound = [];
  }

  /**
   * A source that does not OWN steering under the current scheme must not
   * assert a value at all — not even zero.
   *
   * This was a real bug and it cost the default control scheme on a phone.
   * `TouchPad` marked itself `active` on any pointerdown in its zone whatever
   * the scheme, and `active` is what wins arbitration below; the scheme gate
   * only zeroed the pad's VALUE. So with TILT selected — the default on a
   * phone — a thumb resting anywhere on the left half of the glass took
   * ownership of the wheel and held it at a hard zero, and the kart simply
   * stopped steering. The fix is ownership, applied at the source: a
   * non-owning source is disabled, stops listening, and drops anything held.
   */
  _applyScheme() {
    const s = this._scheme;
    const padOwns = (s === 'pad' || s === 'auto');
    if (this.pad.enabled !== padOwns) {
      this.pad.enabled = padOwns;
      if (!padOwns) this.pad.release();
    }
    const btnOwns = (s === 'buttons' || s === 'auto');
    if (this.buttons.enabled !== btnOwns) {
      this.buttons.enabled = btnOwns;
      if (!btnOwns) this.buttons.releaseAll();
    }
  }

  get scheme() { return this._scheme; }
  set scheme(v) { this._scheme = v || 'auto'; this._applyScheme(); }

  /**
   * Wire up the DOM. Everything is optional.
   * @param {{surface?:HTMLElement,left?:HTMLElement,right?:HTMLElement,
   *          drift?:HTMLElement,item?:HTMLElement,brake?:HTMLElement,
   *          look?:HTMLElement,keyTarget?:EventTarget}} els
   */
  attach(els) {
    els = els || {};
    if (els.surface) this.pad.attach(els.surface);
    if (els.left) this.buttons.bind(els.left, 'left');
    if (els.right) this.buttons.bind(els.right, 'right');
    if (els.drift) this._bindHold(els.drift, '_btnDrift', '_driftQueue');
    if (els.brake) this._bindHold(els.brake, '_btnBrake', null);
    if (els.look) this._bindHold(els.look, '_btnLook', null);
    if (els.item) this._bindTap(els.item, '_itemQueue');
    this.keys.attach(els.keyTarget || (typeof window !== 'undefined' ? window : null));
    if (typeof window !== 'undefined') {
      this._blur = () => this.releaseAll();
      window.addEventListener('blur', this._blur);
    }
  }

  _bindHold(el, flag, queue) {
    const self = this;
    const down = e => {
      e.preventDefault();
      self[flag] = true;
      if (queue) self[queue]++;
      el.classList.add('pressed');
      try { el.setPointerCapture(e.pointerId); } catch (err) {}
    };
    const up = () => { self[flag] = false; el.classList.remove('pressed'); };
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    el.addEventListener('lostpointercapture', up);
    this._bound.push([el, down, up]);
  }

  /** Item is a tap: fire on pointerdown, the instant the finger lands. */
  _bindTap(el, queue) {
    const self = this;
    const down = e => { e.preventDefault(); self[queue]++; el.classList.add('pressed'); };
    const up = () => el.classList.remove('pressed');
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    this._bound.push([el, down, up]);
  }

  /** Drop every held control. Call on pause, blur, race end, screen change. */
  releaseAll() {
    this.pad.release(); this.buttons.releaseAll(); this.keys.releaseAll();
    this._btnDrift = this._btnBrake = this._btnLook = false;
    this._driftQueue = this._itemQueue = 0;
    this.steer = 0; this.left = this.right = false;
    this.drift = this.item = this.brake = this.look = false;
    this.driftPressed = this.itemPressed = false;
    this._owner = 'none'; this.source = 'none';
  }

  /** Enable tilt. On iOS this MUST be inside a user gesture. */
  async enableTilt() {
    const ok = await this.tilt.requestPermission();
    if (ok) this.tilt.start();
    return ok;
  }
  disableTilt() { this.tilt.stop(); }
  recalibrateTilt() { this.tilt.recalibrate(); }

  /** Persisted settings hook. */
  setSensitivity(v) { this.tilt.sensitivity = clamp(v, 0.4, 2.5); this.pad.sensitivity = clamp(v, 0.4, 2.5); }
  setInvert(v) { this.tilt.invert = !!v; }

  /** Call ONCE per frame, before race.update(). */
  update(dt) {
    if (!this.enabled) { this.steer = 0; this.left = this.right = false; return this; }

    // Self-healing: a caller that pokes `scheme` through some other route still
    // gets the sources re-owned before anything is read.
    this._applyScheme();
    const allowTilt = this._scheme === 'auto' || this._scheme === 'tilt';
    const allowPad = this.pad.enabled;
    const allowBtn = this.buttons.enabled;

    const vTilt = allowTilt ? this.tilt.update(dt) : (this.tilt.value = 0);
    const vPad = allowPad ? this.pad.update(dt) : (this.pad.value = 0);
    const vBtn = allowBtn ? this.buttons.update(dt) : (this.buttons.value = 0);
    const vKey = this.keys.update(dt);
    const vGp = this.gamepad.update();

    // --- arbitration -------------------------------------------------------
    // Explicit contact always wins immediately.
    let owner = 'none', value = 0;
    if (allowPad && this.pad.active) { owner = 'pad'; value = vPad; }
    else if (allowBtn && (this.buttons.left || this.buttons.right)) { owner = 'buttons'; value = vBtn; }
    else if (this.keys.left || this.keys.right) { owner = 'keys'; value = vKey; }
    else if (this.gamepad.connected && Math.abs(vGp) > 0.03) { owner = 'gamepad'; value = vGp; }
    else if (Math.abs(vTilt) > 0.02 && this.tilt.live) { owner = 'tilt'; value = vTilt; }

    if (owner === 'none') {
      // Nobody is driving: hold the previous owner briefly so its release ramp
      // (pad easing back, buttons falling) plays out instead of snapping.
      this._quiet += dt;
      const stillAllowed = this._owner === 'pad' ? allowPad :
                           this._owner === 'buttons' ? allowBtn :
                           this._owner === 'tilt' ? allowTilt : true;
      if (this._quiet < this.handoff && this._owner !== 'none' && stillAllowed) {
        owner = this._owner;
        value = owner === 'pad' ? vPad : owner === 'buttons' ? vBtn :
                owner === 'keys' ? vKey : owner === 'gamepad' ? vGp : vTilt;
      } else { this._owner = 'none'; value = 0; }
    } else { this._quiet = 0; this._owner = owner; }

    this.steer = clamp1(value);
    this.source = this._owner;

    // Legacy booleans so an unpatched simulation.js still drives.
    const th = this.digitalThreshold;
    this.left = this.steer < -th;
    this.right = this.steer > th;

    // --- buttons -----------------------------------------------------------
    const driftNow = this._btnDrift || this.keys.drift || this.gamepad.drift;
    this.driftPressed = (driftNow && !this._driftHeld) || this._driftQueue > 0 ||
                        this.keys.driftEdge > 0 || this.gamepad.driftEdge > 0;
    this._driftHeld = driftNow;
    this.drift = driftNow;
    this._driftQueue = 0; this.keys.driftEdge = 0; this.gamepad.driftEdge = 0;

    const itemNow = this.gamepad.item;
    this.itemPressed = this._itemQueue > 0 || this.keys.itemEdge > 0 ||
                       (itemNow && !this._itemHeld);
    this._itemHeld = itemNow;
    this.item = itemNow || this._itemQueue > 0;
    this._itemQueue = 0; this.keys.itemEdge = 0; this.gamepad.itemEdge = 0;

    this.brake = this._btnBrake || this.keys.brake || this.gamepad.brake;
    this.look = this._btnLook || this.keys.look || this.gamepad.look;
    return this;
  }
}

/** Factory, so callers do not have to think about the class. */
export function createInput(opts) { return new InputHub(opts); }

/* ---------------------------------------------------------------------------
 * 7. buildTrackAnalysis — precomputed, so readability costs nothing at speed
 * ------------------------------------------------------------------------ */

/**
 * Walk the track once at load and bake everything the camera and the corner
 * cues need into typed arrays. Per-frame lookups become two array reads, which
 * is the difference between a HUD that is free and a HUD that costs a dozen
 * curve evaluations every frame on a phone.
 *
 * @param {object} engine  must expose `frames` (or `frame(t)`), `length`
 * @param {object} track   TRACKS[i]; only `grip` is used
 * @param {{samples?:number}} [opts]
 * @returns {{samples:number,length:number,curvature:Float32Array,
 *            grade:Float32Array,safeSpeed:Float32Array,corners:Array}}
 */
export function buildTrackAnalysis(engine, track, opts) {
  const N = (opts && opts.samples) || 360;
  const len = engine.length;
  const grip = (track && track.grip) || 1;
  const curvature = new Float32Array(N);
  const grade = new Float32Array(N);
  const dir = new Float32Array(N * 3);

  // Read engine.frames by integer index where we can. Sampling by normalised t
  // puts a float-rounding seam at the start/finish line that shows up as one
  // bogus curvature sample exactly where the countdown happens.
  const frames = engine.frames;
  const F = frames ? frames.length - 1 : 0;
  for (let i = 0; i < N; i++) {
    let dx, dy, dz;
    if (frames) {
      const f = frames[Math.round(i * F / N) % F];
      dx = f.v.x; dy = f.v.y; dz = f.v.z;
    } else {
      const f = engine.frame(i / N);
      dx = f.dir.x; dy = f.dir.y; dz = f.dir.z;
    }
    dir[i * 3] = dx; dir[i * 3 + 1] = dy; dir[i * 3 + 2] = dz;
    grade[i] = dy;                                  // + uphill, - downhill
  }
  const step = len / N;
  for (let i = 0; i < N; i++) {
    const a = (i - 1 + N) % N, b = (i + 1) % N;
    // Heading change per metre. Sign matches engine.curvature(): + is a right
    // hand turn, which is what the HUD arrow and the camera bias both assume.
    let d = Math.atan2(dir[b * 3], dir[b * 3 + 2]) - Math.atan2(dir[a * 3], dir[a * 3 + 2]);
    // Negated to match engine.curvature()/graphics.signedCurvature(), which is
    // the convention the existing HUD already uses: POSITIVE IS A RIGHT TURN.
    // (`right` is (-fz,0,fx), so a right turn makes atan2(dx,dz) decrease.)
    curvature[i] = -wrapPi(d) / (2 * step);
  }
  // One box-blur pass: sampled tangents are noisy and an unfiltered curvature
  // makes the cue flicker between LEFT and RIGHT on a straight. Done once.
  const sm = new Float32Array(N);
  for (let i = 0; i < N; i++)
    sm[i] = (curvature[(i - 1 + N) % N] + 2 * curvature[i] + curvature[(i + 1) % N]) * 0.25;
  curvature.set(sm);

  // Segment the track into named corners so the cue can talk about "the next
  // corner" rather than "the curvature 40 metres ahead". ENTER/EXIT are
  // calibrated against all six real circuits: their median curvature is about
  // 0.006 (these are lobed loops, technically always turning), so a naive
  // threshold makes the whole lap one corner. 0.0075/0.0045 yields six to eight
  // corners of 55-220m per lap on every circuit, which is what a human would
  // point at and call "a corner".
  const corners = [];
  const ENTER = 0.0075, EXIT = 0.0045;
  let i = 0;
  while (i < N) {
    if (Math.abs(curvature[i]) > ENTER) {
      const s = Math.sign(curvature[i]);
      let start = i;
      while (start > 0 && Math.abs(curvature[start - 1]) > EXIT && Math.sign(curvature[start - 1]) === s) start--;
      let end = i, peak = i, sum = 0, n = 0;
      while (end + 1 < N && Math.abs(curvature[end + 1]) > EXIT && Math.sign(curvature[end + 1]) === s) {
        end++; if (Math.abs(curvature[end]) > Math.abs(curvature[peak])) peak = end;
      }
      for (let k = start; k <= end; k++) { sum += Math.abs(curvature[k]); n++; }
      const arc = n * step;
      corners.push({
        startT: start / N, apexT: peak / N, endT: end / N,
        dir: s, peak: Math.abs(curvature[peak]), arc,
        severity: severityOf(Math.abs(curvature[peak])),
        // Metres of outward lane drift per m/s of speed, if the player does not
        // steer. Straight out of simulation.js: outward = -curve*v^2*0.022, held
        // for arc/v seconds, so the drift is linear in v. This is the honest
        // pressure number for THIS handling model — see CornerCue.
        driftPerSpeed: (sum / Math.max(1, n)) * 0.022 * arc / Math.max(0.35, grip)
      });
      i = end + 1;
    } else i++;
  }
  return { samples: N, length: len, curvature, grade, corners, grip, step };
}

/**
 * 0 straight, 1 bend, 2 turn, 3 hairpin. Calibrated against the real curvature
 * distribution of all six circuits (peaks run 0.012 on Chicago to 0.022 on
 * Lakefront), so every track has at least one "TIGHT" and no track is all
 * tight.
 */
function severityOf(absCurve) {
  if (absCurve < 0.0075) return 0;
  if (absCurve < 0.0098) return 1;
  if (absCurve < 0.0118) return 2;
  return 3;
}

/** Sample a baked table at a normalised track position, with linear interpolation. */
function sampleTable(table, N, t) {
  const v = mod1(t) * N, i = Math.floor(v), f = v - i;
  const a = table[i % N], b = table[(i + 1) % N];
  return a + (b - a) * f;
}

/* ---------------------------------------------------------------------------
 * 8. ChaseCamera
 * ------------------------------------------------------------------------ */

/**
 * WHY TRACK SPACE
 * ---------------
 * Version B's camera was damped in world space: a desired world position was
 * computed behind the kart and the camera lerped towards it. That is why it
 * could end up inside a barrier — through a fast chicane the lerp cuts the
 * corner, and "cutting the corner" in world space means "leaving the road".
 *
 * Here every damped quantity is a scalar in TRACK space:
 *
 *      back    metres behind the player along the centre line
 *      lane    metres left/right of the centre line
 *      height  metres above the road surface
 *      ahead   metres in front of the player for the look target
 *
 * The world position is produced at the very end by asking the track for the
 * point at (playerT - back, lane, height). Since `lane` is clamped well inside
 * the barriers and `height` is always positive and measured FROM the road
 * surface, the camera is on the road by construction — over a crest, through a
 * dip, banked or not, at any frame rate. There is no collision test to get
 * wrong, and there is no configuration in which it can clip.
 *
 * FRAMING
 * -------
 * Version A puts the kart close and large, filling the lower centre of the
 * frame. That is the floor and this reproduces it: ~10m back, ~5.4m up, 58 deg
 * vertical FOV in landscape. Version B's "far and low" is exactly what we are
 * not doing.
 *
 * SPEED
 * -----
 * FOV widens with speed and boost, and `back` shortens slightly at the same
 * time. Widening alone shrinks the kart, which is the mistake B made; pulling
 * in as we widen keeps the kart the same size on screen while the periphery
 * streams past faster. That reads as speed without costing readability.
 *
 * MOTION SICKNESS
 * ---------------
 * Every quantity is exponentially damped with a per-second rate, so nothing
 * ever steps. Roll is capped at ~1.5 degrees and is off by default at
 * `roll:0`. Look-ahead moves with a 2.5/s rate, slow enough that the horizon
 * never whips.
 */
export class ChaseCamera {
  constructor(opts) {
    const o = opts || {};
    /* ---- FRAMING ---------------------------------------------------------
       Where the kart lands in the frame is entirely these five numbers, and it
       matters: the brief's whole diagnosis of why the last build lost was that
       the player's own kart was a distant speck. It was still sitting low and
       hard right, overlapping the DRIFT button on a 844x390 phone.

       The kart's height in frame is the angle between the view axis and the
       line to the kart:  atan((height-0.4)/back) - atan((height-lookHeight)/ahead).
       At the old 10.6 / 5.3 / 13 / 1.5 that is 8.5 degrees below the axis, which
       on a 56-degree vertical FOV puts the kart's middle 69% of the way down
       the frame — right in the controls. Pulling the camera in and up while
       shortening the look-ahead and dropping the aim point takes it to about
       5 degrees, or 61% down: the kart is the hero of the shot, the road ahead
       is still fully readable, and the bottom-right corner is clear. */
    /** metres behind the kart at rest */
    this.baseBack = o.back != null ? o.back : 9.9;
    /** metres above the road */
    this.baseHeight = o.height != null ? o.height : 5.55;
    /** metres ahead for the look target at rest */
    this.baseAhead = o.ahead != null ? o.ahead : 10.4;
    /** height of the aim point above the road, metres */
    this.baseLookHeight = o.lookHeight != null ? o.lookHeight : 0.75;
    /**
     * Metres the camera sits to the RIGHT of where the lane maths puts it, so
     * the kart reads just left of centre instead of over the DRIFT button. It
     * is small on purpose: enough to clear the controls, not enough to feel
     * like the camera is looking away from the player.
     */
    this.frameBias = o.frameBias != null ? o.frameBias : 0.8;
    /**
     * How much of the kart's lane offset the camera copies. This ADAPTS: near
     * the centre line a low value keeps the camera calm and lets the kart move
     * about within the frame, but a kart pinned against a barrier at lane 11.4
     * would slide off the edge of a phone screen at that rate, so the follow
     * rises towards `laneFollowFar` as the kart goes wide. Version A used a
     * flat 0.42 and the kart does visibly crowd the frame edge because of it.
     */
    this.laneFollow = o.laneFollow != null ? o.laneFollow : 0.54;
    this.laneFollowFar = o.laneFollowFar != null ? o.laneFollowFar : 0.86;
    /**
     * How much of the CAMERA's lane follow the aim point copies, 0..1. This is
     * a ratio, not an independent rate, and that is the point: when the aim
     * point follows the lane less than the camera does, the camera yaws away
     * from the kart, and that yaw was the other half of why the kart crowded
     * the bottom-right corner. At 0.9 the camera is very nearly parallel to the
     * track, so the kart sits at its true lateral offset and only the corner
     * lean moves it.
     */
    this.lookLaneMatch = o.lookLaneMatch != null ? o.lookLaneMatch : 0.9;
    /** vertical FOV, landscape / portrait */
    this.baseFov = o.fov != null ? o.fov : 56;
    this.portraitFov = o.portraitFov != null ? o.portraitFov : 68;
    /** extra FOV at top speed, and on boost */
    this.speedFov = o.speedFov != null ? o.speedFov : 4.5;
    this.boostFov = o.boostFov != null ? o.boostFov : 6;
    /** how far the camera pulls in at top speed, metres */
    this.speedPull = o.speedPull != null ? o.speedPull : 0.5;
    /** extra look-ahead at top speed, metres */
    this.speedAhead = o.speedAhead != null ? o.speedAhead : 1.6;
    /** lateral shift away from the drift, metres, and look-into-drift, metres */
    this.driftLean = o.driftLean != null ? o.driftLean : 1.3;
    this.driftLook = o.driftLook != null ? o.driftLook : 1.5;
    /**
     * How far the look target leans into the coming corner. This is the
     * "see what is coming" term and it is worth a lot on a blind bend, but it
     * yaws the camera, which pushes the kart towards the frame edge. 2.2m at
     * 15m of look-ahead is about 8 degrees, which shows the apex a beat early
     * without the kart drifting out of the lower centre of the frame.
     */
    this.cornerLook = o.cornerLook != null ? o.cornerLook : 2.2;
    /** extra camera height when the road drops away ahead, metres */
    this.crestRise = o.crestRise != null ? o.crestRise : 1.5;
    /**
     * How much of that crest rise the AIM POINT copies. Without this, climbing
     * for a view over a crest also pitches the camera down onto the kart, and
     * the kart slides down the frame exactly where the road gets interesting —
     * on Signal Canyon and Gigabit Galaxy it ended up sitting in the button
     * row. Lifting the aim with the camera buys the altitude without paying for
     * it in framing.
     */
    this.crestLook = o.crestLook != null ? o.crestLook : 0.8;
    /** radians of camera roll into a drift. 0 disables. Keep tiny. */
    this.roll = o.roll != null ? o.roll : 0.022;
    /** hard safety clamps */
    this.maxLane = o.maxLane != null ? o.maxLane : 9.2;
    this.minHeight = o.minHeight != null ? o.minHeight : 3.0;
    this.maxHeight = o.maxHeight != null ? o.maxHeight : 8.0;
    /** damping rates, per second */
    this.rBack = o.rBack != null ? o.rBack : 4.0;
    this.rLane = o.rLane != null ? o.rLane : 5.0;
    this.rHeight = o.rHeight != null ? o.rHeight : 3.2;
    this.rAhead = o.rAhead != null ? o.rAhead : 2.5;
    this.rFov = o.rFov != null ? o.rFov : 2.2;
    this.rRoll = o.rRoll != null ? o.rRoll : 4.0;
    this.rLook = o.rLook != null ? o.rLook : 3.5;
    /** top speed used to normalise the speed terms (m/s) */
    this.refSpeed = o.refSpeed != null ? o.refSpeed : 56;

    this.ready = false;
    this.back = this.baseBack;
    this.lane = 0;
    this.height = this.baseHeight;
    this.ahead = this.baseAhead;
    this.lookLane = 0;
    this.lookHeight = this.baseLookHeight;
    this.fov = this.baseFov;
    this.rollNow = 0;
    this.lookBack = 0;              // 0 = forward, 1 = fully reversed
    this.shake = 0;                 // 0..1, decays; set by hit()/scrape()
    this._shakePhase = 0;

    // scratch, written every frame, never allocated again
    this._p = { x: 0, y: 0, z: 0 };
    this._l = { x: 0, y: 0, z: 0 };
  }

  /** Snap on the next update. Call on race start and after loadTrack(). */
  reset() {
    this.ready = false; this.shake = 0; this.lookBack = 0;
    this.back = this.baseBack; this.height = this.baseHeight;
    this.ahead = this.baseAhead; this.lane = 0; this.lookLane = 0;
    this.lookHeight = this.baseLookHeight;
    this.fov = this.baseFov; this.rollNow = 0;
  }

  /** A hit or a barrier scrape. amount 0..1. Adds a short damped shake. */
  kick(amount) { this.shake = clamp(this.shake + (amount || 0.5), 0, 1); }

  /**
   * Zero-allocation track sample. Reads engine.frames directly if present
   * (engine.frame() clones three Vector3 per call), otherwise falls back.
   * Writes into `out` {x,y,z}.
   */
  _sample(engine, t, lane, height, out) {
    const frames = engine.frames;
    if (frames) {
      const n = frames.length - 1;             // 720 segments over 721 frames
      const v = mod1(t) * n, i = Math.floor(v), f = v - i;
      const a = frames[i], b = frames[i + 1] || frames[0];
      let px = a.p.x + (b.p.x - a.p.x) * f;
      let py = a.p.y + (b.p.y - a.p.y) * f;
      let pz = a.p.z + (b.p.z - a.p.z) * f;
      let rx = a.right.x + (b.right.x - a.right.x) * f;
      let ry = a.right.y + (b.right.y - a.right.y) * f;
      let rz = a.right.z + (b.right.z - a.right.z) * f;
      // Math.sqrt, not Math.hypot: hypot is variadic and allocates in V8, and
      // this is the hottest line in the module.
      const rl = Math.sqrt(rx * rx + ry * ry + rz * rz) || 1;
      out.x = px + (rx / rl) * lane;
      out.y = py + (ry / rl) * lane + height;
      out.z = pz + (rz / rl) * lane;
    } else {
      const f = engine.frame(t, lane, height);
      out.x = f.p.x; out.y = f.p.y; out.z = f.p.z;
    }
    return out;
  }

  /**
   * @param {number} dt      already paced (see FramePacer)
   * @param {object} race    the Race instance
   * @param {object} engine  needs `frames`/`frame()` and `length`
   * @param {object} cam     THREE.PerspectiveCamera
   * @param {object} [input] optional; only `look` is read
   * @param {object} [analysis] optional buildTrackAnalysis() result
   */
  update(dt, race, engine, cam, input, analysis) {
    const p = race.player;
    const len = engine.length;
    if (!(len > 0)) return;
    const t = mod1(p.distance / len);

    const speedN = clamp(p.speed / this.refSpeed, 0, 1.15);
    const boost = p.boost > 0 ? 1 : 0;

    // --- curvature and grade ahead, from the baked tables when available ----
    let curveAhead = 0, gradeAhead = 0;
    if (analysis) {
      const la = (this.ahead + 8) / len;
      curveAhead = sampleTable(analysis.curvature, analysis.samples, t + la);
      gradeAhead = sampleTable(analysis.grade, analysis.samples, t + (this.ahead * 0.6) / len);
    } else if (engine.curvature) {
      curveAhead = engine.curvature(mod1(t + (this.ahead + 8) / len));
    }
    const curveN = clamp(curveAhead / 0.012, -1, 1);

    // --- targets -----------------------------------------------------------
    const drifting = p.drifting ? 1 : 0;
    const driftDir = p.driftDir || 0;

    // Adaptive lane follow (see laneFollow) and matching attenuation of the
    // look biases: near a barrier the camera is already yawed by the kart's own
    // offset, and stacking a corner lean on top of that throws the kart into
    // the corner of the screen.
    const laneN = clamp(Math.abs(p.lane) / 11.4, 0, 1);
    const follow = this.laneFollow + (this.laneFollowFar - this.laneFollow) * laneN * laneN;
    const biasAtten = 1 - 0.5 * laneN;

    let tBack = this.baseBack - this.speedPull * speedN + drifting * 0.5;
    let tLane = clamp(p.lane * follow - driftDir * this.driftLean * drifting + this.frameBias,
                      -this.maxLane, this.maxLane);
    // Rise when the road falls away ahead (crest) so the player keeps sight of
    // the landing; settle back down into a dip so we are not staring at sky.
    let tHeight = this.baseHeight + clamp(-gradeAhead * 4.5, -0.9, 1) * this.crestRise;
    tHeight = clamp(tHeight, this.minHeight, this.maxHeight);
    const tLookHeight = this.baseLookHeight + (tHeight - this.baseHeight) * this.crestLook;
    let tAhead = this.baseAhead + this.speedAhead * speedN;
    // Look into the corner: bias the aim point towards the inside of the turn
    // so the apex is on screen a beat before it matters.
    let tLookLane = clamp(p.lane * follow * this.lookLaneMatch + this.frameBias +
                          (curveN * this.cornerLook + driftDir * this.driftLook * drifting) * biasAtten,
                          -9, 9);
    let tRoll = this.roll * (driftDir * drifting * 0.8 + curveN * 0.4);

    // Look behind (held control). Eased, never snapped.
    const wantBack = input && input.look ? 1 : 0;
    this.lookBack = approach(this.lookBack, wantBack, 5, dt);

    // --- damping -----------------------------------------------------------
    if (!this.ready) {
      this.back = tBack; this.lane = tLane; this.height = tHeight;
      this.ahead = tAhead; this.lookLane = tLookLane; this.rollNow = 0;
      this.lookHeight = tLookHeight;
      this.fov = (this._portrait() ? this.portraitFov : this.baseFov);
      this.ready = true;
    } else {
      this.back = approach(this.back, tBack, this.rBack, dt);
      this.lane = approach(this.lane, tLane, this.rLane, dt);
      this.height = approach(this.height, tHeight, this.rHeight, dt);
      this.ahead = approach(this.ahead, tAhead, this.rAhead, dt);
      this.lookLane = approach(this.lookLane, tLookLane, this.rLook, dt);
      this.lookHeight = approach(this.lookHeight, tLookHeight, this.rHeight, dt);
      this.rollNow = approach(this.rollNow, tRoll, this.rRoll, dt);
    }

    // --- world placement ---------------------------------------------------
    const lb = this.lookBack;
    // When looking back the camera slides in front of the kart and aims behind.
    const camOff = -this.back * (1 - lb) + (this.back * 0.75) * lb;
    const lookOff = this.ahead * (1 - lb) - (this.ahead * 1.3) * lb;

    let h = this.height;
    if (this.shake > 0) {
      this._shakePhase += dt * 34;
      h += Math.sin(this._shakePhase) * this.shake * 0.28;
      this.shake = Math.max(0, this.shake - dt * 2.4);
    }

    this._sample(engine, t + camOff / len, clamp(this.lane, -this.maxLane, this.maxLane), h, this._p);
    this._sample(engine, t + lookOff / len, this.lookLane, this.lookHeight, this._l);

    cam.position.set(this._p.x, this._p.y, this._p.z);
    cam.lookAt(this._l.x, this._l.y, this._l.z);
    if (this.rollNow !== 0 && cam.rotateZ) cam.rotateZ(this.rollNow * (1 - lb));

    // --- FOV ---------------------------------------------------------------
    const base = this._portrait() ? this.portraitFov : this.baseFov;
    const tFov = base + this.speedFov * speedN + this.boostFov * boost + lb * 4;
    this.fov = approach(this.fov, tFov, this.rFov, dt);
    if (Math.abs(cam.fov - this.fov) > 0.01) {
      cam.fov = this.fov;
      cam.updateProjectionMatrix();
    }
  }

  _portrait() {
    return typeof innerHeight !== 'undefined' && innerHeight > innerWidth;
  }
}

/* ---------------------------------------------------------------------------
 * 9. CornerCue — what a player holding a phone needs to know a second early
 * ------------------------------------------------------------------------ */

/**
 * Version A's "TIGHT LEFT AHEAD" banner is genuinely good: it is the single
 * thing that lets somebody who has never played take a blind corner. Two things
 * were missing from it.
 *
 *  1. It was DISTANCE based. A cue 25 metres out arrives 2 seconds early at
 *     45km/h and half a second early at 160km/h — which is to say, exactly when
 *     it is useless. This version is TIME based: the cue appears when the
 *     corner is `lead` seconds away whatever the speed, so it always lands
 *     about a second before the player has to act.
 *
 *  2. It did not say how hard. The same bend is a nothing at 60 and a barrier
 *     at 150. `overspeed` compares the player's current speed against the speed
 *     the handling model will actually hold through that corner, and drives an
 *     `EASE OFF` state. That is the difference between a hint and a warning.
 *
 * All output lands on `this` as plain fields. Nothing is allocated, nothing is
 * returned, and the DOM agent reads whichever fields it wants. Strings are
 * picked from a fixed table, so no template literals per frame either.
 */
export class CornerCue {
  constructor(opts) {
    const o = opts || {};
    /** seconds of warning */
    this.lead = o.lead != null ? o.lead : 2.4;
    /** lane beyond which simulation.js starts taking speed off you */
    this.shoulder = o.shoulder != null ? o.shoulder : 10;

    this.active = false;
    this.dir = 0;              // -1 left, 0 straight, +1 right
    this.severity = 0;         // 0 none, 1 bend, 2 turn, 3 hairpin
    this.text = 'KEEP IT FLOWING';
    this.arrow = '↑';
    this.distance = 0;         // metres to the apex
    this.time = 0;             // seconds to the apex at current speed
    this.urgency = 0;          // 0..1, ramps as the corner arrives
    this.drift = 0;            // metres the corner will push you outward
    this.exitLane = 0;         // predicted lane at the corner exit
    this.risk = 0;             // 0 comfortable .. 1 you will be on the shoulder
    this.wide = false;         // predicted to end up on the shoulder
    this.steerHint = 0;        // -1..1, roughly the steer needed
    this.crest = false;        // a blind crest is coming
    this.chain = false;        // another corner immediately after this one
    this.corner = null;        // the analysis corner object, or null
  }

  /**
   * @param {object} race
   * @param {object} engine
   * @param {object} analysis buildTrackAnalysis() result
   */
  update(race, engine, analysis) {
    const p = race.player;
    const len = engine.length;
    if (!analysis || !(len > 0) || analysis.corners.length === 0) { this._clear(); return this; }
    const t = mod1(p.distance / len);
    const speed = Math.max(8, p.speed);
    const horizon = Math.min(len * 0.45, speed * (this.lead + 1.2) + 30);

    // Nearest corner whose apex is ahead of us, within the horizon. A corner we
    // are already inside stays on screen until a little past its apex, which is
    // when the banner stops being advice and starts being clutter.
    const corners = analysis.corners;
    let best = null, bestD = Infinity, bestIdx = -1;
    for (let i = 0; i < corners.length; i++) {
      let d = (corners[i].apexT - t) * len;
      if (d < -12) d += len;
      if (d < -12 || d > horizon) continue;
      if (d < bestD) { bestD = d; best = corners[i]; bestIdx = i; }
    }

    // Crest detection is independent of corners: a road that drops away hides
    // whatever is behind it, and that is worth saying even on a straight.
    const far = sampleTable(analysis.grade, analysis.samples, t + (speed * 1.2 + 18) / len);
    const near = sampleTable(analysis.grade, analysis.samples, t + 4 / len);
    this.crest = (near - far) > 0.085;

    if (!best) { this._clear(); return this; }

    this.corner = best;
    this.dir = best.dir;
    this.severity = best.severity;
    this.distance = bestD;
    this.time = bestD / speed;
    this.urgency = clamp(1 - this.time / (this.lead + 0.4), 0, 1);

    // How hard is this corner, for THIS player, right now?
    //
    // simulation.js is a 1-D lane model: a corner does not "spin you out", it
    // pushes you outward at -curve*v^2*0.022 and you pay for it by ending up on
    // the shoulder, where `top` is multiplied down to as little as 0.65. So the
    // honest warning is not "you are going too fast" (you are almost never
    // going too fast in this model) but "at your speed, on your current line,
    // this corner puts you on the shoulder". That is a thing the player can
    // actually act on: move to the inside now.
    this.drift = best.driftPerSpeed * speed;
    // A right-hand corner (dir +1) throws you to the LEFT, which is why the
    // sign is negative: simulation.js adds outward = -curve*v^2*0.022 to the
    // lateral velocity, and +lane is the right-hand side of the road.
    this.exitLane = p.lane - best.dir * this.drift;
    this.risk = clamp((Math.abs(this.exitLane) - (this.shoulder - 2.5)) / 3.5, 0, 1);
    this.wide = Math.abs(this.exitLane) > this.shoulder;
    // The line correction is clamped so the hint always points INTO the corner:
    // an arrow that flips because you are already on a good line is worse than
    // no arrow at all.
    this.steerHint = clamp(best.dir * (0.3 + best.severity * 0.2) +
                           clamp(-this.exitLane * 0.05, -0.25, 0.25), -1, 1);

    const next = corners[(bestIdx + 1) % corners.length];
    this.chain = !!next && next !== best &&
      mod1(next.startT - best.endT) * len < Math.max(40, speed * 0.8);
    this.active = this.time < this.lead || bestD < 12;
    this.arrow = best.dir > 0 ? '↱' : '↰';
    this.text = CUE_TEXT[best.severity][best.dir > 0 ? 1 : 0];
    return this;
  }

  _clear() {
    this.active = false; this.dir = 0; this.severity = 0; this.urgency = 0;
    this.drift = 0; this.exitLane = 0; this.risk = 0; this.wide = false;
    this.steerHint = 0; this.chain = false; this.distance = 0; this.time = 0;
    this.text = 'KEEP IT FLOWING'; this.arrow = '↑'; this.corner = null;
  }
}

/** Fixed strings: [severity][0=left,1=right]. No allocation at read time. */
const CUE_TEXT = [
  ['KEEP IT FLOWING', 'KEEP IT FLOWING'],
  ['LEFT BEND AHEAD', 'RIGHT BEND AHEAD'],
  ['LEFT AHEAD', 'RIGHT AHEAD'],
  ['TIGHT LEFT AHEAD', 'TIGHT RIGHT AHEAD']
];

/* ---------------------------------------------------------------------------
 * 10. Difficulty and pacing
 * ------------------------------------------------------------------------ */

/**
 * simulation.js is locked and Jeff loves how it drives, so nothing here changes
 * the handling model. These are tables the orchestrator applies.
 *
 * The AI in simulation.js is fast. `aiSkill` is 0.91..1.00 and multiplies top
 * speed, so eight rivals all run at 91-100% of their kart's maximum with a
 * rubber band on top. For somebody's first ever race — a retail employee on
 * their phone in a back office — that is a guaranteed eighth place, and eighth
 * place on your first go is why people stop playing.
 *
 * ROOKIE is therefore the default. It is not "the AI is bad": the rubber band
 * is turned UP, not down, so the pack stays around the player and the race is
 * still close. It just stops being a race the player cannot win.
 *
 *   aiSkill    [min,max] replacing racer.aiSkill after construction
 *   rubberBand clamp on the catch-up term (simulation default 0.045)
 *   rubberDist divisor on the distance delta (simulation default 1600)
 *   steerGain  multiplier applied to the player's analog steer before the sim
 *   saver      0..1 strength of the barrier-kiss assist (see steerAssist)
 */
export const DIFFICULTY = {
  rookie: { label: 'ROOKIE', aiSkill: [0.815, 0.885], rubberBand: 0.055, rubberDist: 1250, steerGain: 0.92, saver: 0.55 },
  pro:    { label: 'PRO',    aiSkill: [0.880, 0.950], rubberBand: 0.045, rubberDist: 1600, steerGain: 1.00, saver: 0.25 },
  ace:    { label: 'ACE',    aiSkill: [0.935, 1.010], rubberBand: 0.035, rubberDist: 2000, steerGain: 1.06, saver: 0.00 }
};
export const DEFAULT_DIFFICULTY = 'rookie';
export const DIFFICULTY_ORDER = ['rookie', 'pro', 'ace'];

/**
 * Apply a difficulty to a freshly constructed Race.
 *
 * `aiSkill` needs no simulation.js edit at all — it is per-racer state we can
 * simply overwrite after `new Race(...)`. `rubberBand` / `rubberDist` are
 * currently inline literals and DO need the one-line edit described in
 * SIM_PATCHES; we set the fields regardless so that applying the patch later
 * needs no further wiring.
 *
 * @param {object} race
 * @param {string|object} level key of DIFFICULTY, or a table
 * @param {function} [random] defaults to race.random
 */
export function applyDifficulty(race, level, random) {
  const d = typeof level === 'string' ? (DIFFICULTY[level] || DIFFICULTY[DEFAULT_DIFFICULTY]) : level;
  const rnd = random || race.random || Math.random;
  const lo = d.aiSkill[0], hi = d.aiSkill[1];
  for (let i = 0; i < race.racers.length; i++) {
    const r = race.racers[i];
    if (r.isPlayer) continue;
    // Spread the field: the leaders are near the top of the band, the tail is
    // near the bottom, so there is always somebody to overtake AND somebody to
    // chase. A flat random band produces a clump.
    const spread = (i - 1) / 6;
    r.aiSkill = lo + (hi - lo) * (0.25 + 0.75 * spread) + (rnd() - 0.5) * 0.02;
  }
  race.rubberBand = d.rubberBand;
  race.rubberDist = d.rubberDist;
  race.steerGain = d.steerGain;
  race.difficulty = d;
  return race;
}

/** localStorage helpers so the setting survives. Key shared with game.js. */
export function loadDifficulty(key) {
  try {
    const raw = JSON.parse(localStorage.getItem(key || 'blufox-overdrive') || '{}');
    if (raw && DIFFICULTY[raw.difficulty]) return raw.difficulty;
  } catch (e) {}
  return DEFAULT_DIFFICULTY;
}

/**
 * Optional barrier-kiss assist, on by default only at ROOKIE.
 *
 * Deliberately tiny and deliberately conditional: it only acts when the player
 * is NOT steering (|steer| < 0.12) and the kart is within 1.6m of the lane
 * limit and still drifting outwards. In other words it catches the specific
 * first-timer failure — staring at the corner, forgetting to steer, grinding
 * the wall for three seconds — and does nothing at all the rest of the time.
 * Maximum authority is 0.22, so it can never take the car off the player.
 *
 * @returns {number} the steer value to hand to the simulation
 */
export function steerAssist(steer, race, strength) {
  const s = strength != null ? strength : (race.difficulty ? race.difficulty.saver : 0);
  if (!(s > 0)) return steer;
  const p = race.player;
  if (Math.abs(steer) > 0.12) return steer;
  const limit = 11.4;
  const over = Math.abs(p.lane) - (limit - 1.6);
  if (over <= 0) return steer;
  const outward = p.lateralSpeed * Math.sign(p.lane) > 0;
  if (!outward) return steer;
  const push = -Math.sign(p.lane) * clamp(over / 1.6, 0, 1) * 0.22 * s;
  return clamp1(steer + push);
}

/**
 * The steering-response curve the orchestrator should put between the input hub
 * and the simulation. Speed-scaled: full lock at a crawl is fine, full lock at
 * 160km/h is a spin. Tapering authority with speed is what makes a kart feel
 * responsive at low speed without being twitchy at high speed, and it is done
 * HERE rather than in simulation.js so the handling model stays untouched.
 *
 * At 0 m/s   : gain 1.00 (park it anywhere)
 * At 30 m/s  : gain 0.93
 * At 56 m/s  : gain 0.84
 *
 * @param {number} steer  -1..1 from InputHub
 * @param {object} race
 * @returns {number} -1..1 for race.update(dt, {steer})
 */
export function shapeSteerForSpeed(steer, race) {
  const p = race.player;
  const g = 1 - 0.16 * clamp(p.speed / 56, 0, 1.1);
  const gain = (race.steerGain != null ? race.steerGain : 1) * g;
  return clamp1(steer * gain);
}

/**
 * Everything the orchestrator needs to feed the simulation, in one call.
 * Mutates and returns `input` so there is no allocation.
 */
export function driveInput(input, race) {
  let s = shapeSteerForSpeed(input.steer, race);
  s = steerAssist(s, race);
  input.steer = s;
  const th = 0.22;
  input.left = s < -th;
  input.right = s > th;
  return input;
}

/* ---------------------------------------------------------------------------
 * 11. Haptics
 * ------------------------------------------------------------------------ */

const HAPTIC = { tap: 12, item: 25, boost: 40, hit: 60, scrape: 8, ui: 10 };
/** Short, cheap, and silently ignored where unsupported (all of iOS Safari). */
export function haptic(kind) {
  if (typeof navigator === 'undefined' || !navigator.vibrate) return;
  const ms = HAPTIC[kind];
  if (ms) { try { navigator.vibrate(ms); } catch (e) {} }
}

/* ---------------------------------------------------------------------------
 * 12. The simulation.js changes this module asks for
 * ------------------------------------------------------------------------ */

/**
 * simulation.js is LOCKED. These are the only edits `feel.js` wants, they are
 * one line each, and the module works without every one of them (it falls back
 * to digital left/right and fixed rubber-banding). Listed most to least
 * important.
 *
 * Machine-readable so the orchestrator can diff against the file.
 */
export const SIM_PATCHES = [
  {
    id: 'analog-steer',
    importance: 'required for tilt and pad to feel like anything',
    find: "steer=(input.right?1:0)-(input.left?1:0);",
    replace: "steer=typeof input.steer==='number'?Math.max(-1,Math.min(1,input.steer)):(input.right?1:0)-(input.left?1:0);",
    why: "Today the player's steering is quantised to exactly -1, 0 or +1. Tilt " +
         "and the analog pad both produce a continuous value and it is thrown " +
         "away, so a 3-degree lean and a 30-degree lean do the same thing. That " +
         "is the mechanical root of 'difficult to play'. The AI path is " +
         "untouched, the handling model is untouched, and with no `steer` field " +
         "present the behaviour is byte-for-byte what it is today."
  },
  {
    id: 'analog-drift-gate',
    importance: 'required if analog-steer is applied',
    find: "drift=!!input.drift&&steer!==0&&",
    replace: "drift=!!input.drift&&Math.abs(steer)>.15&&",
    why: "`steer!==0` is essentially always true once steering is analog, so " +
         "drift would engage on a dead-straight with the phone perfectly level. " +
         "0.15 is about 4 degrees of lean — a deliberate input."
  },
  {
    id: 'analog-centre-rate',
    importance: 'required if analog-steer is applied',
    find: "(1-Math.exp(-dt*(steer===0?18:12)))",
    replace: "(1-Math.exp(-dt*(Math.abs(steer)<.02?18:12)))",
    why: "Same `===0` problem. Without it the kart loses its quick self-centring " +
         "and feels like it is on ice, which is the opposite of what we want."
  },
  {
    id: 'difficulty-rubber-band',
    importance: 'nice to have — enables the difficulty setting',
    find: "top*=r.aiSkill+Math.max(-.045,Math.min(.045,delta/1600));",
    replace: "const rb=this.rubberBand||.045,rd=this.rubberDist||1600;top*=r.aiSkill+Math.max(-rb,Math.min(rb,delta/rd));",
    why: "Lets ROOKIE run a wider, closer rubber band so a first-timer is never " +
         "dropped by the pack, without forking the file. Defaults are the " +
         "current literals, so with nothing set the behaviour is unchanged. " +
         "`applyDifficulty()` already writes race.rubberBand / race.rubberDist."
  },
  {
    id: 'low-speed-authority',
    importance: 'optional — small, and it fixes a real dead patch',
    find: "r.steer*control*(.35+.65*r.speed/55)",
    replace: "r.steer*control*(.45+.55*r.speed/55)",
    why: "At a standing start and for the second after a SIGNAL PULSE hit the " +
         "kart has almost no steering authority, which reads as the controls " +
         "having stopped working. At 55 m/s both expressions give exactly 1.0, " +
         "so top-speed handling — the part Jeff likes — is untouched. Applies " +
         "to the AI too, which is fine: it makes their recoveries cleaner."
  }
];

/** Human-readable summary for a README or a handover note. */
export const FEEL_NOTES = {
  defaultScheme: 'tilt on a touch device (see shouldDefaultToTilt), keyboard elsewhere; ' +
                 'the pad, the arrows and a gamepad are always live and pre-empt tilt on contact',
  defaultDifficulty: DEFAULT_DIFFICULTY,
  cameraFraming: 'close chase, 10.6m back / 5.3m up / 56 deg vertical FOV in landscape, ' +
                 'measured against Version A (10.5 / 5.5 / 60) to put the kart the same ' +
                 'size and the same height in frame',
  perFrame: 'camera + cue + input + pacer measured at 0.67us and ~1 byte per frame on ' +
            'node/V8 (300k-frame run with --expose-gc); engine.frame() is bypassed by ' +
            'reading engine.frames directly, which is where the allocation would be',
  difficultyEvidence: 'scratch/feel-difficulty-sim.mjs runs all six circuits x three ' +
                      'player grades: on ROOKIE a clumsy player averages P1.7 and is ' +
                      'top-three on every circuit, on PRO P3.8, on ACE P6.0'
};
