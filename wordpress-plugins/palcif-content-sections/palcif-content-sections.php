<?php
/**
 * Plugin Name: PALCIF Content Sections
 * Description: Unifies Highlights and Activities into native posts differentiated by category, matching how Blog already works. Keeps the "category" taxonomy shared across languages, so one category slug filters every language.
 * Version: 1.0.0
 * Requires Plugins: polylang
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * The three section category slugs the frontend filters posts by
 * (src/features/posts/sections.ts).
 */
const PALCIF_SECTION_CATEGORIES = ['blog', 'highlights', 'activities'];

/**
 * Keep "category" untranslated in Polylang so a single category slug
 * (e.g. "highlights") matches posts in every language, instead of Polylang
 * splitting it into per-language terms ("highlights", "highlights-ar", ...).
 * Section names are already rendered from i18n on the frontend, not from
 * WordPress, so there is no translation to lose here.
 */
add_filter('pll_get_taxonomies', function ($taxonomies) {
    unset($taxonomies['category']);
    return $taxonomies;
});

function palcif_ensure_section_categories(): void
{
    foreach (PALCIF_SECTION_CATEGORIES as $slug) {
        if (!term_exists($slug, 'category')) {
            wp_insert_term($slug, 'category', ['slug' => $slug]);
        }
    }
}

register_activation_hook(__FILE__, 'palcif_ensure_section_categories');
