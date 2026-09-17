function Bs(n) {
  if (typeof navigator == "undefined" || !navigator.vibrate) return;
  let e = R1[n];
  if (e)
    try {
      navigator.vibrate(e);
    } catch {}
}
var oe = (n) => document.getElementById(n),
  fn = document.documentElement,
  rn = (n, e, t) => (n < e ? e : n > t ? t : n),
  Gf = "blufox-overdrive",
  Kt = {};
try {
  Kt = JSON.parse(localStorage.getItem(Gf) || "{}");
} catch {
  Kt = {};
}
var fr = Kt.records || {},
  Hf = {
    easy: "rookie",
    normal: "pro",
    hard: "ace",
    overdrive: "overdrive",
  },
  gt = {
    scheme: Kt.scheme || (Hu() ? "tilt" : "buttons"),
    sensitivity: typeof Kt.sensitivity == "number" ? Kt.sensitivity : 1,
    invert: !!Kt.invert,
    difficulty: Dl[Kt.difficulty] ? Kt.difficulty : Wu,
    music: typeof Kt.music == "number" ? Kt.music : 0.7,
    sfx: typeof Kt.sfx == "number" ? Kt.sfx : 0.85,
    quality: Kt.quality || null,
    tiltSeen: !!Kt.tiltSeen,
  },
  Vs = Number.isInteger(Kt.driver) ? rn(Kt.driver, 0, 7) : 0,
  _i = Number.isInteger(Kt.track) ? rn(Kt.track, 0, 5) : 0;
function mn() {
  try {
    localStorage.setItem(
      Gf,
      JSON.stringify({
        driver: Vs,
        track: _i,
        records: fr,
        sound: lt.enabled,
        scheme: gt.scheme,
        sensitivity: gt.sensitivity,
        invert: gt.invert,
        difficulty: gt.difficulty,
        music: gt.music,
        sfx: gt.sfx,
        quality: gt.quality,
        tiltSeen: gt.tiltSeen,
      }),
    );
  } catch {}
}
var mt = Nf(),
  Ff = ["classic", "bike", "buggy", "hover", "hotrod", "wedge", "truck", "van"],
  lt = {
    enabled: Kt.sound !== !1,
    started: !1,
    wanted: null,
    wantedOpts: null,
    init() {
      if (this.started) return !0;
      if (!this.enabled) return !1;
      let n = !!(_t && _t.quality === "low");
      return mt.unlock({
        lowPower: n,
      })
        ? ((this.started = !0),
          mt.musicVol(gt.music),
          mt.sfxVol(gt.sfx),
          mt.mute(!this.enabled),
          this.wanted !== null &&
            mt.setMusic(
              this.wanted,
              Object.assign(
                {
                  fade: 260,
                },
                this.wantedOpts || {},
              ),
            ),
          !0)
        : !1;
    },
    play(n, e) {
      let t = this.started && this.wanted === n && mt.musicId() === mt.trackSong(n);
      ((this.wanted = n),
        (this.wantedOpts = e || null),
        this.started &&
          ((t && !(e && e.restart)) ||
            mt.setMusic(
              n,
              Object.assign(
                {
                  fade: n === "menu" ? 420 : 300,
                },
                e || {},
              ),
            )));
    },
    resetIntensity() {
      if (this.started)
        for (let n = 0; n < 14; n++)
          mt.raceIntensity({
            position: 8,
            field: 8,
            lap: 1,
            laps: 3,
            speed: 0,
            topSpeed: 60,
            boost: !1,
            drift: !1,
            dt: 0.25,
          });
    },
    click(n) {
      this.started && mt.click(n);
    },
    toggle() {
      ((this.enabled = !this.enabled),
        this.enabled && this.init(),
        mt.mute(!this.enabled),
        this.enabled && mt.click("select"),
        this.label(),
        mn());
    },
    label() {
      let n = oe("sound");
      n &&
        ((n.innerHTML = "\u266A <span>" + (this.enabled ? "ON" : "OFF") + "</span>"),
        n.setAttribute("aria-label", this.enabled ? "Mute sound" : "Enable sound"));
    },
    idle() {
      !this.started || this._idle || ((this._idle = !0), mt.stopEngines(), mt.drift(0, 0), mt.scrape(0, 0));
    },
    frame(n) {
      if (!this.started || !Ge) return;
      this._idle = !1;
      let e = Ge.player,
        t = Ge.countdown <= 0 && !Ge.finished,
        i = 47 + ki[Vs].speed * 1.6;
      mt.engine(e.id, {
        on: t,
        rpm: rn(e.speed / i, 0, 1),
        load: rn(0.35 + Math.abs(e.steer || 0) * 0.5 + (e.boost > 0 ? 0.25 : 0), 0, 1),
        boost: e.boost > 0 ? 1 : 0,
        vol: 1,
        pan: 0,
        kind: Ff[e.id],
      });
      for (let r of Ge.racers) {
        if (r === e) continue;
        let s = L1(r.distance - e.distance, Ge.length),
          a = Math.abs(s),
          o = a > 46 ? 0 : (1 - a / 46) * (1 - a / 46) * 0.85;
        mt.engine(r.id, {
          on: t && o > 0.02 && r.finish === null,
          rpm: rn(r.speed / i, 0, 1),
          load: 0.5,
          boost: r.boost > 0 ? 1 : 0,
          vol: o,
          pan: rn((r.lane - e.lane) / 9, -1, 1) * (a < 8 ? 1 : 0.55),
          kind: Ff[r.id],
        });
      }
      (t &&
        mt.raceIntensity({
          position: Ge.position,
          field: 8,
          lap: Ge.lap,
          laps: 3,
          speed: e.speed,
          topSpeed: i,
          boost: e.boost > 0,
          drift: e.drifting,
          dt: n,
        }),
        mt.drift(t && e.drifting ? rn(0.45 + e.speed / 90, 0, 1) : 0, rn(e.drift / 3.2, 0, 1)),
        mt.scrape(t ? rn(e.wallScrape || 0, 0, 1) : 0, e.speed));
    },
  };
