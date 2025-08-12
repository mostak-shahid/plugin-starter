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
		wp_enqueue_style($this->plugin_name . '-google-font', 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap', array(), $this->version, 'all');
		wp_enqueue_style($this->plugin_name . 'hint.min', PLUGIN_STARTER_URL . 'assets/plugins/cool-hint-css/src/hint.min.css', array(), $this->version, 'all');
		wp_enqueue_style($this->plugin_name . 'jquery-ui', PLUGIN_STARTER_URL . 'assets/css/jquery-ui.css', array(), $this->version, 'all');
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

		wp_enqueue_script('jquery-ui-tabs');
		wp_enqueue_media();
		$current_screen = get_current_screen();
		if ($current_screen->id == 'toplevel_page_plugin-starter') {
			wp_enqueue_script(
				$this->plugin_name . '-react',
				PLUGIN_STARTER_URL . 'build/index.js',
				array('wp-element', 'wp-components', 'wp-api-fetch', 'wp-i18n', 'wp-media-utils', 'wp-block-editor', 'react', 'react-dom'),
				$this->version,
				true
			);
		}

		wp_enqueue_script($this->plugin_name . '-admin-ajax', plugin_dir_url(__FILE__) . 'js/admin-ajax.js', array('jquery'), $this->version, false);
		wp_enqueue_script($this->plugin_name . '-admin-script', plugin_dir_url(__FILE__) . 'js/admin-script.js', array('jquery', 'jquery-ui-tabs'), $this->version, false);
		$ajax_params = array(
			'admin_url' => admin_url(),
			'ajax_url' => admin_url('admin-ajax.php'),
			'image_url' => PLUGIN_STARTER_URL . 'assets/images/',
			'_admin_nonce' => esc_attr(wp_create_nonce('plugin_starter_admin_nonce')),
			'api_nonce' => esc_attr(wp_create_nonce('wp_rest')),
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
			array($this, 'plugin_starter_dashboard_react_page_html'),
			plugin_dir_url(__DIR__) . 'admin/images/menu-icon.svg',
			57
		);
	}
	/**
	 * Loading plugin Welcome page.
	 *
	 * @since    1.0.0
	 */
	public function plugin_starter_dashboard_php_page_html()
	{
		if (!current_user_can('manage_options')) {
			return;
		}
		include_once('partials/' . $this->plugin_name . '-admin-display.php');
	}
	public function plugin_starter_dashboard_react_page_html()
	{
		if (!current_user_can('manage_options')) {
			return;
		}
		include_once('partials/' . $this->plugin_name . '-admin-display-react.php');
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
		if (isset($_POST['plugin_starter_options_form_field']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['plugin_starter_options_form_field'])), 'plugin_starter_options_form_action')) {

			$err = 0;
			if (isset($_POST["plugin_starter_options"]["base_input"]["submit"])) {

				$plugin_starter_options["base_input"]["text_input"] = isset($_POST["plugin_starter_options"]["base_input"]["text_input"]) ? sanitize_text_field(wp_unslash($_POST["plugin_starter_options"]["base_input"]["text_input"])) : '';

				$plugin_starter_options["base_input"]["email_input"] = isset($_POST["plugin_starter_options"]["base_input"]["email_input"]) ? sanitize_email(wp_unslash($_POST["plugin_starter_options"]["base_input"]["email_input"])) : '';

				$plugin_starter_options["base_input"]["color_input"] = isset($_POST["plugin_starter_options"]["base_input"]["color_input"]) ? sanitize_hex_color(wp_unslash($_POST["plugin_starter_options"]["base_input"]["color_input"])) : '';

				$plugin_starter_options["base_input"]["date_input"] = isset($_POST["plugin_starter_options"]["base_input"]["date_input"]) ? sanitize_text_field(wp_unslash($_POST["plugin_starter_options"]["base_input"]["date_input"])) : '';

				$plugin_starter_options["base_input"]["datetime_local_input"] = isset($_POST["plugin_starter_options"]["base_input"]["datetime_local_input"]) ? sanitize_text_field(wp_unslash($_POST["plugin_starter_options"]["base_input"]["datetime_local_input"])) : '';

				$plugin_starter_options["base_input"]["textarea_input"] = isset($_POST["plugin_starter_options"]["base_input"]["textarea_input"]) ? sanitize_textarea_field(wp_unslash($_POST["plugin_starter_options"]["base_input"]["textarea_input"])) : '';

				$plugin_starter_options["base_input"]["switch_input"] = isset($_POST["plugin_starter_options"]["base_input"]["switch_input"]) ? sanitize_text_field(wp_unslash($_POST["plugin_starter_options"]["base_input"]["switch_input"])) : '';

				$plugin_starter_options["base_input"]["radio_input"] = isset($_POST["plugin_starter_options"]["base_input"]["radio_input"]) ? sanitize_text_field(wp_unslash($_POST["plugin_starter_options"]["base_input"]["radio_input"])) : '';

				$plugin_starter_options["base_input"]["datalist_input"] = isset($_POST["plugin_starter_options"]["base_input"]["datalist_input"]) ? sanitize_text_field(wp_unslash($_POST["plugin_starter_options"]["base_input"]["datalist_input"])) : '';

				$plugin_starter_options["base_input"]["select_input"] = isset($_POST["plugin_starter_options"]["base_input"]["select_input"]) ? sanitize_text_field(wp_unslash($_POST["plugin_starter_options"]["base_input"]["select_input"])) : '';
			}
			if (isset($_POST["plugin_starter_options"]["array_input"]["submit"])) {

				$plugin_starter_options["array_input"]["checkbox_input"] = isset($_POST["plugin_starter_options"]["array_input"]["checkbox_input"]) ? array_map('sanitize_text_field', wp_unslash($_POST["plugin_starter_options"]["array_input"]["checkbox_input"])) : [];

				$plugin_starter_options["array_input"]["multi-select_input"] = isset($_POST["plugin_starter_options"]["array_input"]["multi-select_input"]) ? array_map('sanitize_text_field', wp_unslash($_POST["plugin_starter_options"]["array_input"]["multi-select_input"])) : [];
			}
			$plugin_starter_options["editor_input"] = isset($_POST["plugin_starter_options"]["editor_input"]) ? wp_kses_post(wp_unslash($_POST["plugin_starter_options"]["editor_input"])) : '';

			if (!$err) {
				$_POST['settings-updated'] = true;
			}

			// var_dump($_POST);
		}
		update_option('plugin_starter_options', $plugin_starter_options);
	}
	// add_action('admin_head', 'plugin_starter_option_form_submit');
	private function reset_option_by_path(&$options, $defaults, $path)
	{
		$keys = explode('.', $path);
		$target = &$options;
		$default = $defaults;

		foreach ($keys as $key) {
			if (!isset($target[$key]) || !isset($default[$key])) {
				return false; // path not found
			}
			$target = &$target[$key];
			$default = $default[$key];
		}

		// Set the value at the final nested level
		$target = $default;
		return true;
	}

	public function plugin_starter_reset_settings()
	{
		// wp_send_json_success($_POST['_admin_nonce']);
		if (isset($_POST['_admin_nonce']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['_admin_nonce'])), 'plugin_starter_admin_nonce')) {
			$name = isset($_POST['name'])?sanitize_text_field(wp_unslash($_POST['name'])):'';
			$plugin_starter_options = plugin_starter_get_option();
			$plugin_starter_default_options = plugin_starter_get_default_options();

			$success = $this->reset_option_by_path($plugin_starter_options, $plugin_starter_default_options, $name);

			if ($success) {
				update_option('plugin_starter_options', $plugin_starter_options);
				wp_send_json_success(['message' => __('Settings reset successfully.', 'plugin-starter')]);
			} else {
				wp_send_json_error(['error_message' => __('Invalid settings path.', 'plugin-starter')]);
			}
		} else {
			wp_send_json_error(array('error_message' => esc_html__('Nonce verification failed. Please try again.', 'plugin-starter')));
			// wp_die(esc_html__('Nonce verification failed. Please try again.', 'plugin-starter'));
		}
		wp_die();
	}
	public function plugin_starter_reset_all_settings()
	{
		if (isset($_POST['_admin_nonce']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['_admin_nonce'])), 'plugin_starter_admin_nonce')) {
			// wp_send_json_success(array('variation_id' => $variation_id, 'price' => $price));
			$plugin_starter_default_options = plugin_starter_get_default_options();
			update_option('plugin_starter_options', $plugin_starter_default_options);
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

	// add_action('admin_init', 'plugin_starter_product_category_data');
	/*
	* Add custom routes to the Rest API
	*
	* @since    1.0.8
	*/
	//add_action('rest_api_init', 'plugin_starter_rest_api_init');
	public function plugin_starter_rest_api_init()
	{
		register_rest_route(
			'plugin-starter/v1',
			'/options',
			array(
				'methods'  => 'GET',
				'callback' => [$this, 'rest_plugin_starter_get_options'],
				// 'permission_callback' => '__return_true', // Allow public access
				'permission_callback' => function () {
                    return current_user_can('manage_options');
                },
			)
		);

		//Add the POST 'plugin-starter/v1/options' endpoint to the Rest API
		register_rest_route(
			'plugin-starter/v1',
			'/options',
			array(
				'methods'             => 'POST',
				'callback'            => [$this, 'rest_plugin_starter_update_options'],
				// 'permission_callback' => '__return_true'
				'permission_callback' => function () {
                    return current_user_can('manage_options');
                },
			)
		);
		register_rest_route(
            'plugin-starter/v1',
            '/feedback',
            array(
                'methods' => 'POST',
                'callback' => [$this, 'rest_plugin_starter_feedback'],
				// 'permission_callback' => '__return_true'
                'permission_callback' => function () {
                    return current_user_can('manage_options');
                },
            )
        );
	}
	public function rest_plugin_starter_get_options(WP_REST_Request $request)
	{
		// if (!current_user_can('manage_options')) {
		// 	return new WP_Error(
		// 		'rest_update_error',
		// 		'Sorry, you are not allowed to update the DAEXT UI Test options.',
		// 		array('status' => 403)
		// 	);
		// }
		$plugin_starter_options = plugin_starter_get_option();
		return new WP_REST_Response($plugin_starter_options, 200);
	}
	public function rest_plugin_starter_update_options(WP_REST_Request $request) //WP_REST_Request $request
	{
		if (!current_user_can('manage_options')) {
			return new WP_Error(
				'rest_update_error',
				'Sorry, you are not allowed to update options.'.get_current_user_id(),
				array('status' => 403)
			);
		}
		$plugin_starter_options_old = plugin_starter_get_option();

		$plugin_starter_options = map_deep(wp_unslash($request->get_param('plugin_starter_options')), 'wp_kses_post');

		$plugin_starter_options ? update_option('plugin_starter_options', $plugin_starter_options) : '';
		$response = [
			'success' => true,
			'msg'	=> esc_html__('Data successfully added.', 'plugin-starter')
		];

		// return $response;
		return new WP_REST_Response($response, 200);

		/*
		
		return new WP_REST_Response([
			'success' => true,
			'message' => 'Plugin installed successfully.'
		], 200);
		

		return new WP_REST_Response([
			'success' => false,
			'message' => 'Installed plugin could not be identified'
		], 404);
		*/
	}
	
    public static function rest_plugin_starter_feedback($request)
    {
        $subject = sanitize_text_field(wp_unslash($request->get_param('subject')));
        $message = sanitize_textarea_field(wp_unslash($request->get_param('message')));

        if (empty($message)) {
            return new WP_Error('empty_message', __('Message cannot be empty.', 'plugin-starter'), array('status' => 400));
        }

        if (empty($subject)) {
            return new WP_Error('empty_subject', __('Subject cannot be empty.', 'plugin-starter'), array('status' => 400));
        }

        $email = 'mostak.shahid@gmail.com';
        // $subject = sprintf(
        //     /* translators: %s = site URL */
        //     esc_html__('Error notification for %s', 'plugin-starter'),
        //     get_home_url()
        // );
        $output = '<strong>Subject:</strong> ' . $subject . '<br/><strong>Message:</strong> ' . $message;
        $headers = array(
            'From: ' . get_bloginfo('name') . ' <' . get_option('admin_email') . '>',
            'Content-Type: text/html; charset=UTF-8'
        );

        wp_mail($email, 'Feedback from Plugin Starter', $output, $headers);
        $response = [
            'success' => true,
            'msg' => esc_html__('Email Send successfully.', 'plugin-starter'),
            'subject' => $subject,
            'message' => $message
        ];
        return new WP_REST_Response($response, 200);
    }
	// public function plugin_starter_ajax_install_plugins()
	// {
		

	// 	if (!current_user_can('install_plugins')) {
	// 		wp_send_json_error('Permission denied');
	// 	}
	// 	if (isset($_POST['_admin_nonce']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['_admin_nonce'])), 'plugin_starter_admin_nonce')) {

	// 		// wp_send_json_success('Working');

	// 		$sub_action = isset($_POST['sub_action']) ? sanitize_text_field(wp_unslash($_POST['sub_action'])) : '';
	// 		$plugin_slug = isset($_POST['plugin_slug']) ? sanitize_text_field(wp_unslash($_POST['plugin_slug'])) : '';
	// 		$plugin_file = isset($_POST['plugin_file']) ? sanitize_text_field(wp_unslash($_POST['plugin_file'])) : '';
	// 		$plugin_source = isset($_POST['plugin_source']) ? sanitize_text_field(wp_unslash($_POST['plugin_source'])) : 'internal';


	// 		include_once ABSPATH . 'wp-admin/includes/file.php';
	// 		include_once ABSPATH . 'wp-admin/includes/misc.php';
	// 		include_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';
	// 		include_once ABSPATH . 'wp-admin/includes/plugin.php';

	// 		if ($sub_action === 'install' || $sub_action === 'install_activate') {
	// 			if ($plugin_source == 'external') {
	// 				$download_url = isset($_POST['download_url']) ? sanitize_url(wp_unslash($_POST['download_url'])) : ''; //'https://github.com/mostak-shahid/mos-woocommerce-protected-categories/archive/refs/heads/main.zip';

	// 				// $upgrader = new Plugin_Upgrader();
	// 				// $installed = $upgrader->install($download_url);
	// 				$upgrader = new Plugin_Upgrader(new WP_Ajax_Upgrader_Skin());
	// 				$installed = $upgrader->install($download_url);


	// 				if (is_wp_error($installed)) {
	// 					wp_send_json_error('Install failed: ' . $installed->get_error_message());
	// 				}

	// 				// GitHub plugin zip will likely extract with this kind of name
	// 				$extracted_dir = WP_PLUGIN_DIR . '/' . $plugin_slug;
	// 				if (is_dir($extracted_dir)) {
	// 					rename($extracted_dir, WP_PLUGIN_DIR . '/' . $plugin_slug);
	// 				}
	// 			} else {

	// 				include_once ABSPATH . 'wp-admin/includes/plugin-install.php';

	// 				$api = plugins_api('plugin_information', ['slug' => $plugin_slug, 'fields' => ['sections' => false]]);
	// 				if (is_wp_error($api)) {
	// 					wp_send_json_error(['message' => 'Plugin info fetch failed']);
	// 				}

	// 				// wp_send_json_success($_POST);
	// 				$upgrader = new Plugin_Upgrader(new WP_Ajax_Upgrader_Skin());
	// 				// wp_send_json_success($upgrader);
	// 				$install_result = $upgrader->install($api->download_link);

	// 				if (is_wp_error($install_result)) {
	// 					wp_send_json_error(['message' => 'Install failed: ' . $install_result->get_error_message()]);
	// 				}
	// 			}

	// 			if ($sub_action === 'install') {
	// 				wp_send_json_success('not_active.');
	// 			}
	// 		}

	// 		if ($sub_action === 'install_activate' || $sub_action === 'activate') {
	// 			$result = activate_plugin(WP_PLUGIN_DIR . '/' . $plugin_file);
	// 			if (is_wp_error($result)) {
	// 				wp_send_json_error('Activation failed: ' . $result->get_error_message());
	// 			} else {
	// 				wp_send_json_success('active.');
	// 			}
	// 		}

	// 		wp_send_json_error(array('error_message' => esc_html__('Unknown action.', 'plugin-starter')));
	// 	} else {
	// 		wp_send_json_error(array('error_message' => esc_html__('Nonce verification failed. Please try again.', 'plugin-starter')));
	// 		// wp_die(esc_html__('Nonce verification failed. Please try again.', 'plugin-starter'));
	// 	}
	// 	wp_die();
	// }
	public function plugin_starter_ajax_install_plugins() {
		if ( ! current_user_can( 'install_plugins' ) ) {
			wp_send_json_error( 'Permission denied' );
		}

		if (
			isset( $_POST['_admin_nonce'] ) &&
			wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['_admin_nonce'] ) ), 'plugin_starter_admin_nonce' )
		) {
			$sub_action    = isset( $_POST['sub_action'] ) ? sanitize_text_field( wp_unslash( $_POST['sub_action'] ) ) : '';
			$plugin_slug   = isset( $_POST['plugin_slug'] ) ? sanitize_text_field( wp_unslash( $_POST['plugin_slug'] ) ) : '';
			$plugin_file   = isset( $_POST['plugin_file'] ) ? sanitize_text_field( wp_unslash( $_POST['plugin_file'] ) ) : '';
			$plugin_source = isset( $_POST['plugin_source'] ) ? sanitize_text_field( wp_unslash( $_POST['plugin_source'] ) ) : 'internal';

			include_once ABSPATH . 'wp-admin/includes/file.php';
			include_once ABSPATH . 'wp-admin/includes/misc.php';
			include_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';
			include_once ABSPATH . 'wp-admin/includes/plugin.php';

			if ( $sub_action === 'install' || $sub_action === 'install_activate' ) {

				if ( $plugin_source === 'external' ) {
					$download_url = isset( $_POST['download_url'] ) ? sanitize_url( wp_unslash( $_POST['download_url'] ) ) : '';

					$upgrader = new Plugin_Upgrader( new WP_Ajax_Upgrader_Skin() );
					$installed = $upgrader->install( $download_url );

					if ( is_wp_error( $installed ) ) {
						wp_send_json_error( 'Install failed: ' . $installed->get_error_message() );
					}

					// Initialize WP_Filesystem
					global $wp_filesystem;
					if ( ! $wp_filesystem || ! is_a( $wp_filesystem, 'WP_Filesystem_Base' ) ) {
						WP_Filesystem();
					}

					$extracted_dir = WP_PLUGIN_DIR . '/' . $plugin_slug;
					$destination   = WP_PLUGIN_DIR . '/' . $plugin_slug;

					if ( is_dir( $extracted_dir ) && $extracted_dir !== $destination ) {
						if ( ! $wp_filesystem->move( $extracted_dir, $destination ) ) {
							wp_send_json_error( 'Failed to move plugin directory using WP_Filesystem.' );
						}
					}
				} else {
					include_once ABSPATH . 'wp-admin/includes/plugin-install.php';

					$api = plugins_api( 'plugin_information', [ 'slug' => $plugin_slug, 'fields' => [ 'sections' => false ] ] );
					if ( is_wp_error( $api ) ) {
						wp_send_json_error( [ 'message' => 'Plugin info fetch failed' ] );
					}

					$upgrader       = new Plugin_Upgrader( new WP_Ajax_Upgrader_Skin() );
					$install_result = $upgrader->install( $api->download_link );

					if ( is_wp_error( $install_result ) ) {
						wp_send_json_error( [ 'message' => 'Install failed: ' . $install_result->get_error_message() ] );
					}
				}

				if ( $sub_action === 'install' ) {
					wp_send_json_success( 'not_active.' );
				}
			}

			if ( $sub_action === 'install_activate' || $sub_action === 'activate' ) {
				$result = activate_plugin( WP_PLUGIN_DIR . '/' . $plugin_file );
				if ( is_wp_error( $result ) ) {
					wp_send_json_error( 'Activation failed: ' . $result->get_error_message() );
				} else {
					wp_send_json_success( 'active.' );
				}
			}

			wp_send_json_error( [ 'error_message' => esc_html__( 'Unknown action.', 'plugin-starter' ) ] );
		} else {
			wp_send_json_error( [ 'error_message' => esc_html__( 'Nonce verification failed. Please try again.', 'plugin-starter' ) ] );
		}

		wp_die();
	}



	// 	add_action('wp_ajax_mos_plugin_manage', function () {
	//   check_ajax_referer('mos_plugin_nonce', 'security');
	// });
	public function plugin_starter_ajax_plugins_status()
	{

		if (!current_user_can('install_plugins')) {
			wp_send_json_error(array('error_message' => esc_html__('Permission denied', 'plugin-starter')));
		}
		if (isset($_POST['_admin_nonce']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['_admin_nonce'])), 'plugin_starter_admin_nonce')) {
			// $slug = isset($_POST['slug']) ? sanitize_text_field(wp_unslash($_POST['slug'])) : '';
			$file = isset($_POST['file']) ? sanitize_text_field(wp_unslash($_POST['file'])) : '';
			$status = 'not_installed';
			if (!is_plugin_active($file) && !file_exists(WP_PLUGIN_DIR . '/' . $file)) {
				$status = 'not_installed';
			} elseif (!is_plugin_active($file) && file_exists(WP_PLUGIN_DIR . '/' . $file)) {
				$status = 'installed';
			} elseif (is_plugin_active($file)) {
				$status = 'activated';
			}
			wp_send_json_success(
				array(
					'file' => $file,
					'success_message' => esc_html($status)
				)
			);
		} else {
			wp_send_json_error(array('error_message' => esc_html__('Nonce verification failed. Please try again.', 'plugin-starter')));
			// wp_die(esc_html__('Nonce verification failed. Please try again.', 'plugin-starter'));
		}
		wp_die();
	}
}
