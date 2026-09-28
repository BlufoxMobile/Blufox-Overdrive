/* actors-parts.js — geometry kit, palette-atlas materials and merge helpers for
   the Blufox Overdrive cast.

   The single idea that makes the karts both prettier and cheaper than the old
   models: every opaque surface on a kart shares ONE MeshStandardMaterial. Colour,
   roughness, metalness and emissive come from three 16x8 pixel lookup textures,
   and every vertex of a part carries the UV of its palette slot. Because the UV is
   constant across each part, NearestFilter sampling is exact — no bleeding, no
   mipmap care — so we can merge the whole chassis into a single draw call and
   still have chrome next to rubber next to glowing neon.

   Nothing here imports anything but three, so the file is safe to build against
   while sibling modules are being rewritten. */
import * as T from './three.module.js';

/* ===================== colour helpers ===================== */
export const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
export function toRGB(h) { return [(h >> 16 & 255) / 255, (h >> 8 & 255) / 255, (h & 255) / 255]; }
export function fromRGB(c) {
 return (Math.round(clamp(c[0], 0, 1) * 255) << 16) | (Math.round(clamp(c[1], 0, 1) * 255) << 8) | Math.round(clamp(c[2], 0, 1) * 255);
}
export function mixHex(a, b, t) {
 const x = toRGB(a), y = toRGB(b);
 return fromRGB([x[0] + (y[0] - x[0]) * t, x[1] + (y[1] - x[1]) * t, x[2] + (y[2] - x[2]) * t]);
}
export const lighten = (h, t) => mixHex(h, 0xffffff, t);
export const darken = (h, t) => mixHex(h, 0x000000, t);
export function luma(h) { const c = toRGB(h); return .2126 * c[0] + .7152 * c[1] + .0722 * c[2]; }
/* Raise a colour to a floor brightness without washing out its hue. Onyx's slate
   and Blu's mid blue both have to survive being 60 px tall on a night circuit. */
export function lift(h, floor) { const l = luma(h); return l >= floor ? h : lighten(h, clamp((floor - l) / (1 - l + 1e-4), 0, .8)); }
export function saturate(h, k) {
 const c = toRGB(h), g = .2126 * c[0] + .7152 * c[1] + .0722 * c[2];
 return fromRGB([g + (c[0] - g) * k, g + (c[1] - g) * k, g + (c[2] - g) * k]);
}

/* ===================== palette atlas ===================== */
const PW = 16, PH = 8;                      // atlas is 16x8 texels: 128 slots
export const SLOT = {};
const SLOT_ORDER = [];
function slot(name) { SLOT[name] = SLOT_ORDER.length; SLOT_ORDER.push(name); return SLOT[name]; }
/* Order is the atlas layout; keep additions at the end. */
['PAINT', 'PAINT_DEEP', 'PAINT_LIGHT', 'ACCENT', 'ACCENT_DIM', 'ACCENT_EDGE',
 'CARBON', 'CARBON_LIGHT', 'RUBBER', 'RUBBER_WALL', 'CHROME', 'CHROME_DARK',
 'GOLD', 'WHITE', 'LENS', 'SEAT', 'LAMP', 'TAILLAMP',
 'FUR', 'FUR_DEEP', 'FUR_LIGHT', 'EAR_INNER', 'EYE', 'EYE_GLINT', 'NOSE',
 'TRIM_WARM', 'GRID'].forEach(slot);

/* uv of a slot's texel centre */
export function slotUV(i) { return [((i % PW) + .5) / PW, (Math.floor(i / PW) + .5) / PH]; }

function dataTex(bytes, srgb) {
 const tex = new T.DataTexture(bytes, PW, PH, T.RGBAFormat, T.UnsignedByteType);
 tex.magFilter = T.NearestFilter; tex.minFilter = T.NearestFilter;
 tex.generateMipmaps = false; tex.wrapS = tex.wrapT = T.ClampToEdgeWrapping;
 tex.colorSpace = srgb ? T.SRGBColorSpace : T.NoColorSpace;
 tex.needsUpdate = true; return tex;
}

