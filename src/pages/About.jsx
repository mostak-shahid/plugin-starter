import * as Bootstrap from 'react-bootstrap';
const { Card } = Bootstrap;
import { BoxedLayout } from '../layouts';

const About = () => {
    const sidebar = (
        <div style={{ padding: '24px', textAlign: 'center' }}>
            <img src="https://picsum.photos/150/150" alt="avatar" className="rounded-circle mb-3" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
            <h3>John Doe</h3>
            <div className="d-flex justify-content-center gap-3 mt-3">
                <span>🐙</span>
                <span>🐦</span>
                <span>📘</span>
            </div>
        </div>
    );

    return (
        <BoxedLayout sidebar={sidebar} sidebarPosition="left">
            <Card className="mb-0 rounded-0">
                <Card.Header>About</Card.Header>
                <Card.Body>
                    <p>This is the About page with left sidebar layout.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Card.Body>
            </Card>
        </BoxedLayout>
    );
};

export default About;
