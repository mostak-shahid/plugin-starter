<?php

/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       https://www.programmelab.com/
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
 * @author     Programmelab <rizvi@programmelab.com>
 */
class Plugin_Starter
{

	/**
	 * Store plugin main class to allow public access.
	 *
	 * @since    1.0.0
	 * @var object      The main class.
	 */
	public $main;

	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      Plugin_Starter_Loader    $loader    Maintains and registers all hooks for the plugin.
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
	 * @var      string    $version    The current version of the plugin.
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
		// Save instance for the main class.
		$this->main = $this;

		if (defined('PLUGIN_STARTER_VERSION')) {
			$this->version = PLUGIN_STARTER_VERSION;
		} else {
			$this->version = '1.0.0';
		}
		$this->plugin_name = 'plugin-starter';

		$this->load_dependencies();
		$this->set_locale();
		$this->define_admin_hooks();
		$this->define_public_hooks();
	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 *
	 * - Plugin_Starter_Loader. Orchestrates the hooks of the plugin.
	 * - Plugin_Starter_i18n. Defines internationalization functionality.
	 * - Plugin_Starter_Admin. Defines all hooks for the admin area.
	 * - Plugin_Starter_Public. Defines all hooks for the public side of the site.
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

		/**
		 * The class responsible for orchestrating the actions and filters of the
		 * core plugin.
		 */
		require_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-plugin-starter-loader.php';

		/**
		 * The class responsible for defining internationalization functionality
		 * of the plugin.
		 */
		require_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-plugin-starter-i18n.php';

		/**
		 * The class responsible for defining all actions that occur in the admin area.
		 */
		require_once plugin_dir_path(dirname(__FILE__)) . 'admin/class-plugin-starter-admin.php';

		/**
		 * The class responsible for defining all actions that occur in the public-facing
		 * side of the site.
		 */
		require_once plugin_dir_path(dirname(__FILE__)) . 'public/class-plugin-starter-public.php';

		$this->loader = new Plugin_Starter_Loader();
	}

	/**
	 * Define the locale for this plugin for internationalization.
	 *
	 * Uses the Plugin_Starter_i18n class in order to set the domain and to register the hook
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function set_locale()
	{

		$plugin_i18n = new Plugin_Starter_i18n();

		$this->loader->add_action('plugins_loaded', $plugin_i18n, 'load_plugin_textdomain');
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

		// $plugin_admin = new Plugin_Starter_Admin($this->get_plugin_name(), $this->get_version());

		$this->admin = new Plugin_Starter_Admin( $this->get_plugin_name(), $this->get_version(), $this->main );

		if (is_plugin_active('woocommerce/woocommerce.php')) {
			$this->loader->add_action('admin_enqueue_scripts', $this->admin, 'enqueue_styles');
			$this->loader->add_action('admin_enqueue_scripts', $this->admin, 'enqueue_scripts');

			$this->loader->add_action('admin_menu', $this->admin, 'plugin_starter_admin_menu');

			// Add Settings link to the plugin
			$plugin_basename = plugin_basename(plugin_dir_path(__DIR__) . $this->plugin_name . '.php');
			$this->loader->add_filter('plugin_action_links_' . $plugin_basename, $this->admin, 'plugin_starter_add_action_links');

			$this->loader->add_filter('admin_body_class', $this->admin, 'plugin_starter_admin_body_class');

			$this->loader->add_action('admin_init', $this->admin, 'plugin_starter_do_activation_redirect');

			$this->loader->add_action('current_screen', $this->admin, 'plugin_starter_hide_admin_notices');
			
			$this->loader->add_action('rest_api_init', $this->admin, 'plugin_starter_rest_api_register_route');
		} else {
			$this->loader->add_action('admin_notices', $this->admin, 'plugin_starter_woo_check');
			add_action("wp_ajax_plugin_starter_ajax_install_plugin", "wp_ajax_install_plugin");
		}
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

		// $plugin_public = new Plugin_Starter_Public($this->get_plugin_name(), $this->get_version());

		$this->public = new Plugin_Starter_Public( $this->get_plugin_name(), $this->get_version(), $this->main );
		if (is_plugin_active('woocommerce/woocommerce.php')) {
			$this->loader->add_action('wp_enqueue_scripts', $this->public, 'enqueue_styles');
			$this->loader->add_action('wp_enqueue_scripts', $this->public, 'enqueue_scripts');
		}
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
	 * @return    Plugin_Starter_Loader    Orchestrates the hooks of the plugin.
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
