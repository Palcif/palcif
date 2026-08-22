# Back-to-top and scroll-reset UI

## What changed
Replaces per-page-type GraphQL hooks and queries with a generic content model backed by the new `palcif-content-sections` WordPress plugin (see `chore/wordpress-plugins`):

- **New hooks**: `usePage` (generic WP `page` post type — About, Contact, Home), `usePost` (single native post, e.g. a blog/highlight/activity detail page), `useSectionPosts` (posts filtered by one of the three section categories).
- **New `src/features/posts/sections.ts`**: defines the three content sections (`blog`, `highlights`, `activities`) — route path, WP category slug, and i18n keys for noun/back-label — as a single source of truth `langRoutes.tsx` and the section pages read from instead of three hardcoded, near-identical route/page implementations.
- **Removed**: `useActivities`/`useActivityDetail`, `useBlogPost`/`useBlogPosts`, `useHighlights`/`useHighlightDetail`, `useAboutPage`/`useContactPage`/`useHomePage`, and their corresponding `.graphql` query files — all superseded by the three generic hooks above.
- **Routing** (`langRoutes.tsx`): `ActivityDetail`, `HighlightDetail`, and `BlogPost` pages collapse into one `PostDetail` page, routed per-section via `SECTIONS`.
- **Pages**: `About`, `Activities`, `Blog`, `Contact`, `EventDetail`, `Highlights`, `Home` updated to consume the new hooks; `PostDetail` added; `ActivityDetail`, `BlogPost`, `HighlightDetail` removed.
- **`src/pages/Contact/contactFormSchema.ts`**: extracted form validation (previously inline) into its own schema module.
- **`src/shared/utils/url.ts`**: removed `toSafeRelativePath`, which only existed to validate the old detail-page relative-path fallback logic.
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
- Added `ScrollToTop`: resets scroll position to the top on every route change (React Router doesn't do this on its own), using `behavior: 'instant'` so it isn't a visible animated scroll.
- Added `BackToTopButton`: a floating button that appears after scrolling 480px down and smooth-scrolls back to the top on click.
- Wired both into `RootLayout.tsx`.
- Added the `ArrowUp` icon used by `BackToTopButton`.

## Why
The three content types (activities, highlights, blog posts) were previously three separate WP post types, each with its own hook, query, and near-duplicate list/detail page. The new `palcif-content-sections` plugin unifies them into native posts differentiated by category, so the frontend can read all three through one generic shape instead of maintaining three parallel implementations that only differed in which category they filtered by.
These are WordPress-side changes independent of the frontend build — no TypeScript/React code is touched — so they can be reviewed and deployed on their own.
These were already dead code on `main` before any of the other changes in this pass — none of the current pages or components import them. Removing them here keeps the dependency graph and bundle honest, independent of the data-layer/CSS/UI work happening elsewhere.
Bundled as the "everything else" config/infra layer. Note the locale key additions/removals line up with the `refactor/headless-data-layer` and `feat/back-to-top-ui` branches — merge order matters for translated copy to fully match, though nothing here breaks the TypeScript build on its own.
Small, self-contained navigation affordance — doesn't touch data fetching, routing structure, or styling architecture, so it ships independently of the rest of this pass. (Its `common.backToTop` translation key lives in `chore/config-and-i18n`.)


