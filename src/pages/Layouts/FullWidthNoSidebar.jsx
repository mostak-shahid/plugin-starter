import * as Bootstrap from 'react-bootstrap';
const { Card } = Bootstrap;
import { FullWidthLayout } from '../../layouts';

const FullWidthNoSidebar = () => {
    return (
        <FullWidthLayout>     
            <Card className="mb-4 rounded-0">
                <Card.Header>Full Width Layout - No Sidebar</Card.Header>
                <Card.Body>
                    <h3>Full Width Layout without Sidebar</h3>
                    <p>This layout demonstrates a full-width container with no sidebar.</p>
                    <p>Ideal for content that spans the entire width of the screen.</p>
                </Card.Body>
            </Card>
        </FullWidthLayout>
    );
};

export default FullWidthNoSidebar;
