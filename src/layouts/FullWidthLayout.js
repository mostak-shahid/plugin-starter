import {useSettingsBodyHeight} from '../lib/Helpers';
import {Container} from 'react-bootstrap';
const FullWidthLayout = ({ children, sidebar, sidebarPosition='none', className='' }) => {
    const minHeight = useSettingsBodyHeight();
    return (
        <Container fluid={true} className={`full-width-layout ${className}`}>
            <div className="d-flex align-items-stretch">
                {sidebarPosition === 'left' &&
                    <div 
                        className="full-width-layout-sidebar full-width-layout-sidebar-left border-end" 
                        // style={{ width: 250, height: '100%' }}
                        style={{ minHeight: minHeight ? `${minHeight}px` : 'auto', width: '100%', maxWidth: 250 }}
                    >
                        {sidebar}
                    </div>            
                }
                <div className="p-4 w-100">
                    {children}
                </div>
                {sidebarPosition === 'right' &&
                    <div 
                        className="full-width-layout-sidebar full-width-layout-sidebar-right border-start" 
                        // style={{ width: 250, height: '100%' }}
                        style={{ minHeight: minHeight ? `${minHeight}px` : 'auto', width: '100%', maxWidth: 250 }}
                    >
                        {sidebar}
                    </div>            
                }
            </div>
        </Container>
    );
};

export default FullWidthLayout;