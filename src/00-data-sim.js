var ki = [
    {
      name: "Blu",
      title: "THE ORIGINAL",
      desc: "The face of the grid. A balanced ride with a fearless streak.",
      color: 1416447,
      accent: 7469823,
      speed: 4,
      handling: 4,
      accel: 4,
      style: "goggles",
    },
    {
      name: "Nova",
      title: "NIGHT RUNNER",
      desc: "Violet energy. Razor-sharp cornering. Owns the midnight circuit.",
      color: 10379775,
      accent: 16749791,
      speed: 3,
      handling: 5,
      accel: 4,
      style: "visor",
    },
    {
      name: "Knox",
      title: "THE WILDCARD",
      desc: "Small kart, huge ambition. Quick off the line and into the action.",
      color: 16761668,
      accent: 16777215,
      speed: 3,
      handling: 4,
      accel: 5,
      style: "cap",
    },
    {
      name: "Frost",
      title: "ICE IN THE VEINS",
      desc: "Cool under pressure. Smooth control when the road gets slippery.",
      color: 13036031,
      accent: 4442367,
      speed: 3,
      handling: 5,
      accel: 4,
      style: "hood",
    },
    {
      name: "Blaze",
      title: "FULL THROTTLE",
      desc: "Built for the straightaway. Hit the apex, then let it rip.",
      color: 16736835,
      accent: 16767045,
      speed: 5,
      handling: 3,
      accel: 4,
      style: "mohawk",
    },
    {
      name: "Glitch",
      title: "SIGNAL BREAKER",
      desc: "A little unpredictable. A lot of acceleration. Always in the mix.",
      color: 4776878,
      accent: 14155619,
      speed: 4,
      handling: 3,
      accel: 5,
      style: "headphones",
    },
    {
      name: "Onyx",
      title: "HEAVY HITTER",
      desc: "A heavyweight machine with serious top-end speed.",
      color: 4805235,
      accent: 16739002,
      speed: 5,
      handling: 4,
      accel: 3,
      style: "helmet",
    },
    {
      name: "Pixel",
      title: "CORNER QUEEN",
      desc: "Electric pink, precise lines, and no wasted movement.",
      color: 16740284,
      accent: 7602175,
      speed: 4,
      handling: 5,
      accel: 3,
      style: "crown",
    },
  ],
  Li = [
    {
      name: "Chicago Afterglow",
      theme: "NEON CITY",
      difficulty: "Easy",
      desc: "Sweeping turns beneath the electric skyline.",
      sky: 527399,
      fog: 1385030,
      road: 1581883,
      ground: 527907,
      neon: 4385023,
      secondary: 11164927,
      radius: 225,
      shape: 0,
      hill: 4,
      grip: 1,
      seed: 31,
    },
    {
      name: "Xfinity Megastore",
      theme: "RETAIL REMIX",
      difficulty: "Medium",
      desc: "A supersized showroom. Every aisle is a racing line.",
      sky: 1380388,
      fog: 2433342,
      road: 2696761,
      ground: 1249827,
      neon: 12220159,
      secondary: 6811647,
      radius: 205,
      shape: 1,
      hill: 2,
      grip: 1,
      seed: 76,
    },
    {
      name: "Lakefront Rush",
      theme: "COASTAL RUN",
      difficulty: "Easy",
      desc: "Blue water, banked bends, and a golden horizon.",
      sky: 7648718,
      fog: 9358292,
      road: 3361112,
      ground: 2188927,
      neon: 6488052,
      secondary: 16764537,
      radius: 220,
      shape: 2,
      hill: 8,
      grip: 1,
      seed: 47,
    },
    {
      name: "Frostbyte Summit",
      theme: "ALPINE ICE",
      difficulty: "Hard",
      desc: "Slippery corners high above the cloud line.",
      sky: 7441582,
      fog: 11982567,
      road: 7772588,
      ground: 7770544,
      neon: 11204351,
      secondary: 7113983,
      radius: 205,
      shape: 3,
      hill: 18,
      grip: 0.7,
      seed: 23,
    },
    {
      name: "Signal Canyon",
      theme: "DESERT HEAT",
      difficulty: "Medium",
      desc: "Rolling elevation through an illuminated red-rock canyon.",
      sky: 3807282,
      fog: 7814223,
      road: 4535102,
      ground: 6565686,
      neon: 16757336,
      secondary: 16733561,
      radius: 220,
      shape: 4,
      hill: 13,
      grip: 0.92,
      seed: 95,
    },
    {
      name: "Gigabit Galaxy",
      theme: "ORBITAL CIRCUIT",
      difficulty: "Hard",
      desc: "An elevated circuit with tight bends in deep space.",
      sky: 131861,
      fog: 592939,
      road: 1447984,
      ground: 131860,
      neon: 12027135,
      secondary: 5502975,
      radius: 205,
      shape: 5,
      hill: 20,
      grip: 0.92,
      seed: 52,
    },
  ],
  ld = [
    {
      name: "GIG BOOST",
      icon: "\xBB",
      description: "A burst of extra speed.",
    },
    {
      name: "xFI SHIELD",
      icon: "\u25C8",
      description: "Blocks hits for seven seconds.",
    },
    {
      name: "SIGNAL PULSE",
      icon: "\u03DF",
      description: "Hits the closest rival ahead within 100 meters.",
    },
    {
      name: "DEAD ZONE",
      icon: "\u2297",
      description: "Drops a trap behind your kart.",
    },
  ],
  Ut = (n, e) => ((n % e) + e) % e;
