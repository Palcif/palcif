# Dead code cleanup

## What changed

- Removed `src/shared/hooks/useScrollReveal.ts` — no longer referenced anywhere in the app.
- Removed `src/shared/utils/cn.ts` — no longer referenced anywhere in the app.
- Removed `src/shared/components/LazyImage.tsx` — no longer referenced anywhere in the app.
- Removed the now-unused `motion` (framer-motion) dependency from `package.json`/`package-lock.json`.
- **Locale strings** (`ar`/`en`/`fi` `common.json`): removed keys tied to the old per-page copy structure (About's story/values sections, Activities' category filter), added keys the new pages need (`common.backToTop`, contact form validation messages, `post.byAuthor`).
- **`.env.example`**: documented `VITE_FORMSPREE_ID` with a comment explaining what breaks (contact form shows an error) if it's unset.
- **`vite.config.ts`**: reordered an import (no behavior change).
- **`src/app/providers.tsx`**: reduced React Query `staleTime` from 5 minutes to 60 seconds, since content edits are no longer purged from the Cloudflare edge cache on save — a shorter client stale time now bounds how long an edit takes to appear on refocus/reconnect.

## Why

These were already dead code on `main` before any of the other changes in this pass — none of the current pages or components import them. Removing them here keeps the dependency graph and bundle honest, independent of the data-layer/CSS/UI work happening elsewhere.
Bundled as the "everything else" config/infra layer. Note the locale key additions/removals line up with the `refactor/headless-data-layer` and `feat/back-to-top-ui` branches — merge order matters for translated copy to fully match, though nothing here breaks the TypeScript build on its own.
