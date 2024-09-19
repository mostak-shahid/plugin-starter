<?php
class Plugin_Starter_Setting_API
{    
    // add_action( 'admin_init', 'eg_settings_api_init' );
    /*public function __construct()
    {
        add_action('admin_init', [$this, 'plugin_starter_api_settings_init']);
    }*/
    public function plugin_starter_api_settings_init()
    {
        register_setting('plugin_starter_settings', 'plugin_starter_options');
        add_settings_section(
            'plugin_starter_setting_api_section',
            'Example settings section in reading',
            [$this, 'plugin_starter_scetion_start'],
            'plugin_starter_settings'
        );
        add_settings_field(
            'plugin_starter_settings_input_text',
            esc_html__('Text Input', 'plugin-starter'),
            [$this, 'plugin_starter_input'],
            'plugin_starter_settings',
            'plugin_starter_setting_api_section',
            [
                'label_for' => 'settings_input_text', 
                'class' => 'plugin_starter_row', 
                'element_class' => 'input_text', 
                'default' => 'Is it working?',
                'option_key' => 'plugin_starter_options',
                'type' => 'text',
                'required' => true,
            ]
        );
        add_settings_field(
            'plugin_starter_settings_input_email',
            esc_html__('Email Input', 'plugin-starter'),
            [$this, 'plugin_starter_input'],
            'plugin_starter_settings',
            'plugin_starter_setting_api_section',
            [
                'label_for' => 'settings_input_email', 
                'class' => 'plugin_starter_row', 
                'element_class' => 'input_email', 
                'default' => 'example@email.com',
                'option_key' => 'plugin_starter_options',
                'type' => 'email',
            ]
        );
        add_settings_field(
            'plugin_starter_settings_input_color',
            esc_html__('Color Input', 'plugin-starter'),
            [$this, 'plugin_starter_input'],
            'plugin_starter_settings',
            'plugin_starter_setting_api_section',
            [
                'label_for' => 'settings_input_color', 
                'class' => 'plugin_starter_row', 
                'element_class' => 'input_color', 
                'default' => '#eaeaea',
                'option_key' => 'plugin_starter_options',
                'type' => 'color',
            ]
        );
        add_settings_field(
            'plugin_starter_settings_input_date',
            esc_html__('Date Input', 'plugin-starter'),
            [$this, 'plugin_starter_input'],
            'plugin_starter_settings',
            'plugin_starter_setting_api_section',
            [
                'label_for' => 'settings_input_date', 
                'class' => 'plugin_starter_row', 
                'element_class' => 'input_date', 
                'option_key' => 'plugin_starter_options',
                'type' => 'date',
            ]
        );
        add_settings_field(
            'plugin_starter_settings_input_datetime_local',
            esc_html__('Datetime local Input', 'plugin-starter'),
            [$this, 'plugin_starter_input'],
            'plugin_starter_settings',
            'plugin_starter_setting_api_section',
            [
                'label_for' => 'settings_input_datetime_local', 
                'class' => 'plugin_starter_row', 
                'element_class' => 'input_datetime_local', 
                'option_key' => 'plugin_starter_options',
                'type' => 'datetime-local',
            ]
        );        
        add_settings_field(
            'plugin_starter_settings_textarea',
            esc_html__('Textarea', 'plugin-starter'),
            [$this, 'plugin_starter_textarea'],
            'plugin_starter_settings',
            'plugin_starter_setting_api_section',
            [
                'label_for' => 'settings_textarea', 
                'class' => 'plugin_starter_row', 
                'element_class' => 'textarea', 
                'default' => 'ha ha',
                'option_key' => 'plugin_starter_options',                
            ]
        );
        add_settings_field(
            'plugin_starter_settings_editor',
            esc_html__('Textarea', 'plugin-starter'),
            [$this, 'plugin_starter_editor'],
            'plugin_starter_settings',
            'plugin_starter_setting_api_section',
            [
                'label_for' => 'settings_editor', 
                'class' => 'plugin_starter_row', 
                'element_class' => 'editor', 
                'default' => '<p>ha ha</p>',
                'option_key' => 'plugin_starter_options',                
            ]
        );
        add_settings_field(
            'plugin_starter_settings_switch',
            esc_html__('Enable Product Tabs', 'plugin-starter'),
            [$this, 'plugin_starter_switch'],
            'plugin_starter_settings',
            'plugin_starter_setting_api_section',
            [
                'label_for' => 'settings_switch', 
                'class' => 'plugin_starter_row', 
                'element_class' => 'switcher', 
                'default' => '1', 
                'option_key' => 'plugin_starter_options'
            ]
        );
        add_settings_field(
            'plugin_starter_settings_checkbox',
            esc_html__('Checkbox Input', 'plugin-starter'),
            [$this, 'plugin_starter_checkbox'],
            'plugin_starter_settings',
            'plugin_starter_setting_api_section',
            [
                'label_for' => 'settings_checkbox', 
                'class' => 'plugin_starter_row', 
                'element_class' => 'select', 
                'default' => ['3','4'],
                'option_key' => 'plugin_starter_options',
                'options' => [
                    '1' => 'Option 1',
                    '2' => 'Option 2',
                    '3' => 'Option 3',
                    '4' => 'Option 4',
                ],
            ]
        );
        add_settings_field(
            'plugin_starter_settings_datalist',
            esc_html__('Datalist Input', 'plugin-starter'),
            [$this, 'plugin_starter_datalist'],
            'plugin_starter_settings',
            'plugin_starter_setting_api_section',
            [
                'label_for' => 'settings_datalist', 
                'class' => 'plugin_starter_row', 
                'element_class' => 'datalist', 
                'option_key' => 'plugin_starter_options',
                'options' => [
                    '1' => 'Option 1',
                    '2' => 'Option 2',
                    '3' => 'Option 3',
                    '4' => 'Option 4',
                ],
                'required' => true,
            ]
        );
        add_settings_field(
            'plugin_starter_settings_select',
            esc_html__('Select Input', 'plugin-starter'),
            [$this, 'plugin_starter_select'],
            'plugin_starter_settings',
            'plugin_starter_setting_api_section',
            [
                'label_for' => 'settings_select', 
                'class' => 'plugin_starter_row', 
                'element_class' => 'select', 
                'default' => '4',
                'option_key' => 'plugin_starter_options',
                'options' => [
                    '1' => 'Option 1',
                    '2' => 'Option 2',
                    '3' => 'Option 3',
                    '4' => 'Option 4',
                ],
                'blank' => 'Select One',
                'required' => true,
            ]
        );
        add_settings_field(
            'plugin_starter_settings_multi_select',
            esc_html__('Multi Select Input', 'plugin-starter'),
            [$this, 'plugin_starter_multi_select'],
            'plugin_starter_settings',
            'plugin_starter_setting_api_section',
            [
                'label_for' => 'settings_multi_select', 
                'class' => 'plugin_starter_row', 
                'element_class' => 'select', 
                'default' => ['3','4'],
                'option_key' => 'plugin_starter_options',
                'options' => [
                    '1' => 'Option 1',
                    '2' => 'Option 2',
                    '3' => 'Option 3',
                    '4' => 'Option 4',
                ],
                'blank' => 'Select One',
                'required' => true,
            ]
        );
        add_settings_field(
            'plugin_starter_settings_radio',
            esc_html__('Radio Input', 'plugin-starter'),
            [$this, 'plugin_starter_radio'],
            'plugin_starter_settings',
            'plugin_starter_setting_api_section',
            [
                'label_for' => 'settings_radio', 
                'class' => 'plugin_starter_row', 
                'element_class' => 'radio', 
                'default' => '4',
                'option_key' => 'plugin_starter_options',
                'options' => [
                    '1' => 'Option 1',
                    '2' => 'Option 2',
                    '3' => 'Option 3',
                    '4' => 'Option 4',
                ],
            ]
        );
        
    }
    public function plugin_starter_scetion_start() {
        $plugin_starter_options = (get_option('plugin_starter_options')) ? get_option('plugin_starter_options') : [];
        $options = array_replace_recursive(PLUGIN_STARTER_DEFAULT_OPTIONS,$plugin_starter_options);
        // echo '<pre>';
        // var_dump($options);
        // echo '</pre>';

    }

