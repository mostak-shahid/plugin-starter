<?php
/**
 * Database Seeder.
 */

namespace PluginStarter\Database;

use PluginStarter\Logging\Logger;

class Seeder {
    
    /**
     * Seed the database with initial data.
     */
    public function seed() {
        $this->seed_logs();
    }

    /**
     * Seed logs table with sample data.
     */
    private function seed_logs() {
        $logger = new Logger();

        $sample_logs = [
            [
                'type' => PLUGIN_STARTER_LOG_INFO,
                'message' => 'Plugin activated successfully',
            ],
            [
                'type' => PLUGIN_STARTER_LOG_SUCCESS,
                'message' => 'Default settings initialized',
            ],
            [
                'type' => PLUGIN_STARTER_LOG_INFO,
                'message' => 'Database tables created',
            ],
        ];

        foreach ($sample_logs as $log) {
            $logger->log($log['type'], $log['message']);
        }
    }
}