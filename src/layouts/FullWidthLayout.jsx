import { Container, Row, Col } from 'react-bootstrap';

import { useSettingsBodyHeight } from '../lib/Helpers';

const FullWidthLayout = ({ children, sidebar, sidebarPosition = 'none', className = '' }) => {
    const minHeight = useSettingsBodyHeight();

    if (sidebarPosition === 'none') {
        return (
            <div className={`p-4 ${className}`} style={{ minHeight }}>
                {children}
            </div>
        );
    }

    return (
        <div className={`d-flex ${className}`} style={{ minHeight }}>
            {sidebarPosition === 'left' && (
                <div className="flex-shrink-0" style={{ width: '250px' }}>
                    {sidebar}
                </div>
            )}
            <div className="flex-grow-1 p-4">
                {children}
            </div>
            {sidebarPosition === 'right' && (
                <div className="flex-shrink-0" style={{ width: '250px' }}>
                    {sidebar}
                </div>
            )}
        </div>
    );
};

export default FullWidthLayout;