    public function plugin_starter_input($args)
    {
        $plugin_starter_options = (get_option('plugin_starter_options')) ? get_option('plugin_starter_options') : [];
        $options = array_replace_recursive(PLUGIN_STARTER_DEFAULT_OPTIONS,$plugin_starter_options);
        $default = ($options) ? (array_key_exists($args['label_for'], $options) ? $options[$args['label_for']] : @$args['default']) : @$args['default'];
    ?>
        <div class="position-relative <?php echo esc_html(@$args['element_class']); ?>">
            <label for="<?php echo esc_html($args['label_for']); ?>">
                <input 
                    type="<?php echo (isset($args['type']))?esc_html($args['type']):'text' ?>" 
                    name="<?php echo esc_html($args['option_key']) ?>[<?php echo esc_html($args['label_for']); ?>]" 
                    id="<?php echo esc_html($args['label_for']); ?>" 
                    value="<?php echo esc_html($default) ?>" 
                    placeholder="<?php echo isset($args['default'])?esc_html($args['default']):''?>"
                    <?php echo (isset($args['required']))?'required':'' ?>
                    >
            </label>
        </div>
    <?php
    }

    public function plugin_starter_textarea($args)
    {
        $plugin_starter_options = (get_option('plugin_starter_options')) ? get_option('plugin_starter_options') : [];
        $options = array_replace_recursive(PLUGIN_STARTER_DEFAULT_OPTIONS,$plugin_starter_options);
        $default = ($options) ? (array_key_exists($args['label_for'], $options) ? $options[$args['label_for']] : @$args['default']) : @$args['default'];
    ?>
        <div class="position-relative <?php echo esc_html(@$args['element_class']); ?>">
            <label for="<?php echo esc_html($args['label_for']); ?>">
                <textarea 
                    type="<?php echo (isset($args['type']))?esc_html($args['type']):'text' ?>" 
                    name="<?php echo esc_html($args['option_key']) ?>[<?php echo esc_html($args['label_for']); ?>]" 
                    id="<?php echo esc_html($args['label_for']); ?>" 
                    placeholder="<?php echo isset($args['default'])?esc_html($args['default']):''?>"
                    <?php echo (isset($args['required']))?'required':'' ?>
                    ><?php echo esc_html($default) ?></textarea>
            </label>
        </div>
    <?php
    }

