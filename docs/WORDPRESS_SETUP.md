# WordPress Setup Specification for Cursor AI

## Overview

This document provides complete specifications for Cursor AI to generate an automatic WordPress setup plugin that configures everything needed for All That Magazine's headless CMS backend.

---

## Plugin Information

```php
/**
 * Plugin Name: All That Magazine Setup
 * Plugin URI: https://allthatmagazine.com
 * Description: Automatic configuration for All That Magazine WordPress backend
 * Version: 1.0.0
 * Requires at least: 6.0
 * Requires PHP: 8.0
 * Author: All That Magazine
 * License: GPL v2 or later
 * Text Domain: all-that-setup
 */
```

---

## File Structure

```
all-that-magazine-setup/
├── all-that-magazine-setup.php          (main plugin file)
├── includes/
│   ├── class-plugin-installer.php       (TGM Plugin Activation)
│   ├── class-post-types.php             (register article CPT)
│   ├── class-taxonomies.php             (register vertical taxonomy)
│   ├── class-acf-fields.php             (ACF field group registration)
│   ├── class-settings.php               (WordPress settings configuration)
│   └── class-admin-page.php             (admin UI for setup button)
├── assets/
│   ├── css/
│   │   └── admin.css                    (admin page styles)
│   └── js/
│       └── admin.js                     (setup button functionality)
└── README.md
```

---

## Complete Implementation Guide

### Step 1: Main Plugin File

**File:** `all-that-magazine-setup.php`

```php
<?php
/**
 * Plugin Name: All That Magazine Setup
 * Description: One-click WordPress configuration
 * Version: 1.0.0
 * Requires PHP: 8.0
 */

if (!defined('ABSPATH')) exit;

define('ATM_SETUP_VERSION', '1.0.0');
define('ATM_SETUP_PATH', plugin_dir_path(__FILE__));
define('ATM_SETUP_URL', plugin_dir_url(__FILE__));

// Autoloader
spl_autoload_register(function ($class) {
    $prefix = 'ATM_Setup_';
    $base_dir = ATM_SETUP_PATH . 'includes/';
    
    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) return;
    
    $relative_class = substr($class, $len);
    $file = $base_dir . 'class-' . str_replace('_', '-', strtolower($relative_class)) . '.php';
    
    if (file_exists($file)) require $file;
});

// Initialize
add_action('plugins_loaded', function() {
    new ATM_Setup_Plugin_Installer();
    new ATM_Setup_Post_Types();
    new ATM_Setup_Taxonomies();
    new ATM_Setup_ACF_Fields();
    new ATM_Setup_Settings();
    new ATM_Setup_Admin_Page();
});

// Activation
register_activation_hook(__FILE__, function() {
    flush_rewrite_rules();
    set_transient('atm_setup_activated', true, 60);
});

// Deactivation
register_deactivation_hook(__FILE__, function() {
    flush_rewrite_rules();
});
```

---

### Step 2: Plugin Installer

**File:** `includes/class-plugin-installer.php`

```php
<?php
class ATM_Setup_Plugin_Installer {
    
    public function __construct() {
        add_action('tgmpa_register', array($this, 'register_plugins'));
    }
    
    public function register_plugins() {
        $plugins = array(
            array(
                'name'     => 'WPGraphQL',
                'slug'     => 'wp-graphql',
                'required' => true,
            ),
            array(
                'name'     => 'WPGraphQL for Advanced Custom Fields',
                'slug'     => 'wp-graphql-acf',
                'required' => true,
            ),
            array(
                'name'     => 'Advanced Custom Fields',
                'slug'     => 'advanced-custom-fields',
                'required' => true,
            ),
            array(
                'name'     => 'Rank Math SEO',
                'slug'     => 'seo-by-rank-math',
                'required' => true,
            ),
            array(
                'name'     => 'Wordfence Security',
                'slug'     => 'wordfence',
                'required' => true,
            ),
        );

        $config = array(
            'id'           => 'atm-setup',
            'default_path' => '',
            'menu'         => 'tgmpa-install-plugins',
            'has_notices'  => true,
            'dismissable'  => false,
            'is_automatic' => true,
        );

        tgmpa($plugins, $config);
    }
}
```

