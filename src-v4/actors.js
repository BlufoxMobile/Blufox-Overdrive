/* actors.js — the Blufox Overdrive cast and their machines.
   ---------------------------------------------------------------------------
   PUBLIC API

     makeKart(id, opts?)            -> THREE.Group   (drawable immediately)
     makeProceduralKart(id, opts?)  -> THREE.Group   (the old hand-built kart)
     preloadKarts()                 -> Promise<boolean[]>  never rejects
     kartsReady()                   -> boolean   all eight GLBs are in memory
     updateKart(group, state, dt)   -> void    (safe no-op on missing fields)
     disposeKart(group)             -> void
     kartStats(group)               -> {triangles, drawCalls, meshes}
     KART_ARCHETYPES                -> readable archetype name per driver id

   THE MODELS. Since 2026-09-28 each driver is a textured GLB (assets/kart-*.glb,
   ~16k triangles, one mesh, one material, kart and driver baked as one piece)
   loaded through assets.js. makeKart() is still synchronous: it returns the
   procedural kart at once and swaps the GLB in underneath when it arrives —
   or straight away, if preloadKarts() has already been awaited. If the file
   never arrives the procedural kart simply stays. The flame, the shield and
   the blob shadow are always separate procedural children, so boosts and
   items look the same on either.

   opts = { detail: 'high' | 'low', model: 'glb' | 'procedural', onModel(g) }
     detail  tier of the procedural placeholder / fallback ('low' is
             ~3.4–4.5k triangles against ~8.8–10.9k)
     model   'procedural' never touches the network; use it for rivals on the
             lowest quality tier if the 16k-triangle meshes cost too much there
     onModel called once the real model is attached (the engine re-measures
             the kart's width for collision)

   userData — the original engine.js contract, unchanged:
     head    Group   the driver's NECK pivot. engine.js may keep writing
                     head.rotation.z; updateKart animates an inner rig instead,
                     so the two compose rather than fight.
     flame   Group   boost flame, hidden until .visible = true
     shield  Mesh    xFI shield bubble, hidden until .visible = true
     wheels  Array   spinning wheel nodes; `w.rotation.x += n` still spins them.
                     NOTE: length 3, not 4 — [frontLeft, frontRight, rearAxle].
                     Both rear wheels share one axle and one merged mesh, so one
                     node drives them. Any forEach/for..of over the array works
                     exactly as before; only a hard-coded wheels[3] would not.
                     EMPTY once the GLB is in: its wheels are baked into the
                     mesh. The array is emptied in place, never replaced.

   userData — additions, all optional for callers:
     rig      {chassis, headRig, tailRig, steer:[L,R], wheels, shadow, plate,
               glass, flameCore}
     anim     internal smoothing state owned by updateKart()
     driverId, detail, archetype
     palette  the single MeshStandardMaterial every opaque surface shares
     extraMaterials  flame/shield/shadow/plate/glass materials

   COST. A GLB kart is 2 draw calls standing still (mesh + blob shadow, ~17k
   triangles), 4 boosting, 5 shielded; the grid is 16 draws / 136k triangles
   against the procedural cast's 65 draws / 74k (scratch/glb-perf.html).

   WHY THE PROCEDURAL KART IS CHEAP. Colour, roughness, metalness and emissive all come from a
   16x8 pixel palette atlas (see actors-parts.js), and every vertex of a part
   carries the UV of its palette slot. One material therefore covers chrome next
   to rubber next to glowing neon, which lets the whole chassis, the head, the
   tail and each wheel be a single merged mesh. Standing still a kart is
   8 draw calls at high detail (chassis, head, tail, 2 front wheels, rear axle,
   blob shadow, number plate; Frost adds a glass canopy) and 7 at low, against
   about 20 for the model this replaces. Boosting adds 2, shielded adds 1.
   --------------------------------------------------------------------------- */
import * as T from './three.module.js';
import { DRIVERS } from './data.js';
import { loadModel, getModelSync, preload, isLoaded } from './assets.js';
import {
 G, Build, SLOT, buildPalette, softShadowTexture, plateTexture, flameTexture,
 lighten, darken, lift, saturate, luma, approach, clamp
} from './actors-parts.js';

const S = SLOT;
const PI = Math.PI;

export const KART_ARCHETYPES = [
 'classic kart', 'low wedge', 'light buggy', 'bubble cruiser',
 'hot rod', 'tech racer', 'heavy hauler', 'formula'
];

/* ===================== quality tiers ===================== */
const TIERS = {
 high: { sph: [16, 11], torso: [16, 11], head: [20, 14], eye: [10, 7], glint: [6, 4], tailSph: [10, 7], tailSegs: 4,
  rb: 3, rbs: 2, wheel: 18, spokes: 5, tor: [5, 16], cap: [2, 8], plate: true, tail: true, extras: true },
 low: { sph: [8, 6], torso: [8, 6], head: [10, 7], eye: [6, 4], glint: [4, 3], tailSph: [8, 6], tailSegs: 2,
  rb: 1, rbs: 1, wheel: 9, spokes: 0, tor: [3, 9], cap: [1, 6], plate: false, tail: false, extras: false }
};

/* ===================== palette ===================== */
function paletteFor(d) {
 const base = lift(saturate(d.color, 1.08), .44);
 const accent = lift(saturate(d.accent, 1.05), .46);
 const fur = lift(saturate(d.color, 1.02), .34);
 /* On a pale driver (Frost, Knox) "lighter" is indistinguishable from white, so
    the highlight tone gets more saturation instead of more brightness. */
 const light = luma(base) > .60 ? saturate(darken(base, .16), 1.5) : saturate(lighten(base, .15), 1.08);
 const spec = [];
 spec[S.PAINT] = { c: base, r: .26, m: .46, e: base, ei: .11 };
 spec[S.PAINT_DEEP] = { c: darken(base, .50), r: .34, m: .46, e: base, ei: .05 };
 spec[S.PAINT_LIGHT] = { c: light, r: .20, m: .40, e: light, ei: .08 };
 spec[S.ACCENT] = { c: lighten(accent, .18), r: .36, m: .18, e: accent, ei: 1.25 };
 spec[S.ACCENT_DIM] = { c: accent, r: .44, m: .04, e: accent, ei: .45 };
 spec[S.ACCENT_EDGE] = { c: lighten(accent, .55), r: .30, m: .02, e: lighten(accent, .34), ei: 1.1 };
 spec[S.CARBON] = { c: 0x0d1424, r: .40, m: .42 };
 spec[S.CARBON_LIGHT] = { c: 0x212c46, r: .36, m: .50 };
 spec[S.RUBBER] = { c: 0x101420, r: .88, m: .02 };
 spec[S.RUBBER_WALL] = { c: 0x1b2230, r: .74, m: .04 };
 spec[S.CHROME] = { c: 0xe9f2ff, r: .12, m: 1 };
 spec[S.CHROME_DARK] = { c: 0x8ea1bd, r: .27, m: 1 };
 spec[S.GOLD] = { c: 0xffd45f, r: .17, m: 1, e: 0xffa825, ei: .12 };
 spec[S.WHITE] = { c: 0xf6fbff, r: .50, m: .02 };
 spec[S.LENS] = { c: 0x0c1223, r: .07, m: .62, e: accent, ei: .30 };
 spec[S.SEAT] = { c: 0x141b2c, r: .76, m: .06 };
 spec[S.LAMP] = { c: 0xfff5dc, r: .18, m: 0, e: 0xffe7b4, ei: .9 };
 spec[S.TAILLAMP] = { c: 0xff5a6c, r: .28, m: 0, e: 0xff2f4a, ei: 1.0 };
 spec[S.FUR] = { c: fur, r: .78, m: .05, e: fur, ei: .07 };
 spec[S.FUR_DEEP] = { c: darken(fur, .28), r: .82, m: .04 };
 spec[S.FUR_LIGHT] = { c: lighten(fur, .34), r: .74, m: .04 };
 spec[S.EAR_INNER] = { c: d.style === 'hood' ? 0xa9d8f4 : 0xf4b4d6, r: .80, m: 0 };
 spec[S.EYE] = { c: 0x080b16, r: .16, m: .06 };
 spec[S.EYE_GLINT] = { c: 0xffffff, r: .22, m: 0, e: 0xffffff, ei: .6 };
 spec[S.NOSE] = { c: 0x2d2130, r: .32, m: .06 };
 spec[S.TRIM_WARM] = { c: 0x2e3758, r: .48, m: .32 };
 spec[S.GRID] = { c: 0x0b1120, r: .58, m: .22 };
 return buildPalette(spec);
}

/* ===================== wheels ===================== */
/* One wheel, axis along X, centred on the origin. Rounded shoulders instead of
   a cylinder's hard rim, a chrome hub plug and a flared accent lip that reads
   as a lit rim at night — the cheapest way to make a rival legible in the dark. */
function addWheel(b, x, r, w, q, opt = {}) {
 const hw = w / 2, hub = r * (opt.hub || .34), seg = q.wheel;
 const out = opt.out !== undefined ? opt.out : (x >= 0 ? 1 : -1);
 const tyre = opt.knobbly
  ? [[hub, -hw * .86], [r * .93, -hw * 1.00], [r * 1.02, -hw * .52], [r * .95, 0], [r * 1.02, hw * .52], [r * .93, hw * 1.00], [hub, hw * .86]]
  : [[hub, -hw * .86], [r * .94, -hw * .98], [r, -hw * .34], [r, hw * .34], [r * .94, hw * .98], [hub, hw * .86]];
 b.add(G.lathe(tyre, seg), opt.wall ? S.RUBBER_WALL : S.RUBBER, [x, 0, 0], [0, 0, PI / 2]);
 /* hub plug — also caps the lathe's open ends */
 b.add(G.cyl(hub * 1.06, hub * 1.06, w * 1.03, Math.max(8, seg - 4)), S.CHROME_DARK, [x, 0, 0], [0, 0, PI / 2]);
 /* flared glowing rim lip on the outboard face */
 b.add(G.cyl(hub * 1.52, hub * 1.10, w * .17, Math.max(8, seg - 4), true), S.ACCENT,
  [x + out * w * .46, 0, 0], [0, 0, out * PI / 2]);
 /* spokes: thin chrome bars on the outboard face, pointing radially */
 const fx = x + out * w * .43;
 for (let i = 0; i < q.spokes; i++) {
  const a = i / q.spokes * PI * 2;
  b.add(G.box(w * .10, r * .46, .07), S.CHROME_DARK,
   [fx, Math.sin(a) * r * .34, Math.cos(a) * r * .34], [PI / 2 - a, 0, 0]);
 }
}

