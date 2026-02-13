import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    //BrowserRouter,
    HashRouter
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import apiFetch from '@wordpress/api-fetch';
// Configure apiFetch with REST API settings
// WordPress automatically uses window.wpApiSettings if available
// Fallback to manual configuration if needed
if (typeof window.wpApiSettings === 'undefined' && typeof plugin_starter_ajax_obj !== 'undefined') {
    window.wpApiSettings = {
        root: plugin_starter_ajax_obj.root,
        nonce: plugin_starter_ajax_obj.nonce
    };
}

// Ensure apiFetch uses the configured settings
if (typeof window.wpApiSettings !== 'undefined') {
    apiFetch.use(apiFetch.createRootURLMiddleware(window.wpApiSettings.root));
    apiFetch.use(apiFetch.createNonceMiddleware(window.wpApiSettings.nonce));
}
// Get the container element
const rootElement = document.getElementById('plugin-starter-settings-react-app');

// Check if the root element exists before rendering
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement); // Create a root
    root.render(
        <HashRouter>
            <App />
        </HashRouter>
    ); // Render the App component
} else {
    console.error("Target container '#plugin-starter-settings-react-app' not found in the DOM.");
}
