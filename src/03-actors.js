var ni = (n, e, t) => (n < e ? e : n > t ? t : n);
function Ls(n) {
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}
function rf(n) {
  return (
    (Math.round(ni(n[0], 0, 1) * 255) << 16) |
    (Math.round(ni(n[1], 0, 1) * 255) << 8) |
    Math.round(ni(n[2], 0, 1) * 255)
  );
}
function sf(n, e, t) {
  let i = Ls(n),
    r = Ls(e);
  return rf([i[0] + (r[0] - i[0]) * t, i[1] + (r[1] - i[1]) * t, i[2] + (r[2] - i[2]) * t]);
}
var Fr = (n, e) => sf(n, 16777215, e),
  yl = (n, e) => sf(n, 0, e);
function bu(n) {
  let e = Ls(n);
  return 0.2126 * e[0] + 0.7152 * e[1] + 0.0722 * e[2];
}
function wa(n, e) {
  let t = bu(n);
  return t >= e ? n : Fr(n, ni((e - t) / (1 - t + 1e-4), 0, 0.8));
}
function Is(n, e) {
  let t = Ls(n),
    i = 0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2];
  return rf([i + (t[0] - i) * e, i + (t[1] - i) * e, i + (t[2] - i) * e]);
}
var ar = 16,
  Ps = 8,
  xl = {},
  Jp = [];
function Zg(n) {
  return ((xl[n] = Jp.length), Jp.push(n), xl[n]);
}
[
  "PAINT",
  "PAINT_DEEP",
  "PAINT_LIGHT",
  "ACCENT",
  "ACCENT_DIM",
  "ACCENT_EDGE",
  "CARBON",
  "CARBON_LIGHT",
  "RUBBER",
  "RUBBER_WALL",
  "CHROME",
  "CHROME_DARK",
  "GOLD",
  "WHITE",
  "LENS",
  "SEAT",
  "LAMP",
  "TAILLAMP",
  "FUR",
  "FUR_DEEP",
  "FUR_LIGHT",
  "EAR_INNER",
  "EYE",
  "EYE_GLINT",
  "NOSE",
  "TRIM_WARM",
  "GRID",
  // v3 additions
  "IRIS",
  "PUPIL",
  "GLOVE",
  "SUIT",
  "SUIT_DEEP",
  "EXHAUST",
  "MOUTH",
  "TEETH",
  "BROW",
  "PAINT_TWO",
  "LAMP_HOUSING",
  "GLOW",
].forEach(Zg);
function Kg(n) {
  return [((n % ar) + 0.5) / ar, (Math.floor(n / ar) + 0.5) / Ps];
}
function _u(n, e) {
  let t = new DataTexture(n, ar, Ps, RGBAFormat, UnsignedByteType);
  return (
    (t.magFilter = NearestFilter),
    (t.minFilter = NearestFilter),
    (t.generateMipmaps = !1),
    (t.wrapS = t.wrapT = ClampToEdgeWrapping),
    (t.colorSpace = e ? Ft : er),
    (t.needsUpdate = !0),
    t
  );
}
function af(n, e = {}) {
  let t = new Uint8Array(ar * Ps * 4),
    i = new Uint8Array(ar * Ps * 4),
    r = new Uint8Array(ar * Ps * 4),
    cc = new Uint8Array(ar * Ps * 4),
    base = new Float32Array(ar * Ps * 3);
  for (let l = 0; l < ar * Ps; l++) {
    let h = n[l] || {
        c: 16711935,
        r: 0.5,
        m: 0,
      },
      p = Ls(h.c),
      u = l * 4;
    ((t[u] = p[0] * 255),
      (t[u + 1] = p[1] * 255),
      (t[u + 2] = p[2] * 255),
      (t[u + 3] = 255),
      (i[u] = 255),
      (i[u + 1] = ni(h.r, 0, 1) * 255),
      (i[u + 2] = ni(h.m, 0, 1) * 255),
      (i[u + 3] = 255));
    let f = h.e ? Ls(h.e) : [0, 0, 0],
      g = h.ei === void 0 ? 1 : h.ei;
    ((r[u] = ni(f[0] * g, 0, 1) * 255),
      (r[u + 1] = ni(f[1] * g, 0, 1) * 255),
      (r[u + 2] = ni(f[2] * g, 0, 1) * 255),
      (r[u + 3] = 255));
    // emissive base kept in linear-ish 0..1 so animation can scale a slot (tail lights, exhaust)
    ((base[l * 3] = ni(f[0] * g, 0, 1)), (base[l * 3 + 1] = ni(f[1] * g, 0, 1)), (base[l * 3 + 2] = ni(f[2] * g, 0, 1)));
    // clearcoat mask (red = clearcoat amount, green = clearcoat roughness)
    let q = h.cc === void 0 ? 0 : h.cc,
      qr = h.ccr === void 0 ? 0.1 : h.ccr;
    ((cc[u] = ni(q, 0, 1) * 255), (cc[u + 1] = ni(qr, 0, 1) * 255), (cc[u + 2] = 0), (cc[u + 3] = 255));
  }
  let s = _u(t, !0),
    a = _u(i, !1),
    o = _u(r, !0),
    m = _u(cc, !1),
    params = {
      map: s,
      roughnessMap: a,
      metalnessMap: a,
      emissiveMap: o,
      color: 16777215,
      roughness: 1,
      metalness: 1,
      emissive: 16777215,
      emissiveIntensity: e.emissiveIntensity === void 0 ? 1.45 : e.emissiveIntensity,
      envMapIntensity: e.envMapIntensity === void 0 ? 1 : e.envMapIntensity,
      dithering: !0,
    },
    c;
  if (e.physical && typeof MeshPhysicalMaterial != "undefined") {
    c = new MeshPhysicalMaterial(
      Object.assign(params, {
        clearcoat: 1,
        clearcoatMap: m,
        clearcoatRoughness: 1,
        clearcoatRoughnessMap: m,
      }),
    );
  } else c = new MeshStandardMaterial(params);
  return ((c.userData.paletteTextures = [s, a, o, m]), (c.userData.emissiveData = r), (c.userData.emissiveBase = base), c);
}
// scale one palette slot's emissive colour at runtime (cheap: 16x8 texture re-upload)
function paletteGlow(mat, slot, k, tint) {
  let d = mat && mat.userData.emissiveData,
    b = mat && mat.userData.emissiveBase;
  if (!d) return;
  let u = slot * 4,
    l = slot * 3;
  if (tint) {
    let c = Ls(tint);
    ((d[u] = ni(c[0] * k, 0, 1) * 255), (d[u + 1] = ni(c[1] * k, 0, 1) * 255), (d[u + 2] = ni(c[2] * k, 0, 1) * 255));
  } else ((d[u] = ni(b[l] * k, 0, 1) * 255), (d[u + 1] = ni(b[l + 1] * k, 0, 1) * 255), (d[u + 2] = ni(b[l + 2] * k, 0, 1) * 255));
  mat.userData.paletteTextures[2].needsUpdate = !0;
}
var $p = new Map();
function Gn(n, e) {
  let t = $p.get(n);
  return (t || ((t = e()), $p.set(n, t)), t);
}
function Jg(n, e, t, i, r) {
  if (((i = Math.min(i, n / 2 - 1e-4, e / 2 - 1e-4, t / 2 - 1e-4)), i <= 1e-4 || r < 2))
    return new BoxGeometry(n, e, t);
  let s = new BoxGeometry(n, e, t, r, r, r),
    a = s.attributes.position,
    o = s.attributes.normal,
    c = n / 2 - i,
    l = e / 2 - i,
    h = t / 2 - i;
  for (let p = 0; p < a.count; p++) {
    let u = a.getX(p),
      f = a.getY(p),
      g = a.getZ(p),
      y = ni(u, -c, c),
      v = ni(f, -l, l),
      d = ni(g, -h, h),
      m = u - y,
      x = f - v,
      b = g - d,
      w = Math.hypot(m, x, b) || 1;
    ((m /= w), (x /= w), (b /= w), a.setXYZ(p, y + m * i, v + x * i, d + b * i), o.setXYZ(p, m, x, b));
  }
  return ((a.needsUpdate = !0), (o.needsUpdate = !0), s);
}
var k = {
  sphere: (n = 16, e = 11) => Gn(`sp${n},${e}`, () => new SphereGeometry(1, n, e)),
  box: (n, e, t) => Gn(`bx${n},${e},${t}`, () => new BoxGeometry(n, e, t)),
  rbox: (n, e, t, i = 0.08, r = 3) => Gn(`rb${n},${e},${t},${i},${r}`, () => Jg(n, e, t, i, r)),
  cyl: (n, e, t, i = 12, r = !1) => Gn(`cy${n},${e},${t},${i},${r}`, () => new CylinderGeometry(n, e, t, i, 1, r)),
  cone: (n, e, t = 8) => Gn(`co${n},${e},${t}`, () => new ConeGeometry(n, e, t)),
  torus: (n, e, t = 6, i = 16, r = Math.PI * 2) =>
    Gn(`to${n},${e},${t},${i},${r.toFixed(3)}`, () => new TorusGeometry(n, e, t, i, r)),
  capsule: (n, e, t = 3, i = 10) => Gn(`ca${n},${e},${t},${i}`, () => new CapsuleGeometry(n, e, t, i)),
  plane: (n, e) => Gn(`pl${n},${e}`, () => new PlaneGeometry(n, e)),
  lathe: (n, e = 16) =>
    Gn(
      `la${e}:${n.map((t) => t[0].toFixed(3) + "_" + t[1].toFixed(3)).join("|")}`,
      () =>
        new LatheGeometry(
          n.map((t) => new Vector2(t[0], t[1])),
          e,
        ),
    ),
};
var Qp = new Matrix4(),
  ef = new Matrix3(),
  tf = new Quaternion(),
  nf = new Euler(),
  $g = new Vector3(),
  Hn = class {
    constructor() {
      ((this.parts = []), (this.verts = 0), (this.idx = 0));
    }
    add(e, t, i, r, s) {
      (r && r.isQuaternion ? tf.copy(r) : (nf.set(r ? r[0] : 0, r ? r[1] : 0, r ? r[2] : 0), tf.setFromEuler(nf)),
        Qp.compose(
          $g.set(i ? i[0] : 0, i ? i[1] : 0, i ? i[2] : 0),
          tf,
          new Vector3(s ? s[0] : 1, s ? s[1] : 1, s ? s[2] : 1),
        ));
      let a = Qp.clone();
      return (
        this.parts.push({
          geo: e,
          s: t,
          m: a,
        }),
        (this.verts += e.attributes.position.count),
        (this.idx += e.index ? e.index.count : e.attributes.position.count),
        this
      );
    }
    mir(e) {
      return (e.call(this, -1), e.call(this, 1), this);
    }
    get empty() {
      return this.parts.length === 0;
    }
    get triangles() {
      return this.idx / 3;
    }
    // world-space bounds of the parts added so far
    bounds() {
      let b = new Box3(),
        t = new Box3();
      for (let h of this.parts) {
        h.geo.boundingBox || h.geo.computeBoundingBox();
        t.copy(h.geo.boundingBox).applyMatrix4(h.m);
        b.union(t);
      }
      return b;
    }
    build() {
      let e = this.verts,
        t = this.idx,
        i = new Float32Array(e * 3),
        r = new Float32Array(e * 3),
        s = new Float32Array(e * 2),
        a = e > 65535 ? new Uint32Array(t) : new Uint16Array(t),
        o = 0,
        c = 0;
      for (let h of this.parts) {
        let p = h.geo,
          u = p.attributes.position,
          f = p.attributes.normal,
          g = u.count;
        ef.getNormalMatrix(h.m);
        let y = h.s === null ? p.attributes.uv : null,
          v = y ? [0, 0] : Kg(h.s),
          d = h.m.elements,
          m = ef.elements;
        for (let x = 0; x < g; x++) {
          let b = u.getX(x),
            w = u.getY(x),
            A = u.getZ(x),
            C = (o + x) * 3;
          ((i[C] = d[0] * b + d[4] * w + d[8] * A + d[12]),
            (i[C + 1] = d[1] * b + d[5] * w + d[9] * A + d[13]),
            (i[C + 2] = d[2] * b + d[6] * w + d[10] * A + d[14]));
          let F = f.getX(x),
            N = f.getY(x),
            G = f.getZ(x),
            W = m[0] * F + m[3] * N + m[6] * G,
            B = m[1] * F + m[4] * N + m[7] * G,
            $ = m[2] * F + m[5] * N + m[8] * G,
            Z = Math.hypot(W, B, $) || 1;
          ((r[C] = W / Z),
            (r[C + 1] = B / Z),
            (r[C + 2] = $ / Z),
            y
              ? ((s[(o + x) * 2] = y.getX(x)), (s[(o + x) * 2 + 1] = y.getY(x)))
              : ((s[(o + x) * 2] = v[0]), (s[(o + x) * 2 + 1] = v[1])));
        }
        if (p.index) {
          let x = p.index.array;
          for (let b = 0; b < x.length; b++) a[c + b] = x[b] + o;
          c += x.length;
        } else {
          for (let x = 0; x < g; x++) a[c + x] = o + x;
          c += g;
        }
        o += g;
      }
      let l = new BufferGeometry();
      return (
        l.setAttribute("position", new BufferAttribute(i, 3)),
        l.setAttribute("normal", new BufferAttribute(r, 3)),
        l.setAttribute("uv", new BufferAttribute(s, 2)),
        l.setIndex(new BufferAttribute(a, 1)),
        l.computeBoundingSphere(),
        (this.parts.length = 0),
        l
      );
    }
  };
