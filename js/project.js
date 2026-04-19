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

/* Auto Gallery — reads gallery.json from data-folder, renders thumbnails in right column */
const galleryEl = document.querySelector(".proj-gallery-auto[data-folder]");
if (galleryEl) {
  const folder = galleryEl.dataset.folder;
  fetch(`${folder}/gallery.json`)
    .then(r => r.ok ? r.json() : [])
    .then(files => {
      if (!files.length) { initLightbox(); return; }
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
      galleryEl.appendChild(strip);
      initLightbox();
    })
    .catch(() => initLightbox());
} else {
  initLightbox();
}
