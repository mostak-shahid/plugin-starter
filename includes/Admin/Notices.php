<?php
/**
 * Admin Notices Handler.
 */

namespace PluginStarter\Admin;

class Notices {
    
    /**
     * Remove admin notices on plugin settings pages.
     */
    public function remove_notices_on_plugin_pages() {
        $screen = get_current_screen();
        
        if (!$screen) {
            return;
        }

        $plugin_screens = [
            'toplevel_page_' . PLUGIN_STARTER_MENU_SLUG,
            'plugin-starter_page_plugin-starter-base-inputs',
            'plugin-starter_page_plugin-starter-array-inputs',
            'plugin-starter_page_plugin-starter-feedback',
        ];

        if (in_array($screen->id, $plugin_screens, true)) {
            remove_all_actions('admin_notices');
            remove_all_actions('all_admin_notices');
        }
    }
}