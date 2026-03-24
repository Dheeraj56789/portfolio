/* ============================================================
   script.js — Dheeraj Singh Portfolio
   Full Animation Edition:
   1.  Page Loader
   2.  Theme Toggle
   3.  Navbar + Active Links
   4.  Hamburger Menu
   5.  Scroll-based Entrance Animations (staggered cascade)
   6.  Skill Bar Animation
   7.  Scroll To Top
   8.  Contact Form
   9.  Smooth Scroll
   10. Aurora / Nebula Hero Background
   11. Orbiting Tech Icons
   12. Magnetic Glow on Profile Photo
   13. Glowing Cursor Trail
   14. Section Floating Particles
   15. 3D Tilt on Cards
   16. Typing Text Effects (hero name + role)
   17. Counter Number Count-up
   18. Magnetic Button Pull Effect
============================================================ */

/* ════════════════════════════════════════════════════════════
   1. PAGE LOADER
════════════════════════════════════════════════════════════ */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hide');
  }, 1800);
});


/* ════════════════════════════════════════════════════════════
   2. THEME TOGGLE
════════════════════════════════════════════════════════════ */
const html     = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');
let isDark     = true;
themeBtn.addEventListener('click', () => {
  isDark = !isDark;
  html.setAttribute('data-theme', isDark ? 'dark' : 'light');
  themeBtn.innerHTML = isDark
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
});


/* ════════════════════════════════════════════════════════════
   3. NAVBAR + ACTIVE LINKS
════════════════════════════════════════════════════════════ */
const navbar   = document.getElementById('navbar');
const allLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
  const scrollBtn = document.getElementById('scrolltop');
  if (scrollBtn) scrollBtn.classList.toggle('show', window.scrollY > 400);
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.id; });
  allLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
});


/* ════════════════════════════════════════════════════════════
   4. HAMBURGER MENU
════════════════════════════════════════════════════════════ */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(l => l.addEventListener('click', () => {
  hamburger.classList.remove('open');
  navLinks.classList.remove('open');
}));


/* ════════════════════════════════════════════════════════════
   5. SCROLL-BASED ENTRANCE ANIMATIONS (Staggered Cascade)
   Watches for .anim-fade-up / left / right / zoom-in and
   adds .visible class with staggered delays for children.
════════════════════════════════════════════════════════════ */
const animObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      animObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.anim-fade-up,.anim-fade-left,.anim-fade-right,.anim-zoom-in')
  .forEach(el => animObs.observe(el));


/* ════════════════════════════════════════════════════════════
   6. SKILL BAR ANIMATION
════════════════════════════════════════════════════════════ */
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      setTimeout(() => {
        e.target.querySelectorAll('.skill-fill').forEach(b => {
          b.style.width = b.dataset.w + '%';
        });
      }, 300);
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.25 });

document.querySelectorAll('.skill-card').forEach(c => barObs.observe(c));


/* ════════════════════════════════════════════════════════════
   7. SCROLL TO TOP
════════════════════════════════════════════════════════════ */
const scrollTopBtn = document.getElementById('scrolltop');
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}


/* ════════════════════════════════════════════════════════════
   8. CONTACT FORM
════════════════════════════════════════════════════════════ */
const sendBtn = document.getElementById('send-btn');
if (sendBtn) sendBtn.addEventListener('click', sendMessage);

function sendMessage() {
  const n = document.getElementById('f-name');
  const e = document.getElementById('f-email');
  const s = document.getElementById('f-sub');
  const m = document.getElementById('f-msg');
  const fb = document.getElementById('form-msg');
  if (!n.value.trim()||!e.value.trim()||!s.value.trim()||!m.value.trim()) {
    showFeedback(fb,'⚠️ Please fill in all fields.','#f87171'); return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.value.trim())) {
    showFeedback(fb,'⚠️ Please enter a valid email address.','#f87171'); return;
  }
  showFeedback(fb,"✅ Message sent! I'll get back to you soon.",'var(--accent3)');
  n.value = e.value = s.value = m.value = '';
  setTimeout(() => { fb.style.display='none'; }, 4000);
}
function showFeedback(el, text, color) {
  el.style.display='block'; el.style.color=color; el.textContent=text;
}