function of(n = 128) {
  if (typeof document == "undefined") return null;
  let e = document.createElement("canvas");
  e.width = e.height = n;
  let t = e.getContext("2d"),
    i = n / 2,
    r = t.createRadialGradient(i, i, 1, i, i, i - 1);
  for (let a = 0; a <= 20; a++) {
    let o = a / 20,
      c = Math.pow(Math.max(0, 1 - o), 2.1) * 0.96 * (1 - Math.pow(o, 5));
    r.addColorStop(o, `rgba(0,0,0,${c.toFixed(4)})`);
  }
  ((t.fillStyle = r), t.fillRect(0, 0, n, n));
  let s = new CanvasTexture(e);
  return ((s.colorSpace = Ft), s);
}
function lf(n, e = "#d6faff", t = "#0a1426") {
  if (typeof document == "undefined") return null;
  let i = 256,
    r = 128,
    s = document.createElement("canvas");
  ((s.width = i), (s.height = r));
  let a = s.getContext("2d");
  ((a.fillStyle = t),
    a.fillRect(0, 0, i, r),
    (a.strokeStyle = e),
    (a.globalAlpha = 0.55),
    (a.lineWidth = 8),
    a.strokeRect(10, 10, i - 20, r - 20),
    (a.globalAlpha = 1),
    (a.fillStyle = e),
    (a.textAlign = "center"),
    (a.textBaseline = "middle"),
    (a.font = "900 74px Arial, Helvetica, sans-serif"),
    a.fillText(n, i / 2, r / 2 + 4, i * 0.8));
  let o = new CanvasTexture(s);
  return ((o.colorSpace = Ft), (o.anisotropy = 4), o);
}
function plateTex(num, name, accent) {
  if (typeof document == "undefined") return null;
  let i = 512,
    r = 256,
    s = document.createElement("canvas");
  ((s.width = i), (s.height = r));
  let a = s.getContext("2d"),
    ac = hexCss(accent);
  // glossy dark plate with accent frame + gradient sheen
  let g = a.createLinearGradient(0, 0, 0, r);
  (g.addColorStop(0, "#1a2140"), g.addColorStop(0.5, "#090c1a"), g.addColorStop(1, "#141a32"));
  ((a.fillStyle = g), a.fillRect(0, 0, i, r));
  ((a.strokeStyle = ac), (a.lineWidth = 14), a.strokeRect(12, 12, i - 24, r - 24));
  ((a.fillStyle = ac), a.fillRect(0, 0, i, 10), a.fillRect(0, r - 10, i, 10));
  ((a.textAlign = "center"), (a.textBaseline = "middle"));
  ((a.fillStyle = "#ffffff"), (a.font = "900 150px Arial Black, Arial, Helvetica, sans-serif"), a.fillText(num, i / 2 - 40, r / 2 - 4, i * 0.5));
  ((a.fillStyle = ac), (a.font = "900 44px Arial, Helvetica, sans-serif"), a.save(), a.translate(i - 110, r / 2), a.rotate(-ft / 2), a.fillText(name.toUpperCase(), 0, 0, 180), a.restore());
  ((a.fillStyle = "rgba(255,255,255,0.5)"), (a.font = "700 22px Arial, Helvetica, sans-serif"), a.fillText("BLUFOX  OVERDRIVE", i / 2 - 40, r - 40, 260));
  // sheen
  let h = a.createLinearGradient(0, 0, i, r);
  (h.addColorStop(0, "rgba(255,255,255,0.16)"), h.addColorStop(0.45, "rgba(255,255,255,0)"), h.addColorStop(1, "rgba(255,255,255,0.08)"));
  ((a.fillStyle = h), a.fillRect(0, 0, i, r));
  let o = new CanvasTexture(s);
  return ((o.colorSpace = Ft), (o.anisotropy = 4), o);
}
function glowTex(n = 128) {
  if (typeof document == "undefined") return null;
  let e = document.createElement("canvas");
  e.width = n;
  e.height = n;
  let t = e.getContext("2d"),
    i = n / 2,
    r = t.createRadialGradient(i, i, 1, i, i, i - 1);
  (r.addColorStop(0, "rgba(255,255,255,1)"),
    r.addColorStop(0.35, "rgba(255,255,255,0.55)"),
    r.addColorStop(0.75, "rgba(255,255,255,0.12)"),
    r.addColorStop(1, "rgba(255,255,255,0)"));
  ((t.fillStyle = r), t.fillRect(0, 0, n, n));
  let s = new CanvasTexture(e);
  return ((s.colorSpace = Ft), s);
}
var hexCss = (n) => "#" + ((n >>> 0) & 16777215).toString(16).padStart(6, "0");
function cf() {
  if (typeof document == "undefined") return null;
  let n = document.createElement("canvas");
  ((n.width = 8), (n.height = 64));
  let e = n.getContext("2d"),
    t = e.createLinearGradient(0, 0, 0, 64);
  (t.addColorStop(0, "rgba(255,255,255,1)"),
    t.addColorStop(0.28, "rgba(198,244,255,0.92)"),
    t.addColorStop(0.62, "rgba(96,196,255,0.45)"),
    t.addColorStop(1, "rgba(60,130,255,0)"),
    (e.fillStyle = t),
    e.fillRect(0, 0, 8, 64));
  let i = new CanvasTexture(n);
  return ((i.colorSpace = Ft), i);
}
var Vn = (n, e, t, i) => n + (e - n) * (1 - Math.exp(-t * Math.max(i, 0)));
var D = xl,
  ft = Math.PI,
  Qg = [
    "classic kart",
    "low wedge",
    "light buggy",
    "bubble cruiser",
    "hot rod",
    "tech racer",
    "heavy hauler",
    "formula",
  ],
  e1 = {
    high: {
      sph: [14, 10],
      torso: [14, 10],
      head: [22, 15],
      eye: [12, 9],
      eyeS: [10, 7],
      glint: [6, 4],
      tailSph: [10, 7],
      tailSegs: 4,
      rb: 3,
      rbs: 2,
      wheel: 16,
      spokes: 5,
      tread: 12,
      face: !0,
      driverMesh: !0,
      glow: !0,
      tor: [5, 16],
      cap: [2, 8],
      plate: !0,
      tail: !0,
      extras: !0,
    },
    low: {
      sph: [8, 6],
      torso: [8, 6],
      head: [10, 7],
      eye: [6, 4],
      eyeS: [6, 4],
      glint: [4, 3],
      tailSph: [8, 6],
      tailSegs: 2,
      rb: 1,
      rbs: 1,
      wheel: 10,
      spokes: 0,
      tread: 0,
      face: !0,
      driverMesh: !1,
      glow: !1,
      tor: [3, 9],
      cap: [1, 6],
      plate: !1,
      tail: !1,
      extras: !1,
    },
  };
