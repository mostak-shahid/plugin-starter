<?php
/**
 * Logger Class.
 */

namespace PluginStarter\Logging;

class Logger {
    
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
     * Log a message.
     *
     * @param string $type Log type.
     * @param string $message Log message.
     * @param array $context Additional context.
     * @return int|false
     */
    public function log($type, $message, $context = []) {
        global $wpdb;

        $user_id = get_current_user_id();
        $ip = $this->get_client_ip();
        $user_agent = $this->parse_user_agent();

        $data = [
            'type' => $type,
            'message' => $message,
            'user_id' => $user_id ?: null,
            'ip' => $ip,
            'browser' => $user_agent['browser'],
            'platform' => $user_agent['platform'],
            'device' => $user_agent['device'],
            'created_at' => current_time('mysql'),
            'updated_at' => current_time('mysql'),
        ];

        $result = $wpdb->insert($this->table_name, $data);

        return $result ? $wpdb->insert_id : false;
    }

    /**
     * Log info message.
     *
     * @param string $message Log message.
     * @param array $context Additional context.
     * @return int|false
     */
    public function info($message, $context = []) {
        return $this->log(PLUGIN_STARTER_LOG_INFO, $message, $context);
    }

    /**
     * Log warning message.
     *
     * @param string $message Log message.
     * @param array $context Additional context.
     * @return int|false
     */
    public function warning($message, $context = []) {
        return $this->log(PLUGIN_STARTER_LOG_WARNING, $message, $context);
    }

    /**
     * Log error message.
     *
     * @param string $message Log message.
     * @param array $context Additional context.
     * @return int|false
     */
    public function error($message, $context = []) {
        return $this->log(PLUGIN_STARTER_LOG_ERROR, $message, $context);
    }

    /**
     * Log success message.
     *
     * @param string $message Log message.
     * @param array $context Additional context.
     * @return int|false
     */
    public function success($message, $context = []) {
        return $this->log(PLUGIN_STARTER_LOG_SUCCESS, $message, $context);
    }

    /**
     * Get client IP address.
     *
     * @return string
     */
    private function get_client_ip() {
        $ip = '';
        
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } elseif (!empty($_SERVER['REMOTE_ADDR'])) {
            $ip = $_SERVER['REMOTE_ADDR'];
        }

        return sanitize_text_field($ip);
    }

    /**
     * Parse user agent.
     *
     * @return array
     */
    private function parse_user_agent() {
        $user_agent = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '';

        return [
            'browser' => $this->get_browser($user_agent),
            'platform' => $this->get_platform($user_agent),
            'device' => $this->get_device($user_agent),
        ];
    }

    /**
     * Get browser from user agent.
     *
     * @param string $user_agent User agent string.
     * @return string
     */
    private function get_browser($user_agent) {
        if (strpos($user_agent, 'Firefox') !== false) {
            return 'Firefox';
        } elseif (strpos($user_agent, 'Chrome') !== false) {
            return 'Chrome';
        } elseif (strpos($user_agent, 'Safari') !== false) {
            return 'Safari';
        } elseif (strpos($user_agent, 'Edge') !== false) {
            return 'Edge';
        } elseif (strpos($user_agent, 'MSIE') !== false || strpos($user_agent, 'Trident') !== false) {
            return 'Internet Explorer';
        }
        return 'Unknown';
    }

    /**
     * Get platform from user agent.
     *
     * @param string $user_agent User agent string.
     * @return string
     */
    private function get_platform($user_agent) {
        if (strpos($user_agent, 'Windows') !== false) {
            return 'Windows';
        } elseif (strpos($user_agent, 'Mac') !== false) {
            return 'macOS';
        } elseif (strpos($user_agent, 'Linux') !== false) {
            return 'Linux';
        } elseif (strpos($user_agent, 'Android') !== false) {
            return 'Android';
        } elseif (strpos($user_agent, 'iOS') !== false || strpos($user_agent, 'iPhone') !== false || strpos($user_agent, 'iPad') !== false) {
            return 'iOS';
        }
        return 'Unknown';
    }

    /**
     * Get device from user agent.
     *
     * @param string $user_agent User agent string.
     * @return string
     */
    private function get_device($user_agent) {
        if (strpos($user_agent, 'Mobile') !== false || strpos($user_agent, 'Android') !== false || strpos($user_agent, 'iPhone') !== false) {
            return 'Mobile';
        } elseif (strpos($user_agent, 'Tablet') !== false || strpos($user_agent, 'iPad') !== false) {
            return 'Tablet';
        }
        return 'Desktop';
    }

    /**
     * Get logs.
     *
     * @param array $args Query arguments.
     * @return array
     */
    public function get_logs($args = []) {
        global $wpdb;

        $defaults = [
            'limit' => 20,
            'offset' => 0,
            'type' => null,
            'order_by' => 'created_at',
            'order' => 'DESC',
        ];

        $args = wp_parse_args($args, $defaults);

        $where = '1=1';
        if ($args['type']) {
            $where .= $wpdb->prepare(' AND type = %s', $args['type']);
        }

        $sql = "SELECT * FROM {$this->table_name} 
                WHERE {$where} 
                ORDER BY {$args['order_by']} {$args['order']} 
                LIMIT %d OFFSET %d";

        return $wpdb->get_results(
            $wpdb->prepare($sql, $args['limit'], $args['offset']),
            ARRAY_A
        );
    }

    /**
     * Clear logs.
     *
     * @param string|null $type Log type to clear (null for all).
     * @return bool
     */
    public function clear_logs($type = null) {
        global $wpdb;

        if ($type) {
            return $wpdb->delete($this->table_name, ['type' => $type]);
        }

        return $wpdb->query("TRUNCATE TABLE {$this->table_name}");
    }
}