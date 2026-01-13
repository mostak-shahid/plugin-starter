import { useEffect, useState } from 'react';
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import { Form, Card } from '@douyinfe/semi-ui';
import { Button, Col, Row, Typography, Toast } from '@douyinfe/semi-ui';
import { IconSend } from '@douyinfe/semi-icons';
import {OnlineSurvey, OnlineSurveyDark} from '../lib/Illustrations';
import { BoxedLayout } from '../layouts';
const Feedback = () => {    
    const [initValues] = useState({
        subject: '',
        message: '',
    });
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

    const onSubmit = (values) => {
        handleSubmit('array', values);
    };
    
    const {
        Input,
        InputNumber,
        Select,
        Cascader,
        DatePicker,
        TimePicker,
        TextArea,
        CheckboxGroup,
        Checkbox,
        RadioGroup,
        Radio,
        Slider,
        Rating,
        Switch,
        TagInput,
        Section,
        TreeSelect,
    } = Form;

    const handleSubmit = (values) => {
        console.log(values);
        Toast.info('Submit Success');
    };

    return (
        <BoxedLayout>
            <Card title="Boxed Layout - Right Sidebar" headerLine={true}>
                <Row type="flex" gutter={[24,24]} align="middle">
                    <Col sx={24} lg={12}>
                        <OnlineSurvey/>
                        {/* <IllustrationControl
                            image={<OnlineSurvey style={{ width: 530, height: 530 }} />}
                            darkModeImage={<OnlineSurveyDark style={{ width: 530, height: 530 }} />}
                        /> */}
                    </Col> 
                    <Col sx={24} lg={12}>
                        <Form
                            initValues={initValues}
                            // style={{ padding: 10, width: '100%' }}
                            onValueChange={(v) => console.log(v)}
                            onSubmit={values => handleSubmit(values)}
                        >
                            <div className="mb-3">
                                <Input                                
                                    field="subject"
                                    label={__("Subject", "plugin-starter")}
                                    trigger="blur"
                                    // className="mt-2"
                                    rules={[
                                        { required: true, message: 'required Error' },
                                        { type: 'string', message: 'type error' },
                                        { validator: (rule, value) => value === 'semi', message: 'not semi' }
                                    ]}
                                />
                            </div>
                            <div className="mb-3">
                                <TextArea
                                    field="message"
                                    label={__("Message", "plugin-starter")}
                                    // className="mt-2"
                                    rules={[
                                        { required: true, message: 'required Error' },
                                        { type: 'string', message: 'type error' },
                                        { validator: (rule, value) => value === 'semi', message: 'not semi' }
                                    ]}
                                />
                            </div>
                            
                            <Button type="primary" htmlType="submit" className="btn-margin-right">
                                Submit
                            </Button>
                            <Button htmlType="reset">Reset</Button>
                            
                        </Form>
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