// per-driver eye colour / attitude used by the face builder
var EYE_STYLE = {
  goggles: { iris: 0x2f9cff, brow: 0.12, mood: "grin" },
  visor: { iris: 0xff4fd8, brow: -0.22, mood: "smirk" },
  cap: { iris: 0xffb52e, brow: 0.28, mood: "open" },
  hood: { iris: 0x8fdcff, brow: 0.06, mood: "smile" },
  mohawk: { iris: 0xff3324, brow: -0.34, mood: "grin" },
  headphones: { iris: 0x8cff3a, iris2: 0x3ac8ff, brow: -0.16, mood: "smirk" },
  helmet: { iris: 0xffa02a, brow: -0.36, mood: "flat" },
  crown: { iris: 0xb257ff, brow: 0.1, mood: "smile" },
};
function t1(n, physical) {
  let e = wa(Is(n.color, 1.12), 0.44),
    t = wa(Is(n.accent, 1.05), 0.46),
    i = wa(Is(n.color, 1.02), 0.34),
    r = bu(e) > 0.6 ? Is(yl(e, 0.16), 1.5) : Is(Fr(e, 0.15), 1.08),
    es = EYE_STYLE[n.style] || EYE_STYLE.goggles,
    suit = n.style === "helmet" ? 0x171a22 : n.style === "hood" ? 0xdfeeff : n.style === "cap" ? 0xf4f6ff : sf(yl(e, 0.3), t, 0.5),
    s = [];
  // paint: clearcoated base coat, slightly deeper than the raw driver colour so the coat can add the shine
  return (
    (s[D.PAINT] = { c: e, r: 0.34, m: 0.28, e, ei: 0.08, cc: 1, ccr: 0.06 }),
    (s[D.PAINT_DEEP] = { c: yl(e, 0.42), r: 0.36, m: 0.32, e, ei: 0.04, cc: 1, ccr: 0.08 }),
    (s[D.PAINT_LIGHT] = { c: r, r: 0.3, m: 0.26, e: r, ei: 0.06, cc: 1, ccr: 0.06 }),
    (s[D.PAINT_TWO] = { c: sf(e, t, 0.55), r: 0.32, m: 0.3, e: sf(e, t, 0.55), ei: 0.08, cc: 1, ccr: 0.06 }),
    (s[D.ACCENT] = { c: Fr(t, 0.18), r: 0.36, m: 0.18, e: t, ei: 1.25, cc: 0.6 }),
    (s[D.ACCENT_DIM] = { c: t, r: 0.44, m: 0.04, e: t, ei: 0.45, cc: 0.5 }),
    (s[D.ACCENT_EDGE] = { c: Fr(t, 0.55), r: 0.3, m: 0.02, e: Fr(t, 0.34), ei: 1.1, cc: 0.5 }),
    (s[D.GLOW] = { c: Fr(t, 0.4), r: 0.3, m: 0, e: Fr(t, 0.2), ei: 1.9 }),
    (s[D.CARBON] = { c: 857124, r: 0.42, m: 0.38, cc: 0.7, ccr: 0.18 }),
    (s[D.CARBON_LIGHT] = { c: 2174022, r: 0.36, m: 0.5, cc: 0.7, ccr: 0.18 }),
    (s[D.RUBBER] = { c: 0x0e0f14, r: 0.92, m: 0.02 }),
    (s[D.RUBBER_WALL] = { c: 0x1c1e26, r: 0.72, m: 0.04, cc: 0.15, ccr: 0.4 }),
    (s[D.CHROME] = { c: 0xf2f6ff, r: 0.08, m: 1 }),
    (s[D.CHROME_DARK] = { c: 0x9aa4b8, r: 0.22, m: 1 }),
    (s[D.GOLD] = { c: 16766047, r: 0.17, m: 1, e: 16754725, ei: 0.12 }),
    (s[D.WHITE] = { c: 16186367, r: 0.5, m: 0.02 }),
    (s[D.LENS] = { c: 0x0c1226, r: 0.05, m: 0.55, e: t, ei: 0.34, cc: 1, ccr: 0.02 }),
    (s[D.SEAT] = { c: 1317676, r: 0.76, m: 0.06 }),
    (s[D.LAMP] = { c: 0xf2fbff, r: 0.16, m: 0, e: 0xdff6ff, ei: 1.7 }),
    (s[D.TAILLAMP] = { c: 0xff3b3b, r: 0.24, m: 0, e: 0xff2a1e, ei: 0.8, cc: 1, ccr: 0.05 }),
    (s[D.LAMP_HOUSING] = { c: 0x0a0c12, r: 0.3, m: 0.6 }),
    (s[D.EXHAUST] = { c: 0x2a2f3a, r: 0.5, m: 0.7, e: 0xff7a2a, ei: 0.0 }),
    (s[D.FUR] = { c: i, r: 0.82, m: 0.02, e: i, ei: 0.06 }),
    (s[D.FUR_DEEP] = { c: yl(i, 0.28), r: 0.86, m: 0.02 }),
    (s[D.FUR_LIGHT] = { c: Fr(i, 0.4), r: 0.8, m: 0.02 }),
    (s[D.EAR_INNER] = { c: n.style === "hood" ? 11131124 : 16037078, r: 0.8, m: 0 }),
    (s[D.EYE] = { c: 0xffffff, r: 0.12, m: 0.02, cc: 1, ccr: 0.02 }),
    (s[D.IRIS] = { c: es.iris, r: 0.12, m: 0.04, e: es.iris, ei: 0.22, cc: 1, ccr: 0.02 }),
    (s[D.PUPIL] = { c: 0x05060a, r: 0.14, m: 0.05, cc: 1, ccr: 0.02 }),
    (s[D.EYE_GLINT] = { c: 16777215, r: 0.2, m: 0, e: 16777215, ei: 0.75 }),
    (s[D.NOSE] = { c: 0x121318, r: 0.28, m: 0.06, cc: 1, ccr: 0.1 }),
    (s[D.MOUTH] = { c: 0x2a0d18, r: 0.6, m: 0 }),
    (s[D.TEETH] = { c: 0xffffff, r: 0.4, m: 0 }),
    (s[D.BROW] = { c: yl(i, 0.55), r: 0.85, m: 0 }),
    (s[D.SUIT] = { c: suit, r: 0.5, m: 0.12, cc: 0.5, ccr: 0.25 }),
    (s[D.SUIT_DEEP] = { c: yl(suit, 0.35), r: 0.55, m: 0.1, cc: 0.4, ccr: 0.3 }),
    (s[D.GLOVE] = { c: n.style === "hood" ? 0xbfe4ff : 0x1c1d26, r: 0.6, m: 0.05 }),
    (s[D.TRIM_WARM] = { c: 3028824, r: 0.48, m: 0.32 }),
    (s[D.GRID] = { c: 725280, r: 0.58, m: 0.22 }),
    af(s, { physical: !!physical, envMapIntensity: physical ? 1.25 : 1.15 })
  );
}
function _l(n, e, t, i, r, s = {}) {
  let a = i / 2,
    o = t * (s.hub || 0.36),
    c = r.wheel,
    l = s.out !== void 0 ? s.out : e >= 0 ? 1 : -1,
    h = s.knobbly
      ? [
          [o, -a * 0.86],
          [t * 0.93, -a * 1],
          [t * 1.02, -a * 0.52],
          [t * 0.95, 0],
          [t * 1.02, a * 0.52],
          [t * 0.93, a * 1],
          [o, a * 0.86],
        ]
      : [
          [o, -a * 0.86],
          [t * 0.94, -a * 0.98],
          [t, -a * 0.5],
          [t, -a * 0.3],
          [t * 0.975, -a * 0.24],
          [t * 0.975, -a * 0.16],
          [t, -a * 0.1],
          [t, a * 0.1],
          [t * 0.975, a * 0.16],
          [t * 0.975, a * 0.24],
          [t, a * 0.3],
          [t, a * 0.5],
          [t * 0.94, a * 0.98],
          [o, a * 0.86],
        ];
  // tyre (lathe), sidewall ring, rim dish + chrome lip + spokes + accent hub cap
  (n.add(k.lathe(h, c), D.RUBBER, [e, 0, 0], [0, 0, ft / 2]),
    n.add(k.torus(t * 0.72, i * 0.5, 3, Math.max(8, c - 6)), D.RUBBER_WALL, [e, 0, 0], [0, ft / 2, 0], [1, 1, 0.02]),
    n.add(k.cyl(o * 1.06, o * 1.06, i * 1.02, Math.max(8, c - 4)), D.CHROME_DARK, [e, 0, 0], [0, 0, ft / 2]),
    n.add(k.cyl(o * 1.36, o * 1.12, i * 0.14, Math.max(8, c - 4), !0), D.CHROME, [e + l * i * 0.47, 0, 0], [0, 0, (l * ft) / 2]),
    n.add(k.torus(o * 1.28, o * 0.13, 4, Math.max(8, c - 6)), D.CHROME, [e + l * i * 0.5, 0, 0], [0, ft / 2, 0]),
    n.add(k.cyl(o * 0.42, o * 0.36, i * 0.1, 8, !0), D.ACCENT, [e + l * i * 0.53, 0, 0], [0, 0, (l * ft) / 2]));
  let p = e + l * i * 0.5;
  for (let u = 0; u < r.spokes; u++) {
    let f = (u / r.spokes) * ft * 2;
    n.add(
      k.box(i * 0.1, t * 0.5, o * 0.4),
      D.CHROME,
      [p, Math.sin(f) * o * 0.78, Math.cos(f) * o * 0.78],
      [ft / 2 - f, 0, 0],
    );
  }
  // tread blocks around the circumference (high detail only)
  if (r.tread && !s.knobbly) {
    let g = r.tread,
      bw = (2 * ft * t) / g;
    for (let u = 0; u < g; u++) {
      let f = (u / g) * ft * 2 + (e > 0 ? 0.1 : 0);
      n.add(
        k.box(i * 0.56, 0.035, bw * 0.46),
        D.RUBBER_WALL,
        [e, Math.sin(f) * t * 0.995, Math.cos(f) * t * 0.995],
        [-f, 0, 0],
      );
    }
  }
}
// capsule limb between two points (capsule geometry runs along local Y)
var Yy = new Vector3(0, 1, 0),
  bfxLimbDir = new Vector3();
