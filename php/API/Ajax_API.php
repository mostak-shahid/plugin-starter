<?php
namespace MosPress\PluginStarter\API;
if ( ! defined( 'ABSPATH' ) ) exit;
use Plugin_Upgrader;
use WP_Ajax_Upgrader_Skin;

class Ajax_API
{
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
        add_action('wp_ajax_plugin_starter_reset_settings', [$this, 'plugin_starter_reset_settings']);		
        add_action('wp_ajax_plugin_starter_reset_all_settings', [$this, 'plugin_starter_reset_all_settings']);		
		add_action('wp_ajax_plugin_starter_ajax_install_plugins', [$this, 'plugin_starter_ajax_install_plugins']);		
		add_action('wp_ajax_plugin_starter_ajax_plugins_status', [$this, 'plugin_starter_ajax_plugins_status']);
		add_action('wp_ajax_plugin_starter_set_login_url', [$this, 'plugin_starter_set_login_url']);
		add_action('wp_ajax_plugin_starter_send_email_login_url', [$this, 'plugin_starter_send_email_login_url']);
		add_action('init', [$this, 'plugin_starter_maybe_flush_rules'], 99);
		
    }
	

    
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

	public function plugin_starter_set_login_url()
	{
		// wp_send_json_success($_POST['_admin_nonce']);
		if (isset($_POST['_admin_nonce']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['_admin_nonce'])), 'plugin_starter_admin_nonce')) {
			$login_url = isset($_POST['login_url'])?sanitize_text_field(wp_unslash($_POST['login_url'])):'';
			$plugin_starter_options = plugin_starter_get_option();
			$plugin_starter_options['hide_login']['login_url'] = $login_url;
            update_option('plugin_starter_options', $plugin_starter_options);
            update_option('plugin_starter_flush_rewrite', true);
            wp_send_json_success(['message' => __('Login URL reset successfully.', 'plugin-starter')]);			
		} else {
			wp_send_json_error(array('error_message' => esc_html__('Nonce verification failed. Please try again.', 'plugin-starter')));
			// wp_die(esc_html__('Nonce verification failed. Please try again.', 'plugin-starter'));
		}
		wp_die();
	}
	public function plugin_starter_send_email_login_url()
	{
		// wp_send_json_success($_POST['_admin_nonce']);
		if (isset($_POST['_admin_nonce']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['_admin_nonce'])), 'plugin_starter_admin_nonce')) {
			$options = plugin_starter_get_option();
			$login_url = (isset($options['hide_login']['login_url']) & !empty($options['hide_login']['login_url']))?sanitize_text_field(wp_unslash($options['hide_login']['login_url'])):home_url('/wp-login.php/');
			$emails = isset($_POST['emails'])?sanitize_text_field(wp_unslash($_POST['emails'])):'';
			if($emails) {
				$emails_arr = explode(',',$emails);
				$subject = 'New Login Link';
				$body = 'Your New Login Link is '. home_url('/'.$login_url.'/');
				$headers = array( 'Content-Type: text/html; charset=UTF-8' );
				wp_mail( $emails_arr, $subject, $body, $headers, array( '' ) );
				wp_send_json_success(['message' => __('Email successfully.', 'plugin-starter')]);			
			}
			wp_send_json_error(array('error_message' => esc_html__('No email address found.', 'plugin-starter')));
		} else {
			wp_send_json_error(array('error_message' => esc_html__('Nonce verification failed. Please try again.', 'plugin-starter')));
			// wp_die(esc_html__('Nonce verification failed. Please try again.', 'plugin-starter'));
		}
		wp_die();
	}
	public function plugin_starter_reset_all_settings()
	{
		// wp_send_json_success($_POST['_admin_nonce']);
		if (isset($_POST['_admin_nonce']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['_admin_nonce'])), 'plugin_starter_admin_nonce')) {
			$name = isset($_POST['name'])?sanitize_text_field(wp_unslash($_POST['name'])):'';
			$plugin_starter_options = plugin_starter_get_option();
			$plugin_starter_default_options = plugin_starter_get_default_options();

			// wp_send_json_success(['name' => $name]);

			$success = update_option('plugin_starter_options', $plugin_starter_default_options);

			if ($success) {
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
	public function plugin_starter_reset_settings()
	{
		// wp_send_json_success($_POST['_admin_nonce']);
		if (isset($_POST['_admin_nonce']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['_admin_nonce'])), 'plugin_starter_admin_nonce')) {
			$name = isset($_POST['name'])?sanitize_text_field(wp_unslash($_POST['name'])):'';
			$plugin_starter_options = plugin_starter_get_option();
			$plugin_starter_default_options = plugin_starter_get_default_options();

			// wp_send_json_success(['name' => $name]);

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
	public function plugin_starter_maybe_flush_rules() {
		if (get_option('plugin_starter_flush_rewrite', false)) {
			flush_rewrite_rules();
			delete_option('plugin_starter_flush_rewrite');
		}
	}	
}

// new Ajax_API();