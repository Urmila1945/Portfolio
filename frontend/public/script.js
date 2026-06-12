/* ============================================
   PORTFOLIO — ENHANCED MAIN SCRIPT
   ============================================ */

'use strict';

// ── 1. DOM READY ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initCursor();
  initNavbar();
  initTypingEffect();
  initScrollReveal();
  initCounters();
  initThemeToggle();
  initFlashMessages();
  initSmoothScroll();
  initActiveNavHighlight();
  initChatbot();
  initFlipCards();
});

// ── 2. PARTICLE CANVAS ───────────────────────────────────────────────────────
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W = canvas.width  = window.innerWidth;
  let H = canvas.height = window.innerHeight;

  const COLORS = ['#a855f7', '#06b6d4', '#f59e0b'];
  const NUM = Math.min(Math.floor(W * H / 12000), 80);

  const particles = Array.from({ length: NUM }, () => ({
    x:  Math.random() * W,
    y:  Math.random() * H,
    r:  Math.random() * 1.8 + 0.4,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    alpha: Math.random() * 0.5 + 0.15,
  }));

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
    });
    // Draw connections
    ctx.lineWidth = 0.5;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.globalAlpha = (1 - dist / 130) * 0.15;
          ctx.strokeStyle = particles[i].color;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
  }

  function update() {
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });
  }

  let animId;
  function loop() {
    update();
    draw();
    animId = requestAnimationFrame(loop);
  }
  loop();

  window.addEventListener('resize', () => {
    cancelAnimationFrame(animId);
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    loop();
  });
}

// ── 3. CUSTOM CURSOR ─────────────────────────────────────────────────────────
function initCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  // Only enable on non-touch devices
  if (window.matchMedia('(pointer: coarse)').matches) {
    dot.style.display = 'none';
    ring.style.display = 'none';
    return;
  }

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left  = mouseX - 4 + 'px';
    dot.style.top   = mouseY - 4 + 'px';
  });

  // Ring follows with lag
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX - 18 + 'px';
    ring.style.top  = ringY - 18 + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Grow ring on interactive elements
  document.querySelectorAll('a, button, [role="button"]').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.transform = 'scale(1.8)';
      ring.style.borderColor = 'rgba(168,85,247,0.8)';
      dot.style.transform = 'scale(0.5)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.transform = 'scale(1)';
      ring.style.borderColor = 'rgba(168,85,247,0.5)';
      dot.style.transform = 'scale(1)';
    });
  });
}

// ── 4. NAVBAR ────────────────────────────────────────────────────────────────
function initNavbar() {
  const header    = document.getElementById('main-header');
  const hamburger = document.getElementById('nav-hamburger');
  const nav       = document.getElementById('main-nav');

  // Scroll glass effect
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // Hamburger toggle
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      hamburger.innerHTML = open
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });

    // Close on link click
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }
}

// ── 5. TYPING EFFECT ─────────────────────────────────────────────────────────
function initTypingEffect() {
  const roles = ['creativity', 'precision', 'innovation', 'AI magic'];
  const el = document.getElementById('typed-role');
  if (!el) return;

  let rIdx = 0, cIdx = 0, deleting = false;

  function type() {
    const current = roles[rIdx];
    if (!deleting) {
      el.textContent = current.slice(0, ++cIdx);
      if (cIdx === current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      el.textContent = current.slice(0, --cIdx);
      if (cIdx === 0) {
        deleting = false;
        rIdx = (rIdx + 1) % roles.length;
      }
    }
    setTimeout(type, deleting ? 60 : 110);
  }
  setTimeout(type, 800);

  // Hero headline typewriter
  const headline = ['Python Developer', 'AI Enthusiast', 'ML Engineer', 'Problem Solver'];
  const hEl = document.getElementById('typed-headline');
  if (!hEl) return;
  let hIdx = 0, hcIdx = 0, hDel = false;

  function typeHeadline() {
    const cur = headline[hIdx];
    if (!hDel) {
      hEl.textContent = cur.slice(0, ++hcIdx);
      if (hcIdx === cur.length) { hDel = true; setTimeout(typeHeadline, 2200); return; }
    } else {
      hEl.textContent = cur.slice(0, --hcIdx);
      if (hcIdx === 0) { hDel = false; hIdx = (hIdx + 1) % headline.length; }
    }
    setTimeout(typeHeadline, hDel ? 55 : 100);
  }
  setTimeout(typeHeadline, 400);
}

// ── 6. SCROLL REVEAL ─────────────────────────────────────────────────────────
function initScrollReveal() {
  const classes = ['.reveal', '.reveal-left', '.reveal-right'];
  const els = document.querySelectorAll(classes.join(','));
  if (!els.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
}

// ── 7. ANIMATED COUNTERS ─────────────────────────────────────────────────────
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.dataset.target;
        const duration = 1500;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(current);
          }
        }, 16);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

