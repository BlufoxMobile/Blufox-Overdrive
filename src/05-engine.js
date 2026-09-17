var Al = class {
    constructor(e) {
      ((this.renderer = new WebGLRenderer({
        canvas: e,
        antialias: !0,
        alpha: !1,
        powerPreference: "high-performance",
        stencil: !1,
      })),
        this.renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2)),
        (this.renderer.outputColorSpace = Ft),
        (this.renderer.toneMapping = cl),
        (this.renderer.toneMappingExposure = 1.1),
        (this.renderer.shadowMap.enabled = !0),
        (this.renderer.shadowMap.type = ba),
        (this.environmentTarget = Kp(this.renderer)),
        (this.look = new vl(this.renderer)),
        (this.camera = new PerspectiveCamera(56, innerWidth / innerHeight, 0.2, 2400)),
        (this.scene = new Scene()),
        (this.scene.environment = this.environmentTarget.texture),
        (this.stage = new Group()),
        this.scene.add(this.stage),
        (this.racerMeshes = []),
        (this.pickupMeshes = []),
        (this.padMeshes = []),
        (this.trapMeshes = []),
        (this.halfWidths = new Array(8).fill(Tl.kartHalfWidth)),
        (this.time = 0),
        (this.lastTrack = -1),
        (this.trackWorld = null),
        (this.frames = null),
        (this.length = 0),
        (this.kartDetail = null),
        this.resize(),
        (this._onResize = () => this.resize()),
        addEventListener("resize", this._onResize));
    }
    get quality() {
      return xu() || "high";
    }
    setQuality(e) {
      if (!Rs[e]) return !1;
      yu(e);
      let t = this.lastTrack;
      return (this.disposeKarts(), t >= 0 && ((this.lastTrack = -1), this.loadTrack(t)), !0);
    }
    resize() {
      let e = Math.max(1, innerWidth),
        t = Math.max(1, innerHeight);
      (this.renderer.setSize(e, t),
        (this.camera.aspect = e / t),
        this.camera.updateProjectionMatrix(),
        this.look && this.look.resize());
    }
    frame(e, t = 0, i = 0) {
      return this.trackWorld.sampleAt(e, t, i);
    }
    curvature(e) {
      return this.trackWorld.curvature(e);
    }
    laneLimit(e, t, i) {
      return this.trackWorld.laneLimitAt(e, t, i);
    }
    disposeKarts() {
      for (let e of this.racerMeshes) (e.parent && e.parent.remove(e), Su(e));
      this.racerMeshes = [];
    }
    loadTrack(e) {
      if (this.lastTrack === e) return;
      BFX_HOOKS.fire("trackDispose", { engine: this, index: this.lastTrack });
      ((this.lastTrack = e),
        this.disposeKarts(),
        this.trackWorld && (this.trackWorld.dispose(), (this.trackWorld = null)),
        this.scene.remove(this.stage),
        _1(this.stage),
        (this.stage = new Group()),
        this.scene.add(this.stage),
        (this.pickupMeshes = []),
        (this.padMeshes = []),
        (this.trapMeshes = []));
      let t = Li[e];
      this.track = t;
      let i = this.quality;
      ((this.scene.background = null),
        (this.scene.fog = new FogExp2(t.fog, e === 5 ? 0.0012 : e === 2 ? 0.0015 : 0.0019)),
        this.stage.add(Zp(e)),
        (this.panorama = bfxPanorama(e)),
        this.stage.add(this.panorama),
        (this.sunSprite = bfxSunSprite(e)),
        this.sunSprite && this.stage.add(this.sunSprite));
      let r = Af(e, {
        quality: i,
      });
      ((this.trackWorld = r),
        this.stage.add(r.group),
        (this.panorama.position.y = r.frames.reduce((q, f) => q + f.p.y, 0) / r.frames.length + 1.2),
        (this.frames = r.frames),
        (this.length = r.length),
        (this.curve = r.curve));
      let s = new HemisphereLight(12965375, t.ground, 2.25);
      this.stage.add(s);
      let a = new DirectionalLight(16777215, 2.1);
      (a.position.set(-30, 50, 25),
        (a.castShadow = !0),
        a.shadow.mapSize.set(1024, 1024),
        (this.sun = a),
        this.stage.add(a),
        this.stage.add(a.target));
      let o = new DirectionalLight(t.neon, 1.7);
      (o.position.set(70, 20, -80), this.stage.add(o), Sa(this.renderer, this.scene, e));
      let c = i === "low" ? "low" : "high";
      this.kartDetail = c;
      for (let l = 0; l < 8; l++) {
        let h = Mu(l, {
          detail: c,
        });
        ((h.visible = !1), this.racerMeshes.push(h), this.stage.add(h), (this.halfWidths[l] = w1(h)));
      }
      (this.buildProps(t), (this.time = 0));
      BFX_HOOKS.fire("trackLoaded", { engine: this, index: e, track: t, trackWorld: r, stage: this.stage, scene: this.scene, quality: i });
    }
    buildProps(e) {
      let t = new BoxGeometry(1.65, 1.65, 1.65),
        i = new MeshStandardMaterial({
          color: 10053631,
          emissive: 5579485,
          emissiveIntensity: 1.5,
          metalness: 0.4,
          roughness: 0.16,
          transparent: !0,
          opacity: 0.92,
        }),
        r = new LineBasicMaterial({
          color: 15257599,
        });
      for (let d = 0; d < 15; d++) {
        let m = new Group(),
          x = new Mesh(t, i);
        (m.add(x), m.add(new LineSegments(new EdgesGeometry(t), r)), this.stage.add(m), this.pickupMeshes.push(m));
      }
      let s = new Color(e.neon),
        a = new MeshBasicMaterial({
          color: s.clone().multiplyScalar(0.13),
        }),
        o = new MeshBasicMaterial({
          color: s,
          side: ii,
        }),
        c = new MeshBasicMaterial({
          color: s.clone().lerp(Lf, 0.25),
          transparent: !0,
          opacity: 0.42,
          depthWrite: !1,
          side: ii,
        }),
        l = new MeshBasicMaterial({
          color: s.clone().lerp(Lf, 0.48),
          transparent: !0,
          opacity: 0.92,
          depthWrite: !1,
        }),
        h = b1(5.4, 7),
        p = If(5.86, 7.46, 0.23),
        u = If(5.06, 6.66, 0.1),
        f = M1(1.8, 1.62, 0.95);
      for (let d = 0; d < 8; d++) {
        let m = new Group(),
          x = new Mesh(h, a);
        ((x.position.y = 0.02), m.add(x));
        let b = new Mesh(p, o);
        ((b.position.y = 0.022), m.add(b));
        let w = new Mesh(u, c);
        ((w.position.y = 0.05), (w.renderOrder = 2), m.add(w));
        let A = [];
        for (let C = 0; C < 3; C++) {
          let F = new Mesh(f, l);
          (F.position.set(0, 0.052, -1.95 + C * 1.95), (F.renderOrder = 3), m.add(F), A.push(F));
        }
        ((m.userData.chevrons = A), this.stage.add(m), this.padMeshes.push(m));
      }
      let g = new TorusGeometry(1.5, 0.19, 6, 18),
        y = new MeshBasicMaterial({
          color: 16737209,
        });
      for (let d = 0; d < 20; d++) {
        let m = new Mesh(g, y);
        ((m.rotation.x = Math.PI / 2), (m.visible = !1), this.stage.add(m), this.trapMeshes.push(m));
      }
      ((this.particleData = Array.from(
        {
          length: Ia,
        },
        () => ({
          life: 0,
          v: new Vector3(),
        }),
      )),
        (this.particlePositions = new Float32Array(Ia * 3)),
        (this.particleColors = new Float32Array(Ia * 3)),
        this.particlePositions.fill(-9999));
      let v = new BufferGeometry();
      (v.setAttribute("position", new BufferAttribute(this.particlePositions, 3)),
        v.setAttribute("color", new BufferAttribute(this.particleColors, 3)),
        (this.particles = new Points(
          v,
          new PointsMaterial({
            size: 0.55,
            vertexColors: !0,
            transparent: !0,
            opacity: 0.92,
            depthWrite: !1,
            sizeAttenuation: !0,
          }),
        )),
        (this.particles.frustumCulled = !1),
        this.stage.add(this.particles),
        (this.particleCursor = 0));
    }
    spark(e, t, i, r, s, a) {
      for (let o = 0; o < s; o++) {
        let c = this.particleCursor++ % Ia,
          l = this.particleData[c],
          h = c * 3;
        ((l.life = 0.25 + Math.random() * 0.35),
          l.v
            .copy(t)
            .multiplyScalar(-a)
            .addScaledVector(i, (Math.random() - 0.5) * 9),
          (l.v.y = 1 + Math.random() * 3),
          this.particlePositions.set([e.x, e.y, e.z], h),
          this.particleColors.set([r.r, r.g, r.b], h));
      }
    }
    sync(e, t) {
      this.time += t;
      let i = e.player,
        r = this.length;
      for (let o of e.racers) {
        let c = this.racerMeshes[o.id];
        if (!c) continue;
        c.visible = !0;
        let l = this.frame(o.distance / r, o.lane, Pf);
        c.position.copy(l.p);
        let h = Math.atan2(l.dir.x, l.dir.z) + (o.drifting ? -o.driftDir * 0.3 : -(o.steer || 0) * 0.14);
        (c.rotation.set(-Math.asin(Math.max(-1, Math.min(1, l.dir.y))), h, 0),
          o.stun > 0 && (c.rotation.y += Math.sin(o.stun * 12) * 0.35));
        let p = S1;
        ((p.speed = o.speed),
          (p.speedN = o.speed / 56),
          (p.steer = o.steer || 0),
          (p.drift = o.drifting ? Math.min(1, o.drift / 3.2) : 0),
          (p.driftDir = o.driftDir || 0),
          (p.boost = o.boost),
          (p.airborne = !1),
          pf(c, p, t),
          (c.userData.shield.visible = o.shield > 0));
      }
      (e.pickups.forEach((o, c) => {
        let l = this.pickupMeshes[c];
        if (!l) return;
        let h = this.frame(o.distance / r, o.lane, 2 + Math.sin(this.time * 2 + c) * 0.3);
        (l.position.copy(h.p),
          l.rotation.set(this.time * 0.6 + c, this.time + c, Math.PI / 4),
          (l.visible = o.cooldown <= 0));
      }),
        e.pads.forEach((o, c) => {
          let l = this.padMeshes[c];
          if (!l) return;
          let h = this.frame(o.distance / r, o.lane, 0.06);
          (l.position.copy(h.p), (l.rotation.y = Math.atan2(h.dir.x, h.dir.z)));
          let p = l.userData.chevrons;
          if (p)
            for (let u = 0; u < p.length; u++) {
              let f = p[u],
                g = 0.5 + 0.5 * Math.sin(this.time * 4.2 - u * 1.15),
                y = 0.84 + g * 0.26;
              (f.scale.set(y, 1, y), (f.position.z = -1.95 + u * 1.95 + g * 0.22));
            }
        }),
        this.trapMeshes.forEach((o, c) => {
          let l = e.traps[c];
          ((o.visible = !!l),
            l && (o.position.copy(this.frame(l.distance / r, l.lane, 0.3).p), (o.rotation.z = this.time * 2)));
        }));
      for (let o = 0; o < Ia; o++) {
        let c = this.particleData[o];
        if (c.life > 0) {
          c.life -= t;
          let l = o * 3;
          ((this.particlePositions[l] += c.v.x * t),
            (this.particlePositions[l + 1] += c.v.y * t),
            (this.particlePositions[l + 2] += c.v.z * t),
            (c.v.y -= 8 * t),
            c.life <= 0 && (this.particlePositions[l + 1] = -9999));
        }
      }
      let s = Ut(i.distance, r) / r;
      if (i.drifting && i.drift > 0.25) {
        let o = this.frame(s - 1 / r, i.lane, 0.3);
        (El.setHex(i.drift > 1.9 ? 16753743 : 6744831), this.spark(o.p, o.dir, o.right, El, 4, 8));
      }
      if (i.wallScrape > 0.05 && this.trackWorld) {
        let o = this.trackWorld.contactPoint(i);
        (El.setHex(16765562), this.spark(o.p, o.dir, o.right, El, Math.min(4, 1 + Math.round(i.wallScrape * 3)), 5));
      }
      ((this.particles.geometry.attributes.position.needsUpdate = !0),
        (this.particles.geometry.attributes.color.needsUpdate = !0));
      let a = this.frame(s, i.lane);
      this.aimSun(a.p);
      BFX_HOOKS.fire("frame", { engine: this, race: e, dt: t, player: i, scene: this.scene, camera: this.camera, time: this.time });
      (this.look.render(this.scene, this.camera, i.boost > 0 ? 1 : 0, Iu.has(this.lastTrack)));
    }
    // shadow box (±radius) centred a little ahead of the camera along its view, at road height
    aimSun(p) {
      let t = this.sun.target.position,
        c = this.camera,
        d = c.getWorldDirection(bfxTmpD);
      ((d.y = 0), d.lengthSq() > 1e-4 ? d.normalize() : d.set(0, 0, -1));
      let r = (Cs(this.lastTrack).sun.radius || 40) * 0.55;
      (t.set(c.position.x + d.x * r, p.y, c.position.z + d.z * r), this.sun.target.updateMatrixWorld());
      if (this.sunSprite && this.panorama) {
        // place the glow on whichever mirrored sun copy is most in front of the camera
        let dirs = this.panorama.userData.sunDirs,
          f = c.getWorldDirection(bfxTmpD),
          best = null,
          bd = -2;
        for (let q of dirs) {
          let k = q.dot(f);
          k > bd && ((bd = k), (best = q));
        }
        ((this.sunSprite.visible = bd > 0.2),
          best && (this.sunSprite.position.copy(c.position).addScaledVector(best, 1400), this.sunSprite.quaternion.copy(c.quaternion)));
      }
    }
    portraits() {
      let e = new Scene();
      ((e.environment = this.environmentTarget.texture), e.add(new HemisphereLight(12184063, 2303047, 2.2)));
      let t = new DirectionalLight(16777215, 3.1);
      (t.position.set(4, 7, 5), e.add(t));
      let i = new DirectionalLight(8877311, 2.2);
      (i.position.set(-5, 3, -5), e.add(i));
      let r = new PerspectiveCamera(33, 1.2, 0.1, 100);
      (r.position.set(6, 4.1, 8), r.lookAt(0, 1.2, 0));
      let s = this.renderer.getPixelRatio(),
        a = this.renderer.toneMapping,
        o = this.renderer.toneMappingExposure;
      ((this.renderer.toneMapping = cl),
        (this.renderer.toneMappingExposure = 1.05),
        this.renderer.setPixelRatio(1),
        this.renderer.setSize(600, 500, !1),
        this.renderer.setClearColor(0, 0));
      let c = [];
      for (let l = 0; l < 8; l++) {
        let h = Mu(l);
        (e.add(h),
          this.renderer.render(e, r),
          c.push(this.renderer.domElement.toDataURL("image/png")),
          e.remove(h),
          Su(h));
      }
      return (
        this.renderer.setClearColor(0, 1),
        (this.renderer.toneMapping = a),
        (this.renderer.toneMappingExposure = o),
        this.renderer.setPixelRatio(s),
        this.resize(),
        c
      );
    }
    thumbnail(e) {
      this.loadTrack(e);
      let t = this.renderer.getPixelRatio(),
        i = this.camera.fov;
      (this.renderer.setPixelRatio(1),
        this.renderer.setSize(640, 256, !1),
        this.look.resize(),
        (this.camera.aspect = 640 / 256),
        (this.camera.fov = 44),
        this.camera.updateProjectionMatrix());
      let r = Cf[e] !== void 0 ? Cf[e] : 0.11,
        s = Rf[e] !== void 0 ? Rf[e] : 10.5,
        a = this.frame(r, -0.6, 3.1),
        o = this.frame(r + 15 / this.length, 0, 1.55);
      (this.camera.position.copy(a.p), this.camera.lookAt(o.p));
      let c = this.racerMeshes[0],
        l = this.frame(r + s / this.length, 1.6, Pf);
      ((c.visible = !0),
        c.position.copy(l.p),
        c.rotation.set(-Math.asin(Math.max(-1, Math.min(1, l.dir.y))), Math.atan2(l.dir.x, l.dir.z), 0),
        this.aimSun(l.p),
        this.look.render(this.scene, this.camera, 0, Iu.has(e)));
      let h = this.renderer.domElement.toDataURL("image/webp", 0.82);
      return ((c.visible = !1), this.renderer.setPixelRatio(t), (this.camera.fov = i), this.resize(), h);
    }
    renderPreview(e) {
      if (!this.frames) return;
      this.time += e;
      let t = this.frame(Ut(this.time * 0.009, 1), 0, 34),
        i = this.frame(Ut(this.time * 0.009 + 0.03, 1));
      (this.camera.position.copy(t.p).addScaledVector(t.right, 40),
        this.camera.lookAt(i.p),
        this.look.render(this.scene, this.camera, 0, Iu.has(this.lastTrack)));
    }
  },
  Lf = new Color(16777215),
  bfxTmpD = new Vector3();