    public function plugin_starter_editor($args)
    {
        $plugin_starter_options = (get_option('plugin_starter_options')) ? get_option('plugin_starter_options') : [];
        $options = array_replace_recursive(PLUGIN_STARTER_DEFAULT_OPTIONS,$plugin_starter_options);
        $default = ($options) ? (array_key_exists($args['label_for'], $options) ? $options[$args['label_for']] : @$args['default']) : @$args['default'];
    ?>
        <div class="position-relative <?php echo esc_html(@$args['element_class']); ?>">
            <label for="<?php echo esc_html($args['label_for']); ?>">
                <?php 
                $editor_id = esc_html($args['label_for']);
                $arg = array(
                    'textarea_name' => esc_html($args['option_key']) . '[' . esc_html($args['label_for']) . ']',
                );
                wp_editor( $default, $editor_id, $arg ); 
                ?>
                
            </label>
        </div>
    <?php
    }

    public function plugin_starter_switch($args)
    {
        $plugin_starter_options = (get_option('plugin_starter_options')) ? get_option('plugin_starter_options') : [];
        $options = array_replace_recursive(PLUGIN_STARTER_DEFAULT_OPTIONS,$plugin_starter_options);
        $default = ($options) ? (array_key_exists($args['label_for'], $options) ? 1 : 0) : 0;
    ?>
        <div class="position-relative <?php echo esc_html(@$args['element_class']); ?>">
            <label for="<?php echo esc_html($args['option_key']) . '_' .esc_html($args['label_for']); ?>">
                <input 
                type="checkbox" 
                name="<?php echo esc_html($args['option_key']) ?>[<?php echo esc_html($args['label_for']); ?>]" 
                id="<?php echo esc_html($args['option_key']) . '_' .esc_html($args['label_for']); ?>" 
                value="1" 
                <?php echo checked($default, 1, false); ?>
                >
                <em data-on="on" data-off="off"></em>
                <span></span>
            </label>
        </div>
    <?php
    }

