# Headless data-layer refactor

## What changed

Replaces per-page-type GraphQL hooks and queries with a generic content model backed by the new `palcif-content-sections` WordPress plugin (see `chore/wordpress-plugins`):

- **New hooks**: `usePage` (generic WP `page` post type — About, Contact, Home), `usePost` (single native post, e.g. a blog/highlight/activity detail page), `useSectionPosts` (posts filtered by one of the three section categories).
- **New `src/features/posts/sections.ts`**: defines the three content sections (`blog`, `highlights`, `activities`) — route path, WP category slug, and i18n keys for noun/back-label — as a single source of truth `langRoutes.tsx` and the section pages read from instead of three hardcoded, near-identical route/page implementations.
- **Removed**: `useActivities`/`useActivityDetail`, `useBlogPost`/`useBlogPosts`, `useHighlights`/`useHighlightDetail`, `useAboutPage`/`useContactPage`/`useHomePage`, and their corresponding `.graphql` query files — all superseded by the three generic hooks above.
- **Routing** (`langRoutes.tsx`): `ActivityDetail`, `HighlightDetail`, and `BlogPost` pages collapse into one `PostDetail` page, routed per-section via `SECTIONS`.
- **Pages**: `About`, `Activities`, `Blog`, `Contact`, `EventDetail`, `Highlights`, `Home` updated to consume the new hooks; `PostDetail` added; `ActivityDetail`, `BlogPost`, `HighlightDetail` removed.
- **`src/pages/Contact/contactFormSchema.ts`**: extracted form validation (previously inline) into its own schema module.
- **`src/shared/utils/url.ts`**: removed `toSafeRelativePath`, which only existed to validate the old detail-page relative-path fallback logic.

## Why

The three content types (activities, highlights, blog posts) were previously three separate WP post types, each with its own hook, query, and near-duplicate list/detail page. The new `palcif-content-sections` plugin unifies them into native posts differentiated by category, so the frontend can read all three through one generic shape instead of maintaining three parallel implementations that only differed in which category they filtered by.
