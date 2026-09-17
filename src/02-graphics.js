var As = [
    {
      name: "Chicago Afterglow",
      sky: {
        top: 0x0d1a6b,
        mid: 0x3d3aa8,
        horizon: 3291762,
        ground: 2239064,
        haze: 3833792,
        hazeAmt: 0.2,
        sun: [-0.5, 0.2, -0.72],
        sunColor: 16757370,
        sunStrength: 0.1,
        stars: 0.3,
        neb: 0,
        nebColor: 0,
        nebAxis: [0, 1, 0],
      },
      env: {
        intensity: 1.62,
        shapes: [
          ["card", 0, 46, -14, 90, 90, 0.26, 0.34, 0.66],
          ["card", -30, 9, 10, 8, 34, 0.14, 2.6, 3.4],
          ["card", 32, 7, -16, 7, 28, 2.3, 0.5, 3.2],
          ["card", 0, 17, -48, 40, 24, 0.7, 0.88, 1.3],
          ["card", 22, 4, 27, 14, 8, 1.6, 1, 0.52],
          ["cols", 18, 44, 14, 3.2, 30, 0.3, 0.52, 1.05, 0.85],
          ["ball", -16, 3, 34, 1.1, 6, 3.2, 1.2],
          ["ball", 20, 3, -36, 1, 1.2, 4, 6],
          ["band", -2.5, 52, 5, 0.1, 0.26, 0.46],
          ["card", 0, -10, 0, 140, 140, 0.04, 0.055, 0.1],
        ],
      },
      fog: {
        tint: 0.94,
        density: 0.00185,
      },
      sun: {
        color: 0xbfcdff,
        intensity: 1.55,
        radius: 40,
        dir: [-0.5, 0.55, -0.67],
      },
      hemi: {
        sky: 0x6f6bff,
        ground: 0x1c1a48,
        intensity: 0.95,
      },
      rim: {
        color: 0xd96bff,
        intensity: 1.9,
      },
      pano: { horizonV: 0.56, sunU: 0.5, sunV: 0.5, bright: 1.05, flare: 0, fog: 0x2a2a6a, haze: 0.22 },
      grade: {
        exposure: 1.05,
        bloom: 0.34,
        threshold: 0.85,
        sat: 1.1,
        lift: [0.002, 0.006, 0.016],
        gain: [1, 1.01, 1.05],
        gamma: [1, 1, 0.985],
        vig: 0.17,
      },
    },
    {
      name: "Xfinity Megastore",
      sky: {
        top: 0x6e79be,
        mid: 0x8494e5,
        horizon: 13617636,
        ground: 9275312,
        haze: 16773375,
        hazeAmt: 0.1,
        sun: [-0.5, 0.36, -0.72],
        sunColor: 16777215,
        sunStrength: 0.03,
        stars: 0,
        neb: 0,
        nebColor: 0,
        nebAxis: [0, 1, 0],
      },
      env: {
        intensity: 1.25,
        shapes: [
          ["card", -26, 30, -22, 16, 16, 3.3, 3.35, 3.55],
          ["card", 0, 30, -22, 16, 16, 3.3, 3.35, 3.55],
          ["card", 26, 30, -22, 16, 16, 3.3, 3.35, 3.55],
          ["card", -26, 30, 0, 16, 16, 3, 3.05, 3.25],
          ["card", 0, 31, 0, 16, 16, 3.6, 3.62, 3.8],
          ["card", 26, 30, 0, 16, 16, 3, 3.05, 3.25],
          ["card", -26, 30, 22, 16, 16, 3.3, 3.35, 3.55],
          ["card", 0, 30, 22, 16, 16, 3.3, 3.35, 3.55],
          ["card", 26, 30, 22, 16, 16, 3.3, 3.35, 3.55],
          ["card", -42, 10, 0, 22, 40, 0.95, 0.42, 2.15],
          ["card", 42, 8, 0, 18, 34, 0.32, 1.7, 2.3],
          ["band", 16, 50, 9, 0.55, 0.56, 0.7],
          ["card", 0, -11, 0, 150, 150, 0.3, 0.31, 0.37],
        ],
      },
      fog: {
        tint: 0.97,
        density: 0.0015,
      },
      sun: {
        color: 0xf2f6ff,
        intensity: 2.6,
        radius: 40,
        dir: [-0.3, 0.9, -0.32],
      },
      hemi: {
        sky: 0xe4eaff,
        ground: 0x8f94c4,
        intensity: 1.1,
      },
      rim: {
        color: 0x8b5bff,
        intensity: 1.3,
      },
      pano: { horizonV: 0.62, sunU: 0.5, sunV: 0.1, bright: 1.0, flare: 0, fog: 0x9aa2d6, haze: 0.18 },
      grade: {
        exposure: 1,
        bloom: 0.28,
        threshold: 1,
        sat: 1.07,
        lift: [0.004, 0.004, 0.008],
        gain: [1.02, 1.01, 1.02],
        gamma: [1, 1, 0.998],
        vig: 0.14,
      },
    },
    {
      name: "Lakefront Rush",
      sky: {
        top: 0x4a86d0,
        mid: 0x9fb0d0,
        horizon: 14280681,
        ground: 10272976,
        haze: 16761462,
        hazeAmt: 0.18,
        sun: [-0.5, 0.14, -0.72],
        sunColor: 16766106,
        sunStrength: 1,
        stars: 0,
        neb: 0,
        nebColor: 0,
        nebAxis: [0, 1, 0],
      },
      env: {
        intensity: 1.12,
        shapes: [
          ["ball", -34, 10, -49, 4.2, 50, 33, 17],
          ["card", 0, 44, 0, 90, 90, 0.9, 1.35, 2.2],
          ["card", 34, 6, 40, 40, 14, 0.95, 0.92, 0.86],
          ["card", -20, 22, 30, 22, 10, 1.65, 1.62, 1.58],
          ["card", 26, 26, -30, 18, 8, 1.1, 1.14, 1.22],
          ["band", 1.2, 56, 3.2, 0.72, 0.8, 0.86],
          ["card", 0, -10, 0, 160, 160, 0.17, 0.34, 0.44],
        ],
      },
      fog: {
        tint: 0.97,
        density: 92e-5,
      },
      sun: {
        color: 0xffd39a,
        intensity: 3.3,
        radius: 40,
        dir: [-0.5, 0.36, -0.79],
      },
      hemi: {
        sky: 0x9ac6ff,
        ground: 0x2f6f80,
        intensity: 0.55,
      },
      rim: {
        color: 0xffb070,
        intensity: 0.9,
      },
      pano: { horizonV: 0.505, sunU: 0.5, sunV: 0.475, bright: 1.08, flare: 1, fog: 0xc9b08e, haze: 0.28 },
      grade: {
        exposure: 0.97,
        bloom: 0.22,
        threshold: 1.15,
        sat: 1.17,
        lift: [0.008, 0.004, -0.002],
        gain: [1.05, 1.012, 0.962],
        gamma: [0.988, 1, 1.018],
        vig: 0.15,
      },
    },
    {
      name: "Frostbyte Summit",
      sky: {
        top: 0x124793,
        mid: 0x3c78d8,
        horizon: 13821428,
        ground: 11127006,
        haze: 15135743,
        hazeAmt: 0.14,
        sun: [-0.42, 0.28, -0.75],
        sunColor: 16774368,
        sunStrength: 0.8,
        stars: 0,
        neb: 0,
        nebColor: 0,
        nebAxis: [0, 1, 0],
      },
      env: {
        intensity: 0.68,
        shapes: [
          ["card", 0, 46, 0, 120, 120, 1.3, 1.46, 1.76],
          ["ball", -30, 26, -40, 9, 7.6, 7.3, 6.6],
          ["band", 4, 54, 15, 0.085, 0.115, 0.175],
          ["band", 14, 54, 7, 0.4, 0.5, 0.66],
          ["card", 34, 12, 30, 26, 12, 0.3, 0.36, 0.5],
          ["card", 0, -10, 0, 180, 180, 0.46, 0.52, 0.6],
        ],
      },
      fog: {
        tint: 0.86,
        density: 0.00118,
      },
      sun: {
        color: 0xd6e6ff,
        intensity: 2.3,
        radius: 40,
        dir: [-0.42, 0.6, -0.7],
      },
      hemi: {
        sky: 0x8fb4ff,
        ground: 0x8fd8c0,
        intensity: 0.6,
      },
      rim: {
        color: 0x7dffc8,
        intensity: 1.0,
      },
      pano: { horizonV: 0.5, sunU: 0.5, sunV: 0.5, bright: 1.05, flare: 0, fog: 0x7a8fd0, haze: 0.3 },
      grade: {
        exposure: 0.93,
        bloom: 0.2,
        threshold: 1.2,
        sat: 1.09,
        lift: [-0.004, 0, 0.008],
        gain: [0.988, 1.005, 1.048],
        gamma: [1.03, 1.008, 0.982],
        vig: 0.18,
      },
    },
    {
      name: "Signal Canyon",
      sky: {
        top: 0x5a2f70,
        mid: 0xc04a30,
        horizon: 10374229,
        ground: 5450042,
        haze: 16745538,
        hazeAmt: 0.155,
        sun: [-0.56, 0.075, -0.72],
        sunColor: 16747584,
        sunStrength: 0.85,
        stars: 0.16,
        neb: 0,
        nebColor: 0,
        nebAxis: [0, 1, 0],
      },
      env: {
        intensity: 1.05,
        shapes: [
          ["ball", -38, 5, -49, 4.6, 30, 11, 3.4],
          ["card", 0, 40, 0, 90, 90, 0.3, 0.22, 0.56],
          ["band", 6, 50, 14, 0.175, 0.075, 0.055],
          ["card", -24, 14, -40, 30, 16, 1.85, 0.78, 0.34],
          ["card", 40, 16, 34, 30, 22, 0.3, 0.34, 0.86],
          ["ball", 30, 2, 24, 0.8, 3, 0.9, 4],
          ["card", 0, -10, 0, 150, 150, 0.2, 0.085, 0.06],
        ],
      },
      fog: {
        tint: 0.8,
        density: 0.0019,
      },
      sun: {
        color: 0xffa658,
        intensity: 2.7,
        radius: 40,
        dir: [-0.54, 0.34, -0.79],
      },
      hemi: {
        sky: 0xd48a6a,
        ground: 0x5c2a18,
        intensity: 0.48,
      },
      rim: {
        color: 0xff7a40,
        intensity: 1.1,
      },
      pano: { horizonV: 0.5, sunU: 0.5, sunV: 0.49, bright: 1.05, flare: 0.9, fog: 0xb86a3a, haze: 0.28 },
      grade: {
        exposure: 0.92,
        bloom: 0.28,
        threshold: 1,
        sat: 1.06,
        lift: [0.004, -0.002, 0.006],
        gain: [1.015, 0.992, 1.005],
        gamma: [0.995, 1.005, 1.005],
        vig: 0.21,
      },
    },
    {
      name: "Gigabit Galaxy",
      sky: {
        top: 0x1e1a6a,
        mid: 0x4d4fb0,
        horizon: 790316,
        ground: 131854,
        groundMix: 0.35,
        haze: 4861850,
        hazeAmt: 0.12,
        sun: [-0.5, 0.2, -0.72],
        sunColor: 10467071,
        sunStrength: 0.2,
        stars: 1,
        neb: 0.34,
        nebColor: 3811962,
        nebAxis: [0.42, 0.3, -0.86],
      },
      env: {
        intensity: 2.05,
        shapes: [
          ["card", -40, 11, -12, 12, 36, 1.9, 0.62, 3.4],
          ["card", 40, 7, 16, 10, 30, 0.34, 2.6, 3.3],
          ["card", 0, 40, -28, 30, 30, 1.9, 2, 2.55],
          ["cols", 9, 46, 6, 1.6, 14, 0.9, 0.35, 2.2, 0.9],
          ["ball", -12, 20, 40, 1.6, 3, 3.4, 5],
          ["band", -4, 44, 3, 0.06, 0.2, 0.34],
          ["card", 0, -11, 0, 120, 120, 0.075, 0.09, 0.24],
        ],
      },
      fog: {
        tint: 0.95,
        density: 0.00105,
      },
      sun: {
        color: 0xb8a8ff,
        intensity: 1.5,
        radius: 40,
        dir: [-0.48, 0.62, -0.62],
      },
      hemi: {
        sky: 0x7d74ff,
        ground: 0x0e1638,
        intensity: 0.72,
      },
      rim: {
        color: 0x5df0ff,
        intensity: 2.1,
      },
      pano: { horizonV: 0.5, sunU: 0.5, sunV: 0.5, bright: 1.0, flare: 0, fog: 0x2a2e80, haze: 0.16 },
      grade: {
        exposure: 1.04,
        bloom: 0.4,
        threshold: 0.78,
        sat: 1.18,
        lift: [-0.008, -0.008, 0],
        gain: [1, 1, 1.06],
        gamma: [1.02, 1.01, 0.985],
        vig: 0.2,
      },
    },
  ],
  bn = As[0].grade;
