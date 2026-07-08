# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server at http://localhost:3000
npm run build        # Production build (output: standalone by default)
npm run lint         # ESLint (flat config, next/core-web-vitals + typescript)
npm test             # Playwright integration tests (requires build in CI)

# Run a single Playwright test file
npx playwright test tests/home.spec.ts

# Run tests with headed browser for debugging
npx playwright test --headed
```

Playwright auto-starts the dev server locally (`npm run dev`) or uses `npm start` in CI. Tests run against `http://localhost:3000` in Chromium only.

## Architecture

Next.js 16 App Router photography blog with Tailwind CSS v4. All pages are statically generated (SSG).

**Data layer — no database:**
- Photos: hardcoded array in `lib/photos.ts`. Add/edit entries there; each photo needs an image in `public/images/`.
- Blog posts: Markdown files in `content/posts/`. Parsed at build time via gray-matter + remark in `lib/posts.ts`. Filename = URL slug.

**Theming:**
- 8 colour themes controlled by `data-theme` attribute on `<html>`, set via `ThemeProvider` (client component, reads `localStorage`).
- Theme CSS variables defined in `app/globals.css` under `[data-theme="..."]` selectors.
- The star-field canvas (`StarBackground.tsx`) only mounts when Starfield theme is active, gated by `ConditionalStarBackground.tsx`.

**Path alias:** `@/*` maps to the project root.

## Adding a Theme

1. Add `[data-theme="name"]` block in `app/globals.css` with the CSS custom properties.
2. Add entry to `THEMES` array in `components/Navigation.tsx`.
3. Add to the `Theme` union type in `components/ThemeProvider.tsx`.

## Git Workflow

**Never commit directly to main.** Always:
1. Create a new branch
2. Commit and push
3. Open a PR against main
4. Wait for CI to pass
5. Repo owner reviews and merges manually

**Branch naming:** `<type>/<short-description>`
- Types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`
- Examples: `feat/add-aurora-theme`, `fix/gallery-layout-overflow`, `chore/update-deps`

**Commit messages:** Conventional Commits — `type(scope): description`
- Scopes: `gallery`, `blog`, `theme`, `nav`, `deps`, `ci`, `config`
- Examples: `feat(gallery): add lightbox zoom`, `fix(theme): persist toggle state`
- Enforced locally by commitlint + husky (commit-msg hook)

## Deployment Modes

- **Standalone** (default): `output: "standalone"` in `next.config.ts`. Used by Docker and Vercel.
- **Static export**: Change `output` to `"export"` for GitHub Pages/CDN. All routes already have `generateStaticParams()`.
