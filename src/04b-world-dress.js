// ---------------------------------------------------------------------------
// 04b-world-dress — the six circuit dressers.  m1 = [chicago, megastore,
// lakefront, frostbyte, canyon, galaxy] is consumed by bf() in 04-world.js.
// Every dresser gets the context built in TrackWorld.buildScenery():
//   { shop, track, rand, sample(t,lat,h), curvature(t), barrierFaceAt(t,side),
//     length, baseY, frames, detail, quality, anim(fn), mesh(obj), signTexture,
//     signBoard, group }
// Nothing here changes collision: barrier props sit outside barrierFaceAt().
// ---------------------------------------------------------------------------

// Ground material with a soft noise tile (grass / sand / snow / rock).
function Wf_groundMat(n, name, opts = {}) {
  let e = n.shop;
  if (e.mats[name]) return name;
  let tex = null;
  if (wu) {
    let size = 128,
      h = Wf_noise(size, opts.seed || 77, 4, 0.55, 3),
      [c, ctx] = Tu(size, size),
      img = ctx.createImageData(size, size),
      d = img.data,
      lo = opts.lo === void 0 ? 150 : opts.lo,
      hi = opts.hi === void 0 ? 255 : opts.hi;
    for (let i = 0; i < h.length; i++) {
      let v = lo + (hi - lo) * h[i];
      (d[i * 4] = d[i * 4 + 1] = d[i * 4 + 2] = v), (d[i * 4 + 3] = 255);
    }
    ctx.putImageData(img, 0, 0);
    tex = Eu(c);
    tex.repeat.set(opts.repeat || 1, opts.repeat || 1);
  }
  e.register(
    name,
    new MeshStandardMaterial({
      vertexColors: !0,
      map: tex,
      metalness: opts.metal || 0.02,
      roughness: opts.rough === void 0 ? 0.95 : opts.rough,
      flatShading: !!opts.flat,
    }),
  );
  return name;
}

// Big flat ground plane (uses the strip uv so the tile repeats).
function Wf_groundPlane(n, mat, y, size, col, seg = 1) {
  let g = Cu["gp" + seg] || (Cu["gp" + seg] = new PlaneGeometry(1, 1, seg, seg).rotateX(-Math.PI / 2));
  (pr.set(0, 0, 0), dr.setFromEuler(pr));
  ur.compose(pi.set(0, y, 0), dr, new Vector3(size, 1, size));
  n.shop.batch(mat).add(g, ur, col, size / 14);
}

// Armco on the straights, tyre walls on the outside of corners.
function Wf_dressBarrier(n, opts = {}) {
  let segs = 48,
    tyres = opts.tyres !== !1 && n.quality !== "low",
    cols = opts.tyreCols;
  for (let side of [1, -1]) {
    let run = null,
      kind = null,
      flush = (end) => {
        if (!run) return;
        if (kind === "tyre") Wf_tyreWall(n, run, end, side, 2, cols);
        else if (opts.armco !== !1) Wf_armco(n, run, end, side, opts.armcoCol, opts.postCol);
        run = null;
      };
    for (let i = 0; i <= segs; i++) {
      let t = i / segs,
        c = n.curvature(Ut(t + 0.5 / segs, 1)),
        outside = (c > 0 ? 1 : -1) === side,
        k = i < segs && Math.abs(c) > 0.0022 && outside && tyres ? "tyre" : i < segs ? "armco" : null;
      if (k !== kind) (flush(t), (kind = k), k && (run = t));
    }
  }
}

// Two grandstands + flags around the start straight; shared by every circuit.
function Wf_venue(n, opts = {}) {
  let t = n.track,
    flagTex = n._flagTex || (n._flagTex = Wf_logoTex("BLUFOX", "#ffffff", 256, 128, { bg: "#5b2fd6", stripe: "#5df0ff", size: 0.5 })),
    flagTex2 = n._flagTex2 || (n._flagTex2 = Wf_logoTex("xfinity", "#ffffff", 256, 128, { bg: "#0b1730", stripe: "#d96bff", size: 0.5 }));
  let stands = opts.stands || [
    [0.04, 1],
    [0.965, -1],
  ];
  let banners = [];
  for (let [tt, side] of stands) {
    let b = Wf_grandstand(n, tt, side, opts.len || 38, opts.rows || 5, opts.col || 2175053, {
      alt: opts.alt,
      roof: opts.roof,
      glow: opts.glow || t.neon,
      stripe: opts.stripe,
    });
    b && banners.push(b);
  }
  opts.bannerTex && banners.length && Br(n, opts.bannerTex, banners);
  if (n.quality !== "low") {
    let a = [],
      b = [],
      spots = opts.flagSpots || [0.975, 0.984, 0.993, 0.002, 0.011, 0.02, 0.029, 0.038, 0.047, 0.056];
    spots.forEach((tt, k) => {
      let side = k % 2 ? 1 : -1;
      (k % 4 < 2 ? a : b).push({ t: tt, lat: side * (n.barrierFaceAt(tt, side) + 2.4), h: 6.5, spin: side > 0 ? 0 : Math.PI });
    });
    Wf_flags(n, flagTex, a, 2.2);
    Wf_flags(n, flagTex2, b, 2.2);
  }
}

// Tyre-wall-safe grandstand banner textures, made once per circuit.
function Wf_bannerTex(n, text, fg, bg) {
  return n.signTexture(text, fg, bg, 768, 160);
}

