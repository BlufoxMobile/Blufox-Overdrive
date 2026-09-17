function Mu(n, e = {}) {
  let t = ki[n % ki.length],
    i = e.detail === "low" ? "low" : "high",
    r = e1[i],
    s = df[n % df.length],
    a = t1(t),
    o = new Group();
  o.name = "kart:" + t.name;
  let c = new Group();
  o.add(c);
  let l = new Hn();
  (s.body.call(s, l, r), i1(l, r, s));
  for (let G of s.pipes)
    (l.add(k.cyl(s.pipeR, s.pipeR * 1.16, 0.44, 12), D.CHROME_DARK, [G[0], G[1], G[2]], [ft / 2, 0, 0]),
      l.add(k.cyl(s.pipeR * 0.86, s.pipeR * 0.86, 0.08, 12), D.GRID, [G[0], G[1], G[2] - 0.21], [ft / 2, 0, 0]));
  let h = new Mesh(l.build(), a);
  ((h.castShadow = !0), (h.receiveShadow = !0), c.add(h));
  let p = new Group();
  (p.position.set(0, s.headY, s.headZ), c.add(p));
  let u = new Group();
  p.add(u);
  let f = new Mesh(n1(t, r, s).build(), a);
  ((f.castShadow = !0), (f.receiveShadow = !0), u.add(f));
  let g = null;
  if (r.tail) {
    ((g = new Group()), g.position.set(s.tail[0], s.tail[1], s.tail[2]), c.add(g));
    let G = new Mesh(hf(r, s).build(), a);
    ((G.castShadow = !0), g.add(G));
  } else {
    let G = hf(r, s),
      W = new Matrix4().makeTranslation(s.tail[0], s.tail[1], s.tail[2]);
    G.parts.forEach(($) => $.m.premultiply(W));
    let B = new Mesh(G.build(), a);
    ((B.castShadow = !0), c.add(B));
  }
  let y = {
      knobbly: !!s.knobbly,
      wall: !!s.wall,
    },
    v = [],
    d = [];
  for (let G of [-1, 1]) {
    let W = new Group();
    (W.position.set(G * s.track, s.fw.r, s.fz), (W.userData.y0 = W.position.y), o.add(W));
    let B = new Group();
    W.add(B);
    let $ = new Hn();
    _l(
      $,
      0,
      s.fw.r,
      s.fw.w,
      r,
      Object.assign(
        {
          out: G,
        },
        y,
      ),
    );
    let Z = new Mesh($.build(), a);
    ((Z.castShadow = !0), (Z.receiveShadow = !0), B.add(Z), v.push(W), d.push(B));
  }
  let m = new Group();
  (m.position.set(0, s.rw.r, s.rz), o.add(m));
  {
    let G = new Hn();
    if (s.dualRear)
      for (let B of [-1, 1])
        (_l(G, B * (s.track - s.dualRear * 0.5), s.rw.r, s.rw.w, r, y),
          _l(G, B * (s.track + s.dualRear * 0.5), s.rw.r, s.rw.w, r, y));
    else for (let B of [-1, 1]) _l(G, B * s.track, s.rw.r, s.rw.w, r, y);
    let W = new Mesh(G.build(), a);
    ((W.castShadow = !0), (W.receiveShadow = !0), m.add(W));
  }
  d.push(m);
  let x = null;
  if (s.dome && r.extras) {
    let G = new MeshStandardMaterial({
      color: 14217983,
      transparent: !0,
      opacity: 0.3,
      roughness: 0.04,
      metalness: 0.18,
      side: Ni,
      depthWrite: !1,
      envMapIntensity: 2.6,
    });
    ((x = new Mesh(new SphereGeometry(1, 22, 12, 0, ft * 2, 0, ft * 0.6), G)),
      x.position.set(0, s.dome.y, s.dome.z),
      x.scale.set(s.dome.r[0], s.dome.r[1], s.dome.r[2]),
      (x.renderOrder = 2),
      c.add(x));
  }
  let b = null;
  if (r.plate && typeof document != "undefined") {
    let G = lf("0" + (n + 1));
    ((b = new Mesh(
      new PlaneGeometry(0.8, 0.28),
      new MeshBasicMaterial({
        map: G,
        toneMapped: !0,
      }),
    )),
      b.position.set(s.plate[0], s.plate[1], s.plate[2]),
      (b.rotation.y = ft),
      c.add(b));
  }
  let w = a1(s, wa(t.accent, 0.55));
  c.add(w);
  let A = s1(),
    C = new Mesh(
      new SphereGeometry(2.05, 20, 14),
      new MeshBasicMaterial({
        color: 8251647,
        map: A,
        transparent: !0,
        opacity: 0.17,
        blending: nn,
        depthWrite: !1,
        side: ii,
        toneMapped: !1,
      }),
    );
  ((C.position.y = 1.15), C.scale.set(1, 0.92, 1.06), (C.visible = !1), (C.renderOrder = 3), o.add(C));
  let F = of(i === "low" ? 64 : 128),
    N = new Mesh(
      new PlaneGeometry(s.shadow[0], s.shadow[1]),
      new MeshBasicMaterial({
        color: 16777215,
        map: F,
        transparent: !0,
        opacity: 0.7,
        depthWrite: !1,
        toneMapped: !1,
      }),
    );
  return (
    (N.rotation.x = -ft / 2),
    (N.position.y = 0.035),
    (N.renderOrder = -1),
    o.add(N),
    (o.userData = {
      head: p,
      flame: w,
      shield: C,
      wheels: d,
      rig: {
        chassis: c,
        headRig: u,
        tailRig: g,
        steer: v,
        shadow: N,
        plate: b,
        glass: x,
        wheels: d,
        flameCore: w.userData.core,
      },
      anim: {
        t: Math.random() * 10,
        spin: 0,
        steer: 0,
        lean: 0,
        pitch: 0,
        speed: 0,
        prevSpeed: 0,
        accel: 0,
        boost: 0,
        drift: 0,
        air: 0,
        bob: 0,
        wheelR: s.rw.r,
      },
      driverId: n,
      detail: i,
      archetype: Qg[n % 8],
      palette: a,
      extraMaterials: [
        w.children[0].material,
        w.children[1].material,
        C.material,
        N.material,
        b && b.material,
        x && x.material,
      ].filter(Boolean),
    }),
    o
  );
}
var o1 = 56;
function pf(n, e, t) {
  let i = n && n.userData;
  if (!i || !i.rig || !i.anim) return;
  let r = i.anim,
    s = i.rig,
    a = e || {};
  ((t = typeof t == "number" && t > 0 && t < 0.25 ? t : 0.016), (r.t += t));
  let o = Math.max(0, +a.speed || 0),
    c = ni(a.speedN !== void 0 ? +a.speedN : o / o1, 0, 1.4),
    l = ni(+a.steer || 0, -1, 1),
    h = ni(+a.drift || 0, 0, 1),
    p = Math.sign(+a.driftDir || 0),
    u = ni(a.boost > 1 ? 1 : +a.boost || 0, 0, 1),
    f = a.airborne ? 1 : 0;
  ((r.steer = Vn(r.steer, l, 11, t)),
    (r.drift = Vn(r.drift, h, 9, t)),
    (r.boost = Vn(r.boost, u, u > r.boost ? 7 : 3.2, t)),
    (r.air = Vn(r.air, f, 10, t)));
  let g = (o - r.prevSpeed) / t;
  ((r.prevSpeed = o), (r.accel = Vn(r.accel, ni(g / 24, -1, 1), 5, t)), (r.speed = Vn(r.speed, c, 4, t)));
  let y = -r.steer * 0.105 - r.drift * p * 0.085;
  r.lean = Vn(r.lean, y, 14, t);
  let v = -r.accel * 0.045 + r.air * 0.09;
  ((r.pitch = Vn(r.pitch, v, 9, t)), (s.chassis.rotation.z = r.lean), (s.chassis.rotation.x = r.pitch));
  let d = Math.sin(r.t * 7.5 + i.driverId) * 0.011 * (0.35 + r.speed) + Math.sin(r.t * 19.3) * 0.004 * r.speed;
  ((s.chassis.position.y = d - r.air * 0.05 - Math.max(0, r.accel) * 0.02), (s.chassis.position.x = r.lean * 0.1));
  let m = ni(o / (r.wheelR || 0.5), 0, 42);
  r.spin = (r.spin + m * t * (1 - r.air * 0.7)) % (ft * 2);
  for (let A of s.wheels) A.rotation.x = r.spin;
  let x = r.steer * 0.4 - r.drift * p * 0.26;
  for (let A of s.steer) ((A.rotation.y = x), (A.position.y = (A.userData.y0 || A.position.y) + r.air * 0.05));
  ((s.headRig.rotation.y = r.steer * 0.34 + r.drift * p * 0.3),
    (s.headRig.rotation.z = -r.steer * 0.1),
    (s.headRig.rotation.x = -r.speed * 0.05 + Math.sin(r.t * 2.1 + i.driverId) * 0.022),
    s.tailRig &&
      ((s.tailRig.rotation.x = -0.05 + r.speed * 0.55 - r.air * 0.25),
      (s.tailRig.rotation.y = Math.sin(r.t * (3 + r.speed * 6)) * (0.14 + r.speed * 0.16) - r.steer * 0.3),
      (s.tailRig.rotation.z = Math.sin(r.t * 4.3 + 1.1) * 0.07)));
  let b = i.flame;
  if (r.boost > 0.02) {
    b.visible = !0;
    let A = 0.86 + Math.sin(r.t * 47) * 0.09 + Math.sin(r.t * 91.7) * 0.06;
    (b.scale.set(1, 1, (0.18 + r.boost * 0.92) * A),
      (b.children[0].material.opacity = 0.22 + r.boost * 0.66),
      (b.children[1].material.opacity = 0.18 + r.boost * 0.78));
  } else b.visible && (b.visible = !1);
  let w = i.shield;
  if (w.visible) {
    let A = 1 + Math.sin(r.t * 3.4) * 0.035;
    (w.scale.set(A, 0.92 * A, 1.06 * A),
      (w.rotation.y = r.t * 0.55),
      (w.rotation.x = Math.sin(r.t * 0.7) * 0.12),
      w.material.map && ((w.material.map.offset.x = r.t * 0.06), (w.material.map.offset.y = -r.t * 0.03)));
  }
  if (s.shadow) {
    let A = 1 - r.air * 0.28;
    (s.shadow.scale.set(A, A, 1), (s.shadow.material.opacity = 0.7 * (1 - r.air * 0.45)));
  }
}
function Su(n) {
  if (!n) return;
  let e = n.userData || {};
  (n.traverse((t) => {
    t.isMesh && t.geometry && t.geometry.dispose();
  }),
    e.palette && ((e.palette.userData.paletteTextures || []).forEach((t) => t.dispose()), e.palette.dispose()),
    (e.extraMaterials || []).forEach((t) => {
      (t.map && t.map.dispose(), t.dispose());
    }));
}
var ff = 0.45,
  mf = (n, e, t) => (n < e ? e : n > t ? t : n),
  wu = typeof document != "undefined",
  Ml = (n) => "#" + ((n >>> 0) & 16777215).toString(16).padStart(6, "0"),
  Tt = (n, e) => Math.max(2, Math.round(e * mf(n.detail, 0.2, 1.4)));
