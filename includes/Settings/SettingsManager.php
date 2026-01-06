<?php
/**
 * Settings Manager.
 */

namespace PluginStarter\Settings;

use PluginStarter\Settings\DefaultSettings;
use PluginStarter\Utils\Sanitizer;
use PluginStarter\Utils\Validator;

class SettingsManager {
    
    /**
     * Get all settings.
     *
     * @return array
     */
    public function get_settings() {
        $settings = get_option(PLUGIN_STARTER_OPTION_NAME, []);
        $defaults = DefaultSettings::get();

        return wp_parse_args($settings, $defaults);
    }

    /**
     * Get a specific section settings.
     *
     * @param string $section Section name.
     * @return array
     */
    public function get_section($section) {
        $settings = $this->get_settings();
        return isset($settings[$section]) ? $settings[$section] : [];
    }

    /**
     * Save settings.
     *
     * @param array $new_settings New settings data.
     * @return bool
     */
    public function save_settings($new_settings) {
        $current_settings = $this->get_settings();
        
        // Merge with existing settings.
        $updated_settings = array_replace_recursive($current_settings, $new_settings);
        
        // Sanitize settings.
        $sanitized_settings = Sanitizer::sanitize_settings($updated_settings);
        
        // Update option.
        return update_option(PLUGIN_STARTER_OPTION_NAME, $sanitized_settings);
    }

    /**
     * Reset a section to defaults.
     *
     * @param string $section Section name.
     * @return bool
     */
    public function reset_section($section) {
        $current_settings = $this->get_settings();
        $defaults = DefaultSettings::get();

        if (isset($defaults[$section])) {
            $current_settings[$section] = $defaults[$section];
            return update_option(PLUGIN_STARTER_OPTION_NAME, $current_settings);
        }

        return false;
    }

    /**
     * Reset all settings to defaults.
     *
     * @return bool
     */
    public function reset_all() {
        $defaults = DefaultSettings::get();
        return update_option(PLUGIN_STARTER_OPTION_NAME, $defaults);
    }

    /**
     * Delete all settings.
     *
     * @return bool
     */
    public function delete_settings() {
        return delete_option(PLUGIN_STARTER_OPTION_NAME);
    }

    /**
     * Get default settings.
     *
     * @return array
     */
    public function get_defaults() {
        return DefaultSettings::get();
    }
}