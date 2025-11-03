<?php
/**
 * Configure WordPress Settings
 */
class ATM_Setup_Settings {

    public function __construct() {
        // Settings will be updated via admin page button
    }

    public function update_all_settings() {
        // Permalink structure
        update_option('permalink_structure', '/%postname%/');

        // Site tagline
        update_option('blogdescription', 'Premium Wellness Lifestyle Tech');

        // Timezone
        update_option('timezone_string', 'Asia/Seoul');

        // Date format
        update_option('date_format', 'F j, Y');

        // Time format
        update_option('time_format', 'g:i a');

        // Posts per page
        update_option('posts_per_page', 10);

        // Discourage search engines (development only - remove for production)
        update_option('blog_public', '0');

        // Default post category
        $default_cat = get_cat_ID('Uncategorized');
        update_option('default_category', $default_cat);

        // Flush rewrite rules
        flush_rewrite_rules();

        return true;
    }
}
