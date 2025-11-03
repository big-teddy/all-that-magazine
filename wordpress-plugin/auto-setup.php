<?php
/**
 * All That Magazine - Auto Setup Script
 *
 * Upload this file to WordPress root directory and access via browser:
 * https://allthatmagazine.com/auto-setup.php
 *
 * This script will:
 * 1. Install and activate ACF plugin
 * 2. Activate All That Magazine Setup plugin
 * 3. Run the complete setup
 */

// Security: Delete this file after use
define('AUTO_SETUP_SECRET', 'change-this-secret-key');

// Load WordPress
require_once(__DIR__ . '/wp-load.php');

// Check if user is admin or has secret key
if (!is_admin() && (!isset($_GET['secret']) || $_GET['secret'] !== AUTO_SETUP_SECRET)) {
    die('Unauthorized access');
}

// Include WordPress plugin functions
require_once(ABSPATH . 'wp-admin/includes/plugin.php');
require_once(ABSPATH . 'wp-admin/includes/file.php');
require_once(ABSPATH . 'wp-admin/includes/plugin-install.php');
require_once(ABSPATH . 'wp-admin/includes/class-wp-upgrader.php');
require_once(ABSPATH . 'wp-admin/includes/class-wp-ajax-upgrader-skin.php');
require_once(ABSPATH . 'wp-admin/includes/class-plugin-upgrader.php');

