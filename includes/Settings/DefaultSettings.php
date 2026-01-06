<?php
/**
 * Default Settings Provider.
 */

namespace PluginStarter\Settings;

class DefaultSettings {
    
    /**
     * Get default settings.
     *
     * @return array
     */
    public static function get() {
        return include PLUGIN_STARTER_PATH . 'config/default-settings.php';
    }
}