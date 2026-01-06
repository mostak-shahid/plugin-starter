<?php
/**
 * Validation Utilities.
 */

namespace PluginStarter\Utils;

class Validator {
    
    /**
     * Validate email.
     *
     * @param string $email Email address.
     * @return bool
     */
    public static function validate_email($email) {
        return is_email($email);
    }

    /**
     * Validate URL.
     *
     * @param string $url URL.
     * @return bool
     */
    public static function validate_url($url) {
        return filter_var($url, FILTER_VALIDATE_URL) !== false;
    }

    /**
     * Validate required field.
     *
     * @param mixed $value Field value.
     * @return bool
     */
    public static function validate_required($value) {
        return !empty($value);
    }

    /**
     * Validate minimum length.
     *
     * @param string $value Field value.
     * @param int $min Minimum length.
     * @return bool
     */
    public static function validate_min_length($value, $min) {
        return strlen($value) >= $min;
    }

    /**
     * Validate maximum length.
     *
     * @param string $value Field value.
     * @param int $max Maximum length.
     * @return bool
     */
    public static function validate_max_length($value, $max) {
        return strlen($value) <= $max;
    }

    /**
     * Validate numeric value.
     *
     * @param mixed $value Value to validate.
     * @return bool
     */
    public static function validate_numeric($value) {
        return is_numeric($value);
    }

    /**
     * Validate integer value.
     *
     * @param mixed $value Value to validate.
     * @return bool
     */
    public static function validate_integer($value) {
        return filter_var($value, FILTER_VALIDATE_INT) !== false;
    }
}