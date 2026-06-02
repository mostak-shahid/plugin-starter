import { useState, useEffect } from '@wordpress/element';
import {Card, Button} from 'react-bootstrap';
// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Import the specific solid home icon
import { faHome, faTableColumns, faGear, faComment, faWebAwesome } from '@fortawesome/free-solid-svg-icons';

import { Layout } from '../../layouts';
import {HorizontalMultiLevelNavbar, VerticalMultiLevelNavbar} from '../../components/Menu/Menu';
import menuItems from '../../data/menu.json';
import { getMenu } from '../../data/menu.js';
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

    const [proItems, setProItems] = useState([]);
    const [remoteItems, setRemoteItems] = useState([]);
    useEffect(() => {
        // Check if the Pro version has loaded its global component hook
        if (window.PluginStarterProComponents && window.PluginStarterProComponents.menuItems) {
            setProItems(() => window.PluginStarterProComponents.menuItems);
        }
        // console.log('Feedback component mounted. ProContactForm available:', !!window.PluginStarterProComponents?.ContactForm);
    }, []);

    // // Load MF remote menu array (NOT the React component)
    // useEffect(() => {
    //     if (plugin_starter_ajax_obj?.isPro) {
    //         import("pluginstarterpro/MenuItems")
    //             .then((mod) => {
    //                 setProItems(mod.default || []);
    //             })
    //             .catch(() => {
    //                 console.warn("Pro menu could not be loaded.");
    //                 setProItems([]);
    //             });
    //     }
    // }, []);
    
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