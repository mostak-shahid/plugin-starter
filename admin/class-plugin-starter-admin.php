<?php
use Automattic\WooCommerce\Admin\BlockTemplates\BlockTemplateInterface;
use Automattic\WooCommerce\Admin\Features\ProductBlockEditor\ProductTemplates\ProductFormTemplateInterface;
use Automattic\WooCommerce\Admin\Features\ProductBlockEditor\BlockRegistry;
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
	public function __construct( $plugin_name, $version) 
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
		
		wp_enqueue_style($this->plugin_name , PLUGIN_STARTER_URL . 'assets/css/style.css', array(), $this->version, 'all');
		$current_screen = get_current_screen();
		// var_dump($current_screen->id);
		// toplevel_page_plugin-starter
		if ($current_screen->id == 'toplevel_page_plugin-starter') {			
			wp_enqueue_style('wp-block-editor', './wp-includes/css/dist/block-editor/style.css', array(), $this->version, 'all');
			wp_enqueue_style($this->plugin_name . '-hint', PLUGIN_STARTER_URL . 'assets/plugins/cool-hint-css/src/hint.css', array(), $this->version, 'all');
			wp_enqueue_style($this->plugin_name . '-admin', PLUGIN_STARTER_URL . 'admin/css/admin-style.css', array(), $this->version, 'all');
			// wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . 'css/plugin-starter-admin.css', array(), $this->version, 'all');			
			// wp_enqueue_style( $this->plugin_name, plugin_dir_url(__DIR__) . 'admin/css/plugin-starter-admin.css', array(), $this->version, 'all' );
		}
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
		wp_enqueue_script($this->plugin_name . '-ajax', PLUGIN_STARTER_URL . 'assets/js/ajax.js', array('jquery'), $this->version, false);

		$current_screen = get_current_screen();
		// var_dump($current_screen->id);
		// toplevel_page_plugin-starter
		if ($current_screen->id == 'toplevel_page_plugin-starter') {
			wp_enqueue_media();
			$plugin_url  = plugin_dir_url(__DIR__);
			wp_enqueue_script(
				'react-plugin-starter',
				$plugin_url . 'build/admin.js',
				array('wp-element', 'wp-components', 'wp-api-fetch', 'wp-i18n', 'wp-media-utils', 'wp-block-editor', 'react', 'react-dom'),
				$this->version,
				true
			);
			wp_enqueue_script($this->plugin_name . '-admin-script', plugin_dir_url(__FILE__) . 'js/admin-script.js', array('jquery'), $this->version, false);
		}
		

		$ajax_params = array(
			'admin_url' => admin_url(),
			'ajax_url' => admin_url('admin-ajax.php'),
			'security' => esc_attr(wp_create_nonce('plugin_starter_security_nonce')),
			'install_plugin_wpnonce' => esc_attr(wp_create_nonce('updates')),
		);
		wp_localize_script($this->plugin_name . '-ajax', 'plugin_starter_ajax_obj', $ajax_params);
	}

	/**
	 * Adding Woocommerce dependency to our plugin.
	 *
	 * @since    1.0.0
	 */
	public function plugin_starter_woo_check()
	{

		if (current_user_can('activate_plugins')) {
			if (!is_plugin_active('woocommerce/woocommerce.php') && !file_exists(WP_PLUGIN_DIR . '/woocommerce/woocommerce.php')) {
?>
				<div id="message" class="error">
					<?php /* translators: %1$s: WooCommerce plugin url start, %2$s: WooCommerce plugin url end */ ?>
					<p>
						<?php printf(
							esc_html__(
								'%1$s requires %2$s WooCommerce %3$s to be activated.',
								'plugin-starter'
							),
							esc_html(PLUGIN_STARTER_NAME),
							'<strong><a href="https://wordpress.org/plugins/woocommerce/" target="_blank">',
							'</a></strong>'
						); ?>
					</p>
					<p><a id="plugin_starter_wooinstall" class="install-now button" data-plugin-slug="woocommerce"><?php esc_html_e('Install Now', 'plugin-starter'); ?></a></p>
				</div>
			<?php
			} elseif (!is_plugin_active('woocommerce/woocommerce.php') && file_exists(WP_PLUGIN_DIR . '/woocommerce/woocommerce.php')) {
			?>

				<div id="message" class="error">
					<?php /* translators: %1$s: WooCommerce plugin url start, %2$s: WooCommerce plugin url end */ ?>
					<p>
						<?php printf(
							esc_html__(
								'%1$s requires %2$s WooCommerce %3$s to be activated.',
								'plugin-starter'
							),
							esc_html(PLUGIN_STARTER_NAME),
							'<strong><a href="https://wordpress.org/plugins/woocommerce/" target="_blank">',
							'</a></strong>'
						); ?>
					</p>
					<p><a href="<?php echo esc_url(get_admin_url()); ?>plugins.php?_wpnonce=<?php echo esc_attr(wp_create_nonce('activate-plugin_woocommerce/woocommerce.php')); ?>&action=activate&plugin=woocommerce/woocommerce.php" class="button activate-now button-primary"><?php esc_html_e('Activate', 'plugin-starter'); ?></a></p>
				</div>
			<?php
			} elseif (version_compare(get_option('woocommerce_db_version'), '2.5', '<')) {
			?>

				<div id="message" class="error">
					<p>
						<?php printf(
							esc_html__(
								'%1$s %2$s is inactive.%3$s This plugin requires WooCommerce 2.5 or newer. Please %4$supdate WooCommerce to version 2.5 or newer%5$s',
								'plugin-starter'
							),
							'<strong>',
							esc_html(PLUGIN_STARTER_NAME),
							'</strong>',
							'<a href="' . esc_url(admin_url('plugins.php')) . '">',
							'&nbsp;&raquo;</a>'
						); ?>
					</p>
				</div>

<?php
			}
		}
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
		// add_submenu_page(
		// 	$this->plugin_name,
		// 	esc_html__('Welcome', 'plugin-starter'),
		// 	esc_html__('Welcome', 'plugin-starter'),
		// 	'manage_options',
		// 	$this->plugin_name,
		// 	array($this, 'plugin_starter_dashboard_page_html')
		// );
		// add_submenu_page(
		// 	$this->plugin_name,
		// 	esc_html__('Settings', 'plugin-starter'),
		// 	esc_html__('Settings', 'plugin-starter'),
		// 	'manage_options',
		// 	$this->plugin_name . '&path=settings',
		// 	array($this, 'plugin_starter_dashboard_page_html')
		// );
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
		// toplevel_page_plugin-starter
		if ($current_screen->id == 'toplevel_page_plugin-starter') {
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
		$current_screen = get_current_screen();
		if ($current_screen->base == 'toplevel_page_plugin-starter') {
			remove_all_actions('user_admin_notices');
			remove_all_actions('admin_notices');
		}
	}

	/*
	* Add custom routes to the Rest API
	*
	* @since    1.0.0
	*/
	public function plugin_starter_rest_api_register_route()
	{

		//Add the GET 'plugin_starter/v1/options' endpoint to the Rest API
		register_rest_route(
			'plugin_starter/v1',
			'/options',
			array(
				'methods'  => 'GET',
				'callback' => [$this, 'rest_api_plugin_starter_read_options_callback'],
				'permission_callback' => '__return_true'
			)
		);

		//Add the POST 'plugin_starter/v1/options' endpoint to the Rest API
		register_rest_route(
			'plugin_starter/v1',
			'/options',
			array(
				'methods'             => 'POST',
				'callback'            => [$this, 'rest_api_plugin_starter_update_options_callback'],
				'permission_callback' => '__return_true'
			)
		);
	}
	/*
	* Callback for the GET 'plugin_starter/v1/options' endpoint of the Rest API
	*/
	public function rest_api_plugin_starter_read_options_callback($data)
	{

		//Check the capability
		if (!current_user_can('manage_options')) {
			return new WP_Error(
				'rest_read_error',
				'Sorry, you are not allowed to view the options.',
				array('status' => 403)
			);
		}

		//Generate the response
		$response = [];
		// $response['plugin_option_1'] = get_option('plugin_option_1');
		// $response['plugin_option_2'] = get_option('plugin_option_2');
		$response['plugin_starter_options'] = get_option('plugin_starter_options', []);


		//Prepare the response
		$response = new WP_REST_Response($response);

		return $response;
	}
	public function rest_api_plugin_starter_update_options_callback($request)
	{

		if (!current_user_can('manage_options')) {
			return new WP_Error(
				'rest_update_error',
				'Sorry, you are not allowed to update the DAEXT UI Test options.',
				array('status' => 403)
			);
		}

		//Get the data and sanitize
		//Note: In a real-world scenario, the sanitization function should be based on the option type.
		// $plugin_option_1 = sanitize_text_field($request->get_param('plugin_option_1'));
		// $plugin_option_2 = sanitize_text_field($request->get_param('plugin_option_2'));
		$plugin_starter_options = $request->get_param('plugin_starter_options');

		//Update the options
		// update_option('plugin_option_1', $plugin_option_1);
		// update_option('plugin_option_2', $plugin_option_2);
		$plugin_starter_options && update_option('plugin_starter_options', $plugin_starter_options);

		$response = new WP_REST_Response('Data successfully added.', '200');

		return $response;
	}
}
