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
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
	public static function deactivate()
	{
        // Clean up the deactivation key
        delete_option( 'plugin_starter_deactive_key' );

        // Flush rewrite rules
        flush_rewrite_rules();

        // Clean up transients
        delete_transient( 'plugin_starter_activation_notice' );

        // Log deactivation if debugging is enabled
        if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
            error_log( 'Plugin Starter deactivated and cleaned up' );
        }
	}
}



