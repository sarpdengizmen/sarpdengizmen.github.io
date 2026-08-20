/* Project content — filled from content/projects.js, keyed by <body data-project> */
(function() {
  const slug = document.body.dataset.project;
  if (!slug) return;

  const project = (typeof PROJECTS_BY_SLUG !== "undefined") && PROJECTS_BY_SLUG[slug];
  if (!project) {
    console.error(`No content record for project "${slug}" — check content/projects.js`);
    return;
  }

  const CATEGORY_LABEL = { design: "Design Works", engineering: "Engineering Projects" };
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const tagHtml = tags => tags.map(t => `<span class="tag">${esc(t)}</span>`).join("");
  const set = (selector, html) => {
    const el = document.querySelector(selector);
    if (el) el.innerHTML = html;
  };

  set(".proj-title", esc(project.pageTitle || project.title));

  const meta = [`<span class="proj-category">${esc(CATEGORY_LABEL[project.category] || "")}</span>`];
  const date = project.pageDate || project.date;
  if (date) meta.push(`<span class="proj-date">${esc(date)}</span>`);
  const headerTags = project.pageTags || project.cardTags || [];
  if (headerTags.length) {
    meta.push('<span class="proj-meta-sep"></span>', tagHtml(headerTags));
  }
  set(".proj-meta", meta.join("\n"));

  set(".proj-description", project.body || "");

  const ICONS = {
    github: '<svg viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>',
    external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14 21 3"/></svg>',
  };

  const sidebar = (project.details || []).map(d => {
    const inner = d.tags
      ? `<div class="detail-tags">${tagHtml(d.tags)}</div>`
      : `<p class="detail-value">${d.value || ""}</p>`;
    return `<div class="detail-block">
      <p class="detail-label">${esc(d.label)}</p>
      ${inner}
    </div>`;
  });

  for (const l of project.links || []) {
    sidebar.push(
      `<a href="${l.href}" target="_blank" rel="noopener" class="sidebar-link">` +
      `${ICONS[l.icon] || ICONS.external}${esc(l.label)}</a>`
    );
  }
  set(".proj-sidebar", sidebar.join("\n"));
})();

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
  <video class="lightbox-video" controls loop muted playsinline></video>
  <button class="lightbox-next" aria-label="Next">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
  </button>
  <button class="lightbox-close" aria-label="Close">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
  </button>`;
document.body.appendChild(overlay);

const lbImg  = overlay.querySelector(".lightbox-img");
const lbVid  = overlay.querySelector(".lightbox-video");
const lbPrev = overlay.querySelector(".lightbox-prev");
const lbNext = overlay.querySelector(".lightbox-next");

let galleryItems = [];
let currentIndex = 0;

function clearVideo() {
  lbVid.pause();
  lbVid.removeAttribute("src");
  lbVid.removeAttribute("poster");
  lbVid.load();
}

function showSlide(index) {
  currentIndex = (index + galleryItems.length) % galleryItems.length;
  const item = galleryItems[currentIndex];

  if (item.type === "video") {
    lbVid.pause();
    lbImg.style.display = "none";
    lbImg.removeAttribute("src");
    lbVid.style.display = "block";
    if (item.poster) lbVid.poster = item.poster;
    lbVid.src = item.src;
    lbVid.play().catch(() => {});
  } else {
    clearVideo();
    lbVid.style.display = "none";
    lbImg.style.display = "block";
    lbImg.src = item.src;
    lbImg.alt = item.alt || "";
  }

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
  clearVideo();
  lbImg.removeAttribute("src");
  document.body.style.overflow = "";
}

lbPrev.addEventListener("click", e => { e.stopPropagation(); showSlide(currentIndex - 1); });
lbNext.addEventListener("click", e => { e.stopPropagation(); showSlide(currentIndex + 1); });
overlay.addEventListener("click", e => {
  if (e.target === overlay || e.target.closest(".lightbox-close")) closeLightbox();
});
document.addEventListener("keydown", e => {
  if (!overlay.classList.contains("open")) return;
  if (e.key === "Escape") { closeLightbox(); return; }
  if (e.target === lbVid) return;
  if (e.key === "ArrowLeft")  showSlide(currentIndex - 1);
  if (e.key === "ArrowRight") showSlide(currentIndex + 1);
});

function mediaSource(el) {
  if (el.tagName !== "VIDEO") return el.src;
  const source = el.querySelector("source");
  return el.currentSrc || (source ? source.src : el.src);
}

function initLightbox() {
  const nodes = document.querySelectorAll(
    ".proj-lead-media img, .proj-lead-media video, .proj-thumb-item img, .proj-thumb-item video"
  );
  galleryItems = Array.from(nodes).map(el => ({
    el,
    type: el.tagName === "VIDEO" ? "video" : "image",
    src: mediaSource(el),
    alt: el.alt || "",
    poster: el.getAttribute("poster") || ""
  }));
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
