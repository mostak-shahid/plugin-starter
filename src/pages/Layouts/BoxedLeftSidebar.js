import { useState, useEffect } from '@wordpress/element';
import { __ } from "@wordpress/i18n";
import {Card, Button, Nav, Badge} from 'react-bootstrap';
// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Import the specific solid home icon
import { faHome, faTableColumns, faGear, faComment, faWebAwesome, faHeadphones, faCircleQuestion, faUser, faStar } from '@fortawesome/free-solid-svg-icons';

import { Layout } from '../../layouts';
import {VerticalMultiLevelNavbar} from '../../components/Menu/Menu';
import menuItems from '../../data/menu.json';
import { getMenu } from '../../data/menu.js';
import Details from '../../data/details.json';
import { Logo } from '../../lib/Illustrations';
const BoxedLeftSidebar = () => {

    const [proItems, setProItems] = useState([]);
    const [remoteItems, setRemoteItems] = useState([]);
    useEffect(() => {
        // Check if the Pro version has loaded its global component hook
        if (window.PluginStarterProComponents && window.PluginStarterProComponents.menuItems) {
            setProItems(() => window.PluginStarterProComponents.menuItems);
        }
        // console.log('Feedback component mounted. ProContactForm available:', !!window.PluginStarterProComponents?.ContactForm);
    }, []);
    
    // Optional: load remote injected menu items
    useEffect(() => {
        if (plugin_starter_ajax_obj?.extraMenuItems) {
            setRemoteItems(plugin_starter_ajax_obj.extraMenuItems);
        }
    }, []);

    // Icon mapping
    const iconMap = {
        'page': <FontAwesomeIcon icon={faHome} />,
        'layouts': <FontAwesomeIcon icon={faTableColumns} />,
        'basic-inputs': <FontAwesomeIcon icon={faGear} />,
        'array-inputs': <FontAwesomeIcon icon={faWebAwesome} />,
        'import-export': <FontAwesomeIcon icon={faWebAwesome} />,
        'more': <FontAwesomeIcon icon={faWebAwesome} />,
        'tools': <FontAwesomeIcon icon={faHome} />,
        'feedback': <FontAwesomeIcon icon={faComment} />,
        'support': <FontAwesomeIcon icon={faHeadphones} />,
        'help': <FontAwesomeIcon icon={faCircleQuestion} />,
    };

    // Get menu data from menu.js
    const menuData = getMenu({menuItems:menuItems, proItems: proItems, remoteItems:remoteItems});
    
    // Add icons to menu items
    const menuItemsWithIcons = menuData.map(item => ({
        ...item,
        icon: iconMap[item.itemKey] || <FontAwesomeIcon icon={faGear} />
    }));

    const sidebar = (
        <>
            <VerticalMultiLevelNavbar
                headerContent={{
                    logo: <Logo width={36} height={36} />,
                    text: __("Plugin Starter", "plugin-starter"),
                }}
                MenuItems={menuItemsWithIcons}
                footerContent={(
                    <Nav className="flex-column">
                        <Nav.Link href="https://wordpress.org/support/plugin/plugin-starter/" target='_blank' className="d-flex align-items-center gap-2" style={{paddingLeft: 16}}>
                            <FontAwesomeIcon icon={faHeadphones} />
                            {__("VIP Priority Support", "plugin-starter")} 
                        </Nav.Link>
                        <Nav.Link href="https://mostak-shahid.github.io/plugins/plugin-starter.html" target='_blank' className="d-flex align-items-center gap-2" style={{paddingLeft: 16}}>
                            <FontAwesomeIcon icon={faCircleQuestion} />
                            {__("Help Center", "plugin-starter")}
                        </Nav.Link>
                        <Nav.Link href="https://www.facebook.com/mospressbd" target='_blank' className="d-flex align-items-center gap-2" style={{paddingLeft: 16}}>
                            <FontAwesomeIcon icon={faUser} />
                            {__("Community", "plugin-starter")}
                        </Nav.Link>
                        <Nav.Link href="https://wordpress.org/support/plugin/plugin-starter/reviews/" target='_blank' className="d-flex align-items-center gap-2" style={{paddingLeft: 16}}>
                            <FontAwesomeIcon icon={faStar} />
                            {__("Rate Us", "plugin-starter")}
                        </Nav.Link>
                    </Nav>
                )}
            />
        </>
    );
    return (
        <Layout sidebarPosition="left" sidebar={sidebar} className="border-start border-end ps-0 pe-0">     
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