function Cs(n) {
  return As[n | 0] || As[0];
}
var fu = "float hash12(vec2 p){vec3 q=fract(vec3(p.xyx)*.1031);q+=dot(q,q.yzx+33.33);return fract((q.x+q.y)*q.z);}",
  Gg = `varying vec3 vDir;
uniform vec3 topColor,midColor,horizonColor,groundColor,hazeColor,sunColor,nebColor,sunDir,nebAxis;
uniform float hazeAmt,hazeLift,hazeSharp,sunStrength,stars,neb,dither;
${fu}
float hash13(vec3 p){p=fract(p*.1031);p+=dot(p,p.yzx+33.33);return fract((p.x+p.y)*p.z);}
void main(){
 vec3 d=normalize(vDir);float h=d.y,up=max(0.,h);
 vec3 c=mix(horizonColor,midColor,smoothstep(0.,.17,up));
 c=mix(c,topColor,smoothstep(.06,.80,up));
 c=mix(c,groundColor,smoothstep(0.,-.13,h));
 c+=hazeColor*hazeAmt*exp(-abs(h-hazeLift)*hazeSharp);
 float a=max(0.,dot(d,sunDir));
 c+=sunColor*(pow(a,26.)*.26+pow(a,300.)*.60+pow(a,5000.)*3.2)*sunStrength;
 if(neb>0.){float b=exp(-pow(dot(d,nebAxis)*2.5,2.));c+=nebColor*b*neb;}
 if(stars>0.){
vec3 s=d*74.,cell=floor(s);float r=hash13(cell+.5);
if(r>.974){vec3 o=vec3(hash13(cell+1.7),hash13(cell+4.1),hash13(cell+7.3))-.5;
 float dist=length(fract(s)-.5-o*.55);
 c+=vec3(.86,.92,1.)*smoothstep(.22,0.,dist)*(r-.974)*26.*stars*smoothstep(-.05,.18,h);}}
 c+=(hash12(gl_FragCoord.xy)-.5)*dither;
 gl_FragColor=vec4(max(c,0.),1.);}`,
  Hg =
    "varying vec3 vDir;void main(){vDir=position;vec4 p=projectionMatrix*mat4(mat3(viewMatrix))*modelMatrix*vec4(position,1.);gl_Position=p.xyww;}",
  Bp = "varying vec3 vDir;void main(){vDir=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
  zp = 0.052,
  kp = 15;
