<?php
namespace MosPress\PluginStarter\Hook;

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
        add_filter('plugin_starter_default_colors_modify', [ $this, 'modify_plugin_starter_default_colors' ]);
        add_filter('plugin_starter_default_gradients_modify', [ $this, 'modify_plugin_starter_default_gradients' ]);

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
            '<a href="https://mostak-shahid.github.io/plugin/plugin-starter/docs/" target="_blank">' .
                esc_html__('Docs', 'plugin-starter') .
            '</a>',
            '<a href="https://www.facebook.com/mospressbd" target="_blank">' .
                esc_html__('Community', 'plugin-starter') .
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
                // 'color' => '#ffffff',
                'color' => '',
                // 'gradient' => 'linear-gradient(135deg, #ff8c00 0%, #fcff41 100%)',
                'gradient' => '',
                'font' => [
                    'enabled' => false,
                ],
                'media_uploader' => [],
                'multicolor' => [],
                'repeatable_field' => [
                    ['address' => '123 Main St, Cityville, Country' ],
                    ['address' => '456 Side St, Townsville, Country' ],
                ],
                'textshadow' => [
                    'enabled' => false,
                ],
                'unitcontrol' => '',
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

    /**
     * Default options filter (still dynamic)
     */
    public function modify_plugin_starter_default_colors( $opts ) {
        $defaults = [
            ['name' => esc_html__('Black', 'plugin-starter'), 'color' => '#000000'],
            ['name' => esc_html__('Blue', 'plugin-starter'), 'color' => '#0073AA'],
            ['name' => esc_html__('Cyan', 'plugin-starter'), 'color' => '#00A0D2'],
            ['name' => esc_html__('Deep Blue', 'plugin-starter'), 'color' => '#005075'],
            ['name' => esc_html__('Deep Purple', 'plugin-starter'), 'color' => '#23036A'],
            ['name' => esc_html__('Gold', 'plugin-starter'), 'color' => '#FFB900'],
            ['name' => esc_html__('Gray', 'plugin-starter'), 'color' => '#888888'],
            ['name' => esc_html__('Green', 'plugin-starter'), 'color' => '#008000'],
            ['name' => esc_html__('Light Gray', 'plugin-starter'), 'color' => '#E6E6E6'],
            ['name' => esc_html__('Lime Green', 'plugin-starter'), 'color' => '#82C91E'],
            ['name' => esc_html__('Navy Blue', 'plugin-starter'), 'color' => '#001F3F'],
            ['name' => esc_html__('Orange', 'plugin-starter'), 'color' => '#FF6600'],
            ['name' => esc_html__('Pink', 'plugin-starter'), 'color' => '#FF4081'],
            ['name' => esc_html__('Purple', 'plugin-starter'), 'color' => '#800080'],
            ['name' => esc_html__('Red', 'plugin-starter'), 'color' => '#FF0000'],
            ['name' => esc_html__('Silver', 'plugin-starter'), 'color' => '#C0C0C0'],
            ['name' => esc_html__('White', 'plugin-starter'), 'color' => '#FFFFFF'],
            ['name' => esc_html__('Yellow', 'plugin-starter'), 'color' => '#FFFF00'],
        ];
        return wp_parse_args( $opts, $defaults );
    }

    /**
     * Default options filter (still dynamic)
     */
    public function modify_plugin_starter_default_gradients( $opts ) {
        $defaults = [
            ['name' => esc_html__('Blue to Purple', 'plugin-starter'), 'gradient' => 'linear-gradient(135deg, #0064fa 0%, #800080 100%)'],
            ['name' => esc_html__('Pink to Orange', 'plugin-starter'), 'gradient' => 'linear-gradient(135deg, #ff4081 0%, #ff6600 100%)'],
            ['name' => esc_html__('Cyan to Blue', 'plugin-starter'), 'gradient' => 'linear-gradient(135deg, #00a0d2 0%, #0073aa 100%)'],
            ['name' => esc_html__('Lime Green to Green', 'plugin-starter'), 'gradient' => 'linear-gradient(135deg, #82c91e 0%, #008000 100%)'],
            ['name' => esc_html__('Gold to Orange', 'plugin-starter'), 'gradient' => 'linear-gradient(135deg, #ffb900 0%, #ff6600 100%)'],
            ['name' => esc_html__('Red to Deep Purple', 'plugin-starter'), 'gradient' => 'linear-gradient(135deg, #ff0000 0%, #23036a 100%)'],
            ['name' => esc_html__('Yellow to Lime Green', 'plugin-starter'), 'gradient' => 'linear-gradient(135deg, #ffff00 0%, #82c91e 100%)'],
            ['name' => esc_html__('Silver to Gray', 'plugin-starter'), 'gradient' => 'linear-gradient(135deg, #c0c0c0 0%, #888888 100%)'],
	    ];
        return wp_parse_args( $opts, $defaults );
    }
}