/* ===================== the driver ===================== */
function addDriverBody(b, q, cfg) {
 const y = cfg.seatY, z = cfg.seatZ === undefined ? -.18 : cfg.seatZ, k = cfg.driverScale || 1;
 /* torso — race suit in the driver's paint, shoulders a touch wider than hips */
 b.add(G.sphere(...q.torso), S.PAINT_DEEP, [0, y, z], null, [.58 * k, .50 * k, .50 * k]);
 b.add(G.sphere(...q.torso), S.PAINT, [0, y + .30 * k, z], null, [.55 * k, .44 * k, .40 * k]);
 /* chest flash + collar */
 b.add(G.rbox(.20, .10, .40, .045, q.rbs), S.ACCENT, [0, y + .34 * k, z + .30 * k]);
 b.add(G.torus(.34 * k, .055 * k, q.tor[0], q.tor[1]), S.ACCENT_DIM, [0, y + .52 * k, z], [PI / 2 - .25, 0, 0]);
 /* arms reaching to the wheel */
 const aw = cfg.wheelZ === undefined ? .66 : cfg.wheelZ;
 b.mir(function (sx) {
  this.add(G.capsule(.145 * k, .40 * k, q.cap[0], q.cap[1]), S.PAINT, [sx * .52 * k, y + .30 * k, z + .30 * k], [-1.02, 0, sx * .13]);
  this.add(G.sphere(...q.eye), S.WHITE, [sx * .50 * k, y + .26 * k, z + aw - .05], null, [.16 * k, .155 * k, .16 * k]);
 });
 /* steering wheel */
 b.add(G.torus(.32 * k, .05 * k, q.tor[0], q.tor[1]), S.CARBON, [0, y + .30 * k, z + aw], [-.62, 0, 0]);
 b.add(G.rbox(.52 * k, .05, .05, .02, q.rbs), S.ACCENT_DIM, [0, y + .30 * k, z + aw], [-.62, 0, 0]);
}

/* ===================== the head ===================== */
function buildHead(d, q, cfg) {
 const b = new Build(), k = cfg.headScale || 1;
 const F = q.head;
 /* skull */
 b.add(G.sphere(...F), S.FUR, [0, .20 * k, 0], null, [.66 * k, .62 * k, .55 * k]);
 /* brow — keeps the forehead from reading as a bald dome */
 b.add(G.sphere(...q.eye), S.FUR_LIGHT, [0, .38 * k, .25 * k], null, [.42 * k, .18 * k, .24 * k]);
 /* muzzle + cheeks + nose */
 b.add(G.sphere(...q.sph), S.FUR_LIGHT, [0, -.03 * k, .40 * k], null, [.30 * k, .23 * k, .24 * k]);
 b.mir(function (sx) { this.add(G.sphere(...q.eye), S.WHITE, [sx * .215 * k, -.06 * k, .345 * k], null, [.190 * k, .155 * k, .175 * k]); });
 b.add(G.sphere(...q.eye), S.NOSE, [0, .055 * k, .585 * k], null, [.085 * k, .065 * k, .075 * k]);
 /* ears — flattened cones, tipped out and forward, with an inner shell */
 b.mir(function (sx) {
  this.add(G.cone(1, 1, 9), S.FUR, [sx * .42 * k, .80 * k, -.04 * k], [-.14, 0, -sx * .26], [.30 * k, .74 * k, .21 * k]);
  if (q.extras) this.add(G.cone(1, 1, 8), S.EAR_INNER, [sx * .425 * k, .80 * k, .045 * k], [-.14, 0, -sx * .26], [.175 * k, .46 * k, .11 * k]);
 });
 /* eyes: big dark almonds with a bright glint — the single strongest readability
    cue on a 60 px kart, so they get real segment counts and an emissive spark */
 b.mir(function (sx) {
  this.add(G.sphere(...q.eye), S.EYE, [sx * .275 * k, .26 * k, .405 * k], [0, sx * .22, 0], [.145 * k, .175 * k, .105 * k]);
  this.add(G.sphere(...q.glint), S.EYE_GLINT, [sx * .315 * k, .325 * k, .475 * k], null, [.048 * k, .055 * k, .035 * k]);
  if (q.extras) this.add(G.sphere(...q.glint), S.EYE_GLINT, [sx * .225 * k, .215 * k, .475 * k], null, [.026 * k, .030 * k, .022 * k]);
 });
 addAccessory(b, d, q, k);
 return b;
}

/* Accessories are the silhouette. Every one of them breaks the head's outline in
   a different place: forehead, eye line, crown, back of the skull, or sides. */
function addAccessory(b, d, q, k) {
 const st = d.style;
 if (st === 'goggles') {
  b.add(G.rbox(1.06 * k, .16 * k, .30 * k, .07, q.rbs), S.CARBON, [0, .47 * k, .14 * k], [.18, 0, 0]);
  b.mir(function (sx) {
   this.add(G.cyl(.215 * k, .215 * k, .16 * k, 12), S.CHROME_DARK, [sx * .29 * k, .46 * k, .38 * k], [PI / 2 + .2, 0, 0]);
   this.add(G.cyl(.175 * k, .175 * k, .06 * k, 12), S.ACCENT, [sx * .29 * k, .475 * k, .455 * k], [PI / 2 + .2, 0, 0]);
  });
  b.add(G.rbox(.22 * k, .10 * k, .12 * k, .04, q.rbs), S.CHROME, [0, .47 * k, .40 * k], [.18, 0, 0]);
 }
 if (st === 'visor') {
  /* wraparound visor + a swept crest so Nova has a profile as well as a face */
  b.add(G.sphere(16, 10), S.CARBON, [0, .33 * k, .16 * k], null, [.66 * k, .30 * k, .52 * k]);
  b.add(G.sphere(16, 10), S.LENS, [0, .33 * k, .22 * k], null, [.63 * k, .22 * k, .50 * k]);
  b.add(G.rbox(1.12 * k, .055 * k, .10 * k, .026, q.rbs), S.ACCENT_EDGE, [0, .47 * k, .34 * k], [.22, 0, 0]);
  b.add(G.cone(1, 1, 6), S.ACCENT, [0, .72 * k, -.30 * k], [.62, 0, 0], [.10 * k, .62 * k, .22 * k]);
 }
 if (st === 'cap') {
  b.add(G.sphere(16, 10), S.PAINT_DEEP, [0, .56 * k, -.04 * k], null, [.61 * k, .34 * k, .54 * k]);
  b.add(G.rbox(.70 * k, .07 * k, .52 * k, .10, q.rbs), S.PAINT, [0, .52 * k, -.62 * k], [.20, 0, 0]);
  b.add(G.sphere(8, 6), S.ACCENT, [0, .86 * k, -.04 * k], null, [.075 * k, .075 * k, .075 * k]);
  b.add(G.rbox(.16 * k, .10 * k, .30 * k, .04, q.rbs), S.ACCENT, [0, .62 * k, .32 * k], [.30, 0, 0]);
 }
 if (st === 'hood') {
  /* parka hood — a big soft shell behind the face with a bright fur rim */
  b.add(G.sphere(18, 12), S.WHITE, [0, .17 * k, -.34 * k], null, [.78 * k, .70 * k, .52 * k]);
  b.add(G.sphere(14, 10), S.WHITE, [0, .42 * k, -.46 * k], null, [.52 * k, .40 * k, .34 * k]);
  b.add(G.torus(.58 * k, .135 * k, 6, 18), S.PAINT_LIGHT, [0, .20 * k, .12 * k], [.30, 0, 0], [1, 1, .85]);
  b.add(G.torus(.50 * k, .05 * k, 4, 16), S.ACCENT, [0, .20 * k, .16 * k], [.30, 0, 0], [1, 1, .85]);
  b.add(G.sphere(10, 7), S.ACCENT, [0, .78 * k, -.62 * k], null, [.11 * k, .11 * k, .11 * k]);
 }
 if (st === 'mohawk') {
  for (let i = 0; i < 6; i++) {
   const t = i / 5, z = .46 * k - t * .95 * k, h = (.30 + Math.sin(t * PI) * .42) * k;
   b.add(G.cone(1, 1, 7), i % 2 ? S.ACCENT : S.ACCENT_EDGE, [0, .74 * k + h * .34, z], [t * .5 - .1, 0, 0], [.15 * k, h, .17 * k]);
  }
 }
 if (st === 'headphones') {
  b.add(G.torus(.60 * k, .075 * k, 6, 18, PI), S.CARBON, [0, .32 * k, -.02 * k], [0, 0, 0]);
  b.add(G.torus(.60 * k, .035 * k, 4, 18, PI), S.ACCENT, [0, .32 * k, .045 * k], [0, 0, 0]);
  b.mir(function (sx) {
   this.add(G.cyl(.25 * k, .25 * k, .17 * k, 14), S.CARBON, [sx * .64 * k, .26 * k, -.02 * k], [0, 0, PI / 2]);
   this.add(G.cyl(.16 * k, .16 * k, .07 * k, 12), S.ACCENT, [sx * .74 * k, .26 * k, -.02 * k], [0, 0, PI / 2]);
  });
  b.add(G.rbox(.10 * k, .08 * k, .34 * k, .035, q.rbs), S.ACCENT_EDGE, [-.50 * k, .10 * k, .30 * k], [.3, .4, 0]);
 }
 if (st === 'helmet') {
  b.add(G.sphere(18, 12), S.PAINT, [0, .26 * k, -.12 * k], null, [.73 * k, .50 * k, .61 * k]);
  b.add(G.rbox(1.08 * k, .24 * k, .28 * k, .11, q.rbs), S.PAINT_DEEP, [0, .02 * k, .36 * k], [.10, 0, 0]);  /* chin bar */
  b.add(G.rbox(1.02 * k, .22 * k, .16 * k, .07, q.rbs), S.LENS, [0, .30 * k, .42 * k], [.05, 0, 0]);
  b.add(G.rbox(1.06 * k, .07 * k, .10 * k, .03, q.rbs), S.ACCENT_EDGE, [0, .44 * k, .43 * k], [.05, 0, 0]);
  /* crest fin — the piece that makes him readable from behind */
  b.add(G.rbox(.16 * k, .40 * k, .92 * k, .07, q.rbs), S.ACCENT, [0, .78 * k, -.16 * k], [.10, 0, 0]);
  b.add(G.rbox(.09 * k, .09 * k, .84 * k, .035, q.rbs), S.ACCENT_EDGE, [0, .97 * k, -.15 * k], [.10, 0, 0]);
 }
 if (st === 'crown') {
  b.add(G.cyl(.46 * k, .42 * k, .14 * k, 16), S.GOLD, [0, .74 * k, -.02 * k]);
  for (let i = 0; i < 5; i++) {
   const a = (i / 5) * PI * 2 - PI / 2, h = (i === 1 || i === 4 || i === 0) ? .34 : .26;
   b.add(G.cone(1, 1, 6), S.GOLD, [Math.cos(a) * .40 * k, (.84 + h * .5) * k, Math.sin(a) * .40 * k], null, [.10 * k, h * k, .10 * k]);
   if (q.extras) b.add(G.sphere(8, 6), S.ACCENT, [Math.cos(a) * .40 * k, (.84 + h) * k, Math.sin(a) * .40 * k], null, [.045 * k, .045 * k, .045 * k]);
  }
  b.add(G.sphere(10, 7), S.ACCENT_EDGE, [0, .80 * k, .42 * k], null, [.075 * k, .075 * k, .05 * k]);
 }
}

