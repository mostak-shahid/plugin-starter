<?php
/**
 * Settings Manager Test.
 */

namespace PluginStarter\Tests\Unit;

use PHPUnit\Framework\TestCase;
use PluginStarter\Settings\SettingsManager;
use PluginStarter\Settings\DefaultSettings;

class SettingsTest extends TestCase {
    
    private $settings_manager;

    public function setUp(): void {
        parent::setUp();
        $this->settings_manager = new SettingsManager();
    }

    public function test_get_settings_returns_array() {
        $settings = $this->settings_manager->get_settings();
        $this->assertIsArray($settings);
    }

    public function test_get_defaults_returns_array() {
        $defaults = $this->settings_manager->get_defaults();
        $this->assertIsArray($defaults);
        $this->assertArrayHasKey('base_inputs', $defaults);
        $this->assertArrayHasKey('array_inputs', $defaults);
    }

    public function test_get_section_returns_array() {
        $section = $this->settings_manager->get_section('base_inputs');
        $this->assertIsArray($section);
    }

    public function test_save_settings() {
        $test_data = [
            'base_inputs' => [
                'text_field' => 'Test Value'
            ]
        ];
        
        $result = $this->settings_manager->save_settings($test_data);
        $this->assertTrue($result);
    }

    public function test_reset_section() {
        $result = $this->settings_manager->reset_section('base_inputs');
        $this->assertTrue($result);
    }

    public function test_reset_all() {
        $result = $this->settings_manager->reset_all();
        $this->assertTrue($result);
    }
}