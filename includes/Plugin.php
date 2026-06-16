<?php

namespace MosPress\PluginStarter;

defined('ABSPATH') || exit;

use MosPress\PluginStarter\API\Ajax_API;
use MosPress\PluginStarter\API\Rest_API;
use MosPress\PluginStarter\Hook\Action_Hook;
use MosPress\PluginStarter\Hook\Filter_Hook;
use MosPress\PluginStarter\Core\Tools;
use MosPress\PluginStarter\Helpers\Utils;

class Plugin {
	public function __construct() {

		$this->define_admin_hooks();
		$this->define_public_hooks();

		Ajax_API::get_instance();
		Rest_API::get_instance();
		Action_Hook::get_instance();
		Filter_Hook::get_instance();
		
		// Instantiate additional core classes
		new Utils();
		new Tools();
	}
	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_admin_hooks()
	{
		add_action('admin_enqueue_scripts', [$this, 'admin_enqueue_scripts'], 9999);
	}

	/**
	 * Register all of the hooks related to the public-facing functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_public_hooks()
	{
		add_action('wp_enqueue_scripts', [$this, 'wp_enqueue_scripts']);
		// Save settings by ajax
		// add_action('wp_ajax_plugin_starter_ajax_callback', [$this, 'plugin_starter_ajax_callback']);
		// add_action('wp_ajax_nopriv_plugin_starter_ajax_callback', [$this, 'plugin_starter_ajax_callback']);
	}
	public function admin_enqueue_scripts()
	{
		wp_enqueue_style('plugin-starter-admin-styles', PLUGIN_STARTER_URL . 'assets/css/admin.css', [], PLUGIN_STARTER_VERSION);
	}
	public function wp_enqueue_scripts()
	{
		// wp_enqueue_style('plugin-starter-public-styles', PLUGIN_STARTER_URL . 'assets/css/public.css', [], PLUGIN_STARTER_VERSION);
	}
}
