import React, { useState, useEffect } from '@wordpress/element';
import {
    Card,
    CardBody,
    TextControl,
    TextareaControl,
    CheckboxControl,
    RadioControl,
    SelectControl,
    Button,
    Spinner,
    Notice
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useSettings } from '../hooks/useSettings';

const BaseInputs = () => {
    const { settings, loading, saving, message, loadSettings, saveSettings, resetSection } = useSettings();
    const [formData, setFormData] = useState({});

    useEffect(() => {
        loadSettings();
    }, []);

    useEffect(() => {
        if (settings.base_inputs) {
            setFormData(settings.base_inputs);
        }
    }, [settings]);

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = async () => {
        await saveSettings({ base_inputs: formData });
    };

    const handleReset = async () => {
        if (confirm(__('Are you sure you want to reset this section to defaults?', 'plugin-starter'))) {
            await resetSection('base-inputs');
        }
    };

    if (loading) {
        return (
            <div className="settings-loading">
                <Spinner />
                <p>{__('Loading settings...', 'plugin-starter')}</p>
            </div>
        );
    }

    return (
        <div className="settings-page">
            {message.text && (
                <Notice
                    status={message.type}
                    isDismissible={false}
                >
                    {message.text}
                </Notice>
            )}

            <Card>
                <CardBody>
                    <h2>{__('Base Input Settings', 'plugin-starter')}</h2>
                    <p className="description">
                        {__('Configure basic input fields for your plugin.', 'plugin-starter')}
                    </p>

                    <div className="settings-fields">
                        <TextControl
                            label={__('Text Field', 'plugin-starter')}
                            value={formData.text_field || ''}
                            onChange={(value) => handleChange('text_field', value)}
                            help={__('Enter some text here', 'plugin-starter')}
                        />

                        <TextControl
                            label={__('Email Field', 'plugin-starter')}
                            type="email"
                            value={formData.email_field || ''}
                            onChange={(value) => handleChange('email_field', value)}
                            help={__('Enter an email address', 'plugin-starter')}
                        />

                        <TextControl
                            label={__('Number Field', 'plugin-starter')}
                            type="number"
                            value={formData.number_field || 0}
                            onChange={(value) => handleChange('number_field', parseInt(value))}
                            help={__('Enter a number', 'plugin-starter')}
                        />

                        <TextControl
                            label={__('URL Field', 'plugin-starter')}
                            type="url"
                            value={formData.url_field || ''}
                            onChange={(value) => handleChange('url_field', value)}
                            help={__('Enter a URL', 'plugin-starter')}
                        />

                        <TextareaControl
                            label={__('Textarea Field', 'plugin-starter')}
                            value={formData.textarea_field || ''}
                            onChange={(value) => handleChange('textarea_field', value)}
                            help={__('Enter multiple lines of text', 'plugin-starter')}
                            rows={5}
                        />

                        <CheckboxControl
                            label={__('Checkbox Field', 'plugin-starter')}
                            checked={formData.checkbox_field || false}
                            onChange={(value) => handleChange('checkbox_field', value)}
                            help={__('Enable or disable this option', 'plugin-starter')}
                        />

                        <RadioControl
                            label={__('Radio Field', 'plugin-starter')}
                            selected={formData.radio_field || 'option1'}
                            options={[
                                { label: __('Option 1', 'plugin-starter'), value: 'option1' },
                                { label: __('Option 2', 'plugin-starter'), value: 'option2' },
                                { label: __('Option 3', 'plugin-starter'), value: 'option3' }
                            ]}
                            onChange={(value) => handleChange('radio_field', value)}
                        />

                        <SelectControl
                            label={__('Select Field', 'plugin-starter')}
                            value={formData.select_field || 'option1'}
                            options={[
                                { label: __('Select an option', 'plugin-starter'), value: '' },
                                { label: __('Option 1', 'plugin-starter'), value: 'option1' },
                                { label: __('Option 2', 'plugin-starter'), value: 'option2' },
                                { label: __('Option 3', 'plugin-starter'), value: 'option3' }
                            ]}
                            onChange={(value) => handleChange('select_field', value)}
                        />

                        <div className="color-field">
                            <label>{__('Color Field', 'plugin-starter')}</label>
                            <input
                                type="color"
                                value={formData.color_field || '#0073aa'}
                                onChange={(e) => handleChange('color_field', e.target.value)}
                            />
                        </div>

                        <TextControl
                            label={__('Date Field', 'plugin-starter')}
                            type="date"
                            value={formData.date_field || ''}
                            onChange={(value) => handleChange('date_field', value)}
                        />
                    </div>

                    <div className="settings-actions">
                        <Button
                            variant="primary"
                            onClick={handleSave}
                            isBusy={saving}
                            disabled={saving}
                        >
                            {saving ? __('Saving...', 'plugin-starter') : __('Save Changes', 'plugin-starter')}
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={handleReset}
                            disabled={saving}
                        >
                            {__('Reset to Defaults', 'plugin-starter')}
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default BaseInputs;