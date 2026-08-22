/**
 * The three content sections, each a native WP post filtered by category
 * (src/graphql/queries/section-posts.graphql). Route paths and WP category
 * slugs happen to match today; kept as separate fields since they answer
 * different questions (URL shape vs. WP taxonomy) and shouldn't be assumed
 * to always be identical.
 */
export interface Section {
  path: string
  categorySlug: string
  /** i18n key for the singular noun, e.g. "nouns.blogPost". */
  nounKey: string
  /** i18n key for the detail page's "Back to X" link. */
  backLabelKey: string
}

export const SECTIONS: Section[] = [
  {
    path: 'blog',
    categorySlug: 'blog',
    nounKey: 'nouns.blogPost',
    backLabelKey: 'pages.blog.backToBlog',
  },
  {
    path: 'highlights',
    categorySlug: 'highlights',
    nounKey: 'nouns.highlight',
    backLabelKey: 'pages.highlights.backToHighlights',
  },
  {
    path: 'activities',
    categorySlug: 'activities',
    nounKey: 'nouns.activity',
    backLabelKey: 'pages.activities.backToActivities',
  },
]
