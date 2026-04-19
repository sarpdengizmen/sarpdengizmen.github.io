# Portfolio Website — Project Brief

This document is the reference spec for the portfolio site (`index.html`).
Use it as a guide when you want to change behaviour, add sections, or update styling.

---

## Goal

A lean, minimal, dark-mode portfolio to showcase personal projects.
Target audience: recruiters, researchers, collaborators.
Tone: clean and sophisticated — not a generic resume site, but not over-designed.

---

## Tech Stack

**Single-file static site** — `index.html` with embedded `<style>` and `<script>`.

- No build step, no bundler, no JS framework.
- Google Fonts (Inter) loaded via `<link>` — can be replaced with a local font.
- All external images/videos are local file references (relative paths from `index.html`).

---

## Design System

| Token              | Value              | Usage                               |
|--------------------|--------------------|-------------------------------------|
| `--bg`             | `#111111`          | Page background                     |
| `--surface`        | `#1A1A1A`          | Cards, nav drawer, tab bar          |
| `--surface-2`      | `#222222`          | Card media placeholder bg           |
| `--accent`         | `#FF6B2B`          | Buttons, active tab, hover border   |
| `--accent-glow`    | `rgba(255,107,43,0.14)` | Card hover shadow, tag bg       |
| `--text`           | `#F0F0F0`          | Primary body text                   |
| `--text-muted`     | `#888888`          | Secondary text, nav links           |
| `--border`         | `#2A2A2A`          | Dividers, card borders, form lines  |

**Font:** Inter (300, 400, 500, 600, 700) — swap via `--font` CSS variable.

**No gradients, no heavy shadows.** Orange accent on hover states, active tabs, and CTAs only.

---

## Layout

- **Single page**, smooth-scroll anchors: `#hero`, `#projects`, `#contact`
- **Max width:** 1200 px, centred, 24 px side padding
- **Nav height:** 64 px fixed

### Breakpoints

| Breakpoint    | Behaviour                                      |
|---------------|------------------------------------------------|
| ≥ 1024 px     | 3-column project grid, full nav links          |
| 768 – 1023 px | 2-column project grid, full nav links          |
| < 768 px      | 1-column grid, hamburger menu, full-width tabs |

---

## Sections

### 1. Navbar

- Logo (name) on left → scrolls to `#hero`
- Links: Projects, Contact (right)
- On mobile: hamburger slides in a dropdown panel
- Glass blur effect (`backdrop-filter: blur(14px)`)

**To change:**  
Find `<!-- SWAP: update logo text -->` in the HTML.

---

### 2. Hero

- Tagline (small caps, accent colour)
- Full name (large display type)
- 2–3 sentence bio
- CTA button → `#projects`

**To change:**  
Find all `<!-- SWAP: … -->` comments in the `#hero` section.

---

### 3. Projects

Tabbed interface with two groups:

| Tab                   | Count | Default? |
|-----------------------|-------|----------|
| Engineering Projects  | 7     | ✅ Yes   |
| Design Works          | 3     | No       |

Engineering is default because it has more projects. Tabs switch with a fade animation.
Each panel shows a **responsive CSS Grid** of cards.

#### Card anatomy

```
┌─────────────────────┐
│  media (16:9)       │  video or image
├─────────────────────┤
│  Title              │
│  Description (3 ln) │  clamped with -webkit-line-clamp
│  [tag] [tag]        │
└─────────────────────┘
```

- Hover: `translateY(-5px)` + orange border + orange glow
- Entrance: slide-up + fade via `@keyframes cardReveal` (Intersection Observer)

#### Media priority per card

1. Video (`.mp4`, `.MOV`, `.mov`) — autoplay, muted, loop, playsinline, poster if available
2. Animated GIF — rendered as `<img>`
3. Static image (`.jpg`, `.jpeg`, `.png`, `.webp`)

#### Adding a new project

Open `index.html`, find `const DESIGN_PROJECTS` or `const ENGINEERING_PROJECTS`,
and add an object following this shape:

```js
{
  title: "Project Name",
  description: "2–3 sentence description.",
  tags: ["Tag One", "Tag Two"],
  media: {
    type: "video",          // "video" | "image" | "gif"
    src: "FolderName/file.mp4",
    poster: "FolderName/poster.jpg",  // optional, for videos
  },
  link: "https://github.com/…",  // optional
}
```

---

### 4. Contact

- Email link (`<a href="mailto:…">`)
- GitHub button
- LinkedIn button

**To change:**  
Find `<!-- SWAP: your email -->` and `<!-- SWAP: replace href values … -->` in the HTML.

---

## Animations & Interactions

| Feature            | Implementation                                      |
|--------------------|-----------------------------------------------------|
| Scroll reveal      | `IntersectionObserver`, threshold 0.1, 75 ms stagger per card |
| Tab fade           | CSS `@keyframes panelIn` (opacity + translateY)     |
| Card hover lift    | CSS `transition: transform 0.22s ease`              |
| Hamburger morph    | CSS transitions on child `<span>` elements          |
| Smooth scroll      | `html { scroll-behavior: smooth; }`                 |

---

## File Map

```
portfolio/
├── index.html                     ← the entire site
├── project-brief.md               ← this file
├── AboutMe/
│   └── CV_11_2025.pdf
├── BloomingRose/                  ← Design
│   ├── BloomingRose.MOV  (hero video)
│   └── BloomingRose.png  (poster)
├── DeskLamp/                      ← Design
│   ├── DeskLamp1.MOV     (hero video)
│   └── DeskLampRender.png (poster)
├── IsaacGameBox/                  ← Design
│   └── FourSoulsBoxRender.png
├── MicroRosBot/                   ← Engineering
│   ├── Operation_Video.mp4
│   └── RobotImage.JPEG   (poster)
├── MIDIBOT/                       ← Engineering
│   └── MIDIBOT.png
├── ModeAnalysis/                  ← Engineering
│   └── ImpulseGIF.gif
├── RotaryInvertedPendulum/        ← Engineering
│   └── InvPendulum.MOV
├── SoftRobotics/                  ← Engineering
│   └── SoftRoboticsVid.MOV
├── TunedMassDampener/             ← Engineering
│   └── ProjectDemonstration.mp4
└── WindTurbine/                   ← Engineering
    ├── 5789dcdb50e749aa80dd59c4c3c15aaa.mp4
    └── WindTurbine.png   (poster)
```

---

## Common Change Recipes

### Change accent colour
Edit `--accent` and `--accent-glow` in `:root {}`.

### Add a CV download button to Hero
```html
<a href="AboutMe/CV_11_2025.pdf" download class="btn btn-secondary">Download CV</a>
```
Add a `.btn-secondary` rule mirroring `.btn-primary` but with `border-color: var(--border)`.

### Add a project link (GitHub/live) to a card
The `link` field in the project data is already stored.
To surface it, add inside `buildCard()`:
```js
const linkHtml = project.link
  ? `<a href="${project.link}" target="_blank" rel="noopener" class="card-link">View →</a>`
  : "";
```
Then add it below `.card-tags` in the returned HTML string.

### Re-order projects
Projects render in array order — just move the objects around in the JS arrays.

### Rename or reclassify a project (Design ↔ Engineering)
Move the object between `DESIGN_PROJECTS` and `ENGINEERING_PROJECTS`.

### Make Engineering non-default
Swap the `active` class and `aria-selected="true"` from `#tab-engineering` to `#tab-design`,
and swap the `active` class from `#panel-engineering` to `#panel-design`.
