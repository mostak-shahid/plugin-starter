<?php
namespace MosPress\PluginStarter\API;
if ( ! defined( 'ABSPATH' ) ) exit;
use WP_Error;
use WP_REST_Request;
use WP_REST_Response;
use WP_Query;
use WP_REST_Server;

use MosPress\PluginStarter\Helpers\CryptoHelper;
/**
 * Rest API Router
 *
 * Registers all REST API endpoints and routes them to appropriate controllers
 */
class Rest_API
{
    
    private const NAMESPACE = 'plugin-starter/v1';
    private static $instance = null;
    /**
     * Table name
     *
     * @var string
     */
    private $logs_table_name;
    public static function get_instance()
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    public function __construct()
    {
        global $wpdb;
        $this->logs_table_name = $wpdb->prefix . 'plugin_starter_logs';
        
        add_action('rest_api_init', [$this, 'rest_api_init']);
    }
    public function rest_api_init()
    {        
        register_rest_route(self::NAMESPACE, '/plugins', [
            'methods' => 'GET',
            'callback' => function () {
                $response = wp_remote_get('https://api.wordpress.org/plugins/info/1.2/?action=query_plugins&request[author]=mostakshahid&request[per_page]=24');
                if (is_wp_error($response)) {
                    return new WP_Error('api_error', 'Failed to fetch plugins', ['status' => 500]);
                }
                return json_decode(wp_remote_retrieve_body($response), true);
            },
			'permission_callback' => function () {
				return current_user_can('manage_options');
			},
        ]);
        
        // ✅ Get posts (with embed info)
        // GET /wp-json/plugin-starter/v1/posts?page=1&per_page=10&status=publish&search=hello
        register_rest_route( self::NAMESPACE, '/posts', [
            'methods'  => 'GET',
            'callback' => [$this, 'get_posts'],
            'permission_callback' => function () {
                return current_user_can( 'edit_posts' );
            },
            'args' => [
                'page'     => ['type' => 'integer'],
                'per_page' => ['type' => 'integer'],
                'status'   => ['type' => 'string'],
                'search'   => ['type' => 'string'],
                'orderby'  => ['type' => 'string'], // title|date
                'order'    => ['type' => 'string'], // asc|desc
            ],
        ]);

        // ✅ Change status of a single post
        // POST /wp-json/plugin-starter/v1/post/123/status
        // { "status": "draft" }
        register_rest_route( self::NAMESPACE, '/post/(?P<id>\d+)/status', [
            'methods'  => 'POST',
            'callback' => [$this, 'change_post_status'],
            'permission_callback' => function () {
                return current_user_can( 'edit_posts' );
            },
            'args' => [
                'status' => [
                    'required' => true,
                    'type'     => 'string',
                    'enum'     => [ 'publish', 'draft', 'trash' ],
                ],
            ],
        ]);

        // ✅ Bulk status change
        // POST /wp-json/plugin-starter/v1/posts/status
        // { "ids": [1,2,3], "status": "trash" }

        register_rest_route( self::NAMESPACE, '/posts/status', [
            'methods'  => 'POST',
            'callback' => [$this, 'bulk_change_status'],
            'permission_callback' => function () {
                return current_user_can( 'edit_posts' );
            },
            'args' => [
                'ids' => [
                    'required' => true,
                    'type'     => 'array',
                    'items'    => [ 'type' => 'integer' ],
                ],
                'status' => [
                    'required' => true,
                    'type'     => 'string',
                    'enum'     => [ 'publish', 'draft', 'trash' ],
                ],
            ],
        ]);

        
		register_rest_route(
			self::NAMESPACE,
			'/options',
			array(
				'methods'  => 'GET',
				'callback' => [$this, 'get_settings'],
				// 'permission_callback' => '__return_true', // Allow public access
				'permission_callback' => function () {
                    return current_user_can('manage_options');
                },
			)
		);

		//Add the POST 'plugin-starter/v1/options' endpoint to the Rest API
		register_rest_route(
			self::NAMESPACE,
			'/options',
			array(
				'methods'             => 'POST',
				'callback'            => [$this, 'update_settings'],
				// 'permission_callback' => '__return_true'
				'permission_callback' => function () {
                    return current_user_can('manage_options');
                },
			)
		);

		register_rest_route(
            self::NAMESPACE,
            '/options/reset-settings',
            array(
                'methods' => 'POST',
                'callback' => [$this, 'reset_settings'],
                'permission_callback' => function () {
                    return current_user_can('manage_options');
                },
            )
        );

		register_rest_route(
            self::NAMESPACE,
            '/options/reset-settings-all',
            array(
                'methods' => 'POST',
                'callback' => [$this, 'reset_settings_all'],
                'permission_callback' => function () {
                    return current_user_can('manage_options');
                },
            )
        );
        
		register_rest_route(
            self::NAMESPACE,
            '/options/import-settings', [
                'methods' => 'POST',
                'callback' => function ($request) {
                    $data = $request->get_json_params();
                    update_option('plugin_starter_options', $data);
                    return rest_ensure_response(['success' => true]);
                },
                // 'permission_callback' => '__return_true',
                'permission_callback' => function () {
                    return current_user_can('manage_options');
                },
            ]
        );

		register_rest_route(
            self::NAMESPACE,
            '/feedback',
            array(
                'methods' => 'POST',
                'callback' => [$this, 'rest_feedback'],
				// 'permission_callback' => '__return_true'
                'permission_callback' => function () {
                    return current_user_can('manage_options');
                },
            )
        );

		register_rest_route(
			self::NAMESPACE,
			'/set-settings-theme',
			array(
				'methods'  => 'GET',
				'callback' => [$this, 'rest_set_settings_theme'],
				// 'permission_callback' => '__return_true', // Allow public access
				'permission_callback' => function () {
                    return current_user_can('manage_options');
                },
                'args' => [
                    'id' => [
                        'required' => true,
                        'type'     => 'string',
                        'items'    => [ 'type' => 'integer' ],
                    ],
                    'settings_theme' => [
                        'required' => true,
                        'type'     => 'string',
                        'enum'     => [ 'light', 'dark' ],
                    ],
                ],
			)
		);
        register_rest_route(
			self::NAMESPACE,
			'/get-settings-theme',
			array(
				'methods'  => 'GET',
				'callback' => [$this, 'rest_get_settings_theme'],
				'permission_callback' => '__return_true', // Allow public access
				// 'permission_callback' => function () {
                //     return current_user_can('manage_options');
                // },
			)
		);
        
        register_rest_route(
            self::NAMESPACE,
            '/deactivation-link',
            array(
                'methods' => 'GET',
                'callback' => array( $this, 'get_deactivation_link' ),
                'permission_callback' => array( $this, 'check_permission' ),
            )
        );

        //Log table REST routes
        /**
         * Register REST API routes
         */
        // Get logs with filters
        register_rest_route(
            self::NAMESPACE,
            '/logs',
            array(
                'methods'             => WP_REST_Server::READABLE,
                'callback'            => array( $this, 'get_logs' ),
                'permission_callback' => array( $this, 'check_permission' ),
                'args'                => array(
                    'page'       => array(
                        'default'           => 1,
                        'sanitize_callback' => 'absint',
                    ),
                    'per_page'   => array(
                        'default'           => 10,
                        'sanitize_callback' => 'absint',
                    ),
                    'user_name'  => array(
                        'sanitize_callback' => 'sanitize_text_field',
                    ),
                    'ip'         => array(
                        'sanitize_callback' => 'sanitize_text_field',
                    ),
                    'title'      => array(
                        'sanitize_callback' => 'sanitize_text_field',
                    ),
                    'created_at' => array(
                        'sanitize_callback' => 'sanitize_text_field',
                    ),
                    'orderby'    => array(
                        'default'           => 'ID',
                        'sanitize_callback' => 'sanitize_text_field',
                    ),
                    'order'      => array(
                        'default'           => 'DESC',
                        'sanitize_callback' => 'sanitize_text_field',
                    ),
                ),
            )
        );

        // Search logs
        register_rest_route(
            self::NAMESPACE,
            '/logs/search',
            array(
                'methods'             => WP_REST_Server::READABLE,
                'callback'            => array( $this, 'search_logs' ),
                'permission_callback' => array( $this, 'check_permission' ),
                'args'                => array(
                    'q'        => array(
                        'required'          => true,
                        'sanitize_callback' => 'sanitize_text_field',
                    ),
                    'page'     => array(
                        'default'           => 1,
                        'sanitize_callback' => 'absint',
                    ),
                    'per_page' => array(
                        'default'           => 10,
                        'sanitize_callback' => 'absint',
                    ),
                ),
            )
        );

        // Insert new log
        register_rest_route(
            self::NAMESPACE,
            '/logs',
            array(
                'methods'             => WP_REST_Server::CREATABLE,
                'callback'            => array( $this, 'create_log' ),
                'permission_callback' => array( $this, 'check_permission' ),
                'args'                => array(
                    'user_id'     => array(
                        'required'          => true,
                        'sanitize_callback' => 'absint',
                    ),
                    'ip'          => array(
                        'required'          => true,
                        'sanitize_callback' => 'sanitize_text_field',
                    ),
                    'user_agent'  => array(
                        'required'          => true,
                        'sanitize_callback' => 'sanitize_text_field',
                    ),
                    'title'       => array(
                        'required'          => true,
                        'sanitize_callback' => 'sanitize_text_field',
                    ),
                    'description' => array(
                        'required'          => true,
                        'sanitize_callback' => 'sanitize_textarea_field',
                    ),
                    'data'        => array(
                        'required'          => true,
                        'sanitize_callback' => 'sanitize_textarea_field',
                    ),
                ),
            )
        );

        // Update log by ID
        register_rest_route(
            self::NAMESPACE,
            '/logs/(?P<id>\d+)',
            array(
                'methods'             => WP_REST_Server::EDITABLE,
                'callback'            => array( $this, 'update_log' ),
                'permission_callback' => array( $this, 'check_permission' ),
                'args'                => array(
                    'id'          => array(
                        'required'          => true,
                        'sanitize_callback' => 'absint',
                    ),
                    'user_id'     => array(
                        'sanitize_callback' => 'absint',
                    ),
                    'ip'          => array(
                        'sanitize_callback' => 'sanitize_text_field',
                    ),
                    'user_agent'  => array(
                        'sanitize_callback' => 'sanitize_text_field',
                    ),
                    'title'       => array(
                        'sanitize_callback' => 'sanitize_text_field',
                    ),
                    'description' => array(
                        'sanitize_callback' => 'sanitize_textarea_field',
                    ),
                    'data'        => array(
                        'sanitize_callback' => 'sanitize_textarea_field',
                    ),
                ),
            )
        );

        // Delete log by ID
        register_rest_route(
            self::NAMESPACE,
            '/logs/(?P<id>\d+)',
            array(
                'methods'             => WP_REST_Server::DELETABLE,
                'callback'            => array( $this, 'delete_log' ),
                'permission_callback' => array( $this, 'check_permission' ),
                'args'                => array(
                    'id' => array(
                        'required'          => true,
                        'sanitize_callback' => 'absint',
                    ),
                ),
            )
        );

        // Delete all logs
        register_rest_route(
            self::NAMESPACE,
            '/logs/delete-all',
            array(
                'methods'             => WP_REST_Server::DELETABLE,
                'callback'            => array( $this, 'delete_all_logs' ),
                'permission_callback' => array( $this, 'check_permission' ),
            )
        );

        // Get single log by ID
        register_rest_route(
            self::NAMESPACE,
            '/logs/(?P<id>\d+)',
            array(
                'methods'             => WP_REST_Server::READABLE,
                'callback'            => array( $this, 'get_log' ),
                'permission_callback' => array( $this, 'check_permission' ),
                'args'                => array(
                    'id' => array(
                        'required'          => true,
                        'sanitize_callback' => 'absint',
                    ),
                ),
            )
        );
    }
    /**
     * Check permission for API access
     *
     * @param WP_REST_Request $request Request object.
     * @return bool
     */
    // public function check_permission( $request ) {
    //     // Change this based on your requirements
    //     // For development, you might want to allow all users
    //     // For production, restrict to specific capabilities
    //     return current_user_can( 'manage_options' );
    // }
    /**
     * Check if user has permission to access the endpoint.
     *
     * @param WP_REST_Request $request The request object.
     * @return bool|WP_Error True if user has permission, WP_Error otherwise.
     */
    public function check_permission( WP_REST_Request $request ) {

        // Check if user has capability to manage options (typically administrators)
        if ( ! current_user_can( 'manage_options' ) ) {
            return new WP_Error(
                'rest_forbidden',
                __( 'You do not have permission to access this endpoint.', 'plugin-starter' ),
                array( 'status' => 403 )
            );
        }

        return true;
    }
    
