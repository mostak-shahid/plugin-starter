import { Form, Button, Card } from '@douyinfe/semi-ui';
import { useOutletContext } from 'react-router-dom';

const ArrayInputs = () => {
    const { settings, settingsLoading, handleSubmit, handleReset } = useOutletContext();

    const onSubmit = (values) => {
        handleSubmit('array', values);
    };

    const onReset = () => {
        handleReset('array');
    };

    return (
        <Card title="Array Inputs" headerLine={true}>
            <p style={{ marginBottom: '24px', color: 'var(--semi-color-text-2)' }}>
                Configure array input settings with multiple checkbox selections.
            </p>
            {/* {console.log(settings)}
            {console.log(settingsLoading)} */}
            {!settingsLoading && (
                <Form 
                    initValues={settings.array} 
                    onSubmit={onSubmit} 
                    style={{ maxWidth: '600px' }}
                    labelPosition="left"
                    labelWidth="150px"
                >
                    <Form.CheckboxGroup field="checkbox" label="Checkbox Group" direction="vertical">
                        <Form.Checkbox value="checkbox-1">Checkbox 1</Form.Checkbox>
                        <Form.Checkbox value="checkbox-2">Checkbox 2</Form.Checkbox>
                        <Form.Checkbox value="checkbox-3">Checkbox 3</Form.Checkbox>
                        <Form.Checkbox value="checkbox-4">Checkbox 4</Form.Checkbox>
                    </Form.CheckboxGroup>
                    
                    <div style={{ marginTop: '24px' }}>
                    <Button type="primary" htmlType="submit" size="large">
                        Save Settings
                    </Button>
                    <Button
                        type="tertiary"
                        style={{ marginLeft: '12px' }}
                        onClick={onReset}
                    >
                        Reset
                    </Button>
                    </div>
                </Form>
            )}
        </Card>
    );
};

export default ArrayInputs;