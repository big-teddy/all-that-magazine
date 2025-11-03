<?php
/**
 * Register ACF Field Groups
 */
class ATM_Setup_ACF_Fields {

    public function __construct() {
        add_action('acf/init', array($this, 'register_fields'));
    }

    public function register_fields() {
        if (!function_exists('acf_add_local_field_group')) return;

        acf_add_local_field_group(array(
            'key' => 'group_article',
            'title' => 'Article Fields',
            'fields' => array(
                array(
                    'key' => 'field_featured_image',
                    'label' => 'Featured Image',
                    'name' => 'featured_image',
                    'type' => 'image',
                    'required' => 1,
                    'return_format' => 'array',
                    'preview_size' => 'medium',
                    'library' => 'all',
                    'show_in_graphql' => 1,
                ),
                array(
                    'key' => 'field_excerpt',
                    'label' => 'Custom Excerpt',
                    'name' => 'custom_excerpt',
                    'type' => 'textarea',
                    'instructions' => 'A brief summary of the article (max 200 characters)',
                    'required' => 1,
                    'maxlength' => 200,
                    'rows' => 3,
                    'show_in_graphql' => 1,
                ),
                array(
                    'key' => 'field_read_time',
                    'label' => 'Read Time',
                    'name' => 'read_time',
                    'type' => 'number',
                    'instructions' => 'Estimated reading time in minutes',
                    'default_value' => 5,
                    'min' => 1,
                    'max' => 60,
                    'step' => 1,
                    'append' => 'minutes',
                    'show_in_graphql' => 1,
                ),
                array(
                    'key' => 'field_premium',
                    'label' => 'Premium Content',
                    'name' => 'is_premium',
                    'type' => 'true_false',
                    'instructions' => 'Check if this article requires a paid subscription',
                    'default_value' => 0,
                    'ui' => 1,
                    'ui_on_text' => 'Premium',
                    'ui_off_text' => 'Free',
                    'show_in_graphql' => 1,
                ),
                array(
                    'key' => 'field_author_bio',
                    'label' => 'Author Bio',
                    'name' => 'author_bio',
                    'type' => 'wysiwyg',
                    'instructions' => 'Optional author biography for this article',
                    'tabs' => 'visual',
                    'toolbar' => 'basic',
                    'media_upload' => 0,
                    'delay' => 0,
                    'show_in_graphql' => 1,
                ),
            ),
            'location' => array(
                array(
                    array(
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => 'article',
                    ),
                ),
            ),
            'menu_order' => 0,
            'position' => 'normal',
            'style' => 'default',
            'label_placement' => 'top',
            'instruction_placement' => 'label',
            'show_in_graphql' => 1,
            'graphql_field_name' => 'articleFields',
        ));
    }
}