/* ════════════════════════════════════════════════════════════
   9. SMOOTH SCROLL
════════════════════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const t = document.querySelector(this.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior:'smooth', block:'start' }); }
  });
});


/* ════════════════════════════════════════════════════════════
   10. AURORA / NEBULA HERO BACKGROUND
════════════════════════════════════════════════════════════ */
(function initAurora() {
  const canvas = document.getElementById('aurora-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const blobs = [
    { x:0.15, y:0.3,  r:0.55, color:[79,142,247],  speed:0.00018, phase:0   },
    { x:0.75, y:0.25, r:0.50, color:[139,92,246],   speed:0.00014, phase:1.5 },
    { x:0.5,  y:0.7,  r:0.45, color:[6,214,160],    speed:0.00022, phase:3.0 },
    { x:0.85, y:0.65, r:0.40, color:[240,100,180],  speed:0.00016, phase:0.8 },
    { x:0.3,  y:0.8,  r:0.38, color:[60,160,255],   speed:0.00020, phase:2.2 },
  ];

  const stars = Array.from({ length: 130 }, () => ({
    x: Math.random(), y: Math.random(),
    r: Math.random() * 0.9 + 0.2,
    alpha: Math.random() * 0.5 + 0.1,
    tw: Math.random() * Math.PI * 2,
    spd: Math.random() * 0.015 + 0.005,
  }));

  let t = 0;
  function draw() {
    const W = canvas.width, H = canvas.height;
    ctx.fillStyle = '#040810';
    ctx.fillRect(0, 0, W, H);
    t++;

    blobs.forEach(b => {
      const ox = Math.sin(t * b.speed + b.phase) * 0.12;
      const oy = Math.cos(t * b.speed * 0.7 + b.phase) * 0.10;
      const cx = (b.x + ox) * W;
      const cy = (b.y + oy) * H;
      const rad = b.r * Math.max(W, H) * 0.65;
      const pulse = 0.5 + 0.5 * Math.sin(t * b.speed * 4 + b.phase);
      const alpha = (0.11 + 0.07 * pulse).toFixed(3);

      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
      g.addColorStop(0,   `rgba(${b.color},${alpha})`);
      g.addColorStop(0.4, `rgba(${b.color},${(alpha*0.5).toFixed(3)})`);
      g.addColorStop(1,   `rgba(${b.color},0)`);

      ctx.beginPath();
      ctx.ellipse(
        cx, cy,
        rad * (0.9 + 0.1 * Math.sin(t * b.speed * 2 + b.phase)),
        rad * (0.7 + 0.1 * Math.cos(t * b.speed * 2.3 + b.phase)),
        t * b.speed * 0.5, 0, Math.PI * 2
      );
      ctx.fillStyle = g;
      ctx.fill();
    });

    /* Stars twinkle */
    stars.forEach(s => {
      s.tw += s.spd;
      const a = s.alpha * (0.5 + 0.5 * Math.sin(s.tw));
      ctx.beginPath();
      ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${a})`;
      ctx.fill();
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
})();


/* ════════════════════════════════════════════════════════════
   11. ORBITING TECH ICONS
════════════════════════════════════════════════════════════ */
(function initOrbit() {
  const system = document.getElementById('orbitSystem');
  if (!system) return;
  const items = [...system.querySelectorAll('.orbiter')].map(el => ({
    el,
    pill:  el.querySelector('.orb-pill'),
    orbit: parseFloat(el.dataset.orbit) || 140,
    speed: parseFloat(el.dataset.speed) || 0.5,
    angle: parseFloat(el.dataset.start) || 0,
  }));

  function tick() {
    const hw = system.offsetWidth  / 2;
    const hh = system.offsetHeight / 2;
    items.forEach(item => {
      item.angle += item.speed * 0.4;
      const rad = item.angle * Math.PI / 180;
      const x = hw + Math.cos(rad) * item.orbit;
      const y = hh + Math.sin(rad) * item.orbit;
      item.el.style.transform = `translate(${x - hw}px, ${y - hh}px)`;
      if (item.pill) item.pill.style.transform = `rotate(${-item.angle}deg)`;
    });
    requestAnimationFrame(tick);
  }
  tick();
})();


/* ════════════════════════════════════════════════════════════
   12. MAGNETIC GLOW ON PROFILE PHOTO
════════════════════════════════════════════════════════════ */
(function initMagneticGlow() {
  const hero  = document.getElementById('hero');
  const core  = document.getElementById('profileCore');
  const glow  = document.getElementById('magneticGlow');
  const photo = document.querySelector('.avatar-photo');
  if (!hero || !core || !glow) return;

  let tx = 0, ty = 0, cx = 0, cy = 0;
  const LERP = 0.08, RANGE = 180, MAX_SHIFT = 22;

  hero.addEventListener('mousemove', e => {
    const rect = core.getBoundingClientRect();
    const rcx  = rect.left + rect.width  / 2;
    const rcy  = rect.top  + rect.height / 2;
    const dx = e.clientX - rcx, dy = e.clientY - rcy;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (dist < RANGE) {
      const str = 1 - dist / RANGE;
      tx = (dx/dist) * MAX_SHIFT * str;
      ty = (dy/dist) * MAX_SHIFT * str;
      const intensity = 0.45 + 0.35 * str;
      glow.style.background = `radial-gradient(circle,rgba(79,142,247,${intensity.toFixed(2)}) 0%,rgba(139,92,246,${(intensity*0.6).toFixed(2)}) 40%,transparent 70%)`;
      if (photo) photo.style.transform = `scale(${1 + 0.04 * str})`;
    } else {
      tx = 0; ty = 0;
      if (photo) photo.style.transform = 'scale(1)';
    }
  });
  hero.addEventListener('mouseleave', () => {
    tx = 0; ty = 0;
    if (photo) photo.style.transform = 'scale(1)';
    glow.style.background = 'radial-gradient(circle,rgba(79,142,247,0.45) 0%,rgba(139,92,246,0.25) 40%,transparent 70%)';
  });

  function animateGlow() {
    cx += (tx - cx) * LERP;
    cy += (ty - cy) * LERP;
    glow.style.transform = `translate(calc(-50% + ${cx}px), calc(-50% + ${cy}px))`;
    requestAnimationFrame(animateGlow);
  }
  animateGlow();
})();


/* ════════════════════════════════════════════════════════════
   13. GLOWING CURSOR TRAIL
   A canvas fixed to the viewport renders a comet-like trail
   of glowing dots that follow the cursor with a fade-out.
════════════════════════════════════════════════════════════ */
(function initCursorTrail() {
  const dot   = document.getElementById('cursor-dot');
  const ring  = document.getElementById('cursor-ring');
  const canvas = document.getElementById('cursor-trail');
  if (!dot || !ring || !canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  window.addEventListener('resize', () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  let mx = -200, my = -200;
  let rx = -200, ry = -200; /* ring follows with lag */
  const trail = [];
  const MAX_TRAIL = 28;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
    trail.push({ x: mx, y: my, alpha: 1 });
    if (trail.length > MAX_TRAIL) trail.shift();
  });

  /* Hover state on interactive elements */
  const hoverEls = 'a, button, .magnetic-btn, .tilt-card, input, textarea, .social-btn, .soft-chip';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverEls)) document.body.classList.add('cursor-hover');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverEls)) document.body.classList.remove('cursor-hover');
  });

  function drawTrail() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* Lag ring behind cursor */
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';

    /* Draw fading trail dots */
    for (let i = 0; i < trail.length; i++) {
      const t    = trail[i];
      t.alpha   -= 1 / MAX_TRAIL;
      const prog = i / trail.length;
      const r    = 3 + prog * 5;
      const a    = t.alpha * prog;

      /* Colour shifts blue → purple along the trail */
      const blue   = Math.round(79  + (139-79)  * (1-prog));
      const green  = Math.round(142 + (92-142)  * (1-prog));
      const red    = Math.round(247 + (246-247) * (1-prog));

      ctx.beginPath();
      ctx.arc(t.x, t.y, r, 0, Math.PI * 2);
      const grad = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, r);
      grad.addColorStop(0, `rgba(${red},${green},${blue},${Math.max(0,a * 0.9)})`);
      grad.addColorStop(1, `rgba(${red},${green},${blue},0)`);
      ctx.fillStyle = grad;
      ctx.fill();
    }

    requestAnimationFrame(drawTrail);
  }
  drawTrail();
})();


/* ════════════════════════════════════════════════════════════
   14. SECTION FLOATING PARTICLES
   Each section has a <canvas class="section-particles"> with
   a data-color attribute. We spawn soft floating dots.
════════════════════════════════════════════════════════════ */
(function initSectionParticles() {
  document.querySelectorAll('.section-particles').forEach(canvas => {
    const section = canvas.parentElement;
    const ctx     = canvas.getContext('2d');
    const colorRaw = canvas.dataset.color || '79,142,247';

    function resize() {
      canvas.width  = section.offsetWidth;
      canvas.height = section.offsetHeight;
    }
    resize();

    const resizeObs = new ResizeObserver(resize);
    resizeObs.observe(section);

    const COUNT = Math.min(30, Math.floor(section.offsetWidth / 40));
    const dots  = Array.from({ length: COUNT }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      r:  Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      a:  Math.random() * 0.4 + 0.1,
      tw: Math.random() * Math.PI * 2,
      ts: Math.random() * 0.02 + 0.005,
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = canvas.width;
        if (d.x > canvas.width)  d.x = 0;
        if (d.y < 0) d.y = canvas.height;
        if (d.y > canvas.height) d.y = 0;
        d.tw += d.ts;
        const a = d.a * (0.4 + 0.6 * Math.sin(d.tw));
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colorRaw},${a})`;
        ctx.fill();
      });

      /* Connecting lines between close dots */
      for (let i = 0; i < dots.length - 1; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dist = Math.hypot(dots[i].x - dots[j].x, dots[i].y - dots[j].y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(${colorRaw},${(1 - dist/110) * 0.08})`;
            ctx.lineWidth   = 0.6;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }
    draw();
  });
})();


/* ════════════════════════════════════════════════════════════
   15. 3D TILT ON CARDS
   Applies to any element with class .tilt-card.
   Rotates the card on mouse-move, resets on mouse-leave.
════════════════════════════════════════════════════════════ */
(function initTiltCards() {
  const MAX = 10; /* max tilt degrees */
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width  - 0.5;
      const ny = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `perspective(700px) rotateX(${-ny*MAX}deg) rotateY(${nx*MAX}deg) translateZ(8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.55s cubic-bezier(0.34,1.56,0.64,1)';
      card.style.transform  = 'perspective(700px) rotateX(0) rotateY(0) translateZ(0)';
      setTimeout(() => { card.style.transition = ''; }, 600);
    });
  });
})();


