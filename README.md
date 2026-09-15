# BLUFOX OVERDRIVE

A Mario-Kart-style racer themed to **Blufox Mobile / Cook County Cooks (C³)**.
One self-contained HTML file. No installs, no dependencies, no network calls.

**Play:** open `index.html` — or the GitHub Pages URL — on a phone in landscape, sound on.

## What's in it

- **8 drivers** — Blu, Nova, Knox, Frost, Blaze, Glitch, Onyx, Pixel — each with their own
  kart body, handling and stat line.
- **6 circuits** — Chicago Afterglow, Xfinity Megastore, Lakefront Rush, Signal Canyon,
  Frostbyte Summit, Gigabit Galaxy — with real elevation, banking and a flyover.
- **Grand Prix** (two cups, points, trophies), **Time Trial** with a ghost, and quick race.
- **Power-ups** — GIG BOOST, xFI SHIELD, SIGNAL PULSE, DEAD ZONE and four rarer drops,
  weighted so the back of the pack gets the good stuff.
- **Drift mini-turbos** — hold DRIFT through a corner, charge to purple, release.
- Hand-written WebGL2 renderer, bloom / motion blur / speed-warp post chain, and a
  fully procedural adaptive soundtrack that layers up as the race heats up.

## Controls

**Phone** — auto-accelerate is on. Drag anywhere on the left half to steer (or switch to
tilt or the ◀ ▶ buttons in Settings). DRIFT and ITEM are bottom-right.

**Desktop** — arrows / WASD to steer, Space to drift, Shift for items, C to look back,
Esc to pause.

## Tech

Single file, ~890 KB, zero external requests. WebGL2 with a WebGL1-free fallback message;
quality auto-scales for phones. Every texture, mesh, sound and note is generated at runtime.
