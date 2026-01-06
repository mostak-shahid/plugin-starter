<?php
/**
 * Plugin Deactivator.
 */

namespace PluginStarter;

class Deactivator {
    
    /**
     * Run on plugin deactivation.
     */
    public static function deactivate() {
        // Flush rewrite rules.
        flush_rewrite_rules();
        
        // Clear any transients.
        delete_transient('plugin_starter_activation_redirect');
        
        // Clear cache.
        wp_cache_flush();
    }
}