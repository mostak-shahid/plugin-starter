<?php
// If this file is called directly, abort.
if (!defined('ABSPATH')) die;
$plugin_starter_options = array_replace_recursive(PLUGIN_STARTER_DEFAULT_OPTIONS,get_option('plugin_starter_options', []));

$actual_link = (empty($_SERVER['HTTPS']) ? 'http' : 'https') . "://" . (isset($_SERVER['HTTP_HOST']) && isset($_SERVER['REQUEST_URI'])) ? sanitize_text_field(wp_unslash($_SERVER['HTTP_HOST'])) . sanitize_text_field(wp_unslash($_SERVER['REQUEST_URI'])) : '';

$dataOptions = [
    '1' => esc_html__('Option 1', 'plugin-starter'),
    '2' => esc_html__('Option 2', 'plugin-starter'),
    '3' => esc_html__('Option 3', 'plugin-starter'),
    '4' => esc_html__('Option 4', 'plugin-starter'),
]

?>
<div class="plugin-starter-settings-wrapper">
    <form method='post'>
        <?php wp_nonce_field( 'options_form_action', 'options_form_field' ); ?>
        <div class="plugin-starter-settings-container">
            <div class="plugin-starter-settings">
                <div class="part-title">
                    <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
                </div>
                <div class="part-options">
                    <?php 
                    if (isset( $_POST['options_form_field'] ) && wp_verify_nonce( sanitize_text_field(wp_unslash($_POST['options_form_field'])), 'options_form_action' ) ) {
                        if (isset($_POST['settings-updated'])) {
                            add_settings_error('wporg_messages', 'wporg_message', esc_html__('All changes have been applied correctly, ensuring your preferences are now in effect.', 'plugin-starter'), 'updated');
                        }                    
                        settings_errors('wporg_messages');
                    }
                    ?>
                    <table class="form-table" role="presentation">
                        <tbody>
                            <tr class="plugin_starter_row">
                                <th scope="row"><label for="settings_input_text"><?php echo esc_html__('Text Input', 'plugin-starter')?></label></th>
                                <td>
                                    <div class="position-relative input_text">
                                        <label for="settings_input_text">
                                            <input type="text" name="plugin_starter_options[settings_input_text]" id="settings_input_text" value="<?php echo esc_html(@$plugin_starter_options['settings_input_text'])?>">
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr class="plugin_starter_row">
                                <th scope="row"><label for="settings_input_email"><?php echo esc_html__('Email Input', 'plugin-starter')?></label></th>
                                <td>
                                    <div class="position-relative input_email">
                                        <label for="settings_input_email">
                                            <input type="email" name="plugin_starter_options[settings_input_email]" id="settings_input_email" value="<?php echo esc_html(@$plugin_starter_options['settings_input_email'])?>">
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr class="plugin_starter_row">
                                <th scope="row"><label for="settings_input_color"><?php echo esc_html__('Color Input', 'plugin-starter')?></label></th>
                                <td>
                                    <div class="position-relative input_color">
                                        <label for="settings_input_color">
                                            <input type="color" name="plugin_starter_options[settings_input_color]" id="settings_input_color" value="<?php echo esc_html(@$plugin_starter_options['settings_input_color'])?>">
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr class="plugin_starter_row">
                                <th scope="row"><label for="settings_input_date"><?php echo esc_html__('Date Input', 'plugin-starter')?></label></th>
                                <td>
                                    <div class="position-relative input_date">
                                        <label for="settings_input_date">
                                            <input type="date" name="plugin_starter_options[settings_input_date]" id="settings_input_date" value="<?php echo esc_html(@$plugin_starter_options['settings_input_date'])?>">
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr class="plugin_starter_row">
                                <th scope="row"><label for="settings_input_datetime_local"><?php echo esc_html__('Datetime local Input', 'plugin-starter')?></label></th>
                                <td>
                                    <div class="position-relative input_datetime_local">
                                        <label for="settings_input_datetime_local">
                                            <input type="datetime-local" name="plugin_starter_options[settings_input_datetime_local]" id="settings_input_datetime_local" value="<?php echo esc_html(@$plugin_starter_options['settings_input_datetime_local'])?>">
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr class="plugin_starter_row">
                                <th scope="row"><label for="settings_textarea"><?php echo esc_html__('Textarea', 'plugin-starter')?></label></th>
                                <td>
                                    <div class="position-relative textarea">
                                        <label for="settings_textarea">
                                            <textarea type="text" name="plugin_starter_options[settings_textarea]" id="settings_textarea"><?php echo esc_html(@$plugin_starter_options['settings_textarea'])?></textarea>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr class="plugin_starter_row">
                                <th scope="row"><label for="settings_editor"><?php echo esc_html__('Editor', 'plugin-starter')?></label></th>
                                <td>
                                    <div class="position-relative textarea">
                                        <label for="settings_editor">
                                            <?php 
                                            $editor_id = esc_html(sanitize_title('settings_editor'));
                                            $arg = array(
                                                'textarea_name' => esc_html('plugin_starter_options[settings_editor]'),
                                            );
                                            wp_editor( $plugin_starter_options['settings_editor'], $editor_id, $arg ); 
                                            ?>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr class="plugin_starter_row">
                                <th scope="row"><label for="settings_switch"><?php echo esc_html__('Enable Product Tabs', 'plugin-starter')?></label></th>
                                <td>
                                    <div class="position-relative switcher">
                                        <label for="plugin_starter_options_settings_switch">
                                            <input type="checkbox" name="plugin_starter_options[settings_switch]" id="plugin_starter_options_settings_switch" value="1" <?php checked(@$plugin_starter_options['settings_switch'], 1, 1)?>>
                                            <em data-on="on" data-off="off"></em>
                                            <span></span>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr class="plugin_starter_row">
                                <th scope="row"><label for="settings_checkbox"><?php echo esc_html__('Checkbox Input', 'plugin-starter')?></label></th>
                                <td>
                                    <div class="position-relative select">
                                        <div class="checkbox-group" name="plugin_starter_options[settings_checkbox][]" id="settings_checkbox">
                                            <?php if(isset($dataOptions) && sizeof($dataOptions)) :?>
                                                <?php foreach($dataOptions as $key => $value) :?>  
                                                    <div class="checkbox-unit">
                                                        <label>
                                                            <input type="checkbox" value="<?php echo esc_html($key) ?>" name="plugin_starter_options[settings_checkbox][]" <?php checked(in_array($key, @$plugin_starter_options['settings_checkbox']), 1, 1)?>>
                                                            <span><?php echo esc_html($value) ?></span>
                                                        </label>
                                                    </div>                                              
                                                <?php endforeach?>
                                            <?php endif?>

                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr class="plugin_starter_row">
                                <th scope="row"><label for="settings_datalist"><?php echo esc_html__('Datalist Input', 'plugin-starter')?></label></th>
                                <td>
                                    <div class="position-relative datalist">

                                        <label for="settings_datalist">
                                            <input list="plugin_starter_options_settings_datalist" name="plugin_starter_options[settings_datalist]" id="settings_datalist" value="<?php echo esc_html(@$plugin_starter_options['settings_datalist'])?>">
                                        </label>

                                        <datalist id="plugin_starter_options_settings_datalist">
                                            <?php if(isset($dataOptions) && sizeof($dataOptions)) :?>
                                                <?php foreach($dataOptions as $key => $value) :?>  
                                                    <option><?php echo esc_html($value)?></option>                                              
                                                <?php endforeach?>
                                            <?php endif?>
                                        </datalist>
                                    </div>
                                </td>
                            </tr>
                            <tr class="plugin_starter_row">
                                <th scope="row"><label for="settings_select"><?php echo esc_html__('Select Input', 'plugin-starter')?></label></th>
                                <td>
                                    <div class="position-relative select">

                                        <label for="settings_select">
                                            <select name="plugin_starter_options[settings_select]" id="settings_select" required="">
                                                <option value=""><?php echo esc_html__('Select One', 'plugin-starter')?></option>  
                                                <?php if(isset($dataOptions) && sizeof($dataOptions)) :?>
                                                    <?php foreach($dataOptions as $key => $value) :?>  
                                                        <option value="<?php echo esc_html($key) ?>" <?php selected(@$plugin_starter_options['settings_select'], $key, 1)?>><?php echo esc_html($value)?></option>                                               
                                                    <?php endforeach?>
                                                <?php endif?>                                              
                                            </select>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr class="plugin_starter_row">
                                <th scope="row"><label for="settings_multi_select"><?php echo esc_html__('Multi Select Input', 'plugin-starter')?></label></th>
                                <td>
                                    <div class="position-relative select">
                                        <label for="settings_multi_select">
                                            <select name="plugin_starter_options[settings_multi_select][]" id="settings_multi_select" multiple>   
                                                <?php if(isset($dataOptions) && sizeof($dataOptions)) :?>
                                                    <?php foreach($dataOptions as $key => $value) :?>  
                                                        <option value="<?php echo esc_html($key) ?>" <?php selected(in_array($key, @$plugin_starter_options['settings_multi_select']), 1, 1)?>><?php echo esc_html($value)?></option>                                               
                                                    <?php endforeach?>
                                                <?php endif?>       
                                            </select>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr class="plugin_starter_row">
                                <th scope="row"><label for="settings_radio"><?php echo esc_html__('Radio Input', 'plugin-starter')?>Radio Input</label></th>
                                <td>
                                    <div class="position-relative radio">
                                        <div class="radio-wrapper">
                                            <?php if(isset($dataOptions) && sizeof($dataOptions)) :?>
                                                <?php foreach($dataOptions as $key => $value) :?>   
                                                    <div class="radio-unit">
                                                        <input class="settings_radio settings_radio-1" name="plugin_starter_options[settings_radio]" id="settings_radio-<?php echo esc_html(sanitize_title($key)) ?>" type="radio" value="<?php echo esc_html($key) ?>" <?php checked(@$plugin_starter_options['settings_radio'], $key, 1)?>>
                                                        <label for="settings_radio-<?php echo esc_html(sanitize_title($key)) ?>"><span></span> <?php echo esc_html($value)?></label>

                                                    </div>                                             
                                                <?php endforeach?>
                                            <?php endif?>
                                            
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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