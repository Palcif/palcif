<?php
/**
 * Plugin Name: PALCIF Cloudflare Cache Purge
 * Description: Purges the Cloudflare cache in front of this WordPress origin whenever a post, term, page, or navigation menu changes, so the headless frontend (which relies on GET requests being cached at the edge, see src/graphql/client.ts) picks up content changes right away instead of waiting out the edge cache's TTL. Configure by defining PALCIF_CLOUDFLARE_ZONE_ID and PALCIF_CLOUDFLARE_API_TOKEN in wp-config.php; the plugin does nothing until both are set.
 * Version: 1.1.0
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Queue a single purge for the end of the request. Saving a menu fires one hook
 * per menu item, and each would otherwise trigger its own purge call.
 */
function palcif_purge_cloudflare_cache(): void
{
    static $purge_queued = false;
    if ($purge_queued) {
        return;
    }
    $purge_queued = true;
    add_action('shutdown', 'palcif_send_cloudflare_purge_request');
}

function palcif_send_cloudflare_purge_request(): void
{
    if (!defined('PALCIF_CLOUDFLARE_ZONE_ID') || !defined('PALCIF_CLOUDFLARE_API_TOKEN')) {
        return;
    }

    wp_remote_post('https://api.cloudflare.com/client/v4/zones/' . PALCIF_CLOUDFLARE_ZONE_ID . '/purge_cache', [
        'headers' => [
            'Authorization' => 'Bearer ' . PALCIF_CLOUDFLARE_API_TOKEN,
            'Content-Type' => 'application/json',
        ],
        'body' => wp_json_encode(['purge_everything' => true]),
        'timeout' => 5,
        'blocking' => false,
    ]);
}

/**
 * Skip autosaves/revisions and post types WPGraphQL doesn't expose, so a
 * purge only fires for a real, published content change.
 */
add_action('save_post', function ($post_id, $post) {
    if (wp_is_post_autosave($post_id) || wp_is_post_revision($post_id)) {
        return;
    }

    $post_type_object = get_post_type_object($post->post_type);
    if (!$post_type_object || !$post_type_object->show_in_graphql) {
        return;
    }

    palcif_purge_cloudflare_cache();
}, 10, 2);

add_action('trashed_post', 'palcif_purge_cloudflare_cache');
add_action('untrashed_post', 'palcif_purge_cloudflare_cache');
add_action('deleted_post', 'palcif_purge_cloudflare_cache');
add_action('edited_term', 'palcif_purge_cloudflare_cache');
add_action('delete_term', 'palcif_purge_cloudflare_cache');

// Menus are not covered by save_post: items are saved through their own hooks,
// and renaming, deleting or reassigning a menu never touches a post.
add_action('wp_update_nav_menu', 'palcif_purge_cloudflare_cache');
add_action('wp_update_nav_menu_item', 'palcif_purge_cloudflare_cache');
add_action('wp_create_nav_menu', 'palcif_purge_cloudflare_cache');
add_action('wp_delete_nav_menu', 'palcif_purge_cloudflare_cache');
