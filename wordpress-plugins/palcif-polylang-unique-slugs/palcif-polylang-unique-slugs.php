<?php
/**
 * Plugin Name: PALCIF Polylang Per-Language Slugs
 * Description: Scopes WordPress's slug-uniqueness check to each Polylang language, so a translated page/highlight/activity can keep the same natural slug as its source post instead of WordPress silently appending a "-2" suffix that an editor then has to notice and hand-edit.
 * Version: 1.0.0
 * Requires Plugins: polylang
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * WordPress's own uniqueness check runs across all posts regardless of
 * language, so translating a post (same title, same natural slug as the
 * source) collides with the original and gets an auto "-2" suffix. Re-check
 * uniqueness scoped to the post's own language; if the only collision was in
 * another language, restore the un-suffixed slug so translators never have
 * to retype it by hand.
 */
add_filter('wp_unique_post_slug', function ($slug, $post_id, $post_status, $post_type, $post_parent, $original_slug) {
    if ($slug === $original_slug) {
        return $slug;
    }

    if (!function_exists('PLL') || !function_exists('pll_is_translated_post_type') || !function_exists('pll_get_post_language')) {
        return $slug;
    }

    if (!pll_is_translated_post_type($post_type)) {
        return $slug;
    }

    $language = pll_get_post_language($post_id);
    if (!$language) {
        return $slug;
    }

    global $wpdb;

    $join_clause = PLL()->model->post->join_clause();
    $where_clause = PLL()->model->post->where_clause($language);

    $collision = $wpdb->get_var($wpdb->prepare(
        "SELECT wp_posts.post_name FROM $wpdb->posts AS wp_posts $join_clause
         WHERE wp_posts.post_name = %s AND wp_posts.ID != %d AND wp_posts.post_type = %s $where_clause
         LIMIT 1",
        $original_slug,
        $post_id,
        $post_type
    ));

    return $collision ? $slug : $original_slug;
}, 10, 6);
