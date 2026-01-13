import { Form, Button, Card } from '@douyinfe/semi-ui';
import { useOutletContext } from 'react-router-dom';

const BasicInputs = () => {
    const { settings, settingsLoading, handleSubmit, handleReset } = useOutletContext();

    const onSubmit = (values) => {
        handleSubmit('basic', values);
    };

    const onReset = () => {
        handleReset('basic');
    };

    return (
        <Card title="Basic Inputs" headerLine={true}>
            <p style={{ marginBottom: '24px', color: 'var(--semi-color-text-2)' }}>
                Configure basic input settings including text, textarea, and radio options.
            </p>
            {/* {console.log(settings)}
            {console.log(settingsLoading)} */}
            {!settingsLoading && (
                <Form 
                    initValues={settings} 
                    onSubmit={onSubmit} 
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
                        <Form.Radio value="radio-1">Radio 1</Form.Radio>
                        <Form.Radio value="radio-2">Radio 2</Form.Radio>
                        <Form.Radio value="radio-3">Radio 3</Form.Radio>
                    </Form.RadioGroup>
                    
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

export default BasicInputs;