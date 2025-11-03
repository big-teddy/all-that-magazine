<?php
/**
 * Register Custom Taxonomies
 */
class ATM_Setup_Taxonomies {

    public function __construct() {
        add_action('init', array($this, 'register'), 0);
        add_action('init', array($this, 'create_default_terms'), 10);
    }

    public function register() {
        register_taxonomy('vertical', array('article'), array(
            'labels' => array(
                'name' => 'Verticals',
                'singular_name' => 'Vertical',
                'all_items' => 'All Verticals',
                'edit_item' => 'Edit Vertical',
                'add_new_item' => 'Add New Vertical',
                'update_item' => 'Update Vertical',
                'search_items' => 'Search Verticals',
            ),
            'hierarchical' => false,
            'show_admin_column' => true,
            'show_in_rest' => true,
            'show_in_graphql' => true,
            'graphql_single_name' => 'vertical',
            'graphql_plural_name' => 'verticals',
            'rewrite' => array('slug' => 'vertical'),
            'show_ui' => true,
            'query_var' => true,
        ));
    }

    public function create_default_terms() {
        $terms = array(
            array('name' => 'Wellness', 'slug' => 'wellness', 'color' => '#4CAF50'),
            array('name' => 'Lifestyle', 'slug' => 'lifestyle', 'color' => '#9C27B0'),
            array('name' => 'Tech', 'slug' => 'tech', 'color' => '#2196F3'),
        );

        foreach ($terms as $term_data) {
            if (!term_exists($term_data['slug'], 'vertical')) {
                $term = wp_insert_term($term_data['name'], 'vertical', array(
                    'slug' => $term_data['slug']
                ));

                if (!is_wp_error($term)) {
                    update_term_meta($term['term_id'], 'vertical_color', $term_data['color']);
                }
            }
        }
    }
}