function Ya(n, e) {
  let t = e * Math.PI * 2,
    i = n.radius,
    r = n.shape;
  i *= 1 + 0.15 * Math.sin(((r % 3) + 2) * t + 0.6 * r) + 0.07 * Math.cos(5 * t + r);
  let s = Math.sin(t) * i,
    a = Math.cos(t) * i;
  return (
    r === 1 && (s *= 1.2),
    r === 2 && (a *= 0.83),
    r === 4 && (s += 35 * Math.sin(t * 2)),
    {
      x: s,
      y: 12 + n.hill * (Math.sin(t * 2 + r) * 0.6 + Math.sin(t * 3) * 0.4),
      z: a,
    }
  );
}
var Zl = 10,
  _0 = {
    laneLimitAt() {
      return 11.4;
    },
    gripAt(n, e) {
      let t = Math.abs(e);
      return t > Zl ? Math.max(0.65, 1 - (t - Zl) * 0.16) : 1;
    },
    clampLane(n) {
      if (Math.abs(n.lane) <= 11.4) return 0;
      let t = Math.sign(n.lane) || 1,
        i = Math.max(0, n.lateralSpeed * t);
      return (
        (n.lane = t * 11.4),
        (n.lateralSpeed *= -0.18),
        (n.speed *= 0.995),
        (n.wallSide = t),
        (n.wallScrape = Math.min(1.4, (n.wallScrape || 0) + 0.28)),
        i
      );
    },
  },
  // Opposition knobs the sim reads off race.difficulty (set by Xu in 07-feel.js).
  // These defaults are the NORMAL tier; every field is optional on a preset.
  BFX_AI_DEFAULTS = {
    aiLine: 0.75, // 0..1 how closely AI follow the racing line (rest is wander)
    aiDrift: 0.55, // chance an AI drifts a given corner
    aiBlock: 0.45, // chance an AI blocks a rival closing from behind
    aiAvoid: 0.6, // chance an AI steers around slicks / movers
    aiShortcut: 0.5, // chance an AI goes for a shortcut gate
    aiItemIQ: 0.6, // 0 = old random timer, 1 = fully intentful item use
    aiItemHold: 6, // s an AI sits on an item before the fallback timer fires
    rubberLead: 0.045, // how much AI AHEAD of the player get slowed (0 = never wait)
    rubberBand: 0.045, // how much AI BEHIND the player get sped up
    rubberDist: 1600,
    itemFrontNerf: 0, // 0..1 weakens the top-2's item drops
    moverSpeed: 1, // multiplier on mover crossing speed
  },
  // Per-circuit hazard templates. t = fraction of the lap, lane = lateral m.
  // Instantiated in the race as race.hazards with distance = t * length.
  BFX_HAZARD_SETS = [
    [
      { kind: "slick", t: 0.118, lane: -3, radius: 3.2, color: 0x1a2030, label: "OIL SLICK" },
      { kind: "shortcut", t: 0.268, lane: 9, radius: 6, span: 0.075, color: 0x5df0ff, label: "SHORTCUT" },
      { kind: "slick", t: 0.5, lane: 4, radius: 3.4, color: 0x1a2030, label: "OIL SLICK" },
    ],
    [
      { kind: "slick", t: 0.085, lane: 2, radius: 3, color: 0x8b5bff, label: "SPILL" },
      { kind: "mover", t: 0.53, lane: 0, radius: 2.4, amp: 8, period: 3.6, color: 0xff8a3d, label: "STOCK CARTS" },
      { kind: "mover", t: 0.63, lane: 0, radius: 2.4, amp: 8, period: 4.4, offset: 0.5, color: 0xff8a3d, label: "STOCK CARTS" },
    ],
    [
      { kind: "mover", t: 0.115, lane: 0, radius: 2.2, amp: 8.5, period: 3.2, color: 0xfff3c4, label: "GULLS" },
      { kind: "mover", t: 0.195, lane: 0, radius: 2.2, amp: 7.5, period: 4.0, offset: 0.35, color: 0xffd166, label: "BEACH BALLS" },
    ],
    [
      { kind: "ice", t: 0.075, lane: -4, radius: 4, color: 0xbfe9ff, label: "ICE" },
      { kind: "ice", t: 0.4, lane: 3, radius: 4, color: 0xbfe9ff, label: "ICE" },
      { kind: "ice", t: 0.62, lane: -5, radius: 4, color: 0xbfe9ff, label: "ICE" },
      { kind: "ice", t: 0.8, lane: 2, radius: 4.2, color: 0xbfe9ff, label: "ICE" },
    ],
    [
      { kind: "slick", t: 0.16, lane: -3, radius: 3.2, color: 0x3a2214, label: "DUST SLICK" },
      { kind: "shortcut", t: 0.362, lane: -9, radius: 6, span: 0.078, color: 0x5df0ff, label: "SHORTCUT" },
      { kind: "slick", t: 0.55, lane: 4, radius: 3.4, color: 0x3a2214, label: "DUST SLICK" },
    ],
    [
      { kind: "slick", t: 0.1, lane: 0, radius: 3.2, color: 0x2a1650, label: "COOLANT SLICK" },
      { kind: "slick", t: 0.575, lane: 3, radius: 3, color: 0x2a1650, label: "COOLANT SLICK" },
      { kind: "slick", t: 0.79, lane: -4, radius: 3.4, color: 0x2a1650, label: "COOLANT SLICK" },
    ],
  ],
  bfxClamp = (n, e, t) => (n < e ? e : n > t ? t : n),
  Za = class {
    constructor(e, t, i, r = () => 0, s = Math.random, a = null) {
      ((this.track = Li[e]),
        (this.trackIndex = e),
        (this.driverIndex = t),
        (this.length = i),
        (this.curvature = r),
        (this.random = s),
        (this.world = a || _0),
        (this.time = 0),
        (this.countdown = 3.2),
        (this.finished = !1),
        (this.events = []),
        (this.traps = []),
        (this.pickups = []),
        (this.pads = []),
        (this.hazards = []),
        (this.player = null),
        (this.racers = []),
        (this.lapTimes = []),
        (this.lapStart = null),
        (this.bestLap = null),
        (this.difficulty = null),
        (this._prevPos = 0),
        (this._passCool = 0),
        (this._finalStretch = !1),
        (this._backTimer = 0),
        (this._backFrom = -28),
        (this._lastCue = null),
        (this._lastCueAt = -9));
      for (let o = 0; o < 8; o++) {
        let l = {
          id: o === 0 ? t : (t + o) % 8,
          isPlayer: o === 0,
          distance: o === 0 ? -28 : -(o - 1) * 4,
          lane: (o % 2 ? 1 : -1) * 4,
          speed: 0,
          steer: 0,
          lateralSpeed: 0,
          boost: 0,
          shield: 0,
          stun: 0,
          drift: 0,
          drifting: !1,
          driftDir: 0,
          item: null,
          itemHeld: 0,
          finish: null,
          hitCooldown: 0,
          halfWidth: void 0,
          wallScrape: 0,
          wallSide: 0,
          aiSkill: 0.91 + s() * 0.09,
          targetLane: (s() - 0.5) * 14,
          aiThink: s() * 0.2,
          aiItemTimer: 5 + s() * 8,
          aiLineBias: (s() - 0.5) * 5,
          aiWander: (s() - 0.5) * 12,
          aiWanderT: 0,
          aiDriftOn: !1,
          aiDriftCool: 0,
          aiDriftRoll: s(),
          aiBlocking: 0,
          aiIntent: "line",
          onHazard: null,
          shortcutUntil: -1,
          shortcutOn: !1,
        };
        (this.racers.push(l), o === 0 && (this.player = l));
      }
      for (let o = 0; o < 15; o++)
        this.pickups.push({
          distance: ((o + 0.45) * i) / 15,
          lane: [-7, 0, 7][o % 3],
          cooldown: 0,
        });
      for (let o = 0; o < 6; o++)
        this.pads.push({
          distance: ((o + 0.7) * i) / 6,
          lane: o % 2 ? 6 : -6,
        });
      for (let o of BFX_HAZARD_SETS[e] || []) {
        let l = {
          kind: o.kind,
          distance: o.t * i,
          lane: o.lane,
          radius: o.radius,
          active: !0,
          phase: o.offset || 0,
          color: o.color,
          t: o.t,
          baseLane: o.lane,
          amp: o.amp || 0,
          period: o.period || 4,
          span: (o.span || 0) * i,
          label: o.label,
        };
        if (o.kind === "shortcut") {
          // The gate is a boost pad that opens the shortcut lane; it is the 7th
          // entry of race.pads (the engine only draws six, FX draws the chevrons).
          let h = { distance: l.distance, lane: l.lane, shortcut: l };
          (this.pads.push(h), Object.defineProperty(l, "gate", { value: h, enumerable: !1, writable: !0 }));
        }
        this.hazards.push(l);
      }
    }
    setWorld(e, t) {
      if ((e && (this.world = e), t)) for (let i of this.racers) t[i.id] !== void 0 && (i.halfWidth = t[i.id]);
      return this;
    }
    emit(e, t = "info") {
      this.events.push({
        text: e,
        type: t,
      });
    }
    ranking() {
      return [...this.racers].sort((e, t) =>
        e.finish !== null && t.finish !== null
          ? e.finish - t.finish
          : e.finish !== null
            ? -1
            : t.finish !== null
              ? 1
              : t.distance - e.distance,
      );
    }
    get position() {
      return this.ranking().indexOf(this.player) + 1;
    }
    get lap() {
      return Math.max(1, Math.min(3, Math.floor(this.player.distance / this.length) + 1));
    }
    get knobs() {
      return this.difficulty || BFX_AI_DEFAULTS;
    }
    knob(e) {
      let t = this.difficulty;
      return t && t[e] != null ? t[e] : BFX_AI_DEFAULTS[e];
    }
    hit(e, t) {
      if (!(e.hitCooldown > 0)) {
        if (e.shield > 0) {
          ((e.shield = 0), (e.hitCooldown = 1), e.isPlayer && this.emit("SHIELD BLOCKED THE HIT"));
          return;
        }
        ((e.stun = 1.25),
          (e.speed *= 0.48),
          (e.hitCooldown = 2.2),
          e.isPlayer && this.emit(t ? "PULSED BY " + ki[t.id].name.toUpperCase() : "SIGNAL LOST!", "hit"));
      }
    }
    // Item roulette: back of the pack gets the good stuff; the top two get
    // defensive junk, more so when itemFrontNerf is on (hard / overdrive).
    rollItem(e) {
      let t = this.ranking().indexOf(e),
        i = this.knob("itemFrontNerf"),
        r;
      t <= 1
        ? (r = [0.18 - 0.14 * i, 0.4 - 0.05 * i, 0.12 - 0.09 * i, 0.3 + 0.28 * i])
        : t <= 4
          ? (r = [0.3, 0.25, 0.27, 0.18])
          : (r = [0.46, 0.08, 0.38, 0.08]);
      let s = this.random() * (r[0] + r[1] + r[2] + r[3]);
      for (let a = 0; a < 4; a++) if ((s -= r[a]) <= 0) return a;
      return 0;
    }
    useItem(e = this.player) {
      if (this.countdown > 0 || this.finished || e.item === null) return !1;
      let t = e.item;
      if (
        ((e.item = null),
        (e.itemHeld = 0),
        t === 0 && ((e.boost = 2.8), e.isPlayer && this.emit("GIG BOOST!", "boost")),
        t === 1 && ((e.shield = 7), e.isPlayer && this.emit("xFI SHIELD ONLINE")),
        t === 2)
      ) {
        let i = this.racers
          .filter((r) => r !== e && r.finish === null)
          .map((r) => ({
            r,
            d: Ut(r.distance - e.distance, this.length),
          }))
          .filter((r) => r.d > 0 && r.d < 100)
          .sort((r, s) => r.d - s.d)[0];
        i
          ? (this.hit(i.r, e), e.isPlayer && this.emit("PULSE HIT " + ki[i.r.id].name.toUpperCase()))
          : e.isPlayer && this.emit("NO RIVAL IN RANGE");
      }
      return (
        t === 3 &&
          (this.traps.push({
            distance: Ut(e.distance - 7, this.length),
            lane: e.lane,
            life: 18,
            owner: e,
          }),
          this.traps.length > 20 && this.traps.shift(),
          e.isPlayer && this.emit("DEAD ZONE DEPLOYED")),
        !0
      );
    }
    // Racing line: outside on entry, inside at the apex, outside on exit.
    // Positive curvature = right-hander, inside = positive lane.
    lineLane(e, t) {
      let i = Math.max(22, t * 0.5) / this.length,
        r = this.curvature(e),
        s = this.curvature(e + i),
        a = this.curvature(e + 2 * i),
        o = this.curvature(e - i);
      return bfxClamp(((r - 0.55 * s - 0.35 * a - 0.5 * o) / 0.011) * 7.5, -8, 8);
    }
    // Lap-relative distance from racer e to a lap position t (m, -len/2..len/2).
    aheadOf(e, t) {
      let i = Ut(t - e.distance, this.length);
      return i > this.length / 2 ? i - this.length : i;
    }
    hazardEffect(e) {
      let t = e.onHazard;
      return t ? (t.kind === "ice" ? 2 : t.kind === "slick" ? 1 : 0) : 0;
    }
    aiPlan(e, t, i) {
      let r = this.knob.bind(this),
        s = this.random,
        a = e.speed,
        c = this.lineLane(t, a) + e.aiLineBias,
        l = r("aiLine");
      ((e.aiWanderT -= 0.18),
        e.aiWanderT < 0 && ((e.aiWander = (s() - 0.5) * 12), (e.aiWanderT = 1.5 + s() * 2.5)));
      let h = c * l + e.aiWander * (1 - l),
        p = "line",
        u = null,
        f = 1 / 0,
        g = null,
        y = 1 / 0;
      for (let d of this.racers) {
        if (d === e || d.finish !== null) continue;
        let m = d.distance - e.distance;
        (m > 0.5 && m < f && ((f = m), (u = d)), m < -0.5 && -m < y && ((y = -m), (g = d)));
      }
      // Shortcut gate: line up for the pad if we are the type to go for it.
      if (e.aiShortcut === void 0 && (e.aiShortcut = s() < r("aiShortcut")), e.aiShortcut)
        for (let d of this.hazards) {
          if (d.kind !== "shortcut" || !d.active) continue;
          let m = this.aheadOf(e, d.distance);
          ((m > 0 && m < 90) || e.shortcutOn) && ((h = d.lane), (p = "shortcut"));
        }
      // Steer around slicks / ice / movers that sit in our path.
      if (e.aiAvoid === void 0 && (e.aiAvoid = s() < r("aiAvoid")), e.aiAvoid)
        for (let d of this.hazards) {
          if (d.kind === "shortcut" || !d.active) continue;
          let m = this.aheadOf(e, d.distance);
          if (m < 4 || m > 60) continue;
          let x = d.kind === "mover" ? d.amp + d.radius : d.radius + 1.8,
            b = d.kind === "mover" ? d.baseLane : d.lane;
          if (Math.abs(h - b) < x) {
            let w = b >= 0 ? -1 : 1;
            d.kind === "mover" && (w = a > 40 && Math.abs(Math.sin(d.phase * Math.PI * 2)) < 0.4 ? -Math.sign(Math.cos(d.phase * Math.PI * 2)) || 1 : w);
            ((h = bfxClamp(b + w * (x + 0.5), -9, 9)), (p = "avoid"));
          }
        }
      // Traps in our lane.
      for (let d of this.traps) {
        if (d.owner === e) continue;
        let m = this.aheadOf(e, d.distance);
        m > 3 && m < 45 && Math.abs(h - d.lane) < 3.2 && e.aiAvoid && ((h = bfxClamp(d.lane + (d.lane >= 0 ? -4.2 : 4.2), -9, 9)), (p = "avoid"));
      }
      // Overtake: a rival right in front - go around on the open side.
      if (u && f < 22 && Math.abs(u.lane - h) < 3.4 && a >= u.speed - 2) {
        let d = u.lane >= 0 ? -1 : 1;
        ((h = bfxClamp(u.lane + d * 3.8, -9, 9)), (p = "overtake"));
      }
      // Spacing: don't sit on top of someone alongside.
      for (let d of this.racers) {
        if (d === e || d.finish !== null) continue;
        let m = Math.abs(d.distance - e.distance);
        m < 6 && Math.abs(d.lane - e.lane) < 3 && Math.abs(d.lane - h) < 3 && (h = bfxClamp(d.lane + (e.lane >= d.lane ? 3.4 : -3.4), -9, 9));
      }
      // Block: mirror a rival closing from behind (hard/overdrive love this).
      if (
        (e.aiBlocking > 0 && (e.aiBlocking -= 0.18),
        g && y < 14 && g.speed > a - 1 && (e.aiBlocking > 0 || s() < r("aiBlock") * (g.isPlayer ? 0.5 : 0.1)))
      ) {
        (e.aiBlocking <= 0 && (e.aiBlocking = 0.9 + s() * 0.9), (h = bfxClamp(g.lane, -9, 9)), (p = "block"));
      }
      ((e.targetLane = h), (e.aiIntent = p));
      // Items with intent.
      if (e.item !== null) {
        let d = r("aiItemIQ"),
          m = e.item,
          x = this.curvature(t + 30 / this.length),
          b = !1;
        if (s() < d) {
          if (m === 0) b = Math.abs(x) < 0.0055 && Math.abs(i) < 0.006 && e.stun <= 0 && e.boost < 0.4;
          else if (m === 1) {
            let w = g && y < 40 && (g.item === 2 || g.item === 3);
            for (let A of this.traps) {
              let C = this.aheadOf(e, A.distance);
              A.owner !== e && C > 0 && C < 32 && Math.abs(A.lane - e.lane) < 3 && (w = !0);
            }
            for (let A of this.hazards) {
              if (A.kind !== "mover") continue;
              let C = this.aheadOf(e, A.distance);
              C > 0 && C < 30 && (w = !0);
            }
            b = !!w || e.itemHeld > 10;
          } else if (m === 2) b = !!(u && f < 95 && (d < 0.85 || u.shield <= 0));
          else if (m === 3) b = !!(g && y < 45 && (Math.abs(i) > 0.0065 || e.itemHeld > 7));
        }
        (e.aiItemTimer < 0 && e.itemHeld > r("aiItemHold") && (b = !0), b && (this.useItem(e), (e.aiItemTimer = 3 + s() * 5)));
      }
    }
    aiDrive(e, t, i, r, s) {
      ((e.aiThink -= s), e.aiThink < 0 && ((e.aiThink = 0.15 + this.random() * 0.06), this.aiPlan(e, i, r)));
      let a = e.speed,
        o = bfxClamp(
          (e.targetLane - e.lane) * 0.24 - e.lateralSpeed * 0.02 + (r * a * a * 0.036) / (6 + t.handling),
          -1,
          1,
        ),
        c = this.curvature(i + Math.max(14, a * 0.35) / this.length),
        l = Math.abs(r) > 0.0062 || Math.abs(c) > 0.0062,
        h = Math.abs(r) < 0.0042 && Math.abs(c) < 0.0042;
      ((e.aiDriftCool = Math.max(0, e.aiDriftCool - s)),
        !e.aiDriftOn && l && e.aiDriftCool <= 0 && a > 24 && Math.abs(e.lane) < Zl - 0.4 && e.stun <= 0
          ? ((e.aiDriftOn = e.aiDriftRoll < this.knob("aiDrift")), (e.aiDriftRoll = this.random()), e.aiDriftOn || (e.aiDriftCool = 1.2))
          : e.aiDriftOn && (h || e.stun > 0) && ((e.aiDriftOn = !1), (e.aiDriftCool = 0.7)));
      let p = r !== 0 ? Math.sign(r) : Math.sign(c),
        u = e.aiDriftOn && Math.abs(o) > 0.15 && a > 20 && Math.abs(e.lane) < Zl + 0.2 && Math.sign(o) === p;
      return (
        (e.aiItemTimer -= s),
        e.item !== null && (e.itemHeld += s),
        { c: o, l: u }
      );
    }
    updateHazards(e) {
      for (let t of this.hazards)
        if (((t.distance = t.t * this.length), t.kind === "mover")) {
          ((t.phase = (t.phase + (e * this.knob("moverSpeed")) / t.period) % 1),
            (t.lane = t.baseLane + t.amp * Math.sin(t.phase * Math.PI * 2)));
        } else if (t.kind === "shortcut" && t.gate) ((t.gate.distance = t.distance), (t.gate.lane = t.lane));
    }
    update(e, t = {}) {
      if (((e = Math.min(0.05, Math.max(0, e))), (this.events = []), this.finished)) return;
      if (this.countdown > 0) {
        let r = Math.ceil(this.countdown);
        ((this.countdown -= e),
          Math.ceil(this.countdown) !== r &&
            this.emit(this.countdown > 0 ? String(Math.ceil(this.countdown)) : "GO!", "count"));
        return;
      }
      ((this.time += e),
        this.pickups.forEach((r) => (r.cooldown = Math.max(0, r.cooldown - e))),
        this.traps.forEach((r) => (r.life -= e)),
        (this.traps = this.traps.filter((r) => r.life > 0)),
        this.updateHazards(e),
        (this._passCool = Math.max(0, this._passCool - e)));
      let i = this.world,
        pl = this.player;
      for (let r of this.racers) {
        if (r.finish !== null) continue;
        let s = ki[r.id];
        ((r.boost = Math.max(0, r.boost - e)),
          (r.shield = Math.max(0, r.shield - e)),
          (r.stun = Math.max(0, r.stun - e)),
          (r.hitCooldown = Math.max(0, r.hitCooldown - e)));
        let a = Ut(r.distance, this.length) / this.length,
          o = this.curvature(a),
          c = 0,
          l = !1;
        if (r.isPlayer)
          ((c =
            typeof t.steer == "number" ? Math.max(-1, Math.min(1, t.steer)) : (t.right ? 1 : 0) - (t.left ? 1 : 0)),
            (l = !!t.drift && Math.abs(c) > 0.15 && r.speed > 20 && Math.abs(r.lane) < Zl + 0.2),
            t.brake && (r.speed = Math.max(0, r.speed - e * 35)));
        else {
          let d = this.aiDrive(r, s, a, o, e);
          ((c = d.c), (l = d.l));
        }
        let h = 47 + s.speed * 1.6;
        if (!r.isPlayer) {
          let d = pl.distance - r.distance,
            m = this.knob("rubberBand"),
            x = this.knob("rubberLead"),
            b = this.knob("rubberDist");
          h *= r.aiSkill + Math.max(-x, Math.min(m, d / b));
        }
        // Hazard surface: slick / ice cut the speed cap and steering authority,
        // an open shortcut lifts the cap. All factors are exactly 1 off-hazard.
        let hz = this.hazardEffect(r),
          gripMul = hz === 2 ? 0.3 : hz === 1 ? 0.45 : 1,
          capMul = hz === 2 ? 0.9 : hz === 1 ? 0.93 : 1;
        r.shortcutOn && (capMul *= 1.14);
        (r.boost > 0 && (h *= 1.45),
          r.stun > 0 && (h *= 0.42),
          (h *= i.gripAt(a, r.lane) * capMul),
          (r.speed += (h - r.speed) * Math.min(1, e * (0.9 + s.accel * 0.12))),
          (r.steer += (c - r.steer) * (1 - Math.exp(-e * (Math.abs(c) < 0.02 ? 18 : 12)))));
        let p = (5 + s.handling * 0.8) * this.track.grip * (l ? 1.12 : 1) * gripMul,
          u = ((-o * r.speed * r.speed * 0.022) / (l ? 1.25 : 1)) * (hz ? 1.35 : 1),
          f = r.steer * p * (0.45 + (0.55 * r.speed) / 55) + u;
        ((r.lateralSpeed += (f - r.lateralSpeed) * (1 - Math.exp(-e * (this.track.grip < 0.8 || hz ? 8 : 14)))),
          (r.lane += r.lateralSpeed * e),
          l && r.stun <= 0
            ? ((r.drift = Math.min(3.2, r.drift + e)), (r.driftDir = Math.sign(c)), (r.drifting = !0))
            : r.drifting &&
              (r.drift > 0.65 &&
                ((r.boost = Math.max(r.boost, r.drift > 1.9 ? 2 : 1.1)),
                r.isPlayer && this.emit(r.drift > 1.9 ? "ULTRA DRIFT!" : "DRIFT BOOST!", "boost")),
              (r.drift = 0),
              (r.drifting = !1),
              (r.driftDir = 0)));
        let g = r.distance;
        r.distance += r.speed * e;
        let y = Ut(r.distance, this.length),
          gp = Ut(g, this.length);
        i.clampLane(r, e) > 3.6 && r.isPlayer && this.emit("SCRAPE!", "hit");
        for (let d of this.pickups)
          d.cooldown <= 0 &&
            Math.abs(y - d.distance) < 3 &&
            Math.abs(r.lane - d.lane) < 2.7 &&
            r.item === null &&
            ((r.item = this.rollItem(r)), (r.itemHeld = 0), (d.cooldown = 4), r.isPlayer && this.emit("POWER-UP READY", "pickup"));
        for (let d of this.pads)
          if (Math.abs(y - d.distance) < 3.5 && Math.abs(r.lane - d.lane) < 2.7) {
            if (d.shortcut) {
              if (r.shortcutUntil < 0 || y > d.distance + 4) {
                ((r.shortcutUntil = d.distance + d.shortcut.span), (r.shortcutOn = !0));
                r.isPlayer && this.emit("SHORTCUT!", "boost");
              }
            } else r.boost < 0.3 && r.isPlayer && this.emit("BOOST STRIP!", "boost");
            r.boost = Math.max(r.boost, 1.2);
          }
        // Shortcut lane: fast while the gate is open, rough if you sneak in from the side.
        if (r.shortcutOn) {
          let d = this.hazards.find((m) => m.kind === "shortcut" && m.active);
          (!d || y > r.shortcutUntil || y < d.distance - 5 || Math.abs(r.lane - d.lane) > 3.2) &&
            ((r.shortcutOn = !1), (r.shortcutUntil = -1));
        }
        for (let d of this.traps)
          d.life > 0 &&
            d.owner !== r &&
            Math.abs(y - d.distance) < 3 &&
            Math.abs(r.lane - d.lane) < 2.4 &&
            ((d.life = 0), this.hit(r));
        // Hazard contact + 40 m telegraph for the player.
        let prevHz = r.onHazard;
        r.onHazard = null;
        for (let d of this.hazards) {
          if (!d.active) continue;
          if (r.isPlayer) {
            let m = Ut(d.distance - 40 - gp, this.length);
            m < r.speed * e &&
              r.speed > 0 &&
              !(this._lastCue === d.label && this.time - this._lastCueAt < 3) &&
              ((this._lastCue = d.label), (this._lastCueAt = this.time), this.emit(d.label + " AHEAD", "cue"));
          }
          if (d.kind === "shortcut") continue;
          let m = Math.abs(y - d.distance);
          m > this.length / 2 && (m = this.length - m);
          if (m < d.radius && Math.abs(r.lane - d.lane) < d.radius + (r.halfWidth || 1.4) * 0.6)
            if (d.kind === "mover") {
              if (r.hitCooldown <= 0 && r.shield <= 0) {
                ((r.stun = Math.max(r.stun, 0.9)),
                  (r.speed *= 0.55),
                  (r.hitCooldown = 1.6),
                  r.isPlayer && (this.emit("SIGNAL LOST!", "hit"), this.emit(d.label + "!", "hazard")));
              } else if (r.shield > 0 && r.hitCooldown <= 0) {
                ((r.shield = 0), (r.hitCooldown = 1), r.isPlayer && this.emit("SHIELD BLOCKED THE HIT"));
              }
            } else ((r.onHazard = d), prevHz !== d && r.isPlayer && this.emit(d.label + "!", "hazard"));
        }
        if (
          (r.isPlayer && this.lapStart === null && g < 0 && r.distance >= 0 && (this.lapStart = this.crossedAt(r, 0)),
          Math.floor(g / this.length) < Math.floor(r.distance / this.length) &&
            r.isPlayer &&
            r.distance > this.length * 0.9 &&
            r.distance < this.length * 3)
        ) {
          let d = this.crossedAt(r, Math.floor(r.distance / this.length) * this.length),
            m = d - (this.lapStart === null ? 0 : this.lapStart);
          ((this.lapStart = d),
            this.lapTimes.push(m),
            (this.bestLap === null || m < this.bestLap) && (this.bestLap = m),
            this.emit(this.lap === 3 ? "FINAL LAP!" : "LAP 2 / 3", "lap"));
        }
        if (r.isPlayer && !this._finalStretch && r.distance >= this.length * 2.78) {
          ((this._finalStretch = !0), this.emit("FINAL STRETCH!", "finalstretch"));
        }
        if (r.distance >= this.length * 3 && ((r.finish = this.crossedAt(r, this.length * 3)), r.isPlayer)) {
          let d = r.finish - (this.lapStart === null ? 0 : this.lapStart);
          (this.lapTimes.push(d),
            (this.bestLap === null || d < this.bestLap) && (this.bestLap = d),
            (this.finished = !0));
        }
      }
      for (let r = 0; r < 8; r++)
        for (let s = r + 1; s < 8; s++) {
          let a = this.racers[r],
            o = this.racers[s];
          if (
            !(a.finish !== null || o.finish !== null) &&
            Math.abs(a.distance - o.distance) < 2.6 &&
            Math.abs(a.lane - o.lane) < 2.1
          ) {
            let c = a.lane >= o.lane ? 1 : -1;
            ((a.lane = this.limitLane(a, a.lane + c * e * 5)), (o.lane = this.limitLane(o, o.lane - c * e * 5)));
            let l = a.speed > o.speed ? a : o;
            l.speed = Math.max(10, l.speed - e * 12);
          }
        }
      // Position changes -> 'pass' events (throttled, not during the grid shuffle).
      let pos = this.position;
      if (this._prevPos && pos !== this._prevPos && this.time > 2.5 && this._passCool <= 0) {
        let rk = this.ranking(),
          idx = rk.indexOf(pl);
        if (pos < this._prevPos) {
          let o = rk[idx + 1];
          o && this.emit("PASSED " + ki[o.id].name.toUpperCase(), "pass");
        } else {
          let o = rk[idx - 1];
          o && this.emit(ki[o.id].name.toUpperCase() + " TOOK P" + (idx), "pass");
        }
        this._passCool = 1.5;
      }
      this._prevPos = pos;
      // Wrong way: the kart has been losing lap distance for a while.
      if (pl.distance < this._backFrom - 0.5) {
        ((this._backTimer += e), this._backTimer > 0.6 && ((this._backTimer = -2), this.emit("WRONG WAY", "wrongway")));
      } else ((this._backTimer = Math.min(0, this._backTimer + e)), (this._backFrom = pl.distance));
    }
    crossedAt(e, t) {
      return this.time - (e.distance - t) / Math.max(1, e.speed);
    }
    get lapElapsed() {
      return this.lapStart === null ? 0 : Math.max(0, this.time - this.lapStart);
    }
    limitLane(e, t) {
      let i = Ut(e.distance, this.length) / this.length,
        r = t >= 0 ? 1 : -1,
        s = this.world.laneLimitAt(i, r, e.halfWidth);
      return Math.abs(t) > s ? r * s : t;
    }
  };