function b1(n, e) {
  let t = new PlaneGeometry(n, e);
  return (t.rotateX(-Math.PI / 2), t);
}
function If(n, e, t) {
  let i = new BufferGeometry(),
    r = n / 2,
    s = e / 2,
    a = r - t,
    o = s - t,
    c = new Float32Array([-r, 0, -s, r, 0, -s, r, 0, s, -r, 0, s, -a, 0, -o, a, 0, -o, a, 0, o, -a, 0, o]);
  i.setAttribute("position", new BufferAttribute(c, 3));
  let l = new Float32Array(24);
  for (let p = 1; p < 24; p += 3) l[p] = 1;
  i.setAttribute("normal", new BufferAttribute(l, 3));
  let h = [];
  for (let p = 0; p < 4; p++) {
    let u = p,
      f = (p + 1) % 4,
      g = 4 + ((p + 1) % 4),
      y = 4 + p;
    h.push(u, g, f, u, y, g);
  }
  return (i.setIndex(h), i);
}
function M1(n, e, t) {
  let i = new BufferGeometry(),
    r = new Float32Array([-n, 0, 0, 0, 0, e, 0, 0, e - t, -n, 0, -t, 0, 0, e, n, 0, 0, n, 0, -t, 0, 0, e - t]);
  i.setAttribute("position", new BufferAttribute(r, 3));
  let s = new Float32Array(24);
  for (let a = 1; a < 24; a += 3) s[a] = 1;
  return (i.setAttribute("normal", new BufferAttribute(s, 3)), i.setIndex([0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7]), i);
}
var S1 = {
    speed: 0,
    speedN: 0,
    steer: 0,
    drift: 0,
    driftDir: 0,
    boost: 0,
    airborne: !1,
  },
  El = new Color(),
  Da = new Box3(),
  Df = new Box3();
function w1(n) {
  return (
    n.updateWorldMatrix(!0, !0),
    Da.makeEmpty(),
    n.traverse((e) => {
      !e.isMesh ||
        !e.castShadow ||
        !e.geometry ||
        (e.geometry.boundingBox || e.geometry.computeBoundingBox(),
        Df.copy(e.geometry.boundingBox).applyMatrix4(e.matrixWorld),
        Da.union(Df));
    }),
    Da.isEmpty() ? Tl.kartHalfWidth : Math.max(-Da.min.x, Da.max.x)
  );
}
