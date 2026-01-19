<?php
/**
 * WP-CLI Commands
 *
 * @package PluginStarter
 * @subpackage CLI
 */

namespace MosPress\PluginStarter\CLI;
use WP_CLI;

/**
 * Class CLI_Command
 *
 * Handles WP-CLI commands for Plugin Starter.
 */
class CLI_Command {

    /**
     * Seed the logs table with sample data.
     *
     * ## OPTIONS
     *
     * [--count=<number>]
     * : Number of log entries to create. Default: 10
     *
     * [--user-id=<id>]
     * : User ID for the logs. Default: 1
     *
     * [--ip=<address>]
     * : IP address for the logs. Default: ::1
     *
     * ## EXAMPLES
     *
     *     # Create 10 log entries (default)
     *     wp plugin-starter seed-logs
     *
     *     # Create 50 log entries
     *     wp plugin-starter seed-logs --count=50
     *
     *     # Create logs with custom user ID
     *     wp plugin-starter seed-logs --count=20 --user-id=5
     *
     * @param array $args       Positional arguments.
     * @param array $assoc_args Associative arguments.
     */
    public function seed_logs( $args, $assoc_args ) {
        global $wpdb;

        // Get parameters with defaults
        $count = isset( $assoc_args['count'] ) ? absint( $assoc_args['count'] ) : 10;
        $user_id = isset( $assoc_args['user-id'] ) ? absint( $assoc_args['user-id'] ) : 1;
        $ip = isset( $assoc_args['ip'] ) ? sanitize_text_field( $assoc_args['ip'] ) : '::1';
        
        $table_name = $wpdb->prefix . 'plugin_starter_logs';
        $user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36';

        // Check if table exists
        if ( $wpdb->get_var( "SHOW TABLES LIKE '{$table_name}'" ) !== $table_name ) {
            WP_CLI::error( "Table {$table_name} does not exist. Please activate the plugin first." );
            return;
        }

        // Verify user exists
        $user = get_user_by( 'ID', $user_id );
        if ( ! $user ) {
            WP_CLI::warning( "User ID {$user_id} does not exist, but continuing anyway..." );
        }

        WP_CLI::log( "Starting to seed {$count} log entries..." );

        $progress = \WP_CLI\Utils\make_progress_bar( 'Seeding logs', $count );

        $inserted = 0;
        $failed = 0;

        for ( $i = 1; $i <= $count; $i++ ) {
            $title = $this->generate_lorem_title();
            $description = $this->generate_lorem_description();
            $data = $this->generate_lorem_data();

            $result = $wpdb->insert(
                $table_name,
                array(
                    'user_id'     => $user_id,
                    'ip'          => $ip,
                    'user_agent'  => $user_agent,
                    'title'       => $title,
                    'description' => $description,
                    'data'        => $data,
                ),
                array(
                    '%d', // user_id
                    '%s', // ip
                    '%s', // user_agent
                    '%s', // title
                    '%s', // description
                    '%s', // data
                )
            );

            if ( $result ) {
                $inserted++;
            } else {
                $failed++;
                WP_CLI::debug( "Failed to insert log entry #{$i}: " . $wpdb->last_error );
            }

            $progress->tick();
        }

        $progress->finish();

        // Summary
        WP_CLI::success( sprintf(
            'Successfully inserted %d log entries. Failed: %d',
            $inserted,
            $failed
        ) );

        // Show sample of inserted data
        $this->show_sample_logs( 5 );
    }

    /**
     * Clear all logs from the table.
     *
     * ## OPTIONS
     *
     * [--yes]
     * : Skip confirmation prompt.
     *
     * ## EXAMPLES
     *
     *     # Clear logs with confirmation
     *     wp plugin-starter clear-logs
     *
     *     # Clear logs without confirmation
     *     wp plugin-starter clear-logs --yes
     *
     * @param array $args       Positional arguments.
     * @param array $assoc_args Associative arguments.
     */
    public function clear_logs( $args, $assoc_args ) {
        global $wpdb;

        $table_name = $wpdb->prefix . 'plugin_starter_logs';

        // Check if table exists
        if ( $wpdb->get_var( "SHOW TABLES LIKE '{$table_name}'" ) !== $table_name ) {
            WP_CLI::error( "Table {$table_name} does not exist." );
            return;
        }

        // Get count before deletion
        $count = $wpdb->get_var( "SELECT COUNT(*) FROM {$table_name}" );

        if ( $count == 0 ) {
            WP_CLI::warning( 'No logs found in the table.' );
            return;
        }

        // Confirmation prompt (unless --yes flag is set)
        if ( ! isset( $assoc_args['yes'] ) ) {
            WP_CLI::confirm(
                sprintf( 'Are you sure you want to delete %d log entries?', $count ),
                $assoc_args
            );
        }

        // Delete all rows
        $result = $wpdb->query( "TRUNCATE TABLE {$table_name}" );

        if ( false === $result ) {
            WP_CLI::error( 'Failed to clear logs: ' . $wpdb->last_error );
        } else {
            WP_CLI::success( sprintf( 'Successfully deleted %d log entries.', $count ) );
        }
    }