function Gp(n) {
  let e = Cs(n).sky;
  return new Color(e.horizon).add(new Color(e.haze).multiplyScalar(e.hazeAmt * Math.exp(-zp * kp)));
}
function Hp(n, { infinite: e = !0, dither: t = 1 / 255 } = {}) {
  let i = Cs(n).sky,
    r = new Color(i.ground).lerp(new Color(i.horizon), i.groundMix === void 0 ? 0.75 : i.groundMix);
  return new ShaderMaterial({
    side: ai,
    depthWrite: !1,
    depthTest: e,
    fog: !1,
    toneMapped: !1,
    uniforms: {
      topColor: {
        value: new Color(i.top),
      },
      midColor: {
        value: new Color(i.mid),
      },
      horizonColor: {
        value: new Color(i.horizon),
      },
      groundColor: {
        value: r,
      },
      hazeColor: {
        value: new Color(i.haze),
      },
      hazeAmt: {
        value: i.hazeAmt,
      },
      hazeLift: {
        value: zp,
      },
      hazeSharp: {
        value: kp,
      },
      sunColor: {
        value: new Color(i.sunColor),
      },
      sunDir: {
        value: new Vector3(...i.sun).normalize(),
      },
      sunStrength: {
        value: i.sunStrength,
      },
      stars: {
        value: i.stars,
      },
      neb: {
        value: i.neb,
      },
      nebColor: {
        value: new Color(i.nebColor),
      },
      nebAxis: {
        value: new Vector3(...i.nebAxis).normalize(),
      },
      dither: {
        value: t,
      },
    },
    vertexShader: e ? Hg : Bp,
    fragmentShader: Gg,
  });
}
function Vp(n) {
  let e = new Mesh(
    new SphereGeometry(1e3, 32, 20),
    Hp(n, {
      infinite: !0,
      dither: 0.00392156862745098,
    }),
  );
  return ((e.renderOrder = -20), (e.frustumCulled = !1), (e.userData.circuit = n), e);
}
// ---------------------------------------------------------------------------
// Painted panorama backdrop (BFX_ASSETS.skies[i]) wrapped on a camera-locked
// cylinder at ~1500 m. One draw call. The texture is loaded async and cached;
// until it arrives the procedural dome shows through (alpha 0).
// ---------------------------------------------------------------------------
var bfxPanoCache = new Map(), // circuit -> { tex, ready, listeners }
  PANO_R = 1500,
  PANO_ASPECT = 2048 / 878;
