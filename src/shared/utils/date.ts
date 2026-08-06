/**
 * Date formatting helpers for WordPress-supplied date strings.
 */

/**
 * Formats an event date into the calendar-badge parts used across the Events
 * page and the Home page's "Upcoming Events" column. The `en-US` month/day
 * badge format is intentionally fixed so the compact badge stays visually
 * consistent regardless of the active UI language.
 */
export function formatEventDate(eventdate: string | null | undefined) {
  const date = eventdate ? new Date(eventdate) : null
  return {
    month: date ? date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase() : '',
    day: date ? date.toLocaleDateString('en-US', { day: '2-digit' }) : '',
    isoDate: date ? date.toISOString().slice(0, 10) : undefined,
  }
}

/**
 * Formats a WordPress date string for display using the viewer's locale.
 * Returns an empty string when the input is missing.
 */
export function formatDisplayDate(value: string | null | undefined): string {
  return value ? new Date(value).toLocaleDateString() : ''
}