**Note:** Include TGM Plugin Activation library in plugin folder

---

### Step 3: Post Types Registration

**File:** `includes/class-post-types.php`

```php
<?php
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
        ));
    }
}
```

---

### Step 4: Taxonomy Registration

**File:** `includes/class-taxonomies.php`

```php
<?php
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
            ),
            'hierarchical' => false,
            'show_admin_column' => true,
            'show_in_rest' => true,
            'show_in_graphql' => true,
            'graphql_single_name' => 'vertical',
            'graphql_plural_name' => 'verticals',
            'rewrite' => array('slug' => 'vertical'),
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
```

---

### Step 5: ACF Fields

**File:** `includes/class-acf-fields.php`

```php
<?php
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
                    'show_in_graphql' => 1,
                ),
                array(
                    'key' => 'field_excerpt',
                    'label' => 'Custom Excerpt',
                    'name' => 'custom_excerpt',
                    'type' => 'textarea',
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
                    'default_value' => 5,
                    'min' => 1,
                    'suffix' => 'minutes',
                    'show_in_graphql' => 1,
                ),
                array(
                    'key' => 'field_premium',
                    'label' => 'Premium Content',
                    'name' => 'is_premium',
                    'type' => 'true_false',
                    'default_value' => 0,
                    'ui' => 1,
                    'show_in_graphql' => 1,
                ),
                array(
                    'key' => 'field_author_bio',
                    'label' => 'Author Bio',
                    'name' => 'author_bio',
                    'type' => 'wysiwyg',
                    'tabs' => 'visual',
                    'toolbar' => 'basic',
                    'media_upload' => 0,
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
            'show_in_graphql' => 1,
            'graphql_field_name' => 'articleFields',
        ));
    }
}
```

---

### Step 6: Settings Configuration

**File:** `includes/class-settings.php`

```php
<?php
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
        
        // Discourage search engines (development)
        update_option('blog_public', '0');
        
        // Flush rewrite rules
        flush_rewrite_rules();
        
        return true;
    }
}
```

---

### Step 7: Admin Page

**File:** `includes/class-admin-page.php`

