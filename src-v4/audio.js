/* =============================================================================
 * BLUFOX OVERDRIVE — src/audio.js
 * -----------------------------------------------------------------------------
 * The soundtrack and the sound effects. Fully procedural WebAudio: no audio
 * files, no libraries, nothing fetched. Every waveform, drum, impulse response
 * and melody below is generated from note data written out by hand.
 *
 * Ported from the previous build's verified `audio-procedural.js` engine into a
 * single ES module. `createAudio()` returns one independent engine — call it
 * again for a second engine (that is how the offline render tests work).
 *
 *   import {createAudio} from './audio.js';
 *   const A = createAudio();
 *   // ... on the first user gesture, and only then:
 *   A.init();
 *   A.setMusic('menu');
 *
 * -----------------------------------------------------------------------------
 * PUBLIC API  (everything is safe to call before init(); it no-ops)
 * -----------------------------------------------------------------------------
 *  LIFECYCLE
 *   init(existingCtx?, opts?) -> bool     Create the AudioContext and the graph.
 *                                         MUST be called from a user gesture.
 *                                         opts: {maxNodes, maxEngines,
 *                                                lowPower, renderSeconds}
 *   unlock() -> bool                      init() + resume(); safe to call on
 *                                         every tap.
 *   suspend() / resume()                  Page hidden / visible.
 *   stopAll(fadeMs?)                      Music off, engines off, loops off.
 *   ready -> bool,  ctx -> AudioContext|null
 *
 *  MIXER
 *   master(v?) -> number                  0..1.5 overall
 *   musicVol(v?) -> number                0..1.5 music bus
 *   sfxVol(v?) -> number                  0..1.5 sfx + engine bus
 *   mute(b?) -> bool                      toggles when called with no argument
 *   duck(v, ms)                           dip the music under a big moment
 *
 *  MUSIC
 *   setMusic(id, opts?) -> bool           id may be:
 *                                           a circuit INDEX 0..5,
 *                                           a circuit NAME ('Chicago Afterglow'),
 *                                           a theme ('NEON CITY'),
 *                                           or a screen id:
 *                                           'menu' | 'results' | 'victory' | 'defeat'
 *                                         opts {fade, restart, intensity, finalLap}
 *   musicIntensity(v) -> number           0..1. Stems unlock as it rises. The
 *                                         change lands on the next BAR, ramped.
 *   raceIntensity(s) -> number            Computes AND applies intensity from
 *                                         {position, field, lap, laps, speed,
 *                                          topSpeed, boost, drift}. Use this.
 *   finalLap(on) -> bool                  Key up a semitone, tempo +6%, lead /
 *                                         counter / fx stems forced open, and a
 *                                         one-bar riser into the next downbeat.
 *   stopMusic(fadeMs?)
 *   musicId() -> string|null,  musicIds() -> string[]
 *
 *  SOUND EFFECTS
 *   sfx(name, opts?) -> bool              opts {vol, pitch, pan, delay, n,
 *                                              place, force, hard, dur}
 *   worldSfx(name, [x,y,z], opts?)        distance-attenuated + panned
 *   listener([x,y,z], [fx,fy,fz])         camera position / forward
 *   sfxNames() -> string[]                40 of them
 *
 *  GAME EVENTS  (the layer game.js actually drives)
 *   countdown(n)                          n = 3,2,1 ; n = 0 -> the GO! fanfare
 *   raceEvent(text, type)                 takes simulation.js's emit() pair
 *                                         verbatim: ('FINAL LAP!','lap') etc.
 *   item(kind)                            'box'|'get'|'boost'|'shield'|'pulse'|
 *                                         'deadzone'|'blocked'|'empty'
 *   hitBy(kind?)                          'pulse'|'trap'|'kart'
 *   lap(n, isFinal)                       lap chime, arms the final-lap lift
 *   finishRace(place)                     finish fanfare + crowd + place sting
 *   click(kind?)                          'move'|'select'|'back' menu UI
 *
 *  CONTINUOUS VOICES  (call once per frame; they ramp, they never click)
 *   engine(slot, {on, rpm, load, boost, vol, pan, kind})
 *                                         One voice per kart. Only the
 *                                         maxEngines LOUDEST slots stay alive;
 *                                         the rest are culled and can steal a
 *                                         slot back when they get closer.
 *   drift(level, charge)                  0..1 skid bed, 0..1 mini-turbo charge
 *   scrape(level, speed)                  0..1 barrier rub, speed in units/s
 *   stopEngines()
 *   update(speed, active, s?)             Drop-in for the old inline synth's
 *                                         `sound.update(speed, active)` call
 *                                         site. Drives the player's engine and,
 *                                         given s = {position, field, lap, laps,
 *                                         topSpeed, boost, drift, driftCharge,
 *                                         wallScrape, dt}, the intensity curve,
 *                                         the drift bed and the barrier scrape
 *                                         as well. Rivals still go through
 *                                         engine(slot, ...).
 *
 *  DIAGNOSTICS
 *   nodeCount() / peakNodes() / resetPeak()
 *   debug() -> {nodes, peak, voiceNodes, engineNodes, fixedNodes, maxNodes,
 *               maxEngines, voices, dropped, music, bar, bpm, intensity,
 *               finalLap, transpose, stems, state}
 *   budget(maxNodes, maxEngines)  lowPower() -> bool
 *   trackSong(id) -> string|null  resolve a circuit id without playing it
 *   intensity() -> number         the intensity currently in force
 *
 * -----------------------------------------------------------------------------
 * CIRCUIT -> TRACK MAPPING  (data.js TRACKS order)
 *   idx  circuit             theme            song key      bpm  kit    root
 *    0   Chicago Afterglow   NEON CITY        'afterglow'   112  retro  D3
 *    1   Xfinity Megastore   RETAIL REMIX     'megastore'   124  house  C3
 *    2   Lakefront Rush      COASTAL RUN      'lakeshore'   106  surf   E3
 *    3   Frostbyte Summit    ALPINE ICE       'frostbyte'   148  chip   D3
 *    4   Signal Canyon       DESERT HEAT      'canyon'      126  rock   E3
 *    5   Gigabit Galaxy      ORBITAL CIRCUIT  'gigabit'     140  trance A2
 *
 *   menu / home / garage / circuits / settings  -> 'menu'     112  boom  C3
 *   results / standings / defeat                -> 'results'   96  surf  Eb3
 *   victory / win / podium / champion           -> 'victory'  132  boom  C3
 *
 *   The three screen songs are `alwaysFull` — they ignore musicIntensity and
 *   play their whole arrangement, because a menu has no race to build with.
 *   On the final lap every song keys up one semitone and its tempo lifts 6%
 *   (measured on the rendered audio: +1.01 semitones, +6.0% on all six).
 *
 * -----------------------------------------------------------------------------
 * ARCHITECTURE
 *   masterComp (bus compressor) -> masterHP -> masterGain -> destination
 *     musicGain -> musicDuck -> masterComp
 *       stemGain[drums|bass|perc|pad|arp|lead|counter|fx] -> musicGain
 *     sfxGain -> masterComp
 *     engineGain -> masterComp
 *     revSend -> convolver(procedural IR) -> revReturn -> masterComp
 *     dlySend -> tempo-synced ping-pong delay -> masterComp
 *
 * MUSIC
 *   Every track is a hand-written score: a 16-bar chord progression (A section
 *   bars 0-7, B section bars 8-15, with a turnaround), a hand-written lead
 *   melody as note data, a written bass rhythm, a written arp figure and a
 *   written drum pattern grid. Nothing is randomised at runtime.
 *
 *   8 stems unlock as `musicIntensity` rises — classic Mario-style layering.
 *   Stem gains only ever change ON A BAR BOUNDARY, ramped over half a beat, so
 *   layers arrive musically instead of popping in.
 *
 * SCHEDULING
 *   Lookahead scheduler on setInterval(25ms), scheduling one beat at a time
 *   ~140ms ahead, locked to audioCtx.currentTime. Never driven from rAF.
 *   In an OfflineAudioContext the whole timeline is scheduled up front instead.
 *
 * NO CLICKS
 *   Every gain is ramped. Oscillators are always faded to silence before stop().
 *   exponentialRamp never targets 0 (floors at 1e-4, then setValueAtTime(0)).
 *
 * BUDGET
 *   `maxNodes` is the ceiling on ONE-SHOT VOICE nodes: 150 normally, 90 in
 *   low-power. Kart engine voices are counted separately and capped at
 *   `maxEngines` (4 / 2) of the 8 karts, so engines can never starve the
 *   score. Within the voice budget, drums / bass / lead / sfx are priority 0
 *   and survive to the ceiling; pad, arp, counter-melody and fx are priority 1
 *   and are dropped from 78% up. The music survives, the garnish goes.
 *
 *   Measured on a 60 Msin/s container (roughly 4-6x slower per core than a
 *   current iPhone):
 *     main thread   1.0% (per-frame API calls + scheduler), two ways measured
 *     audio thread  2.3% fixed graph / 26% full-intensity music /
 *                   13% four engines / 39% worst case all together
 *                   low-power: 20% music, 6.5% two engines
 *     peak live nodes  236 in a measured race, 244 under deliberate abuse
 *                      170 in low-power
 *
 *   init(ctx, {lowPower:true}) halves the engine voices, shortens the reverb
 *   tail, drops the perc / counter / fx stems and lowers the ceiling.
 * ============================================================================= */

