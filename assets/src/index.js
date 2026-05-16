import React from "react";
import {
    //BrowserRouter,
    HashRouter
} from 'react-router-dom';
import apiFetch from '@wordpress/api-fetch';
import { createRoot } from "react-dom/client";
import App from "./App";
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

// import "@douyinfe/semi-ui/dist/css/semi.min.css";
import "./styles/style.css";
import "./styles/tailwind.css";

const container = document.getElementById("plugin-starter-settings-react-app");

if (container) {
    const root = createRoot(container);
    root.render(
        <HashRouter>
            <App />
        </HashRouter>
    );
} else {
    console.error("Target container '#plugin-starter-settings-react-app' not found in the DOM.");
}
