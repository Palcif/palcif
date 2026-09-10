import { DEFAULT_LANGUAGE } from '@/i18n/languages'

interface LocalizablePageNode {
  slug?: string | null
  translations?: ({ language: string; slug: string } | null)[] | null
}

/**
 * Find the page a fixed route stands for (`about`, `contact`, `home`) among the
 * pages of the language being viewed.
 *
 * Routes reference pages by their English slug, but Polylang gives each
 * translation its own slug (`about` → `about-fi`, `contact` → `contact-ar`).
 * Every node carries a `translations` list that always includes the English
 * entry, so a page matches when its own slug is `canonicalSlug` or when its
 * English translation's slug is.
 */
export function findPageByCanonicalSlug<PageNode extends LocalizablePageNode>(
  nodes: readonly PageNode[] | null | undefined,
  canonicalSlug: string
): PageNode | null {
  return (
    (nodes ?? []).find(
      (node) =>
        node.slug === canonicalSlug ||
        (node.translations ?? []).some(
          (translation) =>
            translation?.language === DEFAULT_LANGUAGE && translation.slug === canonicalSlug
        )
    ) ?? null
  )
}
