<?php
namespace MosPress\PluginStarter\API;
if ( ! defined( 'ABSPATH' ) ) exit;
use MosPress\PluginStarter\Helpers\Utils;
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
		add_action('init', [$this, 'plugin_starter_maybe_flush_rules'], 99);   
		
    }   
	public function plugin_starter_reset_settings()
	{
		// wp_send_json_success($_POST['_admin_nonce']);
		if (isset($_POST['_admin_nonce']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['_admin_nonce'])), 'plugin_starter_admin_nonce')) {
			$name = isset($_POST['name'])?sanitize_text_field(wp_unslash($_POST['name'])):'';
			$plugin_starter_options = Utils::plugin_starter_get_option();
			$plugin_starter_default_options = Utils::plugin_starter_get_default_options();

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
	public function plugin_starter_maybe_flush_rules() {
		if (get_option('plugin_starter_flush_rewrite', false)) {
			flush_rewrite_rules();
			delete_option('plugin_starter_flush_rewrite');
		}
	}	
}

// new Ajax_API();