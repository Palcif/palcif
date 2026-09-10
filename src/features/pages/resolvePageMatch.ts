import { isSupportedLanguage } from '@/i18n/languages'

/**
 * One WordPress page as returned by the `PageContent` query, narrowed to the
 * fields the dynamic page route needs.
 */
export interface WordPressPageNode {
  id: string
  title?: string | null
  content?: string | null
  uri?: string | null
  translations?: ({ language: string; slug: string } | null)[] | null
}

export interface ResolvedPageMatch {
  page: WordPressPageNode
  /**
   * The page's canonical site path — its WordPress `uri` with surrounding
   * slashes and any leading language segment removed (e.g. `about/history`).
   * The route redirects here when the visited path doesn't already match.
   */
  canonicalPath: string
}

/**
 * Strip surrounding slashes and a leading language segment from a WordPress
 * `uri` or a visited route path, so the two can be compared regardless of
 * Polylang's URL mode (language prefix present or hidden).
 */
export function normalizePagePath(pathOrUri: string): string {
  const segments = pathOrUri.split('/').filter(Boolean)
  if (segments.length > 0 && isSupportedLanguage(segments[0])) {
    segments.shift()
  }
  return segments.join('/')
}

/**
 * Pick the page that belongs at `requestedPath` from the candidates the query
 * returned for its last path segment. Prefers an exact hierarchy match; falls
 * back to the sole candidate when the slug is unambiguous (so a flat link like
 * `/en/history` still resolves and then redirects to `/en/about/history`).
 * Returns `null` when nothing fits.
 */
export function resolvePageMatch(
  requestedPath: string,
  candidates: (WordPressPageNode | null)[] | null | undefined
): ResolvedPageMatch | null {
  const normalizedRequestedPath = normalizePagePath(requestedPath)
  const usableCandidates = (candidates ?? []).filter(
    (candidate): candidate is WordPressPageNode => candidate !== null && Boolean(candidate.uri)
  )

  const exactMatch = usableCandidates.find(
    (candidate) => normalizePagePath(candidate.uri ?? '') === normalizedRequestedPath
  )
  const chosenPage = exactMatch ?? (usableCandidates.length === 1 ? usableCandidates[0] : undefined)
  if (!chosenPage) return null

  return { page: chosenPage, canonicalPath: normalizePagePath(chosenPage.uri ?? '') }
}
