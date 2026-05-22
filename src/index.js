import './index.css'; // Tells Webpack to handle the CSS compilation
import { render } from '@wordpress/element';
import App from './App';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('plugin-starter-settings-react-app');
    if (container) {
        render(<App />, container);
    }
});