```php
<?php
class ATM_Setup_Admin_Page {
    
    public function __construct() {
        add_action('admin_menu', array($this, 'add_admin_page'));
        add_action('admin_post_atm_run_setup', array($this, 'run_setup'));
        add_action('admin_notices', array($this, 'activation_notice'));
    }
    
    public function add_admin_page() {
        add_options_page(
            'All That Setup',
            'All That Setup',
            'manage_options',
            'atm-setup',
            array($this, 'render_page')
        );
    }
    
    public function render_page() {
        ?>
        <div class="wrap">
            <h1>All That Magazine Setup</h1>
            <p>Click the button below to automatically configure WordPress for All That Magazine.</p>
            
            <form method="post" action="<?php echo admin_url('admin-post.php'); ?>">
                <?php wp_nonce_field('atm_setup_action', 'atm_setup_nonce'); ?>
                <input type="hidden" name="action" value="atm_run_setup">
                <button type="submit" class="button button-primary button-large">
                    Run Complete Setup
                </button>
            </form>
            
            <h2>Setup Checklist</h2>
            <ul>
                <li><?php echo post_type_exists('article') ? '✅' : '❌'; ?> Custom Post Type: Article</li>
                <li><?php echo taxonomy_exists('vertical') ? '✅' : '❌'; ?> Taxonomy: Vertical</li>
                <li><?php echo class_exists('ACF') ? '✅' : '❌'; ?> ACF Plugin</li>
                <li><?php echo class_exists('WPGraphQL') ? '✅' : '❌'; ?> WPGraphQL Plugin</li>
                <li><?php echo get_option('permalink_structure') == '/%postname%/' ? '✅' : '❌'; ?> Permalinks</li>
            </ul>
        </div>
        <?php
    }
    
    public function run_setup() {
        // Verify nonce
        if (!isset($_POST['atm_setup_nonce']) || !wp_verify_nonce($_POST['atm_setup_nonce'], 'atm_setup_action')) {
            wp_die('Security check failed');
        }
        
        // Check permissions
        if (!current_user_can('manage_options')) {
            wp_die('Unauthorized');
        }
        
        // Run setup
        $settings = new ATM_Setup_Settings();
        $settings->update_all_settings();
        
        // Redirect with success message
        wp_redirect(add_query_arg(
            array('page' => 'atm-setup', 'setup' => 'complete'),
            admin_url('options-general.php')
        ));
        exit;
    }
    
    public function activation_notice() {
        if (get_transient('atm_setup_activated')) {
            ?>
            <div class="notice notice-success is-dismissible">
                <p><strong>All That Magazine Setup activated!</strong> Go to Settings → All That Setup to run configuration.</p>
            </div>
            <?php
            delete_transient('atm_setup_activated');
        }
        
        if (isset($_GET['setup']) && $_GET['setup'] == 'complete') {
            ?>
            <div class="notice notice-success is-dismissible">
                <p><strong>Setup Complete!</strong> All That Magazine is ready to use.</p>
            </div>
            <?php
        }
    }
}
```

---

## Usage Instructions

### For Cursor AI:

1. **Generate Plugin Structure:**
   ```
   Create folder: all-that-magazine-setup/
   Generate all 7 files as specified above
   ```

2. **Package Plugin:**
   ```
   ZIP the entire folder
   Name: all-that-magazine-setup.zip
   ```

3. **Installation:**
   ```
   Upload to WordPress via Plugins → Add New → Upload Plugin
   Activate plugin
   ```

4. **Run Setup:**
   ```
   Navigate to Settings → All That Setup
   Click "Run Complete Setup" button
   Verify checklist shows all green ✅
   ```

---

## Testing Checklist

After setup, verify:

```
□ Custom post type 'article' registered
□ Taxonomy 'vertical' registered
□ Three terms created (wellness, lifestyle, tech)
□ ACF field group appears on article edit screen
□ WPGraphQL plugin active
□ GraphQL IDE accessible (wp-admin/admin.php?page=graphiql-ide)
□ Permalinks set to /%postname%/
□ Timezone set to Asia/Seoul
□ Site tagline updated
```

---

## GraphQL Test Query

After setup, test with this query in GraphQL IDE:

```graphql
query TestSetup {
  articles(first: 1) {
    nodes {
      id
      title
      slug
      verticals {
        nodes {
          name
          slug
        }
      }
      articleFields {
        featuredImage {
          sourceUrl
        }
        customExcerpt
        readTime
        isPremium
        authorBio
      }
    }
  }
}
```

Expected: Valid response (even if empty `nodes` array)

---

## Troubleshooting

### Issue: ACF fields not showing in GraphQL
**Solution:** Ensure WPGraphQL for ACF plugin is activated and field group has `show_in_graphql` = 1

### Issue: Custom post type not appearing
**Solution:** Flush rewrite rules (Settings → Permalinks → Save Changes)

### Issue: Plugins not installing automatically
**Solution:** TGM Plugin Activation requires manual click on admin notice. Auto-activation may not work depending on hosting.

---

## Security Notes

- All forms use WordPress nonces
- Capability checks (`manage_options`) on all admin actions
- No user input sanitization needed (all values hardcoded)
- Safe deactivation (doesn't delete data)

---

**End of WordPress Setup Specification**

Cursor AI: Use this document to generate the complete plugin with all files.
