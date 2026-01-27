<?php
if ( ! defined( 'ABSPATH' ) ) exit;
function plugin_starter_get_default_options()
{
	$plugin_starter_default_options = [];
	$plugin_starter_default_options = apply_filters('plugin_starter_default_options_modify', $plugin_starter_default_options);
	return $plugin_starter_default_options;
}
function plugin_starter_get_default_colors()
{
	$plugin_starter_default_colors = [];
	$plugin_starter_default_colors = apply_filters('plugin_starter_default_colors_modify', $plugin_starter_default_colors);
	return $plugin_starter_default_colors;
}

function plugin_starter_get_default_gradients()
{
	$plugin_starter_default_gradients = [];
	$plugin_starter_default_gradients = apply_filters('plugin_starter_default_gradients_modify', $plugin_starter_default_gradients);
	return $plugin_starter_default_gradients;
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