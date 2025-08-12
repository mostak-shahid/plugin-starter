<?php
class Plugin_Starter_Import_Export
{
	protected $options;

	public function __construct()
	{
		$this->options = plugin_starter_get_option();
		add_action('rest_api_init', [$this, 'register_rest_routes']);
	}
	public function register_rest_routes()
	{
		register_rest_route('plugin-starter/v1', '/settings', [
			'methods' => 'POST',
			'callback' => function ($request) {
				$data = $request->get_json_params();
				update_option('plugin_starter_options', $data);
				return rest_ensure_response(['success' => true]);
			},
			'permission_callback' => '__return_true',
			// 'permission_callback' => function () {
			// 	return current_user_can('manage_options');
			// },
		]);
	}
}

new Plugin_Starter_Import_Export();
