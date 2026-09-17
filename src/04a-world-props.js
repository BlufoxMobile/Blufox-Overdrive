// ---------------------------------------------------------------------------
// 04a-world-props — shared prop builders, procedural textures and animated
// material helpers used by the circuit dressers in 04b-world-dress.js.
// Loads right after 04-world.js and shares its scope (kr, zr, wl, Ca, Ra, Tt,
// Eu, Tu, Ns, gf, l1, Sf, Us, c1 ...). Nothing here touches collision.
// ---------------------------------------------------------------------------

// Shared time uniform for every animated world material (updated by the frame
// hook in 04-world.js).  Materials opt in through Wf_anim().
var Wf = { time: { value: 0 } };

// Inject a vertex-displacement snippet into a built-in material.  `inject`
// runs right after begin_vertex, so `transformed`, `objectNormal`, `uv`,
// `position` and `uTime` are all available.
function Wf_anim(mat, key, inject) {
  mat.onBeforeCompile = (sh) => {
    sh.uniforms.uTime = Wf.time;
    sh.vertexShader = sh.vertexShader
      .replace("#include <common>", "#include <common>\nuniform float uTime;")
      .replace("#include <begin_vertex>", "#include <begin_vertex>\n" + inject);
  };
  mat.customProgramCacheKey = () => "bfx:" + key;
  return mat;
}

// ---- procedural textures ---------------------------------------------------

// Tileable value noise, size×size, values 0..1.
function Wf_noise(size, seed, octaves = 4, persistence = 0.55, base = 4) {
  let r = Sf(seed),
    out = new Float32Array(size * size),
    total = 0,
    amp = 1;
  for (let o = 0; o < octaves; o++) {
    let cells = base << o,
      lat = new Float32Array(cells * cells);
    for (let i = 0; i < lat.length; i++) lat[i] = r();
    let cs = size / cells;
    for (let y = 0; y < size; y++) {
      let fy = y / cs,
        y0 = Math.floor(fy),
        ty = fy - y0,
        sy = ty * ty * (3 - 2 * ty),
        y1 = (y0 + 1) % cells;
      y0 %= cells;
      for (let x = 0; x < size; x++) {
        let fx = x / cs,
          x0 = Math.floor(fx),
          tx = fx - x0,
          sx = tx * tx * (3 - 2 * tx),
          x1 = (x0 + 1) % cells;
        x0 %= cells;
        let a = lat[y0 * cells + x0],
          b = lat[y0 * cells + x1],
          c = lat[y1 * cells + x0],
          d = lat[y1 * cells + x1],
          v = (a + (b - a) * sx) * (1 - sy) + (c + (d - c) * sx) * sy;
        out[y * size + x] += v * amp;
      }
    }
    total += amp;
    amp *= persistence;
  }
  for (let i = 0; i < out.length; i++) out[i] /= total;
  return out;
}

// Height field -> tangent-space normal map texture.
function Wf_normalTex(h, size, strength = 2) {
  if (!wu) return null;
  let [c, ctx] = Tu(size, size),
    img = ctx.createImageData(size, size),
    d = img.data;
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      let l = h[y * size + ((x - 1 + size) % size)],
        r = h[y * size + ((x + 1) % size)],
        u = h[((y - 1 + size) % size) * size + x],
        dn = h[((y + 1) % size) * size + x],
        nx = (l - r) * strength,
        ny = (dn - u) * strength,
        nz = 1,
        len = Math.hypot(nx, ny, nz),
        i = (y * size + x) * 4;
      d[i] = ((nx / len) * 0.5 + 0.5) * 255;
      d[i + 1] = ((ny / len) * 0.5 + 0.5) * 255;
      d[i + 2] = ((nz / len) * 0.5 + 0.5) * 255;
      d[i + 3] = 255;
    }
  ctx.putImageData(img, 0, 0);
  return Eu(c, { srgb: !1 });
}

