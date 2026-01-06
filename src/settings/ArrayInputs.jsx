import React, { useState, useEffect } from '@wordpress/element';
import {
    Card,
    CardBody,
    TextControl,
    TextareaControl,
    CheckboxControl,
    Button,
    Spinner,
    Notice
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useSettings } from '../hooks/useSettings';
import { plus, trash } from '@wordpress/icons';

const ArrayInputs = () => {
    const { settings, loading, saving, message, loadSettings, saveSettings, resetSection } = useSettings();
    const [formData, setFormData] = useState({
        repeater_fields: [],
        checkbox_group: [],
        multi_select: []
    });

    useEffect(() => {
        loadSettings();
    }, []);

    useEffect(() => {
        if (settings.array_inputs) {
            setFormData(settings.array_inputs);
        }
    }, [settings]);

    const handleRepeaterChange = (index, field, value) => {
        const newRepeater = [...formData.repeater_fields];
        newRepeater[index] = {
            ...newRepeater[index],
            [field]: value
        };
        setFormData(prev => ({
            ...prev,
            repeater_fields: newRepeater
        }));
    };

    const addRepeaterItem = () => {
        setFormData(prev => ({
            ...prev,
            repeater_fields: [
                ...prev.repeater_fields,
                { title: '', description: '', enabled: false }
            ]
        }));
    };

    const removeRepeaterItem = (index) => {
        const newRepeater = formData.repeater_fields.filter((_, i) => i !== index);
        setFormData(prev => ({
            ...prev,
            repeater_fields: newRepeater
        }));
    };

    const handleCheckboxGroupChange = (value, checked) => {
        let newGroup = [...formData.checkbox_group];
        if (checked) {
            newGroup.push(value);
        } else {
            newGroup = newGroup.filter(item => item !== value);
        }
        setFormData(prev => ({
            ...prev,
            checkbox_group: newGroup
        }));
    };

    const handleMultiSelectChange = (value, checked) => {
        let newSelect = [...formData.multi_select];
        if (checked) {
            newSelect.push(value);
        } else {
            newSelect = newSelect.filter(item => item !== value);
        }
        setFormData(prev => ({
            ...prev,
            multi_select: newSelect
        }));
    };

    const handleSave = async () => {
        await saveSettings({ array_inputs: formData });
    };

    const handleReset = async () => {
        if (confirm(__('Are you sure you want to reset this section to defaults?', 'plugin-starter'))) {
            await resetSection('array-inputs');
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
                    <h2>{__('Array Input Settings', 'plugin-starter')}</h2>
                    <p className="description">
                        {__('Configure array-based inputs including repeaters and multi-selects.', 'plugin-starter')}
                    </p>

                    <div className="settings-fields">
                        <div className="repeater-section">
                            <h3>{__('Repeater Fields', 'plugin-starter')}</h3>
                            
                            {formData.repeater_fields?.map((item, index) => (
                                <div key={index} className="repeater-item">
                                    <div className="repeater-header">
                                        <h4>{__('Item', 'plugin-starter')} {index + 1}</h4>
                                        <Button
                                            variant="link"
                                            isDestructive
                                            onClick={() => removeRepeaterItem(index)}
                                            icon={trash}
                                        >
                                            {__('Remove', 'plugin-starter')}
                                        </Button>
                                    </div>
                                    
                                    <TextControl
                                        label={__('Title', 'plugin-starter')}
                                        value={item.title || ''}
                                        onChange={(value) => handleRepeaterChange(index, 'title', value)}
                                    />
                                    
                                    <TextareaControl
                                        label={__('Description', 'plugin-starter')}
                                        value={item.description || ''}
                                        onChange={(value) => handleRepeaterChange(index, 'description', value)}
                                        rows={3}
                                    />
                                    
                                    <CheckboxControl
                                        label={__('Enabled', 'plugin-starter')}
                                        checked={item.enabled || false}
                                        onChange={(value) => handleRepeaterChange(index, 'enabled', value)}
                                    />
                                </div>
                            ))}

                            <Button
                                variant="secondary"
                                onClick={addRepeaterItem}
                                icon={plus}
                            >
                                {__('Add Item', 'plugin-starter')}
                            </Button>
                        </div>

                        <div className="checkbox-group-section">
                            <h3>{__('Checkbox Group', 'plugin-starter')}</h3>
                            {['option1', 'option2', 'option3', 'option4'].map(option => (
                                <CheckboxControl
                                    key={option}
                                    label={__(`Option ${option.slice(-1)}`, 'plugin-starter')}
                                    checked={formData.checkbox_group?.includes(option)}
                                    onChange={(checked) => handleCheckboxGroupChange(option, checked)}
                                />
                            ))}
                        </div>

                        <div className="multi-select-section">
                            <h3>{__('Multi Select', 'plugin-starter')}</h3>
                            {['value1', 'value2', 'value3', 'value4'].map(value => (
                                <CheckboxControl
                                    key={value}
                                    label={__(`Value ${value.slice(-1)}`, 'plugin-starter')}
                                    checked={formData.multi_select?.includes(value)}
                                    onChange={(checked) => handleMultiSelectChange(value, checked)}
                                />
                            ))}
                        </div>
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

export default ArrayInputs;