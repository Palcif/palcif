// The app used to be hash-routed (URLs like "/#/activities/fun-day"); every
// link PALCIF has ever shared uses that format. Rewrite it to a real path
// before the router (or i18next's URL-based language seeding) ever sees the
// URL, so old bookmarks/shared links keep working instead of silently
// landing on the home page.
if (window.location.hash.startsWith('#/')) {
  const legacyPath = window.location.hash.slice(1)
  window.history.replaceState(null, '', legacyPath + window.location.search)
}
