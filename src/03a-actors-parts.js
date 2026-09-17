// ---- KARTS v3: kart builder + animator. `Mu`/`pf` are function declarations that the de-minified
// split left in 04-world.js; all files share one IIFE scope, so re-binding them here (below) makes the
// engine/game use these versions without touching another agent's file. Same signature, same userData.
function kartBuild(n, e = {}) {
  let t = ki[n % ki.length],
    i = e.detail === "low" ? "low" : "high",
    r = e1[i],
    s = df[n % df.length],
    tier = typeof xu == "function" ? xu() : null,
    phys = i === "high" && tier !== "medium",
    a = t1(t, phys),
    o = new Group();
  o.name = "kart:" + t.name;
  let c = new Group();
  o.add(c);
  // chassis (+ driver body on low detail)
  let l = new Hn();
  s.body.call(s, l, r);
  // plate must sit on the outside of the rear bodywork: push it to the chassis' rearmost face
  let bb = l.bounds(),
    pz = Math.min(s.plate[2], bb.min.z - 0.03),
    sp = Object.assign({}, s, { plate: [s.plate[0], s.plate[1], pz] });
  if (pz < s.plate[2] - 0.02) {
    let gd = s.plate[2] - pz + 0.1;
    l.add(k.rbox(0.96, 0.5, gd, 0.04, r.rbs), D.CARBON, [s.plate[0], s.plate[1], pz + 0.025 + gd / 2]);
  }
  dressKart(l, r, sp);
  let drv = r.driverMesh ? new Hn() : l;
  i1(drv, r, s);
  let h = new Mesh(l.build(), a);
  ((h.name = "chassis"), (h.castShadow = !0), (h.receiveShadow = !0), c.add(h));
  // driver rig (leans into corners / drifts)
  let dr = new Group();
  (dr.position.set(0, s.seatY, s.seatZ), c.add(dr));
  if (r.driverMesh) {
    let W = new Matrix4().makeTranslation(0, -s.seatY, -s.seatZ);
    drv.parts.forEach(($) => $.m.premultiply(W));
    let dm = new Mesh(drv.build(), a);
    ((dm.name = "driver"), (dm.castShadow = !0), (dm.receiveShadow = !0), dr.add(dm));
  }
  // head rig hangs off the driver rig so it inherits the lean
  let p = new Group();
  (p.position.set(0, s.headY - s.seatY, s.headZ - s.seatZ), dr.add(p));
  let u = new Group();
  p.add(u);
  let f = new Mesh(n1(t, r, s).build(), a);
  ((f.name = "head"), (f.castShadow = !0), (f.receiveShadow = !0), u.add(f));
  let g = null;
  if (r.tail) {
    ((g = new Group()), g.position.set(s.tail[0], s.tail[1], s.tail[2]), c.add(g));
    let G = new Mesh(hf(r, s).build(), a);
    ((G.name = "tail"), (G.castShadow = !0), g.add(G));
  } else {
    let G = hf(r, s),
      W = new Matrix4().makeTranslation(s.tail[0], s.tail[1], s.tail[2]);
    G.parts.forEach(($) => $.m.premultiply(W));
    let B = new Mesh(G.build(), a);
    ((B.castShadow = !0), c.add(B));
  }
  let y = { knobbly: !!s.knobbly, wall: !!s.wall },
    v = [],
    d = [];
  for (let G of [-1, 1]) {
    let W = new Group();
    (W.position.set(G * s.track, s.fw.r, s.fz), (W.userData.y0 = W.position.y), o.add(W));
    let B = new Group();
    W.add(B);
    let $ = new Hn();
    _l($, 0, s.fw.r, s.fw.w, r, Object.assign({ out: G }, y));
    let Z = new Mesh($.build(), a);
    ((Z.name = "front"), (Z.castShadow = !0), (Z.receiveShadow = !0), B.add(Z), v.push(W), d.push(B));
  }
  let m = new Group();
  (m.position.set(0, s.rw.r, s.rz), o.add(m));
  {
    let G = new Hn();
    if (s.dualRear)
      for (let B of [-1, 1])
        (_l(G, B * (s.track - s.dualRear * 0.5), s.rw.r, s.rw.w, r, y), _l(G, B * (s.track + s.dualRear * 0.5), s.rw.r, s.rw.w, r, y));
    else for (let B of [-1, 1]) _l(G, B * s.track, s.rw.r, s.rw.w, r, y);
    let W = new Mesh(G.build(), a);
    ((W.name = "rear"), (W.castShadow = !0), (W.receiveShadow = !0), m.add(W));
  }
  d.push(m);
  // glass dome (bubble cruiser)
  let x = null;
  if (s.dome && r.extras) {
    let G = new MeshStandardMaterial({
      color: 14217983,
      transparent: !0,
      opacity: 0.26,
      roughness: 0.03,
      metalness: 0.2,
      side: Ni,
      depthWrite: !1,
      envMapIntensity: 3,
    });
    ((x = new Mesh(new SphereGeometry(1, 22, 12, 0, ft * 2, 0, ft * 0.6), G)),
      x.position.set(0, s.dome.y, s.dome.z),
      x.scale.set(s.dome.r[0], s.dome.r[1], s.dome.r[2]),
      (x.renderOrder = 2),
      c.add(x));
  }
  // number plate (rear) + nose roundel + wing decal: one mesh, one canvas texture
  let b = null;
  if (r.plate && typeof document != "undefined") {
    let G = plateTex("0" + (n + 1), t.name, wa(t.accent, 0.5)),
      P = new Hn(),
      pg = k.plane(0.84, 0.42);
    P.add(pg, null, [sp.plate[0], sp.plate[1], sp.plate[2] - 0.01], [0, ft, 0]);
    P.add(k.plane(0.5, 0.25), null, [0, s.plate[1] * 0.92 + 0.28, s.fz + 0.62], [-0.9, 0, 0]);
    ((b = new Mesh(P.build(), new MeshStandardMaterial({ map: G, roughness: 0.35, metalness: 0.2, envMapIntensity: 0.8 }))),
      (b.castShadow = !1),
      (b.name = "plate"),
      c.add(b));
  }
  let w = a1(s, wa(t.accent, 0.55));
  c.add(w);
  // shield bubble
  let A = s1(),
    C = new Mesh(
      new SphereGeometry(2.05, 20, 14),
      new MeshBasicMaterial({ color: 8251647, map: A, transparent: !0, opacity: 0.17, blending: nn, depthWrite: !1, side: ii, toneMapped: !1 }),
    );
  ((C.position.y = 1.15), C.scale.set(1, 0.92, 1.06), (C.visible = !1), (C.renderOrder = 3), o.add(C));
  // contact shadow blob
  let F = of(i === "low" ? 64 : 128),
    N = new Mesh(new PlaneGeometry(s.shadow[0], s.shadow[1]), new MeshBasicMaterial({ color: 16777215, map: F, transparent: !0, opacity: 0.7, depthWrite: !1, toneMapped: !1 }));
  ((N.rotation.x = -ft / 2), (N.position.y = 0.035), (N.renderOrder = -1), o.add(N));
  // underglow in the driver accent colour (additive, sits just above the shadow blob)
  let U = null;
  if (r.glow) {
    let gt = glowTex(64);
    U = new Mesh(
      new PlaneGeometry(s.track * 3.1, (s.fz - s.rz) * 1.9),
      new MeshBasicMaterial({ color: wa(t.accent, 0.5), map: gt, transparent: !0, opacity: 0.8, blending: nn, depthWrite: !1, toneMapped: !1 }),
    );
    ((U.rotation.x = -ft / 2), (U.position.set(0, 0.06, (s.fz + s.rz) / 2)), (U.renderOrder = 0), o.add(U));
  }
  return (
    (o.userData = {
      head: p,
      flame: w,
      shield: C,
      wheels: d,
      rig: {
        chassis: c,
        driverRig: dr,
        headRig: u,
        tailRig: g,
        steer: v,
        shadow: N,
        plate: b,
        glass: x,
        glow: U,
        wheels: d,
        flameCore: w.userData.core,
        tailGlow: 0,
        exGlow: 0,
      },
      anim: { t: Math.random() * 10, spin: 0, steer: 0, lean: 0, pitch: 0, speed: 0, prevSpeed: 0, accel: 0, boost: 0, drift: 0, air: 0, bob: 0, wheelR: s.rw.r },
      driverId: n,
      detail: i,
      archetype: Qg[n % 8],
      palette: a,
      extraMaterials: [w.children[0].material, w.children[1].material, C.material, N.material, b && b.material, x && x.material, U && U.material].filter(Boolean),
    }),
    o
  );
}
var KART_VMAX = 56;
function kartAnimate(n, e, t) {
  let i = n && n.userData;
  if (!i || !i.rig || !i.anim) return;
  let r = i.anim,
    s = i.rig,
    a = e || {};
  ((t = typeof t == "number" && t > 0 && t < 0.25 ? t : 0.016), (r.t += t));
  let o = Math.max(0, +a.speed || 0),
    c = ni(a.speedN !== void 0 ? +a.speedN : o / KART_VMAX, 0, 1.4),
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
  // chassis roll (steer + drift) and pitch (accel, air, boost squat)
  let y = -r.steer * 0.105 - r.drift * p * 0.085;
  r.lean = Vn(r.lean, y, 14, t);
  let v = -r.accel * 0.045 + r.air * 0.09 - r.boost * 0.05;
  ((r.pitch = Vn(r.pitch, v, 9, t)), (s.chassis.rotation.z = r.lean), (s.chassis.rotation.x = r.pitch));
  let d = Math.sin(r.t * 7.5 + i.driverId) * 0.011 * (0.35 + r.speed) + Math.sin(r.t * 19.3) * 0.004 * r.speed;
  ((s.chassis.position.y = d - r.air * 0.05 - Math.max(0, r.accel) * 0.02 - r.boost * 0.045), (s.chassis.position.x = r.lean * 0.1));
  // wheels roll, fronts steer
  let m = ni(o / (r.wheelR || 0.5), 0, 42);
  r.spin = (r.spin + m * t * (1 - r.air * 0.7)) % (ft * 2);
  for (let A of s.wheels) A.rotation.x = r.spin;
  let x = r.steer * 0.4 - r.drift * p * 0.26;
  for (let A of s.steer) ((A.rotation.y = x), (A.position.y = (A.userData.y0 || A.position.y) + r.air * 0.05));
  // driver leans into corners / drifts and bobs with speed; head turns further
  if (s.driverRig) {
    let dz = -r.steer * 0.16 - r.drift * p * 0.3,
      dy = r.steer * 0.12 + r.drift * p * 0.18;
    ((s.driverRig.rotation.z = Vn(s.driverRig.rotation.z, dz, 8, t)),
      (s.driverRig.rotation.y = Vn(s.driverRig.rotation.y, dy, 8, t)),
      (s.driverRig.rotation.x = -r.boost * 0.08 + Math.sin(r.t * 5.2 + i.driverId) * 0.012 * r.speed),
      (s.driverRig.position.y = Math.sin(r.t * 13 + i.driverId * 2) * 0.012 * r.speed));
  }
  ((s.headRig.rotation.y = r.steer * 0.36 + r.drift * p * 0.34),
    (s.headRig.rotation.z = -r.steer * 0.12 - r.drift * p * 0.1),
    (s.headRig.rotation.x = -r.speed * 0.05 + Math.sin(r.t * 2.1 + i.driverId) * 0.022));
  s.tailRig &&
    ((s.tailRig.rotation.x = -0.05 + r.speed * 0.55 - r.air * 0.25),
    (s.tailRig.rotation.y = Math.sin(r.t * (3 + r.speed * 6)) * (0.14 + r.speed * 0.16) - r.steer * 0.3),
    (s.tailRig.rotation.z = Math.sin(r.t * 4.3 + 1.1) * 0.07));
  // exhaust flame
  let b = i.flame;
  if (r.boost > 0.02) {
    b.visible = !0;
    let A = 0.86 + Math.sin(r.t * 47) * 0.09 + Math.sin(r.t * 91.7) * 0.06;
    (b.scale.set(1, 1, (0.18 + r.boost * 0.92) * A), (b.children[0].material.opacity = 0.22 + r.boost * 0.66), (b.children[1].material.opacity = 0.18 + r.boost * 0.78));
  } else b.visible && (b.visible = !1);
  // tail lights brighten on brake/decel and while drifting; exhaust tips glow on boost (palette texel updates)
  let brake = ni(-r.accel * 2.2, 0, 1) * (r.speed > 0.05 ? 1 : 0) + r.drift * 0.6,
    tg = ni(0.8 + brake * 1.3 + (a.brake ? 1 : 0), 0.8, 2.4);
  Math.abs(tg - s.tailGlow) > 0.04 && ((s.tailGlow = tg), paletteGlow(i.palette, D.TAILLAMP, tg));
  let eg = r.boost * (0.75 + Math.sin(r.t * 31) * 0.25);
  Math.abs(eg - s.exGlow) > 0.05 && ((s.exGlow = eg), paletteGlow(i.palette, D.EXHAUST, eg * 1.6));
  // shield bubble
  let w = i.shield;
  if (w.visible) {
    let A = 1 + Math.sin(r.t * 3.4) * 0.035;
    (w.scale.set(A, 0.92 * A, 1.06 * A), (w.rotation.y = r.t * 0.55), (w.rotation.x = Math.sin(r.t * 0.7) * 0.12), w.material.map && ((w.material.map.offset.x = r.t * 0.06), (w.material.map.offset.y = -r.t * 0.03)));
  }
  if (s.shadow) {
    let A = 1 - r.air * 0.28;
    (s.shadow.scale.set(A, A, 1), (s.shadow.material.opacity = 0.7 * (1 - r.air * 0.45)));
  }
  if (s.glow) {
    let A = 1 + r.boost * 0.35 + Math.sin(r.t * 9) * 0.03;
    (s.glow.scale.set(A, A, 1), (s.glow.material.opacity = (0.62 + r.boost * 0.38) * (1 - r.air * 0.6)), (s.glow.position.y = 0.06 + r.air * 0.02));
  }
}
// re-bind the shared names (see note at top of file)
Mu = kartBuild;
pf = kartAnimate;

