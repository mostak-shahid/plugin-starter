<?php
/**
 * Singleton Trait.
 */

namespace PluginStarter\Traits;

trait Singleton {
    
    /**
     * Instance of this class.
     *
     * @var object
     */
    private static $instance = null;

    /**
     * Get the singleton instance.
     *
     * @return object
     */
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Prevent cloning.
     */
    private function __clone() {}

    /**
     * Prevent unserializing.
     */
    public function __wakeup() {
        throw new \Exception('Cannot unserialize singleton');
    }
}