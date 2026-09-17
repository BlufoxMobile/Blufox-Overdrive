# BLUFOX OVERDRIVE — v3 "SHOWROOM" upgrade plan

Goal: the live game (https://blufoxmobile.github.io/Blufox-Overdrive/) already has the
gameplay Jeff loves. v3 keeps that gameplay byte-for-byte in feel and makes it LOOK like a
current-generation AAA kart racer (Mario Kart 8 Deluxe / Mario Kart World energy) while
staying one self-contained HTML file that runs on a phone in landscape. It also gets a
notch harder and more interesting to race.

## What we are starting from

`src/` is the de-minified source of the live v2 build (esbuild bundle, recovered and
unmangled — three.js identifiers were restored to their real names, e.g. `MeshStandardMaterial`,
`Vector3`; app identifiers are still short mangled names like `Mu`, `Pu`, `Zp`. Rename freely
inside the file you own, never across files). All files share ONE IIFE scope — a top-level
`var`/`function` in one file is visible to every later file. Load order = file name order:

| file | owns | what it is |
|---|---|---|
| `00-data-sim.js` | DIFFICULTY agent | driver/track/item data (`ki`, `Li`), the race simulation `Za` (physics, AI, items, rubber band) |
| `01-three.js` | nobody — never edit | three.js r169 |
| `01a-hooks.js` | shared, read only | `BFX_HOOKS` extension points (see below) |
| `01b-assets.js` | shared, read only | `BFX_ASSETS` — AI art as WebP data URLs: `skies[6]`, `keyArt.title/finish`, `portraits[8]`, `load(url)` |
| `02-graphics.js` | ENV agent | per-circuit env data `As` (sky, IBL shapes, fog, sun, hemi, grade), sky dome `Zp`, PMREM `Sa`, post chain `vl` (bloom/FXAA/grade), quality tiers `Rs` |
| `03-actors.js` | KARTS agent | kart + character builder `Mu(index,{detail})`, animate `pf(mesh,state,dt)`, half width `w1` |
| `04-world.js` | WORLD agent | track mesh, barriers `barrierFaceAt`, curbs, per-circuit set dressing `m1=[_f,h1,u1,d1,p1,f1]`, materials `zr`, `TrackWorld` = `Pu` |
| `05-engine.js` | ENV agent | `Al`: renderer, scene, lights, loadTrack, sync (kart placement, pickups, sparks), hooks are fired here |
| `06-audio.js` | nobody this round | procedural soundtrack + sfx |
| `06a-fx.js` | FX agent (new file) | particles, weather, trails, confetti, boost/hit effects — plugs in via hooks only |
| `07-feel.js` | DIFFICULTY agent | input (tilt/pad/keys), chase camera `Ll`, difficulty presets `Xu`, FramePacer |
| `08-game.js` + `shell.html` | UI agent | all DOM/menus/HUD/results, game loop `t0`, `startRace` = `zl` |

Build: `python3 build.py` → `dist/index.html` (this is the whole game).
Look at it: `node tools/shot.js --out shots/x.png [--screen home|garage|circuits|settings] [--track N --driver N --race --steps 700 --drive left|right|none] [--w 844 --h 390]`
then **Read the PNG**. Headless SwiftShader is slow: a race shot takes 30–90 s. Run at most
2 shots in parallel (2 CPUs). `--race` fast-steps the sim so you get a real mid-race frame.
Console errors are printed at the end of every shot — a shot with errors is a failure.

Debug handles in the page: `window.__blufox` (race, engine, input, chase, startRace, screen(name),
select(driver,track)), `window.__BFX_HOOKS`, `window.__BFX_ASSETS`, `window.__blufoxLook` (post chain),
`window.__blufoxGraphics` (quality tiers).

## Hooks (01a-hooks.js) — how independent files plug in

```
BFX_HOOKS.on('trackLoaded', ({engine,index,track,trackWorld,stage,scene,quality}) => {...})  // add meshes to stage
BFX_HOOKS.on('trackDispose', ({engine,index}) => {...})                                       // free your GPU stuff
BFX_HOOKS.on('raceStart',   ({race,engine,difficulty}) => {...})
BFX_HOOKS.on('frame',       ({engine,race,dt,player,scene,camera,time}) => {...})            // after kart sync, before post
BFX_HOOKS.on('raceEvent',   (ev,{engine,race}) => {...})   // ev = {text, kind:'boost'|'hit'|'lap'|'count'|undefined}
BFX_HOOKS.on('raceEnd',     ({race,engine,position}) => {...})
```
`trackWorld` API you can rely on: `sampleAt(t, lateral, height)` → `{p:Vector3, dir, right, up}` with
`t` in 0..1 around the lap; `barrierFaceAt(t, side±1)` → lateral distance of the wall; `length` (m);
`curvature(t)`. Player racer: `race.player` with `.distance` (m), `.lane` (lateral m), `.speed`
(≈0..60), `.drifting`, `.drift` (charge s), `.boost` (s left), `.stun`, `.shield`, `.position`.
Kart meshes: `engine.racerMeshes[i]` (i = driver index), `engine.racerMeshes[i].userData.*` from the kart builder.

## Non-negotiables (every agent)

1. **Gameplay feel is locked.** Nothing about player physics numbers, steering, drift timings,
   lane clamp or the kart model changes except where the DIFFICULTY brief says so.
2. **One file, no network.** No CDN, fonts, fetches, or external images. Everything is
   procedural or comes from `BFX_ASSETS`.
3. **Phone first, landscape.** Primary target is 844×390 logical px at DPR 2–3 on an iPhone.
   Respect the quality tiers in `02-graphics.js` (`Rs`: low/medium/high/ultra). Anything heavy
   must scale down on `low`. Budget: ≤ ~150 draw calls and ≤ ~400k triangles on `high` in a race
   frame; `low` must be ≤ half that. Instance or merge geometry; never one mesh per bolt.
4. **Screenshot-and-look loop.** Build, shoot, Read the PNG, judge it like an art director, fix,
   repeat. Do not stop at "no console errors". Shoot at least: your area on 3 different circuits,
   plus one `--w 390 --h 844`-style sanity check is NOT needed (landscape only) but do one
   `--w 1280 --h 720` desktop shot.
5. **Own only your files.** Never edit another agent's file. If you need a hook that doesn't
   exist, use the closest one and note it in your final report. `01-three.js`, `01a-hooks.js`,
   `01b-assets.js` are read-only.
6. Keep the C³ / Blufox palette: cyan `#5df0ff`, purple `#8b5bff`, magenta `#d96bff`, deep navy
   `#05060f`. Xfinity/Blufox branding stays on the trackside banners.
7. Finish with a written report: what changed, what you verified (with shot paths), known gaps.

## Agent briefs

### ENV — sky, lighting, shadows, post (`02-graphics.js`, `05-engine.js`)
The single biggest lift. Today the sky is a flat gradient, karts have no visible shadow, the
world reads as plastic. Make it read like a lit, photographed scene:
- Wrap `BFX_ASSETS.skies[index]` around the track as the backdrop: a large cylinder (or dome
  band) centred on the track, horizon-aligned, with a soft blend to the existing procedural sky
  colour above and fog colour below so no hard edges show; the panorama must not swim with the
  camera (it is distance-scaled, at ~1200–1800 m). Keep the existing procedural stars/nebula
  layer above it for Galaxy/Frostbyte. Use `SRGBColorSpace` on the texture.
- Feed the sky into the PMREM IBL so kart paint/chrome reflect the actual backdrop colours.
- Real shadows: the directional sun already casts; fit the shadow camera tightly to the player
  (~±40 m box, follow the camera), 2048 on high/ultra, 1024 medium, 512 low, PCF-soft; make sure
  the road, karts and props receive/cast. Add a cheap contact blob under every kart if not present.
- Per-circuit light rig: sun colour/direction that matches the painted backdrop (Lakefront golden
  hour low sun, Canyon sunset orange, Frostbyte cold blue key + aurora green fill, Chicago
  purple/cyan neon fill, Megastore bright white-blue overhead, Galaxy purple/cyan rim).
- Post: keep ACES + bloom + vignette; add a subtle sun/lens flare sprite when the sun is on
  screen, a gentle speed-dependent radial sharpen/blur only at the screen edge during boost
  (edge only — center stays clean), and slight film grain (very low). Colour grade per circuit.
  No chromatic aberration overload — v1 died of that.
- Fog: exponential fog that matches the backdrop's horizon colour so the track dissolves into
  the painting.
Verify: race shots on circuits 0, 2, 3, 4 (night/day/snow/sunset) — shadows visible under karts,
backdrop visible behind the track, no seam, no banding.

### WORLD — track surface, curbs, dense set dressing (`04-world.js`)
Today the environments are sparse boxes (Lakefront is empty beige; Frostbyte is white blocks;
Canyon is a flat red wall). Make every circuit feel like a place people built:
- Road surface: procedural asphalt with a normal map (canvas-generated), subtle tyre-wear darker
  lines in the racing line, painted start grid, painted Blufox/C³ logo-style markings, glowing
  lane light strips on the neon circuits, wet sheen on Chicago, snow dust on Frostbyte, dust
  on Canyon, polished floor on Megastore, metallic grate on Galaxy.
- Curbs (red/white or cyan/purple rumble strips) on every corner apex, tyre walls / armco /
  glass barriers with proper thickness; keep `barrierFaceAt` identical (collision is locked).
- Set dressing, dense and layered, using merged/instanced geometry:
  Chicago: skyscrapers with emissive window grids, elevated L-train track that crosses over,
  billboards, street lamps, an overpass, neon signs. Megastore: giant shelves stocked with
  boxes/phones, display tables, escalators, hanging screens, balloons, a big "BLUFOX" store
  sign. Lakefront: beach, water plane with animated reflective shader, pier, ferris wheel that
  rotates, sailboats, palm-free trees, beach umbrellas, a lighthouse. Frostbyte: snow
  banks, pine trees (instanced), ice crystals (emissive), a lodge, ski-lift towers with moving
  cable cars, snow on everything. Canyon: layered strata rock walls, hoodoos, radio masts
  with blinking lights, satellite dishes, cacti/scrub, a wooden bridge. Galaxy: space
  station rings, floating asteroids, holographic gates, planet props, data-stream ribbons.
- Crowd: instanced spectator sprites/blobs in grandstands that bob; start/finish gantry with
  lights and a big screen; flags/banners with Xfinity/Blufox that wave.
- Animate what should move via a `BFX_HOOKS.on('frame', …)` registered inside your file.
Verify: race shot on every circuit (all 6) plus a `--steps 1500` shot to see a different part
of the lap. Draw-call budget above.

### KARTS — karts and characters (`03-actors.js`)
The karts are the thing the player stares at. Today they are flat-shaded lumps with
no shine. Target: toy-quality, glossy, readable at HUD distance:
- Body: smoother multi-part shells (nose, side pods, rear wing, diffuser), clearcoat-style paint
  (MeshPhysicalMaterial clearcoat on high/ultra; Standard with high env intensity on low),
  chrome exhausts and rims, dark rubber tyres with tread texture, number plate, driver colour
  accents, headlights (emissive) and tail lights that brighten on brake, underglow strip in
  the driver accent colour, small spoiler decals.
- Character: keep the eight distinct silhouettes (goggles/visor/cap/hood/mohawk/headphones/
  helmet/crown) but give them faces that read: eyes with pupils/highlights, ears, a mouth,
  hands on the wheel. Head turns into corners, body leans in drift, bounces with speed.
- Wheels roll with speed, front wheels steer, kart squats on boost, exhaust glows on boost.
- Everything must still come out of `Mu(index,{detail})` with the same `userData` contract
  (`shield`, whatever `pf`/engine/game currently read — grep `userData.` in 05/08 before you
  change a key) and `w1(mesh)` half widths must not change by more than 0.05 m.
Verify: the garage preview (`--screen garage`) for at least 4 drivers and a race shot on 2
circuits; also `renderPreview`/`portraits()` in the engine must still work.

### FX — particles and spectacle (new `06a-fx.js`, hooks only)
Add the layer of motion that makes racers feel alive. All GPU-cheap: one Points/instanced
system per effect, pooled, quality-tier aware:
- Drift smoke (grey→driver colour as charge rises), tyre sparks at ULTRA charge, skid marks
  decal ribbon on the road, boost flames + heat shimmer + speed streaks from the exhaust,
  shield hex-bubble shimmer, hit burst (SIGNAL LOST) with a static-glitch flash, pulse wave
  for SIGNAL PULSE, dead-zone trap crackle, item pickup sparkle, lap flag confetti at the
  gantry, finish-line fireworks + confetti storm at `raceEnd`.
- Ambient per circuit: Chicago light rain streaks + wet sparkle, Megastore floating confetti/
  balloons, Lakefront gulls + spray + lens sun sparkle on water, Frostbyte falling snow,
  Canyon dust devils + tumbleweeds, Galaxy stardust streaming past.
- Kart trails: thin additive light ribbons behind every kart on boost.
- Hazards: if `race.hazards` exists (see DIFFICULTY brief for the shape), draw each one generically
  every frame: `slick`/`ice` = flat glossy disc decal on the road (dark oil / pale blue ice) with a
  faint shimmer; `mover` = a glowing box/cart at `sampleAt(distance/length, lane, 0.6)` that slides
  with `phase`; `shortcut` = a row of pulsing cyan chevrons. Hide when `active` is false. Build them
  defensively — the array may be empty or absent in the build you test against.
Use `raceEvent` kinds and `player`/`race.racers` state; add to `scene`/`stage` on `trackLoaded`,
dispose on `trackDispose`. Nothing should ever stack up over time (v1 bug: undecayed impulses).
Verify: race shot with `--drive left --steps 900` (drifting) and one right after a boost pad.

### UI — menus, HUD, results (`shell.html`, `08-game.js`)
Make the first screen breathtaking and the rest match:
- Title: `BFX_ASSETS.keyArt.title` as a full-bleed hero (cover, right-anchored so the fox is
  visible on 844×390 and on 1280×720), slow Ken-Burns drift, animated light sweep on the logo,
  particles, the buttons over the calm left third. Boot splash: logo + "TAP TO START" at 900 ms,
  auto-advance at 2600 ms (keep!).
- Garage: driver portraits (`BFX_ASSETS.portraits[i]`) on the cards and a large portrait beside
  the live 3D preview; animated stat bars; a driver colour wash behind the preview.
- Circuits: cards with a cropped slice of each `BFX_ASSETS.skies[i]` as the card image, difficulty
  chips, best-time, a small animated track outline (the minimap path already exists).
- HUD: keep the layout and safety rule (centre 60% belongs to the player), polish: position
  number with driver colour, lap ring, item slot roulette flash, boost meter glow, subtle
  glass panels; a "WRONG WAY"/"FINAL LAP" banner style; damage/hit red flash.
- Results: podium with the top-3 portraits, place stamp animation, confetti (CSS), best-lap
  callout, `keyArt.finish` dimmed behind.
- Transitions between screens (fade/slide), reduced-motion respected.
Keep every existing element id (other code looks them up). Verify all screens at 844×390 and
1280×720 with shots, plus the race HUD.

### DIFFICULTY — harder, more interesting racing (`00-data-sim.js`, `07-feel.js`)
Jeff: "I would love for it to be a little more challenging, so make it interesting there."
Player feel stays identical; change the opposition and the track:
- Difficulty presets in `Xu` (easy/normal/hard): raise AI base skill on normal/hard, tighten the
  catch-up rubber band on hard (front-runner never gets slowed to wait for the player), and
  add a 4th tier **OVERDRIVE** (unlocked always, labelled) where AI drifts every corner and
  uses items aggressively.
- AI behaviour: AI take real racing lines (outside-inside-outside, using `curvature`), drift
  through long corners for mini-turbos like the player does, defend by blocking when a rival is
  close behind, use items with intent (pulse when a target is ahead within range, shield when
  threatened, dead zone dropped in the apex of a corner, boost on straights).
- Item roulette weights keep "back of the pack gets the good stuff" but front-runner drops are
  weaker on hard/overdrive.
- Track hazards (sim-side objects; expose them as `race.hazards` = array of
  `{kind:'slick'|'ice'|'mover'|'shortcut', distance (m along lap), lane (lateral m), radius (m),
  active:boolean, phase (0..1 for movers), color:hex}` — the FX agent draws exactly this shape): oil/ice slicks that cut grip, moving obstacles on 2 circuits (Megastore
  stock carts crossing an aisle; Lakefront gulls/beach balls), a shortcut on 2 circuits gated by
  a boost pad. Keep them fair: telegraph 40 m ahead via `emit("…AHEAD")` events (kind 'cue').
- Emit richer events for FX/UI: `kind:'pickup'`, `'pass'` (player overtakes/gets overtaken),
  `'wrongway'`, `'hazard'`, `'finalstretch'`.
The race must still be winnable: run the headless race harness on every circuit at every
difficulty (see `tools/race-test.js` — write it if missing: instantiate `Za` directly in node
the way `08-game.js` does, drive the player with a simple line-follower, assert finish, and print
positions / lap times). Target: easy ≥5/6 wins with a decent line, normal ~3/6, hard ~1–2/6,
overdrive ≤1/6, and no race longer than 90 s.
