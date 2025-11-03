<?php
/**
 * Create Application Password for REST API
 *
 * Upload this file to WordPress root and access via browser:
 * https://allthatmagazine.com/create-app-password.php
 */

// Load WordPress
require_once __DIR__ . '/wp-load.php';

// Check if user is logged in
if (!is_user_logged_in()) {
    wp_die('Please log in to WordPress admin first, then access this script again.');
}

$user_id = get_current_user_id();
$user = get_userdata($user_id);

// Check if Application Passwords are enabled
if (!class_exists('WP_Application_Passwords')) {
    wp_die('Application Passwords are not available. Please update WordPress to 5.6 or higher.');
}

// Create a new Application Password
$app_name = 'All That Magazine Frontend - ' . date('Y-m-d H:i:s');
$created = WP_Application_Passwords::create_new_application_password($user_id, array(
    'name' => $app_name,
));

if (is_wp_error($created)) {
    wp_die('Error creating Application Password: ' . $created->get_error_message());
}

// Get the generated password
$password = $created[0];
$username = $user->user_login;

?>
<!DOCTYPE html>
<html>
<head>
    <title>Application Password Created</title>
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
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #23282d;
            margin-bottom: 10px;
        }
        .success {
            background: #d4edda;
            color: #155724;
            padding: 15px;
            border-radius: 4px;
            margin: 20px 0;
        }
        .credentials {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 4px;
            margin: 20px 0;
            font-family: 'Courier New', monospace;
        }
        .credentials strong {
            display: inline-block;
            width: 200px;
        }
        .warning {
            background: #fff3cd;
            color: #856404;
            padding: 15px;
            border-radius: 4px;
            margin: 20px 0;
        }
        .env-example {
            background: #23282d;
            color: #50fa7b;
            padding: 20px;
            border-radius: 4px;
            margin: 20px 0;
            overflow-x: auto;
        }
        button {
            background: #0073aa;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
        }
        button:hover {
            background: #005a87;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Application Password Created Successfully</h1>

        <div class="success">
            Application Password has been created for user: <strong><?php echo esc_html($username); ?></strong>
        </div>

        <div class="credentials">
            <p><strong>Username:</strong> <?php echo esc_html($username); ?></p>
            <p><strong>Application Password:</strong> <?php echo esc_html($password); ?></p>
        </div>

        <div class="warning">
            <strong>Important:</strong> Copy this password now. You won't be able to see it again!<br>
            This password can be revoked anytime from your WordPress profile page.
        </div>

        <h2>Add to .env.local</h2>
        <p>Copy the following lines to your <code>frontend/.env.local</code> file:</p>

        <div class="env-example">
NEXT_PUBLIC_WP_API_URL=https://allthatmagazine.com/wp-json<br>
NEXT_PUBLIC_WP_USERNAME=<?php echo esc_html($username); ?><br>
NEXT_PUBLIC_WP_APP_PASSWORD=<?php echo esc_html($password); ?>
        </div>

        <button onclick="copyToClipboard()">Copy to Clipboard</button>

        <h2>Next Steps</h2>
        <ol>
            <li>Copy the Application Password and update your <code>.env.local</code> file</li>
            <li>Restart your Next.js development server</li>
            <li>Visit <code>http://localhost:3000/admin/create-article</code> to create articles</li>
            <li>Delete this file (<code>create-app-password.php</code>) for security</li>
        </ol>
    </div>

    <script>
        function copyToClipboard() {
            const text = `NEXT_PUBLIC_WP_API_URL=https://allthatmagazine.com/wp-json
NEXT_PUBLIC_WP_USERNAME=<?php echo esc_js($username); ?>
NEXT_PUBLIC_WP_APP_PASSWORD=<?php echo esc_js($password); ?>`;

            navigator.clipboard.writeText(text).then(function() {
                alert('Copied to clipboard!');
            }, function(err) {
                alert('Failed to copy. Please copy manually.');
            });
        }
    </script>
</body>
</html>
<?php
// Log the creation
error_log("Application Password created for user {$username} at " . date('Y-m-d H:i:s'));
?>
