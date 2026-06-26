<?php
namespace MosPress\PluginStarter\Hook;

if ( ! defined( 'ABSPATH' ) ) exit;
use MosPress\PluginStarter\Helpers\Utils;

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
        add_filter('plugin_starter_default_options_details_modify', [ $this, 'modify_plugin_starter_default_options_details' ]);
        add_filter('plugin_starter_default_colors_modify', [ $this, 'modify_plugin_starter_default_colors' ]);
        add_filter('plugin_starter_default_gradients_modify', [ $this, 'modify_plugin_starter_default_gradients' ]);
        add_filter('plugin_starter_default_tables_modify', [ $this, 'modify_plugin_starter_default_tables' ]);

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
            '<a href="https://mostak-shahid.github.io/plugins/plugin-starter.html" target="_blank">' .
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
        if (Utils::plugin_starter_is_plugin_page()) {
            $classes .= ' ' . sanitize_html_class( $this->plugin_slug . '-settings-template' ) . ' ';
        }
        return $classes;
    }

    /**
     * Default options filter (still dynamic)
     */
    public function modify_plugin_starter_default_options( $opts ) {
        $defaults = [
            'inputs' => [
                'basic_inputs' => [
                    'text' => '',
                    'textarea' => '',
                    'radio' => 'radio-1',
                    'select' => 'select-2',
                    'number' => '10',
                    'range' => '100',
                    'color' => '#ff0000',
                    'checkbox' => 0,
                    'switch' => 1,
                    'date' => '',
                    'time' => '',
                    'datetime' => '',
                ],
                'array_inputs' => [
                    'checkbox' => ['checkbox-1', 'checkbox-3']
                ],
                'complex_inputs' => [
                    'multiselect' => [],
                    'media' => [],
                    'repeater' => [],
                    'sortableaccordion' => [],
                    'imageselector' => '10',
                    'colorpicker' => '#ffffff',
                    'background' => [
                        'color' => '#ffffff',
                        'image' => [
                            'id' => '9',
                            'url' => 'http://localhost:10003/wp-content/uploads/2026/04/people-surfing-coasts-varkala-near-trivandrum-scaled.jpg',
                        ],
                        'position' => "left center",
                        'size' => "cover",
                        'repeat' => "no-repeat",
                        'origin' => "border-box",
                        'clip' => "content-box",
                        'attachment' => "scroll"
                    ],
                ],

            ],
            'utilities' => [
                'tools' => [
                    'hide_plugin' => 0, // delete, uninstall, none
                    // 'self_defense' => false, // delete, uninstall, none
                    // 'delete_data_on' => 'none', // delete, uninstall, none
                ],
            ]
        ];
        return wp_parse_args( $opts, $defaults );
    }
    /**
     * Default options details filter (still dynamic)
     */
    public function modify_plugin_starter_default_options_details( $opts ) {
        $defaults = [
            'inputs' => [
                'basic_inputs' => [
                    'text' => [
                        'title' => esc_html__('Text Input', 'plugin-starter'),
                        'intro' => esc_html__('This is a intro for Text Input', 'plugin-starter'),
                        'hint' => esc_html__('This is a hints for Text Input', 'plugin-starter'),
                        'before' => esc_html__('This is a before text for Text Input', 'plugin-starter'),
                        'after' => esc_html__('This is a after text for Text Input', 'plugin-starter'),
                        'url' => '/settings/inputs/basic_inputs',
                    ],
                    'textarea' => [
                        'title' => esc_html__('Textarea Input', 'plugin-starter'),
                        'url' => '/settings/inputs/basic_inputs',
                    ],
                    'radio' => [
                        'title' => esc_html__('Radio Input', 'plugin-starter'),
                        'url' => '/settings/inputs/basic_inputs',
                    ],
                    'select' => [
                        'title' => esc_html__('Select Input', 'plugin-starter'),
                        'url' => '/settings/inputs/basic_inputs',
                    ],
                    'number' => [
                        'title' => esc_html__('Number Input', 'plugin-starter'),
                        'url' => '/settings/inputs/basic_inputs',
                    ],
                    'range' => [
                        'title' => esc_html__('Range Input', 'plugin-starter'),
                        'url' => '/settings/inputs/basic_inputs',
                    ],
                    'color' => [
                        'title' => esc_html__('Color Input', 'plugin-starter'),
                        'url' => '/settings/inputs/basic_inputs',
                    ],
                    'checkbox' => [
                        'title' => esc_html__('Checkbox Input', 'plugin-starter'),
                        'url' => '/settings/inputs/basic_inputs',
                    ],
                    'switch' => [
                        'title' => esc_html__('Switch Input', 'plugin-starter'),
                        'url' => '/settings/inputs/basic_inputs',
                    ],
                    'date' => [
                        'title' => esc_html__('Date Input', 'plugin-starter'),
                        'url' => '/settings/inputs/basic_inputs',
                    ],
                    'time' => [
                        'title' => esc_html__('Time Input', 'plugin-starter'),
                        'url' => '/settings/inputs/basic_inputs',
                    ],
                    'datetime' => [
                        'title' => esc_html__('Datetime Input', 'plugin-starter'),
                        'url' => '/settings/inputs/basic_inputs',
                    ],
                ],
                'array_inputs' => [
                    'checkbox' => [
                        'title' => esc_html__('Checkbox Input', 'plugin-starter'),
                        'url' => '/settings/inputs/array_inputs',
                    ],
                ],
                'complex_inputs' => [
                    'multiselect' => [
                        'title' => esc_html__('Multiselect Input', 'plugin-starter'),
                        'url' => '/settings/inputs/complex_inputs',
                    ],
                    'media' => [
                        'title' => esc_html__('Media Input', 'plugin-starter'),
                        'url' => '/settings/inputs/complex_inputs',
                    ],
                    'repeater' => [
                        'title' => esc_html__('Repeater Input', 'plugin-starter'),
                        'url' => '/settings/inputs/complex_inputs',
                    ],
                    'sortableaccordion' => [
                        'title' => esc_html__('Sortable Accordion Input', 'plugin-starter'),
                        'url' => '/settings/inputs/complex_inputs',
                    ],
                ],

            ],
            'utilities' => [
                'tools' => [
                    'hide_plugin' => [
                        'title' => esc_html__('Hide Plugin', 'plugin-starter'),
                        'intro' => esc_html__('Hide this plugin from plugin list.', 'plugin-starter'),
                        'url' => '/settings/utilities/tools',
                    ],
                    // 'self_defense' => false, // delete, uninstall, none
                    // 'delete_data_on' => 'none', // delete, uninstall, none
                ],
            ],
            'feedback' => [
                'title' => esc_html__('Feedback', 'plugin-starter'),
                'intro' => esc_html__('Share feedback, report issues, or suggest improvements.', 'plugin-starter'),
                'url' => '/feedback',

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

    /**
     * Default options filter (still dynamic)
     */
    public function modify_plugin_starter_default_tables( $opts ) {
        $defaults = [
            ['plugin_starter_logs'],
	    ];
        return wp_parse_args( $opts, $defaults );
    }
}