/* ===================== the tail ===================== */
function buildTail(q, cfg) {
 const b = new Build(), k = cfg.tailScale || 1;
 const P = q.tailSph;
 if (q.tailSegs > 2) {
  b.add(G.sphere(...P), S.FUR, [.03 * k, .01 * k, -.24 * k], null, [.20 * k, .20 * k, .30 * k]);
  b.add(G.sphere(...P), S.FUR, [.11 * k, .09 * k, -.66 * k], null, [.175 * k, .175 * k, .28 * k]);
  b.add(G.sphere(...P), S.FUR_DEEP, [.21 * k, .20 * k, -1.02 * k], null, [.155 * k, .155 * k, .22 * k]);
 } else {
  b.add(G.sphere(...P), S.FUR, [.07 * k, .05 * k, -.45 * k], null, [.19 * k, .19 * k, .52 * k]);
 }
 b.add(G.sphere(...P), S.WHITE, [.29 * k, .31 * k, -1.30 * k], null, [.155 * k, .150 * k, .175 * k]);
 return b;
}

/* ===================== shared chassis furniture ===================== */
function seatBack(b, q, cfg, w = 1.02, h = .88) {
 b.add(G.rbox(w, h, .32, .14, q.rb), S.SEAT, [0, cfg.seatY + .10, cfg.seatZ - .54]);
 b.add(G.rbox(w * .62, h * .70, .10, .05, q.rbs), S.ACCENT_DIM, [0, cfg.seatY + .12, cfg.seatZ - .70]);
}
function rollHoop(b, q, cfg, r = .48, y = 1.66, z = -.86, slot = S.CHROME) {
 b.add(G.torus(r, .075, q.tor[0], q.tor[1], PI), slot, [0, y, z]);
 b.mir(function (sx) { this.add(G.cyl(.07, .07, .34, q.cap[1]), slot, [sx * r, y - .17, z]); });
}
function lamps(b, q, x, y, z, sx = .21, sy = .14) {
 b.mir(function (s) { this.add(G.sphere(10, 7), S.LAMP, [s * x, y, z], null, [sx, sy, .09]); });
}
function tailLamps(b, q, x, y, z, w = .44) {
 b.mir(function (s) { this.add(G.rbox(w, .13, .09, .045, q.rbs), S.TAILLAMP, [s * x, y, z]); });
}
/* The sill strip. Emissive, full length, on both sides — this is what stops a
   rival becoming a dark speck on a night circuit. */
function sills(b, q, x, y, len, z = 0, slot = S.ACCENT) {
 b.mir(function (s) { this.add(G.rbox(.11, .11, len, .05, q.rbs), slot, [s * x, y, z]); });
}

/* ===================== the eight machines ===================== */
/* cfg fields: track (half-track), fz/rz (axle z), fw/rw {r,w}, seatY/seatZ,
   headY/headZ, tail [x,y,z], plate [x,y,z], pipes [[x,y,z]..], pipeR,
   shadow [w,l], dualRear, headScale/driverScale/tailScale. */
