import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import { Form, Row, Col, Skeleton, Button, Typography, Toast } from '@douyinfe/semi-ui';
import { IconRefresh, } from '@douyinfe/semi-icons';
import { useOutletContext } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { SkeletonPlaceholder } from '../../components';
import ActionButtons from "./ActionButtons";

const { Title, Text, Paragraph } = Typography;

const Tools = () => {
    const { settings, settingsLoading, handleSubmit, handleReset, setSettingsReload } = useOutletContext();
    const [hasChanges, setHasChanges] = useState(false);
    const [processing, setProcessing] = useState(false);
    const settingsOld = useRef(null);
    const formApi = useRef(null);

    const onSubmit = (values) => {
        handleSubmit('tools', values);
    };

    const handleValuesChange = (values) => {
        if (settingsOld.current && settings.tools) {
            const isChanged = JSON.stringify(values) !== JSON.stringify(settingsOld.current.tools);
            setHasChanges(isChanged);
        }
    };

    useEffect(() => {
        if (settings && settings.tools) {
            settingsOld.current = { ...settings };
            setHasChanges(false);
            
            // Force update form values when settings change
            if (formApi.current && settings.tools.delete_data_on) {
                formApi.current.setValues(settings.tools);
            }
        }
    }, [settings]);

    const handleClick = async () => {
        const confirmation = window.confirm(__( "Are you sure you want to proceed?", "plugin-starter" ));
        if (confirmation) { 
            setProcessing(true);
            try {
                const result = await apiFetch({
                    path: "/plugin-starter/v1/options/reset-settings-all",
                    method: 'POST',
                });
                if (result.success) {
                    Toast.success({
                        content: __("Settings reset successfully!", "plugin-starter"),
                        duration: 3,
                        theme: 'light',
                        right: 15,
                    });
                } else {
                    Toast.error({
                        content: __("Error resetting settings. Please try again.", "plugin-starter"),
                        duration: 3,
                        theme: 'light',
                    });
                }
            } catch (error) {
                console.error("Error resetting settings:", error);
                Toast.error({
                    content: __("Error resetting settings. Please try again.", "plugin-starter"),
                    duration: 3,
                    theme: 'light',
                });
            } finally {
                setProcessing(false);
                if (setSettingsReload) {
                    setSettingsReload(Math.random());
                }
            }
        }
    };

    // Debug: Uncomment to see what's in settings
    // console.log('Settings:', settings);
    // console.log('Settings.tools:', settings?.tools);
    // console.log('delete_data_on:', settings?.tools?.delete_data_on);

    return (
        <>
            {!settingsLoading && settings?.tools && (
                <Form
                    getFormApi={(api) => formApi.current = api}
                    initValues={settings.tools}
                    onSubmit={onSubmit}
                    onValueChange={handleValuesChange}
                    labelPosition="left"
                    labelWidth="150px"
                >
                    <div className="setting-unit py-4">
                        <Row type="flex" gutter={[24, 24]}>
                            <Col xs={24} lg={12} xl={14}>
                                <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                                    <Title heading={4}>{__("Delete all the plugin data upon", "plugin-starter")}</Title>
                                    <Paragraph>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</Paragraph>
                                </Skeleton>
                            </Col>    
                            <Col xs={24} lg={12} xl={10}>
                                <Form.Select 
                                    noLabel
                                    className="w-full"
                                    field="delete_data_on"
                                    initValue={settings?.tools?.delete_data_on || 'none'}
                                    optionList={[
                                        { label: 'None', value: 'none' },
                                        { label: 'Delete', value: 'delete' },
                                        { label: 'Uninstall', value: 'uninstall' },
                                    ]}
                                />
                            </Col>
                        </Row>
                    </div>
                    <div className="setting-unit pt-4">
                        <Row type="flex" gutter={[24, 24]}>
                            <Col xs={24} lg={12} xl={14}>
                                <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                                    <Title heading={4}>{__("Reset Plugin", "plugin-starter")}</Title>
                                    <Paragraph>{__("Enable/Disable \"Scripts\" functionalities", "plugin-starter")}</Paragraph>
                                </Skeleton>
                            </Col>    
                            <Col xs={24} lg={12} xl={10}>
                                <Button 
                                    theme="solid"
                                    type="danger"
                                    icon={<IconRefresh />}
                                    loading={processing} 
                                    onClick={handleClick} 
                                >                                
                                    {
                                        processing ? __( "Resetting...", "plugin-starter" ) : __( "Reset All", "plugin-starter" )
                                    }
                                </Button>
                            </Col>
                        </Row>
                    </div>

                    <ActionButtons hasChanges={hasChanges} section='tools' handleReset={handleReset} />
                </Form>
            )}
        </>
    );
};

export default Tools;