var Du = Math.PI * 2,
  jt = (n, e, t) => (n < e ? e : n > t ? t : n),
  Fs = (n) => (n < -1 ? -1 : n > 1 ? 1 : n),
  Os = (n) => ((n % 1) + 1) % 1,
  Nu = (n) => ((n = (n + Math.PI) % Du), n < 0 && (n += Du), n - Math.PI),
  qi = (n, e, t, i) => n + (e - n) * (1 - Math.exp(-i * t));
function Gu(n, e, t, i) {
  let r = Math.abs(n);
  if (r <= e) return 0;
  let s = t - e,
    a = s > 1e-6 ? (r - e) / s : 0;
  a > 1 && (a = 1);
  let o = a * (i + (1 - i) * a * a);
  return n < 0 ? -o : o;
}
var Cl = class {
    constructor(e) {
      let t = e || {};
      ((this.maxDt = t.maxDt != null ? t.maxDt : 0.05),
        (this.minDt = t.minDt != null ? t.minDt : 0.004),
        (this.spikeRatio = t.spikeRatio != null ? t.spikeRatio : 2.2),
        (this.snapTol = t.snapTol != null ? t.snapTol : 0.0012),
        (this.smoothRate = t.smoothRate != null ? t.smoothRate : 0.1),
        (this.slowFrameDt = t.slowFrameDt != null ? t.slowFrameDt : 0.024),
        (this.maxAbsorb = t.maxAbsorb != null ? t.maxAbsorb : 3),
        (this.last = 0),
        (this.avg = 1 / 60),
        (this.dt = 1 / 60),
        (this.raw = 1 / 60),
        (this.rawAvg = 1 / 60),
        (this.fps = 60),
        (this._runLong = 0),
        (this.hitches = 0),
        (this.frames = 0),
        (this.slowFrames = 0),
        (this.slowRatio = 0),
        (this._snaps = [1 / 120, 1 / 90, 1 / 60, 1 / 50, 1 / 30]));
    }
    tick(e) {
      if (!this.last) return ((this.last = e), (this.dt = this.avg), this.dt);
      let t = (e - this.last) / 1e3;
      ((this.last = e), t > 0 || (t = this.avg), (this.raw = t));
      let i = !1;
      (t > this.avg * this.spikeRatio && t > 0.028
        ? this._runLong < this.maxAbsorb
          ? ((i = !0), this._runLong++, (t = this.avg))
          : ((this._runLong = 0), (this.avg += (Math.min(t, this.maxDt) - this.avg) * 0.5))
        : (this._runLong = 0),
        t > this.maxDt ? (t = this.maxDt) : t < this.minDt && (t = this.minDt));
      let r = this._snaps;
      for (let s = 0; s < r.length; s++) {
        let a = r[s];
        if (t > a - this.snapTol && t < a + this.snapTol) {
          t = a;
          break;
        }
      }
      return (
        this.frames++,
        i ? this.hitches++ : (this.avg += (t - this.avg) * this.smoothRate),
        this.raw > this.slowFrameDt && this.slowFrames++,
        (this.slowRatio = this.frames > 0 ? this.slowFrames / this.frames : 0),
        (this.rawAvg += (Math.min(this.raw, 1) - this.rawAvg) * 0.1),
        (this.fps = 1 / this.rawAvg),
        (this.dt = t),
        t
      );
    }
    reset() {
      ((this.last = 0),
        (this.avg = 1 / 60),
        (this.dt = 1 / 60),
        (this.rawAvg = 1 / 60),
        (this.frames = 0),
        (this.hitches = 0),
        (this.slowFrames = 0),
        (this.slowRatio = 0),
        (this._runLong = 0),
        (this.fps = 60));
    }
  },
  Rl = class n {
    constructor(e, t, i) {
      ((this.minCutoff = e != null ? e : 1.1),
        (this.beta = t != null ? t : 0.55),
        (this.dCutoff = i != null ? i : 1),
        (this.x = 0),
        (this.dx = 0),
        (this.started = !1));
    }
    static _alpha(e, t) {
      return 1 / (1 + 1 / (Du * e) / t);
    }
    filter(e, t) {
      if (!this.started) return ((this.started = !0), (this.x = e), (this.dx = 0), e);
      if (!(t > 0)) return this.x;
      let i = (e - this.x) / t,
        r = n._alpha(this.dCutoff, t);
      this.dx += r * (i - this.dx);
      let s = this.minCutoff + this.beta * Math.abs(this.dx),
        a = n._alpha(s, t);
      return ((this.x += a * (e - this.x)), this.x);
    }
    reset(e) {
      ((this.started = e != null), (this.x = e || 0), (this.dx = 0));
    }
  },
  Uu = class n {
    constructor(e) {
      let t = e || {};
      ((this.baseRange = t.range != null ? t.range : 0.42),
        (this.dead = t.dead != null ? t.dead : 0.03),
        (this.curve = t.curve != null ? t.curve : 0.45),
        (this.sensitivity = t.sensitivity != null ? t.sensitivity : 1),
        (this.invert = !!t.invert),
        (this.autoTrim = t.autoTrim !== !1),
        (this.value = 0),
        (this.angle = 0),
        (this.reference = 0),
        (this.magnitude = 0),
        (this.available = !1),
        (this.live = !1),
        (this.permission = "unknown"),
        (this.calibrated = !1),
        (this.screenAngle = 0),
        (this.angleSign = 1),
        (this.samples = 0),
        (this._filter = new Rl(t.minCutoff != null ? t.minCutoff : 1.2, t.beta != null ? t.beta : 0.6, 1)),
        (this._calSum = 0),
        (this._calN = 0),
        (this._calWant = 0),
        (this._lastEvent = 0),
        (this._quietFor = 0),
        (this._prevAngle = 0),
        (this._sy = 0),
        (this._sx = 0),
        (this._sz = -1),
        (this._flipChecked = !1),
        (this._onOrient = this._onOrient.bind(this)),
        (this._onMotion = this._onMotion.bind(this)),
        (this._onScreen = this._onScreen.bind(this)),
        (this._motionAttached = !1),
        (this.available =
          typeof window != "undefined" &&
          (typeof window.DeviceOrientationEvent != "undefined" || typeof window.DeviceMotionEvent != "undefined")));
    }
    static needsPermission() {
      return (
        typeof window != "undefined" &&
        typeof window.DeviceOrientationEvent != "undefined" &&
        typeof window.DeviceOrientationEvent.requestPermission == "function"
      );
    }
    async requestPermission() {
      if (!n.needsPermission()) return ((this.permission = "not-required"), !0);
      try {
        let e = await window.DeviceOrientationEvent.requestPermission();
        return ((this.permission = e === "granted" ? "granted" : "denied"), e === "granted");
      } catch {
        return ((this.permission = "denied"), !1);
      }
    }
    start() {
      this._started ||
        typeof window == "undefined" ||
        ((this._started = !0),
        this._readScreenAngle(),
        window.addEventListener("deviceorientation", this._onOrient, {
          passive: !0,
        }),
        window.screen &&
          window.screen.orientation &&
          window.screen.orientation.addEventListener &&
          window.screen.orientation.addEventListener("change", this._onScreen),
        window.addEventListener("orientationchange", this._onScreen),
        (this._fallbackTimer = setTimeout(() => {
          !this.live &&
            typeof window.DeviceMotionEvent != "undefined" &&
            (window.addEventListener("devicemotion", this._onMotion, {
              passive: !0,
            }),
            (this._motionAttached = !0));
        }, 1200)),
        this.recalibrate());
    }
    stop() {
      !this._started ||
        typeof window == "undefined" ||
        ((this._started = !1),
        clearTimeout(this._fallbackTimer),
        window.removeEventListener("deviceorientation", this._onOrient),
        this._motionAttached && window.removeEventListener("devicemotion", this._onMotion),
        (this._motionAttached = !1),
        window.screen &&
          window.screen.orientation &&
          window.screen.orientation.removeEventListener &&
          window.screen.orientation.removeEventListener("change", this._onScreen),
        window.removeEventListener("orientationchange", this._onScreen),
        (this.live = !1),
        (this.value = 0),
        this._filter.reset());
    }
    recalibrate(e) {
      ((this._calWant = e != null ? e : 14),
        (this._calSum = 0),
        (this._calN = 0),
        (this.calibrated = !1),
        (this._flipChecked = !1),
        this._filter.reset(),
        (this.value = 0));
    }
    _readScreenAngle() {
      let e = 0;
      if (typeof window == "undefined") {
        this.screenAngle = 0;
        return;
      }
      (window.screen && window.screen.orientation && typeof window.screen.orientation.angle == "number"
        ? (e = window.screen.orientation.angle)
        : typeof window.orientation == "number" && (e = window.orientation),
        (this.screenAngle = ((e % 360) + 360) % 360));
    }
    _onScreen() {
      (this._readScreenAngle(), this.recalibrate(10));
    }
    _ingest(e, t, i) {
      let r = Math.sqrt(e * e + t * t + i * i);
      if (!(r > 0.2)) return;
      ((e /= r), (t /= r), (i /= r));
      let s = (this.screenAngle * this.angleSign * Math.PI) / 180,
        a = Math.cos(s),
        o = Math.sin(s),
        c = e * a - t * o,
        l = e * o + t * a,
        h = i;
      if (
        ((this._sx = c),
        (this._sy = l),
        (this._sz = h),
        !this._flipChecked && Math.abs(l) > 0.45 && ((this._flipChecked = !0), l > 0))
      ) {
        ((this.angleSign = -this.angleSign), (this._calSum = 0), (this._calN = 0));
        return;
      }
      let p = Math.atan2(c, Math.sqrt(l * l + h * h));
      ((this.angle = p),
        (this.magnitude = jt(Math.sqrt(c * c + l * l) / 0.6, 0, 1)),
        this.samples++,
        (this.live = !0),
        (this._lastEvent = 0),
        this._calN < this._calWant &&
          ((this._calSum += p),
          this._calN++,
          this._calN >= this._calWant && ((this.reference = this._calSum / this._calN), (this.calibrated = !0))));
    }
    _onOrient(e) {
      if (e.beta == null || e.gamma == null) return;
      let t = (e.beta * Math.PI) / 180,
        i = (e.gamma * Math.PI) / 180,
        r = Math.cos(t);
      this._ingest(r * Math.sin(i), -Math.sin(t), -r * Math.cos(i));
    }
    _onMotion(e) {
      let t = e.accelerationIncludingGravity;
      !t || t.x == null || this._ingest(-t.x, -t.y, -t.z);
    }
    update(e) {
      if (!this.live) return ((this.value = 0), 0);
      if (((this._lastEvent += e), this._lastEvent > 1.5)) return ((this.live = !1), (this.value = 0), 0);
      let t = Nu(this.angle - this.reference),
        i = this.baseRange / jt(this.sensitivity, 0.4, 2.5),
        r = Gu(t, this.dead, i, this.curve);
      if (
        ((r = this._filter.filter(r, e)),
        Math.abs(r) < 0.0025 && (r = 0),
        (r = Fs(r)),
        (this.value = this.invert ? -r : r),
        this.autoTrim && this.calibrated)
      ) {
        let s = Math.abs(Nu(this.angle - this._prevAngle)) / Math.max(e, 1e-4);
        Math.abs(this.value) < 0.2 && s < 0.25
          ? ((this._quietFor += e),
            this._quietFor > 1.2 && (this.reference = qi(this.reference, this.angle, 0.25, e)))
          : (this._quietFor = 0);
      }
      return ((this._prevAngle = this.angle), this.value);
    }
  };