function Tu(n, e) {
  let t = document.createElement("canvas");
  return ((t.width = n), (t.height = e), [t, t.getContext("2d")]);
}
function Eu(n, { repeat: e = !0, srgb: t = !0 } = {}) {
  let i = new CanvasTexture(n);
  return (e && (i.wrapS = i.wrapT = RepeatWrapping), t && (i.colorSpace = Ft), (i.anisotropy = 4), i);
}
function l1(n, e, t = 659490, i = 4, r = 9, s = 0.34) {
  if (!wu) return null;
  let [a, o] = Tu(64, 128);
  ((o.fillStyle = Ml(t)), o.fillRect(0, 0, 64, 128));
  let c = 64 / i,
    l = 128 / r;
  for (let h = 0; h < r; h++) {
    let p = n() < 0.13;
    for (let u = 0; u < i; u++) {
      if (p || n() < s) {
        let g = n() < 0.22;
        ((o.fillStyle = Ml(g ? e[(n() * e.length) | 0] : 16770747)), (o.globalAlpha = 0.42 + n() * 0.5));
      } else ((o.fillStyle = Ml(t)), (o.globalAlpha = 1));
      (o.fillRect(u * c + c * 0.16, h * l + l * 0.18, c * 0.68, l * 0.5), (o.globalAlpha = 1));
    }
    ((o.fillStyle = "rgba(0,0,0,.55)"),
      o.fillRect(0, h * l + l * 0.7, 64, Math.max(1, l * 0.12)),
      (o.fillStyle = "rgba(255,255,255,.05)"),
      o.fillRect(0, h * l + l * 0.68, 64, 1));
  }
  return ((o.fillStyle = "rgba(0,0,0,.35)"), o.fillRect(c * 2 - 1, 0, 2, 128), Eu(a));
}
function Ns(n = "rgba(255,255,255,1)", e = "rgba(255,255,255,0)") {
  if (!wu) return null;
  let [t, i] = Tu(128, 128),
    r = i.createRadialGradient(64, 64, 0, 64, 64, 64);
  return (
    r.addColorStop(0, n),
    r.addColorStop(0.45, "rgba(255,255,255,.35)"),
    r.addColorStop(1, e),
    (i.fillStyle = r),
    i.fillRect(0, 0, 128, 128),
    Eu(t, {
      repeat: !1,
    })
  );
}
function gf(n, e = 8) {
  if (!wu) return null;
  let [t, i] = Tu(16, 128);
  for (let r = 0; r < 128; r++) {
    let s = n[((r / 128) * n.length) | 0] || n[0];
    ((i.fillStyle = Ml(s)), (i.globalAlpha = 0.82 + (r % 3) * 0.06), i.fillRect(0, r, 16, 1));
  }
  i.globalAlpha = 0.18;
  for (let r = 0; r < e; r++) ((i.fillStyle = "#000"), i.fillRect(0, ((r * 128) / e) | 0, 16, 1 + ((r * 7) % 3)));
  return Eu(t);
}
var Us = (n, e) => n + (e * Math.PI) / 2,
  c1 = (n) => n + Math.PI;
