import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import { useState, useEffect } from '@wordpress/element';
import {Card, Button, Container, Row, Col, Form, FloatingLabel, InputGroup} from 'react-bootstrap';
// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Import the specific solid home icon
import { faPaperPlane} from '@fortawesome/free-solid-svg-icons';

import { Layout } from '../layouts';
import {PageInfo} from '../components';
import {OnlineSurvey, OnlineSurveyDark} from '../lib/Illustrations';
import menuItems from '../data/menu.json';
const Feedback = () => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        console.log('Form submitted with data:', formData);
    };


    const [formData, setFormData] = useState({
        name: '',
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
                        'X-WP-Nonce': plugin_starter_ajax_obj.api_nonce
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
        <Layout sidebarPosition="none" fluid={true}>  
            <Container> 
                <Card>
                    <Card.Header>
                        <PageInfo menu={menuItems} url="/feedback"  /> 
                    </Card.Header>
                    <Card.Body>                              
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Row className="align-items-center">
                                <Col lg={6}>
                                    <OnlineSurvey/>
                                </Col>
                                <Col lg={6}>
                                    <FloatingLabel
                                        controlId="floatingName"
                                        label={__('Name', 'plugin-starter')}
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            type="text"
                                            placeholder={__('Name', 'plugin-starter')}
                                            value={formData.name}
                                            onChange={(e) => handleFieldChange('name', e.target.value)}
                                        />
                                    </FloatingLabel>

                                    <FloatingLabel
                                        controlId="floatingSubject"
                                        label={__('Subject', 'plugin-starter')}
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            type="text"
                                            placeholder={__('Subject', 'plugin-starter')}
                                            value={formData.subject}
                                            onChange={(e) => handleFieldChange('subject', e.target.value)}
                                        />
                                    </FloatingLabel>

                                    <FloatingLabel
                                        controlId="floatingEmail"
                                        label={__('Email address', 'plugin-starter')}
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            required
                                            type="email"
                                            placeholder={__('Email address', 'plugin-starter')}
                                            value={formData.email}
                                            onChange={(e) => handleFieldChange('email', e.target.value)}
                                        />
                                    </FloatingLabel>

                                    <FloatingLabel
                                        controlId="floatingPhone"
                                        label={__('Phone', 'plugin-starter')}
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            type="tel"
                                            placeholder={__('Phone', 'plugin-starter')}
                                            value={formData.phone}
                                            onChange={(e) => handleFieldChange('phone', e.target.value)}
                                        />
                                    </FloatingLabel>

                                    <FloatingLabel
                                        controlId="floatingMessage"
                                        label={__('Message', 'plugin-starter')}
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            as="textarea"
                                            rows={15}
                                            placeholder={__('Message', 'plugin-starter')}
                                            value={formData.message}
                                            onChange={(e) => handleFieldChange('message', e.target.value)}
                                        />
                                    </FloatingLabel>
                                    <Button type="submit">
                                        <FontAwesomeIcon icon={faPaperPlane} /> {__('Send', 'plugin-starter')}
                                    </Button>
                                </Col>
                            </Row>
                            
                        </Form> 
                    </Card.Body>
                </Card>
            </Container> 
        </Layout>
    );
};
export default Feedback;