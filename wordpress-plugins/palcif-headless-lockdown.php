<?php
/**
 * Plugin Name: PALCIF Headless Lockdown
 * Description: Redirects every WordPress front-end request to the public frontend so WordPress serves only /graphql, /wp-json, and wp-admin. Must-use plugin (wp-content/mu-plugins/) so it cannot be deactivated from the Plugins screen.
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!defined('PALCIF_FRONTEND_URL')) {
    define('PALCIF_FRONTEND_URL', 'https://palcif.technical-a91.workers.dev');
}

add_action('template_redirect', function () {
    if (is_admin() || wp_doing_ajax()) {
        return;
    }

    $request_uri = $_SERVER['REQUEST_URI'] ?? '/';
    $allowed_prefixes = ['/wp-admin', '/wp-login.php', '/graphql', '/wp-json'];

    foreach ($allowed_prefixes as $prefix) {
        if (str_starts_with($request_uri, $prefix)) {
            return;
        }
    }

    wp_redirect(PALCIF_FRONTEND_URL, 301);
    exit;
});