    public function plugin_starter_checkbox($args)
    {
        $plugin_starter_options = (get_option('plugin_starter_options')) ? get_option('plugin_starter_options') : [];
        $options = array_replace_recursive(PLUGIN_STARTER_DEFAULT_OPTIONS,$plugin_starter_options);
        $adefault = (isset($args['default']) && is_array($args['default']))?$args['default']:[];

        $default = ($options) ? (array_key_exists($args['label_for'], $options) ? $options[$args['label_for']] : $adefault) : $adefault;
        //$default = (@$options && @$options[@$args['label_for']]) ? $options[$args['label_for']] : $args['default'];
    ?>
        <div class="position-relative <?php echo esc_html(@$args['element_class']); ?>">
            <div class="checkbox-group" 
                name="<?php echo esc_html($args['option_key']) . '[' . esc_html($args['label_for']) . '][]' ?>" 
                id="<?php echo esc_html($args['label_for']); ?>" 
                >
                <?php foreach ($args['options'] as $key => $value) : ?>
                    <div class="checkbox-unit">
                        <label>    
                            <input 
                            type="checkbox"
                            value="<?php echo esc_html($key) ?>" 
                            name="<?php echo esc_html($args['option_key']) . '[' . esc_html($args['label_for']) . '][]' ?>" 
                            <?php echo in_array($key, $default) ? 'checked' : ''; ?>
                            >
                            <span><?php echo esc_html($value) ?></span>
                        </label>
                    </div>
                <?php endforeach ?>
            </input>
        </div>
<?php
    }

    public function plugin_starter_radio($args)
    {
        $plugin_starter_options = (get_option('plugin_starter_options')) ? get_option('plugin_starter_options') : [];
        $options = array_replace_recursive(PLUGIN_STARTER_DEFAULT_OPTIONS,$plugin_starter_options);
        $default = ($options) ? (array_key_exists($args['label_for'], $options) ? $options[$args['label_for']] : @$args['default']) : @$args['default'];
    ?>
        <div class="position-relative <?php echo esc_html(@$args['element_class']); ?>">
            <div class="radio-wrapper">
                <?php foreach ($args['options'] as $key => $value) : ?>
                    <div class="radio-unit">
                        <input 
                        class="<?php echo esc_html($args['label_for']); ?> <?php echo esc_html($args['label_for']) . '-' . esc_html($key); ?>" 
                        name="<?php echo esc_html($args['option_key']) ?>[<?php echo esc_html($args['label_for']); ?>]" 
                        id="<?php echo esc_html($args['label_for']) . '-' . esc_html($key); ?>" type="radio" 
                        value="<?php echo esc_html($key) ?>" <?php echo isset($default) ? (checked($default, $key, false)) : (''); ?>
                        >
                        <label for="<?php echo esc_html($args['label_for']) . '-' . esc_html($key); ?>"><span></span> <?php echo esc_html($value) ?></label>

                    </div>
                <?php endforeach ?>
            </div>
        </div>
    <?php
    }

