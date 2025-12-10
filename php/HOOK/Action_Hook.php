<?php
namespace MosPress\PluginStarter\HOOK;
if ( ! defined( 'ABSPATH' ) ) exit;
class Action_Hook
{
	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;
    private static $instance = null;
    public static function get_instance()
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    public function __construct()
	{
        $this->plugin_name = 'plugin-starter';
        add_action('admin_init', [$this, 'plugin_starter_do_activation_redirect']);
        add_action('admin_menu', [$this, 'plugin_starter_admin_menu']);
        add_action('current_screen', [$this, 'plugin_starter_hide_admin_notices']);
        add_action('admin_head', [$this, 'plugin_starter_option_form_submit']);
        add_action('upgrader_process_complete', [$this, 'plugin_starter_update_completed'], 10, 2);
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
			PLUGIN_STARTER_URL . 'admin/images/menu-icon.svg',
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
		include_once(PLUGIN_STARTER_PATH . 'admin/partials/' . $this->plugin_name . '-admin-display.php');
	}
	public function plugin_starter_dashboard_react_page_html()
	{
		if (!current_user_can('manage_options')) {
			return;
		}
		include_once(PLUGIN_STARTER_PATH . 'admin/partials/' . $this->plugin_name . '-admin-display-react.php');
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