// ---- KARTS debug lab (window.__kartlab) — used by scratch/kartlab.js to shoot a contact sheet
// of all eight karts with the garage/portrait camera and report half width, triangles and draw calls.
typeof window != "undefined" &&
  (window.__kartlab = {
    stats(o) {
      let tris = 0,
        parts = {},
        draws = 0,
        trisAll = 0,
        drawsAll = 0;
      o.updateWorldMatrix(!0, !0);
      o.traverse((m) => {
        if (!m.isMesh || !m.geometry) return;
        let t = (m.geometry.index ? m.geometry.index.count : m.geometry.attributes.position.count) / 3,
          vis = !0;
        for (let p = m; p; p = p.parent) if (p.visible === !1) vis = !1;
        trisAll += t;
        drawsAll++;
        vis && ((tris += t), draws++, (parts[m.name || "?"] = (parts[m.name || "?"] || 0) + Math.round(t)));
      });
      return { w1: +w1(o).toFixed(3), tris: Math.round(tris), draws, trisAll: Math.round(trisAll), drawsAll, parts };
    },
    run({ detail = "high", anim = !1, W = 1600, H = 900, eng, tw = 600, th = 500, fov = 33, cam, look }) {
      let e = new Scene();
      e.environment = eng.environmentTarget.texture;
      e.add(new HemisphereLight(12184063, 2303047, 2.2));
      let t = new DirectionalLight(16777215, 3.1);
      t.position.set(4, 7, 5);
      e.add(t);
      let i = new DirectionalLight(8877311, 2.2);
      i.position.set(-5, 3, -5);
      e.add(i);
      let r = new PerspectiveCamera(fov, tw / th, 0.1, 100);
      cam ? r.position.set(cam[0], cam[1], cam[2]) : r.position.set(6, 4.1, 8);
      look ? r.lookAt(look[0], look[1], look[2]) : r.lookAt(0, 1.2, 0);
      let R = eng.renderer,
        pr = R.getPixelRatio(),
        tm = R.toneMapping,
        ex = R.toneMappingExposure;
      R.toneMapping = cl;
      R.toneMappingExposure = 1.05;
      R.setPixelRatio(1);
      R.setSize(tw, th, !1);
      R.setClearColor(657930, 1);
      let sheet = document.createElement("canvas");
      sheet.width = tw * 4;
      sheet.height = th * 2;
      let cx = sheet.getContext("2d"),
        out = [];
      for (let l = 0; l < 8; l++) {
        let h = Mu(l, { detail });
        e.add(h);
        if (anim) {
          let st = { speed: 46, speedN: 0.82, steer: -0.9, drift: 1, driftDir: -1, boost: 1, airborne: !1 };
          for (let q = 0; q < 90; q++) pf(h, st, 1 / 60);
          h.userData.shield && (h.userData.shield.visible = l === 3);
        }
        R.render(e, r);
        cx.drawImage(R.domElement, (l % 4) * tw, Math.floor(l / 4) * th);
        out.push(Object.assign({ i: l, name: h.name }, this.stats(h)));
        e.remove(h);
        Su(h);
      }
      R.setClearColor(0, 1);
      R.toneMapping = tm;
      R.toneMappingExposure = ex;
      R.setPixelRatio(pr);
      eng.resize();
      let img = document.getElementById("__kartlab_img") || document.createElement("img");
      img.id = "__kartlab_img";
      img.src = sheet.toDataURL("image/png");
      Object.assign(img.style, { position: "fixed", left: 0, top: 0, width: W + "px", height: H + "px", zIndex: 99999, objectFit: "contain", background: "#0a0a12" });
      document.body.appendChild(img);
      return out;
    },
  });
