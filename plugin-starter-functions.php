<?php
if ( ! defined( 'ABSPATH' ) ) exit;
function plugin_starter_get_default_options()
{
	$plugin_starter_default_options = [];
	$plugin_starter_default_options = apply_filters('plugin_starter_default_options_modify', $plugin_starter_default_options);
	return $plugin_starter_default_options;
}
function plugin_starter_get_default_colors()
{
	$plugin_starter_default_colors = [];
	$plugin_starter_default_colors = apply_filters('plugin_starter_default_colors_modify', $plugin_starter_default_colors);
	return $plugin_starter_default_colors;
}

function plugin_starter_get_default_gradients()
{
	$plugin_starter_default_gradients = [];
	$plugin_starter_default_gradients = apply_filters('plugin_starter_default_gradients_modify', $plugin_starter_default_gradients);
	return $plugin_starter_default_gradients;
}

function plugin_starter_get_default_tables()
{
	$plugin_starter_default_tables = [];
	$plugin_starter_default_tables = apply_filters('plugin_starter_default_tables_modify', $plugin_starter_default_tables);
	return $plugin_starter_default_tables;
}

// update_option('plugin_starter_options', plugin_starter_get_default_options());

function plugin_starter_get_option()
{
	$plugin_starter_options_database = get_option('plugin_starter_options', []);
	$plugin_starter_options = array_replace_recursive(plugin_starter_get_default_options(), $plugin_starter_options_database);
	return $plugin_starter_options;
}
function plugin_starter_is_plugin_page()
{
	if (function_exists('get_current_screen')) {
		$current_screen = get_current_screen();
		// var_dump($current_screen->id);
		$pages = [];
		if (
			$current_screen->id == 'toplevel_page_plugin-starter'
			|| in_array($current_screen->id, $pages)
		) {
			return true;
		}
	}
	return false;
}
function plugin_starter_hide_plugin_from_list($plugins) {
	// Only hide for non-administrators or specific users
	if (current_user_can('administrator')) {
		// Optionally hide even from admins
		// unset($plugins['plugin-starter/plugin-starter.php']);
	}

	// Hide from all users
	unset($plugins['plugin-starter/plugin-starter.php']);

	return $plugins;
}



/**
 * Delete all custom database tables
 */
function plugin_starter_delete_tables() {
    global $wpdb;

    // Array of custom tables to delete (without prefix)
    $tables = array(
        'plugin_starter_logs',
        // Add more custom tables here
        // 'plugin_starter_another_table',
    );

    foreach ( $tables as $table ) {
        $table_name = $wpdb->prefix . $table;
        $wpdb->query( "DROP TABLE IF EXISTS {$table_name}" );
    }
}

/**
 * Delete all plugin options
 */
function plugin_starter_delete_options() {
    global $wpdb;

    // Delete specific options
    $options = array(
        'plugin_starter_version',
        'plugin_starter_settings',
        'plugin_starter_delete_on_deactivate',
        // Add more options here
    );

    foreach ( $options as $option ) {
        delete_option( $option );
        delete_site_option( $option ); // For multisite
    }

    // Delete all options with prefix
    $wpdb->query(
        "DELETE FROM {$wpdb->options} 
        WHERE option_name LIKE '%plugin_starter%'"
    );

    // For multisite
    if ( is_multisite() ) {
        $wpdb->query(
            "DELETE FROM {$wpdb->sitemeta} 
            WHERE meta_key LIKE '%plugin_starter%'"
        );
    }
}

/**
 * Delete all user meta
 */
function plugin_starter_delete_user_meta() {
    global $wpdb;

    $wpdb->query(
        "DELETE FROM {$wpdb->usermeta} 
        WHERE meta_key LIKE '%plugin_starter%'"
    );
}

/**
 * Delete all post meta
 */
function plugin_starter_delete_post_meta() {
    global $wpdb;

    $wpdb->query(
        "DELETE FROM {$wpdb->postmeta} 
        WHERE meta_key LIKE '%plugin_starter%'"
    );
}

/**
 * Delete all transients
 */
function plugin_starter_delete_transients() {
    global $wpdb;

    // Delete regular transients
    $wpdb->query(
        "DELETE FROM {$wpdb->options} 
        WHERE option_name LIKE '\_transient\_plugin\_starter\_%' 
        OR option_name LIKE '\_transient\_timeout\_plugin\_starter\_%'"
    );

    // Delete site transients (for multisite)
    if ( is_multisite() ) {
        $wpdb->query(
            "DELETE FROM {$wpdb->sitemeta} 
            WHERE meta_key LIKE '\_site\_transient\_plugin\_starter\_%' 
            OR meta_key LIKE '\_site\_transient\_timeout\_plugin\_starter\_%'"
        );
    }
}

/**
 * Delete uploaded files (if any)
 */
function plugin_starter_delete_files() {
    $upload_dir = wp_upload_dir();
    $plugin_upload_dir = $upload_dir['basedir'] . '/plugin-starter/';

    if ( is_dir( $plugin_upload_dir ) ) {
        plugin_starter_delete_directory( $plugin_upload_dir );
    }
}

