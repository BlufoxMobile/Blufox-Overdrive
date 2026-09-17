# BLUFOX OVERDRIVE

A Mario-Kart-style racer themed to **Blufox Mobile / Cook County Cooks (C³)**.
One self-contained HTML file. No installs, no dependencies, no network calls.

**Play:** https://blufoxmobile.github.io/Blufox-Overdrive/ — on a phone in landscape, sound on.

## v3 — "Showroom" (Sept 2026)

Same gameplay you know, rebuilt to look like a current-gen kart racer:

- **Painted skies** — every circuit races in front of its own hand-painted panoramic backdrop
  (Chicago after the storm, the Megastore atrium, a golden-hour lakefront, an aurora over
  Frostbyte, a canyon sunset, a nebula full of stations), which also lights the karts.
- **Real lighting** — per-circuit sun rigs, soft 2K shadows under every kart, image-based
  reflections on paint and chrome, per-circuit colour grades, film grain, boost edge-blur.
- **Places, not boxes** — asphalt with wear lines and puddles, rumble-strip curbs, tyre walls
  and armco, grandstands with bobbing crowds, waving Blufox / Xfinity flags, a start gantry
  with a big screen and start lights; skyscrapers and an L-train on Chicago, stocked shelves
  and escalators in the Megastore, a rotating ferris wheel and lighthouse on the lakefront,
  ski lifts and ice crystals on Frostbyte, radio masts and a plank bridge in the canyon,
  rotating station rings and holo gates in the galaxy.
- **Glossy karts** — clearcoat paint, chrome rims and exhausts, LED lights, underglow, number
  plates, and drivers with real faces who lean into corners and turn their heads.
- **Spectacle** — drift smoke that turns your colour, sparks, skid marks, boost flames and
  light trails, shield shimmer, hit static, pulse waves, lap confetti, finish fireworks, and
  weather on every circuit (rain, snow, dust devils, gulls, balloons, stardust).
- **New menus** — key art on the title, driver portraits in the garage, sky cards for circuits,
  a podium with confetti on the results screen.
- **Harder, smarter racing** — AI now takes real racing lines, drifts for mini-turbos, blocks,
  and uses items with intent. Four tiers: ROOKIE, PRO, ACE and **OVERDRIVE**. Track hazards
  (oil, ice, stock carts, gulls, beach balls) and two boost-gated shortcuts.

## Controls

**Phone** — auto-accelerate is on. Tilt to steer (or drag on the left half / ◀ ▶ buttons in
Settings). DRIFT and ITEM are bottom-right.

**Desktop** — arrows / WASD to steer, Space to drift, Shift for items, C to look back, Esc to pause.

## Tech

Single ~5 MB file (art is inlined as WebP), three.js r169 under the hood, WebGL2 with four
auto-scaling quality tiers. Every mesh, texture, sound and note besides the painted
backdrops and portraits is generated at runtime.
