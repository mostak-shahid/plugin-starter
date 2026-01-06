<?php
/**
 * Settings REST API Controller.
 */

namespace PluginStarter\Api;

use WP_REST_Controller;
use WP_REST_Server;
use WP_Error;
use WP_REST_Request;
use WP_REST_Response;
use PluginStarter\Settings\SettingsManager;
use PluginStarter\Logging\Logger;

class SettingsController extends WP_REST_Controller {
    
    /**
     * Settings Manager instance.
     *
     * @var SettingsManager
     */
    private $settings_manager;

    /**
     * Logger instance.
     *
     * @var Logger
     */
    private $logger;

    /**
     * Constructor.
     *
     * @param SettingsManager $settings_manager Settings Manager instance.
     */
    public function __construct(SettingsManager $settings_manager) {
        $this->namespace = PLUGIN_STARTER_API_NAMESPACE;
        $this->rest_base = 'settings';
        $this->settings_manager = $settings_manager;
        $this->logger = new Logger();
    }

    /**
     * Register routes.
     */
    public function register_routes() {
        // Get settings.
        register_rest_route($this->namespace, '/' . $this->rest_base, [
            [
                'methods' => WP_REST_Server::READABLE,
                'callback' => [$this, 'get_settings'],
                'permission_callback' => [$this, 'get_permissions_check'],
            ],
        ]);

        // Save settings.
        register_rest_route($this->namespace, '/' . $this->rest_base, [
            [
                'methods' => WP_REST_Server::CREATABLE,
                'callback' => [$this, 'save_settings'],
                'permission_callback' => [$this, 'update_permissions_check'],
                'args' => $this->get_save_params(),
            ],
        ]);

        // Reset section.
        register_rest_route($this->namespace, '/' . $this->rest_base . '/reset/(?P<section>[\w-]+)', [
            [
                'methods' => WP_REST_Server::CREATABLE,
                'callback' => [$this, 'reset_section'],
                'permission_callback' => [$this, 'update_permissions_check'],
                'args' => [
                    'section' => [
                        'required' => true,
                        'type' => 'string',
                        'sanitize_callback' => 'sanitize_text_field',
                    ],
                ],
            ],
        ]);

        // Reset all settings.
        register_rest_route($this->namespace, '/' . $this->rest_base . '/reset-all', [
            [
                'methods' => WP_REST_Server::CREATABLE,
                'callback' => [$this, 'reset_all'],
                'permission_callback' => [$this, 'update_permissions_check'],
            ],
        ]);
    }

    /**
     * Get settings.
     *
     * @param WP_REST_Request $request Request object.
     * @return WP_REST_Response|WP_Error
     */
    public function get_settings($request) {
        $settings = $this->settings_manager->get_settings();

        return new WP_REST_Response([
            'success' => true,
            'data' => $settings,
        ], 200);
    }

    /**
     * Save settings.
     *
     * @param WP_REST_Request $request Request object.
     * @return WP_REST_Response|WP_Error
     */
    public function save_settings($request) {
        $settings = $request->get_json_params();

        $result = $this->settings_manager->save_settings($settings);

        if ($result) {
            $this->logger->success('Settings saved successfully');

            return new WP_REST_Response([
                'success' => true,
                'message' => __('Settings saved successfully.', 'plugin-starter'),
                'data' => $this->settings_manager->get_settings(),
            ], 200);
        }

        $this->logger->error('Failed to save settings');

        return new WP_Error(
            'save_failed',
            __('Failed to save settings.', 'plugin-starter'),
            ['status' => 500]
        );
    }

    /**
     * Reset section.
     *
     * @param WP_REST_Request $request Request object.
     * @return WP_REST_Response|WP_Error
     */
    public function reset_section($request) {
        $section = $request->get_param('section');

        $result = $this->settings_manager->reset_section($section);

        if ($result) {
            $this->logger->info("Section '{$section}' reset to defaults");

            return new WP_REST_Response([
                'success' => true,
                'message' => sprintf(__('Section %s reset successfully.', 'plugin-starter'), $section),
                'data' => $this->settings_manager->get_settings(),
            ], 200);
        }

        $this->logger->error("Failed to reset section '{$section}'");

        return new WP_Error(
            'reset_failed',
            __('Failed to reset section.', 'plugin-starter'),
            ['status' => 500]
        );
    }

    /**
     * Reset all settings.
     *
     * @param WP_REST_Request $request Request object.
     * @return WP_REST_Response|WP_Error
     */
    public function reset_all($request) {
        $result = $this->settings_manager->reset_all();

        if ($result) {
            $this->logger->warning('All settings reset to defaults');

            return new WP_REST_Response([
                'success' => true,
                'message' => __('All settings reset successfully.', 'plugin-starter'),
                'data' => $this->settings_manager->get_settings(),
            ], 200);
        }

        $this->logger->error('Failed to reset all settings');

        return new WP_Error(
            'reset_failed',
            __('Failed to reset all settings.', 'plugin-starter'),
            ['status' => 500]
        );
    }

    /**
     * Get save parameters.
     *
     * @return array
     */
    private function get_save_params() {
        return [
            'settings' => [
                'required' => false,
                'type' => 'object',
            ],
        ];
    }

    /**
     * Check read permissions.
     *
     * @return bool
     */
    public function get_permissions_check() {
        return current_user_can('manage_options');
    }

    /**
     * Check update permissions.
     *
     * @return bool
     */
    public function update_permissions_check() {
        return current_user_can('manage_options');
    }
}