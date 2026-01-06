<?php
/**
 * Plugin Constants.
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

// Menu slugs.
define('PLUGIN_STARTER_MENU_SLUG', 'plugin-starter-dashboard');
define('PLUGIN_STARTER_SETTINGS_SLUG', 'plugin-starter-settings');

// Database table name.
define('PLUGIN_STARTER_LOGS_TABLE', 'plugin_starter_logs_table');

// API namespace.
define('PLUGIN_STARTER_API_NAMESPACE', 'plugin-starter/v1');

// Option names.
define('PLUGIN_STARTER_OPTION_NAME', 'plugin_starter_settings');
define('PLUGIN_STARTER_VERSION_OPTION', 'plugin_starter_version');

// Log types.
define('PLUGIN_STARTER_LOG_INFO', 'info');
define('PLUGIN_STARTER_LOG_WARNING', 'warning');
define('PLUGIN_STARTER_LOG_ERROR', 'error');
define('PLUGIN_STARTER_LOG_SUCCESS', 'success');