function Br(n, e, t) {
  if (!e || !t || !t.length) return null;
  let i = n.signBoard(e, t);
  return (i && n.shop.mesh(i), i);
}
function Ta(n, e, t, i = 3400, r = "matte") {
  n.shop.put("box", r, 0, e - 30, 0, i, 60, i, t, 0, 0, 0);
}
var vf = 40;
function Ea(n, e, t, i, r = 15.4, s = vf, a = 0) {
  let o = mf((Math.abs(t) - r) / (s - r), 0, 1);
  return n.sample(e, t, -0.34 + (i + 0.34) * o + a);
}
function Aa(n, e, t, i, r, s = "matte") {
  t = Math.min(t, vf);
  let a = n.shop.batch(s),
    o = n.frames;
  (a.strip(
    o,
    () => ({
      lat: e,
      h: -0.34,
    }),
    () => ({
      lat: t,
      h: i,
    }),
    () => r,
  ),
    a.strip(
      o,
      () => ({
        lat: -t,
        h: i,
      }),
      () => ({
        lat: -e,
        h: -0.34,
      }),
      () => r,
    ));
}
function xf(n, e, t, i, r, s, a, o, c) {
  let l = c === void 0 ? 0.07 : c,
    h = (((((a >> 16) & 255) * l) | 0) << 16) | (((((a >> 8) & 255) * l) | 0) << 8) | (((a & 255) * l) | 0);
  n.shop.putUV("plane", "pool", e, t, i, r, s, 1, h, 0, 1, -Math.PI / 2, o || 0);
}
function Sl(n, e, t, i, r = 7.4, s = 2.9) {
  let a = n.barrierFaceAt(e, t),
    o = n.sample(e, t * (a + 1.35), 0),
    c = Math.atan2(o.dir.x, o.dir.z);
  n.shop.put("box", "gloss", o.p.x, o.p.y + r / 2, o.p.z, 0.26, r, 0.26, 2766162, 0, c, 0);
  let l = n.sample(e, t * (a + 1.35 - s / 2), r);
  n.shop.put("box", "gloss", l.p.x, l.p.y, l.p.z, s, 0.18, 0.22, 2766162, 0, c, 0);
  let h = n.sample(e, t * (a + 1.35 - s), r - 0.12);
  n.shop.put("box", "glow", h.p.x, h.p.y, h.p.z, 1.15, 0.16, 0.5, i, 0, c, 0);
  let p = n.sample(e, t * (a - s), 0.055);
  xf(n, p.p.x, p.p.y, p.p.z, 7.5, 9, i, c);
}
function Ds(n, e, t, i = 34, r = 6, s = 2175053) {
  let a = n.sample(e, 0, 0),
    o = Math.atan2(a.dir.x, a.dir.z),
    c = n.barrierFaceAt(e, t);
  for (let h = 0; h < r; h++) {
    let p = t * (c + 3.4 + h * 1.6),
      u = n.sample(e, p, 0);
    (n.shop.put("box", "matte", u.p.x, u.p.y + 0.9 + h * 1.15, u.p.z, 1.6, 0.4, i, h % 2 ? s : s + 659224, 0, o, 0),
      n.shop.put(
        "box",
        "glow",
        u.p.x,
        u.p.y + 1.45 + h * 1.15,
        u.p.z,
        1.1,
        0.7,
        i * 0.98,
        [14214399, 16767400, 16757448, 12577279][h % 4],
        0,
        o,
        0,
      ));
  }
  let l = n.sample(e, t * (c + 3.4 + r * 1.6), 0);
  n.shop.put("box", "matte", l.p.x, l.p.y + r * 0.62, l.p.z, 0.7, r * 1.3, i, 1581884, 0, o, 0);
}
function yf(n, e, t, i) {
  if (!e) return null;
  let r = [];
  for (let s of t) {
    let a = n.sample(s, i * (n.barrierFaceAt(s, i) + 1), 1.35);
    r.push({
      x: a.p.x,
      y: a.p.y,
      z: a.p.z,
      w: 2.2,
      h: 1.5,
      ry: c1(Math.atan2(a.dir.x, a.dir.z)),
    });
  }
  return Br(n, e, r);
}
// Circuit dressers m1 = [chicago, megastore, lakefront, frostbyte, canyon, galaxy]
// live in 04b-world-dress.js (same scope, loaded right after this file).
function bf(n, e) {
  (m1[n | 0] || _f)(e);
}
var Lu = 1.4,
  Tf = 11.4,
  Wn = Tf + Lu,
  Pa = 0.52,
  hr = 1.18,
  Mn = 12,
  Ru = 10,
  Sn = 15.4,
  Xt = 720,
  g1 = {
    high: {
      deck: 1,
      barrier: 1,
      posts: !0,
      skirt: !0,
    },
    medium: {
      deck: 2,
      barrier: 1,
      posts: !0,
      skirt: !0,
    },
    low: {
      deck: 2,
      barrier: 2,
      posts: !1,
      skirt: !1,
    },
  },
  Tl = Object.freeze({
    kartHalfWidth: Lu,
    laneLimit: Tf,
    barrierFace: Wn,
    barrierThickness: Pa,
    barrierHeight: hr,
    roadHalfWidth: Mn,
    shoulderLane: Ru,
    deckHalfWidth: Sn,
    segments: Xt,
  }),
  Au = {
    3: [
      {
        from: 0.335,
        to: 0.452,
        side: 1,
        face: 14.45,
        blend: 0.022,
        surface: "snow",
      },
    ],
    4: [
      {
        from: 0.706,
        to: 0.784,
        side: -1,
        face: 14.2,
        blend: 0.018,
        surface: "sand",
      },
    ],
  },
  v1 = (n) => new Vector3(-n.z, 0, n.x).normalize(),
  x1 = (n, e, t) => {
    let i = Math.atan2(e.x, e.z) - Math.atan2(n.x, n.z);
    return ((i = ((((i + Math.PI) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)) - Math.PI), -i / t);
  },
  Ef = typeof document != "undefined",
  La = (n, e, t) => (n < e ? e : n > t ? t : n),
  Mf = (n) => ((n = La(n, 0, 1)), n * n * (3 - 2 * n));
function Sf(n) {
  return () => {
    ((n |= 0), (n = (n + 1831565813) | 0));
    let e = Math.imul(n ^ (n >>> 15), 1 | n);
    return ((e = (e + Math.imul(e ^ (e >>> 7), 61 | e)) ^ e), ((e ^ (e >>> 14)) >>> 0) / 4294967296);
  };
}
var pi = new Vector3(),
  y1 = new Matrix3(),
  wf = new Color(),
  ur = new Matrix4(),
  dr = new Quaternion(),
  pr = new Euler(0, 0, 0, "YXZ"),
  Cu = {};
function wl(n) {
  if (Cu[n]) return Cu[n];
  let e;
  switch (n) {
    case "box":
      e = new BoxGeometry(1, 1, 1);
      break;
    case "plane":
      e = new PlaneGeometry(1, 1);
      break;
    case "cyl":
      e = new CylinderGeometry(0.5, 0.5, 1, 10);
      break;
    case "cyl6":
      e = new CylinderGeometry(0.5, 0.5, 1, 6);
      break;
    case "tube":
      e = new CylinderGeometry(0.5, 0.5, 1, 8, 1, !0);
      break;
    case "cone":
      e = new ConeGeometry(0.5, 1, 9);
      break;
    case "cone4":
      e = new ConeGeometry(0.5, 1, 4);
      break;
    case "cone6":
      e = new ConeGeometry(0.5, 1, 6);
      break;
    case "ball":
      e = new SphereGeometry(0.5, 12, 8);
      break;
    case "ballLow":
      e = new SphereGeometry(0.5, 8, 6);
      break;
    case "ballTiny":
      e = new SphereGeometry(0.5, 6, 4);
      break;
    case "tube6":
      e = new CylinderGeometry(0.5, 0.5, 1, 6, 1, !0);
      break;
    case "disc":
      e = new CircleGeometry(0.5, 12).rotateX(-Math.PI / 2);
      break;
    case "wedge":
      e = new CylinderGeometry(0.5, 0.5, 1, 3);
      break;
    case "rock":
      e = new IcosahedronGeometry(0.5, 0);
      break;
    case "rock1":
      e = new IcosahedronGeometry(0.5, 1);
      break;
    case "torus":
      e = new TorusGeometry(0.5, 0.06, 5, 20);
      break;
    case "ring":
      e = new TorusGeometry(0.5, 0.011, 4, 28);
      break;
    default:
      e = new BoxGeometry(1, 1, 1);
  }
  return (
    e.attributes.uv ||
      e.setAttribute("uv", new Float32BufferAttribute(new Float32Array(e.attributes.position.count * 2), 2)),
    (Cu[n] = e)
  );
}
var kr = class {
    constructor(e) {
      ((this.material = e),
        (this.pos = []),
        (this.nor = []),
        (this.uv = []),
        (this.col = []),
        (this.idx = []),
        (this.count = 0));
    }
    get empty() {
      return this.count === 0;
    }
    add(e, t, i, r, s0) {
      let s = e.attributes.position.array,
        a = e.attributes.normal.array,
        o = e.attributes.uv ? e.attributes.uv.array : null,
        c = y1.getNormalMatrix(t),
        l = this.count,
        h = wf.setHex(i >>> 0),
        p = h.r,
        u = h.g,
        f = h.b,
        g = r === void 0 ? 1 : r.length ? r[0] : r,
        y = r === void 0 ? 1 : r.length ? r[1] : r;
      for (let d = 0, m = 0; d < s.length; d += 3, m += 2)
        (pi.set(s[d], s[d + 1], s[d + 2]).applyMatrix4(t),
          this.pos.push(pi.x, pi.y, pi.z),
          pi
            .set(a[d], a[d + 1], a[d + 2])
            .applyMatrix3(c)
            .normalize(),
          this.nor.push(pi.x, pi.y, pi.z),
          this.col.push(p, u, f),
          s0 ? this.uv.push(s0[0], s0[1]) : this.uv.push(o ? o[m] * g : 0, o ? o[m + 1] * y : 0));
      let v = s.length / 3;
      if (e.index) {
        let d = e.index.array;
        for (let m = 0; m < d.length; m++) this.idx.push(d[m] + l);
      } else for (let d = 0; d < v; d++) this.idx.push(d + l);
      this.count += v;
    }
    strip(e, t, i, r, s) {
      let a = e.length - 1,
        o = this.count;
      for (let c = 0; c < a; c++) {
        let l = e[c],
          h = e[c + 1],
          p = t(c),
          u = i(c),
          f = t(c + 1),
          g = i(c + 1),
          y = wf.setHex((r ? r(c) : 16777215) >>> 0),
          v = y.r,
          d = y.g,
          m = y.b,
          x = s ? s(c) : (c / a) * 40,
          b = s ? s(c + 1) : ((c + 1) / a) * 40,
          w = [
            [l, p, 0, x],
            [l, u, 1, x],
            [h, f, 0, b],
            [h, g, 1, b],
          ],
          A = this.count;
        for (let [C, F, N, G] of w)
          (pi.copy(C.p).addScaledVector(C.right, F.lat),
            (pi.y += F.h),
            this.pos.push(pi.x, pi.y, pi.z),
            this.uv.push(N, G),
            this.col.push(v, d, m),
            this.nor.push(0, 1, 0));
        (this.idx.push(A, A + 1, A + 2, A + 1, A + 3, A + 2), (this.count += 4));
      }
      this.recomputeFrom(o);
    }
    recomputeFrom(e) {
      let t = this.pos,
        i = this.nor,
        r = this.idx;
      for (let s = 0; s < r.length; s += 3) {
        let a = r[s],
          o = r[s + 1],
          c = r[s + 2];
        if (a < e && o < e && c < e) continue;
        let l = t[a * 3],
          h = t[a * 3 + 1],
          p = t[a * 3 + 2],
          u = t[o * 3] - l,
          f = t[o * 3 + 1] - h,
          g = t[o * 3 + 2] - p,
          y = t[c * 3] - l,
          v = t[c * 3 + 1] - h,
          d = t[c * 3 + 2] - p,
          m = f * d - g * v,
          x = g * y - u * d,
          b = u * v - f * y,
          w = Math.hypot(m, x, b) || 1;
        ((m /= w), (x /= w), (b /= w));
        for (let A of [a, o, c]) ((i[A * 3] = m), (i[A * 3 + 1] = x), (i[A * 3 + 2] = b));
      }
    }
    mesh() {
      let e = new BufferGeometry();
      (e.setAttribute("position", new Float32BufferAttribute(this.pos, 3)),
        e.setAttribute("normal", new Float32BufferAttribute(this.nor, 3)),
        e.setAttribute("uv", new Float32BufferAttribute(this.uv, 2)),
        e.setAttribute("color", new Float32BufferAttribute(this.col, 3)),
        e.setIndex(this.idx.length > 65535 ? new xs(this.idx, 1) : new vs(this.idx, 1)),
        e.computeBoundingSphere());
      let t = new Mesh(e, this.material);
      return ((t.matrixAutoUpdate = !1), t);
    }
  },
  zr = class {
    constructor(e) {
      this.quality = e;
      let t = (i) =>
        new MeshStandardMaterial(
          Object.assign(
            {
              vertexColors: !0,
            },
            i,
          ),
        );
      ((this.mats = {
        matte: t({
          metalness: 0.06,
          roughness: 0.86,
        }),
        stone: t({
          metalness: 0.02,
          roughness: 0.95,
          flatShading: !0,
        }),
        gloss: t({
          metalness: 0.66,
          roughness: 0.26,
        }),
        wet: t({
          metalness: 0.55,
          roughness: 0.12,
        }),
        glow: new MeshBasicMaterial({
          vertexColors: !0,
        }),
        haze: new MeshBasicMaterial({
          vertexColors: !0,
          transparent: !0,
          opacity: 0.34,
          blending: nn,
          depthWrite: !1,
        }),
        glass: t({
          metalness: 0.9,
          roughness: 0.06,
          transparent: !0,
          opacity: 0.34,
          depthWrite: !1,
        }),
      }),
        (this.batches = {}),
        (this.extra = []));
    }
    batch(e) {
      return this.batches[e] || (this.batches[e] = new kr(this.mats[e] || this.mats.matte));
    }
    register(e, t) {
      this.mats[e] = t;
      let i = this.batches[e];
      return (i && (i.material = t), e);
    }
    put(e, t, i, r, s, a, o, c, l, h, p, u) {
      (pr.set(h || 0, p || 0, u || 0),
        dr.setFromEuler(pr),
        ur.compose(pi.set(i, r, s), dr, new Vector3(a, o === void 0 ? a : o, c === void 0 ? a : c)),
        this.batch(t).add(wl(e), ur, l === void 0 ? 16777215 : l));
    }
    putUV(e, t, i, r, s, a, o, c, l, h, p, u, f) {
      (pr.set(u || 0, h || 0, f || 0),
        dr.setFromEuler(pr),
        ur.compose(pi.set(i, r, s), dr, new Vector3(a, o === void 0 ? a : o, c === void 0 ? a : c)),
        this.batch(t).add(wl(e), ur, l === void 0 ? 16777215 : l, p || 1));
    }
    box(e, t, i, r, s, a, o, c, l) {
      this.put("box", e, t, i, r, s, a, o, c, 0, l, 0);
    }
    mesh(e) {
      return (this.extra.push(e), e);
    }
    flush(e) {
      let t = 0,
        i = 0;
      this.lastBatches = {};
      for (let r of Object.keys(this.batches)) {
        let s = this.batches[r];
        if (s.empty) continue;
        this.lastBatches[r] = s.idx.length / 3;
        let a = s.mesh();
        ((a.name = "batch:" + r),
          (a.castShadow = Wf_castShadow.has(r)),
          (a.receiveShadow = !Wf_noShadow.has(r)),
          e.add(a),
          (t += s.idx.length / 3),
          i++);
      }
      for (let r of this.extra) {
        (e.add(r), i++);
        let s = r.geometry;
        if (!s && r.children) for (let c of r.children) c.geometry && (s = c.geometry);
        let k = s && s.index ? s.index.count / 3 : s && s.attributes.position ? s.attributes.position.count / 3 : 0;
        t += k;
        this.lastBatches["extra:" + (r.name || r.type)] = (this.lastBatches["extra:" + (r.name || r.type)] || 0) + k;
      }
      return (
        (this.batches = {}),
        (this.extra = []),
        {
          tris: t,
          draws: i,
        }
      );
    }
  };
function Ca(n, e = "#d9fbff", t = "#101c38", i = 512, r = 128, s) {
  if (!Ef) return null;
  let a = document.createElement("canvas");
  ((a.width = i), (a.height = r));
  let o = a.getContext("2d");
  ((o.fillStyle = t),
    o.fillRect(0, 0, i, r),
    (o.strokeStyle = e),
    (o.lineWidth = Math.max(3, r * 0.035)),
    o.strokeRect(o.lineWidth, o.lineWidth, i - o.lineWidth * 2, r - o.lineWidth * 2),
    (o.fillStyle = e),
    (o.textAlign = "center"),
    (o.textBaseline = "middle"),
    (o.font = s || "900 " + Math.floor(r * 0.52) + "px Arial, sans-serif"),
    o.fillText(n, i / 2, r * 0.54, i * 0.88));
  let c = new CanvasTexture(a);
  return ((c.colorSpace = Ft), (c.anisotropy = 4), c);
}
function Ra(n, e, t = !0) {
  if (!n) return null;
  let i = new kr(
    new MeshBasicMaterial({
      map: n,
      side: t ? ii : Ni,
      transparent: !1,
    }),
  );
  for (let r of e)
    (pr.set(r.rx || 0, r.ry || 0, r.rz || 0),
      dr.setFromEuler(pr),
      ur.compose(pi.set(r.x, r.y, r.z), dr, new Vector3(r.w, r.h, 1)),
      i.add(wl("plane"), ur, 16777215));
  return i.mesh();
}
var Pu = class {
  constructor(e, t = {}) {
    ((this.index = e),
      (this.track = Li[e]),
      (this.quality = t.quality === "low" ? "low" : t.quality === "medium" ? "medium" : "high"),
      (this.detail =
        t.detail !== void 0 ? t.detail : this.quality === "low" ? ff : this.quality === "medium" ? 0.72 : 1),
      (this.lod = g1[this.quality]),
      (this.meshSegments = Xt / this.lod.barrier),
      (this.group = new Group()),
      (this.group.name = "circuit:" + this.track.name),
      (this.stats = {
        triangles: 0,
        draws: 0,
        parts: {},
      }),
      this.buildSpine(),
      this.buildRaceLine(),
      (this._anims = []),
      this.buildSurface(),
      this.buildBarrier(),
      this.buildMarkings(),
      this.buildGantry(),
      this.buildScenery());
  }
  buildSpine() {
    let e = Array.from(
      {
        length: 48,
      },
      (t, i) => {
        let r = Ya(this.track, i / 48);
        return new Vector3(r.x, r.y, r.z);
      },
    );
    ((this.curve = new CatmullRomCurve3(e, !0, "catmullrom", 0.5)),
      (this.curve.arcLengthDivisions = 1500),
      (this.length = this.curve.getLength()),
      (this.frames = Array.from(
        {
          length: Xt + 1,
        },
        (t, i) => {
          let r = i / Xt,
            s = this.curve.getPointAt(r),
            a = this.curve.getTangentAt(r).normalize();
          return {
            p: s,
            v: a,
            right: v1(a),
          };
        },
      )),
      (this.baseY = this.frames.reduce((t, i) => Math.min(t, i.p.y), 1 / 0)),
      (this.decimate = (t) => (t < 2 ? this.frames : this.frames.filter((i, r) => r % t === 0 || r === Xt))),
      (this.curveAt = new Float32Array(Xt + 1)));
    for (let t = 0; t <= Xt; t++) {
      let i = this.frames[(t - 1 + Xt) % Xt].v,
        r = this.frames[(t + 1) % Xt].v;
      this.curveAt[t] = x1(i, r, (this.length * 2) / Xt);
    }
  }
  sampleAt(e, t = 0, i = 0) {
    let r = Ut(e, 1) * Xt,
      s = Math.floor(r),
      a = r - s,
      o = this.frames[s],
      c = this.frames[s + 1],
      l = o.p.clone().lerp(c.p, a),
      h = o.v.clone().lerp(c.v, a).normalize(),
      p = o.right.clone().lerp(c.right, a).normalize();
    return (
      l.addScaledVector(p, t),
      (l.y += i),
      {
        p: l,
        dir: h,
        right: p,
      }
    );
  }
  frame(e, t, i) {
    return this.sampleAt(e, t, i);
  }
  curvature(e) {
    let t = Ut(e, 1) * Xt,
      i = Math.floor(t),
      r = t - i;
    return this.curveAt[i] * (1 - r) + this.curveAt[(i + 1) % (Xt + 1)] * r;
  }
  barrierFaceAt(e, t) {
    let i = Au[this.index];
    if (!i) return Wn;
    let r = Ut(e, 1),
      s = Wn;
    for (let a of i) {
      if (a.side !== t) continue;
      let o = a.from,
        c = a.to,
        l = r;
      c < o && (l < o && (l += 1), (c += 1));
      let h = Mf((l - o) / a.blend) * Mf((c - l) / a.blend);
      h > 0 && (s = Math.max(s, Wn + (a.face - Wn) * h));
    }
    return s;
  }
  laneLimitAt(e, t, i) {
    return this.barrierFaceAt(e, t) - (i || Lu);
  }
  runoffAt(e, t) {
    let i = Au[this.index];
    if (!i) return null;
    let r = Ut(e, 1);
    for (let s of i) {
      if (s.side !== t) continue;
      let a = s.from,
        o = s.to,
        c = r;
      if ((o < a && (c < a && (c += 1), (o += 1)), c > a - s.blend && c < o + s.blend)) return s;
    }
    return null;
  }
  gripAt(e, t) {
    let i = Math.abs(t);
    if (i <= Ru) return 1;
    let r = Math.sign(t) || 1,
      s = this.runoffAt(e, r);
    if (s && i > Mn) {
      let a = La((i - Mn) / 2.4, 0, 1);
      return La(0.58 - (s.surface === "snow" ? 0.14 : 0.1) * a, 0.38, 1);
    }
    return Math.max(0.65, 1 - (i - Ru) * 0.16);
  }
  clampLane(e, t) {
    let i = Ut(e.distance, this.length) / this.length,
      r = e.lane >= 0 ? 1 : -1,
      s = this.laneLimitAt(i, r, e.halfWidth);
    if (Math.abs(e.lane) <= s) return (e.wallScrape && (e.wallScrape = Math.max(0, e.wallScrape - t * 3.2)), 0);
    let a = Math.max(0, e.lateralSpeed * r);
    return (
      (e.lane = r * s),
      a > 3.6
        ? ((e.lateralSpeed = -r * Math.min(a * 0.3, 7.5)), (e.speed *= 1 - Math.min(0.24, a * 0.0135)))
        : ((e.lateralSpeed = -r * 0.75), (e.speed -= e.speed * Math.min(0.45, t * 0.62))),
      (e.speed = Math.max(e.speed, 9)),
      (e.wallScrape = Math.min(1.4, (e.wallScrape || 0) + 0.28 + a * 0.05)),
      (e.wallSide = r),
      a
    );
  }
  // Per-circuit road finish (visual only).
  roadFinish() {
    return (
      [
        { metal: 0.5, rough: 1, ns: 0.35, env: 1.4, lane: !0 }, // wet Chicago asphalt
        { metal: 0.3, rough: 1, ns: 0.3, env: 1.8, lane: !0 }, // polished showroom tiles
        { metal: 0.16, rough: 1, ns: 0.35, env: 0.9 }, // sunny lakefront asphalt
        { metal: 0.1, rough: 1, ns: 0.4, env: 0.8, dust: 16250871 }, // snow-dusted
        { metal: 0.06, rough: 1, ns: 0.45, env: 0.6, dust: 15784874 }, // canyon dust
        { metal: 0.72, rough: 1, ns: 0.65, env: 1.3, lane: !0 }, // metal grate
      ][this.index] || { metal: 0.2, rough: 1, ns: 0.6, env: 1 }
    );
  }
  buildRaceLine() {
    // smoothed "inside of the corner" lateral offset used for tyre wear
    let raw = new Float32Array(Xt + 1),
      out = new Float32Array(Xt + 1),
      w = 26;
    for (let i = 0; i <= Xt; i++) raw[i] = La(-this.curveAt[i] * 1700, -6.5, 6.5);
    for (let i = 0; i <= Xt; i++) {
      let s = 0;
      for (let k = -w; k <= w; k++) s += raw[(i + k + Xt) % Xt];
      out[i] = s / (w * 2 + 1);
    }
    out[Xt] = out[0];
    this.raceLine = out;
  }
  buildSurface() {
    let e = this.track,
      t = this.frames,
      i = new zr(this.quality),
      fin = this.roadFinish(),
      tex = Wf_roadTextures(this.index, this.quality),
      s = new MeshStandardMaterial({
        color: e.road,
        metalness: fin.metal,
        roughness: fin.rough,
        vertexColors: !1,
        envMapIntensity: fin.env,
      });
    if (tex.map) {
      s.map = tex.map;
      if (this.quality !== "low") {
        ((s.normalMap = tex.normalMap), (s.normalScale = new Vector2(fin.ns, fin.ns)), (s.roughnessMap = tex.roughnessMap));
      } else s.roughness = 0.55;
    }
    s.side = ii;
    let o = new kr(s),
      tile = 6,
      c = this.length / tile;
    o.strip(
      t,
      () => ({ lat: -Mn, h: 0 }),
      () => ({ lat: Mn, h: 0 }),
      null,
      (C) => (C / Xt) * c,
    );
    {
      let C = o.uv;
      for (let F = 0; F < C.length; F += 2) C[F] *= (Mn * 2) / tile;
    }
    let l = o.mesh();
    ((l.name = "road"), (l.receiveShadow = !0), this.group.add(l), (this.stats.parts.road = o.idx.length / 3));

    // ---- tyre wear (multiply-blended darker lines along the racing line)
    if (this.quality !== "low") {
      let wearTex = Wf_stripTex(168, 255),
        wm = new MeshBasicMaterial({
          map: wearTex,
          blending: 4,
          transparent: !0,
          depthWrite: !1,
          polygonOffset: !0,
          polygonOffsetFactor: -1,
          polygonOffsetUnits: -2,
        }),
        wb = new kr(wm),
        d2 = this.decimate(2),
        line = (C) => this.raceLine[Math.min(Xt, C * 2)];
      for (let k of [-1.05, 1.05])
        wb.strip(
          d2,
          (C) => ({ lat: line(C) + k - 0.55, h: 0.014 }),
          (C) => ({ lat: line(C) + k + 0.55, h: 0.014 }),
          () => 16777215,
          () => 0,
        );
      let wmesh = wb.mesh();
      ((wmesh.name = "wear"), (wmesh.renderOrder = 1), this.group.add(wmesh));
      this.stats.draws += 1;
      this.stats.triangles += wb.idx.length / 3;
    }

    // ---- dust / snow drift toward the edges (alpha ramp × blotches)
    if (fin.dust && this.quality !== "low") {
      let ramp = Wf_stripTex(255, 255, !0),
        blotch = Wf_blotchTex(300 + this.index);
      let dm = new MeshBasicMaterial({
          map: blotch,
          alphaMap: ramp,
          color: fin.dust,
          transparent: !0,
          opacity: 0.82,
          depthWrite: !1,
          polygonOffset: !0,
          polygonOffsetFactor: -1,
          polygonOffsetUnits: -3,
        }),
        db = new kr(dm),
        d2 = this.decimate(2);
      for (let side of [1, -1])
        db.strip(
          d2,
          () => ({ lat: side * (Mn - 5.2), h: 0.02 }),
          () => ({ lat: side * (Mn - 0.05), h: 0.02 }),
          () => 16777215,
          (C) => (C * 2) / Xt,
        );
      {
        let C = db.uv;
        for (let F = 0; F < C.length; F += 2) ((C[F] *= 0.5), (C[F + 1] *= this.length / 9));
      }
      let dmesh = db.mesh();
      ((dmesh.name = "dust"), (dmesh.renderOrder = 2), this.group.add(dmesh));
      this.stats.draws += 1;
      this.stats.triangles += db.idx.length / 3;
    }

    // ---- curbs: rumble strips with a sawtooth profile on the corners
    let neon = this.index === 0 || this.index === 1 || this.index === 5,
      h = neon ? 5763839 : 15221583,
      p = neon ? 9061631 : 16054527,
      u = this.index === 3 ? 13623534 : this.index === 1 ? 12173522 : this.index === 4 ? 9068614 : 2897746,
      corner = (C) => {
        let F = Math.abs(this.curveAt[C]);
        return F > 0.003 ? 2 : F > 0.0018 ? 1 : 0;
      },
      f = (C) => {
        let k = corner(C);
        if (k === 2) return (C >> 1) % 2 ? h : p;
        if (k === 1) {
          let N = (C >> 1) % 2 ? h : p;
          return (C >> 2) % 2 ? N : u;
        }
        return u;
      },
      lift = (C) => (corner(C) === 2 ? ((C >> 1) % 2 ? 0.05 : 0) : 0),
      g = i.batch("curb");
    g.material = new MeshStandardMaterial({
      vertexColors: !0,
      metalness: 0.15,
      roughness: 0.55,
    });
    let y = Wn - 0.03;
    (g.strip(
      t,
      () => ({ lat: Mn, h: 0.012 }),
      (C) => ({ lat: y, h: 0.11 + lift(C) }),
      f,
    ),
      g.strip(
        t,
        (C) => ({ lat: -y, h: 0.11 + lift(C) }),
        () => ({ lat: -Mn, h: 0.012 }),
        f,
      ),
      g.strip(
        t,
        () => ({ lat: y, h: 0 }),
        (C) => ({ lat: y, h: 0.11 + lift(C) }),
        f,
      ),
      g.strip(
        t,
        (C) => ({ lat: -y, h: 0.11 + lift(C) }),
        () => ({ lat: -y, h: 0 }),
        f,
      ));
    let v = i.batch("deck"),
      d = this.decimate(this.lod.deck),
      m = this.index === 3 ? 14675707 : this.index === 4 ? 11565653 : this.index === 2 ? 10127971 : 1712950,
      x = (C) => this.barrierFaceAt(C / Xt, 1) + Pa,
      b = (C) => -(this.barrierFaceAt(C / Xt, -1) + Pa),
      w = this.lod.deck;
    (v.strip(
      d,
      (C) => ({ lat: x(C * w), h: -0.02 }),
      () => ({ lat: Sn, h: -0.35 }),
      () => m,
    ),
      v.strip(
        d,
        () => ({ lat: -Sn, h: -0.35 }),
        (C) => ({ lat: b(C * w), h: -0.02 }),
        () => m,
      ),
      this.lod.skirt &&
        (v.strip(
          d,
          () => ({ lat: Sn, h: -0.4 }),
          () => ({ lat: -Sn, h: -0.4 }),
          () => 856866,
        ),
        v.strip(
          d,
          () => ({ lat: Sn, h: -0.35 }),
          () => ({ lat: Sn, h: -2.6 }),
          () => 1317678,
        ),
        v.strip(
          d,
          () => ({ lat: -Sn, h: -2.6 }),
          () => ({ lat: -Sn, h: -0.35 }),
          () => 1317678,
        )));
    let A = i.flush(this.group);
    ((this.stats.parts.surface = A.tris),
      (this.stats.triangles += A.tris + o.idx.length / 3),
      (this.stats.draws += A.draws + 1));
  }
  buildBarrier() {
    let e = this.track,
      t = this.lod.barrier,
      i = this.decimate(t),
      r = this.meshSegments,
      s = new MeshStandardMaterial({
        vertexColors: !0,
        metalness: 0.55,
        roughness: 0.3,
      }),
      a = new kr(s),
      o = new MeshBasicMaterial({
        vertexColors: !0,
      }),
      c = new kr(o),
      l = this.index === 3 ? 9418964 : this.index === 4 ? 11830376 : this.index === 1 ? 10134973 : 8162484,
      h = this.index === 3 ? 14084599 : this.index === 4 ? 10117705 : this.index === 1 ? 15659512 : 4478332,
      p = this.index === 3 ? 4153212 : this.index === 4 ? 6109740 : this.index === 1 ? 4937072 : 1778752,
      f = ((m, x) =>
        (((((m >> 16) & 255) * x) | 0) << 16) | (((((m >> 8) & 255) * x) | 0) << 8) | (((m & 255) * x) | 0))(
        e.neon,
        0.72,
      ),
      g = () => f,
      y = 0.42;
    for (let m of [1, -1]) {
      let x = (B) => m * this.barrierFaceAt(B / r, m),
        b = (B) => m * (this.barrierFaceAt(B / r, m) + Pa),
        w = (B) => ({
          lat: x(B),
          h: 0,
        }),
        A = (B) => ({
          lat: x(B),
          h: y,
        }),
        C = (B) => ({
          lat: x(B),
          h: hr,
        }),
        F = (B) => ({
          lat: b(B),
          h: hr + 0.06,
        }),
        N = (B) => ({
          lat: b(B),
          h: -0.05,
        });
      m > 0
        ? (a.strip(i, w, A, () => p), a.strip(i, A, C, () => h), a.strip(i, C, F, () => l), a.strip(i, F, N, () => p))
        : (a.strip(i, A, w, () => p),
          a.strip(i, C, A, () => h),
          a.strip(i, F, C, () => l),
          a.strip(i, N, F, () => p));
      let G = (B) => ({
          lat: x(B) - m * 0.015,
          h: hr - 0.34,
        }),
        W = (B) => ({
          lat: x(B) - m * 0.015,
          h: hr - 0.06,
        });
      m > 0 ? c.strip(i, G, W, g) : c.strip(i, W, G, g);
    }
    if (this.lod.posts) {
      let m = Math.max(4, Math.round(7 / (this.length / Xt)));
      for (let x = 0; x < Xt; x += m)
        for (let b of [1, -1]) {
          let w = x / Xt,
            A = this.barrierFaceAt(w, b) + Pa - 0.02,
            C = this.sampleAt(w, b * A, 0);
          (pr.set(0, Math.atan2(C.dir.x, C.dir.z), 0),
            dr.setFromEuler(pr),
            ur.compose(pi.set(C.p.x, C.p.y + hr * 0.5, C.p.z), dr, new Vector3(0.34, hr + 0.5, 0.34)),
            a.add(wl("box"), ur, l));
        }
    }
    let v = a.mesh();
    ((v.name = "barrier"), (v.castShadow = !0), (v.receiveShadow = !0), this.group.add(v));
    let d = c.mesh();
    ((d.name = "barrier-stripe"),
      this.group.add(d),
      (this.barrierMesh = v),
      (this.stats.parts.barrier = (a.idx.length + c.idx.length) / 3),
      (this.stats.triangles += this.stats.parts.barrier),
      (this.stats.draws += 2));
  }
  buildMarkings() {
    let e = this.track,
      t = new zr(this.quality),
      neon = this.roadFinish().lane,
      r = Math.round(200 * La(this.detail, 0.5, 1));
    // pulsing lane-light strips on the neon circuits, painted lines elsewhere
    if (neon) {
      let lm = new MeshBasicMaterial({ vertexColors: !0 });
      t.register("lane", lm);
      let base = new Color(e.neon),
        alt = new Color(e.secondary),
        cur = new Color();
      this._anims.push((tm) => {
        let k = 0.55 + 0.45 * Math.sin(tm * 2.4);
        cur.copy(base).lerp(alt, k).multiplyScalar(0.7 + k * 0.6);
        lm.color.copy(cur);
      });
    }
    for (let u = 0; u < r; u++) {
      let f = u / r,
        g = this.sampleAt(f),
        y = Math.atan2(g.dir.x, g.dir.z);
      t.put("box", "glow", g.p.x, g.p.y + 0.03, g.p.z, 0.22, 0.02, 3.2, 14674687, 0, y, 0);
      for (let v of [-1, 1]) {
        let d = g.p.clone().addScaledVector(g.right, v * (Mn - 0.32));
        neon
          ? t.put("box", "lane", d.x, d.y + 0.035, d.z, 0.3, 0.05, (this.length / r) * 0.96, 16777215, 0, y, 0)
          : t.put("box", "glow", d.x, d.y + 0.03, d.z, 0.34, 0.02, (this.length / r) * 0.96, 12374762, 0, y, 0);
      }
    }
    let s = Au[this.index];
    if (s)
      for (let u of s) {
        let f = Ut(u.to - u.from, 1),
          g = Math.max(6, Math.round((f * Xt) / 6));
        for (let y = 0; y <= g; y++) {
          let v = Ut(u.from + (f * y) / g, 1),
            d = this.sampleAt(v),
            m = Math.atan2(d.dir.x, d.dir.z),
            x = this.barrierFaceAt(v, u.side);
          if (x <= Wn + 0.05) continue;
          let b = (Mn + x) / 2,
            w = x - Mn,
            A = d.p.clone().addScaledVector(d.right, u.side * b);
          t.put("box", "matte", A.x, A.y + 0.06, A.z, w, 0.1, ((f * this.length) / g) * 1.05, u.surface === "snow" ? 15923711 : 14201466, 0, m, 0);
        }
      }
    // painted logo decals on the straights
    if (Ef && this.quality !== "low") {
      let atlas = document.createElement("canvas");
      ((atlas.width = 512), (atlas.height = 384));
      let ctx = atlas.getContext("2d");
      ctx.clearRect(0, 0, 512, 384);
      let rows = [
        ["BLUFOX", "#5df0ff"],
        ["C\xB3", "#d96bff"],
        ["xfinity", "#ffffff"],
      ];
      rows.forEach(([txt, col], i) => {
        ((ctx.fillStyle = col),
          (ctx.textAlign = "center"),
          (ctx.textBaseline = "middle"),
          (ctx.font = "900 92px Arial, sans-serif"),
          (ctx.globalAlpha = 0.78),
          ctx.fillText(txt, 256, 64 + i * 128, 470),
          (ctx.globalAlpha = 1));
      });
      let dt = new CanvasTexture(atlas);
      ((dt.colorSpace = Ft), (dt.anisotropy = 4), (this._decalTex = dt));
      let dm = new MeshBasicMaterial({
          map: dt,
          transparent: !0,
          depthWrite: !1,
          polygonOffset: !0,
          polygonOffsetFactor: -2,
          polygonOffsetUnits: -4,
        }),
        db = new kr(dm),
        spots = [0.06, 0.3, 0.52, 0.74, 0.9];
      spots.forEach((t0, k) => {
        // slide to the straightest point within ±3% of the lap
        let best = t0,
          bc = 1;
        for (let q = -0.03; q <= 0.03; q += 0.005) {
          let c = Math.abs(this.curvature(Ut(t0 + q, 1)));
          c < bc && ((bc = c), (best = Ut(t0 + q, 1)));
        }
        let g = this.sampleAt(best, 0, 0.028),
          yaw = Math.atan2(g.dir.x, g.dir.z),
          row = k % 3,
          n0 = db.uv.length;
        (pr.set(-Math.PI / 2, yaw, 0), dr.setFromEuler(pr));
        ur.compose(pi.set(g.p.x, g.p.y, g.p.z), dr, new Vector3(10, 7.5, 1));
        db.add(wl("plane"), ur, 16777215);
        for (let q = n0; q < db.uv.length; q += 2) db.uv[q + 1] = 1 - (row + 1) / 3 + db.uv[q + 1] / 3;
      });
      let dmesh = db.mesh();
      ((dmesh.name = "decals"), (dmesh.renderOrder = 3), t.mesh(dmesh));
    }
    let a = [],
      o = [],
      c = (this._cornerTex = Ca("›  ›  ›", "#e2feff", "#122340", 384, 128)),
      l = (this._cornerTexL = Ca("‹  ‹  ‹", "#e2feff", "#122340", 384, 128)),
      h = Math.round(26 * La(this.detail, 0.5, 1));
    for (let u = 0; u < h; u++) {
      let f = u / h,
        g = this.curvature(f);
      if (Math.abs(g) < 0.0022) continue;
      let y = g > 0 ? -1 : 1,
        v = this.sampleAt(f, y * (Wn + 2.6), 2.5),
        d = Math.atan2(v.dir.x, v.dir.z) + Math.PI;
      ((g > 0 ? a : o).push({ x: v.p.x, y: v.p.y, z: v.p.z, w: 6.4, h: 2.1, ry: d }),
        t.put("box", "matte", v.p.x, v.p.y - 1.55, v.p.z, 0.22, 1.9, 0.22, 3819103, 0, d, 0));
    }
    (c && a.length && t.mesh(Ra(c, a)), l && o.length && t.mesh(Ra(l, o)));
    let p = t.flush(this.group);
    ((this.stats.parts.markings = p.tris), (this.stats.triangles += p.tris), (this.stats.draws += p.draws));
  }
  buildGantry() {
    let e = this.track,
      t = new zr(this.quality),
      i = new zr(this.quality),
      r = 1450044,
      s = Wn + 0.9,
      a = (f, g, y, v, d, m, x, b) => t.put("box", b || "gloss", f, g, y, v, d, m, x, 0, 0, 0);
    for (let f of [-1, 1])
      (a(f * s, 5.2, 0, 1.5, 10.4, 1.8, r),
        a(f * s, 10.6, 0, 2.2, 0.7, 2.4, r),
        t.put("box", "glow", f * (s - 0.82), 5.2, 0.95, 0.14, 9.4, 0.12, e.neon, 0, 0, 0),
        t.put("box", "glow", f * (s - 0.82), 5.2, -0.95, 0.14, 9.4, 0.12, e.secondary, 0, 0, 0),
        a(f * (s + 1.1), 1.3, 0, 1.1, 2.6, 3.4, 2108488),
        // truss diagonals
        t.put("box", "gloss", f * s, 8.6, 0, 0.9, 0.14, 2.6, 8421504, 0.7, 0, 0),
        t.put("box", "gloss", f * s, 3.2, 0, 0.9, 0.14, 2.6, 8421504, -0.7, 0, 0));
    (a(0, 11.35, 0, s * 2 + 2.4, 1.5, 1.9, r),
      a(0, 12.4, 0, s * 2, 0.35, 2.2, 2767455),
      t.put("box", "glow", 0, 10.5, 1, s * 2, 0.12, 0.1, e.neon, 0, 0, 0),
      t.put("box", "glow", 0, 10.5, -1, s * 2, 0.12, 0.1, e.secondary, 0, 0, 0));
    // spot lamps hanging under the beam
    for (let k = -3; k <= 3; k++) {
      t.put("box", "gloss", k * 3.6, 10.3, 0, 0.5, 0.5, 0.6, 3552822, 0, 0, 0);
      t.put("box", "glow", k * 3.6, 10.02, 0, 0.42, 0.08, 0.5, 16774096, 0, 0, 0);
    }
    let o = (this._bannerTex = Ca("BLUFOX   OVERDRIVE", "#d9fbff", "#122a52", 1024, 192));
    o &&
      t.mesh(
        Ra(o, [
          { x: 0, y: 11.35, z: 1.05, w: s * 2, h: 2.1 },
          { x: 0, y: 11.35, z: -1.05, w: s * 2, h: 2.1, ry: Math.PI },
        ]),
      );
    // big screen above the gantry
    let scr = (this._screenTex = this.quality === "low" ? null : Wf_screenTex("BLUFOX", "OVERDRIVE  \xB7  " + e.name.toUpperCase(), "#5df0ff"));
    if (scr) {
      (a(0, 16.2, 0, 13.4, 7.2, 0.9, 1450044), a(0, 12.9, 0, 2.2, 1.4, 1.2, 2767455));
      t.put("box", "glow", 0, 16.2, 0.5, 13, 0.1, 0.1, e.neon, 0, 0, 0);
      t.mesh(
        Ra(scr, [
          { x: 0, y: 16.2, z: 0.5, w: 12.6, h: 6.6 },
          { x: 0, y: 16.2, z: -0.5, w: 12.6, h: 6.6, ry: Math.PI },
        ]),
      );
    }
    // start lights: five lamps, red during the countdown, green at go
    {
      let lm = new MeshBasicMaterial({ color: 2236962 }),
        lb = new kr(lm);
      for (let k = -2; k <= 2; k++) {
        ur.compose(pi.set(k * 1.1, 9.35, 0), dr.set(0, 0, 0, 1), new Vector3(0.7, 0.7, 0.7));
        lb.add(wl("ballLow"), ur, 16777215);
      }
      t.put("box", "gloss", 0, 9.35, 0, 6.2, 1, 0.5, 2236962, 0, 0, 0);
      t.mesh(lb.mesh());
      let red = new Color(16719904),
        green = new Color(4521864),
        off = new Color(2236962);
      this._anims.push((tm, dt, ctx) => {
        let race = ctx && ctx.race,
          cd = race && typeof race.countdown == "number" ? race.countdown : 0;
        if (cd > 0) lm.color.copy(red).multiplyScalar(Math.floor(cd * 2) % 2 ? 1 : 0.55);
        else {
          let goT = race && race.time !== void 0 ? race.time : 9;
          lm.color.copy(goT < 2.5 ? green : off);
        }
      });
    }
    let c = new Group(),
      l = this.sampleAt(0);
    (c.position.copy(l.p), (c.rotation.y = Math.atan2(l.dir.x, l.dir.z)));
    let h = t.flush(c);
    (this.group.add(c), (this.stats.parts.gantry = h.tris), (this.stats.triangles += h.tris), (this.stats.draws += h.draws));
    let p = (this._bandTex = Ca("BLUFOX MOBILE  \xB7  C\xB3  \xB7  CONNECTED TO WIN", "#bff2ff", "#2a1a55", 1024, 96));
    if (p) {
      let f = [];
      for (let y = 0; y < 15; y++) {
        let v = Ut(0.955 + y * 0.0058, 1),
          d = this.sampleAt(v),
          m = Math.atan2(d.dir.x, d.dir.z);
        for (let x of [-1, 1]) {
          let b = d.p.clone().addScaledVector(d.right, x * (this.barrierFaceAt(v, x) - 0.04));
          f.push({ x: b.x, y: b.y + 0.68, z: b.z, w: this.length * 0.0058 * 1.04, h: 0.66, ry: m + (x * Math.PI) / 2 });
        }
      }
      i.mesh(Ra(p, f));
    }
    for (let f = 0; f < 12; f++)
      for (let g = 0; g < 3; g++) {
        let y = this.sampleAt((g * 1.9) / this.length, f * 2 - 11, 0.035);
        i.put("box", "glow", y.p.x, y.p.y, y.p.z, 2, 0.03, 1.9, (f + g) % 2 ? 857382 : 15661055, 0, Math.atan2(y.dir.x, y.dir.z), 0);
      }
    for (let f = 0; f < 8; f++) {
      let g = this.sampleAt(Ut(-(7 + (f >> 1) * 7.5) / this.length, 1), (f % 2 ? 1 : -1) * 4.6, 0.035);
      i.put("box", "glow", g.p.x, g.p.y, g.p.z, 3.2, 0.03, 0.16, 14412287, 0, Math.atan2(g.dir.x, g.dir.z), 0);
    }
    let u = i.flush(this.group);
    ((this.stats.triangles += u.tris), (this.stats.draws += u.draws));
  }
  buildScenery() {
    let e = new zr(this.quality),
      t = {
        shop: e,
        world: this,
        track: this.track,
        index: this.index,
        length: this.length,
        frames: this.frames,
        detail: this.detail,
        quality: this.quality,
        metrics: Tl,
        baseY: this.baseY,
        rand: Sf(this.track.seed + 7),
        sample: (r, s, a) => this.sampleAt(r, s, a),
        curvature: (r) => this.curvature(r),
        barrierFaceAt: (r, s) => this.barrierFaceAt(r, s),
        signTexture: Ca,
        signBoard: Ra,
        put: (...r) => e.put(...r),
        mesh: (r) => e.mesh(r),
        anim: (r) => this._anims.push(r),
        group: this.group,
      };
    bf(this.index, t);
    let i = e.flush(this.group);
    ((this.stats.parts.scenery = i.tris), (this.stats.batches = e.lastBatches), (this.stats.triangles += i.tris), (this.stats.draws += i.draws));
  }
  contactPoint(e) {
    let t = Ut(e.distance, this.length) / this.length,
      i = e.wallSide || (e.lane >= 0 ? 1 : -1);
    return this.sampleAt(t, i * (this.barrierFaceAt(t, i) - 0.12), 0.55);
  }
  measureBarrier(e, t) {
    let i = this.barrierMesh.geometry,
      r = i.attributes.position.array,
      s = this.sampleAt(e),
      a = 1 / 0,
      o = s.p.x,
      c = s.p.y,
      l = s.p.z,
      h = s.right.x,
      p = s.right.z,
      u = s.dir.x,
      f = s.dir.z,
      g = Math.hypot(u, f) || 1;
    ((u /= g), (f /= g));
    let y = (this.length / this.meshSegments) * 0.45;
    for (let v = 0; v < r.length; v += 3) {
      let d = r[v] - o,
        m = r[v + 1] - c,
        x = r[v + 2] - l;
      if (Math.abs(d * u + x * f) > y || m < 0.02 || m > hr + 0.5) continue;
      let b = d * h + x * p;
      if (b * t <= 0 || Math.abs(b) > Sn + 4) continue;
      let w = Math.abs(b);
      w < a && (a = w);
    }
    return a;
  }
  dispose() {
    let e = new Set(),
      t = new Set(),
      i = new Set();
    (this.group.traverse((r) => {
      if ((r.geometry && e.add(r.geometry), r.material))
        for (let s of Array.isArray(r.material) ? r.material : [r.material]) {
          t.add(s);
          for (let a of ["map", "emissiveMap", "alphaMap", "normalMap", "roughnessMap"]) s[a] && i.add(s[a]);
        }
    }),
      e.forEach((r) => r.dispose()),
      t.forEach((r) => r.dispose()),
      i.forEach((r) => r.dispose()),
      (this._anims = []),
      this.group.clear());
  }
};
var Wf_noShadow = new Set(["glow", "haze", "glass", "pool", "fence", "water", "ribbon", "decal", "lane", "sky", "holo", "crystal"]),
  Wf_castShadow = new Set(["matte", "gloss", "stone", "crowd", "rockband", "wood", "ice"]);
// World animation: one frame hook for every circuit (rotating wheels, cable
// cars, blinking masts, waving flags, bobbing crowd, start lights...).  Each
// TrackWorld keeps its own list in _anims; trackDispose/dispose clear it.
BFX_HOOKS.on("frame", (ctx) => {
  let w = ctx && ctx.engine && ctx.engine.trackWorld;
  if (!w) return;
  let t = ctx.time || 0,
    dt = ctx.dt || 0.016;
  Wf.time.value = t;
  let a = w._anims;
  if (a) for (let i = 0; i < a.length; i++) a[i](t, dt, ctx);
});
BFX_HOOKS.on("trackDispose", (ctx) => {
  let w = ctx && ctx.engine && ctx.engine.trackWorld;
  w && (w._anims = []);
});
function Af(n, e = {}) {
  return new Pu(n | 0, e);
}
var Iu = new Set([1, 2, 3]),
  Cf = [0.3, 0.115, 0.55, 0.3, 0.285, 0.62],
  Rf = [10.5, 10.5, 10.5, 10.5, 9.2, 10.5],
  Pf = 0.12,
  Ia = 120;
function _1(n) {
  let e = new Set(),
    t = new Set(),
    i = new Set();
  (n.traverse((r) => {
    if (
      (r.shadow && r.shadow.map && (r.shadow.map.dispose(), (r.shadow.map = null)),
      r.geometry && e.add(r.geometry),
      r.material)
    )
      for (let s of Array.isArray(r.material) ? r.material : [r.material]) {
        t.add(s);
        for (let a of ["map", "emissiveMap", "alphaMap"]) s[a] && i.add(s[a]);
      }
  }),
    e.forEach((r) => r.dispose()),
    t.forEach((r) => r.dispose()),
    i.forEach((r) => r.dispose()));
}