const KARTS = [

 /* ---------- 0 · BLU — the classic kart. The reference silhouette: friendly
    rounded pod, modest wing, nothing exotic. 4/4/4. ---------- */
 {
  track: 1.06, fz: 1.08, rz: -1.06, fw: { r: .46, w: .40 }, rw: { r: .50, w: .46 },
  seatY: 1.14, seatZ: -.16, headY: 2.00, headZ: -.06, wheelZ: .64,
  tail: [.30, 1.12, -.58], plate: [0, .80, -1.78], pipes: [[-.60, .58, -1.74], [.60, .58, -1.74]], pipeR: .20,
  shadow: [3.3, 4.5],
  body(b, q) {
   b.add(G.rbox(1.92, .30, 3.10, .13, q.rb), S.CARBON, [0, .40, 0]);
   b.add(G.sphere(...q.sph), S.PAINT, [0, .76, -.02], null, [1.06, .50, 1.56]);
   b.add(G.rbox(1.58, .44, 1.46, .20, q.rb), S.PAINT, [0, .68, 1.04]);
   b.add(G.rbox(1.22, .26, .72, .12, q.rb), S.PAINT, [0, .90, 1.26], [-.14, 0, 0]);
   b.add(G.rbox(1.02, .34, .66, .16, q.rb), S.PAINT, [0, .62, 1.82]);
   b.add(G.rbox(2.26, .22, .34, .10, q.rb), S.CARBON, [0, .50, 1.90]);
   b.add(G.rbox(1.50, .10, .12, .045, q.rbs), S.ACCENT, [0, .48, 2.04]);
   b.add(G.rbox(.24, .07, 1.60, .03, q.rbs), S.ACCENT, [0, .93, 1.12]);
   sills(b, q, 1.00, .44, 2.20);
   b.mir(function (sx) {
    this.add(G.rbox(.44, .48, 1.66, .18, q.rb), S.PAINT_DEEP, [sx * .92, .72, -.04]);
    this.add(G.rbox(.17, .17, 1.86, .08, q.rb), S.PAINT_LIGHT, [sx * 1.04, .86, -.04]);
   });
   seatBack(b, q, this, 1.02, .88);
   rollHoop(b, q, this, .47, 1.66, -.84);
   b.add(G.rbox(1.70, .36, .92, .15, q.rb), S.PAINT, [0, .86, -1.26]);
   b.mir(function (sx) { this.add(G.rbox(.14, .64, .18, .05, q.rbs), S.CARBON, [sx * .74, 1.20, -1.30]); });
   b.add(G.rbox(2.30, .13, .54, .06, q.rb), S.PAINT, [0, 1.54, -1.34], [.13, 0, 0]);
   b.add(G.rbox(2.04, .06, .15, .025, q.rbs), S.ACCENT, [0, 1.63, -1.30]);
   lamps(b, q, .56, .82, 1.96);
   tailLamps(b, q, .60, .88, -1.72);
  }
 },

 /* ---------- 1 · NOVA — the low wedge. Long pointed nose, minimal ride height,
    a big swan-neck rear wing. Reads as "fast" from any distance. 3/5/4. --------- */
 {
  track: 1.16, fz: 1.16, rz: -1.10, fw: { r: .42, w: .38 }, rw: { r: .54, w: .54 },
  seatY: 1.02, seatZ: -.26, headY: 1.86, headZ: -.16, wheelZ: .60, headScale: .96,
  tail: [.28, 1.00, -.66], plate: [0, .72, -1.82], pipes: [[-.44, .52, -1.80], [.44, .52, -1.80]], pipeR: .19,
  shadow: [3.5, 5.1],
  body(b, q) {
   b.add(G.rbox(1.76, .24, 3.50, .11, q.rb), S.CARBON, [0, .32, .06]);
   /* wedge: a tapering stack of flat slabs instead of one blob */
   b.add(G.rbox(1.70, .40, 1.70, .18, q.rb), S.PAINT, [0, .58, -.30]);
   b.add(G.rbox(1.44, .34, 1.30, .16, q.rb), S.PAINT, [0, .62, .90], [-.06, 0, 0]);
   b.add(G.rbox(1.02, .26, 1.10, .12, q.rb), S.PAINT, [0, .54, 1.86], [-.10, 0, 0]);
   b.add(G.cone(1, 1, 10), S.PAINT_LIGHT, [0, .50, 2.52], [PI / 2, 0, 0], [.42, .44, .30]);
   b.add(G.rbox(.86, .08, 1.90, .035, q.rbs), S.ACCENT, [0, .80, 1.08], [-.08, 0, 0]);
   sills(b, q, .96, .36, 2.70, .1);
   /* side pods with intake mouths */
   b.mir(function (sx) {
    this.add(G.rbox(.50, .52, 1.40, .20, q.rb), S.PAINT_DEEP, [sx * .90, .60, -.10]);
    this.add(G.rbox(.30, .34, .12, .10, q.rbs), S.GRID, [sx * .92, .62, .60]);
    this.add(G.rbox(.18, .24, 1.50, .08, q.rb), S.PAINT_LIGHT, [sx * 1.12, .70, -.16]);
    this.add(G.rbox(.13, .13, 1.30, .06, q.rbs), S.ACCENT, [sx * 1.14, .50, -.16]);
   });
   seatBack(b, q, this, .92, .78);
   b.add(G.rbox(.86, .30, .40, .12, q.rb), S.CARBON, [0, 1.52, -.88]);   /* airbox */
   b.add(G.rbox(.34, .40, .60, .10, q.rb), S.ACCENT_DIM, [0, 1.62, -.66], [.35, 0, 0]);
   b.add(G.rbox(1.58, .30, 1.00, .14, q.rb), S.PAINT, [0, .70, -1.36]);
   /* swan-neck wing — the signature */
   b.add(G.rbox(.16, .90, .22, .06, q.rbs), S.CARBON, [0, 1.30, -1.62], [.2, 0, 0]);
   b.mir(function (sx) { this.add(G.rbox(.10, .74, .70, .05, q.rbs), S.PAINT_DEEP, [sx * 1.24, 1.44, -1.70]); });
   b.add(G.rbox(2.52, .12, .62, .05, q.rb), S.PAINT, [0, 1.76, -1.74], [.26, 0, 0]);
   b.add(G.rbox(2.52, .07, .30, .03, q.rbs), S.PAINT_DEEP, [0, 1.58, -1.58], [.20, 0, 0]);
   b.add(G.rbox(2.24, .06, .16, .025, q.rbs), S.ACCENT_EDGE, [0, 1.84, -1.68]);
   /* diffuser */
   b.add(G.rbox(1.50, .18, .50, .07, q.rbs), S.CARBON, [0, .36, -1.80], [-.3, 0, 0]);
   lamps(b, q, .40, .62, 2.62, .16, .10);
   tailLamps(b, q, .54, .76, -1.82, .40);
  }
 },

 /* ---------- 2 · KNOX — the light buggy. Short, narrow, high-riding, tiny front
    wheels and fat rears, a tall exposed roll cage that doubles his height in
    silhouette. Small kart, huge ambition. 3/4/5. ---------- */
 {
  track: .98, fz: .92, rz: -.98, fw: { r: .38, w: .34 }, rw: { r: .62, w: .58 },
  seatY: 1.22, seatZ: -.14, headY: 2.08, headZ: -.06, wheelZ: .58,
  headScale: 1.10, driverScale: .92, tailScale: .9,
  tail: [.26, 1.16, -.50], plate: [0, .86, -1.46], pipes: [[-.36, .74, -1.50], [.36, .74, -1.50]], pipeR: .17,
  shadow: [3.0, 3.9], knobbly: true,
  body(b, q) {
   b.add(G.rbox(1.52, .26, 2.36, .12, q.rb), S.CARBON, [0, .52, 0]);
   b.add(G.rbox(1.34, .44, 1.30, .20, q.rb), S.PAINT, [0, .80, .12]);
   b.add(G.rbox(1.06, .36, .66, .17, q.rb), S.PAINT_LIGHT, [0, .94, .82], [-.16, 0, 0]);
   b.add(G.rbox(1.56, .18, .28, .08, q.rb), S.CHROME_DARK, [0, .70, 1.34]);
   b.add(G.rbox(1.20, .10, .12, .045, q.rbs), S.ACCENT, [0, .70, 1.46]);
   /* exposed frame tubes — buggies show their bones */
   b.mir(function (sx) {
    this.add(G.cyl(.06, .06, 2.30, 8), S.CHROME_DARK, [sx * .74, .66, .0], [PI / 2, 0, 0]);
    this.add(G.rbox(.13, .13, 1.60, .06, q.rbs), S.ACCENT, [sx * .80, .46, -.10]);
   });
   seatBack(b, q, this, .90, .84);
   /* exposed sprint-car cage: two hoops, four posts, two rails */
   b.add(G.torus(.54, .075, 5, 16, PI), S.ACCENT_DIM, [0, 2.24, -.74]);
   b.add(G.torus(.50, .065, 5, 16, PI), S.CHROME_DARK, [0, 2.18, .44]);
   b.mir(function (sx) {
    this.add(G.cyl(.06, .06, 1.24, 8), S.CHROME_DARK, [sx * .50, 1.58, .44]);
    this.add(G.cyl(.06, .06, 1.20, 8), S.CHROME_DARK, [sx * .54, 1.66, -.74]);
    this.add(G.cyl(.055, .055, 1.30, 8), S.CHROME_DARK, [sx * .52, 2.50, -.16], [PI / 2, 0, 0]);
   });
   b.add(G.rbox(1.14, .11, .13, .05, q.rbs), S.ACCENT_EDGE, [0, 2.58, -.16]);
   /* stubby tail with a spare wheel */
   b.add(G.rbox(1.30, .40, .70, .16, q.rb), S.PAINT, [0, .86, -1.24]);
   b.add(G.cyl(.34, .34, .22, 14), S.RUBBER, [0, 1.06, -1.54], [PI / 2, 0, 0]);
   b.add(G.cyl(.15, .15, .26, 10), S.CHROME, [0, 1.06, -1.54], [PI / 2, 0, 0]);
   lamps(b, q, .42, .96, 1.30, .17, .17);
   tailLamps(b, q, .46, .92, -1.58, .32);
  }
 },

 /* ---------- 3 · FROST — the bubble-topped cruiser. One long smooth pill, full
    skirts, and a glass canopy over the driver. Nothing sharp anywhere. 3/5/4. -- */
 {
  track: 1.10, fz: 1.10, rz: -1.08, fw: { r: .44, w: .44 }, rw: { r: .50, w: .50 },
  seatY: 1.12, seatZ: -.20, headY: 1.98, headZ: -.10, wheelZ: .62,
  tail: [.30, 1.10, -.62], plate: [0, .78, -1.80], pipes: [[-.52, .56, -1.76], [.52, .56, -1.76]], pipeR: .21,
  shadow: [3.4, 4.7], headScale: .96, dome: { y: 1.34, z: -.02, r: [1.04, 1.52, 1.34] }, wall: true,
  body(b, q) {
   b.add(G.rbox(2.02, .34, 3.34, .16, q.rb), S.CARBON, [0, .40, 0]);
   b.add(G.sphere(...q.sph), S.PAINT, [0, .78, .04], null, [1.12, .56, 1.86]);
   b.add(G.sphere(...q.sph), S.WHITE, [0, .96, .72], null, [.84, .34, 1.02]);
   b.add(G.rbox(1.42, .30, .60, .16, q.rb), S.ACCENT_DIM, [0, .70, 1.92]);
   b.add(G.rbox(1.86, .12, .16, .05, q.rbs), S.ACCENT, [0, .70, 2.12]);
   /* full-length skirts — a cruiser hides its wheels a little */
   b.mir(function (sx) {
    this.add(G.rbox(.30, .56, 2.60, .22, q.rb), S.PAINT_DEEP, [sx * 1.00, .58, 0]);
    this.add(G.rbox(.13, .14, 2.30, .06, q.rbs), S.ACCENT, [sx * 1.13, .56, 0]);
    this.add(G.rbox(.22, .28, 1.40, .10, q.rb), S.ACCENT_DIM, [sx * 1.10, .88, .28]);
   });
   seatBack(b, q, this, 1.00, .80);
   b.add(G.sphere(...q.sph), S.PAINT_DEEP, [0, 1.36, -.86], null, [.78, .46, .42]);
   b.add(G.rbox(1.92, .38, 1.00, .18, q.rb), S.PAINT, [0, .88, -1.28]);
   b.add(G.rbox(1.60, .10, .80, .04, q.rbs), S.ACCENT, [0, 1.08, -1.24]);
   b.add(G.torus(1.02, .075, 5, 20), S.CHROME, [0, 1.36, -.02], null, [1, 1, 1.30]);
   b.add(G.rbox(1.44, .12, .42, .05, q.rb), S.ACCENT, [0, 1.12, -1.44], [.18, 0, 0]);
   /* low dorsal fin instead of a wing */
   b.add(G.rbox(.18, .52, 1.10, .08, q.rb), S.ACCENT_DIM, [0, 1.30, -1.24], [.12, 0, 0]);
   b.add(G.rbox(.09, .09, 1.00, .04, q.rbs), S.ACCENT, [0, 1.52, -1.20], [.12, 0, 0]);
   lamps(b, q, .60, .80, 2.08, .24, .13);
   tailLamps(b, q, .66, .90, -1.76, .50);
  }
 },

 /* ---------- 4 · BLAZE — the hot rod. Raked stance, tiny fronts, enormous rears,
    a blown engine punching through the hood and six side pipes. 5/3/4. -------- */
 {
  track: 1.08, fz: 1.14, rz: -1.02, fw: { r: .40, w: .34 }, rw: { r: .66, w: .62 },
  seatY: 1.22, seatZ: -.26, headY: 2.08, headZ: -.16, wheelZ: .60,
  tail: [.30, 1.18, -.70], plate: [0, .92, -1.62], pipes: [[-.70, 1.02, -1.52], [.70, 1.02, -1.52]], pipeR: .18,
  shadow: [3.3, 4.5],
  body(b, q) {
   b.add(G.rbox(1.82, .30, 2.96, .13, q.rb), S.CARBON, [0, .46, -.10], [.055, 0, 0]);
   b.add(G.rbox(1.62, .62, 1.62, .22, q.rb), S.PAINT, [0, .90, -.44], [.05, 0, 0]);
   b.add(G.rbox(1.44, .44, 1.34, .18, q.rb), S.PAINT, [0, .74, .88], [.05, 0, 0]);
   /* the blower: intake trumpets standing proud of the hood */
   b.add(G.rbox(.80, .44, .76, .12, q.rb), S.CARBON_LIGHT, [0, 1.14, .78]);
   b.add(G.rbox(.86, .16, .56, .07, q.rb), S.CHROME, [0, 1.38, .78]);
   b.mir(function (sx) {
    this.add(G.cyl(.17, .13, .34, 10), S.CHROME, [sx * .24, 1.62, .96]);
    this.add(G.cyl(.17, .13, .34, 10), S.CHROME, [sx * .24, 1.62, .60]);
    this.add(G.cyl(.185, .185, .05, 10), S.ACCENT, [sx * .24, 1.79, .96]);
    this.add(G.cyl(.185, .185, .05, 10), S.ACCENT, [sx * .24, 1.79, .60]);
   });
   b.add(G.rbox(1.02, .30, .62, .16, q.rb), S.PAINT, [0, .62, 1.72], [.05, 0, 0]);
   b.add(G.rbox(2.10, .24, .30, .10, q.rb), S.CHROME_DARK, [0, .56, 1.86]);
   b.add(G.rbox(1.34, .11, .13, .05, q.rbs), S.ACCENT, [0, .54, 2.00]);
   /* side pipes — three per side, swept up and back */
   b.mir(function (sx) {
    for (let i = 0; i < 3; i++)
     this.add(G.cyl(.10, .11, 1.42, 9), S.CHROME, [sx * (1.04 + i * .012), .70 + i * .17, .06 - i * .04], [PI / 2 - .10, 0, sx * .05]);
    this.add(G.rbox(.12, .12, 1.30, .05, q.rbs), S.ACCENT, [sx * .88, .48, .10]);
    this.add(G.rbox(.15, .30, 1.44, .08, q.rb), S.PAINT_LIGHT, [sx * .87, 1.04, -.30]);
   });
   seatBack(b, q, this, .96, .90);
   rollHoop(b, q, this, .46, 1.78, -.96, S.CHROME);
   b.add(G.rbox(1.70, .46, .90, .18, q.rb), S.PAINT, [0, 1.00, -1.32], [.05, 0, 0]);
   b.mir(function (sx) { this.add(G.rbox(.14, .52, .20, .05, q.rbs), S.CHROME_DARK, [sx * .70, 1.42, -1.42]); });
   b.add(G.rbox(1.96, .14, .48, .06, q.rb), S.PAINT_DEEP, [0, 1.72, -1.46], [.30, 0, 0]);
   b.add(G.rbox(1.72, .06, .14, .025, q.rbs), S.ACCENT, [0, 1.80, -1.42]);
   lamps(b, q, .54, .74, 1.96, .20, .20);
   tailLamps(b, q, .56, .98, -1.66, .38);
  }
 },

 /* ---------- 5 · GLITCH — the tech racer. Faceted panels, floating hover fins
    off each flank, a dish antenna on the tail and circuit striping. 4/3/5. ---- */
 {
  track: 1.12, fz: 1.06, rz: -1.06, fw: { r: .44, w: .40 }, rw: { r: .50, w: .48 },
  seatY: 1.14, seatZ: -.18, headY: 2.00, headZ: -.08, wheelZ: .62,
  tail: [.30, 1.10, -.60], plate: [0, .80, -1.74], pipes: [[-.56, .60, -1.72], [.56, .60, -1.72]], pipeR: .20,
  shadow: [3.6, 4.6],
  body(b, q) {
   b.add(G.rbox(1.88, .28, 3.06, .06, q.rb), S.CARBON, [0, .42, 0]);
   b.add(G.rbox(1.50, .52, 1.70, .09, q.rb), S.PAINT, [0, .76, -.16]);
   b.add(G.rbox(1.34, .34, 1.20, .07, q.rb), S.PAINT_LIGHT, [0, .70, 1.02], [-.08, 0, 0]);
   b.add(G.rbox(1.00, .26, .90, .06, q.rb), S.PAINT, [0, .62, 1.84], [-.12, 0, 0]);
   b.add(G.rbox(2.12, .18, .28, .05, q.rb), S.CARBON_LIGHT, [0, .52, 1.96]);
   /* circuit striping: emissive lines that trace the panels */
   b.add(G.rbox(.10, .07, 2.30, .03, q.rbs), S.ACCENT, [0, 1.04, .46]);
   b.mir(function (sx) {
    this.add(G.rbox(.07, .06, 1.40, .025, q.rbs), S.ACCENT_EDGE, [sx * .40, 1.02, .30]);
    this.add(G.rbox(.60, .06, .07, .025, q.rbs), S.ACCENT_EDGE, [sx * .30, 1.02, -.42]);
   });
   sills(b, q, .98, .44, 2.30, 0, S.ACCENT_EDGE);
   /* hover fins — thin glowing planks standing off the flanks */
   b.mir(function (sx) {
    this.add(G.rbox(.10, .44, 1.90, .04, q.rbs), S.CARBON_LIGHT, [sx * 1.30, .78, -.10], [0, 0, sx * .22]);
    this.add(G.rbox(.13, .12, 1.70, .05, q.rbs), S.ACCENT, [sx * 1.36, .62, -.10]);
    this.add(G.rbox(.14, .30, .30, .06, q.rbs), S.PAINT_LIGHT, [sx * 1.28, 1.02, -.86], [0, 0, sx * .22]);
   });
   seatBack(b, q, this, .96, .84);
   b.add(G.rbox(.96, .34, .46, .08, q.rb), S.CARBON_LIGHT, [0, 1.52, -.86]);
   b.add(G.rbox(.80, .08, .34, .03, q.rbs), S.ACCENT, [0, 1.70, -.86]);
   b.add(G.rbox(1.64, .34, .96, .08, q.rb), S.PAINT, [0, .86, -1.30]);
   /* antenna mast + dish */
   b.add(G.cyl(.05, .05, 1.30, 8), S.CHROME_DARK, [0, 1.62, -1.56], [.22, 0, 0]);
   b.add(G.cyl(.34, .10, .22, 14, true), S.PAINT_LIGHT, [0, 2.26, -1.42], [1.05, 0, 0]);
   b.add(G.sphere(8, 6), S.ACCENT_EDGE, [0, 2.26, -1.30], null, [.075, .075, .075]);
   b.mir(function (sx) { this.add(G.rbox(.12, .58, .18, .05, q.rbs), S.CARBON, [sx * .70, 1.18, -1.36]); });
   b.add(G.rbox(2.20, .11, .50, .05, q.rb), S.PAINT_DEEP, [0, 1.50, -1.40], [.18, 0, 0]);
   b.add(G.rbox(1.96, .06, .14, .025, q.rbs), S.ACCENT_EDGE, [0, 1.58, -1.36]);
   lamps(b, q, .50, .74, 2.02, .26, .10);
   tailLamps(b, q, .58, .88, -1.72, .42);
  }
 },

 /* ---------- 6 · ONYX — the heavy hauler. Widest track on the grid, tall slab
    bodywork, bull bar, dual rear wheels and a roof light bar. 5/4/3. ---------- */
 {
  track: 1.26, fz: 1.20, rz: -1.14, fw: { r: .62, w: .50 }, rw: { r: .64, w: .40 },
  seatY: 1.42, seatZ: -.18, headY: 2.26, headZ: -.08, wheelZ: .66,
  headScale: 1.04, driverScale: 1.12, tailScale: 1.05,
  tail: [.36, 1.34, -.70], plate: [0, 1.02, -1.86], pipes: [[-.96, 1.70, -1.20], [.96, 1.70, -1.20]], pipeR: .22,
  shadow: [4.3, 5.1], dualRear: .44, knobbly: true,
  body(b, q) {
   b.add(G.rbox(2.38, .44, 3.34, .12, q.rb), S.CARBON, [0, .56, 0]);
   b.add(G.rbox(2.12, .86, 1.94, .16, q.rb), S.PAINT, [0, 1.16, -.28]);
   /* tall slab bonnet with a chunky grille */
   b.add(G.rbox(1.98, .74, 1.42, .14, q.rb), S.PAINT_DEEP, [0, 1.04, 1.06]);
   b.add(G.rbox(1.62, .24, 1.10, .09, q.rb), S.ACCENT_DIM, [0, 1.44, 1.06]);
   b.add(G.rbox(1.70, .54, .22, .07, q.rb), S.GRID, [0, .96, 1.78]);
   for (let i = -2; i <= 2; i++) b.add(G.rbox(.12, .46, .10, .04, q.rbs), S.CHROME_DARK, [i * .34, .96, 1.86]);
   /* bull bar */
   b.add(G.rbox(2.44, .28, .36, .13, q.rb), S.CHROME_DARK, [0, .82, 1.90]);
   b.add(G.rbox(2.44, .22, .30, .10, q.rb), S.CHROME_DARK, [0, 1.42, 1.92]);
   b.mir(function (sx) {
    this.add(G.rbox(.20, .94, .24, .09, q.rb), S.CHROME_DARK, [sx * .78, 1.12, 1.90]);
    /* flared fenders over both axles */
    this.add(G.rbox(.52, .80, 1.56, .22, q.rb), S.PAINT_DEEP, [sx * 1.16, 1.00, 1.14]);
    this.add(G.rbox(.62, .84, 1.92, .24, q.rb), S.PAINT_DEEP, [sx * 1.22, 1.00, -1.06]);
    this.add(G.rbox(.24, .26, 3.00, .11, q.rb), S.PAINT_LIGHT, [sx * 1.23, 1.44, -.10]);
    this.add(G.cyl(.09, .09, .90, 8), S.CHROME_DARK, [sx * 1.02, 1.90, 1.62], [-.30, 0, 0]);
   });
   b.add(G.rbox(1.90, .14, .16, .06, q.rbs), S.ACCENT, [0, 1.48, 1.88]);
   sills(b, q, 1.18, .56, 2.70, 0, S.ACCENT);
   seatBack(b, q, this, 1.24, 1.04);
   /* open roll frame + light bar — the tallest silhouette on the grid */
   b.mir(function (sx) {
    this.add(G.cyl(.105, .105, 1.60, 8), S.CHROME_DARK, [sx * .96, 2.50, -1.02], [.10, 0, 0]);
    this.add(G.cyl(.105, .105, 1.72, 8), S.CHROME_DARK, [sx * 1.00, 2.44, .90], [-.16, 0, 0]);
    this.add(G.cyl(.09, .09, 2.06, 8), S.CHROME_DARK, [sx * .98, 3.26, -.06], [PI / 2, 0, 0]);
   });
   b.add(G.rbox(2.32, .30, .40, .14, q.rb), S.CARBON_LIGHT, [0, 3.40, .90]);
   for (let i = -2; i <= 2; i++) b.add(G.cyl(.145, .145, .14, 12), S.LAMP, [i * .46, 3.40, 1.10], [PI / 2, 0, 0]);
   b.add(G.rbox(2.18, .12, .16, .05, q.rbs), S.ACCENT, [0, 3.30, -1.08]);
   b.add(G.rbox(2.10, .62, 1.16, .16, q.rb), S.PAINT, [0, 1.12, -1.42]);
   b.add(G.rbox(1.86, .22, .58, .09, q.rb), S.CHROME_DARK, [0, .70, -1.92]);
   b.add(G.rbox(1.60, .12, .16, .05, q.rbs), S.ACCENT, [0, 1.48, -1.92]);
   lamps(b, q, .74, 1.00, 1.92, .28, .24);
   tailLamps(b, q, .80, 1.22, -1.94, .52);
  }
 },

 /* ---------- 7 · PIXEL — the formula car. Narrow, low, a wide front wing, side
    pontoons and a tall tail fin that matches the crown. 4/5/3. ---------------- */
 {
  track: 1.04, fz: 1.22, rz: -1.10, fw: { r: .40, w: .34 }, rw: { r: .52, w: .52 },
  seatY: 1.06, seatZ: -.24, headY: 1.90, headZ: -.14, wheelZ: .58,
  headScale: .96, driverScale: .94,
  tail: [.26, 1.04, -.62], plate: [0, .74, -1.86], pipes: [[-.30, .56, -1.86], [.30, .56, -1.86]], pipeR: .17,
  shadow: [3.4, 5.2],
  body(b, q) {
   b.add(G.rbox(1.20, .30, 3.60, .14, q.rb), S.PAINT, [0, .46, .10]);
   b.add(G.rbox(1.06, .46, 1.60, .20, q.rb), S.PAINT, [0, .70, -.26]);
   b.add(G.rbox(.78, .32, 1.50, .15, q.rb), S.PAINT, [0, .62, 1.16], [-.05, 0, 0]);
   b.add(G.cone(1, 1, 10), S.PAINT_LIGHT, [0, .56, 2.14], [PI / 2, 0, 0], [.34, .50, .26]);
   b.add(G.rbox(.42, .08, 2.00, .03, q.rbs), S.ACCENT, [0, .86, .90], [-.04, 0, 0]);
   /* front wing */
   b.add(G.rbox(2.24, .09, .52, .04, q.rb), S.PAINT_DEEP, [0, .34, 2.36], [.16, 0, 0]);
   b.add(G.rbox(2.24, .07, .34, .03, q.rbs), S.ACCENT, [0, .46, 2.22], [.22, 0, 0]);
   b.mir(function (sx) {
    this.add(G.rbox(.09, .36, .56, .04, q.rbs), S.PAINT_LIGHT, [sx * 1.10, .46, 2.34]);
    /* pontoons */
    this.add(G.rbox(.46, .44, 1.50, .19, q.rb), S.PAINT_DEEP, [sx * .82, .62, .02]);
    this.add(G.rbox(.34, .14, 1.20, .06, q.rb), S.PAINT_LIGHT, [sx * .82, .85, .02]);
    this.add(G.rbox(.14, .12, 1.30, .05, q.rbs), S.ACCENT, [sx * 1.02, .60, .02]);
    this.add(G.rbox(.30, .30, .12, .09, q.rbs), S.GRID, [sx * .84, .66, .78]);
    /* bargeboards */
    this.add(G.rbox(.07, .30, .60, .03, q.rbs), S.CARBON, [sx * 1.04, .50, 1.20], [0, 0, sx * .2]);
   });
   seatBack(b, q, this, .84, .76);
   b.add(G.rbox(.70, .34, .46, .12, q.rb), S.PAINT_DEEP, [0, 1.44, -.86]);
   /* tall tail fin */
   b.add(G.rbox(.13, 1.00, 1.30, .06, q.rb), S.PAINT, [0, 1.70, -1.28], [.10, 0, 0]);
   b.add(G.rbox(.07, .10, 1.10, .03, q.rbs), S.ACCENT_EDGE, [0, 2.16, -1.24], [.10, 0, 0]);
   b.add(G.rbox(1.30, .32, 1.00, .14, q.rb), S.PAINT, [0, .66, -1.40]);
   b.mir(function (sx) { this.add(G.rbox(.10, .70, .58, .04, q.rbs), S.PAINT_LIGHT, [sx * 1.10, 1.44, -1.76]); });
   b.add(G.rbox(2.24, .11, .56, .05, q.rb), S.PAINT_DEEP, [0, 1.74, -1.80], [.28, 0, 0]);
   b.add(G.rbox(2.00, .06, .16, .025, q.rbs), S.ACCENT_EDGE, [0, 1.84, -1.74]);
   b.add(G.rbox(1.10, .16, .46, .06, q.rbs), S.CARBON, [0, .34, -1.86], [-.28, 0, 0]);
   lamps(b, q, .34, .66, 2.24, .14, .10);
   tailLamps(b, q, .44, .78, -1.86, .30);
  }
 }
];

