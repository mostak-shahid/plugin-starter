import {useSettingsBodyHeight} from '../lib/Helpers';
import {Container} from 'react-bootstrap';
const BoxedLayout = ({ children, sidebar, sidebarPosition='none', className='' }) => {
    const minHeight = useSettingsBodyHeight();
    return (
        <Container className={`boxed-layout ${className}`}>
            <div className="d-flex align-items-stretch">
                {sidebarPosition === 'left' &&
                    <div 
                        className="boxed-layout-sidebar boxed-layout-sidebar-left border-end" 
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
                        className="boxed-layout-sidebar boxed-layout-sidebar-right border-start" 
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

export default BoxedLayout;