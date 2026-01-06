import React from '@wordpress/element';
import { createRoot } from '@wordpress/element';
import FeedbackForm from './FeedbackForm';
import '../styles/main.scss';

const container = document.getElementById('plugin-starter-feedback-root');
if (container) {
    const root = createRoot(container);
    root.render(<FeedbackForm />);
}