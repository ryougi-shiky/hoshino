# 星野 Hoshino — Night Sky Photography Blog

A beautifully crafted photography blog theme inspired by the Japanese word **星野** (*hoshino* — "field of stars"). Built for astrophotographers who want an easy-to-deploy, gallery-first blog with a stunning night-sky aesthetic.

---

## ✨ Features

- **Masonry gallery** — photos auto-arrange by aspect ratio (landscape, portrait, panoramic)
- **Photo detail pages** — title, description, GPS location, date, tags, and prev/next navigation
- **Markdown blog posts** — write posts in `.md` with frontmatter; full GFM support (tables, lists, blockquotes, code)
- **Animated star background** — canvas-based twinkle animation across all pages
- **Night sky theme** — deep navy/black palette with silver, gold and blue accents
- **Fully static** — runs on GitHub Pages, Vercel, Netlify, or any CDN
- **Zero-JS fallback** — all content is server-rendered; the star animation is purely progressive enhancement

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
# → http://localhost:3000

# 3. Build for production
npm run build
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
│   ├── StarBackground.tsx   # Animated canvas star field
│   ├── Navigation.tsx       # Top nav bar (responsive)
│   ├── GalleryGrid.tsx      # Masonry grid wrapper
│   ├── PhotoCard.tsx        # Single photo card with hover effects
│   ├── PostCard.tsx         # Blog post summary card
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
2. **Register the photo** in `lib/photos.ts`:

```ts
{
  id: "my-unique-slug",
  title: "Title of the photo",
  description: "A sentence or two about the shot.",
  location: "City, Country",
  date: "2024-07-20",
  tags: ["milky-way", "landscape"],
  width: 4000,   // actual pixel width (used for aspect-ratio layout)
  height: 2667,  // actual pixel height
  src: "/images/my-photo.jpg",
  featured: true,   // show on home page
}
```

The gallery will automatically arrange photos using CSS columns masonry based on their aspect ratios.

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

### Vercel (recommended — zero config)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Push to GitHub and connect the repo in the Vercel dashboard. Done.

### GitHub Pages (static export)

1. In `next.config.ts`, uncomment `output: "export"`.
2. Run `npm run build` — static files are emitted to `out/`.
3. Push the `out/` directory to your `gh-pages` branch, or configure GitHub Actions.

> **Note:** when using static export, remove the `output: "export"` comment marker and ensure all dynamic routes have `generateStaticParams()` defined (they already do).

### Netlify

Connect the GitHub repo, set the build command to `npm run build` and publish directory to `.next`.

---

## 🎨 Theming

All colours are CSS custom properties in `app/globals.css`:

| Variable | Default | Purpose |
|---|---|---|
| `--bg-deep` | `#060918` | Page background |
| `--bg-card` | `#0f1535` | Card backgrounds |
| `--accent-silver` | `#c8d8f0` | Primary accent |
| `--accent-gold` | `#f0d68c` | Highlight / labels |
| `--accent-blue` | `#4a9eff` | Tags / links / CTA |
| `--text-primary` | `#e8eef8` | Body text |
| `--text-secondary` | `#8fa8d0` | Muted body text |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, SSG) |
| Language | TypeScript |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Markdown | [remark](https://github.com/remarkjs/remark) + [remark-gfm](https://github.com/remarkjs/remark-gfm) |
| Images | Next.js `<Image>` with SVG placeholder support |
| Animation | Canvas API (star field) |
| Deployment | Vercel / GitHub Pages / Netlify |

---

## 📄 License

MIT
