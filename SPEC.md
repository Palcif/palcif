# Dead code cleanup

## What changed

- Removed `src/shared/hooks/useScrollReveal.ts` — no longer referenced anywhere in the app.
- Removed `src/shared/utils/cn.ts` — no longer referenced anywhere in the app.
- Removed `src/shared/components/LazyImage.tsx` — no longer referenced anywhere in the app.
- Removed the now-unused `motion` (framer-motion) dependency from `package.json`/`package-lock.json`.

## Why

These were already dead code on `main` before any of the other changes in this pass — none of the current pages or components import them. Removing them here keeps the dependency graph and bundle honest, independent of the data-layer/CSS/UI work happening elsewhere.
