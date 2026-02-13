import * as Bootstrap from 'react-bootstrap';
const { Card, Nav } = Bootstrap;
import { BoxedLayout } from '../../layouts';

const BoxedRightSidebar = () => {
    const sidebar = (
        <Nav className="flex-column p-2" variant="pills">
            <Nav.Item><Nav.Link href="#">👤 User Management</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href="#">⭐ Union Center</Nav.Link></Nav.Item>
            <NavDropdownCustom title="👥 Union Management">
                <NavDropdown.Item>Announcement Settings</NavDropdown.Item>
                <NavDropdown.Item>Union Query</NavDropdown.Item>
                <NavDropdown.Item>Entry Information</NavDropdown.Item>
            </NavDropdownCustom>
            <NavDropdownCustom title="⚙️ Task Platform">
                <NavDropdown.Item>Task Management</NavDropdown.Item>
                <NavDropdown.Item>User Task Query</NavDropdown.Item>
            </NavDropdownCustom>
        </Nav>
    );

    const NavDropdownCustom = ({ title, children }) => (
        <div className="nav-item dropdown">
            <button className="nav-link dropdown-toggle btn btn-link text-start w-100" data-bs-toggle="dropdown">
                {title}
            </button>
            <ul className="dropdown-menu w-100">{children}</ul>
        </div>
    );

    return (
        <BoxedLayout sidebarPosition="right" sidebar={sidebar}>     
            <Card className="mb-0 rounded-0">
                <Card.Header>Boxed Layout - Right Sidebar</Card.Header>
                <Card.Body>
                    <h3>Boxed Layout with Right Sidebar</h3>
                    <p>This layout demonstrates a boxed container with a right sidebar for navigation.</p>
                    <p>Ideal for content that needs contextual navigation on the right side.</p>
                </Card.Body>
            </Card>
        </BoxedLayout>
    );
};

export default BoxedRightSidebar;
