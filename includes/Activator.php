<?php
/**
 * Plugin Activator.
 */

namespace PluginStarter;

use PluginStarter\Database\LogsTable;
use PluginStarter\Database\Seeder;
use PluginStarter\Settings\DefaultSettings;

class Activator {
    
    /**
     * Run on plugin activation.
     */
    public static function activate() {
        // Create custom database table.
        self::create_tables();
        
        // Seed database with initial data.
        self::seed_database();
        
        // Set default settings.
        self::set_default_settings();
        
        // Save plugin version.
        update_option(PLUGIN_STARTER_VERSION_OPTION, PLUGIN_STARTER_VERSION);
        
        // Set transient for redirect.
        set_transient('plugin_starter_activation_redirect', true, 30);
        
        // Flush rewrite rules.
        flush_rewrite_rules();
    }

    /**
     * Create database tables.
     */
    private static function create_tables() {
        $logs_table = new LogsTable();
        $logs_table->create();
    }

    /**
     * Seed database with initial data.
     */
    private static function seed_database() {
        $seeder = new Seeder();
        $seeder->seed();
    }

    /**
     * Set default plugin settings.
     */
    private static function set_default_settings() {
        $existing_settings = get_option(PLUGIN_STARTER_OPTION_NAME);
        
        if (false === $existing_settings) {
            $default_settings = DefaultSettings::get();
            update_option(PLUGIN_STARTER_OPTION_NAME, $default_settings);
        }
    }
}