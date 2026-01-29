<?php

namespace MosPress\PluginStarter\Core;
if ( ! defined( 'ABSPATH' ) ) exit;
use MosPress\PluginStarter\API\Ajax_API;
use MosPress\PluginStarter\Hook\Filter_Hook;
class Tools
{
    protected $options;

	public function __construct()
	{
		$this->options = plugin_starter_get_option();

        // Hide plugin from plugins list
        add_filter('all_plugins', [Filter_Hook::class, 'hide_plugin_from_list']);

		// AJAX handler to verify password
		add_action('wp_ajax_verify_user_password', [Ajax_API::class, 'verify_user_password_ajax']);
        		
        // Handle deactivation via admin-post
        add_action( 'admin_post_plugin_starter_deactivate', array( Ajax_API::class, 'handle_deactivation' ) );
        add_action( 'admin_post_nopriv_plugin_starter_deactivate', array( Ajax_API::class, 'handle_deactivation' ) );

    }
}