    /**
     * Show recent logs from the table.
     *
     * ## OPTIONS
     *
     * [--limit=<number>]
     * : Number of logs to display. Default: 10
     *
     * [--format=<format>]
     * : Output format (table, csv, json, yaml). Default: table
     *
     * ## EXAMPLES
     *
     *     # Show 10 recent logs
     *     wp plugin-starter show-logs
     *
     *     # Show 20 recent logs in JSON format
     *     wp plugin-starter show-logs --limit=20 --format=json
     *
     * @param array $args       Positional arguments.
     * @param array $assoc_args Associative arguments.
     */
    public function show_logs( $args, $assoc_args ) {
        global $wpdb;

        $limit = isset( $assoc_args['limit'] ) ? absint( $assoc_args['limit'] ) : 10;
        $format = isset( $assoc_args['format'] ) ? $assoc_args['format'] : 'table';
        
        $table_name = $wpdb->prefix . 'plugin_starter_logs';

        // Check if table exists
        if ( $wpdb->get_var( "SHOW TABLES LIKE '{$table_name}'" ) !== $table_name ) {
            WP_CLI::error( "Table {$table_name} does not exist." );
            return;
        }

        $results = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT ID, user_id, ip, title, LEFT(description, 50) as description, created_at 
                FROM {$table_name} 
                ORDER BY ID DESC 
                LIMIT %d",
                $limit
            ),
            ARRAY_A
        );

        if ( empty( $results ) ) {
            WP_CLI::warning( 'No logs found.' );
            return;
        }

        WP_CLI\Utils\format_items( $format, $results, array( 'ID', 'user_id', 'ip', 'title', 'description', 'created_at' ) );
    }

    /**
     * Generate a random Lorem Ipsum title.
     *
     * @return string
     */
    private function generate_lorem_title() {
        $titles = array(
            'Lorem ipsum dolor sit amet',
            'Consectetur adipiscing elit',
            'Sed do eiusmod tempor incididunt',
            'Ut labore et dolore magna',
            'Aliqua enim ad minim veniam',
            'Quis nostrud exercitation ullamco',
            'Laboris nisi ut aliquip',
            'Ex ea commodo consequat',
            'Duis aute irure dolor',
            'Reprehenderit in voluptate velit',
            'Esse cillum dolore eu fugiat',
            'Nulla pariatur excepteur sint',
            'Occaecat cupidatat non proident',
            'Sunt in culpa qui officia',
            'Deserunt mollit anim id',
        );

        return $titles[ array_rand( $titles ) ];
    }

    /**
     * Generate a random Lorem Ipsum description.
     *
     * @return string
     */
    private function generate_lorem_description() {
        $descriptions = array(
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
            'Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
            'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.',
            'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
        );

        return $descriptions[ array_rand( $descriptions ) ];
    }

    /**
     * Generate random Lorem Ipsum data (JSON format).
     *
     * @return string
     */
    private function generate_lorem_data() {
        $data = array(
            'status' => array_rand( array_flip( array( 'success', 'pending', 'failed', 'processing' ) ) ),
            'code' => rand( 100, 999 ),
            'message' => $this->generate_lorem_description(),
            'timestamp' => current_time( 'mysql' ),
            'metadata' => array(
                'source' => 'cli-seeder',
                'version' => '1.0.0',
                'random_value' => wp_generate_password( 12, false ),
            ),
        );

        return wp_json_encode( $data );
    }

    /**
     * Display sample of recently inserted logs.
     *
     * @param int $limit Number of logs to show.
     */
    private function show_sample_logs( $limit = 5 ) {
        global $wpdb;

        $table_name = $wpdb->prefix . 'plugin_starter_logs';

        $results = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT ID, title, created_at FROM {$table_name} ORDER BY ID DESC LIMIT %d",
                $limit
            ),
            ARRAY_A
        );

        if ( ! empty( $results ) ) {
            WP_CLI::log( "\nSample of inserted logs:" );
            WP_CLI\Utils\format_items( 'table', $results, array( 'ID', 'title', 'created_at' ) );
        }
    }
}