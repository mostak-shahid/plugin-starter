<?php
namespace MosPress\PluginStarter\API;
if ( ! defined( 'ABSPATH' ) ) exit;
use WP_Error;
use WP_REST_Request;
use WP_REST_Response;
use WP_Query;
/**
 * Rest API Router
 *
 * Registers all REST API endpoints and routes them to appropriate controllers
 */
class Rest_API
{
    
    private const NAMESPACE = 'plugin-starter/v1';
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
            'callback' => [$this, 'plugin_starter_get_posts'],
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
            'callback' => [$this, 'plugin_starter_change_post_status'],
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
            'callback' => [$this, 'plugin_starter_bulk_change_status'],
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
				'callback' => [$this, 'rest_plugin_starter_get_options'],
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
				'callback'            => [$this, 'rest_plugin_starter_update_options'],
				// 'permission_callback' => '__return_true'
				'permission_callback' => function () {
                    return current_user_can('manage_options');
                },
			)
		);

		register_rest_route(
            self::NAMESPACE,
            '/feedback',
            array(
                'methods' => 'POST',
                'callback' => [$this, 'rest_plugin_starter_feedback'],
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
				'callback' => [$this, 'rest_plugin_starter_set_settings_theme'],
				'permission_callback' => '__return_true', // Allow public access
				// 'permission_callback' => function () {
                //     return current_user_can('manage_options');
                // },
                // 'args' => [
                //     'id' => [
                //         'required' => true,
                //         'type'     => 'string',
                //         'items'    => [ 'type' => 'integer' ],
                //     ],
                //     'settings_theme' => [
                //         'required' => true,
                //         'type'     => 'string',
                //         'enum'     => [ 'light', 'dark' ],
                //     ],
                // ],
			)
		);
        register_rest_route(
			self::NAMESPACE,
			'/get-settings-theme',
			array(
				'methods'  => 'GET',
				'callback' => [$this, 'rest_plugin_starter_get_settings_theme'],
				'permission_callback' => '__return_true', // Allow public access
				// 'permission_callback' => function () {
                //     return current_user_can('manage_options');
                // },
			)
		);
    }
    
    /**
     * Return posts for DataTables (server-side).
     */
    function plugin_starter_get_posts( WP_REST_Request $request ) {
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
    function plugin_starter_change_post_status( WP_REST_Request $request ) {
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
    function plugin_starter_bulk_change_status( WP_REST_Request $request ) {
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
    
	public function rest_plugin_starter_get_options(WP_REST_Request $request)
	{
		// if (!current_user_can('manage_options')) {
		// 	return new WP_Error(
		// 		'rest_update_error',
		// 		'Sorry, you are not allowed to update the DAEXT UI Test options.',
		// 		array('status' => 403)
		// 	);
		// }
		$plugin_starter_options = plugin_starter_get_option();
		return new WP_REST_Response($plugin_starter_options, 200);
	}
	public function rest_plugin_starter_update_options(WP_REST_Request $request) //WP_REST_Request $request
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
	
    public static function rest_plugin_starter_feedback($request)
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
    public function rest_plugin_starter_set_settings_theme(WP_REST_Request $request)
    {
        $user_id = sanitize_text_field(wp_unslash($request->get_param('id')));
        // $user_id = get_current_user_id();
        $settings_theme = sanitize_text_field(wp_unslash($request->get_param('settings_theme')));
        // get_user_meta($user_id, 'plugin_starter_settings_theme', $settings_theme);
        update_user_meta( $user_id, 'plugin_starter_settings_theme', $settings_theme );
                
        $response = [
            'success' => true,
            'msg' => esc_html__('Theme set successfully.' . $user_id . $settings_theme, 'plugin-starter'),
        ];

        return new WP_REST_Response($response, 200);
    }
    public function rest_plugin_starter_get_settings_theme(WP_REST_Request $request)
    {
        $user_id = sanitize_text_field(wp_unslash($request->get_param('id')));
        $settings_theme = get_user_meta($user_id, 'plugin_starter_settings_theme', true);
        // return $settings_theme??'light';
        return $settings_theme?$settings_theme:'light';
    }

}
// new Rest_Api();