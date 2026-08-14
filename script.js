// ============================================================
//  SuSun & Chris — Bon Voyage site
// ============================================================

/* ---------- CONFIG ---------- */
const RSVP_EMAIL = "susunandchrismoon@gmail.com"; // where RSVPs are sent
/* ----------------------------- */

// ---------- Section fade-in on scroll ----------
const sections = document.querySelectorAll('.section');
const dots = document.querySelectorAll('#dots button');

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const visible = entry.isIntersecting && entry.intersectionRatio > 0.5;
    entry.target.classList.toggle('in-view', visible);
    if (visible) {
      const id = entry.target.id;
      dots.forEach(d => d.classList.toggle('active', d.dataset.target === id));
    }
  });
}, { threshold: [0, 0.5, 1] });

sections.forEach(s => io.observe(s));

dots.forEach(d => {
  d.addEventListener('click', () => {
    document.getElementById(d.dataset.target).scrollIntoView({ behavior: 'smooth' });
  });
});

// ---------- Lightbox (used by the engagement photos gallery) ----------
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  lightboxImg.classList.remove('zoomed');
  lightbox.classList.add('open');
}
document.getElementById('lightbox-close').addEventListener('click', () => lightbox.classList.remove('open'));
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('open'); });
lightboxImg.addEventListener('click', (e) => {
  e.stopPropagation();
  lightboxImg.classList.toggle('zoomed');
});

// ---------- Engagement photos gallery ----------
const engagementImages = [
  'assets/engagement/eng-3.jpg',
  'assets/engagement/eng-2.jpg',
  'assets/engagement/eng-1.jpg',
  'assets/engagement/eng-4.jpg',
];
if (engagementImages.length) {
  const grid = document.getElementById('eng-grid');
  grid.innerHTML = '';
  engagementImages.forEach(src => {
    const slot = document.createElement('div');
    slot.className = 'eng-slot';
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Engagement photo';
    img.loading = 'lazy';
    slot.appendChild(img);
    slot.addEventListener('click', () => openLightbox(src, 'Engagement photo'));
    grid.appendChild(slot);
  });
}

// ---------- RSVP form ----------
const form = document.getElementById('rsvp-form');
const status = document.getElementById('rsvp-status');
const sendBtn = document.getElementById('send-btn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('rsvp-name').value.trim();
  const plusoneName = document.getElementById('rsvp-plusone-name').value.trim();
  const joining = form.querySelector('input[name=joining]:checked');
  const plusone = form.querySelector('input[name=plusone]:checked');

  if (!name || !joining || !plusone) {
    status.textContent = 'Please fill in your name and both questions.';
    return;
  }

  sendBtn.disabled = true;
  status.textContent = 'Sending…';

  const payload = {
    name,
    "Will you be joining us?": joining.value,
    "Bringing a plus-one?": plusone.value,
    "Plus-one's name": plusoneName || '—',
    _subject: `RSVP from ${name}`,
    _template: 'table',
    _captcha: 'false'
  };

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${RSVP_EMAIL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Network response was not ok');
    status.textContent = `Thank you, ${name} — your RSVP has been sent!`;
    form.reset();
    document.querySelectorAll('.opt input').forEach(i => i.checked = false);
  } catch (err) {
    status.textContent = "Something went wrong sending your RSVP — please try again, or email us directly.";
    sendBtn.disabled = false;
    return;
  }
  sendBtn.disabled = false;
});
