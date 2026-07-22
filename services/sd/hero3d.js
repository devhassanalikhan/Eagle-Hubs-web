/* Eagle Hubs Software Division v2 — hero3d.js
   Lazy Three.js agent-pipeline visualization.
   Loads Three.js from CDN only when the hero is visible, WebGL is
   available, and the user hasn't asked for reduced motion.
   Falls back silently to the static SVG diagram otherwise. */
(function(){
  'use strict';

  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const mount = document.getElementById('hero-canvas');
  const fallback = document.getElementById('heroFallback');
  if(!mount) return;

  function webglOK(){
    try{
      const c = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
    }catch(e){ return false; }
  }
  if(!webglOK()) return;

  let booted = false;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting && !booted){
        booted = true;
        io.disconnect();
        loadThree();
      }
    });
  }, { rootMargin:'80px' });
  io.observe(mount);

  function loadThree(){
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    s.async = true;
    s.onload = init;
    /* on error: keep SVG fallback, do nothing */
    document.head.appendChild(s);
  }

  function init(){
    const THREE = window.THREE;
    if(!THREE) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 26;

    const renderer = new THREE.WebGLRenderer({ alpha:true, antialias:true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    /* ── node cloud (layered "pipeline" bands) ── */
    const NODE_COUNT = 210;
    const positions = new Float32Array(NODE_COUNT * 3);
    const pts = [];
    for(let i = 0; i < NODE_COUNT; i++){
      /* three loose vertical bands: input → agents → output */
      const band = i % 3;
      const bx = (band - 1) * 7.5;
      const x = bx + (Math.random() - .5) * 6.5;
      const y = (Math.random() - .5) * 15;
      const z = (Math.random() - .5) * 9;
      positions[i*3] = x; positions[i*3+1] = y; positions[i*3+2] = z;
      pts.push(new THREE.Vector3(x, y, z));
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    /* soft round sprite for points */
    const cnv = document.createElement('canvas');
    cnv.width = cnv.height = 64;
    const ctx = cnv.getContext('2d');
    const grad = ctx.createRadialGradient(32,32,0,32,32,32);
    grad.addColorStop(0, 'rgba(235,195,119,1)');
    grad.addColorStop(0.35, 'rgba(217,168,76,0.85)');
    grad.addColorStop(1, 'rgba(217,168,76,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,64,64);
    const sprite = new THREE.CanvasTexture(cnv);

    const pMat = new THREE.PointsMaterial({
      size: 0.55, map: sprite, transparent: true, opacity: 0.9,
      depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true
    });
    group.add(new THREE.Points(pGeo, pMat));

    /* ── connections between near nodes ── */
    const linePos = [];
    for(let i = 0; i < NODE_COUNT; i++){
      for(let j = i + 1; j < NODE_COUNT; j++){
        if(pts[i].distanceTo(pts[j]) < 3.4){
          linePos.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
        }
      }
    }
    const lGeo = new THREE.BufferGeometry();
    lGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePos), 3));
    const lMat = new THREE.LineBasicMaterial({
      color: 0x8fa0bd, transparent: true, opacity: 0.14,
      depthWrite: false, blending: THREE.AdditiveBlending
    });
    group.add(new THREE.LineSegments(lGeo, lMat));

    /* ── traveling pulses along random connections ── */
    const PULSES = 14;
    const pulseGeo = new THREE.BufferGeometry();
    const pulseArr = new Float32Array(PULSES * 3);
    pulseGeo.setAttribute('position', new THREE.BufferAttribute(pulseArr, 3));
    const pulseMat = new THREE.PointsMaterial({
      size: 0.9, map: sprite, transparent: true, opacity: 1,
      depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true
    });
    group.add(new THREE.Points(pulseGeo, pulseMat));

    const segCount = linePos.length / 6;
    const pulses = [];
    for(let i = 0; i < PULSES; i++){
      pulses.push({ seg: Math.floor(Math.random() * segCount), t: Math.random(), speed: 0.004 + Math.random() * 0.008 });
    }

    /* ── interaction state ── */
    let mx = 0, my = 0, tx = 0, ty = 0, scrollY = 0;
    window.addEventListener('pointermove', (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive:true });
    window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive:true });

    function resize(){
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    }
    resize();
    window.addEventListener('resize', resize);

    /* pause when off-screen or tab hidden */
    let running = true;
    const vis = new IntersectionObserver((es) => { running = es[0].isIntersecting; }, { threshold: 0 });
    vis.observe(mount);
    document.addEventListener('visibilitychange', () => { if(document.hidden) running = false; else running = true; });

    let t = 0;
    function animate(){
      requestAnimationFrame(animate);
      if(!running) return;
      t += 0.0035;

      /* smooth mouse follow */
      mx += (tx - mx) * 0.05;
      my += (ty - my) * 0.05;

      group.rotation.y = t + mx * 0.35;
      group.rotation.x = my * 0.22 + Math.sin(t * 0.7) * 0.05;
      group.position.y = Math.min(scrollY, 900) * 0.004;
      camera.position.z = 26 + Math.min(scrollY, 900) * 0.006;

      /* advance pulses */
      const lp = lGeo.attributes.position.array;
      for(let i = 0; i < PULSES; i++){
        const p = pulses[i];
        p.t += p.speed;
        if(p.t >= 1){ p.t = 0; p.seg = Math.floor(Math.random() * segCount); }
        const o = p.seg * 6;
        pulseArr[i*3]   = lp[o]   + (lp[o+3] - lp[o])   * p.t;
        pulseArr[i*3+1] = lp[o+1] + (lp[o+4] - lp[o+1]) * p.t;
        pulseArr[i*3+2] = lp[o+2] + (lp[o+5] - lp[o+2]) * p.t;
      }
      pulseGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    }
    animate();

    /* fade the SVG fallback out once WebGL has rendered a frame */
    if(fallback) requestAnimationFrame(() => fallback.classList.add('hidden'));
  }
})();
