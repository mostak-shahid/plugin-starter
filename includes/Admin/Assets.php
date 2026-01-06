<?php
/**
 * Admin Assets Handler.
 */

namespace PluginStarter\Admin;

class Assets {
    
    /**
     * Enqueue admin scripts and styles.
     *
     * @param string $hook Current admin page hook.
     */
    public function enqueue_scripts($hook) {
        // Only load on plugin pages.
        if (!$this->is_plugin_page($hook)) {
            return;
        }

        // Enqueue WordPress components styles.
        wp_enqueue_style('wp-components');

        // Enqueue React app based on current page.
        $this->enqueue_react_app($hook);

        // Localize script with data.
        wp_localize_script('plugin-starter-react', 'pluginStarterData', [
            'restUrl' => rest_url(PLUGIN_STARTER_API_NAMESPACE),
            'nonce' => wp_create_nonce('wp_rest'),
            'adminUrl' => admin_url(),
            'pluginUrl' => PLUGIN_STARTER_URL,
            'version' => PLUGIN_STARTER_VERSION,
            'currentUser' => wp_get_current_user()->ID,
            'dashboardUrl' => admin_url('admin.php?page=' . PLUGIN_STARTER_MENU_SLUG),
            'baseInputsUrl' => admin_url('admin.php?page=plugin-starter-base-inputs'),
            'arrayInputsUrl' => admin_url('admin.php?page=plugin-starter-array-inputs'),
            'feedbackUrl' => admin_url('admin.php?page=plugin-starter-feedback'),
        ]);
    }

    /**
     * Enqueue React app.
     *
     * @param string $hook Current admin page hook.
     */
    private function enqueue_react_app($hook) {
        $pages = [
            'toplevel_page_' . PLUGIN_STARTER_MENU_SLUG => 'dashboard',
            'plugin-starter_page_plugin-starter-base-inputs' => 'settings',
            'plugin-starter_page_plugin-starter-array-inputs' => 'settings',
            'plugin-starter_page_plugin-starter-feedback' => 'feedback',
        ];

        $app = isset($pages[$hook]) ? $pages[$hook] : 'dashboard';

        wp_enqueue_style(
            'plugin-starter-react',
            PLUGIN_STARTER_URL . "build/{$app}.css",
            ['wp-components'],
            PLUGIN_STARTER_VERSION
        );

        // Enqueue compiled React bundle.
        wp_enqueue_script(
            'plugin-starter-react',
            PLUGIN_STARTER_URL . "build/{$app}.js",
            [
                'wp-element', 
                'wp-components', 
                'wp-i18n', 
                'wp-api-fetch', 
                // 'wp-icons',
            ],
            PLUGIN_STARTER_VERSION,
            true
        );

        // Add inline script to set up wp.apiFetch
        wp_add_inline_script(
            'plugin-starter-react',
            'wp.apiFetch.use( wp.apiFetch.createNonceMiddleware( "' . wp_create_nonce('wp_rest') . '" ) );
             wp.apiFetch.use( wp.apiFetch.createRootURLMiddleware( "' . esc_url_raw(rest_url()) . '" ) );',
            'before'
        );
    }

    /**
     * Check if current page is a plugin page.
     *
     * @param string $hook Current admin page hook.
     * @return bool
     */
    private function is_plugin_page($hook) {
        $plugin_pages = [
            'toplevel_page_' . PLUGIN_STARTER_MENU_SLUG,
            'plugin-starter_page_plugin-starter-base-inputs',
            'plugin-starter_page_plugin-starter-array-inputs',
            'plugin-starter_page_plugin-starter-feedback',
        ];

        return in_array($hook, $plugin_pages, true);
    }
}