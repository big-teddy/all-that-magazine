<?php
/**
 * Register Custom Post Types
 */
class ATM_Setup_Post_Types {

    public function __construct() {
        add_action('init', array($this, 'register'), 0);
    }

    public function register() {
        register_post_type('article', array(
            'labels' => array(
                'name' => 'Articles',
                'singular_name' => 'Article',
                'add_new_item' => 'Add New Article',
                'edit_item' => 'Edit Article',
                'view_item' => 'View Article',
                'all_items' => 'All Articles',
                'search_items' => 'Search Articles',
                'not_found' => 'No articles found',
            ),
            'public' => true,
            'has_archive' => true,
            'menu_icon' => 'dashicons-edit-large',
            'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'author', 'revisions'),
            'show_in_rest' => true,
            'show_in_graphql' => true,
            'graphql_single_name' => 'article',
            'graphql_plural_name' => 'articles',
            'rewrite' => array('slug' => 'article'),
            'capability_type' => 'post',
            'menu_position' => 5,
        ));
    }
}
