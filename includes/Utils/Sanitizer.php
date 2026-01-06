<?php
/**
 * Sanitization Utilities.
 */

namespace PluginStarter\Utils;

class Sanitizer {
    
    /**
     * Sanitize settings data.
     *
     * @param array $settings Settings data.
     * @return array
     */
    public static function sanitize_settings($settings) {
        $sanitized = [];

        foreach ($settings as $key => $value) {
            if (is_array($value)) {
                $sanitized[$key] = self::sanitize_settings($value);
            } else {
                $sanitized[$key] = self::sanitize_value($value, $key);
            }
        }

        return $sanitized;
    }

    /**
     * Sanitize a single value.
     *
     * @param mixed $value Value to sanitize.
     * @param string $key Value key.
     * @return mixed
     */
    private static function sanitize_value($value, $key) {
        // Email fields.
        if (strpos($key, 'email') !== false) {
            return sanitize_email($value);
        }

        // URL fields.
        if (strpos($key, 'url') !== false) {
            return esc_url_raw($value);
        }

        // Number fields.
        if (strpos($key, 'number') !== false || is_numeric($value)) {
            return absint($value);
        }

        // Boolean fields.
        if (is_bool($value) || $value === 'true' || $value === 'false') {
            return filter_var($value, FILTER_VALIDATE_BOOLEAN);
        }

        // Color fields.
        if (strpos($key, 'color') !== false) {
            return sanitize_hex_color($value);
        }

        // Textarea fields.
        if (strpos($key, 'textarea') !== false || strpos($key, 'description') !== false) {
            return sanitize_textarea_field($value);
        }

        // Default: text field.
        return sanitize_text_field($value);
    }

    /**
     * Sanitize email.
     *
     * @param string $email Email address.
     * @return string
     */
    public static function sanitize_email_field($email) {
        return sanitize_email($email);
    }

    /**
     * Sanitize textarea.
     *
     * @param string $text Textarea content.
     * @return string
     */
    public static function sanitize_textarea($text) {
        return sanitize_textarea_field($text);
    }

    /**
     * Sanitize URL.
     *
     * @param string $url URL.
     * @return string
     */
    public static function sanitize_url($url) {
        return esc_url_raw($url);
    }

    /**
     * Sanitize array of values.
     *
     * @param array $array Array to sanitize.
     * @return array
     */
    public static function sanitize_array($array) {
        return array_map('sanitize_text_field', $array);
    }
}