function panoHeight() {
  // two mirrored copies around 360°, squashed a little so more of the painting
  // fits inside the chase camera's vertical field of view
  return ((Math.PI * PANO_R) / PANO_ASPECT) * 0.72;
}
function bfxPanoTex(n) {
  n |= 0;
  if (bfxPanoCache.has(n)) return bfxPanoCache.get(n);
  let rec = { tex: null, ready: !1, fns: [] };
  bfxPanoCache.set(n, rec);
  let url = typeof BFX_ASSETS != "undefined" && BFX_ASSETS.skies && BFX_ASSETS.skies[n];
  if (url && typeof Image != "undefined")
    BFX_ASSETS.load(url)
      .then((im) => {
        let t = new Texture(im);
        ((t.colorSpace = Ft),
          (t.wrapS = MirroredRepeatWrapping),
          (t.wrapT = ClampToEdgeWrapping),
          (t.minFilter = Ar),
          (t.magFilter = LinearFilter),
          (t.generateMipmaps = !0),
          (t.anisotropy = 4),
          (t.needsUpdate = !0));
        ((rec.tex = t), (rec.ready = !0));
        let fns = rec.fns;
        rec.fns = [];
        for (let f of fns)
          try {
            f(t);
          } catch {}
      })
      .catch(() => {});
  return rec;
}
function panoOnReady(n, f) {
  let r = bfxPanoTex(n);
  r.ready ? f(r.tex) : r.fns.push(f);
}
var bfxPanoVS = `varying vec2 vUv;varying vec3 vWorld;
void main(){vUv=uv;vec4 w=modelMatrix*vec4(position,1.);vWorld=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}`,
  bfxPanoFS = `varying vec2 vUv;varying vec3 vWorld;
uniform sampler2D map;uniform float ready,bright,horizonV,haze,topFade;uniform vec3 fogColor,topColor;uniform float dither;
${fu}
void main(){
 // v: 0 bottom .. 1 top of the cylinder. Image horizon sits at (1-horizonV).
 float hv=1.-horizonV;
 // remap so the image horizon lands on the cylinder's vertical centre
 float v=vUv.y<.5?mix(0.,hv,vUv.y*2.):mix(hv,1.,(vUv.y-.5)*2.);
 vec3 c=texture2D(map,vec2(vUv.x*2.,v)).rgb*bright;
 float a=ready;
 // fade to the procedural dome at the very top
 float top=smoothstep(1.-topFade,1.,vUv.y);
 a*=1.-top;
 // haze band: blend toward fog colour around/below the horizon
 float below=smoothstep(.5,.30,vUv.y);       // 0 at horizon -> 1 well below
 float near=exp(-abs(vUv.y-.5)*22.);          // thin horizon haze
 c=mix(c,fogColor,clamp(below*.92+near*haze,0.,1.));
 c+=(hash12(gl_FragCoord.xy)-.5)*dither;
 gl_FragColor=vec4(max(c,0.),a);}`;
