import { __ } from "@wordpress/i18n";
import { Form, Row, Col, Skeleton, Typography } from '@douyinfe/semi-ui';
import { useOutletContext } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import ActionButtons from "./ActionButtons";
import { SkeletonPlaceholder } from "../../components";
const { Title, Paragraph } = Typography;
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
            {!settingsLoading && settings?.array && (
                <Form
                    initValues={settings.array}
                    onSubmit={onSubmit}
                    onValueChange={handleValuesChange}
                    style={{ maxWidth: '600px' }}
                    labelPosition="left"
                >

                    <div className="setting-unit py-4">
                        <Row type="flex" gutter={[24, 24]}>
                            <Col xs={24} lg={12} xl={14}>
                                <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                                    <Title heading={4}>{__("Checkbox Group", "plugin-starter")}</Title>
                                    <Paragraph>{__("Lorem", "plugin-starter")}</Paragraph>
                                </Skeleton>
                            </Col>    
                            {
                                !settingsLoading &&                               
                                <Col xs={24} lg={12} xl={10}>
                                    <Form.CheckboxGroup field="checkbox" noLabel direction="vertical">
                                        <Form.Checkbox value="checkbox-1">{__('Checkbox 1', 'plugin-starter')}</Form.Checkbox>
                                        <Form.Checkbox value="checkbox-2">{__('Checkbox 2', 'plugin-starter')}</Form.Checkbox>
                                        <Form.Checkbox value="checkbox-3">{__('Checkbox 3', 'plugin-starter')}</Form.Checkbox>
                                        <Form.Checkbox value="checkbox-4">{__('Checkbox 4', 'plugin-starter')}</Form.Checkbox>
                                    </Form.CheckboxGroup>
                                </Col>
                            }
                        </Row>
                    </div>
                    
                    <ActionButtons hasChanges={hasChanges} section='array' handleReset={handleReset} />
                </Form>
            )}
        </>
    );
};

export default ArrayInputs;