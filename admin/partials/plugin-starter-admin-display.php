<?php
// If this file is called directly, abort.
if (!defined('ABSPATH')) die;
$actual_link = (empty($_SERVER['HTTPS']) ? 'http' : 'https') . "://" . (isset($_SERVER['HTTP_HOST']) && isset($_SERVER['REQUEST_URI'])) ? sanitize_text_field(wp_unslash($_SERVER['HTTP_HOST'])) . sanitize_text_field(wp_unslash($_SERVER['REQUEST_URI'])) : '';

?>
<div class="plugin-starter-settings-wrapper">
    <form action='options.php' method='post'>
        <div class="plugin-starter-settings-container">
            <div class="plugin-starter-settings">
                <div class="part-title">
                    <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
                </div>
                <div class="part-options">
                    <?php
                    settings_errors();
                    settings_fields('plugin_starter_settings');
                    do_settings_sections('plugin_starter_settings');
                    ?>
                </div>
            </div>
        </div>
        <?php //submit_button(); ?>
        <p class="submit">
            <input type="submit" name="submit" id="submit" class="button button-primary" value="<?php echo esc_html__('Save Changes','plugin-starter')?>">
            <button class="button button-reset button-secondary" data-name="all" data-url="<?php echo esc_url($actual_link) ?>"><?php echo esc_html__('Reset','plugin-starter')?></button>
        </p>
    </form>
</div>