import { useEffect, useState } from 'react';
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import * as Bootstrap from 'react-bootstrap';
const { Card, Form, Button, Row, Col } = Bootstrap;
import { OnlineSurvey, OnlineSurveyDark } from '../lib/Illustrations';
import { BoxedLayout } from '../layouts';
import { PageInfo } from '../components';
import menuItems from '../data/menu.json';

const Feedback = () => {    
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (subject && message) {
            setProcessing(true);
            try {
                const result = await apiFetch({
                    path: "/plugin-starter/v1/feedback",
                    method: "POST",
                    data: { subject, message },
                    headers: { 'X-WP-Nonce': plugin_starter_ajax_obj.api_nonce }
                });
                console.log(result);
                if (result.success) {
                    setSubject('');
                    setMessage('');
                    alert(__("Feedback send successfully!", "plugin-starter"));
                }
            } catch (error) {
                console.error("Mail Sending Error:", error);
                alert(__("Please try again!", "plugin-starter"));
            } finally {
                setProcessing(false);
            }
        } else {
            alert('Subject or Message can\'t be Empty');
        }
    };

    return (
        <BoxedLayout>
            <Card className="mb-0 rounded-0">
                <Card.Header>
                    <PageInfo menu={menuItems} url="/feedback" />
                </Card.Header>
                <Card.Body>
                    <Row className="align-items-center g-4">
                        <Col xs={24} lg={12}>
                            <OnlineSurvey/>
                        </Col> 
                        <Col xs={24} lg={12}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>{__("Subject", "plugin-starter")}</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        placeholder={__("Subject", "plugin-starter")}
                                        required 
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>{__("Message", "plugin-starter")}</Form.Label>
                                    <Form.Control 
                                        as="textarea" 
                                        rows={4}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder={__("Message", "plugin-starter")}
                                        required 
                                    />
                                </Form.Group>
                                <div className="d-flex gap-2">
                                    <Button variant="primary" type="submit" disabled={processing}>
                                        {processing ? __("Sending...", "plugin-starter") : __("Submit", "plugin-starter")}
                                    </Button>
                                    <Button variant="danger" type="reset">{__("Reset", "plugin-starter")}</Button>
                                </div>
                            </Form>
                        </Col>  
                    </Row>
                </Card.Body>
            </Card>
        </BoxedLayout>
    );
};

export default Feedback;
