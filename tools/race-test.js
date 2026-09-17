#!/usr/bin/env node
// Headless race harness: races every circuit at every difficulty with a scripted
// "decent" player and checks the win-rate targets from PLAN.md.
//
//   node tools/race-test.js [--seeds 5] [--from 1] [--seed 7] [--tier hard] [--track 2] [--driver 0] [--verbose] [--events]
//
// The sim (src/00-data-sim.js) and the difficulty presets (src/07-feel.js) are
// loaded straight from src/ with `new Function` - no DOM, no three.js. The track
// world is a mock built from the same spine function `Ya` the real TrackWorld
// uses (polyline instead of CatmullRom, so lengths are within a few metres).
const fs = require("fs");
const path = require("path");

const args = Object.fromEntries(
  process.argv
    .slice(2)
    .map((a, i, arr) =>
      a.startsWith("--") ? [a.slice(2), arr[i + 1] && !arr[i + 1].startsWith("--") ? arr[i + 1] : true] : null,
    )
    .filter(Boolean),
);
const ROOT = path.resolve(__dirname, "..");
const src =
  fs.readFileSync(path.join(ROOT, "src/00-data-sim.js"), "utf8") +
  "\n" +
  fs.readFileSync(path.join(ROOT, "src/07-feel.js"), "utf8") +
  "\nreturn { Li, ki, ld, Ut, Ya, Za, Dl, Xu, Vu, Of, BFX_HAZARD_SETS };";
const S = new Function(src)();

// ---- deterministic RNG (mulberry32) ----------------------------------------
function rng(seed) {
  let n = seed | 0;
  return () => {
    n = (n + 1831565813) | 0;
    let e = Math.imul(n ^ (n >>> 15), 1 | n);
    e = (e + Math.imul(e ^ (e >>> 7), 61 | e)) ^ e;
    return ((e ^ (e >>> 14)) >>> 0) / 4294967296;
  };
}

// ---- mock TrackWorld ---------------------------------------------------------
// Mirrors the parts of 04-world.js the sim touches: sampleAt/frame, curvature,
// barrierFaceAt (with the two runoff zones), laneLimitAt, gripAt, clampLane, length.
const KART_HALF = 1.4,
  LANE_LIMIT = 11.4,
  BARRIER = LANE_LIMIT + KART_HALF,
  ROAD_HALF = 12,
  SHOULDER = 10,
  RUNOFF = {
    3: [{ from: 0.335, to: 0.452, side: 1, face: 14.45, blend: 0.022, surface: "snow" }],
    4: [{ from: 0.706, to: 0.784, side: -1, face: 14.2, blend: 0.018, surface: "sand" }],
  };
