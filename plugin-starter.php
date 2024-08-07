<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://www.mdmostakshahid.com/
 * @since             1.0.0
 * @package           Plugin_Starter
 *
 * @wordpress-plugin
 * Plugin Name:       Plugin Starter
 * Plugin URI:        https://https://www.mdmostakshahid.com/plugin-starter/
 * Description:       Plugin starter boilerplate for WordPress
 * Version:           1.0.0
 * Author:            Md. Mostak Shahid
 * Author URI:        https://www.mdmostakshahid.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       plugin-starter
 * Domain Path:       /languages
 */


use Automattic\WooCommerce\Admin\BlockTemplates\BlockTemplateInterface;
use Automattic\WooCommerce\Admin\Features\ProductBlockEditor\ProductTemplates\ProductFormTemplateInterface;
use Automattic\WooCommerce\Admin\Features\ProductBlockEditor\BlockRegistry;

// If this file is called directly, abort.
if (!defined('WPINC')) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define('PLUGIN_STARTER_VERSION', '1.0.0');
define('PLUGIN_STARTER_NAME', __('Plugin Starter', 'plugin-starter'));

define( 'PLUGIN_STARTER_PATH', plugin_dir_path( __FILE__ ) );
define( 'PLUGIN_STARTER_URL', plugin_dir_url( __FILE__ ) );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-plugin-starter-activator.php
 */
function plugin_starter_activate()
{
	require_once PLUGIN_STARTER_PATH . 'includes/class-plugin-starter-activator.php';
	Plugin_Starter_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-plugin-starter-deactivator.php
 */
function plugin_starter_deactivate()
{
	require_once PLUGIN_STARTER_PATH . 'includes/class-plugin-starter-deactivator.php';
	Plugin_Starter_Deactivator::deactivate();
}

register_activation_hook(__FILE__, 'plugin_starter_activate');
register_deactivation_hook(__FILE__, 'plugin_starter_deactivate');

// require PLUGIN_STARTER_PATH . '/vendor/autoload.php';
/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require PLUGIN_STARTER_PATH . 'includes/class-plugin-starter.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function plugin_starter_run()
{

	$plugin = new Plugin_Starter();
	$plugin->run();
}
plugin_starter_run();






/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function plugin_starter_extension_block_init()
{
	if (isset($_GET['page']) && $_GET['page'] === 'wc-admin') {
		BlockRegistry::get_instance()->register_block_type_from_metadata(__DIR__ . '/build/woocommerce/min-quantity');
		BlockRegistry::get_instance()->register_block_type_from_metadata(__DIR__ . '/build/woocommerce/max-quantity');
	}
}
add_action('init', 'plugin_starter_extension_block_init');

function plugin_starter_extension_add_block_to_product_editor(BlockTemplateInterface $template)
{
	if ($template instanceof ProductFormTemplateInterface && 'simple-product' === $template->get_id()) {
		$basic_details = $template->get_section_by_id('basic-details');

		if ($basic_details) {
			$basic_details->add_block(
				[
					'id' 	     => 'plugin-starter-min-quantity-block',
					'order'	     => 40,
					'blockName'  => 'plugin-starter/min-quantity-block',
					'attributes' => [
						'message' => 'Min Max Tutorial',
					]
				]
			);
			$basic_details->add_block(
				[
					'id' 	     => 'plugin-starter-max-quantity-block',
					'order'	     => 40,
					'blockName'  => 'plugin-starter/max-quantity-block',
					'attributes' => [
						'message' => 'Min Max Tutorial',
					]
				]
			);
		}
	}
}
add_filter('woocommerce_block_template_register', 'plugin_starter_extension_add_block_to_product_editor', 100);




function plugin_starter_create_block_block_init() {
	register_block_type( __DIR__ . '/build/blocks/row' );
	register_block_type( __DIR__ . '/build/blocks/column' );
	register_block_type( __DIR__ . '/build/blocks/section' );
	register_block_type( __DIR__ . '/build/blocks/recent-posts', array(
        'render_callback' => 'plugin_starter_gutenberg_examples_dynamic_render_callback'
    ) );
}
add_action( 'init', 'plugin_starter_create_block_block_init' );

function plugin_starter_gutenberg_examples_dynamic_render_callback( $attr , $content ) {
	$html = '';
    $recent_posts = wp_get_recent_posts( array(
        'numberposts' => (@$attr['numberOfItems'])?$attr['numberOfItems']:3,
        'post_status' => 'publish',
    ) );
    if ( count( $recent_posts ) === 0 ) {
        return 'No posts';
    }
	$html .= '<ul>';
	foreach($recent_posts as $post){
		$html .= '<li><a class="wp-block-my-plugin-latest-post" href="'.get_permalink( $post['ID'] ).'">'.get_the_title($post['ID']).'</a></li>';
	}
	$html .= '<ul>';
	return $html;
}
function plugin_starter_register_blocks_category( $categories ) {
	$categories[] = array(
		'slug'  => 'plugin-starter-blocks', 
		'title' => 'Starter Blocks',
		'icon' => NULL,
	);
	// var_dump($categories);

	return $categories;
}


if ( version_compare( get_bloginfo( 'version' ), '5.8', '>=' ) ) {
	add_filter( 'block_categories_all', 'plugin_starter_register_blocks_category' );
} else {
	add_filter( 'block_categories', 'plugin_starter_register_blocks_category' );
}



