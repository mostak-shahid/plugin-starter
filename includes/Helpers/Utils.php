<?php
namespace MosPress\PluginStarter\Helpers;

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
}