export function createAudio() {
  'use strict';


  /* ===========================================================================
   * 0.  SMALL UTILITIES
   * ========================================================================= */

  var TWO_PI = Math.PI * 2;

  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function smoothstep(e0, e1, x) {
    var t = clamp((x - e0) / (e1 - e0 || 1e-6), 0, 1);
    return t * t * (3 - 2 * t);
  }
  function mtof(m) { return 440 * Math.pow(2, (m - 69) / 12); }

  // deterministic PRNG — used only for building static buffers (IR, noise),
  // never for note choices.
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* ===========================================================================
   * 1.  MUSIC THEORY TABLES
   * ========================================================================= */

  var QUAL = {
    maj:   [0, 4, 7],
    min:   [0, 3, 7],
    dim:   [0, 3, 6],
    aug:   [0, 4, 8],
    sus4:  [0, 5, 7],
    sus2:  [0, 2, 7],
    maj7:  [0, 4, 7, 11],
    min7:  [0, 3, 7, 10],
    dom7:  [0, 4, 7, 10],
    min6:  [0, 3, 7, 9],
    m7b5:  [0, 3, 6, 10],
    maj9:  [0, 4, 7, 11, 14],
    min9:  [0, 3, 7, 10, 14],
    dom9:  [0, 4, 7, 10, 14],
    add9:  [0, 4, 7, 14],
    minadd9: [0, 3, 7, 14]
  };

  // chord tones as absolute semitone offsets from the song root
  function chordTones(ch) {
    var q = QUAL[ch[1]] || QUAL.maj, out = new Array(q.length);
    for (var i = 0; i < q.length; i++) out[i] = ch[0] + q[i];
    return out;
  }

  // nearest chord tone strictly below `n` (used to build the counter-lead
  // harmony — real parallel 3rds/6ths, not a random pitch)
  function harmonizeBelow(n, tones) {
    var best = null, bestD = 1e9;
    for (var o = -36; o <= 36; o += 12) {
      for (var i = 0; i < tones.length; i++) {
        var c = tones[i] + o;
        if (c >= n - 1) continue;
        var d = n - c;
        if (d >= 3 && d < bestD) { bestD = d; best = c; }
      }
    }
    return best === null ? n - 12 : best;
  }

  /* ---------------------------------------------------------------------------
   * Clip helper. A clip is written as { barIndex: [[step16, dur16, offset, vel]] }
   * and compiled into bar -> beat -> events for cheap per-beat scheduling.
   * ------------------------------------------------------------------------- */
  function clip(obj, bars) {
    bars = bars || 16;
    var out = new Array(bars), b, i;
    for (b = 0; b < bars; b++) {
      out[b] = [[], [], [], []];
      var evs = obj[b];
      if (!evs) continue;
      for (i = 0; i < evs.length; i++) {
        var e = evs[i];
        var step = e[0] | 0;
        out[b][(step >> 2) & 3].push({ s: step, d: e[1], n: e[2], v: e.length > 3 ? e[3] : 1 });
      }
    }
    return out;
  }

  // Compile a repeating rhythm pattern (list of [step,dur,degree,vel]) into the
  // same bar/beat structure, repeated for every bar of the phrase.
  function rhythm(list, bars) {
    var o = {};
    for (var b = 0; b < (bars || 16); b++) o[b] = list;
    return clip(o, bars || 16);
  }

  // Drum grid: array of 16-char strings, indexed bar % len.
  // '.' rest  '-' ghost  'x' normal  'X' accent  'o' open/alt
  function grid(rows) { return rows; }
  function gridAt(rows, bar, step) {
    if (!rows || !rows.length) return '.';
    return rows[bar % rows.length].charAt(step) || '.';
  }
  var HITVEL = { '.': 0, '-': 0.38, 'x': 0.82, 'X': 1.0, 'o': 0.9, 'O': 1.0 };

  /* ===========================================================================
   * 2.  THE SCORES
   *
   *   Every melody below is hand-written note data. Pitches are semitone
   *   offsets from the song root, so `finalLap` transposition is a single add.
   *
   *   Reference for reading the offsets (minor keys): 0=root 2=2 3=m3 5=4 7=5
   *   8=m6 10=m7 12=octave.  (major keys): 0 2 4 5 7 9 11 12.
   * ========================================================================= */

  var SONGS = {};

  /* -------------------------------------------------------------------------
   * MENU — "OVERDRIVE (Main Theme)"   C minor, 112bpm, anthemic
   * Progression:  A | Cm  Ab  Eb  Bb | Cm  Ab  Fm  G  |
   *               B | Ab  Bb  Cm  Cm | Ab  Bb  Eb  G  |
   * ----------------------------------------------------------------------- */
  SONGS.menu = {
    name: 'OVERDRIVE',
    bpm: 112, root: 48, phrase: 16, swing: 0.0,
    alwaysFull: true,
    kit: 'boom',
    padVoice: 'warmsaw', leadVoice: 'brasslead', counterVoice: 'sqlead',
    bassVoice: 'subsaw', arpVoice: 'pluck',
    revMix: 0.30, dlyMix: 0.20, dlyDiv: 0.75,
    prog: [
      [0, 'min'], [8, 'maj'], [3, 'maj'], [10, 'maj'],
      [0, 'min'], [8, 'maj'], [5, 'min'], [7, 'maj'],
      [8, 'maj'], [10, 'maj'], [0, 'minadd9'], [0, 'min'],
      [8, 'maj'], [10, 'maj'], [3, 'maj'], [7, 'maj']
    ],
    drums: {
      kick: grid(['X..x..X...x.X...', 'X..x..X...x.X..x']),
      snare: grid(['....X.......X...', '....X.......X.xX']),
      hat: grid(['x-x-x-x-x-x-x-x-']),
      ohat: grid(['..o...o...o...o.']),
      perc: grid(['....-..x....-.x.']),
      ride: grid(['x.x.x.x.x.x.x.x.']),
      fillBars: [7, 15]
    },
    bass: rhythm([[0, 4, 0], [6, 2, 0], [8, 3, 0], [12, 2, 7], [14, 2, 12]]),
    arp: { steps: [0, 1, 2, 3, 2, 1], rate: 2, oct: 12, len: 2 },
    lead: clip({
      /* the hook: G C  Eb D C | F G Ab~ */
      0:  [[0, 3, 19], [3, 1, 24], [4, 4, 24], [8, 2, 22], [10, 2, 19], [12, 4, 15]],
      1:  [[0, 2, 17], [2, 2, 19], [4, 8, 20], [12, 4, 19]],
      2:  [[0, 2, 15], [2, 2, 19], [4, 4, 22], [8, 2, 24], [10, 2, 22], [12, 4, 19]],
      3:  [[0, 2, 17], [2, 2, 22], [4, 4, 26], [8, 2, 24], [10, 2, 22], [12, 4, 17]],
      4:  [[0, 3, 19], [3, 1, 24], [4, 4, 24], [8, 2, 22], [10, 2, 19], [12, 4, 15]],
      5:  [[0, 2, 17], [2, 2, 19], [4, 8, 20], [12, 4, 22]],
      6:  [[0, 2, 20], [2, 2, 24], [4, 8, 29], [12, 4, 27]],
      7:  [[0, 2, 26], [2, 2, 27], [4, 4, 26], [8, 2, 22], [10, 2, 19], [12, 4, 23]],
      /* B — up an octave, wide and sustained */
      8:  [[0, 6, 24], [6, 2, 27], [8, 8, 29]],
      9:  [[0, 4, 26], [4, 4, 29], [8, 8, 26]],
      10: [[0, 4, 27], [4, 8, 31], [12, 4, 29]],
      11: [[0, 8, 27], [8, 8, 24]],
      12: [[0, 4, 24], [4, 4, 27], [8, 4, 29], [12, 4, 31]],
      13: [[0, 8, 29], [8, 4, 26], [12, 4, 29]],
      14: [[0, 8, 31], [8, 4, 27], [12, 4, 26]],
      15: [[0, 4, 26], [4, 4, 24], [8, 4, 23], [12, 4, 26]]
    })
  };

  /* -------------------------------------------------------------------------
   * AFTERGLOW — "Chicago Afterglow"   D minor, 112bpm, synthwave / outrun
   * Progression:  A | Dm  Bb  F   C  | Dm  Bb  Gm  A  |
   *               B | Bb  F   C   Dm | Bb  F   Gm  A  |
   * ----------------------------------------------------------------------- */
  SONGS.afterglow = {
    name: 'CHICAGO AFTERGLOW',
    bpm: 112, root: 50, phrase: 16, swing: 0.0,
    kit: 'retro',
    padVoice: 'warmsaw', leadVoice: 'sawlead', counterVoice: 'fmbell',
    bassVoice: 'subsaw', arpVoice: 'pulse',
    revMix: 0.38, dlyMix: 0.34, dlyDiv: 0.75,
    prog: [
      [0, 'min'], [8, 'maj'], [3, 'maj'], [10, 'maj'],
      [0, 'min'], [8, 'maj'], [5, 'min'], [7, 'maj'],
      [8, 'maj7'], [3, 'maj'], [10, 'maj'], [0, 'minadd9'],
      [8, 'maj'], [3, 'maj'], [5, 'min7'], [7, 'maj']
    ],
    drums: {
      kick: grid(['X.......X.......', 'X.......X.....x.']),
      snare: grid(['....X.......X...']),
      hat: grid(['..x...x...x...x-']),
      ohat: grid(['......o.......o.']),
      perc: grid(['...-....-...-...']),
      ride: grid(['x.x.x.x.x.x.x.x.']),
      fillBars: [7, 15]
    },
    bass: rhythm([[0, 2, 0], [2, 2, 0], [4, 2, 0], [6, 2, 0], [8, 2, 0], [10, 2, 0], [12, 2, 0], [14, 2, 12]]),
    arp: { steps: [0, 1, 2, 3, 4, 3, 2, 1], rate: 1, oct: 12, len: 1 },
    lead: clip({
      0:  [[0, 6, 19], [6, 10, 24]],
      1:  [[0, 4, 22], [4, 4, 24], [8, 8, 27]],
      2:  [[0, 4, 26], [4, 4, 24], [8, 8, 22]],
      3:  [[0, 8, 19], [8, 4, 22], [12, 4, 24]],
      4:  [[0, 6, 19], [6, 6, 24], [12, 4, 27]],
      5:  [[0, 8, 29], [8, 8, 27]],
      6:  [[0, 4, 24], [4, 4, 27], [8, 8, 29]],
      7:  [[0, 6, 26], [6, 6, 23], [12, 4, 26]],
      8:  [[0, 4, 27], [4, 4, 29], [8, 8, 31]],
      9:  [[0, 4, 31], [4, 4, 29], [8, 4, 27], [12, 4, 26]],
      10: [[0, 8, 29], [8, 8, 26]],
      11: [[0, 6, 27], [6, 10, 24]],
      12: [[0, 4, 24], [4, 4, 27], [8, 8, 32]],
      13: [[0, 8, 31], [8, 8, 27]],
      14: [[0, 4, 29], [4, 4, 32], [8, 8, 31]],
      15: [[0, 4, 26], [4, 4, 27], [8, 4, 26], [12, 4, 23]]
    })
  };

  /* -------------------------------------------------------------------------
   * MEGASTORE — "Xfinity Megastore"   C major / A minor, 124bpm, funky house
   * Progression:  A | Am7 Dm7 G7  Cmaj7 | Am7 Dm7 Fmaj7 G7 |
   *               B | Fmaj7 G7 Em7 Am7  | Dm7 G7 Cmaj7 Cmaj7 |
   * ----------------------------------------------------------------------- */
  SONGS.megastore = {
    name: 'XFINITY MEGASTORE',
    bpm: 124, root: 48, phrase: 16, swing: 0.055,
    kit: 'house',
    padVoice: 'organ', leadVoice: 'clav', counterVoice: 'organ',
    bassVoice: 'funkbass', arpVoice: 'pluck',
    revMix: 0.22, dlyMix: 0.22, dlyDiv: 0.75,
    prog: [
      [9, 'min7'], [2, 'min7'], [7, 'dom9'], [0, 'maj7'],
      [9, 'min7'], [2, 'min7'], [5, 'maj7'], [7, 'dom7'],
      [5, 'maj7'], [7, 'dom7'], [4, 'min7'], [9, 'min7'],
      [2, 'min7'], [7, 'dom9'], [0, 'maj9'], [0, 'maj7']
    ],
    drums: {
      kick: grid(['X...X...X...X...', 'X...X...X...X..x']),
      snare: grid(['....X.......X...']),
      hat: grid(['x-x-x-x-x-x-x-x-']),
      ohat: grid(['..o...o...o...o.']),
      perc: grid(['..-.x..-..x.-..x', '..-.x..-..x.-.xx']),
      ride: grid(['x.x-x.x-x.x-x.x-']),
      fillBars: [7, 15]
    },
    bass: rhythm([[0, 2, 0], [3, 1, 0], [6, 2, 12], [8, 2, 0], [11, 1, 7], [12, 2, 12], [14, 2, 10]]),
    arp: { steps: [0, 2, 1, 3, 2, 0], rate: 1, oct: 12, len: 2 },
    lead: clip({
      0:  [[0, 2, 16], [3, 1, 19], [4, 3, 21], [8, 2, 24], [11, 1, 21], [12, 4, 19]],
      1:  [[0, 2, 17], [3, 1, 21], [4, 4, 26], [8, 2, 24], [10, 2, 21], [12, 4, 17]],
      2:  [[0, 2, 23], [2, 2, 26], [4, 4, 29], [8, 2, 26], [10, 2, 23], [12, 4, 19]],
      3:  [[0, 2, 24], [2, 2, 28], [4, 6, 31], [10, 2, 28], [12, 4, 24]],
      4:  [[0, 2, 16], [3, 1, 19], [4, 3, 21], [8, 2, 24], [11, 1, 21], [12, 4, 19]],
      5:  [[0, 2, 17], [3, 1, 21], [4, 4, 26], [8, 2, 24], [10, 2, 21], [12, 4, 17]],
      6:  [[0, 2, 21], [2, 2, 24], [4, 4, 28], [8, 4, 24], [12, 4, 21]],
      7:  [[0, 2, 26], [2, 2, 29], [4, 2, 26], [6, 2, 23], [8, 8, 19]],
      8:  [[0, 4, 24], [4, 2, 21], [6, 2, 24], [8, 8, 29]],
      9:  [[0, 4, 28], [4, 4, 26], [8, 8, 23]],
      10: [[0, 2, 19], [2, 2, 23], [4, 8, 28], [12, 4, 26]],
      11: [[0, 4, 24], [4, 4, 21], [8, 8, 28]],
      12: [[0, 4, 29], [4, 2, 28], [6, 2, 26], [8, 8, 21]],
      13: [[0, 2, 23], [2, 2, 26], [4, 4, 29], [8, 8, 31]],
      14: [[0, 4, 28], [4, 4, 31], [8, 8, 36]],
      15: [[0, 2, 23], [2, 2, 24], [4, 2, 26], [6, 2, 28], [8, 8, 19]]
    })
  };

  /* -------------------------------------------------------------------------
   * LAKESHORE — "Lakefront Rush"   E major, 106bpm, surf-funk
   * Progression:  A | E  C#m7 Amaj7 B7 | E  C#m7 F#m7 B7 |
   *               B | Amaj7 B7 C#m7 A  | F#m7 B7 E  E    |
   * ----------------------------------------------------------------------- */
  SONGS.lakeshore = {
    name: 'LAKEFRONT RUSH',
    bpm: 106, root: 52, phrase: 16, swing: 0.10,
    kit: 'surf',
    padVoice: 'organ', leadVoice: 'surfgtr', counterVoice: 'pluck',
    bassVoice: 'funkbass', arpVoice: 'pluck',
    revMix: 0.42, dlyMix: 0.18, dlyDiv: 0.5,
    prog: [
      [0, 'maj'], [9, 'min7'], [5, 'maj7'], [7, 'dom7'],
      [0, 'add9'], [9, 'min7'], [2, 'min7'], [7, 'dom7'],
      [5, 'maj7'], [7, 'dom7'], [9, 'min7'], [5, 'maj7'],
      [2, 'min7'], [7, 'dom7'], [0, 'maj'], [0, 'add9']
    ],
    drums: {
      kick: grid(['X.....x.X.......', 'X.....x.X...x...']),
      snare: grid(['....X.......X...', '....X.....x.X...']),
      hat: grid(['x-x-x-x-x-x-x-x-']),
      ohat: grid(['......o.......o.']),
      perc: grid(['-x-x-x-x-x-x-x-x']),
      ride: grid(['x..x..x.x..x..x.']),
      fillBars: [7, 15]
    },
    bass: rhythm([[0, 4, 0], [4, 3, 7], [8, 3, 12], [11, 1, 10], [12, 4, 7]]),
    arp: { steps: [0, 1, 2, 1], rate: 2, oct: 12, len: 2 },
    lead: clip({
      0:  [[0, 2, 19], [2, 2, 24], [4, 4, 28], [8, 2, 26], [10, 2, 24], [12, 4, 19]],
      1:  [[0, 2, 21], [2, 2, 24], [4, 4, 28], [8, 4, 24], [12, 4, 21]],
      2:  [[0, 2, 17], [2, 2, 21], [4, 6, 24], [10, 2, 21], [12, 4, 17]],
      3:  [[0, 2, 19], [2, 2, 23], [4, 4, 26], [8, 2, 23], [10, 2, 19], [12, 4, 26]],
      4:  [[0, 2, 19], [2, 2, 24], [4, 4, 28], [8, 2, 26], [10, 2, 24], [12, 4, 19]],
      5:  [[0, 2, 21], [2, 2, 24], [4, 4, 28], [8, 4, 24], [12, 4, 21]],
      6:  [[0, 4, 26], [4, 2, 24], [6, 2, 21], [8, 8, 17]],
      7:  [[0, 2, 19], [2, 2, 21], [4, 2, 23], [6, 2, 26], [8, 8, 31]],
      8:  [[0, 4, 24], [4, 4, 26], [8, 8, 29]],
      9:  [[0, 4, 28], [4, 4, 26], [8, 8, 23]],
      10: [[0, 2, 24], [2, 2, 28], [4, 8, 33], [12, 4, 31]],
      11: [[0, 8, 29], [8, 4, 28], [12, 4, 26]],
      12: [[0, 4, 24], [4, 4, 21], [8, 8, 26]],
      13: [[0, 2, 26], [2, 2, 29], [4, 4, 28], [8, 8, 26]],
      14: [[0, 4, 24], [4, 4, 28], [8, 8, 31]],
      15: [[0, 2, 19], [2, 2, 24], [4, 2, 26], [6, 2, 28], [8, 8, 24]]
    })
  };

  /* -------------------------------------------------------------------------
   * FROSTBYTE — "Frostbyte Summit"   D minor, 148bpm, icy chiptune-orchestral
   * Progression:  A | Dm Am Bb F | Gm Dm A A |
   *               B | Bb F Gm A  | Bb C  Dm A |
   * ----------------------------------------------------------------------- */
  SONGS.frostbyte = {
    name: 'FROSTBYTE SUMMIT',
    bpm: 148, root: 50, phrase: 16, swing: 0.0,
    kit: 'chip',
    padVoice: 'strings', leadVoice: 'pulse', counterVoice: 'glass',
    bassVoice: 'subsaw', arpVoice: 'glass',
    revMix: 0.46, dlyMix: 0.24, dlyDiv: 0.75,
    prog: [
      [0, 'min'], [7, 'min'], [8, 'maj'], [3, 'maj'],
      [5, 'min'], [0, 'min'], [7, 'maj'], [7, 'maj'],
      [8, 'maj7'], [3, 'maj'], [5, 'min'], [7, 'maj'],
      [8, 'maj'], [10, 'maj'], [0, 'minadd9'], [7, 'maj']
    ],
    drums: {
      kick: grid(['X..x....X..x....', 'X..x....X..x..x.']),
      snare: grid(['....X.......X...', '....X.......X.xx']),
      hat: grid(['x.x.x.x.x.x.x.x.']),
      ohat: grid(['....o.......o...']),
      perc: grid(['x.......x.......']),
      ride: grid(['x-x-x-x-x-x-x-x-']),
      fillBars: [7, 15]
    },
    bass: rhythm([[0, 2, 0], [4, 2, 12], [6, 2, 0], [8, 2, 0], [12, 2, 7], [14, 2, 12]]),
    arp: { steps: [0, 1, 2, 3, 4, 2], rate: 1, oct: 24, len: 2 },
    lead: clip({
      0:  [[0, 2, 24], [2, 2, 27], [4, 4, 31], [8, 2, 29], [10, 2, 27], [12, 4, 26]],
      1:  [[0, 2, 26], [2, 2, 31], [4, 4, 34], [8, 2, 31], [10, 2, 29], [12, 4, 26]],
      2:  [[0, 2, 27], [2, 2, 32], [4, 4, 36], [8, 2, 34], [10, 2, 32], [12, 4, 31]],
      3:  [[0, 4, 31], [4, 2, 29], [6, 2, 27], [8, 4, 26], [12, 4, 24]],
      4:  [[0, 2, 29], [2, 2, 32], [4, 4, 36], [8, 4, 34], [12, 4, 32]],
      5:  [[0, 2, 31], [2, 2, 27], [4, 4, 24], [8, 2, 27], [10, 2, 31], [12, 4, 36]],
      6:  [[0, 4, 35], [4, 4, 31], [8, 4, 26], [12, 4, 23]],
      7:  [[0, 4, 26], [4, 4, 35], [8, 8, 31]],
      8:  [[0, 8, 36], [8, 8, 34]],
      9:  [[0, 8, 31], [8, 8, 34]],
      10: [[0, 8, 32], [8, 4, 31], [12, 4, 29]],
      11: [[0, 8, 35], [8, 8, 38]],
      12: [[0, 4, 36], [4, 4, 39], [8, 8, 36]],
      13: [[0, 4, 38], [4, 4, 34], [8, 8, 29]],
      14: [[0, 2, 27], [2, 2, 31], [4, 8, 36], [12, 4, 34]],
      15: [[0, 4, 32], [4, 4, 31], [8, 4, 26], [12, 4, 35]]
    })
  };

  /* -------------------------------------------------------------------------
   * GIGABIT — "Gigabit Galaxy"   A minor, 140bpm, arpeggiated trance
   * Progression:  A | Am F C G | Am F Dm E |
   *               B | F  G Am Am | F C Dm7 E |
   * ----------------------------------------------------------------------- */
  SONGS.gigabit = {
    name: 'GIGABIT GALAXY',
    bpm: 140, root: 45, phrase: 16, swing: 0.0,
    kit: 'trance',
    padVoice: 'warmsaw', leadVoice: 'supersaw', counterVoice: 'pluck',
    bassVoice: 'rollbass', arpVoice: 'trancepluck',
    revMix: 0.42, dlyMix: 0.30, dlyDiv: 0.75,
    prog: [
      [0, 'min'], [8, 'maj'], [3, 'maj'], [10, 'maj'],
      [0, 'min'], [8, 'maj'], [5, 'min'], [7, 'maj'],
      [8, 'maj7'], [10, 'maj'], [0, 'minadd9'], [0, 'min'],
      [8, 'maj'], [3, 'maj'], [5, 'min7'], [7, 'maj']
    ],
    drums: {
      kick: grid(['X...X...X...X...']),
      snare: grid(['....X.......X...']),
      hat: grid(['..o...o...o...o.']),
      ohat: grid(['..o...o...o...o.']),
      perc: grid(['-.-.-.-.-.-.-.x.']),
      ride: grid(['x.x.x.x.x.x.x.x.']),
      fillBars: [7, 15]
    },
    bass: rhythm([[2, 2, 0], [4, 2, 0], [6, 2, 0], [8, 2, 0], [10, 2, 0], [12, 2, 0], [14, 2, 0]]),
    arp: { steps: [0, 1, 2, 3, 4, 3, 2, 1], rate: 1, oct: 12, len: 1 },
    lead: clip({
      0:  [[0, 4, 24], [4, 4, 27], [8, 8, 31]],
      1:  [[0, 8, 32], [8, 8, 31]],
      2:  [[0, 4, 31], [4, 4, 34], [8, 8, 39]],
      3:  [[0, 8, 38], [8, 8, 34]],
      4:  [[0, 8, 36], [8, 4, 31], [12, 4, 27]],
      5:  [[0, 4, 32], [4, 4, 36], [8, 8, 39]],
      6:  [[0, 8, 41], [8, 4, 39], [12, 4, 36]],
      7:  [[0, 8, 38], [8, 8, 35]],
      8:  [[0, 8, 39], [8, 8, 36]],
      9:  [[0, 8, 38], [8, 8, 41]],
      10: [[0, 8, 43], [8, 8, 39]],
      11: [[0, 16, 36]],
      12: [[0, 4, 32], [4, 4, 36], [8, 4, 39], [12, 4, 44]],
      13: [[0, 8, 43], [8, 8, 34]],
      14: [[0, 4, 41], [4, 4, 44], [8, 8, 43]],
      15: [[0, 4, 35], [4, 4, 38], [8, 8, 43]]
    })
  };

  /* -------------------------------------------------------------------------
   * CANYON — "Signal Canyon"   E phrygian dominant, 126bpm, desert rock/electro
   * Andalusian cadence with a Spanish-tinged lead.
   * Progression:  A | Am G F E | Am G F E |
   *               B | F  E Dm E | F  G Am E |
   * Scale: E F G# A B C D  (offsets 0 1 4 5 7 8 10)
   * ----------------------------------------------------------------------- */
  SONGS.canyon = {
    name: 'SIGNAL CANYON',
    bpm: 126, root: 52, phrase: 16, swing: 0.0,
    kit: 'rock',
    padVoice: 'warmsaw', leadVoice: 'nylon', counterVoice: 'dirtysaw',
    bassVoice: 'rockbass', arpVoice: 'pluck',
    revMix: 0.34, dlyMix: 0.26, dlyDiv: 0.375,
    prog: [
      [5, 'min'], [3, 'maj'], [1, 'maj'], [0, 'maj'],
      [5, 'min'], [3, 'maj'], [1, 'maj'], [0, 'maj'],
      [1, 'maj'], [0, 'maj'], [10, 'min'], [0, 'maj'],
      [1, 'maj'], [3, 'maj'], [5, 'min'], [0, 'maj']
    ],
    drums: {
      kick: grid(['X..x..X...x.X...', 'X..x..X...x.X.x.']),
      snare: grid(['....X.......X...', '....X.....x.X...']),
      hat: grid(['x-x-x-x-x-x-x-x-']),
      ohat: grid(['......o.......o.']),
      perc: grid(['x...x.x.x...x.x.']),
      ride: grid(['x.x.x.x.x.x.x.x.']),
      fillBars: [7, 15]
    },
    bass: rhythm([[0, 3, 0], [4, 2, 0], [7, 1, 7], [8, 3, 0], [12, 2, 12], [14, 2, 10]]),
    arp: { steps: [0, 1, 2, 1], rate: 1, oct: 12, len: 1 },
    lead: clip({
      0:  [[0, 2, 17], [2, 2, 20], [4, 4, 24], [8, 2, 22], [10, 2, 20], [12, 4, 19]],
      1:  [[0, 2, 19], [2, 2, 22], [4, 4, 27], [8, 2, 22], [10, 2, 19], [12, 4, 15]],
      2:  [[0, 2, 17], [2, 2, 20], [4, 4, 25], [8, 2, 24], [10, 2, 20], [12, 4, 17]],
      3:  [[0, 2, 16], [2, 2, 19], [4, 4, 24], [8, 2, 22], [10, 2, 20], [12, 2, 19], [14, 2, 16]],
      4:  [[0, 2, 24], [2, 2, 25], [4, 2, 24], [6, 2, 22], [8, 4, 20], [12, 4, 17]],
      5:  [[0, 2, 22], [2, 2, 27], [4, 4, 31], [8, 2, 29], [10, 2, 27], [12, 4, 22]],
      6:  [[0, 4, 32], [4, 2, 29], [6, 2, 25], [8, 4, 29], [12, 4, 32]],
      7:  [[0, 2, 31], [2, 2, 29], [4, 2, 28], [6, 2, 25], [8, 8, 24]],
      8:  [[0, 4, 25], [4, 4, 24], [8, 8, 20]],
      9:  [[0, 2, 24], [2, 2, 25], [4, 4, 28], [8, 8, 31]],
      10: [[0, 4, 29], [4, 4, 25], [8, 8, 22]],
      11: [[0, 4, 28], [4, 2, 25], [6, 2, 24], [8, 8, 19]],
      12: [[0, 2, 29], [2, 2, 32], [4, 2, 29], [6, 2, 25], [8, 8, 24]],
      13: [[0, 2, 22], [2, 2, 27], [4, 4, 31], [8, 8, 27]],
      14: [[0, 2, 29], [2, 2, 31], [4, 4, 32], [8, 2, 31], [10, 2, 29], [12, 4, 28]],
      15: [[0, 2, 24], [2, 2, 25], [4, 2, 28], [6, 2, 29], [8, 4, 31], [12, 4, 24]]
    })
  };

  /* -------------------------------------------------------------------------
   * RESULTS — reflective post-race groove.  Eb major, 96bpm, 8-bar phrase.
   * ----------------------------------------------------------------------- */
  SONGS.results = {
    name: 'RESULTS',
    bpm: 96, root: 51, phrase: 8, swing: 0.12,
    alwaysFull: true,
    kit: 'surf',
    padVoice: 'organ', leadVoice: 'rhodes', counterVoice: 'pluck',
    bassVoice: 'funkbass', arpVoice: 'pluck',
    revMix: 0.40, dlyMix: 0.20, dlyDiv: 0.75,
    prog: [
      [0, 'maj7'], [9, 'min7'], [2, 'min7'], [7, 'dom7'],
      [0, 'maj9'], [9, 'min7'], [5, 'maj7'], [7, 'dom9']
    ],
    drums: {
      kick: grid(['X.......x...X...']),
      snare: grid(['....X.......X...']),
      hat: grid(['x-x-x-x-x-x-x-x-']),
      ohat: grid(['......o.......o.']),
      perc: grid(['-x-x-x-x-x-x-x-x']),
      ride: grid(['x..x..x.x..x..x.']),
      fillBars: [7]
    },
    bass: rhythm([[0, 4, 0], [6, 2, 7], [8, 4, 0], [14, 2, 12]], 8),
    arp: { steps: [0, 1, 2, 3], rate: 2, oct: 12, len: 2 },
    lead: clip({
      0: [[0, 4, 19], [4, 4, 16], [8, 8, 24]],
      1: [[0, 4, 23], [4, 4, 21], [8, 8, 16]],
      2: [[0, 4, 17], [4, 4, 21], [8, 8, 26]],
      3: [[0, 4, 24], [4, 4, 23], [8, 8, 19]],
      4: [[0, 4, 19], [4, 4, 24], [8, 8, 28]],
      5: [[0, 4, 26], [4, 4, 24], [8, 8, 21]],
      6: [[0, 4, 21], [4, 4, 24], [8, 8, 29]],
      7: [[0, 4, 28], [4, 4, 26], [8, 8, 24]]
    }, 8)
  };

  /* -------------------------------------------------------------------------
   * VICTORY — short fanfare + triumphant vamp.  C major, 132bpm, 8-bar phrase.
   * ----------------------------------------------------------------------- */
  SONGS.victory = {
    name: 'VICTORY',
    bpm: 132, root: 48, phrase: 8, swing: 0.0,
    alwaysFull: true,
    kit: 'boom',
    padVoice: 'strings', leadVoice: 'brasslead', counterVoice: 'brasslead',
    bassVoice: 'subsaw', arpVoice: 'glass',
    revMix: 0.40, dlyMix: 0.14, dlyDiv: 0.5,
    prog: [
      [0, 'maj'], [0, 'maj'], [5, 'maj'], [7, 'maj'],
      [0, 'maj'], [9, 'min'], [5, 'maj'], [7, 'dom7']
    ],
    drums: {
      kick: grid(['X..x..X...x.X...', 'X..x..X...x.X..x']),
      snare: grid(['..x.X..x..x.X.xX', '..x.X..x..x.XxxX']),
      hat: grid(['x-x-x-x-x-x-x-x-']),
      ohat: grid(['..o...o...o...o.']),
      perc: grid(['x.......x.......']),
      ride: grid(['x.x.x.x.x.x.x.x.']),
      fillBars: [3, 7]
    },
    bass: rhythm([[0, 4, 0], [4, 2, 0], [8, 4, 0], [12, 2, 7], [14, 2, 12]], 8),
    arp: { steps: [0, 1, 2, 3, 4], rate: 1, oct: 12, len: 1 },
    lead: clip({
      0: [[0, 2, 19], [2, 2, 19], [4, 2, 19], [6, 6, 24], [12, 4, 28]],
      1: [[0, 8, 31], [8, 4, 28], [12, 4, 24]],
      2: [[0, 2, 21], [2, 2, 24], [4, 8, 29], [12, 4, 28]],
      3: [[0, 4, 26], [4, 4, 31], [8, 4, 23], [12, 4, 26]],
      4: [[0, 8, 24], [8, 4, 28], [12, 4, 31]],
      5: [[0, 8, 33], [8, 8, 28]],
      6: [[0, 4, 29], [4, 4, 33], [8, 8, 36]],
      7: [[0, 4, 35], [4, 4, 38], [8, 8, 31]]
    }, 8)
  };

  // `fiberrun` is an alias kept alive because a content field still points there.
  var MUSIC_ALIASES = { fiberrun: 'canyon', fiber: 'canyon', main: 'menu', title: 'menu' };

  /* -------------------------------------------------------------------------
   * Drum kit voicings. One parameter block per kit; the drum synths below are
   * driven entirely from these.
   * ----------------------------------------------------------------------- */
  var KITS = {
    house:  { kick: { f0: 165, f1: 46, pd: 0.030, dur: 0.40, drv: 2.2, clk: 0.45, g: 1.05 },
              snare: { mode: 'clap', tone: 0, noise: 1.0, dur: 0.24, bp: 1500, q: 1.1, g: 0.75 },
              hat: { dur: 0.042, odur: 0.30, hp: 8000, g: 0.56 },
              perc: { type: 'rim', g: 0.4 }, ride: { g: 0.22 } },
    retro:  { kick: { f0: 190, f1: 42, pd: 0.045, dur: 0.56, drv: 1.6, clk: 0.3, g: 1.1 },
              snare: { mode: 'gated', tone: 190, noise: 1.0, dur: 0.46, bp: 1150, q: 0.85, g: 0.86 },
              hat: { dur: 0.048, odur: 0.24, hp: 7000, g: 0.42 },
              perc: { type: 'tom', g: 0.4 }, ride: { g: 0.20 } },
    trance: { kick: { f0: 180, f1: 44, pd: 0.032, dur: 0.44, drv: 2.6, clk: 0.4, g: 1.1 },
              snare: { mode: 'clap', tone: 0, noise: 1.0, dur: 0.20, bp: 1800, q: 1.3, g: 0.68 },
              hat: { dur: 0.044, odur: 0.32, hp: 8400, g: 0.52 },
              perc: { type: 'shaker', g: 0.32 }, ride: { g: 0.24 } },
    rock:   { kick: { f0: 145, f1: 52, pd: 0.038, dur: 0.34, drv: 1.9, clk: 0.6, g: 1.0 },
              snare: { mode: 'acoustic', tone: 205, noise: 1.0, dur: 0.20, bp: 1750, q: 0.9, g: 0.9 },
              hat: { dur: 0.040, odur: 0.22, hp: 6600, g: 0.46 },
              perc: { type: 'tom', g: 0.46 }, ride: { g: 0.26 } },
    chip:   { kick: { f0: 210, f1: 55, pd: 0.022, dur: 0.24, drv: 1.4, clk: 0.7, g: 0.95 },
              snare: { mode: 'chip', tone: 240, noise: 1.0, dur: 0.14, bp: 2600, q: 0.7, g: 0.8 },
              hat: { dur: 0.030, odur: 0.16, hp: 9000, g: 0.42 },
              perc: { type: 'timp', g: 0.5 }, ride: { g: 0.20 } },
    surf:   { kick: { f0: 140, f1: 50, pd: 0.042, dur: 0.30, drv: 1.3, clk: 0.4, g: 0.92 },
              snare: { mode: 'acoustic', tone: 195, noise: 1.0, dur: 0.26, bp: 1500, q: 0.8, g: 0.8 },
              hat: { dur: 0.038, odur: 0.22, hp: 6400, g: 0.44 },
              perc: { type: 'shaker', g: 0.34 }, ride: { g: 0.28 } },
    boom:   { kick: { f0: 175, f1: 44, pd: 0.042, dur: 0.52, drv: 2.0, clk: 0.5, g: 1.15 },
              snare: { mode: 'acoustic', tone: 200, noise: 1.0, dur: 0.30, bp: 1500, q: 0.8, g: 0.95 },
              hat: { dur: 0.044, odur: 0.26, hp: 7400, g: 0.46 },
              perc: { type: 'tom', g: 0.5 }, ride: { g: 0.24 } }
  };

  /* -------------------------------------------------------------------------
   * Stem definition: unlock thresholds. Layers arrive as intensity rises.
   * ----------------------------------------------------------------------- */
  var STEMS = [
    // `min` below zero means the stem is already partly open at intensity 0 —
    // the drums are the floor of the mix and must never drop out mid-race.
    { id: 'drums',   min: -0.12, band: 0.16, gain: 0.62 },
    { id: 'bass',    min:  0.02, band: 0.14, gain: 0.56 },
    { id: 'perc',    min:  0.18, band: 0.14, gain: 0.52 },
    { id: 'pad',     min:  0.32, band: 0.14, gain: 0.48 },
    { id: 'arp',     min:  0.45, band: 0.13, gain: 0.60 },
    { id: 'lead',    min:  0.60, band: 0.13, gain: 0.82 },
    { id: 'counter', min:  0.75, band: 0.13, gain: 0.50 },
    { id: 'fx',      min:  0.87, band: 0.11, gain: 0.34 }
  ];

  /* ===========================================================================
   * 3.  ENGINE STATE
   * ========================================================================= */

  var ctx = null;
  var offline = false;          // true when running inside an OfflineAudioContext
  var offlineHorizon = 0;       // seconds of timeline to pre-schedule
  var ready = false;
  var initFailed = false;

  // node graph
  var masterGain, masterComp, masterHP, masterLim, musicGain, musicDuck, sfxGain, engineGain;
  var musicTilt, musicPres, musicAir;   // phone-speaker voicing on the music bus
  var engTilt, engAir;                  // same treatment for the engine bus
  var revConv, revSend, revReturn, revPre, revPost;
  var dlyL, dlyR, dlyFbL, dlyFbR, dlyFilt, dlyPanL, dlyPanR, dlyReturn, dlySend;
  var stemGain = {};            // id -> GainNode
  var waves = {};               // PeriodicWave cache
  var noiseBuf = null, pinkBuf = null, metalBuf = null;
  var ksCache = {};             // Karplus-Strong buffers by "midi|bright|decay"
  var percCache = {};           // pre-rendered percussion one-shots
  var driveCurves = {};
  // Shared send buses. Voices pick a bucket instead of allocating their own
  // send gain — this is the single biggest node saving in the whole engine.
  var revBus = null, dlyBus = null;   // arrays of 3 GainNodes (low/mid/high)
  var vibBus = null;                  // 3 shared vibrato LFO depth taps
  var fltBus = null;                  // 2 shared filter-cutoff LFO depth taps

  // mixer state
  var vol = { master: 0.76, music: 0.72, sfx: 0.9, muted: false };

  /* Low-power voicing for a weak phone. The music survives; the garnish
     goes: shorter reverb tail, a lower ceiling, two engine voices instead
     of four, and the top two decorative stems held shut. */
  var lowPower = false;

  // live node accounting
  var liveNodes = 0, peakNodes = 0, fixedNodes = 0, voicesStarted = 0, voicesDropped = 0;
  // Kart engines are a separate, already-bounded cost (maxEngines voices of
  // 15 nodes). They are excluded from the voice budget below, because
  // counting them against it meant four engines could starve the arp, pad
  // and counter-melody out of the mix — 10% of music voices were being
  // dropped in a measured race. The music is the thing that survives.
  var engineNodes = 0;
  var MAX_LIVE = 150;           // one-shot VOICE ceiling (engines excluded)
  var MAX_ENGINES = 4;          // only the 4 nearest karts get a live voice

  // listener for world sfx
  var lisPos = [0, 0, 0], lisFwd = [0, 0, 1], lisRight = [1, 0, 0];

  // music transport
  var M = {
    playing: false, id: null, song: null,
    bpm: 120, spb: 0.5, beat: 0, nextBeatTime: 0,
    intensity: 0.0, targetIntensity: 0.0,
    finalLap: false, pendingFinalLap: null,
    transpose: 0, targetTranspose: 0,
    stemLevel: {}, riserArmed: false, startTime: 0
  };
  var schedTimer = null;
  var LOOKAHEAD = 0.14;         // seconds scheduled ahead of currentTime
  var TICK_MS = 25;

  // engines
  var engines = {};             // slot -> voice object

  /* ===========================================================================
   * 4.  NODE BOOKKEEPING
   * ========================================================================= */

  function bump(n) {
    liveNodes += n;
    if (liveNodes > peakNodes) peakNodes = liveNodes;
  }
  function unbump(n) { liveNodes -= n; if (liveNodes < 0) liveNodes = 0; }

  // Register a one-shot voice: `src` is the node whose onended fires (osc or
  // buffer source), `n` is how many nodes the voice owns.
  function reg(src, n, stopAt, cleanup) {
    bump(n); voicesStarted++;
    var done = false;
    src.onended = function () {
      if (done) return; done = true;
      unbump(n);
      try { src.disconnect(); } catch (e) {}
      if (cleanup) { try { cleanup(); } catch (e) {} }
    };
    if (offline) {
      // OfflineAudioContext still fires onended after rendering, but we also
      // keep a soft estimate so peak counting stays meaningful.
    }
    if (typeof stopAt === 'number') {
      try { src.stop(stopAt); } catch (e) {}
    }
  }

  function budgetOk(priority) {
    // priority 0 = essential (drums/bass/lead), 1 = nice to have.
    // In an OfflineAudioContext the whole timeline is scheduled synchronously,
    // so `liveNodes` is a running total rather than a concurrency figure and
    // the ceiling is meaningless — skip it there.
    if (offline) return true;
    if ((liveNodes - engineNodes) < MAX_LIVE * (priority ? 0.78 : 1.0)) return true;
    voicesDropped++;
    return false;
  }

  /* ===========================================================================
   * 5.  BUFFER + WAVE FACTORIES
   * ========================================================================= */

  function makeNoise(seconds, kind) {
    var n = Math.max(1, Math.floor(ctx.sampleRate * seconds));
    var buf = ctx.createBuffer(2, n, ctx.sampleRate);
    var rnd = mulberry32(kind === 'pink' ? 0x51F0 : 0xB10F);
    for (var c = 0; c < 2; c++) {
      var d = buf.getChannelData(c);
      if (kind === 'pink') {
        var b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (var i = 0; i < n; i++) {
          var w = rnd() * 2 - 1;
          b0 = 0.99886 * b0 + w * 0.0555179;
          b1 = 0.99332 * b1 + w * 0.0750759;
          b2 = 0.96900 * b2 + w * 0.1538520;
          b3 = 0.86650 * b3 + w * 0.3104856;
          b4 = 0.55000 * b4 + w * 0.5329522;
          b5 = -0.7616 * b5 - w * 0.0168980;
          d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11;
          b6 = w * 0.115926;
        }
      } else if (kind === 'metal') {
        // inharmonic metallic noise for cymbals: 6 square partials
        var ratios = [1.0, 1.4142, 1.7831, 2.0, 2.2449, 2.8284];
        for (var j = 0; j < n; j++) {
          var t = j / ctx.sampleRate, s = 0;
          for (var k = 0; k < ratios.length; k++) {
            s += (Math.sin(TWO_PI * 317 * ratios[k] * t) > 0 ? 1 : -1);
          }
          d[j] = s / ratios.length * 0.7;
        }
      } else {
        for (var m = 0; m < n; m++) d[m] = rnd() * 2 - 1;
      }
    }
    return buf;
  }

  function periodic(name) {
    if (waves[name]) return waves[name];
    var H = 48, re = new Float32Array(H), im = new Float32Array(H), i;
    switch (name) {
      case 'saw':
        for (i = 1; i < H; i++) im[i] = 1 / i; break;
      case 'square':
        for (i = 1; i < H; i += 2) im[i] = 1 / i; break;
      case 'pulse25':
        for (i = 1; i < H; i++) im[i] = Math.sin(i * Math.PI * 0.25) / (i * Math.PI * 0.25) / i; break;
      case 'pulse12':
        for (i = 1; i < H; i++) im[i] = Math.sin(i * Math.PI * 0.125) / (i * Math.PI * 0.125) / i; break;
      case 'organ':
        // drawbar-ish: 1, 2, 3, 4, 6, 8
        im[1] = 1.0; im[2] = 0.62; im[3] = 0.40; im[4] = 0.30; im[6] = 0.18; im[8] = 0.12; break;
      case 'brass':
        for (i = 1; i < 18; i++) im[i] = Math.pow(0.78, i - 1) / Math.sqrt(i);
        break;
      case 'nylon':
        // plucked nylon-ish spectrum: strong 1-4, soft high end
        im[1] = 1.0; im[2] = 0.55; im[3] = 0.42; im[4] = 0.24; im[5] = 0.16;
        im[6] = 0.10; im[7] = 0.07; im[8] = 0.05; break;
      case 'glass':
        im[1] = 1.0; im[3] = 0.42; im[5] = 0.22; im[7] = 0.13; im[9] = 0.08;
        im[11] = 0.05; break;
      case 'clav':
        for (i = 1; i < 26; i++) im[i] = (i % 2 ? 1 : 0.5) * Math.pow(0.86, i - 1) / Math.sqrt(i);
        break;
      case 'strings':
        for (i = 1; i < 30; i++) im[i] = Math.pow(0.84, i - 1) / i * (1 + 0.25 * Math.sin(i * 1.7));
        break;
      case 'rhodes':
        im[1] = 1.0; im[2] = 0.32; im[3] = 0.12; im[4] = 0.28; im[5] = 0.06;
        im[6] = 0.09; im[8] = 0.05; break;
      case 'tri':
        for (i = 1; i < H; i += 2) im[i] = (((i - 1) / 2) % 2 ? -1 : 1) / (i * i); break;
      default:
        for (i = 1; i < H; i++) im[i] = 1 / i;
    }
    waves[name] = ctx.createPeriodicWave(re, im, { disableNormalization: false });
    return waves[name];
  }

  function driveCurve(amount) {
    var key = amount.toFixed(2);
    if (driveCurves[key]) return driveCurves[key];
    var n = 2048, c = new Float32Array(n), k = amount;
    for (var i = 0; i < n; i++) {
      var x = (i / (n - 1)) * 2 - 1;
      c[i] = Math.tanh(x * (1 + k * 3)) / Math.tanh(1 + k * 3);
    }
    driveCurves[key] = c;
    return c;
  }

  /* --- Karplus-Strong string, rendered to a buffer once and cached ---------- */
  function ksBuffer(midi, bright, decay) {
    var key = (midi | 0) + '|' + bright.toFixed(2) + '|' + decay.toFixed(2);
    if (ksCache[key]) return ksCache[key];
    var sr = ctx.sampleRate;
    var f = mtof(midi);
    var N = Math.max(2, Math.round(sr / f));
    var len = Math.max(1, Math.floor(sr * decay));
    var buf = ctx.createBuffer(1, len, sr);
    var d = buf.getChannelData(0);
    var line = new Float32Array(N);
    var rnd = mulberry32(((midi | 0) * 2654435761) >>> 0);
    // excite with filtered noise (brightness controls the pick position colour)
    var prev = 0;
    for (var i = 0; i < N; i++) {
      var w = rnd() * 2 - 1;
      prev = prev + (w - prev) * bright;
      line[i] = prev;
    }
    // normalise excitation
    var mx = 1e-6;
    for (i = 0; i < N; i++) mx = Math.max(mx, Math.abs(line[i]));
    for (i = 0; i < N; i++) line[i] /= mx;

    var idx = 0, last = 0;
    var damp = 0.5 - 0.22 * (1 - bright);      // low-pass in the loop
    var loss = Math.pow(0.5, 1 / (decay * f * 0.55));
    for (var s = 0; s < len; s++) {
      var cur = line[idx];
      d[s] = cur;
      var avg = cur * (1 - damp) + last * damp;
      last = cur;
      line[idx] = avg * loss;
      idx = (idx + 1) % N;
    }
    // fade the tail so the buffer never ends on a discontinuity
    var fade = Math.min(len, Math.floor(sr * 0.02));
    for (i = 0; i < fade; i++) d[len - 1 - i] *= i / fade;
    ksCache[key] = buf;
    return buf;
  }

  /* --- Pre-rendered percussion one-shots -----------------------------------
   * Cymbals, shakers, claps and snare noise are all "filtered noise with an
   * envelope". Rendering them into AudioBuffers once means every hit costs a
   * BufferSource + a Gain (2 nodes) instead of source + filter + gain, and it
   * takes the filtering off the audio thread entirely.
   * ----------------------------------------------------------------------- */
  function renderPerc(key, spec) {
    if (percCache[key]) return percCache[key];
    var sr = ctx.sampleRate;
    var dur = spec.dur;
    var len = Math.max(8, Math.floor(sr * dur));
    var buf = ctx.createBuffer(1, len, sr);
    var d = buf.getChannelData(0);
    var rnd = mulberry32(spec.seed || 0x9E37);

    // source generator
    var metalRatios = [1.0, 1.4142, 1.7831, 2.0, 2.2449, 2.8284, 3.1748];
    var metalBase = spec.metalBase || 317;
    var lp = 0, bp = 0;
    // one-pole coefficient for the filter corner
    var fc = Math.min(0.49, (spec.hp || spec.bp || 1000) / sr);
    var k = 1 - Math.exp(-TWO_PI * fc);
    var q = spec.q || 1;
    var bpState1 = 0, bpState2 = 0;
    var f = 2 * Math.sin(Math.PI * Math.min(0.49, (spec.bp || 1000) / sr));
    var dmp = Math.min(1, 1 / q);

    for (var i = 0; i < len; i++) {
      var tt = i / sr, s;
      if (spec.metal) {
        s = 0;
        for (var m = 0; m < metalRatios.length; m++) {
          s += (Math.sin(TWO_PI * metalBase * metalRatios[m] * tt) > 0 ? 1 : -1);
        }
        s /= metalRatios.length;
        s = s * 0.90 + (rnd() * 2 - 1) * 0.10;
      } else {
        s = rnd() * 2 - 1;
      }
      // filter
      var out;
      if (spec.bp) {
        // state-variable bandpass
        var low = bpState2 + f * bpState1;
        var high = s - low - dmp * bpState1;
        var band = f * high + bpState1;
        bpState1 = band; bpState2 = low;
        out = band;
      } else if (spec.hp) {
        lp = lp + (s - lp) * k;
        out = s - lp;
      } else {
        lp = lp + (s - lp) * k;
        out = lp;
      }
      // envelope
      var e;
      if (spec.bursts) {
        e = 0;
        for (var b = 0; b < spec.bursts.length; b++) {
          var bt = tt - spec.bursts[b];
          if (bt >= 0) e = Math.max(e, Math.exp(-bt / (spec.burstDec || 0.008)) * (1 - b * 0.12));
        }
        if (tt > spec.bursts[spec.bursts.length - 1] + 0.004) {
          e = Math.max(e, Math.exp(-(tt - spec.bursts[spec.bursts.length - 1]) / (spec.dec || 0.09)) * 0.6);
        }
      } else {
        var atk = spec.atk || 0.0008;
        e = tt < atk ? tt / atk : Math.exp(-(tt - atk) / (spec.dec || dur * 0.3));
      }
      d[i] = out * e;
    }
    // normalise + tail fade so the buffer never ends on a step
    var mx = 1e-6;
    for (i = 0; i < len; i++) mx = Math.max(mx, Math.abs(d[i]));
    for (i = 0; i < len; i++) d[i] /= mx;
    var fade = Math.min(len, Math.floor(sr * 0.006));
    for (i = 0; i < fade; i++) d[len - 1 - i] *= i / fade;
    percCache[key] = buf;
    return buf;
  }

  // Fire a pre-rendered one-shot: BufferSource + Gain, nothing else.
  function shot(dest, t, buf, gain, rev, dly, rate, pri) {
    if (!budgetOk(pri === undefined ? 1 : pri)) return;
    var src = ctx.createBufferSource();
    src.buffer = buf;
    if (rate && rate !== 1) src.playbackRate.value = rate;
    var g = ctx.createGain();
    src.connect(g); g.connect(dest);
    connectSends(g, rev || 0, dly || 0);
    var dur = buf.duration / (rate || 1);
    gAt(g.gain, t, gain);
    gAt(g.gain, t + dur - 0.004, gain);
    gLin(g.gain, t + dur, 0);
    src.start(t);
    reg(src, 2, t + dur + 0.01);
  }

  /* --- Procedural convolution reverb IR ------------------------------------ */
  function buildIR(seconds, decayPow, preDelay, tilt) {
    var sr = ctx.sampleRate;
    var len = Math.floor(sr * seconds);
    var buf = ctx.createBuffer(2, len, sr);
    var pd = Math.floor(sr * preDelay);
    var rnd = mulberry32(0xC3B1);
    // early reflections (hand-placed taps)
    var taps = [0.011, 0.019, 0.027, 0.041, 0.053, 0.071, 0.089, 0.113];
    var tapG = [0.55, 0.42, 0.36, 0.30, 0.24, 0.19, 0.15, 0.11];
    for (var c = 0; c < 2; c++) {
      var d = buf.getChannelData(c);
      var lp = 0, hp = 0;
      for (var i = 0; i < len; i++) {
        if (i < pd) { d[i] = 0; continue; }
        var t = (i - pd) / (len - pd);
        var env = Math.pow(1 - t, decayPow);
        var w = (rnd() * 2 - 1) * env;
        // one-pole tilt: darker tail
        lp = lp + (w - lp) * tilt;
        hp = w - lp;
        d[i] = lp * 0.86 + hp * 0.30;
      }
      for (var k = 0; k < taps.length; k++) {
        var s = pd + Math.floor(taps[k] * sr * (c ? 1.07 : 0.93));
        if (s < len) d[s] += tapG[k] * (c ? -1 : 1) * 0.7;
      }
      // normalise
      var mx = 1e-6;
      for (i = 0; i < len; i++) mx = Math.max(mx, Math.abs(d[i]));
      for (i = 0; i < len; i++) d[i] = d[i] / mx * 0.72;
      // gentle fade-in/out so the convolution never clicks
      var f = Math.floor(sr * 0.004);
      for (i = 0; i < f && i < len; i++) { d[i] *= i / f; d[len - 1 - i] *= i / f; }
    }
    return buf;
  }

  /* ===========================================================================
   * 6.  ENVELOPE + FILTER HELPERS  (never click)
   * ========================================================================= */

  function gAt(param, t, v) { try { param.setValueAtTime(v, t); } catch (e) {} }
  function gLin(param, t, v) { try { param.linearRampToValueAtTime(v, t); } catch (e) {} }
  function gExp(param, t, v) { try { param.exponentialRampToValueAtTime(Math.max(1e-4, v), t); } catch (e) {} }
  function gTgt(param, t, v, tc) { try { param.setTargetAtTime(v, t, tc); } catch (e) {} }

  // ADSR-ish envelope onto a gain, returns the time at which the voice is silent
  function env(gain, t, peak, a, d, s, r, dur) {
    var p = gain.gain;
    a = Math.max(0.0015, a);
    gAt(p, t, 0);
    gLin(p, t + a, peak);
    var sl = peak * s;
    if (d > 0) gExp(p, t + a + d, Math.max(1e-4, sl));
    else gAt(p, t + a, sl);
    var rel = t + Math.max(dur, a + d);
    gAt(p, rel, Math.max(1e-4, sl));
    gExp(p, rel + r, 1e-4);
    gLin(p, rel + r + 0.004, 0);
    return rel + r + 0.02;
  }

  // Percussive decay envelope
  function penv(gain, t, peak, a, dec) {
    var p = gain.gain;
    gAt(p, t, 0);
    gLin(p, t + Math.max(0.0008, a), peak);
    gExp(p, t + Math.max(0.0008, a) + dec, 1e-4);
    gLin(p, t + Math.max(0.0008, a) + dec + 0.006, 0);
    return t + a + dec + 0.03;
  }

  /* State-variable-style filter with an envelope + LFO-able cutoff.
   * `poles` 1 = 12dB/oct (one biquad, the default — cheap), 2 = 24dB/oct
   * (two cascaded biquads, used where the slope matters: pads and leads). */
  function svf(type, f0, q, poles) {
    var a = ctx.createBiquadFilter();
    a.type = type || 'lowpass';
    a.frequency.value = f0;
    a.Q.value = q || 0.7;
    if (poles === 2) {
      var b = ctx.createBiquadFilter();
      b.type = a.type; b.frequency.value = f0; b.Q.value = (q || 0.7) * 0.5;
      a.connect(b);
      return { in: a, out: b, freq: a.frequency, freq2: b.frequency, n: 2 };
    }
    return { in: a, out: a, freq: a.frequency, freq2: null, n: 1 };
  }
  function svfSweep(f, t, from, to, time) {
    gAt(f.freq, t, from);
    gExp(f.freq, t + time, to);
    if (f.freq2) { gAt(f.freq2, t, from); gExp(f.freq2, t + time, to); }
  }

  /* ===========================================================================
   * 7.  VOICES
   * ========================================================================= */

  /* Voices do not allocate their own send gains — they connect into one of
   * three shared, fixed-depth send buses. Costs zero extra nodes per voice. */
  function bucket(amt) { return amt < 0.22 ? 0 : (amt < 0.45 ? 1 : 2); }
  function connectSends(node, revAmt, dlyAmt) {
    try {
      if (revAmt > 0.02 && revBus) node.connect(revBus[bucket(revAmt)]);
      if (dlyAmt > 0.02 && dlyBus) node.connect(dlyBus[bucket(dlyAmt)]);
    } catch (e) {}
    return 0;   // no nodes created
  }

  /* -- simple oscillator voice ---------------------------------------------- */
  function vOsc(dest, t, freq, dur, o) {
    o = o || {};
    if (!budgetOk(o.pri || 0)) return;
    var osc = ctx.createOscillator();
    var g = ctx.createGain();
    var n = 2;
    if (o.wave) osc.setPeriodicWave(periodic(o.wave)); else osc.type = o.type || 'sine';
    osc.frequency.value = freq;
    if (o.detune) osc.detune.value = o.detune;
    if (o.glide) { gAt(osc.frequency, t, freq * o.glide); gExp(osc.frequency, t + (o.glideT || 0.06), freq); }
    var vtap = null;
    if (o.vib && vibBus) {
      // shared vibrato LFO taps — free, and they keep the whole score's
      // vibrato phase-coherent which sounds more like one performer
      vtap = vibBus[o.vib > 11 ? 2 : (o.vib > 7 ? 1 : 0)];
      try { vtap.connect(osc.detune); } catch (e) {}
    }
    var tail, ftap = null, ffreq = null;
    var node = osc;
    if (o.cut) {
      var f = svf('lowpass', o.cut, o.q || 0.8, o.poles); n += f.n;
      if (o.cutEnv) svfSweep(f, t, o.cut, Math.max(120, o.cut * o.cutEnv), o.cutT || dur);
      if (o.cutLfo !== undefined && fltBus) {
        ftap = fltBus[o.cutLfo]; try { ftap.connect(f.freq); } catch (e) {}
        ffreq = f.freq;
      }
      osc.connect(f.in); f.out.connect(g);
    } else osc.connect(g);
    g.connect(dest);
    n += connectSends(g, o.rev || 0, o.dly || 0);
    if (o.perc) tail = penv(g, t, o.gain || 0.3, o.atk || 0.004, dur);
    else tail = env(g, t, o.gain || 0.3, o.atk || 0.01, o.dec || 0.08, o.sus === undefined ? 0.75 : o.sus, o.rel || 0.12, dur);
    osc.start(t);
    reg(osc, n, tail, (vtap || ftap) ? function () {
      if (vtap) { try { vtap.disconnect(osc.detune); } catch (e) {} }
      if (ftap) { try { ftap.disconnect(ffreq); } catch (e) {} }
    } : null);
  }

  /* -- FM pair (carrier + modulator) ---------------------------------------- */
  function vFM(dest, t, freq, dur, o) {
    o = o || {};
    if (!budgetOk(o.pri || 1)) return;
    var car = ctx.createOscillator(), mod = ctx.createOscillator();
    var mg = ctx.createGain(), g = ctx.createGain();
    car.type = o.ctype || 'sine'; mod.type = o.mtype || 'sine';
    car.frequency.value = freq;
    mod.frequency.value = freq * (o.ratio || 2);
    var idx = freq * (o.index || 2);
    gAt(mg.gain, t, idx);
    gExp(mg.gain, t + (o.idxT || dur * 0.6 + 0.05), Math.max(1, idx * (o.idxEnd || 0.05)));
    mod.connect(mg); mg.connect(car.frequency);
    car.connect(g); g.connect(dest);
    var n = 4 + connectSends(g, o.rev || 0, o.dly || 0);
    var tail = o.perc
      ? penv(g, t, o.gain || 0.3, o.atk || 0.003, dur)
      : env(g, t, o.gain || 0.3, o.atk || 0.01, o.dec || 0.1, o.sus === undefined ? 0.6 : o.sus, o.rel || 0.14, dur);
    mod.start(t); car.start(t);
    try { mod.stop(tail); } catch (e) {}
    reg(car, n, tail);
  }

  /* -- supersaw: 7 detuned saws through a shared filter ---------------------- */
  function vSuper(dest, t, freq, dur, o) {
    o = o || {};
    var count = o.count || 7;
    if (!budgetOk(1)) count = 3;
    if (!budgetOk(1)) return;
    var g = ctx.createGain(), sum = ctx.createGain();
    sum.gain.value = 1 / Math.sqrt(count);
    var f = svf('lowpass', o.cut || 2600, o.q || 0.9);
    var det = o.detune || 16;
    var spread = [0, -1, 1, -0.62, 0.62, -0.31, 0.31];
    var oscs = [];
    for (var i = 0; i < count; i++) {
      var osc = ctx.createOscillator();
      osc.setPeriodicWave(periodic('saw'));
      osc.frequency.value = freq;
      osc.detune.value = spread[i % spread.length] * det + (i % 2 ? 2 : -2);
      osc.connect(sum);
      osc.start(t);
      oscs.push(osc);
    }
    sum.connect(f.in); f.out.connect(g); g.connect(dest);
    var n = count + 2 + f.n + connectSends(g, o.rev || 0, o.dly || 0);
    if (o.cutEnv) svfSweep(f, t, (o.cut || 2600) * 0.35, o.cut || 2600, o.cutT || 0.25);
    var tail = env(g, t, o.gain || 0.22, o.atk || 0.02, o.dec || 0.12, o.sus === undefined ? 0.8 : o.sus, o.rel || 0.25, dur);
    for (i = 1; i < oscs.length; i++) { try { oscs[i].stop(tail); } catch (e) {} }
    reg(oscs[0], n, tail);
  }

  /* -- plucked string (Karplus-Strong buffer playback) ----------------------- */
  function vPluck(dest, t, midi, dur, o) {
    o = o || {};
    if (!budgetOk(o.pri || 1)) return;
    var bright = o.bright === undefined ? 0.55 : o.bright;
    var decay = o.decay || 1.4;
    // cache by rounded midi; fine pitch via playbackRate
    var base = Math.round(midi);
    var buf = ksBuffer(base, bright, decay);
    var src = ctx.createBufferSource();
    src.buffer = buf;
    src.playbackRate.value = Math.pow(2, (midi - base) / 12);
    var g = ctx.createGain();
    var n = 2;
    var node = src;
    if (o.cut) {
      var f = svf('lowpass', o.cut, o.q || 0.7); n += f.n;
      src.connect(f.in); f.out.connect(g);
    } else src.connect(g);
    g.connect(dest);
    n += connectSends(g, o.rev || 0, o.dly || 0);
    var hold = Math.min(dur, decay);
    var p = g.gain;
    gAt(p, t, 0);
    gLin(p, t + 0.004, o.gain || 0.4);
    gAt(p, t + hold, o.gain || 0.4);
    gExp(p, t + hold + (o.rel || 0.12), 1e-4);
    gLin(p, t + hold + (o.rel || 0.12) + 0.005, 0);
    var tail = t + hold + (o.rel || 0.12) + 0.02;
    src.start(t);
    reg(src, n, tail);
  }

  /* -- noise voice ----------------------------------------------------------- */
  function vNoise(dest, t, dur, o) {
    o = o || {};
    if (!budgetOk(o.pri || 1)) return null;
    var src = ctx.createBufferSource();
    src.buffer = o.pink ? pinkBuf : (o.metal ? (metalBuf || (metalBuf = makeNoise(1.0, 'metal'))) : noiseBuf);
    src.loop = true;
    if (o.rate) src.playbackRate.value = o.rate;
    var g = ctx.createGain();
    var n = 2;
    var head = src;
    if (o.hp || o.lp || o.bp) {
      var f = ctx.createBiquadFilter();
      f.type = o.bp ? 'bandpass' : (o.hp ? 'highpass' : 'lowpass');
      f.frequency.value = o.bp || o.hp || o.lp;
      f.Q.value = o.q || 0.7;
      if (o.sweep) { gAt(f.frequency, t, (o.bp || o.hp || o.lp)); gExp(f.frequency, t + dur, o.sweep); }
      src.connect(f); f.connect(g); n++;
      if (o.lp2) { var f2 = ctx.createBiquadFilter(); f2.type = 'lowpass'; f2.frequency.value = o.lp2; g.disconnect(); g.connect(f2); f2.connect(dest); n++; }
      else g.connect(dest);
    } else { src.connect(g); g.connect(dest); }
    n += connectSends(g, o.rev || 0, o.dly || 0);
    var tail;
    if (o.shape === 'swell') {
      var p = g.gain;
      gAt(p, t, 0); gLin(p, t + dur * 0.92, o.gain || 0.25);
      gExp(p, t + dur, 1e-4); gLin(p, t + dur + 0.01, 0);
      tail = t + dur + 0.03;
    } else {
      tail = penv(g, t, o.gain || 0.25, o.atk || 0.002, dur);
    }
    src.start(t);
    reg(src, n, tail);
    return g;
  }

  /* ===========================================================================
   * 8.  DRUM SYNTHS
   * ========================================================================= */

  function kitKey(kit) { return kit.__key || 'kit'; }

  function dKick(dest, t, kit, vel) {
    var k = kit.kick;
    if (!budgetOk(0)) return;
    var osc = ctx.createOscillator(), g = ctx.createGain(), sh = ctx.createWaveShaper();
    osc.type = 'sine';
    gAt(osc.frequency, t, k.f0);
    gExp(osc.frequency, t + k.pd, k.f1);
    sh.curve = driveCurve(k.drv * 0.35);
    osc.connect(sh); sh.connect(g); g.connect(dest);
    var tail = penv(g, t, (k.g || 1) * vel * 0.72, 0.002, k.dur);
    osc.start(t);
    reg(osc, 3, tail);
    if (k.clk > 0.01) {
      shot(dest, t, renderPerc('click', { dur: 0.026, bp: 2200, q: 0.9, dec: 0.006, seed: 0x11 }),
        k.clk * vel * 0.26, 0, 0, 1, 1);
    }
  }

  function dSnare(dest, t, kit, vel) {
    var s = kit.snare;
    if (!budgetOk(0)) return;
    var key = kitKey(kit) + 'sn';
    var buf;
    if (s.mode === 'clap') {
      buf = renderPerc(key, { dur: 0.04 + s.dur, bp: s.bp, q: s.q, dec: s.dur * 0.45,
        bursts: [0, 0.011, 0.022, 0.034], burstDec: 0.007, seed: 0x33 });
    } else {
      buf = renderPerc(key, { dur: s.dur + 0.05, bp: s.bp, q: s.q, dec: s.dur * 0.34, seed: 0x33 });
    }
    shot(dest, t, buf, s.g * vel * 0.62, s.mode === 'gated' ? 0.55 : 0.18, 0, 1, 0);
    if (s.tone > 0 && budgetOk(1)) {
      var o1 = ctx.createOscillator(), tg = ctx.createGain();
      o1.type = 'triangle'; o1.frequency.value = s.tone;
      gExp(o1.frequency, t + 0.06, s.tone * 0.72);
      o1.connect(tg); tg.connect(dest);
      var tt = penv(tg, t, s.g * vel * 0.30, 0.001, s.dur * 0.55);
      o1.start(t); reg(o1, 2, tt);
    }
  }

  function dHat(dest, t, kit, vel, open) {
    var h = kit.hat;
    var dur = open ? h.odur : h.dur;
    var buf = renderPerc(kitKey(kit) + (open ? 'oh' : 'ch'), {
      dur: dur + 0.02, hp: h.hp, metal: true, metalBase: 317, dec: dur * 0.34, seed: 0x55
    });
    shot(dest, t, buf, h.g * vel * (open ? 0.85 : 1.05), open ? 0.18 : 0.04, 0, 1, 1);
  }

  function dPerc(dest, t, kit, vel) {
    var p = kit.perc;
    if (p.type === 'shaker') {
      shot(dest, t, renderPerc('shaker', { dur: 0.07, hp: 6200, atk: 0.004, dec: 0.016, seed: 0x77 }),
        p.g * vel * 0.34, 0.06, 0, 1, 1);
    } else if (p.type === 'rim') {
      shot(dest, t, renderPerc('rim', { dur: 0.05, bp: 1750, q: 3.2, dec: 0.010, seed: 0x88 }),
        p.g * vel * 0.4, 0.12, 0, 1, 1);
    } else if (p.type === 'timp') {
      vOsc(dest, t, 98, 0.42, { type: 'sine', gain: p.g * vel * 0.5, perc: true, atk: 0.003, glide: 1.6, glideT: 0.10, rev: 0.4, pri: 1 });
    } else { // tom
      if (!budgetOk(1)) return;
      var o3 = ctx.createOscillator(), g3 = ctx.createGain();
      o3.type = 'sine';
      gAt(o3.frequency, t, 220); gExp(o3.frequency, t + 0.12, 96);
      o3.connect(g3); g3.connect(dest);
      connectSends(g3, 0.25, 0);
      var t3 = penv(g3, t, p.g * vel * 0.42, 0.002, 0.20);
      o3.start(t); reg(o3, 2, t3);
    }
  }

  function dRide(dest, t, kit, vel) {
    var buf = renderPerc('ride', { dur: 0.46, hp: 4200, metal: true, metalBase: 197, dec: 0.11, seed: 0x99 });
    shot(dest, t, buf, (kit.ride.g || 0.24) * vel * 1.2, 0.3, 0, 1, 1);
  }

  function dCrash(dest, t, vel) {
    var buf = renderPerc('crash', { dur: 1.6, hp: 2600, metal: true, metalBase: 133, dec: 0.42, seed: 0xAA });
    shot(dest, t, buf, 0.30 * vel, 0.55, 0, 1, 1);
  }

  /* ===========================================================================
   * 9.  GRAPH CONSTRUCTION
   * ========================================================================= */

  function buildGraph() {
    masterGain = ctx.createGain();
    masterGain.gain.value = vol.muted ? 0 : vol.master;

    masterComp = ctx.createDynamicsCompressor();
    masterComp.threshold.value = -7;
    masterComp.knee.value = 8;
    masterComp.ratio.value = 3;
    masterComp.attack.value = 0.006;
    masterComp.release.value = 0.16;
    masterHP = ctx.createBiquadFilter();
    // 40Hz, not 26: below that a phone speaker reproduces nothing and the
    // energy only eats compressor headroom that the mids need.
    masterHP.type = 'highpass'; masterHP.frequency.value = 40; masterHP.Q.value = 0.6;
    // A second, fast, high-ratio stage. The bus compressor above is a
    // musical 3:1 glue; this one exists purely so that music + sfx + four
    // engines stacking at once can never reach 0 dBFS and clip.
    masterLim = ctx.createDynamicsCompressor();
    masterLim.threshold.value = -1.6;
    masterLim.knee.value = 0;
    masterLim.ratio.value = 20;
    masterLim.attack.value = 0.002;
    masterLim.release.value = 0.09;

    masterComp.connect(masterHP); masterHP.connect(masterLim);
    masterLim.connect(masterGain);
    masterGain.connect(ctx.destination);

    musicDuck = ctx.createGain(); musicDuck.gain.value = 1;
    musicGain = ctx.createGain(); musicGain.gain.value = vol.music;

    /* Phone-speaker voicing. The scores are written with a lot of sub and
       low-mid weight; measured on the raw bus the average spectrum fell about
       6 dB per octave from 60 Hz to 10 kHz. That reads warm on headphones and
       turns to mud on a handset, where nothing under ~500 Hz gets reproduced
       at all. Three gentle shelves move the balance up into the band a phone
       can actually play, without thinning the groove on headphones. */
    musicTilt = ctx.createBiquadFilter();
    musicTilt.type = 'lowshelf'; musicTilt.frequency.value = 170; musicTilt.gain.value = -3.5;
    musicPres = ctx.createBiquadFilter();
    musicPres.type = 'peaking'; musicPres.frequency.value = 1150;
    musicPres.Q.value = 0.8; musicPres.gain.value = 2.5;
    musicAir = ctx.createBiquadFilter();
    musicAir.type = 'highshelf'; musicAir.frequency.value = 2600; musicAir.gain.value = 4.0;

    musicGain.connect(musicTilt); musicTilt.connect(musicPres);
    musicPres.connect(musicAir); musicAir.connect(musicDuck);
    musicDuck.connect(masterComp);

    sfxGain = ctx.createGain(); sfxGain.gain.value = vol.sfx;
    sfxGain.connect(masterComp);

    engineGain = ctx.createGain(); engineGain.gain.value = vol.sfx * 0.55;
    engTilt = ctx.createBiquadFilter();
    engTilt.type = 'lowshelf'; engTilt.frequency.value = 150; engTilt.gain.value = -5.5;
    engAir = ctx.createBiquadFilter();
    engAir.type = 'highshelf'; engAir.frequency.value = 1800; engAir.gain.value = 4.5;
    engineGain.connect(engTilt); engTilt.connect(engAir); engAir.connect(masterComp);

    // reverb
    revSend = ctx.createGain(); revSend.gain.value = 1;
    revPre = ctx.createBiquadFilter(); revPre.type = 'highpass'; revPre.frequency.value = 300;
    revConv = ctx.createConvolver();
    try { revConv.buffer = buildIR(lowPower ? 0.7 : 1.7, 2.9, 0.014, 0.10); } catch (e) {}
    revConv.normalize = false;
    revPost = ctx.createBiquadFilter(); revPost.type = 'lowpass'; revPost.frequency.value = 5200;
    revReturn = ctx.createGain(); revReturn.gain.value = 0.30;
    revSend.connect(revPre); revPre.connect(revConv); revConv.connect(revPost);
    revPost.connect(revReturn); revReturn.connect(masterComp);

    // tempo-synced ping-pong delay
    dlySend = ctx.createGain(); dlySend.gain.value = 1;
    dlyL = ctx.createDelay(2.0); dlyR = ctx.createDelay(2.0);
    dlyL.delayTime.value = 0.28; dlyR.delayTime.value = 0.28 * 1.5;
    dlyFbL = ctx.createGain(); dlyFbR = ctx.createGain();
    dlyFbL.gain.value = 0.34; dlyFbR.gain.value = 0.34;
    dlyFilt = ctx.createBiquadFilter(); dlyFilt.type = 'lowpass'; dlyFilt.frequency.value = 2200;
    dlyPanL = ctx.createStereoPanner ? ctx.createStereoPanner() : ctx.createGain();
    dlyPanR = ctx.createStereoPanner ? ctx.createStereoPanner() : ctx.createGain();
    if (dlyPanL.pan) { dlyPanL.pan.value = -0.75; dlyPanR.pan.value = 0.75; }
    dlyReturn = ctx.createGain(); dlyReturn.gain.value = 0.24;
    dlySend.connect(dlyL);
    dlyL.connect(dlyFilt); dlyFilt.connect(dlyFbR); dlyFbR.connect(dlyR);
    dlyR.connect(dlyFbL); dlyFbL.connect(dlyL);
    dlyL.connect(dlyPanL); dlyR.connect(dlyPanR);
    dlyPanL.connect(dlyReturn); dlyPanR.connect(dlyReturn);
    dlyReturn.connect(masterComp);

    // shared send buses (low / mid / high depth) — see connectSends()
    revBus = []; dlyBus = [];
    var depths = [0.10, 0.24, 0.48];
    for (var b = 0; b < 3; b++) {
      var rg = ctx.createGain(); rg.gain.value = depths[b]; rg.connect(revSend); revBus.push(rg);
      var dg = ctx.createGain(); dg.gain.value = depths[b]; dg.connect(dlySend); dlyBus.push(dg);
    }

    // shared vibrato LFO with three depth taps
    vibBus = [];
    var lfo = ctx.createOscillator();
    lfo.type = 'sine'; lfo.frequency.value = 5.2;
    var vdep = [5, 9, 14];
    for (var v = 0; v < 3; v++) {
      var vg = ctx.createGain(); vg.gain.value = vdep[v];
      lfo.connect(vg); vibBus.push(vg);
    }
    try { lfo.start(0); } catch (e) {}

    // shared filter-cutoff LFO: a slow sweep (tap 0, +/-500Hz at 0.16Hz) for
    // pad movement and a faster one (tap 1, +/-1400Hz at 2.4Hz) for arps.
    fltBus = [];
    var slowL = ctx.createOscillator(); slowL.type = 'sine'; slowL.frequency.value = 0.16;
    var fastL = ctx.createOscillator(); fastL.type = 'triangle'; fastL.frequency.value = 2.4;
    var fg0 = ctx.createGain(); fg0.gain.value = 500; slowL.connect(fg0); fltBus.push(fg0);
    var fg1 = ctx.createGain(); fg1.gain.value = 1400; fastL.connect(fg1); fltBus.push(fg1);
    try { slowL.start(0); fastL.start(0); } catch (e) {}

    // music stems
    for (var i = 0; i < STEMS.length; i++) {
      var g = ctx.createGain();
      g.gain.value = 0;
      g.connect(musicGain);
      stemGain[STEMS[i].id] = g;
      M.stemLevel[STEMS[i].id] = 0;
    }
    for (var kk in KITS) if (KITS.hasOwnProperty(kk)) KITS[kk].__key = kk;
    fixedNodes = 32 + 7 + 4 + STEMS.length;
  }

  /* ===========================================================================
   * 10.  MUSIC SCHEDULER
   * ========================================================================= */

  function songFor(id) {
    if (!id) return null;
    var key = MUSIC_ALIASES[id] || id;
    return SONGS[key] ? key : null;
  }

  function stemTargets() {
    var s = M.song, out = {}, i;
    var inten = s && s.alwaysFull ? 1 : M.intensity;
    for (i = 0; i < STEMS.length; i++) {
      var st = STEMS[i];
      var v = smoothstep(st.min, st.min + st.band, inten) * st.gain;
      if (M.finalLap) {
        if (st.id === 'lead' || st.id === 'counter' || st.id === 'fx') v = Math.max(v, st.gain);
        if (st.id === 'perc') v = Math.max(v, st.gain);
        if (st.id === 'drums' || st.id === 'bass') v = Math.max(v, st.gain);
      }
      // Low power: the score survives — drums, bass, pad, arp and the lead
      // tune all still play — and the three decorative layers go. Measured at
      // 26.4% -> 17.6% of one core for a full-intensity final-lap mix.
      if (lowPower && (st.id === 'fx' || st.id === 'counter' || st.id === 'perc')) v = 0;
      out[st.id] = v;
    }
    return out;
  }

  // Ramp stem gains — only ever called on a bar boundary.
  function applyStems(t) {
    var tg = stemTargets(), ramp = M.spb * 0.5;
    for (var i = 0; i < STEMS.length; i++) {
      var id = STEMS[i].id, g = stemGain[id];
      if (!g) continue;
      var cur = M.stemLevel[id], want = tg[id];
      if (Math.abs(cur - want) < 0.001) continue;
      try {
        g.gain.cancelScheduledValues(t);
        g.gain.setValueAtTime(cur, t);
        g.gain.linearRampToValueAtTime(want, t + ramp);
      } catch (e) {}
      M.stemLevel[id] = want;
    }
  }

  function tempoNow() {
    var b = M.song.bpm * (M.finalLap ? 1.06 : 1);
    return b;
  }

  function scheduleRiser(t, bars) {
    // 2-bar rising noise sweep + pitch riser into the downbeat at t + bars*4*spb
    var dur = bars * 4 * M.spb;
    var dest = stemGain.fx;
    vNoise(dest, t, dur, { hp: 300, sweep: 9000, q: 1.2, gain: 0.26, shape: 'swell', rev: 0.4, pri: 1 });
    if (!budgetOk(1)) return;
    var osc = ctx.createOscillator(), g = ctx.createGain();
    osc.setPeriodicWave(periodic('saw'));
    gAt(osc.frequency, t, mtof(M.song.root + M.transpose + 12));
    gExp(osc.frequency, t + dur, mtof(M.song.root + M.transpose + 36));
    var f = svf('lowpass', 900, 3.0);
    svfSweep(f, t, 900, 7000, dur);
    osc.connect(f.in); f.out.connect(g); g.connect(dest);
    var n = 2 + f.n + connectSends(g, 0.5, 0.2);
    var p = g.gain;
    gAt(p, t, 0); gLin(p, t + dur * 0.9, 0.16); gExp(p, t + dur, 1e-4); gLin(p, t + dur + 0.01, 0);
    osc.start(t);
    reg(osc, n, t + dur + 0.05);
  }

  function scheduleImpact(t) {
    dCrash(stemGain.fx, t, 0.9);
    vOsc(stemGain.fx, t, 70, 0.5, { type: 'sine', gain: 0.4, perc: true, glide: 3.2, glideT: 0.16, rev: 0.4, pri: 1 });
  }

  /* --- schedule one beat of every stem ------------------------------------- */
  function scheduleBeat(t, beatIdx) {
    var s = M.song;
    var phrase = s.phrase;
    var bar = Math.floor(beatIdx / 4);
    var bip = bar % phrase;          // bar in phrase
    var beat = beatIdx % 4;
    var spb = M.spb;
    var s16 = spb / 4;
    var swing = s.swing || 0;
    var kit = KITS[s.kit] || KITS.boom;
    var root = s.root + M.transpose;
    var ch = s.prog[bip % s.prog.length];
    var tones = chordTones(ch);
    var isFill = s.drums.fillBars && s.drums.fillBars.indexOf(bip) >= 0 && beat === 3;

    function stepTime(step) {
      var tt = t + (step - beat * 4) * s16;
      if (swing && (step & 1)) tt += s16 * swing;
      return tt;
    }

    /* ---- DRUMS (kick + snare, always on) ---- */
    var D = stemGain.drums, i, st, c, v;
    for (i = 0; i < 4; i++) {
      st = beat * 4 + i;
      c = gridAt(s.drums.kick, bar, st);
      if (c !== '.') dKick(D, stepTime(st), kit, HITVEL[c] || 0.8);
      c = gridAt(s.drums.snare, bar, st);
      if (c !== '.') dSnare(D, stepTime(st), kit, HITVEL[c] || 0.8);
    }
    if (isFill) {
      // turnaround fill: descending toms into the downbeat
      var fv = [0.6, 0.72, 0.84, 1.0];
      for (i = 0; i < 4; i++) {
        var ft = stepTime(beat * 4 + i);
        if (!budgetOk(1)) break;
        var o = ctx.createOscillator(), fg = ctx.createGain();
        o.type = 'sine';
        gAt(o.frequency, ft, 300 - i * 46);
        gExp(o.frequency, ft + 0.11, 110 - i * 14);
        o.connect(fg); fg.connect(D);
        var n = 2 + connectSends(fg, 0.3, 0);
        var tl = penv(fg, ft, 0.42 * fv[i], 0.002, 0.16);
        o.start(ft); reg(o, n, tl);
      }
    }
    if (beat === 0 && (bip === 0 || bip === phrase / 2) && M.stemLevel.perc > 0.05) {
      dCrash(stemGain.perc, t, bip === 0 ? 0.85 : 0.6);
    }

    /* ---- PERC (hats / shaker / ride) ---- */
    if (M.stemLevel.perc > 0.02) {
      var P = stemGain.perc;
      for (i = 0; i < 4; i++) {
        st = beat * 4 + i;
        c = gridAt(s.drums.hat, bar, st);
        if (c !== '.') dHat(P, stepTime(st), kit, HITVEL[c] || 0.7, false);
        c = gridAt(s.drums.ohat, bar, st);
        if (c === 'o' || c === 'O') dHat(P, stepTime(st), kit, HITVEL[c] || 0.8, true);
        c = gridAt(s.drums.perc, bar, st);
        if (c !== '.') dPerc(P, stepTime(st), kit, HITVEL[c] || 0.7);
        if (M.finalLap) {
          c = gridAt(s.drums.ride, bar, st);
          if (c !== '.') dRide(P, stepTime(st), kit, (HITVEL[c] || 0.7) * 0.9);
        }
      }
    }

    /* ---- BASS ---- */
    if (M.stemLevel.bass > 0.02) {
      var B = stemGain.bass;
      var brow = s.bass[bip % s.bass.length][beat];
      // bring the chord root into a fixed bass octave, then apply the written
      // degree (so the octave pops in the pattern survive)
      var broot = root + ch[0];
      while (broot > root - 5) broot -= 12;
      while (broot < root - 17) broot += 12;
      for (i = 0; i < brow.length; i++) {
        var be = brow[i];
        var bm = broot + be.n;
        var bt = stepTime(be.s), bd = be.d * s16 * 0.92;
        bassVoice(B, bt, bm, bd, s.bassVoice, be.v);
      }
    }

    /* ---- PAD ---- */
    if (M.stemLevel.pad > 0.02 && beat === 0) {
      var PAD = stemGain.pad;
      var pdur = spb * 4 * 0.98;
      padVoice(PAD, t, root, tones, pdur, s.padVoice, s);
    }

    /* ---- ARP ---- */
    if (M.stemLevel.arp > 0.02) {
      var AR = stemGain.arp, ap = s.arp;
      var stepEvery = ap.rate;   // in 16ths
      for (i = 0; i < 4; i++) {
        st = beat * 4 + i;
        if (st % stepEvery !== 0) continue;
        var gi = Math.floor((bar * 16 + st) / stepEvery);
        var si = ap.steps[gi % ap.steps.length];
        var ti = si % tones.length;
        var oc = Math.floor(si / tones.length) * 12;
        var am = root + tones[ti] + oc + (ap.oct || 12);
        arpVoice(AR, stepTime(st), am, s16 * ap.len * 0.95, s.arpVoice);
      }
    }

    /* ---- LEAD + COUNTER ---- */
    var leadOn = M.stemLevel.lead > 0.02, cntOn = M.stemLevel.counter > 0.02;
    if (leadOn || cntOn) {
      var lrow = s.lead[bip % s.lead.length][beat];
      for (i = 0; i < lrow.length; i++) {
        var le = lrow[i];
        var lt = stepTime(le.s), ld = le.d * s16 * 0.94;
        if (leadOn) leadVoice(stemGain.lead, lt, root + le.n, ld, s.leadVoice, le.v, s);
        if (cntOn) {
          var h = harmonizeBelow(le.n, tones);
          counterVoice(stemGain.counter, lt, root + h, ld, s.counterVoice, le.v, s);
        }
      }
    }

    /* ---- FX ---- */
    if (M.stemLevel.fx > 0.02 && beat === 0) {
      if (bip === phrase - 2) scheduleRiser(t, 2);
      else if (bip === 0 || bip === phrase / 2) scheduleImpact(t);
      else if (bip % 4 === 3) {
        vNoise(stemGain.fx, t, spb * 2, { hp: 5000, sweep: 400, gain: 0.10, rev: 0.5, pri: 1 });
      }
    }
  }

  /* --- per-role voice dispatch --------------------------------------------- */
  function bassVoice(dest, t, midi, dur, kind, vel) {
    var f = mtof(midi), v = (vel === undefined ? 1 : vel);
    switch (kind) {
      case 'funkbass':
        vOsc(dest, t, f, dur, { wave: 'saw', gain: 0.34 * v, cut: 620, cutEnv: 0.35, cutT: dur * 0.5, q: 3.4, atk: 0.004, dec: 0.06, sus: 0.65, rel: 0.05, pri: 0 });
        vOsc(dest, t, f * 0.5, dur, { type: 'sine', gain: 0.17 * v, atk: 0.006, dec: 0.04, sus: 0.85, rel: 0.05, pri: 0 });
        break;
      case 'rollbass':
        vOsc(dest, t, f, dur, { wave: 'saw', gain: 0.30 * v, cut: 380, q: 2.2, atk: 0.004, dec: 0.05, sus: 0.7, rel: 0.04, pri: 0 });
        vOsc(dest, t, f * 0.5, dur, { type: 'sine', gain: 0.18 * v, atk: 0.005, dec: 0.03, sus: 0.9, rel: 0.05, pri: 0 });
        break;
      case 'rockbass':
        vOsc(dest, t, f, dur, { wave: 'saw', gain: 0.30 * v, cut: 900, cutEnv: 0.4, cutT: dur * 0.4, q: 1.8, atk: 0.003, dec: 0.08, sus: 0.6, rel: 0.05, pri: 0 });
        vOsc(dest, t, f * 0.5, dur, { type: 'sine', gain: 0.16 * v, atk: 0.005, dec: 0.05, sus: 0.85, rel: 0.05, pri: 0 });
        break;
      default: /* subsaw */
        vOsc(dest, t, f, dur, { wave: 'saw', gain: 0.26 * v, cut: 520, q: 1.6, atk: 0.005, dec: 0.07, sus: 0.72, rel: 0.06, pri: 0 });
        vOsc(dest, t, f * 0.5, dur, { type: 'sine', gain: 0.19 * v, atk: 0.006, dec: 0.05, sus: 0.9, rel: 0.07, pri: 0 });
    }
  }

  /* The whole pad chord shares ONE filter and ONE gain — the oscillators are
   * the only per-note cost. A 4-note warm-saw pad is 8 oscillators + 3 nodes
   * rather than 8 separate voices with their own filters and envelopes. */
  function padVoice(dest, t, root, tones, dur, kind, song) {
    if (!budgetOk(1)) return;
    var rev = song.revMix || 0.3;
    var n = Math.min(4, tones.length);
    var g = ctx.createGain(), sum = ctx.createGain();
    var cut = kind === 'organ' ? 3200 : (kind === 'strings' ? 2600 : 2100);
    var f = svf('lowpass', cut, 0.6, 2);
    sum.gain.value = 1 / Math.sqrt(n * (kind === 'warmsaw' ? 2 : 1));
    sum.connect(f.in); f.out.connect(g); g.connect(dest);
    connectSends(g, rev, 0);
    // slow LFO on the cutoff so the pad breathes instead of sitting still
    if (fltBus) { try { fltBus[0].connect(f.freq); } catch (e) {} }
    var count = 2 + f.n, oscs = [], i, osc;
    for (i = 0; i < n; i++) {
      var fr = mtof(root + tones[i] + 12);
      if (kind === 'warmsaw') {
        for (var dtv = -6; dtv <= 7; dtv += 13) {
          osc = ctx.createOscillator();
          osc.setPeriodicWave(periodic('saw'));
          osc.frequency.value = fr; osc.detune.value = dtv;
          osc.connect(sum); osc.start(t); oscs.push(osc); count++;
        }
      } else {
        osc = ctx.createOscillator();
        osc.setPeriodicWave(periodic(kind === 'organ' ? 'organ' : 'strings'));
        osc.frequency.value = fr;
        osc.detune.value = (i % 2 ? 4 : -4);
        if (kind === 'strings' && vibBus) { try { vibBus[0].connect(osc.detune); } catch (e) {} }
        osc.connect(sum); osc.start(t); oscs.push(osc); count++;
      }
    }
    var atk = kind === 'organ' ? 0.03 : (kind === 'strings' ? 0.28 : 0.15);
    var rel = kind === 'organ' ? 0.22 : (kind === 'strings' ? 0.6 : 0.45);
    var peak = kind === 'organ' ? 0.20 : 0.17;
    var tail = env(g, t, peak, atk, 0.18, 0.85, rel, dur);
    for (i = 1; i < oscs.length; i++) { try { oscs[i].stop(tail); } catch (e) {} }
    reg(oscs[0], count, tail, function () {
      if (fltBus) { try { fltBus[0].disconnect(f.freq); } catch (e) {} }
      if (kind === 'strings' && vibBus) {
        for (var j = 0; j < oscs.length; j++) { try { vibBus[0].disconnect(oscs[j].detune); } catch (e) {} }
      }
    });
  }

  function arpVoice(dest, t, midi, dur, kind) {
    var f = mtof(midi);
    switch (kind) {
      case 'trancepluck':
        vOsc(dest, t, f, dur, { wave: 'saw', gain: 0.17, cut: 4200, cutEnv: 0.14, cutT: dur * 1.4, cutLfo: 1, q: 5.0, atk: 0.003, dec: 0.09, sus: 0.16, rel: 0.09, dly: 0.24, rev: 0.22, pri: 1 });
        break;
      case 'glass':
        vFM(dest, t, f, dur, { ratio: 3.5, index: 1.6, idxT: 0.12, gain: 0.13, atk: 0.004, dec: 0.12, sus: 0.2, rel: 0.2, rev: 0.4, dly: 0.2, pri: 1 });
        break;
      case 'pulse':
        vOsc(dest, t, f, dur, { wave: 'pulse25', gain: 0.10, cut: 3600, cutLfo: 1, q: 1.0, atk: 0.004, dec: 0.06, sus: 0.5, rel: 0.06, dly: 0.26, pri: 1 });
        break;
      default: /* pluck */
        vPluck(dest, t, midi, dur, { gain: 0.20, bright: 0.6, decay: 0.9, cut: 4500, rev: 0.22, dly: 0.16, pri: 1 });
    }
  }

  function leadVoice(dest, t, midi, dur, kind, vel, song) {
    var f = mtof(midi), v = (vel === undefined ? 1 : vel);
    var rev = song.revMix || 0.3, dly = song.dlyMix || 0.2;
    switch (kind) {
      case 'supersaw':
        vSuper(dest, t, f, dur, { gain: 0.16 * v, cut: 4200, cutEnv: 1, cutT: 0.3, q: 1.0, detune: 22, atk: 0.02, dec: 0.15, sus: 0.82, rel: 0.30, rev: rev, dly: dly, count: 7 });
        break;
      case 'sawlead':
        vOsc(dest, t, f, dur, { wave: 'saw', gain: 0.17 * v, cut: 3400, q: 2.0, atk: 0.02, dec: 0.12, sus: 0.8, rel: 0.28, vib: 11, vibRate: 5.2, vibDelay: 0.22, rev: rev, dly: dly });
        vOsc(dest, t, f, dur, { wave: 'saw', gain: 0.10 * v, detune: -9, cut: 2800, q: 1.4, atk: 0.03, dec: 0.12, sus: 0.8, rel: 0.28 });
        break;
      case 'brasslead':
        vOsc(dest, t, f, dur, { wave: 'brass', gain: 0.17 * v, cut: 3000, cutEnv: 1.6, cutT: 0.09, q: 1.4, atk: 0.018, dec: 0.1, sus: 0.82, rel: 0.2, vib: 7, vibRate: 5.0, rev: rev, dly: dly });
        vOsc(dest, t, f * 2, dur, { wave: 'brass', gain: 0.055 * v, cut: 5200, atk: 0.03, dec: 0.1, sus: 0.7, rel: 0.2 });
        break;
      case 'pulse':
        vOsc(dest, t, f, dur, { wave: 'pulse25', gain: 0.15 * v, cut: 5200, q: 0.8, atk: 0.006, dec: 0.07, sus: 0.72, rel: 0.12, vib: 9, vibRate: 6.4, vibDelay: 0.12, rev: rev, dly: dly });
        vOsc(dest, t, f * 2.005, dur, { wave: 'pulse12', gain: 0.05 * v, atk: 0.01, dec: 0.08, sus: 0.6, rel: 0.12 });
        break;
      case 'clav':
        vOsc(dest, t, f, dur, { wave: 'clav', gain: 0.16 * v, cut: 3800, cutEnv: 0.28, cutT: dur * 0.7, q: 4.0, atk: 0.003, dec: 0.08, sus: 0.36, rel: 0.09, rev: rev, dly: dly });
        break;
      case 'nylon':
        vPluck(dest, t, midi, dur, { gain: 0.34 * v, bright: 0.72, decay: 1.5, cut: 5200, rev: rev, dly: dly, pri: 0 });
        vOsc(dest, t, f, Math.min(dur, 0.3), { wave: 'nylon', gain: 0.05 * v, atk: 0.004, dec: 0.08, sus: 0.3, rel: 0.1 });
        break;
      case 'surfgtr':
        vPluck(dest, t, midi, dur, { gain: 0.30 * v, bright: 0.86, decay: 1.6, cut: 6000, rev: rev + 0.2, dly: dly, pri: 0 });
        vOsc(dest, t, f, Math.min(dur, 0.4), { wave: 'saw', gain: 0.045 * v, cut: 2400, q: 2.4, atk: 0.006, dec: 0.1, sus: 0.3, rel: 0.12, vib: 14, vibRate: 5.6, vibDelay: 0.1 });
        break;
      case 'rhodes':
        vFM(dest, t, f, dur, { ratio: 2.0, index: 1.1, idxT: 0.22, gain: 0.22 * v, atk: 0.006, dec: 0.2, sus: 0.42, rel: 0.35, rev: rev, dly: dly });
        break;
      default:
        vOsc(dest, t, f, dur, { wave: 'saw', gain: 0.16 * v, cut: 3200, q: 1.6, atk: 0.015, dec: 0.1, sus: 0.8, rel: 0.2, rev: rev, dly: dly });
    }
  }

  function counterVoice(dest, t, midi, dur, kind, vel, song) {
    var f = mtof(midi), v = (vel === undefined ? 1 : vel) * 0.8;
    var rev = (song.revMix || 0.3) * 0.8;
    switch (kind) {
      case 'fmbell':
        vFM(dest, t, f, dur, { ratio: 2.01, index: 1.4, idxT: 0.2, gain: 0.11 * v, atk: 0.01, dec: 0.18, sus: 0.4, rel: 0.3, rev: rev, dly: 0.24, pri: 1 });
        break;
      case 'sqlead':
        vOsc(dest, t, f, dur, { wave: 'pulse25', gain: 0.09 * v, cut: 2800, q: 1.2, atk: 0.012, dec: 0.1, sus: 0.7, rel: 0.18, rev: rev, pri: 1 });
        break;
      case 'organ':
        vOsc(dest, t, f, dur, { wave: 'organ', gain: 0.10 * v, cut: 2600, q: 0.7, atk: 0.012, dec: 0.08, sus: 0.8, rel: 0.16, rev: rev, pri: 1 });
        break;
      case 'glass':
        vFM(dest, t, f, dur, { ratio: 3.01, index: 1.2, idxT: 0.14, gain: 0.09 * v, atk: 0.006, dec: 0.14, sus: 0.28, rel: 0.26, rev: rev + 0.15, dly: 0.2, pri: 1 });
        break;
      case 'dirtysaw':
        vOsc(dest, t, f, dur, { wave: 'saw', gain: 0.10 * v, cut: 2200, q: 3.0, atk: 0.008, dec: 0.1, sus: 0.72, rel: 0.16, rev: rev, pri: 1 });
        vOsc(dest, t, f, dur, { wave: 'saw', gain: 0.06 * v, detune: 12, cut: 1800, q: 2.0, atk: 0.01, dec: 0.1, sus: 0.7, rel: 0.16, pri: 1 });
        break;
      case 'brasslead':
        vOsc(dest, t, f, dur, { wave: 'brass', gain: 0.11 * v, cut: 2600, q: 1.2, atk: 0.016, dec: 0.1, sus: 0.8, rel: 0.2, rev: rev, pri: 1 });
        break;
      default: /* pluck */
        vPluck(dest, t, midi, dur, { gain: 0.16 * v, bright: 0.5, decay: 1.0, cut: 3600, rev: rev, dly: 0.2, pri: 1 });
    }
  }

  /* --- transport ------------------------------------------------------------ */
  function advanceBeat() {
    M.nextBeatTime += M.spb;
    M.beat++;
    if (M.beat % 4 === 0) {
      // bar boundary: apply pending tempo / key / stem changes
      if (M.pendingFinalLap !== null) {
        M.finalLap = M.pendingFinalLap;
        M.targetTranspose = M.finalLap ? 1 : 0;
        M.pendingFinalLap = null;
        if (M.finalLap) M.riserArmed = true;
      }
      M.transpose = M.targetTranspose;
      M.bpm = tempoNow();
      M.spb = 60 / M.bpm;
      applyStems(M.nextBeatTime);
      updateDelayTime(M.nextBeatTime);
      if (M.riserArmed) {
        M.riserArmed = false;
        scheduleRiser(M.nextBeatTime, 1);
      }
    }
  }

  function updateDelayTime(t) {
    if (!dlyL || !M.song) return;
    var d = M.spb * (M.song.dlyDiv || 0.75);
    try {
      dlyL.delayTime.setTargetAtTime(d, t, 0.05);
      dlyR.delayTime.setTargetAtTime(d * 1.5, t, 0.05);
    } catch (e) {}
  }

  function tick() {
    if (!ready || !M.playing || !M.song) return;
    try {
      var now = ctx.currentTime;
      var guard = 0;
      while (M.nextBeatTime < now + LOOKAHEAD && guard++ < 64) {
        scheduleBeat(M.nextBeatTime, M.beat);
        advanceBeat();
      }
    } catch (e) { /* never let audio kill the frame */ }
  }

  function startScheduler() {
    if (offline) return;
    if (schedTimer) clearInterval(schedTimer);
    schedTimer = setInterval(tick, TICK_MS);
  }
  function stopScheduler() {
    if (schedTimer) { clearInterval(schedTimer); schedTimer = null; }
  }

  // In an OfflineAudioContext we pre-schedule the whole timeline. `offlineAuto`
  // is an optional per-bar callback so an offline render can still sweep
  // intensity / toggle finalLap over time (used by the render-and-listen test).
  var offlineAuto = null, filling = false;
  function offlineFill() {
    if (filling) return;        // re-entrancy guard: setMusic/finalLap called
    filling = true;             // from inside the fill loop must not recurse
    try {
      var guard = 0;
      while (M.playing && M.nextBeatTime < offlineHorizon && guard++ < 20000) {
        if (offlineAuto && M.beat % 4 === 0) {
          try { offlineAuto(Math.floor(M.beat / 4), M.nextBeatTime); } catch (e) {}
        }
        scheduleBeat(M.nextBeatTime, M.beat);
        advanceBeat();
      }
    } finally { filling = false; }
  }

  /* ===========================================================================
   * 11.  SFX
   * ========================================================================= */

  function sfxDest(pan) {
    if (!pan || !ctx.createStereoPanner) return sfxGain;
    var p = ctx.createStereoPanner();
    p.pan.value = clamp(pan, -1, 1);
    p.connect(sfxGain);
    bump(1);
    // panners are per-shot; free them after 4s (offline renders are GC'd whole)
    if (!offline) setTimeout(function () { try { p.disconnect(); } catch (e) {} unbump(1); }, 2500);
    return p;
  }

  function noiseHit(dest, t, dur, o) {
    o = o || {}; o.pri = o.pri === undefined ? 1 : o.pri;
    return vNoise(dest, t, dur, o);
  }

  function beep(dest, t, f, dur, g, wave, o) {
    o = o || {};
    vOsc(dest, t, f, dur, {
      wave: wave || 'square', gain: g, atk: o.atk || 0.005, dec: o.dec || 0.04,
      sus: o.sus === undefined ? 0.7 : o.sus, rel: o.rel || 0.06,
      cut: o.cut, q: o.q, glide: o.glide, glideT: o.glideT, rev: o.rev || 0, dly: o.dly || 0, pri: 0
    });
  }

  function sweep(dest, t, f0, f1, dur, g, wave, o) {
    o = o || {};
    if (!budgetOk(0)) return;
    var osc = ctx.createOscillator(), gn = ctx.createGain();
    if (wave === 'sine' || wave === 'triangle' || wave === 'sawtooth' || wave === 'square') osc.type = wave;
    else osc.setPeriodicWave(periodic(wave || 'saw'));
    gAt(osc.frequency, t, f0);
    gExp(osc.frequency, t + dur, Math.max(20, f1));
    var node = osc, n = 2;
    if (o.cut) { var f = svf('lowpass', o.cut, o.q || 1); n += f.n; osc.connect(f.in); f.out.connect(gn); }
    else osc.connect(gn);
    gn.connect(dest);
    n += connectSends(gn, o.rev || 0, o.dly || 0);
    var tail = penv(gn, t, g, o.atk || 0.004, dur);
    osc.start(t);
    reg(osc, n, tail);
  }

  var SFX = {
    countdown: function (d, t, o) {
      var n = o.n === undefined ? 3 : o.n;
      beep(d, t, 660 * Math.pow(2, (3 - n) / 12), 0.14, 0.30, 'square', { rel: 0.10, rev: 0.2 });
      beep(d, t, 1320, 0.05, 0.10, 'sine', { rel: 0.05 });
    },
    go: function (d, t) {
      beep(d, t, 880, 0.30, 0.34, 'brass', { atk: 0.006, rel: 0.30, rev: 0.35 });
      beep(d, t, 1320, 0.30, 0.20, 'brass', { atk: 0.01, rel: 0.30 });
      sweep(d, t, 300, 2400, 0.22, 0.20, 'saw', { cut: 4000, rev: 0.3 });
      noiseHit(d, t, 0.5, { hp: 900, sweep: 6000, gain: 0.16, rev: 0.4 });
    },
    engineStart: function (d, t) {
      sweep(d, t, 40, 120, 0.42, 0.26, 'saw', { cut: 900, q: 3 });
      noiseHit(d, t, 0.5, { lp: 1400, gain: 0.14 });
      sweep(d, t + 0.36, 110, 88, 0.5, 0.18, 'saw', { cut: 1200, q: 2 });
    },
    drift: function (d, t, o) {
      // measured at -36 dBFS peak in the first render — inaudible under an
      // engine and a full mix. Wider band, more gain, plus a low body layer.
      noiseHit(d, t, o.dur || 0.28, { bp: 2400, q: 1.4, gain: 0.42, rate: 1.4 });
      noiseHit(d, t, o.dur || 0.28, { bp: 700, q: 1.8, gain: 0.20, rate: 1.1 });
    },
    driftBoost1: function (d, t) { driftBoost(d, t, 1); },
    driftBoost2: function (d, t) { driftBoost(d, t, 2); },
    driftBoost3: function (d, t) { driftBoost(d, t, 3); },
    itemBox: function (d, t) {
      beep(d, t, 1046, 0.07, 0.16, 'glass', { rel: 0.08, rev: 0.35 });
      beep(d, t + 0.06, 1318, 0.07, 0.16, 'glass', { rel: 0.08, rev: 0.35 });
      beep(d, t + 0.12, 1568, 0.16, 0.18, 'glass', { rel: 0.22, rev: 0.4 });
      noiseHit(d, t, 0.2, { hp: 6000, gain: 0.08 });
    },
    itemGet: function (d, t) {
      var ns = [784, 988, 1175, 1568];
      for (var i = 0; i < ns.length; i++) beep(d, t + i * 0.045, ns[i], 0.10, 0.14, 'glass', { rel: 0.12, rev: 0.3 });
    },
    itemUse: function (d, t) {
      sweep(d, t, 900, 2600, 0.16, 0.20, 'square', { cut: 5000, rev: 0.2 });
      noiseHit(d, t, 0.14, { hp: 2000, gain: 0.10 });
    },
    missile: function (d, t) {
      sweep(d, t, 320, 1500, 0.55, 0.20, 'saw', { cut: 3000, q: 2, rev: 0.25 });
      noiseHit(d, t, 0.6, { bp: 1800, q: 1.2, sweep: 5200, gain: 0.14 });
    },
    missileHit: function (d, t) { SFX.explode(d, t, {}); beep(d, t, 220, 0.2, 0.2, 'square', { glide: 3, glideT: 0.1, rel: 0.2 }); },
    explode: function (d, t) {
      noiseHit(d, t, 0.62, { lp: 5200, sweep: 200, gain: 0.34, rev: 0.5 });
      sweep(d, t, 180, 34, 0.55, 0.32, 'sine');
      sweep(d, t, 420, 60, 0.30, 0.18, 'square', { cut: 1400 });
    },
    shield: function (d, t) {
      sweep(d, t, 400, 1400, 0.30, 0.16, 'glass', { rev: 0.45 });
      vFM(d, t, 660, 0.5, { ratio: 1.5, index: 1.6, gain: 0.14, atk: 0.02, dec: 0.2, sus: 0.4, rel: 0.4, rev: 0.5 });
    },
    shieldBreak: function (d, t) {
      noiseHit(d, t, 0.32, { hp: 3000, sweep: 9000, gain: 0.22, rev: 0.4 });
      for (var i = 0; i < 4; i++) beep(d, t + i * 0.02, 1800 - i * 260, 0.10, 0.10, 'glass', { rel: 0.14 });
    },
    zap: function (d, t) {
      for (var i = 0; i < 5; i++) sweep(d, t + i * 0.025, 3000 - i * 340, 600, 0.09, 0.16, 'square', { cut: 6000 });
      noiseHit(d, t, 0.3, { hp: 2600, gain: 0.18, rev: 0.4 });
    },
    hit: function (d, t) {
      sweep(d, t, 260, 60, 0.28, 0.30, 'square', { cut: 1600 });
      noiseHit(d, t, 0.26, { lp: 2400, gain: 0.22 });
    },
    bump: function (d, t, o) {
      var f = o.force === undefined ? 1 : clamp(o.force, 0.2, 1.6);
      sweep(d, t, 180 * f, 52, 0.16, 0.30 * f, 'sine');
      noiseHit(d, t, 0.10, { lp: 2600, gain: 0.26 * f });
    },
    scrape: function (d, t, o) {
      noiseHit(d, t, o.dur || 0.22, { bp: 3200, q: 2.2, gain: 0.40, rate: 0.8 });
      noiseHit(d, t, o.dur || 0.22, { bp: 900, q: 3.0, gain: 0.30 });
    },
    offroad: function (d, t, o) {
      noiseHit(d, t, o.dur || 0.30, { lp: 1100, gain: 0.34, rate: 0.6 });
    },
    skid: function (d, t, o) {
      noiseHit(d, t, o.dur || 0.34, { bp: 1900, q: 1.6, gain: 0.46, rate: 1.1 });
    },
    jump: function (d, t) {
      sweep(d, t, 240, 900, 0.20, 0.18, 'square', { cut: 3000 });
      noiseHit(d, t, 0.12, { hp: 1800, gain: 0.07 });
    },
    land: function (d, t, o) {
      var h = o.hard ? 1.4 : 0.9;
      sweep(d, t, 200 * h, 48, 0.24, 0.30 * h, 'sine');
      noiseHit(d, t, 0.20, { lp: 2600, gain: 0.30 * h });
    },
    boostPad: function (d, t) {
      sweep(d, t, 420, 2200, 0.34, 0.24, 'saw', { cut: 5200, q: 1.5, rev: 0.35 });
      sweep(d, t, 210, 1100, 0.34, 0.14, 'square', { cut: 3000 });
      noiseHit(d, t, 0.40, { hp: 1200, sweep: 7000, gain: 0.14 });
    },
    coin: function (d, t) {
      beep(d, t, 1318, 0.05, 0.14, 'glass', { rel: 0.05 });
      beep(d, t + 0.05, 1976, 0.16, 0.14, 'glass', { rel: 0.2, rev: 0.3 });
    },
    lapDing: function (d, t) {
      beep(d, t, 1046, 0.12, 0.18, 'glass', { rel: 0.3, rev: 0.45 });
      beep(d, t + 0.09, 1568, 0.22, 0.18, 'glass', { rel: 0.4, rev: 0.45 });
    },
    finalLap: function (d, t) {
      var ns = [523, 659, 784, 1046];
      for (var i = 0; i < ns.length; i++) {
        beep(d, t + i * 0.09, ns[i], 0.16, 0.20, 'brass', { rel: 0.18, rev: 0.4 });
      }
      sweep(d, t, 300, 3200, 0.55, 0.16, 'saw', { cut: 6000, rev: 0.4 });
      noiseHit(d, t, 0.6, { hp: 500, sweep: 8000, gain: 0.16, shape: 'swell' });
    },
    finish: function (d, t) {
      var ns = [523, 659, 784, 1046, 1318];
      for (var i = 0; i < ns.length; i++) beep(d, t + i * 0.07, ns[i], 0.22, 0.20, 'brass', { rel: 0.35, rev: 0.45 });
      noiseHit(d, t, 0.9, { hp: 3000, gain: 0.12, rev: 0.6 });
    },
    win: function (d, t) {
      var ns = [523, 523, 523, 698, 659, 0, 698, 880];
      var ds = [0, 0.11, 0.22, 0.33, 0.55, 0, 0.78, 0.92];
      for (var i = 0; i < ns.length; i++) {
        if (!ns[i]) continue;
        beep(d, t + ds[i], ns[i], 0.18, 0.22, 'brass', { rel: 0.3, rev: 0.4 });
        beep(d, t + ds[i], ns[i] * 2, 0.18, 0.08, 'brass', { rel: 0.3 });
      }
    },
    lose: function (d, t) {
      var ns = [392, 370, 349, 262];
      for (var i = 0; i < ns.length; i++) beep(d, t + i * 0.16, ns[i], 0.24, 0.18, 'organ', { rel: 0.4, rev: 0.4 });
    },
    place: function (d, t, o) {
      var p = o.place || 1;
      beep(d, t, 440 * Math.pow(2, (9 - Math.min(8, p)) / 12), 0.16, 0.20, 'glass', { rel: 0.3, rev: 0.4 });
    },
    menuMove: function (d, t) { beep(d, t, 880, 0.03, 0.10, 'square', { rel: 0.04 }); },
    menuSelect: function (d, t) {
      beep(d, t, 660, 0.05, 0.14, 'square', { rel: 0.06 });
      beep(d, t + 0.05, 1320, 0.12, 0.14, 'glass', { rel: 0.16, rev: 0.3 });
    },
    menuBack: function (d, t) {
      beep(d, t, 520, 0.05, 0.12, 'square', { rel: 0.06 });
      beep(d, t + 0.05, 330, 0.12, 0.12, 'square', { rel: 0.14 });
    },
    unlock: function (d, t) {
      var ns = [523, 659, 784, 1046, 1318, 1568];
      for (var i = 0; i < ns.length; i++) beep(d, t + i * 0.06, ns[i], 0.14, 0.14, 'glass', { rel: 0.3, rev: 0.45 });
      noiseHit(d, t, 0.7, { hp: 4000, gain: 0.08, rev: 0.6 });
    },
    crowdCheer: function (d, t, o) {
      var dur = o.dur || 1.8;
      var g = noiseHit(d, t, dur, { bp: 1100, q: 0.6, gain: 0.34, shape: 'swell', rev: 0.5, rate: 0.5 });
      noiseHit(d, t, dur, { hp: 2600, gain: 0.13, shape: 'swell', rate: 0.7 });
    },
    record: function (d, t) {
      var ns = [784, 1046, 1318, 1568, 2093];
      for (var i = 0; i < ns.length; i++) beep(d, t + i * 0.05, ns[i], 0.18, 0.16, 'glass', { rel: 0.35, rev: 0.5 });
      sweep(d, t, 600, 4000, 0.4, 0.10, 'saw', { cut: 8000, rev: 0.5 });
    }
  };

  function driftBoost(d, t, stage) {
    var base = [0, 520, 660, 820][stage] || 520;
    sweep(d, t, base * 0.5, base * 3.2, 0.26 + stage * 0.05, 0.16 + stage * 0.04, 'saw', { cut: 5000, q: 1.6, rev: 0.3 });
    beep(d, t, base, 0.18, 0.14 + stage * 0.03, 'square', { rel: 0.22, cut: 4000 });
    beep(d, t, base * 1.5, 0.18, 0.08, 'glass', { rel: 0.24, rev: 0.35 });
    noiseHit(d, t, 0.34, { hp: 1600 + stage * 800, sweep: 8000, gain: 0.10 + stage * 0.03 });
    if (stage >= 3) noiseHit(d, t, 0.5, { bp: 3000, q: 1.5, sweep: 900, gain: 0.08, rev: 0.4 });
  }

  /* ===========================================================================
   * 12.  ENGINE VOICES
   * ========================================================================= */

  var ENGINE_KIND = {
    classic:  { base: 42, sawDet: 12, subMix: 0.55, noiseMix: 0.20, cut: 900 },
    hotrod:   { base: 38, sawDet: 20, subMix: 0.70, noiseMix: 0.28, cut: 800 },
    van:      { base: 34, sawDet: 8,  subMix: 0.80, noiseMix: 0.22, cut: 700 },
    bike:     { base: 58, sawDet: 16, subMix: 0.30, noiseMix: 0.16, cut: 1200 },
    hover:    { base: 46, sawDet: 26, subMix: 0.40, noiseMix: 0.40, cut: 1100 },
    truck:    { base: 30, sawDet: 10, subMix: 0.90, noiseMix: 0.26, cut: 620 },
    wedge:    { base: 48, sawDet: 14, subMix: 0.45, noiseMix: 0.18, cut: 1050 },
    buggy:    { base: 40, sawDet: 22, subMix: 0.60, noiseMix: 0.34, cut: 860 }
  };

  function makeEngine(slot, kind) {
    var K = ENGINE_KIND[kind] || ENGINE_KIND.classic;
    var e = { slot: slot, K: K, kind: kind, on: false, lastGear: 0, idle: 0, silentFor: 0, lastSeen: 0 };
    var t = ctx.currentTime;

    e.out = ctx.createGain(); e.out.gain.value = 0;
    e.pan = ctx.createStereoPanner ? ctx.createStereoPanner() : ctx.createGain();
    if (e.pan.pan) e.pan.pan.value = 0;
    e.out.connect(e.pan); e.pan.connect(engineGain);

    e.filt = svf('lowpass', K.cut, 1.4, 2);
    e.shaper = ctx.createWaveShaper(); e.shaper.curve = driveCurve(0.5);
    e.filt.out.connect(e.shaper); e.shaper.connect(e.out);

    // 2 detuned saws + a square sub + band-passed pink noise, straight into
    // the filter — no summing stage, to keep the per-kart node cost down.
    e.o1 = ctx.createOscillator(); e.o1.setPeriodicWave(periodic('saw'));
    e.o2 = ctx.createOscillator(); e.o2.setPeriodicWave(periodic('saw'));
    e.o2.detune.value = K.sawDet;
    e.sub = ctx.createOscillator(); e.sub.type = 'square';
    e.g1 = ctx.createGain(); e.g1.gain.value = 0.30;
    e.g2 = ctx.createGain(); e.g2.gain.value = 0.24;
    e.gs = ctx.createGain(); e.gs.gain.value = K.subMix * 0.17;
    e.o1.connect(e.g1); e.g1.connect(e.filt.in);
    e.o2.connect(e.g2); e.g2.connect(e.filt.in);
    e.sub.connect(e.gs); e.gs.connect(e.filt.in);

    e.noise = ctx.createBufferSource(); e.noise.buffer = pinkBuf; e.noise.loop = true;
    e.nf = ctx.createBiquadFilter(); e.nf.type = 'bandpass'; e.nf.frequency.value = 1200; e.nf.Q.value = 0.55;
    e.gn = ctx.createGain(); e.gn.gain.value = K.noiseMix * 0.30;
    e.noise.connect(e.nf); e.nf.connect(e.gn); e.gn.connect(e.filt.in);

    // boost whine layer (resonant peak on the filter does the shaping)
    e.whine = ctx.createOscillator(); e.whine.type = 'sawtooth';
    e.gw = ctx.createGain(); e.gw.gain.value = 0;
    e.whine.connect(e.gw); e.gw.connect(e.out);

    e.o1.frequency.value = K.base;
    e.o2.frequency.value = K.base;
    e.sub.frequency.value = K.base * 0.5;
    e.whine.frequency.value = 900;

    try {
      e.o1.start(t); e.o2.start(t); e.sub.start(t); e.noise.start(t); e.whine.start(t);
    } catch (err) {}

    e.nodeCount = 15;
    bump(e.nodeCount);
    engineNodes += e.nodeCount;
    engines[slot] = e;
    return e;
  }

  function killEngine(slot) {
    var e = engines[slot];
    if (!e) return;
    var t = ctx.currentTime;
    try {
      e.out.gain.cancelScheduledValues(t);
      e.out.gain.setValueAtTime(e.out.gain.value, t);
      e.out.gain.linearRampToValueAtTime(0, t + 0.06);
    } catch (err) {}
    var stopAt = t + 0.09;
    ['o1', 'o2', 'sub', 'noise', 'whine'].forEach(function (k) { try { e[k].stop(stopAt); } catch (err) {} });
    if (!offline) setTimeout(function () {
      ['o1', 'o2', 'sub', 'noise', 'whine', 'g1', 'g2', 'gs', 'gn', 'gw', 'nf', 'shaper', 'out', 'pan'].forEach(function (k) {
        try { e[k].disconnect(); } catch (err) {}
      });
      try { e.filt.in.disconnect(); e.filt.out.disconnect(); } catch (err) {}
    }, 200);
    unbump(e.nodeCount);
    engineNodes -= e.nodeCount;
    if (engineNodes < 0) engineNodes = 0;
    delete engines[slot];
  }

  /* ===========================================================================
   * 13.  PUBLIC API
   * ========================================================================= */

  var A = {};
  A.__bfx = true;
  A.ready = false;
  A.version = 'bfx-audio-1.0';
  A.ctx = null;
  A.stats = { nodes: 0, peak: 0, voices: 0, dropped: 0 };

  A.init = function (existingCtx, opts) {
    if (ready) return true;
    if (initFailed) return false;
    try {
      opts = opts || {};
      lowPower = !!opts.lowPower;
      if (existingCtx && typeof existingCtx.createGain === 'function') {
        ctx = existingCtx;
      } else {
        var AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) { initFailed = true; return false; }
        ctx = new AC({ latencyHint: 'interactive' });
      }
      offline = typeof ctx.startRendering === 'function' && !ctx.resume;
      if (typeof ctx.startRendering === 'function' && ctx.length !== undefined) offline = true;
      offlineHorizon = opts.renderSeconds || (offline && ctx.length ? ctx.length / ctx.sampleRate : 0);

      noiseBuf = makeNoise(2.0, 'white');
      pinkBuf = makeNoise(2.0, 'pink');
      buildGraph();
      // warm the common periodic waves so the first note never stutters
      ['saw', 'square', 'pulse25', 'organ', 'brass', 'glass', 'clav', 'strings', 'nylon', 'rhodes'].forEach(periodic);

      ready = true; A.ready = true; A.ctx = ctx;
      if (!offline && ctx.state === 'suspended') { try { ctx.resume(); } catch (e) {} }
      startScheduler();
      return true;
    } catch (e) {
      initFailed = true; ready = false; A.ready = false;
      return false;
    }
  };

  A.master = function (v) {
    vol.master = clamp(v === undefined ? vol.master : v, 0, 1.5);
    if (ready && !vol.muted) gTgt(masterGain.gain, ctx.currentTime, vol.master, 0.02);
    return vol.master;
  };
  A.musicVol = function (v) {
    vol.music = clamp(v === undefined ? vol.music : v, 0, 1.5);
    if (ready) gTgt(musicGain.gain, ctx.currentTime, vol.music, 0.03);
    return vol.music;
  };
  A.sfxVol = function (v) {
    vol.sfx = clamp(v === undefined ? vol.sfx : v, 0, 1.5);
    if (ready) {
      gTgt(sfxGain.gain, ctx.currentTime, vol.sfx, 0.03);
      gTgt(engineGain.gain, ctx.currentTime, vol.sfx * 0.55, 0.03);
    }
    return vol.sfx;
  };
  A.mute = function (b) {
    vol.muted = b === undefined ? !vol.muted : !!b;
    if (ready) gTgt(masterGain.gain, ctx.currentTime, vol.muted ? 0 : vol.master, 0.02);
    return vol.muted;
  };

  A.setMusic = function (id, opts) {
    if (!ready) return false;
    opts = opts || {};
    var key = songFor(id);
    if (!key) { A.stopMusic(opts.fade || 400); return false; }
    if (M.playing && M.id === key && !opts.restart) return true;
    try {
      var now = ctx.currentTime;
      var fadeOut = opts.fade === undefined ? 0.36 : opts.fade / 1000;
      if (M.playing) {
        // fade current stems out, then swap
        for (var i = 0; i < STEMS.length; i++) {
          var g = stemGain[STEMS[i].id];
          try {
            g.gain.cancelScheduledValues(now);
            g.gain.setValueAtTime(M.stemLevel[STEMS[i].id], now);
            g.gain.linearRampToValueAtTime(0, now + fadeOut);
          } catch (e) {}
          M.stemLevel[STEMS[i].id] = 0;
        }
      } else fadeOut = 0.02;

      var start = now + fadeOut + 0.05;
      M.id = key;
      M.song = SONGS[key];
      M.playing = true;
      M.finalLap = !!opts.finalLap;
      M.pendingFinalLap = null;
      M.transpose = M.targetTranspose = M.finalLap ? 1 : 0;
      M.intensity = opts.intensity === undefined ? M.intensity : clamp(opts.intensity, 0, 1);
      M.bpm = tempoNow();
      M.spb = 60 / M.bpm;
      M.beat = 0;
      M.nextBeatTime = start;
      M.startTime = start;
      M.riserArmed = false;
      for (var j = 0; j < STEMS.length; j++) M.stemLevel[STEMS[j].id] = 0;
      // set the first bar's stem gains and delay time before any note lands
      applyStems(start);
      updateDelayTime(start);
      if (revReturn) gTgt(revReturn.gain, now, 0.16 + (M.song.revMix || 0.3) * 0.34, 0.2);
      if (dlyReturn) gTgt(dlyReturn.gain, now, 0.10 + (M.song.dlyMix || 0.2) * 0.55, 0.2);
      if (offline) offlineFill(); else tick();
      return true;
    } catch (e) { return false; }
  };

  A.musicIntensity = function (v) {
    v = clamp(v === undefined ? M.intensity : v, 0, 1);
    M.intensity = v;
    // gains are applied on the next bar boundary by advanceBeat(); if we are
    // not playing, remember it for the next setMusic.
    return v;
  };

  A.finalLap = function (on) {
    on = !!on;
    if (on === M.finalLap && M.pendingFinalLap === null) return on;
    M.pendingFinalLap = on;
    if (!M.playing) { M.finalLap = on; M.targetTranspose = on ? 1 : 0; M.pendingFinalLap = null; }
    if (offline) { offlineFill(); }
    return on;
  };

  A.duck = function (v, ms) {
    if (!ready) return;
    v = clamp(v === undefined ? 0.45 : v, 0, 1);
    ms = ms === undefined ? 420 : ms;
    var t = ctx.currentTime;
    try {
      musicDuck.gain.cancelScheduledValues(t);
      musicDuck.gain.setValueAtTime(musicDuck.gain.value, t);
      musicDuck.gain.linearRampToValueAtTime(v, t + 0.05);
      musicDuck.gain.setValueAtTime(v, t + ms / 1000);
      musicDuck.gain.linearRampToValueAtTime(1, t + ms / 1000 + 0.35);
    } catch (e) {}
  };

  A.stopMusic = function (fadeMs) {
    if (!ready) return;
    var f = (fadeMs === undefined ? 600 : fadeMs) / 1000;
    var t = ctx.currentTime;
    for (var i = 0; i < STEMS.length; i++) {
      var g = stemGain[STEMS[i].id];
      try {
        g.gain.cancelScheduledValues(t);
        g.gain.setValueAtTime(M.stemLevel[STEMS[i].id], t);
        g.gain.linearRampToValueAtTime(0, t + Math.max(0.02, f));
      } catch (e) {}
      M.stemLevel[STEMS[i].id] = 0;
    }
    M.playing = false;
    M.id = null;
  };

  A.sfx = function (name, opts) {
    if (!ready) return false;
    // Hard gate before anything is allocated. The per-shot gain and panner
    // wrappers below are not budgetOk()-checked individually, so a burst of
    // sfx could otherwise walk straight past the ceiling.
    if (!offline && (liveNodes - engineNodes) >= MAX_LIVE) { voicesDropped++; return false; }
    try {
      opts = opts || {};
      var fn = SFX[name];
      if (!fn) return false;
      var t = ctx.currentTime + (opts.delay || 0) + 0.005;
      var dest = sfxDest(opts.pan);
      var v = opts.vol === undefined ? 1 : clamp(opts.vol, 0, 2);
      var pitch = opts.pitch === undefined ? 1 : clamp(opts.pitch, 0.4, 2.5);
      if (v < 0.999 || pitch !== 1) {
        var g = ctx.createGain(); g.gain.value = v;
        g.connect(dest);
        bump(1);
        if (!offline) setTimeout(function () { try { g.disconnect(); } catch (e) {} unbump(1); }, 2500);
        dest = g;
      }
      // pitch is applied by scaling frequencies inside the generators via opts
      var o = { vol: v, pitch: pitch, n: opts.n, place: opts.place, force: opts.force, hard: opts.hard, dur: opts.dur };
      if (pitch !== 1) {
        // cheap global pitch shift: temporarily wrap mtof-independent beeps by
        // scaling with a detuned duplicate is overkill — instead pass through
        // and let generators that care read opts.pitch.
        o.pitchScale = pitch;
      }
      withPitch(pitch, function () { fn(dest, t, o); });
      return true;
    } catch (e) { return false; }
  };

  // `pitch` is applied by temporarily scaling the frequency arguments of the
  // low-level helpers. Wrapping is simpler and safer than threading a scale
  // through every generator.
  var pitchScale = 1;
  function withPitch(p, fn) {
    if (p === 1) { fn(); return; }
    pitchScale = p;
    try { fn(); } finally { pitchScale = 1; }
  }
  // patch the primitive frequency entry points to honour pitchScale
  var _beep = beep, _sweep = sweep;
  beep = function (d, t, f, dur, g, wave, o) { return _beep(d, t, f * pitchScale, dur, g, wave, o); };
  sweep = function (d, t, f0, f1, dur, g, wave, o) { return _sweep(d, t, f0 * pitchScale, f1 * pitchScale, dur, g, wave, o); };

  A.engine = function (slot, s) {
    if (!ready) return;
    try {
      s = s || {};
      var e = engines[slot];
      if (!s.on) {
        if (e) {
          var t0 = ctx.currentTime;
          gTgt(e.out.gain, t0, 0, 0.05);
          e.silentFor = (e.silentFor || 0) + 1;
          if (e.silentFor > 40) killEngine(slot);
        }
        return;
      }
      var v0 = clamp(s.vol === undefined ? 1 : s.vol, 0, 1.5);
      if (!e) {
        // Only the loudest MAX_ENGINES karts get a real voice. The game feeds
        // a per-kart `vol` it has already distance-attenuated, so "loudest"
        // is "nearest" — quieter engines are silently culled and can steal a
        // slot back later if they become the nearest.
        var keys = Object.keys(engines);
        if (keys.length >= MAX_ENGINES) {
          var worstK = null, worstV = v0;
          for (var qi = 0; qi < keys.length; qi++) {
            var ev = engines[keys[qi]].lastVol;
            if (ev === undefined) ev = 1;
            if (ev < worstV) { worstV = ev; worstK = keys[qi]; }
          }
          if (worstK === null) return;      // everyone alive is louder than us
          killEngine(worstK);
        }
        e = makeEngine(slot, s.kind || 'classic');
      }
      e.lastVol = v0;
      e.silentFor = 0;
      // `at` lets an OfflineAudioContext sweep an engine over the timeline —
      // offline currentTime is always 0, so without it every setTargetAtTime
      // would collapse onto the same instant. Ignored in a realtime context.
      var t = (offline && typeof s.at === 'number') ? s.at : ctx.currentTime;
      var K = e.K;
      var rpm = clamp(s.rpm === undefined ? 0.3 : s.rpm, 0, 1);
      var load = clamp(s.load === undefined ? 0.5 : s.load, 0, 1);
      var boost = clamp(s.boost || 0, 0, 1);
      var v = v0;
      var pan = clamp(s.pan || 0, -1, 1);

      // 5 gears: pitch rises within a gear then drops on the shift
      var gears = 5;
      var g = Math.min(gears - 1, Math.floor(rpm * gears));
      var frac = rpm * gears - g;
      var f = K.base * Math.pow(1.20, g) * (0.82 + 0.52 * frac) * (1 + boost * 0.10);

      gTgt(e.o1.frequency, t, f, 0.035);
      gTgt(e.o2.frequency, t, f * 1.005, 0.035);
      gTgt(e.sub.frequency, t, f * 0.5, 0.05);
      gTgt(e.nf.frequency, t, 900 + rpm * 4200, 0.06);

      var cut = K.cut * (0.80 + load * 1.6) * (1 + rpm * 1.9) * (1 + boost * 0.6);
      cut = clamp(cut, 320, 13000);
      gTgt(e.filt.freq, t, cut, 0.05);
      if (e.filt.freq2) gTgt(e.filt.freq2, t, cut * 1.1, 0.05);

      var target = v * (0.18 + 0.36 * rpm + 0.12 * load);
      gTgt(e.out.gain, t, target, 0.05);
      if (e.pan.pan) gTgt(e.pan.pan, t, pan, 0.06);

      // boost whine
      gTgt(e.gw.gain, t, boost * v * 0.10, 0.08);
      gTgt(e.whine.frequency, t, 700 + boost * 2600 + rpm * 900, 0.10);

      // gear-shift blip
      if (g > e.lastGear) {
        var bt = t + 0.005;
        try {
          e.out.gain.cancelScheduledValues(bt);
          e.out.gain.setValueAtTime(target, bt);
          e.out.gain.linearRampToValueAtTime(target * 0.35, bt + 0.030);
          e.out.gain.linearRampToValueAtTime(target, bt + 0.095);
        } catch (err) {}
        gAt(e.filt.freq, bt, cut);
        gLin(e.filt.freq, bt + 0.03, cut * 0.45);
        gLin(e.filt.freq, bt + 0.10, cut);
      }
      e.lastGear = g;
    } catch (err) {}
  };

  A.stopEngines = function () {
    if (!ready) return;
    for (var k in engines) if (engines.hasOwnProperty(k)) killEngine(k);
  };

  A.listener = function (pos, fwd) {
    if (pos) { lisPos[0] = pos[0]; lisPos[1] = pos[1]; lisPos[2] = pos[2]; }
    if (fwd) {
      var l = Math.hypot(fwd[0], fwd[2]) || 1;
      lisFwd[0] = fwd[0] / l; lisFwd[2] = fwd[2] / l;
      // right = cross(up, fwd) with up = +Y  ->  (fwd.z, 0, -fwd.x)
      lisRight[0] = lisFwd[2]; lisRight[2] = -lisFwd[0];
    }
  };

  A.worldSfx = function (name, pos, opts) {
    if (!ready) return false;
    opts = opts || {};
    if (!pos) return A.sfx(name, opts);
    var dx = pos[0] - lisPos[0], dy = (pos[1] || 0) - lisPos[1], dz = pos[2] - lisPos[2];
    var d = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var maxD = opts.maxDistance || 140;
    if (d > maxD) return false;
    var atten = 1 / (1 + d * d / (28 * 28));
    var pan = clamp((dx * lisRight[0] + dz * lisRight[2]) / Math.max(6, d) * 1.1, -1, 1);
    return A.sfx(name, {
      vol: (opts.vol === undefined ? 1 : opts.vol) * atten,
      pan: pan,
      pitch: opts.pitch,
      delay: (opts.delay || 0) + Math.min(0.22, d / 340),
      n: opts.n, place: opts.place, force: opts.force, hard: opts.hard, dur: opts.dur
    });
  };

  A.suspend = function () {
    if (!ready || offline) return;
    stopScheduler();
    try { ctx.suspend(); } catch (e) {}
  };
  A.resume = function () {
    if (!ready || offline) return;
    try { ctx.resume(); } catch (e) {}
    if (M.playing) {
      // re-anchor the transport so we do not dump a burst of late notes
      var now = ctx.currentTime;
      if (M.nextBeatTime < now) M.nextBeatTime = now + 0.06;
    }
    startScheduler();
  };

  // --- introspection used by the self-test harness --------------------------
  A.nodeCount = function () { return liveNodes + fixedNodes; };
  A.peakNodes = function () { return peakNodes + fixedNodes; };
  A.debug = function () {
    A.stats.nodes = liveNodes + fixedNodes;
    A.stats.peak = peakNodes + fixedNodes;
    A.stats.voices = voicesStarted;
    A.stats.dropped = voicesDropped;
    return {
      nodes: liveNodes + fixedNodes, peak: peakNodes + fixedNodes,
      voiceNodes: liveNodes - engineNodes, engineNodes: engineNodes,
      fixedNodes: fixedNodes, maxNodes: MAX_LIVE, maxEngines: MAX_ENGINES,
      voices: voicesStarted, dropped: voicesDropped,
      music: M.id, bar: Math.floor(M.beat / 4), bpm: M.bpm,
      intensity: M.intensity, finalLap: M.finalLap, transpose: M.transpose,
      stems: JSON.parse(JSON.stringify(M.stemLevel)),
      state: ctx ? ctx.state : 'none'
    };
  };
  A.musicIds = function () { return Object.keys(SONGS).concat(Object.keys(MUSIC_ALIASES)); };
  A.sfxNames = function () { return Object.keys(SFX); };
  // Offline pre-scheduling hook (used by the render-and-listen self test)
  A._offlineAuto = function (fn) { offlineAuto = fn || null; };
  A._offlineFill = function (seconds, autoFn) {
    offlineHorizon = seconds;
    if (autoFn) offlineAuto = autoFn;
    if (offline) offlineFill();
    offlineAuto = null;
  };
  A.resetPeak = function () { peakNodes = liveNodes; voicesDropped = 0; voicesStarted = 0; };
  A._tick = tick;

  /* ===========================================================================
   * 14.  BLUFOX GAME LAYER
   *      Everything below is new for this build: the circuit map, the two
   *      continuous body voices (drift bed, barrier scrape), the intensity
   *      curve, and the facade that takes simulation.js's event vocabulary
   *      verbatim so game.js never has to know an SFX name.
   * ========================================================================= */

  /* --- circuit / screen -> song --------------------------------------------
   * data.js TRACKS order is locked, so index is the primary key. Names and
   * themes are accepted too, because the orchestrator may wire either. */
  var TRACK_SONGS = ['afterglow', 'megastore', 'lakeshore', 'frostbyte', 'canyon', 'gigabit'];
  var NAME_SONGS = {
    // circuit 0
    'chicagoafterglow': 'afterglow', 'afterglow': 'afterglow', 'neoncity': 'afterglow',
    // circuit 1
    'xfinitymegastore': 'megastore', 'megastore': 'megastore', 'retailremix': 'megastore',
    // circuit 2
    'lakefrontrush': 'lakeshore', 'lakefront': 'lakeshore', 'lakeshore': 'lakeshore',
    'coastalrun': 'lakeshore',
    // circuit 3
    'frostbytesummit': 'frostbyte', 'frostbyte': 'frostbyte', 'alpineice': 'frostbyte',
    // circuit 4
    'signalcanyon': 'canyon', 'canyon': 'canyon', 'desertheat': 'canyon',
    'fiberrun': 'canyon', 'fiber': 'canyon',
    // circuit 5
    'gigabitgalaxy': 'gigabit', 'gigabit': 'gigabit', 'orbitalcircuit': 'gigabit',
    // screens
    'menu': 'menu', 'main': 'menu', 'title': 'menu', 'home': 'menu', 'garage': 'menu',
    'circuits': 'menu', 'settings': 'menu', 'howto': 'menu', 'driver': 'menu',
    'results': 'results', 'standings': 'results', 'defeat': 'results', 'lose': 'results',
    'victory': 'victory', 'win': 'victory', 'podium': 'victory', 'champion': 'victory'
  };

  function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]/g, ''); }

  /* Replaces the stock resolver. Note the index-0 trap: `if (!id)` would have
     sent Chicago Afterglow to silence. */
  songFor = function (id) {
    if (id === null || id === undefined || id === '') return null;
    if (typeof id === 'number') {
      var i = id | 0;
      return (i >= 0 && i < TRACK_SONGS.length) ? TRACK_SONGS[i] : null;
    }
    if (SONGS[id]) return id;
    var k = NAME_SONGS[slug(id)];
    if (k && SONGS[k]) return k;
    if (MUSIC_ALIASES[id] && SONGS[MUSIC_ALIASES[id]]) return MUSIC_ALIASES[id];
    // a bare numeric string, e.g. setMusic('3')
    if (/^[0-5]$/.test(String(id))) return TRACK_SONGS[+id];
    return null;
  };

  A.trackSong = function (id) { return songFor(id); };
  A.musicId = function () { return M.id; };

  /* --- continuous body voices ----------------------------------------------
   * One looping noise source each, built once, never torn down, gain ramped.
   * Three nodes apiece and they are counted as fixed cost, so they can never
   * be stolen from and can never contribute to a click. */
  var loops = {};
  function bodyVoice(key, spec) {
    var v = loops[key];
    if (v) return v;
    if (!ready) return null;
    try {
      var src = ctx.createBufferSource();
      src.buffer = spec.pink ? pinkBuf : noiseBuf;
      src.loop = true;
      src.playbackRate.value = spec.rate || 1;
      var f = ctx.createBiquadFilter();
      f.type = spec.type || 'bandpass';
      f.frequency.value = spec.freq;
      f.Q.value = spec.q || 4;
      var g = ctx.createGain();
      g.gain.value = 0;
      src.connect(f); f.connect(g); g.connect(engineGain);
      src.start(offline ? 0 : ctx.currentTime);
      fixedNodes += 3;
      v = loops[key] = { src: src, f: f, g: g, lvl: 0 };
      return v;
    } catch (e) { return null; }
  }

  /* Drift bed. `level` 0..1 is how hard the kart is sliding; `charge` 0..1 is
     the mini-turbo charge, which opens the filter and adds the rising whistle
     that tells the player a boost is coming. */
  var driftCharge = 0, driftStage = 0;
  A.drift = function (level, charge) {
    if (!ready) return;
    var v = bodyVoice('drift', { freq: 1900, q: 1.4, rate: 1.05 });
    if (!v) return;
    level = clamp(level || 0, 0, 1);
    charge = clamp(charge === undefined ? 0 : charge, 0, 1);
    var t = ctx.currentTime;
    gTgt(v.g.gain, t, level * 0.62, level > v.lvl ? 0.03 : 0.09);
    gTgt(v.f.frequency, t, 1500 + charge * 2600 + level * 500, 0.06);
    gTgt(v.f.Q, t, 1.3 + charge * 1.8, 0.08);
    v.lvl = level;
    // stage chimes as the mini-turbo charges past each threshold
    var stage = charge >= 0.98 ? 3 : (charge >= 0.59 ? 2 : (charge >= 0.2 ? 1 : 0));
    if (level > 0.05 && stage > driftStage) A.sfx('driftCharge', { n: stage, vol: 0.9 });
    driftStage = level > 0.05 ? stage : 0;
    driftCharge = charge;
  };

  /* Barrier scrape. New for this build — the collision fix made rubbing the
     rail a real, sustained state instead of a thing that never happened. Sings
     higher and louder the faster you are grinding along it. */
  A.scrape = function (level, speed) {
    if (!ready) return;
    var v = bodyVoice('scrape', { freq: 3000, q: 2.2, rate: 0.85 });
    if (!v) return;
    level = clamp(level || 0, 0, 1);
    speed = Math.max(0, speed === undefined ? 45 : speed);
    var t = ctx.currentTime;
    gTgt(v.g.gain, t, level * 0.55, level > v.lvl ? 0.02 : 0.08);
    gTgt(v.f.frequency, t, 1800 + speed * 34, 0.05);
    v.src.playbackRate.setTargetAtTime(clamp(0.6 + speed / 90, 0.4, 1.9), t, 0.06);
    v.lvl = level;
  };

  function silenceLoops(fade) {
    for (var k in loops) if (loops.hasOwnProperty(k)) {
      try { gTgt(loops[k].g.gain, ctx.currentTime, 0, fade || 0.05); } catch (e) {}
      loops[k].lvl = 0;
    }
    driftStage = 0;
  }

  /* --- extra one-shots ------------------------------------------------------ */
  SFX.driftCharge = function (d, t, o) {
    var s = clamp(o.n || 1, 1, 3);
    beep(d, t, 760 * Math.pow(1.26, s), 0.06, 0.09 + 0.035 * s, 'glass', { rel: 0.09, rev: 0.28 });
    beep(d, t, 1520 * Math.pow(1.26, s), 0.04, 0.05, 'glass', { rel: 0.07 });
  };
  SFX.deadZone = function (d, t) {
    sweep(d, t, 900, 90, 0.42, 0.20, 'square', { cut: 2200, q: 2, rev: 0.35 });
    noiseHit(d, t, 0.40, { lp: 900, sweep: 160, gain: 0.16 });
  };
  SFX.empty = function (d, t) {
    beep(d, t, 330, 0.06, 0.10, 'square', { rel: 0.07 });
    beep(d, t + 0.06, 247, 0.14, 0.09, 'square', { rel: 0.16 });
  };

  /* --- intensity ------------------------------------------------------------
   * Jeff has asked for music that layers up as things get tense, the way a
   * Mario game does. Four inputs, weighted: how far into the race you are,
   * how badly you are doing, how fast you are going, and whether you are on
   * the edge (boosting or sliding). The result is smoothed so stems do not
   * flap in and out when a rival trades places with you every corner. */
  var inten = 0.25;
  A.raceIntensity = function (s) {
    s = s || {};
    var laps = s.laps || 3;
    var lap = clamp((s.lap || 1), 1, laps);
    var field = s.field || 8;
    var pos = clamp(s.position || 1, 1, field);
    var top = s.topSpeed || 55;

    // progress through the race: 0 at the line, 1 at the flag
    var prog = (lap - 1) / Math.max(1, laps - 1);
    // pressure: leading is calm-confident, mid-pack is the loudest place to be,
    // dead last with nothing to chase settles back down a little
    var rel = (pos - 1) / Math.max(1, field - 1);
    var pressure = 1 - Math.abs(rel - 0.45) * 1.25;

    var spd = clamp((s.speed || 0) / top, 0, 1);
    var edge = (s.boost ? 0.5 : 0) + (s.drift ? 0.3 : 0);

    var want = 0.20
      + prog * 0.34
      + clamp(pressure, 0, 1) * 0.20
      + spd * 0.18
      + clamp(edge, 0, 0.8) * 0.12;
    want = clamp(want, 0, 1);
    // one-pole smoothing, ~1.5s to settle at 60fps
    inten += (want - inten) * clamp(s.dt === undefined ? 0.02 : s.dt * 1.1, 0.002, 0.25);
    A.musicIntensity(inten);
    return inten;
  };
  A.intensity = function () { return M.intensity; };

  /* --- event facade ---------------------------------------------------------
   * Takes (text, type) straight off simulation.js's `emit()` so game.js can
   * forward race.events without translating anything. */
  A.countdown = function (n) {
    if (!ready) return;
    if (!n || n <= 0) { A.sfx('go'); A.duck(0.6, 420); return; }
    A.sfx('countdown', { n: clamp(n, 1, 3) });
  };

  A.lap = function (n, isFinal) {
    if (!ready) return;
    if (isFinal) { A.finalLap(true); A.sfx('finalLap'); A.duck(0.62, 700); }
    else A.sfx('lapDing');
  };

  A.item = function (kind) {
    switch (kind) {
      case 'box': case 'ready': A.sfx('itemBox'); break;
      case 'get': A.sfx('itemGet'); break;
      case 'boost': A.sfx('boostPad'); break;
      case 'shield': A.sfx('shield'); break;
      case 'pulse': A.sfx('zap'); break;
      case 'deadzone': A.sfx('deadZone'); break;
      case 'blocked': A.sfx('shieldBreak'); break;
      case 'empty': A.sfx('empty'); break;
      default: A.sfx('itemUse'); break;
    }
    return true;
  };

  A.hitBy = function (kind) {
    A.sfx('hit');
    if (kind === 'trap') A.sfx('explode', { vol: 0.7 });
    A.duck(0.7, 300);
    return true;
  };

  A.click = function (kind) {
    A.sfx(kind === 'back' ? 'menuBack' : (kind === 'move' ? 'menuMove' : 'menuSelect'));
    return true;
  };

  A.finishRace = function (place) {
    A.sfx('finish');
    A.sfx('crowdCheer', { delay: 0.18, dur: 2.2, vol: place <= 3 ? 1 : 0.55 });
    if (place !== undefined) A.sfx('place', { place: place, delay: 0.9 });
  };

  /* The one call game.js needs for race feedback. Every string below is a
     literal emitted by simulation.js. */
  A.raceEvent = function (text, type) {
    if (!ready) return false;
    var s = String(text || '').toUpperCase();
    if (type === 'count') { A.countdown(s === 'GO!' ? 0 : parseInt(s, 10) || 0); return true; }
    if (type === 'lap') { A.lap(0, s.indexOf('FINAL') >= 0); return true; }
    if (type === 'hit') {
      // 'SCRAPE!' is the barrier. It is a knock plus a grind, not a crash --
      // the sustained rub underneath it is A.scrape(), driven per frame.
      if (s.indexOf('SCRAPE') >= 0) { A.sfx('bump', { force: 0.7 }); A.sfx('scrape', { dur: 0.3 }); return true; }
      A.hitBy('pulse'); return true;
    }
    if (type === 'boost') {
      if (s.indexOf('ULTRA') >= 0) return A.sfx('driftBoost3');
      if (s.indexOf('DRIFT') >= 0) return A.sfx('driftBoost2');
      if (s.indexOf('STRIP') >= 0) { A.sfx('boostPad'); return true; }
      A.duck(0.72, 320);
      // both layers, and the return value reports that the event was handled —
      // not whether the node budget happened to have room for the garnish.
      A.sfx('boostPad');
      A.sfx('itemUse', { vol: 0.7 });
      return true;
    }
    // 'info'
    if (s.indexOf('POWER-UP') >= 0) return A.item('box');
    if (s.indexOf('SHIELD BLOCKED') >= 0) return A.item('blocked');
    if (s.indexOf('SHIELD') >= 0) return A.item('shield');
    if (s.indexOf('PULSE HIT') >= 0) return A.item('pulse');
    if (s.indexOf('NO RIVAL') >= 0) return A.item('empty');
    if (s.indexOf('DEAD ZONE') >= 0) return A.item('deadzone');
    A.sfx('menuMove', { vol: 0.6 });
    return true;
  };

  /* A one-line drop-in for the old inline synth's `sound.update(speed, active)`
     call site in game.js, so wiring does not have to be surgery. Drives the
     player's own engine voice and, when given the race state, the intensity
     curve too. Rival engines still go through A.engine(slot, ...). */
  A.update = function (speed, active, s) {
    if (!ready) return;
    s = s || {};
    var top = s.topSpeed || 60;
    var rpm = clamp(speed / top, 0, 1);
    A.engine(0, {
      on: !!active, rpm: rpm, load: s.load === undefined ? 0.55 : s.load,
      boost: s.boost ? 1 : 0, vol: 1, pan: 0, kind: s.kind || 'classic'
    });
    if (active && s.lap) A.raceIntensity({
      position: s.position, field: s.field, lap: s.lap, laps: s.laps,
      speed: speed, topSpeed: top, boost: s.boost, drift: s.drift, dt: s.dt
    });
    if (s.drift !== undefined) A.drift(s.drift ? 1 : 0, s.driftCharge || 0);
    if (s.wallScrape !== undefined) A.scrape(clamp(s.wallScrape, 0, 1), speed);
  };

  /* --- lifecycle helpers ---------------------------------------------------- */
  A.unlock = function (opts) {
    var ok = A.init(undefined, opts);
    if (ok && ctx && ctx.state !== 'running') { try { ctx.resume(); } catch (e) {} }
    if (ok) startScheduler();
    return ok;
  };

  A.lowPower = function () { return lowPower; };
  A.budget = function (maxNodes, maxEngines) {
    if (typeof maxNodes === 'number') MAX_LIVE = Math.max(48, maxNodes | 0);
    if (typeof maxEngines === 'number') MAX_ENGINES = clamp(maxEngines | 0, 1, 8);
    return { maxNodes: MAX_LIVE, maxEngines: MAX_ENGINES };
  };

  A.stopAll = function (fadeMs) {
    if (!ready) return;
    A.stopMusic(fadeMs === undefined ? 400 : fadeMs);
    A.stopEngines();
    silenceLoops(0.06);
    A.finalLap(false);
    inten = 0.25;
  };

  // wrap suspend/resume so the body voices go quiet with everything else
  var _suspend = A.suspend;
  A.suspend = function () { if (ready) silenceLoops(0.03); _suspend(); };

  /* Defaults tuned for a phone running a 3D renderer on the same thread. */
  var _init = A.init;
  A.init = function (existingCtx, opts) {
    opts = opts || {};
    var ok = _init(existingCtx, opts);
    if (ok) {
      MAX_LIVE = typeof opts.maxNodes === 'number' ? Math.max(48, opts.maxNodes | 0)
        : (opts.lowPower ? 90 : 150);
      MAX_ENGINES = typeof opts.maxEngines === 'number' ? clamp(opts.maxEngines | 0, 1, 8)
        : (opts.lowPower ? 2 : 4);
    }
    return ok;
  };

  return A;
}

export default createAudio;
