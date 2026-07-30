/**
 * URL guards for editor-controlled SCF fields coming from WordPress. Field
 * values are untrusted input from an external CMS and must be validated before
 * being used as an `href` or router target, so an unexpected value can't become
 * a script-execution (`javascript:`/`data:`) or open-redirect vector.
 */

/**
 * Accepts an internal relative path (e.g. "/blog"). Rejects everything else —
 * including `javascript:`/`data:` URIs and protocol-relative `//host` values —
 * falling back to `/blog`.
 */
export function toSafeRelativePath(value: string | null | undefined): string {
  if (value && value.startsWith('/') && !value.startsWith('//')) {
    return value
  }
  return '/blog'
}

/**
 * Accepts an external http(s) URL. Rejects everything else — including
 * `javascript:` URIs and unparseable values — falling back to `#`.
 */
export function toSafeExternalUrl(value: string | null | undefined): string {
  if (!value) return '#'
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:' ? value : '#'
  } catch {
    return '#'
  }
}