// Road albedo/normal/roughness set for a circuit.  Everything is baked from
// the same noise so the bumps line up with the speckle.
function Wf_roadTextures(index, quality) {
  if (!wu) return {};
  let size = quality === "low" ? 128 : 256,
    seed = 91 + index * 13,
    hN = Wf_noise(size, seed, 5, 0.5, index === 0 ? 2 : 4),
    fine = Wf_noise(size, seed + 3, 2, 0.5, 32),
    r = Sf(seed + 9),
    [c, ctx] = Tu(size, size),
    img = ctx.createImageData(size, size),
    d = img.data,
    [rc, rctx] = Tu(size, size),
    rimg = rctx.createImageData(size, size),
    rd = rimg.data,
    tiles = index === 1,
    grate = index === 5,
    cell = size / 4;
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      let i = (y * size + x) * 4,
        n = hN[y * size + x],
        f = fine[y * size + x],
        v = 150 + (n - 0.5) * 44 + (f - 0.5) * 30,
        rough = 0.55 + (n - 0.5) * 0.3;
      if (tiles) {
        v = 214 + (n - 0.5) * 24 + (f - 0.5) * 10;
        let gx = x % cell,
          gy = y % cell;
        (gx < 2 || gy < 2) && (v -= 60);
        rough = 0.12 + (f - 0.5) * 0.08;
      } else if (grate) {
        let gx = x % 16,
          gy = y % 16,
          bar = gx < 3 || gy < 3;
        v = bar ? 120 + (f - 0.5) * 30 : 46 + (n - 0.5) * 30;
        rough = bar ? 0.28 : 0.6;
      } else if (index === 0) {
        // wet asphalt: puddles in the low spots of the coarse noise
        let p = mf((0.45 - n) * 5, 0, 1);
        (v = v * (1 - p * 0.16)), (rough = 0.5 + (f - 0.5) * 0.2 - p * 0.42);
      } else if (index === 3) {
        // snow-dusted: light grains
        let s = mf((n - 0.55) * 6, 0, 1);
        (v = v + s * 70), (rough = 0.65 + s * 0.2);
      } else if (index === 4) {
        let s = mf((n - 0.5) * 5, 0, 1);
        v = v * (1 - s * 0.1) + s * 40;
        rough = 0.72;
      }
      r() < 0.012 && (v += 60);
      v = mf(v, 0, 255);
      let tint = tiles ? [1, 1, 1] : index === 4 ? [1.04, 0.98, 0.92] : index === 3 ? [0.97, 0.99, 1.04] : [1, 1, 1];
      d[i] = v * tint[0];
      d[i + 1] = v * tint[1];
      d[i + 2] = v * tint[2];
      d[i + 3] = 255;
      let rv = mf(rough, 0.04, 1) * 255;
      rd[i] = rd[i + 1] = rd[i + 2] = rv;
      rd[i + 3] = 255;
    }
  (ctx.putImageData(img, 0, 0), rctx.putImageData(rimg, 0, 0));
  let bump = new Float32Array(size * size);
  for (let i = 0; i < bump.length; i++) bump[i] = hN[i] * 0.55 + fine[i] * 0.45;
  if (tiles || grate) {
    for (let y = 0; y < size; y++)
      for (let x = 0; x < size; x++) {
        let gx = tiles ? x % cell : x % 16,
          gy = tiles ? y % cell : y % 16,
          edge = gx < 2 || gy < 2 ? (tiles ? 0.35 : 0.5) : 0;
        bump[y * size + x] = (grate ? (gx < 3 || gy < 3 ? 0.9 : 0.3) : 0.5) - edge + fine[y * size + x] * 0.12;
      }
  }
  return {
    map: Eu(c),
    normalMap: Wf_normalTex(bump, size, tiles ? 5 : grate ? 5 : 3.2),
    roughnessMap: Eu(rc, { srgb: !1 }),
  };
}

// Water normal map (rippled).
function Wf_waterNormal() {
  if (!wu) return null;
  let size = 128,
    a = Wf_noise(size, 401, 4, 0.55, 4),
    b = Wf_noise(size, 407, 3, 0.5, 16),
    h = new Float32Array(size * size);
  for (let i = 0; i < h.length; i++) h[i] = a[i] * 0.6 + b[i] * 0.4;
  return Wf_normalTex(h, size, 3.5);
}

// 1-D cross gradient strip (used for tyre wear / dust overlays): value at the
// centre `mid`, edges `edge`, RGB only, optional alpha ramp.
function Wf_stripTex(mid, edge, alphaRamp = !1) {
  if (!wu) return null;
  let [c, ctx] = Tu(64, 8),
    img = ctx.createImageData(64, 8),
    d = img.data;
  for (let y = 0; y < 8; y++)
    for (let x = 0; x < 64; x++) {
      let u = x / 63,
        w = 1 - Math.pow(Math.abs(u - 0.5) * 2, 1.6),
        i = (y * 64 + x) * 4,
        v = edge + (mid - edge) * w;
      d[i] = d[i + 1] = d[i + 2] = v;
      d[i + 3] = alphaRamp ? w * 255 : 255;
    }
  ctx.putImageData(img, 0, 0);
  let t = Eu(c, { srgb: !1 });
  return ((t.wrapS = ClampToEdgeWrapping), t);
}