function Hu() {
  if (typeof window == "undefined" || typeof navigator == "undefined") return !1;
  let n = (navigator.maxTouchPoints || 0) > 0 || "ontouchstart" in window,
    e = typeof window.DeviceOrientationEvent != "undefined";
  return n && e;
}
var Ou = class {
    constructor(e) {
      let t = e || {};
      ((this.enabled = t.enabled !== !1),
        (this.travel = t.travel != null ? t.travel : 78),
        (this.dead = t.dead != null ? t.dead : 4),
        (this.curve = t.curve != null ? t.curve : 0.5),
        (this.sensitivity = t.sensitivity != null ? t.sensitivity : 1),
        (this.zone = t.zone != null ? t.zone : 0.55),
        (this.topGuard = t.topGuard != null ? t.topGuard : 0.22),
        (this.value = 0),
        (this.active = !1),
        (this.originX = 0),
        (this.x = 0),
        (this.pointerId = -1),
        (this._filter = new Rl(3, 0.4, 1)),
        (this._el = null),
        (this._down = this._down.bind(this)),
        (this._move = this._move.bind(this)),
        (this._up = this._up.bind(this)));
    }
    attach(e) {
      (this._el && this.detach(),
        (this._el = e),
        e.addEventListener("pointerdown", this._down),
        e.addEventListener("pointermove", this._move),
        e.addEventListener("pointerup", this._up),
        e.addEventListener("pointercancel", this._up),
        e.addEventListener("lostpointercapture", this._up));
    }
    detach() {
      let e = this._el;
      e &&
        (e.removeEventListener("pointerdown", this._down),
        e.removeEventListener("pointermove", this._move),
        e.removeEventListener("pointerup", this._up),
        e.removeEventListener("pointercancel", this._up),
        e.removeEventListener("lostpointercapture", this._up),
        (this._el = null),
        this.release());
    }
    release() {
      ((this.active = !1), (this.pointerId = -1), (this.value = 0), this._filter.reset(0));
    }
    _inZone(e) {
      let t = (this._el && this._el.clientWidth) || (typeof innerWidth != "undefined" ? innerWidth : 844),
        i = (this._el && this._el.clientHeight) || (typeof innerHeight != "undefined" ? innerHeight : 390);
      return e.clientX <= t * this.zone && e.clientY >= i * this.topGuard;
    }
    _down(e) {
      if (
        !(!this.enabled || this.active) &&
        !(e.target && e.target.closest && e.target.closest("button,[data-nosteer]")) &&
        this._inZone(e) &&
        ((this.active = !0),
        (this.pointerId = e.pointerId),
        (this.originX = e.clientX),
        (this.x = e.clientX),
        this._filter.reset(0),
        this._el && this._el.setPointerCapture)
      )
        try {
          this._el.setPointerCapture(e.pointerId);
        } catch {}
    }
    _move(e) {
      if (!this.active || e.pointerId !== this.pointerId) return;
      this.x = e.clientX;
      let t = this._travelPx(),
        i = this.x - this.originX;
      i > t ? (this.originX = this.x - t) : i < -t && (this.originX = this.x + t);
    }
    _up(e) {
      this.active && e.pointerId === this.pointerId && this.release();
    }
    _travelPx() {
      let e = (this._el && this._el.clientHeight) || (typeof innerHeight != "undefined" ? innerHeight : 390);
      return Math.max(34, this.travel * (e / 390)) / jt(this.sensitivity, 0.4, 2.5);
    }
    update(e) {
      if ((!this.enabled && this.active && this.release(), !this.active))
        return (
          (this.value = qi(this.value, 0, 16, e)),
          Math.abs(this.value) < 0.004 && (this.value = 0),
          this.value
        );
      let t = this._travelPx(),
        i = Gu(this.x - this.originX, this.dead, t, this.curve);
      return ((i = this._filter.filter(i, e)), Math.abs(i) < 0.004 && (i = 0), (this.value = Fs(i)), this.value);
    }
  },
  Fu = class {
    constructor(e) {
      let t = e || {};
      ((this.rise = t.rise != null ? t.rise : 9),
        (this.fall = t.fall != null ? t.fall : 15),
        (this.enabled = t.enabled !== !1),
        (this.value = 0),
        (this.left = !1),
        (this.right = !1),
        (this._bound = []));
    }
    bind(e, t) {
      if (!e) return;
      let i = this,
        r = (a) => {
          if ((a.preventDefault(), !!i.enabled)) {
            (t === "left" ? (i.left = !0) : (i.right = !0), e.classList.add("pressed"));
            try {
              e.setPointerCapture(a.pointerId);
            } catch {}
          }
        },
        s = (a) => {
          (t === "left" ? (i.left = !1) : (i.right = !1), e.classList.remove("pressed"));
        };
      (e.addEventListener("pointerdown", r),
        e.addEventListener("pointerup", s),
        e.addEventListener("pointercancel", s),
        e.addEventListener("lostpointercapture", s),
        this._bound.push([e, r, s]));
    }
    releaseAll() {
      ((this.left = this.right = !1), (this.value = 0));
      for (let e of this._bound) e[0].classList.remove("pressed");
    }
    update(e) {
      let t = (this.right ? 1 : 0) - (this.left ? 1 : 0),
        i = t === 0 ? this.fall : this.rise;
      return (
        (this.value = qi(this.value, t, i, e)),
        t === 0 && Math.abs(this.value) < 0.004 && (this.value = 0),
        this.value
      );
    }
  },
  Bu = class {
    constructor(e) {
      let t = e || {};
      ((this.rise = t.rise != null ? t.rise : 10),
        (this.fall = t.fall != null ? t.fall : 16),
        (this.value = 0),
        (this.left = !1),
        (this.right = !1),
        (this.drift = !1),
        (this.brake = !1),
        (this.look = !1),
        (this.itemEdge = 0),
        (this.driftEdge = 0),
        (this._down = this._down.bind(this)),
        (this._up = this._up.bind(this)));
    }
    attach(e) {
      ((this._target = e || window),
        this._target.addEventListener("keydown", this._down),
        this._target.addEventListener("keyup", this._up));
    }
    detach() {
      this._target &&
        (this._target.removeEventListener("keydown", this._down),
        this._target.removeEventListener("keyup", this._up),
        (this._target = null));
    }
    releaseAll() {
      ((this.left = this.right = this.drift = this.brake = this.look = !1), (this.value = 0));
    }
    _down(e) {
      switch (e.code) {
        case "ArrowLeft":
        case "KeyA":
          ((this.left = !0), e.preventDefault());
          break;
        case "ArrowRight":
        case "KeyD":
          ((this.right = !0), e.preventDefault());
          break;
        case "ShiftLeft":
        case "ShiftRight":
          (this.drift || this.driftEdge++, (this.drift = !0), e.preventDefault());
          break;
        case "ArrowDown":
        case "KeyS":
          ((this.brake = !0), e.preventDefault());
          break;
        case "KeyC":
          this.look = !0;
          break;
        case "Space":
          (e.repeat || this.itemEdge++, e.preventDefault());
          break;
        default:
          break;
      }
    }
    _up(e) {
      switch (e.code) {
        case "ArrowLeft":
        case "KeyA":
          this.left = !1;
          break;
        case "ArrowRight":
        case "KeyD":
          this.right = !1;
          break;
        case "ShiftLeft":
        case "ShiftRight":
          this.drift = !1;
          break;
        case "ArrowDown":
        case "KeyS":
          this.brake = !1;
          break;
        case "KeyC":
          this.look = !1;
          break;
        default:
          break;
      }
    }
    update(e) {
      let t = (this.right ? 1 : 0) - (this.left ? 1 : 0);
      return (
        (this.value = qi(this.value, t, t === 0 ? this.fall : this.rise, e)),
        t === 0 && Math.abs(this.value) < 0.004 && (this.value = 0),
        this.value
      );
    }
  },
  zu = class {
    constructor(e) {
      let t = e || {};
      ((this.dead = t.dead != null ? t.dead : 0.14),
        (this.curve = t.curve != null ? t.curve : 0.5),
        (this.sensitivity = t.sensitivity != null ? t.sensitivity : 1),
        (this.value = 0),
        (this.connected = !1),
        (this.drift = !1),
        (this.brake = !1),
        (this.item = !1),
        (this.look = !1),
        (this.driftEdge = 0),
        (this.itemEdge = 0),
        (this._pDrift = !1),
        (this._pItem = !1));
    }
    update() {
      if (((this.connected = !1), (this.value = 0), typeof navigator == "undefined" || !navigator.getGamepads))
        return 0;
      let e = navigator.getGamepads(),
        t = null;
      for (let l = 0; l < e.length; l++)
        if (e[l] && e[l].connected) {
          t = e[l];
          break;
        }
      if (!t) return ((this.drift = this.brake = this.item = !1), (this._pDrift = this._pItem = !1), 0);
      this.connected = !0;
      let i = t.axes && t.axes.length > 0 ? t.axes[0] : 0,
        r = Gu(i, this.dead, 1 / jt(this.sensitivity, 0.4, 2.5), this.curve),
        s = t.buttons || [],
        a = (l) => !!(s[l] && (s[l].pressed || s[l].value > 0.5));
      (a(14) ? (r = -1) : a(15) && (r = 1), (this.value = Fs(r)));
      let o = a(0) || a(7) || a(5),
        c = a(2) || a(6) || a(4);
      return (
        (this.brake = a(1)),
        (this.look = a(3)),
        o && !this._pDrift && this.driftEdge++,
        c && !this._pItem && this.itemEdge++,
        (this._pDrift = o),
        (this._pItem = c),
        (this.drift = o),
        (this.item = c),
        this.value
      );
    }
  },
  ku = class {
    constructor(e) {
      let t = e || {};
      ((this.tilt = new Uu(t.tilt)),
        (this.pad = new Ou(t.pad)),
        (this.buttons = new Fu(t.buttons)),
        (this.keys = new Bu(t.keys)),
        (this.gamepad = new zu(t.gamepad)),
        (this._scheme = "auto"),
        (this.scheme = t.scheme || "auto"),
        (this.handoff = t.handoff != null ? t.handoff : 0.35),
        (this.enabled = !0),
        (this.steer = 0),
        (this.left = !1),
        (this.right = !1),
        (this.drift = !1),
        (this.driftPressed = !1),
        (this.item = !1),
        (this.itemPressed = !1),
        (this.brake = !1),
        (this.look = !1),
        (this.source = "none"),
        (this.digitalThreshold = t.digitalThreshold != null ? t.digitalThreshold : 0.22),
        (this._owner = "none"),
        (this._quiet = 0),
        (this._driftHeld = !1),
        (this._itemHeld = !1),
        (this._driftQueue = 0),
        (this._itemQueue = 0),
        (this._btnDrift = !1),
        (this._btnBrake = !1),
        (this._btnLook = !1),
        (this._bound = []));
    }
    _applyScheme() {
      let e = this._scheme,
        t = e === "pad" || e === "auto";
      this.pad.enabled !== t && ((this.pad.enabled = t), t || this.pad.release());
      let i = e === "buttons" || e === "auto";
      this.buttons.enabled !== i && ((this.buttons.enabled = i), i || this.buttons.releaseAll());
    }
    get scheme() {
      return this._scheme;
    }
    set scheme(e) {
      ((this._scheme = e || "auto"), this._applyScheme());
    }
    attach(e) {
      ((e = e || {}),
        e.surface && this.pad.attach(e.surface),
        e.left && this.buttons.bind(e.left, "left"),
        e.right && this.buttons.bind(e.right, "right"),
        e.drift && this._bindHold(e.drift, "_btnDrift", "_driftQueue"),
        e.brake && this._bindHold(e.brake, "_btnBrake", null),
        e.look && this._bindHold(e.look, "_btnLook", null),
        e.item && this._bindTap(e.item, "_itemQueue"),
        this.keys.attach(e.keyTarget || (typeof window != "undefined" ? window : null)),
        typeof window != "undefined" &&
          ((this._blur = () => this.releaseAll()), window.addEventListener("blur", this._blur)));
    }
    _bindHold(e, t, i) {
      let r = this,
        s = (o) => {
          (o.preventDefault(), (r[t] = !0), i && r[i]++, e.classList.add("pressed"));
          try {
            e.setPointerCapture(o.pointerId);
          } catch {}
        },
        a = () => {
          ((r[t] = !1), e.classList.remove("pressed"));
        };
      (e.addEventListener("pointerdown", s),
        e.addEventListener("pointerup", a),
        e.addEventListener("pointercancel", a),
        e.addEventListener("lostpointercapture", a),
        this._bound.push([e, s, a]));
    }
    _bindTap(e, t) {
      let i = this,
        r = (a) => {
          (a.preventDefault(), i[t]++, e.classList.add("pressed"));
        },
        s = () => e.classList.remove("pressed");
      (e.addEventListener("pointerdown", r),
        e.addEventListener("pointerup", s),
        e.addEventListener("pointercancel", s),
        this._bound.push([e, r, s]));
    }
    releaseAll() {
      (this.pad.release(),
        this.buttons.releaseAll(),
        this.keys.releaseAll(),
        (this._btnDrift = this._btnBrake = this._btnLook = !1),
        (this._driftQueue = this._itemQueue = 0),
        (this.steer = 0),
        (this.left = this.right = !1),
        (this.drift = this.item = this.brake = this.look = !1),
        (this.driftPressed = this.itemPressed = !1),
        (this._owner = "none"),
        (this.source = "none"));
    }
    async enableTilt() {
      let e = await this.tilt.requestPermission();
      return (e && this.tilt.start(), e);
    }
    disableTilt() {
      this.tilt.stop();
    }
    recalibrateTilt() {
      this.tilt.recalibrate();
    }
    setSensitivity(e) {
      ((this.tilt.sensitivity = jt(e, 0.4, 2.5)), (this.pad.sensitivity = jt(e, 0.4, 2.5)));
    }
    setInvert(e) {
      this.tilt.invert = !!e;
    }
    update(e) {
      if (!this.enabled) return ((this.steer = 0), (this.left = this.right = !1), this);
      this._applyScheme();
      let t = this._scheme === "auto" || this._scheme === "tilt",
        i = this.pad.enabled,
        r = this.buttons.enabled,
        s = t ? this.tilt.update(e) : (this.tilt.value = 0),
        a = i ? this.pad.update(e) : (this.pad.value = 0),
        o = r ? this.buttons.update(e) : (this.buttons.value = 0),
        c = this.keys.update(e),
        l = this.gamepad.update(),
        h = "none",
        p = 0;
      if (
        (i && this.pad.active
          ? ((h = "pad"), (p = a))
          : r && (this.buttons.left || this.buttons.right)
            ? ((h = "buttons"), (p = o))
            : this.keys.left || this.keys.right
              ? ((h = "keys"), (p = c))
              : this.gamepad.connected && Math.abs(l) > 0.03
                ? ((h = "gamepad"), (p = l))
                : Math.abs(s) > 0.02 && this.tilt.live && ((h = "tilt"), (p = s)),
        h === "none")
      ) {
        this._quiet += e;
        let y = this._owner === "pad" ? i : this._owner === "buttons" ? r : this._owner === "tilt" ? t : !0;
        this._quiet < this.handoff && this._owner !== "none" && y
          ? ((h = this._owner),
            (p = h === "pad" ? a : h === "buttons" ? o : h === "keys" ? c : h === "gamepad" ? l : s))
          : ((this._owner = "none"), (p = 0));
      } else ((this._quiet = 0), (this._owner = h));
      ((this.steer = Fs(p)), (this.source = this._owner));
      let u = this.digitalThreshold;
      ((this.left = this.steer < -u), (this.right = this.steer > u));
      let f = this._btnDrift || this.keys.drift || this.gamepad.drift;
      ((this.driftPressed =
        (f && !this._driftHeld) || this._driftQueue > 0 || this.keys.driftEdge > 0 || this.gamepad.driftEdge > 0),
        (this._driftHeld = f),
        (this.drift = f),
        (this._driftQueue = 0),
        (this.keys.driftEdge = 0),
        (this.gamepad.driftEdge = 0));
      let g = this.gamepad.item;
      return (
        (this.itemPressed = this._itemQueue > 0 || this.keys.itemEdge > 0 || (g && !this._itemHeld)),
        (this._itemHeld = g),
        (this.item = g || this._itemQueue > 0),
        (this._itemQueue = 0),
        (this.keys.itemEdge = 0),
        (this.gamepad.itemEdge = 0),
        (this.brake = this._btnBrake || this.keys.brake || this.gamepad.brake),
        (this.look = this._btnLook || this.keys.look || this.gamepad.look),
        this
      );
    }
  };