const clamp = (n, e, t) => (n < e ? e : n > t ? t : n);
const smooth = (n) => ((n = clamp(n, 0, 1)), n * n * (3 - 2 * n));
function mockWorld(idx) {
  const track = S.Li[idx],
    N = 1440,
    pts = [];
  for (let i = 0; i < N; i++) pts.push(S.Ya(track, i / N));
  let len = 0;
  for (let i = 0; i < N; i++) {
    const a = pts[i],
      b = pts[(i + 1) % N];
    len += Math.hypot(b.x - a.x, b.y - a.y, b.z - a.z);
  }
  const frames = [];
  for (let i = 0; i <= N; i++) {
    const a = pts[(i - 1 + N) % N],
      b = pts[(i + 1) % N];
    let dx = b.x - a.x,
      dy = b.y - a.y,
      dz = b.z - a.z;
    const m = Math.hypot(dx, dy, dz) || 1;
    dx /= m;
    dy /= m;
    dz /= m;
    const h = Math.hypot(dx, dz) || 1,
      p = pts[i % N];
    frames.push({ p: { x: p.x, y: p.y, z: p.z }, v: { x: dx, y: dy, z: dz }, right: { x: -dz / h, y: 0, z: dx / h } });
  }
  const curveAt = new Float32Array(N + 1);
  for (let t = 0; t <= N; t++) {
    const a = frames[(t - 1 + N) % N].v,
      b = frames[(t + 1) % N].v;
    let i = Math.atan2(b.x, b.z) - Math.atan2(a.x, a.z);
    i = ((((i + Math.PI) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)) - Math.PI;
    curveAt[t] = -i / ((len * 2) / N);
  }
  const wrap1 = (e) => ((e % 1) + 1) % 1;
  const w = {
    index: idx,
    length: len,
    frames,
    sampleAt(e, t = 0, i = 0) {
      const r = wrap1(e) * N,
        s = Math.floor(r),
        a = r - s,
        o = frames[s],
        c = frames[s + 1] || frames[0];
      const dir = { x: o.v.x + (c.v.x - o.v.x) * a, y: o.v.y + (c.v.y - o.v.y) * a, z: o.v.z + (c.v.z - o.v.z) * a };
      const right = { x: o.right.x + (c.right.x - o.right.x) * a, y: 0, z: o.right.z + (c.right.z - o.right.z) * a };
      return {
        p: { x: o.p.x + (c.p.x - o.p.x) * a + right.x * t, y: o.p.y + (c.p.y - o.p.y) * a + i, z: o.p.z + (c.p.z - o.p.z) * a + right.z * t },
        dir,
        right,
      };
    },
    frame(e, t, i) {
      return w.sampleAt(e, t, i);
    },
    curvature(e) {
      const t = wrap1(e) * N,
        i = Math.floor(t),
        r = t - i;
      return curveAt[i] * (1 - r) + curveAt[(i + 1) % (N + 1)] * r;
    },
    runoffAt(e, t) {
      const list = RUNOFF[idx];
      if (!list) return null;
      const r = wrap1(e);
      for (const s of list) {
        if (s.side !== t) continue;
        let a = s.from,
          o = s.to,
          c = r;
        if (o < a) {
          if (c < a) c += 1;
          o += 1;
        }
        if (c > a - s.blend && c < o + s.blend) return s;
      }
      return null;
    },
    barrierFaceAt(e, t) {
      const list = RUNOFF[idx];
      if (!list) return BARRIER;
      const r = wrap1(e);
      let s = BARRIER;
      for (const a of list) {
        if (a.side !== t) continue;
        let o = a.from,
          c = a.to,
          l = r;
        if (c < o) {
          if (l < o) l += 1;
          c += 1;
        }
        const h = smooth((l - o) / a.blend) * smooth((c - l) / a.blend);
        if (h > 0) s = Math.max(s, BARRIER + (a.face - BARRIER) * h);
      }
      return s;
    },
    laneLimitAt(e, t, i) {
      return w.barrierFaceAt(e, t) - (i || KART_HALF);
    },
    gripAt(e, t) {
      const i = Math.abs(t);
      if (i <= SHOULDER) return 1;
      const r = Math.sign(t) || 1,
        s = w.runoffAt(e, r);
      if (s && i > ROAD_HALF) {
        const a = clamp((i - ROAD_HALF) / 2.4, 0, 1);
        return clamp(0.58 - (s.surface === "snow" ? 0.14 : 0.1) * a, 0.38, 1);
      }
      return Math.max(0.65, 1 - (i - SHOULDER) * 0.16);
    },
    clampLane(e, t) {
      const i = S.Ut(e.distance, len) / len,
        r = e.lane >= 0 ? 1 : -1,
        s = w.laneLimitAt(i, r, e.halfWidth);
      if (Math.abs(e.lane) <= s) {
        if (e.wallScrape) e.wallScrape = Math.max(0, e.wallScrape - t * 3.2);
        return 0;
      }
      const a = Math.max(0, e.lateralSpeed * r);
      e.lane = r * s;
      if (a > 3.6) {
        e.lateralSpeed = -r * Math.min(a * 0.3, 7.5);
        e.speed *= 1 - Math.min(0.24, a * 0.0135);
      } else {
        e.lateralSpeed = -r * 0.75;
        e.speed -= e.speed * Math.min(0.45, t * 0.62);
      }
      e.speed = Math.max(e.speed, 9);
      e.wallScrape = Math.min(1.4, (e.wallScrape || 0) + 0.28 + a * 0.05);
      e.wallSide = r;
      return a;
    },
  };
  return w;
}

// ---- scripted player -----------------------------------------------------------
// A "decent" human: follows a corner-based line (outside-inside-outside), drifts
// most long corners, uses items with a bit of sense, reacts with ~0.2 s lag and
// is a little wobbly. Not optimal on purpose.
function makeDriver(race, guide, world, random, profile) {
  const P = Object.assign(
    { driftChance: 0.8, lag: 5.5, wobble: 0.12, avoid: 0.7, shortcut: 0.8, inside: 5.5, outside: 5 },
    profile || {},
  );
  const len = race.length,
    corners = guide.corners;
  const st = { steer: 0, drift: false, driftCorner: null, driftRoll: random(), wobbleT: 0, wobble: 0, cornerKey: null, willDrift: false };
  const input = { steer: 0, drift: false, brake: false };
  function rel(tT, t) {
    let d = (tT - t) * len;
    if (d > len / 2) d -= len;
    if (d < -len / 2) d += len;
    return d;
  }
  return {
    input,
    step(dt) {
      const p = race.player,
        hand = S.ki[p.id].handling,
        t = S.Ut(p.distance, len) / len,
        o = race.curvature(t);
      // pick the corner we are in or the next one up
      let cur = null,
        next = null,
        nextD = 1e9;
      for (const c of corners) {
        const ds = rel(c.startT, t),
          de = rel(c.endT, t);
        if (ds <= 0 && de >= 0) cur = c;
        else if (ds > 0 && ds < nextD) {
          nextD = ds;
          next = c;
        }
      }
      let target = 0;
      if (cur) target = cur.dir * P.inside;
      else if (next && nextD < 45) target = -next.dir * P.outside;
      else {
        // ease back to centre after an exit
        target = 0;
        for (const c of corners) {
          const de = rel(c.endT, t);
          if (de < 0 && de > -30) target = -c.dir * P.outside * (1 + de / 30);
        }
      }
      // shortcut gate ahead: line up for it
      if (st.goShortcut === undefined) st.goShortcut = random() < P.shortcut;
      if (st.goShortcut)
        for (const h of race.hazards) {
          if (h.kind !== "shortcut") continue;
          const d = race.aheadOf(p, h.distance);
          if (d > 0 && d < 70) target = h.lane;
          else if (p.shortcutOn) target = h.lane;
        }
      // dodge hazards + traps
      if (st.avoid === undefined) st.avoid = random() < P.avoid;
      if (st.avoid) {
        for (const h of race.hazards) {
          if (h.kind === "shortcut") continue;
          const d = race.aheadOf(p, h.distance);
          if (d < 3 || d > 55) continue;
          const base = h.kind === "mover" ? h.baseLane : h.lane,
            wide = h.kind === "mover" ? h.amp * 0.6 : h.radius + 1.6;
          if (Math.abs(target - base) < wide) target = clamp(base + (base >= 0 ? -1 : 1) * (wide + 0.8), -9, 9);
        }
        for (const tr of race.traps) {
          if (tr.owner === p) continue;
          const d = race.aheadOf(p, tr.distance);
          if (d > 3 && d < 40 && Math.abs(target - tr.lane) < 3) target = clamp(tr.lane + (tr.lane >= 0 ? -4 : 4), -9, 9);
        }
      }
      // wobble
      st.wobbleT -= dt;
      if (st.wobbleT < 0) {
        st.wobble = (random() - 0.5) * 2 * P.wobble;
        st.wobbleT = 0.4 + random() * 0.6;
      }
      const raw = clamp(
        (target - p.lane) * 0.22 - p.lateralSpeed * 0.03 + (o * p.speed * p.speed * 0.036) / (6 + hand) + st.wobble,
        -1,
        1,
      );
      st.steer += (raw - st.steer) * (1 - Math.exp(-dt * P.lag));
      // drift decision per corner
      const key = cur ? cur.apexT : null;
      if (key !== st.cornerKey) {
        st.cornerKey = key;
        st.willDrift = !!cur && cur.severity >= 1 && random() < P.driftChance;
      }
      const wantDrift = !!cur && st.willDrift && p.speed > 22 && Math.abs(st.steer) > 0.2 && Math.sign(st.steer) === cur.dir;
      input.steer = st.steer;
      input.drift = wantDrift;
      input.brake = false;
      // items
      if (p.item !== null) {
        let use = false;
        const held = p.itemHeld || 0;
        let aheadD = 1e9,
          behindD = 1e9;
        for (const r of race.racers) {
          if (r === p || r.finish !== null) continue;
          const d = r.distance - p.distance;
          if (d > 0 && d < aheadD) aheadD = d;
          if (d < 0 && -d < behindD) behindD = -d;
        }
        if (p.item === 0) use = (!cur && nextD > 35) || held > 4;
        else if (p.item === 1) use = behindD < 30 || held > 5;
        else if (p.item === 2) use = aheadD < 90;
        else if (p.item === 3) use = (cur && behindD < 60) || held > 6;
        if (use) race.useItem(p);
      }
    },
  };
}

// ---- one race ------------------------------------------------------------------
function runRace(track, driver, tier, seed, opts) {
  const random = rng(seed * 7919 + track * 131 + driver * 17 + 1);
  const world = mockWorld(track);
  const halfWidths = Array.from({ length: 8 }, () => 1.4);
  const race = new S.Za(track, driver, world.length, (e) => world.curvature(e), random, world);
  race.setWorld(world, halfWidths);
  S.Xu(race, tier);
  const guide = S.Vu(world, S.Li[track]);
  const bot = makeDriver(race, guide, world, random, opts.profile);
  const dt = 1 / 60;
  const events = {};
  const eventSamples = [];
  let frames = 0,
    wallTime = 0;
  const maxFrames = 60 * 150;
  const fakeInput = { steer: 0, left: false, right: false, drift: false, brake: false };
  while (!race.finished && frames < maxFrames) {
    const pre = [];
    if (race.countdown <= 0) {
      bot.step(dt); // may call race.useItem -> events land before update() clears them
      pre.push(...race.events);
      race.events = [];
    }
    // same player-side shaping the game applies (steerGain + saver)
    fakeInput.steer = bot.input.steer;
    S.Of(fakeInput, race);
    fakeInput.drift = bot.input.drift;
    fakeInput.brake = bot.input.brake;
    race.update(dt, fakeInput);
    for (const ev of pre.concat(race.events)) {
      events[ev.type] = (events[ev.type] || 0) + 1;
      if (opts.events && eventSamples.length < 400) eventSamples.push(`${race.time.toFixed(1)}s [${ev.type}] ${ev.text}`);
    }
    race.events = []; // the game drains events every frame too
    frames++;
    wallTime += dt;
    // NaN guard
    for (const r of race.racers)
      for (const k of ["distance", "lane", "speed", "lateralSpeed", "steer", "boost", "drift"])
        if (!Number.isFinite(r[k])) throw new Error(`NaN/Inf in racer ${r.id}.${k} at t=${race.time.toFixed(2)} track=${track} tier=${tier}`);
    for (const h of race.hazards)
      for (const k of ["distance", "lane", "radius", "phase"])
        if (!Number.isFinite(h[k])) throw new Error(`NaN in hazard ${h.kind}.${k}`);
  }
  // let the rest of the field finish so positions are final-ish (cap 20 s)
  let extra = 0;
  while (race.racers.some((r) => r.finish === null) && extra < 60 * 25) {
    race.finished = false;
    race.update(dt, fakeInput);
    race.finished = true;
    extra++;
  }
  const finishTime = race.player.finish;
  return {
    track,
    tier,
    seed,
    finished: finishTime !== null,
    position: race.position,
    time: finishTime,
    laps: race.lapTimes.slice(),
    best: race.bestLap,
    length: race.length,
    events,
    eventSamples,
    ranking: race.ranking().map((r) => ({ name: S.ki[r.id].name, finish: r.finish, you: r.isPlayer })),
    hazards: race.hazards.map((h) => h.kind),
  };
}

// ---- main --------------------------------------------------------------------------
const TIERS = ["easy", "normal", "hard", "overdrive"];
const tiers = args.tier ? [args.tier] : TIERS;
const tracks = args.track !== undefined ? [+args.track] : [0, 1, 2, 3, 4, 5];
const seeds = args.seed !== undefined ? [+args.seed] : Array.from({ length: +(args.seeds || 5) }, (_, i) => i + +(args.from || 1));
const driverIdx = args.driver !== undefined ? +args.driver : 0;
const targets = {
  easy: { min: 5 / 6, max: 1 },
  normal: { min: 2 / 6, max: 4 / 6 },
  hard: { min: 0.5 / 6, max: 2.5 / 6 },
  overdrive: { min: 0, max: 1 / 6 },
};
const fmt = (s) => (s === null || s === undefined ? "--" : s.toFixed(2) + "s");
let failures = [];
const summary = {};
console.log(`race-test: tracks=${tracks.join(",")} tiers=${tiers.join(",")} seeds=${seeds.join(",")} driver=${driverIdx}`);
for (const tier of tiers) {
  let wins = 0,
    n = 0,
    maxT = 0,
    posSum = 0;
  console.log(`\n== ${tier.toUpperCase()} (${S.Dl[tier].label}) ==`);
  console.log("  seed trk circuit              pos   time     laps                         hazards / events");
  for (const seed of seeds)
    for (const track of tracks) {
      let res;
      try {
        res = runRace(track, driverIdx, tier, seed, { events: !!args.events });
      } catch (e) {
        failures.push(e.message);
        console.log(`  ${seed}   ${track}  ${S.Li[track].name.padEnd(20)} CRASH ${e.message}`);
        continue;
      }
      n++;
      if (res.position === 1) wins++;
      posSum += res.position;
      if (!res.finished) failures.push(`did not finish: track ${track} tier ${tier} seed ${seed}`);
      if (res.time !== null && res.time > 90) failures.push(`race too long (${res.time.toFixed(1)}s): track ${track} tier ${tier} seed ${seed}`);
      if (res.time !== null) maxT = Math.max(maxT, res.time);
      const ev = Object.entries(res.events)
        .filter(([k]) => ["pickup", "pass", "hazard", "cue", "finalstretch", "wrongway", "hit"].includes(k))
        .map(([k, v]) => `${k}:${v}`)
        .join(" ");
      console.log(
        `  ${String(seed).padStart(2)}   ${track}  ${S.Li[track].name.padEnd(20)} P${res.position}  ${fmt(res.time).padStart(7)}  ${res.laps.map(fmt).join(" ").padEnd(28)} ${res.hazards.join(",")} | ${ev}`,
      );
      if (args.verbose) {
        console.log("       order: " + res.ranking.map((r) => (r.you ? "[" + r.name + "]" : r.name) + (r.finish !== null ? "@" + r.finish.toFixed(1) : "(dnf)")).join(" "));
      }
      if (args.events) for (const s of res.eventSamples) console.log("       " + s);
    }
  const rate = n ? wins / n : 0;
  summary[tier] = { wins, n, rate, avgPos: n ? posSum / n : 0, maxT };
  const tg = targets[tier];
  const ok = rate >= tg.min - 1e-9 && rate <= tg.max + 1e-9;
  console.log(
    `  -> wins ${wins}/${n} (${(rate * 100).toFixed(0)}%)  avg pos ${(posSum / Math.max(1, n)).toFixed(2)}  longest ${maxT.toFixed(1)}s  target ${(tg.min * 100).toFixed(0)}-${(tg.max * 100).toFixed(0)}%  ${ok ? "OK" : "OUT OF TARGET"}`,
  );
  if (!ok) failures.push(`${tier}: win rate ${(rate * 100).toFixed(0)}% outside ${(tg.min * 100).toFixed(0)}-${(tg.max * 100).toFixed(0)}%`);
}
console.log("\n== SUMMARY ==");
console.log("  tier       wins   rate   avgPos  longest");
for (const t of tiers) {
  const s = summary[t];
  console.log(`  ${t.padEnd(10)} ${String(s.wins + "/" + s.n).padEnd(6)} ${(s.rate * 100).toFixed(0).padStart(4)}%  ${s.avgPos.toFixed(2).padStart(6)}  ${s.maxT.toFixed(1)}s`);
}
if (failures.length) {
  console.log("\nFAILURES:");
  for (const f of failures) console.log("  - " + f);
  process.exit(1);
}
console.log("\nall targets met");
