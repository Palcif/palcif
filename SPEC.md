# CSS restructure

## What changed

- Split the single 2,458-line `src/App.css` into 20 focused files under `src/styles/` (`base`, `buttons`, `header`, `mobile-menu`, `footer`, `hero`, `tatreez-divider`, `content-grid`, `home-events`, `cultural-highlights`, `page-hero`, `page-section`, `post-detail`, `wp-content`, `activities`, `events`, `blog`, `contact`, `query-status`, `skeleton`, `legacy`), imported back in from `App.css` via `@import`.
- Removed the scroll-reveal animation rules (`.reveal`, `.reveal-stagger`, `.hero-animate`, and their `prefers-reduced-motion` overrides) and unused `.truncate`/`.line-clamp-3` utilities from `src/index.css` — these backed the now-removed `useScrollReveal` hook.
- **Locale strings** (`ar`/`en`/`fi` `common.json`): removed keys tied to the old per-page copy structure (About's story/values sections, Activities' category filter), added keys the new pages need (`common.backToTop`, contact form validation messages, `post.byAuthor`).
- **`.env.example`**: documented `VITE_FORMSPREE_ID` with a comment explaining what breaks (contact form shows an error) if it's unset.
- **`vite.config.ts`**: reordered an import (no behavior change).
- **`src/app/providers.tsx`**: reduced React Query `staleTime` from 5 minutes to 60 seconds, since content edits are no longer purged from the Cloudflare edge cache on save — a shorter client stale time now bounds how long an edit takes to appear on refocus/reconnect.

## Why

`App.css` had grown into one large, hard-to-navigate file mixing layout primitives, per-page styles, and component styles. Splitting it by concern makes each stylesheet easy to find and change without scrolling through unrelated rules, and lets a page's styles be reviewed alongside just that page's markup changes.
Bundled as the "everything else" config/infra layer. Note the locale key additions/removals line up with the `refactor/headless-data-layer` and `feat/back-to-top-ui` branches — merge order matters for translated copy to fully match, though nothing here breaks the TypeScript build on its own.
