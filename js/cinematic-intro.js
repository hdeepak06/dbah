/**
 * DBAH QUAD DIGITAL LABS — PREMIUM CINEMATIC TYPOGRAPHIC LOGO INTRO CONTROLLER
 * High-Performance Vanilla JavaScript
 * Zero-Gravity 3D Motion Graphics & Precision Typographic Assembly
 *
 * Sequence Timeline (Prompt Spec):
 *  0.0s – 1.5s : Pure black background. Subtle silver light reveals the DBAH wordmark.
 *  1.5s – 3.0s : DBAH letters separate into elegant geometric fragments floating in 3D space.
 *  3.0s – 5.0s : Silver fragments move gracefully in zero gravity with metallic reflections & muted particles.
 *  5.0s – 6.5s : Fragments assemble into the exact DBAH wordmark. Distinctive B design intact.
 *  6.5s – 7.5s : QUAD DIGITAL LABS appears beneath DBAH. Tagline fades in: BUILDING DIGITAL EXPERIENCES.
 *  7.5s – 8.5s : Smooth transition into the existing website.
 */

(function () {
  'use strict';

  // --- CONFIGURATION CONSTANTS ---
  const SESSION_KEY = 'dbah_intro_played_v2';
  const TOTAL_DURATION_MS = 8500; // 8.5 seconds total
  const LOGO_SRC = 'assets/images/dbah-wordmark-transparent.png';

  // Geometric fragment data mapped to the authentic DBAH wordmark
  const FRAGMENTS_DATA = [
    {
      id: 'frag-d-spine',
      cls: 'frag-d-spine',
      tx: -68, ty: -12, tz: 85, rx: 6, ry: -26, rz: -4,
      fx: 1.4, ax: 7, fy: 1.2, ay: 6, fr: 1.1, ar: 3, phase: 0.2
    },
    {
      id: 'frag-d-arch-top',
      cls: 'frag-d-arch-top',
      tx: -46, ty: -48, tz: 120, rx: 20, ry: -18, rz: -2,
      fx: 1.2, ax: 6, fy: 1.5, ay: 8, fr: 1.3, ar: 4, phase: 1.1
    },
    {
      id: 'frag-d-arch-bot',
      cls: 'frag-d-arch-bot',
      tx: -50, ty: 42, tz: 75, rx: -18, ry: -15, rz: 3,
      fx: 1.3, ax: 8, fy: 1.1, ay: 7, fr: 1.0, ar: 3, phase: 2.3
    },
    {
      id: 'frag-b-top-loop',
      cls: 'frag-b-top-loop',
      tx: -15, ty: -58, tz: 145, rx: 26, ry: 15, rz: 6,
      fx: 1.5, ax: 9, fy: 1.3, ay: 10, fr: 1.4, ar: 5, phase: 0.8
    },
    {
      id: 'frag-b-bot-loop',
      cls: 'frag-b-bot-loop',
      tx: 16, ty: 56, tz: 165, rx: -24, ry: -18, rz: -6,
      fx: 1.1, ax: 8, fy: 1.4, ay: 9, fr: 1.2, ar: 4, phase: 1.9
    },
    {
      id: 'frag-b-twist-core',
      cls: 'frag-b-twist-core',
      tx: 0, ty: -8, tz: 220, rx: 10, ry: 38, rz: 0,
      fx: 1.6, ax: 5, fy: 1.6, ay: 6, fr: 1.8, ar: 6, phase: 3.1
    },
    {
      id: 'frag-a-left-beam',
      cls: 'frag-a-left-beam',
      tx: 22, ty: -35, tz: 95, rx: 18, ry: 22, rz: -8,
      fx: 1.3, ax: 7, fy: 1.2, ay: 8, fr: 1.1, ar: 3, phase: 0.5
    },
    {
      id: 'frag-a-right-beam',
      cls: 'frag-a-right-beam',
      tx: 48, ty: 28, tz: 90, rx: -16, ry: -20, rz: 10,
      fx: 1.4, ax: 8, fy: 1.3, ay: 7, fr: 1.2, ar: 4, phase: 1.7
    },
    {
      id: 'frag-a-apex',
      cls: 'frag-a-apex',
      tx: 32, ty: -62, tz: 135, rx: 24, ry: 8, rz: -3,
      fx: 1.2, ax: 6, fy: 1.5, ay: 9, fr: 1.4, ar: 5, phase: 2.8
    },
    {
      id: 'frag-h-left-stem',
      cls: 'frag-h-left-stem',
      tx: 38, ty: -30, tz: 70, rx: 10, ry: 20, rz: 5,
      fx: 1.1, ax: 7, fy: 1.1, ay: 6, fr: 1.0, ar: 3, phase: 1.4
    },
    {
      id: 'frag-h-crossbar',
      cls: 'frag-h-crossbar',
      tx: 60, ty: 8, tz: 130, rx: 26, ry: -15, rz: 2,
      fx: 1.5, ax: 9, fy: 1.4, ay: 7, fr: 1.5, ar: 4, phase: 0.3
    },
    {
      id: 'frag-h-right-stem',
      cls: 'frag-h-right-stem',
      tx: 80, ty: 35, tz: 60, rx: -20, ry: -22, rz: 9,
      fx: 1.3, ax: 8, fy: 1.2, ay: 8, fr: 1.2, ar: 3, phase: 2.1
    },
    {
      id: 'frag-shard-silver-1',
      cls: 'frag-shard-silver-1',
      tx: -95, ty: -50, tz: 110, rx: 35, ry: -30, rz: 12,
      fx: 1.0, ax: 6, fy: 1.0, ay: 6, fr: 1.2, ar: 4, phase: 0.6
    },
    {
      id: 'frag-shard-silver-2',
      cls: 'frag-shard-silver-2',
      tx: 85, ty: -70, tz: 130, rx: 25, ry: 35, rz: -14,
      fx: 1.0, ax: 6, fy: 1.0, ay: 6, fr: 1.2, ar: 4, phase: 2.4
    }
  ];

  // Easing functions for realistic physics
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
  function easeOutQuad(t) {
    return 1 - (1 - t) * (1 - t);
  }
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }
  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  // --- CONTROLLER CLASS ---
  class CinematicIntroController {
    constructor() {
      this.overlay = document.getElementById('cinematic-intro');
      this.canvas = document.getElementById('intro-canvas');
      this.skipBtn = document.getElementById('intro-skip-btn');
      this.stage = document.getElementById('intro-stage');
      this.fragmentsContainer = document.getElementById('intro-fragments-container');
      this.assembledWrap = document.getElementById('intro-assembled-wrap');
      this.lightSweep = document.querySelector('.intro-light-sweep');
      this.taglineWrap = document.getElementById('intro-tagline-wrap');
      this.ambientGlow = document.querySelector('.intro-ambient-glow');
      this.progressFill = document.getElementById('intro-progress-fill');

      this.ctx = null;
      this.particles = [];
      this.fragmentElements = [];
      this.startTime = null;
      this.animationFrameId = null;
      this.isRunning = false;
      this.isDismissed = false;

      // Check if user prefers reduced motion
      this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    init() {
      if (!this.overlay) return;

      // 1. Session check: Run once per browser session unless replayed explicitly
      const alreadyPlayed = sessionStorage.getItem(SESSION_KEY);
      if (alreadyPlayed === 'true' || this.prefersReducedMotion) {
        this.instantDismiss();
        return;
      }

      // 2. Setup canvas
      if (this.canvas) {
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        this.initParticles();
        window.addEventListener('resize', () => this.resizeCanvas(), { passive: true });
      }

      // 3. Populate 3D fragments
      this.buildFragments();

      // 4. Setup event listeners
      this.setupEvents();

      // 5. Preload wordmark asset and start playback
      this.preloadAndStart();
    }

    preloadAndStart() {
      const img = new Image();
      let started = false;

      const launch = () => {
        if (started) return;
        started = true;
        this.startSequence();
      };

      img.onload = launch;
      img.onerror = launch;
      img.src = LOGO_SRC;

      // Safety timeout in case of network stall (starts after 1000ms regardless)
      setTimeout(launch, 1000);
    }

    resizeCanvas() {
      if (!this.canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.canvas.width = window.innerWidth * dpr;
      this.canvas.height = window.innerHeight * dpr;
      if (this.ctx) {
        this.ctx.scale(dpr, dpr);
      }
    }

    initParticles() {
      this.particles = [];
      const isMobile = window.innerWidth <= 768;
      const count = isMobile ? 22 : 45;
      const w = window.innerWidth;
      const h = window.innerHeight;

      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z: Math.random() * 200 - 50,
          vx: (Math.random() - 0.5) * 0.3,
          vy: -Math.random() * 0.4 - 0.1,
          size: Math.random() * 2.0 + 0.8,
          baseAlpha: Math.random() * 0.45 + 0.2,
          alpha: 0,
          pulseSpeed: Math.random() * 0.03 + 0.015,
          pulseOffset: Math.random() * Math.PI * 2,
          isSilver: Math.random() > 0.4 // Silver/platinum emphasis with muted gold
        });
      }
    }

    buildFragments() {
      if (!this.fragmentsContainer) return;
      this.fragmentsContainer.innerHTML = '';
      this.fragmentElements = [];

      FRAGMENTS_DATA.forEach((data) => {
        const el = document.createElement('div');
        el.className = `intro-fragment ${data.cls}`;
        el.setAttribute('aria-hidden', 'true');
        this.fragmentsContainer.appendChild(el);
        this.fragmentElements.push({ el, data });
      });
    }

    setupEvents() {
      // Skip Intro button click
      if (this.skipBtn) {
        this.skipBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.skipIntro();
        });
      }

      // Keyboard navigation (Escape, Spacebar, Enter)
      this.boundKeyHandler = (e) => {
        if (e.key === 'Escape' || e.key === 'Esc') {
          e.preventDefault();
          this.skipIntro();
        }
      };
      window.addEventListener('keydown', this.boundKeyHandler);

      // Replay intro buttons in footer or elsewhere
      const replayBtns = document.querySelectorAll('.footer-replay-btn, [data-action="replay-intro"]');
      replayBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.replayIntro();
        });
      });
    }

    startSequence() {
      this.isRunning = true;
      this.isDismissed = false;
      this.startTime = performance.now();
      document.body.classList.add('intro-active');

      if (this.overlay) {
        this.overlay.classList.remove('intro-hidden', 'intro-fade-fast');
      }

      // Begin animation loop
      this.tick = this.tick.bind(this);
      this.animationFrameId = requestAnimationFrame(this.tick);
    }

    tick(currentTime) {
      if (!this.isRunning || this.isDismissed) return;

      const elapsed = currentTime - this.startTime;
      const progress = Math.min(elapsed / TOTAL_DURATION_MS, 1);

      // Update progress bar
      if (this.progressFill) {
        this.progressFill.style.width = `${(progress * 100).toFixed(1)}%`;
      }

      // 1. Draw Canvas background & silver lighting
      this.renderCanvas(elapsed);

      // 2. Animate 3D Fragments based on timeline
      this.updateFragments(elapsed);

      // 3. Stage & Camera push-in
      this.updateCamera(elapsed);

      // 4. Milestone events
      this.checkMilestones(elapsed);

      // Continue or complete
      if (elapsed < TOTAL_DURATION_MS) {
        this.animationFrameId = requestAnimationFrame(this.tick);
      } else {
        this.completeIntro();
      }
    }

    renderCanvas(elapsed) {
      if (!this.ctx || !this.canvas) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const ctx = this.ctx;

      ctx.clearRect(0, 0, w, h);

      const sec = elapsed / 1000;

      // --- 0–1.5 SECONDS: SUBTLE SILVER LIGHT REVEALS DBAH WORDMARK ---
      if (sec < 1.6) {
        const sweepProgress = Math.min(sec / 1.5, 1);
        const sweepX = w * 0.15 + sweepProgress * (w * 0.7);

        // Vertical soft silver beam scanning across darkness
        const grad = ctx.createRadialGradient(sweepX, h * 0.5, 10, sweepX, h * 0.5, Math.min(w * 0.32, 280));
        const alpha = Math.sin(sweepProgress * Math.PI) * 0.42;
        grad.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.95})`);
        grad.addColorStop(0.35, `rgba(226, 232, 240, ${alpha * 0.6})`);
        grad.addColorStop(0.7, `rgba(148, 163, 184, ${alpha * 0.2})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // Subtle specular floor horizon gleam
        const floorGrad = ctx.createLinearGradient(sweepX - 160, h * 0.72, sweepX + 160, h * 0.72);
        floorGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
        floorGrad.addColorStop(0.5, `rgba(255, 255, 255, ${alpha * 0.4})`);
        floorGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = floorGrad;
        ctx.fillRect(sweepX - 160, h * 0.70, 320, 6);
      }

      // --- 5.0–6.5 SECONDS: REASSEMBLY SILVER PULSE ---
      if (sec >= 5.0 && sec <= 6.5) {
        const pulseProgress = (sec - 5.0) / 1.5;
        const pulseAlpha = Math.sin(pulseProgress * Math.PI) * 0.45;

        const centerGrad = ctx.createRadialGradient(w * 0.5, h * 0.5, 15, w * 0.5, h * 0.5, Math.min(w * 0.45, 360));
        centerGrad.addColorStop(0, `rgba(255, 255, 255, ${pulseAlpha})`);
        centerGrad.addColorStop(0.4, `rgba(226, 232, 240, ${pulseAlpha * 0.65})`);
        centerGrad.addColorStop(0.75, `rgba(148, 163, 184, ${pulseAlpha * 0.18})`);
        centerGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = centerGrad;
        ctx.fillRect(0, 0, w, h);
      }

      // --- 3–5 SECONDS: MUTED GOLDEN & SILVER PARTICLES (ZERO GRAVITY) ---
      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];

        // Animate position
        p.x += p.vx;
        p.y += p.vy;

        // Wrap boundaries
        if (p.y < -20) p.y = h + 20;
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;

        // Pulsing alpha
        const pulse = Math.sin(sec * 2 + p.pulseOffset);
        p.alpha = Math.max(0, p.baseAlpha + pulse * 0.2);

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        if (p.isSilver) {
          ctx.fillStyle = `rgba(241, 245, 249, ${p.alpha * 0.75})`;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
          ctx.shadowBlur = 5;
        } else {
          // Muted golden accent particle
          ctx.fillStyle = `rgba(234, 179, 8, ${p.alpha * 0.55})`;
          ctx.shadowColor = 'rgba(234, 179, 8, 0.4)';
          ctx.shadowBlur = 4;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    updateFragments(elapsed) {
      const sec = elapsed / 1000;

      // Stage scale factor for mobile vs desktop
      const isMobile = window.innerWidth <= 768;
      const distanceScale = isMobile ? 0.65 : 1.0;

      this.fragmentElements.forEach(({ el, data }) => {
        let x = 0, y = 0, z = 0;
        let rx = 0, ry = 0, rz = 0;
        let opacity = 1;
        let shimmer = false;

        if (sec < 1.5) {
          // --- 0–1.5s: Pure black space, silver light reveals wordmark ---
          // Fragments rest at exact (0,0,0) position, emerging smoothly
          const p = Math.min(sec / 1.4, 1);
          opacity = easeOutQuad(p);
          shimmer = sec > 0.4 && sec < 1.4;
        } else if (sec >= 1.5 && sec < 3.0) {
          // --- 1.5–3.0s: DBAH letters separate into elegant geometric fragments in 3D ---
          const p = easeInOutCubic((sec - 1.5) / 1.5);
          x = data.tx * p * distanceScale;
          y = data.ty * p * distanceScale;
          z = data.tz * p * distanceScale;
          rx = data.rx * p;
          ry = data.ry * p;
          rz = data.rz * p;
          shimmer = p < 0.65;
        } else if (sec >= 3.0 && sec < 5.0) {
          // --- 3.0–5.0s: Silver fragments move gracefully in zero gravity ---
          const floatTime = sec - 3.0;
          // Harmonic wave offset
          const waveX = Math.sin(floatTime * data.fx + data.phase) * (data.ax * distanceScale);
          const waveY = Math.cos(floatTime * data.fy + data.phase) * (data.ay * distanceScale);
          const waveR = Math.sin(floatTime * data.fr + data.phase) * data.ar;

          x = (data.tx + waveX) * distanceScale;
          y = (data.ty + waveY) * distanceScale;
          z = (data.tz + Math.sin(floatTime * 1.2) * 22) * distanceScale;
          rx = data.rx + waveR;
          ry = data.ry + Math.cos(floatTime * 1.3) * (data.ar * 0.8);
          rz = data.rz + waveR * 0.5;
        } else if (sec >= 5.0 && sec < 5.8) {
          // --- 5.0–5.8s: Fragments assemble into the exact DBAH wordmark (B intact) ---
          const p = 1 - easeOutCubic((sec - 5.0) / 0.8);
          x = data.tx * p * distanceScale;
          y = data.ty * p * distanceScale;
          z = data.tz * p * distanceScale;
          rx = data.rx * p;
          ry = data.ry * p;
          rz = data.rz * p;
        } else {
          // --- 5.8s+: Locked assembled position ---
          x = 0; y = 0; z = 0;
          rx = 0; ry = 0; rz = 0;
          if (sec > 5.9) {
            opacity = Math.max(0, 1 - (sec - 5.9) / 0.3);
          }
        }

        // Apply 3D transform matrix
        el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(2)}px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) rotateZ(${rz.toFixed(2)}deg)`;
        el.style.opacity = opacity.toFixed(3);

        if (shimmer) {
          el.classList.add('shimmer');
        } else {
          el.classList.remove('shimmer');
        }
      });
    }

    updateCamera(elapsed) {
      if (!this.stage) return;
      const sec = elapsed / 1000;
      let scale = 1.0;
      let rotX = 0;

      if (sec < 3.0) {
        scale = 1.0;
      } else if (sec >= 3.0 && sec < 5.0) {
        // Slow cinematic camera push-in in zero gravity
        const p = (sec - 3.0) / 2.0;
        scale = 1.0 + p * 0.06; // 1.0 -> 1.06
        rotX = Math.sin(p * Math.PI) * 1.8;
      } else if (sec >= 5.0 && sec < 6.0) {
        // Camera snaps gracefully to 1.0 on assembly
        const p = easeOutQuad((sec - 5.0) / 1.0);
        scale = 1.06 - p * 0.06;
      } else if (sec >= 7.5) {
        // Final transition scale towards website header
        const p = easeInOutQuad((sec - 7.5) / 1.0);
        scale = 1.0 - p * 0.08;
      }

      this.stage.style.transform = `scale(${scale.toFixed(4)}) rotateX(${rotX.toFixed(2)}deg)`;
    }

    checkMilestones(elapsed) {
      const sec = elapsed / 1000;

      // 1. Ambient Backlight activation (at 1.2s)
      if (sec >= 1.2 && this.ambientGlow && !this.ambientGlow.classList.contains('active')) {
        this.ambientGlow.classList.add('active');
      }

      // 2. Lock-In Reassembly (at 5.8s)
      if (sec >= 5.8 && this.assembledWrap && !this.assembledWrap.classList.contains('visible')) {
        this.assembledWrap.classList.add('visible');

        // Trigger radiant silver light sweep across the completed wordmark
        if (this.lightSweep) {
          this.lightSweep.classList.add('sweeping');
        }
      }

      // 3. Full Brand Reveal & Tagline (at 6.5s)
      // "QUAD DIGITAL LABS appears beneath DBAH. Tagline fades in: BUILDING DIGITAL EXPERIENCES"
      if (sec >= 6.5 && this.taglineWrap && !this.taglineWrap.classList.contains('revealed')) {
        this.taglineWrap.classList.add('revealed');
      }

      // 4. Begin Website Transition (at 7.5s)
      if (sec >= 7.5 && this.overlay && !this.overlay.classList.contains('intro-transitioning')) {
        this.overlay.classList.add('intro-transitioning');
        this.overlay.style.opacity = '0';
      }
    }

    completeIntro() {
      if (this.isDismissed) return;
      this.isDismissed = true;
      this.isRunning = false;

      // Record session completion
      sessionStorage.setItem(SESSION_KEY, 'true');

      // Dismiss overlay cleanly
      this.finishDismissal();
    }

    skipIntro() {
      if (this.isDismissed) return;
      this.isDismissed = true;
      this.isRunning = false;

      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }

      sessionStorage.setItem(SESSION_KEY, 'true');

      if (this.overlay) {
        this.overlay.classList.add('intro-fade-fast');
        this.overlay.style.opacity = '0';
      }

      setTimeout(() => {
        this.finishDismissal();
      }, 350);
    }

    instantDismiss() {
      this.isDismissed = true;
      this.isRunning = false;
      if (this.overlay) {
        this.overlay.style.display = 'none';
        this.overlay.classList.add('intro-hidden');
      }
      document.body.classList.remove('intro-active');
      window.dispatchEvent(new CustomEvent('dbah-intro-finished'));
    }

    finishDismissal() {
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }

      if (this.overlay) {
        this.overlay.style.display = 'none';
        this.overlay.classList.add('intro-hidden');
        this.overlay.classList.remove('intro-transitioning', 'intro-fade-fast');
      }

      document.body.classList.remove('intro-active');

      if (this.boundKeyHandler) {
        window.removeEventListener('keydown', this.boundKeyHandler);
      }

      window.dispatchEvent(new CustomEvent('dbah-intro-finished'));
    }

    replayIntro() {
      sessionStorage.removeItem(SESSION_KEY);

      if (this.overlay) {
        this.overlay.style.display = 'flex';
        this.overlay.style.opacity = '1';
        this.overlay.classList.remove('intro-hidden', 'intro-transitioning', 'intro-fade-fast');
      }
      if (this.assembledWrap) {
        this.assembledWrap.classList.remove('visible');
      }
      if (this.lightSweep) {
        this.lightSweep.classList.remove('sweeping');
      }
      if (this.taglineWrap) {
        this.taglineWrap.classList.remove('revealed');
      }
      if (this.ambientGlow) {
        this.ambientGlow.classList.remove('active');
      }
      if (this.progressFill) {
        this.progressFill.style.width = '0%';
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });

      this.buildFragments();
      this.initParticles();
      this.startSequence();
    }
  }

  // Global access for testing / manual triggering
  window.DBAHIntro = new CinematicIntroController();
  window.dbahReplayIntro = function () {
    if (window.DBAHIntro) {
      window.DBAHIntro.replayIntro();
    }
  };

  // Launch on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.DBAHIntro.init());
  } else {
    window.DBAHIntro.init();
  }
})();
