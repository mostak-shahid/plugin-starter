import { __ } from "@wordpress/i18n";
import withForm from '../pages/withForm';
import apiFetch from "@wordpress/api-fetch";
import { useEffect, useState } from 'react';
import {OnlineSurvey, OnlineSurveyDark} from '../lib/Illustrations';
import { Button, Col, Row, Input, TextArea, Typography, Toast } from '@douyinfe/semi-ui';
import { IllustrationSuccess, IllustrationSuccessDark } from '@douyinfe/semi-illustrations';
import { IconSend } from '@douyinfe/semi-icons';
import {IllustrationControl} from "../components";
const Feedback = () => {
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [processing, setProcessing] = useState(false); // normal, processing, done
    const handleForm = async () => {
        if (subject && message) {
            setProcessing(true);
            try {
                const result = await apiFetch({
                    path: "/plugin-starter/v1/feedback",
                    method: "POST",
                    data: {
                        subject,
                        message
                    },
                    headers: {
                        'X-WP-Nonce': plugin_starter_ajax_obj.api_nonce
                    }
                });
                // You might want to handle success here
                console.log(result);
                if (result.success) {
                    setSubject('');
                    setMessage('');
                    Toast.success({
						content: __("Feedback send successfully!", "plugin-starter"),
						duration: 3,
                        theme: 'light',
                        left,
					});
                }

            } catch (error) {
                console.error("Mail Sending Error:", error);
                Toast.error({
                    content: __("Please try again!", "plugin-starter"),
                    duration: 3,
                    theme: 'light',
                    left,
                });
            } finally {
                setProcessing(false);
            }
        } else {
            alert('Subject or Message can\'t be Empty')
        }
    };
    
    const { Title } = Typography; 
    return (
        <>
            <div className="setting-unit mx-[3%]">
                <Row type="flex" gutter={[24,24]} align="middle">
                    <Col sx={24} lg={12}>
                        <OnlineSurvey/>
                        {/* <IllustrationControl
                            image={<OnlineSurvey style={{ width: 530, height: 530 }} />}
                            darkModeImage={<OnlineSurveyDark style={{ width: 530, height: 530 }} />}
                        /> */}
                    </Col> 
                    <Col sx={24} lg={12}>
                        <div className="mb-3">
                            <Title heading={6}>{__("Subject", "plugin-starter")}</Title>
                            <Input                                
                                value={ subject }
                                onChange={ ( value ) => setSubject( value ) }
                                className="mt-2"
                            />
                        </div>
                        <div className="mb-3">
                            <Title heading={6}>{__("Message", "plugin-starter")}</Title>
                            <TextArea
                                value={ message }
                                onChange={ ( value ) => setMessage( value ) }
                                className="mt-2"
                            />
                        </div>
                        <Button 
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
                        </Button>
                        
                    </Col>  
                </Row>
            </div>
        </>
    )
}
export default withForm(Feedback);