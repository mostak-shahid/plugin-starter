<?php
// If this file is called directly, abort.
if (!defined('WPINC')) die;
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
                    settings_fields('plugin_starter_settings');
                    do_settings_sections('plugin_starter_settings');
                    ?>
                </div>
            </div>
        </div>
        <?php submit_button(); ?>
    </form>
</div>