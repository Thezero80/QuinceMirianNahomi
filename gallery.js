/* ═══════════════════════════════════════════════════
   MIRIAN NAHOMI · XV AÑOS · GALLERY SCRIPT
   ═══════════════════════════════════════════════════

   HOW TO ADD YOUR PHOTOS:
   1. Create a folder called "fotos/" in the same directory as index.html
   2. Upload your photos there (e.g., fotos/foto1.jpg, fotos/foto2.jpg)
   3. Edit the PHOTOS array below with the correct paths and captions
   4. The gallery will automatically update!

   ═══════════════════════════════════════════════════ */

const PHOTOS = [
  // ── REPLACE THESE WITH YOUR ACTUAL PHOTOS ──
  // { src: 'fotos/foto1.jpg', caption: 'Mirian Nahomi · Sesión XV Años' },
  // { src: 'fotos/foto2.jpg', caption: 'Elegancia y Gracia' },
  // { src: 'fotos/foto3.jpg', caption: 'Un momento eterno' },
  // { src: 'fotos/foto4.jpg', caption: 'La luz que ilumina' },
  // { src: 'fotos/foto5.jpg', caption: 'Quince años de amor' },
  // { src: 'fotos/foto6.jpg', caption: 'Para siempre en la memoria' },
  // { src: 'fotos/foto7.jpg', caption: 'Sonrisa que enamora' },
];

/* ─── GRID POPULATION ────────────────────────────── */
function populateGallery() {
  if (PHOTOS.length === 0) return; // keep placeholders

  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  // Clear placeholders
  grid.innerHTML = '';

  // Layout patterns for visual variety
  const layouts = [
    'gallery__item--wide', '', '', '',
    'gallery__item--tall', '', '',
    '', 'gallery__item--wide', ''
  ];

  PHOTOS.forEach((photo, i) => {
    const item = document.createElement('div');
    item.className = 'gallery__item';
    if (layouts[i % layouts.length]) {
      item.classList.add(layouts[i % layouts.length]);
    }
    item.dataset.index = i;

    const img = document.createElement('img');
    img.src = photo.src;
    img.alt = photo.caption || `Foto ${i + 1}`;
    img.loading = 'lazy';

    const overlay = document.createElement('div');
    overlay.className = 'gallery__overlay';
    const span = document.createElement('span');
    span.className = 'gallery__overlay-text';
    span.textContent = photo.caption || 'Mirian Nahomi';
    overlay.appendChild(span);

    item.appendChild(img);
    item.appendChild(overlay);
    grid.appendChild(item);
  });

  // Re-attach click listeners after populating
  initLightbox();
}

/* ─── LIGHTBOX ───────────────────────────────────── */
let currentIndex = 0;
let galleryItems = [];

function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lbImg');
  const lbCap    = document.getElementById('lbCaption');
  const lbClose  = document.getElementById('lbClose');
  const lbPrev   = document.getElementById('lbPrev');
  const lbNext   = document.getElementById('lbNext');

  if (!lightbox || !lbImg) return;

  // Collect clickable items
  const items = document.querySelectorAll('.gallery__item[data-index]');
  galleryItems = [...items];

  function openLightbox(index) {
    currentIndex = index;

    // If real photos exist, use them; otherwise show placeholder message
    if (PHOTOS.length > 0 && PHOTOS[index]) {
      lbImg.src = PHOTOS[index].src;
      lbImg.alt = PHOTOS[index].caption || `Foto ${index + 1}`;
      if (lbCap) lbCap.textContent = PHOTOS[index].caption || '';
    } else {
      lbImg.src = '';
      lbImg.alt = 'Foto próximamente';
      if (lbCap) lbCap.textContent = 'Las fotografías estarán disponibles pronto ✦';
    }

    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  function showNext() {
    const total = PHOTOS.length > 0 ? PHOTOS.length : galleryItems.length;
    currentIndex = (currentIndex + 1) % total;
    openLightbox(currentIndex);
  }

  function showPrev() {
    const total = PHOTOS.length > 0 ? PHOTOS.length : galleryItems.length;
    currentIndex = (currentIndex - 1 + total) % total;
    openLightbox(currentIndex);
  }

  // Attach click to gallery items
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      openLightbox(parseInt(item.dataset.index, 10));
    });
  });

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbPrev)  lbPrev.addEventListener('click', showPrev);
  if (lbNext)  lbNext.addEventListener('click', showNext);

  // Close on backdrop
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowRight')  showNext();
    if (e.key === 'ArrowLeft')   showPrev();
  });

  // Touch swipe support
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  lightbox.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? showNext() : showPrev();
    }
  }, { passive: true });
}

/* ─── INIT ───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  populateGallery();
  initLightbox(); // also runs for placeholder state
});