// ===========================================================================
// 0 — CHICAGO AFTERGLOW: elevated night expressway through a neon skyline.
// ===========================================================================
function Wf_chicago(n) {
  let { shop: e, track: t, rand: i } = n,
    ground = n.baseY - 16;
  // dark water / wet streets far below the expressway
  {
    let w = Wf_waterMaterial(1054010, { repeat: 120 });
    w.mat.metalness = 0.85;
    w.mat.roughness = 0.1;
    e.register("water", w.mat);
    let g = new PlaneGeometry(2600, 2600, 24, 24).rotateX(-Math.PI / 2),
      m = new Mesh(g, w.mat);
    ((m.position.y = ground), (m.receiveShadow = !1), (m.name = "water"), e.mesh(m));
    w.normal && n.anim((tm) => w.normal.offset.set(tm * 0.012, tm * 0.008));
  }
  // expressway piers + under-deck
  {
    let cnt = Tt(n, 46);
    for (let k = 0; k < cnt; k++) {
      let tt = (k + 0.5) / cnt,
        s = n.sample(tt, 0, 0),
        yaw = Wf_yaw(s),
        h = s.p.y - 2.6 - ground;
      e.put("box", "matte", s.p.x, ground + h / 2, s.p.z, 3.2, h, 2.2, 2300455, 0, yaw, 0);
      e.put("box", "matte", s.p.x, s.p.y - 2.9, s.p.z, Sn * 2 + 1, 0.7, 3.4, 1712950, 0, yaw, 0);
      for (let side of [-1, 1]) {
        let q = n.sample(tt, side * 11, 0);
        e.put("box", "matte", q.p.x, ground + h * 0.55, q.p.z, 1.4, h * 1.1, 1.4, 2300455, 0, yaw, 0.35 * side);
      }
    }
  }
  // facades: cool + warm window grids
  let facA = l1(i, [t.neon, t.secondary, 16771509, 10475775], 527904, 4, 9, 0.3),
    facB = l1(i, [16771509, 16748352, t.neon], 659497, 4, 9, 0.36);
  for (let [nm, tx] of [
    ["facade", facA],
    ["facade2", facB],
  ])
    e.register(
      nm,
      new MeshStandardMaterial({
        map: tx,
        emissiveMap: tx,
        emissive: 16777215,
        emissiveIntensity: 0.7,
        vertexColors: !0,
        metalness: 0.3,
        roughness: 0.55,
      }),
    );
  e.register(
    "pool",
    new MeshBasicMaterial({ map: Ns(), vertexColors: !0, transparent: !0, opacity: 0.5, blending: nn, side: ii, depthWrite: !1 }),
  );
  let towerCols = [7177389, 5334156, 8689595, 4281973, 8023966, 5265041],
    crowns = [t.neon, t.secondary, 16771509, 16748352];
  // near blocks (mid-rise), far blocks (skyscrapers)
  let near = Tt(n, 60),
    far = Tt(n, 70);
  for (let d = 0; d < near; d++) {
    let m = d / near,
      x = d % 2 ? 1 : -1,
      w = 12 + i() * 14,
      dp = 11 + i() * 13,
      h = 18 + i() * 40,
      lat = x * (Math.max(w, dp) * 0.75 + 24 + i() * 30),
      s = n.sample(m, lat, 0),
      y = ground;
    (Math.abs(lat) < 20 && (lat = x * 22),
      e.mats.facade2 && i() < 0.4
        ? e.putUV("box", "facade2", s.p.x, y + h / 2, s.p.z, w, h, dp, towerCols[d % 6], i() * 0.3 - 0.15, [Math.max(1, Math.round(w / 13.6)), Math.max(2, Math.round(h / 32.4))])
        : Wf_tower(n, s.p.x, y, s.p.z, w, h, dp, towerCols[d % 6], i() * 0.3 - 0.15, {
            crown: i() < 0.6 ? crowns[d % 4] : 0,
            neonEdge: i() < 0.35 ? (d % 2 ? t.neon : t.secondary) : 0,
          }));
    // rooftop water tanks / ac units
    i() < 0.5 && e.put("cyl6", "matte", s.p.x + (i() - 0.5) * w * 0.5, y + h + 1.6, s.p.z + (i() - 0.5) * dp * 0.5, 2.4, 3, 2.4, 3552822, 0, 0, 0);
  }
  for (let d = 0; d < far; d++) {
    let m = d / far,
      x = d % 2 ? 1 : -1,
      w = 20 + i() * 34,
      dp = 20 + i() * 28,
      h = 60 + i() * 130,
      s = n.sample(m, x * (Math.max(w, dp) * 0.75 + 95 + i() * 130), 0);
    Wf_tower(n, s.p.x, ground, s.p.z, w, h, dp, towerCols[(d + 2) % 6], i() * 0.25 - 0.12, {
      crown: crowns[d % 4],
      tier: i() < 0.55 ? 8 + i() * 22 : 0,
      spire: i() < 0.3 ? 14 + i() * 20 : 0,
    });
  }
  // the L: elevated rail beside the track that swings across it
  {
    let latAt = (tt) => {
        let u = mf((tt - 0.44) / 0.12, 0, 1),
          k = u * u * (3 - 2 * u);
        return -30 + 60 * k;
      },
      hAt = 8.4,
      t0 = 0.06,
      t1 = 0.7,
      segs = Tt(n, 70);
    for (let d = 0; d <= segs; d++) {
      let m = t0 + ((t1 - t0) * d) / segs,
        lat = latAt(m),
        x = n.sample(m, lat, 0),
        b = Wf_yaw(x),
        w = x.p.y + hAt,
        A = (((t1 - t0) * n.length) / segs) * 1.06,
        tilt = Math.atan2(latAt(m + 0.004) - latAt(m - 0.004), (0.008 * n.length));
      (e.put("box", "gloss", x.p.x, w, x.p.z, 6.4, 0.55, A, 2898775, 0, b - tilt, 0),
        e.put("box", "gloss", x.p.x, w + 0.5, x.p.z, 0.3, 0.4, A, 3491434, 0, b - tilt, 0),
        e.put("box", "gloss", x.p.x + Math.cos(b) * 1.5, w + 0.5, x.p.z - Math.sin(b) * 1.5, 0.3, 0.4, A, 3491434, 0, b - tilt, 0),
        e.put("box", "gloss", x.p.x - Math.cos(b) * 1.5, w + 0.5, x.p.z + Math.sin(b) * 1.5, 0.3, 0.4, A, 3491434, 0, b - tilt, 0),
        e.put("box", "gloss", x.p.x, w - 0.6, x.p.z, 7, 0.5, 0.5, 1712950, 0, b, 0),
        d % 3 === 0 && Math.abs(lat) > 16.5 && e.put("box", "gloss", x.p.x, (w + ground) / 2, x.p.z, 1.6, w - ground, 1.6, 2503504, 0, b, 0),
        d % 3 === 0 && Math.abs(lat) <= 16.5 && e.put("box", "gloss", x.p.x, w - 1.2, x.p.z, 0.6, 1.2, 8, 2503504, 0, b, 0));
    }
    // the train: two 2-car units that ride the L
    let carMat = new MeshStandardMaterial({ vertexColors: !0, metalness: 0.5, roughness: 0.35 }),
      mk = () => {
        let kb = new kr(carMat);
        for (let c of [-1, 1]) {
          let z0 = c * 6.3;
          ur.compose(pi.set(0, 1.45, z0), dr.set(0, 0, 0, 1), new Vector3(2.9, 2.6, 11.6));
          kb.add(wl("box"), ur, 12175070);
          ur.compose(pi.set(0, 2.85, z0), dr, new Vector3(2.7, 0.25, 11.2));
          kb.add(wl("box"), ur, 8421504);
          for (let k = -4; k <= 4; k++) {
            ur.compose(pi.set(1.47, 1.7, z0 + k * 1.2), dr, new Vector3(0.06, 0.9, 0.8));
            kb.add(wl("box"), ur, 16774096);
            ur.compose(pi.set(-1.47, 1.7, z0 + k * 1.2), dr, new Vector3(0.06, 0.9, 0.8));
            kb.add(wl("box"), ur, 16774096);
          }
        }
        let m = kb.mesh();
        return ((m.matrixAutoUpdate = !0), (m.castShadow = !0), m);
      },
      units = [mk(), mk()];
    units.forEach((u) => e.mesh(u));
    let glowMat = new MeshBasicMaterial({ vertexColors: !0 });
    units.forEach((u) => {
      let gb = new kr(glowMat);
      for (let c of [-1, 1]) {
        let z0 = c * 6.3;
        for (let k = -4; k <= 4; k++)
          for (let sx of [-1, 1]) {
            ur.compose(pi.set(sx * 1.49, 1.7, z0 + k * 1.2), dr.set(0, 0, 0, 1), new Vector3(0.04, 0.85, 0.75));
            gb.add(wl("box"), ur, 16774096);
          }
      }
      let gm = gb.mesh();
      ((gm.matrixAutoUpdate = !0), u.add(gm));
    });
    n.anim((tm) => {
      let speed = 0.011,
        base = Ut(0.08 + tm * speed, t1 - t0 - 0.04);
      units.forEach((u, k) => {
        let m = t0 + Ut(base - k * 0.019, t1 - t0),
          lat = latAt(m),
          s = n.sample(m, lat, hAt + 0.28),
          tilt = Math.atan2(latAt(m + 0.004) - latAt(m - 0.004), 0.008 * n.length);
        u.position.copy(s.p);
        u.rotation.set(0, Wf_yaw(s) - tilt, 0);
      });
    });
  }
  // overpass crossing the track
  {
    let tt = 0.82,
      s = n.sample(tt, 0, 0),
      yaw = Wf_yaw(s),
      y = s.p.y + 10.5;
    e.put("box", "matte", s.p.x, y, s.p.z, 46, 1.4, 12, 2300455, 0, yaw + Math.PI / 2, 0);
    e.put("box", "gloss", s.p.x, y + 1.2, s.p.z, 46, 1, 0.3, 12632256, 0, yaw + Math.PI / 2, 0);
    e.put("box", "glow", s.p.x, y - 0.75, s.p.z, 44, 0.12, 0.4, t.neon, 0, yaw + Math.PI / 2, 0);
    for (let k of [-1, 1]) {
      let q = n.sample(tt, k * 19, 0);
      e.put("box", "matte", q.p.x, (y + q.p.y - 3) / 2, q.p.z, 3, y - q.p.y + 3, 3, 2300455, 0, yaw, 0);
      for (let j = -1; j <= 1; j++) {
        let l = n.sample(tt + (j * 4) / n.length, k * 15, 0);
        e.put("box", "gloss", l.p.x, y + 4, l.p.z, 0.2, 6, 0.2, 2766162, 0, yaw, 0);
        e.put("box", "glow", l.p.x, y + 7, l.p.z, 0.9, 0.2, 0.4, 16771520, 0, yaw, 0);
      }
    }
  }
  // street lamps + light pools
  let u = Tt(n, 30);
  for (let d = 0; d < u; d++) Wf_lamp(n, d / u, d % 2 ? 1 : -1, 16771520);
  // billboards + neon signs
  let f = n.signTexture("CHICAGO  AFTERGLOW", "#8ff4ff", "#101b3c", 768, 160),
    g = n.signTexture("BLUFOX  MOBILE", "#ffd8f4", "#2b0f47", 768, 160),
    y = n.signTexture("GIGABIT  DOWNTOWN", "#ffe6b0", "#33163a", 768, 160),
    v5 = n.signTexture("5G", "#ffffff", "#d96bff", 256, 256);
  {
    let list = [];
    [
      [f, 0.21],
      [g, 0.55],
      [y, 0.79],
      [f, 0.36],
      [g, 0.9],
    ].forEach(([d, m], x) => {
      let b = x % 2 ? 1 : -1;
      list.push({ tex: d, t: m, side: b, lat: 24, h: 7.5, w: 15, hh: 3.1, poleCol: 2240074 });
      let C = n.sample(m, b * 24, 0);
      e.put("box", "glow", C.p.x, C.p.y + 9.3, C.p.z, 15.2, 0.14, 0.3, x % 2 ? t.neon : t.secondary, 0, Wf_yaw(C), 0);
    });
    for (let k = 0; k < 4; k++) list.push({ tex: v5, t: 0.12 + k * 0.24, side: k % 2 ? -1 : 1, lat: 27, h: 16 + k * 3, w: 5, hh: 5, pole: !1 });
    Wf_signs(n, list);
  }
  // edge haze strips (neon under-glow)
  let v = Tt(n, 64);
  for (let d = 0; d < v; d++) {
    let m = d / v,
      x = d % 2 ? 1 : -1,
      b = n.sample(m, x * 11.1, 0.035);
    e.put("box", "haze", b.p.x, b.p.y, b.p.z, 0.9, 0.008, 5 + i() * 7, d % 2 ? t.neon : t.secondary, 0, Wf_yaw(b), 0);
  }
  Wf_dressBarrier(n, { tyreCols: [1710618, 1710618, t.neon, 15921906], armcoCol: 9474192 });
  Wf_venue(n, { col: 2175053, alt: 2834294, glow: t.neon, bannerTex: Wf_bannerTex(n, "BLUFOX  MOBILE  \xB7  5G", "#d9fbff", "#2b0f47") });
  // fences by the stands
  if (n.quality !== "low") (Wf_fence(n, 0.02, 0.07, 1), Wf_fence(n, 0.94, 0.99, -1));
}

