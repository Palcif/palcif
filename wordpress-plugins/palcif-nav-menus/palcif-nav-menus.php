<?php
/**
 * Plugin Name: PALCIF Nav Menus
 * Description: Registers the `primary` (header), `footer` (footer "Explore" column) and `footer_legal` (footer legal row) nav menu locations so admins can assign and manage them from Appearance > Menus, and so WPGraphQL exposes them as PRIMARY / FOOTER / FOOTER_LEGAL on MenuLocationEnum. This site is headless (no theme templates render these menus) — the locations exist purely so WPGraphQL has something to query.
 * Version: 1.1.0
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('init', function () {
    register_nav_menus([
        'primary' => __('Primary (Header)', 'palcif'),
        'footer' => __('Footer (Explore column)', 'palcif'),
        'footer_legal' => __('Footer (Legal row)', 'palcif'),
    ]);
});
