<?php
/**
 * Main Plugin Class.
 */

namespace PluginStarter;

use PluginStarter\Core\Container;
use PluginStarter\Core\Loader;
use PluginStarter\Admin\Menu;
use PluginStarter\Admin\Assets;
use PluginStarter\Admin\ActionLinks;
use PluginStarter\Admin\Notices;
use PluginStarter\Api\RestRoutes;
use PluginStarter\Settings\SettingsManager;
use PluginStarter\Database\LogsTable;
use PluginStarter\Traits\Singleton;

class Plugin {
    use Singleton;

    /**
     * Dependency Injection Container.
     *
     * @var Container
     */
    private $container;

    /**
     * Hooks Loader.
     *
     * @var Loader
     */
    private $loader;

    /**
     * Plugin version.
     *
     * @var string
     */
    private $version;

    /**
     * Initialize the plugin.
     */
    protected function __construct() {
        $this->version = PLUGIN_STARTER_VERSION;
        $this->container = new Container();
        $this->loader = new Loader();
        
        $this->register_services();
        $this->define_hooks();
    }

    /**
     * Register services in the container.
     */
    private function register_services() {
        // Register core services.
        $this->container->singleton(SettingsManager::class, function($c) {
            return new SettingsManager();
        });

        $this->container->singleton(LogsTable::class, function($c) {
            return new LogsTable();
        });

        // Register admin services.
        $this->container->singleton(Menu::class, function($c) {
            return new Menu();
        });

        $this->container->singleton(Assets::class, function($c) {
            return new Assets();
        });

        $this->container->singleton(ActionLinks::class, function($c) {
            return new ActionLinks();
        });

        $this->container->singleton(Notices::class, function($c) {
            return new Notices();
        });

        // Register API services.
        $this->container->singleton(RestRoutes::class, function($c) {
            return new RestRoutes($c->make(SettingsManager::class));
        });
    }

    /**
     * Define all hooks.
     */
    private function define_hooks() {
        // Load text domain.
        $this->loader->add_action('init', $this, 'load_textdomain');

        // Admin hooks.
        if (is_admin()) {
            $menu = $this->container->make(Menu::class);
            $this->loader->add_action('admin_menu', $menu, 'register_menu');

            $assets = $this->container->make(Assets::class);
            $this->loader->add_action('admin_enqueue_scripts', $assets, 'enqueue_scripts');

            $action_links = $this->container->make(ActionLinks::class);
            $this->loader->add_filter('plugin_action_links_' . PLUGIN_STARTER_BASENAME, $action_links, 'add_action_links');

            $notices = $this->container->make(Notices::class);
            $this->loader->add_action('admin_init', $notices, 'remove_notices_on_plugin_pages');
        }

        // REST API hooks.
        $rest_routes = $this->container->make(RestRoutes::class);
        $this->loader->add_action('rest_api_init', $rest_routes, 'register_routes');
    }

    /**
     * Load plugin text domain.
     */
    public function load_textdomain() {
        load_plugin_textdomain(
            PLUGIN_STARTER_TEXT_DOMAIN,
            false,
            dirname(PLUGIN_STARTER_BASENAME) . '/languages/'
        );
    }

    /**
     * Run the loader to execute all hooks.
     */
    public function run() {
        $this->loader->run();
    }

    /**
     * Get the container instance.
     *
     * @return Container
     */
    public function get_container() {
        return $this->container;
    }

    /**
     * Get plugin version.
     *
     * @return string
     */
    public function get_version() {
        return $this->version;
    }
}