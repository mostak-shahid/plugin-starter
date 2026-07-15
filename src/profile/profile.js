import '../bootstrap-wrapper.scss';
import { render } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import ProfileApp from './ProfileApp';
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

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('plugin-starter-profile-react-app');
    if (container) {
        render(<ProfileApp/> , container);
    }
});