// Soft blotch alpha texture (dust patches, snow).
function Wf_blotchTex(seed, size = 128) {
  if (!wu) return null;
  let n = Wf_noise(size, seed, 4, 0.5, 3),
    [c, ctx] = Tu(size, size),
    img = ctx.createImageData(size, size),
    d = img.data;
  for (let i = 0; i < n.length; i++) {
    let a = mf((n[i] - 0.48) * 4, 0, 1);
    (d[i * 4] = d[i * 4 + 1] = d[i * 4 + 2] = 255), (d[i * 4 + 3] = a * 255);
  }
  ctx.putImageData(img, 0, 0);
  return Eu(c);
}

// Text on a transparent background (road decals, flags).
function Wf_logoTex(text, fg, w = 512, h = 128, opts = {}) {
  if (!wu) return null;
  let [c, ctx] = Tu(w, h);
  ctx.clearRect(0, 0, w, h);
  if (opts.bg) ((ctx.fillStyle = opts.bg), ctx.fillRect(0, 0, w, h));
  if (opts.stripe) {
    ctx.fillStyle = opts.stripe;
    ctx.fillRect(0, 0, w, h * 0.12);
    ctx.fillRect(0, h * 0.88, w, h * 0.12);
  }
  ((ctx.fillStyle = fg),
    (ctx.textAlign = "center"),
    (ctx.textBaseline = "middle"),
    (ctx.font = opts.font || "900 " + Math.floor(h * (opts.size || 0.6)) + "px Arial, sans-serif"),
    ctx.fillText(text, w / 2, h * 0.53, w * 0.9));
  if (opts.sub) {
    ctx.font = "700 " + Math.floor(h * 0.18) + "px Arial, sans-serif";
    ctx.fillText(opts.sub, w / 2, h * 0.86, w * 0.9);
  }
  let t = new CanvasTexture(c);
  return ((t.colorSpace = Ft), (t.anisotropy = 4), t);
}

// Fence / mesh grid texture with alpha.
function Wf_gridTex(color = "rgba(200,220,240,0.9)", step = 8) {
  if (!wu) return null;
  let [c, ctx] = Tu(64, 64);
  ctx.clearRect(0, 0, 64, 64);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.2;
  for (let i = 0; i <= 64; i += step) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 64);
    ctx.moveTo(0, i);
    ctx.lineTo(64, i);
    ctx.stroke();
  }
  return Eu(c);
}

// Big-screen content (gantry / megastore hanging screens).
function Wf_screenTex(line1, line2, hue = "#5df0ff", bg = "#0a1030") {
  if (!wu) return null;
  let w = 512,
    h = 256,
    [c, ctx] = Tu(w, h),
    g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, "#1a0f4a");
  g.addColorStop(0.5, bg);
  g.addColorStop(1, "#3a1660");
  ((ctx.fillStyle = g), ctx.fillRect(0, 0, w, h));
  for (let i = 0; i < 9; i++) {
    ctx.strokeStyle = i % 2 ? "rgba(93,240,255,0.25)" : "rgba(217,107,255,0.25)";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-40, 40 + i * 26);
    ctx.bezierCurveTo(w * 0.3, i * 30 - 40, w * 0.6, 200 - i * 20, w + 40, 60 + i * 18);
    ctx.stroke();
  }
  ((ctx.fillStyle = hue),
    (ctx.textAlign = "center"),
    (ctx.textBaseline = "middle"),
    (ctx.font = "900 78px Arial, sans-serif"),
    ctx.fillText(line1, w / 2, h * 0.42, w * 0.9),
    (ctx.fillStyle = "#ffffff"),
    (ctx.font = "700 34px Arial, sans-serif"),
    ctx.fillText(line2, w / 2, h * 0.74, w * 0.9));
  for (let y = 0; y < h; y += 4) ((ctx.fillStyle = "rgba(0,0,0,0.18)"), ctx.fillRect(0, y, w, 1));
  let t = new CanvasTexture(c);
  return ((t.colorSpace = Ft), t);
}

// ---- material factories ----------------------------------------------------

function Wf_crowdMaterial() {
  return Wf_anim(
    new MeshStandardMaterial({ vertexColors: !0, metalness: 0.05, roughness: 0.9 }),
    "crowd",
    "float ph = uv.x * 6.28318; float bob = max(0.0, sin(uTime * 4.2 + ph)); transformed.y += bob * 0.22 * uv.y; transformed.x += sin(uTime * 2.1 + ph) * 0.03;",
  );
}

