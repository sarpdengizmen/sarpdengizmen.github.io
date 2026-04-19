/* Theme toggle */
(function() {
  const html = document.documentElement;
  const btn  = document.createElement('button');
  btn.id = 'theme-toggle';
  btn.setAttribute('aria-label', 'Toggle dark mode');
  btn.innerHTML =
    '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>' +
    '<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  const hamburgerBtn = document.getElementById('hamburger');
  hamburgerBtn.parentNode.insertBefore(btn, hamburgerBtn);
  function isDark() {
    const t = html.getAttribute('data-theme');
    return t ? t === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  btn.addEventListener('click', function() {
    const next = isDark() ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
})();

/* Hamburger */
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");
hamburger.addEventListener("click", () => {
  const open = hamburger.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", open);
  mobileNav.classList.toggle("open", open);
});
document.querySelectorAll(".mob-link").forEach(l => l.addEventListener("click", () => {
  hamburger.classList.remove("open");
  hamburger.setAttribute("aria-expanded", "false");
  mobileNav.classList.remove("open");
}));

/* Lightbox */
const overlay = document.createElement("div");
overlay.className = "lightbox";
overlay.innerHTML = `
  <button class="lightbox-prev" aria-label="Previous">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
  </button>
  <img class="lightbox-img" src="" alt="">
  <button class="lightbox-next" aria-label="Next">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
  </button>
  <button class="lightbox-close" aria-label="Close">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
  </button>`;
document.body.appendChild(overlay);

const lbImg  = overlay.querySelector(".lightbox-img");
const lbPrev = overlay.querySelector(".lightbox-prev");
const lbNext = overlay.querySelector(".lightbox-next");

let galleryItems = [];
let currentIndex = 0;

function showSlide(index) {
  currentIndex = (index + galleryItems.length) % galleryItems.length;
  const item = galleryItems[currentIndex];
  lbImg.src = item.src;
  lbImg.alt = item.alt || "";
  const show = galleryItems.length > 1;
  lbPrev.style.display = show ? "flex" : "none";
  lbNext.style.display = show ? "flex" : "none";
}
function openLightbox(index) {
  showSlide(index);
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  overlay.classList.remove("open");
  lbImg.src = "";
  document.body.style.overflow = "";
}

lbPrev.addEventListener("click", e => { e.stopPropagation(); showSlide(currentIndex - 1); });
lbNext.addEventListener("click", e => { e.stopPropagation(); showSlide(currentIndex + 1); });
overlay.addEventListener("click", e => {
  if (e.target === overlay || e.target.closest(".lightbox-close")) closeLightbox();
});
document.addEventListener("keydown", e => {
  if (!overlay.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft")  showSlide(currentIndex - 1);
  if (e.key === "ArrowRight") showSlide(currentIndex + 1);
});

function initLightbox() {
  galleryItems = Array.from(document.querySelectorAll(".proj-lead-media img, .proj-thumb-item img"))
    .map(img => ({ el: img, src: img.src, alt: img.alt }));
  galleryItems.forEach((item, i) => {
    item.el.style.cursor = "zoom-in";
    item.el.addEventListener("click", () => openLightbox(i));
  });
}

/* Auto Gallery — horizontal scroll row with arrow buttons */
const galleryEl = document.querySelector(".proj-gallery-auto[data-folder]");
if (galleryEl) {
  const folder = galleryEl.dataset.folder;
  fetch(`${folder}/gallery.json`)
    .then(r => r.ok ? r.json() : [])
    .then(files => {
      if (!files.length) { initLightbox(); return; }

      const wrapper = document.createElement("div");
      wrapper.className = "gallery-scroll-wrapper";

      const chevL = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>`;
      const chevR = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>`;

      const prevBtn = document.createElement("button");
      prevBtn.className = "gallery-scroll-btn";
      prevBtn.setAttribute("aria-label", "Scroll left");
      prevBtn.innerHTML = chevL;

      const nextBtn = document.createElement("button");
      nextBtn.className = "gallery-scroll-btn";
      nextBtn.setAttribute("aria-label", "Scroll right");
      nextBtn.innerHTML = chevR;

      const strip = document.createElement("div");
      strip.className = "proj-thumb-strip";

      files.forEach(file => {
        const ext = file.split(".").pop().toLowerCase();
        const isVideo = ["mp4", "mov", "webm"].includes(ext);
        const item = document.createElement("div");
        item.className = "proj-thumb-item";
        if (isVideo) {
          const v = document.createElement("video");
          v.src = `${folder}/${file}`;
          v.muted = true; v.loop = true; v.autoplay = true;
          v.setAttribute("playsinline", "");
          v.setAttribute("preload", "metadata");
          item.appendChild(v);
        } else {
          const img = document.createElement("img");
          img.src = `${folder}/${file}`;
          img.loading = "lazy";
          item.appendChild(img);
        }
        strip.appendChild(item);
      });

      prevBtn.addEventListener("click", () => strip.scrollBy({ left: -240, behavior: "smooth" }));
      nextBtn.addEventListener("click", () => strip.scrollBy({ left: 240, behavior: "smooth" }));

      wrapper.appendChild(prevBtn);
      wrapper.appendChild(strip);
      wrapper.appendChild(nextBtn);
      galleryEl.appendChild(wrapper);
      initLightbox();
    })
    .catch(() => initLightbox());
} else {
  initLightbox();
}