    public function plugin_starter_datalist($args)
    {
        $plugin_starter_options = (get_option('plugin_starter_options')) ? get_option('plugin_starter_options') : [];
        $options = array_replace_recursive(PLUGIN_STARTER_DEFAULT_OPTIONS,$plugin_starter_options);
        $default = ($options) ? (array_key_exists($args['label_for'], $options) ? $options[$args['label_for']] : @$args['default']) : @$args['default'];
    ?>
        <div class="position-relative <?php echo esc_html(@$args['element_class']); ?>">

            <label for="<?php echo esc_html($args['label_for']); ?>">
                <input 
                list="<?php echo esc_html($args['option_key']) . '[' . esc_html($args['label_for']) . ']' ?>-datalist"
                name="<?php echo esc_html($args['option_key']) . '[' . esc_html($args['label_for']) . ']' ?>"
                id="<?php echo esc_html($args['label_for']); ?>"                 
                value="<?php echo esc_html($default) ?>" 
                placeholder="<?php echo isset($args['default'])?esc_html($args['default']):''?>"
                <?php echo (isset($args['required']))?'required':'' ?>
                >
            </label>
            
            <datalist id="<?php echo esc_html($args['option_key']) . '[' . esc_html($args['label_for']) . ']' ?>-datalist">
                <?php foreach ($args['options'] as $value) : ?>
                    <option><?php echo esc_html($value) ?></option>
                <?php endforeach ?>
            </datalist>
        </div>
    <?php
    }

    public function plugin_starter_select($args)
    {
        $plugin_starter_options = (get_option('plugin_starter_options')) ? get_option('plugin_starter_options') : [];
        $options = array_replace_recursive(PLUGIN_STARTER_DEFAULT_OPTIONS,$plugin_starter_options);
        $default = ($options) ? (array_key_exists($args['label_for'], $options) ? $options[$args['label_for']] : @$args['default']) : @$args['default'];
    ?>
        <div class="position-relative <?php echo esc_html(@$args['element_class']); ?>">

            <label for="<?php echo esc_html($args['label_for']); ?>">
                <select 
                name="<?php echo esc_html($args['option_key']) . '[' . esc_html($args['label_for']) . ']' ?>"
                id="<?php echo esc_html($args['label_for']); ?>" 
                <?php echo (isset($args['required']))?'required':'' ?>
                >
                    <?php if (@$args['blank']) : ?>
                        <option value=""><?php echo esc_html($args['blank']) ?></option>
                    <?php endif; ?>
                    <?php foreach ($args['options'] as $key => $value) : ?>
                        <option value="<?php echo esc_html($key) ?>" <?php echo isset($default) ? (selected($default, $key, false)) : (''); ?>><?php echo esc_html($value) ?></option>
                    <?php endforeach ?>
                </select>
            </label>
        </div>
    <?php
    }
    public function plugin_starter_multi_select($args)
    {
        $plugin_starter_options = (get_option('plugin_starter_options')) ? get_option('plugin_starter_options') : [];
        $options = array_replace_recursive(PLUGIN_STARTER_DEFAULT_OPTIONS,$plugin_starter_options);
        $adefault = (isset($args['default']) && is_array($args['default']))?$args['default']:[];

        $default = ($options) ? (array_key_exists($args['label_for'], $options) ? $options[$args['label_for']] : $adefault) : $adefault;
        //$default = (@$options && @$options[@$args['label_for']]) ? $options[$args['label_for']] : $args['default'];
    ?>
        <div class="position-relative <?php echo esc_html(@$args['element_class']); ?>">
            <label for="<?php echo esc_html($args['label_for']); ?>">
                <select 
                    name="<?php echo esc_html($args['option_key']) . '[' . esc_html($args['label_for']) . '][]' ?>" 
                    id="<?php echo esc_html($args['label_for']); ?>" 
                    <?php echo (isset($args['required']))?'required':''?>
                    multiple
                    >
                    <?php if (array_key_exists("blank", $args) && $args['blank']) : ?>
                        <option value=""><?php echo esc_html($args['blank']) ?></option>
                    <?php endif; ?>
                    <?php foreach ($args['options'] as $key => $value) : ?>
                        <option value="<?php echo esc_html($key) ?>" <?php echo in_array($key, $default) ? 'selected' : ''; ?>><?php echo esc_html($value) ?></option>
                    <?php endforeach ?>
                </select>
            </label>
        </div>
<?php
    }
}