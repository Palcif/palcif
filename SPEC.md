# WordPress plugin updates

## What changed

- Added `palcif-content-sections`: unifies Highlights and Activities into native WordPress posts differentiated by category, matching how Blog already works. Keeps the `category` taxonomy shared across languages (untranslated in Polylang) so one category slug (`blog`/`highlights`/`activities`) filters posts in every language, and seeds those three categories on activation. This is the backend counterpart to the frontend's generic `usePage`/`usePost`/`useSectionPosts` data layer, which now reads all three sections through one shape instead of three bespoke post types.
- Added `palcif-polylang-unique-slugs`: scopes WordPress's slug-uniqueness check to each Polylang language, so a translated post can keep the same natural slug as its source post instead of WordPress silently appending a `-2` suffix.
- Removed `palcif-headless-lockdown.php`: previously redirected all WordPress front-end requests to the public frontend URL, restricting WordPress to serving `/graphql`, `/wp-json`, and `wp-admin` only. No longer needed for this deployment.

## Why

These are WordPress-side changes independent of the frontend build — no TypeScript/React code is touched — so they can be reviewed and deployed on their own.