// ===========================================================================
// 1 — XFINITY MEGASTORE: a supersized showroom.
// ===========================================================================
function Wf_megastore(n) {
  let { shop: e, track: t, rand: i } = n,
    r = 11844816,
    s = 10068922,
    a = 9279405,
    o = n.frames,
    c = 15.5,
    l = 46;
  Wf_groundMat(n, "floor", { seed: 12, lo: 205, hi: 245, rough: 0.16, metal: 0.25, repeat: 1 });
  Aa(n, 15.4, l, -2.6, r, "floor");
  let h = e.batch("matte");
  (h.strip(o, () => ({ lat: l, h: -2.6 }), () => ({ lat: l, h: c }), () => s),
    h.strip(o, () => ({ lat: -l, h: c }), () => ({ lat: -l, h: -2.6 }), () => s),
    h.strip(o, () => ({ lat: l, h: c }), () => ({ lat: -l, h: c }), () => a),
    h.strip(o, () => ({ lat: l - 0.01, h: -2.4 }), () => ({ lat: l - 0.01, h: 1.9 }), () => 4805485),
    h.strip(o, () => ({ lat: -l + 0.01, h: 1.9 }), () => ({ lat: -l + 0.01, h: -2.4 }), () => 4805485),
    h.strip(o, () => ({ lat: l - 0.01, h: 8.4 }), () => ({ lat: l - 0.01, h: 10.6 }), () => 3752540),
    h.strip(o, () => ({ lat: -l + 0.01, h: 10.6 }), () => ({ lat: -l + 0.01, h: 8.4 }), () => 3752540));
  let p = e.batch("glow");
  (p.strip(o, () => ({ lat: l - 0.02, h: 5.4 }), () => ({ lat: l - 0.02, h: 6.9 }), (w) => ((w >> 3) % 2 ? t.neon : 15659770)),
    p.strip(o, () => ({ lat: -l + 0.02, h: 6.9 }), () => ({ lat: -l + 0.02, h: 5.4 }), (w) => ((w >> 3) % 2 ? t.secondary : 15659770)));
  // mezzanine balcony with rail + spectators
  {
    let mz = 7.6;
    for (let side of [1, -1]) {
      h.strip(o, () => ({ lat: side * (l - 0.02), h: mz }), () => ({ lat: side * (l - 7), h: mz }), () => 13421772);
      h.strip(o, () => ({ lat: side * (l - 7), h: mz }), () => ({ lat: side * (l - 7), h: mz - 0.7 }), () => 11184810);
      e.batch("glow").strip(o, () => ({ lat: side * (l - 7), h: mz - 0.7 }), () => ({ lat: side * (l - 7.02), h: mz - 0.85 }), () => (side > 0 ? t.neon : t.secondary));
      e.batch("glass").strip(o, () => ({ lat: side * (l - 7.1), h: mz }), () => ({ lat: side * (l - 7.1), h: mz + 1.1 }), () => 12442111);
    }
    if (n.quality !== "low")
      for (let k = 0; k < 6; k++) {
        let side = k % 2 ? 1 : -1,
          t0 = k / 6 + 0.02;
        Wf_crowdRows(n, t0, t0 + 0.05, side, () => l - 8.2, (row, s) => s.p.y + mz, 1, 1.6, 0.6);
      }
  }
  // roof trusses + columns
  let u = Tt(n, 10);
  for (let w = 0; w < u; w++) {
    let A = (w + 0.35) / u,
      C = n.sample(A, 0, 0),
      F = Wf_yaw(C);
    (e.put("box", "matte", C.p.x, C.p.y + c - 3.6, C.p.z, l * 2, 2.2, 1.5, 3752540, 0, F + Math.PI / 2, 0),
      e.put("box", "glow", C.p.x, C.p.y + c - 4.9, C.p.z, l * 2 - 2, 0.3, 1.7, w % 2 ? t.neon : t.secondary, 0, F + Math.PI / 2, 0));
    for (let N of [-1, 1]) {
      let G = n.sample(A, N * (l - 1.4), 0);
      e.put("box", "matte", G.p.x, G.p.y + (c - 2.6) / 2, G.p.z, 2.6, c - 2.6, 1.6, 3752540, 0, F, 0);
    }
  }
  e.register("pool", new MeshBasicMaterial({ map: Ns(), vertexColors: !0, transparent: !0, opacity: 0.55, blending: nn, side: ii, depthWrite: !1 }));
  let f = Tt(n, 40);
  for (let w = 0; w < f; w++) {
    let A = w / f,
      C = n.sample(A, 0, 0),
      F = Wf_yaw(C),
      N = C.p.y + c - 1.1;
    (e.put("box", "gloss", C.p.x, N, C.p.z, l * 2, 0.4, 0.55, 9344941, 0, F + Math.PI / 2, 0),
      e.put("box", "gloss", C.p.x, N - 0.95, C.p.z, l * 2, 0.22, 0.32, 8094873, 0, F + Math.PI / 2, 0));
    for (let G of [-1, 1])
      for (let W = 0; W < 3; W++) {
        let B = n.sample(A, G * (6 + W * 11), 0);
        (e.put("box", "glow", B.p.x, B.p.y + c - 1.9, B.p.z, 2.6, 0.16, (n.length / f) * 0.92, 16645886, 0, F, 0),
          W < 2 && w % 2 === 0 && xf(n, B.p.x, B.p.y + 0.06, B.p.z, 20, 22, 16774886, F));
      }
  }
  // stocked shelves
  let g = Tt(n, 40),
    y = [6963152, 3127528, 16743096, 16762967, 4904616, 15330549];
  for (let w = 0; w < g; w++) {
    let A = w / g,
      F = (w % 2 ? 1 : -1) * (19 + (w % 3) * 7),
      N = n.sample(A, F, 0),
      G = Wf_yaw(N),
      W = (n.length / g) * 0.82,
      B = 6.2;
    for (let $ of [-0.5, 0.5]) {
      let Z = n.sample(A + ($ * W * 0.96) / n.length, F, 0);
      e.put("box", "gloss", Z.p.x, Z.p.y + B / 2, Z.p.z, 2.5, B, 0.24, 5858173, 0, G, 0);
    }
    e.put("box", "gloss", N.p.x, N.p.y + B, N.p.z, 2.6, 0.18, W, 5858173, 0, G, 0);
    for (let $ = 0; $ < 4; $++) {
      let Z = N.p.y + 0.9 + $ * 1.55;
      e.put("box", "matte", N.p.x, Z, N.p.z, 2.5, 0.12, W, 13225949, 0, G, 0);
      let ie = Math.max(2, Math.round(W / 6.5));
      for (let ae = 0; ae < ie; ae++) {
        if (i() < 0.12) continue;
        let me = (ae + 0.5) / ie - 0.5,
          ve = n.sample(A + (me * W) / n.length, F, 0);
        e.put("box", "matte", ve.p.x, Z + 0.52, ve.p.z, 1.9, 0.9, (W / ie) * 0.86, y[(ae + w) % y.length], 0, G, 0);
        i() < 0.25 && e.put("box", "glow", ve.p.x, Z + 0.52, ve.p.z, 1.94, 0.3, (W / ie) * 0.5, 16777215, 0, G, 0);
      }
    }
    (e.put("box", "glow", N.p.x, N.p.y + B + 0.5, N.p.z, 2.7, 0.7, W * 0.3, w % 2 ? t.neon : t.secondary, 0, G, 0),
      e.put("box", "matte", N.p.x, N.p.y + 0.28, N.p.z, 2.7, 0.55, W, 4937072, 0, G, 0));
  }
  // display tables with glass domes and phones
  let v = Tt(n, 22);
  for (let w = 0; w < v; w++) {
    let A = (w + 0.5) / v,
      C = w % 2 ? 1 : -1,
      F = n.sample(A, C * 16.4, 0),
      N = Wf_yaw(F);
    (e.put("cyl6", "gloss", F.p.x, F.p.y + 0.55, F.p.z, 2.4, 1.1, 2.4, 15198963, 0, N, 0),
      e.put("box", "gloss", F.p.x, F.p.y + 1.25, F.p.z, 1.5, 0.35, 1.5, 9410734, 0, N, 0),
      e.put("box", "glow", F.p.x, F.p.y + 2.1, F.p.z, 1.25, 1.9, 0.14, w % 2 ? t.secondary : t.neon, 0, N, 0),
      e.put("ballLow", "glass", F.p.x, F.p.y + 1.9, F.p.z, 3, 2.6, 3, 12442111, 0, 0, 0),
      e.put("ring", "glow", F.p.x, F.p.y + 2.1, F.p.z, 5.2, 5.2, 5.2, t.neon, Math.PI / 2, N, 0));
  }
  // escalators up to the mezzanine
  for (let k = 0; k < 4; k++) {
    let A = 0.12 + k * 0.25,
      side = k % 2 ? 1 : -1,
      len = 22,
      rise = 7.6,
      ang = Math.atan2(rise, len);
    for (let j = 0; j < 12; j++) {
      let f = j / 12,
        q = n.sample(A + ((f - 0.5) * len) / n.length, side * 32, 0);
      e.put("box", "gloss", q.p.x, q.p.y + f * rise + 0.3, q.p.z, 3, 0.35, len / 12 + 0.1, 13421772, 0, Wf_yaw(q), 0);
    }
    let mid = n.sample(A, side * 32, 0),
      yaw = Wf_yaw(mid);
    e.put("box", "gloss", mid.p.x, mid.p.y + rise / 2 - 0.3, mid.p.z, 3.2, 0.6, len + 1, 9410734, ang, yaw, 0);
    for (let sd of [-1, 1]) {
      let q = n.sample(A, side * 32 + sd * 1.7, 0);
      e.put("box", "glass", q.p.x, q.p.y + rise / 2 + 0.7, q.p.z, 0.12, 1.2, len, 12442111, ang, yaw, 0);
      e.put("box", "glow", q.p.x, q.p.y + rise / 2 + 1.3, q.p.z, 0.16, 0.12, len, t.neon, ang, yaw, 0);
    }
  }
  // hanging screens + balloons
  let scr = Wf_screenTex("xfinity", "UNLIMITED  SPEED", "#ffffff", "#5b2fd6");
  if (scr) {
    let boards = [];
    for (let k = 0; k < 6; k++) {
      let A = 0.08 + k / 6,
        q = n.sample(A, (k % 2 ? 1 : -1) * 9, c - 5.5),
        yaw = Wf_yaw(q);
      boards.push({ x: q.p.x, y: q.p.y, z: q.p.z, w: 10, h: 5, ry: yaw + Math.PI / 2 }, { x: q.p.x, y: q.p.y, z: q.p.z, w: 10, h: 5, ry: yaw - Math.PI / 2 });
      e.put("box", "gloss", q.p.x, q.p.y + 2.6, q.p.z, 10.2, 0.3, 0.4, 3552822, 0, yaw + Math.PI / 2, 0);
      e.put("box", "gloss", q.p.x, q.p.y + 4.2, q.p.z, 0.1, 3, 0.1, 8421504, 0, 0, 0);
    }
    Br(n, scr, boards);
  }
  {
    let bm = new MeshStandardMaterial({ vertexColors: !0, metalness: 0.3, roughness: 0.25 }),
      groups = [];
    for (let k = 0; k < 8; k++) {
      let A = 0.04 + k / 8,
        side = k % 2 ? 1 : -1,
        q = n.sample(A, side * 24, 0),
        bb = new kr(bm),
        cols = [t.neon, t.secondary, 16729156, 16777215];
      for (let j = 0; j < 5; j++) {
        let ang = (j / 5) * Math.PI * 2,
          x = Math.cos(ang) * 1.3,
          z = Math.sin(ang) * 1.3,
          yy = 6 + (j % 2) * 1.4;
        ur.compose(pi.set(x, yy, z), dr.set(0, 0, 0, 1), new Vector3(1.9, 2.3, 1.9));
        bb.add(wl("ballLow"), ur, cols[j % 4]);
        ur.compose(pi.set(x * 0.5, yy / 2, z * 0.5), dr, new Vector3(0.04, yy, 0.04));
        bb.add(wl("box"), ur, 15658734);
      }
      let m = bb.mesh();
      ((m.matrixAutoUpdate = !0), m.position.copy(q.p), (m.userData.k = k), e.mesh(m), groups.push(m));
    }
    n.anim((tm) => {
      for (let m of groups) {
        let k = m.userData.k;
        m.position.y = n.sample(0.04 + k / 8).p.y + Math.sin(tm * 0.9 + k) * 0.35;
        m.rotation.y = tm * 0.25 + k;
      }
    });
  }
  // the big store sign + banners
  let big = n.signTexture("BLUFOX  MOBILE", "#ffffff", "#5b2fd6", 1024, 200);
  if (big)
    for (let k of [0.25, 0.75]) {
      let q = n.sample(k, -(l - 0.4), 0),
        yaw = Wf_yaw(q);
      Br(n, big, [{ x: q.p.x, y: q.p.y + 12.6, z: q.p.z, w: 36, h: 7, ry: Us(yaw, -1) }]);
      e.put("box", "glow", q.p.x, q.p.y + 16.4, q.p.z, 38, 0.2, 0.3, t.neon, 0, yaw, 0);
    }
  let d = n.signTexture("xfinity", "#ffffff", "#5b2fd6", 640, 200),
    m = n.signTexture("UNLIMITED  SPEED", "#0b1730", "#7ee6ff", 768, 160),
    x = n.signTexture("BLUFOX  MOBILE", "#ffffff", "#1e2a52", 768, 160),
    b = n.signTexture("AISLE  5G", "#22103f", "#ffd166", 512, 160);
  {
    let list = [];
    [
      [d, 10],
      [m, 12],
      [x, 10],
      [b, 9],
    ].forEach(([w, A], C) => {
      for (let N = 0; N < 4; N++) {
        let G = (C * 0.25 + N * 0.25 + 0.04) % 1,
          W = (N + C) % 2 ? 1 : -1;
        list.push({ tex: w, t: G, side: W, lat: 20, h: c - 6.5, w: A, hh: A * 0.28, pole: !1 });
        let Z = n.sample(G, W * 20, c - 4.4);
        e.put("box", "gloss", Z.p.x, Z.p.y, Z.p.z, 0.11, 3.6, 0.11, 8094873, 0, Wf_yaw(Z), 0);
      }
    });
    Wf_signs(n, list);
  }
  if (n.quality !== "low") for (let side of [1, -1]) Wf_glassWall(n, 0, 1, side, 1.3, 12442111);
  Wf_dressBarrier(n, { tyres: !1, armcoCol: 14540253, postCol: 9474192 });
  Wf_venue(n, { col: 14673136, alt: 15767010, roof: 15658734, glow: t.secondary, stripe: 5858173, bannerTex: Wf_bannerTex(n, "xfinity  \xB7  10G  NETWORK", "#ffffff", "#5b2fd6") });
}

