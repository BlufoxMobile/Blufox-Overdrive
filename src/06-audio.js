function Nf() {
  "use strict";

  var n = Math.PI * 2;
  function e(M, _, T) {
    return M < _ ? _ : M > T ? T : M;
  }
  function t(M, _, T) {
    return M + (_ - M) * T;
  }
  function i(M, _, T) {
    var S = e((T - M) / (_ - M || 1e-6), 0, 1);
    return S * S * (3 - 2 * S);
  }
  function r(M) {
    return 440 * Math.pow(2, (M - 69) / 12);
  }
  function s(M) {
    return function () {
      ((M |= 0), (M = (M + 1831565813) | 0));
      var _ = Math.imul(M ^ (M >>> 15), 1 | M);
      return ((_ = (_ + Math.imul(_ ^ (_ >>> 7), 61 | _)) ^ _), ((_ ^ (_ >>> 14)) >>> 0) / 4294967296);
    };
  }
  var a = {
    maj: [0, 4, 7],
    min: [0, 3, 7],
    dim: [0, 3, 6],
    aug: [0, 4, 8],
    sus4: [0, 5, 7],
    sus2: [0, 2, 7],
    maj7: [0, 4, 7, 11],
    min7: [0, 3, 7, 10],
    dom7: [0, 4, 7, 10],
    min6: [0, 3, 7, 9],
    m7b5: [0, 3, 6, 10],
    maj9: [0, 4, 7, 11, 14],
    min9: [0, 3, 7, 10, 14],
    dom9: [0, 4, 7, 10, 14],
    add9: [0, 4, 7, 14],
    minadd9: [0, 3, 7, 14],
  };
  function o(M) {
    for (var _ = a[M[1]] || a.maj, T = new Array(_.length), S = 0; S < _.length; S++) T[S] = M[0] + _[S];
    return T;
  }
  function c(M, _) {
    for (var T = null, S = 1e9, E = -36; E <= 36; E += 12)
      for (var H = 0; H < _.length; H++) {
        var K = _[H] + E;
        if (!(K >= M - 1)) {
          var ne = M - K;
          ne >= 3 && ne < S && ((S = ne), (T = K));
        }
      }
    return T === null ? M - 12 : T;
  }
  function l(M, _) {
    _ = _ || 16;
    var T = new Array(_),
      S,
      E;
    for (S = 0; S < _; S++) {
      T[S] = [[], [], [], []];
      var H = M[S];
      if (H)
        for (E = 0; E < H.length; E++) {
          var K = H[E],
            ne = K[0] | 0;
          T[S][(ne >> 2) & 3].push({
            s: ne,
            d: K[1],
            n: K[2],
            v: K.length > 3 ? K[3] : 1,
          });
        }
    }
    return T;
  }
  function h(M, _) {
    for (var T = {}, S = 0; S < (_ || 16); S++) T[S] = M;
    return l(T, _ || 16);
  }
  function p(M) {
    return M;
  }
  function u(M, _, T) {
    return !M || !M.length ? "." : M[_ % M.length].charAt(T) || ".";
  }
  var f = {
      ".": 0,
      "-": 0.38,
      x: 0.82,
      X: 1,
      o: 0.9,
      O: 1,
    },
    g = {};
  ((g.menu = {
    name: "OVERDRIVE",
    bpm: 112,
    root: 48,
    phrase: 16,
    swing: 0,
    alwaysFull: !0,
    kit: "boom",
    padVoice: "warmsaw",
    leadVoice: "brasslead",
    counterVoice: "sqlead",
    bassVoice: "subsaw",
    arpVoice: "pluck",
    revMix: 0.3,
    dlyMix: 0.2,
    dlyDiv: 0.75,
    prog: [
      [0, "min"],
      [8, "maj"],
      [3, "maj"],
      [10, "maj"],
      [0, "min"],
      [8, "maj"],
      [5, "min"],
      [7, "maj"],
      [8, "maj"],
      [10, "maj"],
      [0, "minadd9"],
      [0, "min"],
      [8, "maj"],
      [10, "maj"],
      [3, "maj"],
      [7, "maj"],
    ],
    drums: {
      kick: ["X..x..X...x.X...", "X..x..X...x.X..x"],
      snare: ["....X.......X...", "....X.......X.xX"],
      hat: ["x-x-x-x-x-x-x-x-"],
      ohat: ["..o...o...o...o."],
      perc: ["....-..x....-.x."],
      ride: ["x.x.x.x.x.x.x.x."],
      fillBars: [7, 15],
    },
    bass: h([
      [0, 4, 0],
      [6, 2, 0],
      [8, 3, 0],
      [12, 2, 7],
      [14, 2, 12],
    ]),
    arp: {
      steps: [0, 1, 2, 3, 2, 1],
      rate: 2,
      oct: 12,
      len: 2,
    },
    lead: l({
      0: [
        [0, 3, 19],
        [3, 1, 24],
        [4, 4, 24],
        [8, 2, 22],
        [10, 2, 19],
        [12, 4, 15],
      ],
      1: [
        [0, 2, 17],
        [2, 2, 19],
        [4, 8, 20],
        [12, 4, 19],
      ],
      2: [
        [0, 2, 15],
        [2, 2, 19],
        [4, 4, 22],
        [8, 2, 24],
        [10, 2, 22],
        [12, 4, 19],
      ],
      3: [
        [0, 2, 17],
        [2, 2, 22],
        [4, 4, 26],
        [8, 2, 24],
        [10, 2, 22],
        [12, 4, 17],
      ],
      4: [
        [0, 3, 19],
        [3, 1, 24],
        [4, 4, 24],
        [8, 2, 22],
        [10, 2, 19],
        [12, 4, 15],
      ],
      5: [
        [0, 2, 17],
        [2, 2, 19],
        [4, 8, 20],
        [12, 4, 22],
      ],
      6: [
        [0, 2, 20],
        [2, 2, 24],
        [4, 8, 29],
        [12, 4, 27],
      ],
      7: [
        [0, 2, 26],
        [2, 2, 27],
        [4, 4, 26],
        [8, 2, 22],
        [10, 2, 19],
        [12, 4, 23],
      ],
      8: [
        [0, 6, 24],
        [6, 2, 27],
        [8, 8, 29],
      ],
      9: [
        [0, 4, 26],
        [4, 4, 29],
        [8, 8, 26],
      ],
      10: [
        [0, 4, 27],
        [4, 8, 31],
        [12, 4, 29],
      ],
      11: [
        [0, 8, 27],
        [8, 8, 24],
      ],
      12: [
        [0, 4, 24],
        [4, 4, 27],
        [8, 4, 29],
        [12, 4, 31],
      ],
      13: [
        [0, 8, 29],
        [8, 4, 26],
        [12, 4, 29],
      ],
      14: [
        [0, 8, 31],
        [8, 4, 27],
        [12, 4, 26],
      ],
      15: [
        [0, 4, 26],
        [4, 4, 24],
        [8, 4, 23],
        [12, 4, 26],
      ],
    }),
  }),
    (g.afterglow = {
      name: "CHICAGO AFTERGLOW",
      bpm: 112,
      root: 50,
      phrase: 16,
      swing: 0,
      kit: "retro",
      padVoice: "warmsaw",
      leadVoice: "sawlead",
      counterVoice: "fmbell",
      bassVoice: "subsaw",
      arpVoice: "pulse",
      revMix: 0.38,
      dlyMix: 0.34,
      dlyDiv: 0.75,
      prog: [
        [0, "min"],
        [8, "maj"],
        [3, "maj"],
        [10, "maj"],
        [0, "min"],
        [8, "maj"],
        [5, "min"],
        [7, "maj"],
        [8, "maj7"],
        [3, "maj"],
        [10, "maj"],
        [0, "minadd9"],
        [8, "maj"],
        [3, "maj"],
        [5, "min7"],
        [7, "maj"],
      ],
      drums: {
        kick: ["X.......X.......", "X.......X.....x."],
        snare: ["....X.......X..."],
        hat: ["..x...x...x...x-"],
        ohat: ["......o.......o."],
        perc: ["...-....-...-..."],
        ride: ["x.x.x.x.x.x.x.x."],
        fillBars: [7, 15],
      },
      bass: h([
        [0, 2, 0],
        [2, 2, 0],
        [4, 2, 0],
        [6, 2, 0],
        [8, 2, 0],
        [10, 2, 0],
        [12, 2, 0],
        [14, 2, 12],
      ]),
      arp: {
        steps: [0, 1, 2, 3, 4, 3, 2, 1],
        rate: 1,
        oct: 12,
        len: 1,
      },
      lead: l({
        0: [
          [0, 6, 19],
          [6, 10, 24],
        ],
        1: [
          [0, 4, 22],
          [4, 4, 24],
          [8, 8, 27],
        ],
        2: [
          [0, 4, 26],
          [4, 4, 24],
          [8, 8, 22],
        ],
        3: [
          [0, 8, 19],
          [8, 4, 22],
          [12, 4, 24],
        ],
        4: [
          [0, 6, 19],
          [6, 6, 24],
          [12, 4, 27],
        ],
        5: [
          [0, 8, 29],
          [8, 8, 27],
        ],
        6: [
          [0, 4, 24],
          [4, 4, 27],
          [8, 8, 29],
        ],
        7: [
          [0, 6, 26],
          [6, 6, 23],
          [12, 4, 26],
        ],
        8: [
          [0, 4, 27],
          [4, 4, 29],
          [8, 8, 31],
        ],
        9: [
          [0, 4, 31],
          [4, 4, 29],
          [8, 4, 27],
          [12, 4, 26],
        ],
        10: [
          [0, 8, 29],
          [8, 8, 26],
        ],
        11: [
          [0, 6, 27],
          [6, 10, 24],
        ],
        12: [
          [0, 4, 24],
          [4, 4, 27],
          [8, 8, 32],
        ],
        13: [
          [0, 8, 31],
          [8, 8, 27],
        ],
        14: [
          [0, 4, 29],
          [4, 4, 32],
          [8, 8, 31],
        ],
        15: [
          [0, 4, 26],
          [4, 4, 27],
          [8, 4, 26],
          [12, 4, 23],
        ],
      }),
    }),
    (g.megastore = {
      name: "XFINITY MEGASTORE",
      bpm: 124,
      root: 48,
      phrase: 16,
      swing: 0.055,
      kit: "house",
      padVoice: "organ",
      leadVoice: "clav",
      counterVoice: "organ",
      bassVoice: "funkbass",
      arpVoice: "pluck",
      revMix: 0.22,
      dlyMix: 0.22,
      dlyDiv: 0.75,
      prog: [
        [9, "min7"],
        [2, "min7"],
        [7, "dom9"],
        [0, "maj7"],
        [9, "min7"],
        [2, "min7"],
        [5, "maj7"],
        [7, "dom7"],
        [5, "maj7"],
        [7, "dom7"],
        [4, "min7"],
        [9, "min7"],
        [2, "min7"],
        [7, "dom9"],
        [0, "maj9"],
        [0, "maj7"],
      ],
      drums: {
        kick: ["X...X...X...X...", "X...X...X...X..x"],
        snare: ["....X.......X..."],
        hat: ["x-x-x-x-x-x-x-x-"],
        ohat: ["..o...o...o...o."],
        perc: ["..-.x..-..x.-..x", "..-.x..-..x.-.xx"],
        ride: ["x.x-x.x-x.x-x.x-"],
        fillBars: [7, 15],
      },
      bass: h([
        [0, 2, 0],
        [3, 1, 0],
        [6, 2, 12],
        [8, 2, 0],
        [11, 1, 7],
        [12, 2, 12],
        [14, 2, 10],
      ]),
      arp: {
        steps: [0, 2, 1, 3, 2, 0],
        rate: 1,
        oct: 12,
        len: 2,
      },
      lead: l({
        0: [
          [0, 2, 16],
          [3, 1, 19],
          [4, 3, 21],
          [8, 2, 24],
          [11, 1, 21],
          [12, 4, 19],
        ],
        1: [
          [0, 2, 17],
          [3, 1, 21],
          [4, 4, 26],
          [8, 2, 24],
          [10, 2, 21],
          [12, 4, 17],
        ],
        2: [
          [0, 2, 23],
          [2, 2, 26],
          [4, 4, 29],
          [8, 2, 26],
          [10, 2, 23],
          [12, 4, 19],
        ],
        3: [
          [0, 2, 24],
          [2, 2, 28],
          [4, 6, 31],
          [10, 2, 28],
          [12, 4, 24],
        ],
        4: [
          [0, 2, 16],
          [3, 1, 19],
          [4, 3, 21],
          [8, 2, 24],
          [11, 1, 21],
          [12, 4, 19],
        ],
        5: [
          [0, 2, 17],
          [3, 1, 21],
          [4, 4, 26],
          [8, 2, 24],
          [10, 2, 21],
          [12, 4, 17],
        ],
        6: [
          [0, 2, 21],
          [2, 2, 24],
          [4, 4, 28],
          [8, 4, 24],
          [12, 4, 21],
        ],
        7: [
          [0, 2, 26],
          [2, 2, 29],
          [4, 2, 26],
          [6, 2, 23],
          [8, 8, 19],
        ],
        8: [
          [0, 4, 24],
          [4, 2, 21],
          [6, 2, 24],
          [8, 8, 29],
        ],
        9: [
          [0, 4, 28],
          [4, 4, 26],
          [8, 8, 23],
        ],
        10: [
          [0, 2, 19],
          [2, 2, 23],
          [4, 8, 28],
          [12, 4, 26],
        ],
        11: [
          [0, 4, 24],
          [4, 4, 21],
          [8, 8, 28],
        ],
        12: [
          [0, 4, 29],
          [4, 2, 28],
          [6, 2, 26],
          [8, 8, 21],
        ],
        13: [
          [0, 2, 23],
          [2, 2, 26],
          [4, 4, 29],
          [8, 8, 31],
        ],
        14: [
          [0, 4, 28],
          [4, 4, 31],
          [8, 8, 36],
        ],
        15: [
          [0, 2, 23],
          [2, 2, 24],
          [4, 2, 26],
          [6, 2, 28],
          [8, 8, 19],
        ],
      }),
    }),
    (g.lakeshore = {
      name: "LAKEFRONT RUSH",
      bpm: 106,
      root: 52,
      phrase: 16,
      swing: 0.1,
      kit: "surf",
      padVoice: "organ",
      leadVoice: "surfgtr",
      counterVoice: "pluck",
      bassVoice: "funkbass",
      arpVoice: "pluck",
      revMix: 0.42,
      dlyMix: 0.18,
      dlyDiv: 0.5,
      prog: [
        [0, "maj"],
        [9, "min7"],
        [5, "maj7"],
        [7, "dom7"],
        [0, "add9"],
        [9, "min7"],
        [2, "min7"],
        [7, "dom7"],
        [5, "maj7"],
        [7, "dom7"],
        [9, "min7"],
        [5, "maj7"],
        [2, "min7"],
        [7, "dom7"],
        [0, "maj"],
        [0, "add9"],
      ],
      drums: {
        kick: ["X.....x.X.......", "X.....x.X...x..."],
        snare: ["....X.......X...", "....X.....x.X..."],
        hat: ["x-x-x-x-x-x-x-x-"],
        ohat: ["......o.......o."],
        perc: ["-x-x-x-x-x-x-x-x"],
        ride: ["x..x..x.x..x..x."],
        fillBars: [7, 15],
      },
      bass: h([
        [0, 4, 0],
        [4, 3, 7],
        [8, 3, 12],
        [11, 1, 10],
        [12, 4, 7],
      ]),
      arp: {
        steps: [0, 1, 2, 1],
        rate: 2,
        oct: 12,
        len: 2,
      },
      lead: l({
        0: [
          [0, 2, 19],
          [2, 2, 24],
          [4, 4, 28],
          [8, 2, 26],
          [10, 2, 24],
          [12, 4, 19],
        ],
        1: [
          [0, 2, 21],
          [2, 2, 24],
          [4, 4, 28],
          [8, 4, 24],
          [12, 4, 21],
        ],
        2: [
          [0, 2, 17],
          [2, 2, 21],
          [4, 6, 24],
          [10, 2, 21],
          [12, 4, 17],
        ],
        3: [
          [0, 2, 19],
          [2, 2, 23],
          [4, 4, 26],
          [8, 2, 23],
          [10, 2, 19],
          [12, 4, 26],
        ],
        4: [
          [0, 2, 19],
          [2, 2, 24],
          [4, 4, 28],
          [8, 2, 26],
          [10, 2, 24],
          [12, 4, 19],
        ],
        5: [
          [0, 2, 21],
          [2, 2, 24],
          [4, 4, 28],
          [8, 4, 24],
          [12, 4, 21],
        ],
        6: [
          [0, 4, 26],
          [4, 2, 24],
          [6, 2, 21],
          [8, 8, 17],
        ],
        7: [
          [0, 2, 19],
          [2, 2, 21],
          [4, 2, 23],
          [6, 2, 26],
          [8, 8, 31],
        ],
        8: [
          [0, 4, 24],
          [4, 4, 26],
          [8, 8, 29],
        ],
        9: [
          [0, 4, 28],
          [4, 4, 26],
          [8, 8, 23],
        ],
        10: [
          [0, 2, 24],
          [2, 2, 28],
          [4, 8, 33],
          [12, 4, 31],
        ],
        11: [
          [0, 8, 29],
          [8, 4, 28],
          [12, 4, 26],
        ],
        12: [
          [0, 4, 24],
          [4, 4, 21],
          [8, 8, 26],
        ],
        13: [
          [0, 2, 26],
          [2, 2, 29],
          [4, 4, 28],
          [8, 8, 26],
        ],
        14: [
          [0, 4, 24],
          [4, 4, 28],
          [8, 8, 31],
        ],
        15: [
          [0, 2, 19],
          [2, 2, 24],
          [4, 2, 26],
          [6, 2, 28],
          [8, 8, 24],
        ],
      }),
    }),
    (g.frostbyte = {
      name: "FROSTBYTE SUMMIT",
      bpm: 148,
      root: 50,
      phrase: 16,
      swing: 0,
      kit: "chip",
      padVoice: "strings",
      leadVoice: "pulse",
      counterVoice: "glass",
      bassVoice: "subsaw",
      arpVoice: "glass",
      revMix: 0.46,
      dlyMix: 0.24,
      dlyDiv: 0.75,
      prog: [
        [0, "min"],
        [7, "min"],
        [8, "maj"],
        [3, "maj"],
        [5, "min"],
        [0, "min"],
        [7, "maj"],
        [7, "maj"],
        [8, "maj7"],
        [3, "maj"],
        [5, "min"],
        [7, "maj"],
        [8, "maj"],
        [10, "maj"],
        [0, "minadd9"],
        [7, "maj"],
      ],
      drums: {
        kick: ["X..x....X..x....", "X..x....X..x..x."],
        snare: ["....X.......X...", "....X.......X.xx"],
        hat: ["x.x.x.x.x.x.x.x."],
        ohat: ["....o.......o..."],
        perc: ["x.......x......."],
        ride: ["x-x-x-x-x-x-x-x-"],
        fillBars: [7, 15],
      },
      bass: h([
        [0, 2, 0],
        [4, 2, 12],
        [6, 2, 0],
        [8, 2, 0],
        [12, 2, 7],
        [14, 2, 12],
      ]),
      arp: {
        steps: [0, 1, 2, 3, 4, 2],
        rate: 1,
        oct: 24,
        len: 2,
      },
      lead: l({
        0: [
          [0, 2, 24],
          [2, 2, 27],
          [4, 4, 31],
          [8, 2, 29],
          [10, 2, 27],
          [12, 4, 26],
        ],
        1: [
          [0, 2, 26],
          [2, 2, 31],
          [4, 4, 34],
          [8, 2, 31],
          [10, 2, 29],
          [12, 4, 26],
        ],
        2: [
          [0, 2, 27],
          [2, 2, 32],
          [4, 4, 36],
          [8, 2, 34],
          [10, 2, 32],
          [12, 4, 31],
        ],
        3: [
          [0, 4, 31],
          [4, 2, 29],
          [6, 2, 27],
          [8, 4, 26],
          [12, 4, 24],
        ],
        4: [
          [0, 2, 29],
          [2, 2, 32],
          [4, 4, 36],
          [8, 4, 34],
          [12, 4, 32],
        ],
        5: [
          [0, 2, 31],
          [2, 2, 27],
          [4, 4, 24],
          [8, 2, 27],
          [10, 2, 31],
          [12, 4, 36],
        ],
        6: [
          [0, 4, 35],
          [4, 4, 31],
          [8, 4, 26],
          [12, 4, 23],
        ],
        7: [
          [0, 4, 26],
          [4, 4, 35],
          [8, 8, 31],
        ],
        8: [
          [0, 8, 36],
          [8, 8, 34],
        ],
        9: [
          [0, 8, 31],
          [8, 8, 34],
        ],
        10: [
          [0, 8, 32],
          [8, 4, 31],
          [12, 4, 29],
        ],
        11: [
          [0, 8, 35],
          [8, 8, 38],
        ],
        12: [
          [0, 4, 36],
          [4, 4, 39],
          [8, 8, 36],
        ],
        13: [
          [0, 4, 38],
          [4, 4, 34],
          [8, 8, 29],
        ],
        14: [
          [0, 2, 27],
          [2, 2, 31],
          [4, 8, 36],
          [12, 4, 34],
        ],
        15: [
          [0, 4, 32],
          [4, 4, 31],
          [8, 4, 26],
          [12, 4, 35],
        ],
      }),
    }),
    (g.gigabit = {
      name: "GIGABIT GALAXY",
      bpm: 140,
      root: 45,
      phrase: 16,
      swing: 0,
      kit: "trance",
      padVoice: "warmsaw",
      leadVoice: "supersaw",
      counterVoice: "pluck",
      bassVoice: "rollbass",
      arpVoice: "trancepluck",
      revMix: 0.42,
      dlyMix: 0.3,
      dlyDiv: 0.75,
      prog: [
        [0, "min"],
        [8, "maj"],
        [3, "maj"],
        [10, "maj"],
        [0, "min"],
        [8, "maj"],
        [5, "min"],
        [7, "maj"],
        [8, "maj7"],
        [10, "maj"],
        [0, "minadd9"],
        [0, "min"],
        [8, "maj"],
        [3, "maj"],
        [5, "min7"],
        [7, "maj"],
      ],
      drums: {
        kick: ["X...X...X...X..."],
        snare: ["....X.......X..."],
        hat: ["..o...o...o...o."],
        ohat: ["..o...o...o...o."],
        perc: ["-.-.-.-.-.-.-.x."],
        ride: ["x.x.x.x.x.x.x.x."],
        fillBars: [7, 15],
      },
      bass: h([
        [2, 2, 0],
        [4, 2, 0],
        [6, 2, 0],
        [8, 2, 0],
        [10, 2, 0],
        [12, 2, 0],
        [14, 2, 0],
      ]),
      arp: {
        steps: [0, 1, 2, 3, 4, 3, 2, 1],
        rate: 1,
        oct: 12,
        len: 1,
      },
      lead: l({
        0: [
          [0, 4, 24],
          [4, 4, 27],
          [8, 8, 31],
        ],
        1: [
          [0, 8, 32],
          [8, 8, 31],
        ],
        2: [
          [0, 4, 31],
          [4, 4, 34],
          [8, 8, 39],
        ],
        3: [
          [0, 8, 38],
          [8, 8, 34],
        ],
        4: [
          [0, 8, 36],
          [8, 4, 31],
          [12, 4, 27],
        ],
        5: [
          [0, 4, 32],
          [4, 4, 36],
          [8, 8, 39],
        ],
        6: [
          [0, 8, 41],
          [8, 4, 39],
          [12, 4, 36],
        ],
        7: [
          [0, 8, 38],
          [8, 8, 35],
        ],
        8: [
          [0, 8, 39],
          [8, 8, 36],
        ],
        9: [
          [0, 8, 38],
          [8, 8, 41],
        ],
        10: [
          [0, 8, 43],
          [8, 8, 39],
        ],
        11: [[0, 16, 36]],
        12: [
          [0, 4, 32],
          [4, 4, 36],
          [8, 4, 39],
          [12, 4, 44],
        ],
        13: [
          [0, 8, 43],
          [8, 8, 34],
        ],
        14: [
          [0, 4, 41],
          [4, 4, 44],
          [8, 8, 43],
        ],
        15: [
          [0, 4, 35],
          [4, 4, 38],
          [8, 8, 43],
        ],
      }),
    }),
    (g.canyon = {
      name: "SIGNAL CANYON",
      bpm: 126,
      root: 52,
      phrase: 16,
      swing: 0,
      kit: "rock",
      padVoice: "warmsaw",
      leadVoice: "nylon",
      counterVoice: "dirtysaw",
      bassVoice: "rockbass",
      arpVoice: "pluck",
      revMix: 0.34,
      dlyMix: 0.26,
      dlyDiv: 0.375,
      prog: [
        [5, "min"],
        [3, "maj"],
        [1, "maj"],
        [0, "maj"],
        [5, "min"],
        [3, "maj"],
        [1, "maj"],
        [0, "maj"],
        [1, "maj"],
        [0, "maj"],
        [10, "min"],
        [0, "maj"],
        [1, "maj"],
        [3, "maj"],
        [5, "min"],
        [0, "maj"],
      ],
      drums: {
        kick: ["X..x..X...x.X...", "X..x..X...x.X.x."],
        snare: ["....X.......X...", "....X.....x.X..."],
        hat: ["x-x-x-x-x-x-x-x-"],
        ohat: ["......o.......o."],
        perc: ["x...x.x.x...x.x."],
        ride: ["x.x.x.x.x.x.x.x."],
        fillBars: [7, 15],
      },
      bass: h([
        [0, 3, 0],
        [4, 2, 0],
        [7, 1, 7],
        [8, 3, 0],
        [12, 2, 12],
        [14, 2, 10],
      ]),
      arp: {
        steps: [0, 1, 2, 1],
        rate: 1,
        oct: 12,
        len: 1,
      },
      lead: l({
        0: [
          [0, 2, 17],
          [2, 2, 20],
          [4, 4, 24],
          [8, 2, 22],
          [10, 2, 20],
          [12, 4, 19],
        ],
        1: [
          [0, 2, 19],
          [2, 2, 22],
          [4, 4, 27],
          [8, 2, 22],
          [10, 2, 19],
          [12, 4, 15],
        ],
        2: [
          [0, 2, 17],
          [2, 2, 20],
          [4, 4, 25],
          [8, 2, 24],
          [10, 2, 20],
          [12, 4, 17],
        ],
        3: [
          [0, 2, 16],
          [2, 2, 19],
          [4, 4, 24],
          [8, 2, 22],
          [10, 2, 20],
          [12, 2, 19],
          [14, 2, 16],
        ],
        4: [
          [0, 2, 24],
          [2, 2, 25],
          [4, 2, 24],
          [6, 2, 22],
          [8, 4, 20],
          [12, 4, 17],
        ],
        5: [
          [0, 2, 22],
          [2, 2, 27],
          [4, 4, 31],
          [8, 2, 29],
          [10, 2, 27],
          [12, 4, 22],
        ],
        6: [
          [0, 4, 32],
          [4, 2, 29],
          [6, 2, 25],
          [8, 4, 29],
          [12, 4, 32],
        ],
        7: [
          [0, 2, 31],
          [2, 2, 29],
          [4, 2, 28],
          [6, 2, 25],
          [8, 8, 24],
        ],
        8: [
          [0, 4, 25],
          [4, 4, 24],
          [8, 8, 20],
        ],
        9: [
          [0, 2, 24],
          [2, 2, 25],
          [4, 4, 28],
          [8, 8, 31],
        ],
        10: [
          [0, 4, 29],
          [4, 4, 25],
          [8, 8, 22],
        ],
        11: [
          [0, 4, 28],
          [4, 2, 25],
          [6, 2, 24],
          [8, 8, 19],
        ],
        12: [
          [0, 2, 29],
          [2, 2, 32],
          [4, 2, 29],
          [6, 2, 25],
          [8, 8, 24],
        ],
        13: [
          [0, 2, 22],
          [2, 2, 27],
          [4, 4, 31],
          [8, 8, 27],
        ],
        14: [
          [0, 2, 29],
          [2, 2, 31],
          [4, 4, 32],
          [8, 2, 31],
          [10, 2, 29],
          [12, 4, 28],
        ],
        15: [
          [0, 2, 24],
          [2, 2, 25],
          [4, 2, 28],
          [6, 2, 29],
          [8, 4, 31],
          [12, 4, 24],
        ],
      }),
    }),
    (g.results = {
      name: "RESULTS",
      bpm: 96,
      root: 51,
      phrase: 8,
      swing: 0.12,
      alwaysFull: !0,
      kit: "surf",
      padVoice: "organ",
      leadVoice: "rhodes",
      counterVoice: "pluck",
      bassVoice: "funkbass",
      arpVoice: "pluck",
      revMix: 0.4,
      dlyMix: 0.2,
      dlyDiv: 0.75,
      prog: [
        [0, "maj7"],
        [9, "min7"],
        [2, "min7"],
        [7, "dom7"],
        [0, "maj9"],
        [9, "min7"],
        [5, "maj7"],
        [7, "dom9"],
      ],
      drums: {
        kick: ["X.......x...X..."],
        snare: ["....X.......X..."],
        hat: ["x-x-x-x-x-x-x-x-"],
        ohat: ["......o.......o."],
        perc: ["-x-x-x-x-x-x-x-x"],
        ride: ["x..x..x.x..x..x."],
        fillBars: [7],
      },
      bass: h(
        [
          [0, 4, 0],
          [6, 2, 7],
          [8, 4, 0],
          [14, 2, 12],
        ],
        8,
      ),
      arp: {
        steps: [0, 1, 2, 3],
        rate: 2,
        oct: 12,
        len: 2,
      },
      lead: l(
        {
          0: [
            [0, 4, 19],
            [4, 4, 16],
            [8, 8, 24],
          ],
          1: [
            [0, 4, 23],
            [4, 4, 21],
            [8, 8, 16],
          ],
          2: [
            [0, 4, 17],
            [4, 4, 21],
            [8, 8, 26],
          ],
          3: [
            [0, 4, 24],
            [4, 4, 23],
            [8, 8, 19],
          ],
          4: [
            [0, 4, 19],
            [4, 4, 24],
            [8, 8, 28],
          ],
          5: [
            [0, 4, 26],
            [4, 4, 24],
            [8, 8, 21],
          ],
          6: [
            [0, 4, 21],
            [4, 4, 24],
            [8, 8, 29],
          ],
          7: [
            [0, 4, 28],
            [4, 4, 26],
            [8, 8, 24],
          ],
        },
        8,
      ),
    }),
    (g.victory = {
      name: "VICTORY",
      bpm: 132,
      root: 48,
      phrase: 8,
      swing: 0,
      alwaysFull: !0,
      kit: "boom",
      padVoice: "strings",
      leadVoice: "brasslead",
      counterVoice: "brasslead",
      bassVoice: "subsaw",
      arpVoice: "glass",
      revMix: 0.4,
      dlyMix: 0.14,
      dlyDiv: 0.5,
      prog: [
        [0, "maj"],
        [0, "maj"],
        [5, "maj"],
        [7, "maj"],
        [0, "maj"],
        [9, "min"],
        [5, "maj"],
        [7, "dom7"],
      ],
      drums: {
        kick: ["X..x..X...x.X...", "X..x..X...x.X..x"],
        snare: ["..x.X..x..x.X.xX", "..x.X..x..x.XxxX"],
        hat: ["x-x-x-x-x-x-x-x-"],
        ohat: ["..o...o...o...o."],
        perc: ["x.......x......."],
        ride: ["x.x.x.x.x.x.x.x."],
        fillBars: [3, 7],
      },
      bass: h(
        [
          [0, 4, 0],
          [4, 2, 0],
          [8, 4, 0],
          [12, 2, 7],
          [14, 2, 12],
        ],
        8,
      ),
      arp: {
        steps: [0, 1, 2, 3, 4],
        rate: 1,
        oct: 12,
        len: 1,
      },
      lead: l(
        {
          0: [
            [0, 2, 19],
            [2, 2, 19],
            [4, 2, 19],
            [6, 6, 24],
            [12, 4, 28],
          ],
          1: [
            [0, 8, 31],
            [8, 4, 28],
            [12, 4, 24],
          ],
          2: [
            [0, 2, 21],
            [2, 2, 24],
            [4, 8, 29],
            [12, 4, 28],
          ],
          3: [
            [0, 4, 26],
            [4, 4, 31],
            [8, 4, 23],
            [12, 4, 26],
          ],
          4: [
            [0, 8, 24],
            [8, 4, 28],
            [12, 4, 31],
          ],
          5: [
            [0, 8, 33],
            [8, 8, 28],
          ],
          6: [
            [0, 4, 29],
            [4, 4, 33],
            [8, 8, 36],
          ],
          7: [
            [0, 4, 35],
            [4, 4, 38],
            [8, 8, 31],
          ],
        },
        8,
      ),
    }));
  var y = {
      fiberrun: "canyon",
      fiber: "canyon",
      main: "menu",
      title: "menu",
    },
    v = {
      house: {
        kick: {
          f0: 165,
          f1: 46,
          pd: 0.03,
          dur: 0.4,
          drv: 2.2,
          clk: 0.45,
          g: 1.05,
        },
        snare: {
          mode: "clap",
          tone: 0,
          noise: 1,
          dur: 0.24,
          bp: 1500,
          q: 1.1,
          g: 0.75,
        },
        hat: {
          dur: 0.042,
          odur: 0.3,
          hp: 8e3,
          g: 0.56,
        },
        perc: {
          type: "rim",
          g: 0.4,
        },
        ride: {
          g: 0.22,
        },
      },
      retro: {
        kick: {
          f0: 190,
          f1: 42,
          pd: 0.045,
          dur: 0.56,
          drv: 1.6,
          clk: 0.3,
          g: 1.1,
        },
        snare: {
          mode: "gated",
          tone: 190,
          noise: 1,
          dur: 0.46,
          bp: 1150,
          q: 0.85,
          g: 0.86,
        },
        hat: {
          dur: 0.048,
          odur: 0.24,
          hp: 7e3,
          g: 0.42,
        },
        perc: {
          type: "tom",
          g: 0.4,
        },
        ride: {
          g: 0.2,
        },
      },
      trance: {
        kick: {
          f0: 180,
          f1: 44,
          pd: 0.032,
          dur: 0.44,
          drv: 2.6,
          clk: 0.4,
          g: 1.1,
        },
        snare: {
          mode: "clap",
          tone: 0,
          noise: 1,
          dur: 0.2,
          bp: 1800,
          q: 1.3,
          g: 0.68,
        },
        hat: {
          dur: 0.044,
          odur: 0.32,
          hp: 8400,
          g: 0.52,
        },
        perc: {
          type: "shaker",
          g: 0.32,
        },
        ride: {
          g: 0.24,
        },
      },
      rock: {
        kick: {
          f0: 145,
          f1: 52,
          pd: 0.038,
          dur: 0.34,
          drv: 1.9,
          clk: 0.6,
          g: 1,
        },
        snare: {
          mode: "acoustic",
          tone: 205,
          noise: 1,
          dur: 0.2,
          bp: 1750,
          q: 0.9,
          g: 0.9,
        },
        hat: {
          dur: 0.04,
          odur: 0.22,
          hp: 6600,
          g: 0.46,
        },
        perc: {
          type: "tom",
          g: 0.46,
        },
        ride: {
          g: 0.26,
        },
      },
      chip: {
        kick: {
          f0: 210,
          f1: 55,
          pd: 0.022,
          dur: 0.24,
          drv: 1.4,
          clk: 0.7,
          g: 0.95,
        },
        snare: {
          mode: "chip",
          tone: 240,
          noise: 1,
          dur: 0.14,
          bp: 2600,
          q: 0.7,
          g: 0.8,
        },
        hat: {
          dur: 0.03,
          odur: 0.16,
          hp: 9e3,
          g: 0.42,
        },
        perc: {
          type: "timp",
          g: 0.5,
        },
        ride: {
          g: 0.2,
        },
      },
      surf: {
        kick: {
          f0: 140,
          f1: 50,
          pd: 0.042,
          dur: 0.3,
          drv: 1.3,
          clk: 0.4,
          g: 0.92,
        },
        snare: {
          mode: "acoustic",
          tone: 195,
          noise: 1,
          dur: 0.26,
          bp: 1500,
          q: 0.8,
          g: 0.8,
        },
        hat: {
          dur: 0.038,
          odur: 0.22,
          hp: 6400,
          g: 0.44,
        },
        perc: {
          type: "shaker",
          g: 0.34,
        },
        ride: {
          g: 0.28,
        },
      },
      boom: {
        kick: {
          f0: 175,
          f1: 44,
          pd: 0.042,
          dur: 0.52,
          drv: 2,
          clk: 0.5,
          g: 1.15,
        },
        snare: {
          mode: "acoustic",
          tone: 200,
          noise: 1,
          dur: 0.3,
          bp: 1500,
          q: 0.8,
          g: 0.95,
        },
        hat: {
          dur: 0.044,
          odur: 0.26,
          hp: 7400,
          g: 0.46,
        },
        perc: {
          type: "tom",
          g: 0.5,
        },
        ride: {
          g: 0.24,
        },
      },
    },
    d = [
      {
        id: "drums",
        min: -0.12,
        band: 0.16,
        gain: 0.62,
      },
      {
        id: "bass",
        min: 0.02,
        band: 0.14,
        gain: 0.56,
      },
      {
        id: "perc",
        min: 0.18,
        band: 0.14,
        gain: 0.52,
      },
      {
        id: "pad",
        min: 0.32,
        band: 0.14,
        gain: 0.48,
      },
      {
        id: "arp",
        min: 0.45,
        band: 0.13,
        gain: 0.6,
      },
      {
        id: "lead",
        min: 0.6,
        band: 0.13,
        gain: 0.82,
      },
      {
        id: "counter",
        min: 0.75,
        band: 0.13,
        gain: 0.5,
      },
      {
        id: "fx",
        min: 0.87,
        band: 0.11,
        gain: 0.34,
      },
    ],
    m = null,
    x = !1,
    b = 0,
    w = !1,
    A = !1,
    C,
    F,
    N,
    G,
    W,
    B,
    $,
    Z,
    ie,
    ae,
    me,
    ve,
    Ee,
    Ue,
    pe,
    ge,
    Re,
    Ae,
    U,
    R,
    q,
    Q,
    O,
    z,
    P,
    X,
    V,
    re = {},
    Y = {},
    he = null,
    fe = null,
    de = null,
    Ce = {},
    Pe = {},
    Ne = {},
    je = null,
    rt = null,
    Ke = null,
    Le = null,
    Oe = {
      master: 0.76,
      music: 0.72,
      sfx: 0.9,
      muted: !1,
    },
    xt = !1,
    ht = 0,
    Ie = 0,
    Je = 0,
    yt = 0,
    gn = 0,
    Mi = 0,
    qt = 150,
    Si = 4,
    Ri = [0, 0, 0],
    j = [0, 0, 1],
    Yi = [1, 0, 0],
    le = {
      playing: !1,
      id: null,
      song: null,
      bpm: 120,
      spb: 0.5,
      beat: 0,
      nextBeatTime: 0,
      intensity: 0,
      targetIntensity: 0,
      finalLap: !1,
      pendingFinalLap: null,
      transpose: 0,
      targetTranspose: 0,
      stemLevel: {},
      riserArmed: !1,
      startTime: 0,
    },
    Pt = null,
    Fa = 0.14,
    Ba = 25,
    sn = {};
  function mr(M) {
    ((ht += M), ht > Ie && (Ie = ht));
  }
  function gr(M) {
    ((ht -= M), ht < 0 && (ht = 0));
  }
  function li(M, _, T, S) {
    (mr(_), yt++);
    var E = !1;
    if (
      ((M.onended = function () {
        if (!E) {
          ((E = !0), gr(_));
          try {
            M.disconnect();
          } catch {}
          if (S)
            try {
              S();
            } catch {}
        }
      }),
      typeof T == "number")
    )
      try {
        M.stop(T);
      } catch {}
  }
  function ri(M) {
    return x || ht - Mi < qt * (M ? 0.78 : 1) ? !0 : (gn++, !1);
  }
  function Hr(M, _) {
    for (
      var T = Math.max(1, Math.floor(m.sampleRate * M)),
        S = m.createBuffer(2, T, m.sampleRate),
        E = s(_ === "pink" ? 20976 : 45327),
        H = 0;
      H < 2;
      H++
    ) {
      var K = S.getChannelData(H);
      if (_ === "pink")
        for (var ne = 0, se = 0, xe = 0, be = 0, Fe = 0, ke = 0, De = 0, at = 0; at < T; at++) {
          var Se = E() * 2 - 1;
          ((ne = 0.99886 * ne + Se * 0.0555179),
            (se = 0.99332 * se + Se * 0.0750759),
            (xe = 0.969 * xe + Se * 0.153852),
            (be = 0.8665 * be + Se * 0.3104856),
            (Fe = 0.55 * Fe + Se * 0.5329522),
            (ke = -0.7616 * ke - Se * 0.016898),
            (K[at] = (ne + se + xe + be + Fe + ke + De + Se * 0.5362) * 0.11),
            (De = Se * 0.115926));
        }
      else if (_ === "metal")
        for (var ct = [1, 1.4142, 1.7831, 2, 2.2449, 2.8284], Ze = 0; Ze < T; Ze++) {
          for (var dt = Ze / m.sampleRate, Ve = 0, Dt = 0; Dt < ct.length; Dt++)
            Ve += Math.sin(n * 317 * ct[Dt] * dt) > 0 ? 1 : -1;
          K[Ze] = (Ve / ct.length) * 0.7;
        }
      else for (var vt = 0; vt < T; vt++) K[vt] = E() * 2 - 1;
    }
    return S;
  }
  function ci(M) {
    if (Y[M]) return Y[M];
    var _ = 48,
      T = new Float32Array(_),
      S = new Float32Array(_),
      E;
    switch (M) {
      case "saw":
        for (E = 1; E < _; E++) S[E] = 1 / E;
        break;
      case "square":
        for (E = 1; E < _; E += 2) S[E] = 1 / E;
        break;
      case "pulse25":
        for (E = 1; E < _; E++) S[E] = Math.sin(E * Math.PI * 0.25) / (E * Math.PI * 0.25) / E;
        break;
      case "pulse12":
        for (E = 1; E < _; E++) S[E] = Math.sin(E * Math.PI * 0.125) / (E * Math.PI * 0.125) / E;
        break;
      case "organ":
        ((S[1] = 1), (S[2] = 0.62), (S[3] = 0.4), (S[4] = 0.3), (S[6] = 0.18), (S[8] = 0.12));
        break;
      case "brass":
        for (E = 1; E < 18; E++) S[E] = Math.pow(0.78, E - 1) / Math.sqrt(E);
        break;
      case "nylon":
        ((S[1] = 1),
          (S[2] = 0.55),
          (S[3] = 0.42),
          (S[4] = 0.24),
          (S[5] = 0.16),
          (S[6] = 0.1),
          (S[7] = 0.07),
          (S[8] = 0.05));
        break;
      case "glass":
        ((S[1] = 1), (S[3] = 0.42), (S[5] = 0.22), (S[7] = 0.13), (S[9] = 0.08), (S[11] = 0.05));
        break;
      case "clav":
        for (E = 1; E < 26; E++) S[E] = ((E % 2 ? 1 : 0.5) * Math.pow(0.86, E - 1)) / Math.sqrt(E);
        break;
      case "strings":
        for (E = 1; E < 30; E++) S[E] = (Math.pow(0.84, E - 1) / E) * (1 + 0.25 * Math.sin(E * 1.7));
        break;
      case "rhodes":
        ((S[1] = 1), (S[2] = 0.32), (S[3] = 0.12), (S[4] = 0.28), (S[5] = 0.06), (S[6] = 0.09), (S[8] = 0.05));
        break;
      case "tri":
        for (E = 1; E < _; E += 2) S[E] = (((E - 1) / 2) % 2 ? -1 : 1) / (E * E);
        break;
      default:
        for (E = 1; E < _; E++) S[E] = 1 / E;
    }
    return (
      (Y[M] = m.createPeriodicWave(T, S, {
        disableNormalization: !1,
      })),
      Y[M]
    );
  }
  function Vr(M) {
    var _ = M.toFixed(2);
    if (Ne[_]) return Ne[_];
    for (var T = 2048, S = new Float32Array(T), E = M, H = 0; H < T; H++) {
      var K = (H / (T - 1)) * 2 - 1;
      S[H] = Math.tanh(K * (1 + E * 3)) / Math.tanh(1 + E * 3);
    }
    return ((Ne[_] = S), S);
  }
  function za(M, _, T) {
    var S = (M | 0) + "|" + _.toFixed(2) + "|" + T.toFixed(2);
    if (Ce[S]) return Ce[S];
    for (
      var E = m.sampleRate,
        H = r(M),
        K = Math.max(2, Math.round(E / H)),
        ne = Math.max(1, Math.floor(E * T)),
        se = m.createBuffer(1, ne, E),
        xe = se.getChannelData(0),
        be = new Float32Array(K),
        Fe = s(((M | 0) * 2654435761) >>> 0),
        ke = 0,
        De = 0;
      De < K;
      De++
    ) {
      var at = Fe() * 2 - 1;
      ((ke = ke + (at - ke) * _), (be[De] = ke));
    }
    var Se = 1e-6;
    for (De = 0; De < K; De++) Se = Math.max(Se, Math.abs(be[De]));
    for (De = 0; De < K; De++) be[De] /= Se;
    for (
      var ct = 0, Ze = 0, dt = 0.5 - 0.22 * (1 - _), Ve = Math.pow(0.5, 1 / (T * H * 0.55)), Dt = 0;
      Dt < ne;
      Dt++
    ) {
      var vt = be[ct];
      xe[Dt] = vt;
      var Vt = vt * (1 - dt) + Ze * dt;
      ((Ze = vt), (be[ct] = Vt * Ve), (ct = (ct + 1) % K));
    }
    var wt = Math.min(ne, Math.floor(E * 0.02));
    for (De = 0; De < wt; De++) xe[ne - 1 - De] *= De / wt;
    return ((Ce[S] = se), se);
  }
  function an(M, _) {
    if (Pe[M]) return Pe[M];
    for (
      var T = m.sampleRate,
        S = _.dur,
        E = Math.max(8, Math.floor(T * S)),
        H = m.createBuffer(1, E, T),
        K = H.getChannelData(0),
        ne = s(_.seed || 40503),
        se = [1, 1.4142, 1.7831, 2, 2.2449, 2.8284, 3.1748],
        xe = _.metalBase || 317,
        be = 0,
        Fe = 0,
        ke = Math.min(0.49, (_.hp || _.bp || 1e3) / T),
        De = 1 - Math.exp(-n * ke),
        at = _.q || 1,
        Se = 0,
        ct = 0,
        Ze = 2 * Math.sin(Math.PI * Math.min(0.49, (_.bp || 1e3) / T)),
        dt = Math.min(1, 1 / at),
        Ve = 0;
      Ve < E;
      Ve++
    ) {
      var Dt = Ve / T,
        vt;
      if (_.metal) {
        vt = 0;
        for (var Vt = 0; Vt < se.length; Vt++) vt += Math.sin(n * xe * se[Vt] * Dt) > 0 ? 1 : -1;
        ((vt /= se.length), (vt = vt * 0.9 + (ne() * 2 - 1) * 0.1));
      } else vt = ne() * 2 - 1;
      var wt;
      if (_.bp) {
        var on = ct + Ze * Se,
          Yl = vt - on - dt * Se,
          ja = Ze * Yl + Se;
        ((Se = ja), (ct = on), (wt = ja));
      } else _.hp ? ((be = be + (vt - be) * De), (wt = vt - be)) : ((be = be + (vt - be) * De), (wt = be));
      var Ki;
      if (_.bursts) {
        Ki = 0;
        for (var qr = 0; qr < _.bursts.length; qr++) {
          var Zs = Dt - _.bursts[qr];
          Zs >= 0 && (Ki = Math.max(Ki, Math.exp(-Zs / (_.burstDec || 0.008)) * (1 - qr * 0.12)));
        }
        Dt > _.bursts[_.bursts.length - 1] + 0.004 &&
          (Ki = Math.max(Ki, Math.exp(-(Dt - _.bursts[_.bursts.length - 1]) / (_.dec || 0.09)) * 0.6));
      } else {
        var Cn = _.atk || 8e-4;
        Ki = Dt < Cn ? Dt / Cn : Math.exp(-(Dt - Cn) / (_.dec || S * 0.3));
      }
      K[Ve] = wt * Ki;
    }
    var qn = 1e-6;
    for (Ve = 0; Ve < E; Ve++) qn = Math.max(qn, Math.abs(K[Ve]));
    for (Ve = 0; Ve < E; Ve++) K[Ve] /= qn;
    var qa = Math.min(E, Math.floor(T * 0.006));
    for (Ve = 0; Ve < qa; Ve++) K[E - 1 - Ve] *= Ve / qa;
    return ((Pe[M] = H), H);
  }
  function Zi(M, _, T, S, E, H, K, ne) {
    if (ri(ne === void 0 ? 1 : ne)) {
      var se = m.createBufferSource();
      ((se.buffer = T), K && K !== 1 && (se.playbackRate.value = K));
      var xe = m.createGain();
      (se.connect(xe), xe.connect(M), we(xe, E || 0, H || 0));
      var be = T.duration / (K || 1);
      (Ct(xe.gain, _, S),
        Ct(xe.gain, _ + be - 0.004, S),
        fi(xe.gain, _ + be, 0),
        se.start(_),
        li(se, 2, _ + be + 0.01));
    }
  }
  function ka(M, _, T, S) {
    for (
      var E = m.sampleRate,
        H = Math.floor(E * M),
        K = m.createBuffer(2, H, E),
        ne = Math.floor(E * T),
        se = s(50097),
        xe = [0.011, 0.019, 0.027, 0.041, 0.053, 0.071, 0.089, 0.113],
        be = [0.55, 0.42, 0.36, 0.3, 0.24, 0.19, 0.15, 0.11],
        Fe = 0;
      Fe < 2;
      Fe++
    ) {
      for (var ke = K.getChannelData(Fe), De = 0, at = 0, Se = 0; Se < H; Se++) {
        if (Se < ne) {
          ke[Se] = 0;
          continue;
        }
        var ct = (Se - ne) / (H - ne),
          Ze = Math.pow(1 - ct, _),
          dt = (se() * 2 - 1) * Ze;
        ((De = De + (dt - De) * S), (at = dt - De), (ke[Se] = De * 0.86 + at * 0.3));
      }
      for (var Ve = 0; Ve < xe.length; Ve++) {
        var Dt = ne + Math.floor(xe[Ve] * E * (Fe ? 1.07 : 0.93));
        Dt < H && (ke[Dt] += be[Ve] * (Fe ? -1 : 1) * 0.7);
      }
      var vt = 1e-6;
      for (Se = 0; Se < H; Se++) vt = Math.max(vt, Math.abs(ke[Se]));
      for (Se = 0; Se < H; Se++) ke[Se] = (ke[Se] / vt) * 0.72;
      var Vt = Math.floor(E * 0.004);
      for (Se = 0; Se < Vt && Se < H; Se++) ((ke[Se] *= Se / Vt), (ke[H - 1 - Se] *= Se / Vt));
    }
    return K;
  }
  function Ct(M, _, T) {
    try {
      M.setValueAtTime(T, _);
    } catch {}
  }
  function fi(M, _, T) {
    try {
      M.linearRampToValueAtTime(T, _);
    } catch {}
  }
  function Yt(M, _, T) {
    try {
      M.exponentialRampToValueAtTime(Math.max(1e-4, T), _);
    } catch {}
  }
  function L(M, _, T, S) {
    try {
      M.setTargetAtTime(T, _, S);
    } catch {}
  }
  function J(M, _, T, S, E, H, K, ne) {
    var se = M.gain;
    ((S = Math.max(0.0015, S)), Ct(se, _, 0), fi(se, _ + S, T));
    var xe = T * H;
    E > 0 ? Yt(se, _ + S + E, Math.max(1e-4, xe)) : Ct(se, _ + S, xe);
    var be = _ + Math.max(ne, S + E);
    return (Ct(se, be, Math.max(1e-4, xe)), Yt(se, be + K, 1e-4), fi(se, be + K + 0.004, 0), be + K + 0.02);
  }
  function ee(M, _, T, S, E) {
    var H = M.gain;
    return (
      Ct(H, _, 0),
      fi(H, _ + Math.max(8e-4, S), T),
      Yt(H, _ + Math.max(8e-4, S) + E, 1e-4),
      fi(H, _ + Math.max(8e-4, S) + E + 0.006, 0),
      _ + S + E + 0.03
    );
  }
  function ce(M, _, T, S) {
    var E = m.createBiquadFilter();
    if (((E.type = M || "lowpass"), (E.frequency.value = _), (E.Q.value = T || 0.7), S === 2)) {
      var H = m.createBiquadFilter();
      return (
        (H.type = E.type),
        (H.frequency.value = _),
        (H.Q.value = (T || 0.7) * 0.5),
        E.connect(H),
        {
          in: E,
          out: H,
          freq: E.frequency,
          freq2: H.frequency,
          n: 2,
        }
      );
    }
    return {
      in: E,
      out: E,
      freq: E.frequency,
      freq2: null,
      n: 1,
    };
  }
  function te(M, _, T, S, E) {
    (Ct(M.freq, _, T), Yt(M.freq, _ + E, S), M.freq2 && (Ct(M.freq2, _, T), Yt(M.freq2, _ + E, S)));
  }
  function _e(M) {
    return M < 0.22 ? 0 : M < 0.45 ? 1 : 2;
  }
  function we(M, _, T) {
    try {
      (_ > 0.02 && je && M.connect(je[_e(_)]), T > 0.02 && rt && M.connect(rt[_e(T)]));
    } catch {}
    return 0;
  }
  function Me(M, _, T, S, E) {
    if (((E = E || {}), !!ri(E.pri || 0))) {
      var H = m.createOscillator(),
        K = m.createGain(),
        ne = 2;
      (E.wave ? H.setPeriodicWave(ci(E.wave)) : (H.type = E.type || "sine"),
        (H.frequency.value = T),
        E.detune && (H.detune.value = E.detune),
        E.glide && (Ct(H.frequency, _, T * E.glide), Yt(H.frequency, _ + (E.glideT || 0.06), T)));
      var se = null;
      if (E.vib && Ke) {
        se = Ke[E.vib > 11 ? 2 : E.vib > 7 ? 1 : 0];
        try {
          se.connect(H.detune);
        } catch {}
      }
      var xe,
        be = null,
        Fe = null,
        ke = H;
      if (E.cut) {
        var De = ce("lowpass", E.cut, E.q || 0.8, E.poles);
        if (
          ((ne += De.n),
          E.cutEnv && te(De, _, E.cut, Math.max(120, E.cut * E.cutEnv), E.cutT || S),
          E.cutLfo !== void 0 && Le)
        ) {
          be = Le[E.cutLfo];
          try {
            be.connect(De.freq);
          } catch {}
          Fe = De.freq;
        }
        (H.connect(De.in), De.out.connect(K));
      } else H.connect(K);
      (K.connect(M),
        (ne += we(K, E.rev || 0, E.dly || 0)),
        E.perc
          ? (xe = ee(K, _, E.gain || 0.3, E.atk || 0.004, S))
          : (xe = J(
              K,
              _,
              E.gain || 0.3,
              E.atk || 0.01,
              E.dec || 0.08,
              E.sus === void 0 ? 0.75 : E.sus,
              E.rel || 0.12,
              S,
            )),
        H.start(_),
        li(
          H,
          ne,
          xe,
          se || be
            ? function () {
                if (se)
                  try {
                    se.disconnect(H.detune);
                  } catch {}
                if (be)
                  try {
                    be.disconnect(Fe);
                  } catch {}
              }
            : null,
        ));
    }
  }
  function ze(M, _, T, S, E) {
    if (((E = E || {}), !!ri(E.pri || 1))) {
      var H = m.createOscillator(),
        K = m.createOscillator(),
        ne = m.createGain(),
        se = m.createGain();
      ((H.type = E.ctype || "sine"),
        (K.type = E.mtype || "sine"),
        (H.frequency.value = T),
        (K.frequency.value = T * (E.ratio || 2)));
      var xe = T * (E.index || 2);
      (Ct(ne.gain, _, xe),
        Yt(ne.gain, _ + (E.idxT || S * 0.6 + 0.05), Math.max(1, xe * (E.idxEnd || 0.05))),
        K.connect(ne),
        ne.connect(H.frequency),
        H.connect(se),
        se.connect(M));
      var be = 4 + we(se, E.rev || 0, E.dly || 0),
        Fe = E.perc
          ? ee(se, _, E.gain || 0.3, E.atk || 0.003, S)
          : J(se, _, E.gain || 0.3, E.atk || 0.01, E.dec || 0.1, E.sus === void 0 ? 0.6 : E.sus, E.rel || 0.14, S);
      (K.start(_), H.start(_));
      try {
        K.stop(Fe);
      } catch {}
      li(H, be, Fe);
    }
  }
  function $e(M, _, T, S, E) {
    E = E || {};
    var H = E.count || 7;
    if ((ri(1) || (H = 3), !!ri(1))) {
      var K = m.createGain(),
        ne = m.createGain();
      ne.gain.value = 1 / Math.sqrt(H);
      for (
        var se = ce("lowpass", E.cut || 2600, E.q || 0.9),
          xe = E.detune || 16,
          be = [0, -1, 1, -0.62, 0.62, -0.31, 0.31],
          Fe = [],
          ke = 0;
        ke < H;
        ke++
      ) {
        var De = m.createOscillator();
        (De.setPeriodicWave(ci("saw")),
          (De.frequency.value = T),
          (De.detune.value = be[ke % be.length] * xe + (ke % 2 ? 2 : -2)),
          De.connect(ne),
          De.start(_),
          Fe.push(De));
      }
      (ne.connect(se.in), se.out.connect(K), K.connect(M));
      var at = H + 2 + se.n + we(K, E.rev || 0, E.dly || 0);
      E.cutEnv && te(se, _, (E.cut || 2600) * 0.35, E.cut || 2600, E.cutT || 0.25);
      var Se = J(
        K,
        _,
        E.gain || 0.22,
        E.atk || 0.02,
        E.dec || 0.12,
        E.sus === void 0 ? 0.8 : E.sus,
        E.rel || 0.25,
        S,
      );
      for (ke = 1; ke < Fe.length; ke++)
        try {
          Fe[ke].stop(Se);
        } catch {}
      li(Fe[0], at, Se);
    }
  }
  function We(M, _, T, S, E) {
    if (((E = E || {}), !!ri(E.pri || 1))) {
      var H = E.bright === void 0 ? 0.55 : E.bright,
        K = E.decay || 1.4,
        ne = Math.round(T),
        se = za(ne, H, K),
        xe = m.createBufferSource();
      ((xe.buffer = se), (xe.playbackRate.value = Math.pow(2, (T - ne) / 12)));
      var be = m.createGain(),
        Fe = 2,
        ke = xe;
      if (E.cut) {
        var De = ce("lowpass", E.cut, E.q || 0.7);
        ((Fe += De.n), xe.connect(De.in), De.out.connect(be));
      } else xe.connect(be);
      (be.connect(M), (Fe += we(be, E.rev || 0, E.dly || 0)));
      var at = Math.min(S, K),
        Se = be.gain;
      (Ct(Se, _, 0),
        fi(Se, _ + 0.004, E.gain || 0.4),
        Ct(Se, _ + at, E.gain || 0.4),
        Yt(Se, _ + at + (E.rel || 0.12), 1e-4),
        fi(Se, _ + at + (E.rel || 0.12) + 0.005, 0));
      var ct = _ + at + (E.rel || 0.12) + 0.02;
      (xe.start(_), li(xe, Fe, ct));
    }
  }
  function Xe(M, _, T, S) {
    if (((S = S || {}), !ri(S.pri || 1))) return null;
    var E = m.createBufferSource();
    ((E.buffer = S.pink ? fe : S.metal ? de || (de = Hr(1, "metal")) : he),
      (E.loop = !0),
      S.rate && (E.playbackRate.value = S.rate));
    var H = m.createGain(),
      K = 2,
      ne = E;
    if (S.hp || S.lp || S.bp) {
      var se = m.createBiquadFilter();
      if (
        ((se.type = S.bp ? "bandpass" : S.hp ? "highpass" : "lowpass"),
        (se.frequency.value = S.bp || S.hp || S.lp),
        (se.Q.value = S.q || 0.7),
        S.sweep && (Ct(se.frequency, _, S.bp || S.hp || S.lp), Yt(se.frequency, _ + T, S.sweep)),
        E.connect(se),
        se.connect(H),
        K++,
        S.lp2)
      ) {
        var xe = m.createBiquadFilter();
        ((xe.type = "lowpass"), (xe.frequency.value = S.lp2), H.disconnect(), H.connect(xe), xe.connect(M), K++);
      } else H.connect(M);
    } else (E.connect(H), H.connect(M));
    K += we(H, S.rev || 0, S.dly || 0);
    var be;
    if (S.shape === "swell") {
      var Fe = H.gain;
      (Ct(Fe, _, 0),
        fi(Fe, _ + T * 0.92, S.gain || 0.25),
        Yt(Fe, _ + T, 1e-4),
        fi(Fe, _ + T + 0.01, 0),
        (be = _ + T + 0.03));
    } else be = ee(H, _, S.gain || 0.25, S.atk || 0.002, T);
    return (E.start(_), li(E, K, be), H);
  }
  function ut(M) {
    return M.__key || "kit";
  }
  function Gt(M, _, T, S) {
    var E = T.kick;
    if (ri(0)) {
      var H = m.createOscillator(),
        K = m.createGain(),
        ne = m.createWaveShaper();
      ((H.type = "sine"),
        Ct(H.frequency, _, E.f0),
        Yt(H.frequency, _ + E.pd, E.f1),
        (ne.curve = Vr(E.drv * 0.35)),
        H.connect(ne),
        ne.connect(K),
        K.connect(M));
      var se = ee(K, _, (E.g || 1) * S * 0.72, 0.002, E.dur);
      (H.start(_),
        li(H, 3, se),
        E.clk > 0.01 &&
          Zi(
            M,
            _,
            an("click", {
              dur: 0.026,
              bp: 2200,
              q: 0.9,
              dec: 0.006,
              seed: 17,
            }),
            E.clk * S * 0.26,
            0,
            0,
            1,
            1,
          ));
    }
  }
  function Lt(M, _, T, S) {
    var E = T.snare;
    if (ri(0)) {
      var H = ut(T) + "sn",
        K;
      if (
        (E.mode === "clap"
          ? (K = an(H, {
              dur: 0.04 + E.dur,
              bp: E.bp,
              q: E.q,
              dec: E.dur * 0.45,
              bursts: [0, 0.011, 0.022, 0.034],
              burstDec: 0.007,
              seed: 51,
            }))
          : (K = an(H, {
              dur: E.dur + 0.05,
              bp: E.bp,
              q: E.q,
              dec: E.dur * 0.34,
              seed: 51,
            })),
        Zi(M, _, K, E.g * S * 0.62, E.mode === "gated" ? 0.55 : 0.18, 0, 1, 0),
        E.tone > 0 && ri(1))
      ) {
        var ne = m.createOscillator(),
          se = m.createGain();
        ((ne.type = "triangle"),
          (ne.frequency.value = E.tone),
          Yt(ne.frequency, _ + 0.06, E.tone * 0.72),
          ne.connect(se),
          se.connect(M));
        var xe = ee(se, _, E.g * S * 0.3, 0.001, E.dur * 0.55);
        (ne.start(_), li(ne, 2, xe));
      }
    }
  }
  function Wt(M, _, T, S, E) {
    var H = T.hat,
      K = E ? H.odur : H.dur,
      ne = an(ut(T) + (E ? "oh" : "ch"), {
        dur: K + 0.02,
        hp: H.hp,
        metal: !0,
        metalBase: 317,
        dec: K * 0.34,
        seed: 85,
      });
    Zi(M, _, ne, H.g * S * (E ? 0.85 : 1.05), E ? 0.18 : 0.04, 0, 1, 1);
  }
  function At(M, _, T, S) {
    var E = T.perc;
    if (E.type === "shaker")
      Zi(
        M,
        _,
        an("shaker", {
          dur: 0.07,
          hp: 6200,
          atk: 0.004,
          dec: 0.016,
          seed: 119,
        }),
        E.g * S * 0.34,
        0.06,
        0,
        1,
        1,
      );
    else if (E.type === "rim")
      Zi(
        M,
        _,
        an("rim", {
          dur: 0.05,
          bp: 1750,
          q: 3.2,
          dec: 0.01,
          seed: 136,
        }),
        E.g * S * 0.4,
        0.12,
        0,
        1,
        1,
      );
    else if (E.type === "timp")
      Me(M, _, 98, 0.42, {
        type: "sine",
        gain: E.g * S * 0.5,
        perc: !0,
        atk: 0.003,
        glide: 1.6,
        glideT: 0.1,
        rev: 0.4,
        pri: 1,
      });
    else {
      if (!ri(1)) return;
      var H = m.createOscillator(),
        K = m.createGain();
      ((H.type = "sine"),
        Ct(H.frequency, _, 220),
        Yt(H.frequency, _ + 0.12, 96),
        H.connect(K),
        K.connect(M),
        we(K, 0.25, 0));
      var ne = ee(K, _, E.g * S * 0.42, 0.002, 0.2);
      (H.start(_), li(H, 2, ne));
    }
  }
  function pt(M, _, T, S) {
    var E = an("ride", {
      dur: 0.46,
      hp: 4200,
      metal: !0,
      metalBase: 197,
      dec: 0.11,
      seed: 153,
    });
    Zi(M, _, E, (T.ride.g || 0.24) * S * 1.2, 0.3, 0, 1, 1);
  }
  function Rt(M, _, T) {
    var S = an("crash", {
      dur: 1.6,
      hp: 2600,
      metal: !0,
      metalBase: 133,
      dec: 0.42,
      seed: 170,
    });
    Zi(M, _, S, 0.3 * T, 0.55, 0, 1, 1);
  }
  function $t() {
    ((C = m.createGain()),
      (C.gain.value = Oe.muted ? 0 : Oe.master),
      (F = m.createDynamicsCompressor()),
      (F.threshold.value = -7),
      (F.knee.value = 8),
      (F.ratio.value = 3),
      (F.attack.value = 0.006),
      (F.release.value = 0.16),
      (N = m.createBiquadFilter()),
      (N.type = "highpass"),
      (N.frequency.value = 40),
      (N.Q.value = 0.6),
      (G = m.createDynamicsCompressor()),
      (G.threshold.value = -1.6),
      (G.knee.value = 0),
      (G.ratio.value = 20),
      (G.attack.value = 0.002),
      (G.release.value = 0.09),
      F.connect(N),
      N.connect(G),
      G.connect(C),
      C.connect(m.destination),
      (B = m.createGain()),
      (B.gain.value = 1),
      (W = m.createGain()),
      (W.gain.value = Oe.music),
      (ie = m.createBiquadFilter()),
      (ie.type = "lowshelf"),
      (ie.frequency.value = 170),
      (ie.gain.value = -3.5),
      (ae = m.createBiquadFilter()),
      (ae.type = "peaking"),
      (ae.frequency.value = 1150),
      (ae.Q.value = 0.8),
      (ae.gain.value = 2.5),
      (me = m.createBiquadFilter()),
      (me.type = "highshelf"),
      (me.frequency.value = 2600),
      (me.gain.value = 4),
      W.connect(ie),
      ie.connect(ae),
      ae.connect(me),
      me.connect(B),
      B.connect(F),
      ($ = m.createGain()),
      ($.gain.value = Oe.sfx),
      $.connect(F),
      (Z = m.createGain()),
      (Z.gain.value = Oe.sfx * 0.55),
      (ve = m.createBiquadFilter()),
      (ve.type = "lowshelf"),
      (ve.frequency.value = 150),
      (ve.gain.value = -5.5),
      (Ee = m.createBiquadFilter()),
      (Ee.type = "highshelf"),
      (Ee.frequency.value = 1800),
      (Ee.gain.value = 4.5),
      Z.connect(ve),
      ve.connect(Ee),
      Ee.connect(F),
      (pe = m.createGain()),
      (pe.gain.value = 1),
      (Re = m.createBiquadFilter()),
      (Re.type = "highpass"),
      (Re.frequency.value = 300),
      (Ue = m.createConvolver()));
    try {
      Ue.buffer = ka(xt ? 0.7 : 1.7, 2.9, 0.014, 0.1);
    } catch {}
    ((Ue.normalize = !1),
      (Ae = m.createBiquadFilter()),
      (Ae.type = "lowpass"),
      (Ae.frequency.value = 5200),
      (ge = m.createGain()),
      (ge.gain.value = 0.3),
      pe.connect(Re),
      Re.connect(Ue),
      Ue.connect(Ae),
      Ae.connect(ge),
      ge.connect(F),
      (V = m.createGain()),
      (V.gain.value = 1),
      (U = m.createDelay(2)),
      (R = m.createDelay(2)),
      (U.delayTime.value = 0.28),
      (R.delayTime.value = 0.28 * 1.5),
      (q = m.createGain()),
      (Q = m.createGain()),
      (q.gain.value = 0.34),
      (Q.gain.value = 0.34),
      (O = m.createBiquadFilter()),
      (O.type = "lowpass"),
      (O.frequency.value = 2200),
      (z = m.createStereoPanner ? m.createStereoPanner() : m.createGain()),
      (P = m.createStereoPanner ? m.createStereoPanner() : m.createGain()),
      z.pan && ((z.pan.value = -0.75), (P.pan.value = 0.75)),
      (X = m.createGain()),
      (X.gain.value = 0.24),
      V.connect(U),
      U.connect(O),
      O.connect(Q),
      Q.connect(R),
      R.connect(q),
      q.connect(U),
      U.connect(z),
      R.connect(P),
      z.connect(X),
      P.connect(X),
      X.connect(F),
      (je = []),
      (rt = []));
    for (var M = [0.1, 0.24, 0.48], _ = 0; _ < 3; _++) {
      var T = m.createGain();
      ((T.gain.value = M[_]), T.connect(pe), je.push(T));
      var S = m.createGain();
      ((S.gain.value = M[_]), S.connect(V), rt.push(S));
    }
    Ke = [];
    var E = m.createOscillator();
    ((E.type = "sine"), (E.frequency.value = 5.2));
    for (var H = [5, 9, 14], K = 0; K < 3; K++) {
      var ne = m.createGain();
      ((ne.gain.value = H[K]), E.connect(ne), Ke.push(ne));
    }
    try {
      E.start(0);
    } catch {}
    Le = [];
    var se = m.createOscillator();
    ((se.type = "sine"), (se.frequency.value = 0.16));
    var xe = m.createOscillator();
    ((xe.type = "triangle"), (xe.frequency.value = 2.4));
    var be = m.createGain();
    ((be.gain.value = 500), se.connect(be), Le.push(be));
    var Fe = m.createGain();
    ((Fe.gain.value = 1400), xe.connect(Fe), Le.push(Fe));
    try {
      (se.start(0), xe.start(0));
    } catch {}
    for (var ke = 0; ke < d.length; ke++) {
      var De = m.createGain();
      ((De.gain.value = 0), De.connect(W), (re[d[ke].id] = De), (le.stemLevel[d[ke].id] = 0));
    }
    for (var at in v) v.hasOwnProperty(at) && (v[at].__key = at);
    Je = 43 + d.length;
  }
  function nt(M) {
    if (!M) return null;
    var _ = y[M] || M;
    return g[_] ? _ : null;
  }
  function et() {
    var M = le.song,
      _ = {},
      T,
      S = M && M.alwaysFull ? 1 : le.intensity;
    for (T = 0; T < d.length; T++) {
      var E = d[T],
        H = i(E.min, E.min + E.band, S) * E.gain;
      (le.finalLap &&
        ((E.id === "lead" || E.id === "counter" || E.id === "fx") && (H = Math.max(H, E.gain)),
        E.id === "perc" && (H = Math.max(H, E.gain)),
        (E.id === "drums" || E.id === "bass") && (H = Math.max(H, E.gain))),
        xt && (E.id === "fx" || E.id === "counter" || E.id === "perc") && (H = 0),
        (_[E.id] = H));
    }
    return _;
  }
  function Pi(M) {
    for (var _ = et(), T = le.spb * 0.5, S = 0; S < d.length; S++) {
      var E = d[S].id,
        H = re[E];
      if (H) {
        var K = le.stemLevel[E],
          ne = _[E];
        if (!(Math.abs(K - ne) < 0.001)) {
          try {
            (H.gain.cancelScheduledValues(M), H.gain.setValueAtTime(K, M), H.gain.linearRampToValueAtTime(ne, M + T));
          } catch {}
          le.stemLevel[E] = ne;
        }
      }
    }
  }
  function Ga() {
    var M = le.song.bpm * (le.finalLap ? 1.06 : 1);
    return M;
  }
  function Ha(M, _) {
    var T = _ * 4 * le.spb,
      S = re.fx;
    if (
      (Xe(S, M, T, {
        hp: 300,
        sweep: 9e3,
        q: 1.2,
        gain: 0.26,
        shape: "swell",
        rev: 0.4,
        pri: 1,
      }),
      !!ri(1))
    ) {
      var E = m.createOscillator(),
        H = m.createGain();
      (E.setPeriodicWave(ci("saw")),
        Ct(E.frequency, M, r(le.song.root + le.transpose + 12)),
        Yt(E.frequency, M + T, r(le.song.root + le.transpose + 36)));
      var K = ce("lowpass", 900, 3);
      (te(K, M, 900, 7e3, T), E.connect(K.in), K.out.connect(H), H.connect(S));
      var ne = 2 + K.n + we(H, 0.5, 0.2),
        se = H.gain;
      (Ct(se, M, 0),
        fi(se, M + T * 0.9, 0.16),
        Yt(se, M + T, 1e-4),
        fi(se, M + T + 0.01, 0),
        E.start(M),
        li(E, ne, M + T + 0.05));
    }
  }
  function Wr(M) {
    (Rt(re.fx, M, 0.9),
      Me(re.fx, M, 70, 0.5, {
        type: "sine",
        gain: 0.4,
        perc: !0,
        glide: 3.2,
        glideT: 0.16,
        rev: 0.4,
        pri: 1,
      }));
  }
  function Va(M, _) {
    var T = le.song,
      S = T.phrase,
      E = Math.floor(_ / 4),
      H = E % S,
      K = _ % 4,
      ne = le.spb,
      se = ne / 4,
      xe = T.swing || 0,
      be = v[T.kit] || v.boom,
      Fe = T.root + le.transpose,
      ke = T.prog[H % T.prog.length],
      De = o(ke),
      at = T.drums.fillBars && T.drums.fillBars.indexOf(H) >= 0 && K === 3;
    function Se(ad) {
      var od = M + (ad - K * 4) * se;
      return (xe && ad & 1 && (od += se * xe), od);
    }
    var ct = re.drums,
      Ze,
      dt,
      Ve,
      Dt;
    for (Ze = 0; Ze < 4; Ze++)
      ((dt = K * 4 + Ze),
        (Ve = u(T.drums.kick, E, dt)),
        Ve !== "." && Gt(ct, Se(dt), be, f[Ve] || 0.8),
        (Ve = u(T.drums.snare, E, dt)),
        Ve !== "." && Lt(ct, Se(dt), be, f[Ve] || 0.8));
    if (at) {
      var vt = [0.6, 0.72, 0.84, 1];
      for (Ze = 0; Ze < 4; Ze++) {
        var Vt = Se(K * 4 + Ze);
        if (!ri(1)) break;
        var wt = m.createOscillator(),
          on = m.createGain();
        ((wt.type = "sine"),
          Ct(wt.frequency, Vt, 300 - Ze * 46),
          Yt(wt.frequency, Vt + 0.11, 110 - Ze * 14),
          wt.connect(on),
          on.connect(ct));
        var Yl = 2 + we(on, 0.3, 0),
          ja = ee(on, Vt, 0.42 * vt[Ze], 0.002, 0.16);
        (wt.start(Vt), li(wt, Yl, ja));
      }
    }
    if (
      (K === 0 && (H === 0 || H === S / 2) && le.stemLevel.perc > 0.05 && Rt(re.perc, M, H === 0 ? 0.85 : 0.6),
      le.stemLevel.perc > 0.02)
    ) {
      var Ki = re.perc;
      for (Ze = 0; Ze < 4; Ze++)
        ((dt = K * 4 + Ze),
          (Ve = u(T.drums.hat, E, dt)),
          Ve !== "." && Wt(Ki, Se(dt), be, f[Ve] || 0.7, !1),
          (Ve = u(T.drums.ohat, E, dt)),
          (Ve === "o" || Ve === "O") && Wt(Ki, Se(dt), be, f[Ve] || 0.8, !0),
          (Ve = u(T.drums.perc, E, dt)),
          Ve !== "." && At(Ki, Se(dt), be, f[Ve] || 0.7),
          le.finalLap && ((Ve = u(T.drums.ride, E, dt)), Ve !== "." && pt(Ki, Se(dt), be, (f[Ve] || 0.7) * 0.9)));
    }
    if (le.stemLevel.bass > 0.02) {
      for (var qr = re.bass, Zs = T.bass[H % T.bass.length][K], Cn = Fe + ke[0]; Cn > Fe - 5;) Cn -= 12;
      for (; Cn < Fe - 17;) Cn += 12;
      for (Ze = 0; Ze < Zs.length; Ze++) {
        var qn = Zs[Ze],
          qa = Cn + qn.n,
          h0 = Se(qn.s),
          u0 = qn.d * se * 0.92;
        Hl(qr, h0, qa, u0, T.bassVoice, qn.v);
      }
    }
    if (le.stemLevel.pad > 0.02 && K === 0) {
      var d0 = re.pad,
        p0 = ne * 4 * 0.98;
      Vl(d0, M, Fe, De, p0, T.padVoice, T);
    }
    if (le.stemLevel.arp > 0.02) {
      var f0 = re.arp,
        Ks = T.arp,
        Qu = Ks.rate;
      for (Ze = 0; Ze < 4; Ze++)
        if (((dt = K * 4 + Ze), dt % Qu === 0)) {
          var m0 = Math.floor((E * 16 + dt) / Qu),
            ed = Ks.steps[m0 % Ks.steps.length],
            g0 = ed % De.length,
            v0 = Math.floor(ed / De.length) * 12,
            x0 = Fe + De[g0] + v0 + (Ks.oct || 12);
          Wl(f0, Se(dt), x0, se * Ks.len * 0.95, T.arpVoice);
        }
    }
    var td = le.stemLevel.lead > 0.02,
      id = le.stemLevel.counter > 0.02;
    if (td || id) {
      var nd = T.lead[H % T.lead.length][K];
      for (Ze = 0; Ze < nd.length; Ze++) {
        var Yr = nd[Ze],
          rd = Se(Yr.s),
          sd = Yr.d * se * 0.94;
        if ((td && Xl(re.lead, rd, Fe + Yr.n, sd, T.leadVoice, Yr.v, T), id)) {
          var y0 = c(Yr.n, De);
          Wa(re.counter, rd, Fe + y0, sd, T.counterVoice, Yr.v, T);
        }
      }
    }
    le.stemLevel.fx > 0.02 &&
      K === 0 &&
      (H === S - 2
        ? Ha(M, 2)
        : H === 0 || H === S / 2
          ? Wr(M)
          : H % 4 === 3 &&
            Xe(re.fx, M, ne * 2, {
              hp: 5e3,
              sweep: 400,
              gain: 0.1,
              rev: 0.5,
              pri: 1,
            }));
  }
  function Hl(M, _, T, S, E, H) {
    var K = r(T),
      ne = H === void 0 ? 1 : H;
    switch (E) {
      case "funkbass":
        (Me(M, _, K, S, {
          wave: "saw",
          gain: 0.34 * ne,
          cut: 620,
          cutEnv: 0.35,
          cutT: S * 0.5,
          q: 3.4,
          atk: 0.004,
          dec: 0.06,
          sus: 0.65,
          rel: 0.05,
          pri: 0,
        }),
          Me(M, _, K * 0.5, S, {
            type: "sine",
            gain: 0.17 * ne,
            atk: 0.006,
            dec: 0.04,
            sus: 0.85,
            rel: 0.05,
            pri: 0,
          }));
        break;
      case "rollbass":
        (Me(M, _, K, S, {
          wave: "saw",
          gain: 0.3 * ne,
          cut: 380,
          q: 2.2,
          atk: 0.004,
          dec: 0.05,
          sus: 0.7,
          rel: 0.04,
          pri: 0,
        }),
          Me(M, _, K * 0.5, S, {
            type: "sine",
            gain: 0.18 * ne,
            atk: 0.005,
            dec: 0.03,
            sus: 0.9,
            rel: 0.05,
            pri: 0,
          }));
        break;
      case "rockbass":
        (Me(M, _, K, S, {
          wave: "saw",
          gain: 0.3 * ne,
          cut: 900,
          cutEnv: 0.4,
          cutT: S * 0.4,
          q: 1.8,
          atk: 0.003,
          dec: 0.08,
          sus: 0.6,
          rel: 0.05,
          pri: 0,
        }),
          Me(M, _, K * 0.5, S, {
            type: "sine",
            gain: 0.16 * ne,
            atk: 0.005,
            dec: 0.05,
            sus: 0.85,
            rel: 0.05,
            pri: 0,
          }));
        break;
      default:
        (Me(M, _, K, S, {
          wave: "saw",
          gain: 0.26 * ne,
          cut: 520,
          q: 1.6,
          atk: 0.005,
          dec: 0.07,
          sus: 0.72,
          rel: 0.06,
          pri: 0,
        }),
          Me(M, _, K * 0.5, S, {
            type: "sine",
            gain: 0.19 * ne,
            atk: 0.006,
            dec: 0.05,
            sus: 0.9,
            rel: 0.07,
            pri: 0,
          }));
    }
  }
  function Vl(M, _, T, S, E, H, K) {
    if (ri(1)) {
      var ne = K.revMix || 0.3,
        se = Math.min(4, S.length),
        xe = m.createGain(),
        be = m.createGain(),
        Fe = H === "organ" ? 3200 : H === "strings" ? 2600 : 2100,
        ke = ce("lowpass", Fe, 0.6, 2);
      if (
        ((be.gain.value = 1 / Math.sqrt(se * (H === "warmsaw" ? 2 : 1))),
        be.connect(ke.in),
        ke.out.connect(xe),
        xe.connect(M),
        we(xe, ne, 0),
        Le)
      )
        try {
          Le[0].connect(ke.freq);
        } catch {}
      var De = 2 + ke.n,
        at = [],
        Se,
        ct;
      for (Se = 0; Se < se; Se++) {
        var Ze = r(T + S[Se] + 12);
        if (H === "warmsaw")
          for (var dt = -6; dt <= 7; dt += 13)
            ((ct = m.createOscillator()),
              ct.setPeriodicWave(ci("saw")),
              (ct.frequency.value = Ze),
              (ct.detune.value = dt),
              ct.connect(be),
              ct.start(_),
              at.push(ct),
              De++);
        else {
          if (
            ((ct = m.createOscillator()),
            ct.setPeriodicWave(ci(H === "organ" ? "organ" : "strings")),
            (ct.frequency.value = Ze),
            (ct.detune.value = Se % 2 ? 4 : -4),
            H === "strings" && Ke)
          )
            try {
              Ke[0].connect(ct.detune);
            } catch {}
          (ct.connect(be), ct.start(_), at.push(ct), De++);
        }
      }
      var Ve = H === "organ" ? 0.03 : H === "strings" ? 0.28 : 0.15,
        Dt = H === "organ" ? 0.22 : H === "strings" ? 0.6 : 0.45,
        vt = H === "organ" ? 0.2 : 0.17,
        Vt = J(xe, _, vt, Ve, 0.18, 0.85, Dt, E);
      for (Se = 1; Se < at.length; Se++)
        try {
          at[Se].stop(Vt);
        } catch {}
      li(at[0], De, Vt, function () {
        if (Le)
          try {
            Le[0].disconnect(ke.freq);
          } catch {}
        if (H === "strings" && Ke)
          for (var wt = 0; wt < at.length; wt++)
            try {
              Ke[0].disconnect(at[wt].detune);
            } catch {}
      });
    }
  }
  function Wl(M, _, T, S, E) {
    var H = r(T);
    switch (E) {
      case "trancepluck":
        Me(M, _, H, S, {
          wave: "saw",
          gain: 0.17,
          cut: 4200,
          cutEnv: 0.14,
          cutT: S * 1.4,
          cutLfo: 1,
          q: 5,
          atk: 0.003,
          dec: 0.09,
          sus: 0.16,
          rel: 0.09,
          dly: 0.24,
          rev: 0.22,
          pri: 1,
        });
        break;
      case "glass":
        ze(M, _, H, S, {
          ratio: 3.5,
          index: 1.6,
          idxT: 0.12,
          gain: 0.13,
          atk: 0.004,
          dec: 0.12,
          sus: 0.2,
          rel: 0.2,
          rev: 0.4,
          dly: 0.2,
          pri: 1,
        });
        break;
      case "pulse":
        Me(M, _, H, S, {
          wave: "pulse25",
          gain: 0.1,
          cut: 3600,
          cutLfo: 1,
          q: 1,
          atk: 0.004,
          dec: 0.06,
          sus: 0.5,
          rel: 0.06,
          dly: 0.26,
          pri: 1,
        });
        break;
      default:
        We(M, _, T, S, {
          gain: 0.2,
          bright: 0.6,
          decay: 0.9,
          cut: 4500,
          rev: 0.22,
          dly: 0.16,
          pri: 1,
        });
    }
  }
  function Xl(M, _, T, S, E, H, K) {
    var ne = r(T),
      se = H === void 0 ? 1 : H,
      xe = K.revMix || 0.3,
      be = K.dlyMix || 0.2;
    switch (E) {
      case "supersaw":
        $e(M, _, ne, S, {
          gain: 0.16 * se,
          cut: 4200,
          cutEnv: 1,
          cutT: 0.3,
          q: 1,
          detune: 22,
          atk: 0.02,
          dec: 0.15,
          sus: 0.82,
          rel: 0.3,
          rev: xe,
          dly: be,
          count: 7,
        });
        break;
      case "sawlead":
        (Me(M, _, ne, S, {
          wave: "saw",
          gain: 0.17 * se,
          cut: 3400,
          q: 2,
          atk: 0.02,
          dec: 0.12,
          sus: 0.8,
          rel: 0.28,
          vib: 11,
          vibRate: 5.2,
          vibDelay: 0.22,
          rev: xe,
          dly: be,
        }),
          Me(M, _, ne, S, {
            wave: "saw",
            gain: 0.1 * se,
            detune: -9,
            cut: 2800,
            q: 1.4,
            atk: 0.03,
            dec: 0.12,
            sus: 0.8,
            rel: 0.28,
          }));
        break;
      case "brasslead":
        (Me(M, _, ne, S, {
          wave: "brass",
          gain: 0.17 * se,
          cut: 3e3,
          cutEnv: 1.6,
          cutT: 0.09,
          q: 1.4,
          atk: 0.018,
          dec: 0.1,
          sus: 0.82,
          rel: 0.2,
          vib: 7,
          vibRate: 5,
          rev: xe,
          dly: be,
        }),
          Me(M, _, ne * 2, S, {
            wave: "brass",
            gain: 0.055 * se,
            cut: 5200,
            atk: 0.03,
            dec: 0.1,
            sus: 0.7,
            rel: 0.2,
          }));
        break;
      case "pulse":
        (Me(M, _, ne, S, {
          wave: "pulse25",
          gain: 0.15 * se,
          cut: 5200,
          q: 0.8,
          atk: 0.006,
          dec: 0.07,
          sus: 0.72,
          rel: 0.12,
          vib: 9,
          vibRate: 6.4,
          vibDelay: 0.12,
          rev: xe,
          dly: be,
        }),
          Me(M, _, ne * 2.005, S, {
            wave: "pulse12",
            gain: 0.05 * se,
            atk: 0.01,
            dec: 0.08,
            sus: 0.6,
            rel: 0.12,
          }));
        break;
      case "clav":
        Me(M, _, ne, S, {
          wave: "clav",
          gain: 0.16 * se,
          cut: 3800,
          cutEnv: 0.28,
          cutT: S * 0.7,
          q: 4,
          atk: 0.003,
          dec: 0.08,
          sus: 0.36,
          rel: 0.09,
          rev: xe,
          dly: be,
        });
        break;
      case "nylon":
        (We(M, _, T, S, {
          gain: 0.34 * se,
          bright: 0.72,
          decay: 1.5,
          cut: 5200,
          rev: xe,
          dly: be,
          pri: 0,
        }),
          Me(M, _, ne, Math.min(S, 0.3), {
            wave: "nylon",
            gain: 0.05 * se,
            atk: 0.004,
            dec: 0.08,
            sus: 0.3,
            rel: 0.1,
          }));
        break;
      case "surfgtr":
        (We(M, _, T, S, {
          gain: 0.3 * se,
          bright: 0.86,
          decay: 1.6,
          cut: 6e3,
          rev: xe + 0.2,
          dly: be,
          pri: 0,
        }),
          Me(M, _, ne, Math.min(S, 0.4), {
            wave: "saw",
            gain: 0.045 * se,
            cut: 2400,
            q: 2.4,
            atk: 0.006,
            dec: 0.1,
            sus: 0.3,
            rel: 0.12,
            vib: 14,
            vibRate: 5.6,
            vibDelay: 0.1,
          }));
        break;
      case "rhodes":
        ze(M, _, ne, S, {
          ratio: 2,
          index: 1.1,
          idxT: 0.22,
          gain: 0.22 * se,
          atk: 0.006,
          dec: 0.2,
          sus: 0.42,
          rel: 0.35,
          rev: xe,
          dly: be,
        });
        break;
      default:
        Me(M, _, ne, S, {
          wave: "saw",
          gain: 0.16 * se,
          cut: 3200,
          q: 1.6,
          atk: 0.015,
          dec: 0.1,
          sus: 0.8,
          rel: 0.2,
          rev: xe,
          dly: be,
        });
    }
  }
  function Wa(M, _, T, S, E, H, K) {
    var ne = r(T),
      se = (H === void 0 ? 1 : H) * 0.8,
      xe = (K.revMix || 0.3) * 0.8;
    switch (E) {
      case "fmbell":
        ze(M, _, ne, S, {
          ratio: 2.01,
          index: 1.4,
          idxT: 0.2,
          gain: 0.11 * se,
          atk: 0.01,
          dec: 0.18,
          sus: 0.4,
          rel: 0.3,
          rev: xe,
          dly: 0.24,
          pri: 1,
        });
        break;
      case "sqlead":
        Me(M, _, ne, S, {
          wave: "pulse25",
          gain: 0.09 * se,
          cut: 2800,
          q: 1.2,
          atk: 0.012,
          dec: 0.1,
          sus: 0.7,
          rel: 0.18,
          rev: xe,
          pri: 1,
        });
        break;
      case "organ":
        Me(M, _, ne, S, {
          wave: "organ",
          gain: 0.1 * se,
          cut: 2600,
          q: 0.7,
          atk: 0.012,
          dec: 0.08,
          sus: 0.8,
          rel: 0.16,
          rev: xe,
          pri: 1,
        });
        break;
      case "glass":
        ze(M, _, ne, S, {
          ratio: 3.01,
          index: 1.2,
          idxT: 0.14,
          gain: 0.09 * se,
          atk: 0.006,
          dec: 0.14,
          sus: 0.28,
          rel: 0.26,
          rev: xe + 0.15,
          dly: 0.2,
          pri: 1,
        });
        break;
      case "dirtysaw":
        (Me(M, _, ne, S, {
          wave: "saw",
          gain: 0.1 * se,
          cut: 2200,
          q: 3,
          atk: 0.008,
          dec: 0.1,
          sus: 0.72,
          rel: 0.16,
          rev: xe,
          pri: 1,
        }),
          Me(M, _, ne, S, {
            wave: "saw",
            gain: 0.06 * se,
            detune: 12,
            cut: 1800,
            q: 2,
            atk: 0.01,
            dec: 0.1,
            sus: 0.7,
            rel: 0.16,
            pri: 1,
          }));
        break;
      case "brasslead":
        Me(M, _, ne, S, {
          wave: "brass",
          gain: 0.11 * se,
          cut: 2600,
          q: 1.2,
          atk: 0.016,
          dec: 0.1,
          sus: 0.8,
          rel: 0.2,
          rev: xe,
          pri: 1,
        });
        break;
      default:
        We(M, _, T, S, {
          gain: 0.16 * se,
          bright: 0.5,
          decay: 1,
          cut: 3600,
          rev: xe,
          dly: 0.2,
          pri: 1,
        });
    }
  }
  function Ws() {
    ((le.nextBeatTime += le.spb),
      le.beat++,
      le.beat % 4 === 0 &&
        (le.pendingFinalLap !== null &&
          ((le.finalLap = le.pendingFinalLap),
          (le.targetTranspose = le.finalLap ? 1 : 0),
          (le.pendingFinalLap = null),
          le.finalLap && (le.riserArmed = !0)),
        (le.transpose = le.targetTranspose),
        (le.bpm = Ga()),
        (le.spb = 60 / le.bpm),
        Pi(le.nextBeatTime),
        Xa(le.nextBeatTime),
        le.riserArmed && ((le.riserArmed = !1), Ha(le.nextBeatTime, 1))));
  }
  function Xa(M) {
    if (!(!U || !le.song)) {
      var _ = le.spb * (le.song.dlyDiv || 0.75);
      try {
        (U.delayTime.setTargetAtTime(_, M, 0.05), R.delayTime.setTargetAtTime(_ * 1.5, M, 0.05));
      } catch {}
    }
  }
  function st() {
    if (!(!w || !le.playing || !le.song))
      try {
        for (var M = m.currentTime, _ = 0; le.nextBeatTime < M + Fa && _++ < 64;)
          (Va(le.nextBeatTime, le.beat), Ws());
      } catch {}
  }
  function Xs() {
    x || (Pt && clearInterval(Pt), (Pt = setInterval(st, Ba)));
  }
  function Bi() {
    Pt && (clearInterval(Pt), (Pt = null));
  }
  var zi = null,
    Xr = !1;
  function En() {
    if (!Xr) {
      Xr = !0;
      try {
        for (var M = 0; le.playing && le.nextBeatTime < b && M++ < 2e4;) {
          if (zi && le.beat % 4 === 0)
            try {
              zi(Math.floor(le.beat / 4), le.nextBeatTime);
            } catch {}
          (Va(le.nextBeatTime, le.beat), Ws());
        }
      } finally {
        Xr = !1;
      }
    }
  }
  function js(M) {
    if (!M || !m.createStereoPanner) return $;
    var _ = m.createStereoPanner();
    return (
      (_.pan.value = e(M, -1, 1)),
      _.connect($),
      mr(1),
      x ||
        setTimeout(function () {
          try {
            _.disconnect();
          } catch {}
          gr(1);
        }, 2500),
      _
    );
  }
  function qe(M, _, T, S) {
    return ((S = S || {}), (S.pri = S.pri === void 0 ? 1 : S.pri), Xe(M, _, T, S));
  }
  function tt(M, _, T, S, E, H, K) {
    ((K = K || {}),
      Me(M, _, T, S, {
        wave: H || "square",
        gain: E,
        atk: K.atk || 0.005,
        dec: K.dec || 0.04,
        sus: K.sus === void 0 ? 0.7 : K.sus,
        rel: K.rel || 0.06,
        cut: K.cut,
        q: K.q,
        glide: K.glide,
        glideT: K.glideT,
        rev: K.rev || 0,
        dly: K.dly || 0,
        pri: 0,
      }));
  }
  function It(M, _, T, S, E, H, K, ne) {
    if (((ne = ne || {}), !!ri(0))) {
      var se = m.createOscillator(),
        xe = m.createGain();
      (K === "sine" || K === "triangle" || K === "sawtooth" || K === "square"
        ? (se.type = K)
        : se.setPeriodicWave(ci(K || "saw")),
        Ct(se.frequency, _, T),
        Yt(se.frequency, _ + E, Math.max(20, S)));
      var be = se,
        Fe = 2;
      if (ne.cut) {
        var ke = ce("lowpass", ne.cut, ne.q || 1);
        ((Fe += ke.n), se.connect(ke.in), ke.out.connect(xe));
      } else se.connect(xe);
      (xe.connect(M), (Fe += we(xe, ne.rev || 0, ne.dly || 0)));
      var De = ee(xe, _, H, ne.atk || 0.004, E);
      (se.start(_), li(se, Fe, De));
    }
  }
  var hi = {
    countdown: function (M, _, T) {
      var S = T.n === void 0 ? 3 : T.n;
      (tt(M, _, 660 * Math.pow(2, (3 - S) / 12), 0.14, 0.3, "square", {
        rel: 0.1,
        rev: 0.2,
      }),
        tt(M, _, 1320, 0.05, 0.1, "sine", {
          rel: 0.05,
        }));
    },
    go: function (M, _) {
      (tt(M, _, 880, 0.3, 0.34, "brass", {
        atk: 0.006,
        rel: 0.3,
        rev: 0.35,
      }),
        tt(M, _, 1320, 0.3, 0.2, "brass", {
          atk: 0.01,
          rel: 0.3,
        }),
        It(M, _, 300, 2400, 0.22, 0.2, "saw", {
          cut: 4e3,
          rev: 0.3,
        }),
        qe(M, _, 0.5, {
          hp: 900,
          sweep: 6e3,
          gain: 0.16,
          rev: 0.4,
        }));
    },
    engineStart: function (M, _) {
      (It(M, _, 40, 120, 0.42, 0.26, "saw", {
        cut: 900,
        q: 3,
      }),
        qe(M, _, 0.5, {
          lp: 1400,
          gain: 0.14,
        }),
        It(M, _ + 0.36, 110, 88, 0.5, 0.18, "saw", {
          cut: 1200,
          q: 2,
        }));
    },
    drift: function (M, _, T) {
      (qe(M, _, T.dur || 0.28, {
        bp: 2400,
        q: 1.4,
        gain: 0.42,
        rate: 1.4,
      }),
        qe(M, _, T.dur || 0.28, {
          bp: 700,
          q: 1.8,
          gain: 0.2,
          rate: 1.1,
        }));
    },
    driftBoost1: function (M, _) {
      wi(M, _, 1);
    },
    driftBoost2: function (M, _) {
      wi(M, _, 2);
    },
    driftBoost3: function (M, _) {
      wi(M, _, 3);
    },
    itemBox: function (M, _) {
      (tt(M, _, 1046, 0.07, 0.16, "glass", {
        rel: 0.08,
        rev: 0.35,
      }),
        tt(M, _ + 0.06, 1318, 0.07, 0.16, "glass", {
          rel: 0.08,
          rev: 0.35,
        }),
        tt(M, _ + 0.12, 1568, 0.16, 0.18, "glass", {
          rel: 0.22,
          rev: 0.4,
        }),
        qe(M, _, 0.2, {
          hp: 6e3,
          gain: 0.08,
        }));
    },
    itemGet: function (M, _) {
      for (var T = [784, 988, 1175, 1568], S = 0; S < T.length; S++)
        tt(M, _ + S * 0.045, T[S], 0.1, 0.14, "glass", {
          rel: 0.12,
          rev: 0.3,
        });
    },
    itemUse: function (M, _) {
      (It(M, _, 900, 2600, 0.16, 0.2, "square", {
        cut: 5e3,
        rev: 0.2,
      }),
        qe(M, _, 0.14, {
          hp: 2e3,
          gain: 0.1,
        }));
    },
    missile: function (M, _) {
      (It(M, _, 320, 1500, 0.55, 0.2, "saw", {
        cut: 3e3,
        q: 2,
        rev: 0.25,
      }),
        qe(M, _, 0.6, {
          bp: 1800,
          q: 1.2,
          sweep: 5200,
          gain: 0.14,
        }));
    },
    missileHit: function (M, _) {
      (hi.explode(M, _, {}),
        tt(M, _, 220, 0.2, 0.2, "square", {
          glide: 3,
          glideT: 0.1,
          rel: 0.2,
        }));
    },
    explode: function (M, _) {
      (qe(M, _, 0.62, {
        lp: 5200,
        sweep: 200,
        gain: 0.34,
        rev: 0.5,
      }),
        It(M, _, 180, 34, 0.55, 0.32, "sine"),
        It(M, _, 420, 60, 0.3, 0.18, "square", {
          cut: 1400,
        }));
    },
    shield: function (M, _) {
      (It(M, _, 400, 1400, 0.3, 0.16, "glass", {
        rev: 0.45,
      }),
        ze(M, _, 660, 0.5, {
          ratio: 1.5,
          index: 1.6,
          gain: 0.14,
          atk: 0.02,
          dec: 0.2,
          sus: 0.4,
          rel: 0.4,
          rev: 0.5,
        }));
    },
    shieldBreak: function (M, _) {
      qe(M, _, 0.32, {
        hp: 3e3,
        sweep: 9e3,
        gain: 0.22,
        rev: 0.4,
      });
      for (var T = 0; T < 4; T++)
        tt(M, _ + T * 0.02, 1800 - T * 260, 0.1, 0.1, "glass", {
          rel: 0.14,
        });
    },
    zap: function (M, _) {
      for (var T = 0; T < 5; T++)
        It(M, _ + T * 0.025, 3e3 - T * 340, 600, 0.09, 0.16, "square", {
          cut: 6e3,
        });
      qe(M, _, 0.3, {
        hp: 2600,
        gain: 0.18,
        rev: 0.4,
      });
    },
    hit: function (M, _) {
      (It(M, _, 260, 60, 0.28, 0.3, "square", {
        cut: 1600,
      }),
        qe(M, _, 0.26, {
          lp: 2400,
          gain: 0.22,
        }));
    },
    bump: function (M, _, T) {
      var S = T.force === void 0 ? 1 : e(T.force, 0.2, 1.6);
      (It(M, _, 180 * S, 52, 0.16, 0.3 * S, "sine"),
        qe(M, _, 0.1, {
          lp: 2600,
          gain: 0.26 * S,
        }));
    },
    scrape: function (M, _, T) {
      (qe(M, _, T.dur || 0.22, {
        bp: 3200,
        q: 2.2,
        gain: 0.4,
        rate: 0.8,
      }),
        qe(M, _, T.dur || 0.22, {
          bp: 900,
          q: 3,
          gain: 0.3,
        }));
    },
    offroad: function (M, _, T) {
      qe(M, _, T.dur || 0.3, {
        lp: 1100,
        gain: 0.34,
        rate: 0.6,
      });
    },
    skid: function (M, _, T) {
      qe(M, _, T.dur || 0.34, {
        bp: 1900,
        q: 1.6,
        gain: 0.46,
        rate: 1.1,
      });
    },
    jump: function (M, _) {
      (It(M, _, 240, 900, 0.2, 0.18, "square", {
        cut: 3e3,
      }),
        qe(M, _, 0.12, {
          hp: 1800,
          gain: 0.07,
        }));
    },
    land: function (M, _, T) {
      var S = T.hard ? 1.4 : 0.9;
      (It(M, _, 200 * S, 48, 0.24, 0.3 * S, "sine"),
        qe(M, _, 0.2, {
          lp: 2600,
          gain: 0.3 * S,
        }));
    },
    boostPad: function (M, _) {
      (It(M, _, 420, 2200, 0.34, 0.24, "saw", {
        cut: 5200,
        q: 1.5,
        rev: 0.35,
      }),
        It(M, _, 210, 1100, 0.34, 0.14, "square", {
          cut: 3e3,
        }),
        qe(M, _, 0.4, {
          hp: 1200,
          sweep: 7e3,
          gain: 0.14,
        }));
    },
    coin: function (M, _) {
      (tt(M, _, 1318, 0.05, 0.14, "glass", {
        rel: 0.05,
      }),
        tt(M, _ + 0.05, 1976, 0.16, 0.14, "glass", {
          rel: 0.2,
          rev: 0.3,
        }));
    },
    lapDing: function (M, _) {
      (tt(M, _, 1046, 0.12, 0.18, "glass", {
        rel: 0.3,
        rev: 0.45,
      }),
        tt(M, _ + 0.09, 1568, 0.22, 0.18, "glass", {
          rel: 0.4,
          rev: 0.45,
        }));
    },
    finalLap: function (M, _) {
      for (var T = [523, 659, 784, 1046], S = 0; S < T.length; S++)
        tt(M, _ + S * 0.09, T[S], 0.16, 0.2, "brass", {
          rel: 0.18,
          rev: 0.4,
        });
      (It(M, _, 300, 3200, 0.55, 0.16, "saw", {
        cut: 6e3,
        rev: 0.4,
      }),
        qe(M, _, 0.6, {
          hp: 500,
          sweep: 8e3,
          gain: 0.16,
          shape: "swell",
        }));
    },
    finish: function (M, _) {
      for (var T = [523, 659, 784, 1046, 1318], S = 0; S < T.length; S++)
        tt(M, _ + S * 0.07, T[S], 0.22, 0.2, "brass", {
          rel: 0.35,
          rev: 0.45,
        });
      qe(M, _, 0.9, {
        hp: 3e3,
        gain: 0.12,
        rev: 0.6,
      });
    },
    win: function (M, _) {
      for (
        var T = [523, 523, 523, 698, 659, 0, 698, 880], S = [0, 0.11, 0.22, 0.33, 0.55, 0, 0.78, 0.92], E = 0;
        E < T.length;
        E++
      )
        T[E] &&
          (tt(M, _ + S[E], T[E], 0.18, 0.22, "brass", {
            rel: 0.3,
            rev: 0.4,
          }),
          tt(M, _ + S[E], T[E] * 2, 0.18, 0.08, "brass", {
            rel: 0.3,
          }));
    },
    lose: function (M, _) {
      for (var T = [392, 370, 349, 262], S = 0; S < T.length; S++)
        tt(M, _ + S * 0.16, T[S], 0.24, 0.18, "organ", {
          rel: 0.4,
          rev: 0.4,
        });
    },
    place: function (M, _, T) {
      var S = T.place || 1;
      tt(M, _, 440 * Math.pow(2, (9 - Math.min(8, S)) / 12), 0.16, 0.2, "glass", {
        rel: 0.3,
        rev: 0.4,
      });
    },
    menuMove: function (M, _) {
      tt(M, _, 880, 0.03, 0.1, "square", {
        rel: 0.04,
      });
    },
    menuSelect: function (M, _) {
      (tt(M, _, 660, 0.05, 0.14, "square", {
        rel: 0.06,
      }),
        tt(M, _ + 0.05, 1320, 0.12, 0.14, "glass", {
          rel: 0.16,
          rev: 0.3,
        }));
    },
    menuBack: function (M, _) {
      (tt(M, _, 520, 0.05, 0.12, "square", {
        rel: 0.06,
      }),
        tt(M, _ + 0.05, 330, 0.12, 0.12, "square", {
          rel: 0.14,
        }));
    },
    unlock: function (M, _) {
      for (var T = [523, 659, 784, 1046, 1318, 1568], S = 0; S < T.length; S++)
        tt(M, _ + S * 0.06, T[S], 0.14, 0.14, "glass", {
          rel: 0.3,
          rev: 0.45,
        });
      qe(M, _, 0.7, {
        hp: 4e3,
        gain: 0.08,
        rev: 0.6,
      });
    },
    crowdCheer: function (M, _, T) {
      var S = T.dur || 1.8,
        E = qe(M, _, S, {
          bp: 1100,
          q: 0.6,
          gain: 0.34,
          shape: "swell",
          rev: 0.5,
          rate: 0.5,
        });
      qe(M, _, S, {
        hp: 2600,
        gain: 0.13,
        shape: "swell",
        rate: 0.7,
      });
    },
    record: function (M, _) {
      for (var T = [784, 1046, 1318, 1568, 2093], S = 0; S < T.length; S++)
        tt(M, _ + S * 0.05, T[S], 0.18, 0.16, "glass", {
          rel: 0.35,
          rev: 0.5,
        });
      It(M, _, 600, 4e3, 0.4, 0.1, "saw", {
        cut: 8e3,
        rev: 0.5,
      });
    },
  };
  function wi(M, _, T) {
    var S = [0, 520, 660, 820][T] || 520;
    (It(M, _, S * 0.5, S * 3.2, 0.26 + T * 0.05, 0.16 + T * 0.04, "saw", {
      cut: 5e3,
      q: 1.6,
      rev: 0.3,
    }),
      tt(M, _, S, 0.18, 0.14 + T * 0.03, "square", {
        rel: 0.22,
        cut: 4e3,
      }),
      tt(M, _, S * 1.5, 0.18, 0.08, "glass", {
        rel: 0.24,
        rev: 0.35,
      }),
      qe(M, _, 0.34, {
        hp: 1600 + T * 800,
        sweep: 8e3,
        gain: 0.1 + T * 0.03,
      }),
      T >= 3 &&
        qe(M, _, 0.5, {
          bp: 3e3,
          q: 1.5,
          sweep: 900,
          gain: 0.08,
          rev: 0.4,
        }));
  }
  var Ti = {
    classic: {
      base: 42,
      sawDet: 12,
      subMix: 0.55,
      noiseMix: 0.2,
      cut: 900,
    },
    hotrod: {
      base: 38,
      sawDet: 20,
      subMix: 0.7,
      noiseMix: 0.28,
      cut: 800,
    },
    van: {
      base: 34,
      sawDet: 8,
      subMix: 0.8,
      noiseMix: 0.22,
      cut: 700,
    },
    bike: {
      base: 58,
      sawDet: 16,
      subMix: 0.3,
      noiseMix: 0.16,
      cut: 1200,
    },
    hover: {
      base: 46,
      sawDet: 26,
      subMix: 0.4,
      noiseMix: 0.4,
      cut: 1100,
    },
    truck: {
      base: 30,
      sawDet: 10,
      subMix: 0.9,
      noiseMix: 0.26,
      cut: 620,
    },
    wedge: {
      base: 48,
      sawDet: 14,
      subMix: 0.45,
      noiseMix: 0.18,
      cut: 1050,
    },
    buggy: {
      base: 40,
      sawDet: 22,
      subMix: 0.6,
      noiseMix: 0.34,
      cut: 860,
    },
  };
  function An(M, _) {
    var T = Ti[_] || Ti.classic,
      S = {
        slot: M,
        K: T,
        kind: _,
        on: !1,
        lastGear: 0,
        idle: 0,
        silentFor: 0,
        lastSeen: 0,
      },
      E = m.currentTime;
    ((S.out = m.createGain()),
      (S.out.gain.value = 0),
      (S.pan = m.createStereoPanner ? m.createStereoPanner() : m.createGain()),
      S.pan.pan && (S.pan.pan.value = 0),
      S.out.connect(S.pan),
      S.pan.connect(Z),
      (S.filt = ce("lowpass", T.cut, 1.4, 2)),
      (S.shaper = m.createWaveShaper()),
      (S.shaper.curve = Vr(0.5)),
      S.filt.out.connect(S.shaper),
      S.shaper.connect(S.out),
      (S.o1 = m.createOscillator()),
      S.o1.setPeriodicWave(ci("saw")),
      (S.o2 = m.createOscillator()),
      S.o2.setPeriodicWave(ci("saw")),
      (S.o2.detune.value = T.sawDet),
      (S.sub = m.createOscillator()),
      (S.sub.type = "square"),
      (S.g1 = m.createGain()),
      (S.g1.gain.value = 0.3),
      (S.g2 = m.createGain()),
      (S.g2.gain.value = 0.24),
      (S.gs = m.createGain()),
      (S.gs.gain.value = T.subMix * 0.17),
      S.o1.connect(S.g1),
      S.g1.connect(S.filt.in),
      S.o2.connect(S.g2),
      S.g2.connect(S.filt.in),
      S.sub.connect(S.gs),
      S.gs.connect(S.filt.in),
      (S.noise = m.createBufferSource()),
      (S.noise.buffer = fe),
      (S.noise.loop = !0),
      (S.nf = m.createBiquadFilter()),
      (S.nf.type = "bandpass"),
      (S.nf.frequency.value = 1200),
      (S.nf.Q.value = 0.55),
      (S.gn = m.createGain()),
      (S.gn.gain.value = T.noiseMix * 0.3),
      S.noise.connect(S.nf),
      S.nf.connect(S.gn),
      S.gn.connect(S.filt.in),
      (S.whine = m.createOscillator()),
      (S.whine.type = "sawtooth"),
      (S.gw = m.createGain()),
      (S.gw.gain.value = 0),
      S.whine.connect(S.gw),
      S.gw.connect(S.out),
      (S.o1.frequency.value = T.base),
      (S.o2.frequency.value = T.base),
      (S.sub.frequency.value = T.base * 0.5),
      (S.whine.frequency.value = 900));
    try {
      (S.o1.start(E), S.o2.start(E), S.sub.start(E), S.noise.start(E), S.whine.start(E));
    } catch {}
    return ((S.nodeCount = 15), mr(S.nodeCount), (Mi += S.nodeCount), (sn[M] = S), S);
  }
  function Et(M) {
    var _ = sn[M];
    if (_) {
      var T = m.currentTime;
      try {
        (_.out.gain.cancelScheduledValues(T),
          _.out.gain.setValueAtTime(_.out.gain.value, T),
          _.out.gain.linearRampToValueAtTime(0, T + 0.06));
      } catch {}
      var S = T + 0.09;
      (["o1", "o2", "sub", "noise", "whine"].forEach(function (E) {
        try {
          _[E].stop(S);
        } catch {}
      }),
        x ||
          setTimeout(function () {
            ["o1", "o2", "sub", "noise", "whine", "g1", "g2", "gs", "gn", "gw", "nf", "shaper", "out", "pan"].forEach(
              function (E) {
                try {
                  _[E].disconnect();
                } catch {}
              },
            );
            try {
              (_.filt.in.disconnect(), _.filt.out.disconnect());
            } catch {}
          }, 200),
        gr(_.nodeCount),
        (Mi -= _.nodeCount),
        Mi < 0 && (Mi = 0),
        delete sn[M]);
    }
  }
  var ue = {};
  ((ue.__bfx = !0),
    (ue.ready = !1),
    (ue.version = "bfx-audio-1.0"),
    (ue.ctx = null),
    (ue.stats = {
      nodes: 0,
      peak: 0,
      voices: 0,
      dropped: 0,
    }),
    (ue.init = function (M, _) {
      if (w) return !0;
      if (A) return !1;
      try {
        if (((_ = _ || {}), (xt = !!_.lowPower), M && typeof M.createGain == "function")) m = M;
        else {
          var T = window.AudioContext || window.webkitAudioContext;
          if (!T) return ((A = !0), !1);
          m = new T({
            latencyHint: "interactive",
          });
        }
        if (
          ((x = typeof m.startRendering == "function" && !m.resume),
          typeof m.startRendering == "function" && m.length !== void 0 && (x = !0),
          (b = _.renderSeconds || (x && m.length ? m.length / m.sampleRate : 0)),
          (he = Hr(2, "white")),
          (fe = Hr(2, "pink")),
          $t(),
          ["saw", "square", "pulse25", "organ", "brass", "glass", "clav", "strings", "nylon", "rhodes"].forEach(ci),
          (w = !0),
          (ue.ready = !0),
          (ue.ctx = m),
          !x && m.state === "suspended")
        )
          try {
            m.resume();
          } catch {}
        return (Xs(), !0);
      } catch {
        return ((A = !0), (w = !1), (ue.ready = !1), !1);
      }
    }),
    (ue.master = function (M) {
      return (
        (Oe.master = e(M === void 0 ? Oe.master : M, 0, 1.5)),
        w && !Oe.muted && L(C.gain, m.currentTime, Oe.master, 0.02),
        Oe.master
      );
    }),
    (ue.musicVol = function (M) {
      return (
        (Oe.music = e(M === void 0 ? Oe.music : M, 0, 1.5)),
        w && L(W.gain, m.currentTime, Oe.music, 0.03),
        Oe.music
      );
    }),
    (ue.sfxVol = function (M) {
      return (
        (Oe.sfx = e(M === void 0 ? Oe.sfx : M, 0, 1.5)),
        w && (L($.gain, m.currentTime, Oe.sfx, 0.03), L(Z.gain, m.currentTime, Oe.sfx * 0.55, 0.03)),
        Oe.sfx
      );
    }),
    (ue.mute = function (M) {
      return (
        (Oe.muted = M === void 0 ? !Oe.muted : !!M),
        w && L(C.gain, m.currentTime, Oe.muted ? 0 : Oe.master, 0.02),
        Oe.muted
      );
    }),
    (ue.setMusic = function (M, _) {
      if (!w) return !1;
      _ = _ || {};
      var T = nt(M);
      if (!T) return (ue.stopMusic(_.fade || 400), !1);
      if (le.playing && le.id === T && !_.restart) return !0;
      try {
        var S = m.currentTime,
          E = _.fade === void 0 ? 0.36 : _.fade / 1e3;
        if (le.playing)
          for (var H = 0; H < d.length; H++) {
            var K = re[d[H].id];
            try {
              (K.gain.cancelScheduledValues(S),
                K.gain.setValueAtTime(le.stemLevel[d[H].id], S),
                K.gain.linearRampToValueAtTime(0, S + E));
            } catch {}
            le.stemLevel[d[H].id] = 0;
          }
        else E = 0.02;
        var ne = S + E + 0.05;
        ((le.id = T),
          (le.song = g[T]),
          (le.playing = !0),
          (le.finalLap = !!_.finalLap),
          (le.pendingFinalLap = null),
          (le.transpose = le.targetTranspose = le.finalLap ? 1 : 0),
          (le.intensity = _.intensity === void 0 ? le.intensity : e(_.intensity, 0, 1)),
          (le.bpm = Ga()),
          (le.spb = 60 / le.bpm),
          (le.beat = 0),
          (le.nextBeatTime = ne),
          (le.startTime = ne),
          (le.riserArmed = !1));
        for (var se = 0; se < d.length; se++) le.stemLevel[d[se].id] = 0;
        return (
          Pi(ne),
          Xa(ne),
          ge && L(ge.gain, S, 0.16 + (le.song.revMix || 0.3) * 0.34, 0.2),
          X && L(X.gain, S, 0.1 + (le.song.dlyMix || 0.2) * 0.55, 0.2),
          x ? En() : st(),
          !0
        );
      } catch {
        return !1;
      }
    }),
    (ue.musicIntensity = function (M) {
      return ((M = e(M === void 0 ? le.intensity : M, 0, 1)), (le.intensity = M), M);
    }),
    (ue.finalLap = function (M) {
      return (
        (M = !!M),
        (M === le.finalLap && le.pendingFinalLap === null) ||
          ((le.pendingFinalLap = M),
          le.playing || ((le.finalLap = M), (le.targetTranspose = M ? 1 : 0), (le.pendingFinalLap = null)),
          x && En()),
        M
      );
    }),
    (ue.duck = function (M, _) {
      if (w) {
        ((M = e(M === void 0 ? 0.45 : M, 0, 1)), (_ = _ === void 0 ? 420 : _));
        var T = m.currentTime;
        try {
          (B.gain.cancelScheduledValues(T),
            B.gain.setValueAtTime(B.gain.value, T),
            B.gain.linearRampToValueAtTime(M, T + 0.05),
            B.gain.setValueAtTime(M, T + _ / 1e3),
            B.gain.linearRampToValueAtTime(1, T + _ / 1e3 + 0.35));
        } catch {}
      }
    }),
    (ue.stopMusic = function (M) {
      if (w) {
        for (var _ = (M === void 0 ? 600 : M) / 1e3, T = m.currentTime, S = 0; S < d.length; S++) {
          var E = re[d[S].id];
          try {
            (E.gain.cancelScheduledValues(T),
              E.gain.setValueAtTime(le.stemLevel[d[S].id], T),
              E.gain.linearRampToValueAtTime(0, T + Math.max(0.02, _)));
          } catch {}
          le.stemLevel[d[S].id] = 0;
        }
        ((le.playing = !1), (le.id = null));
      }
    }),
    (ue.sfx = function (M, _) {
      if (!w) return !1;
      if (!x && ht - Mi >= qt) return (gn++, !1);
      try {
        _ = _ || {};
        var T = hi[M];
        if (!T) return !1;
        var S = m.currentTime + (_.delay || 0) + 0.005,
          E = js(_.pan),
          H = _.vol === void 0 ? 1 : e(_.vol, 0, 2),
          K = _.pitch === void 0 ? 1 : e(_.pitch, 0.4, 2.5);
        if (H < 0.999 || K !== 1) {
          var ne = m.createGain();
          ((ne.gain.value = H),
            ne.connect(E),
            mr(1),
            x ||
              setTimeout(function () {
                try {
                  ne.disconnect();
                } catch {}
                gr(1);
              }, 2500),
            (E = ne));
        }
        var se = {
          vol: H,
          pitch: K,
          n: _.n,
          place: _.place,
          force: _.force,
          hard: _.hard,
          dur: _.dur,
        };
        return (
          K !== 1 && (se.pitchScale = K),
          i0(K, function () {
            T(E, S, se);
          }),
          !0
        );
      } catch {
        return !1;
      }
    }));
  var qs = 1;
  function i0(M, _) {
    if (M === 1) {
      _();
      return;
    }
    qs = M;
    try {
      _();
    } finally {
      qs = 1;
    }
  }
  var n0 = tt,
    r0 = It;
  ((tt = function (M, _, T, S, E, H, K) {
    return n0(M, _, T * qs, S, E, H, K);
  }),
    (It = function (M, _, T, S, E, H, K, ne) {
      return r0(M, _, T * qs, S * qs, E, H, K, ne);
    }),
    (ue.engine = function (M, _) {
      if (w)
        try {
          _ = _ || {};
          var T = sn[M];
          if (!_.on) {
            if (T) {
              var S = m.currentTime;
              (L(T.out.gain, S, 0, 0.05), (T.silentFor = (T.silentFor || 0) + 1), T.silentFor > 40 && Et(M));
            }
            return;
          }
          var E = e(_.vol === void 0 ? 1 : _.vol, 0, 1.5);
          if (!T) {
            var H = Object.keys(sn);
            if (H.length >= Si) {
              for (var K = null, ne = E, se = 0; se < H.length; se++) {
                var xe = sn[H[se]].lastVol;
                (xe === void 0 && (xe = 1), xe < ne && ((ne = xe), (K = H[se])));
              }
              if (K === null) return;
              Et(K);
            }
            T = An(M, _.kind || "classic");
          }
          ((T.lastVol = E), (T.silentFor = 0));
          var be = x && typeof _.at == "number" ? _.at : m.currentTime,
            Fe = T.K,
            ke = e(_.rpm === void 0 ? 0.3 : _.rpm, 0, 1),
            De = e(_.load === void 0 ? 0.5 : _.load, 0, 1),
            at = e(_.boost || 0, 0, 1),
            Se = E,
            ct = e(_.pan || 0, -1, 1),
            Ze = 5,
            dt = Math.min(Ze - 1, Math.floor(ke * Ze)),
            Ve = ke * Ze - dt,
            Dt = Fe.base * Math.pow(1.2, dt) * (0.82 + 0.52 * Ve) * (1 + at * 0.1);
          (L(T.o1.frequency, be, Dt, 0.035),
            L(T.o2.frequency, be, Dt * 1.005, 0.035),
            L(T.sub.frequency, be, Dt * 0.5, 0.05),
            L(T.nf.frequency, be, 900 + ke * 4200, 0.06));
          var vt = Fe.cut * (0.8 + De * 1.6) * (1 + ke * 1.9) * (1 + at * 0.6);
          ((vt = e(vt, 320, 13e3)),
            L(T.filt.freq, be, vt, 0.05),
            T.filt.freq2 && L(T.filt.freq2, be, vt * 1.1, 0.05));
          var Vt = Se * (0.18 + 0.36 * ke + 0.12 * De);
          if (
            (L(T.out.gain, be, Vt, 0.05),
            T.pan.pan && L(T.pan.pan, be, ct, 0.06),
            L(T.gw.gain, be, at * Se * 0.1, 0.08),
            L(T.whine.frequency, be, 700 + at * 2600 + ke * 900, 0.1),
            dt > T.lastGear)
          ) {
            var wt = be + 0.005;
            try {
              (T.out.gain.cancelScheduledValues(wt),
                T.out.gain.setValueAtTime(Vt, wt),
                T.out.gain.linearRampToValueAtTime(Vt * 0.35, wt + 0.03),
                T.out.gain.linearRampToValueAtTime(Vt, wt + 0.095));
            } catch {}
            (Ct(T.filt.freq, wt, vt), fi(T.filt.freq, wt + 0.03, vt * 0.45), fi(T.filt.freq, wt + 0.1, vt));
          }
          T.lastGear = dt;
        } catch {}
    }),
    (ue.stopEngines = function () {
      if (w) for (var M in sn) sn.hasOwnProperty(M) && Et(M);
    }),
    (ue.listener = function (M, _) {
      if ((M && ((Ri[0] = M[0]), (Ri[1] = M[1]), (Ri[2] = M[2])), _)) {
        var T = Math.hypot(_[0], _[2]) || 1;
        ((j[0] = _[0] / T), (j[2] = _[2] / T), (Yi[0] = j[2]), (Yi[2] = -j[0]));
      }
    }),
    (ue.worldSfx = function (M, _, T) {
      if (!w) return !1;
      if (((T = T || {}), !_)) return ue.sfx(M, T);
      var S = _[0] - Ri[0],
        E = (_[1] || 0) - Ri[1],
        H = _[2] - Ri[2],
        K = Math.sqrt(S * S + E * E + H * H),
        ne = T.maxDistance || 140;
      if (K > ne) return !1;
      var se = 1 / (1 + (K * K) / 784),
        xe = e(((S * Yi[0] + H * Yi[2]) / Math.max(6, K)) * 1.1, -1, 1);
      return ue.sfx(M, {
        vol: (T.vol === void 0 ? 1 : T.vol) * se,
        pan: xe,
        pitch: T.pitch,
        delay: (T.delay || 0) + Math.min(0.22, K / 340),
        n: T.n,
        place: T.place,
        force: T.force,
        hard: T.hard,
        dur: T.dur,
      });
    }),
    (ue.suspend = function () {
      if (!(!w || x)) {
        Bi();
        try {
          m.suspend();
        } catch {}
      }
    }),
    (ue.resume = function () {
      if (!(!w || x)) {
        try {
          m.resume();
        } catch {}
        if (le.playing) {
          var M = m.currentTime;
          le.nextBeatTime < M && (le.nextBeatTime = M + 0.06);
        }
        Xs();
      }
    }),
    (ue.nodeCount = function () {
      return ht + Je;
    }),
    (ue.peakNodes = function () {
      return Ie + Je;
    }),
    (ue.debug = function () {
      return (
        (ue.stats.nodes = ht + Je),
        (ue.stats.peak = Ie + Je),
        (ue.stats.voices = yt),
        (ue.stats.dropped = gn),
        {
          nodes: ht + Je,
          peak: Ie + Je,
          voiceNodes: ht - Mi,
          engineNodes: Mi,
          fixedNodes: Je,
          maxNodes: qt,
          maxEngines: Si,
          voices: yt,
          dropped: gn,
          music: le.id,
          bar: Math.floor(le.beat / 4),
          bpm: le.bpm,
          intensity: le.intensity,
          finalLap: le.finalLap,
          transpose: le.transpose,
          stems: JSON.parse(JSON.stringify(le.stemLevel)),
          state: m ? m.state : "none",
        }
      );
    }),
    (ue.musicIds = function () {
      return Object.keys(g).concat(Object.keys(y));
    }),
    (ue.sfxNames = function () {
      return Object.keys(hi);
    }),
    (ue._offlineAuto = function (M) {
      zi = M || null;
    }),
    (ue._offlineFill = function (M, _) {
      ((b = M), _ && (zi = _), x && En(), (zi = null));
    }),
    (ue.resetPeak = function () {
      ((Ie = ht), (gn = 0), (yt = 0));
    }),
    (ue._tick = st));
  var jl = ["afterglow", "megastore", "lakeshore", "frostbyte", "canyon", "gigabit"],
    s0 = {
      chicagoafterglow: "afterglow",
      afterglow: "afterglow",
      neoncity: "afterglow",
      xfinitymegastore: "megastore",
      megastore: "megastore",
      retailremix: "megastore",
      lakefrontrush: "lakeshore",
      lakefront: "lakeshore",
      lakeshore: "lakeshore",
      coastalrun: "lakeshore",
      frostbytesummit: "frostbyte",
      frostbyte: "frostbyte",
      alpineice: "frostbyte",
      signalcanyon: "canyon",
      canyon: "canyon",
      desertheat: "canyon",
      fiberrun: "canyon",
      fiber: "canyon",
      gigabitgalaxy: "gigabit",
      gigabit: "gigabit",
      orbitalcircuit: "gigabit",
      menu: "menu",
      main: "menu",
      title: "menu",
      home: "menu",
      garage: "menu",
      circuits: "menu",
      settings: "menu",
      howto: "menu",
      driver: "menu",
      results: "results",
      standings: "results",
      defeat: "results",
      lose: "results",
      victory: "victory",
      win: "victory",
      podium: "victory",
      champion: "victory",
    };
  function a0(M) {
    return String(M)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
  }
  ((nt = function (M) {
    if (M == null || M === "") return null;
    if (typeof M == "number") {
      var _ = M | 0;
      return _ >= 0 && _ < jl.length ? jl[_] : null;
    }
    if (g[M]) return M;
    var T = s0[a0(M)];
    return T && g[T] ? T : y[M] && g[y[M]] ? y[M] : /^[0-5]$/.test(String(M)) ? jl[+M] : null;
  }),
    (ue.trackSong = function (M) {
      return nt(M);
    }),
    (ue.musicId = function () {
      return le.id;
    }));
  var jr = {};
  function Ju(M, _) {
    var T = jr[M];
    if (T) return T;
    if (!w) return null;
    try {
      var S = m.createBufferSource();
      ((S.buffer = _.pink ? fe : he), (S.loop = !0), (S.playbackRate.value = _.rate || 1));
      var E = m.createBiquadFilter();
      ((E.type = _.type || "bandpass"), (E.frequency.value = _.freq), (E.Q.value = _.q || 4));
      var H = m.createGain();
      return (
        (H.gain.value = 0),
        S.connect(E),
        E.connect(H),
        H.connect(Z),
        S.start(x ? 0 : m.currentTime),
        (Je += 3),
        (T = jr[M] =
          {
            src: S,
            f: E,
            g: H,
            lvl: 0,
          }),
        T
      );
    } catch {
      return null;
    }
  }
  var o0 = 0,
    ql = 0;
  ((ue.drift = function (M, _) {
    if (w) {
      var T = Ju("drift", {
        freq: 1900,
        q: 1.4,
        rate: 1.05,
      });
      if (T) {
        ((M = e(M || 0, 0, 1)), (_ = e(_ === void 0 ? 0 : _, 0, 1)));
        var S = m.currentTime;
        (L(T.g.gain, S, M * 0.62, M > T.lvl ? 0.03 : 0.09),
          L(T.f.frequency, S, 1500 + _ * 2600 + M * 500, 0.06),
          L(T.f.Q, S, 1.3 + _ * 1.8, 0.08),
          (T.lvl = M));
        var E = _ >= 0.98 ? 3 : _ >= 0.59 ? 2 : _ >= 0.2 ? 1 : 0;
        (M > 0.05 &&
          E > ql &&
          ue.sfx("driftCharge", {
            n: E,
            vol: 0.9,
          }),
          (ql = M > 0.05 ? E : 0),
          (o0 = _));
      }
    }
  }),
    (ue.scrape = function (M, _) {
      if (w) {
        var T = Ju("scrape", {
          freq: 3e3,
          q: 2.2,
          rate: 0.85,
        });
        if (T) {
          ((M = e(M || 0, 0, 1)), (_ = Math.max(0, _ === void 0 ? 45 : _)));
          var S = m.currentTime;
          (L(T.g.gain, S, M * 0.55, M > T.lvl ? 0.02 : 0.08),
            L(T.f.frequency, S, 1800 + _ * 34, 0.05),
            T.src.playbackRate.setTargetAtTime(e(0.6 + _ / 90, 0.4, 1.9), S, 0.06),
            (T.lvl = M));
        }
      }
    }));
  function $u(M) {
    for (var _ in jr)
      if (jr.hasOwnProperty(_)) {
        try {
          L(jr[_].g.gain, m.currentTime, 0, M || 0.05);
        } catch {}
        jr[_].lvl = 0;
      }
    ql = 0;
  }
  ((hi.driftCharge = function (M, _, T) {
    var S = e(T.n || 1, 1, 3);
    (tt(M, _, 760 * Math.pow(1.26, S), 0.06, 0.09 + 0.035 * S, "glass", {
      rel: 0.09,
      rev: 0.28,
    }),
      tt(M, _, 1520 * Math.pow(1.26, S), 0.04, 0.05, "glass", {
        rel: 0.07,
      }));
  }),
    (hi.deadZone = function (M, _) {
      (It(M, _, 900, 90, 0.42, 0.2, "square", {
        cut: 2200,
        q: 2,
        rev: 0.35,
      }),
        qe(M, _, 0.4, {
          lp: 900,
          sweep: 160,
          gain: 0.16,
        }));
    }),
    (hi.empty = function (M, _) {
      (tt(M, _, 330, 0.06, 0.1, "square", {
        rel: 0.07,
      }),
        tt(M, _ + 0.06, 247, 0.14, 0.09, "square", {
          rel: 0.16,
        }));
    }));
  var Ys = 0.25;
  ((ue.raceIntensity = function (M) {
    M = M || {};
    var _ = M.laps || 3,
      T = e(M.lap || 1, 1, _),
      S = M.field || 8,
      E = e(M.position || 1, 1, S),
      H = M.topSpeed || 55,
      K = (T - 1) / Math.max(1, _ - 1),
      ne = (E - 1) / Math.max(1, S - 1),
      se = 1 - Math.abs(ne - 0.45) * 1.25,
      xe = e((M.speed || 0) / H, 0, 1),
      be = (M.boost ? 0.5 : 0) + (M.drift ? 0.3 : 0),
      Fe = 0.2 + K * 0.34 + e(se, 0, 1) * 0.2 + xe * 0.18 + e(be, 0, 0.8) * 0.12;
    return (
      (Fe = e(Fe, 0, 1)),
      (Ys += (Fe - Ys) * e(M.dt === void 0 ? 0.02 : M.dt * 1.1, 0.002, 0.25)),
      ue.musicIntensity(Ys),
      Ys
    );
  }),
    (ue.intensity = function () {
      return le.intensity;
    }),
    (ue.countdown = function (M) {
      if (w) {
        if (!M || M <= 0) {
          (ue.sfx("go"), ue.duck(0.6, 420));
          return;
        }
        ue.sfx("countdown", {
          n: e(M, 1, 3),
        });
      }
    }),
    (ue.lap = function (M, _) {
      w && (_ ? (ue.finalLap(!0), ue.sfx("finalLap"), ue.duck(0.62, 700)) : ue.sfx("lapDing"));
    }),
    (ue.item = function (M) {
      switch (M) {
        case "box":
        case "ready":
          ue.sfx("itemBox");
          break;
        case "get":
          ue.sfx("itemGet");
          break;
        case "boost":
          ue.sfx("boostPad");
          break;
        case "shield":
          ue.sfx("shield");
          break;
        case "pulse":
          ue.sfx("zap");
          break;
        case "deadzone":
          ue.sfx("deadZone");
          break;
        case "blocked":
          ue.sfx("shieldBreak");
          break;
        case "empty":
          ue.sfx("empty");
          break;
        default:
          ue.sfx("itemUse");
          break;
      }
      return !0;
    }),
    (ue.hitBy = function (M) {
      return (
        ue.sfx("hit"),
        M === "trap" &&
          ue.sfx("explode", {
            vol: 0.7,
          }),
        ue.duck(0.7, 300),
        !0
      );
    }),
    (ue.click = function (M) {
      return (ue.sfx(M === "back" ? "menuBack" : M === "move" ? "menuMove" : "menuSelect"), !0);
    }),
    (ue.finishRace = function (M) {
      (ue.sfx("finish"),
        ue.sfx("crowdCheer", {
          delay: 0.18,
          dur: 2.2,
          vol: M <= 3 ? 1 : 0.55,
        }),
        M !== void 0 &&
          ue.sfx("place", {
            place: M,
            delay: 0.9,
          }));
    }),
    (ue.raceEvent = function (M, _) {
      if (!w) return !1;
      var T = String(M || "").toUpperCase();
      return _ === "count"
        ? (ue.countdown(T === "GO!" ? 0 : parseInt(T, 10) || 0), !0)
        : _ === "lap"
          ? (ue.lap(0, T.indexOf("FINAL") >= 0), !0)
          : _ === "hit"
            ? T.indexOf("SCRAPE") >= 0
              ? (ue.sfx("bump", {
                  force: 0.7,
                }),
                ue.sfx("scrape", {
                  dur: 0.3,
                }),
                !0)
              : (ue.hitBy("pulse"), !0)
            : _ === "boost"
              ? T.indexOf("ULTRA") >= 0
                ? ue.sfx("driftBoost3")
                : T.indexOf("DRIFT") >= 0
                  ? ue.sfx("driftBoost2")
                  : T.indexOf("STRIP") >= 0
                    ? (ue.sfx("boostPad"), !0)
                    : (ue.duck(0.72, 320),
                      ue.sfx("boostPad"),
                      ue.sfx("itemUse", {
                        vol: 0.7,
                      }),
                      !0)
              : T.indexOf("POWER-UP") >= 0
                ? ue.item("box")
                : T.indexOf("SHIELD BLOCKED") >= 0
                  ? ue.item("blocked")
                  : T.indexOf("SHIELD") >= 0
                    ? ue.item("shield")
                    : T.indexOf("PULSE HIT") >= 0
                      ? ue.item("pulse")
                      : T.indexOf("NO RIVAL") >= 0
                        ? ue.item("empty")
                        : T.indexOf("DEAD ZONE") >= 0
                          ? ue.item("deadzone")
                          : (ue.sfx("menuMove", {
                              vol: 0.6,
                            }),
                            !0);
    }),
    (ue.update = function (M, _, T) {
      if (w) {
        T = T || {};
        var S = T.topSpeed || 60,
          E = e(M / S, 0, 1);
        (ue.engine(0, {
          on: !!_,
          rpm: E,
          load: T.load === void 0 ? 0.55 : T.load,
          boost: T.boost ? 1 : 0,
          vol: 1,
          pan: 0,
          kind: T.kind || "classic",
        }),
          _ &&
            T.lap &&
            ue.raceIntensity({
              position: T.position,
              field: T.field,
              lap: T.lap,
              laps: T.laps,
              speed: M,
              topSpeed: S,
              boost: T.boost,
              drift: T.drift,
              dt: T.dt,
            }),
          T.drift !== void 0 && ue.drift(T.drift ? 1 : 0, T.driftCharge || 0),
          T.wallScrape !== void 0 && ue.scrape(e(T.wallScrape, 0, 1), M));
      }
    }),
    (ue.unlock = function (M) {
      var _ = ue.init(void 0, M);
      if (_ && m && m.state !== "running")
        try {
          m.resume();
        } catch {}
      return (_ && Xs(), _);
    }),
    (ue.lowPower = function () {
      return xt;
    }),
    (ue.budget = function (M, _) {
      return (
        typeof M == "number" && (qt = Math.max(48, M | 0)),
        typeof _ == "number" && (Si = e(_ | 0, 1, 8)),
        {
          maxNodes: qt,
          maxEngines: Si,
        }
      );
    }),
    (ue.stopAll = function (M) {
      w && (ue.stopMusic(M === void 0 ? 400 : M), ue.stopEngines(), $u(0.06), ue.finalLap(!1), (Ys = 0.25));
    }));
  var l0 = ue.suspend;
  ue.suspend = function () {
    (w && $u(0.03), l0());
  };
  var c0 = ue.init;
  return (
    (ue.init = function (M, _) {
      _ = _ || {};
      var T = c0(M, _);
      return (
        T &&
          ((qt = typeof _.maxNodes == "number" ? Math.max(48, _.maxNodes | 0) : _.lowPower ? 90 : 150),
          (Si = typeof _.maxEngines == "number" ? e(_.maxEngines | 0, 1, 8) : _.lowPower ? 2 : 4)),
        T
      );
    }),
    ue
  );
}
