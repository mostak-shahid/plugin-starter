<?php

namespace MosPress\PluginStarter;

defined('ABSPATH') || exit;

class Plugin {

    private static $instance = null;

    public static function get_instance() {
        if (self::$instance === null) {
            self::$instance = new self();
            self::$instance->init();
        }
        return self::$instance;
    }

    public function init() {
        add_action('admin_menu', [$this, 'register_admin_page']);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_assets']);
    }

    public function register_admin_page() {
        add_menu_page(
            'Plugin Starter',
            'Plugin Starter',
            'manage_options',
            'plugin-starter',
            [AdminPage::class, 'render'],
            'dashicons-admin-generic',
            26
        );
    }

    public function enqueue_assets($hook) {

        if ($hook !== 'toplevel_page_plugin-starter') {
            return;
        }

        $asset_path = plugin_dir_path(__DIR__) . 'assets/build/';

        wp_enqueue_style(
            'plugin-starter-style',
            plugins_url('assets/build/app.css', dirname(__FILE__)),
            [],
            filemtime($asset_path . 'app.css')
        );

        wp_enqueue_script(
            'plugin-starter-script',
            plugins_url('assets/build/app.js', dirname(__FILE__)),
            [],
            filemtime($asset_path . 'app.js'),
            true
        );
    }
}
