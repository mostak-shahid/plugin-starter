<?php
/**
 * Plugin Name: Plugin Starter
 * Description: WordPress plugin boilerplate with Semi UI + Tailwind + PSR-4
 * Version: 1.0.0
 * Author: Your Name
 * Text Domain: plugin-starter
 */

defined('ABSPATH') || exit;

require_once __DIR__ . '/vendor/autoload.php';

use MosPress\PluginStarter\Plugin;

Plugin::get_instance();