function bfxPanorama(n) {
  let i = Cs(n),
    po = i.pano || {},
    H = panoHeight(),
    g = new CylinderGeometry(PANO_R, PANO_R, H, 72, 1, !0),
    m = new ShaderMaterial({
      side: ai,
      transparent: !0,
      depthWrite: !1,
      depthTest: !0,
      fog: !1,
      toneMapped: !1,
      uniforms: {
        map: { value: null },
        ready: { value: 0 },
        bright: { value: po.bright === void 0 ? 1 : po.bright },
        horizonV: { value: po.horizonV === void 0 ? 0.5 : po.horizonV },
        haze: { value: po.haze === void 0 ? 0.25 : po.haze },
        topFade: { value: 0.22 },
        fogColor: { value: new Color(0x000000) },
        topColor: { value: new Color(i.sky.top) },
        dither: { value: 1 / 255 },
      },
      vertexShader: bfxPanoVS,
      fragmentShader: bfxPanoFS,
    }),
    e = new Mesh(g, m);
  ((e.renderOrder = -19), (e.frustumCulled = !1), (e.name = "panorama"), (e.userData.circuit = n));
  // rotate so the image centre (sun) faces the circuit's sun bearing
  let sd = i.sun.dir || i.sky.sun,
    bearing = Math.atan2(sd[0], sd[2]);
  e.rotation.y = bearing - Math.PI / 2;
  e.userData.sunDirs = panoSunDirs(n, e.rotation.y);
  e.onBeforeRender = (r, sc, cam) => {
    // camera-locked in XZ: no parallax swim; Y fixed to the track horizon
    ((e.position.x = cam.position.x), (e.position.z = cam.position.z));
    sc.fog && m.uniforms.fogColor.value.copy(sc.fog.color);
  };
  panoOnReady(n, (t) => {
    ((m.uniforms.map.value = t), (m.uniforms.ready.value = 1));
  });
  return e;
}
// depth-tested sun glow sprite: occluded per-pixel by buildings/walls, blooms in post
var bfxSunTex = null;
function bfxSunSprite(n) {
  let i = Cs(n),
    po = i.pano || {};
  if (!po.flare) return null;
  if (!bfxSunTex) {
    let c = document.createElement("canvas");
    c.width = c.height = 128;
    let x = c.getContext("2d"),
      g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
    (g.addColorStop(0, "rgba(255,255,255,1)"),
      g.addColorStop(0.12, "rgba(255,255,255,.85)"),
      g.addColorStop(0.3, "rgba(255,255,255,.28)"),
      g.addColorStop(0.6, "rgba(255,255,255,.07)"),
      g.addColorStop(1, "rgba(255,255,255,0)"),
      (x.fillStyle = g),
      x.fillRect(0, 0, 128, 128));
    // faint horizontal streak
    let h = x.createLinearGradient(0, 64, 128, 64);
    (h.addColorStop(0, "rgba(255,255,255,0)"),
      h.addColorStop(0.5, "rgba(255,255,255,.35)"),
      h.addColorStop(1, "rgba(255,255,255,0)"),
      (x.fillStyle = h),
      x.fillRect(0, 61, 128, 6));
    ((bfxSunTex = new CanvasTexture(c)), (bfxSunTex.colorSpace = Ft));
  }
  let m = new MeshBasicMaterial({
      map: bfxSunTex,
      color: 0xffffff,
      blending: nn,
      depthWrite: !1,
      depthTest: !0,
      transparent: !0,
      toneMapped: !1,
      fog: !1,
      side: ii,
    }),
    sp = new Mesh(new PlaneGeometry(1, 1), m);
  (m.color.setHex(i.sun.color).multiplyScalar(1.15 * po.flare), sp.scale.set(260, 260, 1), (sp.renderOrder = -18), (sp.frustumCulled = !1));
  sp.name = "sunflare";
  return sp;
}
// world-space unit directions (two mirrored copies) to the painted sun
function panoSunDirs(n, rotY) {
  let po = Cs(n).pano || {},
    su = po.sunU === void 0 ? 0.5 : po.sunU,
    sv = po.sunV === void 0 ? 0.5 : po.sunV,
    hz = po.horizonV === void 0 ? 0.5 : po.horizonV,
    H = panoHeight(),
    // image v (from top) -> cylinder height: horizon at 0
    y = sv <= hz ? ((hz - sv) / hz) * H * 0.5 : -((sv - hz) / (1 - hz)) * H * 0.5,
    out = [];
  for (let th of [su * Math.PI, 2 * Math.PI - su * Math.PI]) {
    let x = PANO_R * Math.sin(th),
      z = PANO_R * Math.cos(th),
      c = Math.cos(rotY),
      s = Math.sin(rotY),
      wx = x * c + z * s,
      wz = -x * s + z * c;
    out.push(new Vector3(wx, y, wz).normalize());
  }
  return out;
}
function fl(n, e, t, i = ii) {
  let r = new MeshBasicMaterial({
    side: i,
    toneMapped: !1,
    fog: !1,
  });
  return (r.color.setRGB(n, e, t, LinearSRGBColorSpace), r);
}
function Wp(n) {
  return () => {
    ((n |= 0), (n = (n + 1831565813) | 0));
    let e = Math.imul(n ^ (n >>> 15), 1 | n);
    return ((e = (e + Math.imul(e ^ (e >>> 7), 61 | e)) ^ e), ((e ^ (e >>> 14)) >>> 0) / 4294967296);
  };
}
function Xp(n, e, t) {
  let i = e[0];
  if (i === "card") {
    let [, r, s, a, o, c, l, h, p] = e,
      u = new Mesh(new PlaneGeometry(o, c), fl(l, h, p));
    (u.position.set(r, s, a), u.lookAt(0, 0, 0), n.add(u));
    return;
  }
  if (i === "ball") {
    let [, r, s, a, o, c, l, h] = e,
      p = new Mesh(new SphereGeometry(o, 12, 8), fl(c, l, h, Ni));
    (p.position.set(r, s, a), n.add(p));
    return;
  }
  if (i === "band") {
    let [, r, s, a, o, c, l] = e,
      h = new Mesh(new CylinderGeometry(s, s, a, 40, 1, !0), fl(o, c, l, ai));
    ((h.position.y = r), n.add(h));
    return;
  }
  if (i === "cols") {
    let [, r, s, a, o, c, l, h, p, u] = e;
    for (let f = 0; f < r; f++) {
      let g = (f / r) * Math.PI * 2 + t() * 0.16,
        y = 1 + (t() - 0.35) * (u === void 0 ? 0.8 : u) * 2,
        v = c * (0.55 + t() * 0.9),
        d = new Mesh(new PlaneGeometry(o, v), fl(l * y, h * y, p * y));
      (d.position.set(Math.cos(g) * s, a + (t() - 0.5) * c * 0.35, Math.sin(g) * s),
        d.lookAt(0, d.position.y, 0),
        n.add(d));
    }
    return;
  }
}
var gl = new Map();
function Vg(n) {
  let e = Cs(n),
    t = new Scene(),
    i = new Mesh(
      new SphereGeometry(80, 32, 20),
      Hp(n, {
        infinite: !1,
        dither: 0,
      }),
    );
  ((i.renderOrder = -1), t.add(i));
  let r = Wp(1337 + n * 977);
  for (let s of e.env.shapes) Xp(t, s, r);
  // painted backdrop inside the IBL scene so paint/chrome reflect the real sky
  let pr = bfxPanoTex(n);
  if (pr.ready && pr.tex) {
    let po = e.pano || {},
      H = (Math.PI * 70) / PANO_ASPECT,
      hv = 1 - (po.horizonV === void 0 ? 0.5 : po.horizonV),
      g = new CylinderGeometry(70, 70, H, 48, 1, !0),
      uv = g.attributes.uv;
    for (let k = 0; k < uv.count; k++) {
      let u = uv.getX(k),
        v = uv.getY(k);
      uv.setXY(k, u * 2, v < 0.5 ? hv * v * 2 : hv + (1 - hv) * (v - 0.5) * 2);
    }
    let m = new MeshBasicMaterial({ map: pr.tex, side: ai, toneMapped: !1, fog: !1 }),
      c = new Mesh(g, m);
    let sd = e.sun.dir || e.sky.sun;
    ((c.rotation.y = Math.atan2(sd[0], sd[2]) - Math.PI / 2), (c.renderOrder = 0), t.add(c));
    t.userData.painted = !0;
  }
  return t;
}
var glPainted = new Set();
function mu(n, e) {
  var a;
  let t = e | 0;
  if (gl.has(t)) return gl.get(t);
  let i = Vg(t),
    r = new PMREMGenerator(n);
  (a = r.compileEquirectangularShader) == null || a.call(r);
  let s = r.fromScene(i, 0.035, 0.5, 240);
  i.userData.painted ? glPainted.add(t) : glPainted.delete(t);
  return (
    r.dispose(),
    i.traverse((o) => {
      var c, l;
      ((c = o.geometry) == null || c.dispose(), (l = o.material) == null || l.dispose());
    }),
    gl.set(t, s),
    s
  );
}
// when a painting arrives after its IBL was baked, rebake and re-apply
function panoRebake(n, t) {
  panoOnReady(t, () => {
    if (glPainted.has(t)) return;
    let old = gl.get(t);
    gl.delete(t);
    try {
      let s = mu(n, t);
      old && old !== s && old.dispose();
      kn && kn.index === t && kn.scene && s && s.texture && (kn.scene.environment = s.texture);
    } catch {}
  });
}
function jp(n) {
  let e = 0,
    t = () => {
      for (; e < As.length && gl.has(e);) e++;
      if (!(e >= As.length)) {
        try {
          mu(n, e);
        } catch {}
        (e++, setTimeout(t, 0));
      }
    };
  setTimeout(t, 0);
}
var ml = null;
function qp(n) {
  if (ml) return ml;
  let e = new Scene(),
    t = new Mesh(
      new SphereGeometry(60, 32, 20),
      new ShaderMaterial({
        side: ai,
        depthWrite: !1,
        toneMapped: !1,
        uniforms: {},
        vertexShader: Bp,
        fragmentShader: `varying vec3 vDir;void main(){float h=normalize(vDir).y;
 vec3 c=mix(vec3(.055,.062,.085),vec3(.16,.19,.28),smoothstep(-.6,.5,h));
 c=mix(c,vec3(.30,.35,.48),smoothstep(.25,1.,h));gl_FragColor=vec4(c,1.);}`,
      }),
    );
  ((t.renderOrder = -1), e.add(t));
  let i = Wp(99);
  for (let s of [
    ["card", -14, 11, 4, 16, 16, 3.4, 3.7, 4.3],
    ["card", 14, 6, -6, 11, 20, 0.95, 1.05, 2.3],
    ["card", 0, 20, 2, 34, 10, 4.6, 4.7, 5],
    ["card", 0, 3, 20, 18, 10, 0.55, 1.25, 1.7],
    ["ball", -20, 4, -14, 1.4, 5, 2.4, 1.1],
    ["card", 0, -9, 0, 70, 70, 0.17, 0.19, 0.24],
  ])
    Xp(e, s, i);
  let r = new PMREMGenerator(n);
  return (
    (ml = r.fromScene(e, 0.04, 0.5, 200)),
    r.dispose(),
    e.traverse((s) => {
      var a, o;
      ((a = s.geometry) == null || a.dispose(), (o = s.material) == null || o.dispose());
    }),
    ml
  );
}
var Rs = {
    ultra: {
      msaa: 4,
      bloomDiv: 3,
      bloom: !0,
      shadow: 2048,
      scale: 1,
    },
    high: {
      msaa: 4,
      bloomDiv: 3,
      bloom: !0,
      shadow: 2048,
      scale: 1,
    },
    medium: {
      msaa: 2,
      bloomDiv: 4,
      bloom: !0,
      shadow: 1024,
      scale: 0.85,
    },
    low: {
      msaa: 0,
      bloomDiv: 4,
      bloom: !0,
      shadow: 512,
      scale: 0.72,
    },
  },
  gu = ["ultra", "high", "medium", "low"];
