import { useEffect, useState } from 'react';
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import { Card, Input, Button, Col, Row, Typography, Notification, Space } from '@douyinfe/semi-ui';
import { IconSend } from '@douyinfe/semi-icons';
import {OnlineSurvey, OnlineSurveyDark} from '../lib/Illustrations';
import { BoxedLayout } from '../layouts';
import { PageInfo } from '../components';
import menuItems from '../data/menu.json';
const Feedback = () => {    
    const [formData, setFormData] = useState({
        subject: '',
        email: '',
        phone: '',
        message: '',
    });
    const [processing, setProcessing] = useState(false);

    const handleFieldChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleForm = async () => {
        console.log(formData);
        if (formData.subject && formData.message) {
            setProcessing(true);
            try {
                const result = await apiFetch({
                    path: "/plugin-starter/v1/feedback",
                    method: "POST",
                    data: {
                        subject: formData.subject,
                        email: formData.email,
                        phone: formData.phone,
                        message: formData.message
                    },
                    headers: {
                        'X-WP-Nonce': mos_product_specifications_tab_ajax_obj.api_nonce
                    }
                });
                console.log(result);
                if (result.success) {
                    setFormData({
                        subject: '',
                        email: '',
                        phone: '',
                        message: '',
                    });
                    Notification.success({
                        title: __("Success", "plugin-starter"),
                        content: __("Feedback send successfully!", "plugin-starter"),
                        duration: 3,
                    });
                }

            } catch (error) {
                console.error("Mail Sending Error:", error);
                Notification.error({
                    title: __("Error", "plugin-starter"),
                    content: __("Please try again!", "plugin-starter"),
                    duration: 3,
                });
            } finally {
                setProcessing(false);
            }
        } else {
            Notification.warning({
                title: __("Warning", "plugin-starter"),
                content: __("Subject or Message can't be Empty", "plugin-starter"),
                duration: 3,
            });
        }
    };

    return (
        <BoxedLayout>
            <Card 
                    title={
                        <PageInfo menu={menuItems} url="/feedback"  />
                    }
                    // title="Title"
                    headerLine={true}
                >
                <Row type="flex" gutter={[24,24]} align="middle">
                    <Col sx={24} lg={12}>
                        <OnlineSurvey/>
                        {/* <IllustrationControl
                            image={<OnlineSurvey style={{ width: 530, height: 530 }} />}
                            darkModeImage={<OnlineSurveyDark style={{ width: 530, height: 530 }} />}
                        /> */}
                    </Col> 
                    <Col sx={24} lg={12}>
                        <div>
                            <div className="mb-3">
                                <Input                                
                                    label={__("Subject", "plugin-starter")}
                                    value={formData.subject}
                                    onChange={(value) => handleFieldChange('subject', value)}
                                    placeholder={__("Subject", "plugin-starter")}
                                />
                            </div>
                            <div className="mb-3">
                                <Input                                
                                    label={__("Email", "plugin-starter")}
                                    value={formData.email}
                                    onChange={(value) => handleFieldChange('email', value)}
                                    placeholder={__("Email", "plugin-starter")}
                                />
                            </div>
                            <div className="mb-3">
                                <Input                                
                                    label={__("Phone", "plugin-starter")}
                                    value={formData.phone}
                                    onChange={(value) => handleFieldChange('phone', value)}
                                    placeholder={__("Phone", "plugin-starter")}
                                />
                            </div>
                            <div className="mb-3">
                                <Input.TextArea
                                    label={__("Message", "plugin-starter")}
                                    value={formData.message}
                                    onChange={(value) => handleFieldChange('message', value)}
                                    placeholder={__("Message", "plugin-starter")}
                                    rows={4}
                                />
                            </div>
                            <Space>
                                <Button 
                                    theme="solid" 
                                    type="primary" 
                                    onClick={handleForm}
                                    loading={processing}
                                >
                                    {__("Send", "plugin-starter")}
                                </Button>

                            </Space>
                            
                        </div>
                        {/* <Button 
                            theme="solid"
                            type="primary"
                            icon={<IconSend />}
                            loading={processing} 
                            onClick={handleForm} 
                            style={{ marginRight: 14 }}
                        >                                
                            {
                                processing ? __( "Sending...", "plugin-starter" ) : __( "Send", "plugin-starter" )
                            }
                        </Button> */}
                        
                    </Col>  
                </Row>
            </Card>
        </BoxedLayout>
    );
};

export default Feedback;