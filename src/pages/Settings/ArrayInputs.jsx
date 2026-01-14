import { __ } from "@wordpress/i18n";
import { Form, Button, Card } from '@douyinfe/semi-ui';
import { useOutletContext } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import ActionButtons from "./ActionButtons";

const ArrayInputs = () => {
    const { settings, settingsLoading, handleSubmit, handleReset } = useOutletContext();
    const [hasChanges, setHasChanges] = useState(false);
    const settingsOld = useRef(null);

    const onSubmit = (values) => {
        handleSubmit('array', values);
    };

    const handleValuesChange = (values) => {
        if (settingsOld.current && settings.array) {
            const isChanged = JSON.stringify(values) !== JSON.stringify(settingsOld.current.array);
            setHasChanges(isChanged);
        }
    };

    useEffect(() => {
        if (settings && settings.array) {
            settingsOld.current = { ...settings };
            setHasChanges(false);
        }
    }, [settings]);

    return (
        <>
            {!settingsLoading && (
                <Form
                    initValues={settings.array}
                    onSubmit={onSubmit}
                    onValueChange={handleValuesChange}
                    style={{ maxWidth: '600px' }}
                    labelPosition="left"
                    labelWidth="150px"
                >
                    <Form.CheckboxGroup field="checkbox" label="Checkbox Group" direction="vertical">
                        <Form.Checkbox value="checkbox-1">{__('Checkbox 1', 'plugin-starter')}</Form.Checkbox>
                        <Form.Checkbox value="checkbox-2">{__('Checkbox 2', 'plugin-starter')}</Form.Checkbox>
                        <Form.Checkbox value="checkbox-3">{__('Checkbox 3', 'plugin-starter')}</Form.Checkbox>
                        <Form.Checkbox value="checkbox-4">{__('Checkbox 4', 'plugin-starter')}</Form.Checkbox>
                    </Form.CheckboxGroup>
                    <ActionButtons hasChanges={hasChanges} section='array' handleReset={handleReset} />
                </Form>
            )}
        </>
    );
};

export default ArrayInputs;