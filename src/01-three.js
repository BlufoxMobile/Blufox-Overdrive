var fp = 1,
  ba = 2,
  Nn = 3,
  Ni = 0,
  ai = 1,
  ii = 2;
var nn = 2;
var AddEquation = 100;
var SrcAlphaFactor = 204,
  OneMinusSrcAlphaFactor = 205;
var mp = 0,
  b0 = 1,
  M0 = 2,
  ir = 0,
  S0 = 1,
  w0 = 2,
  T0 = 3,
  cl = 4,
  E0 = 5,
  A0 = 6,
  C0 = 7;
var UVMapping = 300,
  CubeReflectionMapping = 301,
  CubeRefractionMapping = 302,
  EquirectangularReflectionMapping = 303,
  EquirectangularRefractionMapping = 304,
  CubeUVReflectionMapping = 306,
  RepeatWrapping = 1e3,
  ClampToEdgeWrapping = 1001,
  MirroredRepeatWrapping = 1002,
  NearestFilter = 1003,
  R0 = 1004;
var Ka = 1005;
var LinearFilter = 1006,
  Kl = 1007;
var Ar = 1008;
var UnsignedByteType = 1009,
  ByteType = 1010,
  ShortType = 1011,
  UnsignedShortType = 1012,
  IntType = 1013,
  UnsignedIntType = 1014,
  FloatType = 1015,
  HalfFloatType = 1016,
  UnsignedShort4444Type = 1017,
  UnsignedShort5551Type = 1018,
  UnsignedInt248Type = 1020,
  UnsignedInt5999Type = 35902,
  AlphaFormat = 1021,
  RGBFormat = 1022,
  RGBAFormat = 1023,
  LuminanceFormat = 1024,
  LuminanceAlphaFormat = 1025,
  DepthFormat = 1026,
  DepthStencilFormat = 1027,
  RedFormat = 1028,
  RedIntegerFormat = 1029,
  RGFormat = 1030,
  RGIntegerFormat = 1031;
var RGBAIntegerFormat = 1033,
  RGB_S3TC_DXT1_Format = 33776,
  RGBA_S3TC_DXT1_Format = 33777,
  RGBA_S3TC_DXT3_Format = 33778,
  RGBA_S3TC_DXT5_Format = 33779,
  RGB_PVRTC_4BPPV1_Format = 35840,
  RGB_PVRTC_2BPPV1_Format = 35841,
  RGBA_PVRTC_4BPPV1_Format = 35842,
  RGBA_PVRTC_2BPPV1_Format = 35843,
  RGB_ETC1_Format = 36196,
  RGB_ETC2_Format = 37492,
  RGBA_ETC2_EAC_Format = 37496,
  RGBA_ASTC_4x4_Format = 37808,
  RGBA_ASTC_5x4_Format = 37809,
  RGBA_ASTC_5x5_Format = 37810,
  RGBA_ASTC_6x5_Format = 37811,
  RGBA_ASTC_6x6_Format = 37812,
  RGBA_ASTC_8x5_Format = 37813,
  RGBA_ASTC_8x6_Format = 37814,
  RGBA_ASTC_8x8_Format = 37815,
  RGBA_ASTC_10x5_Format = 37816,
  RGBA_ASTC_10x6_Format = 37817,
  RGBA_ASTC_10x8_Format = 37818,
  RGBA_ASTC_10x10_Format = 37819,
  RGBA_ASTC_12x10_Format = 37820,
  RGBA_ASTC_12x12_Format = 37821,
  RGBA_BPTC_Format = 36492,
  RGB_BPTC_SIGNED_Format = 36494,
  RGB_BPTC_UNSIGNED_Format = 36495,
  RED_RGTC1_Format = 36283,
  SIGNED_RED_RGTC1_Format = 36284,
  RED_GREEN_RGTC2_Format = 36285,
  SIGNED_RED_GREEN_RGTC2_Format = 36286;
var InterpolateDiscrete = 2300,
  InterpolateLinear = 2301,
  InterpolateSmooth = 2302,
  ZeroCurvatureEnding = 2400,
  ZeroSlopeEnding = 2401,
  WrapAroundEnding = 2402;
var er = "",
  Ft = "srgb",
  LinearSRGBColorSpace = "srgb-linear",
  DisplayP3ColorSpace = "display-p3",
  LinearDisplayP3ColorSpace = "display-p3-linear",
  LinearTransfer = "linear",
  Nt = "srgb",
  Rec709Primaries = "rec709",
  zo = "p3";
var KeepStencilOp = 7680;
var Ap = 515;
var StaticDrawUsage = 35044;
var GLSL3 = "300 es",
  WebGLCoordinateSystem = 2e3,
  WebGPUCoordinateSystem = 2001,
  sr = class {
    addEventListener(e, t) {
      this._listeners === void 0 && (this._listeners = {});
      let i = this._listeners;
      (i[e] === void 0 && (i[e] = []), i[e].indexOf(t) === -1 && i[e].push(t));
    }
    hasEventListener(e, t) {
      if (this._listeners === void 0) return !1;
      let i = this._listeners;
      return i[e] !== void 0 && i[e].indexOf(t) !== -1;
    }
    removeEventListener(e, t) {
      if (this._listeners === void 0) return;
      let i = this._listeners[e];
      if (i !== void 0) {
        let r = i.indexOf(t);
        r !== -1 && i.splice(r, 1);
      }
    }
    dispatchEvent(e) {
      if (this._listeners === void 0) return;
      let t = this._listeners[e.type];
      if (t !== void 0) {
        e.target = this;
        let i = t.slice(0);
        for (let r = 0, s = i.length; r < s; r++) i[r].call(this, e);
        e.target = null;
      }
    }
  },
  mi = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "0a",
    "0b",
    "0c",
    "0d",
    "0e",
    "0f",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "1a",
    "1b",
    "1c",
    "1d",
    "1e",
    "1f",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "2a",
    "2b",
    "2c",
    "2d",
    "2e",
    "2f",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "3a",
    "3b",
    "3c",
    "3d",
    "3e",
    "3f",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "4a",
    "4b",
    "4c",
    "4d",
    "4e",
    "4f",
    "50",
    "51",
    "52",
    "53",
    "54",
    "55",
    "56",
    "57",
    "58",
    "59",
    "5a",
    "5b",
    "5c",
    "5d",
    "5e",
    "5f",
    "60",
    "61",
    "62",
    "63",
    "64",
    "65",
    "66",
    "67",
    "68",
    "69",
    "6a",
    "6b",
    "6c",
    "6d",
    "6e",
    "6f",
    "70",
    "71",
    "72",
    "73",
    "74",
    "75",
    "76",
    "77",
    "78",
    "79",
    "7a",
    "7b",
    "7c",
    "7d",
    "7e",
    "7f",
    "80",
    "81",
    "82",
    "83",
    "84",
    "85",
    "86",
    "87",
    "88",
    "89",
    "8a",
    "8b",
    "8c",
    "8d",
    "8e",
    "8f",
    "90",
    "91",
    "92",
    "93",
    "94",
    "95",
    "96",
    "97",
    "98",
    "99",
    "9a",
    "9b",
    "9c",
    "9d",
    "9e",
    "9f",
    "a0",
    "a1",
    "a2",
    "a3",
    "a4",
    "a5",
    "a6",
    "a7",
    "a8",
    "a9",
    "aa",
    "ab",
    "ac",
    "ad",
    "ae",
    "af",
    "b0",
    "b1",
    "b2",
    "b3",
    "b4",
    "b5",
    "b6",
    "b7",
    "b8",
    "b9",
    "ba",
    "bb",
    "bc",
    "bd",
    "be",
    "bf",
    "c0",
    "c1",
    "c2",
    "c3",
    "c4",
    "c5",
    "c6",
    "c7",
    "c8",
    "c9",
    "ca",
    "cb",
    "cc",
    "cd",
    "ce",
    "cf",
    "d0",
    "d1",
    "d2",
    "d3",
    "d4",
    "d5",
    "d6",
    "d7",
    "d8",
    "d9",
    "da",
    "db",
    "dc",
    "dd",
    "de",
    "df",
    "e0",
    "e1",
    "e2",
    "e3",
    "e4",
    "e5",
    "e6",
    "e7",
    "e8",
    "e9",
    "ea",
    "eb",
    "ec",
    "ed",
    "ee",
    "ef",
    "f0",
    "f1",
    "f2",
    "f3",
    "f4",
    "f5",
    "f6",
    "f7",
    "f8",
    "f9",
    "fa",
    "fb",
    "fc",
    "fd",
    "fe",
    "ff",
  ];
var No = Math.PI / 180,
  uh = 180 / Math.PI;
function Ts() {
  let n = (4294967295 * Math.random()) | 0,
    e = (4294967295 * Math.random()) | 0,
    t = (4294967295 * Math.random()) | 0,
    i = (4294967295 * Math.random()) | 0;
  return (
    mi[255 & n] +
    mi[(n >> 8) & 255] +
    mi[(n >> 16) & 255] +
    mi[(n >> 24) & 255] +
    "-" +
    mi[255 & e] +
    mi[(e >> 8) & 255] +
    "-" +
    mi[((e >> 16) & 15) | 64] +
    mi[(e >> 24) & 255] +
    "-" +
    mi[(63 & t) | 128] +
    mi[(t >> 8) & 255] +
    "-" +
    mi[(t >> 16) & 255] +
    mi[(t >> 24) & 255] +
    mi[255 & i] +
    mi[(i >> 8) & 255] +
    mi[(i >> 16) & 255] +
    mi[(i >> 24) & 255]
  ).toLowerCase();
}
function ui(n, e, t) {
  return Math.max(e, Math.min(t, n));
}
function P0(n, e) {
  return ((n % e) + e) % e;
}
function $l(n, e, t) {
  return (1 - t) * n + t * e;
}
function Js(n, e) {
  switch (e.constructor) {
    case Float32Array:
      return n;
    case Uint32Array:
      return n / 4294967295;
    case Uint16Array:
      return n / 65535;
    case Uint8Array:
      return n / 255;
    case Int32Array:
      return Math.max(n / 2147483647, -1);
    case Int16Array:
      return Math.max(n / 32767, -1);
    case Int8Array:
      return Math.max(n / 127, -1);
    default:
      throw new Error("Invalid component type.");
  }
}
function Ii(n, e) {
  switch (e.constructor) {
    case Float32Array:
      return n;
    case Uint32Array:
      return Math.round(4294967295 * n);
    case Uint16Array:
      return Math.round(65535 * n);
    case Uint8Array:
      return Math.round(255 * n);
    case Int32Array:
      return Math.round(2147483647 * n);
    case Int16Array:
      return Math.round(32767 * n);
    case Int8Array:
      return Math.round(127 * n);
    default:
      throw new Error("Invalid component type.");
  }
}
var Vector2 = class n {
    constructor(e = 0, t = 0) {
      ((n.prototype.isVector2 = !0), (this.x = e), (this.y = t));
    }
    get width() {
      return this.x;
    }
    set width(e) {
      this.x = e;
    }
    get height() {
      return this.y;
    }
    set height(e) {
      this.y = e;
    }
    set(e, t) {
      return ((this.x = e), (this.y = t), this);
    }
    setScalar(e) {
      return ((this.x = e), (this.y = e), this);
    }
    setX(e) {
      return ((this.x = e), this);
    }
    setY(e) {
      return ((this.y = e), this);
    }
    setComponent(e, t) {
      switch (e) {
        case 0:
          this.x = t;
          break;
        case 1:
          this.y = t;
          break;
        default:
          throw new Error("index is out of range: " + e);
      }
      return this;
    }
    getComponent(e) {
      switch (e) {
        case 0:
          return this.x;
        case 1:
          return this.y;
        default:
          throw new Error("index is out of range: " + e);
      }
    }
    clone() {
      return new this.constructor(this.x, this.y);
    }
    copy(e) {
      return ((this.x = e.x), (this.y = e.y), this);
    }
    add(e) {
      return ((this.x += e.x), (this.y += e.y), this);
    }
    addScalar(e) {
      return ((this.x += e), (this.y += e), this);
    }
    addVectors(e, t) {
      return ((this.x = e.x + t.x), (this.y = e.y + t.y), this);
    }
    addScaledVector(e, t) {
      return ((this.x += e.x * t), (this.y += e.y * t), this);
    }
    sub(e) {
      return ((this.x -= e.x), (this.y -= e.y), this);
    }
    subScalar(e) {
      return ((this.x -= e), (this.y -= e), this);
    }
    subVectors(e, t) {
      return ((this.x = e.x - t.x), (this.y = e.y - t.y), this);
    }
    multiply(e) {
      return ((this.x *= e.x), (this.y *= e.y), this);
    }
    multiplyScalar(e) {
      return ((this.x *= e), (this.y *= e), this);
    }
    divide(e) {
      return ((this.x /= e.x), (this.y /= e.y), this);
    }
    divideScalar(e) {
      return this.multiplyScalar(1 / e);
    }
    applyMatrix3(e) {
      let t = this.x,
        i = this.y,
        r = e.elements;
      return ((this.x = r[0] * t + r[3] * i + r[6]), (this.y = r[1] * t + r[4] * i + r[7]), this);
    }
    min(e) {
      return ((this.x = Math.min(this.x, e.x)), (this.y = Math.min(this.y, e.y)), this);
    }
    max(e) {
      return ((this.x = Math.max(this.x, e.x)), (this.y = Math.max(this.y, e.y)), this);
    }
    clamp(e, t) {
      return ((this.x = Math.max(e.x, Math.min(t.x, this.x))), (this.y = Math.max(e.y, Math.min(t.y, this.y))), this);
    }
    clampScalar(e, t) {
      return ((this.x = Math.max(e, Math.min(t, this.x))), (this.y = Math.max(e, Math.min(t, this.y))), this);
    }
    clampLength(e, t) {
      let i = this.length();
      return this.divideScalar(i || 1).multiplyScalar(Math.max(e, Math.min(t, i)));
    }
    floor() {
      return ((this.x = Math.floor(this.x)), (this.y = Math.floor(this.y)), this);
    }
    ceil() {
      return ((this.x = Math.ceil(this.x)), (this.y = Math.ceil(this.y)), this);
    }
    round() {
      return ((this.x = Math.round(this.x)), (this.y = Math.round(this.y)), this);
    }
    roundToZero() {
      return ((this.x = Math.trunc(this.x)), (this.y = Math.trunc(this.y)), this);
    }
    negate() {
      return ((this.x = -this.x), (this.y = -this.y), this);
    }
    dot(e) {
      return this.x * e.x + this.y * e.y;
    }
    cross(e) {
      return this.x * e.y - this.y * e.x;
    }
    lengthSq() {
      return this.x * this.x + this.y * this.y;
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y);
    }
    normalize() {
      return this.divideScalar(this.length() || 1);
    }
    angle() {
      return Math.atan2(-this.y, -this.x) + Math.PI;
    }
    angleTo(e) {
      let t = Math.sqrt(this.lengthSq() * e.lengthSq());
      if (t === 0) return Math.PI / 2;
      let i = this.dot(e) / t;
      return Math.acos(ui(i, -1, 1));
    }
    distanceTo(e) {
      return Math.sqrt(this.distanceToSquared(e));
    }
    distanceToSquared(e) {
      let t = this.x - e.x,
        i = this.y - e.y;
      return t * t + i * i;
    }
    manhattanDistanceTo(e) {
      return Math.abs(this.x - e.x) + Math.abs(this.y - e.y);
    }
    setLength(e) {
      return this.normalize().multiplyScalar(e);
    }
    lerp(e, t) {
      return ((this.x += (e.x - this.x) * t), (this.y += (e.y - this.y) * t), this);
    }
    lerpVectors(e, t, i) {
      return ((this.x = e.x + (t.x - e.x) * i), (this.y = e.y + (t.y - e.y) * i), this);
    }
    equals(e) {
      return e.x === this.x && e.y === this.y;
    }
    fromArray(e, t = 0) {
      return ((this.x = e[t]), (this.y = e[t + 1]), this);
    }
    toArray(e = [], t = 0) {
      return ((e[t] = this.x), (e[t + 1] = this.y), e);
    }
    fromBufferAttribute(e, t) {
      return ((this.x = e.getX(t)), (this.y = e.getY(t)), this);
    }
    rotateAround(e, t) {
      let i = Math.cos(t),
        r = Math.sin(t),
        s = this.x - e.x,
        a = this.y - e.y;
      return ((this.x = s * i - a * r + e.x), (this.y = s * r + a * i + e.y), this);
    }
    random() {
      return ((this.x = Math.random()), (this.y = Math.random()), this);
    }
    *[Symbol.iterator]() {
      (yield this.x, yield this.y);
    }
  },
  Matrix3 = class n {
    constructor(e, t, i, r, s, a, o, c, l) {
      ((n.prototype.isMatrix3 = !0),
        (this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1]),
        e !== void 0 && this.set(e, t, i, r, s, a, o, c, l));
    }
    set(e, t, i, r, s, a, o, c, l) {
      let h = this.elements;
      return (
        (h[0] = e),
        (h[1] = r),
        (h[2] = o),
        (h[3] = t),
        (h[4] = s),
        (h[5] = c),
        (h[6] = i),
        (h[7] = a),
        (h[8] = l),
        this
      );
    }
    identity() {
      return (this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this);
    }
    copy(e) {
      let t = this.elements,
        i = e.elements;
      return (
        (t[0] = i[0]),
        (t[1] = i[1]),
        (t[2] = i[2]),
        (t[3] = i[3]),
        (t[4] = i[4]),
        (t[5] = i[5]),
        (t[6] = i[6]),
        (t[7] = i[7]),
        (t[8] = i[8]),
        this
      );
    }
    extractBasis(e, t, i) {
      return (
        e.setFromMatrix3Column(this, 0),
        t.setFromMatrix3Column(this, 1),
        i.setFromMatrix3Column(this, 2),
        this
      );
    }
    setFromMatrix4(e) {
      let t = e.elements;
      return (this.set(t[0], t[4], t[8], t[1], t[5], t[9], t[2], t[6], t[10]), this);
    }
    multiply(e) {
      return this.multiplyMatrices(this, e);
    }
    premultiply(e) {
      return this.multiplyMatrices(e, this);
    }
    multiplyMatrices(e, t) {
      let i = e.elements,
        r = t.elements,
        s = this.elements,
        a = i[0],
        o = i[3],
        c = i[6],
        l = i[1],
        h = i[4],
        p = i[7],
        u = i[2],
        f = i[5],
        g = i[8],
        y = r[0],
        v = r[3],
        d = r[6],
        m = r[1],
        x = r[4],
        b = r[7],
        w = r[2],
        A = r[5],
        C = r[8];
      return (
        (s[0] = a * y + o * m + c * w),
        (s[3] = a * v + o * x + c * A),
        (s[6] = a * d + o * b + c * C),
        (s[1] = l * y + h * m + p * w),
        (s[4] = l * v + h * x + p * A),
        (s[7] = l * d + h * b + p * C),
        (s[2] = u * y + f * m + g * w),
        (s[5] = u * v + f * x + g * A),
        (s[8] = u * d + f * b + g * C),
        this
      );
    }
    multiplyScalar(e) {
      let t = this.elements;
      return (
        (t[0] *= e),
        (t[3] *= e),
        (t[6] *= e),
        (t[1] *= e),
        (t[4] *= e),
        (t[7] *= e),
        (t[2] *= e),
        (t[5] *= e),
        (t[8] *= e),
        this
      );
    }
    determinant() {
      let e = this.elements,
        t = e[0],
        i = e[1],
        r = e[2],
        s = e[3],
        a = e[4],
        o = e[5],
        c = e[6],
        l = e[7],
        h = e[8];
      return t * a * h - t * o * l - i * s * h + i * o * c + r * s * l - r * a * c;
    }
    invert() {
      let e = this.elements,
        t = e[0],
        i = e[1],
        r = e[2],
        s = e[3],
        a = e[4],
        o = e[5],
        c = e[6],
        l = e[7],
        h = e[8],
        p = h * a - o * l,
        u = o * c - h * s,
        f = l * s - a * c,
        g = t * p + i * u + r * f;
      if (g === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
      let y = 1 / g;
      return (
        (e[0] = p * y),
        (e[1] = (r * l - h * i) * y),
        (e[2] = (o * i - r * a) * y),
        (e[3] = u * y),
        (e[4] = (h * t - r * c) * y),
        (e[5] = (r * s - o * t) * y),
        (e[6] = f * y),
        (e[7] = (i * c - l * t) * y),
        (e[8] = (a * t - i * s) * y),
        this
      );
    }
    transpose() {
      let e,
        t = this.elements;
      return (
        (e = t[1]),
        (t[1] = t[3]),
        (t[3] = e),
        (e = t[2]),
        (t[2] = t[6]),
        (t[6] = e),
        (e = t[5]),
        (t[5] = t[7]),
        (t[7] = e),
        this
      );
    }
    getNormalMatrix(e) {
      return this.setFromMatrix4(e).invert().transpose();
    }
    transposeIntoArray(e) {
      let t = this.elements;
      return (
        (e[0] = t[0]),
        (e[1] = t[3]),
        (e[2] = t[6]),
        (e[3] = t[1]),
        (e[4] = t[4]),
        (e[5] = t[7]),
        (e[6] = t[2]),
        (e[7] = t[5]),
        (e[8] = t[8]),
        this
      );
    }
    setUvTransform(e, t, i, r, s, a, o) {
      let c = Math.cos(s),
        l = Math.sin(s);
      return (
        this.set(i * c, i * l, -i * (c * a + l * o) + a + e, -r * l, r * c, -r * (-l * a + c * o) + o + t, 0, 0, 1),
        this
      );
    }
    scale(e, t) {
      return (this.premultiply(Ql.makeScale(e, t)), this);
    }
    rotate(e) {
      return (this.premultiply(Ql.makeRotation(-e)), this);
    }
    translate(e, t) {
      return (this.premultiply(Ql.makeTranslation(e, t)), this);
    }
    makeTranslation(e, t) {
      return (e.isVector2 ? this.set(1, 0, e.x, 0, 1, e.y, 0, 0, 1) : this.set(1, 0, e, 0, 1, t, 0, 0, 1), this);
    }
    makeRotation(e) {
      let t = Math.cos(e),
        i = Math.sin(e);
      return (this.set(t, -i, 0, i, t, 0, 0, 0, 1), this);
    }
    makeScale(e, t) {
      return (this.set(e, 0, 0, 0, t, 0, 0, 0, 1), this);
    }
    equals(e) {
      let t = this.elements,
        i = e.elements;
      for (let r = 0; r < 9; r++) if (t[r] !== i[r]) return !1;
      return !0;
    }
    fromArray(e, t = 0) {
      for (let i = 0; i < 9; i++) this.elements[i] = e[i + t];
      return this;
    }
    toArray(e = [], t = 0) {
      let i = this.elements;
      return (
        (e[t] = i[0]),
        (e[t + 1] = i[1]),
        (e[t + 2] = i[2]),
        (e[t + 3] = i[3]),
        (e[t + 4] = i[4]),
        (e[t + 5] = i[5]),
        (e[t + 6] = i[6]),
        (e[t + 7] = i[7]),
        (e[t + 8] = i[8]),
        e
      );
    }
    clone() {
      return new this.constructor().fromArray(this.elements);
    }
  },
  Ql = new Matrix3();
function Cp(n) {
  for (let e = n.length - 1; e >= 0; --e) if (n[e] >= 65535) return !0;
  return !1;
}
function Go(n) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", n);
}
function L0() {
  let n = Go("canvas");
  return ((n.style.display = "block"), n);
}
var fd = {};
function Uo(n) {
  n in fd || ((fd[n] = !0), console.warn(n));
}
var md = new Matrix3().set(0.8224621, 0.177538, 0, 0.0331941, 0.9668058, 0, 0.0170827, 0.0723974, 0.9105199),
  gd = new Matrix3().set(1.2249401, -0.2249404, 0, -0.0420569, 1.0420571, 0, -0.0196376, -0.0786361, 1.0982735),
  $s = {
    [LinearSRGBColorSpace]: {
      transfer: LinearTransfer,
      primaries: Rec709Primaries,
      luminanceCoefficients: [0.2126, 0.7152, 0.0722],
      toReference: (n) => n,
      fromReference: (n) => n,
    },
    [Ft]: {
      transfer: Nt,
      primaries: Rec709Primaries,
      luminanceCoefficients: [0.2126, 0.7152, 0.0722],
      toReference: (n) => n.convertSRGBToLinear(),
      fromReference: (n) => n.convertLinearToSRGB(),
    },
    [LinearDisplayP3ColorSpace]: {
      transfer: LinearTransfer,
      primaries: zo,
      luminanceCoefficients: [0.2289, 0.6917, 0.0793],
      toReference: (n) => n.applyMatrix3(gd),
      fromReference: (n) => n.applyMatrix3(md),
    },
    [DisplayP3ColorSpace]: {
      transfer: Nt,
      primaries: zo,
      luminanceCoefficients: [0.2289, 0.6917, 0.0793],
      toReference: (n) => n.convertSRGBToLinear().applyMatrix3(gd),
      fromReference: (n) => n.applyMatrix3(md).convertLinearToSRGB(),
    },
  },
  I0 = new Set([LinearSRGBColorSpace, LinearDisplayP3ColorSpace]),
  Mt = {
    enabled: !0,
    _workingColorSpace: LinearSRGBColorSpace,
    get workingColorSpace() {
      return this._workingColorSpace;
    },
    set workingColorSpace(n) {
      if (!I0.has(n)) throw new Error(`Unsupported working color space, "${n}".`);
      this._workingColorSpace = n;
    },
    convert: function (n, e, t) {
      if (this.enabled === !1 || e === t || !e || !t) return n;
      let i = $s[e].toReference;
      return (0, $s[t].fromReference)(i(n));
    },
    fromWorkingColorSpace: function (n, e) {
      return this.convert(n, this._workingColorSpace, e);
    },
    toWorkingColorSpace: function (n, e) {
      return this.convert(n, e, this._workingColorSpace);
    },
    getPrimaries: function (n) {
      return $s[n].primaries;
    },
    getTransfer: function (n) {
      return n === er ? LinearTransfer : $s[n].transfer;
    },
    getLuminanceCoefficients: function (n, e = this._workingColorSpace) {
      return n.fromArray($s[e].luminanceCoefficients);
    },
  };
function cs(n) {
  return n < 0.04045 ? 0.0773993808 * n : Math.pow(0.9478672986 * n + 0.0521327014, 2.4);
}
function ec(n) {
  return n < 0.0031308 ? 12.92 * n : 1.055 * Math.pow(n, 0.41666) - 0.055;
}
var Kr,
  dh = class {
    static getDataURL(e) {
      if (/^data:/i.test(e.src) || typeof HTMLCanvasElement == "undefined") return e.src;
      let t;
      if (e instanceof HTMLCanvasElement) t = e;
      else {
        (Kr === void 0 && (Kr = Go("canvas")), (Kr.width = e.width), (Kr.height = e.height));
        let i = Kr.getContext("2d");
        (e instanceof ImageData ? i.putImageData(e, 0, 0) : i.drawImage(e, 0, 0, e.width, e.height), (t = Kr));
      }
      return t.width > 2048 || t.height > 2048
        ? (console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", e),
          t.toDataURL("image/jpeg", 0.6))
        : t.toDataURL("image/png");
    }
    static sRGBToLinear(e) {
      if (
        (typeof HTMLImageElement != "undefined" && e instanceof HTMLImageElement) ||
        (typeof HTMLCanvasElement != "undefined" && e instanceof HTMLCanvasElement) ||
        (typeof ImageBitmap != "undefined" && e instanceof ImageBitmap)
      ) {
        let t = Go("canvas");
        ((t.width = e.width), (t.height = e.height));
        let i = t.getContext("2d");
        i.drawImage(e, 0, 0, e.width, e.height);
        let r = i.getImageData(0, 0, e.width, e.height),
          s = r.data;
        for (let a = 0; a < s.length; a++) s[a] = 255 * cs(s[a] / 255);
        return (i.putImageData(r, 0, 0), t);
      }
      if (e.data) {
        let t = e.data.slice(0);
        for (let i = 0; i < t.length; i++)
          t instanceof Uint8Array || t instanceof Uint8ClampedArray
            ? (t[i] = Math.floor(255 * cs(t[i] / 255)))
            : (t[i] = cs(t[i]));
        return {
          data: t,
          width: e.width,
          height: e.height,
        };
      }
      return (
        console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),
        e
      );
    }
  },
  D0 = 0,
  Source = class {
    constructor(e = null) {
      ((this.isSource = !0),
        Object.defineProperty(this, "id", {
          value: D0++,
        }),
        (this.uuid = Ts()),
        (this.data = e),
        (this.dataReady = !0),
        (this.version = 0));
    }
    set needsUpdate(e) {
      e === !0 && this.version++;
    }
    toJSON(e) {
      let t = e === void 0 || typeof e == "string";
      if (!t && e.images[this.uuid] !== void 0) return e.images[this.uuid];
      let i = {
          uuid: this.uuid,
          url: "",
        },
        r = this.data;
      if (r !== null) {
        let s;
        if (Array.isArray(r)) {
          s = [];
          for (let a = 0, o = r.length; a < o; a++) r[a].isDataTexture ? s.push(tc(r[a].image)) : s.push(tc(r[a]));
        } else s = tc(r);
        i.url = s;
      }
      return (t || (e.images[this.uuid] = i), i);
    }
  };
function tc(n) {
  return (typeof HTMLImageElement != "undefined" && n instanceof HTMLImageElement) ||
    (typeof HTMLCanvasElement != "undefined" && n instanceof HTMLCanvasElement) ||
    (typeof ImageBitmap != "undefined" && n instanceof ImageBitmap)
    ? dh.getDataURL(n)
    : n.data
      ? {
          data: Array.from(n.data),
          width: n.width,
          height: n.height,
          type: n.data.constructor.name,
        }
      : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
}
var N0 = 0,
  Texture = class n extends sr {
    constructor(
      e = n.DEFAULT_IMAGE,
      t = n.DEFAULT_MAPPING,
      i = 1001,
      r = 1001,
      s = 1006,
      a = 1008,
      o = RGBAFormat,
      c = UnsignedByteType,
      l = n.DEFAULT_ANISOTROPY,
      h = "",
    ) {
      (super(),
        (this.isTexture = !0),
        Object.defineProperty(this, "id", {
          value: N0++,
        }),
        (this.uuid = Ts()),
        (this.name = ""),
        (this.source = new Source(e)),
        (this.mipmaps = []),
        (this.mapping = t),
        (this.channel = 0),
        (this.wrapS = i),
        (this.wrapT = r),
        (this.magFilter = s),
        (this.minFilter = a),
        (this.anisotropy = l),
        (this.format = o),
        (this.internalFormat = null),
        (this.type = c),
        (this.offset = new Vector2(0, 0)),
        (this.repeat = new Vector2(1, 1)),
        (this.center = new Vector2(0, 0)),
        (this.rotation = 0),
        (this.matrixAutoUpdate = !0),
        (this.matrix = new Matrix3()),
        (this.generateMipmaps = !0),
        (this.premultiplyAlpha = !1),
        (this.flipY = !0),
        (this.unpackAlignment = 4),
        (this.colorSpace = h),
        (this.userData = {}),
        (this.version = 0),
        (this.onUpdate = null),
        (this.isRenderTargetTexture = !1),
        (this.pmremVersion = 0));
    }
    get image() {
      return this.source.data;
    }
    set image(e = null) {
      this.source.data = e;
    }
    updateMatrix() {
      this.matrix.setUvTransform(
        this.offset.x,
        this.offset.y,
        this.repeat.x,
        this.repeat.y,
        this.rotation,
        this.center.x,
        this.center.y,
      );
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(e) {
      return (
        (this.name = e.name),
        (this.source = e.source),
        (this.mipmaps = e.mipmaps.slice(0)),
        (this.mapping = e.mapping),
        (this.channel = e.channel),
        (this.wrapS = e.wrapS),
        (this.wrapT = e.wrapT),
        (this.magFilter = e.magFilter),
        (this.minFilter = e.minFilter),
        (this.anisotropy = e.anisotropy),
        (this.format = e.format),
        (this.internalFormat = e.internalFormat),
        (this.type = e.type),
        this.offset.copy(e.offset),
        this.repeat.copy(e.repeat),
        this.center.copy(e.center),
        (this.rotation = e.rotation),
        (this.matrixAutoUpdate = e.matrixAutoUpdate),
        this.matrix.copy(e.matrix),
        (this.generateMipmaps = e.generateMipmaps),
        (this.premultiplyAlpha = e.premultiplyAlpha),
        (this.flipY = e.flipY),
        (this.unpackAlignment = e.unpackAlignment),
        (this.colorSpace = e.colorSpace),
        (this.userData = JSON.parse(JSON.stringify(e.userData))),
        (this.needsUpdate = !0),
        this
      );
    }
    toJSON(e) {
      let t = e === void 0 || typeof e == "string";
      if (!t && e.textures[this.uuid] !== void 0) return e.textures[this.uuid];
      let i = {
        metadata: {
          version: 4.6,
          type: "Texture",
          generator: "Texture.toJSON",
        },
        uuid: this.uuid,
        name: this.name,
        image: this.source.toJSON(e).uuid,
        mapping: this.mapping,
        channel: this.channel,
        repeat: [this.repeat.x, this.repeat.y],
        offset: [this.offset.x, this.offset.y],
        center: [this.center.x, this.center.y],
        rotation: this.rotation,
        wrap: [this.wrapS, this.wrapT],
        format: this.format,
        internalFormat: this.internalFormat,
        type: this.type,
        colorSpace: this.colorSpace,
        minFilter: this.minFilter,
        magFilter: this.magFilter,
        anisotropy: this.anisotropy,
        flipY: this.flipY,
        generateMipmaps: this.generateMipmaps,
        premultiplyAlpha: this.premultiplyAlpha,
        unpackAlignment: this.unpackAlignment,
      };
      return (
        Object.keys(this.userData).length > 0 && (i.userData = this.userData),
        t || (e.textures[this.uuid] = i),
        i
      );
    }
    dispose() {
      this.dispatchEvent({
        type: "dispose",
      });
    }
    transformUv(e) {
      if (this.mapping !== UVMapping) return e;
      if ((e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1))
        switch (this.wrapS) {
          case RepeatWrapping:
            e.x = e.x - Math.floor(e.x);
            break;
          case ClampToEdgeWrapping:
            e.x = e.x < 0 ? 0 : 1;
            break;
          case MirroredRepeatWrapping:
            Math.abs(Math.floor(e.x) % 2) === 1 ? (e.x = Math.ceil(e.x) - e.x) : (e.x = e.x - Math.floor(e.x));
        }
      if (e.y < 0 || e.y > 1)
        switch (this.wrapT) {
          case RepeatWrapping:
            e.y = e.y - Math.floor(e.y);
            break;
          case ClampToEdgeWrapping:
            e.y = e.y < 0 ? 0 : 1;
            break;
          case MirroredRepeatWrapping:
            Math.abs(Math.floor(e.y) % 2) === 1 ? (e.y = Math.ceil(e.y) - e.y) : (e.y = e.y - Math.floor(e.y));
        }
      return (this.flipY && (e.y = 1 - e.y), e);
    }
    set needsUpdate(e) {
      e === !0 && (this.version++, (this.source.needsUpdate = !0));
    }
    set needsPMREMUpdate(e) {
      e === !0 && this.pmremVersion++;
    }
  };
((Texture.DEFAULT_IMAGE = null), (Texture.DEFAULT_MAPPING = UVMapping), (Texture.DEFAULT_ANISOTROPY = 1));
var Vector4 = class n {
    constructor(e = 0, t = 0, i = 0, r = 1) {
      ((n.prototype.isVector4 = !0), (this.x = e), (this.y = t), (this.z = i), (this.w = r));
    }
    get width() {
      return this.z;
    }
    set width(e) {
      this.z = e;
    }
    get height() {
      return this.w;
    }
    set height(e) {
      this.w = e;
    }
    set(e, t, i, r) {
      return ((this.x = e), (this.y = t), (this.z = i), (this.w = r), this);
    }
    setScalar(e) {
      return ((this.x = e), (this.y = e), (this.z = e), (this.w = e), this);
    }
    setX(e) {
      return ((this.x = e), this);
    }
    setY(e) {
      return ((this.y = e), this);
    }
    setZ(e) {
      return ((this.z = e), this);
    }
    setW(e) {
      return ((this.w = e), this);
    }
    setComponent(e, t) {
      switch (e) {
        case 0:
          this.x = t;
          break;
        case 1:
          this.y = t;
          break;
        case 2:
          this.z = t;
          break;
        case 3:
          this.w = t;
          break;
        default:
          throw new Error("index is out of range: " + e);
      }
      return this;
    }
    getComponent(e) {
      switch (e) {
        case 0:
          return this.x;
        case 1:
          return this.y;
        case 2:
          return this.z;
        case 3:
          return this.w;
        default:
          throw new Error("index is out of range: " + e);
      }
    }
    clone() {
      return new this.constructor(this.x, this.y, this.z, this.w);
    }
    copy(e) {
      return ((this.x = e.x), (this.y = e.y), (this.z = e.z), (this.w = e.w !== void 0 ? e.w : 1), this);
    }
    add(e) {
      return ((this.x += e.x), (this.y += e.y), (this.z += e.z), (this.w += e.w), this);
    }
    addScalar(e) {
      return ((this.x += e), (this.y += e), (this.z += e), (this.w += e), this);
    }
    addVectors(e, t) {
      return ((this.x = e.x + t.x), (this.y = e.y + t.y), (this.z = e.z + t.z), (this.w = e.w + t.w), this);
    }
    addScaledVector(e, t) {
      return ((this.x += e.x * t), (this.y += e.y * t), (this.z += e.z * t), (this.w += e.w * t), this);
    }
    sub(e) {
      return ((this.x -= e.x), (this.y -= e.y), (this.z -= e.z), (this.w -= e.w), this);
    }
    subScalar(e) {
      return ((this.x -= e), (this.y -= e), (this.z -= e), (this.w -= e), this);
    }
    subVectors(e, t) {
      return ((this.x = e.x - t.x), (this.y = e.y - t.y), (this.z = e.z - t.z), (this.w = e.w - t.w), this);
    }
    multiply(e) {
      return ((this.x *= e.x), (this.y *= e.y), (this.z *= e.z), (this.w *= e.w), this);
    }
    multiplyScalar(e) {
      return ((this.x *= e), (this.y *= e), (this.z *= e), (this.w *= e), this);
    }
    applyMatrix4(e) {
      let t = this.x,
        i = this.y,
        r = this.z,
        s = this.w,
        a = e.elements;
      return (
        (this.x = a[0] * t + a[4] * i + a[8] * r + a[12] * s),
        (this.y = a[1] * t + a[5] * i + a[9] * r + a[13] * s),
        (this.z = a[2] * t + a[6] * i + a[10] * r + a[14] * s),
        (this.w = a[3] * t + a[7] * i + a[11] * r + a[15] * s),
        this
      );
    }
    divideScalar(e) {
      return this.multiplyScalar(1 / e);
    }
    setAxisAngleFromQuaternion(e) {
      this.w = 2 * Math.acos(e.w);
      let t = Math.sqrt(1 - e.w * e.w);
      return (
        t < 1e-4
          ? ((this.x = 1), (this.y = 0), (this.z = 0))
          : ((this.x = e.x / t), (this.y = e.y / t), (this.z = e.z / t)),
        this
      );
    }
    setAxisAngleFromRotationMatrix(e) {
      let t,
        i,
        r,
        s,
        c = e.elements,
        l = c[0],
        h = c[4],
        p = c[8],
        u = c[1],
        f = c[5],
        g = c[9],
        y = c[2],
        v = c[6],
        d = c[10];
      if (Math.abs(h - u) < 0.01 && Math.abs(p - y) < 0.01 && Math.abs(g - v) < 0.01) {
        if (Math.abs(h + u) < 0.1 && Math.abs(p + y) < 0.1 && Math.abs(g + v) < 0.1 && Math.abs(l + f + d - 3) < 0.1)
          return (this.set(1, 0, 0, 0), this);
        t = Math.PI;
        let x = (l + 1) / 2,
          b = (f + 1) / 2,
          w = (d + 1) / 2,
          A = (h + u) / 4,
          C = (p + y) / 4,
          F = (g + v) / 4;
        return (
          x > b && x > w
            ? x < 0.01
              ? ((i = 0), (r = 0.707106781), (s = 0.707106781))
              : ((i = Math.sqrt(x)), (r = A / i), (s = C / i))
            : b > w
              ? b < 0.01
                ? ((i = 0.707106781), (r = 0), (s = 0.707106781))
                : ((r = Math.sqrt(b)), (i = A / r), (s = F / r))
              : w < 0.01
                ? ((i = 0.707106781), (r = 0.707106781), (s = 0))
                : ((s = Math.sqrt(w)), (i = C / s), (r = F / s)),
          this.set(i, r, s, t),
          this
        );
      }
      let m = Math.sqrt((v - g) * (v - g) + (p - y) * (p - y) + (u - h) * (u - h));
      return (
        Math.abs(m) < 0.001 && (m = 1),
        (this.x = (v - g) / m),
        (this.y = (p - y) / m),
        (this.z = (u - h) / m),
        (this.w = Math.acos((l + f + d - 1) / 2)),
        this
      );
    }
    setFromMatrixPosition(e) {
      let t = e.elements;
      return ((this.x = t[12]), (this.y = t[13]), (this.z = t[14]), (this.w = t[15]), this);
    }
    min(e) {
      return (
        (this.x = Math.min(this.x, e.x)),
        (this.y = Math.min(this.y, e.y)),
        (this.z = Math.min(this.z, e.z)),
        (this.w = Math.min(this.w, e.w)),
        this
      );
    }
    max(e) {
      return (
        (this.x = Math.max(this.x, e.x)),
        (this.y = Math.max(this.y, e.y)),
        (this.z = Math.max(this.z, e.z)),
        (this.w = Math.max(this.w, e.w)),
        this
      );
    }
    clamp(e, t) {
      return (
        (this.x = Math.max(e.x, Math.min(t.x, this.x))),
        (this.y = Math.max(e.y, Math.min(t.y, this.y))),
        (this.z = Math.max(e.z, Math.min(t.z, this.z))),
        (this.w = Math.max(e.w, Math.min(t.w, this.w))),
        this
      );
    }
    clampScalar(e, t) {
      return (
        (this.x = Math.max(e, Math.min(t, this.x))),
        (this.y = Math.max(e, Math.min(t, this.y))),
        (this.z = Math.max(e, Math.min(t, this.z))),
        (this.w = Math.max(e, Math.min(t, this.w))),
        this
      );
    }
    clampLength(e, t) {
      let i = this.length();
      return this.divideScalar(i || 1).multiplyScalar(Math.max(e, Math.min(t, i)));
    }
    floor() {
      return (
        (this.x = Math.floor(this.x)),
        (this.y = Math.floor(this.y)),
        (this.z = Math.floor(this.z)),
        (this.w = Math.floor(this.w)),
        this
      );
    }
    ceil() {
      return (
        (this.x = Math.ceil(this.x)),
        (this.y = Math.ceil(this.y)),
        (this.z = Math.ceil(this.z)),
        (this.w = Math.ceil(this.w)),
        this
      );
    }
    round() {
      return (
        (this.x = Math.round(this.x)),
        (this.y = Math.round(this.y)),
        (this.z = Math.round(this.z)),
        (this.w = Math.round(this.w)),
        this
      );
    }
    roundToZero() {
      return (
        (this.x = Math.trunc(this.x)),
        (this.y = Math.trunc(this.y)),
        (this.z = Math.trunc(this.z)),
        (this.w = Math.trunc(this.w)),
        this
      );
    }
    negate() {
      return ((this.x = -this.x), (this.y = -this.y), (this.z = -this.z), (this.w = -this.w), this);
    }
    dot(e) {
      return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
    }
    lengthSq() {
      return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }
    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
    }
    normalize() {
      return this.divideScalar(this.length() || 1);
    }
    setLength(e) {
      return this.normalize().multiplyScalar(e);
    }
    lerp(e, t) {
      return (
        (this.x += (e.x - this.x) * t),
        (this.y += (e.y - this.y) * t),
        (this.z += (e.z - this.z) * t),
        (this.w += (e.w - this.w) * t),
        this
      );
    }
    lerpVectors(e, t, i) {
      return (
        (this.x = e.x + (t.x - e.x) * i),
        (this.y = e.y + (t.y - e.y) * i),
        (this.z = e.z + (t.z - e.z) * i),
        (this.w = e.w + (t.w - e.w) * i),
        this
      );
    }
    equals(e) {
      return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w;
    }
    fromArray(e, t = 0) {
      return ((this.x = e[t]), (this.y = e[t + 1]), (this.z = e[t + 2]), (this.w = e[t + 3]), this);
    }
    toArray(e = [], t = 0) {
      return ((e[t] = this.x), (e[t + 1] = this.y), (e[t + 2] = this.z), (e[t + 3] = this.w), e);
    }
    fromBufferAttribute(e, t) {
      return ((this.x = e.getX(t)), (this.y = e.getY(t)), (this.z = e.getZ(t)), (this.w = e.getW(t)), this);
    }
    random() {
      return (
        (this.x = Math.random()),
        (this.y = Math.random()),
        (this.z = Math.random()),
        (this.w = Math.random()),
        this
      );
    }
    *[Symbol.iterator]() {
      (yield this.x, yield this.y, yield this.z, yield this.w);
    }
  },
  RenderTarget = class extends sr {
    constructor(e = 1, t = 1, i = {}) {
      (super(),
        (this.isRenderTarget = !0),
        (this.width = e),
        (this.height = t),
        (this.depth = 1),
        (this.scissor = new Vector4(0, 0, e, t)),
        (this.scissorTest = !1),
        (this.viewport = new Vector4(0, 0, e, t)));
      let r = {
        width: e,
        height: t,
        depth: 1,
      };
      i = Object.assign(
        {
          generateMipmaps: !1,
          internalFormat: null,
          minFilter: LinearFilter,
          depthBuffer: !0,
          stencilBuffer: !1,
          resolveDepthBuffer: !0,
          resolveStencilBuffer: !0,
          depthTexture: null,
          samples: 0,
          count: 1,
        },
        i,
      );
      let s = new Texture(
        r,
        i.mapping,
        i.wrapS,
        i.wrapT,
        i.magFilter,
        i.minFilter,
        i.format,
        i.type,
        i.anisotropy,
        i.colorSpace,
      );
      ((s.flipY = !1),
        (s.generateMipmaps = i.generateMipmaps),
        (s.internalFormat = i.internalFormat),
        (this.textures = []));
      let a = i.count;
      for (let o = 0; o < a; o++) ((this.textures[o] = s.clone()), (this.textures[o].isRenderTargetTexture = !0));
      ((this.depthBuffer = i.depthBuffer),
        (this.stencilBuffer = i.stencilBuffer),
        (this.resolveDepthBuffer = i.resolveDepthBuffer),
        (this.resolveStencilBuffer = i.resolveStencilBuffer),
        (this.depthTexture = i.depthTexture),
        (this.samples = i.samples));
    }
    get texture() {
      return this.textures[0];
    }
    set texture(e) {
      this.textures[0] = e;
    }
    setSize(e, t, i = 1) {
      if (this.width !== e || this.height !== t || this.depth !== i) {
        ((this.width = e), (this.height = t), (this.depth = i));
        for (let r = 0, s = this.textures.length; r < s; r++)
          ((this.textures[r].image.width = e),
            (this.textures[r].image.height = t),
            (this.textures[r].image.depth = i));
        this.dispose();
      }
      (this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t));
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(e) {
      ((this.width = e.width),
        (this.height = e.height),
        (this.depth = e.depth),
        this.scissor.copy(e.scissor),
        (this.scissorTest = e.scissorTest),
        this.viewport.copy(e.viewport),
        (this.textures.length = 0));
      for (let i = 0, r = e.textures.length; i < r; i++)
        ((this.textures[i] = e.textures[i].clone()), (this.textures[i].isRenderTargetTexture = !0));
      let t = Object.assign({}, e.texture.image);
      return (
        (this.texture.source = new Source(t)),
        (this.depthBuffer = e.depthBuffer),
        (this.stencilBuffer = e.stencilBuffer),
        (this.resolveDepthBuffer = e.resolveDepthBuffer),
        (this.resolveStencilBuffer = e.resolveStencilBuffer),
        e.depthTexture !== null && (this.depthTexture = e.depthTexture.clone()),
        (this.samples = e.samples),
        this
      );
    }
    dispose() {
      this.dispatchEvent({
        type: "dispose",
      });
    }
  },
  WebGLRenderTarget = class extends RenderTarget {
    constructor(e = 1, t = 1, i = {}) {
      (super(e, t, i), (this.isWebGLRenderTarget = !0));
    }
  },
  DataArrayTexture = class extends Texture {
    constructor(e = null, t = 1, i = 1, r = 1) {
      (super(null),
        (this.isDataArrayTexture = !0),
        (this.image = {
          data: e,
          width: t,
          height: i,
          depth: r,
        }),
        (this.magFilter = NearestFilter),
        (this.minFilter = NearestFilter),
        (this.wrapR = ClampToEdgeWrapping),
        (this.generateMipmaps = !1),
        (this.flipY = !1),
        (this.unpackAlignment = 1),
        (this.layerUpdates = new Set()));
    }
    addLayerUpdate(e) {
      this.layerUpdates.add(e);
    }
    clearLayerUpdates() {
      this.layerUpdates.clear();
    }
  };
var Data3DTexture = class extends Texture {
  constructor(e = null, t = 1, i = 1, r = 1) {
    (super(null),
      (this.isData3DTexture = !0),
      (this.image = {
        data: e,
        width: t,
        height: i,
        depth: r,
      }),
      (this.magFilter = NearestFilter),
      (this.minFilter = NearestFilter),
      (this.wrapR = ClampToEdgeWrapping),
      (this.generateMipmaps = !1),
      (this.flipY = !1),
      (this.unpackAlignment = 1));
  }
};
var Quaternion = class {
    constructor(e = 0, t = 0, i = 0, r = 1) {
      ((this.isQuaternion = !0), (this._x = e), (this._y = t), (this._z = i), (this._w = r));
    }
    static slerpFlat(e, t, i, r, s, a, o) {
      let c = i[r + 0],
        l = i[r + 1],
        h = i[r + 2],
        p = i[r + 3],
        u = s[a + 0],
        f = s[a + 1],
        g = s[a + 2],
        y = s[a + 3];
      if (o === 0) return ((e[t + 0] = c), (e[t + 1] = l), (e[t + 2] = h), void (e[t + 3] = p));
      if (o === 1) return ((e[t + 0] = u), (e[t + 1] = f), (e[t + 2] = g), void (e[t + 3] = y));
      if (p !== y || c !== u || l !== f || h !== g) {
        let v = 1 - o,
          d = c * u + l * f + h * g + p * y,
          m = d >= 0 ? 1 : -1,
          x = 1 - d * d;
        if (x > Number.EPSILON) {
          let w = Math.sqrt(x),
            A = Math.atan2(w, d * m);
          ((v = Math.sin(v * A) / w), (o = Math.sin(o * A) / w));
        }
        let b = o * m;
        if (((c = c * v + u * b), (l = l * v + f * b), (h = h * v + g * b), (p = p * v + y * b), v === 1 - o)) {
          let w = 1 / Math.sqrt(c * c + l * l + h * h + p * p);
          ((c *= w), (l *= w), (h *= w), (p *= w));
        }
      }
      ((e[t] = c), (e[t + 1] = l), (e[t + 2] = h), (e[t + 3] = p));
    }
    static multiplyQuaternionsFlat(e, t, i, r, s, a) {
      let o = i[r],
        c = i[r + 1],
        l = i[r + 2],
        h = i[r + 3],
        p = s[a],
        u = s[a + 1],
        f = s[a + 2],
        g = s[a + 3];
      return (
        (e[t] = o * g + h * p + c * f - l * u),
        (e[t + 1] = c * g + h * u + l * p - o * f),
        (e[t + 2] = l * g + h * f + o * u - c * p),
        (e[t + 3] = h * g - o * p - c * u - l * f),
        e
      );
    }
    get x() {
      return this._x;
    }
    set x(e) {
      ((this._x = e), this._onChangeCallback());
    }
    get y() {
      return this._y;
    }
    set y(e) {
      ((this._y = e), this._onChangeCallback());
    }
    get z() {
      return this._z;
    }
    set z(e) {
      ((this._z = e), this._onChangeCallback());
    }
    get w() {
      return this._w;
    }
    set w(e) {
      ((this._w = e), this._onChangeCallback());
    }
    set(e, t, i, r) {
      return ((this._x = e), (this._y = t), (this._z = i), (this._w = r), this._onChangeCallback(), this);
    }
    clone() {
      return new this.constructor(this._x, this._y, this._z, this._w);
    }
    copy(e) {
      return ((this._x = e.x), (this._y = e.y), (this._z = e.z), (this._w = e.w), this._onChangeCallback(), this);
    }
    setFromEuler(e, t = !0) {
      let i = e._x,
        r = e._y,
        s = e._z,
        a = e._order,
        o = Math.cos,
        c = Math.sin,
        l = o(i / 2),
        h = o(r / 2),
        p = o(s / 2),
        u = c(i / 2),
        f = c(r / 2),
        g = c(s / 2);
      switch (a) {
        case "XYZ":
          ((this._x = u * h * p + l * f * g),
            (this._y = l * f * p - u * h * g),
            (this._z = l * h * g + u * f * p),
            (this._w = l * h * p - u * f * g));
          break;
        case "YXZ":
          ((this._x = u * h * p + l * f * g),
            (this._y = l * f * p - u * h * g),
            (this._z = l * h * g - u * f * p),
            (this._w = l * h * p + u * f * g));
          break;
        case "ZXY":
          ((this._x = u * h * p - l * f * g),
            (this._y = l * f * p + u * h * g),
            (this._z = l * h * g + u * f * p),
            (this._w = l * h * p - u * f * g));
          break;
        case "ZYX":
          ((this._x = u * h * p - l * f * g),
            (this._y = l * f * p + u * h * g),
            (this._z = l * h * g - u * f * p),
            (this._w = l * h * p + u * f * g));
          break;
        case "YZX":
          ((this._x = u * h * p + l * f * g),
            (this._y = l * f * p + u * h * g),
            (this._z = l * h * g - u * f * p),
            (this._w = l * h * p - u * f * g));
          break;
        case "XZY":
          ((this._x = u * h * p - l * f * g),
            (this._y = l * f * p - u * h * g),
            (this._z = l * h * g + u * f * p),
            (this._w = l * h * p + u * f * g));
          break;
        default:
          console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + a);
      }
      return (t === !0 && this._onChangeCallback(), this);
    }
    setFromAxisAngle(e, t) {
      let i = t / 2,
        r = Math.sin(i);
      return (
        (this._x = e.x * r),
        (this._y = e.y * r),
        (this._z = e.z * r),
        (this._w = Math.cos(i)),
        this._onChangeCallback(),
        this
      );
    }
    setFromRotationMatrix(e) {
      let t = e.elements,
        i = t[0],
        r = t[4],
        s = t[8],
        a = t[1],
        o = t[5],
        c = t[9],
        l = t[2],
        h = t[6],
        p = t[10],
        u = i + o + p;
      if (u > 0) {
        let f = 0.5 / Math.sqrt(u + 1);
        ((this._w = 0.25 / f), (this._x = (h - c) * f), (this._y = (s - l) * f), (this._z = (a - r) * f));
      } else if (i > o && i > p) {
        let f = 2 * Math.sqrt(1 + i - o - p);
        ((this._w = (h - c) / f), (this._x = 0.25 * f), (this._y = (r + a) / f), (this._z = (s + l) / f));
      } else if (o > p) {
        let f = 2 * Math.sqrt(1 + o - i - p);
        ((this._w = (s - l) / f), (this._x = (r + a) / f), (this._y = 0.25 * f), (this._z = (c + h) / f));
      } else {
        let f = 2 * Math.sqrt(1 + p - i - o);
        ((this._w = (a - r) / f), (this._x = (s + l) / f), (this._y = (c + h) / f), (this._z = 0.25 * f));
      }
      return (this._onChangeCallback(), this);
    }
    setFromUnitVectors(e, t) {
      let i = e.dot(t) + 1;
      return (
        i < Number.EPSILON
          ? ((i = 0),
            Math.abs(e.x) > Math.abs(e.z)
              ? ((this._x = -e.y), (this._y = e.x), (this._z = 0), (this._w = i))
              : ((this._x = 0), (this._y = -e.z), (this._z = e.y), (this._w = i)))
          : ((this._x = e.y * t.z - e.z * t.y),
            (this._y = e.z * t.x - e.x * t.z),
            (this._z = e.x * t.y - e.y * t.x),
            (this._w = i)),
        this.normalize()
      );
    }
    angleTo(e) {
      return 2 * Math.acos(Math.abs(ui(this.dot(e), -1, 1)));
    }
    rotateTowards(e, t) {
      let i = this.angleTo(e);
      if (i === 0) return this;
      let r = Math.min(1, t / i);
      return (this.slerp(e, r), this);
    }
    identity() {
      return this.set(0, 0, 0, 1);
    }
    invert() {
      return this.conjugate();
    }
    conjugate() {
      return ((this._x *= -1), (this._y *= -1), (this._z *= -1), this._onChangeCallback(), this);
    }
    dot(e) {
      return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
    }
    lengthSq() {
      return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
    }
    length() {
      return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
    }
    normalize() {
      let e = this.length();
      return (
        e === 0
          ? ((this._x = 0), (this._y = 0), (this._z = 0), (this._w = 1))
          : ((e = 1 / e),
            (this._x = this._x * e),
            (this._y = this._y * e),
            (this._z = this._z * e),
            (this._w = this._w * e)),
        this._onChangeCallback(),
        this
      );
    }
    multiply(e) {
      return this.multiplyQuaternions(this, e);
    }
    premultiply(e) {
      return this.multiplyQuaternions(e, this);
    }
    multiplyQuaternions(e, t) {
      let i = e._x,
        r = e._y,
        s = e._z,
        a = e._w,
        o = t._x,
        c = t._y,
        l = t._z,
        h = t._w;
      return (
        (this._x = i * h + a * o + r * l - s * c),
        (this._y = r * h + a * c + s * o - i * l),
        (this._z = s * h + a * l + i * c - r * o),
        (this._w = a * h - i * o - r * c - s * l),
        this._onChangeCallback(),
        this
      );
    }
    slerp(e, t) {
      if (t === 0) return this;
      if (t === 1) return this.copy(e);
      let i = this._x,
        r = this._y,
        s = this._z,
        a = this._w,
        o = a * e._w + i * e._x + r * e._y + s * e._z;
      if (
        (o < 0
          ? ((this._w = -e._w), (this._x = -e._x), (this._y = -e._y), (this._z = -e._z), (o = -o))
          : this.copy(e),
        o >= 1)
      )
        return ((this._w = a), (this._x = i), (this._y = r), (this._z = s), this);
      let c = 1 - o * o;
      if (c <= Number.EPSILON) {
        let f = 1 - t;
        return (
          (this._w = f * a + t * this._w),
          (this._x = f * i + t * this._x),
          (this._y = f * r + t * this._y),
          (this._z = f * s + t * this._z),
          this.normalize(),
          this
        );
      }
      let l = Math.sqrt(c),
        h = Math.atan2(l, o),
        p = Math.sin((1 - t) * h) / l,
        u = Math.sin(t * h) / l;
      return (
        (this._w = a * p + this._w * u),
        (this._x = i * p + this._x * u),
        (this._y = r * p + this._y * u),
        (this._z = s * p + this._z * u),
        this._onChangeCallback(),
        this
      );
    }
    slerpQuaternions(e, t, i) {
      return this.copy(e).slerp(t, i);
    }
    random() {
      let e = 2 * Math.PI * Math.random(),
        t = 2 * Math.PI * Math.random(),
        i = Math.random(),
        r = Math.sqrt(1 - i),
        s = Math.sqrt(i);
      return this.set(r * Math.sin(e), r * Math.cos(e), s * Math.sin(t), s * Math.cos(t));
    }
    equals(e) {
      return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w;
    }
    fromArray(e, t = 0) {
      return (
        (this._x = e[t]),
        (this._y = e[t + 1]),
        (this._z = e[t + 2]),
        (this._w = e[t + 3]),
        this._onChangeCallback(),
        this
      );
    }
    toArray(e = [], t = 0) {
      return ((e[t] = this._x), (e[t + 1] = this._y), (e[t + 2] = this._z), (e[t + 3] = this._w), e);
    }
    fromBufferAttribute(e, t) {
      return (
        (this._x = e.getX(t)),
        (this._y = e.getY(t)),
        (this._z = e.getZ(t)),
        (this._w = e.getW(t)),
        this._onChangeCallback(),
        this
      );
    }
    toJSON() {
      return this.toArray();
    }
    _onChange(e) {
      return ((this._onChangeCallback = e), this);
    }
    _onChangeCallback() {}
    *[Symbol.iterator]() {
      (yield this._x, yield this._y, yield this._z, yield this._w);
    }
  },
  Vector3 = class n {
    constructor(e = 0, t = 0, i = 0) {
      ((n.prototype.isVector3 = !0), (this.x = e), (this.y = t), (this.z = i));
    }
    set(e, t, i) {
      return (i === void 0 && (i = this.z), (this.x = e), (this.y = t), (this.z = i), this);
    }
    setScalar(e) {
      return ((this.x = e), (this.y = e), (this.z = e), this);
    }
    setX(e) {
      return ((this.x = e), this);
    }
    setY(e) {
      return ((this.y = e), this);
    }
    setZ(e) {
      return ((this.z = e), this);
    }
    setComponent(e, t) {
      switch (e) {
        case 0:
          this.x = t;
          break;
        case 1:
          this.y = t;
          break;
        case 2:
          this.z = t;
          break;
        default:
          throw new Error("index is out of range: " + e);
      }
      return this;
    }
    getComponent(e) {
      switch (e) {
        case 0:
          return this.x;
        case 1:
          return this.y;
        case 2:
          return this.z;
        default:
          throw new Error("index is out of range: " + e);
      }
    }
    clone() {
      return new this.constructor(this.x, this.y, this.z);
    }
    copy(e) {
      return ((this.x = e.x), (this.y = e.y), (this.z = e.z), this);
    }
    add(e) {
      return ((this.x += e.x), (this.y += e.y), (this.z += e.z), this);
    }
    addScalar(e) {
      return ((this.x += e), (this.y += e), (this.z += e), this);
    }
    addVectors(e, t) {
      return ((this.x = e.x + t.x), (this.y = e.y + t.y), (this.z = e.z + t.z), this);
    }
    addScaledVector(e, t) {
      return ((this.x += e.x * t), (this.y += e.y * t), (this.z += e.z * t), this);
    }
    sub(e) {
      return ((this.x -= e.x), (this.y -= e.y), (this.z -= e.z), this);
    }
    subScalar(e) {
      return ((this.x -= e), (this.y -= e), (this.z -= e), this);
    }
    subVectors(e, t) {
      return ((this.x = e.x - t.x), (this.y = e.y - t.y), (this.z = e.z - t.z), this);
    }
    multiply(e) {
      return ((this.x *= e.x), (this.y *= e.y), (this.z *= e.z), this);
    }
    multiplyScalar(e) {
      return ((this.x *= e), (this.y *= e), (this.z *= e), this);
    }
    multiplyVectors(e, t) {
      return ((this.x = e.x * t.x), (this.y = e.y * t.y), (this.z = e.z * t.z), this);
    }
    applyEuler(e) {
      return this.applyQuaternion(vd.setFromEuler(e));
    }
    applyAxisAngle(e, t) {
      return this.applyQuaternion(vd.setFromAxisAngle(e, t));
    }
    applyMatrix3(e) {
      let t = this.x,
        i = this.y,
        r = this.z,
        s = e.elements;
      return (
        (this.x = s[0] * t + s[3] * i + s[6] * r),
        (this.y = s[1] * t + s[4] * i + s[7] * r),
        (this.z = s[2] * t + s[5] * i + s[8] * r),
        this
      );
    }
    applyNormalMatrix(e) {
      return this.applyMatrix3(e).normalize();
    }
    applyMatrix4(e) {
      let t = this.x,
        i = this.y,
        r = this.z,
        s = e.elements,
        a = 1 / (s[3] * t + s[7] * i + s[11] * r + s[15]);
      return (
        (this.x = (s[0] * t + s[4] * i + s[8] * r + s[12]) * a),
        (this.y = (s[1] * t + s[5] * i + s[9] * r + s[13]) * a),
        (this.z = (s[2] * t + s[6] * i + s[10] * r + s[14]) * a),
        this
      );
    }
    applyQuaternion(e) {
      let t = this.x,
        i = this.y,
        r = this.z,
        s = e.x,
        a = e.y,
        o = e.z,
        c = e.w,
        l = 2 * (a * r - o * i),
        h = 2 * (o * t - s * r),
        p = 2 * (s * i - a * t);
      return (
        (this.x = t + c * l + a * p - o * h),
        (this.y = i + c * h + o * l - s * p),
        (this.z = r + c * p + s * h - a * l),
        this
      );
    }
    project(e) {
      return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix);
    }
    unproject(e) {
      return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld);
    }
    transformDirection(e) {
      let t = this.x,
        i = this.y,
        r = this.z,
        s = e.elements;
      return (
        (this.x = s[0] * t + s[4] * i + s[8] * r),
        (this.y = s[1] * t + s[5] * i + s[9] * r),
        (this.z = s[2] * t + s[6] * i + s[10] * r),
        this.normalize()
      );
    }
    divide(e) {
      return ((this.x /= e.x), (this.y /= e.y), (this.z /= e.z), this);
    }
    divideScalar(e) {
      return this.multiplyScalar(1 / e);
    }
    min(e) {
      return (
        (this.x = Math.min(this.x, e.x)),
        (this.y = Math.min(this.y, e.y)),
        (this.z = Math.min(this.z, e.z)),
        this
      );
    }
    max(e) {
      return (
        (this.x = Math.max(this.x, e.x)),
        (this.y = Math.max(this.y, e.y)),
        (this.z = Math.max(this.z, e.z)),
        this
      );
    }
    clamp(e, t) {
      return (
        (this.x = Math.max(e.x, Math.min(t.x, this.x))),
        (this.y = Math.max(e.y, Math.min(t.y, this.y))),
        (this.z = Math.max(e.z, Math.min(t.z, this.z))),
        this
      );
    }
    clampScalar(e, t) {
      return (
        (this.x = Math.max(e, Math.min(t, this.x))),
        (this.y = Math.max(e, Math.min(t, this.y))),
        (this.z = Math.max(e, Math.min(t, this.z))),
        this
      );
    }
    clampLength(e, t) {
      let i = this.length();
      return this.divideScalar(i || 1).multiplyScalar(Math.max(e, Math.min(t, i)));
    }
    floor() {
      return ((this.x = Math.floor(this.x)), (this.y = Math.floor(this.y)), (this.z = Math.floor(this.z)), this);
    }
    ceil() {
      return ((this.x = Math.ceil(this.x)), (this.y = Math.ceil(this.y)), (this.z = Math.ceil(this.z)), this);
    }
    round() {
      return ((this.x = Math.round(this.x)), (this.y = Math.round(this.y)), (this.z = Math.round(this.z)), this);
    }
    roundToZero() {
      return ((this.x = Math.trunc(this.x)), (this.y = Math.trunc(this.y)), (this.z = Math.trunc(this.z)), this);
    }
    negate() {
      return ((this.x = -this.x), (this.y = -this.y), (this.z = -this.z), this);
    }
    dot(e) {
      return this.x * e.x + this.y * e.y + this.z * e.z;
    }
    lengthSq() {
      return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
    }
    normalize() {
      return this.divideScalar(this.length() || 1);
    }
    setLength(e) {
      return this.normalize().multiplyScalar(e);
    }
    lerp(e, t) {
      return ((this.x += (e.x - this.x) * t), (this.y += (e.y - this.y) * t), (this.z += (e.z - this.z) * t), this);
    }
    lerpVectors(e, t, i) {
      return (
        (this.x = e.x + (t.x - e.x) * i),
        (this.y = e.y + (t.y - e.y) * i),
        (this.z = e.z + (t.z - e.z) * i),
        this
      );
    }
    cross(e) {
      return this.crossVectors(this, e);
    }
    crossVectors(e, t) {
      let i = e.x,
        r = e.y,
        s = e.z,
        a = t.x,
        o = t.y,
        c = t.z;
      return ((this.x = r * c - s * o), (this.y = s * a - i * c), (this.z = i * o - r * a), this);
    }
    projectOnVector(e) {
      let t = e.lengthSq();
      if (t === 0) return this.set(0, 0, 0);
      let i = e.dot(this) / t;
      return this.copy(e).multiplyScalar(i);
    }
    projectOnPlane(e) {
      return (ic.copy(this).projectOnVector(e), this.sub(ic));
    }
    reflect(e) {
      return this.sub(ic.copy(e).multiplyScalar(2 * this.dot(e)));
    }
    angleTo(e) {
      let t = Math.sqrt(this.lengthSq() * e.lengthSq());
      if (t === 0) return Math.PI / 2;
      let i = this.dot(e) / t;
      return Math.acos(ui(i, -1, 1));
    }
    distanceTo(e) {
      return Math.sqrt(this.distanceToSquared(e));
    }
    distanceToSquared(e) {
      let t = this.x - e.x,
        i = this.y - e.y,
        r = this.z - e.z;
      return t * t + i * i + r * r;
    }
    manhattanDistanceTo(e) {
      return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z);
    }
    setFromSpherical(e) {
      return this.setFromSphericalCoords(e.radius, e.phi, e.theta);
    }
    setFromSphericalCoords(e, t, i) {
      let r = Math.sin(t) * e;
      return ((this.x = r * Math.sin(i)), (this.y = Math.cos(t) * e), (this.z = r * Math.cos(i)), this);
    }
    setFromCylindrical(e) {
      return this.setFromCylindricalCoords(e.radius, e.theta, e.y);
    }
    setFromCylindricalCoords(e, t, i) {
      return ((this.x = e * Math.sin(t)), (this.y = i), (this.z = e * Math.cos(t)), this);
    }
    setFromMatrixPosition(e) {
      let t = e.elements;
      return ((this.x = t[12]), (this.y = t[13]), (this.z = t[14]), this);
    }
    setFromMatrixScale(e) {
      let t = this.setFromMatrixColumn(e, 0).length(),
        i = this.setFromMatrixColumn(e, 1).length(),
        r = this.setFromMatrixColumn(e, 2).length();
      return ((this.x = t), (this.y = i), (this.z = r), this);
    }
    setFromMatrixColumn(e, t) {
      return this.fromArray(e.elements, 4 * t);
    }
    setFromMatrix3Column(e, t) {
      return this.fromArray(e.elements, 3 * t);
    }
    setFromEuler(e) {
      return ((this.x = e._x), (this.y = e._y), (this.z = e._z), this);
    }
    setFromColor(e) {
      return ((this.x = e.r), (this.y = e.g), (this.z = e.b), this);
    }
    equals(e) {
      return e.x === this.x && e.y === this.y && e.z === this.z;
    }
    fromArray(e, t = 0) {
      return ((this.x = e[t]), (this.y = e[t + 1]), (this.z = e[t + 2]), this);
    }
    toArray(e = [], t = 0) {
      return ((e[t] = this.x), (e[t + 1] = this.y), (e[t + 2] = this.z), e);
    }
    fromBufferAttribute(e, t) {
      return ((this.x = e.getX(t)), (this.y = e.getY(t)), (this.z = e.getZ(t)), this);
    }
    random() {
      return ((this.x = Math.random()), (this.y = Math.random()), (this.z = Math.random()), this);
    }
    randomDirection() {
      let e = Math.random() * Math.PI * 2,
        t = 2 * Math.random() - 1,
        i = Math.sqrt(1 - t * t);
      return ((this.x = i * Math.cos(e)), (this.y = t), (this.z = i * Math.sin(e)), this);
    }
    *[Symbol.iterator]() {
      (yield this.x, yield this.y, yield this.z);
    }
  },
  ic = new Vector3(),
  vd = new Quaternion(),
  Box3 = class {
    constructor(e = new Vector3(1 / 0, 1 / 0, 1 / 0), t = new Vector3(-1 / 0, -1 / 0, -1 / 0)) {
      ((this.isBox3 = !0), (this.min = e), (this.max = t));
    }
    set(e, t) {
      return (this.min.copy(e), this.max.copy(t), this);
    }
    setFromArray(e) {
      this.makeEmpty();
      for (let t = 0, i = e.length; t < i; t += 3) this.expandByPoint(ln.fromArray(e, t));
      return this;
    }
    setFromBufferAttribute(e) {
      this.makeEmpty();
      for (let t = 0, i = e.count; t < i; t++) this.expandByPoint(ln.fromBufferAttribute(e, t));
      return this;
    }
    setFromPoints(e) {
      this.makeEmpty();
      for (let t = 0, i = e.length; t < i; t++) this.expandByPoint(e[t]);
      return this;
    }
    setFromCenterAndSize(e, t) {
      let i = ln.copy(t).multiplyScalar(0.5);
      return (this.min.copy(e).sub(i), this.max.copy(e).add(i), this);
    }
    setFromObject(e, t = !1) {
      return (this.makeEmpty(), this.expandByObject(e, t));
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(e) {
      return (this.min.copy(e.min), this.max.copy(e.max), this);
    }
    makeEmpty() {
      return ((this.min.x = this.min.y = this.min.z = 1 / 0), (this.max.x = this.max.y = this.max.z = -1 / 0), this);
    }
    isEmpty() {
      return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
    }
    getCenter(e) {
      return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(0.5);
    }
    getSize(e) {
      return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min);
    }
    expandByPoint(e) {
      return (this.min.min(e), this.max.max(e), this);
    }
    expandByVector(e) {
      return (this.min.sub(e), this.max.add(e), this);
    }
    expandByScalar(e) {
      return (this.min.addScalar(-e), this.max.addScalar(e), this);
    }
    expandByObject(e, t = !1) {
      e.updateWorldMatrix(!1, !1);
      let i = e.geometry;
      if (i !== void 0) {
        let s = i.getAttribute("position");
        if (t === !0 && s !== void 0 && e.isInstancedMesh !== !0)
          for (let a = 0, o = s.count; a < o; a++)
            (e.isMesh === !0 ? e.getVertexPosition(a, ln) : ln.fromBufferAttribute(s, a),
              ln.applyMatrix4(e.matrixWorld),
              this.expandByPoint(ln));
        else
          (e.boundingBox !== void 0
            ? (e.boundingBox === null && e.computeBoundingBox(), Ja.copy(e.boundingBox))
            : (i.boundingBox === null && i.computeBoundingBox(), Ja.copy(i.boundingBox)),
            Ja.applyMatrix4(e.matrixWorld),
            this.union(Ja));
      }
      let r = e.children;
      for (let s = 0, a = r.length; s < a; s++) this.expandByObject(r[s], t);
      return this;
    }
    containsPoint(e) {
      return (
        e.x >= this.min.x &&
        e.x <= this.max.x &&
        e.y >= this.min.y &&
        e.y <= this.max.y &&
        e.z >= this.min.z &&
        e.z <= this.max.z
      );
    }
    containsBox(e) {
      return (
        this.min.x <= e.min.x &&
        e.max.x <= this.max.x &&
        this.min.y <= e.min.y &&
        e.max.y <= this.max.y &&
        this.min.z <= e.min.z &&
        e.max.z <= this.max.z
      );
    }
    getParameter(e, t) {
      return t.set(
        (e.x - this.min.x) / (this.max.x - this.min.x),
        (e.y - this.min.y) / (this.max.y - this.min.y),
        (e.z - this.min.z) / (this.max.z - this.min.z),
      );
    }
    intersectsBox(e) {
      return (
        e.max.x >= this.min.x &&
        e.min.x <= this.max.x &&
        e.max.y >= this.min.y &&
        e.min.y <= this.max.y &&
        e.max.z >= this.min.z &&
        e.min.z <= this.max.z
      );
    }
    intersectsSphere(e) {
      return (this.clampPoint(e.center, ln), ln.distanceToSquared(e.center) <= e.radius * e.radius);
    }
    intersectsPlane(e) {
      let t, i;
      return (
        e.normal.x > 0
          ? ((t = e.normal.x * this.min.x), (i = e.normal.x * this.max.x))
          : ((t = e.normal.x * this.max.x), (i = e.normal.x * this.min.x)),
        e.normal.y > 0
          ? ((t += e.normal.y * this.min.y), (i += e.normal.y * this.max.y))
          : ((t += e.normal.y * this.max.y), (i += e.normal.y * this.min.y)),
        e.normal.z > 0
          ? ((t += e.normal.z * this.min.z), (i += e.normal.z * this.max.z))
          : ((t += e.normal.z * this.max.z), (i += e.normal.z * this.min.z)),
        t <= -e.constant && i >= -e.constant
      );
    }
    intersectsTriangle(e) {
      if (this.isEmpty()) return !1;
      (this.getCenter(Qs),
        $a.subVectors(this.max, Qs),
        Jr.subVectors(e.a, Qs),
        $r.subVectors(e.b, Qs),
        Qr.subVectors(e.c, Qs),
        Yn.subVectors($r, Jr),
        Zn.subVectors(Qr, $r),
        vr.subVectors(Jr, Qr));
      let t = [
        0,
        -Yn.z,
        Yn.y,
        0,
        -Zn.z,
        Zn.y,
        0,
        -vr.z,
        vr.y,
        Yn.z,
        0,
        -Yn.x,
        Zn.z,
        0,
        -Zn.x,
        vr.z,
        0,
        -vr.x,
        -Yn.y,
        Yn.x,
        0,
        -Zn.y,
        Zn.x,
        0,
        -vr.y,
        vr.x,
        0,
      ];
      return (
        !!nc(t, Jr, $r, Qr, $a) &&
        ((t = [1, 0, 0, 0, 1, 0, 0, 0, 1]),
        !!nc(t, Jr, $r, Qr, $a) && (Qa.crossVectors(Yn, Zn), (t = [Qa.x, Qa.y, Qa.z]), nc(t, Jr, $r, Qr, $a)))
      );
    }
    clampPoint(e, t) {
      return t.copy(e).clamp(this.min, this.max);
    }
    distanceToPoint(e) {
      return this.clampPoint(e, ln).distanceTo(e);
    }
    getBoundingSphere(e) {
      return (
        this.isEmpty() ? e.makeEmpty() : (this.getCenter(e.center), (e.radius = 0.5 * this.getSize(ln).length())),
        e
      );
    }
    intersect(e) {
      return (this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this);
    }
    union(e) {
      return (this.min.min(e.min), this.max.max(e.max), this);
    }
    applyMatrix4(e) {
      return (
        this.isEmpty() ||
          (Rn[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e),
          Rn[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e),
          Rn[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e),
          Rn[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e),
          Rn[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e),
          Rn[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e),
          Rn[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e),
          Rn[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e),
          this.setFromPoints(Rn)),
        this
      );
    }
    translate(e) {
      return (this.min.add(e), this.max.add(e), this);
    }
    equals(e) {
      return e.min.equals(this.min) && e.max.equals(this.max);
    }
  },
  Rn = [
    new Vector3(),
    new Vector3(),
    new Vector3(),
    new Vector3(),
    new Vector3(),
    new Vector3(),
    new Vector3(),
    new Vector3(),
  ],
  ln = new Vector3(),
  Ja = new Box3(),
  Jr = new Vector3(),
  $r = new Vector3(),
  Qr = new Vector3(),
  Yn = new Vector3(),
  Zn = new Vector3(),
  vr = new Vector3(),
  Qs = new Vector3(),
  $a = new Vector3(),
  Qa = new Vector3(),
  xr = new Vector3();
function nc(n, e, t, i, r) {
  for (let s = 0, a = n.length - 3; s <= a; s += 3) {
    xr.fromArray(n, s);
    let o = r.x * Math.abs(xr.x) + r.y * Math.abs(xr.y) + r.z * Math.abs(xr.z),
      c = e.dot(xr),
      l = t.dot(xr),
      h = i.dot(xr);
    if (Math.max(-Math.max(c, l, h), Math.min(c, l, h)) > o) return !1;
  }
  return !0;
}
var U0 = new Box3(),
  ea = new Vector3(),
  rc = new Vector3(),
  Sphere = class {
    constructor(e = new Vector3(), t = -1) {
      ((this.isSphere = !0), (this.center = e), (this.radius = t));
    }
    set(e, t) {
      return (this.center.copy(e), (this.radius = t), this);
    }
    setFromPoints(e, t) {
      let i = this.center;
      t !== void 0 ? i.copy(t) : U0.setFromPoints(e).getCenter(i);
      let r = 0;
      for (let s = 0, a = e.length; s < a; s++) r = Math.max(r, i.distanceToSquared(e[s]));
      return ((this.radius = Math.sqrt(r)), this);
    }
    copy(e) {
      return (this.center.copy(e.center), (this.radius = e.radius), this);
    }
    isEmpty() {
      return this.radius < 0;
    }
    makeEmpty() {
      return (this.center.set(0, 0, 0), (this.radius = -1), this);
    }
    containsPoint(e) {
      return e.distanceToSquared(this.center) <= this.radius * this.radius;
    }
    distanceToPoint(e) {
      return e.distanceTo(this.center) - this.radius;
    }
    intersectsSphere(e) {
      let t = this.radius + e.radius;
      return e.center.distanceToSquared(this.center) <= t * t;
    }
    intersectsBox(e) {
      return e.intersectsSphere(this);
    }
    intersectsPlane(e) {
      return Math.abs(e.distanceToPoint(this.center)) <= this.radius;
    }
    clampPoint(e, t) {
      let i = this.center.distanceToSquared(e);
      return (
        t.copy(e),
        i > this.radius * this.radius &&
          (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)),
        t
      );
    }
    getBoundingBox(e) {
      return this.isEmpty()
        ? (e.makeEmpty(), e)
        : (e.set(this.center, this.center), e.expandByScalar(this.radius), e);
    }
    applyMatrix4(e) {
      return (this.center.applyMatrix4(e), (this.radius = this.radius * e.getMaxScaleOnAxis()), this);
    }
    translate(e) {
      return (this.center.add(e), this);
    }
    expandByPoint(e) {
      if (this.isEmpty()) return (this.center.copy(e), (this.radius = 0), this);
      ea.subVectors(e, this.center);
      let t = ea.lengthSq();
      if (t > this.radius * this.radius) {
        let i = Math.sqrt(t),
          r = 0.5 * (i - this.radius);
        (this.center.addScaledVector(ea, r / i), (this.radius += r));
      }
      return this;
    }
    union(e) {
      return e.isEmpty()
        ? this
        : this.isEmpty()
          ? (this.copy(e), this)
          : (this.center.equals(e.center) === !0
              ? (this.radius = Math.max(this.radius, e.radius))
              : (rc.subVectors(e.center, this.center).setLength(e.radius),
                this.expandByPoint(ea.copy(e.center).add(rc)),
                this.expandByPoint(ea.copy(e.center).sub(rc))),
            this);
    }
    equals(e) {
      return e.center.equals(this.center) && e.radius === this.radius;
    }
    clone() {
      return new this.constructor().copy(this);
    }
  },
  Pn = new Vector3(),
  sc = new Vector3(),
  eo = new Vector3(),
  Kn = new Vector3(),
  ac = new Vector3(),
  to = new Vector3(),
  oc = new Vector3(),
  gs = class {
    constructor(e = new Vector3(), t = new Vector3(0, 0, -1)) {
      ((this.origin = e), (this.direction = t));
    }
    set(e, t) {
      return (this.origin.copy(e), this.direction.copy(t), this);
    }
    copy(e) {
      return (this.origin.copy(e.origin), this.direction.copy(e.direction), this);
    }
    at(e, t) {
      return t.copy(this.origin).addScaledVector(this.direction, e);
    }
    lookAt(e) {
      return (this.direction.copy(e).sub(this.origin).normalize(), this);
    }
    recast(e) {
      return (this.origin.copy(this.at(e, Pn)), this);
    }
    closestPointToPoint(e, t) {
      t.subVectors(e, this.origin);
      let i = t.dot(this.direction);
      return i < 0 ? t.copy(this.origin) : t.copy(this.origin).addScaledVector(this.direction, i);
    }
    distanceToPoint(e) {
      return Math.sqrt(this.distanceSqToPoint(e));
    }
    distanceSqToPoint(e) {
      let t = Pn.subVectors(e, this.origin).dot(this.direction);
      return t < 0
        ? this.origin.distanceToSquared(e)
        : (Pn.copy(this.origin).addScaledVector(this.direction, t), Pn.distanceToSquared(e));
    }
    distanceSqToSegment(e, t, i, r) {
      (sc.copy(e).add(t).multiplyScalar(0.5), eo.copy(t).sub(e).normalize(), Kn.copy(this.origin).sub(sc));
      let s = 0.5 * e.distanceTo(t),
        a = -this.direction.dot(eo),
        o = Kn.dot(this.direction),
        c = -Kn.dot(eo),
        l = Kn.lengthSq(),
        h = Math.abs(1 - a * a),
        p,
        u,
        f,
        g;
      if (h > 0) {
        if (((p = a * c - o), (u = a * o - c), (g = s * h), p >= 0)) {
          if (u >= -g) {
            if (u <= g) {
              let y = 1 / h;
              ((p *= y), (u *= y), (f = p * (p + a * u + 2 * o) + u * (a * p + u + 2 * c) + l));
            } else ((u = s), (p = Math.max(0, -(a * u + o))), (f = -p * p + u * (u + 2 * c) + l));
          } else ((u = -s), (p = Math.max(0, -(a * u + o))), (f = -p * p + u * (u + 2 * c) + l));
        } else
          u <= -g
            ? ((p = Math.max(0, -(-a * s + o))),
              (u = p > 0 ? -s : Math.min(Math.max(-s, -c), s)),
              (f = -p * p + u * (u + 2 * c) + l))
            : u <= g
              ? ((p = 0), (u = Math.min(Math.max(-s, -c), s)), (f = u * (u + 2 * c) + l))
              : ((p = Math.max(0, -(a * s + o))),
                (u = p > 0 ? s : Math.min(Math.max(-s, -c), s)),
                (f = -p * p + u * (u + 2 * c) + l));
      } else ((u = a > 0 ? -s : s), (p = Math.max(0, -(a * u + o))), (f = -p * p + u * (u + 2 * c) + l));
      return (i && i.copy(this.origin).addScaledVector(this.direction, p), r && r.copy(sc).addScaledVector(eo, u), f);
    }
    intersectSphere(e, t) {
      Pn.subVectors(e.center, this.origin);
      let i = Pn.dot(this.direction),
        r = Pn.dot(Pn) - i * i,
        s = e.radius * e.radius;
      if (r > s) return null;
      let a = Math.sqrt(s - r),
        o = i - a,
        c = i + a;
      return c < 0 ? null : o < 0 ? this.at(c, t) : this.at(o, t);
    }
    intersectsSphere(e) {
      return this.distanceSqToPoint(e.center) <= e.radius * e.radius;
    }
    distanceToPlane(e) {
      let t = e.normal.dot(this.direction);
      if (t === 0) return e.distanceToPoint(this.origin) === 0 ? 0 : null;
      let i = -(this.origin.dot(e.normal) + e.constant) / t;
      return i >= 0 ? i : null;
    }
    intersectPlane(e, t) {
      let i = this.distanceToPlane(e);
      return i === null ? null : this.at(i, t);
    }
    intersectsPlane(e) {
      let t = e.distanceToPoint(this.origin);
      return t === 0 ? !0 : e.normal.dot(this.direction) * t < 0;
    }
    intersectBox(e, t) {
      let i,
        r,
        s,
        a,
        o,
        c,
        l = 1 / this.direction.x,
        h = 1 / this.direction.y,
        p = 1 / this.direction.z,
        u = this.origin;
      return (
        l >= 0
          ? ((i = (e.min.x - u.x) * l), (r = (e.max.x - u.x) * l))
          : ((i = (e.max.x - u.x) * l), (r = (e.min.x - u.x) * l)),
        h >= 0
          ? ((s = (e.min.y - u.y) * h), (a = (e.max.y - u.y) * h))
          : ((s = (e.max.y - u.y) * h), (a = (e.min.y - u.y) * h)),
        i > a || s > r
          ? null
          : ((s > i || isNaN(i)) && (i = s),
            (a < r || isNaN(r)) && (r = a),
            p >= 0
              ? ((o = (e.min.z - u.z) * p), (c = (e.max.z - u.z) * p))
              : ((o = (e.max.z - u.z) * p), (c = (e.min.z - u.z) * p)),
            i > c || o > r
              ? null
              : ((o > i || i != i) && (i = o),
                (c < r || r != r) && (r = c),
                r < 0 ? null : this.at(i >= 0 ? i : r, t)))
      );
    }
    intersectsBox(e) {
      return this.intersectBox(e, Pn) !== null;
    }
    intersectTriangle(e, t, i, r, s) {
      (ac.subVectors(t, e), to.subVectors(i, e), oc.crossVectors(ac, to));
      let a,
        o = this.direction.dot(oc);
      if (o > 0) {
        if (r) return null;
        a = 1;
      } else {
        if (!(o < 0)) return null;
        ((a = -1), (o = -o));
      }
      Kn.subVectors(this.origin, e);
      let c = a * this.direction.dot(to.crossVectors(Kn, to));
      if (c < 0) return null;
      let l = a * this.direction.dot(ac.cross(Kn));
      if (l < 0 || c + l > o) return null;
      let h = -a * Kn.dot(oc);
      return h < 0 ? null : this.at(h / o, s);
    }
    applyMatrix4(e) {
      return (this.origin.applyMatrix4(e), this.direction.transformDirection(e), this);
    }
    equals(e) {
      return e.origin.equals(this.origin) && e.direction.equals(this.direction);
    }
    clone() {
      return new this.constructor().copy(this);
    }
  },
  Matrix4 = class n {
    constructor(e, t, i, r, s, a, o, c, l, h, p, u, f, g, y, v) {
      ((n.prototype.isMatrix4 = !0),
        (this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
        e !== void 0 && this.set(e, t, i, r, s, a, o, c, l, h, p, u, f, g, y, v));
    }
    set(e, t, i, r, s, a, o, c, l, h, p, u, f, g, y, v) {
      let d = this.elements;
      return (
        (d[0] = e),
        (d[4] = t),
        (d[8] = i),
        (d[12] = r),
        (d[1] = s),
        (d[5] = a),
        (d[9] = o),
        (d[13] = c),
        (d[2] = l),
        (d[6] = h),
        (d[10] = p),
        (d[14] = u),
        (d[3] = f),
        (d[7] = g),
        (d[11] = y),
        (d[15] = v),
        this
      );
    }
    identity() {
      return (this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this);
    }
    clone() {
      return new n().fromArray(this.elements);
    }
    copy(e) {
      let t = this.elements,
        i = e.elements;
      return (
        (t[0] = i[0]),
        (t[1] = i[1]),
        (t[2] = i[2]),
        (t[3] = i[3]),
        (t[4] = i[4]),
        (t[5] = i[5]),
        (t[6] = i[6]),
        (t[7] = i[7]),
        (t[8] = i[8]),
        (t[9] = i[9]),
        (t[10] = i[10]),
        (t[11] = i[11]),
        (t[12] = i[12]),
        (t[13] = i[13]),
        (t[14] = i[14]),
        (t[15] = i[15]),
        this
      );
    }
    copyPosition(e) {
      let t = this.elements,
        i = e.elements;
      return ((t[12] = i[12]), (t[13] = i[13]), (t[14] = i[14]), this);
    }
    setFromMatrix3(e) {
      let t = e.elements;
      return (this.set(t[0], t[3], t[6], 0, t[1], t[4], t[7], 0, t[2], t[5], t[8], 0, 0, 0, 0, 1), this);
    }
    extractBasis(e, t, i) {
      return (e.setFromMatrixColumn(this, 0), t.setFromMatrixColumn(this, 1), i.setFromMatrixColumn(this, 2), this);
    }
    makeBasis(e, t, i) {
      return (this.set(e.x, t.x, i.x, 0, e.y, t.y, i.y, 0, e.z, t.z, i.z, 0, 0, 0, 0, 1), this);
    }
    extractRotation(e) {
      let t = this.elements,
        i = e.elements,
        r = 1 / es.setFromMatrixColumn(e, 0).length(),
        s = 1 / es.setFromMatrixColumn(e, 1).length(),
        a = 1 / es.setFromMatrixColumn(e, 2).length();
      return (
        (t[0] = i[0] * r),
        (t[1] = i[1] * r),
        (t[2] = i[2] * r),
        (t[3] = 0),
        (t[4] = i[4] * s),
        (t[5] = i[5] * s),
        (t[6] = i[6] * s),
        (t[7] = 0),
        (t[8] = i[8] * a),
        (t[9] = i[9] * a),
        (t[10] = i[10] * a),
        (t[11] = 0),
        (t[12] = 0),
        (t[13] = 0),
        (t[14] = 0),
        (t[15] = 1),
        this
      );
    }
    makeRotationFromEuler(e) {
      let t = this.elements,
        i = e.x,
        r = e.y,
        s = e.z,
        a = Math.cos(i),
        o = Math.sin(i),
        c = Math.cos(r),
        l = Math.sin(r),
        h = Math.cos(s),
        p = Math.sin(s);
      if (e.order === "XYZ") {
        let u = a * h,
          f = a * p,
          g = o * h,
          y = o * p;
        ((t[0] = c * h),
          (t[4] = -c * p),
          (t[8] = l),
          (t[1] = f + g * l),
          (t[5] = u - y * l),
          (t[9] = -o * c),
          (t[2] = y - u * l),
          (t[6] = g + f * l),
          (t[10] = a * c));
      } else if (e.order === "YXZ") {
        let u = c * h,
          f = c * p,
          g = l * h,
          y = l * p;
        ((t[0] = u + y * o),
          (t[4] = g * o - f),
          (t[8] = a * l),
          (t[1] = a * p),
          (t[5] = a * h),
          (t[9] = -o),
          (t[2] = f * o - g),
          (t[6] = y + u * o),
          (t[10] = a * c));
      } else if (e.order === "ZXY") {
        let u = c * h,
          f = c * p,
          g = l * h,
          y = l * p;
        ((t[0] = u - y * o),
          (t[4] = -a * p),
          (t[8] = g + f * o),
          (t[1] = f + g * o),
          (t[5] = a * h),
          (t[9] = y - u * o),
          (t[2] = -a * l),
          (t[6] = o),
          (t[10] = a * c));
      } else if (e.order === "ZYX") {
        let u = a * h,
          f = a * p,
          g = o * h,
          y = o * p;
        ((t[0] = c * h),
          (t[4] = g * l - f),
          (t[8] = u * l + y),
          (t[1] = c * p),
          (t[5] = y * l + u),
          (t[9] = f * l - g),
          (t[2] = -l),
          (t[6] = o * c),
          (t[10] = a * c));
      } else if (e.order === "YZX") {
        let u = a * c,
          f = a * l,
          g = o * c,
          y = o * l;
        ((t[0] = c * h),
          (t[4] = y - u * p),
          (t[8] = g * p + f),
          (t[1] = p),
          (t[5] = a * h),
          (t[9] = -o * h),
          (t[2] = -l * h),
          (t[6] = f * p + g),
          (t[10] = u - y * p));
      } else if (e.order === "XZY") {
        let u = a * c,
          f = a * l,
          g = o * c,
          y = o * l;
        ((t[0] = c * h),
          (t[4] = -p),
          (t[8] = l * h),
          (t[1] = u * p + y),
          (t[5] = a * h),
          (t[9] = f * p - g),
          (t[2] = g * p - f),
          (t[6] = o * h),
          (t[10] = y * p + u));
      }
      return ((t[3] = 0), (t[7] = 0), (t[11] = 0), (t[12] = 0), (t[13] = 0), (t[14] = 0), (t[15] = 1), this);
    }
    makeRotationFromQuaternion(e) {
      return this.compose(O0, e, F0);
    }
    lookAt(e, t, i) {
      let r = this.elements;
      return (
        Gi.subVectors(e, t),
        Gi.lengthSq() === 0 && (Gi.z = 1),
        Gi.normalize(),
        Jn.crossVectors(i, Gi),
        Jn.lengthSq() === 0 &&
          (Math.abs(i.z) === 1 ? (Gi.x += 1e-4) : (Gi.z += 1e-4), Gi.normalize(), Jn.crossVectors(i, Gi)),
        Jn.normalize(),
        io.crossVectors(Gi, Jn),
        (r[0] = Jn.x),
        (r[4] = io.x),
        (r[8] = Gi.x),
        (r[1] = Jn.y),
        (r[5] = io.y),
        (r[9] = Gi.y),
        (r[2] = Jn.z),
        (r[6] = io.z),
        (r[10] = Gi.z),
        this
      );
    }
    multiply(e) {
      return this.multiplyMatrices(this, e);
    }
    premultiply(e) {
      return this.multiplyMatrices(e, this);
    }
    multiplyMatrices(e, t) {
      let i = e.elements,
        r = t.elements,
        s = this.elements,
        a = i[0],
        o = i[4],
        c = i[8],
        l = i[12],
        h = i[1],
        p = i[5],
        u = i[9],
        f = i[13],
        g = i[2],
        y = i[6],
        v = i[10],
        d = i[14],
        m = i[3],
        x = i[7],
        b = i[11],
        w = i[15],
        A = r[0],
        C = r[4],
        F = r[8],
        N = r[12],
        G = r[1],
        W = r[5],
        B = r[9],
        $ = r[13],
        Z = r[2],
        ie = r[6],
        ae = r[10],
        me = r[14],
        ve = r[3],
        Ee = r[7],
        Ue = r[11],
        pe = r[15];
      return (
        (s[0] = a * A + o * G + c * Z + l * ve),
        (s[4] = a * C + o * W + c * ie + l * Ee),
        (s[8] = a * F + o * B + c * ae + l * Ue),
        (s[12] = a * N + o * $ + c * me + l * pe),
        (s[1] = h * A + p * G + u * Z + f * ve),
        (s[5] = h * C + p * W + u * ie + f * Ee),
        (s[9] = h * F + p * B + u * ae + f * Ue),
        (s[13] = h * N + p * $ + u * me + f * pe),
        (s[2] = g * A + y * G + v * Z + d * ve),
        (s[6] = g * C + y * W + v * ie + d * Ee),
        (s[10] = g * F + y * B + v * ae + d * Ue),
        (s[14] = g * N + y * $ + v * me + d * pe),
        (s[3] = m * A + x * G + b * Z + w * ve),
        (s[7] = m * C + x * W + b * ie + w * Ee),
        (s[11] = m * F + x * B + b * ae + w * Ue),
        (s[15] = m * N + x * $ + b * me + w * pe),
        this
      );
    }
    multiplyScalar(e) {
      let t = this.elements;
      return (
        (t[0] *= e),
        (t[4] *= e),
        (t[8] *= e),
        (t[12] *= e),
        (t[1] *= e),
        (t[5] *= e),
        (t[9] *= e),
        (t[13] *= e),
        (t[2] *= e),
        (t[6] *= e),
        (t[10] *= e),
        (t[14] *= e),
        (t[3] *= e),
        (t[7] *= e),
        (t[11] *= e),
        (t[15] *= e),
        this
      );
    }
    determinant() {
      let e = this.elements,
        t = e[0],
        i = e[4],
        r = e[8],
        s = e[12],
        a = e[1],
        o = e[5],
        c = e[9],
        l = e[13],
        h = e[2],
        p = e[6],
        u = e[10],
        f = e[14];
      return (
        e[3] * (+s * c * p - r * l * p - s * o * u + i * l * u + r * o * f - i * c * f) +
        e[7] * (+t * c * f - t * l * u + s * a * u - r * a * f + r * l * h - s * c * h) +
        e[11] * (+t * l * p - t * o * f - s * a * p + i * a * f + s * o * h - i * l * h) +
        e[15] * (-r * o * h - t * c * p + t * o * u + r * a * p - i * a * u + i * c * h)
      );
    }
    transpose() {
      let e = this.elements,
        t;
      return (
        (t = e[1]),
        (e[1] = e[4]),
        (e[4] = t),
        (t = e[2]),
        (e[2] = e[8]),
        (e[8] = t),
        (t = e[6]),
        (e[6] = e[9]),
        (e[9] = t),
        (t = e[3]),
        (e[3] = e[12]),
        (e[12] = t),
        (t = e[7]),
        (e[7] = e[13]),
        (e[13] = t),
        (t = e[11]),
        (e[11] = e[14]),
        (e[14] = t),
        this
      );
    }
    setPosition(e, t, i) {
      let r = this.elements;
      return (
        e.isVector3 ? ((r[12] = e.x), (r[13] = e.y), (r[14] = e.z)) : ((r[12] = e), (r[13] = t), (r[14] = i)),
        this
      );
    }
    invert() {
      let e = this.elements,
        t = e[0],
        i = e[1],
        r = e[2],
        s = e[3],
        a = e[4],
        o = e[5],
        c = e[6],
        l = e[7],
        h = e[8],
        p = e[9],
        u = e[10],
        f = e[11],
        g = e[12],
        y = e[13],
        v = e[14],
        d = e[15],
        m = p * v * l - y * u * l + y * c * f - o * v * f - p * c * d + o * u * d,
        x = g * u * l - h * v * l - g * c * f + a * v * f + h * c * d - a * u * d,
        b = h * y * l - g * p * l + g * o * f - a * y * f - h * o * d + a * p * d,
        w = g * p * c - h * y * c - g * o * u + a * y * u + h * o * v - a * p * v,
        A = t * m + i * x + r * b + s * w;
      if (A === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      let C = 1 / A;
      return (
        (e[0] = m * C),
        (e[1] = (y * u * s - p * v * s - y * r * f + i * v * f + p * r * d - i * u * d) * C),
        (e[2] = (o * v * s - y * c * s + y * r * l - i * v * l - o * r * d + i * c * d) * C),
        (e[3] = (p * c * s - o * u * s - p * r * l + i * u * l + o * r * f - i * c * f) * C),
        (e[4] = x * C),
        (e[5] = (h * v * s - g * u * s + g * r * f - t * v * f - h * r * d + t * u * d) * C),
        (e[6] = (g * c * s - a * v * s - g * r * l + t * v * l + a * r * d - t * c * d) * C),
        (e[7] = (a * u * s - h * c * s + h * r * l - t * u * l - a * r * f + t * c * f) * C),
        (e[8] = b * C),
        (e[9] = (g * p * s - h * y * s - g * i * f + t * y * f + h * i * d - t * p * d) * C),
        (e[10] = (a * y * s - g * o * s + g * i * l - t * y * l - a * i * d + t * o * d) * C),
        (e[11] = (h * o * s - a * p * s - h * i * l + t * p * l + a * i * f - t * o * f) * C),
        (e[12] = w * C),
        (e[13] = (h * y * r - g * p * r + g * i * u - t * y * u - h * i * v + t * p * v) * C),
        (e[14] = (g * o * r - a * y * r - g * i * c + t * y * c + a * i * v - t * o * v) * C),
        (e[15] = (a * p * r - h * o * r + h * i * c - t * p * c - a * i * u + t * o * u) * C),
        this
      );
    }
    scale(e) {
      let t = this.elements,
        i = e.x,
        r = e.y,
        s = e.z;
      return (
        (t[0] *= i),
        (t[4] *= r),
        (t[8] *= s),
        (t[1] *= i),
        (t[5] *= r),
        (t[9] *= s),
        (t[2] *= i),
        (t[6] *= r),
        (t[10] *= s),
        (t[3] *= i),
        (t[7] *= r),
        (t[11] *= s),
        this
      );
    }
    getMaxScaleOnAxis() {
      let e = this.elements,
        t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2],
        i = e[4] * e[4] + e[5] * e[5] + e[6] * e[6],
        r = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
      return Math.sqrt(Math.max(t, i, r));
    }
    makeTranslation(e, t, i) {
      return (
        e.isVector3
          ? this.set(1, 0, 0, e.x, 0, 1, 0, e.y, 0, 0, 1, e.z, 0, 0, 0, 1)
          : this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, i, 0, 0, 0, 1),
        this
      );
    }
    makeRotationX(e) {
      let t = Math.cos(e),
        i = Math.sin(e);
      return (this.set(1, 0, 0, 0, 0, t, -i, 0, 0, i, t, 0, 0, 0, 0, 1), this);
    }
    makeRotationY(e) {
      let t = Math.cos(e),
        i = Math.sin(e);
      return (this.set(t, 0, i, 0, 0, 1, 0, 0, -i, 0, t, 0, 0, 0, 0, 1), this);
    }
    makeRotationZ(e) {
      let t = Math.cos(e),
        i = Math.sin(e);
      return (this.set(t, -i, 0, 0, i, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this);
    }
    makeRotationAxis(e, t) {
      let i = Math.cos(t),
        r = Math.sin(t),
        s = 1 - i,
        a = e.x,
        o = e.y,
        c = e.z,
        l = s * a,
        h = s * o;
      return (
        this.set(
          l * a + i,
          l * o - r * c,
          l * c + r * o,
          0,
          l * o + r * c,
          h * o + i,
          h * c - r * a,
          0,
          l * c - r * o,
          h * c + r * a,
          s * c * c + i,
          0,
          0,
          0,
          0,
          1,
        ),
        this
      );
    }
    makeScale(e, t, i) {
      return (this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, i, 0, 0, 0, 0, 1), this);
    }
    makeShear(e, t, i, r, s, a) {
      return (this.set(1, i, s, 0, e, 1, a, 0, t, r, 1, 0, 0, 0, 0, 1), this);
    }
    compose(e, t, i) {
      let r = this.elements,
        s = t._x,
        a = t._y,
        o = t._z,
        c = t._w,
        l = s + s,
        h = a + a,
        p = o + o,
        u = s * l,
        f = s * h,
        g = s * p,
        y = a * h,
        v = a * p,
        d = o * p,
        m = c * l,
        x = c * h,
        b = c * p,
        w = i.x,
        A = i.y,
        C = i.z;
      return (
        (r[0] = (1 - (y + d)) * w),
        (r[1] = (f + b) * w),
        (r[2] = (g - x) * w),
        (r[3] = 0),
        (r[4] = (f - b) * A),
        (r[5] = (1 - (u + d)) * A),
        (r[6] = (v + m) * A),
        (r[7] = 0),
        (r[8] = (g + x) * C),
        (r[9] = (v - m) * C),
        (r[10] = (1 - (u + y)) * C),
        (r[11] = 0),
        (r[12] = e.x),
        (r[13] = e.y),
        (r[14] = e.z),
        (r[15] = 1),
        this
      );
    }
    decompose(e, t, i) {
      let r = this.elements,
        s = es.set(r[0], r[1], r[2]).length(),
        a = es.set(r[4], r[5], r[6]).length(),
        o = es.set(r[8], r[9], r[10]).length();
      (this.determinant() < 0 && (s = -s), (e.x = r[12]), (e.y = r[13]), (e.z = r[14]), cn.copy(this));
      let c = 1 / s,
        l = 1 / a,
        h = 1 / o;
      return (
        (cn.elements[0] *= c),
        (cn.elements[1] *= c),
        (cn.elements[2] *= c),
        (cn.elements[4] *= l),
        (cn.elements[5] *= l),
        (cn.elements[6] *= l),
        (cn.elements[8] *= h),
        (cn.elements[9] *= h),
        (cn.elements[10] *= h),
        t.setFromRotationMatrix(cn),
        (i.x = s),
        (i.y = a),
        (i.z = o),
        this
      );
    }
    makePerspective(e, t, i, r, s, a, o = 2e3) {
      let c = this.elements,
        l = (2 * s) / (t - e),
        h = (2 * s) / (i - r),
        p = (t + e) / (t - e),
        u = (i + r) / (i - r),
        f,
        g;
      if (o === WebGLCoordinateSystem) ((f = -(a + s) / (a - s)), (g = (-2 * a * s) / (a - s)));
      else {
        if (o !== WebGPUCoordinateSystem)
          throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + o);
        ((f = -a / (a - s)), (g = (-a * s) / (a - s)));
      }
      return (
        (c[0] = l),
        (c[4] = 0),
        (c[8] = p),
        (c[12] = 0),
        (c[1] = 0),
        (c[5] = h),
        (c[9] = u),
        (c[13] = 0),
        (c[2] = 0),
        (c[6] = 0),
        (c[10] = f),
        (c[14] = g),
        (c[3] = 0),
        (c[7] = 0),
        (c[11] = -1),
        (c[15] = 0),
        this
      );
    }
    makeOrthographic(e, t, i, r, s, a, o = 2e3) {
      let c = this.elements,
        l = 1 / (t - e),
        h = 1 / (i - r),
        p = 1 / (a - s),
        u = (t + e) * l,
        f = (i + r) * h,
        g,
        y;
      if (o === WebGLCoordinateSystem) ((g = (a + s) * p), (y = -2 * p));
      else {
        if (o !== WebGPUCoordinateSystem)
          throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + o);
        ((g = s * p), (y = -1 * p));
      }
      return (
        (c[0] = 2 * l),
        (c[4] = 0),
        (c[8] = 0),
        (c[12] = -u),
        (c[1] = 0),
        (c[5] = 2 * h),
        (c[9] = 0),
        (c[13] = -f),
        (c[2] = 0),
        (c[6] = 0),
        (c[10] = y),
        (c[14] = -g),
        (c[3] = 0),
        (c[7] = 0),
        (c[11] = 0),
        (c[15] = 1),
        this
      );
    }
    equals(e) {
      let t = this.elements,
        i = e.elements;
      for (let r = 0; r < 16; r++) if (t[r] !== i[r]) return !1;
      return !0;
    }
    fromArray(e, t = 0) {
      for (let i = 0; i < 16; i++) this.elements[i] = e[i + t];
      return this;
    }
    toArray(e = [], t = 0) {
      let i = this.elements;
      return (
        (e[t] = i[0]),
        (e[t + 1] = i[1]),
        (e[t + 2] = i[2]),
        (e[t + 3] = i[3]),
        (e[t + 4] = i[4]),
        (e[t + 5] = i[5]),
        (e[t + 6] = i[6]),
        (e[t + 7] = i[7]),
        (e[t + 8] = i[8]),
        (e[t + 9] = i[9]),
        (e[t + 10] = i[10]),
        (e[t + 11] = i[11]),
        (e[t + 12] = i[12]),
        (e[t + 13] = i[13]),
        (e[t + 14] = i[14]),
        (e[t + 15] = i[15]),
        e
      );
    }
  },
  es = new Vector3(),
  cn = new Matrix4(),
  O0 = new Vector3(0, 0, 0),
  F0 = new Vector3(1, 1, 1),
  Jn = new Vector3(),
  io = new Vector3(),
  Gi = new Vector3(),
  xd = new Matrix4(),
  yd = new Quaternion(),
  Euler = class n {
    constructor(e = 0, t = 0, i = 0, r = n.DEFAULT_ORDER) {
      ((this.isEuler = !0), (this._x = e), (this._y = t), (this._z = i), (this._order = r));
    }
    get x() {
      return this._x;
    }
    set x(e) {
      ((this._x = e), this._onChangeCallback());
    }
    get y() {
      return this._y;
    }
    set y(e) {
      ((this._y = e), this._onChangeCallback());
    }
    get z() {
      return this._z;
    }
    set z(e) {
      ((this._z = e), this._onChangeCallback());
    }
    get order() {
      return this._order;
    }
    set order(e) {
      ((this._order = e), this._onChangeCallback());
    }
    set(e, t, i, r = this._order) {
      return ((this._x = e), (this._y = t), (this._z = i), (this._order = r), this._onChangeCallback(), this);
    }
    clone() {
      return new this.constructor(this._x, this._y, this._z, this._order);
    }
    copy(e) {
      return (
        (this._x = e._x),
        (this._y = e._y),
        (this._z = e._z),
        (this._order = e._order),
        this._onChangeCallback(),
        this
      );
    }
    setFromRotationMatrix(e, t = this._order, i = !0) {
      let r = e.elements,
        s = r[0],
        a = r[4],
        o = r[8],
        c = r[1],
        l = r[5],
        h = r[9],
        p = r[2],
        u = r[6],
        f = r[10];
      switch (t) {
        case "XYZ":
          ((this._y = Math.asin(ui(o, -1, 1))),
            Math.abs(o) < 0.9999999
              ? ((this._x = Math.atan2(-h, f)), (this._z = Math.atan2(-a, s)))
              : ((this._x = Math.atan2(u, l)), (this._z = 0)));
          break;
        case "YXZ":
          ((this._x = Math.asin(-ui(h, -1, 1))),
            Math.abs(h) < 0.9999999
              ? ((this._y = Math.atan2(o, f)), (this._z = Math.atan2(c, l)))
              : ((this._y = Math.atan2(-p, s)), (this._z = 0)));
          break;
        case "ZXY":
          ((this._x = Math.asin(ui(u, -1, 1))),
            Math.abs(u) < 0.9999999
              ? ((this._y = Math.atan2(-p, f)), (this._z = Math.atan2(-a, l)))
              : ((this._y = 0), (this._z = Math.atan2(c, s))));
          break;
        case "ZYX":
          ((this._y = Math.asin(-ui(p, -1, 1))),
            Math.abs(p) < 0.9999999
              ? ((this._x = Math.atan2(u, f)), (this._z = Math.atan2(c, s)))
              : ((this._x = 0), (this._z = Math.atan2(-a, l))));
          break;
        case "YZX":
          ((this._z = Math.asin(ui(c, -1, 1))),
            Math.abs(c) < 0.9999999
              ? ((this._x = Math.atan2(-h, l)), (this._y = Math.atan2(-p, s)))
              : ((this._x = 0), (this._y = Math.atan2(o, f))));
          break;
        case "XZY":
          ((this._z = Math.asin(-ui(a, -1, 1))),
            Math.abs(a) < 0.9999999
              ? ((this._x = Math.atan2(u, l)), (this._y = Math.atan2(o, s)))
              : ((this._x = Math.atan2(-h, f)), (this._y = 0)));
          break;
        default:
          console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + t);
      }
      return ((this._order = t), i === !0 && this._onChangeCallback(), this);
    }
    setFromQuaternion(e, t, i) {
      return (xd.makeRotationFromQuaternion(e), this.setFromRotationMatrix(xd, t, i));
    }
    setFromVector3(e, t = this._order) {
      return this.set(e.x, e.y, e.z, t);
    }
    reorder(e) {
      return (yd.setFromEuler(this), this.setFromQuaternion(yd, e));
    }
    equals(e) {
      return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order;
    }
    fromArray(e) {
      return (
        (this._x = e[0]),
        (this._y = e[1]),
        (this._z = e[2]),
        e[3] !== void 0 && (this._order = e[3]),
        this._onChangeCallback(),
        this
      );
    }
    toArray(e = [], t = 0) {
      return ((e[t] = this._x), (e[t + 1] = this._y), (e[t + 2] = this._z), (e[t + 3] = this._order), e);
    }
    _onChange(e) {
      return ((this._onChangeCallback = e), this);
    }
    _onChangeCallback() {}
    *[Symbol.iterator]() {
      (yield this._x, yield this._y, yield this._z, yield this._order);
    }
  };
Euler.DEFAULT_ORDER = "XYZ";
var Wo = class {
    constructor() {
      this.mask = 1;
    }
    set(e) {
      this.mask = ((1 << e) | 0) >>> 0;
    }
    enable(e) {
      this.mask |= (1 << e) | 0;
    }
    enableAll() {
      this.mask = -1;
    }
    toggle(e) {
      this.mask ^= (1 << e) | 0;
    }
    disable(e) {
      this.mask &= ~((1 << e) | 0);
    }
    disableAll() {
      this.mask = 0;
    }
    test(e) {
      return (this.mask & e.mask) != 0;
    }
    isEnabled(e) {
      return (this.mask & ((1 << e) | 0)) != 0;
    }
  },
  B0 = 0,
  _d = new Vector3(),
  ts = new Quaternion(),
  Ln = new Matrix4(),
  no = new Vector3(),
  ta = new Vector3(),
  z0 = new Vector3(),
  k0 = new Quaternion(),
  bd = new Vector3(1, 0, 0),
  Md = new Vector3(0, 1, 0),
  Sd = new Vector3(0, 0, 1),
  wd = {
    type: "added",
  },
  G0 = {
    type: "removed",
  },
  is = {
    type: "childadded",
    child: null,
  },
  lc = {
    type: "childremoved",
    child: null,
  },
  Object3D = class n extends sr {
    constructor() {
      (super(),
        (this.isObject3D = !0),
        Object.defineProperty(this, "id", {
          value: B0++,
        }),
        (this.uuid = Ts()),
        (this.name = ""),
        (this.type = "Object3D"),
        (this.parent = null),
        (this.children = []),
        (this.up = n.DEFAULT_UP.clone()));
      let e = new Vector3(),
        t = new Euler(),
        i = new Quaternion(),
        r = new Vector3(1, 1, 1);
      (t._onChange(function () {
        i.setFromEuler(t, !1);
      }),
        i._onChange(function () {
          t.setFromQuaternion(i, void 0, !1);
        }),
        Object.defineProperties(this, {
          position: {
            configurable: !0,
            enumerable: !0,
            value: e,
          },
          rotation: {
            configurable: !0,
            enumerable: !0,
            value: t,
          },
          quaternion: {
            configurable: !0,
            enumerable: !0,
            value: i,
          },
          scale: {
            configurable: !0,
            enumerable: !0,
            value: r,
          },
          modelViewMatrix: {
            value: new Matrix4(),
          },
          normalMatrix: {
            value: new Matrix3(),
          },
        }),
        (this.matrix = new Matrix4()),
        (this.matrixWorld = new Matrix4()),
        (this.matrixAutoUpdate = n.DEFAULT_MATRIX_AUTO_UPDATE),
        (this.matrixWorldAutoUpdate = n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE),
        (this.matrixWorldNeedsUpdate = !1),
        (this.layers = new Wo()),
        (this.visible = !0),
        (this.castShadow = !1),
        (this.receiveShadow = !1),
        (this.frustumCulled = !0),
        (this.renderOrder = 0),
        (this.animations = []),
        (this.userData = {}));
    }
    onBeforeShadow() {}
    onAfterShadow() {}
    onBeforeRender() {}
    onAfterRender() {}
    applyMatrix4(e) {
      (this.matrixAutoUpdate && this.updateMatrix(),
        this.matrix.premultiply(e),
        this.matrix.decompose(this.position, this.quaternion, this.scale));
    }
    applyQuaternion(e) {
      return (this.quaternion.premultiply(e), this);
    }
    setRotationFromAxisAngle(e, t) {
      this.quaternion.setFromAxisAngle(e, t);
    }
    setRotationFromEuler(e) {
      this.quaternion.setFromEuler(e, !0);
    }
    setRotationFromMatrix(e) {
      this.quaternion.setFromRotationMatrix(e);
    }
    setRotationFromQuaternion(e) {
      this.quaternion.copy(e);
    }
    rotateOnAxis(e, t) {
      return (ts.setFromAxisAngle(e, t), this.quaternion.multiply(ts), this);
    }
    rotateOnWorldAxis(e, t) {
      return (ts.setFromAxisAngle(e, t), this.quaternion.premultiply(ts), this);
    }
    rotateX(e) {
      return this.rotateOnAxis(bd, e);
    }
    rotateY(e) {
      return this.rotateOnAxis(Md, e);
    }
    rotateZ(e) {
      return this.rotateOnAxis(Sd, e);
    }
    translateOnAxis(e, t) {
      return (_d.copy(e).applyQuaternion(this.quaternion), this.position.add(_d.multiplyScalar(t)), this);
    }
    translateX(e) {
      return this.translateOnAxis(bd, e);
    }
    translateY(e) {
      return this.translateOnAxis(Md, e);
    }
    translateZ(e) {
      return this.translateOnAxis(Sd, e);
    }
    localToWorld(e) {
      return (this.updateWorldMatrix(!0, !1), e.applyMatrix4(this.matrixWorld));
    }
    worldToLocal(e) {
      return (this.updateWorldMatrix(!0, !1), e.applyMatrix4(Ln.copy(this.matrixWorld).invert()));
    }
    lookAt(e, t, i) {
      e.isVector3 ? no.copy(e) : no.set(e, t, i);
      let r = this.parent;
      (this.updateWorldMatrix(!0, !1),
        ta.setFromMatrixPosition(this.matrixWorld),
        this.isCamera || this.isLight ? Ln.lookAt(ta, no, this.up) : Ln.lookAt(no, ta, this.up),
        this.quaternion.setFromRotationMatrix(Ln),
        r &&
          (Ln.extractRotation(r.matrixWorld),
          ts.setFromRotationMatrix(Ln),
          this.quaternion.premultiply(ts.invert())));
    }
    add(e) {
      if (arguments.length > 1) {
        for (let t = 0; t < arguments.length; t++) this.add(arguments[t]);
        return this;
      }
      return e === this
        ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", e), this)
        : (e && e.isObject3D
            ? (e.removeFromParent(),
              (e.parent = this),
              this.children.push(e),
              e.dispatchEvent(wd),
              (is.child = e),
              this.dispatchEvent(is),
              (is.child = null))
            : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", e),
          this);
    }
    remove(e) {
      if (arguments.length > 1) {
        for (let i = 0; i < arguments.length; i++) this.remove(arguments[i]);
        return this;
      }
      let t = this.children.indexOf(e);
      return (
        t !== -1 &&
          ((e.parent = null),
          this.children.splice(t, 1),
          e.dispatchEvent(G0),
          (lc.child = e),
          this.dispatchEvent(lc),
          (lc.child = null)),
        this
      );
    }
    removeFromParent() {
      let e = this.parent;
      return (e !== null && e.remove(this), this);
    }
    clear() {
      return this.remove(...this.children);
    }
    attach(e) {
      return (
        this.updateWorldMatrix(!0, !1),
        Ln.copy(this.matrixWorld).invert(),
        e.parent !== null && (e.parent.updateWorldMatrix(!0, !1), Ln.multiply(e.parent.matrixWorld)),
        e.applyMatrix4(Ln),
        e.removeFromParent(),
        (e.parent = this),
        this.children.push(e),
        e.updateWorldMatrix(!1, !0),
        e.dispatchEvent(wd),
        (is.child = e),
        this.dispatchEvent(is),
        (is.child = null),
        this
      );
    }
    getObjectById(e) {
      return this.getObjectByProperty("id", e);
    }
    getObjectByName(e) {
      return this.getObjectByProperty("name", e);
    }
    getObjectByProperty(e, t) {
      if (this[e] === t) return this;
      for (let i = 0, r = this.children.length; i < r; i++) {
        let s = this.children[i].getObjectByProperty(e, t);
        if (s !== void 0) return s;
      }
    }
    getObjectsByProperty(e, t, i = []) {
      this[e] === t && i.push(this);
      let r = this.children;
      for (let s = 0, a = r.length; s < a; s++) r[s].getObjectsByProperty(e, t, i);
      return i;
    }
    getWorldPosition(e) {
      return (this.updateWorldMatrix(!0, !1), e.setFromMatrixPosition(this.matrixWorld));
    }
    getWorldQuaternion(e) {
      return (this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(ta, e, z0), e);
    }
    getWorldScale(e) {
      return (this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(ta, k0, e), e);
    }
    getWorldDirection(e) {
      this.updateWorldMatrix(!0, !1);
      let t = this.matrixWorld.elements;
      return e.set(t[8], t[9], t[10]).normalize();
    }
    raycast() {}
    traverse(e) {
      e(this);
      let t = this.children;
      for (let i = 0, r = t.length; i < r; i++) t[i].traverse(e);
    }
    traverseVisible(e) {
      if (this.visible === !1) return;
      e(this);
      let t = this.children;
      for (let i = 0, r = t.length; i < r; i++) t[i].traverseVisible(e);
    }
    traverseAncestors(e) {
      let t = this.parent;
      t !== null && (e(t), t.traverseAncestors(e));
    }
    updateMatrix() {
      (this.matrix.compose(this.position, this.quaternion, this.scale), (this.matrixWorldNeedsUpdate = !0));
    }
    updateMatrixWorld(e) {
      (this.matrixAutoUpdate && this.updateMatrix(),
        (this.matrixWorldNeedsUpdate || e) &&
          (this.matrixWorldAutoUpdate === !0 &&
            (this.parent === null
              ? this.matrixWorld.copy(this.matrix)
              : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)),
          (this.matrixWorldNeedsUpdate = !1),
          (e = !0)));
      let t = this.children;
      for (let i = 0, r = t.length; i < r; i++) t[i].updateMatrixWorld(e);
    }
    updateWorldMatrix(e, t) {
      let i = this.parent;
      if (
        (e === !0 && i !== null && i.updateWorldMatrix(!0, !1),
        this.matrixAutoUpdate && this.updateMatrix(),
        this.matrixWorldAutoUpdate === !0 &&
          (this.parent === null
            ? this.matrixWorld.copy(this.matrix)
            : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)),
        t === !0)
      ) {
        let r = this.children;
        for (let s = 0, a = r.length; s < a; s++) r[s].updateWorldMatrix(!1, !0);
      }
    }
    toJSON(e) {
      let t = e === void 0 || typeof e == "string",
        i = {};
      t &&
        ((e = {
          geometries: {},
          materials: {},
          textures: {},
          images: {},
          shapes: {},
          skeletons: {},
          animations: {},
          nodes: {},
        }),
        (i.metadata = {
          version: 4.6,
          type: "Object",
          generator: "Object3D.toJSON",
        }));
      let r = {};
      function s(o, c) {
        return (o[c.uuid] === void 0 && (o[c.uuid] = c.toJSON(e)), c.uuid);
      }
      if (
        ((r.uuid = this.uuid),
        (r.type = this.type),
        this.name !== "" && (r.name = this.name),
        this.castShadow === !0 && (r.castShadow = !0),
        this.receiveShadow === !0 && (r.receiveShadow = !0),
        this.visible === !1 && (r.visible = !1),
        this.frustumCulled === !1 && (r.frustumCulled = !1),
        this.renderOrder !== 0 && (r.renderOrder = this.renderOrder),
        Object.keys(this.userData).length > 0 && (r.userData = this.userData),
        (r.layers = this.layers.mask),
        (r.matrix = this.matrix.toArray()),
        (r.up = this.up.toArray()),
        this.matrixAutoUpdate === !1 && (r.matrixAutoUpdate = !1),
        this.isInstancedMesh &&
          ((r.type = "InstancedMesh"),
          (r.count = this.count),
          (r.instanceMatrix = this.instanceMatrix.toJSON()),
          this.instanceColor !== null && (r.instanceColor = this.instanceColor.toJSON())),
        this.isBatchedMesh &&
          ((r.type = "BatchedMesh"),
          (r.perObjectFrustumCulled = this.perObjectFrustumCulled),
          (r.sortObjects = this.sortObjects),
          (r.drawRanges = this._drawRanges),
          (r.reservedRanges = this._reservedRanges),
          (r.visibility = this._visibility),
          (r.active = this._active),
          (r.bounds = this._bounds.map((o) => ({
            boxInitialized: o.boxInitialized,
            boxMin: o.box.min.toArray(),
            boxMax: o.box.max.toArray(),
            sphereInitialized: o.sphereInitialized,
            sphereRadius: o.sphere.radius,
            sphereCenter: o.sphere.center.toArray(),
          }))),
          (r.maxInstanceCount = this._maxInstanceCount),
          (r.maxVertexCount = this._maxVertexCount),
          (r.maxIndexCount = this._maxIndexCount),
          (r.geometryInitialized = this._geometryInitialized),
          (r.geometryCount = this._geometryCount),
          (r.matricesTexture = this._matricesTexture.toJSON(e)),
          this._colorsTexture !== null && (r.colorsTexture = this._colorsTexture.toJSON(e)),
          this.boundingSphere !== null &&
            (r.boundingSphere = {
              center: r.boundingSphere.center.toArray(),
              radius: r.boundingSphere.radius,
            }),
          this.boundingBox !== null &&
            (r.boundingBox = {
              min: r.boundingBox.min.toArray(),
              max: r.boundingBox.max.toArray(),
            })),
        this.isScene)
      )
        (this.background &&
          (this.background.isColor
            ? (r.background = this.background.toJSON())
            : this.background.isTexture && (r.background = this.background.toJSON(e).uuid)),
          this.environment &&
            this.environment.isTexture &&
            this.environment.isRenderTargetTexture !== !0 &&
            (r.environment = this.environment.toJSON(e).uuid));
      else if (this.isMesh || this.isLine || this.isPoints) {
        r.geometry = s(e.geometries, this.geometry);
        let o = this.geometry.parameters;
        if (o !== void 0 && o.shapes !== void 0) {
          let c = o.shapes;
          if (Array.isArray(c))
            for (let l = 0, h = c.length; l < h; l++) {
              let p = c[l];
              s(e.shapes, p);
            }
          else s(e.shapes, c);
        }
      }
      if (
        (this.isSkinnedMesh &&
          ((r.bindMode = this.bindMode),
          (r.bindMatrix = this.bindMatrix.toArray()),
          this.skeleton !== void 0 && (s(e.skeletons, this.skeleton), (r.skeleton = this.skeleton.uuid))),
        this.material !== void 0)
      )
        if (Array.isArray(this.material)) {
          let o = [];
          for (let c = 0, l = this.material.length; c < l; c++) o.push(s(e.materials, this.material[c]));
          r.material = o;
        } else r.material = s(e.materials, this.material);
      if (this.children.length > 0) {
        r.children = [];
        for (let o = 0; o < this.children.length; o++) r.children.push(this.children[o].toJSON(e).object);
      }
      if (this.animations.length > 0) {
        r.animations = [];
        for (let o = 0; o < this.animations.length; o++) {
          let c = this.animations[o];
          r.animations.push(s(e.animations, c));
        }
      }
      if (t) {
        let o = a(e.geometries),
          c = a(e.materials),
          l = a(e.textures),
          h = a(e.images),
          p = a(e.shapes),
          u = a(e.skeletons),
          f = a(e.animations),
          g = a(e.nodes);
        (o.length > 0 && (i.geometries = o),
          c.length > 0 && (i.materials = c),
          l.length > 0 && (i.textures = l),
          h.length > 0 && (i.images = h),
          p.length > 0 && (i.shapes = p),
          u.length > 0 && (i.skeletons = u),
          f.length > 0 && (i.animations = f),
          g.length > 0 && (i.nodes = g));
      }
      return ((i.object = r), i);
      function a(o) {
        let c = [];
        for (let l in o) {
          let h = o[l];
          (delete h.metadata, c.push(h));
        }
        return c;
      }
    }
    clone(e) {
      return new this.constructor().copy(this, e);
    }
    copy(e, t = !0) {
      if (
        ((this.name = e.name),
        this.up.copy(e.up),
        this.position.copy(e.position),
        (this.rotation.order = e.rotation.order),
        this.quaternion.copy(e.quaternion),
        this.scale.copy(e.scale),
        this.matrix.copy(e.matrix),
        this.matrixWorld.copy(e.matrixWorld),
        (this.matrixAutoUpdate = e.matrixAutoUpdate),
        (this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate),
        (this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate),
        (this.layers.mask = e.layers.mask),
        (this.visible = e.visible),
        (this.castShadow = e.castShadow),
        (this.receiveShadow = e.receiveShadow),
        (this.frustumCulled = e.frustumCulled),
        (this.renderOrder = e.renderOrder),
        (this.animations = e.animations.slice()),
        (this.userData = JSON.parse(JSON.stringify(e.userData))),
        t === !0)
      )
        for (let i = 0; i < e.children.length; i++) {
          let r = e.children[i];
          this.add(r.clone());
        }
      return this;
    }
  };
((Object3D.DEFAULT_UP = new Vector3(0, 1, 0)),
  (Object3D.DEFAULT_MATRIX_AUTO_UPDATE = !0),
  (Object3D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0));
var hn = new Vector3(),
  In = new Vector3(),
  cc = new Vector3(),
  Dn = new Vector3(),
  ns = new Vector3(),
  rs = new Vector3(),
  Td = new Vector3(),
  hc = new Vector3(),
  uc = new Vector3(),
  dc = new Vector3(),
  pc = new Vector4(),
  fc = new Vector4(),
  mc = new Vector4(),
  tr = class n {
    constructor(e = new Vector3(), t = new Vector3(), i = new Vector3()) {
      ((this.a = e), (this.b = t), (this.c = i));
    }
    static getNormal(e, t, i, r) {
      (r.subVectors(i, t), hn.subVectors(e, t), r.cross(hn));
      let s = r.lengthSq();
      return s > 0 ? r.multiplyScalar(1 / Math.sqrt(s)) : r.set(0, 0, 0);
    }
    static getBarycoord(e, t, i, r, s) {
      (hn.subVectors(r, t), In.subVectors(i, t), cc.subVectors(e, t));
      let a = hn.dot(hn),
        o = hn.dot(In),
        c = hn.dot(cc),
        l = In.dot(In),
        h = In.dot(cc),
        p = a * l - o * o;
      if (p === 0) return (s.set(0, 0, 0), null);
      let u = 1 / p,
        f = (l * c - o * h) * u,
        g = (a * h - o * c) * u;
      return s.set(1 - f - g, g, f);
    }
    static containsPoint(e, t, i, r) {
      return this.getBarycoord(e, t, i, r, Dn) !== null && Dn.x >= 0 && Dn.y >= 0 && Dn.x + Dn.y <= 1;
    }
    static getInterpolation(e, t, i, r, s, a, o, c) {
      return this.getBarycoord(e, t, i, r, Dn) === null
        ? ((c.x = 0), (c.y = 0), "z" in c && (c.z = 0), "w" in c && (c.w = 0), null)
        : (c.setScalar(0), c.addScaledVector(s, Dn.x), c.addScaledVector(a, Dn.y), c.addScaledVector(o, Dn.z), c);
    }
    static getInterpolatedAttribute(e, t, i, r, s, a) {
      return (
        pc.setScalar(0),
        fc.setScalar(0),
        mc.setScalar(0),
        pc.fromBufferAttribute(e, t),
        fc.fromBufferAttribute(e, i),
        mc.fromBufferAttribute(e, r),
        a.setScalar(0),
        a.addScaledVector(pc, s.x),
        a.addScaledVector(fc, s.y),
        a.addScaledVector(mc, s.z),
        a
      );
    }
    static isFrontFacing(e, t, i, r) {
      return (hn.subVectors(i, t), In.subVectors(e, t), hn.cross(In).dot(r) < 0);
    }
    set(e, t, i) {
      return (this.a.copy(e), this.b.copy(t), this.c.copy(i), this);
    }
    setFromPointsAndIndices(e, t, i, r) {
      return (this.a.copy(e[t]), this.b.copy(e[i]), this.c.copy(e[r]), this);
    }
    setFromAttributeAndIndices(e, t, i, r) {
      return (
        this.a.fromBufferAttribute(e, t),
        this.b.fromBufferAttribute(e, i),
        this.c.fromBufferAttribute(e, r),
        this
      );
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(e) {
      return (this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this);
    }
    getArea() {
      return (hn.subVectors(this.c, this.b), In.subVectors(this.a, this.b), 0.5 * hn.cross(In).length());
    }
    getMidpoint(e) {
      return e
        .addVectors(this.a, this.b)
        .add(this.c)
        .multiplyScalar(1 / 3);
    }
    getNormal(e) {
      return n.getNormal(this.a, this.b, this.c, e);
    }
    getPlane(e) {
      return e.setFromCoplanarPoints(this.a, this.b, this.c);
    }
    getBarycoord(e, t) {
      return n.getBarycoord(e, this.a, this.b, this.c, t);
    }
    getInterpolation(e, t, i, r, s) {
      return n.getInterpolation(e, this.a, this.b, this.c, t, i, r, s);
    }
    containsPoint(e) {
      return n.containsPoint(e, this.a, this.b, this.c);
    }
    isFrontFacing(e) {
      return n.isFrontFacing(this.a, this.b, this.c, e);
    }
    intersectsBox(e) {
      return e.intersectsTriangle(this);
    }
    closestPointToPoint(e, t) {
      let i = this.a,
        r = this.b,
        s = this.c,
        a,
        o;
      (ns.subVectors(r, i), rs.subVectors(s, i), hc.subVectors(e, i));
      let c = ns.dot(hc),
        l = rs.dot(hc);
      if (c <= 0 && l <= 0) return t.copy(i);
      uc.subVectors(e, r);
      let h = ns.dot(uc),
        p = rs.dot(uc);
      if (h >= 0 && p <= h) return t.copy(r);
      let u = c * p - h * l;
      if (u <= 0 && c >= 0 && h <= 0) return ((a = c / (c - h)), t.copy(i).addScaledVector(ns, a));
      dc.subVectors(e, s);
      let f = ns.dot(dc),
        g = rs.dot(dc);
      if (g >= 0 && f <= g) return t.copy(s);
      let y = f * l - c * g;
      if (y <= 0 && l >= 0 && g <= 0) return ((o = l / (l - g)), t.copy(i).addScaledVector(rs, o));
      let v = h * g - f * p;
      if (v <= 0 && p - h >= 0 && f - g >= 0)
        return (Td.subVectors(s, r), (o = (p - h) / (p - h + (f - g))), t.copy(r).addScaledVector(Td, o));
      let d = 1 / (v + y + u);
      return ((a = y * d), (o = u * d), t.copy(i).addScaledVector(ns, a).addScaledVector(rs, o));
    }
    equals(e) {
      return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c);
    }
  },
  Rp = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074,
  },
  $n = {
    h: 0,
    s: 0,
    l: 0,
  },
  ro = {
    h: 0,
    s: 0,
    l: 0,
  };
function gc(n, e, t) {
  return (
    t < 0 && (t += 1),
    t > 1 && (t -= 1),
    t < 1 / 6 ? n + 6 * (e - n) * t : t < 0.5 ? e : t < 2 / 3 ? n + 6 * (e - n) * (2 / 3 - t) : n
  );
}
var Color = class {
    constructor(e, t, i) {
      return ((this.isColor = !0), (this.r = 1), (this.g = 1), (this.b = 1), this.set(e, t, i));
    }
    set(e, t, i) {
      if (t === void 0 && i === void 0) {
        let r = e;
        r && r.isColor
          ? this.copy(r)
          : typeof r == "number"
            ? this.setHex(r)
            : typeof r == "string" && this.setStyle(r);
      } else this.setRGB(e, t, i);
      return this;
    }
    setScalar(e) {
      return ((this.r = e), (this.g = e), (this.b = e), this);
    }
    setHex(e, t = Ft) {
      return (
        (e = Math.floor(e)),
        (this.r = ((e >> 16) & 255) / 255),
        (this.g = ((e >> 8) & 255) / 255),
        (this.b = (255 & e) / 255),
        Mt.toWorkingColorSpace(this, t),
        this
      );
    }
    setRGB(e, t, i, r = Mt.workingColorSpace) {
      return ((this.r = e), (this.g = t), (this.b = i), Mt.toWorkingColorSpace(this, r), this);
    }
    setHSL(e, t, i, r = Mt.workingColorSpace) {
      if (((e = P0(e, 1)), (t = ui(t, 0, 1)), (i = ui(i, 0, 1)), t === 0)) this.r = this.g = this.b = i;
      else {
        let s = i <= 0.5 ? i * (1 + t) : i + t - i * t,
          a = 2 * i - s;
        ((this.r = gc(a, s, e + 1 / 3)), (this.g = gc(a, s, e)), (this.b = gc(a, s, e - 1 / 3)));
      }
      return (Mt.toWorkingColorSpace(this, r), this);
    }
    setStyle(e, t = Ft) {
      function i(s) {
        s !== void 0 &&
          parseFloat(s) < 1 &&
          console.warn("THREE.Color: Alpha component of " + e + " will be ignored.");
      }
      let r;
      if ((r = /^(\w+)\(([^\)]*)\)/.exec(e))) {
        let s,
          a = r[1],
          o = r[2];
        switch (a) {
          case "rgb":
          case "rgba":
            if ((s = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)))
              return (
                i(s[4]),
                this.setRGB(
                  Math.min(255, parseInt(s[1], 10)) / 255,
                  Math.min(255, parseInt(s[2], 10)) / 255,
                  Math.min(255, parseInt(s[3], 10)) / 255,
                  t,
                )
              );
            if ((s = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)))
              return (
                i(s[4]),
                this.setRGB(
                  Math.min(100, parseInt(s[1], 10)) / 100,
                  Math.min(100, parseInt(s[2], 10)) / 100,
                  Math.min(100, parseInt(s[3], 10)) / 100,
                  t,
                )
              );
            break;
          case "hsl":
          case "hsla":
            if ((s = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)))
              return (
                i(s[4]),
                this.setHSL(parseFloat(s[1]) / 360, parseFloat(s[2]) / 100, parseFloat(s[3]) / 100, t)
              );
            break;
          default:
            console.warn("THREE.Color: Unknown color model " + e);
        }
      } else if ((r = /^\#([A-Fa-f\d]+)$/.exec(e))) {
        let s = r[1],
          a = s.length;
        if (a === 3)
          return this.setRGB(
            parseInt(s.charAt(0), 16) / 15,
            parseInt(s.charAt(1), 16) / 15,
            parseInt(s.charAt(2), 16) / 15,
            t,
          );
        if (a === 6) return this.setHex(parseInt(s, 16), t);
        console.warn("THREE.Color: Invalid hex color " + e);
      } else if (e && e.length > 0) return this.setColorName(e, t);
      return this;
    }
    setColorName(e, t = Ft) {
      let i = Rp[e.toLowerCase()];
      return (i !== void 0 ? this.setHex(i, t) : console.warn("THREE.Color: Unknown color " + e), this);
    }
    clone() {
      return new this.constructor(this.r, this.g, this.b);
    }
    copy(e) {
      return ((this.r = e.r), (this.g = e.g), (this.b = e.b), this);
    }
    copySRGBToLinear(e) {
      return ((this.r = cs(e.r)), (this.g = cs(e.g)), (this.b = cs(e.b)), this);
    }
    copyLinearToSRGB(e) {
      return ((this.r = ec(e.r)), (this.g = ec(e.g)), (this.b = ec(e.b)), this);
    }
    convertSRGBToLinear() {
      return (this.copySRGBToLinear(this), this);
    }
    convertLinearToSRGB() {
      return (this.copyLinearToSRGB(this), this);
    }
    getHex(e = Ft) {
      return (
        Mt.fromWorkingColorSpace(gi.copy(this), e),
        65536 * Math.round(ui(255 * gi.r, 0, 255)) +
          256 * Math.round(ui(255 * gi.g, 0, 255)) +
          Math.round(ui(255 * gi.b, 0, 255))
      );
    }
    getHexString(e = Ft) {
      return ("000000" + this.getHex(e).toString(16)).slice(-6);
    }
    getHSL(e, t = Mt.workingColorSpace) {
      Mt.fromWorkingColorSpace(gi.copy(this), t);
      let i = gi.r,
        r = gi.g,
        s = gi.b,
        a = Math.max(i, r, s),
        o = Math.min(i, r, s),
        c,
        l,
        h = (o + a) / 2;
      if (o === a) ((c = 0), (l = 0));
      else {
        let p = a - o;
        switch (((l = h <= 0.5 ? p / (a + o) : p / (2 - a - o)), a)) {
          case i:
            c = (r - s) / p + (r < s ? 6 : 0);
            break;
          case r:
            c = (s - i) / p + 2;
            break;
          case s:
            c = (i - r) / p + 4;
        }
        c /= 6;
      }
      return ((e.h = c), (e.s = l), (e.l = h), e);
    }
    getRGB(e, t = Mt.workingColorSpace) {
      return (Mt.fromWorkingColorSpace(gi.copy(this), t), (e.r = gi.r), (e.g = gi.g), (e.b = gi.b), e);
    }
    getStyle(e = Ft) {
      Mt.fromWorkingColorSpace(gi.copy(this), e);
      let t = gi.r,
        i = gi.g,
        r = gi.b;
      return e !== Ft
        ? `color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`
        : `rgb(${Math.round(255 * t)},${Math.round(255 * i)},${Math.round(255 * r)})`;
    }
    offsetHSL(e, t, i) {
      return (this.getHSL($n), this.setHSL($n.h + e, $n.s + t, $n.l + i));
    }
    add(e) {
      return ((this.r += e.r), (this.g += e.g), (this.b += e.b), this);
    }
    addColors(e, t) {
      return ((this.r = e.r + t.r), (this.g = e.g + t.g), (this.b = e.b + t.b), this);
    }
    addScalar(e) {
      return ((this.r += e), (this.g += e), (this.b += e), this);
    }
    sub(e) {
      return (
        (this.r = Math.max(0, this.r - e.r)),
        (this.g = Math.max(0, this.g - e.g)),
        (this.b = Math.max(0, this.b - e.b)),
        this
      );
    }
    multiply(e) {
      return ((this.r *= e.r), (this.g *= e.g), (this.b *= e.b), this);
    }
    multiplyScalar(e) {
      return ((this.r *= e), (this.g *= e), (this.b *= e), this);
    }
    lerp(e, t) {
      return ((this.r += (e.r - this.r) * t), (this.g += (e.g - this.g) * t), (this.b += (e.b - this.b) * t), this);
    }
    lerpColors(e, t, i) {
      return (
        (this.r = e.r + (t.r - e.r) * i),
        (this.g = e.g + (t.g - e.g) * i),
        (this.b = e.b + (t.b - e.b) * i),
        this
      );
    }
    lerpHSL(e, t) {
      (this.getHSL($n), e.getHSL(ro));
      let i = $l($n.h, ro.h, t),
        r = $l($n.s, ro.s, t),
        s = $l($n.l, ro.l, t);
      return (this.setHSL(i, r, s), this);
    }
    setFromVector3(e) {
      return ((this.r = e.x), (this.g = e.y), (this.b = e.z), this);
    }
    applyMatrix3(e) {
      let t = this.r,
        i = this.g,
        r = this.b,
        s = e.elements;
      return (
        (this.r = s[0] * t + s[3] * i + s[6] * r),
        (this.g = s[1] * t + s[4] * i + s[7] * r),
        (this.b = s[2] * t + s[5] * i + s[8] * r),
        this
      );
    }
    equals(e) {
      return e.r === this.r && e.g === this.g && e.b === this.b;
    }
    fromArray(e, t = 0) {
      return ((this.r = e[t]), (this.g = e[t + 1]), (this.b = e[t + 2]), this);
    }
    toArray(e = [], t = 0) {
      return ((e[t] = this.r), (e[t + 1] = this.g), (e[t + 2] = this.b), e);
    }
    fromBufferAttribute(e, t) {
      return ((this.r = e.getX(t)), (this.g = e.getY(t)), (this.b = e.getZ(t)), this);
    }
    toJSON() {
      return this.getHex();
    }
    *[Symbol.iterator]() {
      (yield this.r, yield this.g, yield this.b);
    }
  },
  gi = new Color();
Color.NAMES = Rp;
var H0 = 0,
  Material = class extends sr {
    constructor() {
      (super(),
        (this.isMaterial = !0),
        Object.defineProperty(this, "id", {
          value: H0++,
        }),
        (this.uuid = Ts()),
        (this.name = ""),
        (this.type = "Material"),
        (this.blending = 1),
        (this.side = Ni),
        (this.vertexColors = !1),
        (this.opacity = 1),
        (this.transparent = !1),
        (this.alphaHash = !1),
        (this.blendSrc = SrcAlphaFactor),
        (this.blendDst = OneMinusSrcAlphaFactor),
        (this.blendEquation = AddEquation),
        (this.blendSrcAlpha = null),
        (this.blendDstAlpha = null),
        (this.blendEquationAlpha = null),
        (this.blendColor = new Color(0, 0, 0)),
        (this.blendAlpha = 0),
        (this.depthFunc = 3),
        (this.depthTest = !0),
        (this.depthWrite = !0),
        (this.stencilWriteMask = 255),
        (this.stencilFunc = 519),
        (this.stencilRef = 0),
        (this.stencilFuncMask = 255),
        (this.stencilFail = KeepStencilOp),
        (this.stencilZFail = KeepStencilOp),
        (this.stencilZPass = KeepStencilOp),
        (this.stencilWrite = !1),
        (this.clippingPlanes = null),
        (this.clipIntersection = !1),
        (this.clipShadows = !1),
        (this.shadowSide = null),
        (this.colorWrite = !0),
        (this.precision = null),
        (this.polygonOffset = !1),
        (this.polygonOffsetFactor = 0),
        (this.polygonOffsetUnits = 0),
        (this.dithering = !1),
        (this.alphaToCoverage = !1),
        (this.premultipliedAlpha = !1),
        (this.forceSinglePass = !1),
        (this.visible = !0),
        (this.toneMapped = !0),
        (this.userData = {}),
        (this.version = 0),
        (this._alphaTest = 0));
    }
    get alphaTest() {
      return this._alphaTest;
    }
    set alphaTest(e) {
      (this._alphaTest > 0 != e > 0 && this.version++, (this._alphaTest = e));
    }
    onBeforeRender() {}
    onBeforeCompile() {}
    customProgramCacheKey() {
      return this.onBeforeCompile.toString();
    }
    setValues(e) {
      if (e !== void 0)
        for (let t in e) {
          let i = e[t];
          if (i === void 0) {
            console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);
            continue;
          }
          let r = this[t];
          r !== void 0
            ? r && r.isColor
              ? r.set(i)
              : r && r.isVector3 && i && i.isVector3
                ? r.copy(i)
                : (this[t] = i)
            : console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);
        }
    }
    toJSON(e) {
      let t = e === void 0 || typeof e == "string";
      t &&
        (e = {
          textures: {},
          images: {},
        });
      let i = {
        metadata: {
          version: 4.6,
          type: "Material",
          generator: "Material.toJSON",
        },
      };
      function r(s) {
        let a = [];
        for (let o in s) {
          let c = s[o];
          (delete c.metadata, a.push(c));
        }
        return a;
      }
      if (
        ((i.uuid = this.uuid),
        (i.type = this.type),
        this.name !== "" && (i.name = this.name),
        this.color && this.color.isColor && (i.color = this.color.getHex()),
        this.roughness !== void 0 && (i.roughness = this.roughness),
        this.metalness !== void 0 && (i.metalness = this.metalness),
        this.sheen !== void 0 && (i.sheen = this.sheen),
        this.sheenColor && this.sheenColor.isColor && (i.sheenColor = this.sheenColor.getHex()),
        this.sheenRoughness !== void 0 && (i.sheenRoughness = this.sheenRoughness),
        this.emissive && this.emissive.isColor && (i.emissive = this.emissive.getHex()),
        this.emissiveIntensity !== void 0 &&
          this.emissiveIntensity !== 1 &&
          (i.emissiveIntensity = this.emissiveIntensity),
        this.specular && this.specular.isColor && (i.specular = this.specular.getHex()),
        this.specularIntensity !== void 0 && (i.specularIntensity = this.specularIntensity),
        this.specularColor && this.specularColor.isColor && (i.specularColor = this.specularColor.getHex()),
        this.shininess !== void 0 && (i.shininess = this.shininess),
        this.clearcoat !== void 0 && (i.clearcoat = this.clearcoat),
        this.clearcoatRoughness !== void 0 && (i.clearcoatRoughness = this.clearcoatRoughness),
        this.clearcoatMap && this.clearcoatMap.isTexture && (i.clearcoatMap = this.clearcoatMap.toJSON(e).uuid),
        this.clearcoatRoughnessMap &&
          this.clearcoatRoughnessMap.isTexture &&
          (i.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid),
        this.clearcoatNormalMap &&
          this.clearcoatNormalMap.isTexture &&
          ((i.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid),
          (i.clearcoatNormalScale = this.clearcoatNormalScale.toArray())),
        this.dispersion !== void 0 && (i.dispersion = this.dispersion),
        this.iridescence !== void 0 && (i.iridescence = this.iridescence),
        this.iridescenceIOR !== void 0 && (i.iridescenceIOR = this.iridescenceIOR),
        this.iridescenceThicknessRange !== void 0 && (i.iridescenceThicknessRange = this.iridescenceThicknessRange),
        this.iridescenceMap &&
          this.iridescenceMap.isTexture &&
          (i.iridescenceMap = this.iridescenceMap.toJSON(e).uuid),
        this.iridescenceThicknessMap &&
          this.iridescenceThicknessMap.isTexture &&
          (i.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid),
        this.anisotropy !== void 0 && (i.anisotropy = this.anisotropy),
        this.anisotropyRotation !== void 0 && (i.anisotropyRotation = this.anisotropyRotation),
        this.anisotropyMap && this.anisotropyMap.isTexture && (i.anisotropyMap = this.anisotropyMap.toJSON(e).uuid),
        this.map && this.map.isTexture && (i.map = this.map.toJSON(e).uuid),
        this.matcap && this.matcap.isTexture && (i.matcap = this.matcap.toJSON(e).uuid),
        this.alphaMap && this.alphaMap.isTexture && (i.alphaMap = this.alphaMap.toJSON(e).uuid),
        this.lightMap &&
          this.lightMap.isTexture &&
          ((i.lightMap = this.lightMap.toJSON(e).uuid), (i.lightMapIntensity = this.lightMapIntensity)),
        this.aoMap &&
          this.aoMap.isTexture &&
          ((i.aoMap = this.aoMap.toJSON(e).uuid), (i.aoMapIntensity = this.aoMapIntensity)),
        this.bumpMap &&
          this.bumpMap.isTexture &&
          ((i.bumpMap = this.bumpMap.toJSON(e).uuid), (i.bumpScale = this.bumpScale)),
        this.normalMap &&
          this.normalMap.isTexture &&
          ((i.normalMap = this.normalMap.toJSON(e).uuid),
          (i.normalMapType = this.normalMapType),
          (i.normalScale = this.normalScale.toArray())),
        this.displacementMap &&
          this.displacementMap.isTexture &&
          ((i.displacementMap = this.displacementMap.toJSON(e).uuid),
          (i.displacementScale = this.displacementScale),
          (i.displacementBias = this.displacementBias)),
        this.roughnessMap && this.roughnessMap.isTexture && (i.roughnessMap = this.roughnessMap.toJSON(e).uuid),
        this.metalnessMap && this.metalnessMap.isTexture && (i.metalnessMap = this.metalnessMap.toJSON(e).uuid),
        this.emissiveMap && this.emissiveMap.isTexture && (i.emissiveMap = this.emissiveMap.toJSON(e).uuid),
        this.specularMap && this.specularMap.isTexture && (i.specularMap = this.specularMap.toJSON(e).uuid),
        this.specularIntensityMap &&
          this.specularIntensityMap.isTexture &&
          (i.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid),
        this.specularColorMap &&
          this.specularColorMap.isTexture &&
          (i.specularColorMap = this.specularColorMap.toJSON(e).uuid),
        this.envMap &&
          this.envMap.isTexture &&
          ((i.envMap = this.envMap.toJSON(e).uuid), this.combine !== void 0 && (i.combine = this.combine)),
        this.envMapRotation !== void 0 && (i.envMapRotation = this.envMapRotation.toArray()),
        this.envMapIntensity !== void 0 && (i.envMapIntensity = this.envMapIntensity),
        this.reflectivity !== void 0 && (i.reflectivity = this.reflectivity),
        this.refractionRatio !== void 0 && (i.refractionRatio = this.refractionRatio),
        this.gradientMap && this.gradientMap.isTexture && (i.gradientMap = this.gradientMap.toJSON(e).uuid),
        this.transmission !== void 0 && (i.transmission = this.transmission),
        this.transmissionMap &&
          this.transmissionMap.isTexture &&
          (i.transmissionMap = this.transmissionMap.toJSON(e).uuid),
        this.thickness !== void 0 && (i.thickness = this.thickness),
        this.thicknessMap && this.thicknessMap.isTexture && (i.thicknessMap = this.thicknessMap.toJSON(e).uuid),
        this.attenuationDistance !== void 0 &&
          this.attenuationDistance !== 1 / 0 &&
          (i.attenuationDistance = this.attenuationDistance),
        this.attenuationColor !== void 0 && (i.attenuationColor = this.attenuationColor.getHex()),
        this.size !== void 0 && (i.size = this.size),
        this.shadowSide !== null && (i.shadowSide = this.shadowSide),
        this.sizeAttenuation !== void 0 && (i.sizeAttenuation = this.sizeAttenuation),
        this.blending !== 1 && (i.blending = this.blending),
        this.side !== Ni && (i.side = this.side),
        this.vertexColors === !0 && (i.vertexColors = !0),
        this.opacity < 1 && (i.opacity = this.opacity),
        this.transparent === !0 && (i.transparent = !0),
        this.blendSrc !== SrcAlphaFactor && (i.blendSrc = this.blendSrc),
        this.blendDst !== OneMinusSrcAlphaFactor && (i.blendDst = this.blendDst),
        this.blendEquation !== AddEquation && (i.blendEquation = this.blendEquation),
        this.blendSrcAlpha !== null && (i.blendSrcAlpha = this.blendSrcAlpha),
        this.blendDstAlpha !== null && (i.blendDstAlpha = this.blendDstAlpha),
        this.blendEquationAlpha !== null && (i.blendEquationAlpha = this.blendEquationAlpha),
        this.blendColor && this.blendColor.isColor && (i.blendColor = this.blendColor.getHex()),
        this.blendAlpha !== 0 && (i.blendAlpha = this.blendAlpha),
        this.depthFunc !== 3 && (i.depthFunc = this.depthFunc),
        this.depthTest === !1 && (i.depthTest = this.depthTest),
        this.depthWrite === !1 && (i.depthWrite = this.depthWrite),
        this.colorWrite === !1 && (i.colorWrite = this.colorWrite),
        this.stencilWriteMask !== 255 && (i.stencilWriteMask = this.stencilWriteMask),
        this.stencilFunc !== 519 && (i.stencilFunc = this.stencilFunc),
        this.stencilRef !== 0 && (i.stencilRef = this.stencilRef),
        this.stencilFuncMask !== 255 && (i.stencilFuncMask = this.stencilFuncMask),
        this.stencilFail !== KeepStencilOp && (i.stencilFail = this.stencilFail),
        this.stencilZFail !== KeepStencilOp && (i.stencilZFail = this.stencilZFail),
        this.stencilZPass !== KeepStencilOp && (i.stencilZPass = this.stencilZPass),
        this.stencilWrite === !0 && (i.stencilWrite = this.stencilWrite),
        this.rotation !== void 0 && this.rotation !== 0 && (i.rotation = this.rotation),
        this.polygonOffset === !0 && (i.polygonOffset = !0),
        this.polygonOffsetFactor !== 0 && (i.polygonOffsetFactor = this.polygonOffsetFactor),
        this.polygonOffsetUnits !== 0 && (i.polygonOffsetUnits = this.polygonOffsetUnits),
        this.linewidth !== void 0 && this.linewidth !== 1 && (i.linewidth = this.linewidth),
        this.dashSize !== void 0 && (i.dashSize = this.dashSize),
        this.gapSize !== void 0 && (i.gapSize = this.gapSize),
        this.scale !== void 0 && (i.scale = this.scale),
        this.dithering === !0 && (i.dithering = !0),
        this.alphaTest > 0 && (i.alphaTest = this.alphaTest),
        this.alphaHash === !0 && (i.alphaHash = !0),
        this.alphaToCoverage === !0 && (i.alphaToCoverage = !0),
        this.premultipliedAlpha === !0 && (i.premultipliedAlpha = !0),
        this.forceSinglePass === !0 && (i.forceSinglePass = !0),
        this.wireframe === !0 && (i.wireframe = !0),
        this.wireframeLinewidth > 1 && (i.wireframeLinewidth = this.wireframeLinewidth),
        this.wireframeLinecap !== "round" && (i.wireframeLinecap = this.wireframeLinecap),
        this.wireframeLinejoin !== "round" && (i.wireframeLinejoin = this.wireframeLinejoin),
        this.flatShading === !0 && (i.flatShading = !0),
        this.visible === !1 && (i.visible = !1),
        this.toneMapped === !1 && (i.toneMapped = !1),
        this.fog === !1 && (i.fog = !1),
        Object.keys(this.userData).length > 0 && (i.userData = this.userData),
        t)
      ) {
        let s = r(e.textures),
          a = r(e.images);
        (s.length > 0 && (i.textures = s), a.length > 0 && (i.images = a));
      }
      return i;
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(e) {
      ((this.name = e.name),
        (this.blending = e.blending),
        (this.side = e.side),
        (this.vertexColors = e.vertexColors),
        (this.opacity = e.opacity),
        (this.transparent = e.transparent),
        (this.blendSrc = e.blendSrc),
        (this.blendDst = e.blendDst),
        (this.blendEquation = e.blendEquation),
        (this.blendSrcAlpha = e.blendSrcAlpha),
        (this.blendDstAlpha = e.blendDstAlpha),
        (this.blendEquationAlpha = e.blendEquationAlpha),
        this.blendColor.copy(e.blendColor),
        (this.blendAlpha = e.blendAlpha),
        (this.depthFunc = e.depthFunc),
        (this.depthTest = e.depthTest),
        (this.depthWrite = e.depthWrite),
        (this.stencilWriteMask = e.stencilWriteMask),
        (this.stencilFunc = e.stencilFunc),
        (this.stencilRef = e.stencilRef),
        (this.stencilFuncMask = e.stencilFuncMask),
        (this.stencilFail = e.stencilFail),
        (this.stencilZFail = e.stencilZFail),
        (this.stencilZPass = e.stencilZPass),
        (this.stencilWrite = e.stencilWrite));
      let t = e.clippingPlanes,
        i = null;
      if (t !== null) {
        let r = t.length;
        i = new Array(r);
        for (let s = 0; s !== r; ++s) i[s] = t[s].clone();
      }
      return (
        (this.clippingPlanes = i),
        (this.clipIntersection = e.clipIntersection),
        (this.clipShadows = e.clipShadows),
        (this.shadowSide = e.shadowSide),
        (this.colorWrite = e.colorWrite),
        (this.precision = e.precision),
        (this.polygonOffset = e.polygonOffset),
        (this.polygonOffsetFactor = e.polygonOffsetFactor),
        (this.polygonOffsetUnits = e.polygonOffsetUnits),
        (this.dithering = e.dithering),
        (this.alphaTest = e.alphaTest),
        (this.alphaHash = e.alphaHash),
        (this.alphaToCoverage = e.alphaToCoverage),
        (this.premultipliedAlpha = e.premultipliedAlpha),
        (this.forceSinglePass = e.forceSinglePass),
        (this.visible = e.visible),
        (this.toneMapped = e.toneMapped),
        (this.userData = JSON.parse(JSON.stringify(e.userData))),
        this
      );
    }
    dispose() {
      this.dispatchEvent({
        type: "dispose",
      });
    }
    set needsUpdate(e) {
      e === !0 && this.version++;
    }
    onBuild() {
      console.warn("Material: onBuild() has been removed.");
    }
  },
  MeshBasicMaterial = class extends Material {
    constructor(e) {
      (super(),
        (this.isMeshBasicMaterial = !0),
        (this.type = "MeshBasicMaterial"),
        (this.color = new Color(16777215)),
        (this.map = null),
        (this.lightMap = null),
        (this.lightMapIntensity = 1),
        (this.aoMap = null),
        (this.aoMapIntensity = 1),
        (this.specularMap = null),
        (this.alphaMap = null),
        (this.envMap = null),
        (this.envMapRotation = new Euler()),
        (this.combine = mp),
        (this.reflectivity = 1),
        (this.refractionRatio = 0.98),
        (this.wireframe = !1),
        (this.wireframeLinewidth = 1),
        (this.wireframeLinecap = "round"),
        (this.wireframeLinejoin = "round"),
        (this.fog = !0),
        this.setValues(e));
    }
    copy(e) {
      return (
        super.copy(e),
        this.color.copy(e.color),
        (this.map = e.map),
        (this.lightMap = e.lightMap),
        (this.lightMapIntensity = e.lightMapIntensity),
        (this.aoMap = e.aoMap),
        (this.aoMapIntensity = e.aoMapIntensity),
        (this.specularMap = e.specularMap),
        (this.alphaMap = e.alphaMap),
        (this.envMap = e.envMap),
        this.envMapRotation.copy(e.envMapRotation),
        (this.combine = e.combine),
        (this.reflectivity = e.reflectivity),
        (this.refractionRatio = e.refractionRatio),
        (this.wireframe = e.wireframe),
        (this.wireframeLinewidth = e.wireframeLinewidth),
        (this.wireframeLinecap = e.wireframeLinecap),
        (this.wireframeLinejoin = e.wireframeLinejoin),
        (this.fog = e.fog),
        this
      );
    }
  },
  j1 = V0();
function V0() {
  let n = new ArrayBuffer(4),
    e = new Float32Array(n),
    t = new Uint32Array(n),
    i = new Uint32Array(512),
    r = new Uint32Array(512);
  for (let c = 0; c < 256; ++c) {
    let l = c - 127;
    l < -27
      ? ((i[c] = 0), (i[256 | c] = 32768), (r[c] = 24), (r[256 | c] = 24))
      : l < -14
        ? ((i[c] = 1024 >> (-l - 14)),
          (i[256 | c] = (1024 >> (-l - 14)) | 32768),
          (r[c] = -l - 1),
          (r[256 | c] = -l - 1))
        : l <= 15
          ? ((i[c] = (l + 15) << 10), (i[256 | c] = ((l + 15) << 10) | 32768), (r[c] = 13), (r[256 | c] = 13))
          : l < 128
            ? ((i[c] = 31744), (i[256 | c] = 64512), (r[c] = 24), (r[256 | c] = 24))
            : ((i[c] = 31744), (i[256 | c] = 64512), (r[c] = 13), (r[256 | c] = 13));
  }
  let s = new Uint32Array(2048),
    a = new Uint32Array(64),
    o = new Uint32Array(64);
  for (let c = 1; c < 1024; ++c) {
    let l = c << 13,
      h = 0;
    for (; (8388608 & l) == 0;) ((l <<= 1), (h -= 8388608));
    ((l &= -8388609), (h += 947912704), (s[c] = l | h));
  }
  for (let c = 1024; c < 2048; ++c) s[c] = 939524096 + ((c - 1024) << 13);
  for (let c = 1; c < 31; ++c) a[c] = c << 23;
  ((a[31] = 1199570944), (a[32] = 2147483648));
  for (let c = 33; c < 63; ++c) a[c] = 2147483648 + ((c - 32) << 23);
  a[63] = 3347054592;
  for (let c = 1; c < 64; ++c) c !== 32 && (o[c] = 1024);
  return {
    floatView: e,
    uint32View: t,
    baseTable: i,
    shiftTable: r,
    mantissaTable: s,
    exponentTable: a,
    offsetTable: o,
  };
}
var Zt = new Vector3(),
  so = new Vector2(),
  BufferAttribute = class {
    constructor(e, t, i = !1) {
      if (Array.isArray(e)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
      ((this.isBufferAttribute = !0),
        (this.name = ""),
        (this.array = e),
        (this.itemSize = t),
        (this.count = e !== void 0 ? e.length / t : 0),
        (this.normalized = i),
        (this.usage = StaticDrawUsage),
        (this.updateRanges = []),
        (this.gpuType = FloatType),
        (this.version = 0));
    }
    onUploadCallback() {}
    set needsUpdate(e) {
      e === !0 && this.version++;
    }
    setUsage(e) {
      return ((this.usage = e), this);
    }
    addUpdateRange(e, t) {
      this.updateRanges.push({
        start: e,
        count: t,
      });
    }
    clearUpdateRanges() {
      this.updateRanges.length = 0;
    }
    copy(e) {
      return (
        (this.name = e.name),
        (this.array = new e.array.constructor(e.array)),
        (this.itemSize = e.itemSize),
        (this.count = e.count),
        (this.normalized = e.normalized),
        (this.usage = e.usage),
        (this.gpuType = e.gpuType),
        this
      );
    }
    copyAt(e, t, i) {
      ((e *= this.itemSize), (i *= t.itemSize));
      for (let r = 0, s = this.itemSize; r < s; r++) this.array[e + r] = t.array[i + r];
      return this;
    }
    copyArray(e) {
      return (this.array.set(e), this);
    }
    applyMatrix3(e) {
      if (this.itemSize === 2)
        for (let t = 0, i = this.count; t < i; t++)
          (so.fromBufferAttribute(this, t), so.applyMatrix3(e), this.setXY(t, so.x, so.y));
      else if (this.itemSize === 3)
        for (let t = 0, i = this.count; t < i; t++)
          (Zt.fromBufferAttribute(this, t), Zt.applyMatrix3(e), this.setXYZ(t, Zt.x, Zt.y, Zt.z));
      return this;
    }
    applyMatrix4(e) {
      for (let t = 0, i = this.count; t < i; t++)
        (Zt.fromBufferAttribute(this, t), Zt.applyMatrix4(e), this.setXYZ(t, Zt.x, Zt.y, Zt.z));
      return this;
    }
    applyNormalMatrix(e) {
      for (let t = 0, i = this.count; t < i; t++)
        (Zt.fromBufferAttribute(this, t), Zt.applyNormalMatrix(e), this.setXYZ(t, Zt.x, Zt.y, Zt.z));
      return this;
    }
    transformDirection(e) {
      for (let t = 0, i = this.count; t < i; t++)
        (Zt.fromBufferAttribute(this, t), Zt.transformDirection(e), this.setXYZ(t, Zt.x, Zt.y, Zt.z));
      return this;
    }
    set(e, t = 0) {
      return (this.array.set(e, t), this);
    }
    getComponent(e, t) {
      let i = this.array[e * this.itemSize + t];
      return (this.normalized && (i = Js(i, this.array)), i);
    }
    setComponent(e, t, i) {
      return (this.normalized && (i = Ii(i, this.array)), (this.array[e * this.itemSize + t] = i), this);
    }
    getX(e) {
      let t = this.array[e * this.itemSize];
      return (this.normalized && (t = Js(t, this.array)), t);
    }
    setX(e, t) {
      return (this.normalized && (t = Ii(t, this.array)), (this.array[e * this.itemSize] = t), this);
    }
    getY(e) {
      let t = this.array[e * this.itemSize + 1];
      return (this.normalized && (t = Js(t, this.array)), t);
    }
    setY(e, t) {
      return (this.normalized && (t = Ii(t, this.array)), (this.array[e * this.itemSize + 1] = t), this);
    }
    getZ(e) {
      let t = this.array[e * this.itemSize + 2];
      return (this.normalized && (t = Js(t, this.array)), t);
    }
    setZ(e, t) {
      return (this.normalized && (t = Ii(t, this.array)), (this.array[e * this.itemSize + 2] = t), this);
    }
    getW(e) {
      let t = this.array[e * this.itemSize + 3];
      return (this.normalized && (t = Js(t, this.array)), t);
    }
    setW(e, t) {
      return (this.normalized && (t = Ii(t, this.array)), (this.array[e * this.itemSize + 3] = t), this);
    }
    setXY(e, t, i) {
      return (
        (e *= this.itemSize),
        this.normalized && ((t = Ii(t, this.array)), (i = Ii(i, this.array))),
        (this.array[e + 0] = t),
        (this.array[e + 1] = i),
        this
      );
    }
    setXYZ(e, t, i, r) {
      return (
        (e *= this.itemSize),
        this.normalized && ((t = Ii(t, this.array)), (i = Ii(i, this.array)), (r = Ii(r, this.array))),
        (this.array[e + 0] = t),
        (this.array[e + 1] = i),
        (this.array[e + 2] = r),
        this
      );
    }
    setXYZW(e, t, i, r, s) {
      return (
        (e *= this.itemSize),
        this.normalized &&
          ((t = Ii(t, this.array)), (i = Ii(i, this.array)), (r = Ii(r, this.array)), (s = Ii(s, this.array))),
        (this.array[e + 0] = t),
        (this.array[e + 1] = i),
        (this.array[e + 2] = r),
        (this.array[e + 3] = s),
        this
      );
    }
    onUpload(e) {
      return ((this.onUploadCallback = e), this);
    }
    clone() {
      return new this.constructor(this.array, this.itemSize).copy(this);
    }
    toJSON() {
      let e = {
        itemSize: this.itemSize,
        type: this.array.constructor.name,
        array: Array.from(this.array),
        normalized: this.normalized,
      };
      return (this.name !== "" && (e.name = this.name), this.usage !== StaticDrawUsage && (e.usage = this.usage), e);
    }
  };
var vs = class extends BufferAttribute {
  constructor(e, t, i) {
    super(new Uint16Array(e), t, i);
  }
};
var xs = class extends BufferAttribute {
  constructor(e, t, i) {
    super(new Uint32Array(e), t, i);
  }
};
var Float32BufferAttribute = class extends BufferAttribute {
    constructor(e, t, i) {
      super(new Float32Array(e), t, i);
    }
  },
  W0 = 0,
  Ji = new Matrix4(),
  vc = new Object3D(),
  ss = new Vector3(),
  Hi = new Box3(),
  ia = new Box3(),
  si = new Vector3(),
  BufferGeometry = class n extends sr {
    constructor() {
      (super(),
        (this.isBufferGeometry = !0),
        Object.defineProperty(this, "id", {
          value: W0++,
        }),
        (this.uuid = Ts()),
        (this.name = ""),
        (this.type = "BufferGeometry"),
        (this.index = null),
        (this.attributes = {}),
        (this.morphAttributes = {}),
        (this.morphTargetsRelative = !1),
        (this.groups = []),
        (this.boundingBox = null),
        (this.boundingSphere = null),
        (this.drawRange = {
          start: 0,
          count: 1 / 0,
        }),
        (this.userData = {}));
    }
    getIndex() {
      return this.index;
    }
    setIndex(e) {
      return (Array.isArray(e) ? (this.index = new (Cp(e) ? xs : vs)(e, 1)) : (this.index = e), this);
    }
    getAttribute(e) {
      return this.attributes[e];
    }
    setAttribute(e, t) {
      return ((this.attributes[e] = t), this);
    }
    deleteAttribute(e) {
      return (delete this.attributes[e], this);
    }
    hasAttribute(e) {
      return this.attributes[e] !== void 0;
    }
    addGroup(e, t, i = 0) {
      this.groups.push({
        start: e,
        count: t,
        materialIndex: i,
      });
    }
    clearGroups() {
      this.groups = [];
    }
    setDrawRange(e, t) {
      ((this.drawRange.start = e), (this.drawRange.count = t));
    }
    applyMatrix4(e) {
      let t = this.attributes.position;
      t !== void 0 && (t.applyMatrix4(e), (t.needsUpdate = !0));
      let i = this.attributes.normal;
      if (i !== void 0) {
        let s = new Matrix3().getNormalMatrix(e);
        (i.applyNormalMatrix(s), (i.needsUpdate = !0));
      }
      let r = this.attributes.tangent;
      return (
        r !== void 0 && (r.transformDirection(e), (r.needsUpdate = !0)),
        this.boundingBox !== null && this.computeBoundingBox(),
        this.boundingSphere !== null && this.computeBoundingSphere(),
        this
      );
    }
    applyQuaternion(e) {
      return (Ji.makeRotationFromQuaternion(e), this.applyMatrix4(Ji), this);
    }
    rotateX(e) {
      return (Ji.makeRotationX(e), this.applyMatrix4(Ji), this);
    }
    rotateY(e) {
      return (Ji.makeRotationY(e), this.applyMatrix4(Ji), this);
    }
    rotateZ(e) {
      return (Ji.makeRotationZ(e), this.applyMatrix4(Ji), this);
    }
    translate(e, t, i) {
      return (Ji.makeTranslation(e, t, i), this.applyMatrix4(Ji), this);
    }
    scale(e, t, i) {
      return (Ji.makeScale(e, t, i), this.applyMatrix4(Ji), this);
    }
    lookAt(e) {
      return (vc.lookAt(e), vc.updateMatrix(), this.applyMatrix4(vc.matrix), this);
    }
    center() {
      return (
        this.computeBoundingBox(),
        this.boundingBox.getCenter(ss).negate(),
        this.translate(ss.x, ss.y, ss.z),
        this
      );
    }
    setFromPoints(e) {
      let t = [];
      for (let i = 0, r = e.length; i < r; i++) {
        let s = e[i];
        t.push(s.x, s.y, s.z || 0);
      }
      return (this.setAttribute("position", new Float32BufferAttribute(t, 3)), this);
    }
    computeBoundingBox() {
      this.boundingBox === null && (this.boundingBox = new Box3());
      let e = this.attributes.position,
        t = this.morphAttributes.position;
      if (e && e.isGLBufferAttribute)
        return (
          console.error(
            "THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",
            this,
          ),
          void this.boundingBox.set(new Vector3(-1 / 0, -1 / 0, -1 / 0), new Vector3(1 / 0, 1 / 0, 1 / 0))
        );
      if (e !== void 0) {
        if ((this.boundingBox.setFromBufferAttribute(e), t))
          for (let i = 0, r = t.length; i < r; i++) {
            let s = t[i];
            (Hi.setFromBufferAttribute(s),
              this.morphTargetsRelative
                ? (si.addVectors(this.boundingBox.min, Hi.min),
                  this.boundingBox.expandByPoint(si),
                  si.addVectors(this.boundingBox.max, Hi.max),
                  this.boundingBox.expandByPoint(si))
                : (this.boundingBox.expandByPoint(Hi.min), this.boundingBox.expandByPoint(Hi.max)));
          }
      } else this.boundingBox.makeEmpty();
      (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) &&
        console.error(
          'THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',
          this,
        );
    }
    computeBoundingSphere() {
      this.boundingSphere === null && (this.boundingSphere = new Sphere());
      let e = this.attributes.position,
        t = this.morphAttributes.position;
      if (e && e.isGLBufferAttribute)
        return (
          console.error(
            "THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",
            this,
          ),
          void this.boundingSphere.set(new Vector3(), 1 / 0)
        );
      if (e) {
        let i = this.boundingSphere.center;
        if ((Hi.setFromBufferAttribute(e), t))
          for (let s = 0, a = t.length; s < a; s++) {
            let o = t[s];
            (ia.setFromBufferAttribute(o),
              this.morphTargetsRelative
                ? (si.addVectors(Hi.min, ia.min),
                  Hi.expandByPoint(si),
                  si.addVectors(Hi.max, ia.max),
                  Hi.expandByPoint(si))
                : (Hi.expandByPoint(ia.min), Hi.expandByPoint(ia.max)));
          }
        Hi.getCenter(i);
        let r = 0;
        for (let s = 0, a = e.count; s < a; s++)
          (si.fromBufferAttribute(e, s), (r = Math.max(r, i.distanceToSquared(si))));
        if (t)
          for (let s = 0, a = t.length; s < a; s++) {
            let o = t[s],
              c = this.morphTargetsRelative;
            for (let l = 0, h = o.count; l < h; l++)
              (si.fromBufferAttribute(o, l),
                c && (ss.fromBufferAttribute(e, l), si.add(ss)),
                (r = Math.max(r, i.distanceToSquared(si))));
          }
        ((this.boundingSphere.radius = Math.sqrt(r)),
          isNaN(this.boundingSphere.radius) &&
            console.error(
              'THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',
              this,
            ));
      }
    }
    computeTangents() {
      let e = this.index,
        t = this.attributes;
      if (e === null || t.position === void 0 || t.normal === void 0 || t.uv === void 0)
        return void console.error(
          "THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)",
        );
      let i = t.position,
        r = t.normal,
        s = t.uv;
      this.hasAttribute("tangent") === !1 &&
        this.setAttribute("tangent", new BufferAttribute(new Float32Array(4 * i.count), 4));
      let a = this.getAttribute("tangent"),
        o = [],
        c = [];
      for (let F = 0; F < i.count; F++) ((o[F] = new Vector3()), (c[F] = new Vector3()));
      let l = new Vector3(),
        h = new Vector3(),
        p = new Vector3(),
        u = new Vector2(),
        f = new Vector2(),
        g = new Vector2(),
        y = new Vector3(),
        v = new Vector3();
      function d(F, N, G) {
        (l.fromBufferAttribute(i, F),
          h.fromBufferAttribute(i, N),
          p.fromBufferAttribute(i, G),
          u.fromBufferAttribute(s, F),
          f.fromBufferAttribute(s, N),
          g.fromBufferAttribute(s, G),
          h.sub(l),
          p.sub(l),
          f.sub(u),
          g.sub(u));
        let W = 1 / (f.x * g.y - g.x * f.y);
        isFinite(W) &&
          (y.copy(h).multiplyScalar(g.y).addScaledVector(p, -f.y).multiplyScalar(W),
          v.copy(p).multiplyScalar(f.x).addScaledVector(h, -g.x).multiplyScalar(W),
          o[F].add(y),
          o[N].add(y),
          o[G].add(y),
          c[F].add(v),
          c[N].add(v),
          c[G].add(v));
      }
      let m = this.groups;
      m.length === 0 &&
        (m = [
          {
            start: 0,
            count: e.count,
          },
        ]);
      for (let F = 0, N = m.length; F < N; ++F) {
        let G = m[F],
          W = G.start;
        for (let B = W, $ = W + G.count; B < $; B += 3) d(e.getX(B + 0), e.getX(B + 1), e.getX(B + 2));
      }
      let x = new Vector3(),
        b = new Vector3(),
        w = new Vector3(),
        A = new Vector3();
      function C(F) {
        (w.fromBufferAttribute(r, F), A.copy(w));
        let N = o[F];
        (x.copy(N), x.sub(w.multiplyScalar(w.dot(N))).normalize(), b.crossVectors(A, N));
        let G = b.dot(c[F]) < 0 ? -1 : 1;
        a.setXYZW(F, x.x, x.y, x.z, G);
      }
      for (let F = 0, N = m.length; F < N; ++F) {
        let G = m[F],
          W = G.start;
        for (let B = W, $ = W + G.count; B < $; B += 3) (C(e.getX(B + 0)), C(e.getX(B + 1)), C(e.getX(B + 2)));
      }
    }
    computeVertexNormals() {
      let e = this.index,
        t = this.getAttribute("position");
      if (t !== void 0) {
        let i = this.getAttribute("normal");
        if (i === void 0)
          ((i = new BufferAttribute(new Float32Array(3 * t.count), 3)), this.setAttribute("normal", i));
        else for (let u = 0, f = i.count; u < f; u++) i.setXYZ(u, 0, 0, 0);
        let r = new Vector3(),
          s = new Vector3(),
          a = new Vector3(),
          o = new Vector3(),
          c = new Vector3(),
          l = new Vector3(),
          h = new Vector3(),
          p = new Vector3();
        if (e)
          for (let u = 0, f = e.count; u < f; u += 3) {
            let g = e.getX(u + 0),
              y = e.getX(u + 1),
              v = e.getX(u + 2);
            (r.fromBufferAttribute(t, g),
              s.fromBufferAttribute(t, y),
              a.fromBufferAttribute(t, v),
              h.subVectors(a, s),
              p.subVectors(r, s),
              h.cross(p),
              o.fromBufferAttribute(i, g),
              c.fromBufferAttribute(i, y),
              l.fromBufferAttribute(i, v),
              o.add(h),
              c.add(h),
              l.add(h),
              i.setXYZ(g, o.x, o.y, o.z),
              i.setXYZ(y, c.x, c.y, c.z),
              i.setXYZ(v, l.x, l.y, l.z));
          }
        else
          for (let u = 0, f = t.count; u < f; u += 3)
            (r.fromBufferAttribute(t, u + 0),
              s.fromBufferAttribute(t, u + 1),
              a.fromBufferAttribute(t, u + 2),
              h.subVectors(a, s),
              p.subVectors(r, s),
              h.cross(p),
              i.setXYZ(u + 0, h.x, h.y, h.z),
              i.setXYZ(u + 1, h.x, h.y, h.z),
              i.setXYZ(u + 2, h.x, h.y, h.z));
        (this.normalizeNormals(), (i.needsUpdate = !0));
      }
    }
    normalizeNormals() {
      let e = this.attributes.normal;
      for (let t = 0, i = e.count; t < i; t++)
        (si.fromBufferAttribute(e, t), si.normalize(), e.setXYZ(t, si.x, si.y, si.z));
    }
    toNonIndexed() {
      function e(o, c) {
        let l = o.array,
          h = o.itemSize,
          p = o.normalized,
          u = new l.constructor(c.length * h),
          f = 0,
          g = 0;
        for (let y = 0, v = c.length; y < v; y++) {
          f = o.isInterleavedBufferAttribute ? c[y] * o.data.stride + o.offset : c[y] * h;
          for (let d = 0; d < h; d++) u[g++] = l[f++];
        }
        return new BufferAttribute(u, h, p);
      }
      if (this.index === null)
        return (console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this);
      let t = new n(),
        i = this.index.array,
        r = this.attributes;
      for (let o in r) {
        let c = e(r[o], i);
        t.setAttribute(o, c);
      }
      let s = this.morphAttributes;
      for (let o in s) {
        let c = [],
          l = s[o];
        for (let h = 0, p = l.length; h < p; h++) {
          let u = e(l[h], i);
          c.push(u);
        }
        t.morphAttributes[o] = c;
      }
      t.morphTargetsRelative = this.morphTargetsRelative;
      let a = this.groups;
      for (let o = 0, c = a.length; o < c; o++) {
        let l = a[o];
        t.addGroup(l.start, l.count, l.materialIndex);
      }
      return t;
    }
    toJSON() {
      let e = {
        metadata: {
          version: 4.6,
          type: "BufferGeometry",
          generator: "BufferGeometry.toJSON",
        },
      };
      if (
        ((e.uuid = this.uuid),
        (e.type = this.type),
        this.name !== "" && (e.name = this.name),
        Object.keys(this.userData).length > 0 && (e.userData = this.userData),
        this.parameters !== void 0)
      ) {
        let c = this.parameters;
        for (let l in c) c[l] !== void 0 && (e[l] = c[l]);
        return e;
      }
      e.data = {
        attributes: {},
      };
      let t = this.index;
      t !== null &&
        (e.data.index = {
          type: t.array.constructor.name,
          array: Array.prototype.slice.call(t.array),
        });
      let i = this.attributes;
      for (let c in i) {
        let l = i[c];
        e.data.attributes[c] = l.toJSON(e.data);
      }
      let r = {},
        s = !1;
      for (let c in this.morphAttributes) {
        let l = this.morphAttributes[c],
          h = [];
        for (let p = 0, u = l.length; p < u; p++) {
          let f = l[p];
          h.push(f.toJSON(e.data));
        }
        h.length > 0 && ((r[c] = h), (s = !0));
      }
      s && ((e.data.morphAttributes = r), (e.data.morphTargetsRelative = this.morphTargetsRelative));
      let a = this.groups;
      a.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(a)));
      let o = this.boundingSphere;
      return (
        o !== null &&
          (e.data.boundingSphere = {
            center: o.center.toArray(),
            radius: o.radius,
          }),
        e
      );
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(e) {
      ((this.index = null),
        (this.attributes = {}),
        (this.morphAttributes = {}),
        (this.groups = []),
        (this.boundingBox = null),
        (this.boundingSphere = null));
      let t = {};
      this.name = e.name;
      let i = e.index;
      i !== null && this.setIndex(i.clone(t));
      let r = e.attributes;
      for (let l in r) {
        let h = r[l];
        this.setAttribute(l, h.clone(t));
      }
      let s = e.morphAttributes;
      for (let l in s) {
        let h = [],
          p = s[l];
        for (let u = 0, f = p.length; u < f; u++) h.push(p[u].clone(t));
        this.morphAttributes[l] = h;
      }
      this.morphTargetsRelative = e.morphTargetsRelative;
      let a = e.groups;
      for (let l = 0, h = a.length; l < h; l++) {
        let p = a[l];
        this.addGroup(p.start, p.count, p.materialIndex);
      }
      let o = e.boundingBox;
      o !== null && (this.boundingBox = o.clone());
      let c = e.boundingSphere;
      return (
        c !== null && (this.boundingSphere = c.clone()),
        (this.drawRange.start = e.drawRange.start),
        (this.drawRange.count = e.drawRange.count),
        (this.userData = e.userData),
        this
      );
    }
    dispose() {
      this.dispatchEvent({
        type: "dispose",
      });
    }
  },
  Ed = new Matrix4(),
  yr = new gs(),
  ao = new Sphere(),
  Ad = new Vector3(),
  oo = new Vector3(),
  lo = new Vector3(),
  co = new Vector3(),
  xc = new Vector3(),
  ho = new Vector3(),
  Cd = new Vector3(),
  uo = new Vector3(),
  Mesh = class extends Object3D {
    constructor(e = new BufferGeometry(), t = new MeshBasicMaterial()) {
      (super(),
        (this.isMesh = !0),
        (this.type = "Mesh"),
        (this.geometry = e),
        (this.material = t),
        this.updateMorphTargets());
    }
    copy(e, t) {
      return (
        super.copy(e, t),
        e.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = e.morphTargetInfluences.slice()),
        e.morphTargetDictionary !== void 0 &&
          (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)),
        (this.material = Array.isArray(e.material) ? e.material.slice() : e.material),
        (this.geometry = e.geometry),
        this
      );
    }
    updateMorphTargets() {
      let e = this.geometry.morphAttributes,
        t = Object.keys(e);
      if (t.length > 0) {
        let i = e[t[0]];
        if (i !== void 0) {
          ((this.morphTargetInfluences = []), (this.morphTargetDictionary = {}));
          for (let r = 0, s = i.length; r < s; r++) {
            let a = i[r].name || String(r);
            (this.morphTargetInfluences.push(0), (this.morphTargetDictionary[a] = r));
          }
        }
      }
    }
    getVertexPosition(e, t) {
      let i = this.geometry,
        r = i.attributes.position,
        s = i.morphAttributes.position,
        a = i.morphTargetsRelative;
      t.fromBufferAttribute(r, e);
      let o = this.morphTargetInfluences;
      if (s && o) {
        ho.set(0, 0, 0);
        for (let c = 0, l = s.length; c < l; c++) {
          let h = o[c],
            p = s[c];
          h !== 0 && (xc.fromBufferAttribute(p, e), a ? ho.addScaledVector(xc, h) : ho.addScaledVector(xc.sub(t), h));
        }
        t.add(ho);
      }
      return t;
    }
    raycast(e, t) {
      let i = this.geometry,
        r = this.material,
        s = this.matrixWorld;
      if (r !== void 0) {
        if (
          (i.boundingSphere === null && i.computeBoundingSphere(),
          ao.copy(i.boundingSphere),
          ao.applyMatrix4(s),
          yr.copy(e.ray).recast(e.near),
          ao.containsPoint(yr.origin) === !1 &&
            (yr.intersectSphere(ao, Ad) === null || yr.origin.distanceToSquared(Ad) > (e.far - e.near) ** 2))
        )
          return;
        (Ed.copy(s).invert(),
          yr.copy(e.ray).applyMatrix4(Ed),
          (i.boundingBox !== null && yr.intersectsBox(i.boundingBox) === !1) || this._computeIntersections(e, t, yr));
      }
    }
    _computeIntersections(e, t, i) {
      let r,
        s = this.geometry,
        a = this.material,
        o = s.index,
        c = s.attributes.position,
        l = s.attributes.uv,
        h = s.attributes.uv1,
        p = s.attributes.normal,
        u = s.groups,
        f = s.drawRange;
      if (o !== null) {
        if (Array.isArray(a))
          for (let g = 0, y = u.length; g < y; g++) {
            let v = u[g],
              d = a[v.materialIndex];
            for (
              let m = Math.max(v.start, f.start),
                x = Math.min(o.count, Math.min(v.start + v.count, f.start + f.count));
              m < x;
              m += 3
            )
              ((r = po(this, d, e, i, l, h, p, o.getX(m), o.getX(m + 1), o.getX(m + 2))),
                r && ((r.faceIndex = Math.floor(m / 3)), (r.face.materialIndex = v.materialIndex), t.push(r)));
          }
        else
          for (let g = Math.max(0, f.start), y = Math.min(o.count, f.start + f.count); g < y; g += 3)
            ((r = po(this, a, e, i, l, h, p, o.getX(g), o.getX(g + 1), o.getX(g + 2))),
              r && ((r.faceIndex = Math.floor(g / 3)), t.push(r)));
      } else if (c !== void 0)
        if (Array.isArray(a))
          for (let g = 0, y = u.length; g < y; g++) {
            let v = u[g],
              d = a[v.materialIndex];
            for (
              let m = Math.max(v.start, f.start),
                x = Math.min(c.count, Math.min(v.start + v.count, f.start + f.count));
              m < x;
              m += 3
            )
              ((r = po(this, d, e, i, l, h, p, m, m + 1, m + 2)),
                r && ((r.faceIndex = Math.floor(m / 3)), (r.face.materialIndex = v.materialIndex), t.push(r)));
          }
        else
          for (let g = Math.max(0, f.start), y = Math.min(c.count, f.start + f.count); g < y; g += 3)
            ((r = po(this, a, e, i, l, h, p, g, g + 1, g + 2)), r && ((r.faceIndex = Math.floor(g / 3)), t.push(r)));
    }
  };
function po(n, e, t, i, r, s, a, o, c, l) {
  (n.getVertexPosition(o, oo), n.getVertexPosition(c, lo), n.getVertexPosition(l, co));
  let h = (function (p, u, f, g, y, v, d, m) {
    let x;
    if (
      ((x = u.side === ai ? g.intersectTriangle(d, v, y, !0, m) : g.intersectTriangle(y, v, d, u.side === Ni, m)),
      x === null)
    )
      return null;
    (uo.copy(m), uo.applyMatrix4(p.matrixWorld));
    let b = f.ray.origin.distanceTo(uo);
    return b < f.near || b > f.far
      ? null
      : {
          distance: b,
          point: uo.clone(),
          object: p,
        };
  })(n, e, t, i, oo, lo, co, Cd);
  if (h) {
    let p = new Vector3();
    (tr.getBarycoord(Cd, oo, lo, co, p),
      r && (h.uv = tr.getInterpolatedAttribute(r, o, c, l, p, new Vector2())),
      s && (h.uv1 = tr.getInterpolatedAttribute(s, o, c, l, p, new Vector2())),
      a &&
        ((h.normal = tr.getInterpolatedAttribute(a, o, c, l, p, new Vector3())),
        h.normal.dot(i.direction) > 0 && h.normal.multiplyScalar(-1)));
    let u = {
      a: o,
      b: c,
      c: l,
      normal: new Vector3(),
      materialIndex: 0,
    };
    (tr.getNormal(oo, lo, co, u.normal), (h.face = u), (h.barycoord = p));
  }
  return h;
}
var BoxGeometry = class n extends BufferGeometry {
  constructor(e = 1, t = 1, i = 1, r = 1, s = 1, a = 1) {
    (super(),
      (this.type = "BoxGeometry"),
      (this.parameters = {
        width: e,
        height: t,
        depth: i,
        widthSegments: r,
        heightSegments: s,
        depthSegments: a,
      }));
    let o = this;
    ((r = Math.floor(r)), (s = Math.floor(s)), (a = Math.floor(a)));
    let c = [],
      l = [],
      h = [],
      p = [],
      u = 0,
      f = 0;
    function g(y, v, d, m, x, b, w, A, C, F, N) {
      let G = b / C,
        W = w / F,
        B = b / 2,
        $ = w / 2,
        Z = A / 2,
        ie = C + 1,
        ae = F + 1,
        me = 0,
        ve = 0,
        Ee = new Vector3();
      for (let Ue = 0; Ue < ae; Ue++) {
        let pe = Ue * W - $;
        for (let ge = 0; ge < ie; ge++) {
          let Re = ge * G - B;
          ((Ee[y] = Re * m),
            (Ee[v] = pe * x),
            (Ee[d] = Z),
            l.push(Ee.x, Ee.y, Ee.z),
            (Ee[y] = 0),
            (Ee[v] = 0),
            (Ee[d] = A > 0 ? 1 : -1),
            h.push(Ee.x, Ee.y, Ee.z),
            p.push(ge / C),
            p.push(1 - Ue / F),
            (me += 1));
        }
      }
      for (let Ue = 0; Ue < F; Ue++)
        for (let pe = 0; pe < C; pe++) {
          let ge = u + pe + ie * Ue,
            Re = u + pe + ie * (Ue + 1),
            Ae = u + (pe + 1) + ie * (Ue + 1),
            U = u + (pe + 1) + ie * Ue;
          (c.push(ge, Re, U), c.push(Re, Ae, U), (ve += 6));
        }
      (o.addGroup(f, ve, N), (f += ve), (u += me));
    }
    (g("z", "y", "x", -1, -1, i, t, e, a, s, 0),
      g("z", "y", "x", 1, -1, i, t, -e, a, s, 1),
      g("x", "z", "y", 1, 1, e, i, t, r, a, 2),
      g("x", "z", "y", 1, -1, e, i, -t, r, a, 3),
      g("x", "y", "z", 1, -1, e, t, i, r, s, 4),
      g("x", "y", "z", -1, -1, e, t, -i, r, s, 5),
      this.setIndex(c),
      this.setAttribute("position", new Float32BufferAttribute(l, 3)),
      this.setAttribute("normal", new Float32BufferAttribute(h, 3)),
      this.setAttribute("uv", new Float32BufferAttribute(p, 2)));
  }
  copy(e) {
    return (super.copy(e), (this.parameters = Object.assign({}, e.parameters)), this);
  }
  static fromJSON(e) {
    return new n(e.width, e.height, e.depth, e.widthSegments, e.heightSegments, e.depthSegments);
  }
};
function ys(n) {
  let e = {};
  for (let t in n) {
    e[t] = {};
    for (let i in n[t]) {
      let r = n[t][i];
      r &&
      (r.isColor ||
        r.isMatrix3 ||
        r.isMatrix4 ||
        r.isVector2 ||
        r.isVector3 ||
        r.isVector4 ||
        r.isTexture ||
        r.isQuaternion)
        ? r.isRenderTargetTexture
          ? (console.warn(
              "UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().",
            ),
            (e[t][i] = null))
          : (e[t][i] = r.clone())
        : Array.isArray(r)
          ? (e[t][i] = r.slice())
          : (e[t][i] = r);
    }
  }
  return e;
}
function Ei(n) {
  let e = {};
  for (let t = 0; t < n.length; t++) {
    let i = ys(n[t]);
    for (let r in i) e[r] = i[r];
  }
  return e;
}
function Pp(n) {
  let e = n.getRenderTarget();
  return e === null ? n.outputColorSpace : e.isXRRenderTarget === !0 ? e.texture.colorSpace : Mt.workingColorSpace;
}
var X0 = {
    clone: ys,
    merge: Ei,
  },
  ShaderMaterial = class extends Material {
    constructor(e) {
      (super(),
        (this.isShaderMaterial = !0),
        (this.type = "ShaderMaterial"),
        (this.defines = {}),
        (this.uniforms = {}),
        (this.uniformsGroups = []),
        (this.vertexShader = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`),
        (this.fragmentShader = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`),
        (this.linewidth = 1),
        (this.wireframe = !1),
        (this.wireframeLinewidth = 1),
        (this.fog = !1),
        (this.lights = !1),
        (this.clipping = !1),
        (this.forceSinglePass = !0),
        (this.extensions = {
          clipCullDistance: !1,
          multiDraw: !1,
        }),
        (this.defaultAttributeValues = {
          color: [1, 1, 1],
          uv: [0, 0],
          uv1: [0, 0],
        }),
        (this.index0AttributeName = void 0),
        (this.uniformsNeedUpdate = !1),
        (this.glslVersion = null),
        e !== void 0 && this.setValues(e));
    }
    copy(e) {
      return (
        super.copy(e),
        (this.fragmentShader = e.fragmentShader),
        (this.vertexShader = e.vertexShader),
        (this.uniforms = ys(e.uniforms)),
        (this.uniformsGroups = (function (t) {
          let i = [];
          for (let r = 0; r < t.length; r++) i.push(t[r].clone());
          return i;
        })(e.uniformsGroups)),
        (this.defines = Object.assign({}, e.defines)),
        (this.wireframe = e.wireframe),
        (this.wireframeLinewidth = e.wireframeLinewidth),
        (this.fog = e.fog),
        (this.lights = e.lights),
        (this.clipping = e.clipping),
        (this.extensions = Object.assign({}, e.extensions)),
        (this.glslVersion = e.glslVersion),
        this
      );
    }
    toJSON(e) {
      let t = super.toJSON(e);
      ((t.glslVersion = this.glslVersion), (t.uniforms = {}));
      for (let r in this.uniforms) {
        let s = this.uniforms[r].value;
        s && s.isTexture
          ? (t.uniforms[r] = {
              type: "t",
              value: s.toJSON(e).uuid,
            })
          : s && s.isColor
            ? (t.uniforms[r] = {
                type: "c",
                value: s.getHex(),
              })
            : s && s.isVector2
              ? (t.uniforms[r] = {
                  type: "v2",
                  value: s.toArray(),
                })
              : s && s.isVector3
                ? (t.uniforms[r] = {
                    type: "v3",
                    value: s.toArray(),
                  })
                : s && s.isVector4
                  ? (t.uniforms[r] = {
                      type: "v4",
                      value: s.toArray(),
                    })
                  : s && s.isMatrix3
                    ? (t.uniforms[r] = {
                        type: "m3",
                        value: s.toArray(),
                      })
                    : s && s.isMatrix4
                      ? (t.uniforms[r] = {
                          type: "m4",
                          value: s.toArray(),
                        })
                      : (t.uniforms[r] = {
                          value: s,
                        });
      }
      (Object.keys(this.defines).length > 0 && (t.defines = this.defines),
        (t.vertexShader = this.vertexShader),
        (t.fragmentShader = this.fragmentShader),
        (t.lights = this.lights),
        (t.clipping = this.clipping));
      let i = {};
      for (let r in this.extensions) this.extensions[r] === !0 && (i[r] = !0);
      return (Object.keys(i).length > 0 && (t.extensions = i), t);
    }
  },
  Camera = class extends Object3D {
    constructor() {
      (super(),
        (this.isCamera = !0),
        (this.type = "Camera"),
        (this.matrixWorldInverse = new Matrix4()),
        (this.projectionMatrix = new Matrix4()),
        (this.projectionMatrixInverse = new Matrix4()),
        (this.coordinateSystem = WebGLCoordinateSystem));
    }
    copy(e, t) {
      return (
        super.copy(e, t),
        this.matrixWorldInverse.copy(e.matrixWorldInverse),
        this.projectionMatrix.copy(e.projectionMatrix),
        this.projectionMatrixInverse.copy(e.projectionMatrixInverse),
        (this.coordinateSystem = e.coordinateSystem),
        this
      );
    }
    getWorldDirection(e) {
      return super.getWorldDirection(e).negate();
    }
    updateMatrixWorld(e) {
      (super.updateMatrixWorld(e), this.matrixWorldInverse.copy(this.matrixWorld).invert());
    }
    updateWorldMatrix(e, t) {
      (super.updateWorldMatrix(e, t), this.matrixWorldInverse.copy(this.matrixWorld).invert());
    }
    clone() {
      return new this.constructor().copy(this);
    }
  },
  Qn = new Vector3(),
  Rd = new Vector2(),
  Pd = new Vector2(),
  PerspectiveCamera = class extends Camera {
    constructor(e = 50, t = 1, i = 0.1, r = 2e3) {
      (super(),
        (this.isPerspectiveCamera = !0),
        (this.type = "PerspectiveCamera"),
        (this.fov = e),
        (this.zoom = 1),
        (this.near = i),
        (this.far = r),
        (this.focus = 10),
        (this.aspect = t),
        (this.view = null),
        (this.filmGauge = 35),
        (this.filmOffset = 0),
        this.updateProjectionMatrix());
    }
    copy(e, t) {
      return (
        super.copy(e, t),
        (this.fov = e.fov),
        (this.zoom = e.zoom),
        (this.near = e.near),
        (this.far = e.far),
        (this.focus = e.focus),
        (this.aspect = e.aspect),
        (this.view = e.view === null ? null : Object.assign({}, e.view)),
        (this.filmGauge = e.filmGauge),
        (this.filmOffset = e.filmOffset),
        this
      );
    }
    setFocalLength(e) {
      let t = (0.5 * this.getFilmHeight()) / e;
      ((this.fov = 2 * uh * Math.atan(t)), this.updateProjectionMatrix());
    }
    getFocalLength() {
      let e = Math.tan(0.5 * No * this.fov);
      return (0.5 * this.getFilmHeight()) / e;
    }
    getEffectiveFOV() {
      return 2 * uh * Math.atan(Math.tan(0.5 * No * this.fov) / this.zoom);
    }
    getFilmWidth() {
      return this.filmGauge * Math.min(this.aspect, 1);
    }
    getFilmHeight() {
      return this.filmGauge / Math.max(this.aspect, 1);
    }
    getViewBounds(e, t, i) {
      (Qn.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse),
        t.set(Qn.x, Qn.y).multiplyScalar(-e / Qn.z),
        Qn.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse),
        i.set(Qn.x, Qn.y).multiplyScalar(-e / Qn.z));
    }
    getViewSize(e, t) {
      return (this.getViewBounds(e, Rd, Pd), t.subVectors(Pd, Rd));
    }
    setViewOffset(e, t, i, r, s, a) {
      ((this.aspect = e / t),
        this.view === null &&
          (this.view = {
            enabled: !0,
            fullWidth: 1,
            fullHeight: 1,
            offsetX: 0,
            offsetY: 0,
            width: 1,
            height: 1,
          }),
        (this.view.enabled = !0),
        (this.view.fullWidth = e),
        (this.view.fullHeight = t),
        (this.view.offsetX = i),
        (this.view.offsetY = r),
        (this.view.width = s),
        (this.view.height = a),
        this.updateProjectionMatrix());
    }
    clearViewOffset() {
      (this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix());
    }
    updateProjectionMatrix() {
      let e = this.near,
        t = (e * Math.tan(0.5 * No * this.fov)) / this.zoom,
        i = 2 * t,
        r = this.aspect * i,
        s = -0.5 * r,
        a = this.view;
      if (this.view !== null && this.view.enabled) {
        let c = a.fullWidth,
          l = a.fullHeight;
        ((s += (a.offsetX * r) / c), (t -= (a.offsetY * i) / l), (r *= a.width / c), (i *= a.height / l));
      }
      let o = this.filmOffset;
      (o !== 0 && (s += (e * o) / this.getFilmWidth()),
        this.projectionMatrix.makePerspective(s, s + r, t, t - i, e, this.far, this.coordinateSystem),
        this.projectionMatrixInverse.copy(this.projectionMatrix).invert());
    }
    toJSON(e) {
      let t = super.toJSON(e);
      return (
        (t.object.fov = this.fov),
        (t.object.zoom = this.zoom),
        (t.object.near = this.near),
        (t.object.far = this.far),
        (t.object.focus = this.focus),
        (t.object.aspect = this.aspect),
        this.view !== null && (t.object.view = Object.assign({}, this.view)),
        (t.object.filmGauge = this.filmGauge),
        (t.object.filmOffset = this.filmOffset),
        t
      );
    }
  },
  as = -90,
  CubeCamera = class extends Object3D {
    constructor(e, t, i) {
      (super(),
        (this.type = "CubeCamera"),
        (this.renderTarget = i),
        (this.coordinateSystem = null),
        (this.activeMipmapLevel = 0));
      let r = new PerspectiveCamera(as, 1, e, t);
      ((r.layers = this.layers), this.add(r));
      let s = new PerspectiveCamera(as, 1, e, t);
      ((s.layers = this.layers), this.add(s));
      let a = new PerspectiveCamera(as, 1, e, t);
      ((a.layers = this.layers), this.add(a));
      let o = new PerspectiveCamera(as, 1, e, t);
      ((o.layers = this.layers), this.add(o));
      let c = new PerspectiveCamera(as, 1, e, t);
      ((c.layers = this.layers), this.add(c));
      let l = new PerspectiveCamera(as, 1, e, t);
      ((l.layers = this.layers), this.add(l));
    }
    updateCoordinateSystem() {
      let e = this.coordinateSystem,
        t = this.children.concat(),
        [i, r, s, a, o, c] = t;
      for (let l of t) this.remove(l);
      if (e === WebGLCoordinateSystem)
        (i.up.set(0, 1, 0),
          i.lookAt(1, 0, 0),
          r.up.set(0, 1, 0),
          r.lookAt(-1, 0, 0),
          s.up.set(0, 0, -1),
          s.lookAt(0, 1, 0),
          a.up.set(0, 0, 1),
          a.lookAt(0, -1, 0),
          o.up.set(0, 1, 0),
          o.lookAt(0, 0, 1),
          c.up.set(0, 1, 0),
          c.lookAt(0, 0, -1));
      else {
        if (e !== WebGPUCoordinateSystem)
          throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + e);
        (i.up.set(0, -1, 0),
          i.lookAt(-1, 0, 0),
          r.up.set(0, -1, 0),
          r.lookAt(1, 0, 0),
          s.up.set(0, 0, 1),
          s.lookAt(0, 1, 0),
          a.up.set(0, 0, -1),
          a.lookAt(0, -1, 0),
          o.up.set(0, -1, 0),
          o.lookAt(0, 0, 1),
          c.up.set(0, -1, 0),
          c.lookAt(0, 0, -1));
      }
      for (let l of t) (this.add(l), l.updateMatrixWorld());
    }
    update(e, t) {
      this.parent === null && this.updateMatrixWorld();
      let { renderTarget: i, activeMipmapLevel: r } = this;
      this.coordinateSystem !== e.coordinateSystem &&
        ((this.coordinateSystem = e.coordinateSystem), this.updateCoordinateSystem());
      let [s, a, o, c, l, h] = this.children,
        p = e.getRenderTarget(),
        u = e.getActiveCubeFace(),
        f = e.getActiveMipmapLevel(),
        g = e.xr.enabled;
      e.xr.enabled = !1;
      let y = i.texture.generateMipmaps;
      ((i.texture.generateMipmaps = !1),
        e.setRenderTarget(i, 0, r),
        e.render(t, s),
        e.setRenderTarget(i, 1, r),
        e.render(t, a),
        e.setRenderTarget(i, 2, r),
        e.render(t, o),
        e.setRenderTarget(i, 3, r),
        e.render(t, c),
        e.setRenderTarget(i, 4, r),
        e.render(t, l),
        (i.texture.generateMipmaps = y),
        e.setRenderTarget(i, 5, r),
        e.render(t, h),
        e.setRenderTarget(p, u, f),
        (e.xr.enabled = g),
        (i.texture.needsPMREMUpdate = !0));
    }
  },
  CubeTexture = class extends Texture {
    constructor(e, t, i, r, s, a, o, c, l, h) {
      (super((e = e !== void 0 ? e : []), (t = t !== void 0 ? t : CubeReflectionMapping), i, r, s, a, o, c, l, h),
        (this.isCubeTexture = !0),
        (this.flipY = !1));
    }
    get images() {
      return this.image;
    }
    set images(e) {
      this.image = e;
    }
  },
  WebGLCubeRenderTarget = class extends WebGLRenderTarget {
    constructor(e = 1, t = {}) {
      (super(e, e, t), (this.isWebGLCubeRenderTarget = !0));
      let i = {
          width: e,
          height: e,
          depth: 1,
        },
        r = [i, i, i, i, i, i];
      ((this.texture = new CubeTexture(
        r,
        t.mapping,
        t.wrapS,
        t.wrapT,
        t.magFilter,
        t.minFilter,
        t.format,
        t.type,
        t.anisotropy,
        t.colorSpace,
      )),
        (this.texture.isRenderTargetTexture = !0),
        (this.texture.generateMipmaps = t.generateMipmaps !== void 0 && t.generateMipmaps),
        (this.texture.minFilter = t.minFilter !== void 0 ? t.minFilter : LinearFilter));
    }
    fromEquirectangularTexture(e, t) {
      ((this.texture.type = t.type),
        (this.texture.colorSpace = t.colorSpace),
        (this.texture.generateMipmaps = t.generateMipmaps),
        (this.texture.minFilter = t.minFilter),
        (this.texture.magFilter = t.magFilter));
      let i = {
          uniforms: {
            tEquirect: {
              value: null,
            },
          },
          vertexShader: `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,
          fragmentShader: `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`,
        },
        r = new BoxGeometry(5, 5, 5),
        s = new ShaderMaterial({
          name: "CubemapFromEquirect",
          uniforms: ys(i.uniforms),
          vertexShader: i.vertexShader,
          fragmentShader: i.fragmentShader,
          side: ai,
          blending: 0,
        });
      s.uniforms.tEquirect.value = t;
      let a = new Mesh(r, s),
        o = t.minFilter;
      return (
        t.minFilter === Ar && (t.minFilter = LinearFilter),
        new CubeCamera(1, 10, this).update(e, a),
        (t.minFilter = o),
        a.geometry.dispose(),
        a.material.dispose(),
        this
      );
    }
    clear(e, t, i, r) {
      let s = e.getRenderTarget();
      for (let a = 0; a < 6; a++) (e.setRenderTarget(this, a), e.clear(t, i, r));
      e.setRenderTarget(s);
    }
  },
  yc = new Vector3(),
  j0 = new Vector3(),
  q0 = new Matrix3(),
  Plane = class {
    constructor(e = new Vector3(1, 0, 0), t = 0) {
      ((this.isPlane = !0), (this.normal = e), (this.constant = t));
    }
    set(e, t) {
      return (this.normal.copy(e), (this.constant = t), this);
    }
    setComponents(e, t, i, r) {
      return (this.normal.set(e, t, i), (this.constant = r), this);
    }
    setFromNormalAndCoplanarPoint(e, t) {
      return (this.normal.copy(e), (this.constant = -t.dot(this.normal)), this);
    }
    setFromCoplanarPoints(e, t, i) {
      let r = yc.subVectors(i, t).cross(j0.subVectors(e, t)).normalize();
      return (this.setFromNormalAndCoplanarPoint(r, e), this);
    }
    copy(e) {
      return (this.normal.copy(e.normal), (this.constant = e.constant), this);
    }
    normalize() {
      let e = 1 / this.normal.length();
      return (this.normal.multiplyScalar(e), (this.constant *= e), this);
    }
    negate() {
      return ((this.constant *= -1), this.normal.negate(), this);
    }
    distanceToPoint(e) {
      return this.normal.dot(e) + this.constant;
    }
    distanceToSphere(e) {
      return this.distanceToPoint(e.center) - e.radius;
    }
    projectPoint(e, t) {
      return t.copy(e).addScaledVector(this.normal, -this.distanceToPoint(e));
    }
    intersectLine(e, t) {
      let i = e.delta(yc),
        r = this.normal.dot(i);
      if (r === 0) return this.distanceToPoint(e.start) === 0 ? t.copy(e.start) : null;
      let s = -(e.start.dot(this.normal) + this.constant) / r;
      return s < 0 || s > 1 ? null : t.copy(e.start).addScaledVector(i, s);
    }
    intersectsLine(e) {
      let t = this.distanceToPoint(e.start),
        i = this.distanceToPoint(e.end);
      return (t < 0 && i > 0) || (i < 0 && t > 0);
    }
    intersectsBox(e) {
      return e.intersectsPlane(this);
    }
    intersectsSphere(e) {
      return e.intersectsPlane(this);
    }
    coplanarPoint(e) {
      return e.copy(this.normal).multiplyScalar(-this.constant);
    }
    applyMatrix4(e, t) {
      let i = t || q0.getNormalMatrix(e),
        r = this.coplanarPoint(yc).applyMatrix4(e),
        s = this.normal.applyMatrix3(i).normalize();
      return ((this.constant = -r.dot(s)), this);
    }
    translate(e) {
      return ((this.constant -= e.dot(this.normal)), this);
    }
    equals(e) {
      return e.normal.equals(this.normal) && e.constant === this.constant;
    }
    clone() {
      return new this.constructor().copy(this);
    }
  },
  _r = new Sphere(),
  fo = new Vector3(),
  _s = class {
    constructor(
      e = new Plane(),
      t = new Plane(),
      i = new Plane(),
      r = new Plane(),
      s = new Plane(),
      a = new Plane(),
    ) {
      this.planes = [e, t, i, r, s, a];
    }
    set(e, t, i, r, s, a) {
      let o = this.planes;
      return (o[0].copy(e), o[1].copy(t), o[2].copy(i), o[3].copy(r), o[4].copy(s), o[5].copy(a), this);
    }
    copy(e) {
      let t = this.planes;
      for (let i = 0; i < 6; i++) t[i].copy(e.planes[i]);
      return this;
    }
    setFromProjectionMatrix(e, t = 2e3) {
      let i = this.planes,
        r = e.elements,
        s = r[0],
        a = r[1],
        o = r[2],
        c = r[3],
        l = r[4],
        h = r[5],
        p = r[6],
        u = r[7],
        f = r[8],
        g = r[9],
        y = r[10],
        v = r[11],
        d = r[12],
        m = r[13],
        x = r[14],
        b = r[15];
      if (
        (i[0].setComponents(c - s, u - l, v - f, b - d).normalize(),
        i[1].setComponents(c + s, u + l, v + f, b + d).normalize(),
        i[2].setComponents(c + a, u + h, v + g, b + m).normalize(),
        i[3].setComponents(c - a, u - h, v - g, b - m).normalize(),
        i[4].setComponents(c - o, u - p, v - y, b - x).normalize(),
        t === WebGLCoordinateSystem)
      )
        i[5].setComponents(c + o, u + p, v + y, b + x).normalize();
      else {
        if (t !== WebGPUCoordinateSystem)
          throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + t);
        i[5].setComponents(o, p, y, x).normalize();
      }
      return this;
    }
    intersectsObject(e) {
      if (e.boundingSphere !== void 0)
        (e.boundingSphere === null && e.computeBoundingSphere(),
          _r.copy(e.boundingSphere).applyMatrix4(e.matrixWorld));
      else {
        let t = e.geometry;
        (t.boundingSphere === null && t.computeBoundingSphere(),
          _r.copy(t.boundingSphere).applyMatrix4(e.matrixWorld));
      }
      return this.intersectsSphere(_r);
    }
    intersectsSprite(e) {
      return (
        _r.center.set(0, 0, 0),
        (_r.radius = 0.7071067811865476),
        _r.applyMatrix4(e.matrixWorld),
        this.intersectsSphere(_r)
      );
    }
    intersectsSphere(e) {
      let t = this.planes,
        i = e.center,
        r = -e.radius;
      for (let s = 0; s < 6; s++) if (t[s].distanceToPoint(i) < r) return !1;
      return !0;
    }
    intersectsBox(e) {
      let t = this.planes;
      for (let i = 0; i < 6; i++) {
        let r = t[i];
        if (
          ((fo.x = r.normal.x > 0 ? e.max.x : e.min.x),
          (fo.y = r.normal.y > 0 ? e.max.y : e.min.y),
          (fo.z = r.normal.z > 0 ? e.max.z : e.min.z),
          r.distanceToPoint(fo) < 0)
        )
          return !1;
      }
      return !0;
    }
    containsPoint(e) {
      let t = this.planes;
      for (let i = 0; i < 6; i++) if (t[i].distanceToPoint(e) < 0) return !1;
      return !0;
    }
    clone() {
      return new this.constructor().copy(this);
    }
  };
function Lp() {
  let n = null,
    e = !1,
    t = null,
    i = null;
  function r(s, a) {
    (t(s, a), (i = n.requestAnimationFrame(r)));
  }
  return {
    start: function () {
      e !== !0 && t !== null && ((i = n.requestAnimationFrame(r)), (e = !0));
    },
    stop: function () {
      (n.cancelAnimationFrame(i), (e = !1));
    },
    setAnimationLoop: function (s) {
      t = s;
    },
    setContext: function (s) {
      n = s;
    },
  };
}
function Y0(n) {
  let e = new WeakMap();
  return {
    get: function (t) {
      return (t.isInterleavedBufferAttribute && (t = t.data), e.get(t));
    },
    remove: function (t) {
      t.isInterleavedBufferAttribute && (t = t.data);
      let i = e.get(t);
      i && (n.deleteBuffer(i.buffer), e.delete(t));
    },
    update: function (t, i) {
      if ((t.isInterleavedBufferAttribute && (t = t.data), t.isGLBufferAttribute)) {
        let s = e.get(t);
        return void (
          (!s || s.version < t.version) &&
          e.set(t, {
            buffer: t.buffer,
            type: t.type,
            bytesPerElement: t.elementSize,
            version: t.version,
          })
        );
      }
      let r = e.get(t);
      if (r === void 0)
        e.set(
          t,
          (function (s, a) {
            let o = s.array,
              c = s.usage,
              l = o.byteLength,
              h = n.createBuffer(),
              p;
            if ((n.bindBuffer(a, h), n.bufferData(a, o, c), s.onUploadCallback(), o instanceof Float32Array))
              p = n.FLOAT;
            else if (o instanceof Uint16Array) p = s.isFloat16BufferAttribute ? n.HALF_FLOAT : n.UNSIGNED_SHORT;
            else if (o instanceof Int16Array) p = n.SHORT;
            else if (o instanceof Uint32Array) p = n.UNSIGNED_INT;
            else if (o instanceof Int32Array) p = n.INT;
            else if (o instanceof Int8Array) p = n.BYTE;
            else if (o instanceof Uint8Array) p = n.UNSIGNED_BYTE;
            else {
              if (!(o instanceof Uint8ClampedArray))
                throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + o);
              p = n.UNSIGNED_BYTE;
            }
            return {
              buffer: h,
              type: p,
              bytesPerElement: o.BYTES_PER_ELEMENT,
              version: s.version,
              size: l,
            };
          })(t, i),
        );
      else if (r.version < t.version) {
        if (r.size !== t.array.byteLength)
          throw new Error(
            "THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.",
          );
        ((function (s, a, o) {
          let c = a.array,
            l = a.updateRanges;
          if ((n.bindBuffer(o, s), l.length === 0)) n.bufferSubData(o, 0, c);
          else {
            l.sort((p, u) => p.start - u.start);
            let h = 0;
            for (let p = 1; p < l.length; p++) {
              let u = l[h],
                f = l[p];
              f.start <= u.start + u.count + 1
                ? (u.count = Math.max(u.count, f.start + f.count - u.start))
                : (++h, (l[h] = f));
            }
            l.length = h + 1;
            for (let p = 0, u = l.length; p < u; p++) {
              let f = l[p];
              n.bufferSubData(o, f.start * c.BYTES_PER_ELEMENT, c, f.start, f.count);
            }
            a.clearUpdateRanges();
          }
          a.onUploadCallback();
        })(r.buffer, t, i),
          (r.version = t.version));
      }
    },
  };
}
var PlaneGeometry = class n extends BufferGeometry {
    constructor(e = 1, t = 1, i = 1, r = 1) {
      (super(),
        (this.type = "PlaneGeometry"),
        (this.parameters = {
          width: e,
          height: t,
          widthSegments: i,
          heightSegments: r,
        }));
      let s = e / 2,
        a = t / 2,
        o = Math.floor(i),
        c = Math.floor(r),
        l = o + 1,
        h = c + 1,
        p = e / o,
        u = t / c,
        f = [],
        g = [],
        y = [],
        v = [];
      for (let d = 0; d < h; d++) {
        let m = d * u - a;
        for (let x = 0; x < l; x++) {
          let b = x * p - s;
          (g.push(b, -m, 0), y.push(0, 0, 1), v.push(x / o), v.push(1 - d / c));
        }
      }
      for (let d = 0; d < c; d++)
        for (let m = 0; m < o; m++) {
          let x = m + l * d,
            b = m + l * (d + 1),
            w = m + 1 + l * (d + 1),
            A = m + 1 + l * d;
          (f.push(x, b, A), f.push(b, w, A));
        }
      (this.setIndex(f),
        this.setAttribute("position", new Float32BufferAttribute(g, 3)),
        this.setAttribute("normal", new Float32BufferAttribute(y, 3)),
        this.setAttribute("uv", new Float32BufferAttribute(v, 2)));
    }
    copy(e) {
      return (super.copy(e), (this.parameters = Object.assign({}, e.parameters)), this);
    }
    static fromJSON(e) {
      return new n(e.width, e.height, e.widthSegments, e.heightSegments);
    }
  },
  ot = {
    alphahash_fragment: `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,
    alphahash_pars_fragment: `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,
    alphamap_fragment: `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,
    alphamap_pars_fragment: `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,
    alphatest_fragment: `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,
    alphatest_pars_fragment: `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,
    aomap_fragment: `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,
    aomap_pars_fragment: `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,
    batching_pars_vertex: `#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,
    batching_vertex: `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,
    begin_vertex: `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,
    beginnormal_vertex: `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,
    bsdfs: `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,
    iridescence_fragment: `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,
    bumpmap_pars_fragment: `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,
    clipping_planes_fragment: `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,
    clipping_planes_pars_fragment: `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,
    clipping_planes_pars_vertex: `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,
    clipping_planes_vertex: `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,
    color_fragment: `#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,
    color_pars_fragment: `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,
    color_pars_vertex: `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,
    color_vertex: `#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,
    common: `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,
    cube_uv_reflection_fragment: `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,
    defaultnormal_vertex: `vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,
    displacementmap_pars_vertex: `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,
    displacementmap_vertex: `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,
    emissivemap_fragment: `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,
    emissivemap_pars_fragment: `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,
    colorspace_fragment: "gl_FragColor = linearToOutputTexel( gl_FragColor );",
    colorspace_pars_fragment: `
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,
    envmap_fragment: `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,
    envmap_common_pars_fragment: `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,
    envmap_pars_fragment: `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,
    envmap_pars_vertex: `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,
    envmap_physical_pars_fragment: `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,
    envmap_vertex: `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,
    fog_vertex: `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,
    fog_pars_vertex: `#ifdef USE_FOG
	varying float vFogDepth;
#endif`,
    fog_fragment: `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,
    fog_pars_fragment: `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,
    gradientmap_pars_fragment: `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,
    lightmap_pars_fragment: `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,
    lights_lambert_fragment: `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,
    lights_lambert_pars_fragment: `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,
    lights_pars_begin: `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,
    lights_toon_fragment: `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,
    lights_toon_pars_fragment: `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,
    lights_phong_fragment: `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,
    lights_phong_pars_fragment: `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,
    lights_physical_fragment: `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,
    lights_physical_pars_fragment: `struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
  float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
  float x2 = x * x;
  float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
  return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,
    lights_fragment_begin: `
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,
    lights_fragment_maps: `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,
    lights_fragment_end: `#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,
    logdepthbuf_fragment: `#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,
    logdepthbuf_pars_fragment: `#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,
    logdepthbuf_pars_vertex: `#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,
    logdepthbuf_vertex: `#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,
    map_fragment: `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,
    map_pars_fragment: `#ifdef USE_MAP
	uniform sampler2D map;
#endif`,
    map_particle_fragment: `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,
    map_particle_pars_fragment: `#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,
    metalnessmap_fragment: `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,
    metalnessmap_pars_fragment: `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,
    morphinstance_vertex: `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,
    morphcolor_vertex: `#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,
    morphnormal_vertex: `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,
    morphtarget_pars_vertex: `#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,
    morphtarget_vertex: `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,
    normal_fragment_begin: `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,
    normal_fragment_maps: `#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,
    normal_pars_fragment: `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,
    normal_pars_vertex: `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,
    normal_vertex: `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,
    normalmap_pars_fragment: `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,
    clearcoat_normal_fragment_begin: `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,
    clearcoat_normal_fragment_maps: `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,
    clearcoat_pars_fragment: `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,
    iridescence_pars_fragment: `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,
    opaque_fragment: `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,
    packing: `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,
    premultiplied_alpha_fragment: `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,
    project_vertex: `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,
    dithering_fragment: `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,
    dithering_pars_fragment: `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,
    roughnessmap_fragment: `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,
    roughnessmap_pars_fragment: `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,
    shadowmap_pars_fragment: `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,
    shadowmap_pars_vertex: `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,
    shadowmap_vertex: `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,
    shadowmask_pars_fragment: `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,
    skinbase_vertex: `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,
    skinning_pars_vertex: `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,
    skinning_vertex: `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,
    skinnormal_vertex: `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,
    specularmap_fragment: `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,
    specularmap_pars_fragment: `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,
    tonemapping_fragment: `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,
    tonemapping_pars_fragment: `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,
    transmission_fragment: `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,
    transmission_pars_fragment: `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,
    uv_pars_fragment: `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,
    uv_pars_vertex: `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,
    uv_vertex: `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,
    worldpos_vertex: `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,
    background_vert: `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,
    background_frag: `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
    backgroundCube_vert: `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,
    backgroundCube_frag: `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
    cube_vert: `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,
    cube_frag: `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
    depth_vert: `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,
    depth_frag: `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,
    distanceRGBA_vert: `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,
    distanceRGBA_frag: `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,
    equirect_vert: `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,
    equirect_frag: `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
    linedashed_vert: `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,
    linedashed_frag: `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,
    meshbasic_vert: `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,
    meshbasic_frag: `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
    meshlambert_vert: `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
    meshlambert_frag: `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
    meshmatcap_vert: `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,
    meshmatcap_frag: `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
    meshnormal_vert: `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,
    meshnormal_frag: `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,
    meshphong_vert: `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
    meshphong_frag: `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
    meshphysical_vert: `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,
    meshphysical_frag: `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
    meshtoon_vert: `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
    meshtoon_frag: `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
    points_vert: `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,
    points_frag: `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,
    shadow_vert: `#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
    shadow_frag: `uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,
    sprite_vert: `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,
    sprite_frag: `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,
  },
  Te = {
    common: {
      diffuse: {
        value: new Color(16777215),
      },
      opacity: {
        value: 1,
      },
      map: {
        value: null,
      },
      mapTransform: {
        value: new Matrix3(),
      },
      alphaMap: {
        value: null,
      },
      alphaMapTransform: {
        value: new Matrix3(),
      },
      alphaTest: {
        value: 0,
      },
    },
    specularmap: {
      specularMap: {
        value: null,
      },
      specularMapTransform: {
        value: new Matrix3(),
      },
    },
    envmap: {
      envMap: {
        value: null,
      },
      envMapRotation: {
        value: new Matrix3(),
      },
      flipEnvMap: {
        value: -1,
      },
      reflectivity: {
        value: 1,
      },
      ior: {
        value: 1.5,
      },
      refractionRatio: {
        value: 0.98,
      },
    },
    aomap: {
      aoMap: {
        value: null,
      },
      aoMapIntensity: {
        value: 1,
      },
      aoMapTransform: {
        value: new Matrix3(),
      },
    },
    lightmap: {
      lightMap: {
        value: null,
      },
      lightMapIntensity: {
        value: 1,
      },
      lightMapTransform: {
        value: new Matrix3(),
      },
    },
    bumpmap: {
      bumpMap: {
        value: null,
      },
      bumpMapTransform: {
        value: new Matrix3(),
      },
      bumpScale: {
        value: 1,
      },
    },
    normalmap: {
      normalMap: {
        value: null,
      },
      normalMapTransform: {
        value: new Matrix3(),
      },
      normalScale: {
        value: new Vector2(1, 1),
      },
    },
    displacementmap: {
      displacementMap: {
        value: null,
      },
      displacementMapTransform: {
        value: new Matrix3(),
      },
      displacementScale: {
        value: 1,
      },
      displacementBias: {
        value: 0,
      },
    },
    emissivemap: {
      emissiveMap: {
        value: null,
      },
      emissiveMapTransform: {
        value: new Matrix3(),
      },
    },
    metalnessmap: {
      metalnessMap: {
        value: null,
      },
      metalnessMapTransform: {
        value: new Matrix3(),
      },
    },
    roughnessmap: {
      roughnessMap: {
        value: null,
      },
      roughnessMapTransform: {
        value: new Matrix3(),
      },
    },
    gradientmap: {
      gradientMap: {
        value: null,
      },
    },
    fog: {
      fogDensity: {
        value: 25e-5,
      },
      fogNear: {
        value: 1,
      },
      fogFar: {
        value: 2e3,
      },
      fogColor: {
        value: new Color(16777215),
      },
    },
    lights: {
      ambientLightColor: {
        value: [],
      },
      lightProbe: {
        value: [],
      },
      directionalLights: {
        value: [],
        properties: {
          direction: {},
          color: {},
        },
      },
      directionalLightShadows: {
        value: [],
        properties: {
          shadowIntensity: 1,
          shadowBias: {},
          shadowNormalBias: {},
          shadowRadius: {},
          shadowMapSize: {},
        },
      },
      directionalShadowMap: {
        value: [],
      },
      directionalShadowMatrix: {
        value: [],
      },
      spotLights: {
        value: [],
        properties: {
          color: {},
          position: {},
          direction: {},
          distance: {},
          coneCos: {},
          penumbraCos: {},
          decay: {},
        },
      },
      spotLightShadows: {
        value: [],
        properties: {
          shadowIntensity: 1,
          shadowBias: {},
          shadowNormalBias: {},
          shadowRadius: {},
          shadowMapSize: {},
        },
      },
      spotLightMap: {
        value: [],
      },
      spotShadowMap: {
        value: [],
      },
      spotLightMatrix: {
        value: [],
      },
      pointLights: {
        value: [],
        properties: {
          color: {},
          position: {},
          decay: {},
          distance: {},
        },
      },
      pointLightShadows: {
        value: [],
        properties: {
          shadowIntensity: 1,
          shadowBias: {},
          shadowNormalBias: {},
          shadowRadius: {},
          shadowMapSize: {},
          shadowCameraNear: {},
          shadowCameraFar: {},
        },
      },
      pointShadowMap: {
        value: [],
      },
      pointShadowMatrix: {
        value: [],
      },
      hemisphereLights: {
        value: [],
        properties: {
          direction: {},
          skyColor: {},
          groundColor: {},
        },
      },
      rectAreaLights: {
        value: [],
        properties: {
          color: {},
          position: {},
          width: {},
          height: {},
        },
      },
      ltc_1: {
        value: null,
      },
      ltc_2: {
        value: null,
      },
    },
    points: {
      diffuse: {
        value: new Color(16777215),
      },
      opacity: {
        value: 1,
      },
      size: {
        value: 1,
      },
      scale: {
        value: 1,
      },
      map: {
        value: null,
      },
      alphaMap: {
        value: null,
      },
      alphaMapTransform: {
        value: new Matrix3(),
      },
      alphaTest: {
        value: 0,
      },
      uvTransform: {
        value: new Matrix3(),
      },
    },
    sprite: {
      diffuse: {
        value: new Color(16777215),
      },
      opacity: {
        value: 1,
      },
      center: {
        value: new Vector2(0.5, 0.5),
      },
      rotation: {
        value: 0,
      },
      map: {
        value: null,
      },
      mapTransform: {
        value: new Matrix3(),
      },
      alphaMap: {
        value: null,
      },
      alphaMapTransform: {
        value: new Matrix3(),
      },
      alphaTest: {
        value: 0,
      },
    },
  },
  vn = {
    basic: {
      uniforms: Ei([Te.common, Te.specularmap, Te.envmap, Te.aomap, Te.lightmap, Te.fog]),
      vertexShader: ot.meshbasic_vert,
      fragmentShader: ot.meshbasic_frag,
    },
    lambert: {
      uniforms: Ei([
        Te.common,
        Te.specularmap,
        Te.envmap,
        Te.aomap,
        Te.lightmap,
        Te.emissivemap,
        Te.bumpmap,
        Te.normalmap,
        Te.displacementmap,
        Te.fog,
        Te.lights,
        {
          emissive: {
            value: new Color(0),
          },
        },
      ]),
      vertexShader: ot.meshlambert_vert,
      fragmentShader: ot.meshlambert_frag,
    },
    phong: {
      uniforms: Ei([
        Te.common,
        Te.specularmap,
        Te.envmap,
        Te.aomap,
        Te.lightmap,
        Te.emissivemap,
        Te.bumpmap,
        Te.normalmap,
        Te.displacementmap,
        Te.fog,
        Te.lights,
        {
          emissive: {
            value: new Color(0),
          },
          specular: {
            value: new Color(1118481),
          },
          shininess: {
            value: 30,
          },
        },
      ]),
      vertexShader: ot.meshphong_vert,
      fragmentShader: ot.meshphong_frag,
    },
    standard: {
      uniforms: Ei([
        Te.common,
        Te.envmap,
        Te.aomap,
        Te.lightmap,
        Te.emissivemap,
        Te.bumpmap,
        Te.normalmap,
        Te.displacementmap,
        Te.roughnessmap,
        Te.metalnessmap,
        Te.fog,
        Te.lights,
        {
          emissive: {
            value: new Color(0),
          },
          roughness: {
            value: 1,
          },
          metalness: {
            value: 0,
          },
          envMapIntensity: {
            value: 1,
          },
        },
      ]),
      vertexShader: ot.meshphysical_vert,
      fragmentShader: ot.meshphysical_frag,
    },
    toon: {
      uniforms: Ei([
        Te.common,
        Te.aomap,
        Te.lightmap,
        Te.emissivemap,
        Te.bumpmap,
        Te.normalmap,
        Te.displacementmap,
        Te.gradientmap,
        Te.fog,
        Te.lights,
        {
          emissive: {
            value: new Color(0),
          },
        },
      ]),
      vertexShader: ot.meshtoon_vert,
      fragmentShader: ot.meshtoon_frag,
    },
    matcap: {
      uniforms: Ei([
        Te.common,
        Te.bumpmap,
        Te.normalmap,
        Te.displacementmap,
        Te.fog,
        {
          matcap: {
            value: null,
          },
        },
      ]),
      vertexShader: ot.meshmatcap_vert,
      fragmentShader: ot.meshmatcap_frag,
    },
    points: {
      uniforms: Ei([Te.points, Te.fog]),
      vertexShader: ot.points_vert,
      fragmentShader: ot.points_frag,
    },
    dashed: {
      uniforms: Ei([
        Te.common,
        Te.fog,
        {
          scale: {
            value: 1,
          },
          dashSize: {
            value: 1,
          },
          totalSize: {
            value: 2,
          },
        },
      ]),
      vertexShader: ot.linedashed_vert,
      fragmentShader: ot.linedashed_frag,
    },
    depth: {
      uniforms: Ei([Te.common, Te.displacementmap]),
      vertexShader: ot.depth_vert,
      fragmentShader: ot.depth_frag,
    },
    normal: {
      uniforms: Ei([
        Te.common,
        Te.bumpmap,
        Te.normalmap,
        Te.displacementmap,
        {
          opacity: {
            value: 1,
          },
        },
      ]),
      vertexShader: ot.meshnormal_vert,
      fragmentShader: ot.meshnormal_frag,
    },
    sprite: {
      uniforms: Ei([Te.sprite, Te.fog]),
      vertexShader: ot.sprite_vert,
      fragmentShader: ot.sprite_frag,
    },
    background: {
      uniforms: {
        uvTransform: {
          value: new Matrix3(),
        },
        t2D: {
          value: null,
        },
        backgroundIntensity: {
          value: 1,
        },
      },
      vertexShader: ot.background_vert,
      fragmentShader: ot.background_frag,
    },
    backgroundCube: {
      uniforms: {
        envMap: {
          value: null,
        },
        flipEnvMap: {
          value: -1,
        },
        backgroundBlurriness: {
          value: 0,
        },
        backgroundIntensity: {
          value: 1,
        },
        backgroundRotation: {
          value: new Matrix3(),
        },
      },
      vertexShader: ot.backgroundCube_vert,
      fragmentShader: ot.backgroundCube_frag,
    },
    cube: {
      uniforms: {
        tCube: {
          value: null,
        },
        tFlip: {
          value: -1,
        },
        opacity: {
          value: 1,
        },
      },
      vertexShader: ot.cube_vert,
      fragmentShader: ot.cube_frag,
    },
    equirect: {
      uniforms: {
        tEquirect: {
          value: null,
        },
      },
      vertexShader: ot.equirect_vert,
      fragmentShader: ot.equirect_frag,
    },
    distanceRGBA: {
      uniforms: Ei([
        Te.common,
        Te.displacementmap,
        {
          referencePosition: {
            value: new Vector3(),
          },
          nearDistance: {
            value: 1,
          },
          farDistance: {
            value: 1e3,
          },
        },
      ]),
      vertexShader: ot.distanceRGBA_vert,
      fragmentShader: ot.distanceRGBA_frag,
    },
    shadow: {
      uniforms: Ei([
        Te.lights,
        Te.fog,
        {
          color: {
            value: new Color(0),
          },
          opacity: {
            value: 1,
          },
        },
      ]),
      vertexShader: ot.shadow_vert,
      fragmentShader: ot.shadow_frag,
    },
  };
vn.physical = {
  uniforms: Ei([
    vn.standard.uniforms,
    {
      clearcoat: {
        value: 0,
      },
      clearcoatMap: {
        value: null,
      },
      clearcoatMapTransform: {
        value: new Matrix3(),
      },
      clearcoatNormalMap: {
        value: null,
      },
      clearcoatNormalMapTransform: {
        value: new Matrix3(),
      },
      clearcoatNormalScale: {
        value: new Vector2(1, 1),
      },
      clearcoatRoughness: {
        value: 0,
      },
      clearcoatRoughnessMap: {
        value: null,
      },
      clearcoatRoughnessMapTransform: {
        value: new Matrix3(),
      },
      dispersion: {
        value: 0,
      },
      iridescence: {
        value: 0,
      },
      iridescenceMap: {
        value: null,
      },
      iridescenceMapTransform: {
        value: new Matrix3(),
      },
      iridescenceIOR: {
        value: 1.3,
      },
      iridescenceThicknessMinimum: {
        value: 100,
      },
      iridescenceThicknessMaximum: {
        value: 400,
      },
      iridescenceThicknessMap: {
        value: null,
      },
      iridescenceThicknessMapTransform: {
        value: new Matrix3(),
      },
      sheen: {
        value: 0,
      },
      sheenColor: {
        value: new Color(0),
      },
      sheenColorMap: {
        value: null,
      },
      sheenColorMapTransform: {
        value: new Matrix3(),
      },
      sheenRoughness: {
        value: 1,
      },
      sheenRoughnessMap: {
        value: null,
      },
      sheenRoughnessMapTransform: {
        value: new Matrix3(),
      },
      transmission: {
        value: 0,
      },
      transmissionMap: {
        value: null,
      },
      transmissionMapTransform: {
        value: new Matrix3(),
      },
      transmissionSamplerSize: {
        value: new Vector2(),
      },
      transmissionSamplerMap: {
        value: null,
      },
      thickness: {
        value: 0,
      },
      thicknessMap: {
        value: null,
      },
      thicknessMapTransform: {
        value: new Matrix3(),
      },
      attenuationDistance: {
        value: 0,
      },
      attenuationColor: {
        value: new Color(0),
      },
      specularColor: {
        value: new Color(1, 1, 1),
      },
      specularColorMap: {
        value: null,
      },
      specularColorMapTransform: {
        value: new Matrix3(),
      },
      specularIntensity: {
        value: 1,
      },
      specularIntensityMap: {
        value: null,
      },
      specularIntensityMapTransform: {
        value: new Matrix3(),
      },
      anisotropyVector: {
        value: new Vector2(),
      },
      anisotropyMap: {
        value: null,
      },
      anisotropyMapTransform: {
        value: new Matrix3(),
      },
    },
  ]),
  vertexShader: ot.meshphysical_vert,
  fragmentShader: ot.meshphysical_frag,
};
var mo = {
    r: 0,
    b: 0,
    g: 0,
  },
  br = new Euler(),
  Z0 = new Matrix4();
function K0(n, e, t, i, r, s, a) {
  let o = new Color(0),
    c,
    l,
    h = s === !0 ? 0 : 1,
    p = null,
    u = 0,
    f = null;
  function g(v) {
    let d = v.isScene === !0 ? v.background : null;
    return (d && d.isTexture && (d = (v.backgroundBlurriness > 0 ? t : e).get(d)), d);
  }
  function y(v, d) {
    (v.getRGB(mo, Pp(n)), i.buffers.color.setClear(mo.r, mo.g, mo.b, d, a));
  }
  return {
    getClearColor: function () {
      return o;
    },
    setClearColor: function (v, d = 1) {
      (o.set(v), (h = d), y(o, h));
    },
    getClearAlpha: function () {
      return h;
    },
    setClearAlpha: function (v) {
      ((h = v), y(o, h));
    },
    render: function (v) {
      let d = !1,
        m = g(v);
      m === null ? y(o, h) : m && m.isColor && (y(m, 1), (d = !0));
      let x = n.xr.getEnvironmentBlendMode();
      (x === "additive"
        ? i.buffers.color.setClear(0, 0, 0, 1, a)
        : x === "alpha-blend" && i.buffers.color.setClear(0, 0, 0, 0, a),
        (n.autoClear || d) &&
          (i.buffers.depth.setTest(!0),
          i.buffers.depth.setMask(!0),
          i.buffers.color.setMask(!0),
          n.clear(n.autoClearColor, n.autoClearDepth, n.autoClearStencil)));
    },
    addToRenderList: function (v, d) {
      let m = g(d);
      m && (m.isCubeTexture || m.mapping === CubeUVReflectionMapping)
        ? (l === void 0 &&
            ((l = new Mesh(
              new BoxGeometry(1, 1, 1),
              new ShaderMaterial({
                name: "BackgroundCubeMaterial",
                uniforms: ys(vn.backgroundCube.uniforms),
                vertexShader: vn.backgroundCube.vertexShader,
                fragmentShader: vn.backgroundCube.fragmentShader,
                side: ai,
                depthTest: !1,
                depthWrite: !1,
                fog: !1,
              }),
            )),
            l.geometry.deleteAttribute("normal"),
            l.geometry.deleteAttribute("uv"),
            (l.onBeforeRender = function (x, b, w) {
              this.matrixWorld.copyPosition(w.matrixWorld);
            }),
            Object.defineProperty(l.material, "envMap", {
              get: function () {
                return this.uniforms.envMap.value;
              },
            }),
            r.update(l)),
          br.copy(d.backgroundRotation),
          (br.x *= -1),
          (br.y *= -1),
          (br.z *= -1),
          m.isCubeTexture && m.isRenderTargetTexture === !1 && ((br.y *= -1), (br.z *= -1)),
          (l.material.uniforms.envMap.value = m),
          (l.material.uniforms.flipEnvMap.value = m.isCubeTexture && m.isRenderTargetTexture === !1 ? -1 : 1),
          (l.material.uniforms.backgroundBlurriness.value = d.backgroundBlurriness),
          (l.material.uniforms.backgroundIntensity.value = d.backgroundIntensity),
          l.material.uniforms.backgroundRotation.value.setFromMatrix4(Z0.makeRotationFromEuler(br)),
          (l.material.toneMapped = Mt.getTransfer(m.colorSpace) !== Nt),
          (p === m && u === m.version && f === n.toneMapping) ||
            ((l.material.needsUpdate = !0), (p = m), (u = m.version), (f = n.toneMapping)),
          l.layers.enableAll(),
          v.unshift(l, l.geometry, l.material, 0, 0, null))
        : m &&
          m.isTexture &&
          (c === void 0 &&
            ((c = new Mesh(
              new PlaneGeometry(2, 2),
              new ShaderMaterial({
                name: "BackgroundMaterial",
                uniforms: ys(vn.background.uniforms),
                vertexShader: vn.background.vertexShader,
                fragmentShader: vn.background.fragmentShader,
                side: Ni,
                depthTest: !1,
                depthWrite: !1,
                fog: !1,
              }),
            )),
            c.geometry.deleteAttribute("normal"),
            Object.defineProperty(c.material, "map", {
              get: function () {
                return this.uniforms.t2D.value;
              },
            }),
            r.update(c)),
          (c.material.uniforms.t2D.value = m),
          (c.material.uniforms.backgroundIntensity.value = d.backgroundIntensity),
          (c.material.toneMapped = Mt.getTransfer(m.colorSpace) !== Nt),
          m.matrixAutoUpdate === !0 && m.updateMatrix(),
          c.material.uniforms.uvTransform.value.copy(m.matrix),
          (p === m && u === m.version && f === n.toneMapping) ||
            ((c.material.needsUpdate = !0), (p = m), (u = m.version), (f = n.toneMapping)),
          c.layers.enableAll(),
          v.unshift(c, c.geometry, c.material, 0, 0, null));
    },
  };
}
function J0(n, e) {
  let t = n.getParameter(n.MAX_VERTEX_ATTRIBS),
    i = {},
    r = l(null),
    s = r,
    a = !1;
  function o(d) {
    return n.bindVertexArray(d);
  }
  function c(d) {
    return n.deleteVertexArray(d);
  }
  function l(d) {
    let m = [],
      x = [],
      b = [];
    for (let w = 0; w < t; w++) ((m[w] = 0), (x[w] = 0), (b[w] = 0));
    return {
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: m,
      enabledAttributes: x,
      attributeDivisors: b,
      object: d,
      attributes: {},
      index: null,
    };
  }
  function h() {
    let d = s.newAttributes;
    for (let m = 0, x = d.length; m < x; m++) d[m] = 0;
  }
  function p(d) {
    u(d, 0);
  }
  function u(d, m) {
    let x = s.newAttributes,
      b = s.enabledAttributes,
      w = s.attributeDivisors;
    ((x[d] = 1),
      b[d] === 0 && (n.enableVertexAttribArray(d), (b[d] = 1)),
      w[d] !== m && (n.vertexAttribDivisor(d, m), (w[d] = m)));
  }
  function f() {
    let d = s.newAttributes,
      m = s.enabledAttributes;
    for (let x = 0, b = m.length; x < b; x++) m[x] !== d[x] && (n.disableVertexAttribArray(x), (m[x] = 0));
  }
  function g(d, m, x, b, w, A, C) {
    C === !0 ? n.vertexAttribIPointer(d, m, x, w, A) : n.vertexAttribPointer(d, m, x, b, w, A);
  }
  function y() {
    (v(), (a = !0), s !== r && ((s = r), o(s.object)));
  }
  function v() {
    ((r.geometry = null), (r.program = null), (r.wireframe = !1));
  }
  return {
    setup: function (d, m, x, b, w) {
      let A = !1,
        C = (function (F, N, G) {
          let W = G.wireframe === !0,
            B = i[F.id];
          B === void 0 && ((B = {}), (i[F.id] = B));
          let $ = B[N.id];
          $ === void 0 && (($ = {}), (B[N.id] = $));
          let Z = $[W];
          return (Z === void 0 && ((Z = l(n.createVertexArray())), ($[W] = Z)), Z);
        })(b, x, m);
      (s !== C && ((s = C), o(s.object)),
        (A = (function (F, N, G, W) {
          let B = s.attributes,
            $ = N.attributes,
            Z = 0,
            ie = G.getAttributes();
          for (let ae in ie)
            if (ie[ae].location >= 0) {
              let me = B[ae],
                ve = $[ae];
              if (
                (ve === void 0 &&
                  (ae === "instanceMatrix" && F.instanceMatrix && (ve = F.instanceMatrix),
                  ae === "instanceColor" && F.instanceColor && (ve = F.instanceColor)),
                me === void 0 || me.attribute !== ve || (ve && me.data !== ve.data))
              )
                return !0;
              Z++;
            }
          return s.attributesNum !== Z || s.index !== W;
        })(d, b, x, w)),
        A &&
          (function (F, N, G, W) {
            let B = {},
              $ = N.attributes,
              Z = 0,
              ie = G.getAttributes();
            for (let ae in ie)
              if (ie[ae].location >= 0) {
                let me = $[ae];
                me === void 0 &&
                  (ae === "instanceMatrix" && F.instanceMatrix && (me = F.instanceMatrix),
                  ae === "instanceColor" && F.instanceColor && (me = F.instanceColor));
                let ve = {};
                ((ve.attribute = me), me && me.data && (ve.data = me.data), (B[ae] = ve), Z++);
              }
            ((s.attributes = B), (s.attributesNum = Z), (s.index = W));
          })(d, b, x, w),
        w !== null && e.update(w, n.ELEMENT_ARRAY_BUFFER),
        (A || a) &&
          ((a = !1),
          (function (F, N, G, W) {
            h();
            let B = W.attributes,
              $ = G.getAttributes(),
              Z = N.defaultAttributeValues;
            for (let ie in $) {
              let ae = $[ie];
              if (ae.location >= 0) {
                let me = B[ie];
                if (
                  (me === void 0 &&
                    (ie === "instanceMatrix" && F.instanceMatrix && (me = F.instanceMatrix),
                    ie === "instanceColor" && F.instanceColor && (me = F.instanceColor)),
                  me !== void 0)
                ) {
                  let ve = me.normalized,
                    Ee = me.itemSize,
                    Ue = e.get(me);
                  if (Ue === void 0) continue;
                  let pe = Ue.buffer,
                    ge = Ue.type,
                    Re = Ue.bytesPerElement,
                    Ae = ge === n.INT || ge === n.UNSIGNED_INT || me.gpuType === IntType;
                  if (me.isInterleavedBufferAttribute) {
                    let U = me.data,
                      R = U.stride,
                      q = me.offset;
                    if (U.isInstancedInterleavedBuffer) {
                      for (let Q = 0; Q < ae.locationSize; Q++) u(ae.location + Q, U.meshPerAttribute);
                      F.isInstancedMesh !== !0 &&
                        W._maxInstanceCount === void 0 &&
                        (W._maxInstanceCount = U.meshPerAttribute * U.count);
                    } else for (let Q = 0; Q < ae.locationSize; Q++) p(ae.location + Q);
                    n.bindBuffer(n.ARRAY_BUFFER, pe);
                    for (let Q = 0; Q < ae.locationSize; Q++)
                      g(
                        ae.location + Q,
                        Ee / ae.locationSize,
                        ge,
                        ve,
                        R * Re,
                        (q + (Ee / ae.locationSize) * Q) * Re,
                        Ae,
                      );
                  } else {
                    if (me.isInstancedBufferAttribute) {
                      for (let U = 0; U < ae.locationSize; U++) u(ae.location + U, me.meshPerAttribute);
                      F.isInstancedMesh !== !0 &&
                        W._maxInstanceCount === void 0 &&
                        (W._maxInstanceCount = me.meshPerAttribute * me.count);
                    } else for (let U = 0; U < ae.locationSize; U++) p(ae.location + U);
                    n.bindBuffer(n.ARRAY_BUFFER, pe);
                    for (let U = 0; U < ae.locationSize; U++)
                      g(ae.location + U, Ee / ae.locationSize, ge, ve, Ee * Re, (Ee / ae.locationSize) * U * Re, Ae);
                  }
                } else if (Z !== void 0) {
                  let ve = Z[ie];
                  if (ve !== void 0)
                    switch (ve.length) {
                      case 2:
                        n.vertexAttrib2fv(ae.location, ve);
                        break;
                      case 3:
                        n.vertexAttrib3fv(ae.location, ve);
                        break;
                      case 4:
                        n.vertexAttrib4fv(ae.location, ve);
                        break;
                      default:
                        n.vertexAttrib1fv(ae.location, ve);
                    }
                }
              }
            }
            f();
          })(d, m, x, b),
          w !== null && n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, e.get(w).buffer)));
    },
    reset: y,
    resetDefaultState: v,
    dispose: function () {
      y();
      for (let d in i) {
        let m = i[d];
        for (let x in m) {
          let b = m[x];
          for (let w in b) (c(b[w].object), delete b[w]);
          delete m[x];
        }
        delete i[d];
      }
    },
    releaseStatesOfGeometry: function (d) {
      if (i[d.id] === void 0) return;
      let m = i[d.id];
      for (let x in m) {
        let b = m[x];
        for (let w in b) (c(b[w].object), delete b[w]);
        delete m[x];
      }
      delete i[d.id];
    },
    releaseStatesOfProgram: function (d) {
      for (let m in i) {
        let x = i[m];
        if (x[d.id] === void 0) continue;
        let b = x[d.id];
        for (let w in b) (c(b[w].object), delete b[w]);
        delete x[d.id];
      }
    },
    initAttributes: h,
    enableAttribute: p,
    disableUnusedAttributes: f,
  };
}
function $0(n, e, t) {
  let i;
  function r(s, a, o) {
    o !== 0 && (n.drawArraysInstanced(i, s, a, o), t.update(a, i, o));
  }
  ((this.setMode = function (s) {
    i = s;
  }),
    (this.render = function (s, a) {
      (n.drawArrays(i, s, a), t.update(a, i, 1));
    }),
    (this.renderInstances = r),
    (this.renderMultiDraw = function (s, a, o) {
      if (o === 0) return;
      e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i, s, 0, a, 0, o);
      let c = 0;
      for (let l = 0; l < o; l++) c += a[l];
      t.update(c, i, 1);
    }),
    (this.renderMultiDrawInstances = function (s, a, o, c) {
      if (o === 0) return;
      let l = e.get("WEBGL_multi_draw");
      if (l === null) for (let h = 0; h < s.length; h++) r(s[h], a[h], c[h]);
      else {
        l.multiDrawArraysInstancedWEBGL(i, s, 0, a, 0, c, 0, o);
        let h = 0;
        for (let p = 0; p < o; p++) h += a[p];
        for (let p = 0; p < c.length; p++) t.update(h, i, c[p]);
      }
    }));
}
function WebGL2(n, e, t, i) {
  let r;
  function s(u) {
    if (u === "highp") {
      if (
        n.getShaderPrecisionFormat(n.VERTEX_SHADER, n.HIGH_FLOAT).precision > 0 &&
        n.getShaderPrecisionFormat(n.FRAGMENT_SHADER, n.HIGH_FLOAT).precision > 0
      )
        return "highp";
      u = "mediump";
    }
    return u === "mediump" &&
      n.getShaderPrecisionFormat(n.VERTEX_SHADER, n.MEDIUM_FLOAT).precision > 0 &&
      n.getShaderPrecisionFormat(n.FRAGMENT_SHADER, n.MEDIUM_FLOAT).precision > 0
      ? "mediump"
      : "lowp";
  }
  let a = t.precision !== void 0 ? t.precision : "highp",
    o = s(a);
  o !== a && (console.warn("THREE.WebGLRenderer:", a, "not supported, using", o, "instead."), (a = o));
  let c = t.logarithmicDepthBuffer === !0,
    l = t.reverseDepthBuffer === !0 && e.has("EXT_clip_control");
  if (l === !0) {
    let u = e.get("EXT_clip_control");
    u.clipControlEXT(u.LOWER_LEFT_EXT, u.ZERO_TO_ONE_EXT);
  }
  let h = n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),
    p = n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
  return {
    isWebGL2: !0,
    getMaxAnisotropy: function () {
      if (r !== void 0) return r;
      if (e.has("EXT_texture_filter_anisotropic") === !0) {
        let u = e.get("EXT_texture_filter_anisotropic");
        r = n.getParameter(u.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
      } else r = 0;
      return r;
    },
    getMaxPrecision: s,
    textureFormatReadable: function (u) {
      return u === RGBAFormat || i.convert(u) === n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT);
    },
    textureTypeReadable: function (u) {
      let f = u === HalfFloatType && (e.has("EXT_color_buffer_half_float") || e.has("EXT_color_buffer_float"));
      return !(
        u !== UnsignedByteType &&
        i.convert(u) !== n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE) &&
        u !== FloatType &&
        !f
      );
    },
    precision: a,
    logarithmicDepthBuffer: c,
    reverseDepthBuffer: l,
    maxTextures: h,
    maxVertexTextures: p,
    maxTextureSize: n.getParameter(n.MAX_TEXTURE_SIZE),
    maxCubemapSize: n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),
    maxAttributes: n.getParameter(n.MAX_VERTEX_ATTRIBS),
    maxVertexUniforms: n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),
    maxVaryings: n.getParameter(n.MAX_VARYING_VECTORS),
    maxFragmentUniforms: n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),
    vertexTextures: p > 0,
    maxSamples: n.getParameter(n.MAX_SAMPLES),
  };
}
function em(n) {
  let e = this,
    t = null,
    i = 0,
    r = !1,
    s = !1,
    a = new Plane(),
    o = new Matrix3(),
    c = {
      value: null,
      needsUpdate: !1,
    };
  function l(h, p, u, f) {
    let g = h !== null ? h.length : 0,
      y = null;
    if (g !== 0) {
      if (((y = c.value), f !== !0 || y === null)) {
        let v = u + 4 * g,
          d = p.matrixWorldInverse;
        (o.getNormalMatrix(d), (y === null || y.length < v) && (y = new Float32Array(v)));
        for (let m = 0, x = u; m !== g; ++m, x += 4)
          (a.copy(h[m]).applyMatrix4(d, o), a.normal.toArray(y, x), (y[x + 3] = a.constant));
      }
      ((c.value = y), (c.needsUpdate = !0));
    }
    return ((e.numPlanes = g), (e.numIntersection = 0), y);
  }
  ((this.uniform = c),
    (this.numPlanes = 0),
    (this.numIntersection = 0),
    (this.init = function (h, p) {
      let u = h.length !== 0 || p || i !== 0 || r;
      return ((r = p), (i = h.length), u);
    }),
    (this.beginShadows = function () {
      ((s = !0), l(null));
    }),
    (this.endShadows = function () {
      s = !1;
    }),
    (this.setGlobalState = function (h, p) {
      t = l(h, p, 0);
    }),
    (this.setState = function (h, p, u) {
      let f = h.clippingPlanes,
        g = h.clipIntersection,
        y = h.clipShadows,
        v = n.get(h);
      if (!r || f === null || f.length === 0 || (s && !y))
        s
          ? l(null)
          : (function () {
              (c.value !== t && ((c.value = t), (c.needsUpdate = i > 0)), (e.numPlanes = i), (e.numIntersection = 0));
            })();
      else {
        let d = s ? 0 : i,
          m = 4 * d,
          x = v.clippingState || null;
        ((c.value = x), (x = l(f, p, m, u)));
        for (let b = 0; b !== m; ++b) x[b] = t[b];
        ((v.clippingState = x), (this.numIntersection = g ? this.numPlanes : 0), (this.numPlanes += d));
      }
    }));
}
function tm(n) {
  let e = new WeakMap();
  function t(r, s) {
    return (
      s === EquirectangularReflectionMapping
        ? (r.mapping = CubeReflectionMapping)
        : s === EquirectangularRefractionMapping && (r.mapping = CubeRefractionMapping),
      r
    );
  }
  function i(r) {
    let s = r.target;
    s.removeEventListener("dispose", i);
    let a = e.get(s);
    a !== void 0 && (e.delete(s), a.dispose());
  }
  return {
    get: function (r) {
      if (r && r.isTexture) {
        let s = r.mapping;
        if (s === EquirectangularReflectionMapping || s === EquirectangularRefractionMapping) {
          if (e.has(r)) return t(e.get(r).texture, r.mapping);
          {
            let a = r.image;
            if (a && a.height > 0) {
              let o = new WebGLCubeRenderTarget(a.height);
              return (
                o.fromEquirectangularTexture(n, r),
                e.set(r, o),
                r.addEventListener("dispose", i),
                t(o.texture, r.mapping)
              );
            }
            return null;
          }
        }
      }
      return r;
    },
    dispose: function () {
      e = new WeakMap();
    },
  };
}
var OrthographicCamera = class extends Camera {
    constructor(e = -1, t = 1, i = 1, r = -1, s = 0.1, a = 2e3) {
      (super(),
        (this.isOrthographicCamera = !0),
        (this.type = "OrthographicCamera"),
        (this.zoom = 1),
        (this.view = null),
        (this.left = e),
        (this.right = t),
        (this.top = i),
        (this.bottom = r),
        (this.near = s),
        (this.far = a),
        this.updateProjectionMatrix());
    }
    copy(e, t) {
      return (
        super.copy(e, t),
        (this.left = e.left),
        (this.right = e.right),
        (this.top = e.top),
        (this.bottom = e.bottom),
        (this.near = e.near),
        (this.far = e.far),
        (this.zoom = e.zoom),
        (this.view = e.view === null ? null : Object.assign({}, e.view)),
        this
      );
    }
    setViewOffset(e, t, i, r, s, a) {
      (this.view === null &&
        (this.view = {
          enabled: !0,
          fullWidth: 1,
          fullHeight: 1,
          offsetX: 0,
          offsetY: 0,
          width: 1,
          height: 1,
        }),
        (this.view.enabled = !0),
        (this.view.fullWidth = e),
        (this.view.fullHeight = t),
        (this.view.offsetX = i),
        (this.view.offsetY = r),
        (this.view.width = s),
        (this.view.height = a),
        this.updateProjectionMatrix());
    }
    clearViewOffset() {
      (this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix());
    }
    updateProjectionMatrix() {
      let e = (this.right - this.left) / (2 * this.zoom),
        t = (this.top - this.bottom) / (2 * this.zoom),
        i = (this.right + this.left) / 2,
        r = (this.top + this.bottom) / 2,
        s = i - e,
        a = i + e,
        o = r + t,
        c = r - t;
      if (this.view !== null && this.view.enabled) {
        let l = (this.right - this.left) / this.view.fullWidth / this.zoom,
          h = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
        ((s += l * this.view.offsetX),
          (a = s + l * this.view.width),
          (o -= h * this.view.offsetY),
          (c = o - h * this.view.height));
      }
      (this.projectionMatrix.makeOrthographic(s, a, o, c, this.near, this.far, this.coordinateSystem),
        this.projectionMatrixInverse.copy(this.projectionMatrix).invert());
    }
    toJSON(e) {
      let t = super.toJSON(e);
      return (
        (t.object.zoom = this.zoom),
        (t.object.left = this.left),
        (t.object.right = this.right),
        (t.object.top = this.top),
        (t.object.bottom = this.bottom),
        (t.object.near = this.near),
        (t.object.far = this.far),
        this.view !== null && (t.object.view = Object.assign({}, this.view)),
        t
      );
    }
  },
  Ld = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582],
  na = 20,
  _c = new OrthographicCamera(),
  Id = new Color(),
  bc = null,
  Mc = 0,
  Sc = 0,
  wc = !1,
  Sr = (1 + Math.sqrt(5)) / 2,
  os = 1 / Sr,
  Dd = [
    new Vector3(-Sr, os, 0),
    new Vector3(Sr, os, 0),
    new Vector3(-os, 0, Sr),
    new Vector3(os, 0, Sr),
    new Vector3(0, Sr, -os),
    new Vector3(0, Sr, os),
    new Vector3(-1, 1, -1),
    new Vector3(1, 1, -1),
    new Vector3(-1, 1, 1),
    new Vector3(1, 1, 1),
  ],
  PMREMGenerator = class {
    constructor(e) {
      ((this._renderer = e),
        (this._pingPongRenderTarget = null),
        (this._lodMax = 0),
        (this._cubeSize = 0),
        (this._lodPlanes = []),
        (this._sizeLods = []),
        (this._sigmas = []),
        (this._blurMaterial = null),
        (this._cubemapMaterial = null),
        (this._equirectMaterial = null),
        this._compileMaterial(this._blurMaterial));
    }
    fromScene(e, t = 0, i = 0.1, r = 100) {
      ((bc = this._renderer.getRenderTarget()),
        (Mc = this._renderer.getActiveCubeFace()),
        (Sc = this._renderer.getActiveMipmapLevel()),
        (wc = this._renderer.xr.enabled),
        (this._renderer.xr.enabled = !1),
        this._setSize(256));
      let s = this._allocateTargets();
      return (
        (s.depthBuffer = !0),
        this._sceneToCubeUV(e, i, r, s),
        t > 0 && this._blur(s, 0, 0, t),
        this._applyPMREM(s),
        this._cleanup(s),
        s
      );
    }
    fromEquirectangular(e, t = null) {
      return this._fromTexture(e, t);
    }
    fromCubemap(e, t = null) {
      return this._fromTexture(e, t);
    }
    compileCubemapShader() {
      this._cubemapMaterial === null &&
        ((this._cubemapMaterial = Od()), this._compileMaterial(this._cubemapMaterial));
    }
    compileEquirectangularShader() {
      this._equirectMaterial === null &&
        ((this._equirectMaterial = Ud()), this._compileMaterial(this._equirectMaterial));
    }
    dispose() {
      (this._dispose(),
        this._cubemapMaterial !== null && this._cubemapMaterial.dispose(),
        this._equirectMaterial !== null && this._equirectMaterial.dispose());
    }
    _setSize(e) {
      ((this._lodMax = Math.floor(Math.log2(e))), (this._cubeSize = Math.pow(2, this._lodMax)));
    }
    _dispose() {
      (this._blurMaterial !== null && this._blurMaterial.dispose(),
        this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose());
      for (let e = 0; e < this._lodPlanes.length; e++) this._lodPlanes[e].dispose();
    }
    _cleanup(e) {
      (this._renderer.setRenderTarget(bc, Mc, Sc),
        (this._renderer.xr.enabled = wc),
        (e.scissorTest = !1),
        go(e, 0, 0, e.width, e.height));
    }
    _fromTexture(e, t) {
      (e.mapping === CubeReflectionMapping || e.mapping === CubeRefractionMapping
        ? this._setSize(e.image.length === 0 ? 16 : e.image[0].width || e.image[0].image.width)
        : this._setSize(e.image.width / 4),
        (bc = this._renderer.getRenderTarget()),
        (Mc = this._renderer.getActiveCubeFace()),
        (Sc = this._renderer.getActiveMipmapLevel()),
        (wc = this._renderer.xr.enabled),
        (this._renderer.xr.enabled = !1));
      let i = t || this._allocateTargets();
      return (this._textureToCubeUV(e, i), this._applyPMREM(i), this._cleanup(i), i);
    }
    _allocateTargets() {
      let e = 3 * Math.max(this._cubeSize, 112),
        t = 4 * this._cubeSize,
        i = {
          magFilter: LinearFilter,
          minFilter: LinearFilter,
          generateMipmaps: !1,
          type: HalfFloatType,
          format: RGBAFormat,
          colorSpace: LinearSRGBColorSpace,
          depthBuffer: !1,
        },
        r = Nd(e, t, i);
      if (
        this._pingPongRenderTarget === null ||
        this._pingPongRenderTarget.width !== e ||
        this._pingPongRenderTarget.height !== t
      ) {
        (this._pingPongRenderTarget !== null && this._dispose(), (this._pingPongRenderTarget = Nd(e, t, i)));
        let { _lodMax: s } = this;
        (({
          sizeLods: this._sizeLods,
          lodPlanes: this._lodPlanes,
          sigmas: this._sigmas,
        } = (function (a) {
          let o = [],
            c = [],
            l = [],
            h = a,
            p = a - 4 + 1 + Ld.length;
          for (let u = 0; u < p; u++) {
            let f = Math.pow(2, h);
            c.push(f);
            let g = 1 / f;
            (u > a - 4 ? (g = Ld[u - a + 4 - 1]) : u === 0 && (g = 0), l.push(g));
            let y = 1 / (f - 2),
              v = -y,
              d = 1 + y,
              m = [v, v, d, v, d, d, v, v, d, d, v, d],
              x = 6,
              b = 6,
              w = 3,
              A = 2,
              C = 1,
              F = new Float32Array(w * b * x),
              N = new Float32Array(A * b * x),
              G = new Float32Array(C * b * x);
            for (let B = 0; B < x; B++) {
              let $ = ((B % 3) * 2) / 3 - 1,
                Z = B > 2 ? 0 : -1,
                ie = [$, Z, 0, $ + 2 / 3, Z, 0, $ + 2 / 3, Z + 1, 0, $, Z, 0, $ + 2 / 3, Z + 1, 0, $, Z + 1, 0];
              (F.set(ie, w * b * B), N.set(m, A * b * B));
              let ae = [B, B, B, B, B, B];
              G.set(ae, C * b * B);
            }
            let W = new BufferGeometry();
            (W.setAttribute("position", new BufferAttribute(F, w)),
              W.setAttribute("uv", new BufferAttribute(N, A)),
              W.setAttribute("faceIndex", new BufferAttribute(G, C)),
              o.push(W),
              h > 4 && h--);
          }
          return {
            lodPlanes: o,
            sizeLods: c,
            sigmas: l,
          };
        })(s)),
          (this._blurMaterial = (function (a, o, c) {
            let l = new Float32Array(na),
              h = new Vector3(0, 1, 0);
            return new ShaderMaterial({
              name: "SphericalGaussianBlur",
              defines: {
                n: na,
                CUBEUV_TEXEL_WIDTH: 1 / o,
                CUBEUV_TEXEL_HEIGHT: 1 / c,
                CUBEUV_MAX_MIP: `${a}.0`,
              },
              uniforms: {
                envMap: {
                  value: null,
                },
                samples: {
                  value: 1,
                },
                weights: {
                  value: l,
                },
                latitudinal: {
                  value: !1,
                },
                dTheta: {
                  value: 0,
                },
                mipInt: {
                  value: 0,
                },
                poleAxis: {
                  value: h,
                },
              },
              vertexShader: uu(),
              fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,
              blending: 0,
              depthTest: !1,
              depthWrite: !1,
            });
          })(s, e, t)));
      }
      return r;
    }
    _compileMaterial(e) {
      let t = new Mesh(this._lodPlanes[0], e);
      this._renderer.compile(t, _c);
    }
    _sceneToCubeUV(e, t, i, r) {
      let s = new PerspectiveCamera(90, 1, t, i),
        a = [1, -1, 1, 1, 1, 1],
        o = [1, 1, 1, -1, -1, -1],
        c = this._renderer,
        l = c.autoClear,
        h = c.toneMapping;
      (c.getClearColor(Id), (c.toneMapping = ir), (c.autoClear = !1));
      let p = new MeshBasicMaterial({
          name: "PMREM.Background",
          side: ai,
          depthWrite: !1,
          depthTest: !1,
        }),
        u = new Mesh(new BoxGeometry(), p),
        f = !1,
        g = e.background;
      g ? g.isColor && (p.color.copy(g), (e.background = null), (f = !0)) : (p.color.copy(Id), (f = !0));
      for (let y = 0; y < 6; y++) {
        let v = y % 3;
        v === 0
          ? (s.up.set(0, a[y], 0), s.lookAt(o[y], 0, 0))
          : v === 1
            ? (s.up.set(0, 0, a[y]), s.lookAt(0, o[y], 0))
            : (s.up.set(0, a[y], 0), s.lookAt(0, 0, o[y]));
        let d = this._cubeSize;
        (go(r, v * d, y > 2 ? d : 0, d, d), c.setRenderTarget(r), f && c.render(u, s), c.render(e, s));
      }
      (u.geometry.dispose(), u.material.dispose(), (c.toneMapping = h), (c.autoClear = l), (e.background = g));
    }
    _textureToCubeUV(e, t) {
      let i = this._renderer,
        r = e.mapping === CubeReflectionMapping || e.mapping === CubeRefractionMapping;
      r
        ? (this._cubemapMaterial === null && (this._cubemapMaterial = Od()),
          (this._cubemapMaterial.uniforms.flipEnvMap.value = e.isRenderTargetTexture === !1 ? -1 : 1))
        : this._equirectMaterial === null && (this._equirectMaterial = Ud());
      let s = r ? this._cubemapMaterial : this._equirectMaterial,
        a = new Mesh(this._lodPlanes[0], s);
      s.uniforms.envMap.value = e;
      let o = this._cubeSize;
      (go(t, 0, 0, 3 * o, 2 * o), i.setRenderTarget(t), i.render(a, _c));
    }
    _applyPMREM(e) {
      let t = this._renderer,
        i = t.autoClear;
      t.autoClear = !1;
      let r = this._lodPlanes.length;
      for (let s = 1; s < r; s++) {
        let a = Math.sqrt(this._sigmas[s] * this._sigmas[s] - this._sigmas[s - 1] * this._sigmas[s - 1]),
          o = Dd[(r - s - 1) % Dd.length];
        this._blur(e, s - 1, s, a, o);
      }
      t.autoClear = i;
    }
    _blur(e, t, i, r, s) {
      let a = this._pingPongRenderTarget;
      (this._halfBlur(e, a, t, i, r, "latitudinal", s), this._halfBlur(a, e, i, i, r, "longitudinal", s));
    }
    _halfBlur(e, t, i, r, s, a, o) {
      let c = this._renderer,
        l = this._blurMaterial;
      a !== "latitudinal" &&
        a !== "longitudinal" &&
        console.error("blur direction must be either latitudinal or longitudinal!");
      let h = new Mesh(this._lodPlanes[r], l),
        p = l.uniforms,
        u = this._sizeLods[i] - 1,
        f = isFinite(s) ? Math.PI / (2 * u) : (2 * Math.PI) / 39,
        g = s / f,
        y = isFinite(s) ? 1 + Math.floor(3 * g) : na;
      y > na &&
        console.warn(
          `sigmaRadians, ${s}, is too large and will clip, as it requested ${y} samples when the maximum is set to 20`,
        );
      let v = [],
        d = 0;
      for (let b = 0; b < na; ++b) {
        let w = b / g,
          A = Math.exp((-w * w) / 2);
        (v.push(A), b === 0 ? (d += A) : b < y && (d += 2 * A));
      }
      for (let b = 0; b < v.length; b++) v[b] = v[b] / d;
      ((p.envMap.value = e.texture),
        (p.samples.value = y),
        (p.weights.value = v),
        (p.latitudinal.value = a === "latitudinal"),
        o && (p.poleAxis.value = o));
      let { _lodMax: m } = this;
      ((p.dTheta.value = f), (p.mipInt.value = m - i));
      let x = this._sizeLods[r];
      (go(t, 3 * x * (r > m - 4 ? r - m + 4 : 0), 4 * (this._cubeSize - x), 3 * x, 2 * x),
        c.setRenderTarget(t),
        c.render(h, _c));
    }
  };
function Nd(n, e, t) {
  let i = new WebGLRenderTarget(n, e, t);
  return ((i.texture.mapping = CubeUVReflectionMapping), (i.texture.name = "PMREM.cubeUv"), (i.scissorTest = !0), i);
}
function go(n, e, t, i, r) {
  (n.viewport.set(e, t, i, r), n.scissor.set(e, t, i, r));
}
function Ud() {
  return new ShaderMaterial({
    name: "EquirectangularToCubeUV",
    uniforms: {
      envMap: {
        value: null,
      },
    },
    vertexShader: uu(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,
    blending: 0,
    depthTest: !1,
    depthWrite: !1,
  });
}
function Od() {
  return new ShaderMaterial({
    name: "CubemapToCubeUV",
    uniforms: {
      envMap: {
        value: null,
      },
      flipEnvMap: {
        value: -1,
      },
    },
    vertexShader: uu(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,
    blending: 0,
    depthTest: !1,
    depthWrite: !1,
  });
}
function uu() {
  return `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`;
}
function im(n) {
  let e = new WeakMap(),
    t = null;
  function i(r) {
    let s = r.target;
    s.removeEventListener("dispose", i);
    let a = e.get(s);
    a !== void 0 && (e.delete(s), a.dispose());
  }
  return {
    get: function (r) {
      if (r && r.isTexture) {
        let s = r.mapping,
          a = s === EquirectangularReflectionMapping || s === EquirectangularRefractionMapping,
          o = s === CubeReflectionMapping || s === CubeRefractionMapping;
        if (a || o) {
          let c = e.get(r),
            l = c !== void 0 ? c.texture.pmremVersion : 0;
          if (r.isRenderTargetTexture && r.pmremVersion !== l)
            return (
              t === null && (t = new PMREMGenerator(n)),
              (c = a ? t.fromEquirectangular(r, c) : t.fromCubemap(r, c)),
              (c.texture.pmremVersion = r.pmremVersion),
              e.set(r, c),
              c.texture
            );
          if (c !== void 0) return c.texture;
          {
            let h = r.image;
            return (a && h && h.height > 0) ||
              (o &&
                h &&
                (function (p) {
                  let u = 0,
                    f = 6;
                  for (let g = 0; g < f; g++) p[g] !== void 0 && u++;
                  return u === f;
                })(h))
              ? (t === null && (t = new PMREMGenerator(n)),
                (c = a ? t.fromEquirectangular(r) : t.fromCubemap(r)),
                (c.texture.pmremVersion = r.pmremVersion),
                e.set(r, c),
                r.addEventListener("dispose", i),
                c.texture)
              : null;
          }
        }
      }
      return r;
    },
    dispose: function () {
      ((e = new WeakMap()), t !== null && (t.dispose(), (t = null)));
    },
  };
}
function nm(n) {
  let e = {};
  function t(i) {
    if (e[i] !== void 0) return e[i];
    let r;
    switch (i) {
      case "WEBGL_depth_texture":
        r =
          n.getExtension("WEBGL_depth_texture") ||
          n.getExtension("MOZ_WEBGL_depth_texture") ||
          n.getExtension("WEBKIT_WEBGL_depth_texture");
        break;
      case "EXT_texture_filter_anisotropic":
        r =
          n.getExtension("EXT_texture_filter_anisotropic") ||
          n.getExtension("MOZ_EXT_texture_filter_anisotropic") ||
          n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
        break;
      case "WEBGL_compressed_texture_s3tc":
        r =
          n.getExtension("WEBGL_compressed_texture_s3tc") ||
          n.getExtension("MOZ_WEBGL_compressed_texture_s3tc") ||
          n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
        break;
      case "WEBGL_compressed_texture_pvrtc":
        r =
          n.getExtension("WEBGL_compressed_texture_pvrtc") || n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
        break;
      default:
        r = n.getExtension(i);
    }
    return ((e[i] = r), r);
  }
  return {
    has: function (i) {
      return t(i) !== null;
    },
    init: function () {
      (t("EXT_color_buffer_float"),
        t("WEBGL_clip_cull_distance"),
        t("OES_texture_float_linear"),
        t("EXT_color_buffer_half_float"),
        t("WEBGL_multisampled_render_to_texture"),
        t("WEBGL_render_shared_exponent"));
    },
    get: function (i) {
      let r = t(i);
      return (r === null && Uo("THREE.WebGLRenderer: " + i + " extension not supported."), r);
    },
  };
}
function rm(n, e, t, i) {
  let r = {},
    s = new WeakMap();
  function a(c) {
    let l = c.target;
    l.index !== null && e.remove(l.index);
    for (let p in l.attributes) e.remove(l.attributes[p]);
    for (let p in l.morphAttributes) {
      let u = l.morphAttributes[p];
      for (let f = 0, g = u.length; f < g; f++) e.remove(u[f]);
    }
    (l.removeEventListener("dispose", a), delete r[l.id]);
    let h = s.get(l);
    (h && (e.remove(h), s.delete(l)),
      i.releaseStatesOfGeometry(l),
      l.isInstancedBufferGeometry === !0 && delete l._maxInstanceCount,
      t.memory.geometries--);
  }
  function o(c) {
    let l = [],
      h = c.index,
      p = c.attributes.position,
      u = 0;
    if (h !== null) {
      let y = h.array;
      u = h.version;
      for (let v = 0, d = y.length; v < d; v += 3) {
        let m = y[v + 0],
          x = y[v + 1],
          b = y[v + 2];
        l.push(m, x, x, b, b, m);
      }
    } else {
      if (p === void 0) return;
      {
        let y = p.array;
        u = p.version;
        for (let v = 0, d = y.length / 3 - 1; v < d; v += 3) {
          let m = v + 0,
            x = v + 1,
            b = v + 2;
          l.push(m, x, x, b, b, m);
        }
      }
    }
    let f = new (Cp(l) ? xs : vs)(l, 1);
    f.version = u;
    let g = s.get(c);
    (g && e.remove(g), s.set(c, f));
  }
  return {
    get: function (c, l) {
      return (r[l.id] === !0 || (l.addEventListener("dispose", a), (r[l.id] = !0), t.memory.geometries++), l);
    },
    update: function (c) {
      let l = c.attributes;
      for (let p in l) e.update(l[p], n.ARRAY_BUFFER);
      let h = c.morphAttributes;
      for (let p in h) {
        let u = h[p];
        for (let f = 0, g = u.length; f < g; f++) e.update(u[f], n.ARRAY_BUFFER);
      }
    },
    getWireframeAttribute: function (c) {
      let l = s.get(c);
      if (l) {
        let h = c.index;
        h !== null && l.version < h.version && o(c);
      } else o(c);
      return s.get(c);
    },
  };
}
function sm(n, e, t) {
  let i, r, s;
  function a(o, c, l) {
    l !== 0 && (n.drawElementsInstanced(i, c, r, o * s, l), t.update(c, i, l));
  }
  ((this.setMode = function (o) {
    i = o;
  }),
    (this.setIndex = function (o) {
      ((r = o.type), (s = o.bytesPerElement));
    }),
    (this.render = function (o, c) {
      (n.drawElements(i, c, r, o * s), t.update(c, i, 1));
    }),
    (this.renderInstances = a),
    (this.renderMultiDraw = function (o, c, l) {
      if (l === 0) return;
      e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i, c, 0, r, o, 0, l);
      let h = 0;
      for (let p = 0; p < l; p++) h += c[p];
      t.update(h, i, 1);
    }),
    (this.renderMultiDrawInstances = function (o, c, l, h) {
      if (l === 0) return;
      let p = e.get("WEBGL_multi_draw");
      if (p === null) for (let u = 0; u < o.length; u++) a(o[u] / s, c[u], h[u]);
      else {
        p.multiDrawElementsInstancedWEBGL(i, c, 0, r, o, 0, h, 0, l);
        let u = 0;
        for (let f = 0; f < l; f++) u += c[f];
        for (let f = 0; f < h.length; f++) t.update(u, i, h[f]);
      }
    }));
}
function am(n) {
  let e = {
    frame: 0,
    calls: 0,
    triangles: 0,
    points: 0,
    lines: 0,
  };
  return {
    memory: {
      geometries: 0,
      textures: 0,
    },
    render: e,
    programs: null,
    autoReset: !0,
    reset: function () {
      ((e.calls = 0), (e.triangles = 0), (e.points = 0), (e.lines = 0));
    },
    update: function (t, i, r) {
      switch ((e.calls++, i)) {
        case n.TRIANGLES:
          e.triangles += r * (t / 3);
          break;
        case n.LINES:
          e.lines += r * (t / 2);
          break;
        case n.LINE_STRIP:
          e.lines += r * (t - 1);
          break;
        case n.LINE_LOOP:
          e.lines += r * t;
          break;
        case n.POINTS:
          e.points += r * t;
          break;
        default:
          console.error("THREE.WebGLInfo: Unknown draw mode:", i);
      }
    },
  };
}
function om(n, e, t) {
  let i = new WeakMap(),
    r = new Vector4();
  return {
    update: function (s, a, o) {
      let c = s.morphTargetInfluences,
        l = a.morphAttributes.position || a.morphAttributes.normal || a.morphAttributes.color,
        h = l !== void 0 ? l.length : 0,
        p = i.get(a);
      if (p === void 0 || p.count !== h) {
        let F = function () {
          (A.dispose(), i.delete(a), a.removeEventListener("dispose", F));
        };
        p !== void 0 && p.texture.dispose();
        let u = a.morphAttributes.position !== void 0,
          f = a.morphAttributes.normal !== void 0,
          g = a.morphAttributes.color !== void 0,
          y = a.morphAttributes.position || [],
          v = a.morphAttributes.normal || [],
          d = a.morphAttributes.color || [],
          m = 0;
        (u === !0 && (m = 1), f === !0 && (m = 2), g === !0 && (m = 3));
        let x = a.attributes.position.count * m,
          b = 1;
        x > e.maxTextureSize && ((b = Math.ceil(x / e.maxTextureSize)), (x = e.maxTextureSize));
        let w = new Float32Array(x * b * 4 * h),
          A = new DataArrayTexture(w, x, b, h);
        ((A.type = FloatType), (A.needsUpdate = !0));
        let C = 4 * m;
        for (let N = 0; N < h; N++) {
          let G = y[N],
            W = v[N],
            B = d[N],
            $ = x * b * 4 * N;
          for (let Z = 0; Z < G.count; Z++) {
            let ie = Z * C;
            (u === !0 &&
              (r.fromBufferAttribute(G, Z),
              (w[$ + ie + 0] = r.x),
              (w[$ + ie + 1] = r.y),
              (w[$ + ie + 2] = r.z),
              (w[$ + ie + 3] = 0)),
              f === !0 &&
                (r.fromBufferAttribute(W, Z),
                (w[$ + ie + 4] = r.x),
                (w[$ + ie + 5] = r.y),
                (w[$ + ie + 6] = r.z),
                (w[$ + ie + 7] = 0)),
              g === !0 &&
                (r.fromBufferAttribute(B, Z),
                (w[$ + ie + 8] = r.x),
                (w[$ + ie + 9] = r.y),
                (w[$ + ie + 10] = r.z),
                (w[$ + ie + 11] = B.itemSize === 4 ? r.w : 1)));
          }
        }
        ((p = {
          count: h,
          texture: A,
          size: new Vector2(x, b),
        }),
          i.set(a, p),
          a.addEventListener("dispose", F));
      }
      if (s.isInstancedMesh === !0 && s.morphTexture !== null)
        o.getUniforms().setValue(n, "morphTexture", s.morphTexture, t);
      else {
        let u = 0;
        for (let g = 0; g < c.length; g++) u += c[g];
        let f = a.morphTargetsRelative ? 1 : 1 - u;
        (o.getUniforms().setValue(n, "morphTargetBaseInfluence", f),
          o.getUniforms().setValue(n, "morphTargetInfluences", c));
      }
      (o.getUniforms().setValue(n, "morphTargetsTexture", p.texture, t),
        o.getUniforms().setValue(n, "morphTargetsTextureSize", p.size));
    },
  };
}
function lm(n, e, t, i) {
  let r = new WeakMap();
  function s(a) {
    let o = a.target;
    (o.removeEventListener("dispose", s),
      t.remove(o.instanceMatrix),
      o.instanceColor !== null && t.remove(o.instanceColor));
  }
  return {
    update: function (a) {
      let o = i.render.frame,
        c = a.geometry,
        l = e.get(a, c);
      if (
        (r.get(l) !== o && (e.update(l), r.set(l, o)),
        a.isInstancedMesh &&
          (a.hasEventListener("dispose", s) === !1 && a.addEventListener("dispose", s),
          r.get(a) !== o &&
            (t.update(a.instanceMatrix, n.ARRAY_BUFFER),
            a.instanceColor !== null && t.update(a.instanceColor, n.ARRAY_BUFFER),
            r.set(a, o))),
        a.isSkinnedMesh)
      ) {
        let h = a.skeleton;
        r.get(h) !== o && (h.update(), r.set(h, o));
      }
      return l;
    },
    dispose: function () {
      r = new WeakMap();
    },
  };
}
var DepthTexture = class extends Texture {
    constructor(e, t, i, r, s, a, o, c, l, h = 1026) {
      if (h !== DepthFormat && h !== DepthStencilFormat)
        throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
      (i === void 0 && h === DepthFormat && (i = UnsignedIntType),
        i === void 0 && h === DepthStencilFormat && (i = UnsignedInt248Type),
        super(null, r, s, a, o, c, h, i, l),
        (this.isDepthTexture = !0),
        (this.image = {
          width: e,
          height: t,
        }),
        (this.magFilter = o !== void 0 ? o : NearestFilter),
        (this.minFilter = c !== void 0 ? c : NearestFilter),
        (this.flipY = !1),
        (this.generateMipmaps = !1),
        (this.compareFunction = null));
    }
    copy(e) {
      return (super.copy(e), (this.compareFunction = e.compareFunction), this);
    }
    toJSON(e) {
      let t = super.toJSON(e);
      return (this.compareFunction !== null && (t.compareFunction = this.compareFunction), t);
    }
  },
  Ip = new Texture(),
  Fd = new DepthTexture(1, 1),
  Dp = new DataArrayTexture(),
  Np = new Data3DTexture(),
  Up = new CubeTexture(),
  Bd = [],
  zd = [],
  kd = new Float32Array(16),
  Gd = new Float32Array(9),
  Hd = new Float32Array(4);
function Es(n, e, t) {
  let i = n[0];
  if (i <= 0 || i > 0) return n;
  let r = e * t,
    s = Bd[r];
  if ((s === void 0 && ((s = new Float32Array(r)), (Bd[r] = s)), e !== 0)) {
    i.toArray(s, 0);
    for (let a = 1, o = 0; a !== e; ++a) ((o += t), n[a].toArray(s, o));
  }
  return s;
}
function ei(n, e) {
  if (n.length !== e.length) return !1;
  for (let t = 0, i = n.length; t < i; t++) if (n[t] !== e[t]) return !1;
  return !0;
}
function ti(n, e) {
  for (let t = 0, i = e.length; t < i; t++) n[t] = e[t];
}
function dl(n, e) {
  let t = zd[e];
  t === void 0 && ((t = new Int32Array(e)), (zd[e] = t));
  for (let i = 0; i !== e; ++i) t[i] = n.allocateTextureUnit();
  return t;
}
function cm(n, e) {
  let t = this.cache;
  t[0] !== e && (n.uniform1f(this.addr, e), (t[0] = e));
}
function hm(n, e) {
  let t = this.cache;
  if (e.x !== void 0)
    (t[0] === e.x && t[1] === e.y) || (n.uniform2f(this.addr, e.x, e.y), (t[0] = e.x), (t[1] = e.y));
  else {
    if (ei(t, e)) return;
    (n.uniform2fv(this.addr, e), ti(t, e));
  }
}
function um(n, e) {
  let t = this.cache;
  if (e.x !== void 0)
    (t[0] === e.x && t[1] === e.y && t[2] === e.z) ||
      (n.uniform3f(this.addr, e.x, e.y, e.z), (t[0] = e.x), (t[1] = e.y), (t[2] = e.z));
  else if (e.r !== void 0)
    (t[0] === e.r && t[1] === e.g && t[2] === e.b) ||
      (n.uniform3f(this.addr, e.r, e.g, e.b), (t[0] = e.r), (t[1] = e.g), (t[2] = e.b));
  else {
    if (ei(t, e)) return;
    (n.uniform3fv(this.addr, e), ti(t, e));
  }
}
function dm(n, e) {
  let t = this.cache;
  if (e.x !== void 0)
    (t[0] === e.x && t[1] === e.y && t[2] === e.z && t[3] === e.w) ||
      (n.uniform4f(this.addr, e.x, e.y, e.z, e.w), (t[0] = e.x), (t[1] = e.y), (t[2] = e.z), (t[3] = e.w));
  else {
    if (ei(t, e)) return;
    (n.uniform4fv(this.addr, e), ti(t, e));
  }
}
function pm(n, e) {
  let t = this.cache,
    i = e.elements;
  if (i === void 0) {
    if (ei(t, e)) return;
    (n.uniformMatrix2fv(this.addr, !1, e), ti(t, e));
  } else {
    if (ei(t, i)) return;
    (Hd.set(i), n.uniformMatrix2fv(this.addr, !1, Hd), ti(t, i));
  }
}
function fm(n, e) {
  let t = this.cache,
    i = e.elements;
  if (i === void 0) {
    if (ei(t, e)) return;
    (n.uniformMatrix3fv(this.addr, !1, e), ti(t, e));
  } else {
    if (ei(t, i)) return;
    (Gd.set(i), n.uniformMatrix3fv(this.addr, !1, Gd), ti(t, i));
  }
}
function mm(n, e) {
  let t = this.cache,
    i = e.elements;
  if (i === void 0) {
    if (ei(t, e)) return;
    (n.uniformMatrix4fv(this.addr, !1, e), ti(t, e));
  } else {
    if (ei(t, i)) return;
    (kd.set(i), n.uniformMatrix4fv(this.addr, !1, kd), ti(t, i));
  }
}
function gm(n, e) {
  let t = this.cache;
  t[0] !== e && (n.uniform1i(this.addr, e), (t[0] = e));
}
function vm(n, e) {
  let t = this.cache;
  if (e.x !== void 0)
    (t[0] === e.x && t[1] === e.y) || (n.uniform2i(this.addr, e.x, e.y), (t[0] = e.x), (t[1] = e.y));
  else {
    if (ei(t, e)) return;
    (n.uniform2iv(this.addr, e), ti(t, e));
  }
}
function xm(n, e) {
  let t = this.cache;
  if (e.x !== void 0)
    (t[0] === e.x && t[1] === e.y && t[2] === e.z) ||
      (n.uniform3i(this.addr, e.x, e.y, e.z), (t[0] = e.x), (t[1] = e.y), (t[2] = e.z));
  else {
    if (ei(t, e)) return;
    (n.uniform3iv(this.addr, e), ti(t, e));
  }
}
function ym(n, e) {
  let t = this.cache;
  if (e.x !== void 0)
    (t[0] === e.x && t[1] === e.y && t[2] === e.z && t[3] === e.w) ||
      (n.uniform4i(this.addr, e.x, e.y, e.z, e.w), (t[0] = e.x), (t[1] = e.y), (t[2] = e.z), (t[3] = e.w));
  else {
    if (ei(t, e)) return;
    (n.uniform4iv(this.addr, e), ti(t, e));
  }
}
function _m(n, e) {
  let t = this.cache;
  t[0] !== e && (n.uniform1ui(this.addr, e), (t[0] = e));
}
function bm(n, e) {
  let t = this.cache;
  if (e.x !== void 0)
    (t[0] === e.x && t[1] === e.y) || (n.uniform2ui(this.addr, e.x, e.y), (t[0] = e.x), (t[1] = e.y));
  else {
    if (ei(t, e)) return;
    (n.uniform2uiv(this.addr, e), ti(t, e));
  }
}
function Mm(n, e) {
  let t = this.cache;
  if (e.x !== void 0)
    (t[0] === e.x && t[1] === e.y && t[2] === e.z) ||
      (n.uniform3ui(this.addr, e.x, e.y, e.z), (t[0] = e.x), (t[1] = e.y), (t[2] = e.z));
  else {
    if (ei(t, e)) return;
    (n.uniform3uiv(this.addr, e), ti(t, e));
  }
}
function Sm(n, e) {
  let t = this.cache;
  if (e.x !== void 0)
    (t[0] === e.x && t[1] === e.y && t[2] === e.z && t[3] === e.w) ||
      (n.uniform4ui(this.addr, e.x, e.y, e.z, e.w), (t[0] = e.x), (t[1] = e.y), (t[2] = e.z), (t[3] = e.w));
  else {
    if (ei(t, e)) return;
    (n.uniform4uiv(this.addr, e), ti(t, e));
  }
}
function wm(n, e, t) {
  let i = this.cache,
    r = t.allocateTextureUnit(),
    s;
  (i[0] !== r && (n.uniform1i(this.addr, r), (i[0] = r)),
    this.type === n.SAMPLER_2D_SHADOW ? ((Fd.compareFunction = Ap), (s = Fd)) : (s = Ip),
    t.setTexture2D(e || s, r));
}
function Tm(n, e, t) {
  let i = this.cache,
    r = t.allocateTextureUnit();
  (i[0] !== r && (n.uniform1i(this.addr, r), (i[0] = r)), t.setTexture3D(e || Np, r));
}
function Em(n, e, t) {
  let i = this.cache,
    r = t.allocateTextureUnit();
  (i[0] !== r && (n.uniform1i(this.addr, r), (i[0] = r)), t.setTextureCube(e || Up, r));
}
function Am(n, e, t) {
  let i = this.cache,
    r = t.allocateTextureUnit();
  (i[0] !== r && (n.uniform1i(this.addr, r), (i[0] = r)), t.setTexture2DArray(e || Dp, r));
}
function Cm(n, e) {
  n.uniform1fv(this.addr, e);
}
function Rm(n, e) {
  let t = Es(e, this.size, 2);
  n.uniform2fv(this.addr, t);
}
function Pm(n, e) {
  let t = Es(e, this.size, 3);
  n.uniform3fv(this.addr, t);
}
function Lm(n, e) {
  let t = Es(e, this.size, 4);
  n.uniform4fv(this.addr, t);
}
function Im(n, e) {
  let t = Es(e, this.size, 4);
  n.uniformMatrix2fv(this.addr, !1, t);
}
function Dm(n, e) {
  let t = Es(e, this.size, 9);
  n.uniformMatrix3fv(this.addr, !1, t);
}
function Nm(n, e) {
  let t = Es(e, this.size, 16);
  n.uniformMatrix4fv(this.addr, !1, t);
}
function Um(n, e) {
  n.uniform1iv(this.addr, e);
}
function Om(n, e) {
  n.uniform2iv(this.addr, e);
}
function Fm(n, e) {
  n.uniform3iv(this.addr, e);
}
function Bm(n, e) {
  n.uniform4iv(this.addr, e);
}
function zm(n, e) {
  n.uniform1uiv(this.addr, e);
}
function km(n, e) {
  n.uniform2uiv(this.addr, e);
}
function Gm(n, e) {
  n.uniform3uiv(this.addr, e);
}
function Hm(n, e) {
  n.uniform4uiv(this.addr, e);
}
function Vm(n, e, t) {
  let i = this.cache,
    r = e.length,
    s = dl(t, r);
  ei(i, s) || (n.uniform1iv(this.addr, s), ti(i, s));
  for (let a = 0; a !== r; ++a) t.setTexture2D(e[a] || Ip, s[a]);
}
function Wm(n, e, t) {
  let i = this.cache,
    r = e.length,
    s = dl(t, r);
  ei(i, s) || (n.uniform1iv(this.addr, s), ti(i, s));
  for (let a = 0; a !== r; ++a) t.setTexture3D(e[a] || Np, s[a]);
}
function Xm(n, e, t) {
  let i = this.cache,
    r = e.length,
    s = dl(t, r);
  ei(i, s) || (n.uniform1iv(this.addr, s), ti(i, s));
  for (let a = 0; a !== r; ++a) t.setTextureCube(e[a] || Up, s[a]);
}
function jm(n, e, t) {
  let i = this.cache,
    r = e.length,
    s = dl(t, r);
  ei(i, s) || (n.uniform1iv(this.addr, s), ti(i, s));
  for (let a = 0; a !== r; ++a) t.setTexture2DArray(e[a] || Dp, s[a]);
}
var vh = class {
    constructor(e, t, i) {
      ((this.id = e),
        (this.addr = i),
        (this.cache = []),
        (this.type = t.type),
        (this.setValue = (function (r) {
          switch (r) {
            case 5126:
              return cm;
            case 35664:
              return hm;
            case 35665:
              return um;
            case 35666:
              return dm;
            case 35674:
              return pm;
            case 35675:
              return fm;
            case 35676:
              return mm;
            case 5124:
            case 35670:
              return gm;
            case 35667:
            case 35671:
              return vm;
            case 35668:
            case 35672:
              return xm;
            case 35669:
            case 35673:
              return ym;
            case 5125:
              return _m;
            case 36294:
              return bm;
            case 36295:
              return Mm;
            case 36296:
              return Sm;
            case 35678:
            case 36198:
            case 36298:
            case 36306:
            case 35682:
              return wm;
            case 35679:
            case 36299:
            case 36307:
              return Tm;
            case 35680:
            case 36300:
            case 36308:
            case 36293:
              return Em;
            case 36289:
            case 36303:
            case 36311:
            case 36292:
              return Am;
          }
        })(t.type)));
    }
  },
  xh = class {
    constructor(e, t, i) {
      ((this.id = e),
        (this.addr = i),
        (this.cache = []),
        (this.type = t.type),
        (this.size = t.size),
        (this.setValue = (function (r) {
          switch (r) {
            case 5126:
              return Cm;
            case 35664:
              return Rm;
            case 35665:
              return Pm;
            case 35666:
              return Lm;
            case 35674:
              return Im;
            case 35675:
              return Dm;
            case 35676:
              return Nm;
            case 5124:
            case 35670:
              return Um;
            case 35667:
            case 35671:
              return Om;
            case 35668:
            case 35672:
              return Fm;
            case 35669:
            case 35673:
              return Bm;
            case 5125:
              return zm;
            case 36294:
              return km;
            case 36295:
              return Gm;
            case 36296:
              return Hm;
            case 35678:
            case 36198:
            case 36298:
            case 36306:
            case 35682:
              return Vm;
            case 35679:
            case 36299:
            case 36307:
              return Wm;
            case 35680:
            case 36300:
            case 36308:
            case 36293:
              return Xm;
            case 36289:
            case 36303:
            case 36311:
            case 36292:
              return jm;
          }
        })(t.type)));
    }
  },
  yh = class {
    constructor(e) {
      ((this.id = e), (this.seq = []), (this.map = {}));
    }
    setValue(e, t, i) {
      let r = this.seq;
      for (let s = 0, a = r.length; s !== a; ++s) {
        let o = r[s];
        o.setValue(e, t[o.id], i);
      }
    }
  },
  Tc = /(\w+)(\])?(\[|\.)?/g;
function Vd(n, e) {
  (n.seq.push(e), (n.map[e.id] = e));
}
function qm(n, e, t) {
  let i = n.name,
    r = i.length;
  for (Tc.lastIndex = 0; ;) {
    let s = Tc.exec(i),
      a = Tc.lastIndex,
      o = s[1],
      c = s[2] === "]",
      l = s[3];
    if ((c && (o |= 0), l === void 0 || (l === "[" && a + 2 === r))) {
      Vd(t, l === void 0 ? new vh(o, n, e) : new xh(o, n, e));
      break;
    }
    {
      let h = t.map[o];
      (h === void 0 && ((h = new yh(o)), Vd(t, h)), (t = h));
    }
  }
}
var hs = class {
  constructor(e, t) {
    ((this.seq = []), (this.map = {}));
    let i = e.getProgramParameter(t, e.ACTIVE_UNIFORMS);
    for (let r = 0; r < i; ++r) {
      let s = e.getActiveUniform(t, r);
      qm(s, e.getUniformLocation(t, s.name), this);
    }
  }
  setValue(e, t, i, r) {
    let s = this.map[t];
    s !== void 0 && s.setValue(e, i, r);
  }
  setOptional(e, t, i) {
    let r = t[i];
    r !== void 0 && this.setValue(e, i, r);
  }
  static upload(e, t, i, r) {
    for (let s = 0, a = t.length; s !== a; ++s) {
      let o = t[s],
        c = i[o.id];
      c.needsUpdate !== !1 && o.setValue(e, c.value, r);
    }
  }
  static seqWithValue(e, t) {
    let i = [];
    for (let r = 0, s = e.length; r !== s; ++r) {
      let a = e[r];
      a.id in t && i.push(a);
    }
    return i;
  }
};
function Wd(n, e, t) {
  let i = n.createShader(e);
  return (n.shaderSource(i, t), n.compileShader(i), i);
}
var Ym = 37297,
  Zm = 0;
function Xd(n, e, t) {
  let i = n.getShaderParameter(e, n.COMPILE_STATUS),
    r = n.getShaderInfoLog(e).trim();
  if (i && r === "") return "";
  let s = /ERROR: 0:(\d+)/.exec(r);
  if (s) {
    let a = parseInt(s[1]);
    return (
      t.toUpperCase() +
      `

` +
      r +
      `

` +
      (function (o, c) {
        let l = o.split(`
`),
          h = [],
          p = Math.max(c - 6, 0),
          u = Math.min(c + 6, l.length);
        for (let f = p; f < u; f++) {
          let g = f + 1;
          h.push(`${g === c ? ">" : " "} ${g}: ${l[f]}`);
        }
        return h.join(`
`);
      })(n.getShaderSource(e), a)
    );
  }
  return r;
}
function Km(n, e) {
  let t = (function (i) {
    let r = Mt.getPrimaries(Mt.workingColorSpace),
      s = Mt.getPrimaries(i),
      a;
    switch (
      (r === s
        ? (a = "")
        : r === zo && s === Rec709Primaries
          ? (a = "LinearDisplayP3ToLinearSRGB")
          : r === Rec709Primaries && s === zo && (a = "LinearSRGBToLinearDisplayP3"),
      i)
    ) {
      case LinearSRGBColorSpace:
      case LinearDisplayP3ColorSpace:
        return [a, "LinearTransferOETF"];
      case Ft:
      case DisplayP3ColorSpace:
        return [a, "sRGBTransferOETF"];
      default:
        return (console.warn("THREE.WebGLProgram: Unsupported color space:", i), [a, "LinearTransferOETF"]);
    }
  })(e);
  return `vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`;
}
function Jm(n, e) {
  let t;
  switch (e) {
    case S0:
      t = "Linear";
      break;
    case w0:
      t = "Reinhard";
      break;
    case T0:
      t = "Cineon";
      break;
    case cl:
      t = "ACESFilmic";
      break;
    case A0:
      t = "AgX";
      break;
    case C0:
      t = "Neutral";
      break;
    case E0:
      t = "Custom";
      break;
    default:
      (console.warn("THREE.WebGLProgram: Unsupported toneMapping:", e), (t = "Linear"));
  }
  return "vec3 " + n + "( vec3 color ) { return " + t + "ToneMapping( color ); }";
}
var vo = new Vector3();
function $m() {
  return (
    Mt.getLuminanceCoefficients(vo),
    [
      "float luminance( const in vec3 rgb ) {",
      `	const vec3 weights = vec3( ${vo.x.toFixed(4)}, ${vo.y.toFixed(4)}, ${vo.z.toFixed(4)} );`,
      "	return dot( weights, rgb );",
      "}",
    ].join(`
`)
  );
}
function ra(n) {
  return n !== "";
}
function jd(n, e) {
  let t = e.numSpotLightShadows + e.numSpotLightMaps - e.numSpotLightShadowsWithMaps;
  return n
    .replace(/NUM_DIR_LIGHTS/g, e.numDirLights)
    .replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights)
    .replace(/NUM_SPOT_LIGHT_MAPS/g, e.numSpotLightMaps)
    .replace(/NUM_SPOT_LIGHT_COORDS/g, t)
    .replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights)
    .replace(/NUM_POINT_LIGHTS/g, e.numPointLights)
    .replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights)
    .replace(/NUM_DIR_LIGHT_SHADOWS/g, e.numDirLightShadows)
    .replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, e.numSpotLightShadowsWithMaps)
    .replace(/NUM_SPOT_LIGHT_SHADOWS/g, e.numSpotLightShadows)
    .replace(/NUM_POINT_LIGHT_SHADOWS/g, e.numPointLightShadows);
}
function qd(n, e) {
  return n
    .replace(/NUM_CLIPPING_PLANES/g, e.numClippingPlanes)
    .replace(/UNION_CLIPPING_PLANES/g, e.numClippingPlanes - e.numClipIntersection);
}
var Qm = /^[ \t]*#include +<([\w\d./]+)>/gm;
function _h(n) {
  return n.replace(Qm, tg);
}
var eg = new Map();
function tg(n, e) {
  let t = ot[e];
  if (t === void 0) {
    let i = eg.get(e);
    if (i === void 0) throw new Error("Can not resolve #include <" + e + ">");
    ((t = ot[i]),
      console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', e, i));
  }
  return _h(t);
}
var ig =
  /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function Yd(n) {
  return n.replace(ig, ng);
}
function ng(n, e, t, i) {
  let r = "";
  for (let s = parseInt(e); s < parseInt(t); s++)
    r += i.replace(/\[\s*i\s*\]/g, "[ " + s + " ]").replace(/UNROLLED_LOOP_INDEX/g, s);
  return r;
}
function Zd(n) {
  let e = `precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;
  return (
    n.precision === "highp"
      ? (e += `
#define HIGH_PRECISION`)
      : n.precision === "mediump"
        ? (e += `
#define MEDIUM_PRECISION`)
        : n.precision === "lowp" &&
          (e += `
#define LOW_PRECISION`),
    e
  );
}
function rg(n, e, t, i) {
  let r = n.getContext(),
    s = t.defines,
    a = t.vertexShader,
    o = t.fragmentShader,
    c = (function (W) {
      let B = "SHADOWMAP_TYPE_BASIC";
      return (
        W.shadowMapType === fp
          ? (B = "SHADOWMAP_TYPE_PCF")
          : W.shadowMapType === ba
            ? (B = "SHADOWMAP_TYPE_PCF_SOFT")
            : W.shadowMapType === Nn && (B = "SHADOWMAP_TYPE_VSM"),
        B
      );
    })(t),
    l = (function (W) {
      let B = "ENVMAP_TYPE_CUBE";
      if (W.envMap)
        switch (W.envMapMode) {
          case CubeReflectionMapping:
          case CubeRefractionMapping:
            B = "ENVMAP_TYPE_CUBE";
            break;
          case CubeUVReflectionMapping:
            B = "ENVMAP_TYPE_CUBE_UV";
        }
      return B;
    })(t),
    h = (function (W) {
      let B = "ENVMAP_MODE_REFLECTION";
      return (W.envMap && W.envMapMode === CubeRefractionMapping && (B = "ENVMAP_MODE_REFRACTION"), B);
    })(t),
    p = (function (W) {
      let B = "ENVMAP_BLENDING_NONE";
      if (W.envMap)
        switch (W.combine) {
          case mp:
            B = "ENVMAP_BLENDING_MULTIPLY";
            break;
          case b0:
            B = "ENVMAP_BLENDING_MIX";
            break;
          case M0:
            B = "ENVMAP_BLENDING_ADD";
        }
      return B;
    })(t),
    u = (function (W) {
      let B = W.envMapCubeUVHeight;
      if (B === null) return null;
      let $ = Math.log2(B) - 2,
        Z = 1 / B;
      return {
        texelWidth: 1 / (3 * Math.max(Math.pow(2, $), 112)),
        texelHeight: Z,
        maxMip: $,
      };
    })(t),
    f = (function (W) {
      return [
        W.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "",
        W.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : "",
      ].filter(ra).join(`
`);
    })(t),
    g = (function (W) {
      let B = [];
      for (let $ in W) {
        let Z = W[$];
        Z !== !1 && B.push("#define " + $ + " " + Z);
      }
      return B.join(`
`);
    })(s),
    y = r.createProgram(),
    v,
    d,
    m = t.glslVersion
      ? "#version " +
        t.glslVersion +
        `
`
      : "";
  (t.isRawShaderMaterial
    ? ((v = ["#define SHADER_TYPE " + t.shaderType, "#define SHADER_NAME " + t.shaderName, g].filter(ra).join(`
`)),
      v.length > 0 &&
        (v += `
`),
      (d = ["#define SHADER_TYPE " + t.shaderType, "#define SHADER_NAME " + t.shaderName, g].filter(ra).join(`
`)),
      d.length > 0 &&
        (d += `
`))
    : ((v = [
        Zd(t),
        "#define SHADER_TYPE " + t.shaderType,
        "#define SHADER_NAME " + t.shaderName,
        g,
        t.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "",
        t.batching ? "#define USE_BATCHING" : "",
        t.batchingColor ? "#define USE_BATCHING_COLOR" : "",
        t.instancing ? "#define USE_INSTANCING" : "",
        t.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
        t.instancingMorph ? "#define USE_INSTANCING_MORPH" : "",
        t.useFog && t.fog ? "#define USE_FOG" : "",
        t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "",
        t.map ? "#define USE_MAP" : "",
        t.envMap ? "#define USE_ENVMAP" : "",
        t.envMap ? "#define " + h : "",
        t.lightMap ? "#define USE_LIGHTMAP" : "",
        t.aoMap ? "#define USE_AOMAP" : "",
        t.bumpMap ? "#define USE_BUMPMAP" : "",
        t.normalMap ? "#define USE_NORMALMAP" : "",
        t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
        t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
        t.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
        t.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
        t.anisotropy ? "#define USE_ANISOTROPY" : "",
        t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
        t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
        t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
        t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
        t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
        t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
        t.specularMap ? "#define USE_SPECULARMAP" : "",
        t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
        t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
        t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
        t.metalnessMap ? "#define USE_METALNESSMAP" : "",
        t.alphaMap ? "#define USE_ALPHAMAP" : "",
        t.alphaHash ? "#define USE_ALPHAHASH" : "",
        t.transmission ? "#define USE_TRANSMISSION" : "",
        t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
        t.thicknessMap ? "#define USE_THICKNESSMAP" : "",
        t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
        t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
        t.mapUv ? "#define MAP_UV " + t.mapUv : "",
        t.alphaMapUv ? "#define ALPHAMAP_UV " + t.alphaMapUv : "",
        t.lightMapUv ? "#define LIGHTMAP_UV " + t.lightMapUv : "",
        t.aoMapUv ? "#define AOMAP_UV " + t.aoMapUv : "",
        t.emissiveMapUv ? "#define EMISSIVEMAP_UV " + t.emissiveMapUv : "",
        t.bumpMapUv ? "#define BUMPMAP_UV " + t.bumpMapUv : "",
        t.normalMapUv ? "#define NORMALMAP_UV " + t.normalMapUv : "",
        t.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + t.displacementMapUv : "",
        t.metalnessMapUv ? "#define METALNESSMAP_UV " + t.metalnessMapUv : "",
        t.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + t.roughnessMapUv : "",
        t.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + t.anisotropyMapUv : "",
        t.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + t.clearcoatMapUv : "",
        t.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + t.clearcoatNormalMapUv : "",
        t.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + t.clearcoatRoughnessMapUv : "",
        t.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + t.iridescenceMapUv : "",
        t.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + t.iridescenceThicknessMapUv : "",
        t.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + t.sheenColorMapUv : "",
        t.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + t.sheenRoughnessMapUv : "",
        t.specularMapUv ? "#define SPECULARMAP_UV " + t.specularMapUv : "",
        t.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + t.specularColorMapUv : "",
        t.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + t.specularIntensityMapUv : "",
        t.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + t.transmissionMapUv : "",
        t.thicknessMapUv ? "#define THICKNESSMAP_UV " + t.thicknessMapUv : "",
        t.vertexTangents && t.flatShading === !1 ? "#define USE_TANGENT" : "",
        t.vertexColors ? "#define USE_COLOR" : "",
        t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
        t.vertexUv1s ? "#define USE_UV1" : "",
        t.vertexUv2s ? "#define USE_UV2" : "",
        t.vertexUv3s ? "#define USE_UV3" : "",
        t.pointsUvs ? "#define USE_POINTS_UV" : "",
        t.flatShading ? "#define FLAT_SHADED" : "",
        t.skinning ? "#define USE_SKINNING" : "",
        t.morphTargets ? "#define USE_MORPHTARGETS" : "",
        t.morphNormals && t.flatShading === !1 ? "#define USE_MORPHNORMALS" : "",
        t.morphColors ? "#define USE_MORPHCOLORS" : "",
        t.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + t.morphTextureStride : "",
        t.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + t.morphTargetsCount : "",
        t.doubleSided ? "#define DOUBLE_SIDED" : "",
        t.flipSided ? "#define FLIP_SIDED" : "",
        t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
        t.shadowMapEnabled ? "#define " + c : "",
        t.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
        t.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
        t.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
        t.reverseDepthBuffer ? "#define USE_REVERSEDEPTHBUF" : "",
        "uniform mat4 modelMatrix;",
        "uniform mat4 modelViewMatrix;",
        "uniform mat4 projectionMatrix;",
        "uniform mat4 viewMatrix;",
        "uniform mat3 normalMatrix;",
        "uniform vec3 cameraPosition;",
        "uniform bool isOrthographic;",
        "#ifdef USE_INSTANCING",
        "	attribute mat4 instanceMatrix;",
        "#endif",
        "#ifdef USE_INSTANCING_COLOR",
        "	attribute vec3 instanceColor;",
        "#endif",
        "#ifdef USE_INSTANCING_MORPH",
        "	uniform sampler2D morphTexture;",
        "#endif",
        "attribute vec3 position;",
        "attribute vec3 normal;",
        "attribute vec2 uv;",
        "#ifdef USE_UV1",
        "	attribute vec2 uv1;",
        "#endif",
        "#ifdef USE_UV2",
        "	attribute vec2 uv2;",
        "#endif",
        "#ifdef USE_UV3",
        "	attribute vec2 uv3;",
        "#endif",
        "#ifdef USE_TANGENT",
        "	attribute vec4 tangent;",
        "#endif",
        "#if defined( USE_COLOR_ALPHA )",
        "	attribute vec4 color;",
        "#elif defined( USE_COLOR )",
        "	attribute vec3 color;",
        "#endif",
        "#ifdef USE_SKINNING",
        "	attribute vec4 skinIndex;",
        "	attribute vec4 skinWeight;",
        "#endif",
        `
`,
      ].filter(ra).join(`
`)),
      (d = [
        Zd(t),
        "#define SHADER_TYPE " + t.shaderType,
        "#define SHADER_NAME " + t.shaderName,
        g,
        t.useFog && t.fog ? "#define USE_FOG" : "",
        t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "",
        t.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "",
        t.map ? "#define USE_MAP" : "",
        t.matcap ? "#define USE_MATCAP" : "",
        t.envMap ? "#define USE_ENVMAP" : "",
        t.envMap ? "#define " + l : "",
        t.envMap ? "#define " + h : "",
        t.envMap ? "#define " + p : "",
        u ? "#define CUBEUV_TEXEL_WIDTH " + u.texelWidth : "",
        u ? "#define CUBEUV_TEXEL_HEIGHT " + u.texelHeight : "",
        u ? "#define CUBEUV_MAX_MIP " + u.maxMip + ".0" : "",
        t.lightMap ? "#define USE_LIGHTMAP" : "",
        t.aoMap ? "#define USE_AOMAP" : "",
        t.bumpMap ? "#define USE_BUMPMAP" : "",
        t.normalMap ? "#define USE_NORMALMAP" : "",
        t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
        t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
        t.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
        t.anisotropy ? "#define USE_ANISOTROPY" : "",
        t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
        t.clearcoat ? "#define USE_CLEARCOAT" : "",
        t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
        t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
        t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
        t.dispersion ? "#define USE_DISPERSION" : "",
        t.iridescence ? "#define USE_IRIDESCENCE" : "",
        t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
        t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
        t.specularMap ? "#define USE_SPECULARMAP" : "",
        t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
        t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
        t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
        t.metalnessMap ? "#define USE_METALNESSMAP" : "",
        t.alphaMap ? "#define USE_ALPHAMAP" : "",
        t.alphaTest ? "#define USE_ALPHATEST" : "",
        t.alphaHash ? "#define USE_ALPHAHASH" : "",
        t.sheen ? "#define USE_SHEEN" : "",
        t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
        t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
        t.transmission ? "#define USE_TRANSMISSION" : "",
        t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
        t.thicknessMap ? "#define USE_THICKNESSMAP" : "",
        t.vertexTangents && t.flatShading === !1 ? "#define USE_TANGENT" : "",
        t.vertexColors || t.instancingColor || t.batchingColor ? "#define USE_COLOR" : "",
        t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
        t.vertexUv1s ? "#define USE_UV1" : "",
        t.vertexUv2s ? "#define USE_UV2" : "",
        t.vertexUv3s ? "#define USE_UV3" : "",
        t.pointsUvs ? "#define USE_POINTS_UV" : "",
        t.gradientMap ? "#define USE_GRADIENTMAP" : "",
        t.flatShading ? "#define FLAT_SHADED" : "",
        t.doubleSided ? "#define DOUBLE_SIDED" : "",
        t.flipSided ? "#define FLIP_SIDED" : "",
        t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
        t.shadowMapEnabled ? "#define " + c : "",
        t.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
        t.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
        t.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
        t.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
        t.reverseDepthBuffer ? "#define USE_REVERSEDEPTHBUF" : "",
        "uniform mat4 viewMatrix;",
        "uniform vec3 cameraPosition;",
        "uniform bool isOrthographic;",
        t.toneMapping !== ir ? "#define TONE_MAPPING" : "",
        t.toneMapping !== ir ? ot.tonemapping_pars_fragment : "",
        t.toneMapping !== ir ? Jm("toneMapping", t.toneMapping) : "",
        t.dithering ? "#define DITHERING" : "",
        t.opaque ? "#define OPAQUE" : "",
        ot.colorspace_pars_fragment,
        Km("linearToOutputTexel", t.outputColorSpace),
        $m(),
        t.useDepthPacking ? "#define DEPTH_PACKING " + t.depthPacking : "",
        `
`,
      ].filter(ra).join(`
`))),
    (a = _h(a)),
    (a = jd(a, t)),
    (a = qd(a, t)),
    (o = _h(o)),
    (o = jd(o, t)),
    (o = qd(o, t)),
    (a = Yd(a)),
    (o = Yd(o)),
    t.isRawShaderMaterial !== !0 &&
      ((m = `#version 300 es
`),
      (v =
        [f, "#define attribute in", "#define varying out", "#define texture2D texture"].join(`
`) +
        `
` +
        v),
      (d =
        [
          "#define varying in",
          t.glslVersion === GLSL3 ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
          t.glslVersion === GLSL3 ? "" : "#define gl_FragColor pc_fragColor",
          "#define gl_FragDepthEXT gl_FragDepth",
          "#define texture2D texture",
          "#define textureCube texture",
          "#define texture2DProj textureProj",
          "#define texture2DLodEXT textureLod",
          "#define texture2DProjLodEXT textureProjLod",
          "#define textureCubeLodEXT textureLod",
          "#define texture2DGradEXT textureGrad",
          "#define texture2DProjGradEXT textureProjGrad",
          "#define textureCubeGradEXT textureGrad",
        ].join(`
`) +
        `
` +
        d)));
  let x = m + v + a,
    b = m + d + o,
    w = Wd(r, r.VERTEX_SHADER, x),
    A = Wd(r, r.FRAGMENT_SHADER, b);
  function C(W) {
    if (n.debug.checkShaderErrors) {
      let B = r.getProgramInfoLog(y).trim(),
        $ = r.getShaderInfoLog(w).trim(),
        Z = r.getShaderInfoLog(A).trim(),
        ie = !0,
        ae = !0;
      if (r.getProgramParameter(y, r.LINK_STATUS) === !1) {
        if (((ie = !1), typeof n.debug.onShaderError == "function")) n.debug.onShaderError(r, y, w, A);
        else {
          let me = Xd(r, w, "vertex"),
            ve = Xd(r, A, "fragment");
          console.error(
            "THREE.WebGLProgram: Shader Error " +
              r.getError() +
              " - VALIDATE_STATUS " +
              r.getProgramParameter(y, r.VALIDATE_STATUS) +
              `

Material Name: ` +
              W.name +
              `
Material Type: ` +
              W.type +
              `

Program Info Log: ` +
              B +
              `
` +
              me +
              `
` +
              ve,
          );
        }
      } else
        B !== "" ? console.warn("THREE.WebGLProgram: Program Info Log:", B) : ($ !== "" && Z !== "") || (ae = !1);
      ae &&
        (W.diagnostics = {
          runnable: ie,
          programLog: B,
          vertexShader: {
            log: $,
            prefix: v,
          },
          fragmentShader: {
            log: Z,
            prefix: d,
          },
        });
    }
    (r.deleteShader(w),
      r.deleteShader(A),
      (F = new hs(r, y)),
      (N = (function (B, $) {
        let Z = {},
          ie = B.getProgramParameter($, B.ACTIVE_ATTRIBUTES);
        for (let ae = 0; ae < ie; ae++) {
          let me = B.getActiveAttrib($, ae),
            ve = me.name,
            Ee = 1;
          (me.type === B.FLOAT_MAT2 && (Ee = 2),
            me.type === B.FLOAT_MAT3 && (Ee = 3),
            me.type === B.FLOAT_MAT4 && (Ee = 4),
            (Z[ve] = {
              type: me.type,
              location: B.getAttribLocation($, ve),
              locationSize: Ee,
            }));
        }
        return Z;
      })(r, y)));
  }
  let F, N;
  (r.attachShader(y, w),
    r.attachShader(y, A),
    t.index0AttributeName !== void 0
      ? r.bindAttribLocation(y, 0, t.index0AttributeName)
      : t.morphTargets === !0 && r.bindAttribLocation(y, 0, "position"),
    r.linkProgram(y),
    (this.getUniforms = function () {
      return (F === void 0 && C(this), F);
    }),
    (this.getAttributes = function () {
      return (N === void 0 && C(this), N);
    }));
  let G = t.rendererExtensionParallelShaderCompile === !1;
  return (
    (this.isReady = function () {
      return (G === !1 && (G = r.getProgramParameter(y, Ym)), G);
    }),
    (this.destroy = function () {
      (i.releaseStatesOfProgram(this), r.deleteProgram(y), (this.program = void 0));
    }),
    (this.type = t.shaderType),
    (this.name = t.shaderName),
    (this.id = Zm++),
    (this.cacheKey = e),
    (this.usedTimes = 1),
    (this.program = y),
    (this.vertexShader = w),
    (this.fragmentShader = A),
    this
  );
}
var sg = 0,
  bh = class {
    constructor() {
      ((this.shaderCache = new Map()), (this.materialCache = new Map()));
    }
    update(e) {
      let t = e.vertexShader,
        i = e.fragmentShader,
        r = this._getShaderStage(t),
        s = this._getShaderStage(i),
        a = this._getShaderCacheForMaterial(e);
      return (a.has(r) === !1 && (a.add(r), r.usedTimes++), a.has(s) === !1 && (a.add(s), s.usedTimes++), this);
    }
    remove(e) {
      let t = this.materialCache.get(e);
      for (let i of t) (i.usedTimes--, i.usedTimes === 0 && this.shaderCache.delete(i.code));
      return (this.materialCache.delete(e), this);
    }
    getVertexShaderID(e) {
      return this._getShaderStage(e.vertexShader).id;
    }
    getFragmentShaderID(e) {
      return this._getShaderStage(e.fragmentShader).id;
    }
    dispose() {
      (this.shaderCache.clear(), this.materialCache.clear());
    }
    _getShaderCacheForMaterial(e) {
      let t = this.materialCache,
        i = t.get(e);
      return (i === void 0 && ((i = new Set()), t.set(e, i)), i);
    }
    _getShaderStage(e) {
      let t = this.shaderCache,
        i = t.get(e);
      return (i === void 0 && ((i = new Mh(e)), t.set(e, i)), i);
    }
  },
  Mh = class {
    constructor(e) {
      ((this.id = sg++), (this.code = e), (this.usedTimes = 0));
    }
  };
function ag(n, e, t, i, r, s, a) {
  let o = new Wo(),
    c = new bh(),
    l = new Set(),
    h = [],
    p = r.logarithmicDepthBuffer,
    u = r.reverseDepthBuffer,
    f = r.vertexTextures,
    g = r.precision,
    y = {
      MeshDepthMaterial: "depth",
      MeshDistanceMaterial: "distanceRGBA",
      MeshNormalMaterial: "normal",
      MeshBasicMaterial: "basic",
      MeshLambertMaterial: "lambert",
      MeshPhongMaterial: "phong",
      MeshToonMaterial: "toon",
      MeshStandardMaterial: "physical",
      MeshPhysicalMaterial: "physical",
      MeshMatcapMaterial: "matcap",
      LineBasicMaterial: "basic",
      LineDashedMaterial: "dashed",
      PointsMaterial: "points",
      ShadowMaterial: "shadow",
      SpriteMaterial: "sprite",
    };
  function v(d) {
    return (l.add(d), d === 0 ? "uv" : `uv${d}`);
  }
  return {
    getParameters: function (d, m, x, b, w) {
      let A = b.fog,
        C = w.geometry,
        F = d.isMeshStandardMaterial ? b.environment : null,
        N = (d.isMeshStandardMaterial ? t : e).get(d.envMap || F),
        G = N && N.mapping === CubeUVReflectionMapping ? N.image.height : null,
        W = y[d.type];
      d.precision !== null &&
        ((g = r.getMaxPrecision(d.precision)),
        g !== d.precision &&
          console.warn("THREE.WebGLProgram.getParameters:", d.precision, "not supported, using", g, "instead."));
      let B = C.morphAttributes.position || C.morphAttributes.normal || C.morphAttributes.color,
        $ = B !== void 0 ? B.length : 0,
        Z,
        ie,
        ae,
        me,
        ve = 0;
      if (
        (C.morphAttributes.position !== void 0 && (ve = 1),
        C.morphAttributes.normal !== void 0 && (ve = 2),
        C.morphAttributes.color !== void 0 && (ve = 3),
        W)
      ) {
        let le = vn[W];
        ((Z = le.vertexShader), (ie = le.fragmentShader));
      } else
        ((Z = d.vertexShader),
          (ie = d.fragmentShader),
          c.update(d),
          (ae = c.getVertexShaderID(d)),
          (me = c.getFragmentShaderID(d)));
      let Ee = n.getRenderTarget(),
        Ue = w.isInstancedMesh === !0,
        pe = w.isBatchedMesh === !0,
        ge = !!d.map,
        Re = !!d.matcap,
        Ae = !!N,
        U = !!d.aoMap,
        R = !!d.lightMap,
        q = !!d.bumpMap,
        Q = !!d.normalMap,
        O = !!d.displacementMap,
        z = !!d.emissiveMap,
        P = !!d.metalnessMap,
        X = !!d.roughnessMap,
        V = d.anisotropy > 0,
        re = d.clearcoat > 0,
        Y = d.dispersion > 0,
        he = d.iridescence > 0,
        fe = d.sheen > 0,
        de = d.transmission > 0,
        Ce = V && !!d.anisotropyMap,
        Pe = re && !!d.clearcoatMap,
        Ne = re && !!d.clearcoatNormalMap,
        je = re && !!d.clearcoatRoughnessMap,
        rt = he && !!d.iridescenceMap,
        Ke = he && !!d.iridescenceThicknessMap,
        Le = fe && !!d.sheenColorMap,
        Oe = fe && !!d.sheenRoughnessMap,
        xt = !!d.specularMap,
        ht = !!d.specularColorMap,
        Ie = !!d.specularIntensityMap,
        Je = de && !!d.transmissionMap,
        yt = de && !!d.thicknessMap,
        gn = !!d.gradientMap,
        Mi = !!d.alphaMap,
        qt = d.alphaTest > 0,
        Si = !!d.alphaHash,
        Ri = !!d.extensions,
        j = ir;
      d.toneMapped && ((Ee !== null && Ee.isXRRenderTarget !== !0) || (j = n.toneMapping));
      let Yi = {
        shaderID: W,
        shaderType: d.type,
        shaderName: d.name,
        vertexShader: Z,
        fragmentShader: ie,
        defines: d.defines,
        customVertexShaderID: ae,
        customFragmentShaderID: me,
        isRawShaderMaterial: d.isRawShaderMaterial === !0,
        glslVersion: d.glslVersion,
        precision: g,
        batching: pe,
        batchingColor: pe && w._colorsTexture !== null,
        instancing: Ue,
        instancingColor: Ue && w.instanceColor !== null,
        instancingMorph: Ue && w.morphTexture !== null,
        supportsVertexTextures: f,
        outputColorSpace:
          Ee === null
            ? n.outputColorSpace
            : Ee.isXRRenderTarget === !0
              ? Ee.texture.colorSpace
              : LinearSRGBColorSpace,
        alphaToCoverage: !!d.alphaToCoverage,
        map: ge,
        matcap: Re,
        envMap: Ae,
        envMapMode: Ae && N.mapping,
        envMapCubeUVHeight: G,
        aoMap: U,
        lightMap: R,
        bumpMap: q,
        normalMap: Q,
        displacementMap: f && O,
        emissiveMap: z,
        normalMapObjectSpace: Q && d.normalMapType === 1,
        normalMapTangentSpace: Q && d.normalMapType === 0,
        metalnessMap: P,
        roughnessMap: X,
        anisotropy: V,
        anisotropyMap: Ce,
        clearcoat: re,
        clearcoatMap: Pe,
        clearcoatNormalMap: Ne,
        clearcoatRoughnessMap: je,
        dispersion: Y,
        iridescence: he,
        iridescenceMap: rt,
        iridescenceThicknessMap: Ke,
        sheen: fe,
        sheenColorMap: Le,
        sheenRoughnessMap: Oe,
        specularMap: xt,
        specularColorMap: ht,
        specularIntensityMap: Ie,
        transmission: de,
        transmissionMap: Je,
        thicknessMap: yt,
        gradientMap: gn,
        opaque: d.transparent === !1 && d.blending === 1 && d.alphaToCoverage === !1,
        alphaMap: Mi,
        alphaTest: qt,
        alphaHash: Si,
        combine: d.combine,
        mapUv: ge && v(d.map.channel),
        aoMapUv: U && v(d.aoMap.channel),
        lightMapUv: R && v(d.lightMap.channel),
        bumpMapUv: q && v(d.bumpMap.channel),
        normalMapUv: Q && v(d.normalMap.channel),
        displacementMapUv: O && v(d.displacementMap.channel),
        emissiveMapUv: z && v(d.emissiveMap.channel),
        metalnessMapUv: P && v(d.metalnessMap.channel),
        roughnessMapUv: X && v(d.roughnessMap.channel),
        anisotropyMapUv: Ce && v(d.anisotropyMap.channel),
        clearcoatMapUv: Pe && v(d.clearcoatMap.channel),
        clearcoatNormalMapUv: Ne && v(d.clearcoatNormalMap.channel),
        clearcoatRoughnessMapUv: je && v(d.clearcoatRoughnessMap.channel),
        iridescenceMapUv: rt && v(d.iridescenceMap.channel),
        iridescenceThicknessMapUv: Ke && v(d.iridescenceThicknessMap.channel),
        sheenColorMapUv: Le && v(d.sheenColorMap.channel),
        sheenRoughnessMapUv: Oe && v(d.sheenRoughnessMap.channel),
        specularMapUv: xt && v(d.specularMap.channel),
        specularColorMapUv: ht && v(d.specularColorMap.channel),
        specularIntensityMapUv: Ie && v(d.specularIntensityMap.channel),
        transmissionMapUv: Je && v(d.transmissionMap.channel),
        thicknessMapUv: yt && v(d.thicknessMap.channel),
        alphaMapUv: Mi && v(d.alphaMap.channel),
        vertexTangents: !!C.attributes.tangent && (Q || V),
        vertexColors: d.vertexColors,
        vertexAlphas: d.vertexColors === !0 && !!C.attributes.color && C.attributes.color.itemSize === 4,
        pointsUvs: w.isPoints === !0 && !!C.attributes.uv && (ge || Mi),
        fog: !!A,
        useFog: d.fog === !0,
        fogExp2: !!A && A.isFogExp2,
        flatShading: d.flatShading === !0,
        sizeAttenuation: d.sizeAttenuation === !0,
        logarithmicDepthBuffer: p,
        reverseDepthBuffer: u,
        skinning: w.isSkinnedMesh === !0,
        morphTargets: C.morphAttributes.position !== void 0,
        morphNormals: C.morphAttributes.normal !== void 0,
        morphColors: C.morphAttributes.color !== void 0,
        morphTargetsCount: $,
        morphTextureStride: ve,
        numDirLights: m.directional.length,
        numPointLights: m.point.length,
        numSpotLights: m.spot.length,
        numSpotLightMaps: m.spotLightMap.length,
        numRectAreaLights: m.rectArea.length,
        numHemiLights: m.hemi.length,
        numDirLightShadows: m.directionalShadowMap.length,
        numPointLightShadows: m.pointShadowMap.length,
        numSpotLightShadows: m.spotShadowMap.length,
        numSpotLightShadowsWithMaps: m.numSpotLightShadowsWithMaps,
        numLightProbes: m.numLightProbes,
        numClippingPlanes: a.numPlanes,
        numClipIntersection: a.numIntersection,
        dithering: d.dithering,
        shadowMapEnabled: n.shadowMap.enabled && x.length > 0,
        shadowMapType: n.shadowMap.type,
        toneMapping: j,
        decodeVideoTexture: ge && d.map.isVideoTexture === !0 && Mt.getTransfer(d.map.colorSpace) === Nt,
        premultipliedAlpha: d.premultipliedAlpha,
        doubleSided: d.side === 2,
        flipSided: d.side === ai,
        useDepthPacking: d.depthPacking >= 0,
        depthPacking: d.depthPacking || 0,
        index0AttributeName: d.index0AttributeName,
        extensionClipCullDistance: Ri && d.extensions.clipCullDistance === !0 && i.has("WEBGL_clip_cull_distance"),
        extensionMultiDraw: ((Ri && d.extensions.multiDraw === !0) || pe) && i.has("WEBGL_multi_draw"),
        rendererExtensionParallelShaderCompile: i.has("KHR_parallel_shader_compile"),
        customProgramCacheKey: d.customProgramCacheKey(),
      };
      return ((Yi.vertexUv1s = l.has(1)), (Yi.vertexUv2s = l.has(2)), (Yi.vertexUv3s = l.has(3)), l.clear(), Yi);
    },
    getProgramCacheKey: function (d) {
      let m = [];
      if (
        (d.shaderID ? m.push(d.shaderID) : (m.push(d.customVertexShaderID), m.push(d.customFragmentShaderID)),
        d.defines !== void 0)
      )
        for (let x in d.defines) (m.push(x), m.push(d.defines[x]));
      return (
        d.isRawShaderMaterial === !1 &&
          ((function (x, b) {
            (x.push(b.precision),
              x.push(b.outputColorSpace),
              x.push(b.envMapMode),
              x.push(b.envMapCubeUVHeight),
              x.push(b.mapUv),
              x.push(b.alphaMapUv),
              x.push(b.lightMapUv),
              x.push(b.aoMapUv),
              x.push(b.bumpMapUv),
              x.push(b.normalMapUv),
              x.push(b.displacementMapUv),
              x.push(b.emissiveMapUv),
              x.push(b.metalnessMapUv),
              x.push(b.roughnessMapUv),
              x.push(b.anisotropyMapUv),
              x.push(b.clearcoatMapUv),
              x.push(b.clearcoatNormalMapUv),
              x.push(b.clearcoatRoughnessMapUv),
              x.push(b.iridescenceMapUv),
              x.push(b.iridescenceThicknessMapUv),
              x.push(b.sheenColorMapUv),
              x.push(b.sheenRoughnessMapUv),
              x.push(b.specularMapUv),
              x.push(b.specularColorMapUv),
              x.push(b.specularIntensityMapUv),
              x.push(b.transmissionMapUv),
              x.push(b.thicknessMapUv),
              x.push(b.combine),
              x.push(b.fogExp2),
              x.push(b.sizeAttenuation),
              x.push(b.morphTargetsCount),
              x.push(b.morphAttributeCount),
              x.push(b.numDirLights),
              x.push(b.numPointLights),
              x.push(b.numSpotLights),
              x.push(b.numSpotLightMaps),
              x.push(b.numHemiLights),
              x.push(b.numRectAreaLights),
              x.push(b.numDirLightShadows),
              x.push(b.numPointLightShadows),
              x.push(b.numSpotLightShadows),
              x.push(b.numSpotLightShadowsWithMaps),
              x.push(b.numLightProbes),
              x.push(b.shadowMapType),
              x.push(b.toneMapping),
              x.push(b.numClippingPlanes),
              x.push(b.numClipIntersection),
              x.push(b.depthPacking));
          })(m, d),
          (function (x, b) {
            (o.disableAll(),
              b.supportsVertexTextures && o.enable(0),
              b.instancing && o.enable(1),
              b.instancingColor && o.enable(2),
              b.instancingMorph && o.enable(3),
              b.matcap && o.enable(4),
              b.envMap && o.enable(5),
              b.normalMapObjectSpace && o.enable(6),
              b.normalMapTangentSpace && o.enable(7),
              b.clearcoat && o.enable(8),
              b.iridescence && o.enable(9),
              b.alphaTest && o.enable(10),
              b.vertexColors && o.enable(11),
              b.vertexAlphas && o.enable(12),
              b.vertexUv1s && o.enable(13),
              b.vertexUv2s && o.enable(14),
              b.vertexUv3s && o.enable(15),
              b.vertexTangents && o.enable(16),
              b.anisotropy && o.enable(17),
              b.alphaHash && o.enable(18),
              b.batching && o.enable(19),
              b.dispersion && o.enable(20),
              b.batchingColor && o.enable(21),
              x.push(o.mask),
              o.disableAll(),
              b.fog && o.enable(0),
              b.useFog && o.enable(1),
              b.flatShading && o.enable(2),
              b.logarithmicDepthBuffer && o.enable(3),
              b.reverseDepthBuffer && o.enable(4),
              b.skinning && o.enable(5),
              b.morphTargets && o.enable(6),
              b.morphNormals && o.enable(7),
              b.morphColors && o.enable(8),
              b.premultipliedAlpha && o.enable(9),
              b.shadowMapEnabled && o.enable(10),
              b.doubleSided && o.enable(11),
              b.flipSided && o.enable(12),
              b.useDepthPacking && o.enable(13),
              b.dithering && o.enable(14),
              b.transmission && o.enable(15),
              b.sheen && o.enable(16),
              b.opaque && o.enable(17),
              b.pointsUvs && o.enable(18),
              b.decodeVideoTexture && o.enable(19),
              b.alphaToCoverage && o.enable(20),
              x.push(o.mask));
          })(m, d),
          m.push(n.outputColorSpace)),
        m.push(d.customProgramCacheKey),
        m.join()
      );
    },
    getUniforms: function (d) {
      let m = y[d.type],
        x;
      if (m) {
        let b = vn[m];
        x = X0.clone(b.uniforms);
      } else x = d.uniforms;
      return x;
    },
    acquireProgram: function (d, m) {
      let x;
      for (let b = 0, w = h.length; b < w; b++) {
        let A = h[b];
        if (A.cacheKey === m) {
          ((x = A), ++x.usedTimes);
          break;
        }
      }
      return (x === void 0 && ((x = new rg(n, m, d, s)), h.push(x)), x);
    },
    releaseProgram: function (d) {
      if (--d.usedTimes == 0) {
        let m = h.indexOf(d);
        ((h[m] = h[h.length - 1]), h.pop(), d.destroy());
      }
    },
    releaseShaderCache: function (d) {
      c.remove(d);
    },
    programs: h,
    dispose: function () {
      c.dispose();
    },
  };
}
function og() {
  let n = new WeakMap();
  return {
    has: function (e) {
      return n.has(e);
    },
    get: function (e) {
      let t = n.get(e);
      return (t === void 0 && ((t = {}), n.set(e, t)), t);
    },
    remove: function (e) {
      n.delete(e);
    },
    update: function (e, t, i) {
      n.get(e)[t] = i;
    },
    dispose: function () {
      n = new WeakMap();
    },
  };
}
function lg(n, e) {
  return n.groupOrder !== e.groupOrder
    ? n.groupOrder - e.groupOrder
    : n.renderOrder !== e.renderOrder
      ? n.renderOrder - e.renderOrder
      : n.material.id !== e.material.id
        ? n.material.id - e.material.id
        : n.z !== e.z
          ? n.z - e.z
          : n.id - e.id;
}
function Kd(n, e) {
  return n.groupOrder !== e.groupOrder
    ? n.groupOrder - e.groupOrder
    : n.renderOrder !== e.renderOrder
      ? n.renderOrder - e.renderOrder
      : n.z !== e.z
        ? e.z - n.z
        : n.id - e.id;
}
function Jd() {
  let n = [],
    e = 0,
    t = [],
    i = [],
    r = [];
  function s(a, o, c, l, h, p) {
    let u = n[e];
    return (
      u === void 0
        ? ((u = {
            id: a.id,
            object: a,
            geometry: o,
            material: c,
            groupOrder: l,
            renderOrder: a.renderOrder,
            z: h,
            group: p,
          }),
          (n[e] = u))
        : ((u.id = a.id),
          (u.object = a),
          (u.geometry = o),
          (u.material = c),
          (u.groupOrder = l),
          (u.renderOrder = a.renderOrder),
          (u.z = h),
          (u.group = p)),
      e++,
      u
    );
  }
  return {
    opaque: t,
    transmissive: i,
    transparent: r,
    init: function () {
      ((e = 0), (t.length = 0), (i.length = 0), (r.length = 0));
    },
    push: function (a, o, c, l, h, p) {
      let u = s(a, o, c, l, h, p);
      c.transmission > 0 ? i.push(u) : c.transparent === !0 ? r.push(u) : t.push(u);
    },
    unshift: function (a, o, c, l, h, p) {
      let u = s(a, o, c, l, h, p);
      c.transmission > 0 ? i.unshift(u) : c.transparent === !0 ? r.unshift(u) : t.unshift(u);
    },
    finish: function () {
      for (let a = e, o = n.length; a < o; a++) {
        let c = n[a];
        if (c.id === null) break;
        ((c.id = null), (c.object = null), (c.geometry = null), (c.material = null), (c.group = null));
      }
    },
    sort: function (a, o) {
      (t.length > 1 && t.sort(a || lg), i.length > 1 && i.sort(o || Kd), r.length > 1 && r.sort(o || Kd));
    },
  };
}
function cg() {
  let n = new WeakMap();
  return {
    get: function (e, t) {
      let i = n.get(e),
        r;
      return (
        i === void 0 ? ((r = new Jd()), n.set(e, [r])) : t >= i.length ? ((r = new Jd()), i.push(r)) : (r = i[t]),
        r
      );
    },
    dispose: function () {
      n = new WeakMap();
    },
  };
}
function hg() {
  let n = {};
  return {
    get: function (e) {
      if (n[e.id] !== void 0) return n[e.id];
      let t;
      switch (e.type) {
        case "DirectionalLight":
          t = {
            direction: new Vector3(),
            color: new Color(),
          };
          break;
        case "SpotLight":
          t = {
            position: new Vector3(),
            direction: new Vector3(),
            color: new Color(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0,
          };
          break;
        case "PointLight":
          t = {
            position: new Vector3(),
            color: new Color(),
            distance: 0,
            decay: 0,
          };
          break;
        case "HemisphereLight":
          t = {
            direction: new Vector3(),
            skyColor: new Color(),
            groundColor: new Color(),
          };
          break;
        case "RectAreaLight":
          t = {
            color: new Color(),
            position: new Vector3(),
            halfWidth: new Vector3(),
            halfHeight: new Vector3(),
          };
      }
      return ((n[e.id] = t), t);
    },
  };
}
var ug = 0;
function dg(n, e) {
  return (e.castShadow ? 2 : 0) - (n.castShadow ? 2 : 0) + (e.map ? 1 : 0) - (n.map ? 1 : 0);
}
function pg(n) {
  let e = new hg(),
    t = (function () {
      let o = {};
      return {
        get: function (c) {
          if (o[c.id] !== void 0) return o[c.id];
          let l;
          switch (c.type) {
            case "DirectionalLight":
            case "SpotLight":
              l = {
                shadowIntensity: 1,
                shadowBias: 0,
                shadowNormalBias: 0,
                shadowRadius: 1,
                shadowMapSize: new Vector2(),
              };
              break;
            case "PointLight":
              l = {
                shadowIntensity: 1,
                shadowBias: 0,
                shadowNormalBias: 0,
                shadowRadius: 1,
                shadowMapSize: new Vector2(),
                shadowCameraNear: 1,
                shadowCameraFar: 1e3,
              };
          }
          return ((o[c.id] = l), l);
        },
      };
    })(),
    i = {
      version: 0,
      hash: {
        directionalLength: -1,
        pointLength: -1,
        spotLength: -1,
        rectAreaLength: -1,
        hemiLength: -1,
        numDirectionalShadows: -1,
        numPointShadows: -1,
        numSpotShadows: -1,
        numSpotMaps: -1,
        numLightProbes: -1,
      },
      ambient: [0, 0, 0],
      probe: [],
      directional: [],
      directionalShadow: [],
      directionalShadowMap: [],
      directionalShadowMatrix: [],
      spot: [],
      spotLightMap: [],
      spotShadow: [],
      spotShadowMap: [],
      spotLightMatrix: [],
      rectArea: [],
      rectAreaLTC1: null,
      rectAreaLTC2: null,
      point: [],
      pointShadow: [],
      pointShadowMap: [],
      pointShadowMatrix: [],
      hemi: [],
      numSpotLightShadowsWithMaps: 0,
      numLightProbes: 0,
    };
  for (let o = 0; o < 9; o++) i.probe.push(new Vector3());
  let r = new Vector3(),
    s = new Matrix4(),
    a = new Matrix4();
  return {
    setup: function (o) {
      let c = 0,
        l = 0,
        h = 0;
      for (let C = 0; C < 9; C++) i.probe[C].set(0, 0, 0);
      let p = 0,
        u = 0,
        f = 0,
        g = 0,
        y = 0,
        v = 0,
        d = 0,
        m = 0,
        x = 0,
        b = 0,
        w = 0;
      o.sort(dg);
      for (let C = 0, F = o.length; C < F; C++) {
        let N = o[C],
          G = N.color,
          W = N.intensity,
          B = N.distance,
          $ = N.shadow && N.shadow.map ? N.shadow.map.texture : null;
        if (N.isAmbientLight) ((c += G.r * W), (l += G.g * W), (h += G.b * W));
        else if (N.isLightProbe) {
          for (let Z = 0; Z < 9; Z++) i.probe[Z].addScaledVector(N.sh.coefficients[Z], W);
          w++;
        } else if (N.isDirectionalLight) {
          let Z = e.get(N);
          if ((Z.color.copy(N.color).multiplyScalar(N.intensity), N.castShadow)) {
            let ie = N.shadow,
              ae = t.get(N);
            ((ae.shadowIntensity = ie.intensity),
              (ae.shadowBias = ie.bias),
              (ae.shadowNormalBias = ie.normalBias),
              (ae.shadowRadius = ie.radius),
              (ae.shadowMapSize = ie.mapSize),
              (i.directionalShadow[p] = ae),
              (i.directionalShadowMap[p] = $),
              (i.directionalShadowMatrix[p] = N.shadow.matrix),
              v++);
          }
          ((i.directional[p] = Z), p++);
        } else if (N.isSpotLight) {
          let Z = e.get(N);
          (Z.position.setFromMatrixPosition(N.matrixWorld),
            Z.color.copy(G).multiplyScalar(W),
            (Z.distance = B),
            (Z.coneCos = Math.cos(N.angle)),
            (Z.penumbraCos = Math.cos(N.angle * (1 - N.penumbra))),
            (Z.decay = N.decay),
            (i.spot[f] = Z));
          let ie = N.shadow;
          if (
            (N.map && ((i.spotLightMap[x] = N.map), x++, ie.updateMatrices(N), N.castShadow && b++),
            (i.spotLightMatrix[f] = ie.matrix),
            N.castShadow)
          ) {
            let ae = t.get(N);
            ((ae.shadowIntensity = ie.intensity),
              (ae.shadowBias = ie.bias),
              (ae.shadowNormalBias = ie.normalBias),
              (ae.shadowRadius = ie.radius),
              (ae.shadowMapSize = ie.mapSize),
              (i.spotShadow[f] = ae),
              (i.spotShadowMap[f] = $),
              m++);
          }
          f++;
        } else if (N.isRectAreaLight) {
          let Z = e.get(N);
          (Z.color.copy(G).multiplyScalar(W),
            Z.halfWidth.set(0.5 * N.width, 0, 0),
            Z.halfHeight.set(0, 0.5 * N.height, 0),
            (i.rectArea[g] = Z),
            g++);
        } else if (N.isPointLight) {
          let Z = e.get(N);
          if (
            (Z.color.copy(N.color).multiplyScalar(N.intensity),
            (Z.distance = N.distance),
            (Z.decay = N.decay),
            N.castShadow)
          ) {
            let ie = N.shadow,
              ae = t.get(N);
            ((ae.shadowIntensity = ie.intensity),
              (ae.shadowBias = ie.bias),
              (ae.shadowNormalBias = ie.normalBias),
              (ae.shadowRadius = ie.radius),
              (ae.shadowMapSize = ie.mapSize),
              (ae.shadowCameraNear = ie.camera.near),
              (ae.shadowCameraFar = ie.camera.far),
              (i.pointShadow[u] = ae),
              (i.pointShadowMap[u] = $),
              (i.pointShadowMatrix[u] = N.shadow.matrix),
              d++);
          }
          ((i.point[u] = Z), u++);
        } else if (N.isHemisphereLight) {
          let Z = e.get(N);
          (Z.skyColor.copy(N.color).multiplyScalar(W),
            Z.groundColor.copy(N.groundColor).multiplyScalar(W),
            (i.hemi[y] = Z),
            y++);
        }
      }
      (g > 0 &&
        (n.has("OES_texture_float_linear") === !0
          ? ((i.rectAreaLTC1 = Te.LTC_FLOAT_1), (i.rectAreaLTC2 = Te.LTC_FLOAT_2))
          : ((i.rectAreaLTC1 = Te.LTC_HALF_1), (i.rectAreaLTC2 = Te.LTC_HALF_2))),
        (i.ambient[0] = c),
        (i.ambient[1] = l),
        (i.ambient[2] = h));
      let A = i.hash;
      (A.directionalLength === p &&
        A.pointLength === u &&
        A.spotLength === f &&
        A.rectAreaLength === g &&
        A.hemiLength === y &&
        A.numDirectionalShadows === v &&
        A.numPointShadows === d &&
        A.numSpotShadows === m &&
        A.numSpotMaps === x &&
        A.numLightProbes === w) ||
        ((i.directional.length = p),
        (i.spot.length = f),
        (i.rectArea.length = g),
        (i.point.length = u),
        (i.hemi.length = y),
        (i.directionalShadow.length = v),
        (i.directionalShadowMap.length = v),
        (i.pointShadow.length = d),
        (i.pointShadowMap.length = d),
        (i.spotShadow.length = m),
        (i.spotShadowMap.length = m),
        (i.directionalShadowMatrix.length = v),
        (i.pointShadowMatrix.length = d),
        (i.spotLightMatrix.length = m + x - b),
        (i.spotLightMap.length = x),
        (i.numSpotLightShadowsWithMaps = b),
        (i.numLightProbes = w),
        (A.directionalLength = p),
        (A.pointLength = u),
        (A.spotLength = f),
        (A.rectAreaLength = g),
        (A.hemiLength = y),
        (A.numDirectionalShadows = v),
        (A.numPointShadows = d),
        (A.numSpotShadows = m),
        (A.numSpotMaps = x),
        (A.numLightProbes = w),
        (i.version = ug++));
    },
    setupView: function (o, c) {
      let l = 0,
        h = 0,
        p = 0,
        u = 0,
        f = 0,
        g = c.matrixWorldInverse;
      for (let y = 0, v = o.length; y < v; y++) {
        let d = o[y];
        if (d.isDirectionalLight) {
          let m = i.directional[l];
          (m.direction.setFromMatrixPosition(d.matrixWorld),
            r.setFromMatrixPosition(d.target.matrixWorld),
            m.direction.sub(r),
            m.direction.transformDirection(g),
            l++);
        } else if (d.isSpotLight) {
          let m = i.spot[p];
          (m.position.setFromMatrixPosition(d.matrixWorld),
            m.position.applyMatrix4(g),
            m.direction.setFromMatrixPosition(d.matrixWorld),
            r.setFromMatrixPosition(d.target.matrixWorld),
            m.direction.sub(r),
            m.direction.transformDirection(g),
            p++);
        } else if (d.isRectAreaLight) {
          let m = i.rectArea[u];
          (m.position.setFromMatrixPosition(d.matrixWorld),
            m.position.applyMatrix4(g),
            a.identity(),
            s.copy(d.matrixWorld),
            s.premultiply(g),
            a.extractRotation(s),
            m.halfWidth.set(0.5 * d.width, 0, 0),
            m.halfHeight.set(0, 0.5 * d.height, 0),
            m.halfWidth.applyMatrix4(a),
            m.halfHeight.applyMatrix4(a),
            u++);
        } else if (d.isPointLight) {
          let m = i.point[h];
          (m.position.setFromMatrixPosition(d.matrixWorld), m.position.applyMatrix4(g), h++);
        } else if (d.isHemisphereLight) {
          let m = i.hemi[f];
          (m.direction.setFromMatrixPosition(d.matrixWorld), m.direction.transformDirection(g), f++);
        }
      }
    },
    state: i,
  };
}
function $d(n) {
  let e = new pg(n),
    t = [],
    i = [],
    r = {
      lightsArray: t,
      shadowsArray: i,
      camera: null,
      lights: e,
      transmissionRenderTarget: {},
    };
  return {
    init: function (s) {
      ((r.camera = s), (t.length = 0), (i.length = 0));
    },
    state: r,
    setupLights: function () {
      e.setup(t);
    },
    setupLightsView: function (s) {
      e.setupView(t, s);
    },
    pushLight: function (s) {
      t.push(s);
    },
    pushShadow: function (s) {
      i.push(s);
    },
  };
}
function fg(n) {
  let e = new WeakMap();
  return {
    get: function (t, i = 0) {
      let r = e.get(t),
        s;
      return (
        r === void 0 ? ((s = new $d(n)), e.set(t, [s])) : i >= r.length ? ((s = new $d(n)), r.push(s)) : (s = r[i]),
        s
      );
    },
    dispose: function () {
      e = new WeakMap();
    },
  };
}
var MeshDepthMaterial = class extends Material {
    constructor(e) {
      (super(),
        (this.isMeshDepthMaterial = !0),
        (this.type = "MeshDepthMaterial"),
        (this.depthPacking = 3200),
        (this.map = null),
        (this.alphaMap = null),
        (this.displacementMap = null),
        (this.displacementScale = 1),
        (this.displacementBias = 0),
        (this.wireframe = !1),
        (this.wireframeLinewidth = 1),
        this.setValues(e));
    }
    copy(e) {
      return (
        super.copy(e),
        (this.depthPacking = e.depthPacking),
        (this.map = e.map),
        (this.alphaMap = e.alphaMap),
        (this.displacementMap = e.displacementMap),
        (this.displacementScale = e.displacementScale),
        (this.displacementBias = e.displacementBias),
        (this.wireframe = e.wireframe),
        (this.wireframeLinewidth = e.wireframeLinewidth),
        this
      );
    }
  },
  MeshDistanceMaterial = class extends Material {
    constructor(e) {
      (super(),
        (this.isMeshDistanceMaterial = !0),
        (this.type = "MeshDistanceMaterial"),
        (this.map = null),
        (this.alphaMap = null),
        (this.displacementMap = null),
        (this.displacementScale = 1),
        (this.displacementBias = 0),
        this.setValues(e));
    }
    copy(e) {
      return (
        super.copy(e),
        (this.map = e.map),
        (this.alphaMap = e.alphaMap),
        (this.displacementMap = e.displacementMap),
        (this.displacementScale = e.displacementScale),
        (this.displacementBias = e.displacementBias),
        this
      );
    }
  };
function mg(n, e, t) {
  let i = new _s(),
    r = new Vector2(),
    s = new Vector2(),
    a = new Vector4(),
    o = new MeshDepthMaterial({
      depthPacking: 3201,
    }),
    c = new MeshDistanceMaterial(),
    l = {},
    h = t.maxTextureSize,
    p = {
      [Ni]: ai,
      [ai]: Ni,
      2: 2,
    },
    u = new ShaderMaterial({
      defines: {
        VSM_SAMPLES: 8,
      },
      uniforms: {
        shadow_pass: {
          value: null,
        },
        resolution: {
          value: new Vector2(),
        },
        radius: {
          value: 4,
        },
      },
      vertexShader: `void main() {
	gl_Position = vec4( position, 1.0 );
}`,
      fragmentShader: `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`,
    }),
    f = u.clone();
  f.defines.HORIZONTAL_PASS = 1;
  let g = new BufferGeometry();
  g.setAttribute("position", new BufferAttribute(new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]), 3));
  let y = new Mesh(g, u),
    v = this;
  ((this.enabled = !1), (this.autoUpdate = !0), (this.needsUpdate = !1), (this.type = fp));
  let d = this.type;
  function m(A, C) {
    let F = e.update(y);
    (u.defines.VSM_SAMPLES !== A.blurSamples &&
      ((u.defines.VSM_SAMPLES = A.blurSamples),
      (f.defines.VSM_SAMPLES = A.blurSamples),
      (u.needsUpdate = !0),
      (f.needsUpdate = !0)),
      A.mapPass === null && (A.mapPass = new WebGLRenderTarget(r.x, r.y)),
      (u.uniforms.shadow_pass.value = A.map.texture),
      (u.uniforms.resolution.value = A.mapSize),
      (u.uniforms.radius.value = A.radius),
      n.setRenderTarget(A.mapPass),
      n.clear(),
      n.renderBufferDirect(C, null, F, u, y, null),
      (f.uniforms.shadow_pass.value = A.mapPass.texture),
      (f.uniforms.resolution.value = A.mapSize),
      (f.uniforms.radius.value = A.radius),
      n.setRenderTarget(A.map),
      n.clear(),
      n.renderBufferDirect(C, null, F, f, y, null));
  }
  function x(A, C, F, N) {
    let G = null,
      W = F.isPointLight === !0 ? A.customDistanceMaterial : A.customDepthMaterial;
    if (W !== void 0) G = W;
    else if (
      ((G = F.isPointLight === !0 ? c : o),
      (n.localClippingEnabled &&
        C.clipShadows === !0 &&
        Array.isArray(C.clippingPlanes) &&
        C.clippingPlanes.length !== 0) ||
        (C.displacementMap && C.displacementScale !== 0) ||
        (C.alphaMap && C.alphaTest > 0) ||
        (C.map && C.alphaTest > 0))
    ) {
      let B = G.uuid,
        $ = C.uuid,
        Z = l[B];
      Z === void 0 && ((Z = {}), (l[B] = Z));
      let ie = Z[$];
      (ie === void 0 && ((ie = G.clone()), (Z[$] = ie), C.addEventListener("dispose", w)), (G = ie));
    }
    return (
      (G.visible = C.visible),
      (G.wireframe = C.wireframe),
      (G.side =
        N === Nn
          ? C.shadowSide !== null
            ? C.shadowSide
            : C.side
          : C.shadowSide !== null
            ? C.shadowSide
            : p[C.side]),
      (G.alphaMap = C.alphaMap),
      (G.alphaTest = C.alphaTest),
      (G.map = C.map),
      (G.clipShadows = C.clipShadows),
      (G.clippingPlanes = C.clippingPlanes),
      (G.clipIntersection = C.clipIntersection),
      (G.displacementMap = C.displacementMap),
      (G.displacementScale = C.displacementScale),
      (G.displacementBias = C.displacementBias),
      (G.wireframeLinewidth = C.wireframeLinewidth),
      (G.linewidth = C.linewidth),
      F.isPointLight === !0 && G.isMeshDistanceMaterial === !0 && (n.properties.get(G).light = F),
      G
    );
  }
  function b(A, C, F, N, G) {
    if (A.visible === !1) return;
    if (
      A.layers.test(C.layers) &&
      (A.isMesh || A.isLine || A.isPoints) &&
      (A.castShadow || (A.receiveShadow && G === Nn)) &&
      (!A.frustumCulled || i.intersectsObject(A))
    ) {
      A.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse, A.matrixWorld);
      let B = e.update(A),
        $ = A.material;
      if (Array.isArray($)) {
        let Z = B.groups;
        for (let ie = 0, ae = Z.length; ie < ae; ie++) {
          let me = Z[ie],
            ve = $[me.materialIndex];
          if (ve && ve.visible) {
            let Ee = x(A, ve, N, G);
            (A.onBeforeShadow(n, A, C, F, B, Ee, me),
              n.renderBufferDirect(F, null, B, Ee, A, me),
              A.onAfterShadow(n, A, C, F, B, Ee, me));
          }
        }
      } else if ($.visible) {
        let Z = x(A, $, N, G);
        (A.onBeforeShadow(n, A, C, F, B, Z, null),
          n.renderBufferDirect(F, null, B, Z, A, null),
          A.onAfterShadow(n, A, C, F, B, Z, null));
      }
    }
    let W = A.children;
    for (let B = 0, $ = W.length; B < $; B++) b(W[B], C, F, N, G);
  }
  function w(A) {
    A.target.removeEventListener("dispose", w);
    for (let C in l) {
      let F = l[C],
        N = A.target.uuid;
      N in F && (F[N].dispose(), delete F[N]);
    }
  }
  this.render = function (A, C, F) {
    if (v.enabled === !1 || (v.autoUpdate === !1 && v.needsUpdate === !1) || A.length === 0) return;
    let N = n.getRenderTarget(),
      G = n.getActiveCubeFace(),
      W = n.getActiveMipmapLevel(),
      B = n.state;
    (B.setBlending(0), B.buffers.color.setClear(1, 1, 1, 1), B.buffers.depth.setTest(!0), B.setScissorTest(!1));
    let $ = d !== Nn && this.type === Nn,
      Z = d === Nn && this.type !== Nn;
    for (let ie = 0, ae = A.length; ie < ae; ie++) {
      let me = A[ie],
        ve = me.shadow;
      if (ve === void 0) {
        console.warn("THREE.WebGLShadowMap:", me, "has no shadow.");
        continue;
      }
      if (ve.autoUpdate === !1 && ve.needsUpdate === !1) continue;
      r.copy(ve.mapSize);
      let Ee = ve.getFrameExtents();
      if (
        (r.multiply(Ee),
        s.copy(ve.mapSize),
        (r.x > h || r.y > h) &&
          (r.x > h && ((s.x = Math.floor(h / Ee.x)), (r.x = s.x * Ee.x), (ve.mapSize.x = s.x)),
          r.y > h && ((s.y = Math.floor(h / Ee.y)), (r.y = s.y * Ee.y), (ve.mapSize.y = s.y))),
        ve.map === null || $ === !0 || Z === !0)
      ) {
        let pe =
          this.type !== Nn
            ? {
                minFilter: NearestFilter,
                magFilter: NearestFilter,
              }
            : {};
        (ve.map !== null && ve.map.dispose(),
          (ve.map = new WebGLRenderTarget(r.x, r.y, pe)),
          (ve.map.texture.name = me.name + ".shadowMap"),
          ve.camera.updateProjectionMatrix());
      }
      (n.setRenderTarget(ve.map), n.clear());
      let Ue = ve.getViewportCount();
      for (let pe = 0; pe < Ue; pe++) {
        let ge = ve.getViewport(pe);
        (a.set(s.x * ge.x, s.y * ge.y, s.x * ge.z, s.y * ge.w),
          B.viewport(a),
          ve.updateMatrices(me, pe),
          (i = ve.getFrustum()),
          b(C, F, ve.camera, me, this.type));
      }
      (ve.isPointLightShadow !== !0 && this.type === Nn && m(ve, F), (ve.needsUpdate = !1));
    }
    ((d = this.type), (v.needsUpdate = !1), n.setRenderTarget(N, G, W));
  };
}
var gg = {
  0: 1,
  2: 6,
  4: 7,
  3: 5,
  1: 0,
  6: 2,
  7: 4,
  5: 3,
};
function vg(n) {
  let e = new (function () {
      let P = !1,
        X = new Vector4(),
        V = null,
        re = new Vector4(0, 0, 0, 0);
      return {
        setMask: function (Y) {
          V === Y || P || (n.colorMask(Y, Y, Y, Y), (V = Y));
        },
        setLocked: function (Y) {
          P = Y;
        },
        setClear: function (Y, he, fe, de, Ce) {
          (Ce === !0 && ((Y *= de), (he *= de), (fe *= de)),
            X.set(Y, he, fe, de),
            re.equals(X) === !1 && (n.clearColor(Y, he, fe, de), re.copy(X)));
        },
        reset: function () {
          ((P = !1), (V = null), re.set(-1, 0, 0, 0));
        },
      };
    })(),
    t = new (function () {
      let P = !1,
        X = !1,
        V = null,
        re = null,
        Y = null;
      return {
        setReversed: function (he) {
          X = he;
        },
        setTest: function (he) {
          he ? Re(n.DEPTH_TEST) : Ae(n.DEPTH_TEST);
        },
        setMask: function (he) {
          V === he || P || (n.depthMask(he), (V = he));
        },
        setFunc: function (he) {
          if ((X && (he = gg[he]), re !== he)) {
            switch (he) {
              case 0:
                n.depthFunc(n.NEVER);
                break;
              case 1:
                n.depthFunc(n.ALWAYS);
                break;
              case 2:
                n.depthFunc(n.LESS);
                break;
              case 3:
              default:
                n.depthFunc(n.LEQUAL);
                break;
              case 4:
                n.depthFunc(n.EQUAL);
                break;
              case 5:
                n.depthFunc(n.GEQUAL);
                break;
              case 6:
                n.depthFunc(n.GREATER);
                break;
              case 7:
                n.depthFunc(n.NOTEQUAL);
            }
            re = he;
          }
        },
        setLocked: function (he) {
          P = he;
        },
        setClear: function (he) {
          Y !== he && (n.clearDepth(he), (Y = he));
        },
        reset: function () {
          ((P = !1), (V = null), (re = null), (Y = null));
        },
      };
    })(),
    i = new (function () {
      let P = !1,
        X = null,
        V = null,
        re = null,
        Y = null,
        he = null,
        fe = null,
        de = null,
        Ce = null;
      return {
        setTest: function (Pe) {
          P || (Pe ? Re(n.STENCIL_TEST) : Ae(n.STENCIL_TEST));
        },
        setMask: function (Pe) {
          X === Pe || P || (n.stencilMask(Pe), (X = Pe));
        },
        setFunc: function (Pe, Ne, je) {
          (V === Pe && re === Ne && Y === je) || (n.stencilFunc(Pe, Ne, je), (V = Pe), (re = Ne), (Y = je));
        },
        setOp: function (Pe, Ne, je) {
          (he === Pe && fe === Ne && de === je) || (n.stencilOp(Pe, Ne, je), (he = Pe), (fe = Ne), (de = je));
        },
        setLocked: function (Pe) {
          P = Pe;
        },
        setClear: function (Pe) {
          Ce !== Pe && (n.clearStencil(Pe), (Ce = Pe));
        },
        reset: function () {
          ((P = !1),
            (X = null),
            (V = null),
            (re = null),
            (Y = null),
            (he = null),
            (fe = null),
            (de = null),
            (Ce = null));
        },
      };
    })(),
    r = new WeakMap(),
    s = new WeakMap(),
    a = {},
    o = {},
    c = new WeakMap(),
    l = [],
    h = null,
    p = !1,
    u = null,
    f = null,
    g = null,
    y = null,
    v = null,
    d = null,
    m = null,
    x = new Color(0, 0, 0),
    b = 0,
    w = !1,
    A = null,
    C = null,
    F = null,
    N = null,
    G = null,
    W = n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),
    B = !1,
    $ = 0,
    Z = n.getParameter(n.VERSION);
  Z.indexOf("WebGL") !== -1
    ? (($ = parseFloat(/^WebGL (\d)/.exec(Z)[1])), (B = $ >= 1))
    : Z.indexOf("OpenGL ES") !== -1 && (($ = parseFloat(/^OpenGL ES (\d)/.exec(Z)[1])), (B = $ >= 2));
  let ie = null,
    ae = {},
    me = n.getParameter(n.SCISSOR_BOX),
    ve = n.getParameter(n.VIEWPORT),
    Ee = new Vector4().fromArray(me),
    Ue = new Vector4().fromArray(ve);
  function pe(P, X, V, re) {
    let Y = new Uint8Array(4),
      he = n.createTexture();
    (n.bindTexture(P, he),
      n.texParameteri(P, n.TEXTURE_MIN_FILTER, n.NEAREST),
      n.texParameteri(P, n.TEXTURE_MAG_FILTER, n.NEAREST));
    for (let fe = 0; fe < V; fe++)
      P === n.TEXTURE_3D || P === n.TEXTURE_2D_ARRAY
        ? n.texImage3D(X, 0, n.RGBA, 1, 1, re, 0, n.RGBA, n.UNSIGNED_BYTE, Y)
        : n.texImage2D(X + fe, 0, n.RGBA, 1, 1, 0, n.RGBA, n.UNSIGNED_BYTE, Y);
    return he;
  }
  let ge = {};
  function Re(P) {
    a[P] !== !0 && (n.enable(P), (a[P] = !0));
  }
  function Ae(P) {
    a[P] !== !1 && (n.disable(P), (a[P] = !1));
  }
  ((ge[n.TEXTURE_2D] = pe(n.TEXTURE_2D, n.TEXTURE_2D, 1)),
    (ge[n.TEXTURE_CUBE_MAP] = pe(n.TEXTURE_CUBE_MAP, n.TEXTURE_CUBE_MAP_POSITIVE_X, 6)),
    (ge[n.TEXTURE_2D_ARRAY] = pe(n.TEXTURE_2D_ARRAY, n.TEXTURE_2D_ARRAY, 1, 1)),
    (ge[n.TEXTURE_3D] = pe(n.TEXTURE_3D, n.TEXTURE_3D, 1, 1)),
    e.setClear(0, 0, 0, 1),
    t.setClear(1),
    i.setClear(0),
    Re(n.DEPTH_TEST),
    t.setFunc(3),
    Q(!1),
    O(1),
    Re(n.CULL_FACE),
    q(0));
  let U = {
    [AddEquation]: n.FUNC_ADD,
    101: n.FUNC_SUBTRACT,
    102: n.FUNC_REVERSE_SUBTRACT,
  };
  ((U[103] = n.MIN), (U[104] = n.MAX));
  let R = {
    200: n.ZERO,
    201: n.ONE,
    202: n.SRC_COLOR,
    [SrcAlphaFactor]: n.SRC_ALPHA,
    210: n.SRC_ALPHA_SATURATE,
    208: n.DST_COLOR,
    206: n.DST_ALPHA,
    203: n.ONE_MINUS_SRC_COLOR,
    [OneMinusSrcAlphaFactor]: n.ONE_MINUS_SRC_ALPHA,
    209: n.ONE_MINUS_DST_COLOR,
    207: n.ONE_MINUS_DST_ALPHA,
    211: n.CONSTANT_COLOR,
    212: n.ONE_MINUS_CONSTANT_COLOR,
    213: n.CONSTANT_ALPHA,
    214: n.ONE_MINUS_CONSTANT_ALPHA,
  };
  function q(P, X, V, re, Y, he, fe, de, Ce, Pe) {
    if (P !== 0) {
      if ((p === !1 && (Re(n.BLEND), (p = !0)), P === 5))
        ((Y = Y || X),
          (he = he || V),
          (fe = fe || re),
          (X === f && Y === v) || (n.blendEquationSeparate(U[X], U[Y]), (f = X), (v = Y)),
          (V === g && re === y && he === d && fe === m) ||
            (n.blendFuncSeparate(R[V], R[re], R[he], R[fe]), (g = V), (y = re), (d = he), (m = fe)),
          (de.equals(x) !== !1 && Ce === b) || (n.blendColor(de.r, de.g, de.b, Ce), x.copy(de), (b = Ce)),
          (u = P),
          (w = !1));
      else if (P !== u || Pe !== w) {
        if (
          ((f === AddEquation && v === AddEquation) ||
            (n.blendEquation(n.FUNC_ADD), (f = AddEquation), (v = AddEquation)),
          Pe)
        )
          switch (P) {
            case 1:
              n.blendFuncSeparate(n.ONE, n.ONE_MINUS_SRC_ALPHA, n.ONE, n.ONE_MINUS_SRC_ALPHA);
              break;
            case 2:
              n.blendFunc(n.ONE, n.ONE);
              break;
            case 3:
              n.blendFuncSeparate(n.ZERO, n.ONE_MINUS_SRC_COLOR, n.ZERO, n.ONE);
              break;
            case 4:
              n.blendFuncSeparate(n.ZERO, n.SRC_COLOR, n.ZERO, n.SRC_ALPHA);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", P);
          }
        else
          switch (P) {
            case 1:
              n.blendFuncSeparate(n.SRC_ALPHA, n.ONE_MINUS_SRC_ALPHA, n.ONE, n.ONE_MINUS_SRC_ALPHA);
              break;
            case 2:
              n.blendFunc(n.SRC_ALPHA, n.ONE);
              break;
            case 3:
              n.blendFuncSeparate(n.ZERO, n.ONE_MINUS_SRC_COLOR, n.ZERO, n.ONE);
              break;
            case 4:
              n.blendFunc(n.ZERO, n.SRC_COLOR);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", P);
          }
        ((g = null), (y = null), (d = null), (m = null), x.set(0, 0, 0), (b = 0), (u = P), (w = Pe));
      }
    } else p === !0 && (Ae(n.BLEND), (p = !1));
  }
  function Q(P) {
    A !== P && (P ? n.frontFace(n.CW) : n.frontFace(n.CCW), (A = P));
  }
  function O(P) {
    (P !== 0
      ? (Re(n.CULL_FACE),
        P !== C && (P === 1 ? n.cullFace(n.BACK) : P === 2 ? n.cullFace(n.FRONT) : n.cullFace(n.FRONT_AND_BACK)))
      : Ae(n.CULL_FACE),
      (C = P));
  }
  function z(P, X, V) {
    P
      ? (Re(n.POLYGON_OFFSET_FILL), (N === X && G === V) || (n.polygonOffset(X, V), (N = X), (G = V)))
      : Ae(n.POLYGON_OFFSET_FILL);
  }
  return {
    buffers: {
      color: e,
      depth: t,
      stencil: i,
    },
    enable: Re,
    disable: Ae,
    bindFramebuffer: function (P, X) {
      return (
        o[P] !== X &&
        (n.bindFramebuffer(P, X),
        (o[P] = X),
        P === n.DRAW_FRAMEBUFFER && (o[n.FRAMEBUFFER] = X),
        P === n.FRAMEBUFFER && (o[n.DRAW_FRAMEBUFFER] = X),
        !0)
      );
    },
    drawBuffers: function (P, X) {
      let V = l,
        re = !1;
      if (P) {
        ((V = c.get(X)), V === void 0 && ((V = []), c.set(X, V)));
        let Y = P.textures;
        if (V.length !== Y.length || V[0] !== n.COLOR_ATTACHMENT0) {
          for (let he = 0, fe = Y.length; he < fe; he++) V[he] = n.COLOR_ATTACHMENT0 + he;
          ((V.length = Y.length), (re = !0));
        }
      } else V[0] !== n.BACK && ((V[0] = n.BACK), (re = !0));
      re && n.drawBuffers(V);
    },
    useProgram: function (P) {
      return h !== P && (n.useProgram(P), (h = P), !0);
    },
    setBlending: q,
    setMaterial: function (P, X) {
      P.side === 2 ? Ae(n.CULL_FACE) : Re(n.CULL_FACE);
      let V = P.side === ai;
      (X && (V = !V),
        Q(V),
        P.blending === 1 && P.transparent === !1
          ? q(0)
          : q(
              P.blending,
              P.blendEquation,
              P.blendSrc,
              P.blendDst,
              P.blendEquationAlpha,
              P.blendSrcAlpha,
              P.blendDstAlpha,
              P.blendColor,
              P.blendAlpha,
              P.premultipliedAlpha,
            ),
        t.setFunc(P.depthFunc),
        t.setTest(P.depthTest),
        t.setMask(P.depthWrite),
        e.setMask(P.colorWrite));
      let re = P.stencilWrite;
      (i.setTest(re),
        re &&
          (i.setMask(P.stencilWriteMask),
          i.setFunc(P.stencilFunc, P.stencilRef, P.stencilFuncMask),
          i.setOp(P.stencilFail, P.stencilZFail, P.stencilZPass)),
        z(P.polygonOffset, P.polygonOffsetFactor, P.polygonOffsetUnits),
        P.alphaToCoverage === !0 ? Re(n.SAMPLE_ALPHA_TO_COVERAGE) : Ae(n.SAMPLE_ALPHA_TO_COVERAGE));
    },
    setFlipSided: Q,
    setCullFace: O,
    setLineWidth: function (P) {
      P !== F && (B && n.lineWidth(P), (F = P));
    },
    setPolygonOffset: z,
    setScissorTest: function (P) {
      P ? Re(n.SCISSOR_TEST) : Ae(n.SCISSOR_TEST);
    },
    activeTexture: function (P) {
      (P === void 0 && (P = n.TEXTURE0 + W - 1), ie !== P && (n.activeTexture(P), (ie = P)));
    },
    bindTexture: function (P, X, V) {
      V === void 0 && (V = ie === null ? n.TEXTURE0 + W - 1 : ie);
      let re = ae[V];
      (re === void 0 &&
        ((re = {
          type: void 0,
          texture: void 0,
        }),
        (ae[V] = re)),
        (re.type === P && re.texture === X) ||
          (ie !== V && (n.activeTexture(V), (ie = V)),
          n.bindTexture(P, X || ge[P]),
          (re.type = P),
          (re.texture = X)));
    },
    unbindTexture: function () {
      let P = ae[ie];
      P !== void 0 && P.type !== void 0 && (n.bindTexture(P.type, null), (P.type = void 0), (P.texture = void 0));
    },
    compressedTexImage2D: function () {
      try {
        n.compressedTexImage2D.apply(n, arguments);
      } catch (P) {
        console.error("THREE.WebGLState:", P);
      }
    },
    compressedTexImage3D: function () {
      try {
        n.compressedTexImage3D.apply(n, arguments);
      } catch (P) {
        console.error("THREE.WebGLState:", P);
      }
    },
    texImage2D: function () {
      try {
        n.texImage2D.apply(n, arguments);
      } catch (P) {
        console.error("THREE.WebGLState:", P);
      }
    },
    texImage3D: function () {
      try {
        n.texImage3D.apply(n, arguments);
      } catch (P) {
        console.error("THREE.WebGLState:", P);
      }
    },
    updateUBOMapping: function (P, X) {
      let V = s.get(X);
      V === void 0 && ((V = new WeakMap()), s.set(X, V));
      let re = V.get(P);
      re === void 0 && ((re = n.getUniformBlockIndex(X, P.name)), V.set(P, re));
    },
    uniformBlockBinding: function (P, X) {
      let V = s.get(X).get(P);
      r.get(X) !== V && (n.uniformBlockBinding(X, V, P.__bindingPointIndex), r.set(X, V));
    },
    texStorage2D: function () {
      try {
        n.texStorage2D.apply(n, arguments);
      } catch (P) {
        console.error("THREE.WebGLState:", P);
      }
    },
    texStorage3D: function () {
      try {
        n.texStorage3D.apply(n, arguments);
      } catch (P) {
        console.error("THREE.WebGLState:", P);
      }
    },
    texSubImage2D: function () {
      try {
        n.texSubImage2D.apply(n, arguments);
      } catch (P) {
        console.error("THREE.WebGLState:", P);
      }
    },
    texSubImage3D: function () {
      try {
        n.texSubImage3D.apply(n, arguments);
      } catch (P) {
        console.error("THREE.WebGLState:", P);
      }
    },
    compressedTexSubImage2D: function () {
      try {
        n.compressedTexSubImage2D.apply(n, arguments);
      } catch (P) {
        console.error("THREE.WebGLState:", P);
      }
    },
    compressedTexSubImage3D: function () {
      try {
        n.compressedTexSubImage3D.apply(n, arguments);
      } catch (P) {
        console.error("THREE.WebGLState:", P);
      }
    },
    scissor: function (P) {
      Ee.equals(P) === !1 && (n.scissor(P.x, P.y, P.z, P.w), Ee.copy(P));
    },
    viewport: function (P) {
      Ue.equals(P) === !1 && (n.viewport(P.x, P.y, P.z, P.w), Ue.copy(P));
    },
    reset: function () {
      (n.disable(n.BLEND),
        n.disable(n.CULL_FACE),
        n.disable(n.DEPTH_TEST),
        n.disable(n.POLYGON_OFFSET_FILL),
        n.disable(n.SCISSOR_TEST),
        n.disable(n.STENCIL_TEST),
        n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),
        n.blendEquation(n.FUNC_ADD),
        n.blendFunc(n.ONE, n.ZERO),
        n.blendFuncSeparate(n.ONE, n.ZERO, n.ONE, n.ZERO),
        n.blendColor(0, 0, 0, 0),
        n.colorMask(!0, !0, !0, !0),
        n.clearColor(0, 0, 0, 0),
        n.depthMask(!0),
        n.depthFunc(n.LESS),
        n.clearDepth(1),
        n.stencilMask(4294967295),
        n.stencilFunc(n.ALWAYS, 0, 4294967295),
        n.stencilOp(n.KEEP, n.KEEP, n.KEEP),
        n.clearStencil(0),
        n.cullFace(n.BACK),
        n.frontFace(n.CCW),
        n.polygonOffset(0, 0),
        n.activeTexture(n.TEXTURE0),
        n.bindFramebuffer(n.FRAMEBUFFER, null),
        n.bindFramebuffer(n.DRAW_FRAMEBUFFER, null),
        n.bindFramebuffer(n.READ_FRAMEBUFFER, null),
        n.useProgram(null),
        n.lineWidth(1),
        n.scissor(0, 0, n.canvas.width, n.canvas.height),
        n.viewport(0, 0, n.canvas.width, n.canvas.height),
        (a = {}),
        (ie = null),
        (ae = {}),
        (o = {}),
        (c = new WeakMap()),
        (l = []),
        (h = null),
        (p = !1),
        (u = null),
        (f = null),
        (g = null),
        (y = null),
        (v = null),
        (d = null),
        (m = null),
        (x = new Color(0, 0, 0)),
        (b = 0),
        (w = !1),
        (A = null),
        (C = null),
        (F = null),
        (N = null),
        (G = null),
        Ee.set(0, 0, n.canvas.width, n.canvas.height),
        Ue.set(0, 0, n.canvas.width, n.canvas.height),
        e.reset(),
        t.reset(),
        i.reset());
    },
  };
}
function Qd(n, e, t, i) {
  let r = (function (s) {
    switch (s) {
      case UnsignedByteType:
      case ByteType:
        return {
          byteLength: 1,
          components: 1,
        };
      case UnsignedShortType:
      case ShortType:
      case HalfFloatType:
        return {
          byteLength: 2,
          components: 1,
        };
      case UnsignedShort4444Type:
      case UnsignedShort5551Type:
        return {
          byteLength: 2,
          components: 4,
        };
      case UnsignedIntType:
      case IntType:
      case FloatType:
        return {
          byteLength: 4,
          components: 1,
        };
      case UnsignedInt5999Type:
        return {
          byteLength: 4,
          components: 3,
        };
    }
    throw new Error(`Unknown texture type ${s}.`);
  })(i);
  switch (t) {
    case AlphaFormat:
    case LuminanceFormat:
      return n * e;
    case LuminanceAlphaFormat:
      return n * e * 2;
    case RedFormat:
    case RedIntegerFormat:
      return ((n * e) / r.components) * r.byteLength;
    case RGFormat:
    case RGIntegerFormat:
      return ((n * e * 2) / r.components) * r.byteLength;
    case RGBFormat:
      return ((n * e * 3) / r.components) * r.byteLength;
    case RGBAFormat:
    case RGBAIntegerFormat:
      return ((n * e * 4) / r.components) * r.byteLength;
    case RGB_S3TC_DXT1_Format:
    case RGBA_S3TC_DXT1_Format:
      return Math.floor((n + 3) / 4) * Math.floor((e + 3) / 4) * 8;
    case RGBA_S3TC_DXT3_Format:
    case RGBA_S3TC_DXT5_Format:
      return Math.floor((n + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    case RGB_PVRTC_2BPPV1_Format:
    case RGBA_PVRTC_2BPPV1_Format:
      return (Math.max(n, 16) * Math.max(e, 8)) / 4;
    case RGB_PVRTC_4BPPV1_Format:
    case RGBA_PVRTC_4BPPV1_Format:
      return (Math.max(n, 8) * Math.max(e, 8)) / 2;
    case RGB_ETC1_Format:
    case RGB_ETC2_Format:
      return Math.floor((n + 3) / 4) * Math.floor((e + 3) / 4) * 8;
    case RGBA_ETC2_EAC_Format:
    case RGBA_ASTC_4x4_Format:
      return Math.floor((n + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    case RGBA_ASTC_5x4_Format:
      return Math.floor((n + 4) / 5) * Math.floor((e + 3) / 4) * 16;
    case RGBA_ASTC_5x5_Format:
      return Math.floor((n + 4) / 5) * Math.floor((e + 4) / 5) * 16;
    case RGBA_ASTC_6x5_Format:
      return Math.floor((n + 5) / 6) * Math.floor((e + 4) / 5) * 16;
    case RGBA_ASTC_6x6_Format:
      return Math.floor((n + 5) / 6) * Math.floor((e + 5) / 6) * 16;
    case RGBA_ASTC_8x5_Format:
      return Math.floor((n + 7) / 8) * Math.floor((e + 4) / 5) * 16;
    case RGBA_ASTC_8x6_Format:
      return Math.floor((n + 7) / 8) * Math.floor((e + 5) / 6) * 16;
    case RGBA_ASTC_8x8_Format:
      return Math.floor((n + 7) / 8) * Math.floor((e + 7) / 8) * 16;
    case RGBA_ASTC_10x5_Format:
      return Math.floor((n + 9) / 10) * Math.floor((e + 4) / 5) * 16;
    case RGBA_ASTC_10x6_Format:
      return Math.floor((n + 9) / 10) * Math.floor((e + 5) / 6) * 16;
    case RGBA_ASTC_10x8_Format:
      return Math.floor((n + 9) / 10) * Math.floor((e + 7) / 8) * 16;
    case RGBA_ASTC_10x10_Format:
      return Math.floor((n + 9) / 10) * Math.floor((e + 9) / 10) * 16;
    case RGBA_ASTC_12x10_Format:
      return Math.floor((n + 11) / 12) * Math.floor((e + 9) / 10) * 16;
    case RGBA_ASTC_12x12_Format:
      return Math.floor((n + 11) / 12) * Math.floor((e + 11) / 12) * 16;
    case RGBA_BPTC_Format:
    case RGB_BPTC_SIGNED_Format:
    case RGB_BPTC_UNSIGNED_Format:
      return Math.ceil(n / 4) * Math.ceil(e / 4) * 16;
    case RED_RGTC1_Format:
    case SIGNED_RED_RGTC1_Format:
      return Math.ceil(n / 4) * Math.ceil(e / 4) * 8;
    case RED_GREEN_RGTC2_Format:
    case SIGNED_RED_GREEN_RGTC2_Format:
      return Math.ceil(n / 4) * Math.ceil(e / 4) * 16;
  }
  throw new Error(`Unable to determine texture byte length for ${t} format.`);
}
function xg(n, e, t, i, r, s, a) {
  let o = e.has("WEBGL_multisampled_render_to_texture") ? e.get("WEBGL_multisampled_render_to_texture") : null,
    c = typeof navigator != "undefined" && /OculusBrowser/g.test(navigator.userAgent),
    l = new Vector2(),
    h = new WeakMap(),
    p,
    u = new WeakMap(),
    f = !1;
  try {
    f = typeof OffscreenCanvas != "undefined" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {}
  function g(U, R) {
    return f ? new OffscreenCanvas(U, R) : Go("canvas");
  }
  function y(U, R, q) {
    let Q = 1,
      O = Ae(U);
    if (((O.width > q || O.height > q) && (Q = q / Math.max(O.width, O.height)), Q < 1)) {
      if (
        (typeof HTMLImageElement != "undefined" && U instanceof HTMLImageElement) ||
        (typeof HTMLCanvasElement != "undefined" && U instanceof HTMLCanvasElement) ||
        (typeof ImageBitmap != "undefined" && U instanceof ImageBitmap) ||
        (typeof VideoFrame != "undefined" && U instanceof VideoFrame)
      ) {
        let z = Math.floor(Q * O.width),
          P = Math.floor(Q * O.height);
        p === void 0 && (p = g(z, P));
        let X = R ? g(z, P) : p;
        return (
          (X.width = z),
          (X.height = P),
          X.getContext("2d").drawImage(U, 0, 0, z, P),
          console.warn(
            "THREE.WebGLRenderer: Texture has been resized from (" +
              O.width +
              "x" +
              O.height +
              ") to (" +
              z +
              "x" +
              P +
              ").",
          ),
          X
        );
      }
      return (
        "data" in U &&
          console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + O.width + "x" + O.height + ")."),
        U
      );
    }
    return U;
  }
  function v(U) {
    return U.generateMipmaps && U.minFilter !== NearestFilter && U.minFilter !== LinearFilter;
  }
  function d(U) {
    n.generateMipmap(U);
  }
  function m(U, R, q, Q, O = !1) {
    if (U !== null) {
      if (n[U] !== void 0) return n[U];
      console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + U + "'");
    }
    let z = R;
    if (
      (R === n.RED &&
        (q === n.FLOAT && (z = n.R32F), q === n.HALF_FLOAT && (z = n.R16F), q === n.UNSIGNED_BYTE && (z = n.R8)),
      R === n.RED_INTEGER &&
        (q === n.UNSIGNED_BYTE && (z = n.R8UI),
        q === n.UNSIGNED_SHORT && (z = n.R16UI),
        q === n.UNSIGNED_INT && (z = n.R32UI),
        q === n.BYTE && (z = n.R8I),
        q === n.SHORT && (z = n.R16I),
        q === n.INT && (z = n.R32I)),
      R === n.RG &&
        (q === n.FLOAT && (z = n.RG32F), q === n.HALF_FLOAT && (z = n.RG16F), q === n.UNSIGNED_BYTE && (z = n.RG8)),
      R === n.RG_INTEGER &&
        (q === n.UNSIGNED_BYTE && (z = n.RG8UI),
        q === n.UNSIGNED_SHORT && (z = n.RG16UI),
        q === n.UNSIGNED_INT && (z = n.RG32UI),
        q === n.BYTE && (z = n.RG8I),
        q === n.SHORT && (z = n.RG16I),
        q === n.INT && (z = n.RG32I)),
      R === n.RGB_INTEGER &&
        (q === n.UNSIGNED_BYTE && (z = n.RGB8UI),
        q === n.UNSIGNED_SHORT && (z = n.RGB16UI),
        q === n.UNSIGNED_INT && (z = n.RGB32UI),
        q === n.BYTE && (z = n.RGB8I),
        q === n.SHORT && (z = n.RGB16I),
        q === n.INT && (z = n.RGB32I)),
      R === n.RGBA_INTEGER &&
        (q === n.UNSIGNED_BYTE && (z = n.RGBA8UI),
        q === n.UNSIGNED_SHORT && (z = n.RGBA16UI),
        q === n.UNSIGNED_INT && (z = n.RGBA32UI),
        q === n.BYTE && (z = n.RGBA8I),
        q === n.SHORT && (z = n.RGBA16I),
        q === n.INT && (z = n.RGBA32I)),
      R === n.RGB && q === n.UNSIGNED_INT_5_9_9_9_REV && (z = n.RGB9_E5),
      R === n.RGBA)
    ) {
      let P = O ? LinearTransfer : Mt.getTransfer(Q);
      (q === n.FLOAT && (z = n.RGBA32F),
        q === n.HALF_FLOAT && (z = n.RGBA16F),
        q === n.UNSIGNED_BYTE && (z = P === Nt ? n.SRGB8_ALPHA8 : n.RGBA8),
        q === n.UNSIGNED_SHORT_4_4_4_4 && (z = n.RGBA4),
        q === n.UNSIGNED_SHORT_5_5_5_1 && (z = n.RGB5_A1));
    }
    return (
      (z !== n.R16F && z !== n.R32F && z !== n.RG16F && z !== n.RG32F && z !== n.RGBA16F && z !== n.RGBA32F) ||
        e.get("EXT_color_buffer_float"),
      z
    );
  }
  function x(U, R) {
    let q;
    return (
      U
        ? R === null || R === UnsignedIntType || R === UnsignedInt248Type
          ? (q = n.DEPTH24_STENCIL8)
          : R === FloatType
            ? (q = n.DEPTH32F_STENCIL8)
            : R === UnsignedShortType &&
              ((q = n.DEPTH24_STENCIL8),
              console.warn(
                "DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.",
              ))
        : R === null || R === UnsignedIntType || R === UnsignedInt248Type
          ? (q = n.DEPTH_COMPONENT24)
          : R === FloatType
            ? (q = n.DEPTH_COMPONENT32F)
            : R === UnsignedShortType && (q = n.DEPTH_COMPONENT16),
      q
    );
  }
  function b(U, R) {
    return v(U) === !0 || (U.isFramebufferTexture && U.minFilter !== NearestFilter && U.minFilter !== LinearFilter)
      ? Math.log2(Math.max(R.width, R.height)) + 1
      : U.mipmaps !== void 0 && U.mipmaps.length > 0
        ? U.mipmaps.length
        : U.isCompressedTexture && Array.isArray(U.image)
          ? R.mipmaps.length
          : 1;
  }
  function w(U) {
    let R = U.target;
    (R.removeEventListener("dispose", w),
      (function (q) {
        let Q = i.get(q);
        if (Q.__webglInit === void 0) return;
        let O = q.source,
          z = u.get(O);
        if (z) {
          let P = z[Q.__cacheKey];
          (P.usedTimes--, P.usedTimes === 0 && C(q), Object.keys(z).length === 0 && u.delete(O));
        }
        i.remove(q);
      })(R),
      R.isVideoTexture && h.delete(R));
  }
  function A(U) {
    let R = U.target;
    (R.removeEventListener("dispose", A),
      (function (q) {
        let Q = i.get(q);
        if ((q.depthTexture && q.depthTexture.dispose(), q.isWebGLCubeRenderTarget))
          for (let z = 0; z < 6; z++) {
            if (Array.isArray(Q.__webglFramebuffer[z]))
              for (let P = 0; P < Q.__webglFramebuffer[z].length; P++)
                n.deleteFramebuffer(Q.__webglFramebuffer[z][P]);
            else n.deleteFramebuffer(Q.__webglFramebuffer[z]);
            Q.__webglDepthbuffer && n.deleteRenderbuffer(Q.__webglDepthbuffer[z]);
          }
        else {
          if (Array.isArray(Q.__webglFramebuffer))
            for (let z = 0; z < Q.__webglFramebuffer.length; z++) n.deleteFramebuffer(Q.__webglFramebuffer[z]);
          else n.deleteFramebuffer(Q.__webglFramebuffer);
          if (
            (Q.__webglDepthbuffer && n.deleteRenderbuffer(Q.__webglDepthbuffer),
            Q.__webglMultisampledFramebuffer && n.deleteFramebuffer(Q.__webglMultisampledFramebuffer),
            Q.__webglColorRenderbuffer)
          )
            for (let z = 0; z < Q.__webglColorRenderbuffer.length; z++)
              Q.__webglColorRenderbuffer[z] && n.deleteRenderbuffer(Q.__webglColorRenderbuffer[z]);
          Q.__webglDepthRenderbuffer && n.deleteRenderbuffer(Q.__webglDepthRenderbuffer);
        }
        let O = q.textures;
        for (let z = 0, P = O.length; z < P; z++) {
          let X = i.get(O[z]);
          (X.__webglTexture && (n.deleteTexture(X.__webglTexture), a.memory.textures--), i.remove(O[z]));
        }
        i.remove(q);
      })(R));
  }
  function C(U) {
    let R = i.get(U);
    n.deleteTexture(R.__webglTexture);
    let q = U.source;
    (delete u.get(q)[R.__cacheKey], a.memory.textures--);
  }
  let F = 0;
  function N(U, R) {
    let q = i.get(U);
    if (
      (U.isVideoTexture &&
        (function (Q) {
          let O = a.render.frame;
          h.get(Q) !== O && (h.set(Q, O), Q.update());
        })(U),
      U.isRenderTargetTexture === !1 && U.version > 0 && q.__version !== U.version)
    ) {
      let Q = U.image;
      if (Q === null) console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
      else {
        if (Q.complete !== !1) return void ie(q, U, R);
        console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
      }
    }
    t.bindTexture(n.TEXTURE_2D, q.__webglTexture, n.TEXTURE0 + R);
  }
  let G = {
      [RepeatWrapping]: n.REPEAT,
      [ClampToEdgeWrapping]: n.CLAMP_TO_EDGE,
      [MirroredRepeatWrapping]: n.MIRRORED_REPEAT,
    },
    W = {
      [NearestFilter]: n.NEAREST,
      [R0]: n.NEAREST_MIPMAP_NEAREST,
      [Ka]: n.NEAREST_MIPMAP_LINEAR,
      [LinearFilter]: n.LINEAR,
      [Kl]: n.LINEAR_MIPMAP_NEAREST,
      [Ar]: n.LINEAR_MIPMAP_LINEAR,
    },
    B = {
      512: n.NEVER,
      519: n.ALWAYS,
      513: n.LESS,
      [Ap]: n.LEQUAL,
      514: n.EQUAL,
      518: n.GEQUAL,
      516: n.GREATER,
      517: n.NOTEQUAL,
    };
  function $(U, R) {
    if (
      (R.type !== FloatType ||
        e.has("OES_texture_float_linear") !== !1 ||
        (R.magFilter !== LinearFilter &&
          R.magFilter !== Kl &&
          R.magFilter !== Ka &&
          R.magFilter !== Ar &&
          R.minFilter !== LinearFilter &&
          R.minFilter !== Kl &&
          R.minFilter !== Ka &&
          R.minFilter !== Ar) ||
        console.warn(
          "THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.",
        ),
      n.texParameteri(U, n.TEXTURE_WRAP_S, G[R.wrapS]),
      n.texParameteri(U, n.TEXTURE_WRAP_T, G[R.wrapT]),
      (U !== n.TEXTURE_3D && U !== n.TEXTURE_2D_ARRAY) || n.texParameteri(U, n.TEXTURE_WRAP_R, G[R.wrapR]),
      n.texParameteri(U, n.TEXTURE_MAG_FILTER, W[R.magFilter]),
      n.texParameteri(U, n.TEXTURE_MIN_FILTER, W[R.minFilter]),
      R.compareFunction &&
        (n.texParameteri(U, n.TEXTURE_COMPARE_MODE, n.COMPARE_REF_TO_TEXTURE),
        n.texParameteri(U, n.TEXTURE_COMPARE_FUNC, B[R.compareFunction])),
      e.has("EXT_texture_filter_anisotropic") === !0)
    ) {
      if (
        R.magFilter === NearestFilter ||
        (R.minFilter !== Ka && R.minFilter !== Ar) ||
        (R.type === FloatType && e.has("OES_texture_float_linear") === !1)
      )
        return;
      if (R.anisotropy > 1 || i.get(R).__currentAnisotropy) {
        let q = e.get("EXT_texture_filter_anisotropic");
        (n.texParameterf(U, q.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(R.anisotropy, r.getMaxAnisotropy())),
          (i.get(R).__currentAnisotropy = R.anisotropy));
      }
    }
  }
  function Z(U, R) {
    let q = !1;
    U.__webglInit === void 0 && ((U.__webglInit = !0), R.addEventListener("dispose", w));
    let Q = R.source,
      O = u.get(Q);
    O === void 0 && ((O = {}), u.set(Q, O));
    let z = (function (P) {
      let X = [];
      return (
        X.push(P.wrapS),
        X.push(P.wrapT),
        X.push(P.wrapR || 0),
        X.push(P.magFilter),
        X.push(P.minFilter),
        X.push(P.anisotropy),
        X.push(P.internalFormat),
        X.push(P.format),
        X.push(P.type),
        X.push(P.generateMipmaps),
        X.push(P.premultiplyAlpha),
        X.push(P.flipY),
        X.push(P.unpackAlignment),
        X.push(P.colorSpace),
        X.join()
      );
    })(R);
    if (z !== U.__cacheKey) {
      (O[z] === void 0 &&
        ((O[z] = {
          texture: n.createTexture(),
          usedTimes: 0,
        }),
        a.memory.textures++,
        (q = !0)),
        O[z].usedTimes++);
      let P = O[U.__cacheKey];
      (P !== void 0 && (O[U.__cacheKey].usedTimes--, P.usedTimes === 0 && C(R)),
        (U.__cacheKey = z),
        (U.__webglTexture = O[z].texture));
    }
    return q;
  }
  function ie(U, R, q) {
    let Q = n.TEXTURE_2D;
    ((R.isDataArrayTexture || R.isCompressedArrayTexture) && (Q = n.TEXTURE_2D_ARRAY),
      R.isData3DTexture && (Q = n.TEXTURE_3D));
    let O = Z(U, R),
      z = R.source;
    t.bindTexture(Q, U.__webglTexture, n.TEXTURE0 + q);
    let P = i.get(z);
    if (z.version !== P.__version || O === !0) {
      t.activeTexture(n.TEXTURE0 + q);
      let X = Mt.getPrimaries(Mt.workingColorSpace),
        V = R.colorSpace === er ? null : Mt.getPrimaries(R.colorSpace),
        re = R.colorSpace === er || X === V ? n.NONE : n.BROWSER_DEFAULT_WEBGL;
      (n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, R.flipY),
        n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL, R.premultiplyAlpha),
        n.pixelStorei(n.UNPACK_ALIGNMENT, R.unpackAlignment),
        n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL, re));
      let Y = y(R.image, !1, r.maxTextureSize);
      Y = Re(R, Y);
      let he = s.convert(R.format, R.colorSpace),
        fe = s.convert(R.type),
        de,
        Ce = m(R.internalFormat, he, fe, R.colorSpace, R.isVideoTexture);
      $(Q, R);
      let Pe = R.mipmaps,
        Ne = R.isVideoTexture !== !0,
        je = P.__version === void 0 || O === !0,
        rt = z.dataReady,
        Ke = b(R, Y);
      if (R.isDepthTexture)
        ((Ce = x(R.format === DepthStencilFormat, R.type)),
          je &&
            (Ne
              ? t.texStorage2D(n.TEXTURE_2D, 1, Ce, Y.width, Y.height)
              : t.texImage2D(n.TEXTURE_2D, 0, Ce, Y.width, Y.height, 0, he, fe, null)));
      else if (R.isDataTexture) {
        if (Pe.length > 0) {
          Ne && je && t.texStorage2D(n.TEXTURE_2D, Ke, Ce, Pe[0].width, Pe[0].height);
          for (let Le = 0, Oe = Pe.length; Le < Oe; Le++)
            ((de = Pe[Le]),
              Ne
                ? rt && t.texSubImage2D(n.TEXTURE_2D, Le, 0, 0, de.width, de.height, he, fe, de.data)
                : t.texImage2D(n.TEXTURE_2D, Le, Ce, de.width, de.height, 0, he, fe, de.data));
          R.generateMipmaps = !1;
        } else
          Ne
            ? (je && t.texStorage2D(n.TEXTURE_2D, Ke, Ce, Y.width, Y.height),
              rt && t.texSubImage2D(n.TEXTURE_2D, 0, 0, 0, Y.width, Y.height, he, fe, Y.data))
            : t.texImage2D(n.TEXTURE_2D, 0, Ce, Y.width, Y.height, 0, he, fe, Y.data);
      } else if (R.isCompressedTexture) {
        if (R.isCompressedArrayTexture) {
          Ne && je && t.texStorage3D(n.TEXTURE_2D_ARRAY, Ke, Ce, Pe[0].width, Pe[0].height, Y.depth);
          for (let Le = 0, Oe = Pe.length; Le < Oe; Le++)
            if (((de = Pe[Le]), R.format !== RGBAFormat)) {
              if (he !== null) {
                if (Ne) {
                  if (rt)
                    if (R.layerUpdates.size > 0) {
                      let xt = Qd(de.width, de.height, R.format, R.type);
                      for (let ht of R.layerUpdates) {
                        let Ie = de.data.subarray(
                          (ht * xt) / de.data.BYTES_PER_ELEMENT,
                          ((ht + 1) * xt) / de.data.BYTES_PER_ELEMENT,
                        );
                        t.compressedTexSubImage3D(
                          n.TEXTURE_2D_ARRAY,
                          Le,
                          0,
                          0,
                          ht,
                          de.width,
                          de.height,
                          1,
                          he,
                          Ie,
                          0,
                          0,
                        );
                      }
                      R.clearLayerUpdates();
                    } else
                      t.compressedTexSubImage3D(
                        n.TEXTURE_2D_ARRAY,
                        Le,
                        0,
                        0,
                        0,
                        de.width,
                        de.height,
                        Y.depth,
                        he,
                        de.data,
                        0,
                        0,
                      );
                } else
                  t.compressedTexImage3D(n.TEXTURE_2D_ARRAY, Le, Ce, de.width, de.height, Y.depth, 0, de.data, 0, 0);
              } else
                console.warn(
                  "THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()",
                );
            } else
              Ne
                ? rt &&
                  t.texSubImage3D(n.TEXTURE_2D_ARRAY, Le, 0, 0, 0, de.width, de.height, Y.depth, he, fe, de.data)
                : t.texImage3D(n.TEXTURE_2D_ARRAY, Le, Ce, de.width, de.height, Y.depth, 0, he, fe, de.data);
        } else {
          Ne && je && t.texStorage2D(n.TEXTURE_2D, Ke, Ce, Pe[0].width, Pe[0].height);
          for (let Le = 0, Oe = Pe.length; Le < Oe; Le++)
            ((de = Pe[Le]),
              R.format !== RGBAFormat
                ? he !== null
                  ? Ne
                    ? rt && t.compressedTexSubImage2D(n.TEXTURE_2D, Le, 0, 0, de.width, de.height, he, de.data)
                    : t.compressedTexImage2D(n.TEXTURE_2D, Le, Ce, de.width, de.height, 0, de.data)
                  : console.warn(
                      "THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()",
                    )
                : Ne
                  ? rt && t.texSubImage2D(n.TEXTURE_2D, Le, 0, 0, de.width, de.height, he, fe, de.data)
                  : t.texImage2D(n.TEXTURE_2D, Le, Ce, de.width, de.height, 0, he, fe, de.data));
        }
      } else if (R.isDataArrayTexture) {
        if (Ne) {
          if ((je && t.texStorage3D(n.TEXTURE_2D_ARRAY, Ke, Ce, Y.width, Y.height, Y.depth), rt))
            if (R.layerUpdates.size > 0) {
              let Le = Qd(Y.width, Y.height, R.format, R.type);
              for (let Oe of R.layerUpdates) {
                let xt = Y.data.subarray(
                  (Oe * Le) / Y.data.BYTES_PER_ELEMENT,
                  ((Oe + 1) * Le) / Y.data.BYTES_PER_ELEMENT,
                );
                t.texSubImage3D(n.TEXTURE_2D_ARRAY, 0, 0, 0, Oe, Y.width, Y.height, 1, he, fe, xt);
              }
              R.clearLayerUpdates();
            } else t.texSubImage3D(n.TEXTURE_2D_ARRAY, 0, 0, 0, 0, Y.width, Y.height, Y.depth, he, fe, Y.data);
        } else t.texImage3D(n.TEXTURE_2D_ARRAY, 0, Ce, Y.width, Y.height, Y.depth, 0, he, fe, Y.data);
      } else if (R.isData3DTexture)
        Ne
          ? (je && t.texStorage3D(n.TEXTURE_3D, Ke, Ce, Y.width, Y.height, Y.depth),
            rt && t.texSubImage3D(n.TEXTURE_3D, 0, 0, 0, 0, Y.width, Y.height, Y.depth, he, fe, Y.data))
          : t.texImage3D(n.TEXTURE_3D, 0, Ce, Y.width, Y.height, Y.depth, 0, he, fe, Y.data);
      else if (R.isFramebufferTexture) {
        if (je)
          if (Ne) t.texStorage2D(n.TEXTURE_2D, Ke, Ce, Y.width, Y.height);
          else {
            let Le = Y.width,
              Oe = Y.height;
            for (let xt = 0; xt < Ke; xt++)
              (t.texImage2D(n.TEXTURE_2D, xt, Ce, Le, Oe, 0, he, fe, null), (Le >>= 1), (Oe >>= 1));
          }
      } else if (Pe.length > 0) {
        if (Ne && je) {
          let Le = Ae(Pe[0]);
          t.texStorage2D(n.TEXTURE_2D, Ke, Ce, Le.width, Le.height);
        }
        for (let Le = 0, Oe = Pe.length; Le < Oe; Le++)
          ((de = Pe[Le]),
            Ne
              ? rt && t.texSubImage2D(n.TEXTURE_2D, Le, 0, 0, he, fe, de)
              : t.texImage2D(n.TEXTURE_2D, Le, Ce, he, fe, de));
        R.generateMipmaps = !1;
      } else if (Ne) {
        if (je) {
          let Le = Ae(Y);
          t.texStorage2D(n.TEXTURE_2D, Ke, Ce, Le.width, Le.height);
        }
        rt && t.texSubImage2D(n.TEXTURE_2D, 0, 0, 0, he, fe, Y);
      } else t.texImage2D(n.TEXTURE_2D, 0, Ce, he, fe, Y);
      (v(R) && d(Q), (P.__version = z.version), R.onUpdate && R.onUpdate(R));
    }
    U.__version = R.version;
  }
  function ae(U, R, q, Q, O, z) {
    let P = s.convert(q.format, q.colorSpace),
      X = s.convert(q.type),
      V = m(q.internalFormat, P, X, q.colorSpace);
    if (!i.get(R).__hasExternalTextures) {
      let re = Math.max(1, R.width >> z),
        Y = Math.max(1, R.height >> z);
      O === n.TEXTURE_3D || O === n.TEXTURE_2D_ARRAY
        ? t.texImage3D(O, z, V, re, Y, R.depth, 0, P, X, null)
        : t.texImage2D(O, z, V, re, Y, 0, P, X, null);
    }
    (t.bindFramebuffer(n.FRAMEBUFFER, U),
      ge(R)
        ? o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER, Q, O, i.get(q).__webglTexture, 0, pe(R))
        : (O === n.TEXTURE_2D || (O >= n.TEXTURE_CUBE_MAP_POSITIVE_X && O <= n.TEXTURE_CUBE_MAP_NEGATIVE_Z)) &&
          n.framebufferTexture2D(n.FRAMEBUFFER, Q, O, i.get(q).__webglTexture, z),
      t.bindFramebuffer(n.FRAMEBUFFER, null));
  }
  function me(U, R, q) {
    if ((n.bindRenderbuffer(n.RENDERBUFFER, U), R.depthBuffer)) {
      let Q = R.depthTexture,
        O = Q && Q.isDepthTexture ? Q.type : null,
        z = x(R.stencilBuffer, O),
        P = R.stencilBuffer ? n.DEPTH_STENCIL_ATTACHMENT : n.DEPTH_ATTACHMENT,
        X = pe(R);
      (ge(R)
        ? o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER, X, z, R.width, R.height)
        : q
          ? n.renderbufferStorageMultisample(n.RENDERBUFFER, X, z, R.width, R.height)
          : n.renderbufferStorage(n.RENDERBUFFER, z, R.width, R.height),
        n.framebufferRenderbuffer(n.FRAMEBUFFER, P, n.RENDERBUFFER, U));
    } else {
      let Q = R.textures;
      for (let O = 0; O < Q.length; O++) {
        let z = Q[O],
          P = s.convert(z.format, z.colorSpace),
          X = s.convert(z.type),
          V = m(z.internalFormat, P, X, z.colorSpace),
          re = pe(R);
        q && ge(R) === !1
          ? n.renderbufferStorageMultisample(n.RENDERBUFFER, re, V, R.width, R.height)
          : ge(R)
            ? o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER, re, V, R.width, R.height)
            : n.renderbufferStorage(n.RENDERBUFFER, V, R.width, R.height);
      }
    }
    n.bindRenderbuffer(n.RENDERBUFFER, null);
  }
  function ve(U) {
    let R = i.get(U),
      q = U.isWebGLCubeRenderTarget === !0;
    if (R.__boundDepthTexture !== U.depthTexture) {
      let Q = U.depthTexture;
      if ((R.__depthDisposeCallback && R.__depthDisposeCallback(), Q)) {
        let O = () => {
          (delete R.__boundDepthTexture, delete R.__depthDisposeCallback, Q.removeEventListener("dispose", O));
        };
        (Q.addEventListener("dispose", O), (R.__depthDisposeCallback = O));
      }
      R.__boundDepthTexture = Q;
    }
    if (U.depthTexture && !R.__autoAllocateDepthBuffer) {
      if (q) throw new Error("target.depthTexture not supported in Cube render targets");
      (function (Q, O) {
        if (O && O.isWebGLCubeRenderTarget)
          throw new Error("Depth Texture with cube render targets is not supported");
        if ((t.bindFramebuffer(n.FRAMEBUFFER, Q), !O.depthTexture || !O.depthTexture.isDepthTexture))
          throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
        ((i.get(O.depthTexture).__webglTexture &&
          O.depthTexture.image.width === O.width &&
          O.depthTexture.image.height === O.height) ||
          ((O.depthTexture.image.width = O.width),
          (O.depthTexture.image.height = O.height),
          (O.depthTexture.needsUpdate = !0)),
          N(O.depthTexture, 0));
        let z = i.get(O.depthTexture).__webglTexture,
          P = pe(O);
        if (O.depthTexture.format === DepthFormat)
          ge(O)
            ? o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER, n.DEPTH_ATTACHMENT, n.TEXTURE_2D, z, 0, P)
            : n.framebufferTexture2D(n.FRAMEBUFFER, n.DEPTH_ATTACHMENT, n.TEXTURE_2D, z, 0);
        else {
          if (O.depthTexture.format !== DepthStencilFormat) throw new Error("Unknown depthTexture format");
          ge(O)
            ? o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER, n.DEPTH_STENCIL_ATTACHMENT, n.TEXTURE_2D, z, 0, P)
            : n.framebufferTexture2D(n.FRAMEBUFFER, n.DEPTH_STENCIL_ATTACHMENT, n.TEXTURE_2D, z, 0);
        }
      })(R.__webglFramebuffer, U);
    } else if (q) {
      R.__webglDepthbuffer = [];
      for (let Q = 0; Q < 6; Q++)
        if ((t.bindFramebuffer(n.FRAMEBUFFER, R.__webglFramebuffer[Q]), R.__webglDepthbuffer[Q] === void 0))
          ((R.__webglDepthbuffer[Q] = n.createRenderbuffer()), me(R.__webglDepthbuffer[Q], U, !1));
        else {
          let O = U.stencilBuffer ? n.DEPTH_STENCIL_ATTACHMENT : n.DEPTH_ATTACHMENT,
            z = R.__webglDepthbuffer[Q];
          (n.bindRenderbuffer(n.RENDERBUFFER, z), n.framebufferRenderbuffer(n.FRAMEBUFFER, O, n.RENDERBUFFER, z));
        }
    } else if ((t.bindFramebuffer(n.FRAMEBUFFER, R.__webglFramebuffer), R.__webglDepthbuffer === void 0))
      ((R.__webglDepthbuffer = n.createRenderbuffer()), me(R.__webglDepthbuffer, U, !1));
    else {
      let Q = U.stencilBuffer ? n.DEPTH_STENCIL_ATTACHMENT : n.DEPTH_ATTACHMENT,
        O = R.__webglDepthbuffer;
      (n.bindRenderbuffer(n.RENDERBUFFER, O), n.framebufferRenderbuffer(n.FRAMEBUFFER, Q, n.RENDERBUFFER, O));
    }
    t.bindFramebuffer(n.FRAMEBUFFER, null);
  }
  let Ee = [],
    Ue = [];
  function pe(U) {
    return Math.min(r.maxSamples, U.samples);
  }
  function ge(U) {
    let R = i.get(U);
    return U.samples > 0 && e.has("WEBGL_multisampled_render_to_texture") === !0 && R.__useRenderToTexture !== !1;
  }
  function Re(U, R) {
    let q = U.colorSpace,
      Q = U.format,
      O = U.type;
    return (
      U.isCompressedTexture === !0 ||
        U.isVideoTexture === !0 ||
        (q !== LinearSRGBColorSpace &&
          q !== er &&
          (Mt.getTransfer(q) === Nt
            ? (Q === RGBAFormat && O === UnsignedByteType) ||
              console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.")
            : console.error("THREE.WebGLTextures: Unsupported texture color space:", q))),
      R
    );
  }
  function Ae(U) {
    return (
      typeof HTMLImageElement != "undefined" && U instanceof HTMLImageElement
        ? ((l.width = U.naturalWidth || U.width), (l.height = U.naturalHeight || U.height))
        : typeof VideoFrame != "undefined" && U instanceof VideoFrame
          ? ((l.width = U.displayWidth), (l.height = U.displayHeight))
          : ((l.width = U.width), (l.height = U.height)),
      l
    );
  }
  ((this.allocateTextureUnit = function () {
    let U = F;
    return (
      U >= r.maxTextures &&
        console.warn(
          "THREE.WebGLTextures: Trying to use " + U + " texture units while this GPU supports only " + r.maxTextures,
        ),
      (F += 1),
      U
    );
  }),
    (this.resetTextureUnits = function () {
      F = 0;
    }),
    (this.setTexture2D = N),
    (this.setTexture2DArray = function (U, R) {
      let q = i.get(U);
      U.version > 0 && q.__version !== U.version
        ? ie(q, U, R)
        : t.bindTexture(n.TEXTURE_2D_ARRAY, q.__webglTexture, n.TEXTURE0 + R);
    }),
    (this.setTexture3D = function (U, R) {
      let q = i.get(U);
      U.version > 0 && q.__version !== U.version
        ? ie(q, U, R)
        : t.bindTexture(n.TEXTURE_3D, q.__webglTexture, n.TEXTURE0 + R);
    }),
    (this.setTextureCube = function (U, R) {
      let q = i.get(U);
      U.version > 0 && q.__version !== U.version
        ? (function (Q, O, z) {
            if (O.image.length !== 6) return;
            let P = Z(Q, O),
              X = O.source;
            t.bindTexture(n.TEXTURE_CUBE_MAP, Q.__webglTexture, n.TEXTURE0 + z);
            let V = i.get(X);
            if (X.version !== V.__version || P === !0) {
              t.activeTexture(n.TEXTURE0 + z);
              let re = Mt.getPrimaries(Mt.workingColorSpace),
                Y = O.colorSpace === er ? null : Mt.getPrimaries(O.colorSpace),
                he = O.colorSpace === er || re === Y ? n.NONE : n.BROWSER_DEFAULT_WEBGL;
              (n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, O.flipY),
                n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL, O.premultiplyAlpha),
                n.pixelStorei(n.UNPACK_ALIGNMENT, O.unpackAlignment),
                n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL, he));
              let fe = O.isCompressedTexture || O.image[0].isCompressedTexture,
                de = O.image[0] && O.image[0].isDataTexture,
                Ce = [];
              for (let Ie = 0; Ie < 6; Ie++)
                ((Ce[Ie] = fe || de ? (de ? O.image[Ie].image : O.image[Ie]) : y(O.image[Ie], !0, r.maxCubemapSize)),
                  (Ce[Ie] = Re(O, Ce[Ie])));
              let Pe = Ce[0],
                Ne = s.convert(O.format, O.colorSpace),
                je = s.convert(O.type),
                rt = m(O.internalFormat, Ne, je, O.colorSpace),
                Ke = O.isVideoTexture !== !0,
                Le = V.__version === void 0 || P === !0,
                Oe = X.dataReady,
                xt,
                ht = b(O, Pe);
              if (($(n.TEXTURE_CUBE_MAP, O), fe)) {
                Ke && Le && t.texStorage2D(n.TEXTURE_CUBE_MAP, ht, rt, Pe.width, Pe.height);
                for (let Ie = 0; Ie < 6; Ie++) {
                  xt = Ce[Ie].mipmaps;
                  for (let Je = 0; Je < xt.length; Je++) {
                    let yt = xt[Je];
                    O.format !== RGBAFormat
                      ? Ne !== null
                        ? Ke
                          ? Oe &&
                            t.compressedTexSubImage2D(
                              n.TEXTURE_CUBE_MAP_POSITIVE_X + Ie,
                              Je,
                              0,
                              0,
                              yt.width,
                              yt.height,
                              Ne,
                              yt.data,
                            )
                          : t.compressedTexImage2D(
                              n.TEXTURE_CUBE_MAP_POSITIVE_X + Ie,
                              Je,
                              rt,
                              yt.width,
                              yt.height,
                              0,
                              yt.data,
                            )
                        : console.warn(
                            "THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()",
                          )
                      : Ke
                        ? Oe &&
                          t.texSubImage2D(
                            n.TEXTURE_CUBE_MAP_POSITIVE_X + Ie,
                            Je,
                            0,
                            0,
                            yt.width,
                            yt.height,
                            Ne,
                            je,
                            yt.data,
                          )
                        : t.texImage2D(
                            n.TEXTURE_CUBE_MAP_POSITIVE_X + Ie,
                            Je,
                            rt,
                            yt.width,
                            yt.height,
                            0,
                            Ne,
                            je,
                            yt.data,
                          );
                  }
                }
              } else {
                if (((xt = O.mipmaps), Ke && Le)) {
                  xt.length > 0 && ht++;
                  let Ie = Ae(Ce[0]);
                  t.texStorage2D(n.TEXTURE_CUBE_MAP, ht, rt, Ie.width, Ie.height);
                }
                for (let Ie = 0; Ie < 6; Ie++)
                  if (de) {
                    Ke
                      ? Oe &&
                        t.texSubImage2D(
                          n.TEXTURE_CUBE_MAP_POSITIVE_X + Ie,
                          0,
                          0,
                          0,
                          Ce[Ie].width,
                          Ce[Ie].height,
                          Ne,
                          je,
                          Ce[Ie].data,
                        )
                      : t.texImage2D(
                          n.TEXTURE_CUBE_MAP_POSITIVE_X + Ie,
                          0,
                          rt,
                          Ce[Ie].width,
                          Ce[Ie].height,
                          0,
                          Ne,
                          je,
                          Ce[Ie].data,
                        );
                    for (let Je = 0; Je < xt.length; Je++) {
                      let yt = xt[Je].image[Ie].image;
                      Ke
                        ? Oe &&
                          t.texSubImage2D(
                            n.TEXTURE_CUBE_MAP_POSITIVE_X + Ie,
                            Je + 1,
                            0,
                            0,
                            yt.width,
                            yt.height,
                            Ne,
                            je,
                            yt.data,
                          )
                        : t.texImage2D(
                            n.TEXTURE_CUBE_MAP_POSITIVE_X + Ie,
                            Je + 1,
                            rt,
                            yt.width,
                            yt.height,
                            0,
                            Ne,
                            je,
                            yt.data,
                          );
                    }
                  } else {
                    Ke
                      ? Oe && t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + Ie, 0, 0, 0, Ne, je, Ce[Ie])
                      : t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + Ie, 0, rt, Ne, je, Ce[Ie]);
                    for (let Je = 0; Je < xt.length; Je++) {
                      let yt = xt[Je];
                      Ke
                        ? Oe &&
                          t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + Ie, Je + 1, 0, 0, Ne, je, yt.image[Ie])
                        : t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + Ie, Je + 1, rt, Ne, je, yt.image[Ie]);
                    }
                  }
              }
              (v(O) && d(n.TEXTURE_CUBE_MAP), (V.__version = X.version), O.onUpdate && O.onUpdate(O));
            }
            Q.__version = O.version;
          })(q, U, R)
        : t.bindTexture(n.TEXTURE_CUBE_MAP, q.__webglTexture, n.TEXTURE0 + R);
    }),
    (this.rebindTextures = function (U, R, q) {
      let Q = i.get(U);
      (R !== void 0 && ae(Q.__webglFramebuffer, U, U.texture, n.COLOR_ATTACHMENT0, n.TEXTURE_2D, 0),
        q !== void 0 && ve(U));
    }),
    (this.setupRenderTarget = function (U) {
      let R = U.texture,
        q = i.get(U),
        Q = i.get(R);
      U.addEventListener("dispose", A);
      let O = U.textures,
        z = U.isWebGLCubeRenderTarget === !0,
        P = O.length > 1;
      if (
        (P ||
          (Q.__webglTexture === void 0 && (Q.__webglTexture = n.createTexture()),
          (Q.__version = R.version),
          a.memory.textures++),
        z)
      ) {
        q.__webglFramebuffer = [];
        for (let X = 0; X < 6; X++)
          if (R.mipmaps && R.mipmaps.length > 0) {
            q.__webglFramebuffer[X] = [];
            for (let V = 0; V < R.mipmaps.length; V++) q.__webglFramebuffer[X][V] = n.createFramebuffer();
          } else q.__webglFramebuffer[X] = n.createFramebuffer();
      } else {
        if (R.mipmaps && R.mipmaps.length > 0) {
          q.__webglFramebuffer = [];
          for (let X = 0; X < R.mipmaps.length; X++) q.__webglFramebuffer[X] = n.createFramebuffer();
        } else q.__webglFramebuffer = n.createFramebuffer();
        if (P)
          for (let X = 0, V = O.length; X < V; X++) {
            let re = i.get(O[X]);
            re.__webglTexture === void 0 && ((re.__webglTexture = n.createTexture()), a.memory.textures++);
          }
        if (U.samples > 0 && ge(U) === !1) {
          ((q.__webglMultisampledFramebuffer = n.createFramebuffer()),
            (q.__webglColorRenderbuffer = []),
            t.bindFramebuffer(n.FRAMEBUFFER, q.__webglMultisampledFramebuffer));
          for (let X = 0; X < O.length; X++) {
            let V = O[X];
            ((q.__webglColorRenderbuffer[X] = n.createRenderbuffer()),
              n.bindRenderbuffer(n.RENDERBUFFER, q.__webglColorRenderbuffer[X]));
            let re = s.convert(V.format, V.colorSpace),
              Y = s.convert(V.type),
              he = m(V.internalFormat, re, Y, V.colorSpace, U.isXRRenderTarget === !0),
              fe = pe(U);
            (n.renderbufferStorageMultisample(n.RENDERBUFFER, fe, he, U.width, U.height),
              n.framebufferRenderbuffer(
                n.FRAMEBUFFER,
                n.COLOR_ATTACHMENT0 + X,
                n.RENDERBUFFER,
                q.__webglColorRenderbuffer[X],
              ));
          }
          (n.bindRenderbuffer(n.RENDERBUFFER, null),
            U.depthBuffer &&
              ((q.__webglDepthRenderbuffer = n.createRenderbuffer()), me(q.__webglDepthRenderbuffer, U, !0)),
            t.bindFramebuffer(n.FRAMEBUFFER, null));
        }
      }
      if (z) {
        (t.bindTexture(n.TEXTURE_CUBE_MAP, Q.__webglTexture), $(n.TEXTURE_CUBE_MAP, R));
        for (let X = 0; X < 6; X++)
          if (R.mipmaps && R.mipmaps.length > 0)
            for (let V = 0; V < R.mipmaps.length; V++)
              ae(q.__webglFramebuffer[X][V], U, R, n.COLOR_ATTACHMENT0, n.TEXTURE_CUBE_MAP_POSITIVE_X + X, V);
          else ae(q.__webglFramebuffer[X], U, R, n.COLOR_ATTACHMENT0, n.TEXTURE_CUBE_MAP_POSITIVE_X + X, 0);
        (v(R) && d(n.TEXTURE_CUBE_MAP), t.unbindTexture());
      } else if (P) {
        for (let X = 0, V = O.length; X < V; X++) {
          let re = O[X],
            Y = i.get(re);
          (t.bindTexture(n.TEXTURE_2D, Y.__webglTexture),
            $(n.TEXTURE_2D, re),
            ae(q.__webglFramebuffer, U, re, n.COLOR_ATTACHMENT0 + X, n.TEXTURE_2D, 0),
            v(re) && d(n.TEXTURE_2D));
        }
        t.unbindTexture();
      } else {
        let X = n.TEXTURE_2D;
        if (
          ((U.isWebGL3DRenderTarget || U.isWebGLArrayRenderTarget) &&
            (X = U.isWebGL3DRenderTarget ? n.TEXTURE_3D : n.TEXTURE_2D_ARRAY),
          t.bindTexture(X, Q.__webglTexture),
          $(X, R),
          R.mipmaps && R.mipmaps.length > 0)
        )
          for (let V = 0; V < R.mipmaps.length; V++) ae(q.__webglFramebuffer[V], U, R, n.COLOR_ATTACHMENT0, X, V);
        else ae(q.__webglFramebuffer, U, R, n.COLOR_ATTACHMENT0, X, 0);
        (v(R) && d(X), t.unbindTexture());
      }
      U.depthBuffer && ve(U);
    }),
    (this.updateRenderTargetMipmap = function (U) {
      let R = U.textures;
      for (let q = 0, Q = R.length; q < Q; q++) {
        let O = R[q];
        if (v(O)) {
          let z = U.isWebGLCubeRenderTarget ? n.TEXTURE_CUBE_MAP : n.TEXTURE_2D,
            P = i.get(O).__webglTexture;
          (t.bindTexture(z, P), d(z), t.unbindTexture());
        }
      }
    }),
    (this.updateMultisampleRenderTarget = function (U) {
      if (U.samples > 0) {
        if (ge(U) === !1) {
          let R = U.textures,
            q = U.width,
            Q = U.height,
            O = n.COLOR_BUFFER_BIT,
            z = U.stencilBuffer ? n.DEPTH_STENCIL_ATTACHMENT : n.DEPTH_ATTACHMENT,
            P = i.get(U),
            X = R.length > 1;
          if (X)
            for (let V = 0; V < R.length; V++)
              (t.bindFramebuffer(n.FRAMEBUFFER, P.__webglMultisampledFramebuffer),
                n.framebufferRenderbuffer(n.FRAMEBUFFER, n.COLOR_ATTACHMENT0 + V, n.RENDERBUFFER, null),
                t.bindFramebuffer(n.FRAMEBUFFER, P.__webglFramebuffer),
                n.framebufferTexture2D(n.DRAW_FRAMEBUFFER, n.COLOR_ATTACHMENT0 + V, n.TEXTURE_2D, null, 0));
          (t.bindFramebuffer(n.READ_FRAMEBUFFER, P.__webglMultisampledFramebuffer),
            t.bindFramebuffer(n.DRAW_FRAMEBUFFER, P.__webglFramebuffer));
          for (let V = 0; V < R.length; V++) {
            if (
              (U.resolveDepthBuffer &&
                (U.depthBuffer && (O |= n.DEPTH_BUFFER_BIT),
                U.stencilBuffer && U.resolveStencilBuffer && (O |= n.STENCIL_BUFFER_BIT)),
              X)
            ) {
              n.framebufferRenderbuffer(
                n.READ_FRAMEBUFFER,
                n.COLOR_ATTACHMENT0,
                n.RENDERBUFFER,
                P.__webglColorRenderbuffer[V],
              );
              let re = i.get(R[V]).__webglTexture;
              n.framebufferTexture2D(n.DRAW_FRAMEBUFFER, n.COLOR_ATTACHMENT0, n.TEXTURE_2D, re, 0);
            }
            (n.blitFramebuffer(0, 0, q, Q, 0, 0, q, Q, O, n.NEAREST),
              c === !0 &&
                ((Ee.length = 0),
                (Ue.length = 0),
                Ee.push(n.COLOR_ATTACHMENT0 + V),
                U.depthBuffer &&
                  U.resolveDepthBuffer === !1 &&
                  (Ee.push(z), Ue.push(z), n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER, Ue)),
                n.invalidateFramebuffer(n.READ_FRAMEBUFFER, Ee)));
          }
          if ((t.bindFramebuffer(n.READ_FRAMEBUFFER, null), t.bindFramebuffer(n.DRAW_FRAMEBUFFER, null), X))
            for (let V = 0; V < R.length; V++) {
              (t.bindFramebuffer(n.FRAMEBUFFER, P.__webglMultisampledFramebuffer),
                n.framebufferRenderbuffer(
                  n.FRAMEBUFFER,
                  n.COLOR_ATTACHMENT0 + V,
                  n.RENDERBUFFER,
                  P.__webglColorRenderbuffer[V],
                ));
              let re = i.get(R[V]).__webglTexture;
              (t.bindFramebuffer(n.FRAMEBUFFER, P.__webglFramebuffer),
                n.framebufferTexture2D(n.DRAW_FRAMEBUFFER, n.COLOR_ATTACHMENT0 + V, n.TEXTURE_2D, re, 0));
            }
          t.bindFramebuffer(n.DRAW_FRAMEBUFFER, P.__webglMultisampledFramebuffer);
        } else if (U.depthBuffer && U.resolveDepthBuffer === !1 && c) {
          let R = U.stencilBuffer ? n.DEPTH_STENCIL_ATTACHMENT : n.DEPTH_ATTACHMENT;
          n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER, [R]);
        }
      }
    }),
    (this.setupDepthRenderbuffer = ve),
    (this.setupFrameBufferTexture = ae),
    (this.useMultisampledRTT = ge));
}
function yg(n, e) {
  return {
    convert: function (t, i = "") {
      let r,
        s = Mt.getTransfer(i);
      if (t === UnsignedByteType) return n.UNSIGNED_BYTE;
      if (t === UnsignedShort4444Type) return n.UNSIGNED_SHORT_4_4_4_4;
      if (t === UnsignedShort5551Type) return n.UNSIGNED_SHORT_5_5_5_1;
      if (t === UnsignedInt5999Type) return n.UNSIGNED_INT_5_9_9_9_REV;
      if (t === ByteType) return n.BYTE;
      if (t === ShortType) return n.SHORT;
      if (t === UnsignedShortType) return n.UNSIGNED_SHORT;
      if (t === IntType) return n.INT;
      if (t === UnsignedIntType) return n.UNSIGNED_INT;
      if (t === FloatType) return n.FLOAT;
      if (t === HalfFloatType) return n.HALF_FLOAT;
      if (t === AlphaFormat) return n.ALPHA;
      if (t === RGBFormat) return n.RGB;
      if (t === RGBAFormat) return n.RGBA;
      if (t === LuminanceFormat) return n.LUMINANCE;
      if (t === LuminanceAlphaFormat) return n.LUMINANCE_ALPHA;
      if (t === DepthFormat) return n.DEPTH_COMPONENT;
      if (t === DepthStencilFormat) return n.DEPTH_STENCIL;
      if (t === RedFormat) return n.RED;
      if (t === RedIntegerFormat) return n.RED_INTEGER;
      if (t === RGFormat) return n.RG;
      if (t === RGIntegerFormat) return n.RG_INTEGER;
      if (t === RGBAIntegerFormat) return n.RGBA_INTEGER;
      if (
        t === RGB_S3TC_DXT1_Format ||
        t === RGBA_S3TC_DXT1_Format ||
        t === RGBA_S3TC_DXT3_Format ||
        t === RGBA_S3TC_DXT5_Format
      )
        if (s === Nt) {
          if (((r = e.get("WEBGL_compressed_texture_s3tc_srgb")), r === null)) return null;
          if (t === RGB_S3TC_DXT1_Format) return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;
          if (t === RGBA_S3TC_DXT1_Format) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
          if (t === RGBA_S3TC_DXT3_Format) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
          if (t === RGBA_S3TC_DXT5_Format) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
        } else {
          if (((r = e.get("WEBGL_compressed_texture_s3tc")), r === null)) return null;
          if (t === RGB_S3TC_DXT1_Format) return r.COMPRESSED_RGB_S3TC_DXT1_EXT;
          if (t === RGBA_S3TC_DXT1_Format) return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;
          if (t === RGBA_S3TC_DXT3_Format) return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;
          if (t === RGBA_S3TC_DXT5_Format) return r.COMPRESSED_RGBA_S3TC_DXT5_EXT;
        }
      if (
        t === RGB_PVRTC_4BPPV1_Format ||
        t === RGB_PVRTC_2BPPV1_Format ||
        t === RGBA_PVRTC_4BPPV1_Format ||
        t === RGBA_PVRTC_2BPPV1_Format
      ) {
        if (((r = e.get("WEBGL_compressed_texture_pvrtc")), r === null)) return null;
        if (t === RGB_PVRTC_4BPPV1_Format) return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (t === RGB_PVRTC_2BPPV1_Format) return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (t === RGBA_PVRTC_4BPPV1_Format) return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (t === RGBA_PVRTC_2BPPV1_Format) return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      }
      if (t === RGB_ETC1_Format || t === RGB_ETC2_Format || t === RGBA_ETC2_EAC_Format) {
        if (((r = e.get("WEBGL_compressed_texture_etc")), r === null)) return null;
        if (t === RGB_ETC1_Format || t === RGB_ETC2_Format)
          return s === Nt ? r.COMPRESSED_SRGB8_ETC2 : r.COMPRESSED_RGB8_ETC2;
        if (t === RGBA_ETC2_EAC_Format)
          return s === Nt ? r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : r.COMPRESSED_RGBA8_ETC2_EAC;
      }
      if (
        t === RGBA_ASTC_4x4_Format ||
        t === RGBA_ASTC_5x4_Format ||
        t === RGBA_ASTC_5x5_Format ||
        t === RGBA_ASTC_6x5_Format ||
        t === RGBA_ASTC_6x6_Format ||
        t === RGBA_ASTC_8x5_Format ||
        t === RGBA_ASTC_8x6_Format ||
        t === RGBA_ASTC_8x8_Format ||
        t === RGBA_ASTC_10x5_Format ||
        t === RGBA_ASTC_10x6_Format ||
        t === RGBA_ASTC_10x8_Format ||
        t === RGBA_ASTC_10x10_Format ||
        t === RGBA_ASTC_12x10_Format ||
        t === RGBA_ASTC_12x12_Format
      ) {
        if (((r = e.get("WEBGL_compressed_texture_astc")), r === null)) return null;
        if (t === RGBA_ASTC_4x4_Format)
          return s === Nt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : r.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (t === RGBA_ASTC_5x4_Format)
          return s === Nt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : r.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (t === RGBA_ASTC_5x5_Format)
          return s === Nt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : r.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (t === RGBA_ASTC_6x5_Format)
          return s === Nt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : r.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (t === RGBA_ASTC_6x6_Format)
          return s === Nt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : r.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (t === RGBA_ASTC_8x5_Format)
          return s === Nt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : r.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (t === RGBA_ASTC_8x6_Format)
          return s === Nt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : r.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (t === RGBA_ASTC_8x8_Format)
          return s === Nt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : r.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (t === RGBA_ASTC_10x5_Format)
          return s === Nt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : r.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (t === RGBA_ASTC_10x6_Format)
          return s === Nt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : r.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (t === RGBA_ASTC_10x8_Format)
          return s === Nt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : r.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (t === RGBA_ASTC_10x10_Format)
          return s === Nt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : r.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (t === RGBA_ASTC_12x10_Format)
          return s === Nt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : r.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (t === RGBA_ASTC_12x12_Format)
          return s === Nt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : r.COMPRESSED_RGBA_ASTC_12x12_KHR;
      }
      if (t === RGBA_BPTC_Format || t === RGB_BPTC_SIGNED_Format || t === RGB_BPTC_UNSIGNED_Format) {
        if (((r = e.get("EXT_texture_compression_bptc")), r === null)) return null;
        if (t === RGBA_BPTC_Format)
          return s === Nt ? r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : r.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (t === RGB_BPTC_SIGNED_Format) return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (t === RGB_BPTC_UNSIGNED_Format) return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      }
      if (
        t === RED_RGTC1_Format ||
        t === SIGNED_RED_RGTC1_Format ||
        t === RED_GREEN_RGTC2_Format ||
        t === SIGNED_RED_GREEN_RGTC2_Format
      ) {
        if (((r = e.get("EXT_texture_compression_rgtc")), r === null)) return null;
        if (t === RGBA_BPTC_Format) return r.COMPRESSED_RED_RGTC1_EXT;
        if (t === SIGNED_RED_RGTC1_Format) return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (t === RED_GREEN_RGTC2_Format) return r.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (t === SIGNED_RED_GREEN_RGTC2_Format) return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      }
      return t === UnsignedInt248Type ? n.UNSIGNED_INT_24_8 : n[t] !== void 0 ? n[t] : null;
    },
  };
}
var ArrayCamera = class extends PerspectiveCamera {
    constructor(e = []) {
      (super(), (this.isArrayCamera = !0), (this.cameras = e));
    }
  },
  Group = class extends Object3D {
    constructor() {
      (super(), (this.isGroup = !0), (this.type = "Group"));
    }
  },
  _g = {
    type: "move",
  },
  aa = class {
    constructor() {
      ((this._targetRay = null), (this._grip = null), (this._hand = null));
    }
    getHandSpace() {
      return (
        this._hand === null &&
          ((this._hand = new Group()),
          (this._hand.matrixAutoUpdate = !1),
          (this._hand.visible = !1),
          (this._hand.joints = {}),
          (this._hand.inputState = {
            pinching: !1,
          })),
        this._hand
      );
    }
    getTargetRaySpace() {
      return (
        this._targetRay === null &&
          ((this._targetRay = new Group()),
          (this._targetRay.matrixAutoUpdate = !1),
          (this._targetRay.visible = !1),
          (this._targetRay.hasLinearVelocity = !1),
          (this._targetRay.linearVelocity = new Vector3()),
          (this._targetRay.hasAngularVelocity = !1),
          (this._targetRay.angularVelocity = new Vector3())),
        this._targetRay
      );
    }
    getGripSpace() {
      return (
        this._grip === null &&
          ((this._grip = new Group()),
          (this._grip.matrixAutoUpdate = !1),
          (this._grip.visible = !1),
          (this._grip.hasLinearVelocity = !1),
          (this._grip.linearVelocity = new Vector3()),
          (this._grip.hasAngularVelocity = !1),
          (this._grip.angularVelocity = new Vector3())),
        this._grip
      );
    }
    dispatchEvent(e) {
      return (
        this._targetRay !== null && this._targetRay.dispatchEvent(e),
        this._grip !== null && this._grip.dispatchEvent(e),
        this._hand !== null && this._hand.dispatchEvent(e),
        this
      );
    }
    connect(e) {
      if (e && e.hand) {
        let t = this._hand;
        if (t) for (let i of e.hand.values()) this._getHandJoint(t, i);
      }
      return (
        this.dispatchEvent({
          type: "connected",
          data: e,
        }),
        this
      );
    }
    disconnect(e) {
      return (
        this.dispatchEvent({
          type: "disconnected",
          data: e,
        }),
        this._targetRay !== null && (this._targetRay.visible = !1),
        this._grip !== null && (this._grip.visible = !1),
        this._hand !== null && (this._hand.visible = !1),
        this
      );
    }
    update(e, t, i) {
      let r = null,
        s = null,
        a = null,
        o = this._targetRay,
        c = this._grip,
        l = this._hand;
      if (e && t.session.visibilityState !== "visible-blurred") {
        if (l && e.hand) {
          a = !0;
          for (let y of e.hand.values()) {
            let v = t.getJointPose(y, i),
              d = this._getHandJoint(l, y);
            (v !== null &&
              (d.matrix.fromArray(v.transform.matrix),
              d.matrix.decompose(d.position, d.rotation, d.scale),
              (d.matrixWorldNeedsUpdate = !0),
              (d.jointRadius = v.radius)),
              (d.visible = v !== null));
          }
          let h = l.joints["index-finger-tip"],
            p = l.joints["thumb-tip"],
            u = h.position.distanceTo(p.position),
            f = 0.02,
            g = 0.005;
          l.inputState.pinching && u > f + g
            ? ((l.inputState.pinching = !1),
              this.dispatchEvent({
                type: "pinchend",
                handedness: e.handedness,
                target: this,
              }))
            : !l.inputState.pinching &&
              u <= f - g &&
              ((l.inputState.pinching = !0),
              this.dispatchEvent({
                type: "pinchstart",
                handedness: e.handedness,
                target: this,
              }));
        } else
          c !== null &&
            e.gripSpace &&
            ((s = t.getPose(e.gripSpace, i)),
            s !== null &&
              (c.matrix.fromArray(s.transform.matrix),
              c.matrix.decompose(c.position, c.rotation, c.scale),
              (c.matrixWorldNeedsUpdate = !0),
              s.linearVelocity
                ? ((c.hasLinearVelocity = !0), c.linearVelocity.copy(s.linearVelocity))
                : (c.hasLinearVelocity = !1),
              s.angularVelocity
                ? ((c.hasAngularVelocity = !0), c.angularVelocity.copy(s.angularVelocity))
                : (c.hasAngularVelocity = !1)));
        o !== null &&
          ((r = t.getPose(e.targetRaySpace, i)),
          r === null && s !== null && (r = s),
          r !== null &&
            (o.matrix.fromArray(r.transform.matrix),
            o.matrix.decompose(o.position, o.rotation, o.scale),
            (o.matrixWorldNeedsUpdate = !0),
            r.linearVelocity
              ? ((o.hasLinearVelocity = !0), o.linearVelocity.copy(r.linearVelocity))
              : (o.hasLinearVelocity = !1),
            r.angularVelocity
              ? ((o.hasAngularVelocity = !0), o.angularVelocity.copy(r.angularVelocity))
              : (o.hasAngularVelocity = !1),
            this.dispatchEvent(_g)));
      }
      return (
        o !== null && (o.visible = r !== null),
        c !== null && (c.visible = s !== null),
        l !== null && (l.visible = a !== null),
        this
      );
    }
    _getHandJoint(e, t) {
      if (e.joints[t.jointName] === void 0) {
        let i = new Group();
        ((i.matrixAutoUpdate = !1), (i.visible = !1), (e.joints[t.jointName] = i), e.add(i));
      }
      return e.joints[t.jointName];
    }
  },
  Eh = class {
    constructor() {
      ((this.texture = null), (this.mesh = null), (this.depthNear = 0), (this.depthFar = 0));
    }
    init(e, t, i) {
      if (this.texture === null) {
        let r = new Texture();
        ((e.properties.get(r).__webglTexture = t.texture),
          (t.depthNear == i.depthNear && t.depthFar == i.depthFar) ||
            ((this.depthNear = t.depthNear), (this.depthFar = t.depthFar)),
          (this.texture = r));
      }
    }
    getMesh(e) {
      if (this.texture !== null && this.mesh === null) {
        let t = e.cameras[0].viewport,
          i = new ShaderMaterial({
            vertexShader: `
void main() {

	gl_Position = vec4( position, 1.0 );

}`,
            fragmentShader: `
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,
            uniforms: {
              depthColor: {
                value: this.texture,
              },
              depthWidth: {
                value: t.z,
              },
              depthHeight: {
                value: t.w,
              },
            },
          });
        this.mesh = new Mesh(new PlaneGeometry(20, 20), i);
      }
      return this.mesh;
    }
    reset() {
      ((this.texture = null), (this.mesh = null));
    }
    getDepthTexture() {
      return this.texture;
    }
  },
  Ah = class extends sr {
    constructor(e, t) {
      super();
      let i = this,
        r = null,
        s = 1,
        a = null,
        o = "local-floor",
        c = 1,
        l = null,
        h = null,
        p = null,
        u = null,
        f = null,
        g = null,
        y = new Eh(),
        v = t.getContextAttributes(),
        d = null,
        m = null,
        x = [],
        b = [],
        w = new Vector2(),
        A = null,
        C = new PerspectiveCamera();
      (C.layers.enable(1), (C.viewport = new Vector4()));
      let F = new PerspectiveCamera();
      (F.layers.enable(2), (F.viewport = new Vector4()));
      let N = [C, F],
        G = new ArrayCamera();
      (G.layers.enable(1), G.layers.enable(2));
      let W = null,
        B = null;
      function $(pe) {
        let ge = b.indexOf(pe.inputSource);
        if (ge === -1) return;
        let Re = x[ge];
        Re !== void 0 &&
          (Re.update(pe.inputSource, pe.frame, l || a),
          Re.dispatchEvent({
            type: pe.type,
            data: pe.inputSource,
          }));
      }
      function Z() {
        (r.removeEventListener("select", $),
          r.removeEventListener("selectstart", $),
          r.removeEventListener("selectend", $),
          r.removeEventListener("squeeze", $),
          r.removeEventListener("squeezestart", $),
          r.removeEventListener("squeezeend", $),
          r.removeEventListener("end", Z),
          r.removeEventListener("inputsourceschange", ie));
        for (let pe = 0; pe < x.length; pe++) {
          let ge = b[pe];
          ge !== null && ((b[pe] = null), x[pe].disconnect(ge));
        }
        ((W = null),
          (B = null),
          y.reset(),
          e.setRenderTarget(d),
          (f = null),
          (u = null),
          (p = null),
          (r = null),
          (m = null),
          Ue.stop(),
          (i.isPresenting = !1),
          e.setPixelRatio(A),
          e.setSize(w.width, w.height, !1),
          i.dispatchEvent({
            type: "sessionend",
          }));
      }
      function ie(pe) {
        for (let ge = 0; ge < pe.removed.length; ge++) {
          let Re = pe.removed[ge],
            Ae = b.indexOf(Re);
          Ae >= 0 && ((b[Ae] = null), x[Ae].disconnect(Re));
        }
        for (let ge = 0; ge < pe.added.length; ge++) {
          let Re = pe.added[ge],
            Ae = b.indexOf(Re);
          if (Ae === -1) {
            for (let R = 0; R < x.length; R++) {
              if (R >= b.length) {
                (b.push(Re), (Ae = R));
                break;
              }
              if (b[R] === null) {
                ((b[R] = Re), (Ae = R));
                break;
              }
            }
            if (Ae === -1) break;
          }
          let U = x[Ae];
          U && U.connect(Re);
        }
      }
      ((this.cameraAutoUpdate = !0),
        (this.enabled = !1),
        (this.isPresenting = !1),
        (this.getController = function (pe) {
          let ge = x[pe];
          return (ge === void 0 && ((ge = new aa()), (x[pe] = ge)), ge.getTargetRaySpace());
        }),
        (this.getControllerGrip = function (pe) {
          let ge = x[pe];
          return (ge === void 0 && ((ge = new aa()), (x[pe] = ge)), ge.getGripSpace());
        }),
        (this.getHand = function (pe) {
          let ge = x[pe];
          return (ge === void 0 && ((ge = new aa()), (x[pe] = ge)), ge.getHandSpace());
        }),
        (this.setFramebufferScaleFactor = function (pe) {
          ((s = pe),
            i.isPresenting === !0 &&
              console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting."));
        }),
        (this.setReferenceSpaceType = function (pe) {
          ((o = pe),
            i.isPresenting === !0 &&
              console.warn("THREE.WebXRManager: Cannot change reference space type while presenting."));
        }),
        (this.getReferenceSpace = function () {
          return l || a;
        }),
        (this.setReferenceSpace = function (pe) {
          l = pe;
        }),
        (this.getBaseLayer = function () {
          return u !== null ? u : f;
        }),
        (this.getBinding = function () {
          return p;
        }),
        (this.getFrame = function () {
          return g;
        }),
        (this.getSession = function () {
          return r;
        }),
        (this.setSession = async function (pe) {
          if (((r = pe), r !== null)) {
            if (
              ((d = e.getRenderTarget()),
              r.addEventListener("select", $),
              r.addEventListener("selectstart", $),
              r.addEventListener("selectend", $),
              r.addEventListener("squeeze", $),
              r.addEventListener("squeezestart", $),
              r.addEventListener("squeezeend", $),
              r.addEventListener("end", Z),
              r.addEventListener("inputsourceschange", ie),
              v.xrCompatible !== !0 && (await t.makeXRCompatible()),
              (A = e.getPixelRatio()),
              e.getSize(w),
              r.renderState.layers === void 0)
            ) {
              let ge = {
                antialias: v.antialias,
                alpha: !0,
                depth: v.depth,
                stencil: v.stencil,
                framebufferScaleFactor: s,
              };
              ((f = new XRWebGLLayer(r, t, ge)),
                r.updateRenderState({
                  baseLayer: f,
                }),
                e.setPixelRatio(1),
                e.setSize(f.framebufferWidth, f.framebufferHeight, !1),
                (m = new WebGLRenderTarget(f.framebufferWidth, f.framebufferHeight, {
                  format: RGBAFormat,
                  type: UnsignedByteType,
                  colorSpace: e.outputColorSpace,
                  stencilBuffer: v.stencil,
                })));
            } else {
              let ge = null,
                Re = null,
                Ae = null;
              v.depth &&
                ((Ae = v.stencil ? t.DEPTH24_STENCIL8 : t.DEPTH_COMPONENT24),
                (ge = v.stencil ? DepthStencilFormat : DepthFormat),
                (Re = v.stencil ? UnsignedInt248Type : UnsignedIntType));
              let U = {
                colorFormat: t.RGBA8,
                depthFormat: Ae,
                scaleFactor: s,
              };
              ((p = new XRWebGLBinding(r, t)),
                (u = p.createProjectionLayer(U)),
                r.updateRenderState({
                  layers: [u],
                }),
                e.setPixelRatio(1),
                e.setSize(u.textureWidth, u.textureHeight, !1),
                (m = new WebGLRenderTarget(u.textureWidth, u.textureHeight, {
                  format: RGBAFormat,
                  type: UnsignedByteType,
                  depthTexture: new DepthTexture(
                    u.textureWidth,
                    u.textureHeight,
                    Re,
                    void 0,
                    void 0,
                    void 0,
                    void 0,
                    void 0,
                    void 0,
                    ge,
                  ),
                  stencilBuffer: v.stencil,
                  colorSpace: e.outputColorSpace,
                  samples: v.antialias ? 4 : 0,
                  resolveDepthBuffer: u.ignoreDepthValues === !1,
                })));
            }
            ((m.isXRRenderTarget = !0),
              this.setFoveation(c),
              (l = null),
              (a = await r.requestReferenceSpace(o)),
              Ue.setContext(r),
              Ue.start(),
              (i.isPresenting = !0),
              i.dispatchEvent({
                type: "sessionstart",
              }));
          }
        }),
        (this.getEnvironmentBlendMode = function () {
          if (r !== null) return r.environmentBlendMode;
        }),
        (this.getDepthTexture = function () {
          return y.getDepthTexture();
        }));
      let ae = new Vector3(),
        me = new Vector3();
      function ve(pe, ge) {
        (ge === null ? pe.matrixWorld.copy(pe.matrix) : pe.matrixWorld.multiplyMatrices(ge.matrixWorld, pe.matrix),
          pe.matrixWorldInverse.copy(pe.matrixWorld).invert());
      }
      ((this.updateCamera = function (pe) {
        if (r === null) return;
        let ge = pe.near,
          Re = pe.far;
        (y.texture !== null && (y.depthNear > 0 && (ge = y.depthNear), y.depthFar > 0 && (Re = y.depthFar)),
          (G.near = F.near = C.near = ge),
          (G.far = F.far = C.far = Re),
          (W === G.near && B === G.far) ||
            (r.updateRenderState({
              depthNear: G.near,
              depthFar: G.far,
            }),
            (W = G.near),
            (B = G.far)));
        let Ae = pe.parent,
          U = G.cameras;
        ve(G, Ae);
        for (let R = 0; R < U.length; R++) ve(U[R], Ae);
        (U.length === 2
          ? (function (R, q, Q) {
              (ae.setFromMatrixPosition(q.matrixWorld), me.setFromMatrixPosition(Q.matrixWorld));
              let O = ae.distanceTo(me),
                z = q.projectionMatrix.elements,
                P = Q.projectionMatrix.elements,
                X = z[14] / (z[10] - 1),
                V = z[14] / (z[10] + 1),
                re = (z[9] + 1) / z[5],
                Y = (z[9] - 1) / z[5],
                he = (z[8] - 1) / z[0],
                fe = (P[8] + 1) / P[0],
                de = X * he,
                Ce = X * fe,
                Pe = O / (-he + fe),
                Ne = Pe * -he;
              if (
                (q.matrixWorld.decompose(R.position, R.quaternion, R.scale),
                R.translateX(Ne),
                R.translateZ(Pe),
                R.matrixWorld.compose(R.position, R.quaternion, R.scale),
                R.matrixWorldInverse.copy(R.matrixWorld).invert(),
                z[10] === -1)
              )
                (R.projectionMatrix.copy(q.projectionMatrix),
                  R.projectionMatrixInverse.copy(q.projectionMatrixInverse));
              else {
                let je = X + Pe,
                  rt = V + Pe,
                  Ke = de - Ne,
                  Le = Ce + (O - Ne),
                  Oe = ((re * V) / rt) * je,
                  xt = ((Y * V) / rt) * je;
                (R.projectionMatrix.makePerspective(Ke, Le, Oe, xt, je, rt),
                  R.projectionMatrixInverse.copy(R.projectionMatrix).invert());
              }
            })(G, C, F)
          : G.projectionMatrix.copy(C.projectionMatrix),
          (function (R, q, Q) {
            (Q === null
              ? R.matrix.copy(q.matrixWorld)
              : (R.matrix.copy(Q.matrixWorld), R.matrix.invert(), R.matrix.multiply(q.matrixWorld)),
              R.matrix.decompose(R.position, R.quaternion, R.scale),
              R.updateMatrixWorld(!0),
              R.projectionMatrix.copy(q.projectionMatrix),
              R.projectionMatrixInverse.copy(q.projectionMatrixInverse),
              R.isPerspectiveCamera &&
                ((R.fov = 2 * uh * Math.atan(1 / R.projectionMatrix.elements[5])), (R.zoom = 1)));
          })(pe, G, Ae));
      }),
        (this.getCamera = function () {
          return G;
        }),
        (this.getFoveation = function () {
          if (u !== null || f !== null) return c;
        }),
        (this.setFoveation = function (pe) {
          ((c = pe),
            u !== null && (u.fixedFoveation = pe),
            f !== null && f.fixedFoveation !== void 0 && (f.fixedFoveation = pe));
        }),
        (this.hasDepthSensing = function () {
          return y.texture !== null;
        }),
        (this.getDepthSensingMesh = function () {
          return y.getMesh(G);
        }));
      let Ee = null,
        Ue = new Lp();
      (Ue.setAnimationLoop(function (pe, ge) {
        if (((h = ge.getViewerPose(l || a)), (g = ge), h !== null)) {
          let Re = h.views;
          f !== null && (e.setRenderTargetFramebuffer(m, f.framebuffer), e.setRenderTarget(m));
          let Ae = !1;
          Re.length !== G.cameras.length && ((G.cameras.length = 0), (Ae = !0));
          for (let R = 0; R < Re.length; R++) {
            let q = Re[R],
              Q = null;
            if (f !== null) Q = f.getViewport(q);
            else {
              let z = p.getViewSubImage(u, q);
              ((Q = z.viewport),
                R === 0 &&
                  (e.setRenderTargetTextures(m, z.colorTexture, u.ignoreDepthValues ? void 0 : z.depthStencilTexture),
                  e.setRenderTarget(m)));
            }
            let O = N[R];
            (O === void 0 &&
              ((O = new PerspectiveCamera()), O.layers.enable(R), (O.viewport = new Vector4()), (N[R] = O)),
              O.matrix.fromArray(q.transform.matrix),
              O.matrix.decompose(O.position, O.quaternion, O.scale),
              O.projectionMatrix.fromArray(q.projectionMatrix),
              O.projectionMatrixInverse.copy(O.projectionMatrix).invert(),
              O.viewport.set(Q.x, Q.y, Q.width, Q.height),
              R === 0 && (G.matrix.copy(O.matrix), G.matrix.decompose(G.position, G.quaternion, G.scale)),
              Ae === !0 && G.cameras.push(O));
          }
          let U = r.enabledFeatures;
          if (U && U.includes("depth-sensing")) {
            let R = p.getDepthInformation(Re[0]);
            R && R.isValid && R.texture && y.init(e, R, r.renderState);
          }
        }
        for (let Re = 0; Re < x.length; Re++) {
          let Ae = b[Re],
            U = x[Re];
          Ae !== null && U !== void 0 && U.update(Ae, ge, l || a);
        }
        (Ee && Ee(pe, ge),
          ge.detectedPlanes &&
            i.dispatchEvent({
              type: "planesdetected",
              data: ge,
            }),
          (g = null));
      }),
        (this.setAnimationLoop = function (pe) {
          Ee = pe;
        }),
        (this.dispose = function () {}));
    }
  },
  Mr = new Euler(),
  bg = new Matrix4();
function Mg(n, e) {
  function t(r, s) {
    (r.matrixAutoUpdate === !0 && r.updateMatrix(), s.value.copy(r.matrix));
  }
  function i(r, s) {
    ((r.opacity.value = s.opacity),
      s.color && r.diffuse.value.copy(s.color),
      s.emissive && r.emissive.value.copy(s.emissive).multiplyScalar(s.emissiveIntensity),
      s.map && ((r.map.value = s.map), t(s.map, r.mapTransform)),
      s.alphaMap && ((r.alphaMap.value = s.alphaMap), t(s.alphaMap, r.alphaMapTransform)),
      s.bumpMap &&
        ((r.bumpMap.value = s.bumpMap),
        t(s.bumpMap, r.bumpMapTransform),
        (r.bumpScale.value = s.bumpScale),
        s.side === ai && (r.bumpScale.value *= -1)),
      s.normalMap &&
        ((r.normalMap.value = s.normalMap),
        t(s.normalMap, r.normalMapTransform),
        r.normalScale.value.copy(s.normalScale),
        s.side === ai && r.normalScale.value.negate()),
      s.displacementMap &&
        ((r.displacementMap.value = s.displacementMap),
        t(s.displacementMap, r.displacementMapTransform),
        (r.displacementScale.value = s.displacementScale),
        (r.displacementBias.value = s.displacementBias)),
      s.emissiveMap && ((r.emissiveMap.value = s.emissiveMap), t(s.emissiveMap, r.emissiveMapTransform)),
      s.specularMap && ((r.specularMap.value = s.specularMap), t(s.specularMap, r.specularMapTransform)),
      s.alphaTest > 0 && (r.alphaTest.value = s.alphaTest));
    let a = e.get(s),
      o = a.envMap,
      c = a.envMapRotation;
    (o &&
      ((r.envMap.value = o),
      Mr.copy(c),
      (Mr.x *= -1),
      (Mr.y *= -1),
      (Mr.z *= -1),
      o.isCubeTexture && o.isRenderTargetTexture === !1 && ((Mr.y *= -1), (Mr.z *= -1)),
      r.envMapRotation.value.setFromMatrix4(bg.makeRotationFromEuler(Mr)),
      (r.flipEnvMap.value = o.isCubeTexture && o.isRenderTargetTexture === !1 ? -1 : 1),
      (r.reflectivity.value = s.reflectivity),
      (r.ior.value = s.ior),
      (r.refractionRatio.value = s.refractionRatio)),
      s.lightMap &&
        ((r.lightMap.value = s.lightMap),
        (r.lightMapIntensity.value = s.lightMapIntensity),
        t(s.lightMap, r.lightMapTransform)),
      s.aoMap &&
        ((r.aoMap.value = s.aoMap), (r.aoMapIntensity.value = s.aoMapIntensity), t(s.aoMap, r.aoMapTransform)));
  }
  return {
    refreshFogUniforms: function (r, s) {
      (s.color.getRGB(r.fogColor.value, Pp(n)),
        s.isFog
          ? ((r.fogNear.value = s.near), (r.fogFar.value = s.far))
          : s.isFogExp2 && (r.fogDensity.value = s.density));
    },
    refreshMaterialUniforms: function (r, s, a, o, c) {
      s.isMeshBasicMaterial || s.isMeshLambertMaterial
        ? i(r, s)
        : s.isMeshToonMaterial
          ? (i(r, s),
            (function (l, h) {
              h.gradientMap && (l.gradientMap.value = h.gradientMap);
            })(r, s))
          : s.isMeshPhongMaterial
            ? (i(r, s),
              (function (l, h) {
                (l.specular.value.copy(h.specular), (l.shininess.value = Math.max(h.shininess, 1e-4)));
              })(r, s))
            : s.isMeshStandardMaterial
              ? (i(r, s),
                (function (l, h) {
                  ((l.metalness.value = h.metalness),
                    h.metalnessMap &&
                      ((l.metalnessMap.value = h.metalnessMap), t(h.metalnessMap, l.metalnessMapTransform)),
                    (l.roughness.value = h.roughness),
                    h.roughnessMap &&
                      ((l.roughnessMap.value = h.roughnessMap), t(h.roughnessMap, l.roughnessMapTransform)),
                    h.envMap && (l.envMapIntensity.value = h.envMapIntensity));
                })(r, s),
                s.isMeshPhysicalMaterial &&
                  (function (l, h, p) {
                    ((l.ior.value = h.ior),
                      h.sheen > 0 &&
                        (l.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),
                        (l.sheenRoughness.value = h.sheenRoughness),
                        h.sheenColorMap &&
                          ((l.sheenColorMap.value = h.sheenColorMap), t(h.sheenColorMap, l.sheenColorMapTransform)),
                        h.sheenRoughnessMap &&
                          ((l.sheenRoughnessMap.value = h.sheenRoughnessMap),
                          t(h.sheenRoughnessMap, l.sheenRoughnessMapTransform))),
                      h.clearcoat > 0 &&
                        ((l.clearcoat.value = h.clearcoat),
                        (l.clearcoatRoughness.value = h.clearcoatRoughness),
                        h.clearcoatMap &&
                          ((l.clearcoatMap.value = h.clearcoatMap), t(h.clearcoatMap, l.clearcoatMapTransform)),
                        h.clearcoatRoughnessMap &&
                          ((l.clearcoatRoughnessMap.value = h.clearcoatRoughnessMap),
                          t(h.clearcoatRoughnessMap, l.clearcoatRoughnessMapTransform)),
                        h.clearcoatNormalMap &&
                          ((l.clearcoatNormalMap.value = h.clearcoatNormalMap),
                          t(h.clearcoatNormalMap, l.clearcoatNormalMapTransform),
                          l.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),
                          h.side === ai && l.clearcoatNormalScale.value.negate())),
                      h.dispersion > 0 && (l.dispersion.value = h.dispersion),
                      h.iridescence > 0 &&
                        ((l.iridescence.value = h.iridescence),
                        (l.iridescenceIOR.value = h.iridescenceIOR),
                        (l.iridescenceThicknessMinimum.value = h.iridescenceThicknessRange[0]),
                        (l.iridescenceThicknessMaximum.value = h.iridescenceThicknessRange[1]),
                        h.iridescenceMap &&
                          ((l.iridescenceMap.value = h.iridescenceMap),
                          t(h.iridescenceMap, l.iridescenceMapTransform)),
                        h.iridescenceThicknessMap &&
                          ((l.iridescenceThicknessMap.value = h.iridescenceThicknessMap),
                          t(h.iridescenceThicknessMap, l.iridescenceThicknessMapTransform))),
                      h.transmission > 0 &&
                        ((l.transmission.value = h.transmission),
                        (l.transmissionSamplerMap.value = p.texture),
                        l.transmissionSamplerSize.value.set(p.width, p.height),
                        h.transmissionMap &&
                          ((l.transmissionMap.value = h.transmissionMap),
                          t(h.transmissionMap, l.transmissionMapTransform)),
                        (l.thickness.value = h.thickness),
                        h.thicknessMap &&
                          ((l.thicknessMap.value = h.thicknessMap), t(h.thicknessMap, l.thicknessMapTransform)),
                        (l.attenuationDistance.value = h.attenuationDistance),
                        l.attenuationColor.value.copy(h.attenuationColor)),
                      h.anisotropy > 0 &&
                        (l.anisotropyVector.value.set(
                          h.anisotropy * Math.cos(h.anisotropyRotation),
                          h.anisotropy * Math.sin(h.anisotropyRotation),
                        ),
                        h.anisotropyMap &&
                          ((l.anisotropyMap.value = h.anisotropyMap), t(h.anisotropyMap, l.anisotropyMapTransform))),
                      (l.specularIntensity.value = h.specularIntensity),
                      l.specularColor.value.copy(h.specularColor),
                      h.specularColorMap &&
                        ((l.specularColorMap.value = h.specularColorMap),
                        t(h.specularColorMap, l.specularColorMapTransform)),
                      h.specularIntensityMap &&
                        ((l.specularIntensityMap.value = h.specularIntensityMap),
                        t(h.specularIntensityMap, l.specularIntensityMapTransform)));
                  })(r, s, c))
              : s.isMeshMatcapMaterial
                ? (i(r, s),
                  (function (l, h) {
                    h.matcap && (l.matcap.value = h.matcap);
                  })(r, s))
                : s.isMeshDepthMaterial
                  ? i(r, s)
                  : s.isMeshDistanceMaterial
                    ? (i(r, s),
                      (function (l, h) {
                        let p = e.get(h).light;
                        (l.referencePosition.value.setFromMatrixPosition(p.matrixWorld),
                          (l.nearDistance.value = p.shadow.camera.near),
                          (l.farDistance.value = p.shadow.camera.far));
                      })(r, s))
                    : s.isMeshNormalMaterial
                      ? i(r, s)
                      : s.isLineBasicMaterial
                        ? ((function (l, h) {
                            (l.diffuse.value.copy(h.color),
                              (l.opacity.value = h.opacity),
                              h.map && ((l.map.value = h.map), t(h.map, l.mapTransform)));
                          })(r, s),
                          s.isLineDashedMaterial &&
                            (function (l, h) {
                              ((l.dashSize.value = h.dashSize),
                                (l.totalSize.value = h.dashSize + h.gapSize),
                                (l.scale.value = h.scale));
                            })(r, s))
                        : s.isPointsMaterial
                          ? (function (l, h, p, u) {
                              (l.diffuse.value.copy(h.color),
                                (l.opacity.value = h.opacity),
                                (l.size.value = h.size * p),
                                (l.scale.value = 0.5 * u),
                                h.map && ((l.map.value = h.map), t(h.map, l.uvTransform)),
                                h.alphaMap && ((l.alphaMap.value = h.alphaMap), t(h.alphaMap, l.alphaMapTransform)),
                                h.alphaTest > 0 && (l.alphaTest.value = h.alphaTest));
                            })(r, s, a, o)
                          : s.isSpriteMaterial
                            ? (function (l, h) {
                                (l.diffuse.value.copy(h.color),
                                  (l.opacity.value = h.opacity),
                                  (l.rotation.value = h.rotation),
                                  h.map && ((l.map.value = h.map), t(h.map, l.mapTransform)),
                                  h.alphaMap && ((l.alphaMap.value = h.alphaMap), t(h.alphaMap, l.alphaMapTransform)),
                                  h.alphaTest > 0 && (l.alphaTest.value = h.alphaTest));
                              })(r, s)
                            : s.isShadowMaterial
                              ? (r.color.value.copy(s.color), (r.opacity.value = s.opacity))
                              : s.isShaderMaterial && (s.uniformsNeedUpdate = !1);
    },
  };
}
function Sg(n, e, t, i) {
  let r = {},
    s = {},
    a = [],
    o = n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);
  function c(p, u, f, g) {
    let y = p.value,
      v = u + "_" + f;
    if (g[v] === void 0) return ((g[v] = typeof y == "number" || typeof y == "boolean" ? y : y.clone()), !0);
    {
      let d = g[v];
      if (typeof y == "number" || typeof y == "boolean") {
        if (d !== y) return ((g[v] = y), !0);
      } else if (d.equals(y) === !1) return (d.copy(y), !0);
    }
    return !1;
  }
  function l(p) {
    let u = {
      boundary: 0,
      storage: 0,
    };
    return (
      typeof p == "number" || typeof p == "boolean"
        ? ((u.boundary = 4), (u.storage = 4))
        : p.isVector2
          ? ((u.boundary = 8), (u.storage = 8))
          : p.isVector3 || p.isColor
            ? ((u.boundary = 16), (u.storage = 12))
            : p.isVector4
              ? ((u.boundary = 16), (u.storage = 16))
              : p.isMatrix3
                ? ((u.boundary = 48), (u.storage = 48))
                : p.isMatrix4
                  ? ((u.boundary = 64), (u.storage = 64))
                  : p.isTexture
                    ? console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.")
                    : console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", p),
      u
    );
  }
  function h(p) {
    let u = p.target;
    u.removeEventListener("dispose", h);
    let f = a.indexOf(u.__bindingPointIndex);
    (a.splice(f, 1), n.deleteBuffer(r[u.id]), delete r[u.id], delete s[u.id]);
  }
  return {
    bind: function (p, u) {
      let f = u.program;
      i.uniformBlockBinding(p, f);
    },
    update: function (p, u) {
      let f = r[p.id];
      f === void 0 &&
        ((function (v) {
          let d = v.uniforms,
            m = 0,
            x = 16;
          for (let w = 0, A = d.length; w < A; w++) {
            let C = Array.isArray(d[w]) ? d[w] : [d[w]];
            for (let F = 0, N = C.length; F < N; F++) {
              let G = C[F],
                W = Array.isArray(G.value) ? G.value : [G.value];
              for (let B = 0, $ = W.length; B < $; B++) {
                let Z = l(W[B]),
                  ie = m % x,
                  ae = ie % Z.boundary,
                  me = ie + ae;
                ((m += ae),
                  me !== 0 && x - me < Z.storage && (m += x - me),
                  (G.__data = new Float32Array(Z.storage / Float32Array.BYTES_PER_ELEMENT)),
                  (G.__offset = m),
                  (m += Z.storage));
              }
            }
          }
          let b = m % x;
          (b > 0 && (m += x - b), (v.__size = m), (v.__cache = {}));
        })(p),
        (f = (function (v) {
          let d = (function () {
            for (let w = 0; w < o; w++) if (a.indexOf(w) === -1) return (a.push(w), w);
            return (
              console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),
              0
            );
          })();
          v.__bindingPointIndex = d;
          let m = n.createBuffer(),
            x = v.__size,
            b = v.usage;
          return (
            n.bindBuffer(n.UNIFORM_BUFFER, m),
            n.bufferData(n.UNIFORM_BUFFER, x, b),
            n.bindBuffer(n.UNIFORM_BUFFER, null),
            n.bindBufferBase(n.UNIFORM_BUFFER, d, m),
            m
          );
        })(p)),
        (r[p.id] = f),
        p.addEventListener("dispose", h));
      let g = u.program;
      i.updateUBOMapping(p, g);
      let y = e.render.frame;
      s[p.id] !== y &&
        ((function (v) {
          let d = r[v.id],
            m = v.uniforms,
            x = v.__cache;
          n.bindBuffer(n.UNIFORM_BUFFER, d);
          for (let b = 0, w = m.length; b < w; b++) {
            let A = Array.isArray(m[b]) ? m[b] : [m[b]];
            for (let C = 0, F = A.length; C < F; C++) {
              let N = A[C];
              if (c(N, b, C, x) === !0) {
                let G = N.__offset,
                  W = Array.isArray(N.value) ? N.value : [N.value],
                  B = 0;
                for (let $ = 0; $ < W.length; $++) {
                  let Z = W[$],
                    ie = l(Z);
                  typeof Z == "number" || typeof Z == "boolean"
                    ? ((N.__data[0] = Z), n.bufferSubData(n.UNIFORM_BUFFER, G + B, N.__data))
                    : Z.isMatrix3
                      ? ((N.__data[0] = Z.elements[0]),
                        (N.__data[1] = Z.elements[1]),
                        (N.__data[2] = Z.elements[2]),
                        (N.__data[3] = 0),
                        (N.__data[4] = Z.elements[3]),
                        (N.__data[5] = Z.elements[4]),
                        (N.__data[6] = Z.elements[5]),
                        (N.__data[7] = 0),
                        (N.__data[8] = Z.elements[6]),
                        (N.__data[9] = Z.elements[7]),
                        (N.__data[10] = Z.elements[8]),
                        (N.__data[11] = 0))
                      : (Z.toArray(N.__data, B), (B += ie.storage / Float32Array.BYTES_PER_ELEMENT));
                }
                n.bufferSubData(n.UNIFORM_BUFFER, G, N.__data);
              }
            }
          }
          n.bindBuffer(n.UNIFORM_BUFFER, null);
        })(p),
        (s[p.id] = y));
    },
    dispose: function () {
      for (let p in r) n.deleteBuffer(r[p]);
      ((a = []), (r = {}), (s = {}));
    },
  };
}
var WebGLRenderer = class {
    constructor(e = {}) {
      let {
          canvas: t = L0(),
          context: i = null,
          depth: r = !0,
          stencil: s = !1,
          alpha: a = !1,
          antialias: o = !1,
          premultipliedAlpha: c = !0,
          preserveDrawingBuffer: l = !1,
          powerPreference: h = "default",
          failIfMajorPerformanceCaveat: p = !1,
        } = e,
        u;
      if (((this.isWebGLRenderer = !0), i !== null)) {
        if (typeof WebGLRenderingContext != "undefined" && i instanceof WebGLRenderingContext)
          throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
        u = i.getContextAttributes().alpha;
      } else u = a;
      let f = new Uint32Array(4),
        g = new Int32Array(4),
        y = null,
        v = null,
        d = [],
        m = [];
      ((this.domElement = t),
        (this.debug = {
          checkShaderErrors: !0,
          onShaderError: null,
        }),
        (this.autoClear = !0),
        (this.autoClearColor = !0),
        (this.autoClearDepth = !0),
        (this.autoClearStencil = !0),
        (this.sortObjects = !0),
        (this.clippingPlanes = []),
        (this.localClippingEnabled = !1),
        (this._outputColorSpace = Ft),
        (this.toneMapping = ir),
        (this.toneMappingExposure = 1));
      let x = this,
        b = !1,
        w = 0,
        A = 0,
        C = null,
        F = -1,
        N = null,
        G = new Vector4(),
        W = new Vector4(),
        B = null,
        $ = new Color(0),
        Z = 0,
        ie = t.width,
        ae = t.height,
        me = 1,
        ve = null,
        Ee = null,
        Ue = new Vector4(0, 0, ie, ae),
        pe = new Vector4(0, 0, ie, ae),
        ge = !1,
        Re = new _s(),
        Ae = !1,
        U = !1,
        R = new Matrix4(),
        q = new Matrix4(),
        Q = new Vector3(),
        O = new Vector4(),
        z = {
          background: null,
          fog: null,
          environment: null,
          overrideMaterial: null,
          isScene: !0,
        },
        P = !1;
      function X() {
        return C === null ? me : 1;
      }
      let V,
        re,
        Y,
        he,
        fe,
        de,
        Ce,
        Pe,
        Ne,
        je,
        rt,
        Ke,
        Le,
        Oe,
        xt,
        ht,
        Ie,
        Je,
        yt,
        gn,
        Mi,
        qt,
        Si,
        Ri,
        j = i;
      function Yi(L, J) {
        return t.getContext(L, J);
      }
      try {
        let L = {
          alpha: !0,
          depth: r,
          stencil: s,
          antialias: o,
          premultipliedAlpha: c,
          preserveDrawingBuffer: l,
          powerPreference: h,
          failIfMajorPerformanceCaveat: p,
        };
        if (
          ("setAttribute" in t && t.setAttribute("data-engine", "three.js r169"),
          t.addEventListener("webglcontextlost", Fa, !1),
          t.addEventListener("webglcontextrestored", Ba, !1),
          t.addEventListener("webglcontextcreationerror", sn, !1),
          j === null)
        ) {
          let J = "webgl2";
          if (((j = Yi(J, L)), j === null))
            throw Yi(J)
              ? new Error("Error creating WebGL context with your selected attributes.")
              : new Error("Error creating WebGL context.");
        }
      } catch (L) {
        throw (console.error("THREE.WebGLRenderer: " + L.message), L);
      }
      function le() {
        ((V = new nm(j)),
          V.init(),
          (qt = new yg(j, V)),
          (re = new WebGL2(j, V, e, qt)),
          (Y = new vg(j)),
          re.reverseDepthBuffer && Y.buffers.depth.setReversed(!0),
          (he = new am(j)),
          (fe = new og()),
          (de = new xg(j, V, Y, fe, re, qt, he)),
          (Ce = new tm(x)),
          (Pe = new im(x)),
          (Ne = new Y0(j)),
          (Si = new J0(j, Ne)),
          (je = new rm(j, Ne, he, Si)),
          (rt = new lm(j, je, Ne, he)),
          (yt = new om(j, re, de)),
          (ht = new em(fe)),
          (Ke = new ag(x, Ce, Pe, V, re, Si, ht)),
          (Le = new Mg(x, fe)),
          (Oe = new cg()),
          (xt = new fg(V)),
          (Je = new K0(x, Ce, Pe, Y, rt, u, c)),
          (Ie = new mg(x, rt, re)),
          (Ri = new Sg(j, he, re, Y)),
          (gn = new $0(j, V, he)),
          (Mi = new sm(j, V, he)),
          (he.programs = Ke.programs),
          (x.capabilities = re),
          (x.extensions = V),
          (x.properties = fe),
          (x.renderLists = Oe),
          (x.shadowMap = Ie),
          (x.state = Y),
          (x.info = he));
      }
      le();
      let Pt = new Ah(x, j);
      function Fa(L) {
        (L.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), (b = !0));
      }
      function Ba() {
        (console.log("THREE.WebGLRenderer: Context Restored."), (b = !1));
        let L = he.autoReset,
          J = Ie.enabled,
          ee = Ie.autoUpdate,
          ce = Ie.needsUpdate,
          te = Ie.type;
        (le(), (he.autoReset = L), (Ie.enabled = J), (Ie.autoUpdate = ee), (Ie.needsUpdate = ce), (Ie.type = te));
      }
      function sn(L) {
        console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", L.statusMessage);
      }
      function mr(L) {
        let J = L.target;
        (J.removeEventListener("dispose", mr),
          (function (ee) {
            ((function (ce) {
              let te = fe.get(ce).programs;
              te !== void 0 &&
                (te.forEach(function (_e) {
                  Ke.releaseProgram(_e);
                }),
                ce.isShaderMaterial && Ke.releaseShaderCache(ce));
            })(ee),
              fe.remove(ee));
          })(J));
      }
      function gr(L, J, ee) {
        L.transparent === !0 && L.side === 2 && L.forceSinglePass === !1
          ? ((L.side = ai),
            (L.needsUpdate = !0),
            Ct(L, J, ee),
            (L.side = Ni),
            (L.needsUpdate = !0),
            Ct(L, J, ee),
            (L.side = 2))
          : Ct(L, J, ee);
      }
      ((this.xr = Pt),
        (this.getContext = function () {
          return j;
        }),
        (this.getContextAttributes = function () {
          return j.getContextAttributes();
        }),
        (this.forceContextLoss = function () {
          let L = V.get("WEBGL_lose_context");
          L && L.loseContext();
        }),
        (this.forceContextRestore = function () {
          let L = V.get("WEBGL_lose_context");
          L && L.restoreContext();
        }),
        (this.getPixelRatio = function () {
          return me;
        }),
        (this.setPixelRatio = function (L) {
          L !== void 0 && ((me = L), this.setSize(ie, ae, !1));
        }),
        (this.getSize = function (L) {
          return L.set(ie, ae);
        }),
        (this.setSize = function (L, J, ee = !0) {
          Pt.isPresenting
            ? console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.")
            : ((ie = L),
              (ae = J),
              (t.width = Math.floor(L * me)),
              (t.height = Math.floor(J * me)),
              ee === !0 && ((t.style.width = L + "px"), (t.style.height = J + "px")),
              this.setViewport(0, 0, L, J));
        }),
        (this.getDrawingBufferSize = function (L) {
          return L.set(ie * me, ae * me).floor();
        }),
        (this.setDrawingBufferSize = function (L, J, ee) {
          ((ie = L),
            (ae = J),
            (me = ee),
            (t.width = Math.floor(L * ee)),
            (t.height = Math.floor(J * ee)),
            this.setViewport(0, 0, L, J));
        }),
        (this.getCurrentViewport = function (L) {
          return L.copy(G);
        }),
        (this.getViewport = function (L) {
          return L.copy(Ue);
        }),
        (this.setViewport = function (L, J, ee, ce) {
          (L.isVector4 ? Ue.set(L.x, L.y, L.z, L.w) : Ue.set(L, J, ee, ce),
            Y.viewport(G.copy(Ue).multiplyScalar(me).round()));
        }),
        (this.getScissor = function (L) {
          return L.copy(pe);
        }),
        (this.setScissor = function (L, J, ee, ce) {
          (L.isVector4 ? pe.set(L.x, L.y, L.z, L.w) : pe.set(L, J, ee, ce),
            Y.scissor(W.copy(pe).multiplyScalar(me).round()));
        }),
        (this.getScissorTest = function () {
          return ge;
        }),
        (this.setScissorTest = function (L) {
          Y.setScissorTest((ge = L));
        }),
        (this.setOpaqueSort = function (L) {
          ve = L;
        }),
        (this.setTransparentSort = function (L) {
          Ee = L;
        }),
        (this.getClearColor = function (L) {
          return L.copy(Je.getClearColor());
        }),
        (this.setClearColor = function () {
          Je.setClearColor.apply(Je, arguments);
        }),
        (this.getClearAlpha = function () {
          return Je.getClearAlpha();
        }),
        (this.setClearAlpha = function () {
          Je.setClearAlpha.apply(Je, arguments);
        }),
        (this.clear = function (L = !0, J = !0, ee = !0) {
          let ce = 0;
          if (L) {
            let te = !1;
            if (C !== null) {
              let _e = C.texture.format;
              te = _e === RGBAIntegerFormat || _e === RGIntegerFormat || _e === RedIntegerFormat;
            }
            if (te) {
              let _e = C.texture.type,
                we =
                  _e === UnsignedByteType ||
                  _e === UnsignedIntType ||
                  _e === UnsignedShortType ||
                  _e === UnsignedInt248Type ||
                  _e === UnsignedShort4444Type ||
                  _e === UnsignedShort5551Type,
                Me = Je.getClearColor(),
                ze = Je.getClearAlpha(),
                $e = Me.r,
                We = Me.g,
                Xe = Me.b;
              we
                ? ((f[0] = $e), (f[1] = We), (f[2] = Xe), (f[3] = ze), j.clearBufferuiv(j.COLOR, 0, f))
                : ((g[0] = $e), (g[1] = We), (g[2] = Xe), (g[3] = ze), j.clearBufferiv(j.COLOR, 0, g));
            } else ce |= j.COLOR_BUFFER_BIT;
          }
          (J && ((ce |= j.DEPTH_BUFFER_BIT), j.clearDepth(this.capabilities.reverseDepthBuffer ? 0 : 1)),
            ee && ((ce |= j.STENCIL_BUFFER_BIT), this.state.buffers.stencil.setMask(4294967295)),
            j.clear(ce));
        }),
        (this.clearColor = function () {
          this.clear(!0, !1, !1);
        }),
        (this.clearDepth = function () {
          this.clear(!1, !0, !1);
        }),
        (this.clearStencil = function () {
          this.clear(!1, !1, !0);
        }),
        (this.dispose = function () {
          (t.removeEventListener("webglcontextlost", Fa, !1),
            t.removeEventListener("webglcontextrestored", Ba, !1),
            t.removeEventListener("webglcontextcreationerror", sn, !1),
            Oe.dispose(),
            xt.dispose(),
            fe.dispose(),
            Ce.dispose(),
            Pe.dispose(),
            rt.dispose(),
            Si.dispose(),
            Ri.dispose(),
            Ke.dispose(),
            Pt.dispose(),
            Pt.removeEventListener("sessionstart", ri),
            Pt.removeEventListener("sessionend", Hr),
            ci.stop());
        }),
        (this.renderBufferDirect = function (L, J, ee, ce, te, _e) {
          J === null && (J = z);
          let we = te.isMesh && te.matrixWorld.determinant() < 0,
            Me = (function (pt, Rt, $t, nt, et) {
              (Rt.isScene !== !0 && (Rt = z), de.resetTextureUnits());
              let Pi = Rt.fog,
                Ga = nt.isMeshStandardMaterial ? Rt.environment : null,
                Ha =
                  C === null
                    ? x.outputColorSpace
                    : C.isXRRenderTarget === !0
                      ? C.texture.colorSpace
                      : LinearSRGBColorSpace,
                Wr = (nt.isMeshStandardMaterial ? Pe : Ce).get(nt.envMap || Ga),
                Va = nt.vertexColors === !0 && !!$t.attributes.color && $t.attributes.color.itemSize === 4,
                Hl = !!$t.attributes.tangent && (!!nt.normalMap || nt.anisotropy > 0),
                Vl = !!$t.morphAttributes.position,
                Wl = !!$t.morphAttributes.normal,
                Xl = !!$t.morphAttributes.color,
                Wa = ir;
              nt.toneMapped && ((C !== null && C.isXRRenderTarget !== !0) || (Wa = x.toneMapping));
              let Ws = $t.morphAttributes.position || $t.morphAttributes.normal || $t.morphAttributes.color,
                Xa = Ws !== void 0 ? Ws.length : 0,
                st = fe.get(nt),
                Xs = v.state.lights;
              if (Ae === !0 && (U === !0 || pt !== N)) {
                let Ti = pt === N && nt.id === F;
                ht.setState(nt, pt, Ti);
              }
              let Bi = !1;
              nt.version === st.__version
                ? (st.needsLights && st.lightsStateVersion !== Xs.state.version) ||
                  st.outputColorSpace !== Ha ||
                  (et.isBatchedMesh && st.batching === !1)
                  ? (Bi = !0)
                  : et.isBatchedMesh || st.batching !== !0
                    ? (et.isBatchedMesh && st.batchingColor === !0 && et.colorTexture === null) ||
                      (et.isBatchedMesh && st.batchingColor === !1 && et.colorTexture !== null) ||
                      (et.isInstancedMesh && st.instancing === !1)
                      ? (Bi = !0)
                      : et.isInstancedMesh || st.instancing !== !0
                        ? et.isSkinnedMesh && st.skinning === !1
                          ? (Bi = !0)
                          : et.isSkinnedMesh || st.skinning !== !0
                            ? (et.isInstancedMesh && st.instancingColor === !0 && et.instanceColor === null) ||
                              (et.isInstancedMesh && st.instancingColor === !1 && et.instanceColor !== null) ||
                              (et.isInstancedMesh && st.instancingMorph === !0 && et.morphTexture === null) ||
                              (et.isInstancedMesh && st.instancingMorph === !1 && et.morphTexture !== null) ||
                              st.envMap !== Wr ||
                              (nt.fog === !0 && st.fog !== Pi)
                              ? (Bi = !0)
                              : st.numClippingPlanes === void 0 ||
                                  (st.numClippingPlanes === ht.numPlanes && st.numIntersection === ht.numIntersection)
                                ? (st.vertexAlphas !== Va ||
                                    st.vertexTangents !== Hl ||
                                    st.morphTargets !== Vl ||
                                    st.morphNormals !== Wl ||
                                    st.morphColors !== Xl ||
                                    st.toneMapping !== Wa ||
                                    st.morphTargetsCount !== Xa) &&
                                  (Bi = !0)
                                : (Bi = !0)
                            : (Bi = !0)
                        : (Bi = !0)
                    : (Bi = !0)
                : ((Bi = !0), (st.__version = nt.version));
              let zi = st.currentProgram;
              Bi === !0 && (zi = Ct(nt, Rt, et));
              let Xr = !1,
                En = !1,
                js = !1,
                qe = zi.getUniforms(),
                tt = st.uniforms;
              if (
                (Y.useProgram(zi.program) && ((Xr = !0), (En = !0), (js = !0)),
                nt.id !== F && ((F = nt.id), (En = !0)),
                Xr || N !== pt)
              ) {
                (re.reverseDepthBuffer
                  ? (R.copy(pt.projectionMatrix),
                    (function (An) {
                      let Et = An.elements;
                      ((Et[2] = 0.5 * Et[2] + 0.5 * Et[3]),
                        (Et[6] = 0.5 * Et[6] + 0.5 * Et[7]),
                        (Et[10] = 0.5 * Et[10] + 0.5 * Et[11]),
                        (Et[14] = 0.5 * Et[14] + 0.5 * Et[15]));
                    })(R),
                    (function (An) {
                      let Et = An.elements;
                      Et[11] === -1
                        ? ((Et[10] = -Et[10] - 1), (Et[14] = -Et[14]))
                        : ((Et[10] = -Et[10]), (Et[14] = 1 - Et[14]));
                    })(R),
                    qe.setValue(j, "projectionMatrix", R))
                  : qe.setValue(j, "projectionMatrix", pt.projectionMatrix),
                  qe.setValue(j, "viewMatrix", pt.matrixWorldInverse));
                let Ti = qe.map.cameraPosition;
                (Ti !== void 0 && Ti.setValue(j, Q.setFromMatrixPosition(pt.matrixWorld)),
                  re.logarithmicDepthBuffer && qe.setValue(j, "logDepthBufFC", 2 / (Math.log(pt.far + 1) / Math.LN2)),
                  (nt.isMeshPhongMaterial ||
                    nt.isMeshToonMaterial ||
                    nt.isMeshLambertMaterial ||
                    nt.isMeshBasicMaterial ||
                    nt.isMeshStandardMaterial ||
                    nt.isShaderMaterial) &&
                    qe.setValue(j, "isOrthographic", pt.isOrthographicCamera === !0),
                  N !== pt && ((N = pt), (En = !0), (js = !0)));
              }
              if (et.isSkinnedMesh) {
                (qe.setOptional(j, et, "bindMatrix"), qe.setOptional(j, et, "bindMatrixInverse"));
                let Ti = et.skeleton;
                Ti &&
                  (Ti.boneTexture === null && Ti.computeBoneTexture(),
                  qe.setValue(j, "boneTexture", Ti.boneTexture, de));
              }
              et.isBatchedMesh &&
                (qe.setOptional(j, et, "batchingTexture"),
                qe.setValue(j, "batchingTexture", et._matricesTexture, de),
                qe.setOptional(j, et, "batchingIdTexture"),
                qe.setValue(j, "batchingIdTexture", et._indirectTexture, de),
                qe.setOptional(j, et, "batchingColorTexture"),
                et._colorsTexture !== null && qe.setValue(j, "batchingColorTexture", et._colorsTexture, de));
              let It = $t.morphAttributes;
              ((It.position === void 0 && It.normal === void 0 && It.color === void 0) || yt.update(et, $t, zi),
                (En || st.receiveShadow !== et.receiveShadow) &&
                  ((st.receiveShadow = et.receiveShadow), qe.setValue(j, "receiveShadow", et.receiveShadow)),
                nt.isMeshGouraudMaterial &&
                  nt.envMap !== null &&
                  ((tt.envMap.value = Wr),
                  (tt.flipEnvMap.value = Wr.isCubeTexture && Wr.isRenderTargetTexture === !1 ? -1 : 1)),
                nt.isMeshStandardMaterial &&
                  nt.envMap === null &&
                  Rt.environment !== null &&
                  (tt.envMapIntensity.value = Rt.environmentIntensity),
                En &&
                  (qe.setValue(j, "toneMappingExposure", x.toneMappingExposure),
                  st.needsLights &&
                    ((wi = js),
                    ((hi = tt).ambientLightColor.needsUpdate = wi),
                    (hi.lightProbe.needsUpdate = wi),
                    (hi.directionalLights.needsUpdate = wi),
                    (hi.directionalLightShadows.needsUpdate = wi),
                    (hi.pointLights.needsUpdate = wi),
                    (hi.pointLightShadows.needsUpdate = wi),
                    (hi.spotLights.needsUpdate = wi),
                    (hi.spotLightShadows.needsUpdate = wi),
                    (hi.rectAreaLights.needsUpdate = wi),
                    (hi.hemisphereLights.needsUpdate = wi)),
                  Pi && nt.fog === !0 && Le.refreshFogUniforms(tt, Pi),
                  Le.refreshMaterialUniforms(tt, nt, me, ae, v.state.transmissionRenderTarget[pt.id]),
                  hs.upload(j, fi(st), tt, de)));
              var hi, wi;
              if (
                (nt.isShaderMaterial &&
                  nt.uniformsNeedUpdate === !0 &&
                  (hs.upload(j, fi(st), tt, de), (nt.uniformsNeedUpdate = !1)),
                nt.isSpriteMaterial && qe.setValue(j, "center", et.center),
                qe.setValue(j, "modelViewMatrix", et.modelViewMatrix),
                qe.setValue(j, "normalMatrix", et.normalMatrix),
                qe.setValue(j, "modelMatrix", et.matrixWorld),
                nt.isShaderMaterial || nt.isRawShaderMaterial)
              ) {
                let Ti = nt.uniformsGroups;
                for (let An = 0, Et = Ti.length; An < Et; An++) {
                  let ue = Ti[An];
                  (Ri.update(ue, zi), Ri.bind(ue, zi));
                }
              }
              return zi;
            })(L, J, ee, ce, te);
          Y.setMaterial(ce, we);
          let ze = ee.index,
            $e = 1;
          if (ce.wireframe === !0) {
            if (((ze = je.getWireframeAttribute(ee)), ze === void 0)) return;
            $e = 2;
          }
          let We = ee.drawRange,
            Xe = ee.attributes.position,
            ut = We.start * $e,
            Gt = (We.start + We.count) * $e;
          (_e !== null && ((ut = Math.max(ut, _e.start * $e)), (Gt = Math.min(Gt, (_e.start + _e.count) * $e))),
            ze !== null
              ? ((ut = Math.max(ut, 0)), (Gt = Math.min(Gt, ze.count)))
              : Xe != null && ((ut = Math.max(ut, 0)), (Gt = Math.min(Gt, Xe.count))));
          let Lt = Gt - ut;
          if (Lt < 0 || Lt === 1 / 0) return;
          let Wt;
          Si.setup(te, ce, Me, ee, ze);
          let At = gn;
          if ((ze !== null && ((Wt = Ne.get(ze)), (At = Mi), At.setIndex(Wt)), te.isMesh))
            ce.wireframe === !0
              ? (Y.setLineWidth(ce.wireframeLinewidth * X()), At.setMode(j.LINES))
              : At.setMode(j.TRIANGLES);
          else if (te.isLine) {
            let pt = ce.linewidth;
            (pt === void 0 && (pt = 1),
              Y.setLineWidth(pt * X()),
              te.isLineSegments
                ? At.setMode(j.LINES)
                : te.isLineLoop
                  ? At.setMode(j.LINE_LOOP)
                  : At.setMode(j.LINE_STRIP));
          } else te.isPoints ? At.setMode(j.POINTS) : te.isSprite && At.setMode(j.TRIANGLES);
          if (te.isBatchedMesh) {
            if (te._multiDrawInstances !== null)
              At.renderMultiDrawInstances(
                te._multiDrawStarts,
                te._multiDrawCounts,
                te._multiDrawCount,
                te._multiDrawInstances,
              );
            else if (V.get("WEBGL_multi_draw"))
              At.renderMultiDraw(te._multiDrawStarts, te._multiDrawCounts, te._multiDrawCount);
            else {
              let pt = te._multiDrawStarts,
                Rt = te._multiDrawCounts,
                $t = te._multiDrawCount,
                nt = ze ? Ne.get(ze).bytesPerElement : 1,
                et = fe.get(ce).currentProgram.getUniforms();
              for (let Pi = 0; Pi < $t; Pi++) (et.setValue(j, "_gl_DrawID", Pi), At.render(pt[Pi] / nt, Rt[Pi]));
            }
          } else if (te.isInstancedMesh) At.renderInstances(ut, Lt, te.count);
          else if (ee.isInstancedBufferGeometry) {
            let pt = ee._maxInstanceCount !== void 0 ? ee._maxInstanceCount : 1 / 0,
              Rt = Math.min(ee.instanceCount, pt);
            At.renderInstances(ut, Lt, Rt);
          } else At.render(ut, Lt);
        }),
        (this.compile = function (L, J, ee = null) {
          (ee === null && (ee = L),
            (v = xt.get(ee)),
            v.init(J),
            m.push(v),
            ee.traverseVisible(function (te) {
              te.isLight && te.layers.test(J.layers) && (v.pushLight(te), te.castShadow && v.pushShadow(te));
            }),
            L !== ee &&
              L.traverseVisible(function (te) {
                te.isLight && te.layers.test(J.layers) && (v.pushLight(te), te.castShadow && v.pushShadow(te));
              }),
            v.setupLights());
          let ce = new Set();
          return (
            L.traverse(function (te) {
              if (!(te.isMesh || te.isPoints || te.isLine || te.isSprite)) return;
              let _e = te.material;
              if (_e)
                if (Array.isArray(_e))
                  for (let we = 0; we < _e.length; we++) {
                    let Me = _e[we];
                    (gr(Me, ee, te), ce.add(Me));
                  }
                else (gr(_e, ee, te), ce.add(_e));
            }),
            m.pop(),
            (v = null),
            ce
          );
        }),
        (this.compileAsync = function (L, J, ee = null) {
          let ce = this.compile(L, J, ee);
          return new Promise((te) => {
            function _e() {
              (ce.forEach(function (we) {
                fe.get(we).currentProgram.isReady() && ce.delete(we);
              }),
                ce.size !== 0 ? setTimeout(_e, 10) : te(L));
            }
            V.get("KHR_parallel_shader_compile") !== null ? _e() : setTimeout(_e, 10);
          });
        }));
      let li = null;
      function ri() {
        ci.stop();
      }
      function Hr() {
        ci.start();
      }
      let ci = new Lp();
      function Vr(L, J, ee, ce) {
        if (L.visible === !1) return;
        if (L.layers.test(J.layers)) {
          if (L.isGroup) ee = L.renderOrder;
          else if (L.isLOD) L.autoUpdate === !0 && L.update(J);
          else if (L.isLight) (v.pushLight(L), L.castShadow && v.pushShadow(L));
          else if (L.isSprite) {
            if (!L.frustumCulled || Re.intersectsSprite(L)) {
              ce && O.setFromMatrixPosition(L.matrixWorld).applyMatrix4(q);
              let _e = rt.update(L),
                we = L.material;
              we.visible && y.push(L, _e, we, ee, O.z, null);
            }
          } else if ((L.isMesh || L.isLine || L.isPoints) && (!L.frustumCulled || Re.intersectsObject(L))) {
            let _e = rt.update(L),
              we = L.material;
            if (
              (ce &&
                (L.boundingSphere !== void 0
                  ? (L.boundingSphere === null && L.computeBoundingSphere(), O.copy(L.boundingSphere.center))
                  : (_e.boundingSphere === null && _e.computeBoundingSphere(), O.copy(_e.boundingSphere.center)),
                O.applyMatrix4(L.matrixWorld).applyMatrix4(q)),
              Array.isArray(we))
            ) {
              let Me = _e.groups;
              for (let ze = 0, $e = Me.length; ze < $e; ze++) {
                let We = Me[ze],
                  Xe = we[We.materialIndex];
                Xe && Xe.visible && y.push(L, _e, Xe, ee, O.z, We);
              }
            } else we.visible && y.push(L, _e, we, ee, O.z, null);
          }
        }
        let te = L.children;
        for (let _e = 0, we = te.length; _e < we; _e++) Vr(te[_e], J, ee, ce);
      }
      function za(L, J, ee, ce) {
        let te = L.opaque,
          _e = L.transmissive,
          we = L.transparent;
        (v.setupLightsView(ee),
          Ae === !0 && ht.setGlobalState(x.clippingPlanes, ee),
          ce && Y.viewport(G.copy(ce)),
          te.length > 0 && Zi(te, J, ee),
          _e.length > 0 && Zi(_e, J, ee),
          we.length > 0 && Zi(we, J, ee),
          Y.buffers.depth.setTest(!0),
          Y.buffers.depth.setMask(!0),
          Y.buffers.color.setMask(!0),
          Y.setPolygonOffset(!1));
      }
      function an(L, J, ee, ce) {
        if ((ee.isScene === !0 ? ee.overrideMaterial : null) !== null) return;
        v.state.transmissionRenderTarget[ce.id] === void 0 &&
          (v.state.transmissionRenderTarget[ce.id] = new WebGLRenderTarget(1, 1, {
            generateMipmaps: !0,
            type:
              V.has("EXT_color_buffer_half_float") || V.has("EXT_color_buffer_float")
                ? HalfFloatType
                : UnsignedByteType,
            minFilter: Ar,
            samples: 4,
            stencilBuffer: s,
            resolveDepthBuffer: !1,
            resolveStencilBuffer: !1,
            colorSpace: Mt.workingColorSpace,
          }));
        let te = v.state.transmissionRenderTarget[ce.id],
          _e = ce.viewport || G;
        te.setSize(_e.z, _e.w);
        let we = x.getRenderTarget();
        (x.setRenderTarget(te),
          x.getClearColor($),
          (Z = x.getClearAlpha()),
          Z < 1 && x.setClearColor(16777215, 0.5),
          x.clear(),
          P && Je.render(ee));
        let Me = x.toneMapping;
        x.toneMapping = ir;
        let ze = ce.viewport;
        if (
          (ce.viewport !== void 0 && (ce.viewport = void 0),
          v.setupLightsView(ce),
          Ae === !0 && ht.setGlobalState(x.clippingPlanes, ce),
          Zi(L, ee, ce),
          de.updateMultisampleRenderTarget(te),
          de.updateRenderTargetMipmap(te),
          V.has("WEBGL_multisampled_render_to_texture") === !1)
        ) {
          let $e = !1;
          for (let We = 0, Xe = J.length; We < Xe; We++) {
            let ut = J[We],
              Gt = ut.object,
              Lt = ut.geometry,
              Wt = ut.material,
              At = ut.group;
            if (Wt.side === 2 && Gt.layers.test(ce.layers)) {
              let pt = Wt.side;
              ((Wt.side = ai),
                (Wt.needsUpdate = !0),
                ka(Gt, ee, ce, Lt, Wt, At),
                (Wt.side = pt),
                (Wt.needsUpdate = !0),
                ($e = !0));
            }
          }
          $e === !0 && (de.updateMultisampleRenderTarget(te), de.updateRenderTargetMipmap(te));
        }
        (x.setRenderTarget(we), x.setClearColor($, Z), ze !== void 0 && (ce.viewport = ze), (x.toneMapping = Me));
      }
      function Zi(L, J, ee) {
        let ce = J.isScene === !0 ? J.overrideMaterial : null;
        for (let te = 0, _e = L.length; te < _e; te++) {
          let we = L[te],
            Me = we.object,
            ze = we.geometry,
            $e = ce === null ? we.material : ce,
            We = we.group;
          Me.layers.test(ee.layers) && ka(Me, J, ee, ze, $e, We);
        }
      }
      function ka(L, J, ee, ce, te, _e) {
        (L.onBeforeRender(x, J, ee, ce, te, _e),
          L.modelViewMatrix.multiplyMatrices(ee.matrixWorldInverse, L.matrixWorld),
          L.normalMatrix.getNormalMatrix(L.modelViewMatrix),
          te.onBeforeRender(x, J, ee, ce, L, _e),
          te.transparent === !0 && te.side === 2 && te.forceSinglePass === !1
            ? ((te.side = ai),
              (te.needsUpdate = !0),
              x.renderBufferDirect(ee, J, ce, te, L, _e),
              (te.side = Ni),
              (te.needsUpdate = !0),
              x.renderBufferDirect(ee, J, ce, te, L, _e),
              (te.side = 2))
            : x.renderBufferDirect(ee, J, ce, te, L, _e),
          L.onAfterRender(x, J, ee, ce, te, _e));
      }
      function Ct(L, J, ee) {
        J.isScene !== !0 && (J = z);
        let ce = fe.get(L),
          te = v.state.lights,
          _e = v.state.shadowsArray,
          we = te.state.version,
          Me = Ke.getParameters(L, te.state, _e, J, ee),
          ze = Ke.getProgramCacheKey(Me),
          $e = ce.programs;
        ((ce.environment = L.isMeshStandardMaterial ? J.environment : null),
          (ce.fog = J.fog),
          (ce.envMap = (L.isMeshStandardMaterial ? Pe : Ce).get(L.envMap || ce.environment)),
          (ce.envMapRotation =
            ce.environment !== null && L.envMap === null ? J.environmentRotation : L.envMapRotation),
          $e === void 0 && (L.addEventListener("dispose", mr), ($e = new Map()), (ce.programs = $e)));
        let We = $e.get(ze);
        if (We !== void 0) {
          if (ce.currentProgram === We && ce.lightsStateVersion === we) return (Yt(L, Me), We);
        } else
          ((Me.uniforms = Ke.getUniforms(L)),
            L.onBeforeCompile(Me, x),
            (We = Ke.acquireProgram(Me, ze)),
            $e.set(ze, We),
            (ce.uniforms = Me.uniforms));
        let Xe = ce.uniforms;
        return (
          ((L.isShaderMaterial || L.isRawShaderMaterial) && L.clipping !== !0) || (Xe.clippingPlanes = ht.uniform),
          Yt(L, Me),
          (ce.needsLights = (function (ut) {
            return (
              ut.isMeshLambertMaterial ||
              ut.isMeshToonMaterial ||
              ut.isMeshPhongMaterial ||
              ut.isMeshStandardMaterial ||
              ut.isShadowMaterial ||
              (ut.isShaderMaterial && ut.lights === !0)
            );
          })(L)),
          (ce.lightsStateVersion = we),
          ce.needsLights &&
            ((Xe.ambientLightColor.value = te.state.ambient),
            (Xe.lightProbe.value = te.state.probe),
            (Xe.directionalLights.value = te.state.directional),
            (Xe.directionalLightShadows.value = te.state.directionalShadow),
            (Xe.spotLights.value = te.state.spot),
            (Xe.spotLightShadows.value = te.state.spotShadow),
            (Xe.rectAreaLights.value = te.state.rectArea),
            (Xe.ltc_1.value = te.state.rectAreaLTC1),
            (Xe.ltc_2.value = te.state.rectAreaLTC2),
            (Xe.pointLights.value = te.state.point),
            (Xe.pointLightShadows.value = te.state.pointShadow),
            (Xe.hemisphereLights.value = te.state.hemi),
            (Xe.directionalShadowMap.value = te.state.directionalShadowMap),
            (Xe.directionalShadowMatrix.value = te.state.directionalShadowMatrix),
            (Xe.spotShadowMap.value = te.state.spotShadowMap),
            (Xe.spotLightMatrix.value = te.state.spotLightMatrix),
            (Xe.spotLightMap.value = te.state.spotLightMap),
            (Xe.pointShadowMap.value = te.state.pointShadowMap),
            (Xe.pointShadowMatrix.value = te.state.pointShadowMatrix)),
          (ce.currentProgram = We),
          (ce.uniformsList = null),
          We
        );
      }
      function fi(L) {
        if (L.uniformsList === null) {
          let J = L.currentProgram.getUniforms();
          L.uniformsList = hs.seqWithValue(J.seq, L.uniforms);
        }
        return L.uniformsList;
      }
      function Yt(L, J) {
        let ee = fe.get(L);
        ((ee.outputColorSpace = J.outputColorSpace),
          (ee.batching = J.batching),
          (ee.batchingColor = J.batchingColor),
          (ee.instancing = J.instancing),
          (ee.instancingColor = J.instancingColor),
          (ee.instancingMorph = J.instancingMorph),
          (ee.skinning = J.skinning),
          (ee.morphTargets = J.morphTargets),
          (ee.morphNormals = J.morphNormals),
          (ee.morphColors = J.morphColors),
          (ee.morphTargetsCount = J.morphTargetsCount),
          (ee.numClippingPlanes = J.numClippingPlanes),
          (ee.numIntersection = J.numClipIntersection),
          (ee.vertexAlphas = J.vertexAlphas),
          (ee.vertexTangents = J.vertexTangents),
          (ee.toneMapping = J.toneMapping));
      }
      (ci.setAnimationLoop(function (L) {
        li && li(L);
      }),
        typeof self != "undefined" && ci.setContext(self),
        (this.setAnimationLoop = function (L) {
          ((li = L), Pt.setAnimationLoop(L), L === null ? ci.stop() : ci.start());
        }),
        Pt.addEventListener("sessionstart", ri),
        Pt.addEventListener("sessionend", Hr),
        (this.render = function (L, J) {
          if (J !== void 0 && J.isCamera !== !0)
            return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
          if (b === !0) return;
          if (
            (L.matrixWorldAutoUpdate === !0 && L.updateMatrixWorld(),
            J.parent === null && J.matrixWorldAutoUpdate === !0 && J.updateMatrixWorld(),
            Pt.enabled === !0 &&
              Pt.isPresenting === !0 &&
              (Pt.cameraAutoUpdate === !0 && Pt.updateCamera(J), (J = Pt.getCamera())),
            L.isScene === !0 && L.onBeforeRender(x, L, J, C),
            (v = xt.get(L, m.length)),
            v.init(J),
            m.push(v),
            q.multiplyMatrices(J.projectionMatrix, J.matrixWorldInverse),
            Re.setFromProjectionMatrix(q),
            (U = this.localClippingEnabled),
            (Ae = ht.init(this.clippingPlanes, U)),
            (y = Oe.get(L, d.length)),
            y.init(),
            d.push(y),
            Pt.enabled === !0 && Pt.isPresenting === !0)
          ) {
            let _e = x.xr.getDepthSensingMesh();
            _e !== null && Vr(_e, J, -1 / 0, x.sortObjects);
          }
          (Vr(L, J, 0, x.sortObjects),
            y.finish(),
            x.sortObjects === !0 && y.sort(ve, Ee),
            (P = Pt.enabled === !1 || Pt.isPresenting === !1 || Pt.hasDepthSensing() === !1),
            P && Je.addToRenderList(y, L),
            this.info.render.frame++,
            Ae === !0 && ht.beginShadows());
          let ee = v.state.shadowsArray;
          (Ie.render(ee, L, J), Ae === !0 && ht.endShadows(), this.info.autoReset === !0 && this.info.reset());
          let ce = y.opaque,
            te = y.transmissive;
          if ((v.setupLights(), J.isArrayCamera)) {
            let _e = J.cameras;
            if (te.length > 0) for (let we = 0, Me = _e.length; we < Me; we++) an(ce, te, L, _e[we]);
            P && Je.render(L);
            for (let we = 0, Me = _e.length; we < Me; we++) {
              let ze = _e[we];
              za(y, L, ze, ze.viewport);
            }
          } else (te.length > 0 && an(ce, te, L, J), P && Je.render(L), za(y, L, J));
          (C !== null && (de.updateMultisampleRenderTarget(C), de.updateRenderTargetMipmap(C)),
            L.isScene === !0 && L.onAfterRender(x, L, J),
            Si.resetDefaultState(),
            (F = -1),
            (N = null),
            m.pop(),
            m.length > 0
              ? ((v = m[m.length - 1]), Ae === !0 && ht.setGlobalState(x.clippingPlanes, v.state.camera))
              : (v = null),
            d.pop(),
            (y = d.length > 0 ? d[d.length - 1] : null));
        }),
        (this.getActiveCubeFace = function () {
          return w;
        }),
        (this.getActiveMipmapLevel = function () {
          return A;
        }),
        (this.getRenderTarget = function () {
          return C;
        }),
        (this.setRenderTargetTextures = function (L, J, ee) {
          ((fe.get(L.texture).__webglTexture = J), (fe.get(L.depthTexture).__webglTexture = ee));
          let ce = fe.get(L);
          ((ce.__hasExternalTextures = !0),
            (ce.__autoAllocateDepthBuffer = ee === void 0),
            ce.__autoAllocateDepthBuffer ||
              (V.has("WEBGL_multisampled_render_to_texture") === !0 &&
                (console.warn(
                  "THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided",
                ),
                (ce.__useRenderToTexture = !1))));
        }),
        (this.setRenderTargetFramebuffer = function (L, J) {
          let ee = fe.get(L);
          ((ee.__webglFramebuffer = J), (ee.__useDefaultFramebuffer = J === void 0));
        }),
        (this.setRenderTarget = function (L, J = 0, ee = 0) {
          ((C = L), (w = J), (A = ee));
          let ce = !0,
            te = null,
            _e = !1,
            we = !1;
          if (L) {
            let Me = fe.get(L);
            if (Me.__useDefaultFramebuffer !== void 0) (Y.bindFramebuffer(j.FRAMEBUFFER, null), (ce = !1));
            else if (Me.__webglFramebuffer === void 0) de.setupRenderTarget(L);
            else if (Me.__hasExternalTextures)
              de.rebindTextures(L, fe.get(L.texture).__webglTexture, fe.get(L.depthTexture).__webglTexture);
            else if (L.depthBuffer) {
              let We = L.depthTexture;
              if (Me.__boundDepthTexture !== We) {
                if (We !== null && fe.has(We) && (L.width !== We.image.width || L.height !== We.image.height))
                  throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");
                de.setupDepthRenderbuffer(L);
              }
            }
            let ze = L.texture;
            (ze.isData3DTexture || ze.isDataArrayTexture || ze.isCompressedArrayTexture) && (we = !0);
            let $e = fe.get(L).__webglFramebuffer;
            (L.isWebGLCubeRenderTarget
              ? ((te = Array.isArray($e[J]) ? $e[J][ee] : $e[J]), (_e = !0))
              : (te =
                  L.samples > 0 && de.useMultisampledRTT(L) === !1
                    ? fe.get(L).__webglMultisampledFramebuffer
                    : Array.isArray($e)
                      ? $e[ee]
                      : $e),
              G.copy(L.viewport),
              W.copy(L.scissor),
              (B = L.scissorTest));
          } else (G.copy(Ue).multiplyScalar(me).floor(), W.copy(pe).multiplyScalar(me).floor(), (B = ge));
          if (
            (Y.bindFramebuffer(j.FRAMEBUFFER, te) && ce && Y.drawBuffers(L, te),
            Y.viewport(G),
            Y.scissor(W),
            Y.setScissorTest(B),
            _e)
          ) {
            let Me = fe.get(L.texture);
            j.framebufferTexture2D(
              j.FRAMEBUFFER,
              j.COLOR_ATTACHMENT0,
              j.TEXTURE_CUBE_MAP_POSITIVE_X + J,
              Me.__webglTexture,
              ee,
            );
          } else if (we) {
            let Me = fe.get(L.texture),
              ze = J || 0;
            j.framebufferTextureLayer(j.FRAMEBUFFER, j.COLOR_ATTACHMENT0, Me.__webglTexture, ee || 0, ze);
          }
          F = -1;
        }),
        (this.readRenderTargetPixels = function (L, J, ee, ce, te, _e, we) {
          if (!L || !L.isWebGLRenderTarget)
            return void console.error(
              "THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.",
            );
          let Me = fe.get(L).__webglFramebuffer;
          if ((L.isWebGLCubeRenderTarget && we !== void 0 && (Me = Me[we]), Me)) {
            Y.bindFramebuffer(j.FRAMEBUFFER, Me);
            try {
              let ze = L.texture,
                $e = ze.format,
                We = ze.type;
              if (!re.textureFormatReadable($e))
                return void console.error(
                  "THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.",
                );
              if (!re.textureTypeReadable(We))
                return void console.error(
                  "THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.",
                );
              J >= 0 &&
                J <= L.width - ce &&
                ee >= 0 &&
                ee <= L.height - te &&
                j.readPixels(J, ee, ce, te, qt.convert($e), qt.convert(We), _e);
            } finally {
              let ze = C !== null ? fe.get(C).__webglFramebuffer : null;
              Y.bindFramebuffer(j.FRAMEBUFFER, ze);
            }
          }
        }),
        (this.readRenderTargetPixelsAsync = async function (L, J, ee, ce, te, _e, we) {
          if (!L || !L.isWebGLRenderTarget)
            throw new Error(
              "THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.",
            );
          let Me = fe.get(L).__webglFramebuffer;
          if ((L.isWebGLCubeRenderTarget && we !== void 0 && (Me = Me[we]), Me)) {
            let ze = L.texture,
              $e = ze.format,
              We = ze.type;
            if (!re.textureFormatReadable($e))
              throw new Error(
                "THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.",
              );
            if (!re.textureTypeReadable(We))
              throw new Error(
                "THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.",
              );
            if (J >= 0 && J <= L.width - ce && ee >= 0 && ee <= L.height - te) {
              Y.bindFramebuffer(j.FRAMEBUFFER, Me);
              let Xe = j.createBuffer();
              (j.bindBuffer(j.PIXEL_PACK_BUFFER, Xe),
                j.bufferData(j.PIXEL_PACK_BUFFER, _e.byteLength, j.STREAM_READ),
                j.readPixels(J, ee, ce, te, qt.convert($e), qt.convert(We), 0));
              let ut = C !== null ? fe.get(C).__webglFramebuffer : null;
              Y.bindFramebuffer(j.FRAMEBUFFER, ut);
              let Gt = j.fenceSync(j.SYNC_GPU_COMMANDS_COMPLETE, 0);
              return (
                j.flush(),
                await (function (Lt, Wt, At) {
                  return new Promise(function (pt, Rt) {
                    setTimeout(function $t() {
                      switch (Lt.clientWaitSync(Wt, Lt.SYNC_FLUSH_COMMANDS_BIT, 0)) {
                        case Lt.WAIT_FAILED:
                          Rt();
                          break;
                        case Lt.TIMEOUT_EXPIRED:
                          setTimeout($t, At);
                          break;
                        default:
                          pt();
                      }
                    }, At);
                  });
                })(j, Gt, 4),
                j.bindBuffer(j.PIXEL_PACK_BUFFER, Xe),
                j.getBufferSubData(j.PIXEL_PACK_BUFFER, 0, _e),
                j.deleteBuffer(Xe),
                j.deleteSync(Gt),
                _e
              );
            }
            throw new Error(
              "THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.",
            );
          }
        }),
        (this.copyFramebufferToTexture = function (L, J = null, ee = 0) {
          L.isTexture !== !0 &&
            (Uo("WebGLRenderer: copyFramebufferToTexture function signature has changed."),
            (J = arguments[0] || null),
            (L = arguments[1]));
          let ce = Math.pow(2, -ee),
            te = Math.floor(L.image.width * ce),
            _e = Math.floor(L.image.height * ce),
            we = J !== null ? J.x : 0,
            Me = J !== null ? J.y : 0;
          (de.setTexture2D(L, 0), j.copyTexSubImage2D(j.TEXTURE_2D, ee, 0, 0, we, Me, te, _e), Y.unbindTexture());
        }),
        (this.copyTextureToTexture = function (L, J, ee = null, ce = null, te = 0) {
          let _e, we, Me, ze, $e, We;
          (L.isTexture !== !0 &&
            (Uo("WebGLRenderer: copyTextureToTexture function signature has changed."),
            (ce = arguments[0] || null),
            (L = arguments[1]),
            (J = arguments[2]),
            (te = arguments[3] || 0),
            (ee = null)),
            ee !== null
              ? ((_e = ee.max.x - ee.min.x), (we = ee.max.y - ee.min.y), (Me = ee.min.x), (ze = ee.min.y))
              : ((_e = L.image.width), (we = L.image.height), (Me = 0), (ze = 0)),
            ce !== null ? (($e = ce.x), (We = ce.y)) : (($e = 0), (We = 0)));
          let Xe = qt.convert(J.format),
            ut = qt.convert(J.type);
          (de.setTexture2D(J, 0),
            j.pixelStorei(j.UNPACK_FLIP_Y_WEBGL, J.flipY),
            j.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL, J.premultiplyAlpha),
            j.pixelStorei(j.UNPACK_ALIGNMENT, J.unpackAlignment));
          let Gt = j.getParameter(j.UNPACK_ROW_LENGTH),
            Lt = j.getParameter(j.UNPACK_IMAGE_HEIGHT),
            Wt = j.getParameter(j.UNPACK_SKIP_PIXELS),
            At = j.getParameter(j.UNPACK_SKIP_ROWS),
            pt = j.getParameter(j.UNPACK_SKIP_IMAGES),
            Rt = L.isCompressedTexture ? L.mipmaps[te] : L.image;
          (j.pixelStorei(j.UNPACK_ROW_LENGTH, Rt.width),
            j.pixelStorei(j.UNPACK_IMAGE_HEIGHT, Rt.height),
            j.pixelStorei(j.UNPACK_SKIP_PIXELS, Me),
            j.pixelStorei(j.UNPACK_SKIP_ROWS, ze),
            L.isDataTexture
              ? j.texSubImage2D(j.TEXTURE_2D, te, $e, We, _e, we, Xe, ut, Rt.data)
              : L.isCompressedTexture
                ? j.compressedTexSubImage2D(j.TEXTURE_2D, te, $e, We, Rt.width, Rt.height, Xe, Rt.data)
                : j.texSubImage2D(j.TEXTURE_2D, te, $e, We, _e, we, Xe, ut, Rt),
            j.pixelStorei(j.UNPACK_ROW_LENGTH, Gt),
            j.pixelStorei(j.UNPACK_IMAGE_HEIGHT, Lt),
            j.pixelStorei(j.UNPACK_SKIP_PIXELS, Wt),
            j.pixelStorei(j.UNPACK_SKIP_ROWS, At),
            j.pixelStorei(j.UNPACK_SKIP_IMAGES, pt),
            te === 0 && J.generateMipmaps && j.generateMipmap(j.TEXTURE_2D),
            Y.unbindTexture());
        }),
        (this.copyTextureToTexture3D = function (L, J, ee = null, ce = null, te = 0) {
          let _e, we, Me, ze, $e, We, Xe, ut, Gt;
          L.isTexture !== !0 &&
            (Uo("WebGLRenderer: copyTextureToTexture3D function signature has changed."),
            (ee = arguments[0] || null),
            (ce = arguments[1] || null),
            (L = arguments[2]),
            (J = arguments[3]),
            (te = arguments[4] || 0));
          let Lt = L.isCompressedTexture ? L.mipmaps[te] : L.image;
          (ee !== null
            ? ((_e = ee.max.x - ee.min.x),
              (we = ee.max.y - ee.min.y),
              (Me = ee.max.z - ee.min.z),
              (ze = ee.min.x),
              ($e = ee.min.y),
              (We = ee.min.z))
            : ((_e = Lt.width), (we = Lt.height), (Me = Lt.depth), (ze = 0), ($e = 0), (We = 0)),
            ce !== null ? ((Xe = ce.x), (ut = ce.y), (Gt = ce.z)) : ((Xe = 0), (ut = 0), (Gt = 0)));
          let Wt = qt.convert(J.format),
            At = qt.convert(J.type),
            pt;
          if (J.isData3DTexture) (de.setTexture3D(J, 0), (pt = j.TEXTURE_3D));
          else {
            if (!J.isDataArrayTexture && !J.isCompressedArrayTexture)
              return void console.warn(
                "THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.",
              );
            (de.setTexture2DArray(J, 0), (pt = j.TEXTURE_2D_ARRAY));
          }
          (j.pixelStorei(j.UNPACK_FLIP_Y_WEBGL, J.flipY),
            j.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL, J.premultiplyAlpha),
            j.pixelStorei(j.UNPACK_ALIGNMENT, J.unpackAlignment));
          let Rt = j.getParameter(j.UNPACK_ROW_LENGTH),
            $t = j.getParameter(j.UNPACK_IMAGE_HEIGHT),
            nt = j.getParameter(j.UNPACK_SKIP_PIXELS),
            et = j.getParameter(j.UNPACK_SKIP_ROWS),
            Pi = j.getParameter(j.UNPACK_SKIP_IMAGES);
          (j.pixelStorei(j.UNPACK_ROW_LENGTH, Lt.width),
            j.pixelStorei(j.UNPACK_IMAGE_HEIGHT, Lt.height),
            j.pixelStorei(j.UNPACK_SKIP_PIXELS, ze),
            j.pixelStorei(j.UNPACK_SKIP_ROWS, $e),
            j.pixelStorei(j.UNPACK_SKIP_IMAGES, We),
            L.isDataTexture || L.isData3DTexture
              ? j.texSubImage3D(pt, te, Xe, ut, Gt, _e, we, Me, Wt, At, Lt.data)
              : J.isCompressedArrayTexture
                ? j.compressedTexSubImage3D(pt, te, Xe, ut, Gt, _e, we, Me, Wt, Lt.data)
                : j.texSubImage3D(pt, te, Xe, ut, Gt, _e, we, Me, Wt, At, Lt),
            j.pixelStorei(j.UNPACK_ROW_LENGTH, Rt),
            j.pixelStorei(j.UNPACK_IMAGE_HEIGHT, $t),
            j.pixelStorei(j.UNPACK_SKIP_PIXELS, nt),
            j.pixelStorei(j.UNPACK_SKIP_ROWS, et),
            j.pixelStorei(j.UNPACK_SKIP_IMAGES, Pi),
            te === 0 && J.generateMipmaps && j.generateMipmap(pt),
            Y.unbindTexture());
        }),
        (this.initRenderTarget = function (L) {
          fe.get(L).__webglFramebuffer === void 0 && de.setupRenderTarget(L);
        }),
        (this.initTexture = function (L) {
          (L.isCubeTexture
            ? de.setTextureCube(L, 0)
            : L.isData3DTexture
              ? de.setTexture3D(L, 0)
              : L.isDataArrayTexture || L.isCompressedArrayTexture
                ? de.setTexture2DArray(L, 0)
                : de.setTexture2D(L, 0),
            Y.unbindTexture());
        }),
        (this.resetState = function () {
          ((w = 0), (A = 0), (C = null), Y.reset(), Si.reset());
        }),
        typeof __THREE_DEVTOOLS__ != "undefined" &&
          __THREE_DEVTOOLS__.dispatchEvent(
            new CustomEvent("observe", {
              detail: this,
            }),
          ));
    }
    get coordinateSystem() {
      return WebGLCoordinateSystem;
    }
    get outputColorSpace() {
      return this._outputColorSpace;
    }
    set outputColorSpace(e) {
      this._outputColorSpace = e;
      let t = this.getContext();
      ((t.drawingBufferColorSpace = e === DisplayP3ColorSpace ? "display-p3" : "srgb"),
        (t.unpackColorSpace = Mt.workingColorSpace === LinearDisplayP3ColorSpace ? "display-p3" : "srgb"));
    }
  },
  FogExp2 = class n {
    constructor(e, t = 25e-5) {
      ((this.isFogExp2 = !0), (this.name = ""), (this.color = new Color(e)), (this.density = t));
    }
    clone() {
      return new n(this.color, this.density);
    }
    toJSON() {
      return {
        type: "FogExp2",
        name: this.name,
        color: this.color.getHex(),
        density: this.density,
      };
    }
  };
var Scene = class extends Object3D {
  constructor() {
    (super(),
      (this.isScene = !0),
      (this.type = "Scene"),
      (this.background = null),
      (this.environment = null),
      (this.fog = null),
      (this.backgroundBlurriness = 0),
      (this.backgroundIntensity = 1),
      (this.backgroundRotation = new Euler()),
      (this.environmentIntensity = 1),
      (this.environmentRotation = new Euler()),
      (this.overrideMaterial = null),
      typeof __THREE_DEVTOOLS__ != "undefined" &&
        __THREE_DEVTOOLS__.dispatchEvent(
          new CustomEvent("observe", {
            detail: this,
          }),
        ));
  }
  copy(e, t) {
    return (
      super.copy(e, t),
      e.background !== null && (this.background = e.background.clone()),
      e.environment !== null && (this.environment = e.environment.clone()),
      e.fog !== null && (this.fog = e.fog.clone()),
      (this.backgroundBlurriness = e.backgroundBlurriness),
      (this.backgroundIntensity = e.backgroundIntensity),
      this.backgroundRotation.copy(e.backgroundRotation),
      (this.environmentIntensity = e.environmentIntensity),
      this.environmentRotation.copy(e.environmentRotation),
      e.overrideMaterial !== null && (this.overrideMaterial = e.overrideMaterial.clone()),
      (this.matrixAutoUpdate = e.matrixAutoUpdate),
      this
    );
  }
  toJSON(e) {
    let t = super.toJSON(e);
    return (
      this.fog !== null && (t.object.fog = this.fog.toJSON()),
      this.backgroundBlurriness > 0 && (t.object.backgroundBlurriness = this.backgroundBlurriness),
      this.backgroundIntensity !== 1 && (t.object.backgroundIntensity = this.backgroundIntensity),
      (t.object.backgroundRotation = this.backgroundRotation.toArray()),
      this.environmentIntensity !== 1 && (t.object.environmentIntensity = this.environmentIntensity),
      (t.object.environmentRotation = this.environmentRotation.toArray()),
      t
    );
  }
};
var q1 = new Vector3();
var Y1 = new Vector3(),
  Z1 = new Vector3(),
  K1 = new Vector3(),
  J1 = new Vector2(),
  $1 = new Vector2(),
  Q1 = new Matrix4(),
  ev = new Vector3(),
  tv = new Vector3(),
  iv = new Vector3(),
  nv = new Vector2(),
  rv = new Vector2(),
  sv = new Vector2();
var av = new Vector3(),
  ov = new Vector3();
var lv = new Vector3(),
  cv = new Vector4(),
  hv = new Vector4(),
  uv = new Vector3(),
  dv = new Matrix4(),
  pv = new Vector3(),
  fv = new Sphere(),
  mv = new Matrix4(),
  gv = new gs();
var DataTexture = class extends Texture {
    constructor(e = null, t = 1, i = 1, r, s, a, o, c, l = 1003, h = 1003, p, u) {
      (super(null, a, o, c, l, h, r, s, p, u),
        (this.isDataTexture = !0),
        (this.image = {
          data: e,
          width: t,
          height: i,
        }),
        (this.generateMipmaps = !1),
        (this.flipY = !1),
        (this.unpackAlignment = 1));
    }
  },
  vv = new Matrix4(),
  xv = new Matrix4();
var yv = new Matrix4(),
  _v = new Matrix4();
var bv = new Box3(),
  Mv = new Matrix4(),
  Sv = new Mesh(),
  wv = new Sphere();
var Ch = class {
    constructor() {
      ((this.index = 0), (this.pool = []), (this.list = []));
    }
    push(e, t, i) {
      let r = this.pool,
        s = this.list;
      this.index >= r.length &&
        r.push({
          start: -1,
          count: -1,
          z: -1,
          index: -1,
        });
      let a = r[this.index];
      (s.push(a), this.index++, (a.start = e.start), (a.count = e.count), (a.z = t), (a.index = i));
    }
    reset() {
      ((this.list.length = 0), (this.index = 0));
    }
  },
  Tv = new Matrix4(),
  Ev = new Matrix4(),
  Av = new Matrix4(),
  Cv = new Color(1, 1, 1),
  Rv = new Matrix4(),
  Pv = new _s(),
  Lv = new Box3(),
  Iv = new Sphere(),
  Dv = new Vector3(),
  Nv = new Vector3(),
  Uv = new Vector3(),
  Ov = new Ch(),
  Fv = new Mesh();
var LineBasicMaterial = class extends Material {
    constructor(e) {
      (super(),
        (this.isLineBasicMaterial = !0),
        (this.type = "LineBasicMaterial"),
        (this.color = new Color(16777215)),
        (this.map = null),
        (this.linewidth = 1),
        (this.linecap = "round"),
        (this.linejoin = "round"),
        (this.fog = !0),
        this.setValues(e));
    }
    copy(e) {
      return (
        super.copy(e),
        this.color.copy(e.color),
        (this.map = e.map),
        (this.linewidth = e.linewidth),
        (this.linecap = e.linecap),
        (this.linejoin = e.linejoin),
        (this.fog = e.fog),
        this
      );
    }
  },
  Jo = new Vector3(),
  $o = new Vector3(),
  ep = new Matrix4(),
  sa = new gs(),
  xo = new Sphere(),
  Ec = new Vector3(),
  tp = new Vector3(),
  Line = class extends Object3D {
    constructor(e = new BufferGeometry(), t = new LineBasicMaterial()) {
      (super(),
        (this.isLine = !0),
        (this.type = "Line"),
        (this.geometry = e),
        (this.material = t),
        this.updateMorphTargets());
    }
    copy(e, t) {
      return (
        super.copy(e, t),
        (this.material = Array.isArray(e.material) ? e.material.slice() : e.material),
        (this.geometry = e.geometry),
        this
      );
    }
    computeLineDistances() {
      let e = this.geometry;
      if (e.index === null) {
        let t = e.attributes.position,
          i = [0];
        for (let r = 1, s = t.count; r < s; r++)
          (Jo.fromBufferAttribute(t, r - 1),
            $o.fromBufferAttribute(t, r),
            (i[r] = i[r - 1]),
            (i[r] += Jo.distanceTo($o)));
        e.setAttribute("lineDistance", new Float32BufferAttribute(i, 1));
      } else
        console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
      return this;
    }
    raycast(e, t) {
      let i = this.geometry,
        r = this.matrixWorld,
        s = e.params.Line.threshold,
        a = i.drawRange;
      if (
        (i.boundingSphere === null && i.computeBoundingSphere(),
        xo.copy(i.boundingSphere),
        xo.applyMatrix4(r),
        (xo.radius += s),
        e.ray.intersectsSphere(xo) === !1)
      )
        return;
      (ep.copy(r).invert(), sa.copy(e.ray).applyMatrix4(ep));
      let o = s / ((this.scale.x + this.scale.y + this.scale.z) / 3),
        c = o * o,
        l = this.isLineSegments ? 2 : 1,
        h = i.index,
        p = i.attributes.position;
      if (h !== null) {
        let u = Math.max(0, a.start),
          f = Math.min(h.count, a.start + a.count);
        for (let g = u, y = f - 1; g < y; g += l) {
          let v = h.getX(g),
            d = h.getX(g + 1),
            m = yo(this, e, sa, c, v, d);
          m && t.push(m);
        }
        if (this.isLineLoop) {
          let g = h.getX(f - 1),
            y = h.getX(u),
            v = yo(this, e, sa, c, g, y);
          v && t.push(v);
        }
      } else {
        let u = Math.max(0, a.start),
          f = Math.min(p.count, a.start + a.count);
        for (let g = u, y = f - 1; g < y; g += l) {
          let v = yo(this, e, sa, c, g, g + 1);
          v && t.push(v);
        }
        if (this.isLineLoop) {
          let g = yo(this, e, sa, c, f - 1, u);
          g && t.push(g);
        }
      }
    }
    updateMorphTargets() {
      let e = this.geometry.morphAttributes,
        t = Object.keys(e);
      if (t.length > 0) {
        let i = e[t[0]];
        if (i !== void 0) {
          ((this.morphTargetInfluences = []), (this.morphTargetDictionary = {}));
          for (let r = 0, s = i.length; r < s; r++) {
            let a = i[r].name || String(r);
            (this.morphTargetInfluences.push(0), (this.morphTargetDictionary[a] = r));
          }
        }
      }
    }
  };
function yo(n, e, t, i, r, s) {
  let a = n.geometry.attributes.position;
  if ((Jo.fromBufferAttribute(a, r), $o.fromBufferAttribute(a, s), t.distanceSqToSegment(Jo, $o, Ec, tp) > i)) return;
  Ec.applyMatrix4(n.matrixWorld);
  let o = e.ray.origin.distanceTo(Ec);
  return o < e.near || o > e.far
    ? void 0
    : {
        distance: o,
        point: tp.clone().applyMatrix4(n.matrixWorld),
        index: r,
        face: null,
        faceIndex: null,
        barycoord: null,
        object: n,
      };
}
var ip = new Vector3(),
  np = new Vector3(),
  LineSegments = class extends Line {
    constructor(e, t) {
      (super(e, t), (this.isLineSegments = !0), (this.type = "LineSegments"));
    }
    computeLineDistances() {
      let e = this.geometry;
      if (e.index === null) {
        let t = e.attributes.position,
          i = [];
        for (let r = 0, s = t.count; r < s; r += 2)
          (ip.fromBufferAttribute(t, r),
            np.fromBufferAttribute(t, r + 1),
            (i[r] = r === 0 ? 0 : i[r - 1]),
            (i[r + 1] = i[r] + ip.distanceTo(np)));
        e.setAttribute("lineDistance", new Float32BufferAttribute(i, 1));
      } else
        console.warn(
          "THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.",
        );
      return this;
    }
  };
var PointsMaterial = class extends Material {
    constructor(e) {
      (super(),
        (this.isPointsMaterial = !0),
        (this.type = "PointsMaterial"),
        (this.color = new Color(16777215)),
        (this.map = null),
        (this.alphaMap = null),
        (this.size = 1),
        (this.sizeAttenuation = !0),
        (this.fog = !0),
        this.setValues(e));
    }
    copy(e) {
      return (
        super.copy(e),
        this.color.copy(e.color),
        (this.map = e.map),
        (this.alphaMap = e.alphaMap),
        (this.size = e.size),
        (this.sizeAttenuation = e.sizeAttenuation),
        (this.fog = e.fog),
        this
      );
    }
  },
  rp = new Matrix4(),
  Ph = new gs(),
  _o = new Sphere(),
  bo = new Vector3(),
  Points = class extends Object3D {
    constructor(e = new BufferGeometry(), t = new PointsMaterial()) {
      (super(),
        (this.isPoints = !0),
        (this.type = "Points"),
        (this.geometry = e),
        (this.material = t),
        this.updateMorphTargets());
    }
    copy(e, t) {
      return (
        super.copy(e, t),
        (this.material = Array.isArray(e.material) ? e.material.slice() : e.material),
        (this.geometry = e.geometry),
        this
      );
    }
    raycast(e, t) {
      let i = this.geometry,
        r = this.matrixWorld,
        s = e.params.Points.threshold,
        a = i.drawRange;
      if (
        (i.boundingSphere === null && i.computeBoundingSphere(),
        _o.copy(i.boundingSphere),
        _o.applyMatrix4(r),
        (_o.radius += s),
        e.ray.intersectsSphere(_o) === !1)
      )
        return;
      (rp.copy(r).invert(), Ph.copy(e.ray).applyMatrix4(rp));
      let o = s / ((this.scale.x + this.scale.y + this.scale.z) / 3),
        c = o * o,
        l = i.index,
        h = i.attributes.position;
      if (l !== null)
        for (let p = Math.max(0, a.start), u = Math.min(l.count, a.start + a.count); p < u; p++) {
          let f = l.getX(p);
          (bo.fromBufferAttribute(h, f), sp(bo, f, c, r, e, t, this));
        }
      else
        for (let p = Math.max(0, a.start), u = Math.min(h.count, a.start + a.count); p < u; p++)
          (bo.fromBufferAttribute(h, p), sp(bo, p, c, r, e, t, this));
    }
    updateMorphTargets() {
      let e = this.geometry.morphAttributes,
        t = Object.keys(e);
      if (t.length > 0) {
        let i = e[t[0]];
        if (i !== void 0) {
          ((this.morphTargetInfluences = []), (this.morphTargetDictionary = {}));
          for (let r = 0, s = i.length; r < s; r++) {
            let a = i[r].name || String(r);
            (this.morphTargetInfluences.push(0), (this.morphTargetDictionary[a] = r));
          }
        }
      }
    }
  };
function sp(n, e, t, i, r, s, a) {
  let o = Ph.distanceSqToPoint(n);
  if (o < t) {
    let c = new Vector3();
    (Ph.closestPointToPoint(n, c), c.applyMatrix4(i));
    let l = r.ray.origin.distanceTo(c);
    if (l < r.near || l > r.far) return;
    s.push({
      distance: l,
      distanceToRay: Math.sqrt(o),
      point: c,
      index: e,
      face: null,
      faceIndex: null,
      barycoord: null,
      object: a,
    });
  }
}
var CanvasTexture = class extends Texture {
    constructor(e, t, i, r, s, a, o, c, l) {
      (super(e, t, i, r, s, a, o, c, l), (this.isCanvasTexture = !0), (this.needsUpdate = !0));
    }
  },
  Curve = class {
    constructor() {
      ((this.type = "Curve"), (this.arcLengthDivisions = 200));
    }
    getPoint() {
      return (console.warn("THREE.Curve: .getPoint() not implemented."), null);
    }
    getPointAt(e, t) {
      let i = this.getUtoTmapping(e);
      return this.getPoint(i, t);
    }
    getPoints(e = 5) {
      let t = [];
      for (let i = 0; i <= e; i++) t.push(this.getPoint(i / e));
      return t;
    }
    getSpacedPoints(e = 5) {
      let t = [];
      for (let i = 0; i <= e; i++) t.push(this.getPointAt(i / e));
      return t;
    }
    getLength() {
      let e = this.getLengths();
      return e[e.length - 1];
    }
    getLengths(e = this.arcLengthDivisions) {
      if (this.cacheArcLengths && this.cacheArcLengths.length === e + 1 && !this.needsUpdate)
        return this.cacheArcLengths;
      this.needsUpdate = !1;
      let t = [],
        i,
        r = this.getPoint(0),
        s = 0;
      t.push(0);
      for (let a = 1; a <= e; a++) ((i = this.getPoint(a / e)), (s += i.distanceTo(r)), t.push(s), (r = i));
      return ((this.cacheArcLengths = t), t);
    }
    updateArcLengths() {
      ((this.needsUpdate = !0), this.getLengths());
    }
    getUtoTmapping(e, t) {
      let i = this.getLengths(),
        r = 0,
        s = i.length,
        a;
      a = t || e * i[s - 1];
      let o,
        c = 0,
        l = s - 1;
      for (; c <= l;)
        if (((r = Math.floor(c + (l - c) / 2)), (o = i[r] - a), o < 0)) c = r + 1;
        else {
          if (!(o > 0)) {
            l = r;
            break;
          }
          l = r - 1;
        }
      if (((r = l), i[r] === a)) return r / (s - 1);
      let h = i[r];
      return (r + (a - h) / (i[r + 1] - h)) / (s - 1);
    }
    getTangent(e, t) {
      let r = e - 1e-4,
        s = e + 1e-4;
      (r < 0 && (r = 0), s > 1 && (s = 1));
      let a = this.getPoint(r),
        o = this.getPoint(s),
        c = t || (a.isVector2 ? new Vector2() : new Vector3());
      return (c.copy(o).sub(a).normalize(), c);
    }
    getTangentAt(e, t) {
      let i = this.getUtoTmapping(e);
      return this.getTangent(i, t);
    }
    computeFrenetFrames(e, t) {
      let i = new Vector3(),
        r = [],
        s = [],
        a = [],
        o = new Vector3(),
        c = new Matrix4();
      for (let f = 0; f <= e; f++) {
        let g = f / e;
        r[f] = this.getTangentAt(g, new Vector3());
      }
      ((s[0] = new Vector3()), (a[0] = new Vector3()));
      let l = Number.MAX_VALUE,
        h = Math.abs(r[0].x),
        p = Math.abs(r[0].y),
        u = Math.abs(r[0].z);
      (h <= l && ((l = h), i.set(1, 0, 0)),
        p <= l && ((l = p), i.set(0, 1, 0)),
        u <= l && i.set(0, 0, 1),
        o.crossVectors(r[0], i).normalize(),
        s[0].crossVectors(r[0], o),
        a[0].crossVectors(r[0], s[0]));
      for (let f = 1; f <= e; f++) {
        if (
          ((s[f] = s[f - 1].clone()),
          (a[f] = a[f - 1].clone()),
          o.crossVectors(r[f - 1], r[f]),
          o.length() > Number.EPSILON)
        ) {
          o.normalize();
          let g = Math.acos(ui(r[f - 1].dot(r[f]), -1, 1));
          s[f].applyMatrix4(c.makeRotationAxis(o, g));
        }
        a[f].crossVectors(r[f], s[f]);
      }
      if (t === !0) {
        let f = Math.acos(ui(s[0].dot(s[e]), -1, 1));
        ((f /= e), r[0].dot(o.crossVectors(s[0], s[e])) > 0 && (f = -f));
        for (let g = 1; g <= e; g++)
          (s[g].applyMatrix4(c.makeRotationAxis(r[g], f * g)), a[g].crossVectors(r[g], s[g]));
      }
      return {
        tangents: r,
        normals: s,
        binormals: a,
      };
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(e) {
      return ((this.arcLengthDivisions = e.arcLengthDivisions), this);
    }
    toJSON() {
      let e = {
        metadata: {
          version: 4.6,
          type: "Curve",
          generator: "Curve.toJSON",
        },
      };
      return ((e.arcLengthDivisions = this.arcLengthDivisions), (e.type = this.type), e);
    }
    fromJSON(e) {
      return ((this.arcLengthDivisions = e.arcLengthDivisions), this);
    }
  },
  EllipseCurve = class extends Curve {
    constructor(e = 0, t = 0, i = 1, r = 1, s = 0, a = 2 * Math.PI, o = !1, c = 0) {
      (super(),
        (this.isEllipseCurve = !0),
        (this.type = "EllipseCurve"),
        (this.aX = e),
        (this.aY = t),
        (this.xRadius = i),
        (this.yRadius = r),
        (this.aStartAngle = s),
        (this.aEndAngle = a),
        (this.aClockwise = o),
        (this.aRotation = c));
    }
    getPoint(e, t = new Vector2()) {
      let i = t,
        r = 2 * Math.PI,
        s = this.aEndAngle - this.aStartAngle,
        a = Math.abs(s) < Number.EPSILON;
      for (; s < 0;) s += r;
      for (; s > r;) s -= r;
      (s < Number.EPSILON && (s = a ? 0 : r), this.aClockwise !== !0 || a || (s === r ? (s = -r) : (s -= r)));
      let o = this.aStartAngle + e * s,
        c = this.aX + this.xRadius * Math.cos(o),
        l = this.aY + this.yRadius * Math.sin(o);
      if (this.aRotation !== 0) {
        let h = Math.cos(this.aRotation),
          p = Math.sin(this.aRotation),
          u = c - this.aX,
          f = l - this.aY;
        ((c = u * h - f * p + this.aX), (l = u * p + f * h + this.aY));
      }
      return i.set(c, l);
    }
    copy(e) {
      return (
        super.copy(e),
        (this.aX = e.aX),
        (this.aY = e.aY),
        (this.xRadius = e.xRadius),
        (this.yRadius = e.yRadius),
        (this.aStartAngle = e.aStartAngle),
        (this.aEndAngle = e.aEndAngle),
        (this.aClockwise = e.aClockwise),
        (this.aRotation = e.aRotation),
        this
      );
    }
    toJSON() {
      let e = super.toJSON();
      return (
        (e.aX = this.aX),
        (e.aY = this.aY),
        (e.xRadius = this.xRadius),
        (e.yRadius = this.yRadius),
        (e.aStartAngle = this.aStartAngle),
        (e.aEndAngle = this.aEndAngle),
        (e.aClockwise = this.aClockwise),
        (e.aRotation = this.aRotation),
        e
      );
    }
    fromJSON(e) {
      return (
        super.fromJSON(e),
        (this.aX = e.aX),
        (this.aY = e.aY),
        (this.xRadius = e.xRadius),
        (this.yRadius = e.yRadius),
        (this.aStartAngle = e.aStartAngle),
        (this.aEndAngle = e.aEndAngle),
        (this.aClockwise = e.aClockwise),
        (this.aRotation = e.aRotation),
        this
      );
    }
  },
  ArcCurve = class extends EllipseCurve {
    constructor(e, t, i, r, s, a) {
      (super(e, t, i, i, r, s, a), (this.isArcCurve = !0), (this.type = "ArcCurve"));
    }
  };
function du() {
  let n = 0,
    e = 0,
    t = 0,
    i = 0;
  function r(s, a, o, c) {
    ((n = s), (e = o), (t = -3 * s + 3 * a - 2 * o - c), (i = 2 * s - 2 * a + o + c));
  }
  return {
    initCatmullRom: function (s, a, o, c, l) {
      r(a, o, l * (o - s), l * (c - a));
    },
    initNonuniformCatmullRom: function (s, a, o, c, l, h, p) {
      let u = (a - s) / l - (o - s) / (l + h) + (o - a) / h,
        f = (o - a) / h - (c - a) / (h + p) + (c - o) / p;
      ((u *= h), (f *= h), r(a, o, u, f));
    },
    calc: function (s) {
      let a = s * s;
      return n + e * s + t * a + i * (a * s);
    },
  };
}
var Mo = new Vector3(),
  Ac = new du(),
  Cc = new du(),
  Rc = new du(),
  CatmullRomCurve3 = class extends Curve {
    constructor(e = [], t = !1, i = "centripetal", r = 0.5) {
      (super(),
        (this.isCatmullRomCurve3 = !0),
        (this.type = "CatmullRomCurve3"),
        (this.points = e),
        (this.closed = t),
        (this.curveType = i),
        (this.tension = r));
    }
    getPoint(e, t = new Vector3()) {
      let i = t,
        r = this.points,
        s = r.length,
        a = (s - (this.closed ? 0 : 1)) * e,
        o,
        c,
        l = Math.floor(a),
        h = a - l;
      (this.closed
        ? (l += l > 0 ? 0 : (Math.floor(Math.abs(l) / s) + 1) * s)
        : h === 0 && l === s - 1 && ((l = s - 2), (h = 1)),
        this.closed || l > 0 ? (o = r[(l - 1) % s]) : (Mo.subVectors(r[0], r[1]).add(r[0]), (o = Mo)));
      let p = r[l % s],
        u = r[(l + 1) % s];
      if (
        (this.closed || l + 2 < s
          ? (c = r[(l + 2) % s])
          : (Mo.subVectors(r[s - 1], r[s - 2]).add(r[s - 1]), (c = Mo)),
        this.curveType === "centripetal" || this.curveType === "chordal")
      ) {
        let f = this.curveType === "chordal" ? 0.5 : 0.25,
          g = Math.pow(o.distanceToSquared(p), f),
          y = Math.pow(p.distanceToSquared(u), f),
          v = Math.pow(u.distanceToSquared(c), f);
        (y < 1e-4 && (y = 1),
          g < 1e-4 && (g = y),
          v < 1e-4 && (v = y),
          Ac.initNonuniformCatmullRom(o.x, p.x, u.x, c.x, g, y, v),
          Cc.initNonuniformCatmullRom(o.y, p.y, u.y, c.y, g, y, v),
          Rc.initNonuniformCatmullRom(o.z, p.z, u.z, c.z, g, y, v));
      } else
        this.curveType === "catmullrom" &&
          (Ac.initCatmullRom(o.x, p.x, u.x, c.x, this.tension),
          Cc.initCatmullRom(o.y, p.y, u.y, c.y, this.tension),
          Rc.initCatmullRom(o.z, p.z, u.z, c.z, this.tension));
      return (i.set(Ac.calc(h), Cc.calc(h), Rc.calc(h)), i);
    }
    copy(e) {
      (super.copy(e), (this.points = []));
      for (let t = 0, i = e.points.length; t < i; t++) {
        let r = e.points[t];
        this.points.push(r.clone());
      }
      return ((this.closed = e.closed), (this.curveType = e.curveType), (this.tension = e.tension), this);
    }
    toJSON() {
      let e = super.toJSON();
      e.points = [];
      for (let t = 0, i = this.points.length; t < i; t++) {
        let r = this.points[t];
        e.points.push(r.toArray());
      }
      return ((e.closed = this.closed), (e.curveType = this.curveType), (e.tension = this.tension), e);
    }
    fromJSON(e) {
      (super.fromJSON(e), (this.points = []));
      for (let t = 0, i = e.points.length; t < i; t++) {
        let r = e.points[t];
        this.points.push(new Vector3().fromArray(r));
      }
      return ((this.closed = e.closed), (this.curveType = e.curveType), (this.tension = e.tension), this);
    }
  };
function ap(n, e, t, i, r) {
  let s = 0.5 * (i - e),
    a = 0.5 * (r - t),
    o = n * n;
  return (2 * t - 2 * i + s + a) * (n * o) + (-3 * t + 3 * i - 2 * s - a) * o + s * n + t;
}
function oa(n, e, t, i) {
  return (
    (function (r, s) {
      let a = 1 - r;
      return a * a * s;
    })(n, e) +
    (function (r, s) {
      return 2 * (1 - r) * r * s;
    })(n, t) +
    (function (r, s) {
      return r * r * s;
    })(n, i)
  );
}
function la(n, e, t, i, r) {
  return (
    (function (s, a) {
      let o = 1 - s;
      return o * o * o * a;
    })(n, e) +
    (function (s, a) {
      let o = 1 - s;
      return 3 * o * o * s * a;
    })(n, t) +
    (function (s, a) {
      return 3 * (1 - s) * s * s * a;
    })(n, i) +
    (function (s, a) {
      return s * s * s * a;
    })(n, r)
  );
}
var CubicBezierCurve = class extends Curve {
    constructor(e = new Vector2(), t = new Vector2(), i = new Vector2(), r = new Vector2()) {
      (super(),
        (this.isCubicBezierCurve = !0),
        (this.type = "CubicBezierCurve"),
        (this.v0 = e),
        (this.v1 = t),
        (this.v2 = i),
        (this.v3 = r));
    }
    getPoint(e, t = new Vector2()) {
      let i = t,
        r = this.v0,
        s = this.v1,
        a = this.v2,
        o = this.v3;
      return (i.set(la(e, r.x, s.x, a.x, o.x), la(e, r.y, s.y, a.y, o.y)), i);
    }
    copy(e) {
      return (super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this.v3.copy(e.v3), this);
    }
    toJSON() {
      let e = super.toJSON();
      return (
        (e.v0 = this.v0.toArray()),
        (e.v1 = this.v1.toArray()),
        (e.v2 = this.v2.toArray()),
        (e.v3 = this.v3.toArray()),
        e
      );
    }
    fromJSON(e) {
      return (
        super.fromJSON(e),
        this.v0.fromArray(e.v0),
        this.v1.fromArray(e.v1),
        this.v2.fromArray(e.v2),
        this.v3.fromArray(e.v3),
        this
      );
    }
  },
  CubicBezierCurve3 = class extends Curve {
    constructor(e = new Vector3(), t = new Vector3(), i = new Vector3(), r = new Vector3()) {
      (super(),
        (this.isCubicBezierCurve3 = !0),
        (this.type = "CubicBezierCurve3"),
        (this.v0 = e),
        (this.v1 = t),
        (this.v2 = i),
        (this.v3 = r));
    }
    getPoint(e, t = new Vector3()) {
      let i = t,
        r = this.v0,
        s = this.v1,
        a = this.v2,
        o = this.v3;
      return (i.set(la(e, r.x, s.x, a.x, o.x), la(e, r.y, s.y, a.y, o.y), la(e, r.z, s.z, a.z, o.z)), i);
    }
    copy(e) {
      return (super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this.v3.copy(e.v3), this);
    }
    toJSON() {
      let e = super.toJSON();
      return (
        (e.v0 = this.v0.toArray()),
        (e.v1 = this.v1.toArray()),
        (e.v2 = this.v2.toArray()),
        (e.v3 = this.v3.toArray()),
        e
      );
    }
    fromJSON(e) {
      return (
        super.fromJSON(e),
        this.v0.fromArray(e.v0),
        this.v1.fromArray(e.v1),
        this.v2.fromArray(e.v2),
        this.v3.fromArray(e.v3),
        this
      );
    }
  },
  LineCurve = class extends Curve {
    constructor(e = new Vector2(), t = new Vector2()) {
      (super(), (this.isLineCurve = !0), (this.type = "LineCurve"), (this.v1 = e), (this.v2 = t));
    }
    getPoint(e, t = new Vector2()) {
      let i = t;
      return (e === 1 ? i.copy(this.v2) : (i.copy(this.v2).sub(this.v1), i.multiplyScalar(e).add(this.v1)), i);
    }
    getPointAt(e, t) {
      return this.getPoint(e, t);
    }
    getTangent(e, t = new Vector2()) {
      return t.subVectors(this.v2, this.v1).normalize();
    }
    getTangentAt(e, t) {
      return this.getTangent(e, t);
    }
    copy(e) {
      return (super.copy(e), this.v1.copy(e.v1), this.v2.copy(e.v2), this);
    }
    toJSON() {
      let e = super.toJSON();
      return ((e.v1 = this.v1.toArray()), (e.v2 = this.v2.toArray()), e);
    }
    fromJSON(e) {
      return (super.fromJSON(e), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this);
    }
  },
  LineCurve3 = class extends Curve {
    constructor(e = new Vector3(), t = new Vector3()) {
      (super(), (this.isLineCurve3 = !0), (this.type = "LineCurve3"), (this.v1 = e), (this.v2 = t));
    }
    getPoint(e, t = new Vector3()) {
      let i = t;
      return (e === 1 ? i.copy(this.v2) : (i.copy(this.v2).sub(this.v1), i.multiplyScalar(e).add(this.v1)), i);
    }
    getPointAt(e, t) {
      return this.getPoint(e, t);
    }
    getTangent(e, t = new Vector3()) {
      return t.subVectors(this.v2, this.v1).normalize();
    }
    getTangentAt(e, t) {
      return this.getTangent(e, t);
    }
    copy(e) {
      return (super.copy(e), this.v1.copy(e.v1), this.v2.copy(e.v2), this);
    }
    toJSON() {
      let e = super.toJSON();
      return ((e.v1 = this.v1.toArray()), (e.v2 = this.v2.toArray()), e);
    }
    fromJSON(e) {
      return (super.fromJSON(e), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this);
    }
  },
  QuadraticBezierCurve = class extends Curve {
    constructor(e = new Vector2(), t = new Vector2(), i = new Vector2()) {
      (super(),
        (this.isQuadraticBezierCurve = !0),
        (this.type = "QuadraticBezierCurve"),
        (this.v0 = e),
        (this.v1 = t),
        (this.v2 = i));
    }
    getPoint(e, t = new Vector2()) {
      let i = t,
        r = this.v0,
        s = this.v1,
        a = this.v2;
      return (i.set(oa(e, r.x, s.x, a.x), oa(e, r.y, s.y, a.y)), i);
    }
    copy(e) {
      return (super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this);
    }
    toJSON() {
      let e = super.toJSON();
      return ((e.v0 = this.v0.toArray()), (e.v1 = this.v1.toArray()), (e.v2 = this.v2.toArray()), e);
    }
    fromJSON(e) {
      return (super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this);
    }
  },
  QuadraticBezierCurve3 = class extends Curve {
    constructor(e = new Vector3(), t = new Vector3(), i = new Vector3()) {
      (super(),
        (this.isQuadraticBezierCurve3 = !0),
        (this.type = "QuadraticBezierCurve3"),
        (this.v0 = e),
        (this.v1 = t),
        (this.v2 = i));
    }
    getPoint(e, t = new Vector3()) {
      let i = t,
        r = this.v0,
        s = this.v1,
        a = this.v2;
      return (i.set(oa(e, r.x, s.x, a.x), oa(e, r.y, s.y, a.y), oa(e, r.z, s.z, a.z)), i);
    }
    copy(e) {
      return (super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this);
    }
    toJSON() {
      let e = super.toJSON();
      return ((e.v0 = this.v0.toArray()), (e.v1 = this.v1.toArray()), (e.v2 = this.v2.toArray()), e);
    }
    fromJSON(e) {
      return (super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this);
    }
  },
  SplineCurve = class extends Curve {
    constructor(e = []) {
      (super(), (this.isSplineCurve = !0), (this.type = "SplineCurve"), (this.points = e));
    }
    getPoint(e, t = new Vector2()) {
      let i = t,
        r = this.points,
        s = (r.length - 1) * e,
        a = Math.floor(s),
        o = s - a,
        c = r[a === 0 ? a : a - 1],
        l = r[a],
        h = r[a > r.length - 2 ? r.length - 1 : a + 1],
        p = r[a > r.length - 3 ? r.length - 1 : a + 2];
      return (i.set(ap(o, c.x, l.x, h.x, p.x), ap(o, c.y, l.y, h.y, p.y)), i);
    }
    copy(e) {
      (super.copy(e), (this.points = []));
      for (let t = 0, i = e.points.length; t < i; t++) {
        let r = e.points[t];
        this.points.push(r.clone());
      }
      return this;
    }
    toJSON() {
      let e = super.toJSON();
      e.points = [];
      for (let t = 0, i = this.points.length; t < i; t++) {
        let r = this.points[t];
        e.points.push(r.toArray());
      }
      return e;
    }
    fromJSON(e) {
      (super.fromJSON(e), (this.points = []));
      for (let t = 0, i = e.points.length; t < i; t++) {
        let r = e.points[t];
        this.points.push(new Vector2().fromArray(r));
      }
      return this;
    }
  },
  sl = Object.freeze({
    __proto__: null,
    ArcCurve: ArcCurve,
    CatmullRomCurve3: CatmullRomCurve3,
    CubicBezierCurve: CubicBezierCurve,
    CubicBezierCurve3: CubicBezierCurve3,
    EllipseCurve: EllipseCurve,
    LineCurve: LineCurve,
    LineCurve3: LineCurve3,
    QuadraticBezierCurve: QuadraticBezierCurve,
    QuadraticBezierCurve3: QuadraticBezierCurve3,
    SplineCurve: SplineCurve,
  }),
  CurvePath = class extends Curve {
    constructor() {
      (super(), (this.type = "CurvePath"), (this.curves = []), (this.autoClose = !1));
    }
    add(e) {
      this.curves.push(e);
    }
    closePath() {
      let e = this.curves[0].getPoint(0),
        t = this.curves[this.curves.length - 1].getPoint(1);
      if (!e.equals(t)) {
        let i = e.isVector2 === !0 ? "LineCurve" : "LineCurve3";
        this.curves.push(new sl[i](t, e));
      }
      return this;
    }
    getPoint(e, t) {
      let i = e * this.getLength(),
        r = this.getCurveLengths(),
        s = 0;
      for (; s < r.length;) {
        if (r[s] >= i) {
          let a = r[s] - i,
            o = this.curves[s],
            c = o.getLength(),
            l = c === 0 ? 0 : 1 - a / c;
          return o.getPointAt(l, t);
        }
        s++;
      }
      return null;
    }
    getLength() {
      let e = this.getCurveLengths();
      return e[e.length - 1];
    }
    updateArcLengths() {
      ((this.needsUpdate = !0), (this.cacheLengths = null), this.getCurveLengths());
    }
    getCurveLengths() {
      if (this.cacheLengths && this.cacheLengths.length === this.curves.length) return this.cacheLengths;
      let e = [],
        t = 0;
      for (let i = 0, r = this.curves.length; i < r; i++) ((t += this.curves[i].getLength()), e.push(t));
      return ((this.cacheLengths = e), e);
    }
    getSpacedPoints(e = 40) {
      let t = [];
      for (let i = 0; i <= e; i++) t.push(this.getPoint(i / e));
      return (this.autoClose && t.push(t[0]), t);
    }
    getPoints(e = 12) {
      let t = [],
        i;
      for (let r = 0, s = this.curves; r < s.length; r++) {
        let a = s[r],
          o = a.isEllipseCurve
            ? 2 * e
            : a.isLineCurve || a.isLineCurve3
              ? 1
              : a.isSplineCurve
                ? e * a.points.length
                : e,
          c = a.getPoints(o);
        for (let l = 0; l < c.length; l++) {
          let h = c[l];
          (i && i.equals(h)) || (t.push(h), (i = h));
        }
      }
      return (this.autoClose && t.length > 1 && !t[t.length - 1].equals(t[0]) && t.push(t[0]), t);
    }
    copy(e) {
      (super.copy(e), (this.curves = []));
      for (let t = 0, i = e.curves.length; t < i; t++) {
        let r = e.curves[t];
        this.curves.push(r.clone());
      }
      return ((this.autoClose = e.autoClose), this);
    }
    toJSON() {
      let e = super.toJSON();
      ((e.autoClose = this.autoClose), (e.curves = []));
      for (let t = 0, i = this.curves.length; t < i; t++) {
        let r = this.curves[t];
        e.curves.push(r.toJSON());
      }
      return e;
    }
    fromJSON(e) {
      (super.fromJSON(e), (this.autoClose = e.autoClose), (this.curves = []));
      for (let t = 0, i = e.curves.length; t < i; t++) {
        let r = e.curves[t];
        this.curves.push(new sl[r.type]().fromJSON(r));
      }
      return this;
    }
  },
  Path = class extends CurvePath {
    constructor(e) {
      (super(), (this.type = "Path"), (this.currentPoint = new Vector2()), e && this.setFromPoints(e));
    }
    setFromPoints(e) {
      this.moveTo(e[0].x, e[0].y);
      for (let t = 1, i = e.length; t < i; t++) this.lineTo(e[t].x, e[t].y);
      return this;
    }
    moveTo(e, t) {
      return (this.currentPoint.set(e, t), this);
    }
    lineTo(e, t) {
      let i = new LineCurve(this.currentPoint.clone(), new Vector2(e, t));
      return (this.curves.push(i), this.currentPoint.set(e, t), this);
    }
    quadraticCurveTo(e, t, i, r) {
      let s = new QuadraticBezierCurve(this.currentPoint.clone(), new Vector2(e, t), new Vector2(i, r));
      return (this.curves.push(s), this.currentPoint.set(i, r), this);
    }
    bezierCurveTo(e, t, i, r, s, a) {
      let o = new CubicBezierCurve(
        this.currentPoint.clone(),
        new Vector2(e, t),
        new Vector2(i, r),
        new Vector2(s, a),
      );
      return (this.curves.push(o), this.currentPoint.set(s, a), this);
    }
    splineThru(e) {
      let t = [this.currentPoint.clone()].concat(e),
        i = new SplineCurve(t);
      return (this.curves.push(i), this.currentPoint.copy(e[e.length - 1]), this);
    }
    arc(e, t, i, r, s, a) {
      let o = this.currentPoint.x,
        c = this.currentPoint.y;
      return (this.absarc(e + o, t + c, i, r, s, a), this);
    }
    absarc(e, t, i, r, s, a) {
      return (this.absellipse(e, t, i, i, r, s, a), this);
    }
    ellipse(e, t, i, r, s, a, o, c) {
      let l = this.currentPoint.x,
        h = this.currentPoint.y;
      return (this.absellipse(e + l, t + h, i, r, s, a, o, c), this);
    }
    absellipse(e, t, i, r, s, a, o, c) {
      let l = new EllipseCurve(e, t, i, r, s, a, o, c);
      if (this.curves.length > 0) {
        let p = l.getPoint(0);
        p.equals(this.currentPoint) || this.lineTo(p.x, p.y);
      }
      this.curves.push(l);
      let h = l.getPoint(1);
      return (this.currentPoint.copy(h), this);
    }
    copy(e) {
      return (super.copy(e), this.currentPoint.copy(e.currentPoint), this);
    }
    toJSON() {
      let e = super.toJSON();
      return ((e.currentPoint = this.currentPoint.toArray()), e);
    }
    fromJSON(e) {
      return (super.fromJSON(e), this.currentPoint.fromArray(e.currentPoint), this);
    }
  },
  LatheGeometry = class n extends BufferGeometry {
    constructor(
      e = [new Vector2(0, -0.5), new Vector2(0.5, 0), new Vector2(0, 0.5)],
      t = 12,
      i = 0,
      r = 2 * Math.PI,
    ) {
      (super(),
        (this.type = "LatheGeometry"),
        (this.parameters = {
          points: e,
          segments: t,
          phiStart: i,
          phiLength: r,
        }),
        (t = Math.floor(t)),
        (r = ui(r, 0, 2 * Math.PI)));
      let s = [],
        a = [],
        o = [],
        c = [],
        l = [],
        h = 1 / t,
        p = new Vector3(),
        u = new Vector2(),
        f = new Vector3(),
        g = new Vector3(),
        y = new Vector3(),
        v = 0,
        d = 0;
      for (let m = 0; m <= e.length - 1; m++)
        switch (m) {
          case 0:
            ((v = e[m + 1].x - e[m].x),
              (d = e[m + 1].y - e[m].y),
              (f.x = 1 * d),
              (f.y = -v),
              (f.z = 0 * d),
              y.copy(f),
              f.normalize(),
              c.push(f.x, f.y, f.z));
            break;
          case e.length - 1:
            c.push(y.x, y.y, y.z);
            break;
          default:
            ((v = e[m + 1].x - e[m].x),
              (d = e[m + 1].y - e[m].y),
              (f.x = 1 * d),
              (f.y = -v),
              (f.z = 0 * d),
              g.copy(f),
              (f.x += y.x),
              (f.y += y.y),
              (f.z += y.z),
              f.normalize(),
              c.push(f.x, f.y, f.z),
              y.copy(g));
        }
      for (let m = 0; m <= t; m++) {
        let x = i + m * h * r,
          b = Math.sin(x),
          w = Math.cos(x);
        for (let A = 0; A <= e.length - 1; A++) {
          ((p.x = e[A].x * b),
            (p.y = e[A].y),
            (p.z = e[A].x * w),
            a.push(p.x, p.y, p.z),
            (u.x = m / t),
            (u.y = A / (e.length - 1)),
            o.push(u.x, u.y));
          let C = c[3 * A + 0] * b,
            F = c[3 * A + 1],
            N = c[3 * A + 0] * w;
          l.push(C, F, N);
        }
      }
      for (let m = 0; m < t; m++)
        for (let x = 0; x < e.length - 1; x++) {
          let b = x + m * e.length,
            w = b,
            A = b + e.length,
            C = b + e.length + 1,
            F = b + 1;
          (s.push(w, A, F), s.push(C, F, A));
        }
      (this.setIndex(s),
        this.setAttribute("position", new Float32BufferAttribute(a, 3)),
        this.setAttribute("uv", new Float32BufferAttribute(o, 2)),
        this.setAttribute("normal", new Float32BufferAttribute(l, 3)));
    }
    copy(e) {
      return (super.copy(e), (this.parameters = Object.assign({}, e.parameters)), this);
    }
    static fromJSON(e) {
      return new n(e.points, e.segments, e.phiStart, e.phiLength);
    }
  },
  CapsuleGeometry = class n extends LatheGeometry {
    constructor(e = 1, t = 1, i = 4, r = 8) {
      let s = new Path();
      (s.absarc(0, -t / 2, e, 1.5 * Math.PI, 0),
        s.absarc(0, t / 2, e, 0, 0.5 * Math.PI),
        super(s.getPoints(i), r),
        (this.type = "CapsuleGeometry"),
        (this.parameters = {
          radius: e,
          length: t,
          capSegments: i,
          radialSegments: r,
        }));
    }
    static fromJSON(e) {
      return new n(e.radius, e.length, e.capSegments, e.radialSegments);
    }
  },
  CircleGeometry = class n extends BufferGeometry {
    constructor(e = 1, t = 32, i = 0, r = 2 * Math.PI) {
      (super(),
        (this.type = "CircleGeometry"),
        (this.parameters = {
          radius: e,
          segments: t,
          thetaStart: i,
          thetaLength: r,
        }),
        (t = Math.max(3, t)));
      let s = [],
        a = [],
        o = [],
        c = [],
        l = new Vector3(),
        h = new Vector2();
      (a.push(0, 0, 0), o.push(0, 0, 1), c.push(0.5, 0.5));
      for (let p = 0, u = 3; p <= t; p++, u += 3) {
        let f = i + (p / t) * r;
        ((l.x = e * Math.cos(f)),
          (l.y = e * Math.sin(f)),
          a.push(l.x, l.y, l.z),
          o.push(0, 0, 1),
          (h.x = (a[u] / e + 1) / 2),
          (h.y = (a[u + 1] / e + 1) / 2),
          c.push(h.x, h.y));
      }
      for (let p = 1; p <= t; p++) s.push(p, p + 1, 0);
      (this.setIndex(s),
        this.setAttribute("position", new Float32BufferAttribute(a, 3)),
        this.setAttribute("normal", new Float32BufferAttribute(o, 3)),
        this.setAttribute("uv", new Float32BufferAttribute(c, 2)));
    }
    copy(e) {
      return (super.copy(e), (this.parameters = Object.assign({}, e.parameters)), this);
    }
    static fromJSON(e) {
      return new n(e.radius, e.segments, e.thetaStart, e.thetaLength);
    }
  },
  CylinderGeometry = class n extends BufferGeometry {
    constructor(e = 1, t = 1, i = 1, r = 32, s = 1, a = !1, o = 0, c = 2 * Math.PI) {
      (super(),
        (this.type = "CylinderGeometry"),
        (this.parameters = {
          radiusTop: e,
          radiusBottom: t,
          height: i,
          radialSegments: r,
          heightSegments: s,
          openEnded: a,
          thetaStart: o,
          thetaLength: c,
        }));
      let l = this;
      ((r = Math.floor(r)), (s = Math.floor(s)));
      let h = [],
        p = [],
        u = [],
        f = [],
        g = 0,
        y = [],
        v = i / 2,
        d = 0;
      function m(x) {
        let b = g,
          w = new Vector2(),
          A = new Vector3(),
          C = 0,
          F = x === !0 ? e : t,
          N = x === !0 ? 1 : -1;
        for (let W = 1; W <= r; W++) (p.push(0, v * N, 0), u.push(0, N, 0), f.push(0.5, 0.5), g++);
        let G = g;
        for (let W = 0; W <= r; W++) {
          let B = (W / r) * c + o,
            $ = Math.cos(B),
            Z = Math.sin(B);
          ((A.x = F * Z),
            (A.y = v * N),
            (A.z = F * $),
            p.push(A.x, A.y, A.z),
            u.push(0, N, 0),
            (w.x = 0.5 * $ + 0.5),
            (w.y = 0.5 * Z * N + 0.5),
            f.push(w.x, w.y),
            g++);
        }
        for (let W = 0; W < r; W++) {
          let B = b + W,
            $ = G + W;
          (x === !0 ? h.push($, $ + 1, B) : h.push($ + 1, $, B), (C += 3));
        }
        (l.addGroup(d, C, x === !0 ? 1 : 2), (d += C));
      }
      ((function () {
        let x = new Vector3(),
          b = new Vector3(),
          w = 0,
          A = (t - e) / i;
        for (let C = 0; C <= s; C++) {
          let F = [],
            N = C / s,
            G = N * (t - e) + e;
          for (let W = 0; W <= r; W++) {
            let B = W / r,
              $ = B * c + o,
              Z = Math.sin($),
              ie = Math.cos($);
            ((b.x = G * Z),
              (b.y = -N * i + v),
              (b.z = G * ie),
              p.push(b.x, b.y, b.z),
              x.set(Z, A, ie).normalize(),
              u.push(x.x, x.y, x.z),
              f.push(B, 1 - N),
              F.push(g++));
          }
          y.push(F);
        }
        for (let C = 0; C < r; C++)
          for (let F = 0; F < s; F++) {
            let N = y[F][C],
              G = y[F + 1][C],
              W = y[F + 1][C + 1],
              B = y[F][C + 1];
            (e > 0 && (h.push(N, G, B), (w += 3)), t > 0 && (h.push(G, W, B), (w += 3)));
          }
        (l.addGroup(d, w, 0), (d += w));
      })(),
        a === !1 && (e > 0 && m(!0), t > 0 && m(!1)),
        this.setIndex(h),
        this.setAttribute("position", new Float32BufferAttribute(p, 3)),
        this.setAttribute("normal", new Float32BufferAttribute(u, 3)),
        this.setAttribute("uv", new Float32BufferAttribute(f, 2)));
    }
    copy(e) {
      return (super.copy(e), (this.parameters = Object.assign({}, e.parameters)), this);
    }
    static fromJSON(e) {
      return new n(
        e.radiusTop,
        e.radiusBottom,
        e.height,
        e.radialSegments,
        e.heightSegments,
        e.openEnded,
        e.thetaStart,
        e.thetaLength,
      );
    }
  },
  ConeGeometry = class n extends CylinderGeometry {
    constructor(e = 1, t = 1, i = 32, r = 1, s = !1, a = 0, o = 2 * Math.PI) {
      (super(0, e, t, i, r, s, a, o),
        (this.type = "ConeGeometry"),
        (this.parameters = {
          radius: e,
          height: t,
          radialSegments: i,
          heightSegments: r,
          openEnded: s,
          thetaStart: a,
          thetaLength: o,
        }));
    }
    static fromJSON(e) {
      return new n(e.radius, e.height, e.radialSegments, e.heightSegments, e.openEnded, e.thetaStart, e.thetaLength);
    }
  },
  PolyhedronGeometry = class n extends BufferGeometry {
    constructor(e = [], t = [], i = 1, r = 0) {
      (super(),
        (this.type = "PolyhedronGeometry"),
        (this.parameters = {
          vertices: e,
          indices: t,
          radius: i,
          detail: r,
        }));
      let s = [],
        a = [];
      function o(u, f, g, y) {
        let v = y + 1,
          d = [];
        for (let m = 0; m <= v; m++) {
          d[m] = [];
          let x = u.clone().lerp(g, m / v),
            b = f.clone().lerp(g, m / v),
            w = v - m;
          for (let A = 0; A <= w; A++) d[m][A] = A === 0 && m === v ? x : x.clone().lerp(b, A / w);
        }
        for (let m = 0; m < v; m++)
          for (let x = 0; x < 2 * (v - m) - 1; x++) {
            let b = Math.floor(x / 2);
            x % 2 == 0
              ? (c(d[m][b + 1]), c(d[m + 1][b]), c(d[m][b]))
              : (c(d[m][b + 1]), c(d[m + 1][b + 1]), c(d[m + 1][b]));
          }
      }
      function c(u) {
        s.push(u.x, u.y, u.z);
      }
      function l(u, f) {
        let g = 3 * u;
        ((f.x = e[g + 0]), (f.y = e[g + 1]), (f.z = e[g + 2]));
      }
      function h(u, f, g, y) {
        (y < 0 && u.x === 1 && (a[f] = u.x - 1), g.x === 0 && g.z === 0 && (a[f] = y / 2 / Math.PI + 0.5));
      }
      function p(u) {
        return Math.atan2(u.z, -u.x);
      }
      ((function (u) {
        let f = new Vector3(),
          g = new Vector3(),
          y = new Vector3();
        for (let v = 0; v < t.length; v += 3) (l(t[v + 0], f), l(t[v + 1], g), l(t[v + 2], y), o(f, g, y, u));
      })(r),
        (function (u) {
          let f = new Vector3();
          for (let g = 0; g < s.length; g += 3)
            ((f.x = s[g + 0]),
              (f.y = s[g + 1]),
              (f.z = s[g + 2]),
              f.normalize().multiplyScalar(u),
              (s[g + 0] = f.x),
              (s[g + 1] = f.y),
              (s[g + 2] = f.z));
        })(i),
        (function () {
          let u = new Vector3();
          for (let g = 0; g < s.length; g += 3) {
            ((u.x = s[g + 0]), (u.y = s[g + 1]), (u.z = s[g + 2]));
            let y = p(u) / 2 / Math.PI + 0.5,
              v = ((f = u), Math.atan2(-f.y, Math.sqrt(f.x * f.x + f.z * f.z)) / Math.PI + 0.5);
            a.push(y, 1 - v);
          }
          var f;
          ((function () {
            let g = new Vector3(),
              y = new Vector3(),
              v = new Vector3(),
              d = new Vector3(),
              m = new Vector2(),
              x = new Vector2(),
              b = new Vector2();
            for (let w = 0, A = 0; w < s.length; w += 9, A += 6) {
              (g.set(s[w + 0], s[w + 1], s[w + 2]),
                y.set(s[w + 3], s[w + 4], s[w + 5]),
                v.set(s[w + 6], s[w + 7], s[w + 8]),
                m.set(a[A + 0], a[A + 1]),
                x.set(a[A + 2], a[A + 3]),
                b.set(a[A + 4], a[A + 5]),
                d.copy(g).add(y).add(v).divideScalar(3));
              let C = p(d);
              (h(m, A + 0, g, C), h(x, A + 2, y, C), h(b, A + 4, v, C));
            }
          })(),
            (function () {
              for (let g = 0; g < a.length; g += 6) {
                let y = a[g + 0],
                  v = a[g + 2],
                  d = a[g + 4],
                  m = Math.max(y, v, d),
                  x = Math.min(y, v, d);
                m > 0.9 &&
                  x < 0.1 &&
                  (y < 0.2 && (a[g + 0] += 1), v < 0.2 && (a[g + 2] += 1), d < 0.2 && (a[g + 4] += 1));
              }
            })());
        })(),
        this.setAttribute("position", new Float32BufferAttribute(s, 3)),
        this.setAttribute("normal", new Float32BufferAttribute(s.slice(), 3)),
        this.setAttribute("uv", new Float32BufferAttribute(a, 2)),
        r === 0 ? this.computeVertexNormals() : this.normalizeNormals());
    }
    copy(e) {
      return (super.copy(e), (this.parameters = Object.assign({}, e.parameters)), this);
    }
    static fromJSON(e) {
      return new n(e.vertices, e.indices, e.radius, e.details);
    }
  },
  DodecahedronGeometry = class n extends PolyhedronGeometry {
    constructor(e = 1, t = 0) {
      let i = (1 + Math.sqrt(5)) / 2,
        r = 1 / i;
      (super(
        [
          -1,
          -1,
          -1,
          -1,
          -1,
          1,
          -1,
          1,
          -1,
          -1,
          1,
          1,
          1,
          -1,
          -1,
          1,
          -1,
          1,
          1,
          1,
          -1,
          1,
          1,
          1,
          0,
          -r,
          -i,
          0,
          -r,
          i,
          0,
          r,
          -i,
          0,
          r,
          i,
          -r,
          -i,
          0,
          -r,
          i,
          0,
          r,
          -i,
          0,
          r,
          i,
          0,
          -i,
          0,
          -r,
          i,
          0,
          -r,
          -i,
          0,
          r,
          i,
          0,
          r,
        ],
        [
          3, 11, 7, 3, 7, 15, 3, 15, 13, 7, 19, 17, 7, 17, 6, 7, 6, 15, 17, 4, 8, 17, 8, 10, 17, 10, 6, 8, 0, 16, 8,
          16, 2, 8, 2, 10, 0, 12, 1, 0, 1, 18, 0, 18, 16, 6, 10, 2, 6, 2, 13, 6, 13, 15, 2, 16, 18, 2, 18, 3, 2, 3,
          13, 18, 1, 9, 18, 9, 11, 18, 11, 3, 4, 14, 12, 4, 12, 0, 4, 0, 8, 11, 9, 5, 11, 5, 19, 11, 19, 7, 19, 5, 14,
          19, 14, 4, 19, 4, 17, 1, 12, 14, 1, 14, 5, 1, 5, 9,
        ],
        e,
        t,
      ),
        (this.type = "DodecahedronGeometry"),
        (this.parameters = {
          radius: e,
          detail: t,
        }));
    }
    static fromJSON(e) {
      return new n(e.radius, e.detail);
    }
  },
  So = new Vector3(),
  wo = new Vector3(),
  Pc = new Vector3(),
  To = new tr(),
  EdgesGeometry = class extends BufferGeometry {
    constructor(e = null, t = 1) {
      if (
        (super(),
        (this.type = "EdgesGeometry"),
        (this.parameters = {
          geometry: e,
          thresholdAngle: t,
        }),
        e !== null)
      ) {
        let r = Math.pow(10, 4),
          s = Math.cos(No * t),
          a = e.getIndex(),
          o = e.getAttribute("position"),
          c = a ? a.count : o.count,
          l = [0, 0, 0],
          h = ["a", "b", "c"],
          p = new Array(3),
          u = {},
          f = [];
        for (let g = 0; g < c; g += 3) {
          a
            ? ((l[0] = a.getX(g)), (l[1] = a.getX(g + 1)), (l[2] = a.getX(g + 2)))
            : ((l[0] = g), (l[1] = g + 1), (l[2] = g + 2));
          let { a: y, b: v, c: d } = To;
          if (
            (y.fromBufferAttribute(o, l[0]),
            v.fromBufferAttribute(o, l[1]),
            d.fromBufferAttribute(o, l[2]),
            To.getNormal(Pc),
            (p[0] = `${Math.round(y.x * r)},${Math.round(y.y * r)},${Math.round(y.z * r)}`),
            (p[1] = `${Math.round(v.x * r)},${Math.round(v.y * r)},${Math.round(v.z * r)}`),
            (p[2] = `${Math.round(d.x * r)},${Math.round(d.y * r)},${Math.round(d.z * r)}`),
            p[0] !== p[1] && p[1] !== p[2] && p[2] !== p[0])
          )
            for (let m = 0; m < 3; m++) {
              let x = (m + 1) % 3,
                b = p[m],
                w = p[x],
                A = To[h[m]],
                C = To[h[x]],
                F = `${b}_${w}`,
                N = `${w}_${b}`;
              N in u && u[N]
                ? (Pc.dot(u[N].normal) <= s && (f.push(A.x, A.y, A.z), f.push(C.x, C.y, C.z)), (u[N] = null))
                : F in u ||
                  (u[F] = {
                    index0: l[m],
                    index1: l[x],
                    normal: Pc.clone(),
                  });
            }
        }
        for (let g in u)
          if (u[g]) {
            let { index0: y, index1: v } = u[g];
            (So.fromBufferAttribute(o, y),
              wo.fromBufferAttribute(o, v),
              f.push(So.x, So.y, So.z),
              f.push(wo.x, wo.y, wo.z));
          }
        this.setAttribute("position", new Float32BufferAttribute(f, 3));
      }
    }
    copy(e) {
      return (super.copy(e), (this.parameters = Object.assign({}, e.parameters)), this);
    }
  },
  Shape = class extends Path {
    constructor(e) {
      (super(e), (this.uuid = Ts()), (this.type = "Shape"), (this.holes = []));
    }
    getPointsHoles(e) {
      let t = [];
      for (let i = 0, r = this.holes.length; i < r; i++) t[i] = this.holes[i].getPoints(e);
      return t;
    }
    extractPoints(e) {
      return {
        shape: this.getPoints(e),
        holes: this.getPointsHoles(e),
      };
    }
    copy(e) {
      (super.copy(e), (this.holes = []));
      for (let t = 0, i = e.holes.length; t < i; t++) {
        let r = e.holes[t];
        this.holes.push(r.clone());
      }
      return this;
    }
    toJSON() {
      let e = super.toJSON();
      ((e.uuid = this.uuid), (e.holes = []));
      for (let t = 0, i = this.holes.length; t < i; t++) {
        let r = this.holes[t];
        e.holes.push(r.toJSON());
      }
      return e;
    }
    fromJSON(e) {
      (super.fromJSON(e), (this.uuid = e.uuid), (this.holes = []));
      for (let t = 0, i = e.holes.length; t < i; t++) {
        let r = e.holes[t];
        this.holes.push(new Path().fromJSON(r));
      }
      return this;
    }
  },
  wg = function (n, e, t = 2) {
    let i = e && e.length,
      r = i ? e[0] * t : n.length,
      s = op(n, 0, r, t, !0),
      a = [];
    if (!s || s.next === s.prev) return a;
    let o, c, l, h, p, u, f;
    if (
      (i &&
        (s = (function (g, y, v, d) {
          let m = [],
            x,
            b,
            w,
            A,
            C;
          for (x = 0, b = y.length; x < b; x++)
            ((w = y[x] * d),
              (A = x < b - 1 ? y[x + 1] * d : g.length),
              (C = op(g, w, A, d, !1)),
              C === C.next && (C.steiner = !0),
              m.push(Ig(C)));
          for (m.sort(Rg), x = 0; x < m.length; x++) v = Pg(m[x], v);
          return v;
        })(n, e, s, t)),
      n.length > 80 * t)
    ) {
      ((o = l = n[0]), (c = h = n[1]));
      for (let g = t; g < r; g += t)
        ((p = n[g]), (u = n[g + 1]), p < o && (o = p), u < c && (c = u), p > l && (l = p), u > h && (h = u));
      ((f = Math.max(l - o, h - c)), (f = f !== 0 ? 32767 / f : 0));
    }
    return (va(s, a, t, o, c, f, 0), a);
  };
function op(n, e, t, i, r) {
  let s, a;
  if (
    r ===
    (function (o, c, l, h) {
      let p = 0;
      for (let u = c, f = l - h; u < l; u += h) ((p += (o[f] - o[u]) * (o[u + 1] + o[f + 1])), (f = u));
      return p;
    })(n, e, t, i) >
      0
  )
    for (s = e; s < t; s += i) a = lp(s, n[s], n[s + 1], a);
  else for (s = t - i; s >= e; s -= i) a = lp(s, n[s], n[s + 1], a);
  return (a && pl(a, a.next) && (ya(a), (a = a.next)), a);
}
function Dr(n, e) {
  if (!n) return n;
  e || (e = n);
  let t,
    i = n;
  do
    if (((t = !1), i.steiner || (!pl(i, i.next) && Ht(i.prev, i, i.next) !== 0))) i = i.next;
    else {
      if ((ya(i), (i = e = i.prev), i === i.next)) break;
      t = !0;
    }
  while (t || i !== e);
  return e;
}
function va(n, e, t, i, r, s, a) {
  if (!n) return;
  !a &&
    s &&
    (function (h, p, u, f) {
      let g = h;
      do (g.z === 0 && (g.z = Fh(g.x, g.y, p, u, f)), (g.prevZ = g.prev), (g.nextZ = g.next), (g = g.next));
      while (g !== h);
      ((g.prevZ.nextZ = null),
        (g.prevZ = null),
        (function (y) {
          let v,
            d,
            m,
            x,
            b,
            w,
            A,
            C,
            F = 1;
          do {
            for (d = y, y = null, b = null, w = 0; d;) {
              for (w++, m = d, A = 0, v = 0; v < F && (A++, (m = m.nextZ), m); v++);
              for (C = F; A > 0 || (C > 0 && m);)
                (A !== 0 && (C === 0 || !m || d.z <= m.z)
                  ? ((x = d), (d = d.nextZ), A--)
                  : ((x = m), (m = m.nextZ), C--),
                  b ? (b.nextZ = x) : (y = x),
                  (x.prevZ = b),
                  (b = x));
              d = m;
            }
            ((b.nextZ = null), (F *= 2));
          } while (w > 1);
        })(g));
    })(n, i, r, s);
  let o,
    c,
    l = n;
  for (; n.prev !== n.next;)
    if (((o = n.prev), (c = n.next), s ? Eg(n, i, r, s) : Tg(n)))
      (e.push((o.i / t) | 0), e.push((n.i / t) | 0), e.push((c.i / t) | 0), ya(n), (n = c.next), (l = c.next));
    else if ((n = c) === l) {
      a
        ? a === 1
          ? va((n = Ag(Dr(n), e, t)), e, t, i, r, s, 2)
          : a === 2 && Cg(n, e, t, i, r, s)
        : va(Dr(n), e, t, i, r, s, 1);
      break;
    }
}
function Tg(n) {
  let e = n.prev,
    t = n,
    i = n.next;
  if (Ht(e, t, i) >= 0) return !1;
  let r = e.x,
    s = t.x,
    a = i.x,
    o = e.y,
    c = t.y,
    l = i.y,
    h = r < s ? (r < a ? r : a) : s < a ? s : a,
    p = o < c ? (o < l ? o : l) : c < l ? c : l,
    u = r > s ? (r > a ? r : a) : s > a ? s : a,
    f = o > c ? (o > l ? o : l) : c > l ? c : l,
    g = i.next;
  for (; g !== e;) {
    if (g.x >= h && g.x <= u && g.y >= p && g.y <= f && ls(r, o, s, c, a, l, g.x, g.y) && Ht(g.prev, g, g.next) >= 0)
      return !1;
    g = g.next;
  }
  return !0;
}
function Eg(n, e, t, i) {
  let r = n.prev,
    s = n,
    a = n.next;
  if (Ht(r, s, a) >= 0) return !1;
  let o = r.x,
    c = s.x,
    l = a.x,
    h = r.y,
    p = s.y,
    u = a.y,
    f = o < c ? (o < l ? o : l) : c < l ? c : l,
    g = h < p ? (h < u ? h : u) : p < u ? p : u,
    y = o > c ? (o > l ? o : l) : c > l ? c : l,
    v = h > p ? (h > u ? h : u) : p > u ? p : u,
    d = Fh(f, g, e, t, i),
    m = Fh(y, v, e, t, i),
    x = n.prevZ,
    b = n.nextZ;
  for (; x && x.z >= d && b && b.z <= m;) {
    if (
      (x.x >= f &&
        x.x <= y &&
        x.y >= g &&
        x.y <= v &&
        x !== r &&
        x !== a &&
        ls(o, h, c, p, l, u, x.x, x.y) &&
        Ht(x.prev, x, x.next) >= 0) ||
      ((x = x.prevZ),
      b.x >= f &&
        b.x <= y &&
        b.y >= g &&
        b.y <= v &&
        b !== r &&
        b !== a &&
        ls(o, h, c, p, l, u, b.x, b.y) &&
        Ht(b.prev, b, b.next) >= 0)
    )
      return !1;
    b = b.nextZ;
  }
  for (; x && x.z >= d;) {
    if (
      x.x >= f &&
      x.x <= y &&
      x.y >= g &&
      x.y <= v &&
      x !== r &&
      x !== a &&
      ls(o, h, c, p, l, u, x.x, x.y) &&
      Ht(x.prev, x, x.next) >= 0
    )
      return !1;
    x = x.prevZ;
  }
  for (; b && b.z <= m;) {
    if (
      b.x >= f &&
      b.x <= y &&
      b.y >= g &&
      b.y <= v &&
      b !== r &&
      b !== a &&
      ls(o, h, c, p, l, u, b.x, b.y) &&
      Ht(b.prev, b, b.next) >= 0
    )
      return !1;
    b = b.nextZ;
  }
  return !0;
}
function Ag(n, e, t) {
  let i = n;
  do {
    let r = i.prev,
      s = i.next.next;
    (!pl(r, s) &&
      Op(r, i, i.next, s) &&
      xa(r, s) &&
      xa(s, r) &&
      (e.push((r.i / t) | 0), e.push((i.i / t) | 0), e.push((s.i / t) | 0), ya(i), ya(i.next), (i = n = s)),
      (i = i.next));
  } while (i !== n);
  return Dr(i);
}
function Cg(n, e, t, i, r, s) {
  let a = n;
  do {
    let o = a.next.next;
    for (; o !== a.prev;) {
      if (a.i !== o.i && Dg(a, o)) {
        let c = Fp(a, o);
        return ((a = Dr(a, a.next)), (c = Dr(c, c.next)), va(a, e, t, i, r, s, 0), void va(c, e, t, i, r, s, 0));
      }
      o = o.next;
    }
    a = a.next;
  } while (a !== n);
}
function Rg(n, e) {
  return n.x - e.x;
}
function Pg(n, e) {
  let t = (function (r, s) {
    let a,
      o = s,
      c = -1 / 0,
      l = r.x,
      h = r.y;
    do {
      if (h <= o.y && h >= o.next.y && o.next.y !== o.y) {
        let v = o.x + ((h - o.y) * (o.next.x - o.x)) / (o.next.y - o.y);
        if (v <= l && v > c && ((c = v), (a = o.x < o.next.x ? o : o.next), v === l)) return a;
      }
      o = o.next;
    } while (o !== s);
    if (!a) return null;
    let p = a,
      u = a.x,
      f = a.y,
      g,
      y = 1 / 0;
    o = a;
    do
      (l >= o.x &&
        o.x >= u &&
        l !== o.x &&
        ls(h < f ? l : c, h, u, f, h < f ? c : l, h, o.x, o.y) &&
        ((g = Math.abs(h - o.y) / (l - o.x)),
        xa(o, r) && (g < y || (g === y && (o.x > a.x || (o.x === a.x && Lg(a, o))))) && ((a = o), (y = g))),
        (o = o.next));
    while (o !== p);
    return a;
  })(n, e);
  if (!t) return e;
  let i = Fp(t, n);
  return (Dr(i, i.next), Dr(t, t.next));
}
function Lg(n, e) {
  return Ht(n.prev, n, e.prev) < 0 && Ht(e.next, n, n.next) < 0;
}
function Fh(n, e, t, i, r) {
  return (
    (n =
      1431655765 &
      ((n =
        858993459 &
        ((n = 252645135 & ((n = 16711935 & ((n = ((n - t) * r) | 0) | (n << 8))) | (n << 4))) | (n << 2))) |
        (n << 1))) |
    ((e =
      1431655765 &
      ((e =
        858993459 &
        ((e = 252645135 & ((e = 16711935 & ((e = ((e - i) * r) | 0) | (e << 8))) | (e << 4))) | (e << 2))) |
        (e << 1))) <<
      1)
  );
}
function Ig(n) {
  let e = n,
    t = n;
  do ((e.x < t.x || (e.x === t.x && e.y < t.y)) && (t = e), (e = e.next));
  while (e !== n);
  return t;
}
function ls(n, e, t, i, r, s, a, o) {
  return (
    (r - a) * (e - o) >= (n - a) * (s - o) &&
    (n - a) * (i - o) >= (t - a) * (e - o) &&
    (t - a) * (s - o) >= (r - a) * (i - o)
  );
}
function Dg(n, e) {
  return (
    n.next.i !== e.i &&
    n.prev.i !== e.i &&
    !(function (t, i) {
      let r = t;
      do {
        if (r.i !== t.i && r.next.i !== t.i && r.i !== i.i && r.next.i !== i.i && Op(r, r.next, t, i)) return !0;
        r = r.next;
      } while (r !== t);
      return !1;
    })(n, e) &&
    ((xa(n, e) &&
      xa(e, n) &&
      (function (t, i) {
        let r = t,
          s = !1,
          a = (t.x + i.x) / 2,
          o = (t.y + i.y) / 2;
        do
          (r.y > o != r.next.y > o &&
            r.next.y !== r.y &&
            a < ((r.next.x - r.x) * (o - r.y)) / (r.next.y - r.y) + r.x &&
            (s = !s),
            (r = r.next));
        while (r !== t);
        return s;
      })(n, e) &&
      (Ht(n.prev, n, e.prev) || Ht(n, e.prev, e))) ||
      (pl(n, e) && Ht(n.prev, n, n.next) > 0 && Ht(e.prev, e, e.next) > 0))
  );
}
function Ht(n, e, t) {
  return (e.y - n.y) * (t.x - e.x) - (e.x - n.x) * (t.y - e.y);
}
function pl(n, e) {
  return n.x === e.x && n.y === e.y;
}
function Op(n, e, t, i) {
  let r = Ao(Ht(n, e, t)),
    s = Ao(Ht(n, e, i)),
    a = Ao(Ht(t, i, n)),
    o = Ao(Ht(t, i, e));
  return (
    (r !== s && a !== o) ||
    !(r !== 0 || !Eo(n, t, e)) ||
    !(s !== 0 || !Eo(n, i, e)) ||
    !(a !== 0 || !Eo(t, n, i)) ||
    !(o !== 0 || !Eo(t, e, i))
  );
}
function Eo(n, e, t) {
  return (
    e.x <= Math.max(n.x, t.x) && e.x >= Math.min(n.x, t.x) && e.y <= Math.max(n.y, t.y) && e.y >= Math.min(n.y, t.y)
  );
}
function Ao(n) {
  return n > 0 ? 1 : n < 0 ? -1 : 0;
}
function xa(n, e) {
  return Ht(n.prev, n, n.next) < 0
    ? Ht(n, e, n.next) >= 0 && Ht(n, n.prev, e) >= 0
    : Ht(n, e, n.prev) < 0 || Ht(n, n.next, e) < 0;
}
function Fp(n, e) {
  let t = new Bh(n.i, n.x, n.y),
    i = new Bh(e.i, e.x, e.y),
    r = n.next,
    s = e.prev;
  return (
    (n.next = e),
    (e.prev = n),
    (t.next = r),
    (r.prev = t),
    (i.next = t),
    (t.prev = i),
    (s.next = i),
    (i.prev = s),
    i
  );
}
function lp(n, e, t, i) {
  let r = new Bh(n, e, t);
  return (i ? ((r.next = i.next), (r.prev = i), (i.next.prev = r), (i.next = r)) : ((r.prev = r), (r.next = r)), r);
}
function ya(n) {
  ((n.next.prev = n.prev),
    (n.prev.next = n.next),
    n.prevZ && (n.prevZ.nextZ = n.nextZ),
    n.nextZ && (n.nextZ.prevZ = n.prevZ));
}
function Bh(n, e, t) {
  ((this.i = n),
    (this.x = e),
    (this.y = t),
    (this.prev = null),
    (this.next = null),
    (this.z = 0),
    (this.prevZ = null),
    (this.nextZ = null),
    (this.steiner = !1));
}
var nr = class n {
  static area(e) {
    let t = e.length,
      i = 0;
    for (let r = t - 1, s = 0; s < t; r = s++) i += e[r].x * e[s].y - e[s].x * e[r].y;
    return 0.5 * i;
  }
  static isClockWise(e) {
    return n.area(e) < 0;
  }
  static triangulateShape(e, t) {
    let i = [],
      r = [],
      s = [];
    (cp(e), hp(i, e));
    let a = e.length;
    t.forEach(cp);
    for (let c = 0; c < t.length; c++) (r.push(a), (a += t[c].length), hp(i, t[c]));
    let o = wg(i, r);
    for (let c = 0; c < o.length; c += 3) s.push(o.slice(c, c + 3));
    return s;
  }
};
function cp(n) {
  let e = n.length;
  e > 2 && n[e - 1].equals(n[0]) && n.pop();
}
function hp(n, e) {
  for (let t = 0; t < e.length; t++) (n.push(e[t].x), n.push(e[t].y));
}
var ExtrudeGeometry = class n extends BufferGeometry {
    constructor(
      e = new Shape([new Vector2(0.5, 0.5), new Vector2(-0.5, 0.5), new Vector2(-0.5, -0.5), new Vector2(0.5, -0.5)]),
      t = {},
    ) {
      (super(),
        (this.type = "ExtrudeGeometry"),
        (this.parameters = {
          shapes: e,
          options: t,
        }),
        (e = Array.isArray(e) ? e : [e]));
      let i = this,
        r = [],
        s = [];
      for (let o = 0, c = e.length; o < c; o++) a(e[o]);
      function a(o) {
        let c = [],
          l = t.curveSegments !== void 0 ? t.curveSegments : 12,
          h = t.steps !== void 0 ? t.steps : 1,
          p = t.depth !== void 0 ? t.depth : 1,
          u = t.bevelEnabled === void 0 || t.bevelEnabled,
          f = t.bevelThickness !== void 0 ? t.bevelThickness : 0.2,
          g = t.bevelSize !== void 0 ? t.bevelSize : f - 0.1,
          y = t.bevelOffset !== void 0 ? t.bevelOffset : 0,
          v = t.bevelSegments !== void 0 ? t.bevelSegments : 3,
          d = t.extrudePath,
          m = t.UVGenerator !== void 0 ? t.UVGenerator : Ng,
          x,
          b,
          w,
          A,
          C,
          F = !1;
        (d &&
          ((x = d.getSpacedPoints(h)),
          (F = !0),
          (u = !1),
          (b = d.computeFrenetFrames(h, !1)),
          (w = new Vector3()),
          (A = new Vector3()),
          (C = new Vector3())),
          u || ((v = 0), (f = 0), (g = 0), (y = 0)));
        let N = o.extractPoints(l),
          G = N.shape,
          W = N.holes;
        if (!nr.isClockWise(G)) {
          G = G.reverse();
          for (let O = 0, z = W.length; O < z; O++) {
            let P = W[O];
            nr.isClockWise(P) && (W[O] = P.reverse());
          }
        }
        let B = nr.triangulateShape(G, W),
          $ = G;
        for (let O = 0, z = W.length; O < z; O++) {
          let P = W[O];
          G = G.concat(P);
        }
        function Z(O, z, P) {
          return (z || console.error("THREE.ExtrudeGeometry: vec does not exist"), O.clone().addScaledVector(z, P));
        }
        let ie = G.length,
          ae = B.length;
        function me(O, z, P) {
          let X,
            V,
            re,
            Y = O.x - z.x,
            he = O.y - z.y,
            fe = P.x - O.x,
            de = P.y - O.y,
            Ce = Y * Y + he * he,
            Pe = Y * de - he * fe;
          if (Math.abs(Pe) > Number.EPSILON) {
            let Ne = Math.sqrt(Ce),
              je = Math.sqrt(fe * fe + de * de),
              rt = z.x - he / Ne,
              Ke = z.y + Y / Ne,
              Le = ((P.x - de / je - rt) * de - (P.y + fe / je - Ke) * fe) / (Y * de - he * fe);
            ((X = rt + Y * Le - O.x), (V = Ke + he * Le - O.y));
            let Oe = X * X + V * V;
            if (Oe <= 2) return new Vector2(X, V);
            re = Math.sqrt(Oe / 2);
          } else {
            let Ne = !1;
            (Y > Number.EPSILON
              ? fe > Number.EPSILON && (Ne = !0)
              : Y < -Number.EPSILON
                ? fe < -Number.EPSILON && (Ne = !0)
                : Math.sign(he) === Math.sign(de) && (Ne = !0),
              Ne ? ((X = -he), (V = Y), (re = Math.sqrt(Ce))) : ((X = Y), (V = he), (re = Math.sqrt(Ce / 2))));
          }
          return new Vector2(X / re, V / re);
        }
        let ve = [];
        for (let O = 0, z = $.length, P = z - 1, X = O + 1; O < z; O++, P++, X++)
          (P === z && (P = 0), X === z && (X = 0), (ve[O] = me($[O], $[P], $[X])));
        let Ee = [],
          Ue,
          pe = ve.concat();
        for (let O = 0, z = W.length; O < z; O++) {
          let P = W[O];
          Ue = [];
          for (let X = 0, V = P.length, re = V - 1, Y = X + 1; X < V; X++, re++, Y++)
            (re === V && (re = 0), Y === V && (Y = 0), (Ue[X] = me(P[X], P[re], P[Y])));
          (Ee.push(Ue), (pe = pe.concat(Ue)));
        }
        for (let O = 0; O < v; O++) {
          let z = O / v,
            P = f * Math.cos((z * Math.PI) / 2),
            X = g * Math.sin((z * Math.PI) / 2) + y;
          for (let V = 0, re = $.length; V < re; V++) {
            let Y = Z($[V], ve[V], X);
            Ae(Y.x, Y.y, -P);
          }
          for (let V = 0, re = W.length; V < re; V++) {
            let Y = W[V];
            Ue = Ee[V];
            for (let he = 0, fe = Y.length; he < fe; he++) {
              let de = Z(Y[he], Ue[he], X);
              Ae(de.x, de.y, -P);
            }
          }
        }
        let ge = g + y;
        for (let O = 0; O < ie; O++) {
          let z = u ? Z(G[O], pe[O], ge) : G[O];
          F
            ? (A.copy(b.normals[0]).multiplyScalar(z.x),
              w.copy(b.binormals[0]).multiplyScalar(z.y),
              C.copy(x[0]).add(A).add(w),
              Ae(C.x, C.y, C.z))
            : Ae(z.x, z.y, 0);
        }
        for (let O = 1; O <= h; O++)
          for (let z = 0; z < ie; z++) {
            let P = u ? Z(G[z], pe[z], ge) : G[z];
            F
              ? (A.copy(b.normals[O]).multiplyScalar(P.x),
                w.copy(b.binormals[O]).multiplyScalar(P.y),
                C.copy(x[O]).add(A).add(w),
                Ae(C.x, C.y, C.z))
              : Ae(P.x, P.y, (p / h) * O);
          }
        for (let O = v - 1; O >= 0; O--) {
          let z = O / v,
            P = f * Math.cos((z * Math.PI) / 2),
            X = g * Math.sin((z * Math.PI) / 2) + y;
          for (let V = 0, re = $.length; V < re; V++) {
            let Y = Z($[V], ve[V], X);
            Ae(Y.x, Y.y, p + P);
          }
          for (let V = 0, re = W.length; V < re; V++) {
            let Y = W[V];
            Ue = Ee[V];
            for (let he = 0, fe = Y.length; he < fe; he++) {
              let de = Z(Y[he], Ue[he], X);
              F ? Ae(de.x, de.y + x[h - 1].y, x[h - 1].x + P) : Ae(de.x, de.y, p + P);
            }
          }
        }
        function Re(O, z) {
          let P = O.length;
          for (; --P >= 0;) {
            let X = P,
              V = P - 1;
            V < 0 && (V = O.length - 1);
            for (let re = 0, Y = h + 2 * v; re < Y; re++) {
              let he = ie * re,
                fe = ie * (re + 1);
              R(z + X + he, z + V + he, z + V + fe, z + X + fe);
            }
          }
        }
        function Ae(O, z, P) {
          (c.push(O), c.push(z), c.push(P));
        }
        function U(O, z, P) {
          (q(O), q(z), q(P));
          let X = r.length / 3,
            V = m.generateTopUV(i, r, X - 3, X - 2, X - 1);
          (Q(V[0]), Q(V[1]), Q(V[2]));
        }
        function R(O, z, P, X) {
          (q(O), q(z), q(X), q(z), q(P), q(X));
          let V = r.length / 3,
            re = m.generateSideWallUV(i, r, V - 6, V - 3, V - 2, V - 1);
          (Q(re[0]), Q(re[1]), Q(re[3]), Q(re[1]), Q(re[2]), Q(re[3]));
        }
        function q(O) {
          (r.push(c[3 * O + 0]), r.push(c[3 * O + 1]), r.push(c[3 * O + 2]));
        }
        function Q(O) {
          (s.push(O.x), s.push(O.y));
        }
        ((function () {
          let O = r.length / 3;
          if (u) {
            let z = 0,
              P = ie * z;
            for (let X = 0; X < ae; X++) {
              let V = B[X];
              U(V[2] + P, V[1] + P, V[0] + P);
            }
            ((z = h + 2 * v), (P = ie * z));
            for (let X = 0; X < ae; X++) {
              let V = B[X];
              U(V[0] + P, V[1] + P, V[2] + P);
            }
          } else {
            for (let z = 0; z < ae; z++) {
              let P = B[z];
              U(P[2], P[1], P[0]);
            }
            for (let z = 0; z < ae; z++) {
              let P = B[z];
              U(P[0] + ie * h, P[1] + ie * h, P[2] + ie * h);
            }
          }
          i.addGroup(O, r.length / 3 - O, 0);
        })(),
          (function () {
            let O = r.length / 3,
              z = 0;
            (Re($, z), (z += $.length));
            for (let P = 0, X = W.length; P < X; P++) {
              let V = W[P];
              (Re(V, z), (z += V.length));
            }
            i.addGroup(O, r.length / 3 - O, 1);
          })());
      }
      (this.setAttribute("position", new Float32BufferAttribute(r, 3)),
        this.setAttribute("uv", new Float32BufferAttribute(s, 2)),
        this.computeVertexNormals());
    }
    copy(e) {
      return (super.copy(e), (this.parameters = Object.assign({}, e.parameters)), this);
    }
    toJSON() {
      let e = super.toJSON();
      return (function (t, i, r) {
        if (((r.shapes = []), Array.isArray(t)))
          for (let s = 0, a = t.length; s < a; s++) {
            let o = t[s];
            r.shapes.push(o.uuid);
          }
        else r.shapes.push(t.uuid);
        return (
          (r.options = Object.assign({}, i)),
          i.extrudePath !== void 0 && (r.options.extrudePath = i.extrudePath.toJSON()),
          r
        );
      })(this.parameters.shapes, this.parameters.options, e);
    }
    static fromJSON(e, t) {
      let i = [];
      for (let s = 0, a = e.shapes.length; s < a; s++) {
        let o = t[e.shapes[s]];
        i.push(o);
      }
      let r = e.options.extrudePath;
      return (r !== void 0 && (e.options.extrudePath = new sl[r.type]().fromJSON(r)), new n(i, e.options));
    }
  },
  Ng = {
    generateTopUV: function (n, e, t, i, r) {
      let s = e[3 * t],
        a = e[3 * t + 1],
        o = e[3 * i],
        c = e[3 * i + 1],
        l = e[3 * r],
        h = e[3 * r + 1];
      return [new Vector2(s, a), new Vector2(o, c), new Vector2(l, h)];
    },
    generateSideWallUV: function (n, e, t, i, r, s) {
      let a = e[3 * t],
        o = e[3 * t + 1],
        c = e[3 * t + 2],
        l = e[3 * i],
        h = e[3 * i + 1],
        p = e[3 * i + 2],
        u = e[3 * r],
        f = e[3 * r + 1],
        g = e[3 * r + 2],
        y = e[3 * s],
        v = e[3 * s + 1],
        d = e[3 * s + 2];
      return Math.abs(o - h) < Math.abs(a - l)
        ? [new Vector2(a, 1 - c), new Vector2(l, 1 - p), new Vector2(u, 1 - g), new Vector2(y, 1 - d)]
        : [new Vector2(o, 1 - c), new Vector2(h, 1 - p), new Vector2(f, 1 - g), new Vector2(v, 1 - d)];
    },
  },
  IcosahedronGeometry = class n extends PolyhedronGeometry {
    constructor(e = 1, t = 0) {
      let i = (1 + Math.sqrt(5)) / 2;
      (super(
        [
          -1,
          i,
          0,
          1,
          i,
          0,
          -1,
          -i,
          0,
          1,
          -i,
          0,
          0,
          -1,
          i,
          0,
          1,
          i,
          0,
          -1,
          -i,
          0,
          1,
          -i,
          i,
          0,
          -1,
          i,
          0,
          1,
          -i,
          0,
          -1,
          -i,
          0,
          1,
        ],
        [
          0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8, 3, 9, 4,
          3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1,
        ],
        e,
        t,
      ),
        (this.type = "IcosahedronGeometry"),
        (this.parameters = {
          radius: e,
          detail: t,
        }));
    }
    static fromJSON(e) {
      return new n(e.radius, e.detail);
    }
  },
  OctahedronGeometry = class n extends PolyhedronGeometry {
    constructor(e = 1, t = 0) {
      (super(
        [1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1],
        [0, 2, 4, 0, 4, 3, 0, 3, 5, 0, 5, 2, 1, 2, 5, 1, 5, 3, 1, 3, 4, 1, 4, 2],
        e,
        t,
      ),
        (this.type = "OctahedronGeometry"),
        (this.parameters = {
          radius: e,
          detail: t,
        }));
    }
    static fromJSON(e) {
      return new n(e.radius, e.detail);
    }
  },
  RingGeometry = class n extends BufferGeometry {
    constructor(e = 0.5, t = 1, i = 32, r = 1, s = 0, a = 2 * Math.PI) {
      (super(),
        (this.type = "RingGeometry"),
        (this.parameters = {
          innerRadius: e,
          outerRadius: t,
          thetaSegments: i,
          phiSegments: r,
          thetaStart: s,
          thetaLength: a,
        }),
        (i = Math.max(3, i)));
      let o = [],
        c = [],
        l = [],
        h = [],
        p = e,
        u = (t - e) / (r = Math.max(1, r)),
        f = new Vector3(),
        g = new Vector2();
      for (let y = 0; y <= r; y++) {
        for (let v = 0; v <= i; v++) {
          let d = s + (v / i) * a;
          ((f.x = p * Math.cos(d)),
            (f.y = p * Math.sin(d)),
            c.push(f.x, f.y, f.z),
            l.push(0, 0, 1),
            (g.x = (f.x / t + 1) / 2),
            (g.y = (f.y / t + 1) / 2),
            h.push(g.x, g.y));
        }
        p += u;
      }
      for (let y = 0; y < r; y++) {
        let v = y * (i + 1);
        for (let d = 0; d < i; d++) {
          let m = d + v,
            x = m,
            b = m + i + 1,
            w = m + i + 2,
            A = m + 1;
          (o.push(x, b, A), o.push(b, w, A));
        }
      }
      (this.setIndex(o),
        this.setAttribute("position", new Float32BufferAttribute(c, 3)),
        this.setAttribute("normal", new Float32BufferAttribute(l, 3)),
        this.setAttribute("uv", new Float32BufferAttribute(h, 2)));
    }
    copy(e) {
      return (super.copy(e), (this.parameters = Object.assign({}, e.parameters)), this);
    }
    static fromJSON(e) {
      return new n(e.innerRadius, e.outerRadius, e.thetaSegments, e.phiSegments, e.thetaStart, e.thetaLength);
    }
  },
  ShapeGeometry = class n extends BufferGeometry {
    constructor(e = new Shape([new Vector2(0, 0.5), new Vector2(-0.5, -0.5), new Vector2(0.5, -0.5)]), t = 12) {
      (super(),
        (this.type = "ShapeGeometry"),
        (this.parameters = {
          shapes: e,
          curveSegments: t,
        }));
      let i = [],
        r = [],
        s = [],
        a = [],
        o = 0,
        c = 0;
      if (Array.isArray(e) === !1) l(e);
      else for (let h = 0; h < e.length; h++) (l(e[h]), this.addGroup(o, c, h), (o += c), (c = 0));
      function l(h) {
        let p = r.length / 3,
          u = h.extractPoints(t),
          f = u.shape,
          g = u.holes;
        nr.isClockWise(f) === !1 && (f = f.reverse());
        for (let v = 0, d = g.length; v < d; v++) {
          let m = g[v];
          nr.isClockWise(m) === !0 && (g[v] = m.reverse());
        }
        let y = nr.triangulateShape(f, g);
        for (let v = 0, d = g.length; v < d; v++) {
          let m = g[v];
          f = f.concat(m);
        }
        for (let v = 0, d = f.length; v < d; v++) {
          let m = f[v];
          (r.push(m.x, m.y, 0), s.push(0, 0, 1), a.push(m.x, m.y));
        }
        for (let v = 0, d = y.length; v < d; v++) {
          let m = y[v],
            x = m[0] + p,
            b = m[1] + p,
            w = m[2] + p;
          (i.push(x, b, w), (c += 3));
        }
      }
      (this.setIndex(i),
        this.setAttribute("position", new Float32BufferAttribute(r, 3)),
        this.setAttribute("normal", new Float32BufferAttribute(s, 3)),
        this.setAttribute("uv", new Float32BufferAttribute(a, 2)));
    }
    copy(e) {
      return (super.copy(e), (this.parameters = Object.assign({}, e.parameters)), this);
    }
    toJSON() {
      let e = super.toJSON();
      return (function (t, i) {
        if (((i.shapes = []), Array.isArray(t)))
          for (let r = 0, s = t.length; r < s; r++) {
            let a = t[r];
            i.shapes.push(a.uuid);
          }
        else i.shapes.push(t.uuid);
        return i;
      })(this.parameters.shapes, e);
    }
    static fromJSON(e, t) {
      let i = [];
      for (let r = 0, s = e.shapes.length; r < s; r++) {
        let a = t[e.shapes[r]];
        i.push(a);
      }
      return new n(i, e.curveSegments);
    }
  },
  SphereGeometry = class n extends BufferGeometry {
    constructor(e = 1, t = 32, i = 16, r = 0, s = 2 * Math.PI, a = 0, o = Math.PI) {
      (super(),
        (this.type = "SphereGeometry"),
        (this.parameters = {
          radius: e,
          widthSegments: t,
          heightSegments: i,
          phiStart: r,
          phiLength: s,
          thetaStart: a,
          thetaLength: o,
        }),
        (t = Math.max(3, Math.floor(t))),
        (i = Math.max(2, Math.floor(i))));
      let c = Math.min(a + o, Math.PI),
        l = 0,
        h = [],
        p = new Vector3(),
        u = new Vector3(),
        f = [],
        g = [],
        y = [],
        v = [];
      for (let d = 0; d <= i; d++) {
        let m = [],
          x = d / i,
          b = 0;
        d === 0 && a === 0 ? (b = 0.5 / t) : d === i && c === Math.PI && (b = -0.5 / t);
        for (let w = 0; w <= t; w++) {
          let A = w / t;
          ((p.x = -e * Math.cos(r + A * s) * Math.sin(a + x * o)),
            (p.y = e * Math.cos(a + x * o)),
            (p.z = e * Math.sin(r + A * s) * Math.sin(a + x * o)),
            g.push(p.x, p.y, p.z),
            u.copy(p).normalize(),
            y.push(u.x, u.y, u.z),
            v.push(A + b, 1 - x),
            m.push(l++));
        }
        h.push(m);
      }
      for (let d = 0; d < i; d++)
        for (let m = 0; m < t; m++) {
          let x = h[d][m + 1],
            b = h[d][m],
            w = h[d + 1][m],
            A = h[d + 1][m + 1];
          ((d !== 0 || a > 0) && f.push(x, b, A), (d !== i - 1 || c < Math.PI) && f.push(b, w, A));
        }
      (this.setIndex(f),
        this.setAttribute("position", new Float32BufferAttribute(g, 3)),
        this.setAttribute("normal", new Float32BufferAttribute(y, 3)),
        this.setAttribute("uv", new Float32BufferAttribute(v, 2)));
    }
    copy(e) {
      return (super.copy(e), (this.parameters = Object.assign({}, e.parameters)), this);
    }
    static fromJSON(e) {
      return new n(e.radius, e.widthSegments, e.heightSegments, e.phiStart, e.phiLength, e.thetaStart, e.thetaLength);
    }
  },
  TetrahedronGeometry = class n extends PolyhedronGeometry {
    constructor(e = 1, t = 0) {
      (super([1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1], [2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1], e, t),
        (this.type = "TetrahedronGeometry"),
        (this.parameters = {
          radius: e,
          detail: t,
        }));
    }
    static fromJSON(e) {
      return new n(e.radius, e.detail);
    }
  },
  TorusGeometry = class n extends BufferGeometry {
    constructor(e = 1, t = 0.4, i = 12, r = 48, s = 2 * Math.PI) {
      (super(),
        (this.type = "TorusGeometry"),
        (this.parameters = {
          radius: e,
          tube: t,
          radialSegments: i,
          tubularSegments: r,
          arc: s,
        }),
        (i = Math.floor(i)),
        (r = Math.floor(r)));
      let a = [],
        o = [],
        c = [],
        l = [],
        h = new Vector3(),
        p = new Vector3(),
        u = new Vector3();
      for (let f = 0; f <= i; f++)
        for (let g = 0; g <= r; g++) {
          let y = (g / r) * s,
            v = (f / i) * Math.PI * 2;
          ((p.x = (e + t * Math.cos(v)) * Math.cos(y)),
            (p.y = (e + t * Math.cos(v)) * Math.sin(y)),
            (p.z = t * Math.sin(v)),
            o.push(p.x, p.y, p.z),
            (h.x = e * Math.cos(y)),
            (h.y = e * Math.sin(y)),
            u.subVectors(p, h).normalize(),
            c.push(u.x, u.y, u.z),
            l.push(g / r),
            l.push(f / i));
        }
      for (let f = 1; f <= i; f++)
        for (let g = 1; g <= r; g++) {
          let y = (r + 1) * f + g - 1,
            v = (r + 1) * (f - 1) + g - 1,
            d = (r + 1) * (f - 1) + g,
            m = (r + 1) * f + g;
          (a.push(y, v, m), a.push(v, d, m));
        }
      (this.setIndex(a),
        this.setAttribute("position", new Float32BufferAttribute(o, 3)),
        this.setAttribute("normal", new Float32BufferAttribute(c, 3)),
        this.setAttribute("uv", new Float32BufferAttribute(l, 2)));
    }
    copy(e) {
      return (super.copy(e), (this.parameters = Object.assign({}, e.parameters)), this);
    }
    static fromJSON(e) {
      return new n(e.radius, e.tube, e.radialSegments, e.tubularSegments, e.arc);
    }
  },
  TorusKnotGeometry = class n extends BufferGeometry {
    constructor(e = 1, t = 0.4, i = 64, r = 8, s = 2, a = 3) {
      (super(),
        (this.type = "TorusKnotGeometry"),
        (this.parameters = {
          radius: e,
          tube: t,
          tubularSegments: i,
          radialSegments: r,
          p: s,
          q: a,
        }),
        (i = Math.floor(i)),
        (r = Math.floor(r)));
      let o = [],
        c = [],
        l = [],
        h = [],
        p = new Vector3(),
        u = new Vector3(),
        f = new Vector3(),
        g = new Vector3(),
        y = new Vector3(),
        v = new Vector3(),
        d = new Vector3();
      for (let x = 0; x <= i; ++x) {
        let b = (x / i) * s * Math.PI * 2;
        (m(b, s, a, e, f),
          m(b + 0.01, s, a, e, g),
          v.subVectors(g, f),
          d.addVectors(g, f),
          y.crossVectors(v, d),
          d.crossVectors(y, v),
          y.normalize(),
          d.normalize());
        for (let w = 0; w <= r; ++w) {
          let A = (w / r) * Math.PI * 2,
            C = -t * Math.cos(A),
            F = t * Math.sin(A);
          ((p.x = f.x + (C * d.x + F * y.x)),
            (p.y = f.y + (C * d.y + F * y.y)),
            (p.z = f.z + (C * d.z + F * y.z)),
            c.push(p.x, p.y, p.z),
            u.subVectors(p, f).normalize(),
            l.push(u.x, u.y, u.z),
            h.push(x / i),
            h.push(w / r));
        }
      }
      for (let x = 1; x <= i; x++)
        for (let b = 1; b <= r; b++) {
          let w = (r + 1) * (x - 1) + (b - 1),
            A = (r + 1) * x + (b - 1),
            C = (r + 1) * x + b,
            F = (r + 1) * (x - 1) + b;
          (o.push(w, A, F), o.push(A, C, F));
        }
      function m(x, b, w, A, C) {
        let F = Math.cos(x),
          N = Math.sin(x),
          G = (w / b) * x,
          W = Math.cos(G);
        ((C.x = A * (2 + W) * 0.5 * F), (C.y = A * (2 + W) * N * 0.5), (C.z = A * Math.sin(G) * 0.5));
      }
      (this.setIndex(o),
        this.setAttribute("position", new Float32BufferAttribute(c, 3)),
        this.setAttribute("normal", new Float32BufferAttribute(l, 3)),
        this.setAttribute("uv", new Float32BufferAttribute(h, 2)));
    }
    copy(e) {
      return (super.copy(e), (this.parameters = Object.assign({}, e.parameters)), this);
    }
    static fromJSON(e) {
      return new n(e.radius, e.tube, e.tubularSegments, e.radialSegments, e.p, e.q);
    }
  },
  TubeGeometry = class n extends BufferGeometry {
    constructor(
      e = new QuadraticBezierCurve3(new Vector3(-1, -1, 0), new Vector3(-1, 1, 0), new Vector3(1, 1, 0)),
      t = 64,
      i = 1,
      r = 8,
      s = !1,
    ) {
      (super(),
        (this.type = "TubeGeometry"),
        (this.parameters = {
          path: e,
          tubularSegments: t,
          radius: i,
          radialSegments: r,
          closed: s,
        }));
      let a = e.computeFrenetFrames(t, s);
      ((this.tangents = a.tangents), (this.normals = a.normals), (this.binormals = a.binormals));
      let o = new Vector3(),
        c = new Vector3(),
        l = new Vector2(),
        h = new Vector3(),
        p = [],
        u = [],
        f = [],
        g = [];
      function y(v) {
        h = e.getPointAt(v / t, h);
        let d = a.normals[v],
          m = a.binormals[v];
        for (let x = 0; x <= r; x++) {
          let b = (x / r) * Math.PI * 2,
            w = Math.sin(b),
            A = -Math.cos(b);
          ((c.x = A * d.x + w * m.x),
            (c.y = A * d.y + w * m.y),
            (c.z = A * d.z + w * m.z),
            c.normalize(),
            u.push(c.x, c.y, c.z),
            (o.x = h.x + i * c.x),
            (o.y = h.y + i * c.y),
            (o.z = h.z + i * c.z),
            p.push(o.x, o.y, o.z));
        }
      }
      ((function () {
        for (let v = 0; v < t; v++) y(v);
        (y(s === !1 ? t : 0),
          (function () {
            for (let v = 0; v <= t; v++)
              for (let d = 0; d <= r; d++) ((l.x = v / t), (l.y = d / r), f.push(l.x, l.y));
          })(),
          (function () {
            for (let v = 1; v <= t; v++)
              for (let d = 1; d <= r; d++) {
                let m = (r + 1) * (v - 1) + (d - 1),
                  x = (r + 1) * v + (d - 1),
                  b = (r + 1) * v + d,
                  w = (r + 1) * (v - 1) + d;
                (g.push(m, x, w), g.push(x, b, w));
              }
          })());
      })(),
        this.setIndex(g),
        this.setAttribute("position", new Float32BufferAttribute(p, 3)),
        this.setAttribute("normal", new Float32BufferAttribute(u, 3)),
        this.setAttribute("uv", new Float32BufferAttribute(f, 2)));
    }
    copy(e) {
      return (super.copy(e), (this.parameters = Object.assign({}, e.parameters)), this);
    }
    toJSON() {
      let e = super.toJSON();
      return ((e.path = this.parameters.path.toJSON()), e);
    }
    static fromJSON(e) {
      return new n(new sl[e.path.type]().fromJSON(e.path), e.tubularSegments, e.radius, e.radialSegments, e.closed);
    }
  },
  WireframeGeometry = class extends BufferGeometry {
    constructor(e = null) {
      if (
        (super(),
        (this.type = "WireframeGeometry"),
        (this.parameters = {
          geometry: e,
        }),
        e !== null)
      ) {
        let t = [],
          i = new Set(),
          r = new Vector3(),
          s = new Vector3();
        if (e.index !== null) {
          let a = e.attributes.position,
            o = e.index,
            c = e.groups;
          c.length === 0 &&
            (c = [
              {
                start: 0,
                count: o.count,
                materialIndex: 0,
              },
            ]);
          for (let l = 0, h = c.length; l < h; ++l) {
            let p = c[l],
              u = p.start;
            for (let f = u, g = u + p.count; f < g; f += 3)
              for (let y = 0; y < 3; y++) {
                let v = o.getX(f + y),
                  d = o.getX(f + ((y + 1) % 3));
                (r.fromBufferAttribute(a, v),
                  s.fromBufferAttribute(a, d),
                  up(r, s, i) === !0 && (t.push(r.x, r.y, r.z), t.push(s.x, s.y, s.z)));
              }
          }
        } else {
          let a = e.attributes.position;
          for (let o = 0, c = a.count / 3; o < c; o++)
            for (let l = 0; l < 3; l++) {
              let h = 3 * o + l,
                p = 3 * o + ((l + 1) % 3);
              (r.fromBufferAttribute(a, h),
                s.fromBufferAttribute(a, p),
                up(r, s, i) === !0 && (t.push(r.x, r.y, r.z), t.push(s.x, s.y, s.z)));
            }
        }
        this.setAttribute("position", new Float32BufferAttribute(t, 3));
      }
    }
    copy(e) {
      return (super.copy(e), (this.parameters = Object.assign({}, e.parameters)), this);
    }
  };
function up(n, e, t) {
  let i = `${n.x},${n.y},${n.z}-${e.x},${e.y},${e.z}`,
    r = `${e.x},${e.y},${e.z}-${n.x},${n.y},${n.z}`;
  return t.has(i) !== !0 && t.has(r) !== !0 && (t.add(i), t.add(r), !0);
}
var Bv = Object.freeze({
  __proto__: null,
  BoxGeometry: BoxGeometry,
  CapsuleGeometry: CapsuleGeometry,
  CircleGeometry: CircleGeometry,
  ConeGeometry: ConeGeometry,
  CylinderGeometry: CylinderGeometry,
  DodecahedronGeometry: DodecahedronGeometry,
  EdgesGeometry: EdgesGeometry,
  ExtrudeGeometry: ExtrudeGeometry,
  IcosahedronGeometry: IcosahedronGeometry,
  LatheGeometry: LatheGeometry,
  OctahedronGeometry: OctahedronGeometry,
  PlaneGeometry: PlaneGeometry,
  PolyhedronGeometry: PolyhedronGeometry,
  RingGeometry: RingGeometry,
  ShapeGeometry: ShapeGeometry,
  SphereGeometry: SphereGeometry,
  TetrahedronGeometry: TetrahedronGeometry,
  TorusGeometry: TorusGeometry,
  TorusKnotGeometry: TorusKnotGeometry,
  TubeGeometry: TubeGeometry,
  WireframeGeometry: WireframeGeometry,
});
var MeshStandardMaterial = class extends Material {
  constructor(e) {
    (super(),
      (this.isMeshStandardMaterial = !0),
      (this.defines = {
        STANDARD: "",
      }),
      (this.type = "MeshStandardMaterial"),
      (this.color = new Color(16777215)),
      (this.roughness = 1),
      (this.metalness = 0),
      (this.map = null),
      (this.lightMap = null),
      (this.lightMapIntensity = 1),
      (this.aoMap = null),
      (this.aoMapIntensity = 1),
      (this.emissive = new Color(0)),
      (this.emissiveIntensity = 1),
      (this.emissiveMap = null),
      (this.bumpMap = null),
      (this.bumpScale = 1),
      (this.normalMap = null),
      (this.normalMapType = 0),
      (this.normalScale = new Vector2(1, 1)),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      (this.roughnessMap = null),
      (this.metalnessMap = null),
      (this.alphaMap = null),
      (this.envMap = null),
      (this.envMapRotation = new Euler()),
      (this.envMapIntensity = 1),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.wireframeLinecap = "round"),
      (this.wireframeLinejoin = "round"),
      (this.flatShading = !1),
      (this.fog = !0),
      this.setValues(e));
  }
  copy(e) {
    return (
      super.copy(e),
      (this.defines = {
        STANDARD: "",
      }),
      this.color.copy(e.color),
      (this.roughness = e.roughness),
      (this.metalness = e.metalness),
      (this.map = e.map),
      (this.lightMap = e.lightMap),
      (this.lightMapIntensity = e.lightMapIntensity),
      (this.aoMap = e.aoMap),
      (this.aoMapIntensity = e.aoMapIntensity),
      this.emissive.copy(e.emissive),
      (this.emissiveMap = e.emissiveMap),
      (this.emissiveIntensity = e.emissiveIntensity),
      (this.bumpMap = e.bumpMap),
      (this.bumpScale = e.bumpScale),
      (this.normalMap = e.normalMap),
      (this.normalMapType = e.normalMapType),
      this.normalScale.copy(e.normalScale),
      (this.displacementMap = e.displacementMap),
      (this.displacementScale = e.displacementScale),
      (this.displacementBias = e.displacementBias),
      (this.roughnessMap = e.roughnessMap),
      (this.metalnessMap = e.metalnessMap),
      (this.alphaMap = e.alphaMap),
      (this.envMap = e.envMap),
      this.envMapRotation.copy(e.envMapRotation),
      (this.envMapIntensity = e.envMapIntensity),
      (this.wireframe = e.wireframe),
      (this.wireframeLinewidth = e.wireframeLinewidth),
      (this.wireframeLinecap = e.wireframeLinecap),
      (this.wireframeLinejoin = e.wireframeLinejoin),
      (this.flatShading = e.flatShading),
      (this.fog = e.fog),
      this
    );
  }
};
function Co(n, e, t) {
  return !n || (!t && n.constructor === e)
    ? n
    : typeof e.BYTES_PER_ELEMENT == "number"
      ? new e(n)
      : Array.prototype.slice.call(n);
}
function Ug(n) {
  return ArrayBuffer.isView(n) && !(n instanceof DataView);
}
var ws = class {
    constructor(e, t, i, r) {
      ((this.parameterPositions = e),
        (this._cachedIndex = 0),
        (this.resultBuffer = r !== void 0 ? r : new t.constructor(i)),
        (this.sampleValues = t),
        (this.valueSize = i),
        (this.settings = null),
        (this.DefaultSettings_ = {}));
    }
    evaluate(e) {
      let t = this.parameterPositions,
        i = this._cachedIndex,
        r = t[i],
        s = t[i - 1];
      t: {
        e: {
          let a;
          i: {
            n: if (!(e < r)) {
              for (let o = i + 2; ;) {
                if (r === void 0) {
                  if (e < s) break n;
                  return ((i = t.length), (this._cachedIndex = i), this.copySampleValue_(i - 1));
                }
                if (i === o) break;
                if (((s = r), (r = t[++i]), e < r)) break e;
              }
              a = t.length;
              break i;
            }
            if (e >= s) break t;
            {
              let o = t[1];
              e < o && ((i = 2), (s = o));
              for (let c = i - 2; ;) {
                if (s === void 0) return ((this._cachedIndex = 0), this.copySampleValue_(0));
                if (i === c) break;
                if (((r = s), (s = t[--i - 1]), e >= s)) break e;
              }
              ((a = i), (i = 0));
            }
          }
          for (; i < a;) {
            let o = (i + a) >>> 1;
            e < t[o] ? (a = o) : (i = o + 1);
          }
          if (((r = t[i]), (s = t[i - 1]), s === void 0)) return ((this._cachedIndex = 0), this.copySampleValue_(0));
          if (r === void 0) return ((i = t.length), (this._cachedIndex = i), this.copySampleValue_(i - 1));
        }
        ((this._cachedIndex = i), this.intervalChanged_(i, s, r));
      }
      return this.interpolate_(i, s, e, r);
    }
    getSettings_() {
      return this.settings || this.DefaultSettings_;
    }
    copySampleValue_(e) {
      let t = this.resultBuffer,
        i = this.sampleValues,
        r = this.valueSize,
        s = e * r;
      for (let a = 0; a !== r; ++a) t[a] = i[s + a];
      return t;
    }
    interpolate_() {
      throw new Error("call to abstract method");
    }
    intervalChanged_() {}
  },
  qh = class extends ws {
    constructor(e, t, i, r) {
      (super(e, t, i, r),
        (this._weightPrev = -0),
        (this._offsetPrev = -0),
        (this._weightNext = -0),
        (this._offsetNext = -0),
        (this.DefaultSettings_ = {
          endingStart: ZeroCurvatureEnding,
          endingEnd: ZeroCurvatureEnding,
        }));
    }
    intervalChanged_(e, t, i) {
      let r = this.parameterPositions,
        s = e - 2,
        a = e + 1,
        o = r[s],
        c = r[a];
      if (o === void 0)
        switch (this.getSettings_().endingStart) {
          case ZeroSlopeEnding:
            ((s = e), (o = 2 * t - i));
            break;
          case WrapAroundEnding:
            ((s = r.length - 2), (o = t + r[s] - r[s + 1]));
            break;
          default:
            ((s = e), (o = i));
        }
      if (c === void 0)
        switch (this.getSettings_().endingEnd) {
          case ZeroSlopeEnding:
            ((a = e), (c = 2 * i - t));
            break;
          case WrapAroundEnding:
            ((a = 1), (c = i + r[1] - r[0]));
            break;
          default:
            ((a = e - 1), (c = t));
        }
      let l = 0.5 * (i - t),
        h = this.valueSize;
      ((this._weightPrev = l / (t - o)),
        (this._weightNext = l / (c - i)),
        (this._offsetPrev = s * h),
        (this._offsetNext = a * h));
    }
    interpolate_(e, t, i, r) {
      let s = this.resultBuffer,
        a = this.sampleValues,
        o = this.valueSize,
        c = e * o,
        l = c - o,
        h = this._offsetPrev,
        p = this._offsetNext,
        u = this._weightPrev,
        f = this._weightNext,
        g = (i - t) / (r - t),
        y = g * g,
        v = y * g,
        d = -u * v + 2 * u * y - u * g,
        m = (1 + u) * v + (-1.5 - 2 * u) * y + (-0.5 + u) * g + 1,
        x = (-1 - f) * v + (1.5 + f) * y + 0.5 * g,
        b = f * v - f * y;
      for (let w = 0; w !== o; ++w) s[w] = d * a[h + w] + m * a[l + w] + x * a[c + w] + b * a[p + w];
      return s;
    }
  },
  Yh = class extends ws {
    constructor(e, t, i, r) {
      super(e, t, i, r);
    }
    interpolate_(e, t, i, r) {
      let s = this.resultBuffer,
        a = this.sampleValues,
        o = this.valueSize,
        c = e * o,
        l = c - o,
        h = (i - t) / (r - t),
        p = 1 - h;
      for (let u = 0; u !== o; ++u) s[u] = a[l + u] * p + a[c + u] * h;
      return s;
    }
  },
  Zh = class extends ws {
    constructor(e, t, i, r) {
      super(e, t, i, r);
    }
    interpolate_(e) {
      return this.copySampleValue_(e - 1);
    }
  },
  un = class {
    constructor(e, t, i, r) {
      if (e === void 0) throw new Error("THREE.KeyframeTrack: track name is undefined");
      if (t === void 0 || t.length === 0) throw new Error("THREE.KeyframeTrack: no keyframes in track named " + e);
      ((this.name = e),
        (this.times = Co(t, this.TimeBufferType)),
        (this.values = Co(i, this.ValueBufferType)),
        this.setInterpolation(r || this.DefaultInterpolation));
    }
    static toJSON(e) {
      let t = e.constructor,
        i;
      if (t.toJSON !== this.toJSON) i = t.toJSON(e);
      else {
        i = {
          name: e.name,
          times: Co(e.times, Array),
          values: Co(e.values, Array),
        };
        let r = e.getInterpolation();
        r !== e.DefaultInterpolation && (i.interpolation = r);
      }
      return ((i.type = e.ValueTypeName), i);
    }
    InterpolantFactoryMethodDiscrete(e) {
      return new Zh(this.times, this.values, this.getValueSize(), e);
    }
    InterpolantFactoryMethodLinear(e) {
      return new Yh(this.times, this.values, this.getValueSize(), e);
    }
    InterpolantFactoryMethodSmooth(e) {
      return new qh(this.times, this.values, this.getValueSize(), e);
    }
    setInterpolation(e) {
      let t;
      switch (e) {
        case InterpolateDiscrete:
          t = this.InterpolantFactoryMethodDiscrete;
          break;
        case InterpolateLinear:
          t = this.InterpolantFactoryMethodLinear;
          break;
        case InterpolateSmooth:
          t = this.InterpolantFactoryMethodSmooth;
      }
      if (t === void 0) {
        let i = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
        if (this.createInterpolant === void 0) {
          if (e === this.DefaultInterpolation) throw new Error(i);
          this.setInterpolation(this.DefaultInterpolation);
        }
        return (console.warn("THREE.KeyframeTrack:", i), this);
      }
      return ((this.createInterpolant = t), this);
    }
    getInterpolation() {
      switch (this.createInterpolant) {
        case this.InterpolantFactoryMethodDiscrete:
          return InterpolateDiscrete;
        case this.InterpolantFactoryMethodLinear:
          return InterpolateLinear;
        case this.InterpolantFactoryMethodSmooth:
          return InterpolateSmooth;
      }
    }
    getValueSize() {
      return this.values.length / this.times.length;
    }
    shift(e) {
      if (e !== 0) {
        let t = this.times;
        for (let i = 0, r = t.length; i !== r; ++i) t[i] += e;
      }
      return this;
    }
    scale(e) {
      if (e !== 1) {
        let t = this.times;
        for (let i = 0, r = t.length; i !== r; ++i) t[i] *= e;
      }
      return this;
    }
    trim(e, t) {
      let i = this.times,
        r = i.length,
        s = 0,
        a = r - 1;
      for (; s !== r && i[s] < e;) ++s;
      for (; a !== -1 && i[a] > t;) --a;
      if ((++a, s !== 0 || a !== r)) {
        s >= a && ((a = Math.max(a, 1)), (s = a - 1));
        let o = this.getValueSize();
        ((this.times = i.slice(s, a)), (this.values = this.values.slice(s * o, a * o)));
      }
      return this;
    }
    validate() {
      let e = !0,
        t = this.getValueSize();
      t - Math.floor(t) != 0 && (console.error("THREE.KeyframeTrack: Invalid value size in track.", this), (e = !1));
      let i = this.times,
        r = this.values,
        s = i.length;
      s === 0 && (console.error("THREE.KeyframeTrack: Track is empty.", this), (e = !1));
      let a = null;
      for (let o = 0; o !== s; o++) {
        let c = i[o];
        if (typeof c == "number" && isNaN(c)) {
          (console.error("THREE.KeyframeTrack: Time is not a valid number.", this, o, c), (e = !1));
          break;
        }
        if (a !== null && a > c) {
          (console.error("THREE.KeyframeTrack: Out of order keys.", this, o, c, a), (e = !1));
          break;
        }
        a = c;
      }
      if (r !== void 0 && Ug(r))
        for (let o = 0, c = r.length; o !== c; ++o) {
          let l = r[o];
          if (isNaN(l)) {
            (console.error("THREE.KeyframeTrack: Value is not a valid number.", this, o, l), (e = !1));
            break;
          }
        }
      return e;
    }
    optimize() {
      let e = this.times.slice(),
        t = this.values.slice(),
        i = this.getValueSize(),
        r = this.getInterpolation() === InterpolateSmooth,
        s = e.length - 1,
        a = 1;
      for (let o = 1; o < s; ++o) {
        let c = !1,
          l = e[o];
        if (l !== e[o + 1] && (o !== 1 || l !== e[0]))
          if (r) c = !0;
          else {
            let h = o * i,
              p = h - i,
              u = h + i;
            for (let f = 0; f !== i; ++f) {
              let g = t[h + f];
              if (g !== t[p + f] || g !== t[u + f]) {
                c = !0;
                break;
              }
            }
          }
        if (c) {
          if (o !== a) {
            e[a] = e[o];
            let h = o * i,
              p = a * i;
            for (let u = 0; u !== i; ++u) t[p + u] = t[h + u];
          }
          ++a;
        }
      }
      if (s > 0) {
        e[a] = e[s];
        for (let o = s * i, c = a * i, l = 0; l !== i; ++l) t[c + l] = t[o + l];
        ++a;
      }
      return (
        a !== e.length
          ? ((this.times = e.slice(0, a)), (this.values = t.slice(0, a * i)))
          : ((this.times = e), (this.values = t)),
        this
      );
    }
    clone() {
      let e = this.times.slice(),
        t = this.values.slice(),
        i = new this.constructor(this.name, e, t);
      return ((i.createInterpolant = this.createInterpolant), i);
    }
  };
((un.prototype.TimeBufferType = Float32Array),
  (un.prototype.ValueBufferType = Float32Array),
  (un.prototype.DefaultInterpolation = InterpolateLinear));
var Tr = class extends un {
  constructor(e, t, i) {
    super(e, t, i);
  }
};
((Tr.prototype.ValueTypeName = "bool"),
  (Tr.prototype.ValueBufferType = Array),
  (Tr.prototype.DefaultInterpolation = InterpolateDiscrete),
  (Tr.prototype.InterpolantFactoryMethodLinear = void 0),
  (Tr.prototype.InterpolantFactoryMethodSmooth = void 0));
var Kh = class extends un {};
Kh.prototype.ValueTypeName = "color";
var Jh = class extends un {};
Jh.prototype.ValueTypeName = "number";
var $h = class extends ws {
    constructor(e, t, i, r) {
      super(e, t, i, r);
    }
    interpolate_(e, t, i, r) {
      let s = this.resultBuffer,
        a = this.sampleValues,
        o = this.valueSize,
        c = (i - t) / (r - t),
        l = e * o;
      for (let h = l + o; l !== h; l += 4) Quaternion.slerpFlat(s, 0, a, l - o, a, l, c);
      return s;
    }
  },
  ol = class extends un {
    InterpolantFactoryMethodLinear(e) {
      return new $h(this.times, this.values, this.getValueSize(), e);
    }
  };
((ol.prototype.ValueTypeName = "quaternion"), (ol.prototype.InterpolantFactoryMethodSmooth = void 0));
var Er = class extends un {
  constructor(e, t, i) {
    super(e, t, i);
  }
};
((Er.prototype.ValueTypeName = "string"),
  (Er.prototype.ValueBufferType = Array),
  (Er.prototype.DefaultInterpolation = InterpolateDiscrete),
  (Er.prototype.InterpolantFactoryMethodLinear = void 0),
  (Er.prototype.InterpolantFactoryMethodSmooth = void 0));
var Qh = class extends un {};
Qh.prototype.ValueTypeName = "vector";
var eu = class {
    constructor(e, t, i) {
      let r = this,
        s,
        a = !1,
        o = 0,
        c = 0,
        l = [];
      ((this.onStart = void 0),
        (this.onLoad = e),
        (this.onProgress = t),
        (this.onError = i),
        (this.itemStart = function (h) {
          (c++, a === !1 && r.onStart !== void 0 && r.onStart(h, o, c), (a = !0));
        }),
        (this.itemEnd = function (h) {
          (o++,
            r.onProgress !== void 0 && r.onProgress(h, o, c),
            o === c && ((a = !1), r.onLoad !== void 0 && r.onLoad()));
        }),
        (this.itemError = function (h) {
          r.onError !== void 0 && r.onError(h);
        }),
        (this.resolveURL = function (h) {
          return s ? s(h) : h;
        }),
        (this.setURLModifier = function (h) {
          return ((s = h), this);
        }),
        (this.addHandler = function (h, p) {
          return (l.push(h, p), this);
        }),
        (this.removeHandler = function (h) {
          let p = l.indexOf(h);
          return (p !== -1 && l.splice(p, 2), this);
        }),
        (this.getHandler = function (h) {
          for (let p = 0, u = l.length; p < u; p += 2) {
            let f = l[p],
              g = l[p + 1];
            if ((f.global && (f.lastIndex = 0), f.test(h))) return g;
          }
          return null;
        }));
    }
  },
  Og = new eu(),
  tu = class {
    constructor(e) {
      ((this.manager = e !== void 0 ? e : Og),
        (this.crossOrigin = "anonymous"),
        (this.withCredentials = !1),
        (this.path = ""),
        (this.resourcePath = ""),
        (this.requestHeader = {}));
    }
    load() {}
    loadAsync(e, t) {
      let i = this;
      return new Promise(function (r, s) {
        i.load(e, r, t, s);
      });
    }
    parse() {}
    setCrossOrigin(e) {
      return ((this.crossOrigin = e), this);
    }
    setWithCredentials(e) {
      return ((this.withCredentials = e), this);
    }
    setPath(e) {
      return ((this.path = e), this);
    }
    setResourcePath(e) {
      return ((this.resourcePath = e), this);
    }
    setRequestHeader(e) {
      return ((this.requestHeader = e), this);
    }
  };
tu.DEFAULT_MATERIAL_NAME = "__DEFAULT";
var Light = class extends Object3D {
    constructor(e, t = 1) {
      (super(), (this.isLight = !0), (this.type = "Light"), (this.color = new Color(e)), (this.intensity = t));
    }
    dispose() {}
    copy(e, t) {
      return (super.copy(e, t), this.color.copy(e.color), (this.intensity = e.intensity), this);
    }
    toJSON(e) {
      let t = super.toJSON(e);
      return (
        (t.object.color = this.color.getHex()),
        (t.object.intensity = this.intensity),
        this.groundColor !== void 0 && (t.object.groundColor = this.groundColor.getHex()),
        this.distance !== void 0 && (t.object.distance = this.distance),
        this.angle !== void 0 && (t.object.angle = this.angle),
        this.decay !== void 0 && (t.object.decay = this.decay),
        this.penumbra !== void 0 && (t.object.penumbra = this.penumbra),
        this.shadow !== void 0 && (t.object.shadow = this.shadow.toJSON()),
        this.target !== void 0 && (t.object.target = this.target.uuid),
        t
      );
    }
  },
  HemisphereLight = class extends Light {
    constructor(e, t, i) {
      (super(e, i),
        (this.isHemisphereLight = !0),
        (this.type = "HemisphereLight"),
        this.position.copy(Object3D.DEFAULT_UP),
        this.updateMatrix(),
        (this.groundColor = new Color(t)));
    }
    copy(e, t) {
      return (super.copy(e, t), this.groundColor.copy(e.groundColor), this);
    }
  },
  Lc = new Matrix4(),
  dp = new Vector3(),
  pp = new Vector3(),
  iu = class {
    constructor(e) {
      ((this.camera = e),
        (this.intensity = 1),
        (this.bias = 0),
        (this.normalBias = 0),
        (this.radius = 1),
        (this.blurSamples = 8),
        (this.mapSize = new Vector2(512, 512)),
        (this.map = null),
        (this.mapPass = null),
        (this.matrix = new Matrix4()),
        (this.autoUpdate = !0),
        (this.needsUpdate = !1),
        (this._frustum = new _s()),
        (this._frameExtents = new Vector2(1, 1)),
        (this._viewportCount = 1),
        (this._viewports = [new Vector4(0, 0, 1, 1)]));
    }
    getViewportCount() {
      return this._viewportCount;
    }
    getFrustum() {
      return this._frustum;
    }
    updateMatrices(e) {
      let t = this.camera,
        i = this.matrix;
      (dp.setFromMatrixPosition(e.matrixWorld),
        t.position.copy(dp),
        pp.setFromMatrixPosition(e.target.matrixWorld),
        t.lookAt(pp),
        t.updateMatrixWorld(),
        Lc.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse),
        this._frustum.setFromProjectionMatrix(Lc),
        i.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1),
        i.multiply(Lc));
    }
    getViewport(e) {
      return this._viewports[e];
    }
    getFrameExtents() {
      return this._frameExtents;
    }
    dispose() {
      (this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose());
    }
    copy(e) {
      return (
        (this.camera = e.camera.clone()),
        (this.intensity = e.intensity),
        (this.bias = e.bias),
        (this.radius = e.radius),
        this.mapSize.copy(e.mapSize),
        this
      );
    }
    clone() {
      return new this.constructor().copy(this);
    }
    toJSON() {
      let e = {};
      return (
        this.intensity !== 1 && (e.intensity = this.intensity),
        this.bias !== 0 && (e.bias = this.bias),
        this.normalBias !== 0 && (e.normalBias = this.normalBias),
        this.radius !== 1 && (e.radius = this.radius),
        (this.mapSize.x === 512 && this.mapSize.y === 512) || (e.mapSize = this.mapSize.toArray()),
        (e.camera = this.camera.toJSON(!1).object),
        delete e.camera.matrix,
        e
      );
    }
  };
var zv = new Matrix4(),
  kv = new Vector3(),
  Gv = new Vector3();
var DirectionalLightShadow = class extends iu {
    constructor() {
      (super(new OrthographicCamera(-5, 5, 5, -5, 0.5, 500)), (this.isDirectionalLightShadow = !0));
    }
  },
  DirectionalLight = class extends Light {
    constructor(e, t) {
      (super(e, t),
        (this.isDirectionalLight = !0),
        (this.type = "DirectionalLight"),
        this.position.copy(Object3D.DEFAULT_UP),
        this.updateMatrix(),
        (this.target = new Object3D()),
        (this.shadow = new DirectionalLightShadow()));
    }
    dispose() {
      this.shadow.dispose();
    }
    copy(e) {
      return (super.copy(e), (this.target = e.target.clone()), (this.shadow = e.shadow.clone()), this);
    }
  };
var Hv = new Matrix4(),
  Vv = new Matrix4(),
  Wv = new Matrix4();
var Xv = new Vector3(),
  jv = new Quaternion(),
  qv = new Vector3(),
  Yv = new Vector3();
var Zv = new Vector3(),
  Kv = new Quaternion(),
  Jv = new Vector3(),
  $v = new Vector3();
var pu = "\\[\\]\\.:\\/",
  Fg = new RegExp("[" + pu + "]", "g"),
  Ic = "[^" + pu + "]",
  Bg = "[^" + pu.replace("\\.", "") + "]",
  zg = new RegExp(
    "^" +
      /((?:WC+[\/:])*)/.source.replace("WC", Ic) +
      /(WCOD+)?/.source.replace("WCOD", Bg) +
      /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", Ic) +
      /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", Ic) +
      "$",
  ),
  kg = ["material", "materials", "bones", "map"],
  Ot = class n {
    constructor(e, t, i) {
      ((this.path = t),
        (this.parsedPath = i || n.parseTrackName(t)),
        (this.node = n.findNode(e, this.parsedPath.nodeName)),
        (this.rootNode = e),
        (this.getValue = this._getValue_unbound),
        (this.setValue = this._setValue_unbound));
    }
    static create(e, t, i) {
      return e && e.isAnimationObjectGroup ? new n.Composite(e, t, i) : new n(e, t, i);
    }
    static sanitizeNodeName(e) {
      return e.replace(/\s/g, "_").replace(Fg, "");
    }
    static parseTrackName(e) {
      let t = zg.exec(e);
      if (t === null) throw new Error("PropertyBinding: Cannot parse trackName: " + e);
      let i = {
          nodeName: t[2],
          objectName: t[3],
          objectIndex: t[4],
          propertyName: t[5],
          propertyIndex: t[6],
        },
        r = i.nodeName && i.nodeName.lastIndexOf(".");
      if (r !== void 0 && r !== -1) {
        let s = i.nodeName.substring(r + 1);
        kg.indexOf(s) !== -1 && ((i.nodeName = i.nodeName.substring(0, r)), (i.objectName = s));
      }
      if (i.propertyName === null || i.propertyName.length === 0)
        throw new Error("PropertyBinding: can not parse propertyName from trackName: " + e);
      return i;
    }
    static findNode(e, t) {
      if (t === void 0 || t === "" || t === "." || t === -1 || t === e.name || t === e.uuid) return e;
      if (e.skeleton) {
        let i = e.skeleton.getBoneByName(t);
        if (i !== void 0) return i;
      }
      if (e.children) {
        let i = function (s) {
            for (let a = 0; a < s.length; a++) {
              let o = s[a];
              if (o.name === t || o.uuid === t) return o;
              let c = i(o.children);
              if (c) return c;
            }
            return null;
          },
          r = i(e.children);
        if (r) return r;
      }
      return null;
    }
    _getValue_unavailable() {}
    _setValue_unavailable() {}
    _getValue_direct(e, t) {
      e[t] = this.targetObject[this.propertyName];
    }
    _getValue_array(e, t) {
      let i = this.resolvedProperty;
      for (let r = 0, s = i.length; r !== s; ++r) e[t++] = i[r];
    }
    _getValue_arrayElement(e, t) {
      e[t] = this.resolvedProperty[this.propertyIndex];
    }
    _getValue_toArray(e, t) {
      this.resolvedProperty.toArray(e, t);
    }
    _setValue_direct(e, t) {
      this.targetObject[this.propertyName] = e[t];
    }
    _setValue_direct_setNeedsUpdate(e, t) {
      ((this.targetObject[this.propertyName] = e[t]), (this.targetObject.needsUpdate = !0));
    }
    _setValue_direct_setMatrixWorldNeedsUpdate(e, t) {
      ((this.targetObject[this.propertyName] = e[t]), (this.targetObject.matrixWorldNeedsUpdate = !0));
    }
    _setValue_array(e, t) {
      let i = this.resolvedProperty;
      for (let r = 0, s = i.length; r !== s; ++r) i[r] = e[t++];
    }
    _setValue_array_setNeedsUpdate(e, t) {
      let i = this.resolvedProperty;
      for (let r = 0, s = i.length; r !== s; ++r) i[r] = e[t++];
      this.targetObject.needsUpdate = !0;
    }
    _setValue_array_setMatrixWorldNeedsUpdate(e, t) {
      let i = this.resolvedProperty;
      for (let r = 0, s = i.length; r !== s; ++r) i[r] = e[t++];
      this.targetObject.matrixWorldNeedsUpdate = !0;
    }
    _setValue_arrayElement(e, t) {
      this.resolvedProperty[this.propertyIndex] = e[t];
    }
    _setValue_arrayElement_setNeedsUpdate(e, t) {
      ((this.resolvedProperty[this.propertyIndex] = e[t]), (this.targetObject.needsUpdate = !0));
    }
    _setValue_arrayElement_setMatrixWorldNeedsUpdate(e, t) {
      ((this.resolvedProperty[this.propertyIndex] = e[t]), (this.targetObject.matrixWorldNeedsUpdate = !0));
    }
    _setValue_fromArray(e, t) {
      this.resolvedProperty.fromArray(e, t);
    }
    _setValue_fromArray_setNeedsUpdate(e, t) {
      (this.resolvedProperty.fromArray(e, t), (this.targetObject.needsUpdate = !0));
    }
    _setValue_fromArray_setMatrixWorldNeedsUpdate(e, t) {
      (this.resolvedProperty.fromArray(e, t), (this.targetObject.matrixWorldNeedsUpdate = !0));
    }
    _getValue_unbound(e, t) {
      (this.bind(), this.getValue(e, t));
    }
    _setValue_unbound(e, t) {
      (this.bind(), this.setValue(e, t));
    }
    bind() {
      let e = this.node,
        t = this.parsedPath,
        i = t.objectName,
        r = t.propertyName,
        s = t.propertyIndex;
      if (
        (e || ((e = n.findNode(this.rootNode, t.nodeName)), (this.node = e)),
        (this.getValue = this._getValue_unavailable),
        (this.setValue = this._setValue_unavailable),
        !e)
      )
        return void console.warn("THREE.PropertyBinding: No target node found for track: " + this.path + ".");
      if (i) {
        let l = t.objectIndex;
        switch (i) {
          case "materials":
            if (!e.material)
              return void console.error(
                "THREE.PropertyBinding: Can not bind to material as node does not have a material.",
                this,
              );
            if (!e.material.materials)
              return void console.error(
                "THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",
                this,
              );
            e = e.material.materials;
            break;
          case "bones":
            if (!e.skeleton)
              return void console.error(
                "THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",
                this,
              );
            e = e.skeleton.bones;
            for (let h = 0; h < e.length; h++)
              if (e[h].name === l) {
                l = h;
                break;
              }
            break;
          case "map":
            if ("map" in e) {
              e = e.map;
              break;
            }
            if (!e.material)
              return void console.error(
                "THREE.PropertyBinding: Can not bind to material as node does not have a material.",
                this,
              );
            if (!e.material.map)
              return void console.error(
                "THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",
                this,
              );
            e = e.material.map;
            break;
          default:
            if (e[i] === void 0)
              return void console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.", this);
            e = e[i];
        }
        if (l !== void 0) {
          if (e[l] === void 0)
            return void console.error(
              "THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",
              this,
              e,
            );
          e = e[l];
        }
      }
      let a = e[r];
      if (a === void 0) {
        let l = t.nodeName;
        return void console.error(
          "THREE.PropertyBinding: Trying to update property for track: " + l + "." + r + " but it wasn't found.",
          e,
        );
      }
      let o = this.Versioning.None;
      ((this.targetObject = e),
        e.needsUpdate !== void 0
          ? (o = this.Versioning.NeedsUpdate)
          : e.matrixWorldNeedsUpdate !== void 0 && (o = this.Versioning.MatrixWorldNeedsUpdate));
      let c = this.BindingType.Direct;
      if (s !== void 0) {
        if (r === "morphTargetInfluences") {
          if (!e.geometry)
            return void console.error(
              "THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",
              this,
            );
          if (!e.geometry.morphAttributes)
            return void console.error(
              "THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",
              this,
            );
          e.morphTargetDictionary[s] !== void 0 && (s = e.morphTargetDictionary[s]);
        }
        ((c = this.BindingType.ArrayElement), (this.resolvedProperty = a), (this.propertyIndex = s));
      } else
        a.fromArray !== void 0 && a.toArray !== void 0
          ? ((c = this.BindingType.HasFromToArray), (this.resolvedProperty = a))
          : Array.isArray(a)
            ? ((c = this.BindingType.EntireArray), (this.resolvedProperty = a))
            : (this.propertyName = r);
      ((this.getValue = this.GetterByBindingType[c]), (this.setValue = this.SetterByBindingTypeAndVersioning[c][o]));
    }
    unbind() {
      ((this.node = null), (this.getValue = this._getValue_unbound), (this.setValue = this._setValue_unbound));
    }
  };
((Ot.Composite = class {
  constructor(n, e, t) {
    let i = t || Ot.parseTrackName(e);
    ((this._targetGroup = n), (this._bindings = n.subscribe_(e, i)));
  }
  getValue(n, e) {
    this.bind();
    let t = this._targetGroup.nCachedObjects_,
      i = this._bindings[t];
    i !== void 0 && i.getValue(n, e);
  }
  setValue(n, e) {
    let t = this._bindings;
    for (let i = this._targetGroup.nCachedObjects_, r = t.length; i !== r; ++i) t[i].setValue(n, e);
  }
  bind() {
    let n = this._bindings;
    for (let e = this._targetGroup.nCachedObjects_, t = n.length; e !== t; ++e) n[e].bind();
  }
  unbind() {
    let n = this._bindings;
    for (let e = this._targetGroup.nCachedObjects_, t = n.length; e !== t; ++e) n[e].unbind();
  }
}),
  (Ot.prototype.BindingType = {
    Direct: 0,
    EntireArray: 1,
    ArrayElement: 2,
    HasFromToArray: 3,
  }),
  (Ot.prototype.Versioning = {
    None: 0,
    NeedsUpdate: 1,
    MatrixWorldNeedsUpdate: 2,
  }),
  (Ot.prototype.GetterByBindingType = [
    Ot.prototype._getValue_direct,
    Ot.prototype._getValue_array,
    Ot.prototype._getValue_arrayElement,
    Ot.prototype._getValue_toArray,
  ]),
  (Ot.prototype.SetterByBindingTypeAndVersioning = [
    [
      Ot.prototype._setValue_direct,
      Ot.prototype._setValue_direct_setNeedsUpdate,
      Ot.prototype._setValue_direct_setMatrixWorldNeedsUpdate,
    ],
    [
      Ot.prototype._setValue_array,
      Ot.prototype._setValue_array_setNeedsUpdate,
      Ot.prototype._setValue_array_setMatrixWorldNeedsUpdate,
    ],
    [
      Ot.prototype._setValue_arrayElement,
      Ot.prototype._setValue_arrayElement_setNeedsUpdate,
      Ot.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate,
    ],
    [
      Ot.prototype._setValue_fromArray,
      Ot.prototype._setValue_fromArray_setNeedsUpdate,
      Ot.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate,
    ],
  ]));
var Qv = new Float32Array(1);
var ex = new Matrix4();
var tx = new Vector2();
var ix = new Vector3(),
  nx = new Vector3();
var rx = new Vector3();
var sx = new Vector3(),
  ax = new Matrix4(),
  ox = new Matrix4();
var lx = new Vector3(),
  cx = new Color(),
  hx = new Color();
var ux = new Vector3(),
  dx = new Vector3(),
  px = new Vector3();
var fx = new Vector3(),
  mx = new Camera();
var gx = new Box3();
var vx = new Vector3();
(typeof __THREE_DEVTOOLS__ != "undefined" &&
  __THREE_DEVTOOLS__.dispatchEvent(
    new CustomEvent("register", {
      detail: {
        revision: "169",
      },
    }),
  ),
  typeof window != "undefined" &&
    (window.__THREE__
      ? console.warn("WARNING: Multiple instances of Three.js being imported.")
      : (window.__THREE__ = "169")));
