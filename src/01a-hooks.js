// ---------------------------------------------------------------------------
// BFX_HOOKS — extension points so independent modules (fx, world dressing,
// sky, ui) can plug into the engine without editing each other's files.
//   trackLoaded(ctx)  ctx = { engine, index, track, trackWorld, stage, scene, quality }
//                     fired at the end of engine.loadTrack(); add meshes to ctx.stage
//   trackDispose(ctx) ctx = { engine, index }  fired before a stage is torn down
//   raceStart(ctx)    ctx = { race, engine, difficulty }  fired when a race begins
//   frame(ctx)        ctx = { engine, race, dt, player, scene, camera, time }
//                     fired every rendered frame AFTER karts/pickups are synced and
//                     BEFORE post-processing render. race may be null in menus.
//   raceEvent(ev, ctx) ev = { text, kind, racer? } for every sim event emitted this frame
//   resize(w,h)
// Register with BFX_HOOKS.on('frame', fn). Handlers must never throw; errors are swallowed.
// ---------------------------------------------------------------------------
var BFX_HOOKS = (function () {
  const map = { trackLoaded: [], trackDispose: [], raceStart: [], frame: [], raceEvent: [], resize: [], raceEnd: [] };
  const api = {
    on(name, fn) { (map[name] || (map[name] = [])).push(fn); return fn; },
    off(name, fn) { const a = map[name]; if (a) { const i = a.indexOf(fn); i >= 0 && a.splice(i, 1); } },
    fire(name, a, b) { const list = map[name]; if (!list) return; for (let i = 0; i < list.length; i++) { try { list[i](a, b); } catch (e) { if (!api._warned) { api._warned = 1; console.warn('BFX hook error', name, e); } } } },
    _warned: 0,
  };
  if (typeof window !== 'undefined') window.__BFX_HOOKS = api;
  return api;
})();
