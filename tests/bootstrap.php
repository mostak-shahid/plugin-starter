<?php
/**
 * PHPUnit bootstrap file.
 */

// Define test environment.
define('PLUGIN_STARTER_TESTS', true);

// Load Composer autoloader.
require_once dirname(__DIR__) . '/vendor/autoload.php';

// WordPress tests directory.
$_tests_dir = getenv('WP_TESTS_DIR');

if (!$_tests_dir) {
    $_tests_dir = rtrim(sys_get_temp_dir(), '/\\') . '/wordpress-tests-lib';
}

if (!file_exists($_tests_dir . '/includes/functions.php')) {
    echo "Could not find $_tests_dir/includes/functions.php\n";
    exit(1);
}

// Load WordPress test functions.
require_once $_tests_dir . '/includes/functions.php';

/**
 * Manually load the plugin.
 */
function _manually_load_plugin() {
    require dirname(__DIR__) . '/plugin-starter.php';
}
tests_add_filter('muplugins_loaded', '_manually_load_plugin');

// Start up the WordPress testing environment.
require $_tests_dir . '/includes/bootstrap.php';