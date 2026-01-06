<?php
/**
 * Feedback REST API Controller.
 */

namespace PluginStarter\Api;

use WP_REST_Controller;
use WP_REST_Server;
use WP_Error;
use WP_REST_Request;
use WP_REST_Response;
use PluginStarter\Email\Mailer;
use PluginStarter\Logging\Logger;
use PluginStarter\Utils\Validator;

class FeedbackController extends WP_REST_Controller {
    
    /**
     * Logger instance.
     *
     * @var Logger
     */
    private $logger;

    /**
     * Mailer instance.
     *
     * @var Mailer
     */
    private $mailer;

    /**
     * Constructor.
     */
    public function __construct() {
        $this->namespace = PLUGIN_STARTER_API_NAMESPACE;
        $this->rest_base = 'feedback';
        $this->logger = new Logger();
        $this->mailer = new Mailer();
    }

    /**
     * Register routes.
     */
    public function register_routes() {
        register_rest_route($this->namespace, '/' . $this->rest_base, [
            [
                'methods' => WP_REST_Server::CREATABLE,
                'callback' => [$this, 'submit_feedback'],
                'permission_callback' => [$this, 'get_permissions_check'],
                'args' => $this->get_feedback_params(),
            ],
        ]);
    }

    /**
     * Submit feedback.
     *
     * @param WP_REST_Request $request Request object.
     * @return WP_REST_Response|WP_Error
     */
    public function submit_feedback($request) {
        $name = $request->get_param('name');
        $email = $request->get_param('email');
        $subject = $request->get_param('subject');
        $message = $request->get_param('message');

        // Validate required fields.
        if (empty($name) || empty($email) || empty($subject) || empty($message)) {
            return new WP_Error(
                'missing_fields',
                __('All fields are required.', 'plugin-starter'),
                ['status' => 400]
            );
        }

        // Validate email.
        if (!Validator::validate_email($email)) {
            return new WP_Error(
                'invalid_email',
                __('Invalid email address.', 'plugin-starter'),
                ['status' => 400]
            );
        }

        // Send feedback email.
        $result = $this->mailer->send_feedback($name, $email, $subject, $message);

        if ($result) {
            $this->logger->success("Feedback submitted by {$email}");

            return new WP_REST_Response([
                'success' => true,
                'message' => __('Thank you for your feedback!', 'plugin-starter'),
            ], 200);
        }

        $this->logger->error("Failed to send feedback from {$email}");

        return new WP_Error(
            'send_failed',
            __('Failed to send feedback. Please try again later.', 'plugin-starter'),
            ['status' => 500]
        );
    }

    /**
     * Get feedback parameters.
     *
     * @return array
     */
    private function get_feedback_params() {
        return [
            'name' => [
                'required' => true,
                'type' => 'string',
                'sanitize_callback' => 'sanitize_text_field',
            ],
            'email' => [
                'required' => true,
                'type' => 'string',
                'sanitize_callback' => 'sanitize_email',
            ],
            'subject' => [
                'required' => true,
                'type' => 'string',
                'sanitize_callback' => 'sanitize_text_field',
            ],
            'message' => [
                'required' => true,
                'type' => 'string',
                'sanitize_callback' => 'sanitize_textarea_field',
            ],
        ];
    }

    /**
     * Check permissions.
     *
     * @return bool
     */
    public function get_permissions_check() {
        return current_user_can('manage_options');
    }
}