// ===========================================================================
// 2 — LAKEFRONT RUSH: causeway around a sandy island, pier, wheel, boats.
// ===========================================================================
function Wf_lakefront(n) {
  let { shop: e, track: t, rand: i } = n,
    waterY = n.baseY - 15.5,
    sandY = n.baseY - 12.6;
  // animated water
  {
    let w = Wf_waterMaterial(1948587, { repeat: 140 });
    e.register("water", w.mat);
    let g = new PlaneGeometry(2800, 2800, 36, 36).rotateX(-Math.PI / 2),
      m = new Mesh(g, w.mat);
    ((m.position.y = waterY), (m.name = "water"), e.mesh(m));
    w.normal && n.anim((tm) => w.normal.offset.set(tm * 0.02, tm * 0.011));
  }
  e.register("pool", new MeshBasicMaterial({ map: Ns(), vertexColors: !0, transparent: !0, opacity: 0.6, blending: nn, side: ii, depthWrite: !1 }));
  Wf_groundMat(n, "sand", { seed: 21, lo: 190, hi: 250, rough: 0.9, repeat: 1 });
  Wf_groundMat(n, "grass", { seed: 22, lo: 120, hi: 210, rough: 0.95, repeat: 1 });
  // the island: sand with a grassy park in the middle, surf foam ring
  (Wf_groundPlane(n, "sand", sandY, 330, 15525290),
    Wf_groundPlane(n, "sand", sandY - 1, 400, 14273696),
    Wf_groundPlane(n, "grass", sandY + 0.4, 200, 5875000));
  {
    let hb = e.batch("haze");
    for (let k = 0; k < 40; k++) {
      let ang = (k / 40) * Math.PI * 2,
        rr = 205 + Math.sin(k * 1.7) * 6;
      (pr.set(0, -ang, 0), dr.setFromEuler(pr));
      ur.compose(pi.set(Math.cos(ang) * rr, sandY - 0.9, Math.sin(ang) * rr), dr, new Vector3(34, 0.04, 8));
      hb.add(wl("box"), ur, 16777215);
    }
  }
  Aa(n, 15.4, 40, -10.5, 14995356, "sand");
  // shoreline rocks under the causeway
  let rocks = Tt(n, 90);
  for (let l = 0; l < rocks; l++) {
    let h = l / rocks,
      side = l % 2 ? 1 : -1,
      f = n.sample(h, side * (40 + i() * 6), 0);
    e.put("rock", "stone", f.p.x, f.p.y - 10.4 - i(), f.p.z, 3 + i() * 4, 2 + i() * 2, 3 + i() * 4, [9868950, 8355711, 11184810][l % 3], i(), i() * 6, 0);
  }
  // trees on the embankment and the island
  let r = Tt(n, 44);
  for (let l = 0; l < r; l++) {
    let h = l / r,
      u = (l % 2 ? 1 : -1) * (19 + i() * 14),
      f = Ea(n, h, u, -10.5);
    l % 3 ? Wf_beachTree(n, f.p.x, f.p.y - 0.4, f.p.z, 0.8 + i() * 0.5) : Wf_tree(n, f.p.x, f.p.y - 0.4, f.p.z, 0.8 + i() * 0.4);
  }
  let park = Tt(n, 30);
  for (let l = 0; l < park; l++) {
    let ang = i() * 6.283,
      rr = 20 + i() * 110,
      x = Math.cos(ang) * rr,
      z = Math.sin(ang) * rr;
    Wf_tree(n, x, sandY + 0.4, z, 0.9 + i() * 0.6, l % 2 ? [3119708, 3977834, 5344570] : [4557880, 6600505, 3382339], i() * 6);
  }
  // beach umbrellas, loungers, dunes
  let a = Tt(n, 34);
  for (let l = 0; l < a; l++) {
    let ang = i() * 6.283,
      rr = 135 + i() * 25,
      x = Math.cos(ang) * rr,
      z = Math.sin(ang) * rr,
      col = [16743019, 7327974, 16765286, 16729156, 5635925][l % 5];
    (e.put("box", "matte", x, sandY + 1.3, z, 0.14, 2.6, 0.14, 12428154, 0, 0, 0),
      e.put("cone", "matte", x, sandY + 3, z, 4.4, 1.5, 4.4, col, 0, 0, 0),
      e.put("box", "matte", x + 1.6, sandY + 0.35, z + 0.4, 1.9, 0.25, 0.8, l % 2 ? 16777215 : col, 0, ang, 0.35));
  }
  for (let l = 0; l < Tt(n, 26); l++) {
    let ang = i() * 6.283,
      rr = 150 + i() * 20;
    e.put("ballLow", "sand", Math.cos(ang) * rr, sandY - 0.3, Math.sin(ang) * rr, 8 + i() * 10, 1.6 + i(), 8 + i() * 10, 15525290, 0, ang, 0);
  }
  // the pier + ferris wheel (outside the causeway at t≈0.5)
  {
    let tp = 0.5,
      side = 1,
      base = n.sample(tp, side * 18, 0),
      yaw = Wf_yaw(base),
      right = base.right.clone().multiplyScalar(side),
      deckY = base.p.y - 2.2,
      len = 70;
    for (let k = 0; k <= 10; k++) {
      let d = 20 + (k / 10) * len,
        px = base.p.x + right.x * d,
        pz = base.p.z + right.z * d;
      e.put("box", "matte", px, deckY + 0.2, pz, len / 10 + 0.3, 0.4, 7, 11111010, 0, yaw + Math.PI / 2, 0);
      for (let sd of [-1, 1]) {
        e.put("box", "matte", px + base.dir.x * sd * 3.2, (deckY + waterY) / 2, pz + base.dir.z * sd * 3.2, 0.5, deckY - waterY + 1, 0.5, 7165756, 0, yaw, 0);
        e.put("box", "matte", px + base.dir.x * sd * 3.3, deckY + 0.9, pz + base.dir.z * sd * 3.3, len / 10 + 0.3, 0.1, 0.1, 15921906, 0, yaw + Math.PI / 2, 0);
        k % 2 === 0 && (e.put("box", "matte", px + base.dir.x * sd * 3.3, deckY + 1.9, pz + base.dir.z * sd * 3.3, 0.16, 3.4, 0.16, 7165756, 0, yaw, 0), e.put("ballLow", "glow", px + base.dir.x * sd * 3.3, deckY + 3.7, pz + base.dir.z * sd * 3.3, 0.6, 0.6, 0.6, 16773316, 0, 0, 0));
      }
    }
    // kiosk
    let kx = base.p.x + right.x * 42,
      kz = base.p.z + right.z * 42;
    e.put("box", "matte", kx, deckY + 1.8, kz, 4, 3, 3, 16777215, 0, yaw, 0);
    Wf_gable(n, "matte", kx, deckY + 3.3, kz, 4.6, 3.6, 2, 16729156, yaw);
    e.put("box", "glow", kx, deckY + 2.2, kz, 4.05, 0.9, 3.05, 16774096, 0, yaw, 0);
    // ferris wheel
    let wx = base.p.x + right.x * (20 + len + 6),
      wz = base.p.z + right.z * (20 + len + 6),
      R = 17,
      hubY = deckY + R + 3,
      wm = new MeshStandardMaterial({ vertexColors: !0, metalness: 0.55, roughness: 0.35 }),
      wheel = new kr(wm),
      spokes = 14;
    // supports (static)
    for (let sd of [-1, 1])
      for (let k of [-1, 1]) {
        e.put("box", "gloss", wx + base.dir.x * sd * 2.2 + right.x * k * 6, (hubY + deckY) / 2, wz + base.dir.z * sd * 2.2 + right.z * k * 6, 0.6, hubY - deckY + 1, 0.6, 15921906, k * 0.33 * (side > 0 ? 1 : -1), yaw, 0);
      }
    e.put("box", "gloss", wx, hubY, wz, 5.2, 0.9, 0.9, 15921906, 0, yaw, 0);
    // rotating part: rim, spokes, gondolas (spherical so no counter-rotation needed)
    (pr.set(0, yaw, 0), dr.setFromEuler(pr));
    for (let k = 0; k < spokes; k++) {
      let ang = (k / spokes) * Math.PI * 2;
      for (let sd of [-1, 1]) {
        let q = new Quaternion().setFromEuler(new Euler(0, yaw, ang));
        ur.compose(pi.set(base.dir.x * sd * 1.2, 0, base.dir.z * sd * 1.2), q, new Vector3(0.22, R * 2, 0.22));
        wheel.add(wl("box"), ur, 15921906);
      }
      let gx = Math.sin(ang) * R,
        gy = Math.cos(ang) * R,
        gq = new Quaternion().setFromEuler(new Euler(0, yaw, 0)),
        pos = new Vector3(gx, gy, 0).applyQuaternion(gq);
      ur.compose(pos, gq, new Vector3(2.4, 2.4, 2.4));
      wheel.add(wl("ballLow"), ur, [16729156, 16774096, 5635925, 16752762, t.neon, t.secondary][k % 6]);
      pos.set(gx, gy, 0).applyQuaternion(gq);
      ur.compose(pos, gq, new Vector3(0.9, 0.9, 0.9));
      wheel.add(wl("ballTiny"), ur, 16777215);
    }
    for (let k = 0; k < 36; k++) {
      let ang = (k / 36) * Math.PI * 2,
        pos = new Vector3(Math.sin(ang) * R, Math.cos(ang) * R, 0).applyQuaternion(new Quaternion().setFromEuler(new Euler(0, yaw, 0))),
        q = new Quaternion().setFromEuler(new Euler(0, yaw, ang));
      for (let sd of [-1, 1]) {
        let p2 = pos.clone().add(new Vector3(base.dir.x * sd * 1.2, 0, base.dir.z * sd * 1.2));
        ur.compose(p2, q, new Vector3((R * 2 * Math.PI) / 36 + 0.2, 0.26, 0.26));
        wheel.add(wl("box"), ur, t.neon);
      }
    }
    let wmesh = wheel.mesh();
    ((wmesh.matrixAutoUpdate = !0), wmesh.position.set(wx, hubY, wz), (wmesh.castShadow = !0), e.mesh(wmesh));
    let axis = new Vector3(base.dir.x, 0, base.dir.z).normalize(),
      wq = new Quaternion();
    n.anim((tm) => {
      wq.setFromAxisAngle(axis, tm * 0.25);
      wmesh.quaternion.copy(wq);
    });
    e.put("ballLow", "glow", wx, hubY, wz, 1.6, 1.6, 1.6, 16774096, 0, 0, 0);
  }
  // sailboats (two bobbing groups of three)
  {
    let bm = new MeshStandardMaterial({ vertexColors: !0, metalness: 0.1, roughness: 0.7 }),
      groups = [];
    for (let gI = 0; gI < 2; gI++) {
      let bb = new kr(bm),
        cx = gI ? -560 : 420,
        cz = gI ? -120 : 460;
      for (let k = 0; k < 3; k++) {
        let ox = (k - 1) * 46,
          oz = k * 30 - 30,
          rot = k * 0.7;
        (pr.set(0, rot, 0), dr.setFromEuler(pr));
        ur.compose(pi.set(ox, 0.6, oz), dr, new Vector3(4.5, 1.6, 11));
        bb.add(wl("ballLow"), ur, 16777215);
        ur.compose(pi.set(ox, 8, oz), dr, new Vector3(0.3, 15, 0.3));
        bb.add(wl("box"), ur, 8421504);
        (pr.set(0, rot, 0), dr.setFromEuler(pr));
        ur.compose(pi.set(ox, 8.5, oz + 1.5), dr, new Vector3(0.1, 12, 6));
        bb.add(wl("wedge"), ur, [16777215, 16729156, 5635925][k]);
      }
      let m = bb.mesh();
      ((m.matrixAutoUpdate = !0), m.position.set(cx, waterY + 0.2, cz), e.mesh(m), groups.push(m));
    }
    n.anim((tm) => {
      groups.forEach((m, k) => {
        m.position.y = waterY + 0.2 + Math.sin(tm * 1.1 + k) * 0.35;
        m.rotation.z = Math.sin(tm * 0.8 + k * 2) * 0.06;
        m.rotation.x = Math.sin(tm * 0.6 + k) * 0.04;
      });
    });
  }
  // lighthouse on a rock with a sweeping beam
  {
    let s = n.sample(0.17, -75, 0),
      x = s.p.x,
      z = s.p.z,
      y = waterY;
    e.put("rock", "stone", x, y + 2, z, 22, 7, 20, 8355711, 0, 0.4, 0);
    e.put("cyl", "matte", x, y + 12, z, 5, 16, 5, 16777215, 0, 0, 0);
    for (let k = 0; k < 3; k++) e.put("cyl", "matte", x, y + 7 + k * 4.6, z, 5.05, 1.6, 5.05, 16729156, 0, 0, 0);
    e.put("cyl", "gloss", x, y + 21, z, 3.6, 2.4, 3.6, 3552822, 0, 0, 0);
    e.put("cyl", "glow", x, y + 21, z, 3, 2, 3, 16774096, 0, 0, 0);
    e.put("cone", "matte", x, y + 23.4, z, 5, 2.4, 5, 16729156, 0, 0, 0);
    let beam = new Mesh(new ConeGeometry(9, 70, 10, 1, !0), new MeshBasicMaterial({ color: 16774096, transparent: !0, opacity: 0.16, blending: nn, depthWrite: !1, side: ii }));
    beam.geometry.rotateZ(Math.PI / 2).translate(35, 0, 0);
    beam.position.set(x, y + 21, z);
    e.mesh(beam);
    n.anim((tm) => (beam.rotation.y = tm * 0.9));
  }
  // buoys + distant skyline
  for (let k = 0; k < Tt(n, 24); k++) {
    let tt = k / 24,
      s = n.sample(tt, (k % 2 ? 1 : -1) * (60 + i() * 60), 0);
    e.put("cone", "matte", s.p.x, waterY + 1, s.p.z, 1.6, 2.6, 1.6, k % 2 ? 16729156 : 16777215, 0, 0, 0);
    e.put("ballTiny", "glow", s.p.x, waterY + 2.6, s.p.z, 0.5, 0.5, 0.5, 16729156, 0, 0, 0);
  }
  // marina / boathouse silhouettes on the water: dark, low, a few lit windows
  let o = Tt(n, 22);
  for (let l = 0; l < o; l++) {
    let h = (l + 0.5) / o,
      side = l % 3 ? -1 : 1,
      p = n.sample(h, side * (150 + i() * 160), 0),
      w = 14 + i() * 16,
      dp = 10 + i() * 12,
      u = 5 + i() * 7,
      rot = i() * 6,
      col = [2371645, 3159625, 2896682][l % 3];
    e.put("box", "matte", p.p.x, waterY + u / 2, p.p.z, w, u, dp, col, 0, rot, 0);
    Wf_gable(n, "matte", p.p.x, waterY + u, p.p.z, dp * 1.1, w * 1.05, u * 0.45, 2039583, rot + Math.PI / 2);
    for (let k = 0; k < 3; k++)
      i() < 0.7 && e.put("box", "glow", p.p.x + Math.cos(rot) * (k - 1) * w * 0.3, waterY + u * 0.55, p.p.z - Math.sin(rot) * (k - 1) * w * 0.3, 1.2, 1.2, dp * 1.02, 16768418, 0, rot, 0);
    // jetty + moored boat
    e.put("box", "matte", p.p.x + Math.sin(rot) * (dp * 0.5 + 6), waterY + 0.3, p.p.z + Math.cos(rot) * (dp * 0.5 + 6), 2.2, 0.3, 12, 7165756, 0, rot, 0);
    e.put("ballTiny", "matte", p.p.x + Math.sin(rot) * (dp * 0.5 + 9) + 2.4, waterY + 0.3, p.p.z + Math.cos(rot) * (dp * 0.5 + 9), 2.4, 1, 6, [16777215, 16729156][l % 2], 0, rot, 0);
  }
  // lamps + signs
  let lamps = Tt(n, 24);
  for (let d = 0; d < lamps; d++) Wf_lamp(n, (d + 0.5) / lamps, d % 2 ? 1 : -1, 16773316, 6.6, 2.6, 15921906);
  let c = n.signTexture("LAKEFRONT  RUSH", "#0d2b33", "#7ff0e0", 768, 160),
    c2 = n.signTexture("BLUFOX  BEACH  CLUB", "#ffffff", "#ff7a59", 768, 160);
  Wf_signs(
    n,
    [
      [c, 0.15],
      [c2, 0.42],
      [c, 0.66],
      [c2, 0.88],
    ].map(([tex, tt], k) => ({ tex, t: tt, side: k % 2 ? 1 : -1, lat: 22, h: 6, w: 13, hh: 2.7, poleCol: 15262420 })),
  );
  Wf_dressBarrier(n, { tyreCols: [1710618, 1710618, 14364723, 15921906], armcoCol: 13421772 });
  Wf_venue(n, { col: 15195856, alt: 16428620, roof: 15921906, glow: t.secondary, stripe: 5635925, bannerTex: Wf_bannerTex(n, "BLUFOX  MOBILE  \xB7  SUMMER  SPEED", "#0d2b33", "#7ff0e0") });
}

