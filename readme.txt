=== Plugin Starter ===
Contributors: mostakshahid
Tags: starter, boilerplate, react, psr-4, rest-api
Requires at least: 5.8
Tested up to: 6.4
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPL-2.0+
License URI: http://www.gnu.org/licenses/gpl-2.0.txt

Plugin starter boilerplate for WordPress with React, PSR-4, REST API, and modern development practices.

== Description ==

Plugin Starter is a comprehensive boilerplate for WordPress plugin development featuring:

* **React-based Admin Interface** - Three React-powered admin pages (Dashboard, Base Inputs, Array Inputs)
* **PSR-4 Autoloading** - Modern PHP class structure with Composer
* **REST API** - Custom REST API endpoints for settings management
* **Dependency Injection** - Built-in DI container for better code organization
* **Custom Database Tables** - Logging system with custom table
* **Email Integration** - Feedback form with email notifications
* **wp-scripts Build System** - WordPress-optimized build tooling for React
* **Unit Testing** - PHPUnit test structure included
* **WordPress.org Ready** - Optimized for WordPress.org submission

== Features ==

= Admin Dashboard =
* Quick stats overview
* Recent activity feed
* Quick action buttons
* Getting started guide

= Settings Management =
* Base input types (text, email, number, textarea, checkbox, radio, select, color, date, URL)
* Array inputs (repeater fields, checkbox groups, multi-select)
* Save, reset section, and reset all functionality
* Default settings with filter hooks for extensibility

= Feedback System =
* User-friendly feedback form
* Email notifications to admin
* AJAX submission

= Logging System =
* Custom logs table
* Track user actions
* Browser, platform, and device detection
* IP address logging

= Developer Features =
* PSR-4 autoloading
* Dependency injection container
* Hooks loader system
* REST API controllers
* Unit test structure
* WordPress Coding Standards compliant

== Installation ==

1. Upload the plugin files to `/wp-content/plugins/plugin-starter` directory
2. Run `composer install` to install PHP dependencies
3. Run `npm install` to install JavaScript dependencies
4. Run `npm run build` to compile React assets
5. Activate the plugin through the 'Plugins' screen in WordPress
6. Navigate to 'Plugin Starter' in the admin menu

== Frequently Asked Questions ==

= How do I customize the default settings? =

Use the `plugin_starter_default_settings` filter hook:

`
add_filter('plugin_starter_default_settings', function($defaults) {
    $defaults['base_inputs']['text_field'] = 'My custom value';
    return $defaults;
});
`

= How do I add custom REST API endpoints? =

Create a new controller in `includes/Api/` and register it in `includes/Api/RestRoutes.php`.

= How do I run the tests? =

Run `composer test` or `vendor/bin/phpunit` after setting up the WordPress test suite.

== Screenshots ==

1. Dashboard page with stats and quick actions
2. Base inputs settings page
3. Array inputs with repeater fields
4. Feedback form

== Changelog ==

= 1.0.0 =
* Initial release
* React-based admin interface
* Custom REST API endpoints
* Settings management system
* Feedback form with email
* Custom logging table
* Unit test structure
* PSR-4 autoloading
* Dependency injection container

== Upgrade Notice ==

= 1.0.0 =
Initial release of Plugin Starter.

== Development ==

= Building Assets =
* Development: `npm run start`
* Production: `npm run build`

= Running Tests =
* PHP: `composer test`
* Code Standards: `composer phpcs`

= Directory Structure =
* `/includes` - PHP classes (PSR-4)
* `/src` - React source files
* `/build` - Compiled React assets
* `/templates` - PHP template files
* `/config` - Configuration files
* `/tests` - Unit and integration tests

For more information, visit [https://mostak-shahid.github.io/plugin-starter/](https://mostak-shahid.github.io/plugin-starter/)