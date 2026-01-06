<?php
/**
 * REST Routes Registration.
 */

namespace PluginStarter\Api;

use PluginStarter\Api\SettingsController;
use PluginStarter\Api\FeedbackController;
use PluginStarter\Settings\SettingsManager;

class RestRoutes {
    
    /**
     * Settings Manager instance.
     *
     * @var SettingsManager
     */
    private $settings_manager;

    /**
     * Constructor.
     *
     * @param SettingsManager $settings_manager Settings Manager instance.
     */
    public function __construct(SettingsManager $settings_manager) {
        $this->settings_manager = $settings_manager;
    }

    /**
     * Register REST API routes.
     */
    public function register_routes() {
        $settings_controller = new SettingsController($this->settings_manager);
        $settings_controller->register_routes();

        $feedback_controller = new FeedbackController();
        $feedback_controller->register_routes();
    }
}