<?php
/**
 * Plugin Name: PALCIF GraphQL Polylang Bridge
 * Description: Adds a `language` filter argument to WPGraphQL connection queries (posts, and any Polylang-translated custom post type), backed by Polylang's native `lang` WP_Query support. Narrow, single-purpose replacement for the unmaintained third-party wp-graphql-polylang bridge.
 * Version: 1.0.0
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
