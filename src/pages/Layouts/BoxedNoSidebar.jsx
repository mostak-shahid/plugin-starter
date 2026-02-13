import * as Bootstrap from 'react-bootstrap';
const { Card } = Bootstrap;
import { BoxedLayout } from '../../layouts';

const BoxedNoSidebar = () => {
    return (
        <BoxedLayout>     
            <Card className="mb-0 rounded-0">
                <Card.Header>Boxed Layout - No Sidebar</Card.Header>
                <Card.Body>
                    <h3>Boxed Layout without Sidebar</h3>
                    <p>This layout demonstrates a boxed container with a right sidebar for navigation.</p>
                    <p>Ideal for content that needs contextual navigation on the right side.</p>
                </Card.Body>
            </Card>
        </BoxedLayout>
    );
};

export default BoxedNoSidebar;
