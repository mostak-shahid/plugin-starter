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
 * @package           PluginStarter
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

require_once __DIR__ . '/vendor/autoload.php';

use MosPress\PluginStarter\API\Ajax_API;
use MosPress\PluginStarter\API\Rest_API;

Ajax_API::get_instance();
Rest_API::get_instance();
/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require_once PLUGIN_STARTER_PATH . 'includes/class-plugin-starter.php';

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
		'customizer' => [
			'redesign' => [
				'templates' => 'default-login',
				'background'=> [
					'type' => 'image', // gradient, image, video
					'background' => [
						"image" => [],
						"color" => "#f0f0f1",
						"position" => "center",
						"size" => "auto",
						"repeat" => "repeat",
						"origin" => "padding-box",
						"clip" => "border-box",
						"attachment" => "scroll",
					],
					'video' => '',
					'overlay' => '#ffffff00',
				],
				'logo' => [
					'disabled' => false,
					'image' => [],
					'width' => '64px',
					'height' => '64px',
					'space' => '24px',
					'url' => 'https://wordpress.org/'
				],
				'form' => [
					'wrapper' => [
						'width' => '320px',
						'height' => '',
						'margin' => [],
						'padding' => [
							'top' => '5%',
							'right' => '0px',
							'bottom' => '0px',
							'left' => '0px',
						],
						'position' => 'center',
						'background' => [
							"image" => [
								'id' => '',
								'url' => '',
							],
							"color" => "",
							"position" => "center",
							"size" => "auto",
							"repeat" => "repeat",
							"attachment" => "scroll",
						],
						'border' => [],
						'border_radius' => '0px',
						//box-shadow: 0 1px 3px rgba(0, 0, 0, .04);
						"glass_effect" => false,
					],
					'unit' => [
						'margin' => [
							'top' => '24px',
							'right' => '0px',
							'bottom' => '24px',
							'left' => '0px',
						],
						'padding' => [
							'top' => '26px',
							'right' => '24px',
							'bottom' => '26px',
							'left' => '24px',
						],
						'background' => [
							"image" => "",
							"color" => "#fff",
							"position" => "center",
							"size" => "auto",
							"repeat" => "repeat",
							"attachment" => "scroll",
						],
						'border' => [],
						'border_radius' => '0px',
						//box-shadow: 0 1px 3px rgba(0, 0, 0, .04);
						"glass_effect" => false,

					],
				],
				'fields' => [
					'width' => '100%',
					'height' => '40px',
					'font' => [						
						"enabled" => false,
						"color" => '#2c3338',
						"font-size" => '14px', 
						"font-weight" => '400', 
						"font-style" => '', 
						"font-variant" => '', 
						"font-stretch" => '', 
						"text-align" => '', 
						"text-decoration" => '', 
						"text-transform" => '', 
					],
					'border' => ['color'=> '#8c8f94','style'=> 'solid','width'=> '0.0625rem'],
					'border_radius' => '4px',
					'boxshadow' => [],
					'padding' => [
						'top' => '0.1875rem',
						'right' => '0.3125rem',
						'bottom' => '0.1875rem',
						'left' => '0.3125rem',
					],
					'margin' => [
						'top' => '0px',
						'right' => '6px',
						'bottom' => '16px',
						'left' => '0px',
					],
					'background_color' => '#ffffff',
					'label_font' => [							
						"enabled" => false,
						"color" => '#3c434a',
						"font-size" => '14px', 
						"font-weight" => '400', 
						"font-style" => '', 
						"font-variant" => '', 
						"font-stretch" => '', 
						"text-align" => '', 
						"text-decoration" => '', 
						"text-transform" => '', 
					],
				],
				'button' => [
					'font' => [
						"enabled" => false,
						"color" => '#ffffff',
						"font-size" => '13px', 
						"font-weight" => '', 
						"font-style" => '', 
						"font-variant" => '', 
						"font-stretch" => '', 
						"text-align" => '', 
						"text-decoration" => '', 
						"text-transform" => '', 
					],
					'background' => [
						'normal' => '#2271b1', 
						'hover' => '#135e96', 
						'active' => '#135e96',
					],
					'color' => [
						'normal' => '#ffffff', 
						'hover' => '#ffffff', 
						'active' => '#ffffff',
					],
					'padding' => [
						'top' => '0px',
						'right' => '12px',
						'bottom' => '0px',
						'left' => '12px',
					],
					'margin' => [],
					'border' => [
						'color'=> '#2271b1',
						'style'=> 'solid',
						'width'=> '1px'
					],
					'border_radius' => '3px',
					'boxshadow' => [],
					'textshadow' => [],
					'size' => 'auto',


				],
				'other' => [
					'disable_remember_me' => false,
					'disable_register_link' => false,
					'disable_lost_password' => false,
					'disable_privacy_policy' => false,
					'disable_back_to_website' => false,
					'login_by' => 'both', //username, email, both
					'registered_with_password' => false, //true, false
				],
			],
		],	
		'hide_login' => [
			'login_url' => '',
		],
		'two_fa_authentication' => [
			'email' => [
				'enabled' => true,
			],
			'settings' => [
				'enabled' => true,
			],
		],
		'captcha' => [
			'settings' => [
				'enabled' => true,
			],
		],
		'auto_login' => [
			'settings' => [
				'enabled' => true,
			],
			'link_login' => [
				'enabled' => true,
			],
			'social_login' => [
				'enabled' => true,
			],
			'barcode_login' => [
				'enabled' => true,
			],
			'google_login' => [
				'enabled' => true,
			]
		],
		// 'components' => [
		// 	'basic' => [
		// 		'ip' => '',
		// 		'text_field' => 'this is a text field',
		// 		'textarea_field' => 'this is a textarea field',
		// 		'select_field' => 'select-1',
		// 		'radio_field' => 'radio-1',
		// 		'radio_field_2' => 'radio-2',
		// 		'checkbox_field' => ['checkbox-1', 'checkbox-3'],
		// 		'checkbox_field_2' => ['checkbox-2', 'checkbox-3'],
		// 		'checkbox_field_3' => ['checkbox-1', 'checkbox-3'],
		// 		'multiselect_field' => ['select-2', 'select-3'],
		// 		'multiselect_field_2' => ['select-3', 'select-4'],
		// 		'switch' => 0,				
		// 		'media_uploader' => [
		// 			'url' => '',
		// 			'id' => 0
		// 		],
		// 		'countries_list' => [
		// 			['value' => "Albania", 'code' => "AL"],
		// 			['value' => "Algeria", 'code' => "DZ"],
		// 		],
		// 		'ips' => ["111.111.111.111", "222.222.222.222"],
		// 		'emails' => ["asd@asd.asd", "abc@abc.abc"],
		// 		'repeatablesorter_group' => [
		// 			[
		// 				"enabler" => true,
		// 				"title" => "123 Main St",
		// 				"note" => "Leave at door",
		// 				"enable" => true,
		// 				"gender" => "male",
		// 				"country" => "us",
		// 				"languages" => ["en", "fr"],
		// 				"hobbies" => ["reading", "sports"],
		// 			]
		// 		],
		// 		'repeatablesorter' => [
		// 			'https://www.facebook.com/',
		// 			'https://web.whatsapp.com/',
		// 			'https://www.youtube.com/',
		// 			'https://web.skype.com/'
		// 		]
		// 	],
		// 	'advanced' => [
		// 		'wordpress' => [

		// 		],
		// 		'custom' => [
		// 			'color_picker' => '#ff00ff',
		// 			'gradient_picker' => 'linear-gradient(135deg,#f00,#ff0)',
		// 			'color_gradient_picker' => '',
		// 		],
		// 	]
		// ],
		// 'editor-input' => '<p>Lorem</p>',

		'more' => [
			'enable_scripts' => false,
			'css' => '/* CSS Code Here */',
			'js' => '// JavaScript Code Here',
			'header_content' => '<!-- Content inside HEAD tag -->',
			'footer_content' => '<!-- Content inside BODY tag -->',
			
		],
		'tools' => [
			'delete_data_on' => 'none', // delete, unstall, none
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
		// var_dump($current_screen->id);
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
			|| in_array($current_screen->id, $pages)
		) {
			return true;
		}
	}
	return false;
}