/* spec: {c: albedo, r: roughness, m: metalness, e: emissive hex, ei: emissive scale} */
export function buildPalette(spec, opts = {}) {
 const alb = new Uint8Array(PW * PH * 4), orm = new Uint8Array(PW * PH * 4), emi = new Uint8Array(PW * PH * 4);
 for (let i = 0; i < PW * PH; i++) {
  const s = spec[i] || { c: 0xff00ff, r: .5, m: 0 };
  const c = toRGB(s.c), o = i * 4;
  alb[o] = c[0] * 255; alb[o + 1] = c[1] * 255; alb[o + 2] = c[2] * 255; alb[o + 3] = 255;
  orm[o] = 255; orm[o + 1] = clamp(s.r, 0, 1) * 255; orm[o + 2] = clamp(s.m, 0, 1) * 255; orm[o + 3] = 255;
  const e = s.e ? toRGB(s.e) : [0, 0, 0], k = s.ei === undefined ? 1 : s.ei;
  emi[o] = clamp(e[0] * k, 0, 1) * 255; emi[o + 1] = clamp(e[1] * k, 0, 1) * 255; emi[o + 2] = clamp(e[2] * k, 0, 1) * 255; emi[o + 3] = 255;
 }
 const map = dataTex(alb, true), ormTex = dataTex(orm, false), emiTex = dataTex(emi, true);
 const mat = new T.MeshStandardMaterial({
  map, roughnessMap: ormTex, metalnessMap: ormTex, emissiveMap: emiTex,
  color: 0xffffff, roughness: 1, metalness: 1,
  emissive: 0xffffff, emissiveIntensity: opts.emissiveIntensity === undefined ? 1.45 : opts.emissiveIntensity,
  envMapIntensity: opts.envMapIntensity === undefined ? 1.0 : opts.envMapIntensity,
  dithering: true
 });
 mat.userData.paletteTextures = [map, ormTex, emiTex];
 return mat;
}

/* ===================== geometry kit ===================== */
const _cache = new Map();
function ck(key, make) { let g = _cache.get(key); if (!g) { g = make(); _cache.set(key, g); } return g; }

/* A box whose edges are actually rounded. Sharp unlit corners are the single
   loudest "1998 toy" tell, and a 2-3 segment box costs 48-108 triangles. */
export function roundedBoxGeometry(w, h, d, r, seg) {
 r = Math.min(r, w / 2 - 1e-4, h / 2 - 1e-4, d / 2 - 1e-4);
 if (r <= 1e-4 || seg < 2) return new T.BoxGeometry(w, h, d);
 const g = new T.BoxGeometry(w, h, d, seg, seg, seg);
 const p = g.attributes.position, n = g.attributes.normal;
 const hx = w / 2 - r, hy = h / 2 - r, hz = d / 2 - r;
 for (let i = 0; i < p.count; i++) {
  const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
  const cx = clamp(x, -hx, hx), cy = clamp(y, -hy, hy), cz = clamp(z, -hz, hz);
  let dx = x - cx, dy = y - cy, dz = z - cz;
  const len = Math.hypot(dx, dy, dz) || 1;
  dx /= len; dy /= len; dz /= len;
  p.setXYZ(i, cx + dx * r, cy + dy * r, cz + dz * r);
  n.setXYZ(i, dx, dy, dz);
 }
 p.needsUpdate = true; n.needsUpdate = true;
 return g;
}

