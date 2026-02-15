import { Container, Row, Col } from 'react-bootstrap';

import { useSettingsBodyHeight } from '../lib/Helpers';

const BoxedLayout = ({ children, sidebar, sidebarPosition = 'none', className = '' }) => {
    const minHeight = useSettingsBodyHeight();

    if (sidebarPosition === 'none') {
        return (
            <Container fluid className={`py-4 ${className}`} style={{ minHeight }}>
                {children}
            </Container>
        );
    }

    return (
        <Container fluid className={`py-4 ${className}`} style={{ minHeight }}>
            <Row className="g-4">
                {sidebarPosition === 'left' && (
                    <Col xs={12} md={3} className="mb-3 mb-md-0">
                        {sidebar}
                    </Col>
                )}
                <Col xs={12} md={sidebarPosition !== 'none' ? 9 : 12}>
                    {children}
                </Col>
                {sidebarPosition === 'right' && (
                    <Col xs={12} md={3} className="mb-3 mb-md-0">
                        {sidebar}
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default BoxedLayout;
