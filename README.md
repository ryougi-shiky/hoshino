# 星野 Hoshino — Photography Blog

A beautifully crafted photography blog theme inspired by the Japanese word **星野** (*hoshino* — "field of stars"). Built for photographers who want an easy-to-deploy, gallery-first blog with an elegant, themeable UI.

---

## ✨ Features

- **Masonry gallery** — photos auto-arrange by aspect ratio (landscape, portrait, panoramic)
- **Photo detail pages** — title, description, GPS location, date, tags, and prev/next navigation
- **Markdown blog posts** — write posts in `.md` with frontmatter; full GFM support (tables, lists, blockquotes, code)
- **8 colour themes** — glassmorphism panels that can be tinted to match your photo collection; persists to `localStorage`
- **Glassmorphism UI** — frosted-glass navigation bar and cards with `backdrop-filter` blur
- **Starfield animation** — twinkling star canvas active only in the Starfield theme; automatically stops for all other themes
- **Fully static** — runs on GitHub Pages, Vercel, Netlify, or any CDN
- **Zero-JS fallback** — all content is server-rendered; the star animation is purely progressive enhancement

---

## 🚀 Getting Started

### Option 1 — Local (Node.js)

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
# → http://localhost:3000

# 3. Build for production
npm run build
```

### Option 2 — Docker

```bash
# Build and run with Docker Compose (recommended)
docker compose up --build
# → http://localhost:3000

# Or build and run manually
docker build -t hoshino .
docker run -p 3000:3000 hoshino
```

---

## 📁 Project Structure

```
hoshino/
├── app/                  # Next.js App Router pages
│   ├── page.tsx          # Home page (hero + featured gallery + blog preview)
│   ├── gallery/page.tsx  # Full masonry gallery
│   ├── photos/[id]/      # Individual photo detail page
│   └── blog/
│       ├── page.tsx      # Blog post list
│       └── [slug]/       # Individual blog post (rendered from Markdown)
│
├── components/
│   ├── Navigation.tsx            # Sticky frosted-glass nav with theme picker
│   ├── ThemeProvider.tsx         # Restores chosen theme from localStorage on load
│   ├── ConditionalStarBackground.tsx  # Mounts star canvas only for Starfield theme
│   ├── StarBackground.tsx        # Canvas-based twinkling star animation
│   ├── GalleryGrid.tsx           # Masonry grid wrapper
│   ├── PhotoCard.tsx             # Photo card with hover overlay (title, location, tags)
│   ├── PostCard.tsx              # Blog post summary card
│   └── Footer.tsx
│
├── lib/
│   ├── photos.ts            # Photo metadata (title, location, tags, dimensions, src)
│   └── posts.ts             # Markdown post loader (gray-matter + remark)
│
├── content/
│   └── posts/               # Blog posts as .md files with frontmatter
│
└── public/
    └── images/              # Photo assets (replace SVG placeholders with real JPEGs)
```

---

## 📸 Adding Your Own Photos

1. **Add the image file** to `public/images/` (JPEG or WebP recommended).
2. **Create a markdown file** in `content/photos/` (the filename becomes the URL slug):

```markdown
---
title: "My Photo Title"
location: "City, Country"
date: "2024-07-20"
tags: ["milky-way", "landscape"]
src: "/images/my-photo.jpg"
featured: true   # show on home page
---

A sentence or two about the shot. Full markdown is supported here —
you can write as much or as little as you like.
```

That's it. Image dimensions are **auto-detected** at build time, so you don't need to specify width/height. The gallery will automatically arrange photos using CSS columns masonry based on their aspect ratios.

---

## ✏️ Writing Blog Posts

Create a new `.md` file in `content/posts/`:

```markdown
---
title: "My Post Title"
date: "2024-08-01"
excerpt: "One or two sentence summary shown in the blog list."
tags: ["astrophotography", "travel"]
coverImage: "/images/my-cover.jpg"   # optional
author: "Your Name"
---

## Section Heading

Write your post content here. Full GitHub Flavored Markdown is supported:
tables, code blocks, blockquotes, bold/italic, etc.
```

The file name (without `.md`) becomes the URL slug, e.g. `content/posts/my-post-title.md` → `/blog/my-post-title`.

---

## 🌐 Deployment

### Docker (self-hosted)

Run the app as a container on any server or cloud VM:

```bash
docker compose up --build -d
```

The app listens on port **3000**.  Map it to port 80/443 with a reverse proxy (e.g. Nginx or Caddy) and a TLS certificate for production use.

> **GitHub Pages and Vercel do not run Docker containers directly.**
> GitHub Pages hosts only static files, and Vercel manages its own serverless runtime.
> Use the Docker option when self-hosting on a VPS or in a Kubernetes cluster.

### Vercel (recommended — zero config)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Push to GitHub and connect the repo in the Vercel dashboard. Done.
The `output: "standalone"` setting in `next.config.ts` is ignored by Vercel — it uses its own optimized runtime automatically.

### GitHub Pages (static export)

1. In `next.config.ts`, change `output` from `"standalone"` to `"export"`.
2. Run `npm run build` — static files are emitted to `out/`.
3. Push the `out/` directory to your `gh-pages` branch, or configure GitHub Actions.

> **Note:** when using static export, ensure all dynamic routes have `generateStaticParams()` defined (they already do).

### Netlify

Connect the GitHub repo, set the build command to `npm run build` and publish directory to `.next`.

---

## 🎨 Theming

Click the coloured swatch button in the top-right navigation to choose from **8 built-in themes**. The selection is saved to `localStorage` and restored automatically on every page load.

| Theme | Body background | Glass tint | Notes |
|---|---|---|---|
| **Starfield ✦** | `#060918` navy | Blue | Default — twinkling star canvas |
| **Monochrome** | `#0c0c0e` near-black | Neutral | Stars off — works with any photo genre |
| **Arctic** | `#060918` navy | Ice blue | |
| **Ocean** | `#060918` navy | Cyan / teal | |
| **Sunset** | `#060918` navy | Amber / orange | |
| **Lavender** | `#060918` navy | Purple | |
| **Emerald** | `#060918` navy | Green | |
| **White** | `#f8f8fc` white | White glass | Full light mode |

### How it works

Themes are implemented with CSS `[data-theme]` attribute selectors on `<html>`. Each theme overrides a set of CSS custom properties that control only glass panels — photos are never tinted.

Key CSS variables:

| Variable | Purpose |
|---|---|
| `--glass-bg` | Glass panel fill |
| `--glass-border` | Glass panel border |
| `--theme-primary` | Accent colour (buttons, hover glows) |
| `--nav-bg` | Navigation bar fill |
| `--bg-deep` | Page background (overridden in Monochrome / White) |
| `--text-primary` | Body text (overridden in White) |

To add a custom theme, append a new `[data-theme="my-theme"]` block in `app/globals.css`, then add a matching entry to the `THEMES` array in `components/Navigation.tsx` and the `Theme` union type in `components/ThemeProvider.tsx`.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, SSG) |
| Language | TypeScript |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) + custom CSS variables |
| Markdown | [remark](https://github.com/remarkjs/remark) + [remark-gfm](https://github.com/remarkjs/remark-gfm) |
| Images | Next.js `<Image>` with SVG placeholder support |
| Animation | Canvas API (conditional star field for Starfield theme) |
| Deployment | Vercel / GitHub Pages / Netlify |

---

## 📄 License

MIT
