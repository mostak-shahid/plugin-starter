<?php
/**
 * Plugin Name: Plugin Starter
 * Description: WordPress plugin boilerplate with Semi UI + Tailwind + PSR-4
 * Version: 1.0.0
 * Author: Your Name
 * Text Domain: plugin-starter
 */

defined('ABSPATH') || exit;
/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define('PLUGIN_STARTER_VERSION', '1.0.0');
define('PLUGIN_STARTER_NAME', 'Plugin Starter');
define('PLUGIN_STARTER_PATH', plugin_dir_path(__FILE__));
define('PLUGIN_STARTER_URL', plugin_dir_url(__FILE__));
define('PLUGIN_STARTER_MAIN_FILE', __FILE__);

require_once PLUGIN_STARTER_PATH . '/vendor/autoload.php';
require_once PLUGIN_STARTER_PATH . '/plugin-starter-functions.php';

/**
 * The code that runs during plugin activation.
 * This action is documented in src/Core/Activator.php
 */
function plugin_starter_activate()
{
	\MosPress\PluginStarter\Core\Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in src/Core/Deactivator.php
 */
function plugin_starter_deactivate()
{
	\MosPress\PluginStarter\Core\Deactivator::deactivate();
}

register_activation_hook(__FILE__, 'plugin_starter_activate');
register_deactivation_hook(__FILE__, 'plugin_starter_deactivate');

use MosPress\PluginStarter\Plugin;

// Plugin::get_instance();
new Plugin();