// ===========================================================================
// 3 — FROSTBYTE SUMMIT: alpine night, pines, ice, lodge, ski lift.
// ===========================================================================
function Wf_frostbyte(n) {
  let { shop: e, track: t, rand: i } = n,
    ground = n.baseY - 13.5;
  Wf_groundMat(n, "snow", { seed: 31, lo: 215, hi: 255, rough: 0.7, repeat: 1 });
  (Wf_groundPlane(n, "snow", ground, 3000, 14346742), Aa(n, 15.4, 40, -11, 15398139, "snow"));
  let r = gf([12574962, 14216440, 11129578, 15267325], 10);
  (e.register("ice", new MeshStandardMaterial({ map: r, vertexColors: !0, metalness: 0.18, roughness: 0.3, transparent: !0, opacity: 0.92 })),
    e.register("crystal", new MeshStandardMaterial({ vertexColors: !0, metalness: 0.2, roughness: 0.15, emissive: 5763839, emissiveIntensity: 0.9, transparent: !0, opacity: 0.85 })),
    e.register("pool", new MeshBasicMaterial({ map: Ns(), vertexColors: !0, transparent: !0, opacity: 0.5, blending: nn, side: ii, depthWrite: !1 })));
  // snow banks along the barriers
  let s = Tt(n, 150);
  for (let u = 0; u < s; u++) {
    let f = u / s,
      g = u % 2 ? 1 : -1,
      y = g * (n.barrierFaceAt(f, g) + 2.4 + i() * 1.6),
      v = n.sample(f, y, 0);
    e.put("ballTiny", "snow", v.p.x, v.p.y - 0.9 + i() * 0.4, v.p.z, 4 + i() * 3.5, 1.7 + i() * 1.3, 4 + i() * 4, 16186367, 0, i(), 0);
  }
  // ice outcrops on the outside of corners: irregular chunks with snow caps
  let a = Tt(n, 80);
  for (let u = 0; u < a; u++) {
    let f = u / a,
      g = n.curvature(f);
    if (Math.abs(g) < 0.0022) continue;
    let y = g > 0 ? -1 : 1,
      v = n.sample(f, y * (n.barrierFaceAt(f, y) + 4.2 + i() * 2), 0),
      d = Wf_yaw(v),
      m = 2.2 + i() * 2.6;
    for (let k = 0; k < 3; k++) {
      let ox = (i() - 0.5) * 3,
        oz = (i() - 0.5) * (n.length / a) * 0.9,
        sz = m * (0.7 + i() * 0.6);
      e.put("rock", "ice", v.p.x + ox + v.dir.x * oz, v.p.y - 1 + sz * 0.35, v.p.z + v.dir.z * oz, sz * 1.3, sz, sz * 1.1, k ? 14676477 : 13494006, i() * 2, d + i(), i() * 0.5);
      e.put("ballTiny", "snow", v.p.x + ox + v.dir.x * oz, v.p.y - 1 + sz * 0.72, v.p.z + v.dir.z * oz, sz * 1.1, sz * 0.4, sz * 0.9, 16186367, 0, d, 0);
    }
    if (u % 3 === 0) {
      let x = n.sample(f, y * (n.barrierFaceAt(f, y) + 22 + i() * 14), 0),
        b = 7 + i() * 9;
      for (let k = 0; k < 3; k++) {
        let ox = (i() - 0.5) * 8,
          oz = (i() - 0.5) * 14,
          sz = b * (0.7 + i() * 0.6);
        e.put("rock1", "ice", x.p.x + ox, x.p.y - 4 + sz * 0.3, x.p.z + oz, sz * 1.4, sz, sz * 1.2, 13494006, i() * 2, i() * 6, i() * 0.4);
        e.put("ballTiny", "snow", x.p.x + ox, x.p.y - 4 + sz * 0.7, x.p.z + oz, sz * 1.2, sz * 0.45, sz, 16186367, 0, i() * 6, 0);
      }
    }
  }
  // pines: near (on the embankment), mid and far (on the ground)
  let o = Tt(n, 180);
  for (let u = 0; u < o; u++) {
    let f = u / o,
      g = u % 2 ? 1 : -1,
      y = i(),
      v = g * (y < 0.45 ? 19 + i() * 20 : y < 0.8 ? 50 + i() * 80 : 140 + i() * 200),
      d = y < 0.45 ? Ea(n, f, v, -11) : n.sample(f, v, 0),
      m = y < 0.45 ? 0.9 + i() * 0.4 : y < 0.8 ? 1.4 + i() * 0.6 : 2.4 + i() * 1.2,
      b = y < 0.45 ? d.p.y - 0.4 : ground;
    Wf_pine(n, d.p.x, b, d.p.z, m, !0, i() * 6);
  }
  // ice crystal clusters (emissive) + halo
  let cr = Tt(n, 34);
  for (let u = 0; u < cr; u++) {
    let f = (u + 0.3) / cr,
      g = u % 2 ? 1 : -1,
      v = Ea(n, f, g * (17 + i() * 12), -11),
      col = u % 3 ? 5763839 : 9061631;
    for (let k = 0; k < 5; k++) {
      let ang = i() * 6.28,
        rr = i() * 1.6,
        h = 2 + i() * 4;
      e.put("cone4", "crystal", v.p.x + Math.cos(ang) * rr, v.p.y - 0.4 + h / 2, v.p.z + Math.sin(ang) * rr, 0.8 + i() * 0.8, h, 0.8 + i() * 0.8, col, (i() - 0.5) * 0.5, ang, (i() - 0.5) * 0.5);
    }
    e.put("ballLow", "haze", v.p.x, v.p.y + 1.6, v.p.z, 7, 5, 7, col, 0, 0, 0);
    xf(n, v.p.x, v.p.y - 0.3, v.p.z, 9, 9, col, 0, 0.12);
  }
  // snow-covered foothills (low, wide, fog-tinted) below the painted peaks
  for (let u = 0; u < Tt(n, 22); u++) {
    let f = u / 22,
      g = n.sample(f, (u % 2 ? 1 : -1) * (300 + i() * 500), 0),
      y = 30 + i() * 60,
      w = 220 + i() * 260;
    e.put("ballTiny", "snow", g.p.x, ground - y * 0.15, g.p.z, w, y * 2, w * (0.6 + i() * 0.5), 14735359, 0, i() * 6, 0);
    i() < 0.5 && e.put("cone6", "snow", g.p.x + (i() - 0.5) * w * 0.4, ground + y * 0.9, g.p.z + (i() - 0.5) * w * 0.3, w * 0.35, y * 0.9, w * 0.35, 15200255, 0, i(), 0);
  }
  // the lodge
  {
    let tl = 0.3,
      s0 = n.sample(tl, -34, 0),
      yaw = Wf_yaw(s0),
      x = s0.p.x,
      z = s0.p.z,
      y = Ea(n, tl, -34, -11).p.y - 0.4;
    e.put("box", "matte", x, y + 4, z, 12, 8, 18, 7226658, 0, yaw, 0);
    e.put("box", "matte", x, y + 4, z, 12.2, 0.6, 18.2, 4864560, 0, yaw, 0);
    for (let k = -3; k <= 3; k++)
      for (let f = 0; f < 2; f++)
        for (let sd of [-1, 1]) {
          let q = n.sample(tl + (k * 2.4) / n.length, -34 + sd * 6.05, 0);
          e.put("box", "glow", q.p.x, y + 2.2 + f * 3.4, q.p.z, 0.12, 1.5, 1.3, 16768418, 0, yaw, 0);
        }
    Wf_gable(n, "matte", x, y + 8, z, 13.6, 19.5, 5.4, 5915440, yaw);
    Wf_gable(n, "snow", x, y + 8.5, z, 13, 19, 5, 16777215, yaw);
    e.put("box", "matte", x + 4, y + 11, z + 2, 1.4, 5, 1.4, 5263440, 0, 0, 0);
    let dk = n.sample(tl, -34 + 8, 0);
    e.put("box", "matte", dk.p.x, y + 0.5, dk.p.z, 4, 0.4, 14, 5915440, 0, yaw, 0);
    xf(n, dk.p.x, y + 0.75, dk.p.z, 16, 14, 16768418, yaw, 0.1);
    e.put("box", "glow", x, y + 13.8, z, 8, 1.4, 0.4, 16768418, 0, yaw, 0);
    Br(n, n.signTexture("SUMMIT  LODGE", "#3a2412", "#ffd98a", 512, 128), [{ x: dk.p.x, y: y + 6.6, z: dk.p.z, w: 8, h: 2, ry: Us(yaw, -1) }]);
  }
  // ski lift: towers along the outside of the lap with cable cars moving both ways
  {
    let pts = [],
      towers = 9,
      t0 = 0.36,
      t1 = 0.78;
    for (let k = 0; k <= towers; k++) {
      let tt = t0 + ((t1 - t0) * k) / towers,
        lat = 30 + Math.sin(k * 1.3) * 8,
        s0 = Ea(n, tt, lat, -11),
        top = s0.p.y - 0.4 + 12 + Math.sin(k * 0.9) * 2;
      pts.push(new Vector3(s0.p.x, top, s0.p.z));
      e.put("box", "gloss", s0.p.x, s0.p.y - 0.4 + 6, s0.p.z, 0.7, 12.4 + Math.sin(k * 0.9) * 2, 0.7, 5263440, 0, 0, 0);
      e.put("box", "gloss", s0.p.x, top, s0.p.z, 4.6, 0.4, 0.5, 5263440, 0, Wf_yaw(s0), 0);
      e.put("ballTiny", "glow", s0.p.x, top + 0.5, s0.p.z, 0.5, 0.5, 0.5, 16729156, 0, 0, 0);
    }
    // cables
    for (let k = 0; k < towers; k++) {
      let A = pts[k],
        B = pts[k + 1],
        mid = A.clone().lerp(B, 0.5),
        d = B.clone().sub(A),
        len = d.length(),
        yaw = Math.atan2(d.x, d.z),
        pitch = -Math.asin(d.y / len);
      for (let sd of [-1, 1]) {
        let off = new Vector3(-d.z, 0, d.x).normalize().multiplyScalar(sd * 2);
        e.put("box", "gloss", mid.x + off.x, mid.y - 0.3, mid.z + off.z, 0.08, 0.08, len, 3355443, pitch, yaw, 0);
      }
    }
    let cabMat = new MeshStandardMaterial({ vertexColors: !0, metalness: 0.4, roughness: 0.4 }),
      cabGeo = (() => {
        let b = new kr(cabMat);
        Wf_cabin(b, 0, -1.6, 0, 16729156, 1.1);
        return b.mesh().geometry;
      })(),
      cabs = [];
    for (let k = 0; k < 4; k++) {
      let m = new Mesh(cabGeo, cabMat);
      ((m.castShadow = !0), (m.userData.u = k / 4), (m.userData.dir = k % 2 ? 1 : -1), e.mesh(m), cabs.push(m));
    }
    let total = 0;
    for (let k = 0; k < towers; k++) total += pts[k].distanceTo(pts[k + 1]);
    let at = (u, out) => {
      let d = Ut(u, 1) * total;
      for (let k = 0; k < towers; k++) {
        let L = pts[k].distanceTo(pts[k + 1]);
        if (d <= L) return out.copy(pts[k]).lerp(pts[k + 1], d / L);
        d -= L;
      }
      return out.copy(pts[towers]);
    };
    n.anim((tm) => {
      for (let m of cabs) {
        let u = (m.userData.u + tm * 0.018 * m.userData.dir) % 1;
        u < 0 && (u += 1);
        // bounce back at the ends instead of wrapping
        let v = u < 0.5 ? u * 2 : 2 - u * 2;
        at(v * 0.999, m.position);
        m.position.y -= 0.3;
      }
    });
  }
  // frozen pond
  {
    let s0 = n.sample(0.62, -95, 0),
      pm = new MeshStandardMaterial({ color: 10083583, metalness: 0.6, roughness: 0.08, envMapIntensity: 1.5, transparent: !0, opacity: 0.9 }),
      pond = new Mesh(new CircleGeometry(48, 20).rotateX(-Math.PI / 2), pm);
    pond.position.set(s0.p.x, ground + 0.25, s0.p.z);
    e.mesh(pond);
  }
  // edge poles + signs + lamps
  let c = Tt(n, 80);
  for (let u = 0; u < c; u++) {
    let f = u / c,
      g = u % 2 ? 1 : -1,
      y = n.sample(f, g * (n.barrierFaceAt(f, g) + 1.1), 0),
      v = Wf_yaw(y);
    (e.put("box", "matte", y.p.x, y.p.y + 1.5, y.p.z, 0.12, 3, 0.12, 15923196, 0, v, 0), e.put("box", "glow", y.p.x, y.p.y + 2.85, y.p.z, 0.16, 0.5, 0.16, 16747069, 0, v, 0));
  }
  let l = n.signTexture("RUN-OFF", "#2a3d55", "#eaf4fb", 384, 128);
  l && yf(n, l, [0.33, 0.455], 1);
  let h = n.signTexture("FROSTBYTE  SUMMIT", "#123047", "#cbeaff", 768, 160),
    h2 = n.signTexture("xfinity  \xB7  ALPINE  10G", "#ffffff", "#5b2fd6", 768, 160);
  Wf_signs(
    n,
    [
      [h, 0.1],
      [h2, 0.44],
      [h, 0.78],
      [h2, 0.62],
    ].map(([tex, tt], k) => ({ tex, t: tt, side: k % 2 ? 1 : -1, lat: 21, h: 5.6, w: 12, hh: 2.5, poleCol: 5263440 })),
  );
  let p = Tt(n, 18);
  for (let u = 0; u < p; u++) Wf_lamp(n, u / p, u % 2 ? 1 : -1, 14151935, 6.6, 2.6, 5263440);
  Wf_dressBarrier(n, { tyreCols: [1710618, 1710618, 5763839, 15921906], armcoCol: 12632256 });
  if (n.quality !== "low") Wf_fence(n, 0.335, 0.452, 1, 3, 11184810);
  Wf_venue(n, { col: 3752540, alt: 4805485, roof: 15658734, glow: t.neon, stripe: 15921906, bannerTex: Wf_bannerTex(n, "BLUFOX  MOBILE  \xB7  STAY  CONNECTED", "#cbeaff", "#123047") });
}

