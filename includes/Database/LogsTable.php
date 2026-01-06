<?php
/**
 * Logs Table Schema.
 */

namespace PluginStarter\Database;

class LogsTable {
    
    /**
     * Table name.
     *
     * @var string
     */
    private $table_name;

    /**
     * Constructor.
     */
    public function __construct() {
        global $wpdb;
        $this->table_name = $wpdb->prefix . PLUGIN_STARTER_LOGS_TABLE;
    }

    /**
     * Create the logs table.
     */
    public function create() {
        global $wpdb;

        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE IF NOT EXISTS {$this->table_name} (
            id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
            type varchar(50) NOT NULL DEFAULT 'info',
            message text NOT NULL,
            user_id bigint(20) unsigned DEFAULT NULL,
            ip varchar(45) DEFAULT NULL,
            browser varchar(255) DEFAULT NULL,
            platform varchar(100) DEFAULT NULL,
            device varchar(100) DEFAULT NULL,
            created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY type (type),
            KEY user_id (user_id),
            KEY created_at (created_at)
        ) $charset_collate;";

        require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        dbDelta($sql);
    }

    /**
     * Drop the logs table.
     */
    public function drop() {
        global $wpdb;
        $wpdb->query("DROP TABLE IF EXISTS {$this->table_name}");
    }

    /**
     * Get table name.
     *
     * @return string
     */
    public function get_table_name() {
        return $this->table_name;
    }
}