function Wf_flagMaterial(tex) {
  let m = new MeshStandardMaterial({
    map: tex,
    side: ii,
    metalness: 0,
    roughness: 0.8,
    transparent: !0,
    alphaTest: 0.3,
  });
  return Wf_anim(
    m,
    "flag",
    "float fw = uv.x; float wv = sin(uTime * 5.0 + position.x * 0.9 + position.z * 0.7 + fw * 7.0) * 0.18 * fw + sin(uTime * 2.3 + fw * 3.0 + position.y) * 0.08 * fw; transformed += objectNormal * wv;",
  );
}

function Wf_waterMaterial(color, opts = {}) {
  let nm = Wf_waterNormal(),
    m = new MeshStandardMaterial({
      color: color,
      metalness: 0.75,
      roughness: 0.14,
      normalMap: nm,
      normalScale: new Vector2(0.45, 0.45),
      envMapIntensity: 1.4,
    });
  nm && nm.repeat.set(opts.repeat || 90, opts.repeat || 90);
  Wf_anim(
    m,
    "water",
    "transformed.y += sin(position.x * 0.045 + uTime * 1.1) * 0.35 + sin(position.z * 0.06 - uTime * 0.8 + position.x * 0.02) * 0.28;",
  );
  return { mat: m, normal: nm };
}

// Vertical-scrolling emissive ribbon (data streams, holo gates).
function Wf_ribbonMaterial(color, tex) {
  return new MeshBasicMaterial({
    color: color,
    map: tex,
    transparent: !0,
    opacity: 0.85,
    blending: nn,
    depthWrite: !1,
    side: ii,
  });
}

function Wf_dashTex(fg = "rgba(255,255,255,1)") {
  if (!wu) return null;
  let [c, ctx] = Tu(16, 64);
  ctx.clearRect(0, 0, 16, 64);
  ctx.fillStyle = fg;
  ctx.fillRect(0, 0, 16, 22);
  ctx.fillRect(0, 34, 16, 8);
  return Eu(c);
}

// ---- generic prop builders --------------------------------------------------
// All take the dresser context `n` ({shop, sample, rand, ...}) from buildScenery.

var Wf_yaw = (s) => Math.atan2(s.dir.x, s.dir.z);


// Pine tree (trunk + tiered cones).  `snow` adds a white cap on each tier.
function Wf_pine(n, x, y, z, s = 1, snow = !1, rot = 0) {
  let e = n.shop,
    h = 7 * s;
  e.put("cyl6", "matte", x, y + h * 0.16, z, 0.36 * s, h * 0.34, 0.36 * s, 4864560, 0, rot, 0);
  for (let w = 0; w < 3; w++) {
    let yy = y + h * (0.28 + w * 0.22),
      r = (2.6 - w * 0.6) * s;
    e.put("cone6", "matte", x, yy, z, r, h * 0.36, r, [2050620, 2381119, 1786677][w], 0, rot + w * 0.4, 0);
    snow && w < 2 && e.put("cone6", "matte", x, yy + h * 0.06, z, r * 0.86, h * 0.26, r * 0.86, 15792895, 0, rot + w * 0.4, 0);
  }
}

// Deciduous tree: trunk + a cluster of leaf blobs.
function Wf_tree(n, x, y, z, s = 1, cols = [3119708, 3977834, 5344570], rot = 0) {
  let e = n.shop,
    h = 6 * s;
  e.put("cyl6", "matte", x, y + h * 0.3, z, 0.42 * s, h * 0.6, 0.42 * s, 6045235, 0, rot, 0);
  e.put("ballLow", "matte", x, y + h * 0.78, z, 4.2 * s, 3.4 * s, 4.2 * s, cols[0], 0, rot, 0);
  e.put("ballTiny", "matte", x + 1.4 * s, y + h * 0.62, z - 0.6 * s, 3 * s, 2.6 * s, 3 * s, cols[1], 0, rot, 0);
  e.put("ballTiny", "matte", x - 1.3 * s, y + h * 0.68, z + 0.9 * s, 2.8 * s, 2.4 * s, 2.8 * s, cols[2], 0, rot, 0);
  e.put("ballTiny", "matte", x, y + h * 0.98, z, 2.4 * s, 2 * s, 2.4 * s, cols[1], 0, rot, 0);
}

// Palm-free "beach" tree: umbrella-shaped canopy.
function Wf_beachTree(n, x, y, z, s = 1) {
  let e = n.shop,
    h = 6.5 * s;
  e.put("cyl6", "matte", x, y + h * 0.4, z, 0.32 * s, h * 0.8, 0.32 * s, 8018748, 0.08, 0, 0.06);
  e.put("ballLow", "matte", x, y + h * 0.86, z, 5.2 * s, 2.2 * s, 5.2 * s, 3119708, 0, 0, 0);
  e.put("ballLow", "matte", x, y + h * 0.98, z, 3.4 * s, 1.6 * s, 3.4 * s, 5344570, 0, 0, 0);
}

