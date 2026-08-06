import DOMPurify from 'dompurify'

/**
 * Sanitizes HTML strings coming from the WordPress GraphQL API before they
 * are rendered with `dangerouslySetInnerHTML`. WP content (post titles,
 * excerpts, body content) is untrusted input from an external CMS and must
 * never be injected raw.
 */
export function sanitizeHtml(html: string | null | undefined): string {
  if (!html) return ''
  return DOMPurify.sanitize(html)
}
