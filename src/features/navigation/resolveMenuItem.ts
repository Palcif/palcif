import { isSupportedLanguage } from '@/i18n/languages'
import { toSafeExternalUrl } from '@/shared/utils/url'

/**
 * A menu item as it arrives from WPGraphQL's `menuItems` connection. Every
 * field is editor-controlled and therefore untrusted — `label` can be blank,
 * `path`/`url` can be anything an admin typed into a Custom Link.
 */
export interface WordPressMenuItem {
  id: string
  label?: string | null
  path?: string | null
  url?: string | null
  target?: string | null
}

/**
 * A menu item after resolution: either an in-app route (rendered with
 * `LocalizedNavLink`) or an off-site link (rendered with a plain anchor).
 * Items that can't be rendered safely (no label, no usable destination) are
 * dropped before this stage, so every value here is ready to render.
 */
export type ResolvedMenuItem =
  | {
      id: string
      label: string
      kind: 'internal'
      /** Site-relative path, no trailing slash — pass straight to `LocalizedNavLink`. */
      to: string
      /** `NavLink` `end` — true only for the site root, so "Home" isn't active everywhere. */
      isSiteRoot: boolean
    }
  | {
      id: string
      label: string
      kind: 'external'
      href: string
      opensInNewTab: boolean
    }

/**
 * Origin of the WordPress install, derived from the GraphQL endpoint. Menu
 * items that link to a WordPress Page arrive as absolute URLs on this origin;
 * we treat those as in-app routes too, since the headless frontend mirrors
 * WordPress's path structure.
 */
function wordpressOrigin(): string | null {
  const graphqlEndpoint = import.meta.env['VITE_WP_GRAPHQL_URL'] as string | undefined
  if (!graphqlEndpoint) return null
  try {
    return new URL(graphqlEndpoint).origin
  } catch {
    return null
  }
}

/** Strip trailing slashes; an empty result means the site root. */
function normalizeInternalPath(pathname: string): string {
  const withoutTrailingSlashes = pathname.replace(/\/+$/, '')
  return withoutTrailingSlashes === '' ? '/' : withoutTrailingSlashes
}

/**
 * True when the path points at the site root, with or without a leading
 * language segment (`/`, `/en`, `/fi/`). Used to set `NavLink`'s `end` so the
 * home link isn't highlighted on every page.
 */
function pointsAtSiteRoot(internalPath: string): boolean {
  const segments = internalPath.split('/').filter(Boolean)
  if (segments.length === 0) return true
  return segments.length === 1 && isSupportedLanguage(segments[0])
}

/**
 * Decide whether an admin-entered destination is an in-app route. Returns the
 * cleaned site-relative path, or `null` if the destination leaves the site.
 */
function toInternalPath(destination: string): string | null {
  if (destination.startsWith('/')) {
    return normalizeInternalPath(destination)
  }
  try {
    const parsed = new URL(destination)
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null
    const isFrontendOrigin =
      typeof window !== 'undefined' && parsed.origin === window.location.origin
    const isWordPressOrigin = parsed.origin === wordpressOrigin()
    return isFrontendOrigin || isWordPressOrigin ? normalizeInternalPath(parsed.pathname) : null
  } catch {
    return null
  }
}

/**
 * Turn one raw WordPress menu item into something renderable, or `null` if it
 * has no label or no usable destination (so callers can filter it out).
 */
export function resolveMenuItem(rawItem: WordPressMenuItem): ResolvedMenuItem | null {
  const label = rawItem.label?.trim()
  if (!label) return null

  // `path` is documented as relative for internal resources, absolute for
  // external ones; `url` is the fallback for items where `path` is unset.
  const destination = rawItem.path?.trim() || rawItem.url?.trim() || ''
  if (!destination) return null

  const internalPath = toInternalPath(destination)
  if (internalPath !== null) {
    return {
      id: rawItem.id,
      label,
      kind: 'internal',
      to: internalPath,
      isSiteRoot: pointsAtSiteRoot(internalPath),
    }
  }

  const href = toSafeExternalUrl(destination)
  // `toSafeExternalUrl` returns '#' for values it rejects (e.g. `javascript:`);
  // render nothing rather than a dead or unsafe link.
  if (href === '#') return null

  return {
    id: rawItem.id,
    label,
    kind: 'external',
    href,
    opensInNewTab: rawItem.target?.trim() === '_blank',
  }
}

/** Resolve a whole connection's worth of items, dropping the unrenderable ones. */
export function resolveMenuItems(
  rawItems: readonly WordPressMenuItem[] | null | undefined
): ResolvedMenuItem[] {
  if (!rawItems) return []
  return rawItems
    .map(resolveMenuItem)
    .filter((resolvedItem): resolvedItem is ResolvedMenuItem => resolvedItem !== null)
}