// Street lamp + light pool (uses the "pool" material if registered).
function Wf_lamp(n, t, side, color, height = 7.4, arm = 2.9, pole = 2766162) {
  let a = n.barrierFaceAt(t, side),
    o = n.sample(t, side * (a + 1.35), 0),
    c = Wf_yaw(o),
    e = n.shop;
  e.put("box", "gloss", o.p.x, o.p.y + height / 2, o.p.z, 0.26, height, 0.26, pole, 0, c, 0);
  let l = n.sample(t, side * (a + 1.35 - arm / 2), height);
  e.put("box", "gloss", l.p.x, l.p.y, l.p.z, arm, 0.18, 0.22, pole, 0, c, 0);
  let h = n.sample(t, side * (a + 1.35 - arm), height - 0.12);
  e.put("box", "glow", h.p.x, h.p.y, h.p.z, 1.15, 0.16, 0.5, color, 0, c, 0);
  if (n.shop.mats.pool) {
    let p = n.sample(t, side * (a - arm), 0.055);
    xf(n, p.p.x, p.p.y, p.p.z, 7.5, 9, color, c);
  }
}

// Crowd figure into the "crowd" batch.  Phase is stored in uv.x, bob weight in uv.y.
function Wf_person(n, x, y, z, rot, col, phase, s = 1) {
  let b = n.shop.batch("crowd"),
    yaw = rot;
  (pr.set(0, yaw, 0), dr.setFromEuler(pr));
  ur.compose(pi.set(x, y + 0.75 * s, z), dr, new Vector3(0.62 * s, 1.5 * s, 0.42 * s));
  b.add(wl("cyl6"), ur, col, void 0, [phase, 1]);
  ur.compose(pi.set(x, y + 1.72 * s, z), dr, new Vector3(0.46 * s, 0.46 * s, 0.46 * s));
  b.add(wl("ballTiny"), ur, [16243350, 14195572, 9333311, 6636326, 12876882][(phase * 5) | 0] || 14195572, void 0, [
    phase,
    1,
  ]);
}

var Wf_crowdCols = [16729156, 5635925, 16776960, 3661780, 16752762, 15132390, 8523007, 16741120, 1489109, 15921906];

// Rows of spectators along a lateral band between two track params.
function Wf_crowdRows(n, t0, t1, side, latFn, yFn, rows, spacingM = 1.1, density = 1) {
  let r = n.rand,
    span = Ut(t1 - t0, 1),
    count = Math.max(2, Math.round(((span * n.length) / spacingM) * density));
  for (let i = 0; i < count; i++) {
    let t = Ut(t0 + (span * (i + 0.5)) / count, 1);
    for (let row = 0; row < rows; row++) {
      if (r() < 0.12) continue;
      let lat = latFn(row) + (r() - 0.5) * 0.4,
        s = n.sample(t, side * lat, 0),
        yaw = Wf_yaw(s) + (side > 0 ? Math.PI / 2 : -Math.PI / 2) + (r() - 0.5) * 0.6,
        y = yFn(row, s);
      Wf_person(n, s.p.x, y, s.p.z, yaw, Wf_crowdCols[(r() * Wf_crowdCols.length) | 0], r(), 0.9 + r() * 0.2);
    }
  }
}

