import {Card, Button} from 'react-bootstrap';
// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Import the specific solid home icon
import { faHome, faTableColumns, faGear, faComment, faWebAwesome } from '@fortawesome/free-solid-svg-icons';

import { Layout } from '../../layouts';
import {HorizontalMultiLevelNavbar, VerticalMultiLevelNavbar} from '../../components/Menu/Menu';
const MenuItems = [
    { itemKey: 'dashboard', text: 'Dashboard', icon: <FontAwesomeIcon icon={faHome} />, url: '/' },
    { 
        itemKey: 'layouts', 
        text: 'Layouts', 
        icon: <FontAwesomeIcon icon={faTableColumns} />,
        url: '/layouts',
        items: [
            { itemKey: 'about', text: 'About', url: '/about' },
            { itemKey: 'contact', text: 'Contact', url: '/contact' },
            { itemKey: 'layouts-boxed', text: 'Boxed Layouts', url: '/layouts/boxed',
                items: [
                    { itemKey: 'layouts-boxed-nosidebar', text: 'No Sidebar', url: '/layouts/boxed/nosidebar' },
                    { itemKey: 'layouts-boxed-left-sidebar', text: 'Left Sidebar', url: '/layouts/boxed/left-sidebar' },
                    { itemKey: 'layouts-boxed-right-sidebar', text: 'Right Sidebar', url: '/layouts/boxed/right-sidebar' },
                ] 
            },
            { itemKey: 'layouts-full', text: 'Full Layouts', url: '/layouts/full',
                items: [
                    { itemKey: 'layouts-full-nosidebar', text: 'No Sidebar', url: '/layouts/full/nosidebar' },
                    { itemKey: 'layouts-full-left-sidebar', text: 'Left Sidebar', url: '/layouts/full/left-sidebar' },
                    { itemKey: 'layouts-full-right-sidebar', text: 'Right Sidebar', url: '/layouts/full/right-sidebar' },
                ] 
            },
        ] 
    },
    { itemKey: 'settings', text: 'Settings', icon: <FontAwesomeIcon icon={faGear} />, url: '/settings' },
    { itemKey: 'feedback', text: 'Feedback', icon: <FontAwesomeIcon icon={faComment} />, url: '/feedback' },
    ...(!plugin_starter_ajax_obj?.isPro ? [{ itemKey: 'free-vs-pro', text: 'Free vs Pro', icon: <FontAwesomeIcon icon={faWebAwesome} />, url: '/free-vs-pro' }] : []),
];
const BoxedLeftSidebar = () => {
    const sidebar = (
        <>
            <VerticalMultiLevelNavbar
                MenuItems={MenuItems}
            />
        </>
    );
    return (
        <Layout sidebarPosition="left" sidebar={sidebar}>     
            <Card>
                <Card.Header>Featured</Card.Header>
                <Card.Body>
                    <Card.Title>Special title treatment</Card.Title>
                    <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </Layout>
    );
};

export default BoxedLeftSidebar;