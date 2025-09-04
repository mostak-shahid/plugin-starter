<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://www.mdmostakshahid.com/
 * @since             1.0.0
 * @package           Plugin_Starter
 *
 * @wordpress-plugin
 * Plugin Name:       Plugin Starter
 * Plugin URI:        https://www.mdmostakshahid.com/plugin-starter/
 * Description:       Plugin starter boilerplate for WordPress
 * Version:           1.0.0
 * Author:            Md. Mostak Shahid
 * Author URI:        https://www.mdmostakshahid.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       plugin-starter
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define('PLUGIN_STARTER_VERSION', '1.0.0');
define('PLUGIN_STARTER_NAME', 'Plugin Starter');

define('PLUGIN_STARTER_PATH', plugin_dir_path(__FILE__));
define('PLUGIN_STARTER_URL', plugin_dir_url(__FILE__));



/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-plugin-starter-activator.php
 */
function plugin_starter_activate()
{
	require_once PLUGIN_STARTER_PATH . 'includes/class-plugin-starter-activator.php';
	Plugin_Starter_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-plugin-starter-deactivator.php
 */
function plugin_starter_deactivate()
{
	require_once PLUGIN_STARTER_PATH . 'includes/class-plugin-starter-deactivator.php';
	Plugin_Starter_Deactivator::deactivate();
}

register_activation_hook(__FILE__, 'plugin_starter_activate');
register_deactivation_hook(__FILE__, 'plugin_starter_deactivate');

if (file_exists(PLUGIN_STARTER_PATH . '/vendor/autoload.php')) {
	require_once PLUGIN_STARTER_PATH . '/vendor/autoload.php';
}
/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require PLUGIN_STARTER_PATH . 'includes/class-plugin-starter.php';
require PLUGIN_STARTER_PATH . 'API/Rest_API.php';

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

function plugin_starter_get_tabs()
{
	$plugin_starter_tabs = [];
	/*$plugin_starter_tabs = [
		'integration' => [
			'slug' => 'integration',
			'name' => 'Restrictions',
			'description' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
			'url' => 'plugin-starter',
			'sub' => [
				'security-for-woocommerce' => [
					'slug' => 'security-for-woocommerce',
					'name' => 'Settings',
					'description' => 'Below you will find all the settings you need to restrict specific countires and IP addressses that you wish to restrict for your WooCommerce site. The restrictons will be applied to your WooCommerce pages.',
					'url' => 'plugin-starter'
				],
				'customize' => [
					'slug' => 'customize',
					'name' => 'Customize',
					'description' => 'Below you will find all the settings you need to customize restriction pages including the images that the visitor will see if they are restricted from accessing the website. The customization will be applied to your WooCommerce pages.',
					'url' => 'plugin-starter-integration-customize'
				],
			],
		],
	];*/
	// Apply filter to allow modification of $variable by other plugins
	$plugin_starter_tabs = apply_filters('plugin_starter_tabs_modify', $plugin_starter_tabs);

	return $plugin_starter_tabs;
}

function plugin_starter_get_default_options()
{
	$plugin_starter_default_options = [
		'base_input' => [
			'text_input' => '',
			'email_input' => '',
			'color_input' => '',
			'date_input' => '',
			'datetime_local_input' => '',
			'textarea_input' => '',
			'switch_input' => '1',
			'radio_input' => 'radio-2',
			'datalist_input' => '',
			'select_input' => '',
		],
		'array_input' => [
			'checkbox_input' => [],
			'multi_select_input' => [],
			'background' => [
				'image' => [
					'url' => '',
					'id' => 0
				],
				'color' => '#ff00ff',
				'position' => 'center',
				'size' => 'cover',
				'repeat' => 'repeat',
				'origin' => 'padding-box',
				'clip' => 'border-box',
				'attachment' => 'scroll'
			],
		],		
		'components' => [
			'basic' => [
				'ip' => '',
				'text_field' => 'this is a text field',
				'textarea_field' => 'this is a textarea field',
				'select_field' => 'select-1',
				'radio_field' => 'radio-1',
				'radio_field_2' => 'radio-2',
				'checkbox_field' => ['checkbox-1', 'checkbox-3'],
				'checkbox_field_2' => ['checkbox-2', 'checkbox-3'],
				'checkbox_field_3' => ['checkbox-1', 'checkbox-3'],
				'multiselect_field' => ['select-2', 'select-3'],
				'multiselect_field_2' => ['select-3', 'select-4'],
				'switch' => 0,
			],
			'advanced' => [
				'media_uploader' => [
					'url' => '',
					'id' => 0
				],
				'countries_list' => [
					['value' => "Albania", 'code' => "AL"],
					['value' => "Algeria", 'code' => "DZ"],
				],
				'ips' => ["111.111.111.111", "222.222.222.222"],
				'emails' => ["asd@asd.asd", "abc@abc.abc"],
				'repeatablesorter_group' => [
					[
						"enabler" => true,
						"title" => "123 Main St",
						"note" => "Leave at door",
						"enable" => true,
						"gender" => "male",
						"country" => "us",
						"languages" => ["en", "fr"],
						"hobbies" => ["reading", "sports"],
					]
				],
				'repeatablesorter' => [
					'https://www.facebook.com/',
					'https://web.whatsapp.com/',
					'https://www.youtube.com/',
					'https://web.skype.com/'
				]
			]
		],
		// 'editor-input' => '<p>Lorem</p>',

		'more' => [
			'enable_scripts' => 0,
			'css' => '/* CSS Code Here */',
			'js' => '// JavaScript Code Here',
			'header_content' => '<!-- Content inside HEAD tag -->',
			'footer_content' => '<!-- Content inside BODY tag -->',
		],

	];
	$plugin_starter_default_options = apply_filters('plugin_starter_default_options_modify', $plugin_starter_default_options);

	return $plugin_starter_default_options;
}

// update_option('plugin_starter_options', plugin_starter_get_default_options());

function plugin_starter_get_option()
{
	$plugin_starter_options_database = get_option('plugin_starter_options', []);
	$plugin_starter_options = array_replace_recursive(plugin_starter_get_default_options(), $plugin_starter_options_database);
	return $plugin_starter_options;
}
function plugin_starter_is_plugin_page()
{
	if (function_exists('get_current_screen')) {
		$current_screen = get_current_screen();
		$tabs = plugin_starter_get_tabs();
		$pages = [];
		if (isset($tabs) && sizeof($tabs)) {
			foreach ($tabs as $tab) {
				$pages[] = 'admin_page_' . $tab['url'];
				if (isset($tab['sub']) && sizeof($tab['sub'])) {
					foreach ($tab['sub'] as $subtab) {
						$pages[] = 'admin_page_' . $subtab['url'];
					}
				}
			}
		}

		if (
			$current_screen->id == 'toplevel_page_plugin-starter'
			|| $current_screen->id == 'plugin-starter_page_plugin-starter-react'
			|| in_array($current_screen->id, $pages)
		) {
			return true;
		}
	}
	return false;
}
add_action( 'before_woocommerce_init', function() {
    if (
        class_exists( \Automattic\WooCommerce\Utilities\FeaturesUtil::class )
    ) {
        \Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility( 'custom_order_tables', __FILE__, true );
        \Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility( 'cart_checkout_blocks', __FILE__, true );
    }
} );