    /**
     * Return posts for DataTables (server-side).
     */
    public function get_posts( WP_REST_Request $request ) {
        $page     = max( 1, intval( $request->get_param('page') ?: 1 ) );
        $per_page = max( 1, intval( $request->get_param('per_page') ?: 10 ) );
        $status   = sanitize_text_field( $request->get_param('status') ?: 'publish' );
        $search   = sanitize_text_field( $request->get_param('search') ?: '' );

        // Sorting
        $orderby_param = strtolower( sanitize_text_field( $request->get_param('orderby') ?: '' ) );
        $order_param   = strtoupper( sanitize_text_field( $request->get_param('order') ?: 'ASC' ) );
        $allowed_orderby = [
            'title' => 'title',
            'date'  => 'date',
            'id'    => 'ID',
        ];
        $orderby = isset( $allowed_orderby[ $orderby_param ] ) ? $allowed_orderby[ $orderby_param ] : 'date';
        $order   = in_array( $order_param, [ 'ASC', 'DESC' ], true ) ? $order_param : 'DESC';

        $args = [
            'post_type'      => 'post',
            'post_status'    => $status, // publish|draft|trash|etc
            'posts_per_page' => $per_page,
            'paged'          => $page,
            'orderby'        => $orderby,
            'order'          => $order,
            's'              => $search,
            'no_found_rows'  => false, // we need totals for DataTables
        ];

        $query = new WP_Query( $args );

        $rows = [];
        foreach ( $query->posts as $post ) {
            $author_id  = $post->post_author;
            $categories = wp_get_post_terms( $post->ID, 'category', [ 'fields' => 'names' ] );
            $tags       = wp_get_post_terms( $post->ID, 'post_tag', [ 'fields' => 'names' ] );

            $rows[] = [
                'id'    => $post->ID,
                'title' => get_the_title( $post ),
                'date'  => get_the_date( '', $post ),
                'author'=> [
                    'id'     => $author_id,
                    'name'   => get_the_author_meta( 'display_name', $author_id ),
                    'avatar' => get_avatar_url( $author_id, [ 'size' => 24 ] ),
                ],
                'categories' => $categories ?: [],
                'tags'       => $tags ?: [],
                'status'       => get_post_status($post),
            ];
        }

        return [
            'data'  => $rows,
            'total' => (int) $query->found_posts,
            'page'  => (int) $page,
        ];
    }

