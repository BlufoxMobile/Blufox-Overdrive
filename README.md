# BLUFOX OVERDRIVE

A Mario-Kart-style racer themed to **Blufox Mobile / Cook County Cooks (C³)**.

**Play:** https://blufoxmobile.github.io/Blufox-Overdrive/ — on a phone in landscape, sound on.

## v4 — "Grid" (28 Sept 2026)

- **A real cast.** All eight drivers are now AI-generated 3D models — adult anthropomorphic
  fox racing drivers, each in their own kart (`assets/kart-*.glb`), lit and shadowed by the
  circuit. Portraits in the garage are rendered from the same models.
- **XB8 modem.** A new item from the mystery boxes: throw it ahead and it hunts down the kart
  in front of you (`assets/xb8.glb`). Shields still block it.
- **Walls off the track.** The big set-dressing walls that used to sit on the racing line
  (and that you could drive through) are gone. Nothing solid-looking is inside 30 m of the
  centreline; the guardrail you see is the guardrail you hit.
- **Painted skylines.** Every circuit races in front of its own painted panorama
  (`assets/sky-*.webp`), which also lights the karts' paint and chrome. Title key art with the
  new cast.

## Controls

**Phone** — auto-accelerate is on. Tilt to steer (or drag on the left half / ◀ ▶ buttons in
Settings). DRIFT and ITEM are bottom-right; tap ITEM to throw.

**Desktop** — arrows / WASD to steer, Space to drift, Shift for items, C to look back, Esc to pause.

## Tech

`index.html` (three.js r169 inlined, ~0.9 MB) plus an `assets/` folder (~13 MB of models
and paintings, cached after the first load). WebGL2 with four auto-scaling quality tiers;
procedural soundtrack and effects.

Source for this build lives in `src-v4/` (ES modules; `build.py` inlines them). The `src/`
folder and `shell.html` are the earlier v3 "Showroom" source, kept for reference.