/* ===================== shield / flame / shadow ===================== */
function shieldTexture() {
 if (typeof document === 'undefined') return null;
 const n = 128, c = document.createElement('canvas'); c.width = c.height = n;
 const x = c.getContext('2d');
 x.fillStyle = '#0a1830'; x.fillRect(0, 0, n, n);
 x.strokeStyle = '#7fe6ff'; x.lineWidth = 2;
 for (let i = 0; i <= 8; i++) {
  const p = i / 8 * n;
  x.globalAlpha = .55; x.beginPath(); x.moveTo(p, 0); x.lineTo(p, n); x.stroke();
  x.beginPath(); x.moveTo(0, p); x.lineTo(n, p); x.stroke();
 }
 x.globalAlpha = .9;
 for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) {
  if ((i + j) % 3) continue;
  x.fillStyle = '#c9f6ff'; x.fillRect(i * 16 + 5, j * 16 + 5, 6, 6);
 }
 const tex = new T.CanvasTexture(c); tex.colorSpace = T.SRGBColorSpace;
 tex.wrapS = tex.wrapT = T.RepeatWrapping; tex.repeat.set(3, 2); return tex;
}

function makeFlame(cfg, accent) {
 const group = new T.Group();
 const anchorZ = cfg.pipes[0][2];
 group.position.z = anchorZ;
 const tex = flameTexture(); if (tex) tex.flipY = false;
 const mk = (col, rs, len, zoff, op) => {
  const b = new Build();
  for (const p of cfg.pipes) b.add(G.cone(1, 1, 12), null, [p[0], p[1], (p[2] - anchorZ) - len * .5 + zoff], [-PI / 2, 0, 0], [rs, len, rs]);
  const m = new T.Mesh(b.build(), new T.MeshBasicMaterial({
   color: col, map: tex, transparent: true, opacity: op,
   blending: T.AdditiveBlending, depthWrite: false, side: T.DoubleSide, toneMapped: false
  }));
  m.frustumCulled = false; return m;
 };
 const outer = mk(accent, cfg.pipeR * 1.35, 1.9, -.12, .85);
 const core = mk(0xffffff, cfg.pipeR * .72, 1.15, -.05, .95);
 group.add(outer, core);
 group.visible = false;
 group.userData.core = core;
 return group;
}

