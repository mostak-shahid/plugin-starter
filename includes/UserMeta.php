<?php

namespace MosPress\PluginStarter;

defined('ABSPATH') || exit;

class UserMeta {

    public function __construct() {
        add_action('admin_enqueue_scripts', [$this, 'enqueue_profile_assets']);

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
            // filemtime(plugin_dir_path(dirname(__FILE__)) . 'assets/profile.js'),
            time(),
            true
        );
    }

    /**
     * Render custom field
     */
    public function render_field($user) {
        ?>
        <h2>Plugin Starter Info</h2>
        <div id="plugin-starter-profile-react-app"></div>
        <table class="form-table">
            <tr>
                <th>
                    <label for="plugin_starter_company">
                        Company Name
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
                        Enter the user's company name.
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

        if (isset($_POST['plugin_starter_company'])) {
            update_user_meta(
                $user_id,
                'plugin_starter_company',
                sanitize_text_field($_POST['plugin_starter_company'])
            );
        }
    }
}
