<?php
/**
 * Default Plugin Settings.
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

return apply_filters('plugin_starter_default_settings', [
    'base_inputs' => [
        'text_field' => 'Default text value',
        'email_field' => 'admin@example.com',
        'number_field' => 10,
        'textarea_field' => 'Default textarea content',
        'checkbox_field' => true,
        'radio_field' => 'option1',
        'select_field' => 'option2',
        'color_field' => '#0073aa',
        'date_field' => '',
        'url_field' => 'https://example.com',
    ],
    'array_inputs' => [
        'repeater_fields' => [
            [
                'title' => 'Item 1',
                'description' => 'Description for item 1',
                'enabled' => true,
            ],
            [
                'title' => 'Item 2',
                'description' => 'Description for item 2',
                'enabled' => false,
            ],
        ],
        'checkbox_group' => ['option1', 'option3'],
        'multi_select' => ['value1', 'value2'],
    ],
    'general' => [
        'enable_logging' => true,
        'enable_notifications' => false,
        'admin_email' => get_option('admin_email'),
        'items_per_page' => 20,
    ],
]);