function L1(n, e) {
  return e > 0 ? Ut(n + e / 2, e) - e / 2 : n;
}
var Vf = ["pointerdown", "touchend", "keydown"];
function bfxAudioUnlock() {
  if ((lt.init(), mt.ready && mt.ctx && mt.ctx.state === "running")) for (let n of Vf) removeEventListener(n, bfxAudioUnlock, !0);
}
for (let n of Vf) addEventListener(n, bfxAudioUnlock, !0);
var _t = null,
  Yu = [],
  Ge = null,
  Ua = null,
  bi = "home",
  pn = !1,
  Xf = 0,
  Na = 0,
  Ul = 0,
  Gr = 0,
  Ol = null,
  Zu = 0,
  Bf = new Map(),
  ju = !1,
  Xn = new Cl(),
  Gs = new Ll(),
  Tn = new Il({
    shoulder: 10,
  }),
  Jt = Uf({
    scheme: gt.scheme,
    tilt: {
      sensitivity: gt.sensitivity,
      invert: gt.invert,
    },
    pad: {
      sensitivity: gt.sensitivity,
    },
  });
function jn(n) {
  if (!(n >= 0)) return "--:--.--";
  let e = Math.floor(n / 60),
    t = Math.floor(n % 60),
    i = Math.floor((n * 100) % 100);
  return String(e).padStart(2, "0") + ":" + String(t).padStart(2, "0") + "." + String(i).padStart(2, "0");
}
var jf = ["", "1ST", "2ND", "3RD", "4TH", "5TH", "6TH", "7TH", "8TH"],
  Hs = (n) => "#" + n.toString(16).padStart(6, "0");