    /**
     * Change status for a single post.
     */
    public function change_post_status( WP_REST_Request $request ) {
        $post_id = (int) $request['id'];
        $status  = sanitize_text_field( $request['status'] );

        $updated = wp_update_post([
            'ID'          => $post_id,
            'post_status' => $status,
        ], true );

        if ( is_wp_error( $updated ) ) {
            return new WP_Error( 'update_failed', __( 'Failed to update post status', 'plugin-starter' ), [ 'status' => 500 ] );
        }

        return [ 'success' => true, 'post_id' => $post_id, 'status' => $status ];
    }

    /**
     * Bulk change status of posts.
     */
    public function bulk_change_status( WP_REST_Request $request ) {
        $ids    = $request['ids'];
        $status = sanitize_text_field( $request['status'] );

        $updated = [];
        foreach ( $ids as $id ) {
            $result = wp_update_post([
                'ID'          => (int) $id,
                'post_status' => $status,
            ], true );

            if ( ! is_wp_error( $result ) ) {
                $updated[] = (int) $id;
            }
        }

        return [ 'success' => true, 'updated' => $updated, 'status' => $status ];
    }
    
	public function get_settings(WP_REST_Request $request)
	{
		if (!current_user_can('manage_options')) {
			return new WP_Error(
				'rest_update_error',
				'Sorry, you are not allowed to update the DAEXT UI Test options.',
				array('status' => 403)
			);
		}
		$plugin_starter_options = plugin_starter_get_option();
		return new WP_REST_Response($plugin_starter_options, 200);
	}
	public function update_settings(WP_REST_Request $request) //WP_REST_Request $request
	{
		if (!current_user_can('manage_options')) {
			return new WP_Error(
				'rest_update_error',
				'Sorry, you are not allowed to update options.'.get_current_user_id(),
				array('status' => 403)
			);
		}
		$plugin_starter_options_old = plugin_starter_get_option();

		$plugin_starter_options = map_deep(wp_unslash($request->get_param('plugin_starter_options')), 'wp_kses_post');

		$plugin_starter_options ? update_option('plugin_starter_options', $plugin_starter_options) : '';

		$this->log_settings_change($plugin_starter_options_old, $plugin_starter_options);

		$response = [
			'success' => true,
			'msg'	=> esc_html__('Data successfully added.', 'plugin-starter')
		];

		// return $response;
		return new WP_REST_Response($response, 200);

		/*

		return new WP_REST_Response([
			'success' => true,
			'message' => 'Plugin installed successfully.'
		], 200);


		return new WP_REST_Response([
			'success' => false,
			'message' => 'Installed plugin could not be identified'
		], 404);
		*/
	}

