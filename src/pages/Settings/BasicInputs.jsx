import { __ } from "@wordpress/i18n";
import { Form, Button, Card } from '@douyinfe/semi-ui';
import { useOutletContext } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import ActionButtons from "./ActionButtons";

const BasicInputs = () => {
    const { settings, settingsLoading, handleSubmit, handleReset } = useOutletContext();
    const [hasChanges, setHasChanges] = useState(false);
    const settingsOld = useRef(null);

    const onSubmit = (values) => {
        handleSubmit('basic', values);
    };

    const handleValuesChange = (values) => {
        console.log(values);
        if (settingsOld.current && settings.basic) {
            const isChanged = JSON.stringify(values.basic) !== JSON.stringify(settingsOld.current.basic);
            setHasChanges(isChanged);
        }
    };

    useEffect(() => {
        if (settings && settings.basic) {
            settingsOld.current = { ...settings };
            setHasChanges(false);
        }
    }, [settings]);

    return (
        <>
            {!settingsLoading && (
                <Form
                    initValues={settings}
                    onSubmit={onSubmit}
                    onValueChange={handleValuesChange}
                    style={{ maxWidth: '600px' }}
                    labelPosition="left"
                    labelWidth="150px"
                >
                    <Form.Input
                        field="basic.text"
                        label="Text Input"
                        placeholder="Enter text"
                        style={{ width: '100%' }}
                    />

                    <Form.TextArea
                        field="basic.textarea"
                        label="Textarea"
                        placeholder="Enter textarea content"
                        rows={4}
                        style={{ width: '100%' }}
                    />

                    <Form.RadioGroup field="basic.radio" label="Radio Group" type="button">
                        <Form.Radio value="radio-1">{__('Radio 1', 'plugin-starter')}</Form.Radio>
                        <Form.Radio value="radio-2">{__('Radio 2', 'plugin-starter')}</Form.Radio>
                        <Form.Radio value="radio-3">{__('Radio 3', 'plugin-starter')}</Form.Radio>
                    </Form.RadioGroup>
                    <ActionButtons hasChanges={hasChanges} section='array' handleReset={handleReset} />
                </Form>
            )}
        </>
    );
};

export default BasicInputs;