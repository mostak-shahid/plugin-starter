<?php
/**
 * Uninstall Plugin
 *
 * Fired when the plugin is uninstalled (deleted from WordPress admin).
 * This file is called automatically by WordPress.
 *
 * @package PluginStarter
 */

// If uninstall not called from WordPress, exit
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
    exit;
}
$options = plugin_starter_get_option();
if (isset($options['tools']['delete_data_on']) && $options['tools']['delete_data_on'] == 'delete') {
    plugin_starter_data_cleanup();
}