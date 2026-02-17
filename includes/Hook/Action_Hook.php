<?php
namespace MosPress\PluginStarter\Hook;
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
		// include_once(PLUGIN_STARTER_PATH . 'admin/partials/' . $this->plugin_name . '-admin-display.php');
		echo '<div id="plugin-starter-settings-react-app"></div>';
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
	public function plugin_starter_update_completed($upgrader_object, $options)
	{

		// If an update has taken place and the updated type is plugins and the plugins element exists
		if ($options['action'] == 'update' && $options['type'] == 'plugin' && isset($options['plugins'])) {
			foreach ($options['plugins'] as $plugin) {
				// Check to ensure it's my plugin
				if ($plugin == plugin_basename(PLUGIN_STARTER_MAIN_FILE)) {
					// do stuff here
					$plugin_starter_options = array_replace_recursive(plugin_starter_get_option(), get_option('plugin_starter_options', []));
					update_option('plugin_starter_options', $plugin_starter_options);
				}
			}
		}
	}
	public static function plugin_starter_deactivation_scripts()
	{
		?>
		<!-- Password Modal -->
		<div id="password-modal">
			<div class="modal-content">
				<div class="modal-header">Verify Your Password</div>
				<div class="modal-body">
					<label for="plugin-password">Enter your current password to deactivate this plugin:</label>
					<input type="password" id="plugin-password" class="modal-input" placeholder="Password">
					<div id="password-error" class="modal-error"></div>
				</div>
				<div class="modal-footer">
					<button type="button" id="cancel-deactivation" class="button">Cancel</button>
					<button type="button" id="verify-password" class="button button-primary">Verify & Deactivate</button>
				</div>
			</div>
		</div>
		<script type="text/javascript">
			jQuery(document).ready(function($) {
				var deactivateUrl = '';
				
				// Intercept deactivate link click
				$('tr[data-plugin="plugin-starter/plugin-starter.php"] .deactivate a').on('click', function(e) {
					e.preventDefault();
					deactivateUrl = $(this).attr('href');
					$('#password-modal').show();
					$('#plugin-password').focus();
				});
				
				// Close modal
				$('#cancel-deactivation, #password-modal').on('click', function(e) {
					if (e.target === this) {
						$('#password-modal').hide();
						$('#plugin-password').val('');
						$('#password-error').hide();
					}
				});
				
				// Verify password and deactivate
				$('#verify-password').on('click', function() {
					var password = $('#plugin-password').val();
					
					$.ajax({
						url: ajaxurl,
						type: 'POST',
						data: {
							action: 'verify_user_password',
							password: password,
							nonce: '<?php echo esc_html( wp_create_nonce( 'verify_password_nonce' ) ); ?>'
						},
						success: function(response) {
							if (response.success) {
								// Password correct, proceed with deactivation
								window.location.href = deactivateUrl;
							} else {
								// Password incorrect
								$('#password-error').text(response.data.message).show();
								$('#plugin-password').val('').focus();
							}
						}
					});
				});
				
				// Allow Enter key to submit
				$('#plugin-password').on('keypress', function(e) {
					if (e.which === 13) {
						$('#verify-password').click();
					}
				});
			});
		</script>
		<?php
	}
}