// Grandstand: stepped tiers, rails, roof, a banner and a bobbing crowd.
function Wf_grandstand(n, t, side, len = 34, rows = 6, col = 2175053, opts = {}) {
  let e = n.shop,
    a = n.sample(t, 0, 0),
    yaw = Wf_yaw(a),
    face = n.barrierFaceAt(t, side),
    base = face + (opts.gap || 3.2),
    step = 1.55,
    rise = 1.05,
    t0 = t - (len * 0.5) / n.length,
    t1 = t + (len * 0.5) / n.length,
    roofCol = opts.roof || 1581884,
    seatA = col,
    seatB = opts.alt || col + 659224,
    ground = a.p.y;
  // tiers
  for (let h = 0; h < rows; h++) {
    let lat = side * (base + h * step + step * 0.5),
      u = n.sample(t, lat, 0);
    e.put("box", "matte", u.p.x, ground + 0.5 + h * rise, u.p.z, step, rise + 0.02, len, h % 2 ? seatA : seatB, 0, yaw, 0);
    // seat back stripe
    e.put(
      "box",
      "matte",
      u.p.x,
      ground + 0.5 + h * rise + rise * 0.5 + 0.12,
      u.p.z,
      0.16,
      0.36,
      len * 0.98,
      opts.stripe || 3752540,
      0,
      yaw,
      0,
    );
  }
  // front rail + back wall + roof columns
  {
    let f = n.sample(t, side * base, 0);
    e.put("box", "gloss", f.p.x, ground + 0.9, f.p.z, 0.12, 1.1, len, 12632256, 0, yaw, 0);
    e.put("box", "gloss", f.p.x, ground + 1.5, f.p.z, 0.08, 0.08, len, 15658734, 0, yaw, 0);
    let bk = n.sample(t, side * (base + rows * step), 0),
      wallH = rows * rise + 1.6;
    e.put("box", "matte", bk.p.x, ground + wallH / 2, bk.p.z, 0.7, wallH, len, 1581884, 0, yaw, 0);
    let roofY = ground + rows * rise + 5.2,
      rf = n.sample(t, side * (base + rows * step * 0.55), 0);
    e.put("box", "gloss", rf.p.x, roofY, rf.p.z, rows * step + 2, 0.32, len + 1.2, roofCol, 0, yaw, side * 0.12);
    e.put("box", "glow", rf.p.x, roofY - 0.22, rf.p.z, rows * step + 1.6, 0.06, len, opts.glow || 14214399, 0, yaw, side * 0.12);
    for (let k = -1; k <= 1; k++) {
      let c = n.sample(t + (k * len * 0.46) / n.length, side * (base + rows * step + 0.2), 0);
      e.put("box", "gloss", c.p.x, ground + (roofY - ground) / 2, c.p.z, 0.4, roofY - ground, 0.4, 12632256, 0, yaw, 0);
      let c2 = n.sample(t + (k * len * 0.46) / n.length, side * (base + 0.3), 0);
      e.put("box", "gloss", c2.p.x, ground + (roofY - ground) / 2, c2.p.z, 0.3, roofY - ground, 0.3, 12632256, 0, yaw, 0);
    }
    // banner on the roof edge (spec returned so the caller can batch them)
    {
      let b = n.sample(t, side * (base + 0.3), 0);
      var bannerSpec = { x: b.p.x, y: roofY + 1.1, z: b.p.z, w: len * 0.8, h: 1.9, ry: Us(yaw, side) };
    }
  }
  // spectators
  if (n.quality !== "low" || opts.forceCrowd)
    Wf_crowdRows(
      n,
      t0,
      t1,
      side,
      (row) => base + row * step + step * 0.5,
      (row) => ground + 0.5 + row * rise + rise * 0.5,
      rows,
      1.25,
      n.quality === "low" ? 0.5 : 0.8,
    );
  return bannerSpec;
}

// Waving flags on poles: list of {t, lat, h} (lat signed).
function Wf_flags(n, tex, list, size = 2.2) {
  if (!tex) return;
  let mat = Wf_flagMaterial(tex),
    b = new kr(mat),
    e = n.shop,
    geo = Cu.flag || (Cu.flag = new PlaneGeometry(1, 1, 8, 3).translate(0.5, 0, 0));
  for (let f of list) {
    let s = n.sample(f.t, f.lat, 0),
      yaw = Wf_yaw(s),
      poleH = f.h || 7;
    e.put("box", "gloss", s.p.x, s.p.y + poleH / 2, s.p.z, 0.14, poleH, 0.14, 13421772, 0, yaw, 0);
    e.put("ballLow", "glow", s.p.x, s.p.y + poleH + 0.12, s.p.z, 0.3, 0.3, 0.3, 16774096, 0, 0, 0);
    (pr.set(0, yaw + (f.spin || 0) + Math.PI / 2, 0), dr.setFromEuler(pr));
    ur.compose(pi.set(s.p.x, s.p.y + poleH - size * 0.36, s.p.z), dr, new Vector3(size * 1.5, size * 0.9, 1));
    b.add(geo, ur, 16777215);
  }
  let m = b.mesh();
  (m.name = "flags"), e.mesh(m);
  return m;
}

// Tyre wall: stacked tyres behind the barrier face between two track params.
function Wf_tyreWall(n, t0, t1, side, rows = 2, colors = [1710618, 1710618, 14364723, 15921906]) {
  let e = n.shop,
    span = Ut(t1 - t0, 1),
    count = Math.max(2, Math.round((span * n.length) / 1.05));
  for (let i = 0; i < count; i++) {
    let t = Ut(t0 + (span * (i + 0.5)) / count, 1),
      face = n.barrierFaceAt(t, side) + Pa + 0.62,
      s = n.sample(t, side * face, 0);
    for (let r = 0; r < rows; r++)
      e.put(
        "tube6",
        "matte",
        s.p.x,
        s.p.y + 0.27 + r * 0.5 + (r % 2) * 0.02,
        s.p.z,
        1.02,
        0.48,
        1.02,
        colors[(i + r * 2) % colors.length],
        0,
        0,
        0,
      );
  }
}