function Wg(n) {
  try {
    let e = n.getContext(),
      t = e.getExtension("WEBGL_debug_renderer_info");
    return t ? String(e.getParameter(t.UNMASKED_RENDERER_WEBGL) || "") : "";
  } catch {
    return "";
  }
}
function Xg(n) {
  if (!n.capabilities.isWebGL2) return "low";
  let t = typeof navigator != "undefined" ? navigator : {},
    i = t.userAgent || "",
    r = Wg(n),
    s = /SwiftShader|Software|llvmpipe|Microsoft Basic/i.test(r),
    a = /Android|iPhone|iPod|Mobile|iPad|Tablet/i.test(i),
    o = t.hardwareConcurrency || 4,
    c = t.deviceMemory || 4;
  return s
    ? "high"
    : a
      ? /iPhone|iPad|iPod/i.test(i) || (/Macintosh/.test(i) && (t.maxTouchPoints | 0) > 1) || /Apple/i.test(r)
        ? "high"
        : o <= 4 || c <= 3
          ? "medium"
          : "high"
      : "ultra";
}
var dn = null,
  kn = null,
  Ma = {
    light: null,
    dir: new Vector3(0, 1, 0),
    dist: 90,
  },
  vu = new Vector3();
function jg() {
  let n = Ma.light;
  !n ||
    !n.parent ||
    !n.target ||
    (vu.copy(n.target.position).addScaledVector(Ma.dir, Ma.dist), n.position.equals(vu) || n.position.copy(vu));
}
function xu() {
  return dn ? dn.tier : null;
}
function yu(n) {
  return !dn || !Rs[n] ? !1 : (dn.setTier(n, !0), kn && Sa(kn.renderer, kn.scene, kn.index), !0);
}
var Yp = "varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}",
  qg = `varying vec2 vUv;uniform sampler2D source;uniform vec2 stepSize;uniform float threshold;
 vec3 tap(vec2 p){vec3 c=texture2D(source,p).rgb;float m=max(c.r,max(c.g,c.b));return c*max(0.,m-threshold)/max(.001,m);}
 void main(){vec3 c=tap(vUv)*.227027;
c+=(tap(vUv+stepSize*1.384615)+tap(vUv-stepSize*1.384615))*.316216;
c+=(tap(vUv+stepSize*3.230769)+tap(vUv-stepSize*3.230769))*.070270;
gl_FragColor=vec4(c,1.);}`,
  Yg = `varying vec2 vUv;
uniform sampler2D source;
#ifdef USE_BLOOM
uniform sampler2D bloom;uniform float bloomStrength;
#endif
uniform float boost,exposure,saturation,vignette,time,grain,aspect;uniform vec3 lift,gain,gammaC;
uniform vec2 texel;
${fu}

vec3 aces(vec3 x){return clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14),0.,1.);}
#ifdef USE_FXAA
// Perceptual luma of an HDR sample: compress first, or a bright sky reads as
// one flat value and every edge in it is missed.
float luma(vec3 c){float l=dot(c,vec3(.299,.587,.114));return l/(1.+l);}
vec3 resolve(){
 vec3 m=texture2D(source,vUv).rgb;
 float lM=luma(m),
lNW=luma(texture2D(source,vUv+vec2(-1.,-1.)*texel).rgb),
lNE=luma(texture2D(source,vUv+vec2( 1.,-1.)*texel).rgb),
lSW=luma(texture2D(source,vUv+vec2(-1., 1.)*texel).rgb),
lSE=luma(texture2D(source,vUv+vec2( 1., 1.)*texel).rgb);
 float lo=min(lM,min(min(lNW,lNE),min(lSW,lSE))),hi=max(lM,max(max(lNW,lNE),max(lSW,lSE)));
 if(hi-lo<max(.0125,hi*.10))return m;
 vec2 dir=vec2(-((lNW+lNE)-(lSW+lSE)),((lNW+lSW)-(lNE+lSE)));
 float red=max((lNW+lNE+lSW+lSE)*.03125,.0078125);
 dir=clamp(dir*(1./(min(abs(dir.x),abs(dir.y))+red)),-8.,8.)*texel;
 vec3 a=.5*(texture2D(source,vUv+dir*(1./3.-.5)).rgb+texture2D(source,vUv+dir*(2./3.-.5)).rgb);
 vec3 b=a*.5+.25*(texture2D(source,vUv-dir*.5).rgb+texture2D(source,vUv+dir*.5).rgb);
 float lB=luma(b);
 return (lB<lo||lB>hi)?a:b;}
#else
vec3 resolve(){return texture2D(source,vUv).rgb;}
#endif
void main(){
 vec2 radial=vUv-.5;
 vec3 c=resolve();
 if(boost>0.){ // boost: radial smear at the frame edge only, centre stays sharp
  float e=smoothstep(.24,.62,length(radial*vec2(aspect,1.)))*boost;
  if(e>0.001){vec2 st=radial*e*.026;vec3 b=vec3(0.);
   for(int i=0;i<5;i++)b+=texture2D(source,vUv-st*(float(i)*.25)).rgb;
   c=mix(c,b*.2,e);}}
#ifdef USE_BLOOM
 c+=texture2D(bloom,vUv).rgb*bloomStrength;
#endif
 c=aces(c*exposure);
 c=pow(c,vec3(1./2.2));
 c=pow(clamp(c*gain+lift,0.,1.),gammaC);          // per-circuit lift/gain/gamma
 float l=dot(c,vec3(.2126,.7152,.0722));
 c=mix(vec3(l),c,saturation);
 float edge=smoothstep(.20,.74,length(radial));
 c*=1.-edge*vignette;
 c+=vec3(.015,.055,.065)*edge*boost;              // boost only: faint cool edge lift
 c+=(hash12(gl_FragCoord.xy)-.5)*(1./255.);       // kill 8-bit gradient banding
 c+=(hash12(gl_FragCoord.xy+vec2(fract(time*7.31)*911.,fract(time*3.17)*577.))-.5)*grain*(1.-l*.55); // film grain, shadows-weighted
 gl_FragColor=vec4(clamp(c,0.,1.),1.);}`,
  vl = class {
    constructor(e) {
      this.renderer = e;
      let t = e.capabilities;
      ((this.maxSamples = t.isWebGL2 ? t.maxSamples | 0 : 0),
        (this.hdr = t.isWebGL2 && e.extensions.has("EXT_color_buffer_float")));
      let i = {
        type: this.hdr ? HalfFloatType : UnsignedByteType,
        minFilter: LinearFilter,
        magFilter: LinearFilter,
        depthBuffer: !0,
        stencilBuffer: !1,
      };
      ((this.target = new WebGLRenderTarget(1, 1, i)),
        (this.blurA = new WebGLRenderTarget(1, 1, {
          ...i,
          depthBuffer: !1,
        })),
        (this.blurB = this.blurA.clone()),
        (this.scene = new Scene()),
        (this.camera = new Camera()),
        (this.quad = new Mesh(new PlaneGeometry(2, 2))),
        (this.quad.frustumCulled = !1),
        this.scene.add(this.quad),
        (this.blur = new ShaderMaterial({
          depthTest: !1,
          depthWrite: !1,
          uniforms: {
            source: {
              value: null,
            },
            stepSize: {
              value: new Vector2(),
            },
            threshold: {
              value: 1,
            },
          },
          vertexShader: Yp,
          fragmentShader: qg,
        })),
        (this.combine = new ShaderMaterial({
          depthTest: !1,
          depthWrite: !1,
          defines: {
            USE_BLOOM: "",
            USE_FXAA: "",
          },
          uniforms: {
            source: {
              value: this.target.texture,
            },
            bloom: {
              value: this.blurB.texture,
            },
            boost: {
              value: 0,
            },
            exposure: {
              value: bn.exposure,
            },
            bloomStrength: {
              value: bn.bloom,
            },
            saturation: {
              value: bn.sat,
            },
            vignette: {
              value: bn.vig,
            },
            texel: {
              value: new Vector2(),
            },
            lift: {
              value: new Vector3(...bn.lift),
            },
            gain: {
              value: new Vector3(...bn.gain),
            },
            gammaC: {
              value: new Vector3(...bn.gamma),
            },
            time: { value: 0 },
            grain: { value: 0.028 },
            aspect: { value: 1 },
          },
          vertexShader: Yp,
          fragmentShader: Yg,
        })),
        (this.track = -1),
        (this.grade = bn),
        (this.frameTimes = []),
        (this.lastFrameStamp = 0),
        (this.tierCooldown = 0),
        (this.autoTier = !0),
        (this.prof = null),
        (this.tier = "high"),
        this.setTier(Xg(e), !1),
        (dn = this),
        typeof window != "undefined" && (window.__blufoxLook = this),
        this.resize());
    }
    setTier(e, t) {
      let i = Rs[e];
      if (!i) return;
      ((this.tier = e),
        (this.spec = i),
        t && (this.autoTier = !1),
        (this.samples = Math.min(i.msaa, this.maxSamples)),
        (this.useFxaa = this.samples < 4));
      let r = this.combine.defines;
      (((r.USE_BLOOM !== void 0) != !!i.bloom || (r.USE_FXAA !== void 0) != !!this.useFxaa) &&
        (i.bloom ? (r.USE_BLOOM = "") : delete r.USE_BLOOM,
        this.useFxaa ? (r.USE_FXAA = "") : delete r.USE_FXAA,
        (this.combine.needsUpdate = !0)),
        this.resize());
    }
    dropTier() {
      let e = gu.indexOf(this.tier);
      return e < 0 || e >= gu.length - 1
        ? !1
        : (this.setTier(gu[e + 1], !1), kn && Sa(kn.renderer, kn.scene, kn.index), !0);
    }
    setTrack(e) {
      let t = Cs(e).grade;
      if (!t) return;
      ((this.track = e), (this.grade = t));
      let i = this.combine.uniforms;
      ((i.exposure.value = t.exposure),
        (i.bloomStrength.value = t.bloom),
        (i.saturation.value = t.sat),
        (i.vignette.value = t.vig),
        i.lift.value.set(...t.lift),
        i.gain.value.set(...t.gain),
        i.gammaC.value.set(...t.gamma));
    }
    resize() {
      let e = this.renderer.getDrawingBufferSize(new Vector2()),
        t = this.spec ? this.spec.scale : 1,
        i = Math.max(1, Math.round(e.x * t)),
        r = Math.max(1, Math.round(e.y * t));
      (this.target.setSize(i, r),
        (this.target.samples = this.samples | 0),
        this.combine.uniforms.texel.value.set(1 / i, 1 / r),
        (this.combine.uniforms.aspect.value = i / r));
      let s = this.spec ? this.spec.bloomDiv : 3,
        a = Math.max(1, Math.floor(i / s)),
        o = Math.max(1, Math.floor(r / s));
      (this.blurA.setSize(a, o), this.blurB.setSize(a, o));
    }
    beginProfile() {
      this.prof = {
        frames: 0,
        scene: 0,
        bloom: 0,
        combine: 0,
        total: 0,
      };
    }
    endProfile() {
      let e = this.prof;
      return ((this.prof = null), e);
    }
    profileReport() {
      let e = this.prof;
      if (!e || !e.frames) return null;
      let t = e.frames;
      return {
        tier: this.tier,
        samples: this.samples,
        fxaa: this.useFxaa,
        bloom: !!this.spec.bloom,
        frames: t,
        size: [this.target.width, this.target.height],
        scene: +(e.scene / t).toFixed(2),
        bloomPass: +(e.bloom / t).toFixed(2),
        combine: +(e.combine / t).toFixed(2),
        total: +(e.total / t).toFixed(2),
      };
    }
    render(e, t, i = 0, r = !1) {
      let s = this.renderer;
      ((this.lastScene = e),
        (this.lastCamera = t),
        jg(),
        e.userData &&
          e.userData.circuit !== void 0 &&
          e.userData.circuit !== this.track &&
          this.setTrack(e.userData.circuit));
      let a = this.grade || bn,
        o = this.spec,
        c = this.prof,
        l = c ? s.getContext() : null,
        h = () => (l && l.finish(), (typeof performance != "undefined" ? performance : Date).now()),
        p = c ? h() : 0;
      (s.setRenderTarget(this.target), s.render(e, t));
      let u = c ? h() : 0;
      if (o.bloom) {
        this.quad.material = this.blur;
        let v = this.blur.uniforms;
        ((v.source.value = this.target.texture),
          v.stepSize.value.set(2 / this.blurA.width, 0),
          (v.threshold.value = r ? Math.max(1.25, a.threshold) : a.threshold),
          s.setRenderTarget(this.blurA),
          s.render(this.scene, this.camera),
          (v.source.value = this.blurA.texture),
          v.stepSize.value.set(0, 2 / this.blurA.height),
          (v.threshold.value = 0),
          s.setRenderTarget(this.blurB),
          s.render(this.scene, this.camera));
      }
      let f = c ? h() : 0;
      this.quad.material = this.combine;
      let g = this.combine.uniforms;
      ((g.time.value = ((typeof performance != "undefined" ? performance : Date).now() % 1e5) / 1e3),
        (g.boost.value = i),
        (g.exposure.value = r ? Math.min(a.exposure, 0.95) : a.exposure),
        (g.bloomStrength.value = r ? Math.min(a.bloom, 0.22) : a.bloom),
        s.setRenderTarget(null),
        s.render(this.scene, this.camera));
      let y = c ? h() : 0;
      (c && (c.frames++, (c.scene += u - p), (c.bloom += f - u), (c.combine += y - f), (c.total += y - p)),
        this.watchdog());
    }
    watchdog() {
      if (!this.autoTier || this.prof) return;
      let e = (typeof performance != "undefined" ? performance : Date).now(),
        t = this.lastFrameStamp;
      if (((this.lastFrameStamp = e), !t)) return;
      let i = e - t;
      if (this.tierCooldown > 0) {
        this.tierCooldown--;
        return;
      }
      if (i > 200) return;
      let r = this.frameTimes;
      if ((r.push(i), r.length < 60)) return;
      r.sort((a, o) => a - o);
      let s = r[r.length >> 1];
      ((this.frameTimes = []),
        s > 26
          ? ((this.slowWindows = (this.slowWindows || 0) + 1),
            this.slowWindows >= 2 && ((this.slowWindows = 0), (this.tierCooldown = 180), this.dropTier()))
          : (this.slowWindows = 0));
    }
    dispose() {
      for (let e of [this.target, this.blurA, this.blurB]) e.dispose();
      for (let e of [this.blur, this.combine]) e.dispose();
      (this.quad.geometry.dispose(), dn === this && (dn = null));
    }
  };
