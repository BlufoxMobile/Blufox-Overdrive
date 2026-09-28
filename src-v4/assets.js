// assets.js — GLB model loading for Blufox Overdrive.
//
// Models are AI-generated (Higgsfield / Meshy) textured GLBs that live in ./assets/.
// Every model is normalised on load so callers never care what the generator did:
//   - centred on its bounding box in X/Z, resting on y = 0
//   - scaled so its LONGEST horizontal axis equals `length` world units
//   - rotated by `yaw` (radians) so "forward" is +Z, the game's convention
// The manifest below is the single place those per-asset corrections live.
//
// loadModel(name) resolves to a fresh THREE.Group (a clone of the cached scene) or
// rejects. Callers MUST handle rejection and fall back to procedural geometry —
// the game has to boot with no network and with a missing/corrupt file.
//
// getModelSync(name) is the synchronous twin: a clone when the model has already
// arrived (after preload()), otherwise null — and it kicks the load off so the
// next caller gets it. makeKart() uses it to attach the real mesh on the first
// frame when the loading screen has already awaited preloadKarts().

import * as T from './three.module.js';
import { GLTFLoader } from './vendor/GLTFLoader.js';

/* Material defaults shared by the eight kart models (see tuneKartMaterial). */
const KART = { selfLight: 0.22, roughness: 0.62, metalness: 0.08, envMapIntensity: 0.9 };

export const MANIFEST = {
  // drivers — one kart+driver mesh each.
  //
  // yaw: calibrated 2026-09-28 from scratch/glb-cal.html (top-down + side
  //   renders of every file, then scratch/glb-compare.html front/rear views to
  //   confirm the face is on the nose end). At yaw 0 the generator put Blu,
  //   Nova, Frost, Onyx and Pixel nose-down -X with the tail at +X (so +PI/2
  //   brings the nose to +Z); Knox, Blaze and Glitch were already nose +Z.
  // length: the model's longest horizontal axis in metres — that axis INCLUDES
  //   the fox tail and wing, so it is the full bounding-box length, and it is
  //   matched to the procedural karts' bounding boxes (4.2–4.9 m, measured in
  //   scratch/glb-measure.html), not to their ~3.4 m chassis. The sizes were
  //   chosen so the width lands at 2.6–3.2 m like the karts they replace.
  //   Onyx is the biggest thing on the grid, Knox the smallest.
  blu:    { ...KART, file: 'assets/kart-blu.glb',    length: 4.20, yaw:  Math.PI / 2 },
  nova:   { ...KART, file: 'assets/kart-nova.glb',   length: 4.40, yaw:  Math.PI / 2 },
  knox:   { ...KART, file: 'assets/kart-knox.glb',   length: 3.60, yaw:  0 },
  frost:  { ...KART, file: 'assets/kart-frost.glb',  length: 4.20, yaw:  Math.PI / 2 },
  blaze:  { ...KART, file: 'assets/kart-blaze.glb',  length: 4.00, yaw:  0 },
  glitch: { ...KART, file: 'assets/kart-glitch.glb', length: 3.90, yaw:  0 },
  onyx:   { ...KART, file: 'assets/kart-onyx.glb',   length: 4.60, yaw:  Math.PI / 2 },
  pixel:  { ...KART, file: 'assets/kart-pixel.glb',  length: 4.40, yaw:  Math.PI / 2 },
  // items
  xb8:    { file: 'assets/xb8.glb', length: 1.1, yaw: 0, upright: true },
};

export const KART_MODELS = ['blu', 'nova', 'knox', 'frost', 'blaze', 'glitch', 'onyx', 'pixel'];

const loader = new GLTFLoader();
const cache = new Map();      // name -> Promise<THREE.Group>  (the normalised master)
const ready = new Map();      // name -> THREE.Group            (resolved masters only)
let base = '';                // resolved against the page; override with setBase()

export function setBase(url) { base = url; }

/* The kart textures are baked-lit JPEGs: the generator already painted the
   shading into the colour map. Rendering them as plain PBR under the race
   lights darkened every driver's face to mud on Chicago Afterglow, so the map
   also feeds a weak emissive term — enough to keep the character readable in
   the dark, not enough to flatten the real lighting in daylight. */
function tuneKartMaterial(m, spec) {
  if (!m) return;
  if (m.map) { m.map.colorSpace = T.SRGBColorSpace; m.map.anisotropy = 4; }
  if ('envMapIntensity' in m) m.envMapIntensity = spec.envMapIntensity !== undefined ? spec.envMapIntensity : 0.9;
  if ('roughness' in m) m.roughness = spec.roughness !== undefined ? spec.roughness : 0.62;
  if ('metalness' in m) m.metalness = spec.metalness !== undefined ? spec.metalness : 0.08;
  if (spec.selfLight && m.map && 'emissive' in m) {
    m.emissiveMap = m.map;
    m.emissive.setScalar(1);
    m.emissiveIntensity = spec.selfLight;
  }
  m.needsUpdate = true;
}

function normalise(scene, spec) {
  const g = new T.Group();
  g.add(scene);
  // orientation first, then measure
  scene.rotation.y = spec.yaw || 0;
  scene.updateMatrixWorld(true);
  const box = new T.Box3().setFromObject(scene);
  const size = box.getSize(new T.Vector3());
  const longest = spec.upright ? size.y : Math.max(size.x, size.z);
  const s = (spec.length || 1) / Math.max(1e-6, longest);
  scene.scale.setScalar(s);
  scene.updateMatrixWorld(true);
  const box2 = new T.Box3().setFromObject(scene);
  const c = box2.getCenter(new T.Vector3());
  scene.position.set(-c.x, -box2.min.y, -c.z);
  scene.traverse(o => {
    if (o.isMesh) {
      o.castShadow = true; o.receiveShadow = false; o.frustumCulled = true;
      tuneKartMaterial(o.material, spec);
    }
  });
  g.userData.assetSize = size.clone().multiplyScalar(s);
  return g;
}

export function loadModel(name) {
  const spec = MANIFEST[name];
  if (!spec) return Promise.reject(new Error('unknown asset ' + name));
  if (!cache.has(name)) {
    const p = new Promise((res, rej) => {
      loader.load(base + spec.file, gltf => {
        try { res(normalise(gltf.scene, spec)); } catch (e) { rej(e); }
      }, undefined, err => rej(err || new Error('load failed ' + spec.file)));
    });
    p.then(master => ready.set(name, master), () => cache.delete(name));   // allow a retry later
    cache.set(name, p);
  }
  return cache.get(name).then(master => cloneOf(master));
}

function cloneOf(master) {
  const clone = master.clone(true);
  // materials are shared between clones on purpose (one texture upload); callers
  // that need per-instance tinting must clone the material themselves.
  clone.userData.assetSize = master.userData.assetSize;
  return clone;
}

/* A clone right now, or null. Never throws; a null also starts the load. */
export function getModelSync(name) {
  const master = ready.get(name);
  if (master) return cloneOf(master);
  if (MANIFEST[name]) loadModel(name).catch(() => {});
  return null;
}

export function preload(names) {
  return Promise.allSettled(names.map(n => loadModel(n)));
}

export function isLoaded(name) {
  return ready.has(name);
}
