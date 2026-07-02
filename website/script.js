// Header: solid background after scrolling past hero start
const header = document.getElementById('siteHeader');
const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile navigation
const nav = document.getElementById('mainNav');
const toggle = document.getElementById('navToggle');
toggle.addEventListener('click', () => nav.classList.toggle('is-open'));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('is-open')));

// Hero: season toggle + gentle auto-crossfade
const winterBg = document.querySelector('.hero-bg-winter');
const sommerBg = document.querySelector('.hero-bg-sommer');
const dots = document.querySelectorAll('.season-dot');

function setSeason(season) {
  const winter = season === 'winter';
  winterBg.classList.toggle('is-active', winter);
  sommerBg.classList.toggle('is-active', !winter);
  dots.forEach(d => d.classList.toggle('is-active', d.dataset.season === season));
}

let current = 'winter';
let autoTimer = setInterval(() => {
  current = current === 'winter' ? 'sommer' : 'winter';
  setSeason(current);
}, 9000);

dots.forEach(dot => dot.addEventListener('click', () => {
  clearInterval(autoTimer);
  current = dot.dataset.season;
  setSeason(current);
}));

// Gallery lightbox
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = '<button class="lightbox-close" aria-label="Schließen">&times;</button><img alt="">';
document.body.appendChild(lightbox);
const lightboxImg = lightbox.querySelector('img');

document.querySelectorAll('.gallery figure img').forEach(img => {
  img.parentElement.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('is-open');
  });
});
lightbox.addEventListener('click', e => {
  if (e.target !== lightboxImg) lightbox.classList.remove('is-open');
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') lightbox.classList.remove('is-open');
});
