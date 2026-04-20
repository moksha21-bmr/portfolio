// ── CURSOR ──
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursor-trail');
let mx = -100, my = -100, tx = -100, ty = -100;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

function animCursor() {
  cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  tx += (mx - tx) * 0.12; ty += (my - ty) * 0.12;
  trail.style.left = tx + 'px'; trail.style.top = ty + 'px';
  requestAnimationFrame(animCursor);
}
animCursor();

// ── NAV SCROLL ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveNav();
});

function updateActiveNav() {
  const sections = document.querySelectorAll('.page[id]');
  const links = document.querySelectorAll('.nav-links a');
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 200) current = s.id; });
  links.forEach(l => { l.classList.toggle('active', l.getAttribute('href') === '#' + current); });
}

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ── TYPED TEXT ──
const words = ['MOKSHAGNA', 'an AI Developer', 'a Problem Solver', 'a Builder'];
let wIdx = 0, cIdx = 0, deleting = false;
const typedEl = document.querySelector('.typed');

function type() {
  if (!typedEl) return;
  const word = words[wIdx];
  if (!deleting) {
    typedEl.textContent = word.substring(0, cIdx + 1);
    cIdx++;
    if (cIdx === word.length) {
      setTimeout(() => { deleting = true; type(); }, 2200);
      return;
    }
  } else {
    typedEl.textContent = word.substring(0, cIdx - 1);
    cIdx--;
    if (cIdx === 0) {
      deleting = false;
      wIdx = (wIdx + 1) % words.length;
    }
  }
  setTimeout(type, deleting ? 55 : 90);
}
setTimeout(type, 1200);

// ── INTERSECTION OBSERVER ──
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      // .page needs 'visible', reveal elements need 'in-view'
      if (e.target.classList.contains('page')) {
        e.target.classList.add('visible');
      }
      e.target.classList.add('in-view');
      // Animate score rings
      e.target.querySelectorAll('.score-ring .fill').forEach(c => {
        const pct = parseFloat(c.dataset.pct) / 100;
        const r = 35; const circ = 2 * Math.PI * r;
        c.style.strokeDasharray = circ;
        c.style.strokeDashoffset = circ * (1 - pct);
      });
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .page').forEach(el => io.observe(el));

// ── IMMEDIATELY SHOW PAGES ALREADY IN VIEWPORT ON LOAD ──
document.querySelectorAll('.page').forEach(el => {
  const rect = el.getBoundingClientRect();
  if (rect.top < window.innerHeight) {
    el.classList.add('visible');
  }
});

// ── INIT SCORE RINGS ──
document.querySelectorAll('.score-ring .fill').forEach(c => {
  const r = 35; const circ = 2 * Math.PI * r;
  c.style.strokeDasharray = circ;
  c.style.strokeDashoffset = circ;
});

// ── PARTICLE CANVAS ──
const canvas = document.getElementById('particle-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;

  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width, y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
    r: Math.random() * 1.5 + 0.3,
    a: Math.random() * 0.4 + 0.05
  }));

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99,179,237,${p.a})`;
      ctx.fill();
    });
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(99,179,237,${0.06 * (1 - dist / 120)})`;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  });
}

// ── HOVER GLOW ON CARDS ──
document.querySelectorAll('.skill-card, .project-card, .cert-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(99,179,237,0.06) 0%, var(--surface) 60%)`;
  });
  card.addEventListener('mouseleave', () => { card.style.background = ''; });
});
