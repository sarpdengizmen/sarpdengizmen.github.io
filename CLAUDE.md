# Portfolio — Claude Guidelines

## What this project is

A static portfolio website for Ege Sarp Dengizmen, a final-year Mechanical Engineering Master's student at Politecnico di Milano (BSc from METU) specialising in mechatronics and robotics. No build tools, no framework — plain HTML/CSS/JS only.

Deployed at: `sarpdengizmen.github.io` (GitHub Pages, `main` branch, root `/`).

---

## File structure

```
portfolio/
├── index.html          ← main page (inline CSS + JS)
├── css/project.css     ← shared stylesheet for all project pages
├── projects/           ← one .html file per project
├── content/projects.js ← ALL project copy: blurbs, prose, tags, sidebar details
├── project-brief.md    ← full design spec and change recipes
└── CLAUDE.md           ← this file
```

Each project folder at the root (e.g. `BloomingRose/`, `MIDIBOT/`) contains raw media assets referenced by relative paths.

---

## Rules

### Never push without user approval

Always test locally first. The local server runs with:
```
python3 -m http.server 8080
```
Then show the user the URL (`http://localhost:8080`) and wait for approval before running `git push`.

### Every project must have a dedicated page

Every entry in `DESIGN_PROJECTS` or `ENGINEERING_PROJECTS` in `index.html` must have a corresponding `projects/<slug>.html`. Cards link to their page via the `slug` field — do not add a project without also creating its page.

### Design tokens are the source of truth

The CSS custom properties in `index.html :root` and `css/project.css :root` must stay in sync. If you change a token in one place, change it in both.

The site is theme-aware: light on `:root`, dark on `[data-theme="dark"]` plus a
`prefers-color-scheme` fallback. Both blocks must be updated together.

| Token          | Light                       | Dark                        |
|----------------|-----------------------------|-----------------------------|
| `--bg`         | `#D2D4D8`                   | `#242424`                   |
| `--surface`    | `#E8E9EB`                   | `#353535`                   |
| `--surface-2`  | `#F3F4F5`                   | `#424242`                   |
| `--accent`     | `#EF6F6C`                   | `#98CE00`                   |
| `--accent-glow`| `rgba(239,111,108,0.12)`    | `rgba(152,206,0,0.14)`      |
| `--text`       | `#353535`                   | `#E8E9EB`                   |
| `--text-muted` | `#284B63`                   | `#9EA5B0`                   |
| `--border`     | `#BFC1C7`                   | `#484848`                   |
| `--navbar-bg`  | `rgba(210,212,216,0.92)`    | `rgba(36,36,36,0.92)`       |
| `--tag-border` | `rgba(239,111,108,0.25)`    | `rgba(152,206,0,0.25)`      |

`css/project.css` additionally defines `--thumb-hover` and `--link-ul` (accent at 50% / 30%),
used only on project pages.

### Writing style for any copy you generate

This applies to every description, blurb, prose body, tag, label, alt text and
commit message you write for this site. It does not apply to text the user wrote:
never rewrite existing copy to satisfy this rule unless asked.

**No em dashes.** Not in card blurbs, not in prose, not in sidebar values. Split the
sentence in two, or use a comma. Do not swap in ` - ` as a substitute. Colons are
fine. The interpunct `·` already used in sidebar values (`Fusion 360 · Bambu Studio`)
stays.

**No AI-tell vocabulary.** Avoid: delve, leverage, utilise, robust, seamless,
seamlessly, elevate, showcase, boasts, harness, unlock, empower, cutting-edge,
state-of-the-art, game-changing, transformative, testament, tapestry, realm,
landscape, journey, dive into, at the forefront, pushing the boundaries.

**No AI-tell sentence shapes:**

- "It's not just X, it's Y"
- "Whether you're X or Y"
- "In today's fast-paced world"
- Opening with "Discover", "Explore" or "Introducing"
- Three-item lists used for rhythm rather than because there are three things
- Closing a paragraph with a summary line that repeats what was just said

**Write like the existing entries.** Plain, concrete, specific. Name the actual
part, method or number instead of praising it. Prefer "an LQR balance loop tuned
against a measured state-space model" over "a sophisticated control solution".
State what was built and what it does. No marketing register, no emoji, no hype
adjectives.

### All project copy lives in `content/projects.js`

One record per project holds the card blurb, the full page prose, both tag lists,
the sidebar detail blocks and the sidebar links. `index.html` builds the cards from
it and `js/project.js` fills each project page from it, matched by
`<body data-project="<slug>">`.

Never write project copy or tags directly into `index.html` or `projects/*.html` —
they are shells. `.proj-meta`, `.proj-title`, `.proj-description` and
`.proj-sidebar` must stay empty in the markup.

`cardTags` and `pageTags` are deliberately separate: several projects show different
tags on the card than on their own page. Same for the optional `pageTitle` and
`pageDate` overrides. Only collapse them if the difference is unintentional.

Consequence to keep in mind: page prose is injected at runtime, so it is not in the
static HTML for crawlers or with JS disabled. The home-page cards already worked
this way before the change.

### Maintain the prev/next ring

Project pages are linked in a closed ring: all engineering projects first, then all
design projects, each group newest to oldest by date. Current order:

```
loco-manipulation → soft-robotics → microros-bot → rotary-pendulum
→ mode-analysis → midi-robot → wind-turbine → tuned-mass-damper
→ blooming-rose → isaac-game-box → snowboard-hanger → desk-lamp → mini-fan
→ loco-manipulation
```

When inserting or removing a project, update the two adjacent pages' prev/next links.
Insert by date within the right group rather than appending to the end.

### No comments in HTML/CSS unless necessary

Keep markup clean. Only add a comment if the reason is non-obvious.

### Media handling

- Videos: `autoplay muted loop playsinline preload="metadata"`, include `poster` when available.
- Images: `loading="lazy"` on gallery images, `loading="eager"` on hero images.
- Never reference media outside the project's own folder.

---

## Common tasks

### Add a new project

1. Drop media into a new folder at the repo root.
2. Add a record to `PROJECTS` in `content/projects.js`, with `category` set to
   `"design"` or `"engineering"`.
3. Create `projects/<slug>.html` by copying any existing page, then set
   `<body data-project="<slug>">`, the `<title>`, the lead media, the gallery
   folder, and the prev/next links. Leave `.proj-meta`, `.proj-title`,
   `.proj-description` and `.proj-sidebar` empty — they fill from the content file.
4. Insert into the prev/next ring and update the two adjacent pages.
5. Test locally, then push.

### Change accent colour

Edit `--accent` and `--accent-glow` in both `index.html` and `css/project.css`.

### Re-order projects

Move records within `PROJECTS` in `content/projects.js`. Order within a category
sets card order. Update the prev/next ring in all affected project pages.

### Update a project description

Edit the record in `content/projects.js` — `card` for the thumbnail blurb, `body`
for the full page prose. Both places update from that one edit; no HTML to touch.