function Uf(n) {
  return new ku(n);
}
function Vu(n, e, t) {
  let i = (t && t.samples) || 360,
    r = n.length,
    s = (e && e.grip) || 1,
    a = new Float32Array(i),
    o = new Float32Array(i),
    c = new Float32Array(i * 3),
    l = n.frames,
    h = l ? l.length - 1 : 0;
  for (let d = 0; d < i; d++) {
    let m, x, b;
    if (l) {
      let w = l[Math.round((d * h) / i) % h];
      ((m = w.v.x), (x = w.v.y), (b = w.v.z));
    } else {
      let w = n.frame(d / i);
      ((m = w.dir.x), (x = w.dir.y), (b = w.dir.z));
    }
    ((c[d * 3] = m), (c[d * 3 + 1] = x), (c[d * 3 + 2] = b), (o[d] = x));
  }
  let p = r / i;
  for (let d = 0; d < i; d++) {
    let m = (d - 1 + i) % i,
      x = (d + 1) % i,
      b = Math.atan2(c[x * 3], c[x * 3 + 2]) - Math.atan2(c[m * 3], c[m * 3 + 2]);
    a[d] = -Nu(b) / (2 * p);
  }
  let u = new Float32Array(i);
  for (let d = 0; d < i; d++) u[d] = (a[(d - 1 + i) % i] + 2 * a[d] + a[(d + 1) % i]) * 0.25;
  a.set(u);
  let f = [],
    g = 0.0075,
    y = 0.0045,
    v = 0;
  for (; v < i;)
    if (Math.abs(a[v]) > g) {
      let d = Math.sign(a[v]),
        m = v;
      for (; m > 0 && Math.abs(a[m - 1]) > y && Math.sign(a[m - 1]) === d;) m--;
      let x = v,
        b = v,
        w = 0,
        A = 0;
      for (; x + 1 < i && Math.abs(a[x + 1]) > y && Math.sign(a[x + 1]) === d;)
        (x++, Math.abs(a[x]) > Math.abs(a[b]) && (b = x));
      for (let F = m; F <= x; F++) ((w += Math.abs(a[F])), A++);
      let C = A * p;
      (f.push({
        startT: m / i,
        apexT: b / i,
        endT: x / i,
        dir: d,
        peak: Math.abs(a[b]),
        arc: C,
        severity: T1(Math.abs(a[b])),
        driftPerSpeed: ((w / Math.max(1, A)) * 0.022 * C) / Math.max(0.35, s),
      }),
        (v = x + 1));
    } else v++;
  return {
    samples: i,
    length: r,
    curvature: a,
    grade: o,
    corners: f,
    grip: s,
    step: p,
  };
}
function T1(n) {
  return n < 0.0075 ? 0 : n < 0.0098 ? 1 : n < 0.0118 ? 2 : 3;
}
function Pl(n, e, t) {
  let i = Os(t) * e,
    r = Math.floor(i),
    s = i - r,
    a = n[r % e],
    o = n[(r + 1) % e];
  return a + (o - a) * s;
}
var Ll = class {
    constructor(e) {
      let t = e || {};
      ((this.baseBack = t.back != null ? t.back : 9.9),
        (this.baseHeight = t.height != null ? t.height : 5.55),
        (this.baseAhead = t.ahead != null ? t.ahead : 10.4),
        (this.baseLookHeight = t.lookHeight != null ? t.lookHeight : 0.75),
        (this.frameBias = t.frameBias != null ? t.frameBias : 0.8),
        (this.laneFollow = t.laneFollow != null ? t.laneFollow : 0.54),
        (this.laneFollowFar = t.laneFollowFar != null ? t.laneFollowFar : 0.86),
        (this.lookLaneMatch = t.lookLaneMatch != null ? t.lookLaneMatch : 0.9),
        (this.baseFov = t.fov != null ? t.fov : 56),
        (this.portraitFov = t.portraitFov != null ? t.portraitFov : 68),
        (this.speedFov = t.speedFov != null ? t.speedFov : 4.5),
        (this.boostFov = t.boostFov != null ? t.boostFov : 6),
        (this.speedPull = t.speedPull != null ? t.speedPull : 0.5),
        (this.speedAhead = t.speedAhead != null ? t.speedAhead : 1.6),
        (this.driftLean = t.driftLean != null ? t.driftLean : 1.3),
        (this.driftLook = t.driftLook != null ? t.driftLook : 1.5),
        (this.cornerLook = t.cornerLook != null ? t.cornerLook : 2.2),
        (this.crestRise = t.crestRise != null ? t.crestRise : 1.5),
        (this.crestLook = t.crestLook != null ? t.crestLook : 0.8),
        (this.roll = t.roll != null ? t.roll : 0.022),
        (this.maxLane = t.maxLane != null ? t.maxLane : 9.2),
        (this.minHeight = t.minHeight != null ? t.minHeight : 3),
        (this.maxHeight = t.maxHeight != null ? t.maxHeight : 8),
        (this.rBack = t.rBack != null ? t.rBack : 4),
        (this.rLane = t.rLane != null ? t.rLane : 5),
        (this.rHeight = t.rHeight != null ? t.rHeight : 3.2),
        (this.rAhead = t.rAhead != null ? t.rAhead : 2.5),
        (this.rFov = t.rFov != null ? t.rFov : 2.2),
        (this.rRoll = t.rRoll != null ? t.rRoll : 4),
        (this.rLook = t.rLook != null ? t.rLook : 3.5),
        (this.refSpeed = t.refSpeed != null ? t.refSpeed : 56),
        (this.ready = !1),
        (this.back = this.baseBack),
        (this.lane = 0),
        (this.height = this.baseHeight),
        (this.ahead = this.baseAhead),
        (this.lookLane = 0),
        (this.lookHeight = this.baseLookHeight),
        (this.fov = this.baseFov),
        (this.rollNow = 0),
        (this.lookBack = 0),
        (this.shake = 0),
        (this._shakePhase = 0),
        (this._p = {
          x: 0,
          y: 0,
          z: 0,
        }),
        (this._l = {
          x: 0,
          y: 0,
          z: 0,
        }));
    }
    reset() {
      ((this.ready = !1),
        (this.shake = 0),
        (this.lookBack = 0),
        (this.back = this.baseBack),
        (this.height = this.baseHeight),
        (this.ahead = this.baseAhead),
        (this.lane = 0),
        (this.lookLane = 0),
        (this.lookHeight = this.baseLookHeight),
        (this.fov = this.baseFov),
        (this.rollNow = 0));
    }
    kick(e) {
      this.shake = jt(this.shake + (e || 0.5), 0, 1);
    }
    _sample(e, t, i, r, s) {
      let a = e.frames;
      if (a) {
        let o = a.length - 1,
          c = Os(t) * o,
          l = Math.floor(c),
          h = c - l,
          p = a[l],
          u = a[l + 1] || a[0],
          f = p.p.x + (u.p.x - p.p.x) * h,
          g = p.p.y + (u.p.y - p.p.y) * h,
          y = p.p.z + (u.p.z - p.p.z) * h,
          v = p.right.x + (u.right.x - p.right.x) * h,
          d = p.right.y + (u.right.y - p.right.y) * h,
          m = p.right.z + (u.right.z - p.right.z) * h,
          x = Math.sqrt(v * v + d * d + m * m) || 1;
        ((s.x = f + (v / x) * i), (s.y = g + (d / x) * i + r), (s.z = y + (m / x) * i));
      } else {
        let o = e.frame(t, i, r);
        ((s.x = o.p.x), (s.y = o.p.y), (s.z = o.p.z));
      }
      return s;
    }
    update(e, t, i, r, s, a) {
      let o = t.player,
        c = i.length;
      if (!(c > 0)) return;
      let l = Os(o.distance / c),
        h = jt(o.speed / this.refSpeed, 0, 1.15),
        p = o.boost > 0 ? 1 : 0,
        u = 0,
        f = 0;
      if (a) {
        let ve = (this.ahead + 8) / c;
        ((u = Pl(a.curvature, a.samples, l + ve)), (f = Pl(a.grade, a.samples, l + (this.ahead * 0.6) / c)));
      } else i.curvature && (u = i.curvature(Os(l + (this.ahead + 8) / c)));
      let g = jt(u / 0.012, -1, 1),
        y = o.drifting ? 1 : 0,
        v = o.driftDir || 0,
        d = jt(Math.abs(o.lane) / 11.4, 0, 1),
        m = this.laneFollow + (this.laneFollowFar - this.laneFollow) * d * d,
        x = 1 - 0.5 * d,
        b = this.baseBack - this.speedPull * h + y * 0.5,
        w = jt(o.lane * m - v * this.driftLean * y + this.frameBias, -this.maxLane, this.maxLane),
        A = this.baseHeight + jt(-f * 4.5, -0.9, 1) * this.crestRise;
      A = jt(A, this.minHeight, this.maxHeight);
      let C = this.baseLookHeight + (A - this.baseHeight) * this.crestLook,
        F = this.baseAhead + this.speedAhead * h,
        N = jt(
          o.lane * m * this.lookLaneMatch + this.frameBias + (g * this.cornerLook + v * this.driftLook * y) * x,
          -9,
          9,
        ),
        G = this.roll * (v * y * 0.8 + g * 0.4),
        W = s && s.look ? 1 : 0;
      ((this.lookBack = qi(this.lookBack, W, 5, e)),
        this.ready
          ? ((this.back = qi(this.back, b, this.rBack, e)),
            (this.lane = qi(this.lane, w, this.rLane, e)),
            (this.height = qi(this.height, A, this.rHeight, e)),
            (this.ahead = qi(this.ahead, F, this.rAhead, e)),
            (this.lookLane = qi(this.lookLane, N, this.rLook, e)),
            (this.lookHeight = qi(this.lookHeight, C, this.rHeight, e)),
            (this.rollNow = qi(this.rollNow, G, this.rRoll, e)))
          : ((this.back = b),
            (this.lane = w),
            (this.height = A),
            (this.ahead = F),
            (this.lookLane = N),
            (this.rollNow = 0),
            (this.lookHeight = C),
            (this.fov = this._portrait() ? this.portraitFov : this.baseFov),
            (this.ready = !0)));
      let B = this.lookBack,
        $ = -this.back * (1 - B) + this.back * 0.75 * B,
        Z = this.ahead * (1 - B) - this.ahead * 1.3 * B,
        ie = this.height;
      (this.shake > 0 &&
        ((this._shakePhase += e * 34),
        (ie += Math.sin(this._shakePhase) * this.shake * 0.28),
        (this.shake = Math.max(0, this.shake - e * 2.4))),
        this._sample(i, l + $ / c, jt(this.lane, -this.maxLane, this.maxLane), ie, this._p),
        this._sample(i, l + Z / c, this.lookLane, this.lookHeight, this._l),
        r.position.set(this._p.x, this._p.y, this._p.z),
        r.lookAt(this._l.x, this._l.y, this._l.z),
        this.rollNow !== 0 && r.rotateZ && r.rotateZ(this.rollNow * (1 - B)));
      let me = (this._portrait() ? this.portraitFov : this.baseFov) + this.speedFov * h + this.boostFov * p + B * 4;
      ((this.fov = qi(this.fov, me, this.rFov, e)),
        Math.abs(r.fov - this.fov) > 0.01 && ((r.fov = this.fov), r.updateProjectionMatrix()));
    }
    _portrait() {
      return typeof innerHeight != "undefined" && innerHeight > innerWidth;
    }
  },
  Il = class {
    constructor(e) {
      let t = e || {};
      ((this.lead = t.lead != null ? t.lead : 2.4),
        (this.shoulder = t.shoulder != null ? t.shoulder : 10),
        (this.active = !1),
        (this.dir = 0),
        (this.severity = 0),
        (this.text = "KEEP IT FLOWING"),
        (this.arrow = "\u2191"),
        (this.distance = 0),
        (this.time = 0),
        (this.urgency = 0),
        (this.drift = 0),
        (this.exitLane = 0),
        (this.risk = 0),
        (this.wide = !1),
        (this.steerHint = 0),
        (this.crest = !1),
        (this.chain = !1),
        (this.corner = null));
    }
    update(e, t, i) {
      let r = e.player,
        s = t.length;
      if (!i || !(s > 0) || i.corners.length === 0) return (this._clear(), this);
      let a = Os(r.distance / s),
        o = Math.max(8, r.speed),
        c = Math.min(s * 0.45, o * (this.lead + 1.2) + 30),
        l = i.corners,
        h = null,
        p = 1 / 0,
        u = -1;
      for (let v = 0; v < l.length; v++) {
        let d = (l[v].apexT - a) * s;
        (d < -12 && (d += s), !(d < -12 || d > c) && d < p && ((p = d), (h = l[v]), (u = v)));
      }
      let f = Pl(i.grade, i.samples, a + (o * 1.2 + 18) / s),
        g = Pl(i.grade, i.samples, a + 4 / s);
      if (((this.crest = g - f > 0.085), !h)) return (this._clear(), this);
      ((this.corner = h),
        (this.dir = h.dir),
        (this.severity = h.severity),
        (this.distance = p),
        (this.time = p / o),
        (this.urgency = jt(1 - this.time / (this.lead + 0.4), 0, 1)),
        (this.drift = h.driftPerSpeed * o),
        (this.exitLane = r.lane - h.dir * this.drift),
        (this.risk = jt((Math.abs(this.exitLane) - (this.shoulder - 2.5)) / 3.5, 0, 1)),
        (this.wide = Math.abs(this.exitLane) > this.shoulder),
        (this.steerHint = jt(h.dir * (0.3 + h.severity * 0.2) + jt(-this.exitLane * 0.05, -0.25, 0.25), -1, 1)));
      let y = l[(u + 1) % l.length];
      return (
        (this.chain = !!y && y !== h && Os(y.startT - h.endT) * s < Math.max(40, o * 0.8)),
        (this.active = this.time < this.lead || p < 12),
        (this.arrow = h.dir > 0 ? "\u21B1" : "\u21B0"),
        (this.text = E1[h.severity][h.dir > 0 ? 1 : 0]),
        this
      );
    }
    _clear() {
      ((this.active = !1),
        (this.dir = 0),
        (this.severity = 0),
        (this.urgency = 0),
        (this.drift = 0),
        (this.exitLane = 0),
        (this.risk = 0),
        (this.wide = !1),
        (this.steerHint = 0),
        (this.chain = !1),
        (this.distance = 0),
        (this.time = 0),
        (this.text = "KEEP IT FLOWING"),
        (this.arrow = "\u2191"),
        (this.corner = null));
    }
  },
  E1 = [
    ["KEEP IT FLOWING", "KEEP IT FLOWING"],
    ["LEFT BEND AHEAD", "RIGHT BEND AHEAD"],
    ["LEFT AHEAD", "RIGHT AHEAD"],
    ["TIGHT LEFT AHEAD", "TIGHT RIGHT AHEAD"],
  ],
  // Difficulty presets. Player-side numbers (steerGain, saver) are the locked
  // v2 values; everything else tunes the opposition (read by Za via race.knob()).
  //   easy      = ROOKIE   AI wander, rarely drift, random item timers, soft rubber band both ways
  //   normal    = PRO      AI mostly on the line, drift half the corners, items with intent
  //   hard      = ACE      leaders are never slowed to wait for you, AI drift most corners, block, weak front drops
  //   overdrive = OVERDRIVE AI drift every corner, block, avoid every hazard, use items instantly
  // 'rookie' | 'pro' | 'ace' remain as aliases so saved settings keep working.
  Dl = {
    easy: {
      key: "easy",
      label: "ROOKIE",
      aiSkill: [0.865, 0.935],
      rubberLead: 0.055,
      rubberBand: 0.055,
      rubberDist: 1250,
      steerGain: 0.92,
      saver: 0.55,
      aiLine: 0.55,
      aiDrift: 0.3,
      aiBlock: 0.15,
      aiAvoid: 0.35,
      aiShortcut: 0.25,
      aiItemIQ: 0.3,
      aiItemHold: 8,
      itemFrontNerf: 0,
      moverSpeed: 0.8,
    },
    normal: {
      key: "normal",
      label: "PRO",
      aiSkill: [0.95, 1.01],
      rubberLead: 0.035,
      rubberBand: 0.045,
      rubberDist: 1600,
      steerGain: 1,
      saver: 0.25,
      aiLine: 0.75,
      aiDrift: 0.7,
      aiBlock: 0.45,
      aiAvoid: 0.6,
      aiShortcut: 0.5,
      aiItemIQ: 0.6,
      aiItemHold: 6,
      itemFrontNerf: 0,
      moverSpeed: 1,
    },
    hard: {
      key: "hard",
      label: "ACE",
      aiSkill: [0.96, 1.015],
      rubberLead: 0,
      rubberBand: 0.03,
      rubberDist: 2e3,
      steerGain: 1.06,
      saver: 0,
      aiLine: 0.9,
      aiDrift: 0.75,
      aiBlock: 0.7,
      aiAvoid: 0.85,
      aiShortcut: 0.8,
      aiItemIQ: 0.85,
      aiItemHold: 5,
      itemFrontNerf: 0.6,
      moverSpeed: 1.15,
    },
    overdrive: {
      key: "overdrive",
      label: "OVERDRIVE",
      aiSkill: [1.0, 1.05],
      rubberLead: 0,
      rubberBand: 0.02,
      rubberDist: 2400,
      steerGain: 1.06,
      saver: 0,
      aiLine: 1,
      aiDrift: 1,
      aiBlock: 0.9,
      aiAvoid: 1,
      aiShortcut: 1,
      aiItemIQ: 1,
      aiItemHold: 3,
      itemFrontNerf: 1,
      moverSpeed: 1.3,
    },
  },
  Wu = "rookie";
