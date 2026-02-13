import { useState } from 'react';
import { BoxedLayout } from '../layouts';
import * as Bootstrap from 'react-bootstrap';
const { Card, Form, Button } = Bootstrap;

const Contact = () => {
    const [formData, setFormData] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const values = Object.fromEntries(formData);
        console.log('Form submitted:', values);
        alert('Contact form submitted successfully!');
    };

    const sidebar = (
        <div style={{ padding: '24px' }}>
            <h3>Contact Details</h3>
            <div style={{ marginTop: '16px' }}>
                <p><strong>Phone:</strong></p>
                <p>+1 234 567 8900</p>
                <p style={{ marginTop: '16px' }}><strong>Email:</strong></p>
                <p>contact@example.com</p>
                <p style={{ marginTop: '16px' }}><strong>Address:</strong></p>
                <p>123 Main Street<br/>City, State 12345</p>
            </div>
        </div>
    );

    return (
        <BoxedLayout sidebar={sidebar} sidebarPosition='right'>
            <Card className="mb-0 rounded-0">
                <Card.Header>Contact Us</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" placeholder="Enter your name" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Enter your email" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Message</Form.Label>
                            <Form.Control as="textarea" name="message" rows={4} placeholder="Enter your message" required />
                        </Form.Group>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
        </BoxedLayout>
    );
};

export default Contact;