/* ===================== assembly ===================== */
/* The procedural kart — the placeholder every kart starts life as, and the
   kart the game falls back to when a GLB never arrives. makeKart() below wraps
   it. */
export function makeProceduralKart(id, opts = {}) {
 const d = DRIVERS[id % DRIVERS.length];
 const detail = opts.detail === 'low' ? 'low' : 'high';
 const q = TIERS[detail];
 const cfg = KARTS[id % KARTS.length];
 const mat = paletteFor(d);
 const g = new T.Group();
 g.name = 'kart:' + d.name;

 /* --- chassis (leans, squats, bobs) --- */
 const chassis = new T.Group();
 g.add(chassis);
 const cb = new Build();
 cfg.body.call(cfg, cb, q);
 addDriverBody(cb, q, cfg);
 /* exhaust cans sit with the chassis */
 for (const p of cfg.pipes) {
  cb.add(G.cyl(cfg.pipeR, cfg.pipeR * 1.16, .44, 12), S.CHROME_DARK, [p[0], p[1], p[2]], [PI / 2, 0, 0]);
  cb.add(G.cyl(cfg.pipeR * .86, cfg.pipeR * .86, .08, 12), S.GRID, [p[0], p[1], p[2] - .21], [PI / 2, 0, 0]);
 }
 const chassisMesh = new T.Mesh(cb.build(), mat);
 chassisMesh.castShadow = true; chassisMesh.receiveShadow = true;
 chassis.add(chassisMesh);

 /* --- head: `head` is the neck pivot engine.js writes to, headRig is ours --- */
 const head = new T.Group();
 head.position.set(0, cfg.headY, cfg.headZ);
 chassis.add(head);
 const headRig = new T.Group();
 head.add(headRig);
 const headMesh = new T.Mesh(buildHead(d, q, cfg).build(), mat);
 headMesh.castShadow = true; headMesh.receiveShadow = true;
 headRig.add(headMesh);

 /* --- tail --- */
 let tailRig = null;
 if (q.tail) {
  tailRig = new T.Group();
  tailRig.position.set(cfg.tail[0], cfg.tail[1], cfg.tail[2]);
  chassis.add(tailRig);
  const tm = new T.Mesh(buildTail(q, cfg).build(), mat);
  tm.castShadow = true; tailRig.add(tm);
 } else {
  const tb = buildTail(q, cfg);
  const m = new T.Matrix4().makeTranslation(cfg.tail[0], cfg.tail[1], cfg.tail[2]);
  tb.parts.forEach(p => p.m.premultiply(m));
  const tm = new T.Mesh(tb.build(), mat); tm.castShadow = true; chassis.add(tm);
 }

 /* --- wheels: two steering fronts, one merged rear axle --- */
 const wheelOpt = { knobbly: !!cfg.knobbly, wall: !!cfg.wall };
 const steer = [];
 const wheels = [];
 for (const sx of [-1, 1]) {
  const pivot = new T.Group();
  pivot.position.set(sx * cfg.track, cfg.fw.r, cfg.fz);
  pivot.userData.y0 = pivot.position.y;
  g.add(pivot);
  const spin = new T.Group();
  pivot.add(spin);
  const b = new Build();
  addWheel(b, 0, cfg.fw.r, cfg.fw.w, q, Object.assign({ out: sx }, wheelOpt));
  const m = new T.Mesh(b.build(), mat);
  m.castShadow = true; m.receiveShadow = true;
  spin.add(m);
  steer.push(pivot); wheels.push(spin);
 }
 const rearSpin = new T.Group();
 rearSpin.position.set(0, cfg.rw.r, cfg.rz);
 g.add(rearSpin);
 {
  const b = new Build();
  if (cfg.dualRear) {
   for (const sx of [-1, 1]) {
    addWheel(b, sx * (cfg.track - cfg.dualRear * .5), cfg.rw.r, cfg.rw.w, q, wheelOpt);
    addWheel(b, sx * (cfg.track + cfg.dualRear * .5), cfg.rw.r, cfg.rw.w, q, wheelOpt);
   }
  } else {
   for (const sx of [-1, 1]) addWheel(b, sx * cfg.track, cfg.rw.r, cfg.rw.w, q, wheelOpt);
  }
  const m = new T.Mesh(b.build(), mat); m.castShadow = true; m.receiveShadow = true;
  rearSpin.add(m);
 }
 wheels.push(rearSpin);

 /* --- glass canopy (Frost only) --- */
 let glass = null;
 if (cfg.dome && q.extras) {
  const dm = new T.MeshStandardMaterial({
   color: 0xd8f2ff, transparent: true, opacity: .30, roughness: .04, metalness: .18,
   side: T.FrontSide, depthWrite: false, envMapIntensity: 2.6
  });
  glass = new T.Mesh(new T.SphereGeometry(1, 22, 12, 0, PI * 2, 0, PI * .60), dm);
  glass.position.set(0, cfg.dome.y, cfg.dome.z);
  glass.scale.set(cfg.dome.r[0], cfg.dome.r[1], cfg.dome.r[2]);
  glass.renderOrder = 2;
  chassis.add(glass);
 }

 /* --- number plate --- */
 let plate = null;
 if (q.plate && typeof document !== 'undefined') {
  const tex = plateTexture('0' + (id + 1));
  plate = new T.Mesh(new T.PlaneGeometry(.80, .28),
   new T.MeshBasicMaterial({ map: tex, toneMapped: true }));
  plate.position.set(cfg.plate[0], cfg.plate[1], cfg.plate[2]);
  plate.rotation.y = PI;
  chassis.add(plate);
 }

 /* --- boost flame --- */
 const flame = makeFlame(cfg, lift(d.accent, .55));
 chassis.add(flame);

 /* --- xFI shield --- */
 const stex = shieldTexture();
 const shield = new T.Mesh(new T.SphereGeometry(2.05, 20, 14), new T.MeshBasicMaterial({
  color: 0x7de8ff, map: stex, transparent: true, opacity: .17,
  blending: T.AdditiveBlending, depthWrite: false, side: T.DoubleSide, toneMapped: false
 }));
 shield.position.y = 1.15; shield.scale.set(1, .92, 1.06);
 shield.visible = false; shield.renderOrder = 3;
 g.add(shield);

 /* --- blob shadow --- */
 const shadowTex = softShadowTexture(detail === 'low' ? 64 : 128);
 const shadow = new T.Mesh(new T.PlaneGeometry(cfg.shadow[0], cfg.shadow[1]),
  new T.MeshBasicMaterial({ color: 0xffffff, map: shadowTex, transparent: true, opacity: .70, depthWrite: false, toneMapped: false }));
 shadow.rotation.x = -PI / 2; shadow.position.y = .035; shadow.renderOrder = -1;
 g.add(shadow);

 g.userData = {
  /* contract */
  head, flame, shield, wheels,
  /* extras */
  rig: { chassis, headRig, tailRig, steer, shadow, plate, glass, wheels, flameCore: flame.userData.core,
   chassisMesh, headMesh, glb: null, size: null },
  anim: {
   t: Math.random() * 10, spin: 0, steer: 0, lean: 0, pitch: 0, speed: 0,
   prevSpeed: 0, accel: 0, boost: 0, drift: 0, air: 0, bob: 0, wheelR: cfg.rw.r,
   hop: 0, hopT: 0, wasDrifting: false, shieldK: 1, motion: 1
  },
  driverId: id, detail, archetype: KART_ARCHETYPES[id % 8], palette: mat, model: 'procedural',
  accent: lift(d.accent, .55), disposed: false,
  extraMaterials: [flame.children[0].material, flame.children[1].material, shield.material,
   shadow.material, plate && plate.material, glass && glass.material].filter(Boolean)
 };
 return g;
}