// ===========================================================================
// 4 — SIGNAL CANYON: red-rock strata, hoodoos, radio masts, a wooden bridge.
// ===========================================================================
function Wf_canyon(n) {
  let { shop: e, track: t, rand: i } = n,
    ground = n.baseY - 13.5;
  Wf_groundMat(n, "sand", { seed: 41, lo: 150, hi: 235, rough: 0.95, repeat: 1 });
  (Wf_groundPlane(n, "sand", ground, 3000, 7027248), Aa(n, 15.4, 40, -11, 9063224, "sand"));
  let r = gf([10181186, 12087374, 8341046, 13208158, 9261376], 14);
  (e.register("rockband", new MeshStandardMaterial({ map: r, vertexColors: !0, metalness: 0.02, roughness: 0.95, flatShading: !0 })),
    e.register("pool", new MeshBasicMaterial({ map: Ns(), vertexColors: !0, transparent: !0, opacity: 0.55, blending: nn, side: ii, depthWrite: !1 })));
  // layered strata walls: near = low stacked slabs, far = clusters of fins
  let s = Tt(n, 58);
  for (let f = 0; f < s; f++) {
    let g = f / s,
      y = f % 2 ? 1 : -1,
      v = i() < 0.5,
      b = i();
    if (v) {
      let d = 9 + i() * 14,
        m = 24 + i() * 30,
        x = n.sample(g, y * (m * 0.5 + 42 + i() * 30), 0),
        yy = ground;
      for (let k = 0; k < 3; k++) {
        let lh = (d / 3) * (0.7 + i() * 0.6),
          lw = m * (1 - k * 0.09 + (i() - 0.5) * 0.12),
          ld = m * (0.7 + i() * 0.5) * (1 - k * 0.05);
        e.putUV("box", "rockband", x.p.x + (i() - 0.5) * m * 0.08, yy + lh / 2, x.p.z + (i() - 0.5) * m * 0.08, lw, lh, ld, [13208931, 11826509, 12747354, 10511684][k % 4], b + (i() - 0.5) * 0.06, [1, lh / 9]);
        yy += lh;
      }
      e.putUV("box", "rockband", x.p.x, yy + 1, x.p.z, m * 0.6, 2, m * 0.5, 9261376, b, [1, 1]);
      i() < 0.5 && e.put("ballLow", "matte", x.p.x + (i() - 0.5) * m * 0.4, yy + 2.6, x.p.z + (i() - 0.5) * m * 0.4, 5, 3, 5, 5734441, 0, 0, 0);
    } else {
      // a cluster of 3-5 fins of different heights with gaps between them
      let fins = 3 + ((i() * 3) | 0),
        lat0 = 150 + i() * 220,
        along = (i() - 0.5) * 60;
      for (let k = 0; k < fins; k++) {
        let w = 22 + i() * 34,
          h = 40 + i() * 100,
          dp = 20 + i() * 30,
          x = n.sample(g + (along + (k - fins / 2) * 34) / n.length, y * (lat0 + (i() - 0.5) * 40), 0);
        e.putUV("box", "rockband", x.p.x, ground + h / 2, x.p.z, w, h, dp, [13208931, 11826509, 12747354][k % 3], b + (i() - 0.5) * 0.3, [1, h / 9]);
        e.putUV("box", "rockband", x.p.x, ground + h + 1.5, x.p.z, w * 0.8, 3, dp * 0.8, 9261376, b, [1, 1]);
        // a ledge half way up
        i() < 0.6 && e.putUV("box", "rockband", x.p.x, ground + h * (0.35 + i() * 0.3), x.p.z, w * 1.15, 3, dp * 1.15, 11826509, b, [1, 1]);
      }
    }
  }
  // hoodoos
  let a = Tt(n, 70);
  for (let f = 0; f < a; f++) {
    let g = f / a,
      y = f % 2 ? 1 : -1,
      v = Ea(n, g, y * (19 + i() * 15), -11),
      d = 4 + i() * 9,
      x = v.p.y - 0.3;
    for (let b = 0; b < 5; b++) {
      let w = (1.5 + Math.sin(b * 1.9 + f) * 0.75) * (1 - b * 0.06);
      (e.put("cyl6", "rockband", v.p.x, x + d / 10, v.p.z, w * 2, d / 5, w * 1.7, [12089938, 10511684, 13341543][b % 3], 0, f * 0.7, 0), (x += d / 5));
    }
    e.put("rock", "rockband", v.p.x, x + 0.5, v.p.z, 3.2, 1.6, 2.8, 10248516, i(), f, 0);
  }
  // rock arches over the track
  for (let f of [0.13, 0.62]) {
    let g = n.sample(f),
      y = Wf_yaw(g),
      v = 34,
      d = 17;
    for (let m of [-1, 1]) {
      let x = n.sample(f, m * 15, 0);
      e.putUV("box", "rockband", x.p.x, x.p.y + d * 0.32, x.p.z, 9, d * 0.8, 13, 11694669, y, [1, 3]);
    }
    for (let m = 0; m < 9; m++) {
      let x = (Math.PI * (m + 0.5)) / 9,
        b = (-Math.cos(x) * v) / 2,
        w = Math.sin(x) * 5.5 + d * 0.68,
        A = n.sample(f, b, w);
      e.putUV("box", "rockband", A.p.x, A.p.y, A.p.z, (v / 9) * 1.25, 5.5, 13, 12747354, y, [1, 1], 0, -Math.cos(x) * 0.55);
    }
  }
  // wooden bridge across the track
  {
    let tb = 0.42,
      s0 = n.sample(tb, 0, 0),
      yaw = Wf_yaw(s0),
      y = s0.p.y + 8.2;
    for (let k = -11; k <= 11; k++) {
      let q = n.sample(tb, k * 1.6, 0);
      e.put("box", "matte", q.p.x, y + Math.sin((k / 11) * Math.PI) * -0.4, q.p.z, 1.5, 0.22, 4.2, [9127187, 8079917, 10111022][(k + 11) % 3], 0, yaw, 0);
    }
    for (let sd of [-1, 1]) {
      let q = n.sample(tb, 0, 0);
      e.put("box", "matte", q.p.x + s0.dir.x * sd * 2, y + 1.1, q.p.z + s0.dir.z * sd * 2, 36, 0.12, 0.12, 6180140, 0, yaw + Math.PI / 2, 0);
      for (let k = -4; k <= 4; k++) {
        let p2 = n.sample(tb, k * 4.4, 0);
        e.put("box", "matte", p2.p.x + s0.dir.x * sd * 2, y + 0.6, p2.p.z + s0.dir.z * sd * 2, 0.18, 1.3, 0.18, 6180140, 0, yaw, 0);
      }
    }
    for (let k of [-1, 1]) {
      let q = n.sample(tb, k * 18.4, 0);
      e.putUV("box", "rockband", q.p.x, (y + q.p.y - 2) / 2, q.p.z, 6, y - q.p.y + 2, 6, 11694669, yaw, [1, 2]);
      e.put("box", "matte", q.p.x, y + 0.2, q.p.z, 6.4, 0.4, 6.4, 9127187, 0, yaw, 0);
    }
  }
  // radio masts with blinking beacons + satellite dishes
  {
    let bm = new MeshBasicMaterial({ color: 16729156 }),
      bb = new kr(bm),
      o = Tt(n, 12);
    for (let f = 0; f < o; f++) {
      let g = (f + 0.3) / o,
        y = f % 2 ? 1 : -1,
        v = n.sample(g, y * (95 + i() * 90), 0),
        d = ground + 14 + i() * 26,
        m = 26 + i() * 26;
      for (let x = 0; x < 6; x++) {
        let b = d + (m * x) / 6,
          w = 2.6 * (1 - x / 8);
        (e.put("box", "gloss", v.p.x, b + m / 12, v.p.z, w, m / 6, w, 9278630, 0, 0.4, 0), e.put("box", "gloss", v.p.x, b + m / 12, v.p.z, w * 1.35, 0.16, w * 1.35, 7831706, 0, 0.4, 0));
      }
      e.put("box", "gloss", v.p.x, d + m * 0.72, v.p.z, 5.6, 0.5, 0.5, 11121350, 0, 0.4, 0);
      // rock plinth under the mast
      e.putUV("box", "rockband", v.p.x, (d + ground) / 2, v.p.z, 12 + i() * 6, d - ground, 12 + i() * 6, 11694669, i(), [1, (d - ground) / 9]);
      e.putUV("box", "rockband", v.p.x, ground + (d - ground) * 0.45, v.p.z, 16 + i() * 6, 2.5, 16 + i() * 6, 11826509, i(), [1, 1]);
      ur.compose(pi.set(v.p.x, d + m + 1.2, v.p.z), dr.set(0, 0, 0, 1), new Vector3(1.2, 1.2, 1.2));
      bb.add(wl("ballLow"), ur, 16777215);
      ur.compose(pi.set(v.p.x, d + m * 0.5, v.p.z), dr, new Vector3(0.7, 0.7, 0.7));
      bb.add(wl("ballTiny"), ur, 16777215);
      // dish on every other plinth
      if (f % 2 === 0) {
        let dx = v.p.x + 6,
          dz = v.p.z + 4;
        e.put("cyl", "gloss", dx, d + 1.5, dz, 2.2, 3, 2.2, 12632256, 0, 0, 0);
        e.put("cone", "gloss", dx, d + 5.2, dz, 9, 2.6, 9, 14540253, Math.PI * 0.72, 0.4 * f, 0);
        e.put("box", "gloss", dx, d + 6.5, dz - 2.6, 0.2, 4.5, 0.2, 9474192, 0.7, 0, 0);
        e.put("ballTiny", "glow", dx, d + 8.4, dz - 4, 0.6, 0.6, 0.6, 16729156, 0, 0, 0);
      }
    }
    let mesh = bb.mesh();
    e.mesh(mesh);
    n.anim((tm) => {
      let on = Math.sin(tm * 3.2) > 0.2;
      bm.color.setHex(on ? 16729156 : 4194304);
    });
  }
  // cacti + scrub + boulders
  let c = Tt(n, 110);
  for (let f = 0; f < c; f++) {
    let g = f / c,
      y = f % 2 ? 1 : -1,
      v = Ea(n, g, y * (17 + i() * 24), -11),
      k = i();
    if (k < 0.3) {
      let h = 2.4 + i() * 2.4;
      e.put("cyl6", "matte", v.p.x, v.p.y - 0.3 + h / 2, v.p.z, 0.7, h, 0.7, 3572803, 0, 0, 0);
      e.put("cyl6", "matte", v.p.x + 0.7, v.p.y - 0.3 + h * 0.55, v.p.z, 0.45, h * 0.5, 0.45, 3572803, 0, 0, 0.9);
      e.put("cyl6", "matte", v.p.x - 0.7, v.p.y - 0.3 + h * 0.45, v.p.z, 0.45, h * 0.4, 0.45, 3572803, 0, 0, -0.9);
    } else if (k < 0.65)
      e.put("rock", "stone", v.p.x, v.p.y - 0.3, v.p.z, 1.4 + i() * 2.8, 1 + i() * 1.9, 1.4 + i() * 2.6, [9065792, 7291700, 10512972][f % 3], i(), i() * 6, i());
    else (e.put("ballLow", "matte", v.p.x, v.p.y, v.p.z, 1.5 + i(), 0.9, 1.5 + i(), 7174724, 0, 0, 0), e.put("ballLow", "matte", v.p.x + 0.8, v.p.y - 0.2, v.p.z - 0.5, 1.1, 0.7, 1.1, 8161870, 0, 0, 0));
  }
  // distant buttes: low, wide, tinted toward the sunset haze
  for (let f = 0; f < Tt(n, 14); f++) {
    let g = n.sample(f / 14, (f % 2 ? 1 : -1) * (500 + i() * 500), 0),
      h = 25 + i() * 45,
      w = 120 + i() * 200;
    e.putUV("box", "rockband", g.p.x, ground + h / 2, g.p.z, w, h, w * 0.6, 13991526, i(), [1, h / 9]);
    e.putUV("box", "rockband", g.p.x, ground + h + 2, g.p.z, w * 0.7, 4, w * 0.4, 14653058, i(), [1, 1]);
  }
  let l = Tt(n, 20);
  for (let f = 0; f < l; f++) Wf_lamp(n, f / l, f % 2 ? 1 : -1, 16763018, 7, 2.8, 6968132);
  let h = n.signTexture("SIGNAL  CANYON", "#2a1206", "#ffbf7a", 768, 160),
    p = n.signTexture("5G  EVERYWHERE", "#3a1226", "#ff7f9c", 768, 160),
    p2 = n.signTexture("BLUFOX  MOBILE", "#ffffff", "#c2410c", 768, 160);
  Wf_signs(
    n,
    [
      [h, 0.27],
      [p, 0.55],
      [p2, 0.7],
      [h, 0.9],
    ].map(([tex, tt], k) => ({ tex, t: tt, side: k % 2 ? 1 : -1, lat: 23, h: 6.4, w: 14, hh: 2.9 })),
  );
  let u = n.signTexture("SAND", "#3a2412", "#e8c48a", 384, 128);
  u && yf(n, u, [0.7, 0.787], -1);
  Wf_dressBarrier(n, { tyreCols: [1710618, 1710618, 14364723, 15921906], armcoCol: 11184810 });
  if (n.quality !== "low") Wf_fence(n, 0.706, 0.784, -1, 3, 8421504);
  Wf_venue(n, { col: 8215108, alt: 9526835, roof: 6968132, glow: t.neon, stripe: 16763018, bannerTex: Wf_bannerTex(n, "BLUFOX  MOBILE  \xB7  SIGNAL  EVERYWHERE", "#ffbf7a", "#2a1206") });
}