function Zp(n) {
  let e = Vp(n);
  return (
    (e.onBeforeRender = (t, i) => {
      e.userData.applied !== i && ((e.userData.applied = i), Sa(t, i, n));
    }),
    e
  );
}
function Kp(n) {
  n.shadowMap && ((n.shadowMap.enabled = !0), (n.shadowMap.type = ba));
  let e = qp(n);
  return (jp(n), e);
}
function Sa(n, e, t) {
  var c;
  let i = Cs(t);
  if (!i || !e) return;
  ((e.userData.circuit = t),
    (kn = {
      renderer: n,
      scene: e,
      index: t,
    }));
  try {
    let l = mu(n, t);
    l && l.texture && ((e.environment = l.texture), (e.environmentIntensity = i.env.intensity));
  } catch {}
  panoRebake(n, t);
  e.fog &&
    (i.pano && i.pano.fog !== void 0
      ? e.fog.color.setHex(i.pano.fog).multiplyScalar(i.fog.tint === void 0 ? 0.9 : i.fog.tint)
      : e.fog.color.copy(Gp(t)).multiplyScalar(i.fog.tint === void 0 ? 0.9 : i.fog.tint),
    e.fog.density !== void 0 && (e.fog.density = i.fog.density));
  let r = dn ? dn.spec : Rs.high,
    s = ((c = n.capabilities) == null ? void 0 : c.maxTextureSize) || 2048,
    a = Math.min(r.shadow || 0, s),
    o = !1;
  (e.traverse((l) => {
    if (l.isHemisphereLight) {
      (l.color.setHex(i.hemi.sky),
        (l.intensity = i.hemi.intensity),
        i.hemi.ground !== void 0 && l.groundColor.setHex(i.hemi.ground));
      return;
    }
    if (l.isDirectionalLight)
      if (l.shadow && l.shadow.camera && (l.castShadow || l.userData.blufoxSun)) {
        ((l.userData.blufoxSun = !0), l.color.setHex(i.sun.color), (l.intensity = i.sun.intensity), (Ma.light = l));
        let h = i.sun.dir || i.sky.sun;
        if ((Ma.dir.set(h[0], Math.max(h[1], 0.3), h[2]).normalize(), !a)) l.castShadow = !1;
        else {
          l.castShadow = !0;
          let p = l.shadow.camera,
            u = i.sun.radius;
          ((p.left = -u),
            (p.right = u),
            (p.top = u),
            (p.bottom = -u),
            (p.near = 10),
            (p.far = Ma.dist + u * 1.6),
            p.updateProjectionMatrix(),
            l.shadow.mapSize.x !== a &&
              (l.shadow.mapSize.set(a, a), l.shadow.map && (l.shadow.map.dispose(), (l.shadow.map = null))),
            (l.shadow.bias = a >= 2048 ? -12e-5 : -2e-4),
            (l.shadow.normalBias = a >= 2048 ? 0.03 : 0.05),
            (l.shadow.radius = a >= 2048 ? 3 : 2));
        }
      } else o || ((o = !0), (l.intensity = i.rim.intensity), i.rim.color !== void 0 && l.color.setHex(i.rim.color));
  }),
    dn && dn.setTrack(t));
}
typeof window != "undefined" &&
  (window.__blufoxGraphics = {
    setQuality: yu,
    getQuality: xu,
    QUALITY_TIERS: Rs,
  });
