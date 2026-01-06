<?php
/**
 * Fired when the plugin is uninstalled.
 */

// Exit if accessed directly or not from WordPress uninstall.
if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}

// Delete plugin options.
delete_option('plugin_starter_settings');
delete_option('plugin_starter_version');

// Drop custom table.
global $wpdb;
$table_name = $wpdb->prefix . 'plugin_starter_logs_table';
$wpdb->query("DROP TABLE IF EXISTS {$table_name}");

// Clear any cached data.
wp_cache_flush();