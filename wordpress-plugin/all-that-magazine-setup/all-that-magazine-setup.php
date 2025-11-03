<?php
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
    new ATM_Setup_Post_Types();
    new ATM_Setup_Taxonomies();
    new ATM_Setup_ACF_Fields();
    new ATM_Setup_Settings();
    new ATM_Setup_Admin_Page();
    $rest_api = new ATM_Setup_REST_API();
    $rest_api->__init();
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
