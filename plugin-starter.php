<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://www.programmelab.com/
 * @since             1.0.0
 * @package           Plugin_Starter
 *
 * @wordpress-plugin
 * Plugin Name:       Ultimate Quick View for WooCommerce
 * Plugin URI:        https://https://www.programmelab.com/plugin-starter/
 * Description:       Ultimate Quick View Plugin for WooCommerce
 * Version:           1.0.0
 * Author:            Programmelab
 * Author URI:        https://www.programmelab.com//
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       plugin-starter
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define('PLUGIN_STARTER_VERSION', '1.0.0');
define('PLUGIN_STARTER_NAME', __('Ultimate Quick View for WooCommerce', 'plugin-starter'));
define('PLUGIN_STARTER_PATH', plugin_dir_url(__FILE__));

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-plugin-starter-activator.php
 */
function plugin_starter_activate()
{
	require_once plugin_dir_path(__FILE__) . 'includes/class-plugin-starter-activator.php';
	Plugin_Starter_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-plugin-starter-deactivator.php
 */
function plugin_starter_deactivate()
{
	require_once plugin_dir_path(__FILE__) . 'includes/class-plugin-starter-deactivator.php';
	Plugin_Starter_Deactivator::deactivate();
}

register_activation_hook(__FILE__, 'plugin_starter_activate');
register_deactivation_hook(__FILE__, 'plugin_starter_deactivate');

require plugin_dir_path(__FILE__) . '/vendor/autoload.php';
/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path(__FILE__) . 'includes/class-plugin-starter.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function plugin_starter_run()
{

	$plugin = new Plugin_Starter();
	$plugin->run();
}
plugin_starter_run();
