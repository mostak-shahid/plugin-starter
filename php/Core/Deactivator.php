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
        // Only run cleanup if user has chosen to delete data on deactivation
        // Check if cleanup option is enabled (recommended to ask user first)
        $delete_on_deactivate = get_option( 'plugin_starter_delete_on_deactivate', false );

        if ( $delete_on_deactivate ) {
            self::cleanup_database();
            self::cleanup_options();
        }

        // Always flush rewrite rules
        flush_rewrite_rules();
    }

    /**
     * Delete custom database tables.
     */
    private static function cleanup_database() {
        global $wpdb;

        // Array of custom tables to delete (without prefix)
        $tables = array(
            'plugin_starter_logs',
            // Add more custom tables here if you have them
            // 'plugin_starter_another_table',
            // 'plugin_starter_yet_another_table',
        );

        foreach ( $tables as $table ) {
            $table_name = $wpdb->prefix . $table;
            
            // Check if table exists before dropping
            if ( $wpdb->get_var( "SHOW TABLES LIKE '{$table_name}'" ) === $table_name ) {
                $wpdb->query( "DROP TABLE IF EXISTS {$table_name}" );
                
                // Log the deletion (optional)
                error_log( sprintf( 'Plugin Starter: Deleted table %s', $table_name ) );
            }
        }
    }

    /**
     * Delete plugin options from wp_options table.
     */
    private static function cleanup_options() {
        // Array of option names to delete
        $options = array(
            'plugin_starter_version',
            'plugin_starter_settings',
            'plugin_starter_delete_on_deactivate',
            // Add more options here
            // 'plugin_starter_api_key',
            // 'plugin_starter_custom_option',
        );

        foreach ( $options as $option ) {
            delete_option( $option );
            
            // Also delete site option for multisite
            delete_site_option( $option );
        }

        // Delete options with specific prefix using SQL
        // This is useful if you have many options with the same prefix
        global $wpdb;
        $wpdb->query(
            "DELETE FROM {$wpdb->options} 
            WHERE option_name LIKE 'plugin\_starter\_%'"
        );

        // For multisite, also clean up site options
        if ( is_multisite() ) {
            $wpdb->query(
                "DELETE FROM {$wpdb->sitemeta} 
                WHERE meta_key LIKE 'plugin\_starter\_%'"
            );
        }
    }

    /**
     * Alternative: Ask user before cleanup.
     * Call this in your plugin settings page.
     */
    public static function maybe_enable_cleanup() {
        // Check if form was submitted
        if ( isset( $_POST['plugin_starter_cleanup_nonce'] ) 
            && wp_verify_nonce( $_POST['plugin_starter_cleanup_nonce'], 'plugin_starter_cleanup' ) 
        ) {
            $delete_on_deactivate = isset( $_POST['delete_on_deactivate'] ) ? true : false;
            update_option( 'plugin_starter_delete_on_deactivate', $delete_on_deactivate );
        }
    }

    /**
     * Complete cleanup - for uninstall (not deactivation).
     * This should be in uninstall.php instead.
     */
    public static function complete_cleanup() {
        self::cleanup_database();
        self::cleanup_options();
        
        // Delete user meta
        self::cleanup_user_meta();
        
        // Delete post meta
        self::cleanup_post_meta();
        
        // Delete transients
        self::cleanup_transients();
    }

    /**
     * Delete user meta data.
     */
    private static function cleanup_user_meta() {
        global $wpdb;
        
        $wpdb->query(
            "DELETE FROM {$wpdb->usermeta} 
            WHERE meta_key LIKE 'plugin\_starter\_%'"
        );
    }

    /**
     * Delete post meta data.
     */
    private static function cleanup_post_meta() {
        global $wpdb;
        
        $wpdb->query(
            "DELETE FROM {$wpdb->postmeta} 
            WHERE meta_key LIKE 'plugin\_starter\_%'"
        );
    }

    /**
     * Delete transients.
     */
    private static function cleanup_transients() {
        global $wpdb;
        
        // Delete transients
        $wpdb->query(
            "DELETE FROM {$wpdb->options} 
            WHERE option_name LIKE '\_transient\_plugin\_starter\_%' 
            OR option_name LIKE '\_transient\_timeout\_plugin\_starter\_%'"
        );

        // For multisite
        if ( is_multisite() ) {
            $wpdb->query(
                "DELETE FROM {$wpdb->sitemeta} 
                WHERE meta_key LIKE '\_site\_transient\_plugin\_starter\_%' 
                OR meta_key LIKE '\_site\_transient\_timeout\_plugin\_starter\_%'"
            );
        }
    }
}



