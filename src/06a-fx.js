// ---------------------------------------------------------------------------
// 06a-fx.js — BLUFOX OVERDRIVE particle & spectacle layer.
// Plugs in ONLY through BFX_HOOKS. Two pooled quad systems (alpha-blended and
// additive), two ribbon pools (skid marks, boost trails), a camera-locked glitch
// flash, per-circuit ambient weather and generic hazard drawing. Everything is
// preallocated at trackLoaded, updated allocation-free every frame and disposed
// on trackDispose. Every particle has a finite life: nothing accumulates.
// ---------------------------------------------------------------------------
var BFX_FX = (function () {
  var ADD = 2, NORMAL = 1, DOUBLE = 2;       // three.js blending / side constants (mangled in 01-three)
  var TIERS = {
    ultra:  { alpha: 1600, add: 1200, skid: 900, trail: 480, rate: 1,    weather: 1 },
    high:   { alpha: 1100, add: 800,  skid: 700, trail: 360, rate: 0.85, weather: 0.85 },
    medium: { alpha: 650,  add: 450,  skid: 450, trail: 240, rate: 0.6,  weather: 0.55 },
    low:    { alpha: 320,  add: 220,  skid: 220, trail: 120, rate: 0.35, weather: 0.3 },
  };
  var MAX_DT = 0.05;

  // ---- shared scratch (never allocated per frame) --------------------------
  var V0 = new Vector3(), V1 = new Vector3(), V2 = new Vector3(), V3 = new Vector3(), V4 = new Vector3(),
      CAMF = new Vector3(), CAMR = new Vector3(), CAMU = new Vector3(), TMPC = new Color();
  var driverColor = [], driverAccent = [];
  for (var di = 0; di < 8; di++) {
    var dd = typeof ki !== "undefined" && ki[di] ? ki[di] : { color: 0x5df0ff, accent: 0xd96bff };
    driverColor.push(new Color(dd.color)); driverAccent.push(new Color(dd.accent));
  }
  var TRAPC = new Color(0xff5a2a);
  var PAL = [new Color(0x5df0ff), new Color(0x8b5bff), new Color(0xd96bff), new Color(0xfff3a0), new Color(0xff7ad9), new Color(0xffffff)];
  function rnd() { return Math.random(); }
  function rr(a, b) { return a + Math.random() * (b - a); }
  function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }

  // ---- allocation-free track sampler ---------------------------------------
  function sampleInto(tw, t, lat, h, outP, outDir, outRight) {
    var fr = tw.frames, n = fr.length - 1;
    var r = ((t % 1) + 1) % 1 * n, s = Math.floor(r); if (s >= n) s = n - 1;
    var a = r - s, o = fr[s], c = fr[s + 1];
    outP.copy(o.p).lerp(c.p, a);
    outDir.copy(o.v).lerp(c.v, a).normalize();
    if (outRight) { outRight.copy(o.right).lerp(c.right, a).normalize(); outP.addScaledVector(outRight, lat); }
    outP.y += h;
  }

  // ---- generic quad particle pool -------------------------------------------
  var VS = [
    "attribute vec2 corner;attribute vec4 pdata;attribute vec4 pcolor;attribute vec3 axis;attribute float shape;",
    "varying vec4 vColor;varying vec2 vUv;varying float vShape;",
    "uniform float fogDensity;uniform vec3 fogColor;uniform float fogMode,glow;",
    "void main(){float size=pdata.x,len=pdata.y,rot=pdata.z,mode=pdata.w;vec2 c=corner;",
    " vec4 mv=modelViewMatrix*vec4(position,1.);",
    " if(mode<0.5){float s=sin(rot),co=cos(rot);vec2 r=vec2(c.x*co-c.y*s,c.x*s+c.y*co);mv.xy+=r*size;}",
    " else if(mode<1.5){vec3 av=normalize(mat3(modelViewMatrix)*axis)*len*.5;vec4 ca=projectionMatrix*(mv+vec4(av,0.)),cb=projectionMatrix*(mv-vec4(av,0.));",
    "  float asp=projectionMatrix[1][1]/projectionMatrix[0][0];vec2 sa=ca.xy/max(ca.w,1e-3),sb=cb.xy/max(cb.w,1e-3);vec2 dd=sa-sb;dd.x*=asp;float dl=length(dd);dd=dl>1e-5?dd/dl:vec2(0.,1.);",
    "  vec2 pp=vec2(-dd.y,dd.x);pp.x/=asp;vec4 cp=mix(cb,ca,c.y+.5);cp.xy+=pp*c.x*size*projectionMatrix[1][1];gl_Position=cp;",
    "  float d=length(mv.xyz);float f=exp(-d*d*fogDensity*fogDensity);vColor=pcolor;if(fogMode>0.5){vColor.rgb=mix(fogColor,pcolor.rgb,f);vColor.a*=mix(0.35,1.,f);}else{vColor.rgb*=glow;vColor.a*=f;}vUv=c;vShape=shape;return;}",
    " else{vec3 an=normalize(axis);vec3 side=normalize(cross(vec3(0.,1.,0.),an));vec3 wp=position+an*c.y*len+side*c.x*size;mv=modelViewMatrix*vec4(wp,1.);}",
    " gl_Position=projectionMatrix*mv;",
    " float d=length(mv.xyz);float f=exp(-d*d*fogDensity*fogDensity);",
    " vColor=pcolor;if(fogMode>0.5){vColor.rgb=mix(fogColor,pcolor.rgb,f);vColor.a*=mix(0.35,1.,f);}else{vColor.rgb*=glow;vColor.a*=f;}",
    " vUv=c;vShape=shape;}",
  ].join("\n");
  var FS = [
    "varying vec4 vColor;varying vec2 vUv;varying float vShape;",
    "void main(){vec2 u=vUv*2.;float r=length(u);float a;",
    " if(vShape<0.5){a=smoothstep(1.,0.1,r);a*=a;}",                                   // 0 soft puff
    " else if(vShape<1.5){a=(1.-smoothstep(.35,1.,abs(u.x)))*(1.-smoothstep(.25,1.,abs(u.y)));}", // 1 streak
    " else if(vShape<2.5){a=step(abs(u.x),1.)*step(abs(u.y),1.);}",                   // 2 square (confetti/static)
    " else if(vShape<3.5){a=smoothstep(.34,.0,abs(r-.78))*step(r,1.);}",              // 3 ring
    " else if(vShape<4.5){a=smoothstep(1.,.78,r);}",                                   // 4 hard disc
    " else if(vShape<5.5){vec2 q=abs(u);float h=max(q.x*.866+q.y*.5,q.y);a=smoothstep(.18,.05,abs(h-.82))*step(h,1.);}", // 5 hex outline
    " else if(vShape<6.5){float w=abs(u.y-(.42-.55*abs(u.x)));a=smoothstep(.22,.06,w)*step(abs(u.x),1.);}",           // 6 gull chevron
    " else if(vShape<7.5){a=smoothstep(1.,.55,r)*(.55+.45*step(fract((u.x+u.y)*3.),.5));}", // 7 tumbleweed scribble
    " else{vec2 b=vec2(u.x,(u.y-.4)*.92);float rb=length(b);a=smoothstep(.62,.54,rb);float st=step(abs(u.x),.03)*step(u.y,-.15)*step(-1.,u.y);a=max(a,st*.8);", // 8 balloon + string
    "  float hl=smoothstep(.45,.0,length(b-vec2(-.22,.22)));gl_FragColor=vec4(vColor.rgb*(0.75+0.7*hl)*(1.-.35*smoothstep(.35,.62,rb)),vColor.a*a);return;}",
    " if(a<=0.002)discard;gl_FragColor=vec4(vColor.rgb,vColor.a*a);}",
  ].join("\n");

  function Pool(n, additive) {
    this.n = n; this.additive = additive;
    this.pos = new Float32Array(n * 12); this.corner = new Float32Array(n * 8);
    this.pdata = new Float32Array(n * 16); this.pcolor = new Float32Array(n * 16);
    this.axis = new Float32Array(n * 12); this.shape = new Float32Array(n * 4);
    // SoA particle state
    this.x = new Float32Array(n); this.y = new Float32Array(n); this.z = new Float32Array(n);
    this.vx = new Float32Array(n); this.vy = new Float32Array(n); this.vz = new Float32Array(n);
    this.life = new Float32Array(n); this.age = new Float32Array(n);
    this.s0 = new Float32Array(n); this.s1 = new Float32Array(n); this.len = new Float32Array(n);
    this.r = new Float32Array(n); this.g = new Float32Array(n); this.b = new Float32Array(n);
    this.a0 = new Float32Array(n); this.fadeIn = new Float32Array(n);
    this.rot = new Float32Array(n); this.rotV = new Float32Array(n);
    this.drag = new Float32Array(n); this.grav = new Float32Array(n);
    this.wob = new Float32Array(n); this.ph = new Float32Array(n);
    this.mode = new Uint8Array(n); this.shp = new Uint8Array(n); this.stretchV = new Uint8Array(n);
    this.alive = 0; this.cursor = 0; this.res = 0;
    var idx = new Uint32Array(n * 6);
    for (var i = 0; i < n; i++) {
      var v = i * 4, k = i * 6;
      idx[k] = v; idx[k + 1] = v + 1; idx[k + 2] = v + 2; idx[k + 3] = v; idx[k + 4] = v + 2; idx[k + 5] = v + 3;
      this.corner.set([-0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5], i * 8);
    }
    var g = new BufferGeometry();
    g.setIndex(new BufferAttribute(idx, 1));
    this.aPos = new BufferAttribute(this.pos, 3); this.aPd = new BufferAttribute(this.pdata, 4);
    this.aCol = new BufferAttribute(this.pcolor, 4); this.aAx = new BufferAttribute(this.axis, 3);
    this.aSh = new BufferAttribute(this.shape, 1);
    this.aPos.setUsage(35048); this.aPd.setUsage(35048); this.aCol.setUsage(35048); this.aAx.setUsage(35048); this.aSh.setUsage(35048);
    g.setAttribute("position", this.aPos); g.setAttribute("corner", new BufferAttribute(this.corner, 2));
    g.setAttribute("pdata", this.aPd); g.setAttribute("pcolor", this.aCol); g.setAttribute("axis", this.aAx); g.setAttribute("shape", this.aSh);
    g.boundingSphere = { center: new Vector3(), radius: 1e6 };
    this.mat = new ShaderMaterial({
      vertexShader: VS, fragmentShader: FS, transparent: !0, depthWrite: !1, depthTest: !0,
      blending: additive ? ADD : NORMAL, side: DOUBLE, fog: !1, toneMapped: !1,
      uniforms: { fogDensity: { value: 0 }, fogColor: { value: new Color(0) }, fogMode: { value: additive ? 0 : 1 }, glow: { value: 1 } },
    });
    this.mesh = new Mesh(g, this.mat); this.mesh.frustumCulled = !1; this.mesh.renderOrder = additive ? 11 : 10;
    this.mesh.matrixAutoUpdate = !1;
    this.geo = g;
    this._dirty = !0;
  }
  // emit spec (module-wide, mutated then consumed)
  var E = {
    x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, life: 1, s0: 0.3, s1: 0.3, len: 0, r: 1, g: 1, b: 1, a: 1, fadeIn: 0,
    rot: 0, rotV: 0, drag: 0, grav: 0, wob: 0, mode: 0, shape: 0, stretchV: 0,
    reset: function () { this.x = this.y = this.z = this.vx = this.vy = this.vz = 0; this.life = 1; this.s0 = this.s1 = 0.3; this.len = 0; this.r = this.g = this.b = 1; this.a = 1; this.fadeIn = 0; this.rot = 0; this.rotV = 0; this.drag = 0; this.grav = 0; this.wob = 0; this.mode = 0; this.shape = 0; this.stretchV = 0; return this; },
    col: function (c, m) { m = m === void 0 ? 1 : m; this.r = c.r * m; this.g = c.g * m; this.b = c.b * m; return this; },
  };
  Pool.prototype.emit = function () {
    var i = this.cursor; this.cursor = i + 1 >= this.n ? this.res : i + 1;
    if (this.life[i] <= 0) this.alive++;
    this.x[i] = E.x; this.y[i] = E.y; this.z[i] = E.z; this.vx[i] = E.vx; this.vy[i] = E.vy; this.vz[i] = E.vz;
    this.life[i] = E.life; this.age[i] = 0; this.s0[i] = E.s0; this.s1[i] = E.s1; this.len[i] = E.len;
    this.r[i] = E.r; this.g[i] = E.g; this.b[i] = E.b; this.a0[i] = E.a; this.fadeIn[i] = E.fadeIn;
    this.rot[i] = E.rot; this.rotV[i] = E.rotV; this.drag[i] = E.drag; this.grav[i] = E.grav; this.wob[i] = E.wob;
    this.ph[i] = Math.random() * 6.283; this.mode[i] = E.mode; this.shp[i] = E.shape; this.stretchV[i] = E.stretchV;
    return i;
  };
  Pool.prototype.update = function (dt) {
    var n = this.n, pos = this.pos, pd = this.pdata, pc = this.pcolor, ax = this.axis, sh = this.shape;
    var any = !1;
    for (var i = 0; i < n; i++) {
      var L = this.life[i];
      if (L <= 0) continue;
      any = !0;
      var age = this.age[i] + dt; this.age[i] = age;
      var p12 = i * 12, p16 = i * 16;
      if (age >= L) {
        this.life[i] = 0; this.alive--;
        for (var k = 0; k < 4; k++) pc[p16 + k * 4 + 3] = 0;
        for (k = 0; k < 4; k++) pd[p16 + k * 4] = 0;
        continue;
      }
      var vx = this.vx[i], vy = this.vy[i], vz = this.vz[i];
      var dr = this.drag[i]; if (dr > 0) { var f = 1 / (1 + dr * dt); vx *= f; vy *= f; vz *= f; }
      vy -= this.grav[i] * dt;
      this.vx[i] = vx; this.vy[i] = vy; this.vz[i] = vz;
      var w = this.wob[i], t = age / L, x = this.x[i] + vx * dt, y = this.y[i] + vy * dt, z = this.z[i] + vz * dt;
      if (w > 0) { var ph = this.ph[i] + age * 5; x += Math.sin(ph) * w * dt; z += Math.cos(ph * 0.8) * w * dt; }
      this.x[i] = x; this.y[i] = y; this.z[i] = z;
      var rot = this.rot[i] + this.rotV[i] * dt; this.rot[i] = rot;
      var size = this.s0[i] + (this.s1[i] - this.s0[i]) * t;
      var fi = this.fadeIn[i], fade = t < fi ? t / fi : 1 - (t - fi) / (1 - fi);
      var alpha = this.a0[i] * (fade < 0 ? 0 : fade);
      var mode = this.mode[i], len = this.len[i], shape = this.shp[i];
      if (len < 0) len = size;
      var axx = 0, axy = 1, axz = 0;
      if (mode) {
        if (this.stretchV[i]) { var sp = Math.sqrt(vx * vx + vy * vy + vz * vz) || 1; axx = vx / sp; axy = vy / sp; axz = vz / sp; }
        else { axx = ax[p12]; axy = ax[p12 + 1]; axz = ax[p12 + 2]; }
      }
      for (k = 0; k < 4; k++) {
        var q3 = p12 + k * 3, q4 = p16 + k * 4;
        pos[q3] = x; pos[q3 + 1] = y; pos[q3 + 2] = z;
        pd[q4] = size; pd[q4 + 1] = len; pd[q4 + 2] = rot; pd[q4 + 3] = mode;
        pc[q4] = this.r[i]; pc[q4 + 1] = this.g[i]; pc[q4 + 2] = this.b[i]; pc[q4 + 3] = alpha;
        ax[q3] = axx; ax[q3 + 1] = axy; ax[q3 + 2] = axz;
        sh[i * 4 + k] = shape;
      }
    }
    if (any || this._dirty) {
      this.aPos.needsUpdate = this.aPd.needsUpdate = this.aCol.needsUpdate = this.aAx.needsUpdate = this.aSh.needsUpdate = !0;
      this._dirty = any;
    }
    this.mesh.visible = any && !this._hide;
  };
  // fixed-axis emit helper: sets the axis for mode 1/2 particles that don't stretch along velocity
  Pool.prototype.setAxis = function (i, x, y, z) { var p = i * 12; for (var k = 0; k < 4; k++) { this.axis[p + k * 3] = x; this.axis[p + k * 3 + 1] = y; this.axis[p + k * 3 + 2] = z; } };
  // reserve the first `count` slots as a camera-following volume (weather); returns count actually reserved
  Pool.prototype.reserve = function (count) { count = Math.min(count, this.n >> 1); this.res = count; if (this.cursor < count) this.cursor = count; return count; };
  // wrap volume particles into an axis-aligned box (centre c, half extents h); re-rolls velocity via `stream` (0 none, else speed along -CAMF)
  Pool.prototype.volume = function (cx, cy, cz, hx, hy, hz, stream) {
    for (var i = 0; i < this.res; i++) {
      if (this.life[i] <= 0) continue;
      var w = 0, x = this.x[i] - cx, y = this.y[i] - cy, z = this.z[i] - cz;
      if (x > hx) { x -= 2 * hx; w = 1; } else if (x < -hx) { x += 2 * hx; w = 1; }
      if (y > hy) { y -= 2 * hy; w = 1; } else if (y < -hy) { y += 2 * hy; w = 1; }
      if (z > hz) { z -= 2 * hz; w = 1; } else if (z < -hz) { z += 2 * hz; w = 1; }
      if (w) { this.x[i] = cx + x; this.y[i] = cy + y; this.z[i] = cz + z; if (stream) { var sp = stream * rr(0.5, 1.2); this.vx[i] = -CAMF.x * sp; this.vy[i] = -CAMF.y * sp; this.vz[i] = -CAMF.z * sp; } }
    }
  };
  Pool.prototype.clear = function () { var a = 0; for (var i = 0; i < this.n; i++) { if (i >= this.res) this.life[i] = 0; if (this.life[i] > 0) a++; } this.alive = a; this._dirty = !0; };
  Pool.prototype.dispose = function () { this.geo.dispose(); this.mat.dispose(); if (this.mesh.parent) this.mesh.parent.remove(this.mesh); };

  // ---- ribbon pool (independent quads, ring buffer) --------------------------
  var RVS = [
    "attribute vec4 pcolor;attribute float birth;varying vec4 vColor;varying float vBirth;uniform float now;uniform float fadeT;",
    "void main(){vColor=pcolor;float age=now-birth;vColor.a*=clamp(1.-age/fadeT,0.,1.);",
    " vec4 mv=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mv;}",
  ].join("\n");
  var RFS = "varying vec4 vColor;void main(){if(vColor.a<=0.003)discard;gl_FragColor=vColor;}";
  function Ribbon(n, opts) {
    this.n = n; this.pos = new Float32Array(n * 12); this.col = new Float32Array(n * 16); this.birth = new Float32Array(n * 4);
    this.birth.fill(-1e6);
    var idx = new Uint32Array(n * 6);
    for (var i = 0; i < n; i++) { var v = i * 4, k = i * 6; idx[k] = v; idx[k + 1] = v + 1; idx[k + 2] = v + 2; idx[k + 3] = v; idx[k + 4] = v + 2; idx[k + 5] = v + 3; }
    var g = new BufferGeometry(); g.setIndex(new BufferAttribute(idx, 1));
    this.aPos = new BufferAttribute(this.pos, 3); this.aCol = new BufferAttribute(this.col, 4); this.aB = new BufferAttribute(this.birth, 1);
    this.aPos.setUsage(35048); this.aCol.setUsage(35048); this.aB.setUsage(35048);
    g.setAttribute("position", this.aPos); g.setAttribute("pcolor", this.aCol); g.setAttribute("birth", this.aB);
    g.boundingSphere = { center: new Vector3(), radius: 1e6 };
    this.mat = new ShaderMaterial({
      vertexShader: RVS, fragmentShader: RFS, transparent: !0, depthWrite: !1, side: DOUBLE, fog: !1, toneMapped: !1,
      blending: opts.additive ? ADD : NORMAL, polygonOffset: !0, polygonOffsetFactor: -2, polygonOffsetUnits: -2,
      uniforms: { now: { value: 0 }, fadeT: { value: opts.fade } },
    });
    this.mesh = new Mesh(g, this.mat); this.mesh.frustumCulled = !1; this.mesh.renderOrder = opts.additive ? 9 : 1; this.mesh.matrixAutoUpdate = !1;
    this.geo = g; this.cursor = 0; this.fade = opts.fade; this.lastWrite = -1e6; this.dirty = !1;
    // per-lane previous edge points (up to 8 lanes)
    this.pl = new Float32Array(8 * 3); this.pr = new Float32Array(8 * 3); this.has = new Uint8Array(8);
  }
  // push a segment for lane `lane` with left/right edge points and colour
  Ribbon.prototype.push = function (lane, lx, ly, lz, rx, ry, rz, r, g, b, a, now) {
    var p3 = lane * 3;
    if (this.has[lane]) {
      var i = this.cursor; this.cursor = (i + 1) % this.n;
      var q = i * 12, c = i * 16, o = this.pos, cc = this.col;
      o[q] = this.pl[p3]; o[q + 1] = this.pl[p3 + 1]; o[q + 2] = this.pl[p3 + 2];
      o[q + 3] = this.pr[p3]; o[q + 4] = this.pr[p3 + 1]; o[q + 5] = this.pr[p3 + 2];
      o[q + 6] = rx; o[q + 7] = ry; o[q + 8] = rz; o[q + 9] = lx; o[q + 10] = ly; o[q + 11] = lz;
      for (var k = 0; k < 4; k++) { cc[c + k * 4] = r; cc[c + k * 4 + 1] = g; cc[c + k * 4 + 2] = b; cc[c + k * 4 + 3] = a; this.birth[i * 4 + k] = now; }
      this.dirty = !0; this.lastWrite = now;
    }
    this.pl[p3] = lx; this.pl[p3 + 1] = ly; this.pl[p3 + 2] = lz; this.pr[p3] = rx; this.pr[p3 + 1] = ry; this.pr[p3 + 2] = rz; this.has[lane] = 1;
  };
  Ribbon.prototype.brk = function (lane) { this.has[lane] = 0; };
  Ribbon.prototype.update = function (now) {
    this.mat.uniforms.now.value = now;
    if (this.dirty) { this.aPos.needsUpdate = this.aCol.needsUpdate = this.aB.needsUpdate = !0; this.dirty = !1; }
    this.mesh.visible = now - this.lastWrite < this.fade + 0.5;
  };
  Ribbon.prototype.clear = function () { this.birth.fill(-1e6); this.has.fill(0); this.dirty = !0; this.lastWrite = -1e6; };
  Ribbon.prototype.dispose = function () { this.geo.dispose(); this.mat.dispose(); if (this.mesh.parent) this.mesh.parent.remove(this.mesh); };

  // ---- camera-locked static glitch flash --------------------------------------
  function Glitch() {
    this.mat = new ShaderMaterial({
      transparent: !0, depthTest: !1, depthWrite: !1, blending: NORMAL, fog: !1, toneMapped: !1,
      uniforms: { amt: { value: 0 }, t: { value: 0 } },
      vertexShader: "varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}",
      fragmentShader: [
        "varying vec2 vUv;uniform float amt,t;",
        "float h(vec2 p){vec3 q=fract(vec3(p.xyx)*.1031);q+=dot(q,q.yzx+33.33);return fract((q.x+q.y)*q.z);}",
        "void main(){float row=floor(vUv.y*46.+t*7.);float n=h(vec2(row,floor(t*24.)));",
        " float band=step(.72,n);float sh=(h(vec2(row,3.+floor(t*30.)))-.5)*.08*amt;",
        " float scan=.5+.5*sin(vUv.y*640.+t*60.);",
        " vec3 c=mix(vec3(.05,.55,.62),vec3(.6,.12,.58),h(vec2(row,9.)));",
        " float edge=smoothstep(.25,.75,length(vUv-.5+vec2(sh,0.)));",
        " float a=amt*(band*.55+.12*scan)*(.35+.65*edge);",
        " gl_FragColor=vec4(c*.7,clamp(a,0.,.5));}",
      ].join("\n"),
    });
    this.mesh = new Mesh(new PlaneGeometry(2, 2), this.mat); this.mesh.frustumCulled = !1; this.mesh.renderOrder = 999; this.amt = 0;
  }
  Glitch.prototype.update = function (dt, time) {
    this.amt = Math.max(0, this.amt - dt * 2.6);
    this.mat.uniforms.amt.value = this.amt; this.mat.uniforms.t.value = time; this.mesh.visible = this.amt > 0.01;
  };
  Glitch.prototype.dispose = function () { this.mesh.geometry.dispose(); this.mat.dispose(); if (this.mesh.parent) this.mesh.parent.remove(this.mesh); };

  // ---- hazards (generic drawing of race.hazards) ------------------------------
  function Hazards(stage) {
    this.stage = stage; this.items = []; this.geoDisc = new CircleGeometry(1, 28); this.geoDisc.rotateX(-Math.PI / 2);
    this.geoBox = new BoxGeometry(1.6, 1.2, 1.6); this.geoChev = chevronGeo();
    this.group = new Group(); stage.add(this.group);
  }
  function chevronGeo() {
    var g = new BufferGeometry(), n = 1.1, e = 1.0, t = 0.5;
    var v = new Float32Array([-n, 0, 0, 0, 0, e, 0, 0, e - t, -n, 0, -t, 0, 0, e, n, 0, 0, n, 0, -t, 0, 0, e - t]);
    g.setAttribute("position", new BufferAttribute(v, 3)); g.setIndex([0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7]); return g;
  }
  Hazards.prototype.ensure = function (n) {
    while (this.items.length < n && this.items.length < 32) {
      var it = { kind: "", group: new Group(), disc: null, box: null, chev: [], mats: [] };
      var mDisc = new MeshBasicMaterial({ color: 0x000000, transparent: !0, opacity: 0.6, depthWrite: !1, polygonOffset: !0, polygonOffsetFactor: -1, polygonOffsetUnits: -1 });
      var mRing = new MeshBasicMaterial({ color: 0x5df0ff, transparent: !0, opacity: 0.35, depthWrite: !1, polygonOffset: !0, polygonOffsetFactor: -2, polygonOffsetUnits: -2, side: DOUBLE });
      var mBox = new MeshBasicMaterial({ color: 0xffa040, transparent: !0, opacity: 0.85 });
      var mChev = new MeshBasicMaterial({ color: 0x5df0ff, transparent: !0, opacity: 0.8, depthWrite: !1, polygonOffset: !0, polygonOffsetFactor: -2, polygonOffsetUnits: -2, side: DOUBLE });
      it.disc = new Mesh(this.geoDisc, mDisc); it.disc.position.y = 0.04; it.disc.renderOrder = 2; it.group.add(it.disc);
      it.ring = new Mesh(this.geoDisc, mRing); it.ring.position.y = 0.06; it.ring.renderOrder = 3; it.group.add(it.ring);
      it.box = new Mesh(this.geoBox, mBox); it.group.add(it.box);
      it.edges = new LineSegments(new EdgesGeometry(this.geoBox), new LineBasicMaterial({ color: 0xfff0c0 })); it.box.add(it.edges);
      for (var c = 0; c < 4; c++) { var ch = new Mesh(this.geoChev, mChev); ch.position.set(0, 0.05, c * 2.2 - 3.3); ch.renderOrder = 3; it.group.add(ch); it.chev.push(ch); }
      it.mats.push(mDisc, mRing, mBox, mChev);
      it.group.visible = !1; this.group.add(it.group); this.items.push(it);
    }
  };
  Hazards.prototype.update = function (hz, tw, time, addPool, camPos) {
    if (!hz || !hz.length) { for (var i = 0; i < this.items.length; i++) this.items[i].group.visible = !1; return; }
    this.ensure(hz.length);
    var len = tw.length || 1;
    for (i = 0; i < this.items.length; i++) {
      var it = this.items[i], h = hz[i];
      if (!h || h.active === !1) { it.group.visible = !1; continue; }
      var kind = h.kind || "slick", radius = h.radius || 3, rad = clamp(radius, 1, 12);
      var height = kind === "mover" ? 0.6 : 0;
      var tt = (h.distance || 0) / len;
      sampleInto(tw, tt, h.lane || 0, height, V0, V1, V2);
      var g = it.group; g.visible = !0; g.position.copy(V0); g.rotation.set(0, Math.atan2(V1.x, V1.z), 0);
      var isDisc = kind === "slick" || kind === "ice", isMover = kind === "mover", isCut = kind === "shortcut";
      it.disc.visible = isDisc; it.ring.visible = isDisc; it.box.visible = isMover;
      for (var c = 0; c < 4; c++) it.chev[c].visible = isCut;
      if (isDisc) {
        var ice = kind === "ice";
        it.disc.material.color.setHex(ice ? 0xbfe6ff : 0x0a0c14); it.disc.material.opacity = ice ? 0.5 : 0.72;
        it.disc.scale.set(rad, 1, rad);
        var sh = 0.55 + 0.45 * Math.sin(time * 3 + i);
        it.ring.material.color.setHex(h.color !== void 0 ? h.color : ice ? 0xdaf6ff : 0x8b5bff); it.ring.material.opacity = 0.08 + 0.1 * sh;
        it.ring.scale.set(rad * (0.75 + 0.25 * sh), 1, rad * (0.75 + 0.25 * sh));
        if (Math.random() < 0.25 && V0.distanceTo(camPos) < 90) {
          var ang = Math.random() * 6.283, rd = Math.random() * rad;
          E.reset(); E.x = V0.x + Math.cos(ang) * rd; E.y = V0.y + 0.15; E.z = V0.z + Math.sin(ang) * rd; E.vy = 0.4; E.life = 0.45; E.s0 = 0.05; E.s1 = 0.2;
          E.col(ice ? PAL[5] : PAL[0], 0.7); E.a = 0.45; E.fadeIn = 0.3; addPool.emit();
        }
      } else if (isMover) {
        var ph = h.phase || 0, slide = Math.sin(ph * 6.283) * rad;
        it.box.position.set(slide, 0, 0); it.box.rotation.y = ph * 6.283;
        it.box.material.color.setHex(h.color !== void 0 ? h.color : 0xffa040);
        it.box.material.opacity = 0.75 + 0.2 * Math.sin(time * 8);
      } else if (isCut) {
        for (c = 0; c < 4; c++) { var p = 0.5 + 0.5 * Math.sin(time * 4.5 - c * 1.2); it.chev[c].scale.set(0.8 + p * 0.3, 1, 0.8 + p * 0.3); it.chev[c].material.opacity = 0.45 + 0.45 * p; }
        it.chev[0].material.color.setHex(h.color !== void 0 ? h.color : 0x5df0ff);
      } else { g.visible = !1; }
    }
  };
  Hazards.prototype.dispose = function () {
    for (var i = 0; i < this.items.length; i++) { var it = this.items[i]; for (var m = 0; m < it.mats.length; m++) it.mats[m].dispose(); it.edges.geometry.dispose(); it.edges.material.dispose(); }
    this.geoDisc.dispose(); this.geoBox.dispose(); this.geoChev.dispose();
    if (this.group.parent) this.group.parent.remove(this.group); this.items = [];
  };

  // ---- the FX manager ----------------------------------------------------------
  var S = {
    ready: !1, index: -1, tier: null, T: TIERS.high, A: null, B: null, skid: null, skidR: null, trail: null, glitch: null, hz: null,
    scene: null, stage: null, tw: null, engine: null, time: 0, acc: {},
    prev: null, prevCount: 1, prevTraps: 0, fw: [], fwNext: 0, fwBudget: 0, lapT: 0, ambT: 0, endFired: !1, prevFinished: !1, prevLap: 0,
    devils: [{ x: 0, z: 0, t: 0 }, { x: 0, z: 0, t: 0 }], tumble: [], stats: { emitted: 0 },
  };
  function racerState() { return { boost: 0, stun: 0, shield: 0, item: null, drift: 0, hitCd: 0, lap: 0, driftLen: 0 }; }

  function build(ctx) {
    teardown();
    var tier = (ctx.quality && TIERS[ctx.quality]) ? ctx.quality : "high";
    S.tier = tier; S.T = TIERS[tier]; S.index = ctx.index; S.scene = ctx.scene; S.stage = ctx.stage; S.tw = ctx.trackWorld; S.engine = ctx.engine;
    S.A = new Pool(S.T.alpha, !1); S.B = new Pool(S.T.add, !0);
    S.bright = ctx.index === 1 || ctx.index === 3;
    S.B.mat.uniforms.glow.value = S.bright ? 1.45 : ctx.index === 2 ? 1.2 : 1;
    S.skid = new Ribbon(S.T.skid, { fade: 14, additive: !1 }); S.skidR = new Ribbon(S.T.skid, { fade: 14, additive: !1 }); S.trail = new Ribbon(S.T.trail, { fade: 0.45, additive: !0 });
    S.glitch = new Glitch(); S.hz = new Hazards(ctx.stage);
    ctx.stage.add(S.skid.mesh); ctx.stage.add(S.skidR.mesh); ctx.stage.add(S.trail.mesh); ctx.stage.add(S.A.mesh); ctx.stage.add(S.B.mesh); ctx.stage.add(S.glitch.mesh);
    S.prev = []; for (var i = 0; i < 8; i++) S.prev.push(racerState());
    S.prevCount = 1; S.prevTraps = 0; S.fw.length = 0; S.fwNext = 0; S.fwBudget = 0; S.ambT = 0; S.endFired = !1; S.prevFinished = !1; S.prevLap = 0; S.time = 0;
    S.acc = { smoke: 0, spark: 0, flame: 0, streak: 0, amb: 0, shield: 0, trap: 0, glint: 0 };
    for (i = 0; i < 2; i++) { S.devils[i].t = Math.random() * 100; }
    S.tumble.length = 0; for (i = 0; i < 4; i++) S.tumble.push({ t: Math.random(), side: i % 2 ? 1 : -1, off: 0, spin: 0, v: 0 });
    seedVolume(ctx.index);
    S.ready = !0;
  }
  var VOL = { ax: 0, ay: 0, az: 0, hx: 30, hy: 12, hz: 30, ahead: 22, stream: 0, pool: null, count: 0 };
  function seedVolume(idx) {
    var w = S.T.weather, n = 0, pool = null;
    VOL.pool = null; VOL.count = 0; VOL.stream = 0; VOL.ahead = 22; VOL.hx = 30; VOL.hy = 12; VOL.hz = 30; VOL.ay = 0;
    if (idx === 0) { pool = S.A; n = Math.round(420 * w); VOL.hy = 14; VOL.ay = 6; }
    else if (idx === 1) { pool = S.A; n = Math.round(200 * w); VOL.hy = 9; VOL.ay = 6; }
    else if (idx === 3) { pool = S.A; n = Math.round(620 * w); VOL.hy = 11; VOL.ay = 4; }
    else if (idx === 4) { pool = S.A; n = Math.round(90 * w); VOL.hx = VOL.hz = 36; VOL.hy = 3; VOL.ay = 2.5; }
    else if (idx === 5) { pool = S.B; n = Math.round(360 * w); VOL.hx = VOL.hz = 45; VOL.hy = 20; VOL.ahead = 30; VOL.stream = 6; }
    if (!pool || !n) return;
    n = Math.min(n, pool.n >> 1); VOL.pool = pool; VOL.count = n; pool.cursor = 0;
    var cam = S.engine.camera.position;
    for (var i = 0; i < n; i++) {
      E.reset(); E.life = 1e9; E.x = cam.x + rr(-VOL.hx, VOL.hx); E.y = cam.y + VOL.ay + rr(-VOL.hy, VOL.hy); E.z = cam.z + rr(-VOL.hz, VOL.hz);
      if (idx === 0) { E.vx = rr(-0.5, 0.5); E.vy = -rr(16, 22); E.vz = rr(-0.5, 0.5); E.s0 = E.s1 = 0.028; E.len = rr(0.7, 1.3); E.mode = 1; E.stretchV = 1; E.shape = 1; E.r = 0.62; E.g = 0.74; E.b = 0.9; E.a = 0.26; }
      else if (idx === 1) {
        if (i % 4 === 0) { E.y = cam.y + rr(7, 14); E.vy = 0; E.vx = rr(-0.2, 0.2); E.vz = rr(-0.2, 0.2); E.wob = 0.6; E.s0 = E.s1 = rr(1.6, 2.2); E.shape = 8; E.col(PAL[(Math.random() * 5) | 0], 0.95); E.a = 1; }
        else { E.vy = -rr(0.6, 1.4); E.wob = 1.5; E.rot = rr(0, 6.3); E.rotV = rr(-6, 6); E.s0 = E.s1 = rr(0.12, 0.2); E.shape = 2; E.col(PAL[(Math.random() * 6) | 0], 0.85); E.a = 0.9; }
      }
      else if (idx === 3) { E.vy = -rr(1.6, 3); E.vx = rr(-0.8, 0.8); E.vz = rr(-0.8, 0.8); E.wob = 1.4; E.s0 = E.s1 = rr(0.12, 0.3); E.shape = 0; E.r = 0.88; E.g = 0.94; E.b = 1.08; E.a = 1; }
      else if (idx === 4) { E.vx = rr(-2, 2); E.vz = rr(-2, 2); E.vy = rr(-0.2, 0.2); E.wob = 0.5; E.s0 = E.s1 = rr(2.5, 4.5); E.rot = rr(0, 6.3); E.rotV = rr(-0.3, 0.3); E.shape = 0; E.r = 0.7; E.g = 0.5; E.b = 0.35; E.a = 0.07; }
      else if (idx === 5) { var sp = rr(3, 8); E.vx = -sp; E.vy = 0; E.vz = 0; E.s0 = E.s1 = 0.04; E.len = rr(0.6, 1.8); E.mode = 1; E.stretchV = 1; E.shape = 1; E.col(PAL[(Math.random() * 3) | 0], 0.8); E.a = 0.5; }
      pool.emit();
    }
    pool.reserve(n);
  }
  function updateVolume(camera) {
    if (!VOL.pool) return;
    var cp = camera.position;
    VOL.pool.volume(cp.x + CAMF.x * VOL.ahead, cp.y + VOL.ay + CAMF.y * VOL.ahead, cp.z + CAMF.z * VOL.ahead, VOL.hx, VOL.hy, VOL.hz, VOL.stream);
  }
  function teardown() {
    if (!S.ready) return;
    S.ready = !1;
    try { S.A.dispose(); S.B.dispose(); S.skid.dispose(); S.skidR.dispose(); S.trail.dispose(); S.glitch.dispose(); S.hz.dispose(); } catch (e) {}
    S.A = S.B = S.skid = S.skidR = S.trail = S.glitch = S.hz = null; S.tw = null; S.scene = null; S.stage = null;
  }

  // ---- emitters -----------------------------------------------------------------
  // kart local -> world: mesh.position + rotation.y (kart local +z is forward)
  function kartPoint(mesh, lx, ly, lz, out) {
    var h = mesh.rotation.y, s = Math.sin(h), c = Math.cos(h);
    out.set(mesh.position.x + c * lx + s * lz, mesh.position.y + ly, mesh.position.z - s * lx + c * lz);
    return out;
  }
  function kartDir(mesh, out) { var h = mesh.rotation.y; out.set(Math.sin(h), 0, Math.cos(h)); return out; }

  function driftSmoke(r, mesh, dt, isPlayer, dist) {
    var charge = clamp(r.drift / 3.2, 0, 1), rate = (isPlayer ? 150 : 50) * S.T.rate * (dist < 60 ? 1 : 0.4);
    var k = S.acc.smoke += rate * dt; if (k < 1) return; S.acc.smoke = k - Math.floor(k);
    kartDir(mesh, V3);
    var col = driverColor[r.id];
    for (var n = Math.floor(k); n > 0; n--) {
      var side = n % 2 ? 1 : -1, outer = side === r.driftDir ? 1 : 0.6; // kart local +x is screen-left; outer wheel when turning left (driftDir -1) is local -x
      if (Math.random() > outer) continue;
      kartPoint(mesh, side * 0.95, 0.22, -1.15, V0);
      E.reset();
      E.x = V0.x + rr(-0.15, 0.15); E.y = V0.y; E.z = V0.z + rr(-0.15, 0.15);
      var kv = r.speed * rr(0.4, 0.6), lat = side * rr(2.5, 5.5);
      E.vx = V3.x * kv + rr(-0.8, 0.8) + V3.z * lat; E.vz = V3.z * kv + rr(-0.8, 0.8) - V3.x * lat; E.vy = rr(1, 2.6);
      E.life = rr(0.5, 0.85); E.s0 = rr(0.7, 1.1); E.s1 = rr(2.6, 3.6); E.drag = 1.4; E.rot = rr(0, 6.3); E.rotV = rr(-1.5, 1.5);
      var g = (S.bright ? 0.3 : 0.5) + rr(-0.05, 0.05), tn = charge * 0.5; E.r = g + (col.r - g) * tn; E.g = g + (col.g - g) * tn; E.b = g + (col.b - g) * tn;
      E.a = 0.42 + 0.2 * charge; E.fadeIn = 0.08; E.mode = 0; E.shape = 0;
      S.A.emit();
    }
  }
  function ultraSparks(r, mesh, dt, isPlayer) {
    var rate = (isPlayer ? 170 : 60) * S.T.rate;
    var k = S.acc.spark += rate * dt; if (k < 1) return; S.acc.spark = k - Math.floor(k);
    kartDir(mesh, V3); var side = r.driftDir || 1;
    for (var n = Math.floor(k); n > 0; n--) {
      kartPoint(mesh, side * 1.05, 0.1, rr(-1.3, 0.5), V0);
      E.reset(); E.x = V0.x; E.y = V0.y; E.z = V0.z;
      var kv = r.speed * rr(0.6, 0.9);
      var lat = side * rr(2, 8);
      E.vx = V3.x * kv + V3.z * lat + rr(-1, 1); E.vz = V3.z * kv - V3.x * lat + rr(-1, 1); E.vy = rr(0.8, 4);
      E.life = rr(0.3, 0.6); E.s0 = 0.1; E.s1 = 0.04; E.len = rr(0.6, 1.4); E.grav = 7; E.mode = 1; E.stretchV = 1; E.shape = 1;
      var hot = Math.random(); E.r = 1.6; E.g = 0.45 + hot * 0.5; E.b = 0.08 + hot * 0.3; E.a = 0.95;
      S.B.emit();
    }
  }
  function wallSparks(r, mesh, dt) {
    var rate = 60 * S.T.rate * clamp(r.wallScrape, 0, 1.4);
    var k = S.acc.spark += rate * dt; if (k < 1) return; S.acc.spark = k - Math.floor(k);
    kartDir(mesh, V3); var side = -(r.wallSide || (r.lane > 0 ? 1 : -1));
    for (var n = Math.floor(k); n > 0; n--) {
      kartPoint(mesh, side * 1.1, rr(0.2, 0.8), rr(-1.2, 1.2), V0);
      E.reset(); E.x = V0.x; E.y = V0.y; E.z = V0.z;
      var kv = r.speed * rr(0.3, 0.6);
      E.vx = V3.x * kv + rr(-2, 2); E.vz = V3.z * kv + rr(-2, 2); E.vy = rr(0.5, 4);
      E.life = rr(0.2, 0.45); E.s0 = 0.05; E.s1 = 0.02; E.len = rr(0.3, 0.7); E.grav = 14; E.mode = 1; E.stretchV = 1; E.shape = 1;
      E.r = 1.3; E.g = 1.05; E.b = 0.55; E.a = 0.85; S.B.emit();
    }
  }
  function boostFlames(r, mesh, dt, isPlayer, dist) {
    var rate = (isPlayer ? 160 : 60) * S.T.rate * (dist < 70 ? 1 : 0.35);
    var k = S.acc.flame += rate * dt; if (k < 1) return; S.acc.flame = k - Math.floor(k);
    kartDir(mesh, V3); var acc = driverAccent[r.id];
    for (var n = Math.floor(k); n > 0; n--) {
      var side = n % 2 ? 0.6 : -0.6;
      kartPoint(mesh, side, 0.58, -1.8, V0);
      E.reset(); E.x = V0.x + rr(-0.06, 0.06); E.y = V0.y + rr(-0.06, 0.06); E.z = V0.z + rr(-0.06, 0.06);
      var sp = r.speed - rr(3, 10);
      E.vx = V3.x * sp + rr(-0.5, 0.5); E.vz = V3.z * sp + rr(-0.5, 0.5); E.vy = rr(0.1, 1.1);
      E.life = rr(0.15, 0.3); E.s0 = rr(0.8, 1.2); E.s1 = 0.2; E.drag = 2; E.mode = 0; E.shape = 0;
      var t = Math.random(); t *= t; E.r = 1.25 + (acc.r * 1.1 - 1.25) * t; E.g = 0.55 + (acc.g * 1.1 - 0.55) * t; E.b = 0.12 + (acc.b * 1.1 - 0.12) * t;
      E.a = 0.5; E.fadeIn = 0.08; S.B.emit();
    }
    // exhaust core glow (one short-lived puff per pipe per frame)
    for (var q = -1; q <= 1; q += 2) {
      kartPoint(mesh, q * 0.6, 0.58, -1.85, V0);
      E.reset(); E.x = V0.x; E.y = V0.y; E.z = V0.z; E.vx = V3.x * r.speed; E.vz = V3.z * r.speed; E.life = 0.09; E.s0 = 1.1; E.s1 = 0.9; E.col(acc, 0.9); E.a = 0.25; S.B.emit();
    }
  }
  function speedStreaks(dt, camera, speed) {
    var rate = (S.tier === "low" ? 90 : 200) * S.T.rate;
    var k = S.acc.streak += rate * dt; if (k < 1) return; S.acc.streak = k - Math.floor(k);
    for (var n = Math.floor(k); n > 0; n--) {
      var ang = Math.random() * 6.283, rad = rr(2.6, 7), ahead = rr(5, 16);
      V0.copy(camera.position).addScaledVector(CAMF, ahead).addScaledVector(CAMR, Math.cos(ang) * rad).addScaledVector(CAMU, Math.sin(ang) * rad * 0.7);
      E.reset(); E.x = V0.x; E.y = V0.y; E.z = V0.z;
      var sp = speed - rr(28, 48); E.vx = CAMF.x * sp; E.vy = CAMF.y * sp; E.vz = CAMF.z * sp;
      E.life = rr(0.2, 0.35); E.s0 = 0.05; E.s1 = 0.02; E.len = rr(1.8, 4); E.mode = 1; E.stretchV = 1; E.shape = 1;
      E.r = 0.55; E.g = 0.9; E.b = 1.0; E.a = 0.4; E.fadeIn = 0.25; S.B.emit();
    }
  }
  function boostTrail(r, mesh, now) {
    kartPoint(mesh, -0.6, 0.5, -1.9, V0); kartPoint(mesh, 0.6, 0.5, -1.9, V1);
    var acc = driverAccent[r.id];
    S.trail.push(r.id, V0.x, V0.y, V0.z, V1.x, V1.y, V1.z, acc.r * 1.2, acc.g * 1.2, acc.b * 1.2, 0.5, now);
  }
  function skidMark(r, mesh, now, isPlayer) {
    var charge = clamp(r.drift / 3.2, 0, 1), col = driverColor[r.id];
    var cr = 0.02 + col.r * 0.35 * charge, cg = 0.02 + col.g * 0.35 * charge, cb = 0.02 + col.b * 0.35 * charge;
    var a = (isPlayer ? 0.55 : 0.4) * (0.6 + 0.4 * charge);
    kartPoint(mesh, -1.21, -0.08, -1.15, V0); kartPoint(mesh, -0.89, -0.08, -1.15, V1);
    S.skid.push(r.id, V0.x, V0.y, V0.z, V1.x, V1.y, V1.z, cr, cg, cb, a, now);
    kartPoint(mesh, 0.89, -0.08, -1.15, V0); kartPoint(mesh, 1.21, -0.08, -1.15, V1);
    S.skidR.push(r.id, V0.x, V0.y, V0.z, V1.x, V1.y, V1.z, cr, cg, cb, a, now);
  }
  function burstAt(x, y, z, count, col, opts) {
    var speed = opts.speed || 6, life = opts.life || 0.6, size = opts.size || 0.15, shape = opts.shape || 0, grav = opts.grav || 0, add = opts.add !== !1, mul = opts.mul || 1, spread = opts.spread || 0;
    var pool = add ? S.B : S.A;
    for (var i = 0; i < count; i++) {
      var th = Math.random() * 6.283, ph = Math.acos(rr(-1, 1)), sp = speed * rr(0.35, 1);
      E.reset(); E.x = x + rr(-spread, spread); E.y = y + rr(-spread, spread); E.z = z + rr(-spread, spread);
      E.vx = Math.sin(ph) * Math.cos(th) * sp + (opts.bvx || 0); E.vy = Math.cos(ph) * sp * (opts.up || 1) + (opts.bvy || 0); E.vz = Math.sin(ph) * Math.sin(th) * sp + (opts.bvz || 0);
      E.life = life * rr(0.6, 1.2); E.s0 = size; E.s1 = opts.size1 !== void 0 ? opts.size1 : size * 0.4; E.grav = grav; E.drag = opts.drag || 1.5;
      E.mode = opts.mode || 0; E.stretchV = opts.mode === 1 ? 1 : 0; E.len = opts.len || 0; E.shape = shape; E.rot = rr(0, 6.3); E.rotV = rr(-6, 6);
      var c = Array.isArray(col) ? col[i % col.length] : col; E.col(c, mul); E.a = opts.a || 0.8; E.fadeIn = opts.fadeIn || 0;
      pool.emit();
    }
  }
  function kartVel(mesh, speed, f) { kartDir(mesh, V4).multiplyScalar((speed || 0) * f); return V4; }
  var OPT_HIT1 = { speed: 9, life: 0.6, size: 0.45, size1: 0.12, shape: 2, mul: 0.9, a: 0.85, drag: 3, bvx: 0, bvy: 0, bvz: 0 },
      OPT_HIT2 = { speed: 5, life: 0.5, size: 0.06, size1: 0.02, shape: 1, mode: 1, len: 0.9, mul: 1.1, a: 0.8, drag: 1, bvx: 0, bvy: 0, bvz: 0 },
      OPT_POP = { speed: 8, life: 0.7, size: 0.35, size1: 0.1, shape: 5, mul: 0.9, a: 0.85, drag: 2, bvx: 0, bvy: 0, bvz: 0 },
      OPT_PICK = { speed: 4, life: 0.7, size: 0.18, size1: 0.02, shape: 4, mul: 1.0, a: 0.9, drag: 2, up: 1.6, bvx: 0, bvy: 0, bvz: 0 },
      OPT_SHIELD = { speed: 3, life: 0.6, size: 0.3, size1: 0.35, shape: 5, mul: 0.9, a: 0.6, drag: 3, bvx: 0, bvy: 0, bvz: 0 };
  function withVel(o, v) { o.bvx = v.x; o.bvy = v.y; o.bvz = v.z; return o; }
  function hitBurst(mesh, isPlayer, speed) {
    var x = mesh.position.x, y = mesh.position.y + 1, z = mesh.position.z, v = kartVel(mesh, speed, 0.45);
    burstAt(x, y, z, isPlayer ? 60 : 30, [PAL[0], PAL[2], PAL[5]], withVel(OPT_HIT1, v));
    burstAt(x, y, z, isPlayer ? 26 : 12, [PAL[1], PAL[0]], withVel(OPT_HIT2, v));
    if (isPlayer) S.glitch.amt = 1;
  }
  function shieldPop(mesh, speed) {
    burstAt(mesh.position.x, mesh.position.y + 1.1, mesh.position.z, 48, [PAL[0], PAL[5]], withVel(OPT_POP, kartVel(mesh, speed, 0.8)));
  }
  function pickupSparkle(mesh, speed) {
    burstAt(mesh.position.x, mesh.position.y + 1.2, mesh.position.z, 28, [PAL[3], PAL[5], PAL[0]], withVel(OPT_PICK, kartVel(mesh, speed, 0.85)));
  }
  function pulseWave(mesh, lifeMul, speed) {
    kartDir(mesh, V3); lifeMul = lifeMul || 1; speed = speed || 0;
    for (var k = 0; k < 2; k++) {
      E.reset(); E.x = mesh.position.x; E.y = mesh.position.y + 0.25; E.z = mesh.position.z; E.vx = V3.x * speed; E.vz = V3.z * speed;
      E.life = (0.9 + k * 0.2) * lifeMul; E.s0 = 1; E.s1 = 40 + k * 16; E.len = -1; E.mode = 2; E.shape = 3; E.a = 0.65 - k * 0.2; E.col(PAL[0], 1.2);
      var i = S.B.emit(); S.B.setAxis(i, V3.x, V3.y, V3.z);
      E.y = mesh.position.y + 0.2; E.a = 0.28 - k * 0.1; E.r = 0.02; E.g = 0.03; E.b = 0.08;
      i = S.A.emit(); S.A.setAxis(i, V3.x, V3.y, V3.z);
    }
    // ring particles: size and len grow together for flat rings (len tracks size)
    burstAt(mesh.position.x, mesh.position.y + 0.9, mesh.position.z, 20, [PAL[0], PAL[1]], { speed: 14, life: 0.5, size: 0.06, size1: 0.02, shape: 1, mode: 1, len: 1.4, mul: 1, a: 0.7, drag: 0.5 });
  }
  function lapConfetti(count, t) {
    var tw = S.tw; if (!tw) return;
    sampleInto(tw, t || 0, 0, 7, V0, V1, V2);
    var pal = [PAL[0], PAL[1], PAL[2], PAL[3], PAL[4], PAL[5]];
    for (var i = 0; i < count; i++) {
      E.reset(); E.x = V0.x + V2.x * rr(-13, 13) + V1.x * rr(-4, 4); E.y = V0.y + rr(0, 4); E.z = V0.z + V2.z * rr(-13, 13) + V1.z * rr(-4, 4);
      E.vx = rr(-0.8, 0.8); E.vz = rr(-0.8, 0.8); E.vy = rr(-0.5, 0.5); E.grav = 2.2; E.drag = 1.6; E.wob = 1.6;
      E.life = rr(2.5, 4.5); E.s0 = rr(0.14, 0.24); E.s1 = E.s0; E.rot = rr(0, 6.3); E.rotV = rr(-9, 9); E.mode = 0; E.shape = 2;
      E.col(pal[i % pal.length], 0.85); E.a = 0.95; E.fadeIn = 0.05; S.A.emit();
    }
  }
  function confettiStorm(count, x, y, z, spread) {
    var pal = [PAL[0], PAL[1], PAL[2], PAL[3], PAL[4], PAL[5]];
    for (var i = 0; i < count; i++) {
      E.reset(); E.x = x + rr(-spread, spread); E.y = y + rr(0, 8); E.z = z + rr(-spread, spread);
      E.vx = rr(-1.5, 1.5); E.vz = rr(-1.5, 1.5); E.vy = rr(0, 3); E.grav = 2; E.drag = 1.4; E.wob = 2;
      E.life = rr(3, 6); E.s0 = rr(0.14, 0.26); E.s1 = E.s0; E.rot = rr(0, 6.3); E.rotV = rr(-10, 10); E.mode = 0; E.shape = 2;
      E.col(pal[i % pal.length], 0.85); E.a = 0.95; S.A.emit();
    }
  }
  var OPT_FW1 = { speed: 13, life: 2.2, size: 2.4, size1: 1.2, shape: 0, mul: 1.1, a: 0.75, grav: 3, drag: 1.2, fadeIn: 0.05 },
      OPT_FW2 = { speed: 12, life: 1.8, size: 0.3, size1: 0.08, shape: 1, mode: 1, len: 2.4, mul: 1.3, a: 0.85, grav: 3.5, drag: 0.9 };
  function launchRocket(lat, t) {
    if (S.fw.length >= 4 || !S.tw || S.B.alive > S.T.add * 0.72) return;
    sampleInto(S.tw, t || 0, lat, 1, V0, V1, V2);
    S.fw.push({ x: V0.x, y: V0.y, z: V0.z, vx: rr(-1.5, 1.5), vy: rr(15, 20), vz: rr(-1.5, 1.5), t: 0, apex: rr(0.85, 1.2), col: PAL[(Math.random() * PAL.length) | 0], done: !1 });
  }
  function updateRockets(dt) {
    for (var i = S.fw.length - 1; i >= 0; i--) {
      var f = S.fw[i]; f.t += dt; f.vy -= 9 * dt; f.x += f.vx * dt; f.y += f.vy * dt; f.z += f.vz * dt;
      E.reset(); E.x = f.x + rr(-0.1, 0.1); E.y = f.y; E.z = f.z + rr(-0.1, 0.1); E.vx = rr(-0.6, 0.6); E.vy = -rr(1, 3); E.vz = rr(-0.6, 0.6);
      E.life = rr(0.3, 0.6); E.s0 = 0.9; E.s1 = 0.1; E.col(PAL[3], 1.1); E.a = 0.7; E.shape = 0; S.B.emit();
      if (f.t >= f.apex) {
        var n = S.tier === "low" ? 30 : S.tier === "medium" ? 44 : 64;
        burstAt(f.x, f.y, f.z, n, [f.col, PAL[5]], OPT_FW1);
        burstAt(f.x, f.y, f.z, n >> 1, f.col, OPT_FW2);
        S.fw[i] = S.fw[S.fw.length - 1]; S.fw.pop();
      }
    }
  }
  function shieldShimmer(mesh, dt, dist) {
    var rate = 26 * S.T.rate * (dist < 60 ? 1 : 0.3);
    var k = S.acc.shield += rate * dt; if (k < 1) return; S.acc.shield = k - Math.floor(k);
    for (var n = Math.floor(k); n > 0; n--) {
      var th = Math.random() * 6.283, ph = Math.acos(rr(-1, 1)), R = 2.15;
      E.reset(); E.x = mesh.position.x + Math.sin(ph) * Math.cos(th) * R; E.y = mesh.position.y + 1.1 + Math.cos(ph) * R * 0.8; E.z = mesh.position.z + Math.sin(ph) * Math.sin(th) * R;
      E.life = rr(0.3, 0.5); E.s0 = 0.45; E.s1 = 0.6; E.rot = rr(0, 6.3); E.shape = 5; E.col(PAL[0], 1.2); E.a = 0.7; E.fadeIn = 0.4; S.B.emit();
    }
  }
  function trapCrackle(race, camPos, dt) {
    var traps = race.traps; if (!traps || !traps.length) return;
    var tw = S.tw, len = race.length || tw.length;
    for (var i = 0; i < traps.length; i++) {
      var tp = traps[i]; if (Math.random() > 0.5 * S.T.rate + 0.2) continue;
      sampleInto(tw, tp.distance / len, tp.lane, 0.3, V0, V1, V2);
      if (V0.distanceToSquared(camPos) > 130 * 130) continue;
      var ang = Math.random() * 6.283;
      E.reset(); E.x = V0.x + Math.cos(ang) * 1.5; E.y = V0.y + rr(-0.1, 0.3); E.z = V0.z + Math.sin(ang) * 1.5;
      E.vx = Math.cos(ang + 1.57) * rr(-3, 3); E.vz = Math.sin(ang + 1.57) * rr(-3, 3); E.vy = rr(0.5, 2.5);
      E.life = rr(0.12, 0.3); E.s0 = 0.05; E.s1 = 0.02; E.len = rr(0.3, 0.7); E.mode = 1; E.stretchV = 1; E.shape = 1;
      E.r = 1.3; E.g = 0.45; E.b = 0.25; E.a = 0.9; S.B.emit();
    }
  }
  function goBurst(race) {
    var meshes = S.engine.racerMeshes;
    for (var i = 0; i < race.racers.length; i++) {
      var r = race.racers[i], mesh = meshes[r.id]; if (!mesh) continue;
      for (var k = 0; k < 10; k++) {
        kartPoint(mesh, k % 2 ? 0.6 : -0.6, 0.58, -1.8, V0); kartDir(mesh, V3);
        E.reset(); E.x = V0.x; E.y = V0.y; E.z = V0.z; E.vx = -V3.x * rr(4, 9); E.vz = -V3.z * rr(4, 9); E.vy = rr(0.5, 1.5);
        E.life = rr(0.3, 0.5); E.s0 = 0.4; E.s1 = 0.08; E.drag = 4; E.col(driverAccent[r.id], 1); E.a = 0.6; S.B.emit();
      }
    }
    lapConfetti(S.tier === "low" ? 60 : 140);
  }

  // ---- ambient weather ----------------------------------------------------------
  function ambient(dt, camera, race) {
    var idx = S.index, w = S.T.weather, cp = camera.position;
    var k, n, i;
    if (idx === 0) { // Chicago: rain streaks + wet sparkle
      k = S.acc.glint += 40 * w * dt; if (k >= 1 && race && race.player) { S.acc.glint = k - Math.floor(k);
        var len = race.length || 1, base = ((race.player.distance % len) + len) % len / len;
        for (n = Math.floor(k); n > 0; n--) {
          sampleInto(S.tw, base + rr(0.002, 0.03), rr(-11, 11), 0.12, V0, V1, V2);
          E.reset(); E.x = V0.x; E.y = V0.y; E.z = V0.z; E.life = rr(0.2, 0.4); E.s0 = 0.03; E.s1 = 0.16; E.shape = 4; E.r = 0.7; E.g = 0.95; E.b = 1.1; E.a = 0.5; E.fadeIn = 0.4; S.B.emit();
        } }
    } else if (idx === 2) { // Lakefront: gulls, spray, sun sparkle on the water
      k = S.acc.amb += 4 * w * dt; if (k >= 1) { S.acc.amb = k - Math.floor(k);
        for (n = Math.floor(k); n > 0; n--) {
          V0.copy(cp).addScaledVector(CAMF, rr(20, 90)).addScaledVector(CAMR, rr(-45, 45)); V0.y += rr(5, 18);
          E.reset(); E.x = V0.x; E.y = V0.y; E.z = V0.z; E.vx = rr(-4, 4); E.vz = rr(-4, 4); E.vy = rr(-0.3, 0.3); E.wob = 3;
          E.life = rr(3.5, 5); E.s0 = 1.6; E.s1 = 1.6; E.shape = 6; E.r = 0.9; E.g = 0.9; E.b = 0.92; E.a = 0.9; E.fadeIn = 0.1; E.rotV = 0; S.A.emit();
        } }
      k = S.acc.glint += 70 * w * dt; if (k >= 1 && race && race.player) { S.acc.glint = k - Math.floor(k);
        var L2 = race.length || 1, b2 = ((race.player.distance % L2) + L2) % L2 / L2;
        for (n = Math.floor(k); n > 0; n--) {
          var side = Math.random() < 0.5 ? -1 : 1;
          sampleInto(S.tw, b2 + rr(-0.01, 0.06), side * rr(26, 90), 0, V0, V1, V2); if (S.tw.baseY !== void 0) V0.y = Math.min(V0.y - 1.5, S.tw.baseY - 3);
          E.reset(); E.x = V0.x; E.y = V0.y; E.z = V0.z; E.life = rr(0.3, 0.6); E.s0 = 0.05; E.s1 = 0.3; E.shape = 4; E.r = 1.1; E.g = 0.95; E.b = 0.7; E.a = 0.55; E.fadeIn = 0.45; S.B.emit();
        } }
      k = S.acc.shield += 14 * w * dt; if (k >= 1 && race && race.player) { S.acc.shield = k - Math.floor(k);
        var L3 = race.length || 1, b3 = ((race.player.distance % L3) + L3) % L3 / L3;
        for (n = Math.floor(k); n > 0; n--) {
          var sd = Math.random() < 0.5 ? -1 : 1;
          sampleInto(S.tw, b3 + rr(0, 0.05), sd * rr(16, 24), 0, V0, V1, V2);
          E.reset(); E.x = V0.x; E.y = V0.y; E.z = V0.z; E.vy = rr(2, 5); E.vx = rr(-1, 1); E.vz = rr(-1, 1); E.grav = 5; E.drag = 1.2;
          E.life = rr(0.8, 1.4); E.s0 = 0.5; E.s1 = 1.8; E.shape = 0; E.r = 0.92; E.g = 0.95; E.b = 1; E.a = 0.3; E.fadeIn = 0.2; S.A.emit();
        } }
    } else if (idx === 3) { // Frostbyte: snow
    } else if (idx === 4) { // Canyon: dust devils + tumbleweeds + haze puffs
      for (i = 0; i < 2; i++) {
        var dv = S.devils[i]; dv.t += dt;
        if (race && race.player) {
          var L4 = race.length || 1, b4 = ((race.player.distance % L4) + L4) % L4 / L4;
          var tt = b4 + 0.02 + i * 0.03 + 0.012 * Math.sin(dv.t * 0.13 + i * 3), lat = (i ? 1 : -1) * (22 + 8 * Math.sin(dv.t * 0.09 + i));
          sampleInto(S.tw, tt, lat, 0, V0, V1, V2);
          k = S.acc.shield += 22 * w * dt; if (k >= 1) { S.acc.shield = k - Math.floor(k);
            for (n = Math.floor(k); n > 0; n--) {
              var ang = dv.t * 6 + n * 2.1, rad = rr(0.3, 1.6);
              E.reset(); E.x = V0.x + Math.cos(ang) * rad; E.y = V0.y + rr(0, 0.5); E.z = V0.z + Math.sin(ang) * rad;
              E.vx = -Math.sin(ang) * 5; E.vz = Math.cos(ang) * 5; E.vy = rr(3, 6); E.drag = 0.8;
              E.life = rr(1.2, 2); E.s0 = 0.5; E.s1 = 2.4; E.shape = 0; E.r = 0.62; E.g = 0.44; E.b = 0.3; E.a = 0.3; E.fadeIn = 0.2; S.A.emit();
            } }
        }
      }
      if (race && race.player) {
        var L5 = race.length || 1, b5 = ((race.player.distance % L5) + L5) % L5 / L5;
        for (i = 0; i < S.tumble.length; i++) {
          var tb = S.tumble[i]; tb.t += dt * 0.0009 * (1 + i * 0.3); tb.spin += dt * 4;
          var rel = ((tb.t - b5) % 1 + 1) % 1; if (rel > 0.09 && rel < 0.9) { tb.t = b5 + 0.005 + Math.random() * 0.06; rel = 0.03; }
          sampleInto(S.tw, tb.t, tb.side * (15 + 3 * Math.sin(tb.t * 200 + i)), 0.5 + Math.abs(Math.sin(tb.spin * 1.3)) * 0.5, V0, V1, V2);
          E.reset(); E.x = V0.x; E.y = V0.y; E.z = V0.z; E.life = 0.12; E.s0 = 1.1; E.s1 = 1.1; E.shape = 7; E.rot = tb.spin; E.r = 0.55; E.g = 0.4; E.b = 0.24; E.a = 0.95; S.A.emit();
        }
      }
    }
  }

  // ---- frame ----------------------------------------------------------------------
  function frame(ctx) {
    if (!S.ready || !ctx.race) return;
    var race = ctx.race, engine = ctx.engine, camera = ctx.camera, dt = clamp(ctx.dt || 0.016, 0, MAX_DT), now = S.time += dt;
    var meshes = engine.racerMeshes, player = ctx.player || race.player, tw = S.tw, len = race.length || tw.length || 1;
    if (ctx.scene && ctx.scene.fog) {
      var fg = ctx.scene.fog, dens = fg.density !== void 0 ? fg.density : 0;
      S.A.mat.uniforms.fogDensity.value = dens; S.B.mat.uniforms.fogDensity.value = dens * 0.8;
      if (fg.color) S.A.mat.uniforms.fogColor.value.copy(fg.color);
    }
    camera.getWorldDirection(CAMF); CAMR.crossVectors(CAMF, camera.up).normalize(); CAMU.crossVectors(CAMR, CAMF).normalize();
    var cp = camera.position;
    // countdown -> GO
    if (S.prevCount > 0 && race.countdown <= 0 && !race.finished && race.time < 0.5) goBurst(race);
    S.prevCount = race.countdown;
    // traps deployed
    var nt = race.traps ? race.traps.length : 0;
    if (nt > S.prevTraps && race.traps[nt - 1]) {
      var tp = race.traps[nt - 1]; sampleInto(tw, tp.distance / len, tp.lane, 0.4, V0, V1, V2);
      burstAt(V0.x, V0.y, V0.z, 22, [TRAPC, PAL[3]], { speed: 5, life: 0.5, size: 0.08, size1: 0.02, shape: 1, mode: 1, len: 0.6, mul: 1.1, a: 0.9, drag: 1 });
    }
    S.prevTraps = nt;
    var racing = race.countdown <= 0;
    for (var i = 0; i < race.racers.length; i++) {
      var r = race.racers[i], mesh = meshes[r.id]; if (!mesh || !mesh.visible) continue;
      var pv = S.prev[r.id], isP = r.isPlayer, dist = mesh.position.distanceTo(cp), near = dist < 140;
      // state-diff triggers
      if (r.stun > 0 && pv.stun <= 0) hitBurst(mesh, isP, r.speed);
      if (pv.shield > 0.05 && r.shield <= 0 && r.hitCooldown > 0.9 && pv.hitCd <= 0.05) shieldPop(mesh, r.speed);
      if (r.item !== null && pv.item === null && racing && near) pickupSparkle(mesh, r.speed);
      if (pv.item === 2 && r.item === null && r.boost <= pv.boost + 0.01 && r.shield <= pv.shield + 0.01 && near) pulseWave(mesh, 1, r.speed);
      if (r.shield > 0 && pv.shield <= 0 && near) burstAt(mesh.position.x, mesh.position.y + 1.1, mesh.position.z, 24, PAL[0], withVel(OPT_SHIELD, kartVel(mesh, r.speed, 0.9)));
      if (isP && r.boost > pv.boost + 0.5 && racing) {
        // boost kick: short bright puff at both pipes
        kartDir(mesh, V3);
        for (var k = 0; k < 14; k++) { kartPoint(mesh, k % 2 ? 0.6 : -0.6, 0.58, -1.8, V0); E.reset(); E.x = V0.x; E.y = V0.y; E.z = V0.z; var kk = r.speed * 0.8 - rr(4, 10); E.vx = V3.x * kk; E.vz = V3.z * kk; E.vy = rr(0.3, 1.6); E.life = rr(0.25, 0.45); E.s0 = 0.5; E.s1 = 0.08; E.drag = 4; E.col(driverAccent[r.id], 1.05); E.a = 0.6; S.B.emit(); }
      }
      // continuous
      if (r.drifting && r.drift > 0.2 && near && r.speed > 8) {
        driftSmoke(r, mesh, dt, isP, dist);
        if (r.drift > 1.9) ultraSparks(r, mesh, dt, isP);
        if (r.drift > 0.35) skidMark(r, mesh, now, isP);
      } else { S.skid.brk(r.id); S.skidR.brk(r.id); }
      if (r.wallScrape > 0.05 && near) wallSparks(r, mesh, dt);
      if (r.boost > 0 && near && racing) { boostFlames(r, mesh, dt, isP, dist); boostTrail(r, mesh, now); } else S.trail.brk(r.id);
      if (r.shield > 0 && near) shieldShimmer(mesh, dt, dist);
      pv.boost = r.boost; pv.stun = r.stun; pv.shield = r.shield; pv.item = r.item; pv.drift = r.drift; pv.hitCd = r.hitCooldown;
    }
    if (player) {
      S.lastPlayerId = player.id;
      if (player.boost > 0 && racing) speedStreaks(dt, camera, player.speed);
      var lap = Math.floor(player.distance / len);
      if (lap > S.prevLap && lap >= 1 && lap <= 2) lapConfetti(S.tier === "low" ? 70 : 160, player.distance / len + 28 / len);
      S.prevLap = lap;
      // final approach: fireworks over the gantry
      var toFinish = len * 3 - player.distance;
      if (lap >= 2 && toFinish < 170 && toFinish > -40 && !race.finished) {
        S.fwNext -= dt; if (S.fwNext <= 0) { S.fwNext = rr(0.35, 0.6); launchRocket(rr(-16, 16)); }
      }
      if (S.fwBudget > 0) { S.fwNext -= dt; if (S.fwNext <= 0) { S.fwNext = rr(0.25, 0.4); S.fwBudget--; launchRocket(rr(-18, 18), player.distance / len + rr(50, 110) / len); } }
      if (race.finished && !S.prevFinished) finale();
      S.prevFinished = !!race.finished;
    }
    updateRockets(dt);
    trapCrackle(race, cp, dt);
    updateVolume(camera);
    ambient(dt, camera, race);
    if (race.hazards) S.hz.update(race.hazards, tw, now, S.B, cp); else if (S.hz.items.length) S.hz.update(null);
    S.A.update(dt); S.B.update(dt); S.skid.update(now); S.skidR.update(now); S.trail.update(now); S.glitch.update(dt, now);
  }
  function finale() {
    if (S.endFired || !S.tw) return; S.endFired = !0;
    S.fwBudget = 10; S.fwNext = 0;
    var mesh = S.engine.racerMeshes[S.lastPlayerId] || S.engine.racerMeshes[0];
    if (mesh) confettiStorm(S.tier === "low" ? 120 : 320, mesh.position.x, mesh.position.y + 4, mesh.position.z, 18);
  }

  // ---- hooks ---------------------------------------------------------------------------
  BFX_HOOKS.on("trackLoaded", function (ctx) { build(ctx); });
  BFX_HOOKS.on("trackDispose", function () { teardown(); });
  BFX_HOOKS.on("raceStart", function (ctx) {
    if (!S.ready) return;
    S.A.clear(); S.B.clear(); S.skid.clear(); S.skidR.clear(); S.trail.clear(); S.fw.length = 0; S.endFired = !1; S.prevFinished = !1; S.prevLap = 0; S.prevTraps = 0; S.prevCount = 1;
    for (var i = 0; i < 8; i++) { var p = S.prev[i]; p.boost = p.stun = p.shield = p.hitCd = p.drift = 0; p.item = null; }
    S.glitch.amt = 0;
  });
  BFX_HOOKS.on("frame", frame);
  BFX_HOOKS.on("raceEvent", function (ev, ctx) {
    if (!S.ready || !ev) return;
    var kind = ev.kind || ev.type, race = ctx && ctx.race, mesh = race && S.engine ? S.engine.racerMeshes[race.player.id] : null;
    if (!mesh) return;
    if (kind === "pass") burstAt(mesh.position.x, mesh.position.y + 0.8, mesh.position.z, 10, PAL[0], { speed: 3, life: 0.4, size: 0.05, size1: 0.02, shape: 1, mode: 1, len: 1.2, mul: 0.9, a: 0.5, drag: 1 });
    else if (kind === "hazard") S.glitch.amt = Math.max(S.glitch.amt, 0.35);
  });
  BFX_HOOKS.on("raceEnd", function () { if (S.ready) finale(); });

  var api = {
    state: S, _Pool: Pool, _E: E,
    // debug: force a spectacle so shots can prove it
    burst: function (kind) {
      if (!S.ready || !S.engine) return !1;
      var race = S.engine && typeof window !== "undefined" && window.__blufox ? window.__blufox.race : null;
      var mesh = race ? S.engine.racerMeshes[race.player.id] : S.engine.racerMeshes[0];
      var psp = race ? race.player.speed : 0;
      if (kind === "hit") hitBurst(mesh, !0, psp); else if (kind === "pickup") pickupSparkle(mesh, psp); else if (kind === "pulse") pulseWave(mesh, 1, psp);
      else if (kind === "lap") lapConfetti(160, race ? race.player.distance / (race.length || 1) + 0.02 : 0); else if (kind === "fireworks") { S.endFired = !1; finale(); }
      else if (kind === "shield") shieldPop(mesh, psp); else if (kind === "go") goBurst(race); else if (kind === "rocket") launchRocket(0);
      return !0;
    },
    step: function (dt, n) { // advance FX n times without rendering (debug/harness)
      if (!S.ready || typeof window === "undefined" || !window.__blufox || !window.__blufox.race) return;
      var eng = S.engine, race = window.__blufox.race;
      for (var i = 0; i < (n || 1); i++) frame({ engine: eng, race: race, dt: dt || 1 / 60, player: race.player, scene: eng.scene, camera: eng.camera, time: eng.time });
    },
    stats: function () { return { tier: S.tier, alphaAlive: S.A ? S.A.alive : 0, addAlive: S.B ? S.B.alive : 0, alphaCap: S.T.alpha, addCap: S.T.add, rockets: S.fw.length, hazards: S.hz ? S.hz.items.length : 0 }; },
  };
  if (typeof window !== "undefined") window.__blufoxFX = api;
  return api;
})();
