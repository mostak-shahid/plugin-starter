import * as Bootstrap from 'react-bootstrap';
const { Card, Nav } = Bootstrap;
import { FullWidthLayout } from '../../layouts';

const FullWidthLeftSidebar = () => {
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
        <FullWidthLayout sidebarPosition="left" sidebar={sidebar}>     
            <Card className="mb-4 rounded-0">
                <Card.Header>Full Width Layout - Left Sidebar</Card.Header>
                <Card.Body>
                    <h3>Full Width Layout with Left Sidebar</h3>
                    <p>This layout demonstrates a full-width container with a left sidebar.</p>
                    <p>Ideal for content that needs contextual navigation on the left side.</p>
                </Card.Body>
            </Card>
        </FullWidthLayout>
    );
};

export default FullWidthLeftSidebar;
