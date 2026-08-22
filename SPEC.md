# CSS restructure

## What changed

- Split the single 2,458-line `src/App.css` into 20 focused files under `src/styles/` (`base`, `buttons`, `header`, `mobile-menu`, `footer`, `hero`, `tatreez-divider`, `content-grid`, `home-events`, `cultural-highlights`, `page-hero`, `page-section`, `post-detail`, `wp-content`, `activities`, `events`, `blog`, `contact`, `query-status`, `skeleton`, `legacy`), imported back in from `App.css` via `@import`.
- Removed the scroll-reveal animation rules (`.reveal`, `.reveal-stagger`, `.hero-animate`, and their `prefers-reduced-motion` overrides) and unused `.truncate`/`.line-clamp-3` utilities from `src/index.css` — these backed the now-removed `useScrollReveal` hook.

## Why

`App.css` had grown into one large, hard-to-navigate file mixing layout primitives, per-page styles, and component styles. Splitting it by concern makes each stylesheet easy to find and change without scrolling through unrelated rules, and lets a page's styles be reviewed alongside just that page's markup changes.
