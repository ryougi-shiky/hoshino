# 星野 Hoshino — Travel Photo Journal

A minimal photo journal. Just photos, dates, locations, and short captions.

---

## Getting Started

```bash
npm install
npm run dev
# → http://localhost:3000
```

---

## Adding Photos

1. Drop your image in `public/images/`
2. Add an entry to `content/photos.yml`:

```yaml
- src: /images/my-photo.jpg
  date: 2024-07-20
  location: City, Country
  caption: A short sentence about this moment.
```

That's it. Image dimensions are auto-detected at build time.

---

## Themes

Three themes available via the dot in the top-right corner:

- **Starfield** — dark with twinkling star animation (default)
- **Dark** — neutral dark, no stars
- **Light** — clean white

---

## Deployment

```bash
# Docker
docker compose up --build

# Or build for Vercel / static hosting
npm run build
```

For static export (GitHub Pages / CDN), change `output` to `"export"` in `next.config.ts`.

---

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router, static)
- [Tailwind CSS v4](https://tailwindcss.com)
- TypeScript
- YAML for photo data

---

MIT
