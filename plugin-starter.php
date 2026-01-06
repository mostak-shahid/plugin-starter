<?php
/**
 * Plugin Name: Plugin Starter
 * Plugin URI: https://mostak-shahid.github.io/plugin-starter/
 * Description: Plugin starter boilerplate for WordPress
 * Version: 1.0.0
 * Author: Md. Mostak Shahid
 * Author URI: https://mostak-shahid.github.io/
 * License: GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: plugin-starter
 * Domain Path: /languages
 * Requires at least: 5.8
 * Requires PHP: 7.4
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants.
define('PLUGIN_STARTER_VERSION', '1.0.0');
define('PLUGIN_STARTER_FILE', __FILE__);
define('PLUGIN_STARTER_PATH', plugin_dir_path(__FILE__));
define('PLUGIN_STARTER_URL', plugin_dir_url(__FILE__));
define('PLUGIN_STARTER_BASENAME', plugin_basename(__FILE__));
define('PLUGIN_STARTER_SLUG', 'plugin-starter');
define('PLUGIN_STARTER_TEXT_DOMAIN', 'plugin-starter');

// Autoload Composer dependencies.
if (file_exists(PLUGIN_STARTER_PATH . 'vendor/autoload.php')) {
    require_once PLUGIN_STARTER_PATH . 'vendor/autoload.php';
}

// Load configuration files.
require_once PLUGIN_STARTER_PATH . 'config/constants.php';

use PluginStarter\Plugin;
use PluginStarter\Activator;
use PluginStarter\Deactivator;

/**
 * Activation hook.
 */
function activate_plugin_starter() {
    Activator::activate();
}
register_activation_hook(__FILE__, 'activate_plugin_starter');

/**
 * Deactivation hook.
 */
function deactivate_plugin_starter() {
    Deactivator::deactivate();
}
register_deactivation_hook(__FILE__, 'deactivate_plugin_starter');

/**
 * Initialize the plugin.
 */
function run_plugin_starter() {
    $plugin = Plugin::get_instance();
    $plugin->run();
}
add_action('plugins_loaded', 'run_plugin_starter');