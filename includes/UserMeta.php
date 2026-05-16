<?php

namespace MosPress\PluginStarter;

defined('ABSPATH') || exit;

class UserMeta {

    public function __construct() {
        add_action('admin_enqueue_scripts', [$this, 'enqueue_profile_assets']);
        add_action('rest_api_init', [$this, 'register_rest_routes']);

        add_action('show_user_profile', [$this, 'render_field']);
        add_action('edit_user_profile', [$this, 'render_field']);

        add_action('personal_options_update', [$this, 'save_field']);
        add_action('edit_user_profile_update', [$this, 'save_field']);
    }


    public function enqueue_profile_assets($hook) {

        // Only load on profile pages
        if ($hook !== 'profile.php' && $hook !== 'user-edit.php') {
            return;
        }

        // wp_enqueue_style(
        //     'plugin-starter-profile',
        //     plugins_url('assets/profile.css', dirname(__FILE__)),
        //     [],
        //     filemtime(plugin_dir_path(dirname(__FILE__)) . 'assets/profile.css')
        // );

        wp_enqueue_script(
            'plugin-starter-profile',
            plugins_url('assets/build/profile.js', dirname(__FILE__)),
            ['jquery'],
            time(),
            true
        );

        wp_localize_script(
            'plugin-starter-profile',
            'plugin_starter_profile_obj',
            [
                'user_id' => get_current_user_id(),
                'nonce' => wp_create_nonce('wp_rest'),
                'api_url' => rest_url('plugin-starter/v1'),
            ]
        );
    }

    /**
     * Render custom field
     */
    public function render_field($user) {
        ?>
        <h2><?php echo esc_html__('Plugin Starter Info', 'plugin-starter'); ?></h2>
        <div id="plugin-starter-profile-react-app"></div>
        <?php wp_nonce_field( 'plugin_starter_profile_action', 'plugin_starter_profile_field' ); ?>

        <!-- Hidden inputs that React will populate -->
        <input type="hidden" name="plugin_starter_switch" id="plugin_starter_switch_hidden" value="<?php echo esc_attr(get_user_meta($user->ID, 'plugin_starter_switch', true) ?: '0'); ?>" />
        <input type="hidden" name="plugin_starter_custom_input" id="plugin_starter_custom_input_hidden" value="<?php echo esc_attr(get_user_meta($user->ID, 'plugin_starter_custom_input', true) ?: ''); ?>" />

        <!-- Media hidden inputs -->
        <input type="hidden" name="plugin_starter_media_id" id="plugin_starter_media_id_hidden" value="<?php echo esc_attr(get_user_meta($user->ID, 'plugin_starter_media_id', true) ?: '0'); ?>" />
        <input type="hidden" name="plugin_starter_media_url" id="plugin_starter_media_url_hidden" value="<?php echo esc_attr(get_user_meta($user->ID, 'plugin_starter_media_url', true) ?: ''); ?>" />

        <table class="form-table">
            <tr>
                <th>
                    <label for="plugin_starter_company">
                        <?php echo esc_html__('Company Name', 'plugin-starter'); ?>
                    </label>
                </th>
                <td>
                    <input
                        type="text"
                        name="plugin_starter_company"
                        id="plugin_starter_company"
                        value="<?php echo esc_attr(get_user_meta($user->ID, 'plugin_starter_company', true)); ?>"
                        class="regular-text"
                    />
                    <p class="description">
                        <?php echo esc_html__('Enter the user\'s company name.', 'plugin-starter'); ?>
                    </p>
                </td>
            </tr>
        </table>
        <?php
    }

    /**
     * Save custom field
     */
    public function save_field($user_id) {

        if (!current_user_can('edit_user', $user_id)) {
            return;
        }
        if ( isset( $_POST['plugin_starter_profile_field'] ) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['plugin_starter_profile_field'])), 'plugin_starter_profile_action' ) ) {
            // Save Company Name
            $plugin_starter_company = isset($_POST['plugin_starter_company']) ? sanitize_text_field(wp_unslash($_POST['plugin_starter_company'])) : '';
            update_user_meta(
                $user_id,
                'plugin_starter_company',
                $plugin_starter_company
            );

            // Save Switch value (plugin_starter_switch)
            $plugin_starter_switch = isset($_POST['plugin_starter_switch']) ? sanitize_text_field(wp_unslash($_POST['plugin_starter_switch'])) : '0';
            update_user_meta(
                $user_id,
                'plugin_starter_switch',
                $plugin_starter_switch
            );

            // Save Custom Input value (plugin_starter_custom_input)
            $plugin_starter_custom_input = isset($_POST['plugin_starter_custom_input']) ? sanitize_text_field(wp_unslash($_POST['plugin_starter_custom_input'])) : '';
            update_user_meta(
                $user_id,
                'plugin_starter_custom_input',
                $plugin_starter_custom_input
            );

            // Save Media ID
            $plugin_starter_media_id = isset($_POST['plugin_starter_media_id']) ? sanitize_text_field(wp_unslash($_POST['plugin_starter_media_id'])) : '0';
            update_user_meta(
                $user_id,
                'plugin_starter_media_id',
                $plugin_starter_media_id
            );

            // Save Media URL
            $plugin_starter_media_url = isset($_POST['plugin_starter_media_url']) ? esc_url_raw(wp_unslash($_POST['plugin_starter_media_url'])) : '';
            update_user_meta(
                $user_id,
                'plugin_starter_media_url',
                $plugin_starter_media_url
            );

        }
    }

    /**
     * Register REST API routes
     */
    public function register_rest_routes() {
        register_rest_route(
            'plugin-starter/v1',
            '/user-profile-meta',
            [
                'methods' => 'GET',
                'callback' => [$this, 'get_user_profile_meta'],
                'permission_callback' => function() {
                    return is_user_logged_in();
                },
            ]
        );
    }

    /**
     * Get user profile meta via REST API
     */
    public function get_user_profile_meta() {
        $user_id = get_current_user_id();

        if (!$user_id) {
            return new \WP_Error(
                'not_logged_in',
                __('User not logged in', 'plugin-starter'),
                ['status' => 401]
            );
        }

        return [
            'plugin_starter_switch' => get_user_meta($user_id, 'plugin_starter_switch', true) ?: '0',
            'plugin_starter_custom_input' => get_user_meta($user_id, 'plugin_starter_custom_input', true) ?: '',
            'plugin_starter_media' => [
                'id' => get_user_meta($user_id, 'plugin_starter_media_id', true) ?: 0,
                'url' => get_user_meta($user_id, 'plugin_starter_media_url', true) ?: '',
                'thumbnail' => get_user_meta($user_id, 'plugin_starter_media_url', true) ?: '',
            ],
        ];
    }
}
