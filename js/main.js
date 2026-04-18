// ── CURSOR GLOW ──
const glow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top  = e.clientY + 'px';
});
 
// ── SCROLL REVEAL ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
 
// ── ACTIVE NAV + BACK TO TOP ──
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');
const backToTop = document.getElementById('backToTop');
 
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute('id');
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
  backToTop.classList.toggle('visible', window.scrollY > 400);
});
 
// ── TYPING ANIMATION ──
const phrases = [
  'Informatics Student · Universitas Syiah Kuala',
  'UI/UX Designer & Web Developer'
];
let pi = 0, ci = 0, deleting = false;
const typingEl = document.getElementById('typingText');
 
function type() {
  const word = phrases[pi];
  if (!deleting) {
    typingEl.textContent = word.substring(0, ci++);
    if (ci > word.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    typingEl.textContent = word.substring(0, ci--);
    if (ci < 0) { deleting = false; pi = (pi + 1) % phrases.length; ci = 0; }
  }
  setTimeout(type, deleting ? 40 : 65);
}
type();
 
// ── LIGHTBOX ──
function openLightbox(src) {
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
 
// ── CONTACT FORM ──
const form    = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
 
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = form.querySelector('.form-submit');
  btn.disabled = true;
  btn.textContent = 'Sending...';
  formMsg.className = 'form-msg';
  formMsg.style.display = 'none';
 
  const data = {
    name:    form.name.value.trim(),
    email:   form.email.value.trim(),
    message: form.message.value.trim()
  };
 
  try {
    const res  = await fetch('/api/messages', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(data)
    });
    const json = await res.json();
 
    if (res.ok) {
      formMsg.textContent = 'Your message has been sent! Thank you';
      formMsg.className   = 'form-msg success';
      form.reset();
    } else {
      throw new Error(json.error || 'Something went wrong.');
    }
  } catch (err) {
    formMsg.textContent = '❌ ' + err.message;
    formMsg.className   = 'form-msg error';
  } finally {
    btn.disabled    = false;
    btn.textContent = 'Send Message';
  }
});
 