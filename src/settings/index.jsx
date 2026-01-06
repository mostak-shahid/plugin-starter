import React from '@wordpress/element';
import { createRoot } from '@wordpress/element';
import BaseInputs from './BaseInputs';
import ArrayInputs from './ArrayInputs';
import '../styles/main.scss';
import '../styles/settings.scss';

const SettingsApp = () => {
    // Determine current page from URL
    const currentPage = new URLSearchParams(window.location.search).get('page');
    
    return (
        <div className="plugin-starter-settings">
            {currentPage === 'plugin-starter-base-inputs' && <BaseInputs />}
            {currentPage === 'plugin-starter-array-inputs' && <ArrayInputs />}
        </div>
    );
};

const container = document.getElementById('plugin-starter-settings-root');
if (container) {
    const root = createRoot(container);
    root.render(<SettingsApp />);
}