// Armco (W-beam) rail behind the barrier face.
function Wf_armco(n, t0, t1, side, col = 12632256, postCol = 5263440) {
  let e = n.shop,
    frames = n.frames,
    b = e.batch("gloss"),
    span = Ut(t1 - t0, 1),
    seg = Math.max(2, Math.round(span * Xt)),
    i0 = Math.round(Ut(t0, 1) * Xt),
    list = [];
  for (let i = 0; i <= seg; i++) list.push(frames[(i0 + i) % (Xt + 1)]);
  let latFn = (i) => side * (n.barrierFaceAt(((i0 + i) % Xt) / Xt, side) + Pa + 0.36);
  for (let h of [0.45, 0.85])
    b.strip(
      list,
      (i) => ({ lat: latFn(i), h: h }),
      (i) => ({ lat: latFn(i) + side * 0.06, h: h + 0.28 }),
      () => col,
    );
  let posts = Math.max(1, Math.round((span * n.length) / 4));
  for (let i = 0; i <= posts; i++) {
    let t = Ut(t0 + (span * i) / posts, 1),
      s = n.sample(t, side * (n.barrierFaceAt(t, side) + Pa + 0.5), 0);
    e.put("box", "gloss", s.p.x, s.p.y + 0.6, s.p.z, 0.16, 1.2, 0.2, postCol, 0, Wf_yaw(s), 0);
  }
}

// Catch fence: posts + a translucent mesh panel above the barrier.
function Wf_fence(n, t0, t1, side, height = 3.6, col = 11184810) {
  let e = n.shop,
    tex = n._fenceTex || (n._fenceTex = Wf_gridTex("rgba(190,205,225,0.85)", 8));
  if (!e.mats.fence)
    e.register(
      "fence",
      new MeshBasicMaterial({ map: tex, transparent: !0, alphaTest: 0.35, side: ii, vertexColors: !0, depthWrite: !1 }),
    );
  let b = e.batch("fence"),
    span = Ut(t1 - t0, 1),
    seg = Math.max(2, Math.round(span * Xt)),
    i0 = Math.round(Ut(t0, 1) * Xt),
    list = [],
    frames = n.frames;
  for (let i = 0; i <= seg; i++) list.push(frames[(i0 + i) % (Xt + 1)]);
  let latFn = (i) => side * (n.barrierFaceAt(((i0 + i) % Xt) / Xt, side) + Pa - 0.05);
  b.strip(
    list,
    (i) => ({ lat: latFn(i), h: hr }),
    (i) => ({ lat: latFn(i), h: hr + height }),
    () => 16777215,
    (i) => (i * n.length) / Xt / 1.2,
  );
  let posts = Math.max(1, Math.round((span * n.length) / 5));
  for (let i = 0; i <= posts; i++) {
    let t = Ut(t0 + (span * i) / posts, 1),
      s = n.sample(t, side * (n.barrierFaceAt(t, side) + Pa - 0.02), 0);
    e.put("box", "gloss", s.p.x, s.p.y + hr + height / 2, s.p.z, 0.12, height, 0.12, col, 0, Wf_yaw(s), 0);
  }
}

// Glass barrier panels above the wall (megastore / galaxy).
function Wf_glassWall(n, t0, t1, side, height = 1.4, col = 12442111) {
  let e = n.shop,
    b = e.batch("glass"),
    span = Ut(t1 - t0, 1),
    seg = Math.max(2, Math.round(span * Xt)),
    i0 = Math.round(Ut(t0, 1) * Xt),
    list = [],
    frames = n.frames;
  for (let i = 0; i <= seg; i++) list.push(frames[(i0 + i) % (Xt + 1)]);
  let latFn = (i) => side * (n.barrierFaceAt(((i0 + i) % Xt) / Xt, side) + Pa * 0.5);
  b.strip(
    list,
    (i) => ({ lat: latFn(i), h: hr + 0.02 }),
    (i) => ({ lat: latFn(i), h: hr + height }),
    () => col,
  );
  let posts = Math.max(1, Math.round((span * n.length) / 3));
  for (let i = 0; i <= posts; i++) {
    let t = Ut(t0 + (span * i) / posts, 1),
      s = n.sample(t, side * (n.barrierFaceAt(t, side) + Pa * 0.5), 0);
    e.put("box", "gloss", s.p.x, s.p.y + hr + height / 2, s.p.z, 0.1, height, 0.16, 14540253, 0, Wf_yaw(s), 0);
  }
  let capL = (i) => ({ lat: latFn(i) - side * 0.1, h: hr + height }),
    capR = (i) => ({ lat: latFn(i) + side * 0.1, h: hr + height + 0.06 });
  e.batch("gloss").strip(list, capL, capR, () => 14540253);
}

