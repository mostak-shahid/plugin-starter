<?php
namespace MosPress\PluginStarter\HOOK;
if ( ! defined( 'ABSPATH' ) ) exit;
class Action_Hook
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
    }
}
