<?php

/**
 * Fired during plugin activation
 *
 * @link       https://www.programmelab.com/
 * @since      1.0.0
 *
 * @package    Plugin_Starter
 * @subpackage Plugin_Starter/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    Plugin_Starter
 * @subpackage Plugin_Starter/includes
 * @author     Programmelab <rizvi@programmelab.com>
 */
class Plugin_Starter_Activator
{

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
	public static function activate()
	{

		$plugin_starter_options = [
			'plugin_starter_option_text' => 'Is it working?',
			'plugin_starter_option_check' => 1,
			'plugin_starter_option_radio' => 'ok',
			'plugin_starter_option_select_multy' => [],
		];
		update_option('plugin_starter_options', $plugin_starter_options);
		add_option('plugin_starter_do_activation_redirect', true);
	}
}
