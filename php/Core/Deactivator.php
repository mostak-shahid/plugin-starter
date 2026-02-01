<?php

namespace MosPress\PluginStarter\Core;

/**
 * Fired during plugin deactivation
 *
 * @link       https://mostak-shahid.github.io/
 * @since      1.0.0
 *
 * @package    Plugin_Starter
 * @subpackage Plugin_Starter/includes
 */

/**
 * Fired during plugin deactivation.
 *
 * This class defines all code necessary to run during the plugin's deactivation.
 *
 * @since      1.0.0
 * @package    Plugin_Starter
 * @subpackage Plugin_Starter/includes
 * @author     Programmelab <mostak.shahid@gmail.com>
 */
class Deactivator
{
    /**
     * Run on plugin deactivation.
     *
     * This function is called when the plugin is deactivated.
     * It handles cleanup of custom tables and options.
     */
    public static function deactivate() {
        flush_rewrite_rules();
    }
}