/* ════════════════════════════════════════════════════════════
   16. TYPING TEXT EFFECTS
   Hero name + role cycle typed with cursor blinking.
════════════════════════════════════════════════════════════ */
(function initTypingEffects() {
  /* — Typed name — */
  const nameEl = document.querySelector('.typed-name');
  if (nameEl) {
    const nameText = 'Dheeraj\u00A0Singh';
    let i = 0;
    function typeName() {
      if (i <= nameText.length) {
        nameEl.textContent = nameText.slice(0, i);
        i++;
        setTimeout(typeName, i === 1 ? 1000 : 90);
      }
    }
    setTimeout(typeName, 1200);
  }

  /* — Typed role — */
  const roleEl = document.querySelector('.typed-role');
  if (roleEl) {
    const roles = [
      'Building Smart Solutions with Code',
      'Aspiring Software Developer',
      'ML / AI Enthusiast',
      'Problem Solver & DSA Practitioner',
    ];
    let ri = 0, ci = 0, deleting = false;

    function typeRole() {
      const current = roles[ri];
      if (deleting) {
        roleEl.textContent = current.slice(0, ci--);
      } else {
        roleEl.textContent = current.slice(0, ci++);
      }

      let delay = deleting ? 45 : 80;
      if (!deleting && ci === current.length + 1) { delay = 2000; deleting = true; }
      else if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % roles.length; delay = 400; }

      setTimeout(typeRole, delay);
    }
    setTimeout(typeRole, 2800);
  }
})();


/* ════════════════════════════════════════════════════════════
   17. COUNTER NUMBER COUNT-UP
   Elements with class .counter and data-target attribute
   animate from 0 to the target value when scrolled into view.
════════════════════════════════════════════════════════════ */
(function initCounters() {
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const dur    = 1800;
      const step   = 16;
      const inc    = target / (dur / step);
      let current  = 0;

      const timer = setInterval(() => {
        current += inc;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = Math.floor(current);
      }, step);

      counterObs.unobserve(el);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.counter').forEach(el => counterObs.observe(el));
})();


/* ════════════════════════════════════════════════════════════
   18. MAGNETIC BUTTON PULL EFFECT
   Buttons with class .magnetic-btn slightly pull toward cursor.
════════════════════════════════════════════════════════════ */
(function initMagneticButtons() {
  document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (e.clientX - cx) * 0.28;
      const dy   = (e.clientY - cy) * 0.28;
      btn.style.transform = `translate(${dx}px, ${dy}px) scale(1.05)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transition = 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1)';
      btn.style.transform  = 'translate(0,0) scale(1)';
      setTimeout(() => { btn.style.transition = ''; }, 460);
    });
  });
})();