// ===========================================================================
// 5 — GIGABIT GALAXY: orbital circuit, station rings, asteroids, holo gates.
// ===========================================================================
function Wf_galaxy(n) {
  let { shop: e, track: t, rand: i } = n;
  e.register("pool", new MeshBasicMaterial({ map: Ns(), vertexColors: !0, transparent: !0, opacity: 0.55, blending: nn, side: ii, depthWrite: !1 }));
  let dash = Wf_dashTex("rgba(255,255,255,1)");
  dash && dash.repeat.set(1, 1);
  e.register("holo", Wf_ribbonMaterial(16777215, dash));
  let holoMat = e.mats.holo;
  dash && n.anim((tm) => dash.offset.set(0, -tm * 0.6));
  // stardust
  let r = [],
    s = Tt(n, 900);
  for (let y = 0; y < s; y++) {
    let v = 900 + i() * 1400,
      d = i() * 6.283,
      m = (i() - 0.5) * 1.4;
    r.push(Math.cos(d) * v * Math.cos(m), 140 + Math.sin(m) * v * 0.7, Math.sin(d) * v * Math.cos(m));
  }
  let a = new BufferGeometry();
  (a.setAttribute("position", new Float32BufferAttribute(r, 3)),
    e.mesh(new Points(a, new PointsMaterial({ color: 14674175, size: 2.1, sizeAttenuation: !0, transparent: !0, opacity: 0.92, depthWrite: !1, fog: !1 }))));
  // a ringed planet + moon
  (e.put("ball", "matte", 380, -420, -1150, 620, 620, 620, 5982648, 0, 0, 0), e.put("ballLow", "glow", 380, -420, -1150, 634, 634, 634, 2828896, 0, 0, 0));
  let o = new Mesh(new TorusGeometry(560, 26, 3, 72), new MeshBasicMaterial({ color: 10321904, transparent: !0, opacity: 0.5, side: ii, fog: !1 }));
  (o.position.set(380, -420, -1150), o.rotation.set(1.25, 0.35, 0.42), e.mesh(o));
  e.put("ball", "matte", -700, 120, 900, 120, 120, 120, 8034495, 0, 0, 0);
  // truss understructure
  let c = Tt(n, 110);
  for (let y = 0; y < c; y++) {
    let v = y / c,
      d = n.sample(v, 0, 0),
      m = Wf_yaw(d),
      x = n.length / c;
    e.put("box", "gloss", d.p.x, d.p.y - 4.2, d.p.z, 2.2, 1.4, x * 1.02, 3949682, 0, m, 0);
    for (let b of [-1, 1]) {
      let w = n.sample(v, b * 11, 0);
      e.put("box", "gloss", w.p.x, w.p.y - 2.3, w.p.z, 0.7, 3.4, 0.7, 3291747, 0, m, y % 2 ? 0.4 : -0.4);
      e.put("box", "gloss", w.p.x, w.p.y - 4.4, w.p.z, 0.5, 0.5, x * 1.02, 3291747, 0, m, 0);
    }
    if (y % 5 === 0) {
      let b = n.sample(v, 0, 0);
      (e.put("box", "gloss", b.p.x, b.p.y - 7.6, b.p.z, 26, 0.7, 1.2, 3949682, 0, m + Math.PI / 2, 0),
        e.put("box", "glow", b.p.x, b.p.y - 7.9, b.p.z, 24, 0.18, 0.4, t.secondary, 0, m + Math.PI / 2, 0),
        e.put("box", "gloss", b.p.x, b.p.y - 16, b.p.z, 1.2, 17, 1.2, 3291747, 0, m, 0),
        e.put("ballLow", "glow", b.p.x, b.p.y - 25, b.p.z, 3, 3, 3, t.neon, 0, 0, 0));
    }
  }
  // haze edge glow + data-stream ribbons beside the track
  let l = n.frames,
    h = e.batch("haze");
  for (let y of [-1, 1])
    for (let v of [0, 1]) {
      let d = y * (17.5 + v * 2.6),
        m = 1.6 + v * 1.9;
      h.strip(l, () => ({ lat: d, h: m }), () => ({ lat: d + y * 1.4, h: m + 0.05 }), (x) => (((x + v * 7) >> 2) % 2 ? t.neon : t.secondary));
    }
  {
    let hb = e.batch("holo"),
      d2 = l.filter((q, k) => k % 2 === 0 || k === Xt);
    for (let y of [-1, 1])
      for (let v of [0, 1]) {
        let lat = y * (24 + v * 5),
          hh = 5 + v * 4 + (y > 0 ? 1 : 0);
        hb.strip(d2, () => ({ lat: lat, h: hh }), () => ({ lat: lat, h: hh + 0.5 }), () => (v ? t.neon : t.secondary), (k) => (k * 2 * n.length) / Xt / 3);
      }
  }
  // holographic gates
  let u = Tt(n, 9);
  for (let y = 0; y < u; y++) {
    let v = (y + 0.5) / u,
      d = n.sample(v, 0, 0),
      m = Wf_yaw(d),
      x = y % 2 ? t.neon : t.secondary;
    for (let sd of [-1, 1]) {
      let q = n.sample(v, sd * 17.6, 0);
      e.put("box", "gloss", q.p.x, q.p.y + 6, q.p.z, 1.2, 12, 1.6, 3949682, 0, m, 0);
      e.put("box", "glow", q.p.x, q.p.y + 6, q.p.z, 0.3, 11.5, 0.3, x, 0, m, 0);
    }
    e.put("box", "gloss", d.p.x, d.p.y + 12.4, d.p.z, 37, 1, 1.6, 3949682, 0, m + Math.PI / 2, 0);
    e.put("box", "glow", d.p.x, d.p.y + 11.8, d.p.z, 35, 0.2, 0.3, x, 0, m + Math.PI / 2, 0);
    (pr.set(0, m, 0), dr.setFromEuler(pr));
    ur.compose(pi.set(d.p.x, d.p.y + 8.6, d.p.z), dr, new Vector3(34, 6.2, 1));
    e.batch("holo").add(wl("plane"), ur, x, [1, 3]);
    (e.put("ring", "glow", d.p.x, d.p.y + 1, d.p.z, 36, 36, 36, x, 0, m, 0), e.put("ring", "haze", d.p.x, d.p.y + 1, d.p.z, 39, 39, 39, x, 0, m, 0));
  }
  // floating platforms and station modules
  let p = Tt(n, 44);
  for (let y = 0; y < p; y++) {
    let v = y / p,
      d = y % 2 ? 1 : -1,
      m = n.sample(v, d * (30 + i() * 46), 4 + i() * 26),
      x = Wf_yaw(m),
      b = 8 + i() * 16;
    (e.put("cyl", "gloss", m.p.x, m.p.y, m.p.z, 4.4 + i() * 2, b, 4.4 + i() * 2, 12174048, 0, x, Math.PI / 2),
      e.put("box", "glow", m.p.x, m.p.y + 2.4, m.p.z, b * 0.8, 0.3, 0.6, y % 2 ? t.neon : t.secondary, 0, x, 0));
    for (let w of [-1, 1]) {
      (e.put("box", "gloss", m.p.x + w * 7.5, m.p.y, m.p.z, 12, 0.25, 5.5, 2898572, 0, x, 0.25 * w),
        e.put("box", "gloss", m.p.x + w * 7.5, m.p.y + 0.16, m.p.z, 11.4, 0.06, 5, 5205216, 0, x, 0.25 * w));
    }
    i() < 0.4 && (e.put("cone", "gloss", m.p.x, m.p.y + 4.6, m.p.z, 6.4, 3.2, 6.4, 14673659, Math.PI, x, 0), e.put("box", "gloss", m.p.x, m.p.y + 3, m.p.z, 0.3, 2.4, 0.3, 10134726, 0, x, 0));
  }
  for (let y = 0; y < Tt(n, 26); y++) {
    let v = y / 26,
      d = n.sample(v, (y % 2 ? 1 : -1) * (120 + i() * 320), 30 + i() * 160),
      w = 26 + i() * 40,
      hh = 8 + i() * 12,
      rot = i() * 6;
    (e.put("box", "gloss", d.p.x, d.p.y, d.p.z, w, hh, 10 + i() * 14, 8292532, i() * 0.4, rot, i() * 0.4),
      e.put("box", "glow", d.p.x, d.p.y + hh * 0.2, d.p.z, w * 0.9, 0.5, 4, t.neon, i() * 0.4, rot, i() * 0.4),
      e.put("box", "glow", d.p.x, d.p.y - hh * 0.2, d.p.z, w * 0.9, 0.5, 4, t.secondary, i() * 0.4, rot, i() * 0.4),
      e.put("cyl", "gloss", d.p.x, d.p.y + hh / 2 + 4, d.p.z, 3, 8, 3, 12174048, 0, 0, 0));
  }
  // rotating station rings around the circuit + orbiting asteroid belts
  {
    let rm = new MeshStandardMaterial({ vertexColors: !0, metalness: 0.7, roughness: 0.3 }),
      gm = new MeshBasicMaterial({ vertexColors: !0 }),
      rings = [];
    for (let k = 0; k < 2; k++) {
      let R = 330 + k * 120,
        rb = new kr(rm),
        gb = new kr(gm),
        segs = 40;
      for (let j = 0; j < segs; j++) {
        let ang = (j / segs) * Math.PI * 2,
          x = Math.cos(ang) * R,
          z = Math.sin(ang) * R;
        (pr.set(0, -ang, 0), dr.setFromEuler(pr));
        ur.compose(pi.set(x, 0, z), dr, new Vector3((R * 2 * Math.PI) / segs + 1, 6, 9));
        rb.add(wl("box"), ur, j % 4 ? 8292532 : 5197647);
        ur.compose(pi.set(x, 3.2, z), dr, new Vector3((R * 2 * Math.PI) / segs * 0.7, 0.4, 2));
        gb.add(wl("box"), ur, k ? t.secondary : t.neon);
        ur.compose(pi.set(x, -3.2, z), dr, new Vector3((R * 2 * Math.PI) / segs * 0.7, 0.4, 2));
        gb.add(wl("box"), ur, k ? t.neon : t.secondary);
        if (j % 8 === 0) {
          ur.compose(pi.set(x, 9, z), dr, new Vector3(8, 12, 8));
          rb.add(wl("box"), ur, 5197647);
          ur.compose(pi.set(x, 16, z), dr, new Vector3(3, 3, 3));
          gb.add(wl("ballLow"), ur, 16777215);
        }
      }
      let g = new Group(),
        rmesh = rb.mesh(),
        gmesh = gb.mesh();
      ((rmesh.matrixAutoUpdate = !0), (gmesh.matrixAutoUpdate = !0), g.add(rmesh, gmesh));
      g.position.set(0, n.baseY + 60 + k * 90, 0);
      g.rotation.set(0.18 * (k ? -1 : 1), 0, 0.12);
      ((g.userData.spin = k ? -0.02 : 0.03), e.mesh(g), rings.push(g));
    }
    let am = new MeshStandardMaterial({ vertexColors: !0, metalness: 0.1, roughness: 0.9, flatShading: !0 }),
      belts = [];
    for (let k = 0; k < 3; k++) {
      let ab = new kr(am),
        cnt = Tt(n, 26);
      for (let j = 0; j < cnt; j++) {
        let ang = i() * 6.283,
          R = 200 + i() * 380,
          y = (i() - 0.5) * 160,
          sz = 3 + i() * 14;
        (pr.set(i() * 6, i() * 6, i() * 6), dr.setFromEuler(pr));
        ur.compose(pi.set(Math.cos(ang) * R, y, Math.sin(ang) * R), dr, new Vector3(sz, sz * (0.6 + i() * 0.6), sz * (0.6 + i() * 0.6)));
        ab.add(wl("rock1"), ur, [5197647, 6774386, 4472657][j % 3]);
      }
      let m = ab.mesh();
      ((m.matrixAutoUpdate = !0), m.position.set(0, n.baseY + 20, 0), (m.userData.spin = 0.006 * (k + 1) * (k % 2 ? -1 : 1)), e.mesh(m), belts.push(m));
    }
    n.anim((tm) => {
      for (let g of rings) g.rotation.y = tm * g.userData.spin;
      for (let m of belts) ((m.rotation.y = tm * m.userData.spin), (m.rotation.x = Math.sin(tm * 0.05) * 0.1));
    });
  }
  let f = n.signTexture("GIGABIT  GALAXY", "#e9e2ff", "#251a5c", 768, 160),
    f2 = n.signTexture("BLUFOX  ORBITAL  10G", "#5df0ff", "#0b0f2a", 768, 160);
  {
    let y = [],
      y2 = [];
    for (let v = 0; v < 3; v++) {
      let d = 0.18 + v * 0.33,
        m = n.sample(d, -20, 6),
        x = Wf_yaw(m);
      y.push({ x: m.p.x, y: m.p.y, z: m.p.z, w: 13, h: 2.7, ry: Us(x, -1) });
      let d2 = 0.05 + v * 0.33,
        m2 = n.sample(d2, 20, 6),
        x2 = Wf_yaw(m2);
      y2.push({ x: m2.p.x, y: m2.p.y, z: m2.p.z, w: 13, h: 2.7, ry: Us(x2, 1) });
      e.put("box", "gloss", m.p.x, m.p.y - 3, m.p.z, 0.3, 6, 0.3, 3949682, 0, x, 0);
      e.put("box", "gloss", m2.p.x, m2.p.y - 3, m2.p.z, 0.3, 6, 0.3, 3949682, 0, x2, 0);
    }
    (f && Br(n, f, y), f2 && Br(n, f2, y2));
  }
  let g = Tt(n, 22);
  for (let y = 0; y < g; y++) Wf_lamp(n, y / g, y % 2 ? 1 : -1, 11131135, 5.6, 2.4, 3949682);
  if (n.quality !== "low") for (let side of [1, -1]) Wf_glassWall(n, 0, 1, side, 1.4, 9061631);
  Wf_dressBarrier(n, { tyres: !1, armcoCol: 8292532, postCol: 3949682 });
  Wf_venue(n, { col: 3949682, alt: 5197647, roof: 8292532, glow: t.neon, stripe: t.secondary, bannerTex: Wf_bannerTex(n, "BLUFOX  MOBILE  \xB7  GIGABIT  SPEEDS", "#e9e2ff", "#251a5c") });
}

var m1 = [Wf_chicago, Wf_megastore, Wf_lakefront, Wf_frostbyte, Wf_canyon, Wf_galaxy];
