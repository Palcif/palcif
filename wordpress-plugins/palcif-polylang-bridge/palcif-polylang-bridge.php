<?php
/**
 * Plugin Name: PALCIF GraphQL Polylang Bridge
 * Description: Adds a `language` filter argument to WPGraphQL connection queries (posts, any Polylang-translated custom post type, and menu items), backed by Polylang's native `lang` WP_Query support / language lookups. Narrow, single-purpose replacement for the unmaintained third-party wp-graphql-polylang bridge.
 * Version: 1.3.1
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
 * Per-language menu resolution for WPGraphQL menu item connections.
 *
 * WPGraphQL resolves `menuItems(where: { location })` by looking up the theme
 * location -> menu id in `get_nav_menu_locations()`. That mapping is
 * language-agnostic — it only holds one menu per location. Polylang keeps the
 * per-language assignments in its own `nav_menus[theme][location][lang]`
 * option and swaps them into the theme location only during classic frontend
 * requests, which a stateless GraphQL request never is.
 *
 * So for `menuItems(where: { location, language })` we:
 *  1. rewrite the connection's `nav_menu` tax query to the Polylang menu for
 *     the requested language (graphql_connection_query_args), and
 *  2. expose every Polylang per-language menu as location-assigned for the
 *     duration of the GraphQL request, so WPGraphQL's MenuItem privacy check
 *     (which requires the item's menu to be assigned to a location) passes for
 *     languages other than the site default (theme_mod_nav_menu_locations).
 */

/**
 * Polylang's per-language nav menu assignments for the active theme, shaped
 * `[ location => [ language => menu_term_id ] ]`. Falls back to a cross-theme
 * merge so a headless install whose active theme differs from the one the
 * menus were assigned under still resolves.
 */
function palcif_polylang_nav_menu_map(): array
{
    if (!function_exists('PLL')) {
        return [];
    }

    $polylang = PLL();
    $options = isset($polylang->options) ? $polylang->options : null;
    if ($options === null) {
        return [];
    }
    if (!is_array($options) && !($options instanceof ArrayAccess)) {
        return [];
    }

    $nav_menus = isset($options['nav_menus']) ? $options['nav_menus'] : [];
    if (!is_array($nav_menus) || empty($nav_menus)) {
        return [];
    }

    $stylesheet = get_option('stylesheet');
    if (!empty($nav_menus[$stylesheet]) && is_array($nav_menus[$stylesheet])) {
        return $nav_menus[$stylesheet];
    }

    $merged = [];
    foreach ($nav_menus as $per_theme_map) {
        if (is_array($per_theme_map)) {
            $merged = array_replace_recursive($merged, $per_theme_map);
        }
    }
    return $merged;
}

/** The menu term id assigned to $location for $language, or 0 if none. */
function palcif_polylang_menu_id_for(string $location, string $language): int
{
    $map = palcif_polylang_nav_menu_map();
    return (int) ($map[$location][$language] ?? 0);
}

/** Every menu term id Polylang has assigned to any location in any language. */
function palcif_polylang_all_menu_ids(): array
{
    $menu_ids = [];
    foreach (palcif_polylang_nav_menu_map() as $per_language) {
        if (!is_array($per_language)) {
            continue;
        }
        foreach ($per_language as $menu_id) {
            $menu_id = (int) $menu_id;
            if ($menu_id > 0) {
                $menu_ids[$menu_id] = $menu_id;
            }
        }
    }
    return array_values($menu_ids);
}

add_filter('graphql_connection_query_args', function ($query_args, $connection_resolver) {
    if (!is_object($connection_resolver)
        || strpos(get_class($connection_resolver), 'MenuItemConnectionResolver') === false) {
        return $query_args;
    }

    $graphql_args = [];
    foreach (['get_args', 'getArgs'] as $args_method) {
        if (method_exists($connection_resolver, $args_method)) {
            $graphql_args = (array) $connection_resolver->{$args_method}();
            break;
        }
    }

    $where = $graphql_args['where'] ?? [];
    $location = isset($where['location']) ? (string) $where['location'] : '';
    $language = isset($where['language']) ? sanitize_key((string) $where['language']) : '';
    if ($location === '' || $language === '') {
        return $query_args;
    }

    $menu_id = palcif_polylang_menu_id_for($location, $language);
    if (!$menu_id) {
        return $query_args;
    }

    $query_args['tax_query'] = [
        [
            'taxonomy' => 'nav_menu',
            'field' => 'term_id',
            'terms' => [$menu_id],
            'include_children' => false,
        ],
    ];

    return $query_args;
}, 20, 2);

