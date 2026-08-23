<?php
/**
 * Plugin Name: PALCIF GraphQL Polylang Bridge
 * Description: Adds a `language` filter argument to WPGraphQL connection queries (posts, any Polylang-translated custom post type, and menu items), backed by Polylang's native `lang` WP_Query support / language lookups. Narrow, single-purpose replacement for the unmaintained third-party wp-graphql-polylang bridge.
 * Version: 1.1.0
 * Requires Plugins: wp-graphql, polylang
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register the language enum and attach a `language` where-arg to every
 * Polylang-translated, GraphQL-exposed post type's connection query.
 */
add_action('graphql_register_types', function () {
    if (!function_exists('pll_languages_list') || !function_exists('pll_is_translated_post_type')) {
        return;
    }

    register_graphql_enum_type('LanguageCodeFilterEnum', [
        'description' => 'Site language codes configured in Polylang',
        'values' => [
            'EN' => ['value' => 'en'],
            'AR' => ['value' => 'ar'],
            'FI' => ['value' => 'fi'],
        ],
    ]);

    register_graphql_field('RootQueryToMenuItemConnectionWhereArgs', 'language', [
        'type' => 'LanguageCodeFilterEnum',
        'description' => 'Filter menu items to the ones belonging to this Polylang language.',
    ]);

    register_graphql_object_type('PolylangTranslation', [
        'description' => 'A single-language translation of a Polylang-translated post.',
        'fields' => [
            'language' => ['type' => ['non_null' => 'String'], 'description' => 'Polylang language code, e.g. "en".'],
            'slug' => ['type' => ['non_null' => 'String'], 'description' => 'The translated post\'s slug in that language.'],
        ],
    ]);

    foreach (get_post_types(['show_in_graphql' => true], 'objects') as $post_type) {
        if (!pll_is_translated_post_type($post_type->name)) {
            continue;
        }

        $graphql_single_name = $post_type->graphql_single_name ?? null;
        if (!$graphql_single_name) {
            continue;
        }

        $where_args_type = 'RootQueryTo' . ucfirst($graphql_single_name) . 'ConnectionWhereArgs';

        register_graphql_field($where_args_type, 'language', [
            'type' => 'LanguageCodeFilterEnum',
            'description' => 'Filter results by Polylang language code.',
        ]);

        register_graphql_field($graphql_single_name, 'language', [
            'type' => 'String',
            'description' => 'Polylang language code for this content (e.g. "en", "ar", "fi").',
            'resolve' => function ($post) {
                if (!function_exists('pll_get_post_language') || !isset($post->ID)) {
                    return null;
                }
                return pll_get_post_language($post->ID, 'slug') ?: null;
            },
        ]);

        register_graphql_field($graphql_single_name, 'translations', [
            'type' => ['list_of' => ['non_null' => 'PolylangTranslation']],
            'description' => 'This post\'s translations in every other Polylang language.',
            'resolve' => function ($post) {
                if (!function_exists('pll_get_post_translations') || !isset($post->ID)) {
                    return [];
                }
                $result = [];
                foreach (pll_get_post_translations($post->ID) as $language => $translated_post_id) {
                    $translated_post = get_post($translated_post_id);
                    if ($translated_post) {
                        $result[] = ['language' => $language, 'slug' => $translated_post->post_name];
                    }
                }
                return $result;
            },
        ]);
    }
});

/**
 * Translate the `where.language` GraphQL argument into the `lang` WP_Query
 * var that Polylang natively understands and filters on.
 */
add_filter('graphql_post_object_connection_query_args', function ($query_args, $source, $args) {
    if (!empty($args['where']['language'])) {
        $query_args['lang'] = sanitize_key($args['where']['language']);
    }
    return $query_args;
}, 10, 3);

/**
 * Menu items don't resolve through WP_Query, so the language where-arg has
 * to be captured when the `menuItems` field resolves and applied when
 * WordPress fetches the raw menu items for that request.
 */
add_filter('graphql_resolve_field', function ($result, $source, $args, $context, $info) {
    $is_root_menu_items_field = ($info->fieldName ?? null) === 'menuItems'
        && ($info->parentType->name ?? null) === 'RootQuery';
    if ($is_root_menu_items_field && !empty($args['where']['language'])) {
        $GLOBALS['palcif_requested_menu_language'] = sanitize_key($args['where']['language']);
    }
    return $result;
}, 10, 5);

add_filter('wp_get_nav_menu_items', function ($items, $menu, $args) {
    $requested_language = $GLOBALS['palcif_requested_menu_language'] ?? null;
    unset($GLOBALS['palcif_requested_menu_language']);
    if (!$requested_language || !function_exists('pll_get_post_language')) {
        return $items;
    }
    return array_values(array_filter($items, function ($item) use ($requested_language) {
        $object_id = $item->object_id ?? null;
        if (!$object_id) {
            return true;
        }
        $item_language = pll_get_post_language($object_id, 'slug');
        return !$item_language || $item_language === $requested_language;
    }));
}, 10, 3);