export const G = {
 /* unit sphere — scale it in the part transform, normals are fixed up on merge */
 sphere: (w = 16, h = 11) => ck(`sp${w},${h}`, () => new T.SphereGeometry(1, w, h)),
 box: (w, h, d) => ck(`bx${w},${h},${d}`, () => new T.BoxGeometry(w, h, d)),
 rbox: (w, h, d, r = .08, seg = 3) => ck(`rb${w},${h},${d},${r},${seg}`, () => roundedBoxGeometry(w, h, d, r, seg)),
 cyl: (rt, rb, h, s = 12, open = false) => ck(`cy${rt},${rb},${h},${s},${open}`, () => new T.CylinderGeometry(rt, rb, h, s, 1, open)),
 cone: (r, h, s = 8) => ck(`co${r},${h},${s}`, () => new T.ConeGeometry(r, h, s)),
 torus: (r, t, rs = 6, ts = 16, arc = Math.PI * 2) => ck(`to${r},${t},${rs},${ts},${arc.toFixed(3)}`, () => new T.TorusGeometry(r, t, rs, ts, arc)),
 capsule: (r, len, cap = 3, rad = 10) => ck(`ca${r},${len},${cap},${rad}`, () => new T.CapsuleGeometry(r, len, cap, rad)),
 plane: (w, h) => ck(`pl${w},${h}`, () => new T.PlaneGeometry(w, h)),
 lathe: (pts, s = 16) => ck(`la${s}:${pts.map(p => p[0].toFixed(3) + '_' + p[1].toFixed(3)).join('|')}`,
  () => new T.LatheGeometry(pts.map(p => new T.Vector2(p[0], p[1])), s))
};
export function clearGeometryCache() { _cache.forEach(g => g.dispose()); _cache.clear(); }

/* ===================== merge builder ===================== */
const _m4 = new T.Matrix4(), _m3 = new T.Matrix3(), _q = new T.Quaternion(), _e = new T.Euler(), _v = new T.Vector3();

export class Build {
 constructor() { this.parts = []; this.verts = 0; this.idx = 0; }
 /* geo: shared base geometry. s: palette slot, or null to keep the source UVs
    (used by the boost flame, which wants a real gradient across the cone).
    p/r/sc: [x,y,z] arrays (optional). */
 add(geo, s, p, r, sc) {
  _e.set(r ? r[0] : 0, r ? r[1] : 0, r ? r[2] : 0);
  _q.setFromEuler(_e);
  _m4.compose(_v.set(p ? p[0] : 0, p ? p[1] : 0, p ? p[2] : 0), _q,
   new T.Vector3(sc ? sc[0] : 1, sc ? sc[1] : 1, sc ? sc[2] : 1));
  const m = _m4.clone();
  this.parts.push({ geo, s, m });
  this.verts += geo.attributes.position.count;
  this.idx += geo.index ? geo.index.count : geo.attributes.position.count;
  return this;
 }
 /* same part on both sides; fn receives the sign so you can flip rotations */
 mir(fn) { fn.call(this, -1); fn.call(this, 1); return this; }
 get empty() { return this.parts.length === 0; }
 get triangles() { return this.idx / 3; }
 build() {
  const vc = this.verts, ic = this.idx;
  const pos = new Float32Array(vc * 3), nor = new Float32Array(vc * 3), uv = new Float32Array(vc * 2);
  const index = vc > 65535 ? new Uint32Array(ic) : new Uint16Array(ic);
  let vo = 0, io = 0;
  for (const part of this.parts) {
   const g = part.geo, sp = g.attributes.position, sn = g.attributes.normal;
   const count = sp.count;
   _m3.getNormalMatrix(part.m);
   const keepUV = part.s === null ? g.attributes.uv : null;
   const uvv = keepUV ? [0, 0] : slotUV(part.s);
   const e = part.m.elements, ne = _m3.elements;
   for (let i = 0; i < count; i++) {
    const x = sp.getX(i), y = sp.getY(i), z = sp.getZ(i), o = (vo + i) * 3;
    pos[o] = e[0] * x + e[4] * y + e[8] * z + e[12];
    pos[o + 1] = e[1] * x + e[5] * y + e[9] * z + e[13];
    pos[o + 2] = e[2] * x + e[6] * y + e[10] * z + e[14];
    let nx = sn.getX(i), ny = sn.getY(i), nz = sn.getZ(i);
    let tx = ne[0] * nx + ne[3] * ny + ne[6] * nz;
    let ty = ne[1] * nx + ne[4] * ny + ne[7] * nz;
    let tz = ne[2] * nx + ne[5] * ny + ne[8] * nz;
    const l = Math.hypot(tx, ty, tz) || 1;
    nor[o] = tx / l; nor[o + 1] = ty / l; nor[o + 2] = tz / l;
    if (keepUV) { uv[(vo + i) * 2] = keepUV.getX(i); uv[(vo + i) * 2 + 1] = keepUV.getY(i); }
    else { uv[(vo + i) * 2] = uvv[0]; uv[(vo + i) * 2 + 1] = uvv[1]; }
   }
   if (g.index) { const gi = g.index.array; for (let i = 0; i < gi.length; i++) index[io + i] = gi[i] + vo; io += gi.length; }
   else { for (let i = 0; i < count; i++) index[io + i] = vo + i; io += count; }
   vo += count;
  }
  const out = new T.BufferGeometry();
  out.setAttribute('position', new T.BufferAttribute(pos, 3));
  out.setAttribute('normal', new T.BufferAttribute(nor, 3));
  out.setAttribute('uv', new T.BufferAttribute(uv, 2));
  out.setIndex(new T.BufferAttribute(index, 1));
  out.computeBoundingSphere();
  this.parts.length = 0;
  return out;
 }
}

