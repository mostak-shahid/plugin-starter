<?php
namespace MosPress\PluginStarter\HOOK;

if ( ! defined( 'ABSPATH' ) ) exit;

class Filter_Hook {

    private $plugin_slug;      // plugin-starter
    private $plugin_basename;  // plugin-starter/plugin-starter.php
    private static $instance = null;

    public static function get_instance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function __construct() {

        // Automatically detect plugin slug + basename
        $this->plugin_basename = plugin_basename( PLUGIN_STARTER_MAIN_FILE ); 
        $this->plugin_slug     = dirname( $this->plugin_basename );

        /**
         * Now supports:
         * plugin_action_links_plugin-starter/plugin-starter.php
         * WITHOUT hard-coding strings.
         */
        add_filter(
            "plugin_action_links_{$this->plugin_basename}",
            [ $this, 'plugin_starter_add_action_links' ]
        );

        add_filter('admin_body_class', [ $this, 'plugin_starter_admin_body_class' ]);
        add_filter('plugin_starter_default_options_modify', [ $this, 'modify_plugin_starter_default_options' ]);

        /**
         * Allow PRO add-ons or Module Federation remotes to inject links dynamically
         */
        add_filter('plugin_starter_action_links_extra', '__return_empty_array');
    }

    /**
     * Add Settings link + dynamic injected links
     */
    public function plugin_starter_add_action_links( $links ) {

        $default_links = [
            '<a href="' . admin_url("admin.php?page={$this->plugin_slug}") . '">' .
                esc_html__('Settings', 'plugin-starter') .
            '</a>',
        ];

        /**
         * Dynamic links injected from PRO plugin or remote MF
         * Example:
         * add_filter( 'plugin_starter_action_links_extra', function($links) {
         *     $links[] = '<a href="https://example.com/pro">Go Pro</a>';
         *     return $links;
         * });
         */
        $extra_links = apply_filters('plugin_starter_action_links_extra', []);

        return array_merge( $default_links, $extra_links, $links );
    }

    /**
     * Add body classes on plugin pages
     */
    public function plugin_starter_admin_body_class( $classes ) {
        if (function_exists('plugin_starter_is_plugin_page') && plugin_starter_is_plugin_page()) {
            $classes .= ' ' . sanitize_html_class( $this->plugin_slug . '-settings-template' ) . ' ';
        }
        return $classes;
    }

    /**
     * Default options filter (still dynamic)
     */
    public function modify_plugin_starter_default_options( $opts ) {

        $defaults = [
            'page' => [
                'background' => [],
                'boxshadow' => [
                    'enabled' => false,
                    'inset' => false,
                ],
            ],
            'more' => [
                'enable_scripts' => false,
                'css' => '/* CSS Code Here */',
                'js' => '// JavaScript Code Here',
                'header_content' => '<!-- Content inside HEAD tag -->',
                'footer_content' => '<!-- Content inside BODY tag -->',
            ],
            'tools' => [
                'delete_data_on' => 'none', // delete, uninstall, none
            ]
        ];

        return wp_parse_args( $opts, $defaults );
    }
}