/* ===================== the real models ===================== */
/* Names in assets.js's MANIFEST, in driver order. */
const MODEL_NAMES = ['blu', 'nova', 'knox', 'frost', 'blaze', 'glitch', 'onyx', 'pixel'];

/* Swap the procedural bodywork for the loaded GLB. Everything the engine holds
   a reference to survives: the group, userData.head / flame / shield / wheels
   (wheels is emptied in place, so an engine forEach over it is a no-op), the
   rig and the anim state. Only the bodywork, the wheels, the tail, the plate
   and the canopy go; the flame and the shadow are rebuilt to the new mesh's
   measurements. Safe to call once per kart; a second call is ignored. */
function attachModel(g, model) {
 const u = g.userData;
 if (!u || u.disposed || u.model === 'glb') return;
 const r = u.rig;
 const size = model.userData.assetSize || new T.Box3().setFromObject(model).getSize(new T.Vector3());

 /* --- take the procedural parts out --- */
 const gone = [r.chassisMesh, r.headMesh, r.plate, r.glass];
 if (r.tailRig) gone.push(r.tailRig); else r.chassis.children.slice().forEach(c => { if (c.isMesh && c !== r.chassisMesh && c.material === u.palette) gone.push(c); });
 for (const p of r.steer) gone.push(p);
 gone.push(r.wheels[r.wheels.length - 1]);          // the rear axle group
 for (const o of gone) {
  if (!o) continue;
  if (o.parent) o.parent.remove(o);
  o.traverse(m => { if (m.isMesh && m.geometry) m.geometry.dispose(); });
 }
 if (u.palette) {
  (u.palette.userData.paletteTextures || []).forEach(t => t.dispose());
  u.palette.dispose(); u.palette = null;
 }
 u.wheels.length = 0;
 r.wheels = u.wheels; r.steer = []; r.tailRig = null; r.plate = null; r.glass = null;
 r.chassisMesh = null; r.headMesh = null;

 /* --- the model. Its geometry is shared with the loader's master, so it is
        never disposed with the kart. --- */
 model.traverse(o => { if (o.isMesh) o.userData.sharedGeometry = true; });
 r.chassis.add(model);
 r.glb = model; r.size = size; u.model = 'glb';

 /* the driver's head sits at the top of the mesh, a little behind centre */
 u.head.position.set(0, size.y * .86, -size.z * .10);

 /* --- boost flame at the new tail. The generated karts all carry their
        exhaust low and central, so two pipes just inside the rear corners. --- */
 const old = u.flame;
 if (old.parent) old.parent.remove(old);
 old.traverse(m => { if (m.isMesh && m.geometry) m.geometry.dispose(); });
 u.extraMaterials = u.extraMaterials.filter(m => m !== old.children[0].material && m !== old.children[1].material);
 old.children.forEach(c => c.material.dispose());
 const flameCfg = {
  pipes: [[-size.x * .17, size.y * .20, -size.z * .50 + .06], [size.x * .17, size.y * .20, -size.z * .50 + .06]],
  pipeR: .13 + size.z * .02
 };
 const flame = makeFlame(flameCfg, u.accent);
 r.chassis.add(flame);
 u.flame = flame; r.flameCore = flame.userData.core;
 u.extraMaterials.push(flame.children[0].material, flame.children[1].material);

 /* --- shadow and shield to the new footprint --- */
 if (r.shadow) {
  r.shadow.geometry.dispose();
  r.shadow.geometry = new T.PlaneGeometry(size.x * 1.22, size.z * 1.06);
 }
 u.anim.shieldK = clamp(Math.max(size.z / 4.2, size.y / 2.85), .85, 1.3);
 /* a baked mesh has no spinning wheels, so the body carries more of the motion */
 u.anim.motion = 1.35;
}

