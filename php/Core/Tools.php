<?php

namespace MosPress\PluginStarter\Core;
if ( ! defined( 'ABSPATH' ) ) exit;
use MosPress\PluginStarter\API\Ajax_API;
use MosPress\PluginStarter\Hook\Filter_Hook;
use MosPress\PluginStarter\Hook\Action_Hook;
use MosPress\PluginStarter\Core\Deactivator;
class Tools
{
    protected $options;

	public function __construct()
	{
		$this->options = plugin_starter_get_option();
        if (isset($this->options['tools']['hide_plugin']) && $this->options['tools']['hide_plugin'] == 1) {
            // Hide plugin from plugins list
            add_filter('all_plugins', 'hide_plugin_from_list');
        }
        if (isset($this->options['tools']['self_defense']) && $this->options['tools']['self_defense'] == 1) {
            add_action('admin_footer', [Action_Hook::class, 'plugin_starter_deactivation_scripts']);
            // AJAX handler to verify password
            add_action('wp_ajax_verify_user_password', [Ajax_API::class, 'verify_user_password_ajax']);
        }

        // if (isset($this->options['tools']['delete_data_on']) && $this->options['tools']['delete_data_on'] == 'deactivate') {
        //     // Cleaning up on Deactive
        // } else if (isset($this->options['tools']['delete_data_on']) && $this->options['tools']['delete_data_on'] == 'delete') {
        //     // Cleaning up on Delete
        // }

        add_action('wp_ajax_plugin_starter_reset_all_settings', [Ajax_API::class, 'plugin_starter_reset_all_settings']);	
        		
        // Handle deactivation via admin-post
        add_action( 'admin_post_plugin_starter_deactivate', array( Ajax_API::class, 'handle_deactivation' ) );
        add_action( 'admin_post_nopriv_plugin_starter_deactivate', array( Ajax_API::class, 'handle_deactivation' ) );

    }
}