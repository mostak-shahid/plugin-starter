<?php
/**
 * Plugin Action Links Handler.
 */

namespace PluginStarter\Admin;

class ActionLinks {
    
    /**
     * Add custom action links to plugin page.
     *
     * @param array $links Existing plugin action links.
     * @return array
     */
    public function add_action_links($links) {
        $custom_links = [
            'dashboard' => sprintf(
                '<a href="%s">%s</a>',
                admin_url('admin.php?page=' . PLUGIN_STARTER_MENU_SLUG),
                __('Dashboard', 'plugin-starter')
            ),
            'settings' => sprintf(
                '<a href="%s">%s</a>',
                admin_url('admin.php?page=plugin-starter-base-inputs'),
                __('Settings', 'plugin-starter')
            ),
        ];

        return array_merge($custom_links, $links);
    }
}