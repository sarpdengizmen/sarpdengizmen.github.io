# Portfolio — Claude Guidelines

## What this project is

A static portfolio website for Ege Sarp Dengizmen, a final-year Mechanical Engineering Master's student at METU specialising in mechatronics and robotics. No build tools, no framework — plain HTML/CSS/JS only.

Deployed at: `sarpdengizmen.github.io` (GitHub Pages, `main` branch, root `/`).

---

## File structure

```
portfolio/
├── index.html          ← main page (inline CSS + JS)
├── css/project.css     ← shared stylesheet for all project pages
├── projects/           ← one .html file per project
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

| Token         | Value                    |
|---------------|--------------------------|
| `--bg`        | `#111111`                |
| `--surface`   | `#1A1A1A`                |
| `--accent`    | `#FF6B2B`                |
| `--text`      | `#F0F0F0`                |
| `--text-muted`| `#888888`                |
| `--border`    | `#2A2A2A`                |

### Maintain the prev/next ring

Project pages are linked in a closed ring. Current order:

```
blooming-rose → isaac-game-box → snowboard-hanger → mini-fan → microros-bot
→ desk-lamp → rotary-pendulum → mode-analysis → midi-robot → wind-turbine
→ tuned-mass-damper → soft-robotics → blooming-rose
```

When inserting or removing a project, update the two adjacent pages' prev/next links.

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
2. Add an entry to `DESIGN_PROJECTS` or `ENGINEERING_PROJECTS` in `index.html` with a `slug` field.
3. Create `projects/<slug>.html` using the template from any existing project page.
4. Insert into the prev/next ring and update the two adjacent pages.
5. Test locally, then push.

### Change accent colour

Edit `--accent` and `--accent-glow` in both `index.html` and `css/project.css`.

### Re-order projects

Move objects within the JS arrays in `index.html`. Update the prev/next ring in all affected project pages.

### Update a project description

Edit the `description` field in `index.html` (card blurb) **and** the prose in `projects/<slug>.html` (full page).
