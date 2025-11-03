<?php
/**
 * REST API Support
 */

class ATM_Setup_REST_API {
    public function __init() {
        add_action('rest_api_init', array($this, 'register_rest_routes'));
        add_filter('rest_authentication_errors', array($this, 'allow_application_passwords'));
    }

    public function allow_application_passwords($result) {
        // Allow Application Passwords for REST API
        return $result;
    }

    public function register_rest_routes() {
        // Register custom endpoint for article creation with ACF fields
        register_rest_route('atm/v1', '/create-article', array(
            'methods' => 'POST',
            'callback' => array($this, 'create_article'),
            'permission_callback' => array($this, 'check_permission'),
        ));
    }

    public function check_permission() {
        return current_user_can('edit_posts');
    }

    public function create_article($request) {
        $params = $request->get_json_params();

        // Validate required fields
        if (empty($params['title']) || empty($params['content'])) {
            return new WP_Error('missing_fields', 'Title and content are required', array('status' => 400));
        }

        // Create post
        $post_data = array(
            'post_title'    => sanitize_text_field($params['title']),
            'post_content'  => wp_kses_post($params['content']),
            'post_status'   => 'publish',
            'post_type'     => 'article',
            'post_author'   => get_current_user_id(),
        );

        $post_id = wp_insert_post($post_data);

        if (is_wp_error($post_id)) {
            return $post_id;
        }

        // Set vertical taxonomy
        if (!empty($params['vertical'])) {
            $vertical = get_term_by('slug', $params['vertical'], 'vertical');
            if ($vertical) {
                wp_set_object_terms($post_id, $vertical->term_id, 'vertical');
            }
        }

        // Set ACF fields
        if (function_exists('update_field')) {
            if (!empty($params['customExcerpt'])) {
                update_field('custom_excerpt', sanitize_textarea_field($params['customExcerpt']), $post_id);
            }

            if (!empty($params['readTime'])) {
                update_field('read_time', intval($params['readTime']), $post_id);
            }

            if (isset($params['isPremium'])) {
                update_field('is_premium', (bool)$params['isPremium'], $post_id);
            }

            if (!empty($params['authorBio'])) {
                update_field('author_bio', wp_kses_post($params['authorBio']), $post_id);
            }

            // Handle featured image
            if (!empty($params['featuredImageUrl'])) {
                $image_id = $this->upload_image_from_url($params['featuredImageUrl'], $post_id);
                if (!is_wp_error($image_id)) {
                    update_field('featured_image', $image_id, $post_id);
                    set_post_thumbnail($post_id, $image_id);
                }
            }
        }

        // Return created post data
        $post = get_post($post_id);

        return array(
            'success' => true,
            'post_id' => $post_id,
            'slug' => $post->post_name,
            'message' => 'Article created successfully',
        );
    }

    private function upload_image_from_url($image_url, $post_id) {
        require_once(ABSPATH . 'wp-admin/includes/file.php');
        require_once(ABSPATH . 'wp-admin/includes/media.php');
        require_once(ABSPATH . 'wp-admin/includes/image.php');

        $tmp = download_url($image_url);

        if (is_wp_error($tmp)) {
            return $tmp;
        }

        $file_array = array(
            'name' => basename($image_url),
            'tmp_name' => $tmp,
        );

        $id = media_handle_sideload($file_array, $post_id);

        if (is_wp_error($id)) {
            @unlink($file_array['tmp_name']);
            return $id;
        }

        return $id;
    }
}
