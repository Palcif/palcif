/**
 * URL guard for editor-controlled fields coming from WordPress. Field values
 * are untrusted input from an external CMS and must be validated before
 * being used as an `href`, so an unexpected value can't become a
 * script-execution (`javascript:`) vector.
 */

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
