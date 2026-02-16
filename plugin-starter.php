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

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/plugin-starter-functions.php';

use MosPress\PluginStarter\Plugin;

Plugin::get_instance();
