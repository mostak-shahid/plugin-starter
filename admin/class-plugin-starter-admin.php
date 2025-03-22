<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://www.mdmostakshahid.com/
 * @since      1.0.0
 *
 * @package    Plugin_Starter
 * @subpackage Plugin_Starter/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Plugin_Starter
 * @subpackage Plugin_Starter/admin
 * @author     Md. Mostak Shahid <mostak.shahid@gmail.com>
 */
class Plugin_Starter_Admin
{

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct($plugin_name, $version)
	{

		$this->plugin_name = $plugin_name;
		$this->version = $version;
	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles()
	{

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Plugin_Starter_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Plugin_Starter_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */
		wp_enqueue_style($this->plugin_name, PLUGIN_STARTER_URL . 'assets/css/style.css', array(), $this->version, 'all');
		wp_enqueue_style($this->plugin_name . '-admin', PLUGIN_STARTER_URL . 'admin/css/admin-style.css', array(), $this->version, 'all');
		// wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . 'css/plugin-starter-admin.css', array(), $this->version, 'all');			
		// wp_enqueue_style( $this->plugin_name, plugin_dir_url(__DIR__) . 'admin/css/plugin-starter-admin.css', array(), $this->version, 'all' );

		
	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts()
	{

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Plugin_Starter_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Plugin_Starter_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */
		wp_enqueue_script($this->plugin_name, PLUGIN_STARTER_URL . 'assets/js/script.js', array('jquery'), $this->version, false);
		wp_enqueue_script($this->plugin_name . '-admin-ajax', plugin_dir_url(__FILE__) . 'js/admin-ajax.js', array('jquery'), $this->version, false);
		wp_enqueue_script($this->plugin_name . '-admin-script', plugin_dir_url(__FILE__) . 'js/admin-script.js', array('jquery'), $this->version, false);
		$ajax_params = array(
			'admin_url' => admin_url(),
			'ajax_url' => admin_url('admin-ajax.php'),
			'_admin_nonce' => esc_attr(wp_create_nonce('plugin_starter_admin_nonce')),
			// 'install_plugin_wpnonce' => esc_attr(wp_create_nonce('updates')),
		);
		wp_localize_script($this->plugin_name . '-admin-ajax', 'plugin_starter_ajax_obj', $ajax_params);
	}


	/**
	 * Adding menu to admin menu.
	 *
	 * @since    1.0.0
	 */
	public function plugin_starter_admin_menu()
	{
		add_menu_page(
			esc_html(PLUGIN_STARTER_NAME),
			esc_html(PLUGIN_STARTER_NAME),
			'manage_options',
			$this->plugin_name,
			array($this, 'plugin_starter_dashboard_page_html'),
			plugin_dir_url(__DIR__) . 'admin/images/menu-icon.svg',
			57
		);
		/*add_submenu_page(
			$this->plugin_name,
			esc_html__('Sub', 'ultimate-security-for-woocommerce'),
			esc_html__('Sub', 'ultimate-security-for-woocommerce'),
			'manage_options',
			$this->plugin_name . '-sub',
			array($this, 'plugin_starter_dashboard_page_html')
		);
		$tabs = plugin_starter_get_tabs();
		if (sizeof($tabs)) {
			foreach ($tabs as $key => $tab) {
				if (isset($tab['sub']) && $tab['sub']) {
					foreach ($tab['sub'] as $k => $subtab) {
						add_submenu_page(
							$this->plugin_name . '-sub',
							// 'admin.php?page=wc-settings',
							esc_html($subtab['name']),
							esc_html($subtab['name']),
							'manage_options',
							$subtab['url'],
							array($this, 'plugin_starter_dashboard_page_html')
						);
					}
				} else {
					add_submenu_page(
						$this->plugin_name . '-sub',
						// 'admin.php?page=wc-settings',
						esc_html($tab['name']),
						esc_html($tab['name']),
						'manage_options',
						$tab['url'],
						array($this, 'plugin_starter_dashboard_page_html')
					);
				}
			}
		}
		remove_submenu_page($this->plugin_name, $this->plugin_name . '-sub');*/
	}
	/**
	 * Loading plugin Welcome page.
	 *
	 * @since    1.0.0
	 */
	public function plugin_starter_dashboard_page_html()
	{
		if (!current_user_can('manage_options')) {
			return;
		}
		include_once('partials/' . $this->plugin_name . '-admin-display.php');
	}

	/**
	 * Add settings action link to the plugins page.
	 *
	 * @since    1.0.0
	 */
	public function plugin_starter_add_action_links($links)
	{

		/**
		 * Documentation : https://codex.wordpress.org/Plugin_API/Filter_Reference/plugin_action_links_(plugin_file_name)
		 * The "plugins.php" must match with the previously added add_submenu_page first option.
		 * For custom post type you have to change 'plugins.php?page=' to 'edit.php?post_type=your_custom_post_type&page='
		 * 
		 */
		$settings_link = array(
			'<a href="' . admin_url('admin.php?page=' . $this->plugin_name) . '">' . esc_html__('Settings', 'plugin-starter') . '</a>',
			// '<a href="' . admin_url('admin.php?page=' . $this->plugin_name . '-settings') . '">' . esc_html__('Settings', 'plugin-starter') . '</a>'
		);
		return array_merge($settings_link, $links);
	}

	/**
	 * Add body classes to the settings pages.
	 *
	 * @since    1.0.0
	 */
	public function plugin_starter_admin_body_class($classes)
	{

		$current_screen = get_current_screen();
		// var_dump($current_screen->id);
		if (plugin_starter_is_plugin_page()) {
			$classes .= ' ' . $this->plugin_name . '-settings-template ';
		}
		return $classes;
	}

	/**
	 * Redirect to the welcome pages.
	 *
	 * @since    1.0.0
	 */
	public function plugin_starter_do_activation_redirect()
	{
		if (get_option('plugin_starter_do_activation_redirect')) {
			delete_option('plugin_starter_do_activation_redirect');
			wp_safe_redirect(admin_url('admin.php?page=' . $this->plugin_name));
		}
	}

	/**
	 * Removing all notieces from settings page.
	 *
	 * @since    1.0.0
	 */
	public function plugin_starter_hide_admin_notices()
	{
		// $current_screen = get_current_screen();
		// var_dump($current_screen->id);
		if (plugin_starter_is_plugin_page()) {
			remove_all_actions('user_admin_notices');
			remove_all_actions('admin_notices');
		}
	}
	public function plugin_starter_option_form_submit()
	{
		$plugin_starter_options = array_replace_recursive(plugin_starter_get_option(), get_option('plugin_starter_options', []));
		if (isset($_POST['options_form_field']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['options_form_field'])), 'options_form_action')) {

			$err = 0;

			$plugin_starter_options["base-input"]["text-input"] = isset($_POST["plugin_starter_options"]["base-input"]["text-input"]) ? sanitize_text_field(wp_unslash($_POST["plugin_starter_options"]["base-input"]["text-input"])) : '';

			$plugin_starter_options["base-input"]["email-input"] = isset($_POST["plugin_starter_options"]["base-input"]["email-input"]) ? sanitize_email(wp_unslash($_POST["plugin_starter_options"]["base-input"]["email-input"])) : '';

			$plugin_starter_options["base-input"]["color-input"] = isset($_POST["plugin_starter_options"]["base-input"]["color-input"]) ? sanitize_hex_color(wp_unslash($_POST["plugin_starter_options"]["base-input"]["color-input"])) : '';

			$plugin_starter_options["base-input"]["date-input"] = isset($_POST["plugin_starter_options"]["base-input"]["date-input"]) ? sanitize_text_field(wp_unslash($_POST["plugin_starter_options"]["base-input"]["date-input"])) : '';

			$plugin_starter_options["base-input"]["datetime-local-input"] = isset($_POST["plugin_starter_options"]["base-input"]["datetime-local-input"]) ? sanitize_text_field(wp_unslash($_POST["plugin_starter_options"]["base-input"]["datetime-local-input"])) : '';

			$plugin_starter_options["base-input"]["textarea-input"] = isset($_POST["plugin_starter_options"]["base-input"]["textarea-input"]) ? sanitize_textarea_field(wp_unslash($_POST["plugin_starter_options"]["base-input"]["textarea-input"])) : '';

			$plugin_starter_options["base-input"]["switch-input"] = isset($_POST["plugin_starter_options"]["base-input"]["switch-input"]) ? sanitize_text_field(wp_unslash($_POST["plugin_starter_options"]["base-input"]["switch-input"])) : '';

			$plugin_starter_options["base-input"]["radio-input"] = isset($_POST["plugin_starter_options"]["base-input"]["radio-input"]) ? sanitize_text_field(wp_unslash($_POST["plugin_starter_options"]["base-input"]["radio-input"])) : '';

			$plugin_starter_options["base-input"]["datalist-input"] = isset($_POST["plugin_starter_options"]["base-input"]["datalist-input"]) ? sanitize_text_field(wp_unslash($_POST["plugin_starter_options"]["base-input"]["datalist-input"])) : '';

			$plugin_starter_options["base-input"]["select-input"] = isset($_POST["plugin_starter_options"]["base-input"]["select-input"]) ? sanitize_text_field(wp_unslash($_POST["plugin_starter_options"]["base-input"]["select-input"])) : '';

			$plugin_starter_options["editor-input"] = isset($_POST["plugin_starter_options"]["editor-input"]) ? wp_kses_post(wp_unslash($_POST["plugin_starter_options"]["editor-input"])) : '';

			$plugin_starter_options["array-input"]["checkbox-input"] = isset($_POST["plugin_starter_options"]["array-input"]["checkbox-input"]) ? array_map('sanitize_text_field', wp_unslash($_POST["plugin_starter_options"]["array-input"]["checkbox-input"])) : [];

			$plugin_starter_options["array-input"]["multi-select-input"] = isset($_POST["plugin_starter_options"]["array-input"]["multi-select-input"]) ? array_map('sanitize_text_field', wp_unslash($_POST["plugin_starter_options"]["array-input"]["multi-select-input"])) : [];

			if (!$err) {
				$_POST['settings-updated'] = true;
			}

			var_dump($_POST);
		}
		update_option('plugin_starter_options', $plugin_starter_options);
	}
	// add_action('admin_head', 'plugin_starter_option_form_submit');

	public function plugin_starter_reset_settings()
	{
		if (isset($_POST['_admin_nonce']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['_admin_nonce'])), 'plugin_starter_admin_nonce')) {
			// wp_send_json_success(array('variation_id' => $variation_id, 'price' => $price));
			wp_send_json_success();
		} else {
			wp_send_json_error(array('error_message' => esc_html__('Nonce verification failed. Please try again.', 'plugin-starter')));
			// wp_die(esc_html__('Nonce verification failed. Please try again.', 'plugin-starter'));
		}
		wp_die();
	}
	function plugin_starter_update_completed($upgrader_object, $options)
	{

		// If an update has taken place and the updated type is plugins and the plugins element exists
		if ($options['action'] == 'update' && $options['type'] == 'plugin' && isset($options['plugins'])) {
			foreach ($options['plugins'] as $plugin) {
				// Check to ensure it's my plugin
				if ($plugin == plugin_basename(__FILE__)) {
					// do stuff here
					$plugin_starter_options = array_replace_recursive(plugin_starter_get_option(), get_option('plugin_starter_options', []));
					update_option('plugin_starter_options', $plugin_starter_options);
				}
			}
		}
	}
}
