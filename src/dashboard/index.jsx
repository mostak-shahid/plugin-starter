import React from '@wordpress/element';
import { createRoot } from '@wordpress/element';
import Dashboard from './Dashboard';
import '../styles/main.scss';
import '../styles/dashboard.scss';

const container = document.getElementById('plugin-starter-dashboard-root');
if (container) {
    const root = createRoot(container);
    root.render(<Dashboard />);
}