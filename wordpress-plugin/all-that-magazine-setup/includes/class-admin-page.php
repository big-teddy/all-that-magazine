<?php
/**
 * Admin Page for Setup
 */
class ATM_Setup_Admin_Page {

    public function __construct() {
        add_action('admin_menu', array($this, 'add_admin_page'));
        add_action('admin_post_atm_run_setup', array($this, 'run_setup'));
        add_action('admin_notices', array($this, 'activation_notice'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_assets'));
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

    public function enqueue_assets($hook) {
        if ($hook !== 'settings_page_atm-setup') return;

        wp_enqueue_style(
            'atm-setup-admin',
            ATM_SETUP_URL . 'assets/css/admin.css',
            array(),
            ATM_SETUP_VERSION
        );
    }

    public function render_page() {
        ?>
        <div class="wrap atm-setup-page">
            <h1>All That Magazine Setup</h1>
            <p class="description">Click the button below to automatically configure WordPress for All That Magazine.</p>

            <div class="atm-setup-card">
                <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
                    <?php wp_nonce_field('atm_setup_action', 'atm_setup_nonce'); ?>
                    <input type="hidden" name="action" value="atm_run_setup">
                    <button type="submit" class="button button-primary button-large">
                        Run Complete Setup
                    </button>
                </form>
            </div>

            <h2>Setup Checklist</h2>
            <div class="atm-setup-checklist">
                <ul>
                    <li>
                        <span class="<?php echo post_type_exists('article') ? 'status-ok' : 'status-error'; ?>">
                            <?php echo post_type_exists('article') ? '✅' : '❌'; ?>
                        </span>
                        Custom Post Type: Article
                    </li>
                    <li>
                        <span class="<?php echo taxonomy_exists('vertical') ? 'status-ok' : 'status-error'; ?>">
                            <?php echo taxonomy_exists('vertical') ? '✅' : '❌'; ?>
                        </span>
                        Taxonomy: Vertical
                    </li>
                    <li>
                        <span class="<?php echo class_exists('ACF') ? 'status-ok' : 'status-error'; ?>">
                            <?php echo class_exists('ACF') ? '✅' : '❌'; ?>
                        </span>
                        ACF Plugin
                        <?php if (!class_exists('ACF')): ?>
                            <a href="<?php echo admin_url('plugin-install.php?s=advanced+custom+fields&tab=search&type=term'); ?>" class="install-link">Install</a>
                        <?php endif; ?>
                    </li>
                    <li>
                        <span class="<?php echo class_exists('WPGraphQL') ? 'status-ok' : 'status-error'; ?>">
                            <?php echo class_exists('WPGraphQL') ? '✅' : '❌'; ?>
                        </span>
                        WPGraphQL Plugin
                        <?php if (!class_exists('WPGraphQL')): ?>
                            <a href="<?php echo admin_url('plugin-install.php?s=wpgraphql&tab=search&type=term'); ?>" class="install-link">Install</a>
                        <?php endif; ?>
                    </li>
                    <li>
                        <span class="<?php echo function_exists('wpgraphql_acf_init') ? 'status-ok' : 'status-error'; ?>">
                            <?php echo function_exists('wpgraphql_acf_init') ? '✅' : '❌'; ?>
                        </span>
                        WPGraphQL for ACF Plugin
                        <?php if (!function_exists('wpgraphql_acf_init')): ?>
                            <a href="<?php echo admin_url('plugin-install.php?s=wpgraphql+acf&tab=search&type=term'); ?>" class="install-link">Install</a>
                        <?php endif; ?>
                    </li>
                    <li>
                        <span class="<?php echo get_option('permalink_structure') == '/%postname%/' ? 'status-ok' : 'status-error'; ?>">
                            <?php echo get_option('permalink_structure') == '/%postname%/' ? '✅' : '❌'; ?>
                        </span>
                        Permalinks: Post Name
                    </li>
                    <li>
                        <span class="<?php echo get_option('timezone_string') == 'Asia/Seoul' ? 'status-ok' : 'status-error'; ?>">
                            <?php echo get_option('timezone_string') == 'Asia/Seoul' ? '✅' : '❌'; ?>
                        </span>
                        Timezone: Asia/Seoul
                    </li>
                </ul>
            </div>

            <?php if (class_exists('WPGraphQL')): ?>
                <h2>GraphQL Endpoint</h2>
                <div class="atm-setup-info">
                    <p><strong>GraphQL IDE:</strong> <a href="<?php echo admin_url('admin.php?page=graphiql-ide'); ?>" target="_blank">Open GraphQL IDE</a></p>
                    <p><strong>GraphQL Endpoint:</strong> <code><?php echo get_site_url(); ?>/graphql</code></p>
                </div>
            <?php endif; ?>

            <h2>Next Steps</h2>
            <div class="atm-setup-info">
                <ol>
                    <li>Install required plugins: ACF, WPGraphQL, WPGraphQL for ACF</li>
                    <li>Click "Run Complete Setup" button above</li>
                    <li>Create sample articles with all three verticals (Wellness, Lifestyle, Tech)</li>
                    <li>Test GraphQL queries in the GraphQL IDE</li>
                    <li>Configure your Next.js frontend to connect to the GraphQL endpoint</li>
                </ol>
            </div>
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
                <p><strong>Setup Complete!</strong> All That Magazine is ready to use. Visit the <a href="<?php echo admin_url('options-general.php?page=atm-setup'); ?>">setup page</a> to verify.</p>
            </div>
            <?php
        }
    }
}
