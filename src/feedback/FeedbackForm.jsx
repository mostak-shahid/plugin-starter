import React, { useState } from '@wordpress/element';
import {
    Card,
    CardBody,
    TextControl,
    TextareaControl,
    Button,
    Notice
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

const FeedbackForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate form
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            setMessage({
                text: __('Please fill in all fields.', 'plugin-starter'),
                type: 'error'
            });
            return;
        }

        try {
            setSubmitting(true);
            setMessage({ text: '', type: '' });

            const response = await apiFetch({
                path: '/plugin-starter/v1/feedback',
                method: 'POST',
                data: formData
            });

            if (response.success) {
                setMessage({
                    text: response.message || __('Thank you for your feedback!', 'plugin-starter'),
                    type: 'success'
                });
                
                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            }
        } catch (error) {
            setMessage({
                text: error.message || __('Failed to send feedback. Please try again.', 'plugin-starter'),
                type: 'error'
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="feedback-page">
            <Card>
                <CardBody>
                    <h2>{__('Send Feedback', 'plugin-starter')}</h2>
                    <p className="description">
                        {__('We\'d love to hear from you! Share your thoughts, suggestions, or report issues.', 'plugin-starter')}
                    </p>

                    {message.text && (
                        <Notice
                            status={message.type}
                            isDismissible={true}
                            onRemove={() => setMessage({ text: '', type: '' })}
                        >
                            {message.text}
                        </Notice>
                    )}

                    <form onSubmit={handleSubmit} className="feedback-form">
                        <TextControl
                            label={__('Your Name', 'plugin-starter')}
                            value={formData.name}
                            onChange={(value) => handleChange('name', value)}
                            required
                            disabled={submitting}
                        />

                        <TextControl
                            label={__('Your Email', 'plugin-starter')}
                            type="email"
                            value={formData.email}
                            onChange={(value) => handleChange('email', value)}
                            required
                            disabled={submitting}
                        />

                        <TextControl
                            label={__('Subject', 'plugin-starter')}
                            value={formData.subject}
                            onChange={(value) => handleChange('subject', value)}
                            required
                            disabled={submitting}
                        />

                        <TextareaControl
                            label={__('Message', 'plugin-starter')}
                            value={formData.message}
                            onChange={(value) => handleChange('message', value)}
                            rows={8}
                            required
                            disabled={submitting}
                            help={__('Please provide detailed information about your feedback.', 'plugin-starter')}
                        />

                        <div className="form-actions">
                            <Button
                                variant="primary"
                                type="submit"
                                isBusy={submitting}
                                disabled={submitting}
                            >
                                {submitting ? __('Sending...', 'plugin-starter') : __('Send Feedback', 'plugin-starter')}
                            </Button>
                        </div>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
};

export default FeedbackForm;