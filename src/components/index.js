import { __ } from "@wordpress/i18n";
import { Illustration404 } from '../lib/Illustrations';
import HorizontalMenuControl from './HorizontalMenuControl/HorizontalMenuControl';
import PageInfo from './PageInfo/PageInfo';


const NotFound = () => (
    <div style={{ textAlign: 'center', padding: '40px' }}>
        <Illustration404 style={{ width: 250, height: 250, display: 'inline-block' }} />
        <h3>{__("404 - Page Not Found", "plugin-starter")}</h3>
    </div>
);

export {
    HorizontalMenuControl,
    NotFound,
    PageInfo
};