?>
<!DOCTYPE html>
<html>
<head>
    <title>All That Magazine - Auto Setup</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            border-bottom: 2px solid #4CAF50;
            padding-bottom: 10px;
        }
        .step {
            margin: 20px 0;
            padding: 15px;
            background: #f9f9f9;
            border-left: 4px solid #2196F3;
        }
        .success {
            color: #4CAF50;
            font-weight: bold;
        }
        .error {
            color: #f44336;
            font-weight: bold;
        }
        .warning {
            color: #ff9800;
            font-weight: bold;
        }
        button {
            background: #4CAF50;
            color: white;
            border: none;
            padding: 12px 24px;
            font-size: 16px;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background: #45a049;
        }
        pre {
            background: #f5f5f5;
            padding: 10px;
            border-radius: 4px;
            overflow-x: auto;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 All That Magazine - Auto Setup</h1>

        <?php

        if (isset($_GET['run'])) {
            echo '<h2>Running Setup...</h2>';

            // Step 1: Check and install ACF
            echo '<div class="step">';
            echo '<h3>Step 1: Advanced Custom Fields</h3>';

            $acf_plugin = 'advanced-custom-fields/acf.php';

            if (is_plugin_active($acf_plugin)) {
                echo '<p class="success">✓ ACF is already installed and activated</p>';
            } else {
                // Check if ACF is installed but not activated
                $all_plugins = get_plugins();
                if (isset($all_plugins[$acf_plugin])) {
                    // Just activate
                    $result = activate_plugin($acf_plugin);
                    if (is_wp_error($result)) {
                        echo '<p class="error">✗ Failed to activate ACF: ' . $result->get_error_message() . '</p>';
                    } else {
                        echo '<p class="success">✓ ACF activated successfully</p>';
                    }
                } else {
                    // Install and activate
                    echo '<p>Installing Advanced Custom Fields...</p>';

                    $api = plugins_api('plugin_information', array(
                        'slug' => 'advanced-custom-fields',
                        'fields' => array('sections' => false)
                    ));

                    if (is_wp_error($api)) {
                        echo '<p class="error">✗ Failed to get plugin info: ' . $api->get_error_message() . '</p>';
                    } else {
                        $upgrader = new Plugin_Upgrader(new WP_Ajax_Upgrader_Skin());
                        $result = $upgrader->install($api->download_link);

                        if (is_wp_error($result)) {
                            echo '<p class="error">✗ Failed to install ACF: ' . $result->get_error_message() . '</p>';
                        } else {
                            $activate_result = activate_plugin($acf_plugin);
                            if (is_wp_error($activate_result)) {
                                echo '<p class="error">✗ Failed to activate ACF: ' . $activate_result->get_error_message() . '</p>';
                            } else {
                                echo '<p class="success">✓ ACF installed and activated successfully</p>';
                            }
                        }
                    }
                }
            }
            echo '</div>';

            // Step 2: Activate All That Magazine Setup
            echo '<div class="step">';
            echo '<h3>Step 2: All That Magazine Setup Plugin</h3>';

            $atm_plugin = 'all-that-magazine-setup/all-that-magazine-setup.php';

            if (is_plugin_active($atm_plugin)) {
                echo '<p class="success">✓ All That Magazine Setup is already activated</p>';
            } else {
                $result = activate_plugin($atm_plugin);
                if (is_wp_error($result)) {
                    echo '<p class="error">✗ Failed to activate plugin: ' . $result->get_error_message() . '</p>';
                } else {
                    echo '<p class="success">✓ All That Magazine Setup activated successfully</p>';
                }
            }
            echo '</div>';

            // Step 3: Check required plugins
            echo '<div class="step">';
            echo '<h3>Step 3: Required Plugins Check</h3>';

            $wpgraphql = 'wp-graphql/wp-graphql.php';
            $wpgraphql_acf = 'wpgraphql-acf/wpgraphql-acf.php';

            if (is_plugin_active($wpgraphql)) {
                echo '<p class="success">✓ WPGraphQL is active</p>';
            } else {
                echo '<p class="warning">⚠ WPGraphQL is not active</p>';
            }

            if (is_plugin_active($wpgraphql_acf)) {
                echo '<p class="success">✓ WPGraphQL for ACF is active</p>';
            } else {
                echo '<p class="warning">⚠ WPGraphQL for ACF is not active</p>';
            }
            echo '</div>';

            // Step 4: Run setup (if class exists)
            echo '<div class="step">';
            echo '<h3>Step 4: Running Setup</h3>';

            if (class_exists('ATM_Setup_Settings')) {
                $settings = new ATM_Setup_Settings();

                // Trigger setup actions
                if (method_exists($settings, 'run_complete_setup')) {
                    $settings->run_complete_setup();
                    echo '<p class="success">✓ Setup completed successfully!</p>';
                } else {
                    echo '<p class="warning">⚠ Setup method not found. The plugin may need manual setup.</p>';
                }
            } else {
                echo '<p class="warning">⚠ Plugin class not loaded. Please refresh and try again.</p>';
            }
            echo '</div>';

            // Final summary
            echo '<div class="step">';
            echo '<h3>✅ Setup Complete!</h3>';
            echo '<p>Next steps:</p>';
            echo '<ol>';
            echo '<li>Go to <a href="/wp-admin">WordPress Admin</a></li>';
            echo '<li>Check <a href="/wp-admin/admin.php?page=graphiql-ide">GraphQL IDE</a></li>';
            echo '<li>Test the GraphQL endpoint: <code>https://allthatmagazine.com/graphql</code></li>';
            echo '<li><strong>DELETE THIS FILE</strong> for security: <code>auto-setup.php</code></li>';
            echo '</ol>';
            echo '</div>';

        } else {
            // Show setup form
            ?>
            <p>This script will automatically:</p>
            <ol>
                <li>Install and activate <strong>Advanced Custom Fields (ACF)</strong></li>
                <li>Activate <strong>All That Magazine Setup</strong> plugin</li>
                <li>Verify required plugins (WPGraphQL, WPGraphQL for ACF)</li>
                <li>Run the complete setup process</li>
            </ol>

            <p><strong>⚠️ Important:</strong> Delete this file after setup is complete for security reasons.</p>

            <form method="get">
                <input type="hidden" name="run" value="1">
                <input type="hidden" name="secret" value="<?php echo AUTO_SETUP_SECRET; ?>">
                <button type="submit">🚀 Run Auto Setup</button>
            </form>
            <?php
        }
        ?>
    </div>
</body>
</html>
