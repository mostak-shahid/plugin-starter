<?php
/**
 * Admin Menu Handler.
 */

namespace PluginStarter\Admin;

class Menu {
    
    /**
     * Register admin menu.
     */
    public function register_menu() {
        // Main menu (Dashboard).
        add_menu_page(
            __('Plugin Starter', 'plugin-starter'),
            __('Plugin Starter', 'plugin-starter'),
            'manage_options',
            PLUGIN_STARTER_MENU_SLUG,
            [$this, 'render_dashboard_page'],
            'dashicons-admin-generic',
            30
        );

        // Dashboard submenu (same as parent).
        add_submenu_page(
            PLUGIN_STARTER_MENU_SLUG,
            __('Dashboard', 'plugin-starter'),
            __('Dashboard', 'plugin-starter'),
            'manage_options',
            PLUGIN_STARTER_MENU_SLUG,
            [$this, 'render_dashboard_page']
        );

        // Base Inputs submenu.
        add_submenu_page(
            PLUGIN_STARTER_MENU_SLUG,
            __('Base Inputs', 'plugin-starter'),
            __('Base Inputs', 'plugin-starter'),
            'manage_options',
            'plugin-starter-base-inputs',
            [$this, 'render_base_inputs_page']
        );

        // Array Inputs submenu.
        add_submenu_page(
            PLUGIN_STARTER_MENU_SLUG,
            __('Array Inputs', 'plugin-starter'),
            __('Array Inputs', 'plugin-starter'),
            'manage_options',
            'plugin-starter-array-inputs',
            [$this, 'render_array_inputs_page']
        );

        // Feedback submenu.
        add_submenu_page(
            PLUGIN_STARTER_MENU_SLUG,
            __('Feedback', 'plugin-starter'),
            __('Feedback', 'plugin-starter'),
            'manage_options',
            'plugin-starter-feedback',
            [$this, 'render_feedback_page']
        );

        // Handle activation redirect.
        add_action('admin_init', [$this, 'activation_redirect']);
    }

    /**
     * Render dashboard page.
     */
    public function render_dashboard_page() {
        include PLUGIN_STARTER_PATH . 'templates/admin/dashboard.php';
    }

    /**
     * Render base inputs page.
     */
    public function render_base_inputs_page() {
        include PLUGIN_STARTER_PATH . 'templates/admin/base-inputs.php';
    }

    /**
     * Render array inputs page.
     */
    public function render_array_inputs_page() {
        include PLUGIN_STARTER_PATH . 'templates/admin/array-inputs.php';
    }

    /**
     * Render feedback page.
     */
    public function render_feedback_page() {
        include PLUGIN_STARTER_PATH . 'templates/admin/feedback.php';
    }

    /**
     * Redirect to dashboard after activation.
     */
    public function activation_redirect() {
        if (get_transient('plugin_starter_activation_redirect')) {
            delete_transient('plugin_starter_activation_redirect');
            
            if (!isset($_GET['activate-multi'])) {
                wp_safe_redirect(admin_url('admin.php?page=' . PLUGIN_STARTER_MENU_SLUG));
                exit;
            }
        }
    }
}