/* ===================== small canvas textures ===================== */
/* A fresh canvas per call: the engine's dispose() walks every kart it retires,
   and a shared texture torn down under a live kart is a hard-to-find flicker. */
export function softShadowTexture(size = 128) {
 if (typeof document === 'undefined') return null;
 const c = document.createElement('canvas'); c.width = c.height = size;
 const x = c.getContext('2d'), h = size / 2;
 const grad = x.createRadialGradient(h, h, 1, h, h, h - 1);
 for (let i = 0; i <= 20; i++) {
  const t = i / 20;
  const a = Math.pow(Math.max(0, 1 - t), 2.1) * .96 * (1 - Math.pow(t, 5));
  grad.addColorStop(t, `rgba(0,0,0,${a.toFixed(4)})`);
 }
 x.fillStyle = grad; x.fillRect(0, 0, size, size);
 const tex = new T.CanvasTexture(c); tex.colorSpace = T.SRGBColorSpace; return tex;
}

export function plateTexture(text, ink = '#d6faff', bg = '#0a1426') {
 if (typeof document === 'undefined') return null;
 const w = 256, h = 128;
 const c = document.createElement('canvas'); c.width = w; c.height = h;
 const x = c.getContext('2d');
 x.fillStyle = bg; x.fillRect(0, 0, w, h);
 x.strokeStyle = ink; x.globalAlpha = .55; x.lineWidth = 8; x.strokeRect(10, 10, w - 20, h - 20); x.globalAlpha = 1;
 x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle';
 x.font = '900 74px Arial, Helvetica, sans-serif';
 x.fillText(text, w / 2, h / 2 + 4, w * .8);
 const tex = new T.CanvasTexture(c); tex.colorSpace = T.SRGBColorSpace;
 tex.anisotropy = 4; return tex;
}

/* Vertical gradient used by the boost flame so it fades out instead of ending
   in a hard cone edge. */
export function flameTexture() {
 if (typeof document === 'undefined') return null;
 const c = document.createElement('canvas'); c.width = 8; c.height = 64;
 const x = c.getContext('2d');
 const g = x.createLinearGradient(0, 0, 0, 64);
 g.addColorStop(0, 'rgba(255,255,255,1)');
 g.addColorStop(.28, 'rgba(198,244,255,0.92)');
 g.addColorStop(.62, 'rgba(96,196,255,0.45)');
 g.addColorStop(1, 'rgba(60,130,255,0)');
 x.fillStyle = g; x.fillRect(0, 0, 8, 64);
 const tex = new T.CanvasTexture(c); tex.colorSpace = T.SRGBColorSpace; return tex;
}

/* ===================== misc ===================== */
export const approach = (cur, target, rate, dt) => cur + (target - cur) * (1 - Math.exp(-rate * Math.max(dt, 0)));