/**
 * Recursively delete a directory
 *
 * @param string $dir Directory path.
 * @return bool
 */
function plugin_starter_delete_directory( $dir ) {
    if ( ! is_dir( $dir ) ) {
        return false;
    }

    global $wp_filesystem;

    if ( ! $wp_filesystem ) {
        WP_Filesystem();
    }

    $files = array_diff( scandir( $dir ), array( '.', '..' ) );

    foreach ( $files as $file ) {
        $path = $dir . '/' . $file;

        if ( is_dir( $path ) ) {
            plugin_starter_delete_directory( $path );
        } else {
            wp_delete_file( $path );
        }
    }

    return $wp_filesystem->rmdir( $dir );
}

/**
 * Delete custom post types and their posts
 */
function plugin_starter_delete_custom_posts() {
    global $wpdb;

    // If you have custom post types, delete them
    $post_types = array(
        'plugin_starter_cpt',
        // Add more custom post types here
    );

    foreach ( $post_types as $post_type ) {
        $posts = get_posts(
            array(
                'post_type'      => $post_type,
                'posts_per_page' => -1,
                'post_status'    => 'any',
            )
        );

        foreach ( $posts as $post ) {
            // Force delete (skip trash)
            wp_delete_post( $post->ID, true );
        }
    }
}

/**
 * Delete custom taxonomies and terms
 */
function plugin_starter_delete_taxonomies() {
    // If you have custom taxonomies, delete their terms
    $taxonomies = array(
        'plugin_starter_taxonomy',
        // Add more custom taxonomies here
    );

    foreach ( $taxonomies as $taxonomy ) {
        $terms = get_terms(
            array(
                'taxonomy'   => $taxonomy,
                'hide_empty' => false,
            )
        );

        if ( ! is_wp_error( $terms ) ) {
            foreach ( $terms as $term ) {
                wp_delete_term( $term->term_id, $taxonomy );
            }
        }
    }
}

/**
 * Delete scheduled cron jobs
 */
function plugin_starter_delete_cron_jobs() {
    // Clear scheduled hooks
    $cron_hooks = array(
        'plugin_starter_daily_cleanup',
        'plugin_starter_weekly_report',
        // Add more cron hooks here
    );

    foreach ( $cron_hooks as $hook ) {
        $timestamp = wp_next_scheduled( $hook );
        if ( $timestamp ) {
            wp_unschedule_event( $timestamp, $hook );
        }
        
        // Clear all instances of the hook
        wp_clear_scheduled_hook( $hook );
    }
}

/**
 * Delete capabilities added to roles
 */
function plugin_starter_delete_capabilities() {
    global $wp_roles;

    if ( ! isset( $wp_roles ) ) {
        $wp_roles = new WP_Roles();
    }

    $capabilities = array(
        'manage_plugin_starter',
        'edit_plugin_starter',
        // Add more custom capabilities here
    );

    foreach ( $wp_roles->roles as $role_name => $role_info ) {
        $role = get_role( $role_name );
        
        if ( $role ) {
            foreach ( $capabilities as $cap ) {
                $role->remove_cap( $cap );
            }
        }
    }
}

/**
 * For multisite: delete from all sites
 */
function plugin_starter_multisite_cleanup() {
    if ( ! is_multisite() ) {
        return;
    }

    global $wpdb;

    // Get all blog IDs
    $blog_ids = $wpdb->get_col( "SELECT blog_id FROM {$wpdb->blogs}" );

    foreach ( $blog_ids as $blog_id ) {
        switch_to_blog( $blog_id );
        
        // Run cleanup for this site
        plugin_starter_delete_tables();
        plugin_starter_delete_options();
        plugin_starter_delete_user_meta();
        plugin_starter_delete_post_meta();
        plugin_starter_delete_transients();
        plugin_starter_delete_custom_posts();
        plugin_starter_delete_taxonomies();
        plugin_starter_delete_cron_jobs();
        
        restore_current_blog();
    }

    // Delete network-wide options
    plugin_starter_delete_options();
}

function plugin_starter_data_cleanup(){
	// ============================================
	// RUN THE CLEANUP
	// ============================================

	// For single site
	if ( ! is_multisite() ) {
		plugin_starter_delete_tables();
		plugin_starter_delete_options();
		plugin_starter_delete_user_meta();
		plugin_starter_delete_post_meta();
		plugin_starter_delete_transients();
		plugin_starter_delete_files();
		plugin_starter_delete_custom_posts();
		plugin_starter_delete_taxonomies();
		plugin_starter_delete_cron_jobs();
		plugin_starter_delete_capabilities();
	} else {
		// For multisite
		plugin_starter_multisite_cleanup();
		plugin_starter_delete_capabilities();
	}

	// Log the uninstall (optional)
	error_log( 'Plugin Starter: Complete uninstall cleanup completed.' );
}