function wn(n) {
  ((bi = n),
    document.querySelectorAll(".screen").forEach((e) => e.classList.toggle("active", e.id === n)),
    (oe("menu").hidden = !1),
    (oe("hud").hidden = !0),
    (oe("modal").hidden = !0),
    oe("speedLines").classList.remove("boosting"),
    (pn = !1),
    fn.setAttribute("data-paused", "0"),
    Jt.releaseAll(),
    n === "garage" && Fl(Vs),
    n === "circuits" && (Bl(_i), N1()),
    n === "settings" && e0(),
    lt.idle(),
    lt.play("menu"));
}
function Fl(n) {
  Vs = n;
  let e = ki[n],
    t = oe("driverPreview");
  ((t.src = Yu[n] || ""),
    (t.alt = e.name + " in their racing kart"),
    (oe("driverName").textContent = e.name),
    (oe("driverClass").textContent = e.title),
    (oe("driverDesc").textContent = e.desc));
  let i = document.querySelector(".driver-feature"),
    dc = Hs(e.color),
    ac = Hs(e.accent);
  (i && i.style.setProperty("--driver-color", dc),
    oe("garage") && (oe("garage").style.setProperty("--driver-color", dc), oe("garage").style.setProperty("--driver-accent", ac)),
    oe("driverPortrait") && bfxPortrait("driverPortrait", n),
    oe("driverNumplate") && (oe("driverNumplate").textContent = "0" + (n + 1)),
    (oe("stats").innerHTML = [
      ["SPEED", e.speed],
      ["HANDLING", e.handling],
      ["ACCEL", e.accel],
    ]
      .map(
        ([r, s]) =>
          `<div><span>${r}</span><div class="bar">${[0, 1, 2, 3, 4].map((k) => `<i class="${k < s ? "on" : ""}" style="--i:${k}"></i>`).join("")}</div><b>${s}</b></div>`,
      )
      .join("")),
    document.querySelectorAll(".driver-card").forEach((r, s) => {
      (r.classList.toggle("selected", s === n), r.setAttribute("aria-pressed", String(s === n)));
    }),
    mn());
}
function bfxPortrait(n, e) {
  let t = oe(n),
    i = (BFX_ASSETS.portraits && BFX_ASSETS.portraits[e]) || "";
  t.src !== i && ((t.src = i), (t.alt = ki[e].name + " portrait"));
  t.style.animation = "none";
  void t.offsetWidth;
  t.style.animation = "";
}
var qu = 100;
function I1(n) {
  let t = Array.from(
      {
        length: 144,
      },
      (d, m) => Ya(n, m / 144),
    ),
    i = t.map((d) => d.x),
    r = t.map((d) => d.z),
    s = Math.min(...i),
    a = Math.max(...i),
    o = Math.min(...r),
    c = Math.max(...r),
    l = Math.min(qu / (a - s || 1), qu / (c - o || 1)),
    h = (a + s) / 2,
    p = (c + o) / 2,
    u = qu / 2,
    f = (d) => [u + (d.x - h) * l, u + (d.z - p) * l],
    g =
      t
        .map((d, m) => {
          let [x, b] = f(d);
          return `${m ? "L" : "M"}${x.toFixed(1)},${b.toFixed(1)}`;
        })
        .join(" ") + "Z",
    [y, v] = f(t[0]);
  return {
    d: g,
    sx: y.toFixed(1),
    sy: v.toFixed(1),
  };
}
var D1 = "-9 -9 118 118";
async function N1() {
  return; // v3: circuit cards use BFX_ASSETS.skies slices; the six track loads are no longer needed here
  if (!ju) {
    ju = !0;
    try {
      for (let n = 0; n < 6 && bi === "circuits"; n++) {
        if (Bf.has(n)) continue;
        if ((await new Promise((r) => requestAnimationFrame(r)), bi !== "circuits")) break;
        let e = _t.thumbnail(n);
        Bf.set(n, e);
        let t = document.querySelector(`[data-track="${n}"] .track-visual`);
        if (!t) continue;
        let i = document.createElement("img");
        ((i.className = "course-image"),
          (i.alt = Li[n].name + " race view"),
          (i.src = e),
          t.prepend(i),
          t.classList.add("rendered"));
      }
    } catch (n) {
      console.warn("Circuit preview unavailable", n);
    } finally {
      ju = !1;
    }
  }
}
function Bl(n) {
  ((_i = n),
    document.querySelectorAll(".track-card").forEach((t, i) => {
      (t.classList.toggle("selected", i === n), t.setAttribute("aria-pressed", String(i === n)));
    }));
  let e = Li[n];
  ((oe("trackSelected").textContent = e.name),
    (oe("trackDetails").textContent = e.desc + (fr[n] ? " Best: " + jn(fr[n]) : "")),
    document.querySelectorAll(".track-card .best").forEach((t, i) => {
      let r = fr[i];
      ((t.innerHTML = r ? "<b>BEST</b>" + jn(r) : "<b>BEST</b>&mdash;"), t.classList.toggle("none", !r));
    }),
    mn());
}
function qf(n) {
  ((oe("modalContent").innerHTML = n),
    (oe("modal").hidden = !1),
    requestAnimationFrame(() => {
      let e = oe("modalContent").querySelector("button");
      e && e.focus();
    }));
}
function Oa() {
  oe("modal").hidden = !0;
}
function U1() {
  (lt.init(),
    lt.click("select"),
    qf(`<p class="eyebrow">WELCOME TO THE GRID</p><h2>Make every<br><em>corner count.</em></h2>
 <div class="how-row"><b>STEER</b><span>Tilt the phone, drag anywhere on the left of the glass, or use \u25C0 / \u25B6 and the arrow keys. Your kart accelerates automatically.</span></div>
 <div class="how-row"><b>DRIFT</b><span>Hold DRIFT (Shift) while steering. Charge the ring, then release for a boost.</span></div>
 <div class="how-row"><b>POWER-UPS</b><span>Drive through the purple cubes. Tap the item button or press Space.</span></div>
 <div class="how-row"><b>WIN</b><span>Three laps. Seven rivals. Stay off the shoulders and hit the bright boost strips.</span></div>
 <p>Best played in landscape with sound on.</p><button class="primary" id="closeHow">GOT IT <span>\u2192</span></button>`),
    (oe("closeHow").onclick = () => {
      (Oa(), oe("play").focus());
    }));
}
function zl() {
  (lt.init(), lt.click("select"), Oa());
  let n = oe("start");
  ((n.disabled = !0),
    (n.textContent = "BUILDING THE GRID\u2026"),
    setTimeout(() => {
      try {
        (_t.loadTrack(_i),
          Gs.reset(),
          (Ua = Vu(_t, Li[_i])),
          (Ge = new Za(_i, Vs, _t.length, (e) => _t.curvature(e), Math.random, _t.trackWorld)),
          Ge.setWorld(_t.trackWorld, _t.halfWidths),
          Xu(Ge, gt.difficulty),
          BFX_HOOKS.fire("raceStart", { race: Ge, engine: _t, difficulty: gt.difficulty }),
          (bfxFinishT = -1),
          (bi = "race"),
          (pn = !1),
          fn.setAttribute("data-paused", "0"),
          Jt.releaseAll(),
          (oe("menu").hidden = !0),
          (oe("hud").hidden = !1),
          Oa(),
          oe("hud").style.setProperty("--driver-color", Hs(ki[Vs].color)),
          (oe("raceBanner").textContent = ""),
          oe("raceBanner").classList.remove("show", "wrong", "final"),
          oe("hitFlash").classList.remove("on"),
          (bfxBannerT = 0),
          (oe("raceTrack").textContent = Li[_i].name.toUpperCase()),
          (oe("lapTotal").textContent = "3"),
          (oe("fieldSize").textContent = "8"),
          (oe("bestLap").textContent = "--:--.--"),
          (oe("lapTime").textContent = "00:00.00"),
          (oe("countdown").textContent = "3"),
          (oe("raceHint").hidden = !1),
          (oe("raceHint").style.opacity = "1"),
          (Ul = 7),
          (Na = 0),
          (Gr = 0),
          (Ol = null),
          clearTimeout(Zu),
          oe("toast").classList.remove("show"),
          (oe("toast").textContent = ""),
          Xn.reset && Xn.reset(),
          Kf(),
          Gs.update(0.016, Ge, _t, _t.camera, Jt, Ua),
          _t.sync(Ge, 0.016),
          Zf(0.016),
          mt.finalLap(!1),
          lt.resetIntensity(),
          lt.play(_i, {
            restart: !0,
            intensity: 0.22,
            fade: 240,
          }),
          mt.duck(0.7, 420));
      } catch (e) {
        (console.error(e), (oe("loadError").hidden = !1));
      } finally {
        ((n.disabled = !1), (n.innerHTML = "START YOUR ENGINES <span>\u2197</span>"));
      }
    }, 35));
}
function ks() {
  bi !== "race" ||
    (Ge && Ge.finished) ||
    ((pn = !pn),
    Jt.releaseAll(),
    fn.setAttribute("data-paused", pn ? "1" : "0"),
    pn
      ? (lt.idle(),
        qf(`<p class="eyebrow">TAKE A BREATHER</p><h2>Race <em>paused.</em></h2>
<p>${Math.round(Xn.fps)} FPS \xB7 ${_t.quality.toUpperCase()} QUALITY</p>
<button class="primary" id="resume">BACK TO THE RACE <span>\u2192</span></button>
<button class="secondary" id="restart">RESTART RACE</button>
<button class="secondary" id="leave">CHOOSE CIRCUIT</button>`),
        (oe("resume").onclick = ks),
        (oe("restart").onclick = zl),
        (oe("leave").onclick = () => wn("circuits")))
      : Oa());
}
var bfxBannerT = 0;
function bfxBanner(n, e) {
  let t = oe("raceBanner");
  if (!t) return;
  ((t.textContent = n), t.classList.remove("show", "wrong", "final"), void t.offsetWidth, t.classList.add("show", e), (bfxBannerT = e === "wrong" ? 1.2 : 2.3));
}
function O1(n, e) {
  let t = oe("toast");
  ((t.textContent = n),
    t.classList.remove("boost", "hit"),
    (e === "boost" || e === "hit") && t.classList.add(e),
    t.classList.add("show"),
    (Na = 1.8),
    e === "hit" && Bs("hit"));
  if (e === "hit" && n !== "SCRAPE!") {
    let i = oe("hitFlash");
    i && (i.classList.remove("on"), void i.offsetWidth, i.classList.add("on"));
  }
  (e === "lap" && /FINAL/.test(n) && bfxBanner("FINAL LAP", "final"),
    (e === "wrongway" || /WRONG WAY/.test(n)) && bfxBanner("WRONG WAY", "wrong"),
    e === "finalstretch" && bfxBanner(n, "final"));
}
function Yf() {
  for (let n of Ge.events)
    (n.kind || (n.kind = n.type),
      BFX_HOOKS.fire("raceEvent", n, { engine: _t, race: Ge }),
      lt.started && mt.raceEvent(n.text, n.type),
      n.type !== "count" && (O1(n.text, n.type), n.type === "hit" && Gs.kick(n.text === "SCRAPE!" ? 0.34 : 0.6)));
  Ge.events = [];
}
function F1() {
  bi !== "race" || pn || !Ge || (Ge.useItem() && (Yf(), Bs("item")));
}
function Zf(n) {
  let e = Ge.player,
    t = Ge.position;
  let pe = oe("position");
  (String(t) !== pe.textContent && ((pe.textContent = t), pe.classList.remove("pop"), void pe.offsetWidth, pe.classList.add("pop")),
    (oe("positionSuffix").textContent = jf[t].slice(1)),
    (oe("lap").textContent = Ge.lap),
    (oe("timer").textContent = jn(Ge.time)),
    (oe("lapTime").textContent = jn(Ge.lapElapsed)),
    (oe("bestLap").textContent = Ge.bestLap === null ? "--:--.--" : jn(Ge.bestLap)));
  let lr = oe("lapRing");
  if (lr && Ge.length > 0) {
    let q = (e.distance / Ge.length) % 1;
    (q < 0 && (q += 1), lr.style.setProperty("--p", q.toFixed(3)));
  }
  oe("dash") && oe("dash").classList.toggle("boosting", e.boost > 0);
  bfxBannerT > 0 && ((bfxBannerT -= n), bfxBannerT <= 0 && ((oe("raceBanner").textContent = ""), oe("raceBanner").classList.remove("show", "wrong", "final")));
  let i = Math.round(e.speed * 3.6);
  ((oe("speed").textContent = i), oe("speedo").style.setProperty("--spd", rn(e.speed / 58, 0, 1).toFixed(3)));
  let r = rn(e.drift / 3.2, 0, 1),
    s = e.drift > 1.9 ? "2" : e.drift > 0.65 ? "1" : "0";
  ((oe("driftMeter").style.width = (r * 100).toFixed(1) + "%"),
    (oe("boostMeter").style.width = (rn(e.boost / 2.8, 0, 1) * 100).toFixed(1) + "%"),
    oe("charge").setAttribute("data-stage", s));
  let a = oe("drift");
  (a.style.setProperty("--charge", r.toFixed(3)),
    a.setAttribute("data-stage", s),
    (oe("driftLabel").textContent =
      e.drift > 1.9 ? "RELEASE: ULTRA BOOST" : e.drift > 0.65 ? "RELEASE TO BOOST" : "HOLD DRIFT + STEER"),
    e.item !== Ol && (e.item !== null && Ol === null && (Gr = 0.5), (Ol = e.item)),
    Gr > 0 && (Gr = Math.max(0, Gr - n)));
  let o = e.item === null ? null : ld[e.item],
    c = oe("item"),
    l = o ? (Gr > 0 ? "rolling" : "ready") : "empty";
  (c.getAttribute("data-state") !== l && c.setAttribute("data-state", l),
    c.classList.toggle("ready", !!o && Gr <= 0),
    (oe("itemIcon").textContent = o ? o.icon : "\u25C7"),
    (oe("itemName").textContent = o ? o.name : "NO ITEM"),
    c.setAttribute("aria-label", o ? "Use " + o.name + ": " + o.description : "No power-up collected"),
    oe("speedLines").classList.toggle("boosting", e.boost > 0));
  let h = oe("cornerCue");
  ((h.firstElementChild.textContent = Tn.active ? Tn.arrow : "\u2191"),
    (h.lastElementChild.textContent = Tn.active ? Tn.text : Tn.crest ? "BLIND CREST" : "KEEP IT FLOWING"),
    h.classList.toggle("tight", Tn.active && (Tn.severity >= 3 || Tn.risk > 0.6)),
    B1(),
    Na > 0 && ((Na -= n), Na <= 0 && oe("toast").classList.remove("show")),
    Ul > 0 && ((Ul -= n), Ul <= 0 && (oe("raceHint").hidden = !0)));
}
var Nl = [];
function B1() {
  let n = oe("positionList");
  if (!Nl.length) for (let t of n.children) Nl.push(t);
  let e = Ge.ranking();
  for (let t = 0; t < e.length && t < Nl.length; t++) {
    let i = e[t],
      r = Nl[t],
      s = ki[i.id],
      a =
        i === Ge.player
          ? "\u2014"
          : i.finish !== null
            ? jn(i.finish)
            : (i.distance > Ge.player.distance ? "+" : "-") +
              Math.abs(i.distance - Ge.player.distance).toFixed(0) +
              "m";
    (r._name !== s.name &&
      (r.children[1].style.setProperty("--c", Hs(s.color)), (r.children[2].textContent = s.name), (r._name = s.name)),
      (r.children[0].textContent = t + 1),
      r._gap !== a && ((r.children[3].textContent = a), (r._gap = a)),
      r.classList.toggle("is-you", i === Ge.player));
  }
}
function Kf() {
  let n = oe("minimap"),
    e = n.getContext("2d");
  if ((e.clearRect(0, 0, 180, 150), !_t.frames || !Ge)) return;
  let t = _t.frames;
  if (zs.frames !== t) {
    let l = 1 / 0,
      h = -1 / 0,
      p = 1 / 0,
      u = -1 / 0;
    for (let f of t)
      (f.p.x < l && (l = f.p.x), f.p.x > h && (h = f.p.x), f.p.z < p && (p = f.p.z), f.p.z > u && (u = f.p.z));
    ((zs.frames = t),
      (zs.scale = Math.min(148 / (h - l), 118 / (u - p))),
      (zs.cx = (l + h) / 2),
      (zs.cz = (p + u) / 2));
  }
  let { scale: i, cx: r, cz: s } = zs,
    a = (l) => 90 + (l.x - r) * i,
    o = (l) => 75 + (l.z - s) * i;
  e.beginPath();
  for (let l = 0; l < t.length - 1; l += 6) {
    let h = t[l].p;
    l === 0 ? e.moveTo(a(h), o(h)) : e.lineTo(a(h), o(h));
  }
  (e.closePath(),
    (e.lineJoin = e.lineCap = "round"),
    (e.strokeStyle = "#04091e"),
    (e.lineWidth = 9),
    e.stroke(),
    (e.strokeStyle = "#eef8ff"),
    (e.lineWidth = 3.2),
    e.stroke());
  let c = t.length - 1;
  for (let l of [...Ge.racers].sort((h, p) => Number(h.isPlayer) - Number(p.isPlayer))) {
    let h = t[Math.floor(Ut(l.distance / _t.length, 1) * c)].p;
    (e.beginPath(),
      e.arc(a(h), o(h), l.isPlayer ? 6 : 3.2, 0, Math.PI * 2),
      (e.fillStyle = l.isPlayer ? "#ffffff" : Hs(ki[l.id].color)),
      e.fill(),
      l.isPlayer && ((e.strokeStyle = "#39ddff"), (e.lineWidth = 3), e.stroke()));
  }
}
var zs = {
  frames: null,
  scale: 1,
  cx: 0,
  cz: 0,
};
var bfxFinishT = -1;
function bfxFinishTick(dt) {
  if (bfxFinishT < 0) {
    ((bfxFinishT = 0), (oe("countdown").textContent = "FINISH!"), (oe("raceHint").hidden = !0));
    BFX_HOOKS.fire("raceEnd", { race: Ge, engine: _t, position: Ge.position });
    return;
  }
  ((bfxFinishT += dt), bfxFinishT > 3.4 && z1());
}
function z1() {
  ((bi = "results"),
    (oe("countdown").textContent = "FINISH!"),
    (oe("raceHint").hidden = !0),
    lt.started && (mt.finishRace(Ge.position), mt.finalLap(!1)),
    lt.idle(),
    oe("speedLines").classList.remove("boosting"));
  let n = Ge.player.finish,
    e = !fr[_i] || n < fr[_i];
  (e && (fr[_i] = n), mn());
  let t = Ge.position,
    i = Ge.ranking();
  (setTimeout(() => {
    bi === "results" && lt.play(t === 1 ? "victory" : "results");
  }, 1400),
    clearTimeout(Zu),
    (Zu = setTimeout(() => {
      bi === "results" &&
        ((oe("countdown").textContent = ""),
        (oe("hud").hidden = !0),
        (oe("menu").hidden = !1),
        document.querySelectorAll(".screen").forEach((r) => r.classList.toggle("active", r.id === "results")),
        (oe("resultsTrack").textContent = Li[_i].name),
        (oe("resultPlace").innerHTML = String(t) + "<small>" + jf[t].slice(1) + "</small>"),
        oe("resultPlace").classList.toggle("gold", t === 1),
        bfxPodium(i, t),
        (oe("resultTag").textContent = e ? "NEW PERSONAL BEST" : t === 1 ? "FLAWLESS RUN" : "KEEP PUSHING"),
        (oe("resultTime").textContent = jn(n)),
        (oe("resultBest").textContent = jn(Ge.bestLap)),
        (oe("resultsList").innerHTML = i
          .map((r, s) => {
            let a = ki[r.id],
              o =
                r.finish !== null
                  ? s === 0
                    ? jn(r.finish)
                    : "+" + (r.finish - i[0].finish).toFixed(2)
                  : Math.min(99, Math.floor((r.distance / (Ge.length * 3)) * 100)) + "%";
            return `<li class="${r.isPlayer ? "is-you" : ""}"><b>${s + 1}</b><i style="--c:${Hs(a.color)}"></i><span>${a.name}${r.isPlayer ? " \xB7 YOU" : ""}</span><em>${o}</em></li>`;
          })
          .join("")));
    }, 1e3)));
}
function bfxPodium(n, e) {
  let t = oe("podium");
  if (t) {
    let r = [n[1], n[0], n[2]];
    t.innerHTML = r
      .map((s, a) => {
        if (!s) return "";
        let o = ki[s.id],
          c = a === 1 ? 1 : a === 0 ? 2 : 3;
        return `<div class="podium-step ${s.isPlayer ? "is-you" : ""}" style="--c:${Hs(o.color)}"><img src="${(BFX_ASSETS.portraits && BFX_ASSETS.portraits[s.id]) || ""}" alt="${o.name}" draggable="false"><span class="name">${o.name}${s.isPlayer ? " · YOU" : ""}</span><div class="block">${c}</div></div>`;
      })
      .join("");
  }
  let i = oe("confetti");
  if (i) {
    let r = e <= 3 ? 70 : 24,
      s = ["#5df0ff", "#d96bff", "#8b5bff", "#ffd76a", "#ffffff", "#5cf2a8"],
      a = "";
    for (let o = 0; o < r; o++)
      a += `<i style="--x:${(Math.random() * 100).toFixed(1)}%;--w:${(4 + Math.random() * 6).toFixed(0)}px;--h:${(8 + Math.random() * 9).toFixed(0)}px;--c:${s[o % s.length]};--d:${(3.2 + Math.random() * 3).toFixed(2)}s;--delay:${(Math.random() * 4).toFixed(2)}s;--dx:${((Math.random() - 0.5) * 160).toFixed(0)}px;--r:${(360 + Math.random() * 720).toFixed(0)}deg"></i>`;
    i.innerHTML = a;
  }
}
function Ku(n) {
  ((gt.scheme = n),
    (Jt.scheme = n),
    fn.setAttribute("data-scheme", n),
    document.querySelectorAll("[data-scheme-option]").forEach((e) => {
      let t = e.dataset.schemeOption === n;
      (e.classList.toggle("on", t), e.setAttribute("aria-checked", String(t)));
    }),
    n === "tilt" && kl(),
    mn());
}
function Jf(n) {
  ((gt.difficulty = n),
    Ge && Xu(Ge, n),
    document.querySelectorAll("[data-difficulty]").forEach((e) => {
      let t = Hf[e.dataset.difficulty] === n;
      (e.classList.toggle("on", t), e.setAttribute("aria-checked", String(t)));
    }),
    mn());
}
function k1(n) {
  ((gt.quality = n),
    fn.setAttribute("data-quality", n),
    document.querySelectorAll("[data-quality-option]").forEach((e) => {
      let t = e.dataset.qualityOption === n;
      (e.classList.toggle("on", t), e.setAttribute("aria-checked", String(t)));
    }));
  try {
    (_t.setQuality(n),
      Ge &&
        _t.trackWorld &&
        (Ge.setWorld(_t.trackWorld, _t.halfWidths), (Ge.length = _t.length), (Ua = Vu(_t, Li[_i])), Gs.reset()));
  } catch (e) {
    console.warn("Quality change failed", e);
  }
  (lt.started && mt.budget(n === "low" ? 90 : 150, n === "low" ? 2 : 4), mn());
}
function $f(n) {
  ((gt.sensitivity = n),
    Jt.setSensitivity(n),
    (oe("tiltSensitivity").value = String(n)),
    oe("tiltSensitivity").style.setProperty("--v", ((n - 0.4) / 2.1).toFixed(3)),
    (oe("tiltSensitivityValue").textContent = n.toFixed(1) + "\xD7"),
    mn());
}
function Qf(n) {
  ((gt.invert = n), Jt.setInvert(n), oe("invertTilt").setAttribute("aria-checked", String(n)), mn());
}
function Gl(n, e) {
  gt[n] = e;
  let t = oe(n === "music" ? "musicVolume" : "sfxVolume");
  ((t.value = String(e)),
    t.style.setProperty("--v", e.toFixed(3)),
    (oe(n === "music" ? "musicVolumeValue" : "sfxVolumeValue").textContent = Math.round(e * 100) + "%"),
    n === "music" ? mt.musicVol(e) : mt.sfxVol(e),
    mn());
}
function e0() {
  (Ku(gt.scheme), Jf(gt.difficulty), $f(gt.sensitivity), Qf(gt.invert), Gl("music", gt.music), Gl("sfx", gt.sfx));
  let n = gt.quality || _t.quality;
  (fn.setAttribute("data-quality", n),
    document.querySelectorAll("[data-quality-option]").forEach((e) => {
      let t = e.dataset.qualityOption === n;
      (e.classList.toggle("on", t), e.setAttribute("aria-checked", String(t)));
    }));
}
async function kl() {
  try {
    let n = await Jt.enableTilt(),
      e = oe("tiltEnable");
    return (e && (e.textContent = n ? "MOTION ACCESS ON" : "MOTION UNAVAILABLE"), n);
  } catch {
    return !1;
  }
}
function G1() {
  gt.tiltSeen || !Hu() || (oe("tiltPrompt").hidden = !1);
}
function zf(n) {
  ((gt.tiltSeen = !0), (oe("tiltPrompt").hidden = !0), Ku(n ? "tilt" : "buttons"), n && Jt.recalibrateTilt(), mn());
}
function bfxInitArt() {
  let n = oe("keyartShot");
  n && BFX_ASSETS.keyArt && BFX_ASSETS.keyArt.title && (n.src = BFX_ASSETS.keyArt.title);
  let e = oe("finishArt");
  e && BFX_ASSETS.keyArt && BFX_ASSETS.keyArt.finish && (e.src = BFX_ASSETS.keyArt.finish);
  let t = oe("homeParticles");
  if (t) {
    let r = ["#5df0ff", "#d96bff", "#8b5bff", "#ffffff"],
      s = "";
    for (let a = 0; a < 26; a++)
      s += `<span style="--x:${(Math.random() * 100).toFixed(1)}%;--s:${(2 + Math.random() * 4).toFixed(1)}px;--c:${r[a % r.length]};--d:${(7 + Math.random() * 9).toFixed(1)}s;--delay:${(-Math.random() * 14).toFixed(1)}s;--dx:${((Math.random() - 0.5) * 120).toFixed(0)}px;--o:${(0.35 + Math.random() * 0.5).toFixed(2)}"></span>`;
    t.innerHTML = s;
  }
  let i = oe("boot");
  if (i) {
    let r = () => {
      i.classList.contains("out") ||
        (i.classList.add("out"),
        setTimeout(() => {
          i.hidden = !0;
        }, 550));
    };
    (setTimeout(() => i.classList.add("ready"), 900),
      setTimeout(r, 2600),
      i.addEventListener("pointerdown", () => {
        (lt.init(), lt.click("select"), r());
      }));
  }
}
var kf = 0;
function H1() {
  let n = performance.now();
  if (n - kf < 1e3) return;
  kf = n;
  let e = _t.quality;
  (fn.getAttribute("data-quality") !== e &&
    (fn.setAttribute("data-quality", e),
    document.querySelectorAll("[data-quality-option]").forEach((t) => {
      let i = t.dataset.qualityOption === e;
      (t.classList.toggle("on", i), t.setAttribute("aria-checked", String(i)));
    }),
    lt.started && mt.budget(e === "low" ? 90 : 150, e === "low" ? 2 : 4)),
    (window.__blufoxHealth = {
      fps: Math.round(Xn.fps),
      tier: e,
      hitches: Xn.hitches,
      slow: +Xn.slowRatio.toFixed(2),
      frames: Xn.frames,
    }));
}
function t0(n) {
  Xf = requestAnimationFrame(t0);
  let e = Xn.tick(n);
  bi === "race" && Ge && !pn
    ? (Jt.update(e),
      Jt.itemPressed && F1(),
      Of(Jt, Ge),
      Ge.update(e, Jt),
      Yf(),
      Ge.countdown > 0
        ? (oe("countdown").textContent = String(Math.ceil(Ge.countdown)))
        : Ge.time < 0.7
          ? (oe("countdown").textContent = "GO!")
          : oe("countdown").textContent && (oe("countdown").textContent = ""),
      Gs.update(e, Ge, _t, _t.camera, Jt, Ua),
      Tn.update(Ge, _t, Ua),
      _t.sync(Ge, e),
      Zf(e),
      Kf(),
      lt.frame(e),
      H1(),
      Ge.finished && bfxFinishTick(e))
    : (Jt.enabled && bi !== "race" && Jt.update(e), lt.idle());
}
try {
  ((_t = new Al(oe("world"))),
    gt.quality && _t.setQuality(gt.quality),
    (Yu = _t.portraits()),
    (oe("drivers").innerHTML = ki
      .map(
        (n, e) =>
          `<button class="driver-card" data-driver="${e}" style="--c:${Hs(n.color)}" aria-label="Choose ${n.name}" aria-pressed="false"><span class="num">0${e + 1}</span><img src="${(BFX_ASSETS.portraits && BFX_ASSETS.portraits[e]) || Yu[e]}" alt="" draggable="false"><strong>${n.name}</strong></button>`,
      )
      .join("")),
    document.querySelectorAll("[data-driver]").forEach(
      (n) =>
        (n.onclick = () => {
          (lt.click("move"), Bs("ui"), Fl(Number(n.dataset.driver)));
        }),
    ),
    (oe("trackGrid").innerHTML = Li.map(
      (n, e) =>
        `<button class="track-card" data-track="${e}" aria-pressed="false"><div class="track-visual" style="--track-color:${Hs(n.secondary)}66;--track-light:${Hs(n.neon)}"><img class="sky-slice" src="${(BFX_ASSETS.skies && BFX_ASSETS.skies[e]) || ""}" alt="" draggable="false"><span class="track-num">0${e + 1}</span><span class="chip ${n.difficulty.toLowerCase()}">${n.difficulty.toUpperCase()}</span><svg viewBox="${D1}" role="img" aria-label="${n.name} circuit layout">` +
        ((t) => `<path d="${t.d}"/><path class="run" pathLength="1" d="${t.d}"/><circle cx="${t.sx}" cy="${t.sy}" r="7"/>`)(I1(n)) +
        `</svg><span class="track-theme">${n.theme}</span></div><div class="track-info"><div><strong>${n.name}</strong><small>${n.difficulty} \xB7 3 laps</small></div><span class="best ${fr[e] ? "" : "none"}"><b>BEST</b>${fr[e] ? jn(fr[e]) : "&mdash;"}</span></div></button>`,
    ).join("")),
    document.querySelectorAll("[data-track]").forEach(
      (n) =>
        (n.onclick = () => {
          (lt.click("move"), Bs("ui"), Bl(Number(n.dataset.track)));
        }),
    ),
    lt.label(),
    bfxInitArt(),
    Fl(Vs),
    Bl(_i),
    e0(),
    Jt.attach({
      surface: oe("steerPad"),
      left: oe("left"),
      right: oe("right"),
      drift: oe("drift"),
      item: oe("item"),
      brake: oe("brake"),
      look: oe("look"),
      keyTarget: window,
    }),
    fn.setAttribute("data-look", "1"),
    (oe("play").onclick = () => {
      (lt.init(), lt.click("select"), wn("garage"), G1());
    }),
    (oe("brand").onclick = () => {
      (lt.click("back"), wn("home"));
    }),
    (oe("how").onclick = U1),
    (oe("settingsHome").onclick = () => {
      (lt.click("select"), wn("settings"));
    }),
    (oe("settingsBtn").onclick = () => {
      (lt.click("select"), wn("settings"));
    }),
    (oe("chooseTrack").onclick = () => {
      (lt.click("select"), wn("circuits"));
    }),
    (oe("start").onclick = zl),
    (oe("sound").onclick = () => lt.toggle()),
    document.querySelectorAll("[data-back]").forEach(
      (n) =>
        (n.onclick = () => {
          (lt.click("back"), wn(n.dataset.back));
        }),
    ),
    (oe("pause").onclick = () => {
      (lt.click("back"), ks());
    }),
    (oe("raceAgain").onclick = zl),
    (oe("nextCircuit").onclick = () => {
      (lt.click("select"), (_i = (_i + 1) % 6), wn("circuits"));
    }),
    (oe("changeDriver").onclick = () => {
      (lt.click("back"), wn("garage"));
    }),
    document.querySelectorAll("[data-scheme-option]").forEach(
      (n) =>
        (n.onclick = () => {
          (lt.click(), Ku(n.dataset.schemeOption));
        }),
    ),
    document.querySelectorAll("[data-difficulty]").forEach(
      (n) =>
        (n.onclick = () => {
          (lt.click(), Jf(Hf[n.dataset.difficulty]));
        }),
    ),
    document.querySelectorAll("[data-quality-option]").forEach(
      (n) =>
        (n.onclick = () => {
          (lt.click(), k1(n.dataset.qualityOption));
        }),
    ),
    (oe("tiltSensitivity").oninput = (n) => $f(parseFloat(n.target.value))),
    (oe("musicVolume").oninput = (n) => Gl("music", parseFloat(n.target.value))),
    (oe("sfxVolume").oninput = (n) => Gl("sfx", parseFloat(n.target.value))),
    (oe("invertTilt").onclick = () => {
      (lt.click(), Qf(!gt.invert));
    }),
    (oe("calibrate").onclick = async () => {
      (lt.click(), Bs("ui"), await kl(), Jt.recalibrateTilt());
      let n = oe("calibrate").querySelector("b");
      n &&
        ((n.textContent = "\u25CE CENTRED"),
        setTimeout(() => {
          n.textContent = "\u25CE CALIBRATE TILT";
        }, 1400));
    }),
    (oe("tiltEnable").onclick = () => {
      (lt.click(), kl());
    }),
    (oe("tiltPromptEnable").onclick = async () => {
      (await kl(), zf(!0));
    }),
    (oe("tiltPromptSkip").onclick = () => zf(!1)),
    (oe("rotateDismiss").onclick = () => oe("rotate").setAttribute("data-dismissed", "1")),
    addEventListener("keydown", (n) => {
      if (n.code === "Escape" && !n.repeat) {
        if (!oe("modal").hidden && bi !== "race") {
          Oa();
          return;
        }
        ks();
      }
    }),
    addEventListener("blur", () => {
      (Jt.releaseAll(), bi === "race" && !pn && ks());
    }),
    document.addEventListener("visibilitychange", () => {
      document.hidden ? (mt.suspend(), bi === "race" && !pn && ks()) : mt.resume();
    }),
    oe("world").addEventListener("webglcontextlost", (n) => {
      (n.preventDefault(), bi === "race" && !pn && ks(), (oe("loadError").hidden = !1));
    }),
    addEventListener("contextmenu", (n) => {
      bi === "race" && n.preventDefault();
    }),
    fn.setAttribute("data-scheme", gt.scheme),
    fn.setAttribute("data-paused", "0"),
    (Xf = requestAnimationFrame(t0)),
    (window.__blufox = {
      get race() {
        return Ge;
      },
      get engine() {
        return _t;
      },
      get input() {
        return Jt;
      },
      get chase() {
        return Gs;
      },
      get cue() {
        return Tn;
      },
      audio: mt,
      sound: lt,
      pacer: Xn,
      settings: gt,
      startRace: zl,
      screen: (n) => wn(n),
      select: (n, e) => {
        (Fl(n), Bl(e));
      },
    }));
} catch (n) {
  (console.error("Unable to initialize race", n), (oe("loadError").hidden = !1));
}