/* The public constructor. Returns a group that is drawable this frame — the
   procedural kart — and upgrades it in place to the real model when that
   arrives. With preloadKarts() awaited first the upgrade happens right here,
   synchronously, so the garage portraits and the engine's width measurement
   see the real thing.

   opts.model  'glb' (default) | 'procedural'  — 'procedural' never loads a file
   opts.onModel(group)  called once, after the GLB is attached
   opts.detail 'high' | 'low'  — tier of the procedural placeholder/fallback */
export function makeKart(id, opts = {}) {
 const g = makeProceduralKart(id, opts);
 if (opts.model === 'procedural' || opts.model === false) return g;
 const name = MODEL_NAMES[id % MODEL_NAMES.length];
 const now = getModelSync(name);
 if (now) {
  attachModel(g, now);
  if (opts.onModel) opts.onModel(g);
 } else {
  loadModel(name).then(m => {
   if (g.userData.disposed) return;
   attachModel(g, m);
   if (opts.onModel) opts.onModel(g);
  }).catch(() => { /* the procedural kart simply stays */ });
 }
 return g;
}

/* Load the eight driver models. Resolves (never rejects) when every file has
   either arrived or failed; game.js awaits this on the loading screen so a race
   starts with the real cast. Safe to call more than once. */
export function preloadKarts() {
 return preload(MODEL_NAMES).then(() => MODEL_NAMES.map(n => isLoaded(n)));
}

export function kartsReady() {
 return MODEL_NAMES.every(n => isLoaded(n));
}

/* ===================== per-frame animation ===================== */
const TOP_SPEED = 56;   /* simulation top speed is 47 + speed*1.6 ≈ 47..55 */

export function updateKart(group, state, dt) {
 const u = group && group.userData;
 if (!u || !u.rig || !u.anim) return;
 const a = u.anim, r = u.rig, s = state || {};
 dt = (typeof dt === 'number' && dt > 0 && dt < .25) ? dt : .016;
 a.t += dt;

 const speed = Math.max(0, +s.speed || 0);
 const speedN = clamp(s.speedN !== undefined ? +s.speedN : speed / TOP_SPEED, 0, 1.4);
 const steerIn = clamp(+s.steer || 0, -1, 1);
 const drift = clamp(+s.drift || 0, 0, 1);
 const driftDir = Math.sign(+s.driftDir || 0);
 const boostIn = clamp(s.boost > 1 ? 1 : (+s.boost || 0), 0, 1);
 const air = s.airborne ? 1 : 0;

 /* smoothing — every one of these is what turns a pop into a move */
 a.steer = approach(a.steer, steerIn, 11, dt);
 a.drift = approach(a.drift, drift, 9, dt);
 a.boost = approach(a.boost, boostIn, boostIn > a.boost ? 7 : 3.2, dt);
 a.air = approach(a.air, air, 10, dt);
 const rawAccel = (speed - a.prevSpeed) / dt; a.prevSpeed = speed;
 a.accel = approach(a.accel, clamp(rawAccel / 24, -1, 1), 5, dt);
 a.speed = approach(a.speed, speedN, 4, dt);

 /* drift start: a hop. The sim has no vertical axis, so this is purely the
    kart's own — a Mario Kart style bounce the moment the drift button lands,
    then the body settles into its tilt. */
 const drifting = drift > 0;
 if (drifting && !a.wasDrifting) { a.hop = 1; a.hopT = 0; }
 a.wasDrifting = drifting;
 let hopY = 0;
 if (a.hop > 0) {
  a.hopT += dt;
  const T_HOP = .34;
  const x = a.hopT / T_HOP;
  hopY = x < 1 ? Math.sin(x * PI) * .30 * (1 - x * .35) : 0;
  if (x >= 1) a.hop = 0;
 }

 /* chassis: roll into the corner, squat under power, float when airborne.
    `motion` is 1 for the procedural kart and 1.35 for a baked GLB, which has
    no spinning wheels or streaming tail to sell speed and needs the body to
    do more of the talking. */
 const mo = a.motion || 1;
 const lean = (-a.steer * .105 - a.drift * driftDir * .085) * mo;
 a.lean = approach(a.lean, lean, 14, dt);
 const pitch = (-a.accel * .045 + a.air * .09) * mo - a.boost * .02 * mo;
 a.pitch = approach(a.pitch, pitch, 9, dt);
 r.chassis.rotation.z = a.lean;
 r.chassis.rotation.x = a.pitch + hopY * .25;
 /* the body swings a few degrees past the sim's drift angle and breathes
    while it holds — the visual that says "the back end is out" */
 r.chassis.rotation.y = a.drift * driftDir * (.07 + Math.sin(a.t * 5.2) * .025) * mo;
 const bob = Math.sin(a.t * 7.5 + u.driverId) * .011 * (.35 + a.speed) + Math.sin(a.t * 19.3) * .004 * a.speed;
 const rumble = mo > 1 ? Math.sin(a.t * 31 + u.driverId * 2) * .006 * a.speed : 0;
 r.chassis.position.y = bob + rumble + hopY - a.air * .05 - Math.max(0, a.accel) * .02 * mo;
 r.chassis.position.x = a.lean * .10;

 /* wheels: spin, steer, counter-steer in a drift */
 const spinRate = clamp(speed / (a.wheelR || .5), 0, 42);
 a.spin = (a.spin + spinRate * dt * (1 - a.air * .7)) % (PI * 2);
 for (const w of r.wheels) w.rotation.x = a.spin;
 const front = a.steer * .40 - a.drift * driftDir * .26;
 for (const p of r.steer) {
  p.rotation.y = front;
  p.position.y = (p.userData.y0 || p.position.y) + a.air * .05;
 }

 /* driver: look into the corner, brace in a drift (an empty pivot on a GLB) */
 r.headRig.rotation.y = a.steer * .34 + a.drift * driftDir * .30;
 r.headRig.rotation.z = -a.steer * .10;
 r.headRig.rotation.x = -a.speed * .05 + Math.sin(a.t * 2.1 + u.driverId) * .022;

 /* tail streams back and sways */
 if (r.tailRig) {
  r.tailRig.rotation.x = -.05 + a.speed * .55 - a.air * .25;
  r.tailRig.rotation.y = Math.sin(a.t * (3 + a.speed * 6)) * (.14 + a.speed * .16) - a.steer * .30;
  r.tailRig.rotation.z = Math.sin(a.t * 4.3 + 1.1) * .07;
 }

 /* boost flame ramps in, flickers, and fades out */
 const fl = u.flame;
 if (a.boost > .02) {
  fl.visible = true;
  /* only the length is scaled: the cones are anchored at the exhaust mouth, so
     x/y must stay at 1 or the pipes would drift apart */
  const flick = .86 + Math.sin(a.t * 47) * .09 + Math.sin(a.t * 91.7) * .06;
  fl.scale.set(1, 1, (.18 + a.boost * .92) * flick);
  fl.children[0].material.opacity = .22 + a.boost * .66;
  fl.children[1].material.opacity = .18 + a.boost * .78;
 } else if (fl.visible) { fl.visible = false; }

 /* shield pulses and drifts */
 const sh = u.shield;
 if (sh.visible) {
  const p = (1 + Math.sin(a.t * 3.4) * .035) * (a.shieldK || 1);
  sh.scale.set(p, .92 * p, 1.06 * p);
  sh.rotation.y = a.t * .55; sh.rotation.x = Math.sin(a.t * .7) * .12;
  if (sh.material.map) { sh.material.map.offset.x = a.t * .06; sh.material.map.offset.y = -a.t * .03; }
 }

 /* shadow tightens as the kart lifts — and during the drift hop */
 if (r.shadow) {
  const lift = clamp(a.air + hopY * 2.2, 0, 1);
  const k = 1 - lift * .28;
  r.shadow.scale.set(k, k, 1);
  r.shadow.material.opacity = .70 * (1 - lift * .45);
 }
}

/* ===================== housekeeping ===================== */
export function disposeKart(group) {
 if (!group) return;
 const u = group.userData || {};
 u.disposed = true;
 /* a GLB's geometry belongs to assets.js's cached master: leave it alone */
 group.traverse(o => { if (o.isMesh && o.geometry && !o.userData.sharedGeometry) o.geometry.dispose(); });
 if (u.palette) {
  (u.palette.userData.paletteTextures || []).forEach(t => t.dispose());
  u.palette.dispose();
 }
 (u.extraMaterials || []).forEach(m => { if (m.map) m.map.dispose(); m.dispose(); });
}

export function kartStats(group) {
 let tri = 0, draws = 0, meshes = 0;
 group.traverse(o => {
  if (!o.isMesh) return;
  meshes++;
  const g = o.geometry;
  const n = (g.index ? g.index.count : g.attributes.position.count) / 3;
  tri += n;
  let vis = o.visible; let p = o.parent;
  while (vis && p) { vis = p.visible; p = p.parent; }
  if (vis) { draws++; }
 });
 return { triangles: tri, drawCalls: draws, meshes };
}

export default makeKart;