function limb(n, slot, rad, p0, p1, e) {
  bfxLimbDir.set(p1[0] - p0[0], p1[1] - p0[1], p1[2] - p0[2]);
  let L = bfxLimbDir.length();
  bfxLimbDir.normalize();
  let q = new Quaternion().setFromUnitVectors(Yy, bfxLimbDir);
  n.add(k.capsule(rad, Math.max(0.01, L - rad * 0.6), e.cap[0], e.cap[1]), slot, [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2, (p0[2] + p1[2]) / 2], q);
}
function i1(n, e, t) {
  let i = t.seatY,
    r = t.seatZ === void 0 ? -0.18 : t.seatZ,
    s = t.driverScale || 1,
    a = t.wheelZ === void 0 ? 0.66 : t.wheelZ;
  // seat cushion + suit body: hips, chest, collar, zipper, shoulder pads
  (n.add(k.sphere(...e.torso), D.SUIT_DEEP, [0, i, r], null, [0.6 * s, 0.46 * s, 0.5 * s]),
    n.add(k.sphere(...e.torso), D.SUIT, [0, i + 0.3 * s, r + 0.02 * s], null, [0.56 * s, 0.46 * s, 0.42 * s]),
    n.add(k.rbox(0.16 * s, 0.34 * s, 0.06, 0.03, e.rbs), D.ACCENT, [0, i + 0.34 * s, r + 0.4 * s], [-0.12, 0, 0]),
    n.add(k.torus(0.2 * s, 0.05 * s, e.tor[0], e.tor[1]), D.SUIT_DEEP, [0, i + 0.66 * s, r - 0.04 * s], [ft / 2, 0, 0]),
    n.add(k.rbox(0.62 * s, 0.05, 0.05, 0.02, e.rbs), D.ACCENT_DIM, [0, i + 0.28 * s, r + 0.24 * s], [-0.5, 0, 0]));
  // shoulders, arms to the wheel, gloved hands
  let hy = i + 0.3 * s + 0.09 * s,
    hz = r + a - 0.06 * s;
  n.mir(function (o) {
    let sh = [o * 0.46 * s, i + 0.52 * s, r + 0.04 * s],
      el = [o * 0.5 * s, i + 0.36 * s, r + 0.3 * s],
      hd = [o * 0.3 * s, hy, hz];
    (this.add(k.sphere(...e.eyeS), D.SUIT, sh, null, [0.16 * s, 0.14 * s, 0.15 * s]),
      limb(this, D.SUIT, 0.095 * s, sh, el, e),
      limb(this, D.SUIT_DEEP, 0.085 * s, el, hd, e),
      this.add(k.sphere(...e.eyeS), D.GLOVE, hd, null, [0.1 * s, 0.09 * s, 0.11 * s]),
      this.add(k.sphere(...e.glint), D.GLOVE, [hd[0] - o * 0.05 * s, hd[1] + 0.04 * s, hd[2] + 0.02 * s], null, [0.045 * s, 0.04 * s, 0.05 * s]));
  });
  // steering wheel + column
  (n.add(k.torus(0.32 * s, 0.05 * s, e.tor[0], e.tor[1]), D.CARBON, [0, i + 0.3 * s, r + a], [-0.62, 0, 0]),
    n.add(k.rbox(0.52 * s, 0.05, 0.05, 0.02, e.rbs), D.ACCENT_DIM, [0, i + 0.3 * s, r + a], [-0.62, 0, 0]),
    n.add(k.cyl(0.07 * s, 0.07 * s, 0.14 * s, 8), D.CHROME_DARK, [0, i + 0.3 * s, r + a], [-0.62 + ft / 2, 0, 0]),
    n.add(k.cyl(0.04 * s, 0.05 * s, 0.5 * s, 8), D.CHROME_DARK, [0, i + 0.1 * s, r + a + 0.12 * s], [0.9, 0, 0]));
}
function n1(n, e, t) {
  let i = new Hn(),
    r = t.headScale || 1,
    s = e.head,
    es = EYE_STYLE[n.style] || EYE_STYLE.goggles;
  // skull, muzzle, forehead patch, cheek fluff
  (i.add(k.sphere(...s), D.FUR, [0, 0.2 * r, 0], null, [0.7 * r, 0.64 * r, 0.58 * r]),
    i.add(k.sphere(...e.eyeS), D.FUR_LIGHT, [0, 0.4 * r, 0.27 * r], null, [0.4 * r, 0.16 * r, 0.26 * r]),
    i.add(k.sphere(...e.eye), D.FUR_LIGHT, [0, -0.04 * r, 0.42 * r], null, [0.32 * r, 0.24 * r, 0.24 * r]));
  i.mir(function (a) {
    (this.add(k.sphere(...e.eyeS), D.FUR_LIGHT, [a * 0.52 * r, -0.02 * r, 0.16 * r], [0, 0, a * 0.5], [0.2 * r, 0.14 * r, 0.22 * r]),
      // eye: white, iris, pupil, two glints
      this.add(k.sphere(...e.eye), D.EYE, [a * 0.245 * r, 0.24 * r, 0.42 * r], [0, a * 0.2, 0], [0.205 * r, 0.205 * r, 0.14 * r]),
      this.add(k.sphere(...e.eyeS), a > 0 && es.iris2 ? D.PUPIL : D.IRIS, [a * 0.255 * r, 0.235 * r, 0.535 * r], [0, a * 0.2, 0], [0.125 * r, 0.13 * r, 0.05 * r]),
      es.iris2 && a > 0 && this.add(k.sphere(...e.eyeS), D.IRIS, [a * 0.255 * r, 0.235 * r, 0.536 * r], [0, a * 0.2, 0], [0.12 * r, 0.125 * r, 0.05 * r]),
      this.add(k.sphere(...e.eyeS), D.PUPIL, [a * 0.262 * r, 0.23 * r, 0.575 * r], [0, a * 0.2, 0], [0.068 * r, 0.078 * r, 0.03 * r]),
      this.add(k.sphere(...e.glint), D.EYE_GLINT, [a * 0.3 * r, 0.3 * r, 0.6 * r], null, [0.042 * r, 0.046 * r, 0.022 * r]),
      e.extras && this.add(k.sphere(...e.glint), D.EYE_GLINT, [a * 0.215 * r, 0.185 * r, 0.6 * r], null, [0.02 * r, 0.022 * r, 0.014 * r]),
      // brow
      this.add(k.rbox(0.21 * r, 0.05 * r, 0.07 * r, 0.02, e.rbs), D.BROW, [a * 0.26 * r, 0.44 * r, 0.5 * r], [0.3, 0, -a * es.brow]),
      // ears
      this.add(k.cone(1, 1, 9), D.FUR, [a * 0.44 * r, 0.82 * r, -0.04 * r], [-0.14, 0, -a * 0.26], [0.3 * r, 0.76 * r, 0.22 * r]),
      e.extras && this.add(k.cone(1, 1, 8), D.EAR_INNER, [a * 0.445 * r, 0.82 * r, 0.05 * r], [-0.14, 0, -a * 0.26], [0.175 * r, 0.48 * r, 0.11 * r]));
  });
  // nose + nose glint
  (i.add(k.sphere(...e.eyeS), D.NOSE, [0, 0.06 * r, 0.61 * r], null, [0.1 * r, 0.078 * r, 0.08 * r]),
    e.extras && i.add(k.sphere(...e.glint), D.EYE_GLINT, [-0.03 * r, 0.09 * r, 0.68 * r], null, [0.022 * r, 0.016 * r, 0.014 * r]));
  // mouth by mood
  let m = es.mood;
  if (m === "grin" || m === "smile" || m === "smirk") {
    let w = m === "grin" ? 0.16 : 0.12,
      ox = m === "smirk" ? 0.07 : 0;
    i.add(k.torus(w * r, 0.022 * r, 4, 12, ft), D.MOUTH, [ox * r, -0.1 * r, 0.6 * r], [-0.35, 0, ft + (m === "smirk" ? 0.35 : 0)], [1, 0.7, 1]);
    m === "grin" && i.add(k.rbox(0.13 * r, 0.05 * r, 0.03 * r, 0.01, e.rbs), D.TEETH, [0, -0.115 * r, 0.6 * r], [-0.3, 0, 0]);
    m === "smirk" && i.add(k.rbox(0.04 * r, 0.05 * r, 0.03 * r, 0.01, e.rbs), D.TEETH, [(ox + 0.09) * r, -0.13 * r, 0.585 * r], [-0.3, 0, 0]);
  } else if (m === "open") {
    (i.add(k.sphere(...e.eye), D.MOUTH, [0, -0.15 * r, 0.6 * r], null, [0.11 * r, 0.085 * r, 0.04 * r]),
      i.add(k.rbox(0.14 * r, 0.04 * r, 0.03 * r, 0.01, e.rbs), D.TEETH, [0, -0.09 * r, 0.62 * r], [-0.3, 0, 0]));
  } else i.add(k.rbox(0.18 * r, 0.03 * r, 0.03 * r, 0.01, e.rbs), D.MOUTH, [0, -0.12 * r, 0.62 * r], [-0.35, 0, 0]);
  return (r1(i, n, e, r), i);
}
function r1(n, e, t, i) {
  let r = e.style;
  if (
    (r === "goggles" &&
      (n.add(k.rbox(1.1 * i, 0.14 * i, 0.3 * i, 0.06, t.rbs), D.TRIM_WARM, [0, 0.66 * i, 0.02 * i], [0.55, 0, 0]),
      n.mir(function (s) {
        (this.add(k.cyl(0.2 * i, 0.2 * i, 0.15 * i, 12), D.GOLD, [s * 0.27 * i, 0.68 * i, 0.33 * i], [ft / 2 + 0.55, 0, 0]),
          this.add(k.cyl(0.16 * i, 0.16 * i, 0.06 * i, 12), D.LENS, [s * 0.27 * i, 0.72 * i, 0.4 * i], [ft / 2 + 0.55, 0, 0]));
      }),
      n.add(k.rbox(0.16 * i, 0.08 * i, 0.1 * i, 0.03, t.rbs), D.GOLD, [0, 0.7 * i, 0.36 * i], [0.55, 0, 0])),
    r === "visor" &&
      (n.add(k.sphere(16, 10), D.CARBON, [0, 0.33 * i, 0.16 * i], null, [0.66 * i, 0.3 * i, 0.52 * i]),
      n.add(k.sphere(16, 10), D.LENS, [0, 0.33 * i, 0.22 * i], null, [0.63 * i, 0.22 * i, 0.5 * i]),
      n.add(k.rbox(1.12 * i, 0.055 * i, 0.1 * i, 0.026, t.rbs), D.ACCENT_EDGE, [0, 0.47 * i, 0.34 * i], [0.22, 0, 0]),
      n.add(k.cone(1, 1, 6), D.ACCENT, [0, 0.72 * i, -0.3 * i], [0.62, 0, 0], [0.1 * i, 0.62 * i, 0.22 * i])),
    r === "cap" &&
      (n.add(k.sphere(16, 10), D.WHITE, [0, 0.56 * i, -0.04 * i], null, [0.64 * i, 0.36 * i, 0.56 * i]),
      n.add(k.rbox(0.7 * i, 0.07 * i, 0.52 * i, 0.1, t.rbs), D.CARBON, [0, 0.52 * i, -0.62 * i], [0.2, 0, 0]),
      n.add(k.torus(0.6 * i, 0.04 * i, 4, 16), D.CARBON, [0, 0.5 * i, -0.04 * i], [ft / 2, 0, 0], [1, 0.9, 1]),
      n.add(k.sphere(8, 6), D.CARBON, [0, 0.9 * i, -0.04 * i], null, [0.06 * i, 0.06 * i, 0.06 * i]),
      n.add(k.rbox(0.18 * i, 0.12 * i, 0.3 * i, 0.04, t.rbs), D.PAINT, [0, 0.66 * i, 0.3 * i], [0.3, 0, 0])),
    r === "hood" &&
      (n.add(k.sphere(18, 12), D.WHITE, [0, 0.17 * i, -0.34 * i], null, [0.78 * i, 0.7 * i, 0.52 * i]),
      n.add(k.sphere(14, 10), D.WHITE, [0, 0.42 * i, -0.46 * i], null, [0.52 * i, 0.4 * i, 0.34 * i]),
      n.add(k.torus(0.58 * i, 0.135 * i, 6, 18), D.PAINT_LIGHT, [0, 0.2 * i, 0.12 * i], [0.3, 0, 0], [1, 1, 0.85]),
      n.add(k.torus(0.5 * i, 0.05 * i, 4, 16), D.ACCENT, [0, 0.2 * i, 0.16 * i], [0.3, 0, 0], [1, 1, 0.85]),
      n.add(k.sphere(10, 7), D.ACCENT, [0, 0.78 * i, -0.62 * i], null, [0.11 * i, 0.11 * i, 0.11 * i])),
    r === "mohawk")
  )
    for (let s = 0; s < 6; s++) {
      let a = s / 5,
        o = 0.46 * i - a * 0.95 * i,
        c = (0.3 + Math.sin(a * ft) * 0.42) * i;
      n.add(
        k.cone(1, 1, 7),
        s % 2 ? D.ACCENT : D.ACCENT_EDGE,
        [0, 0.74 * i + c * 0.34, o],
        [a * 0.5 - 0.1, 0, 0],
        [0.15 * i, c, 0.17 * i],
      );
    }
  if (
    (r === "headphones" &&
      (n.add(k.torus(0.6 * i, 0.075 * i, 6, 18, ft), D.CARBON, [0, 0.32 * i, -0.02 * i], [0, 0, 0]),
      n.add(k.torus(0.6 * i, 0.035 * i, 4, 18, ft), D.ACCENT, [0, 0.32 * i, 0.045 * i], [0, 0, 0]),
      n.mir(function (s) {
        (this.add(
          k.cyl(0.25 * i, 0.25 * i, 0.17 * i, 14),
          D.CARBON,
          [s * 0.64 * i, 0.26 * i, -0.02 * i],
          [0, 0, ft / 2],
        ),
          this.add(
            k.cyl(0.16 * i, 0.16 * i, 0.07 * i, 12),
            D.ACCENT,
            [s * 0.74 * i, 0.26 * i, -0.02 * i],
            [0, 0, ft / 2],
          ));
      }),
      n.add(
        k.rbox(0.1 * i, 0.08 * i, 0.34 * i, 0.035, t.rbs),
        D.ACCENT_EDGE,
        [-0.5 * i, 0.1 * i, 0.3 * i],
        [0.3, 0.4, 0],
      )),
    r === "helmet" &&
      (n.add(k.sphere(18, 12), D.PAINT, [0, 0.26 * i, -0.12 * i], null, [0.73 * i, 0.5 * i, 0.61 * i]),
      n.add(k.rbox(1.08 * i, 0.24 * i, 0.28 * i, 0.11, t.rbs), D.PAINT_DEEP, [0, 0.02 * i, 0.36 * i], [0.1, 0, 0]),
      n.add(k.rbox(1.02 * i, 0.22 * i, 0.16 * i, 0.07, t.rbs), D.LENS, [0, 0.3 * i, 0.42 * i], [0.05, 0, 0]),
      n.add(k.rbox(1.06 * i, 0.07 * i, 0.1 * i, 0.03, t.rbs), D.ACCENT_EDGE, [0, 0.44 * i, 0.43 * i], [0.05, 0, 0]),
      n.add(k.rbox(0.16 * i, 0.4 * i, 0.92 * i, 0.07, t.rbs), D.ACCENT, [0, 0.78 * i, -0.16 * i], [0.1, 0, 0]),
      n.add(
        k.rbox(0.09 * i, 0.09 * i, 0.84 * i, 0.035, t.rbs),
        D.ACCENT_EDGE,
        [0, 0.97 * i, -0.15 * i],
        [0.1, 0, 0],
      )),
    r === "crown")
  ) {
    n.add(k.cyl(0.46 * i, 0.42 * i, 0.14 * i, 16), D.GOLD, [0, 0.74 * i, -0.02 * i]);
    for (let s = 0; s < 5; s++) {
      let a = (s / 5) * ft * 2 - ft / 2,
        o = s === 1 || s === 4 || s === 0 ? 0.34 : 0.26;
      (n.add(k.cone(1, 1, 6), D.GOLD, [Math.cos(a) * 0.4 * i, (0.84 + o * 0.5) * i, Math.sin(a) * 0.4 * i], null, [
        0.1 * i,
        o * i,
        0.1 * i,
      ]),
        t.extras &&
          n.add(k.sphere(8, 6), D.ACCENT, [Math.cos(a) * 0.4 * i, (0.84 + o) * i, Math.sin(a) * 0.4 * i], null, [
            0.045 * i,
            0.045 * i,
            0.045 * i,
          ]));
    }
    n.add(k.sphere(10, 7), D.ACCENT_EDGE, [0, 0.8 * i, 0.42 * i], null, [0.075 * i, 0.075 * i, 0.05 * i]);
  }
}
function hf(n, e) {
  let t = new Hn(),
    i = e.tailScale || 1,
    r = n.tailSph;
  return (
    n.tailSegs > 2
      ? (t.add(k.sphere(...r), D.FUR, [0.03 * i, 0.01 * i, -0.24 * i], null, [0.2 * i, 0.2 * i, 0.3 * i]),
        t.add(k.sphere(...r), D.FUR, [0.11 * i, 0.09 * i, -0.66 * i], null, [0.175 * i, 0.175 * i, 0.28 * i]),
        t.add(k.sphere(...r), D.FUR_DEEP, [0.21 * i, 0.2 * i, -1.02 * i], null, [0.155 * i, 0.155 * i, 0.22 * i]))
      : t.add(k.sphere(...r), D.FUR, [0.07 * i, 0.05 * i, -0.45 * i], null, [0.19 * i, 0.19 * i, 0.52 * i]),
    t.add(k.sphere(...r), D.WHITE, [0.29 * i, 0.31 * i, -1.3 * i], null, [0.155 * i, 0.15 * i, 0.175 * i]),
    t
  );
}
function or(n, e, t, i = 1.02, r = 0.88) {
  (n.add(k.rbox(i, r, 0.32, 0.14, e.rb), D.SEAT, [0, t.seatY + 0.1, t.seatZ - 0.54]),
    n.add(k.rbox(i * 0.62, r * 0.7, 0.1, 0.05, e.rbs), D.ACCENT_DIM, [0, t.seatY + 0.12, t.seatZ - 0.7]));
}
function uf(n, e, t, i = 0.48, r = 1.66, s = -0.86, a = D.CHROME) {
  (n.add(k.torus(i, 0.075, e.tor[0], e.tor[1], ft), a, [0, r, s]),
    n.mir(function (o) {
      this.add(k.cyl(0.07, 0.07, 0.34, e.cap[1]), a, [o * i, r - 0.17, s]);
    }));
}
function lr(n, e, t, i, r, s = 0.21, a = 0.14) {
  // headlight: dark housing, LED bar lens, small chrome bezel line
  n.mir(function (o) {
    (this.add(k.rbox(s * 2.2, a * 1.9, 0.14, 0.03, e.rbs), D.LAMP_HOUSING, [o * t, i, r - 0.06]),
      this.add(k.rbox(s * 1.9, a * 1.4, 0.1, 0.03, e.rbs), D.LAMP, [o * t, i, r]),
      this.add(k.rbox(s * 1.9, a * 0.28, 0.1, 0.012, e.rbs), D.ACCENT_EDGE, [o * t, i - a * 0.95, r + 0.005]));
  });
}
function cr(n, e, t, i, r, s = 0.44) {
  n.mir(function (a) {
    (this.add(k.rbox(s * 1.1, 0.2, 0.1, 0.03, e.rbs), D.LAMP_HOUSING, [a * t, i, r + 0.03]),
      this.add(k.rbox(s, 0.11, 0.08, 0.03, e.rbs), D.TAILLAMP, [a * t, i, r]));
  });
}
// generic v3 dressing shared by all eight karts: chrome exhausts with glowing cores, diffuser fins,
// underbody accent rails. `p` is the kart preset (df entry).
function dressKart(n, e, p) {
  for (let G of p.pipes) {
    let R = p.pipeR;
    (n.add(k.cyl(R, R * 1.14, 0.46, 12), D.CHROME, [G[0], G[1], G[2]], [ft / 2, 0, 0]),
      n.add(k.torus(R * 1.1, R * 0.16, 5, 12), D.CHROME_DARK, [G[0], G[1], G[2] - 0.22], [0, 0, 0]),
      n.add(k.cyl(R * 0.84, R * 0.84, 0.06, 12), D.EXHAUST, [G[0], G[1], G[2] - 0.2], [ft / 2, 0, 0]));
  }
  let pz = p.plate[2],
    py = p.plate[1];
  // diffuser fins + lower carbon lip under the plate
  if (e.extras) {
    for (let t = -2; t <= 2; t++) n.add(k.rbox(0.035, 0.26, 0.42, 0.01, e.rbs), D.CARBON, [t * 0.32 * p.track, py - 0.42, pz + 0.24], [-0.22, 0, 0]);
    n.add(k.rbox(p.track * 1.5, 0.05, 0.3, 0.02, e.rbs), D.CARBON_LIGHT, [0, py - 0.52, pz + 0.16], [-0.22, 0, 0]);
  }
  // underbody accent rails (light tubes) that carry the underglow colour
  n.mir(function (t) {
    this.add(k.rbox(0.07, 0.05, (p.fz - p.rz) * 0.86, 0.02, e.rbs), D.GLOW, [t * p.track * 0.72, 0.27, (p.fz + p.rz) / 2]);
  });
}
function bl(n, e, t, i, r, s = 0, a = D.ACCENT) {
  n.mir(function (o) {
    this.add(k.rbox(0.11, 0.11, r, 0.05, e.rbs), a, [o * t, i, s]);
  });
}
var df = [
  {
    track: 1.06,
    fz: 1.08,
    rz: -1.06,
    fw: {
      r: 0.46,
      w: 0.4,
    },
    rw: {
      r: 0.5,
      w: 0.46,
    },
    seatY: 1.14,
    seatZ: -0.16,
    headY: 2,
    headZ: -0.06,
    wheelZ: 0.64,
    tail: [0.3, 1.12, -0.58],
    plate: [0, 0.8, -1.78],
    pipes: [
      [-0.6, 0.58, -1.74],
      [0.6, 0.58, -1.74],
    ],
    pipeR: 0.2,
    shadow: [3.3, 4.5],
    body(n, e) {
      (n.add(k.rbox(1.92, 0.3, 3.1, 0.13, e.rb), D.CARBON, [0, 0.4, 0]),
        n.add(k.sphere(...e.sph), D.PAINT, [0, 0.76, -0.02], null, [1.06, 0.5, 1.56]),
        n.add(k.rbox(1.58, 0.44, 1.46, 0.2, e.rb), D.PAINT, [0, 0.68, 1.04]),
        n.add(k.rbox(1.22, 0.26, 0.72, 0.12, e.rb), D.PAINT, [0, 0.9, 1.26], [-0.14, 0, 0]),
        n.add(k.rbox(1.02, 0.34, 0.66, 0.16, e.rb), D.PAINT, [0, 0.62, 1.82]),
        n.add(k.rbox(2.26, 0.22, 0.34, 0.1, e.rb), D.CARBON, [0, 0.5, 1.9]),
        n.add(k.rbox(1.5, 0.1, 0.12, 0.045, e.rbs), D.ACCENT, [0, 0.48, 2.04]),
        n.add(k.rbox(0.24, 0.07, 1.6, 0.03, e.rbs), D.ACCENT, [0, 0.93, 1.12]),
        bl(n, e, 1, 0.44, 2.2),
        n.mir(function (t) {
          (this.add(k.rbox(0.44, 0.48, 1.66, 0.18, e.rb), D.PAINT_DEEP, [t * 0.92, 0.72, -0.04]),
            this.add(k.rbox(0.17, 0.17, 1.86, 0.08, e.rb), D.PAINT_LIGHT, [t * 1.04, 0.86, -0.04]));
        }),
        or(n, e, this, 1.02, 0.88),
        uf(n, e, this, 0.47, 1.66, -0.84),
        n.add(k.rbox(1.7, 0.36, 0.92, 0.15, e.rb), D.PAINT, [0, 0.86, -1.26]),
        n.mir(function (t) {
          this.add(k.rbox(0.14, 0.64, 0.18, 0.05, e.rbs), D.CARBON, [t * 0.74, 1.2, -1.3]);
        }),
        n.add(k.rbox(2.3, 0.13, 0.54, 0.06, e.rb), D.PAINT, [0, 1.54, -1.34], [0.13, 0, 0]),
        n.add(k.rbox(2.04, 0.06, 0.15, 0.025, e.rbs), D.ACCENT, [0, 1.63, -1.3]),
        lr(n, e, 0.56, 0.82, 1.96),
        cr(n, e, 0.6, 0.88, -1.72));
    },
  },
  {
    track: 1.16,
    fz: 1.16,
    rz: -1.1,
    fw: {
      r: 0.42,
      w: 0.38,
    },
    rw: {
      r: 0.54,
      w: 0.54,
    },
    seatY: 1.02,
    seatZ: -0.26,
    headY: 1.86,
    headZ: -0.16,
    wheelZ: 0.6,
    headScale: 0.96,
    tail: [0.28, 1, -0.66],
    plate: [0, 0.72, -1.82],
    pipes: [
      [-0.44, 0.52, -1.8],
      [0.44, 0.52, -1.8],
    ],
    pipeR: 0.19,
    shadow: [3.5, 5.1],
    body(n, e) {
      (n.add(k.rbox(1.76, 0.24, 3.5, 0.11, e.rb), D.CARBON, [0, 0.32, 0.06]),
        n.add(k.rbox(1.7, 0.4, 1.7, 0.18, e.rb), D.PAINT, [0, 0.58, -0.3]),
        n.add(k.rbox(1.44, 0.34, 1.3, 0.16, e.rb), D.PAINT, [0, 0.62, 0.9], [-0.06, 0, 0]),
        n.add(k.rbox(1.02, 0.26, 1.1, 0.12, e.rb), D.PAINT, [0, 0.54, 1.86], [-0.1, 0, 0]),
        n.add(k.cone(1, 1, 10), D.PAINT_LIGHT, [0, 0.5, 2.52], [ft / 2, 0, 0], [0.42, 0.44, 0.3]),
        n.add(k.rbox(0.86, 0.08, 1.9, 0.035, e.rbs), D.ACCENT, [0, 0.8, 1.08], [-0.08, 0, 0]),
        bl(n, e, 0.96, 0.36, 2.7, 0.1),
        n.mir(function (t) {
          (this.add(k.rbox(0.5, 0.52, 1.4, 0.2, e.rb), D.PAINT_DEEP, [t * 0.9, 0.6, -0.1]),
            this.add(k.rbox(0.3, 0.34, 0.12, 0.1, e.rbs), D.GRID, [t * 0.92, 0.62, 0.6]),
            this.add(k.rbox(0.18, 0.24, 1.5, 0.08, e.rb), D.PAINT_LIGHT, [t * 1.12, 0.7, -0.16]),
            this.add(k.rbox(0.13, 0.13, 1.3, 0.06, e.rbs), D.ACCENT, [t * 1.14, 0.5, -0.16]));
        }),
        or(n, e, this, 0.92, 0.78),
        n.add(k.rbox(0.86, 0.3, 0.4, 0.12, e.rb), D.CARBON, [0, 1.52, -0.88]),
        n.add(k.rbox(0.34, 0.4, 0.6, 0.1, e.rb), D.ACCENT_DIM, [0, 1.62, -0.66], [0.35, 0, 0]),
        n.add(k.rbox(1.58, 0.3, 1, 0.14, e.rb), D.PAINT, [0, 0.7, -1.36]),
        n.add(k.rbox(0.16, 0.9, 0.22, 0.06, e.rbs), D.CARBON, [0, 1.3, -1.62], [0.2, 0, 0]),
        n.mir(function (t) {
          this.add(k.rbox(0.1, 0.74, 0.7, 0.05, e.rbs), D.PAINT_DEEP, [t * 1.24, 1.44, -1.7]);
        }),
        n.add(k.rbox(2.52, 0.12, 0.62, 0.05, e.rb), D.PAINT, [0, 1.76, -1.74], [0.26, 0, 0]),
        n.add(k.rbox(2.52, 0.07, 0.3, 0.03, e.rbs), D.PAINT_DEEP, [0, 1.58, -1.58], [0.2, 0, 0]),
        n.add(k.rbox(2.24, 0.06, 0.16, 0.025, e.rbs), D.ACCENT_EDGE, [0, 1.84, -1.68]),
        n.add(k.rbox(1.5, 0.18, 0.5, 0.07, e.rbs), D.CARBON, [0, 0.36, -1.8], [-0.3, 0, 0]),
        lr(n, e, 0.4, 0.62, 2.62, 0.16, 0.1),
        cr(n, e, 0.54, 0.76, -1.82, 0.4));
    },
  },
  {
    track: 0.98,
    fz: 0.92,
    rz: -0.98,
    fw: {
      r: 0.38,
      w: 0.34,
    },
    rw: {
      r: 0.62,
      w: 0.58,
    },
    seatY: 1.22,
    seatZ: -0.14,
    headY: 2.08,
    headZ: -0.06,
    wheelZ: 0.58,
    headScale: 1.1,
    driverScale: 0.92,
    tailScale: 0.9,
    tail: [0.26, 1.16, -0.5],
    plate: [0, 0.86, -1.46],
    pipes: [
      [-0.36, 0.74, -1.5],
      [0.36, 0.74, -1.5],
    ],
    pipeR: 0.17,
    shadow: [3, 3.9],
    knobbly: !0,
    body(n, e) {
      (n.add(k.rbox(1.52, 0.26, 2.36, 0.12, e.rb), D.CARBON, [0, 0.52, 0]),
        n.add(k.rbox(1.34, 0.44, 1.3, 0.2, e.rb), D.PAINT, [0, 0.8, 0.12]),
        n.add(k.rbox(1.06, 0.36, 0.66, 0.17, e.rb), D.PAINT_LIGHT, [0, 0.94, 0.82], [-0.16, 0, 0]),
        n.add(k.rbox(1.56, 0.18, 0.28, 0.08, e.rb), D.CHROME_DARK, [0, 0.7, 1.34]),
        n.add(k.rbox(1.2, 0.1, 0.12, 0.045, e.rbs), D.ACCENT, [0, 0.7, 1.46]),
        n.mir(function (t) {
          (this.add(k.cyl(0.06, 0.06, 2.3, 8), D.CHROME_DARK, [t * 0.74, 0.66, 0], [ft / 2, 0, 0]),
            this.add(k.rbox(0.13, 0.13, 1.6, 0.06, e.rbs), D.ACCENT, [t * 0.8, 0.46, -0.1]));
        }),
        or(n, e, this, 0.9, 0.84),
        n.add(k.torus(0.54, 0.075, 5, 16, ft), D.ACCENT_DIM, [0, 2.24, -0.74]),
        n.add(k.torus(0.5, 0.065, 5, 16, ft), D.CHROME_DARK, [0, 2.18, 0.44]),
        n.mir(function (t) {
          (this.add(k.cyl(0.06, 0.06, 1.24, 8), D.CHROME_DARK, [t * 0.5, 1.58, 0.44]),
            this.add(k.cyl(0.06, 0.06, 1.2, 8), D.CHROME_DARK, [t * 0.54, 1.66, -0.74]),
            this.add(k.cyl(0.055, 0.055, 1.3, 8), D.CHROME_DARK, [t * 0.52, 2.5, -0.16], [ft / 2, 0, 0]));
        }),
        n.add(k.rbox(1.14, 0.11, 0.13, 0.05, e.rbs), D.ACCENT_EDGE, [0, 2.58, -0.16]),
        n.add(k.rbox(1.3, 0.4, 0.7, 0.16, e.rb), D.PAINT, [0, 0.86, -1.24]),
        n.add(k.cyl(0.34, 0.34, 0.22, 14), D.RUBBER, [0, 1.06, -1.54], [ft / 2, 0, 0]),
        n.add(k.cyl(0.15, 0.15, 0.26, 10), D.CHROME, [0, 1.06, -1.54], [ft / 2, 0, 0]),
        lr(n, e, 0.42, 0.96, 1.3, 0.17, 0.17),
        cr(n, e, 0.46, 0.92, -1.58, 0.32));
    },
  },
  {
    track: 1.1,
    fz: 1.1,
    rz: -1.08,
    fw: {
      r: 0.44,
      w: 0.44,
    },
    rw: {
      r: 0.5,
      w: 0.5,
    },
    seatY: 1.12,
    seatZ: -0.2,
    headY: 1.98,
    headZ: -0.1,
    wheelZ: 0.62,
    tail: [0.3, 1.1, -0.62],
    plate: [0, 0.78, -1.8],
    pipes: [
      [-0.52, 0.56, -1.76],
      [0.52, 0.56, -1.76],
    ],
    pipeR: 0.21,
    shadow: [3.4, 4.7],
    headScale: 0.96,
    dome: {
      y: 1.34,
      z: -0.02,
      r: [1.04, 1.52, 1.34],
    },
    wall: !0,
    body(n, e) {
      (n.add(k.rbox(2.02, 0.34, 3.34, 0.16, e.rb), D.CARBON, [0, 0.4, 0]),
        n.add(k.sphere(...e.sph), D.PAINT, [0, 0.78, 0.04], null, [1.12, 0.56, 1.86]),
        n.add(k.sphere(...e.sph), D.WHITE, [0, 0.96, 0.72], null, [0.84, 0.34, 1.02]),
        n.add(k.rbox(1.42, 0.3, 0.6, 0.16, e.rb), D.ACCENT_DIM, [0, 0.7, 1.92]),
        n.add(k.rbox(1.86, 0.12, 0.16, 0.05, e.rbs), D.ACCENT, [0, 0.7, 2.12]),
        n.mir(function (t) {
          (this.add(k.rbox(0.3, 0.56, 2.6, 0.22, e.rb), D.PAINT_DEEP, [t * 1, 0.58, 0]),
            this.add(k.rbox(0.13, 0.14, 2.3, 0.06, e.rbs), D.ACCENT, [t * 1.13, 0.56, 0]),
            this.add(k.rbox(0.22, 0.28, 1.4, 0.1, e.rb), D.ACCENT_DIM, [t * 1.1, 0.88, 0.28]));
        }),
        or(n, e, this, 1, 0.8),
        n.add(k.sphere(...e.sph), D.PAINT_DEEP, [0, 1.36, -0.86], null, [0.78, 0.46, 0.42]),
        n.add(k.rbox(1.92, 0.38, 1, 0.18, e.rb), D.PAINT, [0, 0.88, -1.28]),
        n.add(k.rbox(1.6, 0.1, 0.8, 0.04, e.rbs), D.ACCENT, [0, 1.08, -1.24]),
        n.add(k.torus(1.02, 0.075, 5, 20), D.CHROME, [0, 1.36, -0.02], null, [1, 1, 1.3]),
        n.add(k.rbox(1.44, 0.12, 0.42, 0.05, e.rb), D.ACCENT, [0, 1.12, -1.44], [0.18, 0, 0]),
        n.add(k.rbox(0.18, 0.52, 1.1, 0.08, e.rb), D.ACCENT_DIM, [0, 1.3, -1.24], [0.12, 0, 0]),
        n.add(k.rbox(0.09, 0.09, 1, 0.04, e.rbs), D.ACCENT, [0, 1.52, -1.2], [0.12, 0, 0]),
        lr(n, e, 0.6, 0.8, 2.08, 0.24, 0.13),
        cr(n, e, 0.66, 0.9, -1.76, 0.5));
    },
  },
  {
    track: 1.08,
    fz: 1.14,
    rz: -1.02,
    fw: {
      r: 0.4,
      w: 0.34,
    },
    rw: {
      r: 0.66,
      w: 0.62,
    },
    seatY: 1.22,
    seatZ: -0.26,
    headY: 2.08,
    headZ: -0.16,
    wheelZ: 0.6,
    tail: [0.3, 1.18, -0.7],
    plate: [0, 0.92, -1.62],
    pipes: [
      [-0.7, 1.02, -1.52],
      [0.7, 1.02, -1.52],
    ],
    pipeR: 0.18,
    shadow: [3.3, 4.5],
    body(n, e) {
      (n.add(k.rbox(1.82, 0.3, 2.96, 0.13, e.rb), D.CARBON, [0, 0.46, -0.1], [0.055, 0, 0]),
        n.add(k.rbox(1.62, 0.62, 1.62, 0.22, e.rb), D.PAINT, [0, 0.9, -0.44], [0.05, 0, 0]),
        n.add(k.rbox(1.44, 0.44, 1.34, 0.18, e.rb), D.PAINT, [0, 0.74, 0.88], [0.05, 0, 0]),
        n.add(k.rbox(0.8, 0.44, 0.76, 0.12, e.rb), D.CARBON_LIGHT, [0, 1.14, 0.78]),
        n.add(k.rbox(0.86, 0.16, 0.56, 0.07, e.rb), D.CHROME, [0, 1.38, 0.78]),
        n.mir(function (t) {
          (this.add(k.cyl(0.17, 0.13, 0.34, 10), D.CHROME, [t * 0.24, 1.62, 0.96]),
            this.add(k.cyl(0.17, 0.13, 0.34, 10), D.CHROME, [t * 0.24, 1.62, 0.6]),
            this.add(k.cyl(0.185, 0.185, 0.05, 10), D.ACCENT, [t * 0.24, 1.79, 0.96]),
            this.add(k.cyl(0.185, 0.185, 0.05, 10), D.ACCENT, [t * 0.24, 1.79, 0.6]));
        }),
        n.add(k.rbox(1.02, 0.3, 0.62, 0.16, e.rb), D.PAINT, [0, 0.62, 1.72], [0.05, 0, 0]),
        n.add(k.rbox(2.1, 0.24, 0.3, 0.1, e.rb), D.CHROME_DARK, [0, 0.56, 1.86]),
        n.add(k.rbox(1.34, 0.11, 0.13, 0.05, e.rbs), D.ACCENT, [0, 0.54, 2]),
        n.mir(function (t) {
          for (let i = 0; i < 3; i++)
            this.add(
              k.cyl(0.1, 0.11, 1.42, 9),
              D.CHROME,
              [t * (1.04 + i * 0.012), 0.7 + i * 0.17, 0.06 - i * 0.04],
              [ft / 2 - 0.1, 0, t * 0.05],
            );
          (this.add(k.rbox(0.12, 0.12, 1.3, 0.05, e.rbs), D.ACCENT, [t * 0.88, 0.48, 0.1]),
            this.add(k.rbox(0.15, 0.3, 1.44, 0.08, e.rb), D.PAINT_LIGHT, [t * 0.87, 1.04, -0.3]));
        }),
        or(n, e, this, 0.96, 0.9),
        uf(n, e, this, 0.46, 1.78, -0.96, D.CHROME),
        n.add(k.rbox(1.7, 0.46, 0.9, 0.18, e.rb), D.PAINT, [0, 1, -1.32], [0.05, 0, 0]),
        n.mir(function (t) {
          this.add(k.rbox(0.14, 0.52, 0.2, 0.05, e.rbs), D.CHROME_DARK, [t * 0.7, 1.42, -1.42]);
        }),
        n.add(k.rbox(1.96, 0.14, 0.48, 0.06, e.rb), D.PAINT_DEEP, [0, 1.72, -1.46], [0.3, 0, 0]),
        n.add(k.rbox(1.72, 0.06, 0.14, 0.025, e.rbs), D.ACCENT, [0, 1.8, -1.42]),
        lr(n, e, 0.54, 0.74, 1.96, 0.2, 0.2),
        cr(n, e, 0.56, 0.98, -1.66, 0.38));
    },
  },
  {
    track: 1.12,
    fz: 1.06,
    rz: -1.06,
    fw: {
      r: 0.44,
      w: 0.4,
    },
    rw: {
      r: 0.5,
      w: 0.48,
    },
    seatY: 1.14,
    seatZ: -0.18,
    headY: 2,
    headZ: -0.08,
    wheelZ: 0.62,
    tail: [0.3, 1.1, -0.6],
    plate: [0, 0.8, -1.74],
    pipes: [
      [-0.56, 0.6, -1.72],
      [0.56, 0.6, -1.72],
    ],
    pipeR: 0.2,
    shadow: [3.6, 4.6],
    body(n, e) {
      (n.add(k.rbox(1.88, 0.28, 3.06, 0.06, e.rb), D.CARBON, [0, 0.42, 0]),
        n.add(k.rbox(1.5, 0.52, 1.7, 0.09, e.rb), D.PAINT, [0, 0.76, -0.16]),
        n.add(k.rbox(1.34, 0.34, 1.2, 0.07, e.rb), D.PAINT_LIGHT, [0, 0.7, 1.02], [-0.08, 0, 0]),
        n.add(k.rbox(1, 0.26, 0.9, 0.06, e.rb), D.PAINT, [0, 0.62, 1.84], [-0.12, 0, 0]),
        n.add(k.rbox(2.12, 0.18, 0.28, 0.05, e.rb), D.CARBON_LIGHT, [0, 0.52, 1.96]),
        n.add(k.rbox(0.1, 0.07, 2.3, 0.03, e.rbs), D.ACCENT, [0, 1.04, 0.46]),
        n.mir(function (t) {
          (this.add(k.rbox(0.07, 0.06, 1.4, 0.025, e.rbs), D.ACCENT_EDGE, [t * 0.4, 1.02, 0.3]),
            this.add(k.rbox(0.6, 0.06, 0.07, 0.025, e.rbs), D.ACCENT_EDGE, [t * 0.3, 1.02, -0.42]));
        }),
        bl(n, e, 0.98, 0.44, 2.3, 0, D.ACCENT_EDGE),
        n.mir(function (t) {
          (this.add(k.rbox(0.1, 0.44, 1.9, 0.04, e.rbs), D.CARBON_LIGHT, [t * 1.3, 0.78, -0.1], [0, 0, t * 0.22]),
            this.add(k.rbox(0.13, 0.12, 1.7, 0.05, e.rbs), D.ACCENT, [t * 1.36, 0.62, -0.1]),
            this.add(k.rbox(0.14, 0.3, 0.3, 0.06, e.rbs), D.PAINT_LIGHT, [t * 1.28, 1.02, -0.86], [0, 0, t * 0.22]));
        }),
        or(n, e, this, 0.96, 0.84),
        n.add(k.rbox(0.96, 0.34, 0.46, 0.08, e.rb), D.CARBON_LIGHT, [0, 1.52, -0.86]),
        n.add(k.rbox(0.8, 0.08, 0.34, 0.03, e.rbs), D.ACCENT, [0, 1.7, -0.86]),
        n.add(k.rbox(1.64, 0.34, 0.96, 0.08, e.rb), D.PAINT, [0, 0.86, -1.3]),
        n.add(k.cyl(0.05, 0.05, 1.3, 8), D.CHROME_DARK, [0, 1.62, -1.56], [0.22, 0, 0]),
        n.add(k.cyl(0.34, 0.1, 0.22, 14, !0), D.PAINT_LIGHT, [0, 2.26, -1.42], [1.05, 0, 0]),
        n.add(k.sphere(8, 6), D.ACCENT_EDGE, [0, 2.26, -1.3], null, [0.075, 0.075, 0.075]),
        n.mir(function (t) {
          this.add(k.rbox(0.12, 0.58, 0.18, 0.05, e.rbs), D.CARBON, [t * 0.7, 1.18, -1.36]);
        }),
        n.add(k.rbox(2.2, 0.11, 0.5, 0.05, e.rb), D.PAINT_DEEP, [0, 1.5, -1.4], [0.18, 0, 0]),
        n.add(k.rbox(1.96, 0.06, 0.14, 0.025, e.rbs), D.ACCENT_EDGE, [0, 1.58, -1.36]),
        lr(n, e, 0.5, 0.74, 2.02, 0.26, 0.1),
        cr(n, e, 0.58, 0.88, -1.72, 0.42));
    },
  },
  {
    track: 1.26,
    fz: 1.2,
    rz: -1.14,
    fw: {
      r: 0.62,
      w: 0.5,
    },
    rw: {
      r: 0.64,
      w: 0.4,
    },
    seatY: 1.42,
    seatZ: -0.18,
    headY: 2.26,
    headZ: -0.08,
    wheelZ: 0.66,
    headScale: 1.04,
    driverScale: 1.12,
    tailScale: 1.05,
    tail: [0.36, 1.34, -0.7],
    plate: [0, 1.02, -1.86],
    pipes: [
      [-0.96, 1.7, -1.2],
      [0.96, 1.7, -1.2],
    ],
    pipeR: 0.22,
    shadow: [4.3, 5.1],
    dualRear: 0.44,
    knobbly: !0,
    body(n, e) {
      (n.add(k.rbox(2.38, 0.44, 3.34, 0.12, e.rb), D.CARBON, [0, 0.56, 0]),
        n.add(k.rbox(2.12, 0.86, 1.94, 0.16, e.rb), D.PAINT, [0, 1.16, -0.28]),
        n.add(k.rbox(1.98, 0.74, 1.42, 0.14, e.rb), D.PAINT_DEEP, [0, 1.04, 1.06]),
        n.add(k.rbox(1.62, 0.24, 1.1, 0.09, e.rb), D.ACCENT_DIM, [0, 1.44, 1.06]),
        n.add(k.rbox(1.7, 0.54, 0.22, 0.07, e.rb), D.GRID, [0, 0.96, 1.78]));
      for (let t = -2; t <= 2; t++)
        n.add(k.rbox(0.12, 0.46, 0.1, 0.04, e.rbs), D.CHROME_DARK, [t * 0.34, 0.96, 1.86]);
      (n.add(k.rbox(2.44, 0.28, 0.36, 0.13, e.rb), D.CHROME_DARK, [0, 0.82, 1.9]),
        n.add(k.rbox(2.44, 0.22, 0.3, 0.1, e.rb), D.CHROME_DARK, [0, 1.42, 1.92]),
        n.mir(function (t) {
          (this.add(k.rbox(0.2, 0.94, 0.24, 0.09, e.rb), D.CHROME_DARK, [t * 0.78, 1.12, 1.9]),
            this.add(k.rbox(0.52, 0.8, 1.56, 0.22, e.rb), D.PAINT_DEEP, [t * 1.16, 1, 1.14]),
            this.add(k.rbox(0.62, 0.84, 1.92, 0.24, e.rb), D.PAINT_DEEP, [t * 1.22, 1, -1.06]),
            this.add(k.rbox(0.24, 0.26, 3, 0.11, e.rb), D.PAINT_LIGHT, [t * 1.23, 1.44, -0.1]),
            this.add(k.cyl(0.09, 0.09, 0.9, 8), D.CHROME_DARK, [t * 1.02, 1.9, 1.62], [-0.3, 0, 0]));
        }),
        n.add(k.rbox(1.9, 0.14, 0.16, 0.06, e.rbs), D.ACCENT, [0, 1.48, 1.88]),
        bl(n, e, 1.18, 0.56, 2.7, 0, D.ACCENT),
        or(n, e, this, 1.24, 1.04),
        n.mir(function (t) {
          (this.add(k.cyl(0.105, 0.105, 1.6, 8), D.CHROME_DARK, [t * 0.96, 2.5, -1.02], [0.1, 0, 0]),
            this.add(k.cyl(0.105, 0.105, 1.72, 8), D.CHROME_DARK, [t * 1, 2.44, 0.9], [-0.16, 0, 0]),
            this.add(k.cyl(0.09, 0.09, 2.06, 8), D.CHROME_DARK, [t * 0.98, 3.26, -0.06], [ft / 2, 0, 0]));
        }),
        n.add(k.rbox(2.32, 0.3, 0.4, 0.14, e.rb), D.CARBON_LIGHT, [0, 3.4, 0.9]));
      for (let t = -2; t <= 2; t++)
        n.add(k.cyl(0.145, 0.145, 0.14, 12), D.LAMP, [t * 0.46, 3.4, 1.1], [ft / 2, 0, 0]);
      (n.add(k.rbox(2.18, 0.12, 0.16, 0.05, e.rbs), D.ACCENT, [0, 3.3, -1.08]),
        n.add(k.rbox(2.1, 0.62, 1.16, 0.16, e.rb), D.PAINT, [0, 1.12, -1.42]),
        n.add(k.rbox(1.86, 0.22, 0.58, 0.09, e.rb), D.CHROME_DARK, [0, 0.7, -1.92]),
        n.add(k.rbox(1.6, 0.12, 0.16, 0.05, e.rbs), D.ACCENT, [0, 1.48, -1.92]),
        lr(n, e, 0.74, 1, 1.92, 0.28, 0.24),
        cr(n, e, 0.8, 1.22, -1.94, 0.52));
    },
  },
  {
    track: 1.04,
    fz: 1.22,
    rz: -1.1,
    fw: {
      r: 0.4,
      w: 0.34,
    },
    rw: {
      r: 0.52,
      w: 0.52,
    },
    seatY: 1.06,
    seatZ: -0.24,
    headY: 1.9,
    headZ: -0.14,
    wheelZ: 0.58,
    headScale: 0.96,
    driverScale: 0.94,
    tail: [0.26, 1.04, -0.62],
    plate: [0, 0.74, -1.86],
    pipes: [
      [-0.3, 0.56, -1.86],
      [0.3, 0.56, -1.86],
    ],
    pipeR: 0.17,
    shadow: [3.4, 5.2],
    body(n, e) {
      (n.add(k.rbox(1.2, 0.3, 3.6, 0.14, e.rb), D.PAINT, [0, 0.46, 0.1]),
        n.add(k.rbox(1.06, 0.46, 1.6, 0.2, e.rb), D.PAINT, [0, 0.7, -0.26]),
        n.add(k.rbox(0.78, 0.32, 1.5, 0.15, e.rb), D.PAINT, [0, 0.62, 1.16], [-0.05, 0, 0]),
        n.add(k.cone(1, 1, 10), D.PAINT_LIGHT, [0, 0.56, 2.14], [ft / 2, 0, 0], [0.34, 0.5, 0.26]),
        n.add(k.rbox(0.42, 0.08, 2, 0.03, e.rbs), D.ACCENT, [0, 0.86, 0.9], [-0.04, 0, 0]),
        n.add(k.rbox(2.24, 0.09, 0.52, 0.04, e.rb), D.PAINT_DEEP, [0, 0.34, 2.36], [0.16, 0, 0]),
        n.add(k.rbox(2.24, 0.07, 0.34, 0.03, e.rbs), D.ACCENT, [0, 0.46, 2.22], [0.22, 0, 0]),
        n.mir(function (t) {
          (this.add(k.rbox(0.09, 0.36, 0.56, 0.04, e.rbs), D.PAINT_LIGHT, [t * 1.1, 0.46, 2.34]),
            this.add(k.rbox(0.46, 0.44, 1.5, 0.19, e.rb), D.PAINT_DEEP, [t * 0.82, 0.62, 0.02]),
            this.add(k.rbox(0.34, 0.14, 1.2, 0.06, e.rb), D.PAINT_LIGHT, [t * 0.82, 0.85, 0.02]),
            this.add(k.rbox(0.14, 0.12, 1.3, 0.05, e.rbs), D.ACCENT, [t * 1.02, 0.6, 0.02]),
            this.add(k.rbox(0.3, 0.3, 0.12, 0.09, e.rbs), D.GRID, [t * 0.84, 0.66, 0.78]),
            this.add(k.rbox(0.07, 0.3, 0.6, 0.03, e.rbs), D.CARBON, [t * 1.04, 0.5, 1.2], [0, 0, t * 0.2]));
        }),
        or(n, e, this, 0.84, 0.76),
        n.add(k.rbox(0.7, 0.34, 0.46, 0.12, e.rb), D.PAINT_DEEP, [0, 1.44, -0.86]),
        n.add(k.rbox(0.13, 1, 1.3, 0.06, e.rb), D.PAINT, [0, 1.7, -1.28], [0.1, 0, 0]),
        n.add(k.rbox(0.07, 0.1, 1.1, 0.03, e.rbs), D.ACCENT_EDGE, [0, 2.16, -1.24], [0.1, 0, 0]),
        n.add(k.rbox(1.3, 0.32, 1, 0.14, e.rb), D.PAINT, [0, 0.66, -1.4]),
        n.mir(function (t) {
          this.add(k.rbox(0.1, 0.7, 0.58, 0.04, e.rbs), D.PAINT_LIGHT, [t * 1.1, 1.44, -1.76]);
        }),
        n.add(k.rbox(2.24, 0.11, 0.56, 0.05, e.rb), D.PAINT_DEEP, [0, 1.74, -1.8], [0.28, 0, 0]),
        n.add(k.rbox(2, 0.06, 0.16, 0.025, e.rbs), D.ACCENT_EDGE, [0, 1.84, -1.74]),
        n.add(k.rbox(1.1, 0.16, 0.46, 0.06, e.rbs), D.CARBON, [0, 0.34, -1.86], [-0.28, 0, 0]),
        lr(n, e, 0.34, 0.66, 2.24, 0.14, 0.1),
        cr(n, e, 0.44, 0.78, -1.86, 0.3));
    },
  },
];
function s1() {
  if (typeof document == "undefined") return null;
  let n = 128,
    e = document.createElement("canvas");
  e.width = e.height = n;
  let t = e.getContext("2d");
  ((t.fillStyle = "#0a1830"), t.fillRect(0, 0, n, n), (t.strokeStyle = "#7fe6ff"), (t.lineWidth = 2));
  for (let r = 0; r <= 8; r++) {
    let s = (r / 8) * n;
    ((t.globalAlpha = 0.55),
      t.beginPath(),
      t.moveTo(s, 0),
      t.lineTo(s, n),
      t.stroke(),
      t.beginPath(),
      t.moveTo(0, s),
      t.lineTo(n, s),
      t.stroke());
  }
  t.globalAlpha = 0.9;
  for (let r = 0; r < 8; r++)
    for (let s = 0; s < 8; s++) (r + s) % 3 || ((t.fillStyle = "#c9f6ff"), t.fillRect(r * 16 + 5, s * 16 + 5, 6, 6));
  let i = new CanvasTexture(e);
  return ((i.colorSpace = Ft), (i.wrapS = i.wrapT = RepeatWrapping), i.repeat.set(3, 2), i);
}
function a1(n, e) {
  let t = new Group(),
    i = n.pipes[0][2];
  t.position.z = i;
  let r = cf();
  r && (r.flipY = !1);
  let s = (c, l, h, p, u) => {
      let f = new Hn();
      for (let y of n.pipes)
        f.add(k.cone(1, 1, 12), null, [y[0], y[1], y[2] - i - h * 0.5 + p], [-ft / 2, 0, 0], [l, h, l]);
      let g = new Mesh(
        f.build(),
        new MeshBasicMaterial({
          color: c,
          map: r,
          transparent: !0,
          opacity: u,
          blending: nn,
          depthWrite: !1,
          side: ii,
          toneMapped: !1,
        }),
      );
      return ((g.frustumCulled = !1), g);
    },
    a = s(e, n.pipeR * 1.35, 1.9, -0.12, 0.85),
    o = s(16777215, n.pipeR * 0.72, 1.15, -0.05, 0.95);
  return (t.add(a, o), (t.visible = !1), (t.userData.core = o), t);
}