// ── 8. THEME TOGGLE ──────────────────────────────────────────────────────────
function initThemeToggle() {
  const btn  = document.getElementById('theme-toggle');
  if (!btn) return;
  const icon = btn.querySelector('i');

  // Restore saved preference
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    icon.className = 'fas fa-sun';
  }

  btn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      icon.className = 'fas fa-moon';
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      icon.className = 'fas fa-sun';
      localStorage.setItem('theme', 'dark');
    }
  });
}

// ── 9. FLASH MESSAGES ────────────────────────────────────────────────────────
function initFlashMessages() {
  const flash = document.querySelector('.flash');
  if (!flash) return;
  setTimeout(() => {
    flash.style.transition = 'opacity 0.5s ease';
    flash.style.opacity = '0';
    setTimeout(() => flash.remove(), 550);
  }, 4500);
}

// ── 10. SMOOTH SCROLL ────────────────────────────────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ── 11. ACTIVE NAV HIGHLIGHT ─────────────────────────────────────────────────
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.45 });

  sections.forEach(s => observer.observe(s));
}

// ── 12. CHATBOT ──────────────────────────────────────────────────────────────
function initChatbot() {
  // Toggle handled inline via HTML onclick, wired here for cleanliness
}

// ── 13. FLIP CARDS ───────────────────────────────────────────────────────────
function initFlipCards() {
  const cards = document.querySelectorAll('.skill-category');
  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const isFlipped = card.classList.contains('flipped');

      // Collapse all cards first
      cards.forEach(c => c.classList.remove('flipped'));

      // If it wasn't already flipped, flip it
      if (!isFlipped) {
        card.classList.add('flipped');
      }
    });
  });
}

function toggleChatbot() {
  const popup = document.getElementById('chatbot-popup');
  if (!popup) return;
  const isOpen = popup.classList.toggle('open');
  if (isOpen) {
    const input = document.getElementById('userInput');
    if (input) setTimeout(() => input.focus(), 100);
  }
}

function sendMessage() {
  const input    = document.getElementById('userInput');
  const chatBody = document.getElementById('chat-body');
  if (!input || !chatBody) return;

  const msg = input.value.trim();
  if (!msg) return;

  // Append user message
  const userDiv = document.createElement('div');
  userDiv.className = 'chat-message user';
  userDiv.innerHTML = `<div class="bubble">${escapeHtml(msg)}</div>`;
  chatBody.appendChild(userDiv);
  input.value = '';
  chatBody.scrollTop = chatBody.scrollHeight;

  // Show typing indicator
  const typingDiv = document.createElement('div');
  typingDiv.className = 'chat-message bot';
  typingDiv.id = 'typing-indicator';
  typingDiv.innerHTML = `<div class="bubble" style="opacity:0.6;font-style:italic">Typing...</div>`;
  chatBody.appendChild(typingDiv);
  chatBody.scrollTop = chatBody.scrollHeight;

  // Fetch bot reply
  fetch('/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: msg })
  })
  .then(res => res.json())
  .then(data => {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();

    const botDiv = document.createElement('div');
    botDiv.className = 'chat-message bot';
    botDiv.innerHTML = `<div class="bubble">${data.reply}</div>`;
    chatBody.appendChild(botDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  })
  .catch(() => {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();
    const errDiv = document.createElement('div');
    errDiv.className = 'chat-message bot';
    errDiv.innerHTML = `<div class="bubble" style="color:#f87171">Sorry, something went wrong. Please try again.</div>`;
    chatBody.appendChild(errDiv);
  });
}

// ── UTILITIES ────────────────────────────────────────────────────────────────
function escapeHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}
