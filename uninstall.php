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