// Skyscraper with an emissive window grid (Chicago).
function Wf_tower(n, x, y, z, w, h, d, col, rot = 0, opts = {}) {
  let e = n.shop,
    uv = (a, b) => [Math.max(1, Math.round(a / 13.6)), Math.max(2, Math.round(b / 32.4))];
  e.putUV("box", "facade", x, y + h / 2, z, w, h, d, col, rot, uv(w, h));
  // roof slab + crown light
  e.put("box", "gloss", x, y + h + 0.3, z, w * 1.02, 0.6, d * 1.02, 2500134, 0, rot, 0);
  if (opts.crown) {
    e.put("box", "glow", x, y + h + 0.9, z, w * 0.9, 0.5, d * 0.9, opts.crown, 0, rot, 0);
  }
  if (opts.tier) {
    let th = opts.tier;
    e.putUV("box", "facade", x, y + h + th / 2, z, w * 0.6, th, d * 0.6, col, rot, uv(w * 0.6, th));
    e.put("box", "glow", x, y + h + th + 0.4, z, w * 0.4, 0.5, d * 0.4, opts.crown || 16777215, 0, rot, 0);
  }
  if (opts.spire) {
    e.put("box", "gloss", x, y + h + (opts.tier || 0) + opts.spire / 2, z, 0.6, opts.spire, 0.6, 3552822, 0, 0, 0);
    e.put("ballLow", "glow", x, y + h + (opts.tier || 0) + opts.spire, z, 0.9, 0.9, 0.9, 16729156, 0, 0, 0);
  }
  if (opts.neonEdge)
    for (let k of [-1, 1]) e.put("box", "glow", x + (k * w) / 2, y + h * 0.5, z, 0.18, h * 0.96, 0.18, opts.neonEdge, 0, rot, 0);
}

// Simple gondola / cabin used by the ski lift and the ferris wheel.
function Wf_cabin(b, x, y, z, col, s = 1) {
  ur.compose(pi.set(x, y, z), dr.set(0, 0, 0, 1), new Vector3(1.4 * s, 1.5 * s, 1.4 * s));
  b.add(wl("box"), ur, col);
  ur.compose(pi.set(x, y + 0.55 * s, z), dr, new Vector3(1.2 * s, 0.5 * s, 1.2 * s));
  b.add(wl("box"), ur, 3355443);
  ur.compose(pi.set(x, y + 0.95 * s, z), dr, new Vector3(0.12 * s, 0.9 * s, 0.12 * s));
  b.add(wl("box"), ur, 8421504);
}


// Sign boards grouped by texture so each texture costs one draw call.
// list: [{tex, t, side, lat, h, w, hh, pole, poleCol}]
function Wf_signs(n, list) {
  let e = n.shop,
    groups = new Map();
  for (let sg of list) {
    if (!sg.tex) continue;
    let side = sg.side === void 0 ? 1 : sg.side,
      lat = sg.lat === void 0 ? 22 : sg.lat,
      q = n.sample(sg.t, side * lat, sg.h === void 0 ? 6.4 : sg.h),
      yaw = Wf_yaw(q),
      arr = groups.get(sg.tex) || [];
    arr.push({ x: q.p.x, y: q.p.y, z: q.p.z, w: sg.w || 14, h: sg.hh || (sg.w || 14) * 0.21, ry: sg.ry !== void 0 ? sg.ry : Us(yaw, side) });
    groups.set(sg.tex, arr);
    if (sg.pole !== !1) {
      let g = n.sample(sg.t, side * lat, 0);
      e.put("box", "gloss", g.p.x, g.p.y + (sg.h === void 0 ? 6.4 : sg.h) / 2 - 0.6, g.p.z, 0.36, (sg.h === void 0 ? 6.4 : sg.h) - 1.2, 0.36, sg.poleCol || 6968132, 0, yaw, 0);
    }
  }
  for (let [tex, arr] of groups) Br(n, tex, arr);
}

// Gable roof: a 3-sided prism lying along the track direction.
// (x,y,z) is the centre of the roof's base line; width is lateral.
function Wf_gable(n, mat, x, y, z, width, len, height, col, yaw) {
  let h = height / 1.5;
  n.shop.put("wedge", mat, x, y + h * 0.5, z, width / 1.73, len, h, col, -Math.PI / 2, yaw, 0);
}
