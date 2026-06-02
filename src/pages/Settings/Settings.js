import { useState, useEffect } from '@wordpress/element';
import { Outlet, useLocation } from 'react-router-dom';
import {Card, Button} from 'react-bootstrap';
// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Import the specific solid home icon
import { faHome, faTableColumns, faGear, faComment, faWebAwesome } from '@fortawesome/free-solid-svg-icons';

import { Layout } from '../../layouts';
import {VerticalMultiLevelNavbar} from '../../components/Menu/Menu';
import menuItems from '../../data/menu.json';
import { getMenu } from '../../data/menu.js';
const Settings = () => {
    const location = useLocation();
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
                MenuItems={menuItemsWithIcons}
            />
        </>
    );
    return (
        <Layout sidebarPosition="left" sidebar={sidebar} className="border-start border-end">     
            <Card>
                <Card.Header>Featured</Card.Header>
                <Card.Body>
                    <Card.Title>Special title treatment</Card.Title>
                    <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
                    </Card.Text>
                    <Outlet 
                        // context={{ settings, settingsLoading, handleSubmit, handleReset, setSettingsReload }} 
                    />
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </Layout>
    );
};

export default Settings;