	private function log_settings_change($old_data, $new_data)
	{
		global $wpdb;
		$table_name = $wpdb->prefix . 'plugin_starter_logs';

		$changes = [];
		foreach ($new_data as $key => $value) {
			if (!isset($old_data[$key]) || $old_data[$key] !== $value) {
				$changes[$key] = [
					'old' => isset($old_data[$key]) ? $old_data[$key] : null,
					'new' => $value
				];
			}
		}

		if (empty($changes)) {
			return;
		}

		$user_id = get_current_user_id();
		$ip = $this->get_client_ip();
		$user_agent = isset($_SERVER['HTTP_USER_AGENT']) ? sanitize_text_field( wp_unslash($_SERVER['HTTP_USER_AGENT']) ) : '';

		$wpdb->insert(
			$table_name,
			[
				'user_id' => $user_id,
				'ip' => $ip,
				'user_agent' => $user_agent,
				'title' => 'Settings Updated',
				'description' => count($changes) . ' setting(s) changed',
				'data' => json_encode($changes),
				'created_at' => current_time('mysql'),
				'updated_at' => current_time('mysql')
			],
			['%d', '%s', '%s', '%s', '%s', '%s', '%s', '%s']
		);
	}

	private function get_client_ip()
	{
		if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
			return sanitize_text_field( wp_unslash($_SERVER['HTTP_CLIENT_IP']));
		} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
			return sanitize_text_field( wp_unslash($_SERVER['HTTP_X_FORWARDED_FOR']));
		} elseif (!empty($_SERVER['REMOTE_ADDR'])) {
			return sanitize_text_field( wp_unslash($_SERVER['REMOTE_ADDR']));
		}
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
    public function reset_settings(WP_REST_Request $request)
	{
        if (!current_user_can('manage_options')) {
            return new WP_Error(
                'rest_update_error',
                'Sorry, you are not allowed to reset the settings.',
                array('status' => 403)
            );
        }
        $name = sanitize_text_field(wp_unslash($request->get_param('name')));
        $plugin_starter_options_old = plugin_starter_get_option();
        $plugin_starter_options = plugin_starter_get_option();
        $plugin_starter_default_options = plugin_starter_get_default_options();

        $success = $this->reset_option_by_path($plugin_starter_options, $plugin_starter_default_options, $name);

        if ($success) {
            update_option('plugin_starter_options', $plugin_starter_options);
            $this->log_settings_reset($name, $plugin_starter_options_old[$name] ?? null, $plugin_starter_options[$name] ?? null);
            wp_send_json_success(['message' => __('Settings reset successfully.', 'plugin-starter')]);
        } else {
            wp_send_json_error(['error_message' => __('Invalid settings path.', 'plugin-starter')]);
        }

		$response = [
			'success' => true,
			'msg'	=> esc_html__('Data successfully added.', 'plugin-starter')
		];

		// return $response;
		return new WP_REST_Response($response, 200);
	}
    public function reset_settings_all(WP_REST_Request $request)
	{
        if (!current_user_can('manage_options')) {
            return new WP_Error(
                'rest_update_error',
                'Sorry, you are not allowed to reset the settings.',
                array('status' => 403)
            );
        }
        $plugin_starter_default_options = plugin_starter_get_default_options();

        update_option('plugin_starter_options', $plugin_starter_default_options);
        // $this->log_settings_reset($name, $plugin_starter_options_old[$name] ?? null, $plugin_starter_options[$name] ?? null);
        wp_send_json_success(['message' => __('Settings reset successfully.', 'plugin-starter')]);

		$response = [
			'success' => true,
			'msg'	=> esc_html__('Data successfully added.', 'plugin-starter')
		];

		// return $response;
		return new WP_REST_Response($response, 200);
	}

	private function log_settings_reset($section, $old_data, $new_data)
	{
		global $wpdb;
		$table_name = $wpdb->prefix . 'plugin_starter_logs';

		$user_id = get_current_user_id();
		$ip = $this->get_client_ip();
		$user_agent = isset($_SERVER['HTTP_USER_AGENT']) ? sanitize_text_field( wp_unslash($_SERVER['HTTP_USER_AGENT']) ) : '';

		$changes = [
			$section => [
				'old' => $old_data,
				'new' => $new_data,
				'action' => 'reset'
			]
		];

		$wpdb->insert(
			$table_name,
			[
				'user_id' => $user_id,
				'ip' => $ip,
				'user_agent' => $user_agent,
				'title' => 'Settings Reset',
				'description' => "Reset section: $section",
				'data' => json_encode($changes),
				'created_at' => current_time('mysql'),
				'updated_at' => current_time('mysql')
			],
			['%d', '%s', '%s', '%s', '%s', '%s', '%s', '%s']
		);
	}
	
    public static function rest_feedback($request)
    {
        $subject = sanitize_text_field(wp_unslash($request->get_param('subject')));
        $message = sanitize_textarea_field(wp_unslash($request->get_param('message')));

        if (empty($message)) {
            return new WP_Error('empty_message', __('Message cannot be empty.', 'plugin-starter'), array('status' => 400));
        }

        if (empty($subject)) {
            return new WP_Error('empty_subject', __('Subject cannot be empty.', 'plugin-starter'), array('status' => 400));
        }

        $email = 'mostak.shahid@gmail.com';
        // $subject = sprintf(
        //     /* translators: %s = site URL */
        //     esc_html__('Error notification for %s', 'plugin-starter'),
        //     get_home_url()
        // );
        $output = '<strong>Subject:</strong> ' . $subject . '<br/><strong>Message:</strong> ' . $message;
        $headers = array(
            'From: ' . get_bloginfo('name') . ' <' . get_option('admin_email') . '>',
            'Content-Type: text/html; charset=UTF-8'
        );

        wp_mail($email, 'Feedback from Plugin Starter', $output, $headers);
        $response = [
            'success' => true,
            'msg' => esc_html__('Email Send successfully.', 'plugin-starter'),
            'subject' => $subject,
            'message' => $message
        ];
        return new WP_REST_Response($response, 200);
    }
    public function rest_set_settings_theme(WP_REST_Request $request)
    {
        $user_id = sanitize_text_field(wp_unslash($request->get_param('id')));
        // $user_id = get_current_user_id();
        $settings_theme = sanitize_text_field(wp_unslash($request->get_param('settings_theme')));
        // get_user_meta($user_id, 'plugin_starter_settings_theme', $settings_theme);
        update_user_meta( $user_id, 'plugin_starter_settings_theme', $settings_theme );
                
        $response = [
            'success' => true,
            'msg' => esc_html__('Theme set successfully.', 'plugin-starter'),
        ];

        return new WP_REST_Response($response, 200);
    }
    public function rest_get_settings_theme(WP_REST_Request $request)
    {
        $user_id = sanitize_text_field(wp_unslash($request->get_param('id')));
        $settings_theme = get_user_meta($user_id, 'plugin_starter_settings_theme', true);
        // return $settings_theme??'light';
        return $settings_theme?$settings_theme:'light';
    }
    /**
     * Get the deactivation link.
     *
     * @param WP_REST_Request $request The request object.
     * @return WP_REST_Response|WP_Error The response or error.
     */
    public function get_deactivation_link( WP_REST_Request $request ) {
        // Get the encrypted key from options
        $encrypted_key = get_option( 'plugin_starter_deactive_key' );

        if ( false === $encrypted_key ) {
            return new WP_Error(
                'key_not_found',
                __( 'Deactivation key not found. Please reactivate the plugin.', 'plugin-starter' ),
                array( 'status' => 404 )
            );
        }

        // Decrypt the key
        $decrypted_key = CryptoHelper::decrypt( $encrypted_key );

        if ( false === $decrypted_key ) {
            return new WP_Error(
                'decryption_failed',
                __( 'Failed to decrypt deactivation key. Please contact support.', 'plugin-starter' ),
                array( 'status' => 500 )
            );
        }

        // Build the deactivation URL
        $deactivation_url = add_query_arg(
            array(
                'action' => 'plugin_starter_deactivate',
                'secret_key' => $decrypted_key,
            ),
            admin_url( 'admin-post.php' )
        );

        // Return the response
        return new WP_REST_Response(
            array(
                'success' => true,
                'deactivation_url' => $deactivation_url,
                'message' => __( 'Deactivation link generated successfully.', 'plugin-starter' ),
                'warning' => __( 'This link will only work once. After deactivation, a new link will be generated on reactivation.', 'plugin-starter' ),
            ),
            200
        );
    }

    /**
     * Get logs with filtering
     *
     * @param WP_REST_Request $request Request object.
     * @return WP_REST_Response|WP_Error
     */
    public function get_logs( $request ) {
        global $wpdb;

        $page       = $request->get_param( 'page' );
        $per_page   = $request->get_param( 'per_page' );
        $user_name  = $request->get_param( 'user_name' );
        $ip         = $request->get_param( 'ip' );
        $title      = $request->get_param( 'title' );
        $created_at = $request->get_param( 'created_at' );
        $orderby    = $request->get_param( 'orderby' );
        $order      = strtoupper( $request->get_param( 'order' ) ) === 'ASC' ? 'ASC' : 'DESC';

        // Validate orderby field
        $allowed_orderby = array( 'ID', 'user_id', 'ip', 'title', 'created_at', 'updated_at' );
        if ( ! in_array( $orderby, $allowed_orderby ) ) {
            $orderby = 'ID';
        }

        $offset = ( $page - 1 ) * $per_page;

        // Build query
        $where_clauses = array( '1=1' );
        $join          = '';

        // Join with users table if user_name filter is present
        if ( ! empty( $user_name ) ) {
            $join            = "LEFT JOIN {$wpdb->users} u ON l.user_id = u.ID";
            $where_clauses[] = $wpdb->prepare( 'u.display_name LIKE %s', '%' . $wpdb->esc_like( $user_name ) . '%' );
        }

        if ( ! empty( $ip ) ) {
            $where_clauses[] = $wpdb->prepare( 'l.ip LIKE %s', '%' . $wpdb->esc_like( $ip ) . '%' );
        }

        if ( ! empty( $title ) ) {
            $where_clauses[] = $wpdb->prepare( 'l.title LIKE %s', '%' . $wpdb->esc_like( $title ) . '%' );
        }

        if ( ! empty( $created_at ) ) {
            $where_clauses[] = $wpdb->prepare( 'DATE(l.created_at) = %s', $created_at );
        }

        $where = implode( ' AND ', $where_clauses );

        // Get total count
        $count_query = "SELECT COUNT(*) FROM {$this->logs_table_name} l {$join} WHERE {$where}";
        $total       = $wpdb->get_var( $count_query );

        // Get data
        $query = "SELECT l.*, u.display_name as user_name, u.user_login, u.user_email 
                  FROM {$this->logs_table_name} l 
                  LEFT JOIN {$wpdb->users} u ON l.user_id = u.ID 
                  WHERE {$where} 
                  ORDER BY l.{$orderby} {$order} 
                  LIMIT %d OFFSET %d";

        $results = $wpdb->get_results(
            $wpdb->prepare( $query, $per_page, $offset ),
            ARRAY_A
        );

        return new WP_REST_Response(
            array(
                'success' => true,
                'data'    => $results,
                'total'   => (int) $total,
                'page'    => $page,
                'per_page' => $per_page,
                'total_pages' => ceil( $total / $per_page ),
            ),
            200
        );
    }

    /**
     * Search logs
     *
     * @param WP_REST_Request $request Request object.
     * @return WP_REST_Response|WP_Error
     */
    public function search_logs( $request ) {
        global $wpdb;

        $search   = $request->get_param( 'q' );
        $page     = $request->get_param( 'page' );
        $per_page = $request->get_param( 'per_page' );
        $offset   = ( $page - 1 ) * $per_page;

        $search_like = '%' . $wpdb->esc_like( $search ) . '%';

        // Get total count
        $count_query = $wpdb->prepare(
            "SELECT COUNT(*) FROM {$this->logs_table_name} l 
            LEFT JOIN {$wpdb->users} u ON l.user_id = u.ID
            WHERE l.title LIKE %s 
            OR l.description LIKE %s 
            OR l.ip LIKE %s 
            OR u.display_name LIKE %s
            OR l.data LIKE %s",
            $search_like,
            $search_like,
            $search_like,
            $search_like,
            $search_like
        );

        $total = $wpdb->get_var( $count_query );

        // Get results
        $query = $wpdb->prepare(
            "SELECT l.*, u.display_name as user_name, u.user_login, u.user_email 
            FROM {$this->logs_table_name} l 
            LEFT JOIN {$wpdb->users} u ON l.user_id = u.ID
            WHERE l.title LIKE %s 
            OR l.description LIKE %s 
            OR l.ip LIKE %s 
            OR u.display_name LIKE %s
            OR l.data LIKE %s
            ORDER BY l.ID DESC 
            LIMIT %d OFFSET %d",
            $search_like,
            $search_like,
            $search_like,
            $search_like,
            $search_like,
            $per_page,
            $offset
        );

        $results = $wpdb->get_results( $query, ARRAY_A );

        return new WP_REST_Response(
            array(
                'success' => true,
                'data'    => $results,
                'total'   => (int) $total,
                'page'    => $page,
                'per_page' => $per_page,
                'total_pages' => ceil( $total / $per_page ),
                'search_term' => $search,
            ),
            200
        );
    }

    /**
     * Get single log by ID
     *
     * @param WP_REST_Request $request Request object.
     * @return WP_REST_Response|WP_Error
     */
    public function get_log( $request ) {
        global $wpdb;

        $id = $request->get_param( 'id' );

        $query = $wpdb->prepare(
            "SELECT l.*, u.display_name as user_name, u.user_login, u.user_email 
            FROM {$this->logs_table_name} l 
            LEFT JOIN {$wpdb->users} u ON l.user_id = u.ID
            WHERE l.ID = %d",
            $id
        );

        $result = $wpdb->get_row( $query, ARRAY_A );

        if ( ! $result ) {
            return new WP_Error(
                'log_not_found',
                'Log entry not found',
                array( 'status' => 404 )
            );
        }

        return new WP_REST_Response(
            array(
                'success' => true,
                'data'    => $result,
            ),
            200
        );
    }

    /**
     * Create new log entry
     *
     * @param WP_REST_Request $request Request object.
     * @return WP_REST_Response|WP_Error
     */
    public function create_log( $request ) {
        global $wpdb;

        $data = array(
            'user_id'     => $request->get_param( 'user_id' ),
            'ip'          => $request->get_param( 'ip' ),
            'user_agent'  => $request->get_param( 'user_agent' ),
            'title'       => $request->get_param( 'title' ),
            'description' => $request->get_param( 'description' ),
            'data'        => $request->get_param( 'data' ),
        );

        $format = array(
            '%d', // user_id
            '%s', // ip
            '%s', // user_agent
            '%s', // title
            '%s', // description
            '%s', // data
        );

        $result = $wpdb->insert( $this->logs_table_name, $data, $format );

        if ( ! $result ) {
            return new WP_Error(
                'insert_failed',
                'Failed to insert log entry: ' . $wpdb->last_error,
                array( 'status' => 500 )
            );
        }

        $inserted_id = $wpdb->insert_id;

        // Get the inserted record
        $inserted_log = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT l.*, u.display_name as user_name, u.user_login, u.user_email 
                FROM {$this->logs_table_name} l 
                LEFT JOIN {$wpdb->users} u ON l.user_id = u.ID
                WHERE l.ID = %d",
                $inserted_id
            ),
            ARRAY_A
        );

        return new WP_REST_Response(
            array(
                'success' => true,
                'message' => 'Log entry created successfully',
                'data'    => $inserted_log,
                'id'      => $inserted_id,
            ),
            201
        );
    }

    /**
     * Update log entry
     *
     * @param WP_REST_Request $request Request object.
     * @return WP_REST_Response|WP_Error
     */
    public function update_log( $request ) {
        global $wpdb;

        $id = $request->get_param( 'id' );

        // Check if log exists
        $exists = $wpdb->get_var(
            $wpdb->prepare( "SELECT ID FROM {$this->logs_table_name} WHERE ID = %d", $id )
        );

        if ( ! $exists ) {
            return new WP_Error(
                'log_not_found',
                'Log entry not found',
                array( 'status' => 404 )
            );
        }

        // Build update data
        $data   = array();
        $format = array();

        $fields = array(
            'user_id'     => '%d',
            'ip'          => '%s',
            'user_agent'  => '%s',
            'title'       => '%s',
            'description' => '%s',
            'data'        => '%s',
        );

        foreach ( $fields as $field => $field_format ) {
            $value = $request->get_param( $field );
            if ( null !== $value ) {
                $data[ $field ]   = $value;
                $format[]         = $field_format;
            }
        }

        if ( empty( $data ) ) {
            return new WP_Error(
                'no_data',
                'No data provided for update',
                array( 'status' => 400 )
            );
        }

        $result = $wpdb->update(
            $this->logs_table_name,
            $data,
            array( 'ID' => $id ),
            $format,
            array( '%d' )
        );

        if ( false === $result ) {
            return new WP_Error(
                'update_failed',
                'Failed to update log entry: ' . $wpdb->last_error,
                array( 'status' => 500 )
            );
        }

        // Get the updated record
        $updated_log = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT l.*, u.display_name as user_name, u.user_login, u.user_email 
                FROM {$this->logs_table_name} l 
                LEFT JOIN {$wpdb->users} u ON l.user_id = u.ID
                WHERE l.ID = %d",
                $id
            ),
            ARRAY_A
        );

        return new WP_REST_Response(
            array(
                'success' => true,
                'message' => 'Log entry updated successfully',
                'data'    => $updated_log,
            ),
            200
        );
    }

    /**
     * Delete log entry
     *
     * @param WP_REST_Request $request Request object.
     * @return WP_REST_Response|WP_Error
     */
    public function delete_log( $request ) {
        global $wpdb;

        $id = $request->get_param( 'id' );

        // Get the record before deleting
        $log = $wpdb->get_row(
            $wpdb->prepare( "SELECT * FROM {$this->logs_table_name} WHERE ID = %d", $id ),
            ARRAY_A
        );

        if ( ! $log ) {
            return new WP_Error(
                'log_not_found',
                'Log entry not found',
                array( 'status' => 404 )
            );
        }

        $result = $wpdb->delete(
            $this->logs_table_name,
            array( 'ID' => $id ),
            array( '%d' )
        );

        if ( ! $result ) {
            return new WP_Error(
                'delete_failed',
                'Failed to delete log entry: ' . $wpdb->last_error,
                array( 'status' => 500 )
            );
        }

        return new WP_REST_Response(
            array(
                'success' => true,
                'message' => 'Log entry deleted successfully',
                'data'    => $log,
            ),
            200
        );
    }

    /**
     * Delete all log entries
     *
     * @param WP_REST_Request $request Request object.
     * @return WP_REST_Response|WP_Error
     */
    public function delete_all_logs( $request ) {
        global $wpdb;

        // Get count before deletion
        $count = $wpdb->get_var( "SELECT COUNT(*) FROM {$this->logs_table_name}" );

        if ( $count == 0 ) {
            return new WP_REST_Response(
                array(
                    'success' => true,
                    'message' => 'No logs to delete',
                    'count'   => 0,
                ),
                200
            );
        }

        $result = $wpdb->query( "TRUNCATE TABLE {$this->logs_table_name}" );

        if ( false === $result ) {
            return new WP_Error(
                'delete_failed',
                'Failed to delete all logs: ' . $wpdb->last_error,
                array( 'status' => 500 )
            );
        }

        return new WP_REST_Response(
            array(
                'success' => true,
                'message' => sprintf( 'Successfully deleted %d log entries', $count ),
                'count'   => (int) $count,
            ),
            200
        );
    }

}
// new Rest_Api();