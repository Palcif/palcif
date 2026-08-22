# WordPress plugin updates

## What changed
- Removed `src/shared/hooks/useScrollReveal.ts` — no longer referenced anywhere in the app.
- Removed `src/shared/utils/cn.ts` — no longer referenced anywhere in the app.
- Removed `src/shared/components/LazyImage.tsx` — no longer referenced anywhere in the app.
- Removed the now-unused `motion` (framer-motion) dependency from `package.json`/`package-lock.json`.
- **Locale strings** (`ar`/`en`/`fi` `common.json`): removed keys tied to the old per-page copy structure (About's story/values sections, Activities' category filter), added keys the new pages need (`common.backToTop`, contact form validation messages, `post.byAuthor`).
- **`.env.example`**: documented `VITE_FORMSPREE_ID` with a comment explaining what breaks (contact form shows an error) if it's unset.
- **`vite.config.ts`**: reordered an import (no behavior change).
- **`src/app/providers.tsx`**: reduced React Query `staleTime` from 5 minutes to 60 seconds, since content edits are no longer purged from the Cloudflare edge cache on save — a shorter client stale time now bounds how long an edit takes to appear on refocus/reconnect.
- Added `palcif-content-sections`: unifies Highlights and Activities into native WordPress posts differentiated by category, matching how Blog already works. Keeps the `category` taxonomy shared across languages (untranslated in Polylang) so one category slug (`blog`/`highlights`/`activities`) filters posts in every language, and seeds those three categories on activation. This is the backend counterpart to the frontend's generic `usePage`/`usePost`/`useSectionPosts` data layer, which now reads all three sections through one shape instead of three bespoke post types.
- Added `palcif-polylang-unique-slugs`: scopes WordPress's slug-uniqueness check to each Polylang language, so a translated post can keep the same natural slug as its source post instead of WordPress silently appending a `-2` suffix.
- Removed `palcif-headless-lockdown.php`: previously redirected all WordPress front-end requests to the public frontend URL, restricting WordPress to serving `/graphql`, `/wp-json`, and `wp-admin` only. No longer needed for this deployment.

## Why

These are WordPress-side changes independent of the frontend build — no TypeScript/React code is touched — so they can be reviewed and deployed on their own.
These were already dead code on `main` before any of the other changes in this pass — none of the current pages or components import them. Removing them here keeps the dependency graph and bundle honest, independent of the data-layer/CSS/UI work happening elsewhere.
Bundled as the "everything else" config/infra layer. Note the locale key additions/removals line up with the `refactor/headless-data-layer` and `feat/back-to-top-ui` branches — merge order matters for translated copy to fully match, though nothing here breaks the TypeScript build on its own.
