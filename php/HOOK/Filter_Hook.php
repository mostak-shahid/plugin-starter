<?php
namespace MosPress\PluginStarter\HOOK;
if ( ! defined( 'ABSPATH' ) ) exit;
class Filter_Hook
{
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
        add_filter( 'plugin_starter_default_options_modify', [$this, 'modify_plugin_starter_default_options'] );
    }
    public function modify_plugin_starter_default_options( $plugin_starter_default_options ) {
        $plugin_starter_default_options = [
            'more' => [
                'enable_scripts' => false,
                'css' => '/* CSS Code Here */',
                'js' => '// JavaScript Code Here',
                'header_content' => '<!-- Content inside HEAD tag -->',
                'footer_content' => '<!-- Content inside BODY tag -->',
                
            ],
            'tools' => [
                'delete_data_on' => 'none', // delete, unstall, none
            ],

        ];
        return $plugin_starter_default_options;
    }
}