/**
 * Piece 2: make Polylang's non-default-language menus public to WPGraphQL.
 *
 * WPGraphQL treats a menu (and its items) as private unless the menu's term id
 * appears in `get_nav_menu_locations()`. Polylang only keeps the current
 * language's menu there, so `menus`, `menuItems`, and the `Menu`/`MenuItem`
 * nodes for every other language resolve as private and get stripped from the
 * response — which is why `menuItems(where: { location, language: FI })` came
 * back empty even after piece 1 pointed the tax query at the Finnish menu.
 *
 * `graphql_data_is_private` is WPGraphQL's own hook for exactly this. On a
 * GraphQL request we clear the private flag for any menu / menu item that
 * belongs to a Polylang per-language menu assignment.
 */
add_filter('graphql_data_is_private', function ($is_private, $model_name, $data) {
    if (!$is_private) {
        return $is_private;
    }
    if (!function_exists('is_graphql_request') || !is_graphql_request()) {
        return $is_private;
    }

    $per_language_menu_ids = palcif_polylang_all_menu_ids();
    if (empty($per_language_menu_ids)) {
        return $is_private;
    }

    if ($model_name === 'MenuObject' && isset($data->term_id)) {
        return in_array((int) $data->term_id, $per_language_menu_ids, true) ? false : $is_private;
    }

    if ($model_name === 'MenuItemObject' && isset($data->ID)) {
        $item_menu_ids = wp_get_object_terms((int) $data->ID, 'nav_menu', ['fields' => 'ids']);
        if (is_array($item_menu_ids)) {
            foreach ($item_menu_ids as $item_menu_id) {
                if (in_array((int) $item_menu_id, $per_language_menu_ids, true)) {
                    return false;
                }
            }
        }
        return $is_private;
    }

    return $is_private;
}, 10, 3);

/**
 * Belt-and-suspenders for older WPGraphQL builds whose menu privacy check reads
 * `get_nav_menu_locations()` directly rather than going through
 * `graphql_data_is_private`: expose every Polylang per-language menu under a
 * synthetic location key for the duration of the GraphQL request. The key name
 * is irrelevant to the privacy check — it only tests whether the term id is a
 * value in the array.
 */
add_filter('theme_mod_nav_menu_locations', function ($menu_locations) {
    if (!is_array($menu_locations)) {
        $menu_locations = [];
    }
    if (!function_exists('is_graphql_request') || !is_graphql_request()) {
        return $menu_locations;
    }

    foreach (palcif_polylang_nav_menu_map() as $location => $per_language) {
        if (!is_array($per_language)) {
            continue;
        }
        foreach ($per_language as $language => $menu_id) {
            if (!$menu_id) {
                continue;
            }
            $synthetic_location = $location . '__pll_' . sanitize_key((string) $language);
            $menu_locations[$synthetic_location] = (int) $menu_id;
        }
    }

    return $menu_locations;
}, 999);

/**
 * TEMPORARY diagnostic — remove once per-language menus are confirmed working.
 * Query `{ palcifNavMenuDebug }` in the GraphiQL IDE to see exactly what the
 * bridge reads for Polylang menu assignments.
 */
add_action('graphql_register_types', function () {
    register_graphql_field('RootQuery', 'palcifNavMenuDebug', [
        'type' => 'String',
        'description' => 'TEMP: Polylang per-language nav menu assignments as seen by the bridge.',
        'resolve' => function () {
            return wp_json_encode([
                'stylesheet' => get_option('stylesheet'),
                'template' => get_option('template'),
                'pll_options_type' => function_exists('PLL') ? gettype(PLL()->options ?? null) : 'no-PLL',
                'nav_menu_map' => palcif_polylang_nav_menu_map(),
                'all_menu_ids' => palcif_polylang_all_menu_ids(),
                'theme_mod_nav_menu_locations' => get_nav_menu_locations(),
            ]);
        },
    ]);
});
