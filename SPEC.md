# Config and i18n updates

## What changed

- **Locale strings** (`ar`/`en`/`fi` `common.json`): removed keys tied to the old per-page copy structure (About's story/values sections, Activities' category filter), added keys the new pages need (`common.backToTop`, contact form validation messages, `post.byAuthor`).
- **`.env.example`**: documented `VITE_FORMSPREE_ID` with a comment explaining what breaks (contact form shows an error) if it's unset.
- **`vite.config.ts`**: reordered an import (no behavior change).
- **`src/app/providers.tsx`**: reduced React Query `staleTime` from 5 minutes to 60 seconds, since content edits are no longer purged from the Cloudflare edge cache on save — a shorter client stale time now bounds how long an edit takes to appear on refocus/reconnect.

## Why

Bundled as the "everything else" config/infra layer. Note the locale key additions/removals line up with the `refactor/headless-data-layer` and `feat/back-to-top-ui` branches — merge order matters for translated copy to fully match, though nothing here breaks the TypeScript build on its own.
