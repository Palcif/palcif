# Back-to-top and scroll-reset UI

## What changed

- Added `ScrollToTop`: resets scroll position to the top on every route change (React Router doesn't do this on its own), using `behavior: 'instant'` so it isn't a visible animated scroll.
- Added `BackToTopButton`: a floating button that appears after scrolling 480px down and smooth-scrolls back to the top on click.
- Wired both into `RootLayout.tsx`.
- Added the `ArrowUp` icon used by `BackToTopButton`.

## Why

Small, self-contained navigation affordance — doesn't touch data fetching, routing structure, or styling architecture, so it ships independently of the rest of this pass. (Its `common.backToTop` translation key lives in `chore/config-and-i18n`.)