((Dl.rookie = Dl.easy), (Dl.pro = Dl.normal), (Dl.ace = Dl.hard));
function Xu(n, e, t) {
  let i = typeof e == "string" ? Dl[e] || Dl.normal : e || Dl.normal,
    r = t || n.random || Math.random,
    s = i.aiSkill[0],
    a = i.aiSkill[1];
  for (let o = 0; o < n.racers.length; o++) {
    let c = n.racers[o];
    if (c.isPlayer) continue;
    let l = (o - 1) / 6;
    ((c.aiSkill = s + (a - s) * (0.25 + 0.75 * l) + (r() - 0.5) * 0.02),
      (c.aiShortcut = void 0),
      (c.aiAvoid = void 0));
  }
  return (
    (n.rubberBand = i.rubberBand),
    (n.rubberDist = i.rubberDist),
    (n.steerGain = i.steerGain),
    (n.difficulty = i),
    (n.difficultyName = i.key || (typeof e == "string" ? e : "custom")),
    n
  );
}
function A1(n, e, t) {
  let i = t != null ? t : e.difficulty ? e.difficulty.saver : 0;
  if (!(i > 0)) return n;
  let r = e.player;
  if (Math.abs(n) > 0.12) return n;
  let a = Math.abs(r.lane) - (11.4 - 1.6);
  if (a <= 0 || !(r.lateralSpeed * Math.sign(r.lane) > 0)) return n;
  let c = -Math.sign(r.lane) * jt(a / 1.6, 0, 1) * 0.22 * i;
  return Fs(n + c);
}
function C1(n, e) {
  let t = e.player,
    i = 1 - 0.16 * jt(t.speed / 56, 0, 1.1),
    r = (e.steerGain != null ? e.steerGain : 1) * i;
  return Fs(n * r);
}
function Of(n, e) {
  let t = C1(n.steer, e);
  ((t = A1(t, e)), (n.steer = t));
  let i = 0.22;
  return ((n.left = t < -i), (n.right = t > i), n);
}
var R1 = {
  tap: 12,
  item: 25,
  boost: 40,
  hit: 60,
  scrape: 8,
  ui: 10,
};
