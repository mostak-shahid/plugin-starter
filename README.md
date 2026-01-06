# Plugin Starter

A comprehensive WordPress plugin boilerplate featuring React, PSR-4, REST API, wp-scripts, and modern development practices.

## Features

### 🎨 Modern Admin Interface
- **React-powered Dashboard** with stats and activity feed
- **Base Inputs Settings** - All standard WordPress input types
- **Array Inputs Settings** - Repeater fields, checkbox groups, multi-select
- **Feedback Form** - User feedback with email notifications

### 🏗️ Architecture
- **PSR-4 Autoloading** - Modern PHP class organization
- **Dependency Injection** - Built-in DI container
- **Hooks Loader** - Organized action and filter registration
- **Custom REST API** - Dedicated endpoints for settings and feedback
- **Custom Database Tables** - Logging system with user tracking

### 🛠️ Developer Experience
- **wp-scripts Build System** - WordPress-optimized JavaScript bundling
- **Hot Module Replacement** - Instant development feedback
- **WordPress Components** - Leverage @wordpress/components
- **Unit Testing** - PHPUnit test structure included
- **Code Standards** - WordPress Coding Standards compliant
- **WordPress.org Ready** - Optimized for plugin directory submission

## Requirements

- WordPress 5.8 or higher
- PHP 7.4 or higher
- Node.js 16+ and npm
- Composer

## Installation

### For Development

1. Clone the repository:
```bash
git clone https://github.com/mostak-shahid/plugin-starter.git
cd plugin-starter
```

2. Install PHP dependencies:
```bash
composer install
```

3. Install JavaScript dependencies:
```bash
npm install
```

4. Build assets:
```bash
# Development with watch mode
npm run start

# Production build
npm run build
```

5. Activate the plugin in WordPress

### For Production

1. Download the latest release
2. Upload to `/wp-content/plugins/plugin-starter`
3. Activate through the WordPress admin

## Usage

### Admin Pages

After activation, you'll be redirected to the Plugin Starter Dashboard. The plugin adds the following admin pages:

- **Dashboard** - Overview with stats and quick actions
- **Base Inputs** - Configure standard input fields
- **Array Inputs** - Manage repeater fields and multi-select options
- **Feedback** - Submit feedback to the site admin

### Extending Default Settings

Use the filter hook to modify default settings:

```php
add_filter('plugin_starter_default_settings', function($defaults) {
    $defaults['base_inputs']['text_field'] = 'Custom default value';
    return $defaults;
});
```

### Adding Custom REST API Endpoints

1. Create a new controller in `includes/Api/`:

```php
<?php
namespace PluginStarter\Api;

use WP_REST_Controller;

class CustomController extends WP_REST_Controller {
    public function register_routes() {
        register_rest_route('plugin-starter/v1', '/custom', [
            'methods' => 'GET',
            'callback' => [$this, 'get_custom_data'],
            'permission_callback' => '__return_true',
        ]);
    }

    public function get_custom_data($request) {
        return ['message' => 'Custom endpoint'];
    }
}
```

2. Register in `includes/Api/RestRoutes.php`

### Using the Logger

```php
use PluginStarter\Logging\Logger;

$logger = new Logger();
$logger->info('Information message');
$logger->success('Success message');
$logger->warning('Warning message');
$logger->error('Error message');
```

### Using the DI Container

```php
$container = Plugin::get_instance()->get_container();
$settings = $container->make(SettingsManager::class);
```

## Development

### Project Structure

```
plugin-starter/
├── includes/          # PHP classes (PSR-4)
├── src/              # React source files
├── build/            # Compiled assets
├── templates/        # PHP templates
├── config/           # Configuration files
├── tests/            # Unit tests
├── assets/           # Static assets
└── languages/        # Translation files
```

### NPM Scripts

```bash
npm run start    # Start development server with HMR
npm run build    # Build for production
npm run packages-update  # Update WordPress packages
```

### Composer Scripts

```bash
composer test    # Run PHPUnit tests
composer phpcs   # Check coding standards
composer phpcbf  # Fix coding standards
```

### Running Tests

1. Set up WordPress test suite:
```bash
bash bin/install-wp-tests.sh wordpress_test root '' localhost latest
```

2. Run tests:
```bash
composer test
```

## REST API Endpoints

### Settings

- **GET** `/wp-json/plugin-starter/v1/settings` - Get all settings
- **POST** `/wp-json/plugin-starter/v1/settings` - Save settings
- **POST** `/wp-json/plugin-starter/v1/settings/reset/{section}` - Reset a section
- **POST** `/wp-json/plugin-starter/v1/settings/reset-all` - Reset all settings

### Feedback

- **POST** `/wp-json/plugin-starter/v1/feedback` - Submit feedback

## Database Schema

### Logs Table (`wp_plugin_starter_logs_table`)

| Column | Type | Description |
|--------|------|-------------|
| id | bigint(20) | Primary key |
| type | varchar(50) | Log type (info, warning, error, success) |
| message | text | Log message |
| user_id | bigint(20) | WordPress user ID |
| ip | varchar(45) | IP address |
| browser | varchar(255) | Browser name |
| platform | varchar(100) | Operating system |
| device | varchar(100) | Device type |
| created_at | datetime | Creation timestamp |
| updated_at | datetime | Update timestamp |

## Hooks & Filters

### Filters

- `plugin_starter_default_settings` - Modify default plugin settings

### Actions

All WordPress actions and filters are registered through the Hooks Loader system in `includes/Core/Loader.php`.

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Follow WordPress Coding Standards
4. Write unit tests for new features
5. Submit a pull request

## License

GPL-2.0+ - See LICENSE file for details.

## Credits

Created by [Md. Mostak Shahid](https://mostak-shahid.github.io/)

## Support

- Documentation: [https://mostak-shahid.github.io/plugin-starter/](https://mostak-shahid.github.io/plugin-starter/)
- Issues: [GitHub Issues](https://github.com/mostak-shahid/plugin-starter/issues)

## Changelog

### 1.0.0
- Initial release
- React-based admin interface
- Custom REST API endpoints
- Settings management system
- Feedback form with email
- Custom logging table
- Unit test structure
- PSR-4 autoloading
- Dependency injection container