<?php

namespace MosPress\PluginStarter\Core;
if ( ! defined( 'ABSPATH' ) ) exit;

use MosPress\PluginStarter\API\Ajax_API;
use MosPress\PluginStarter\API\Rest_API;
use MosPress\PluginStarter\Hook\Action_Hook;
use MosPress\PluginStarter\Hook\Filter_Hook;

/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       http://wp-test.test/
 * @since      1.0.0
 *
 * @package    Plugin_Starter
 * @subpackage Plugin_Starter/includes
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    Plugin_Starter
 * @subpackage Plugin_Starter/includes
 * @author     Programmelab <mostak.shahid@gmail.com>
 */
class PluginStarter
{

	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      Loader    $loader    Maintains and registers all hooks for the plugin.
	 */
	protected $loader;

	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $plugin_name    The string used to uniquely identify this plugin.
	 */
	protected $plugin_name;

	/**
	 * The current version of the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $version    The version of the plugin.
	 */
	protected $version;

	/**
	 * Define the core functionality of the plugin.
	 *
	 * Set the plugin name and the plugin version that can be used throughout the plugin.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function __construct()
	{

		if (defined('PLUGIN_STARTER_VERSION')) {
			$this->version = PLUGIN_STARTER_VERSION;
		} else {
			$this->version = '1.0.0';
		}
		$this->plugin_name = 'plugin-starter';

		$this->load_dependencies();
		$this->define_admin_hooks();
		$this->define_public_hooks();

		Ajax_API::get_instance();
		Rest_API::get_instance();
		Action_Hook::get_instance();
		Filter_Hook::get_instance();
		
		// Instantiate additional core classes
		new ImportExport();
		new More();
	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 *
	 * - Loader. Orchestrates the hooks of the plugin.
	 * - Admin. Defines all hooks for the admin area.
	 * - Public. Defines all hooks for the public side of the site.
	 *
	 * Create an instance of the loader which will be used to register the hooks
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function load_dependencies()
	{

		require_once(ABSPATH . 'wp-admin/includes/plugin.php');

		$this->loader = new Loader();
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
		$plugin_admin = new \MosPress\PluginStarter\Admin\Admin($this->get_plugin_name(), $this->get_version());
		$this->loader->add_action('admin_enqueue_scripts', $plugin_admin, 'enqueue_styles', 9999);
		$this->loader->add_action('admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts', 9999);
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

		$plugin_public = new \MosPress\PluginStarter\Public\PublicClass($this->get_plugin_name(), $this->get_version());
		$this->loader->add_action('wp_enqueue_scripts', $plugin_public, 'enqueue_styles');
		$this->loader->add_action('wp_enqueue_scripts', $plugin_public, 'enqueue_scripts');
		// Save settings by ajax
		$this->loader->add_action('wp_ajax_plugin_starter_ajax_callback', $plugin_public, 'plugin_starter_ajax_callback');
		$this->loader->add_action('wp_ajax_nopriv_plugin_starter_ajax_callback', $plugin_public, 'plugin_starter_ajax_callback');
	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    1.0.0
	 */
	public function run()
	{
		$this->loader->run();
	}

	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     1.0.0
	 * @return    string    The name of the plugin.
	 */
	public function get_plugin_name()
	{
		return $this->plugin_name;
	}

	/**
	 * The reference to the class that orchestrates the hooks with the plugin.
	 *
	 * @since     1.0.0
	 * @return    Loader    Orchestrates the hooks of the plugin.
	 */
	public function get_loader()
	{
		return $this->loader;
	}

	/**
	 * Retrieve the version number of the plugin.
	 *
	 * @since     1.0.0
	 * @return    string    The version number of the plugin.
	 */
	public function get_version()
	{
		return $this->version;
	}
}



