import { useState, useEffect } from '@wordpress/element';
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import { Outlet, useLocation } from 'react-router-dom';
import {Card, Button, ToastContainer, Toast} from 'react-bootstrap';
// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Import the specific solid home icon
import { faHome, faTableColumns, faGear, faComment, faWebAwesome } from '@fortawesome/free-solid-svg-icons';

import { Layout } from '../../layouts';
import {VerticalMultiLevelNavbar} from '../../components/Menu/Menu';
import menuItems from '../../data/menu.json';
import { getMenu } from '../../data/menu.js';
import BreadcrumbControl from '../../components/BreadcrumbControl/BreadcrumbControl';
const Settings = () => {

    const [settings, setSettings] = useState({});
    const [settingsLoading, setSettingsLoading] = useState(false);
    const [settingsReload, setSettingsReload] = useState(0);
    const location = useLocation();

    const [proItems, setProItems] = useState([]);
    const [remoteItems, setRemoteItems] = useState([]);

    const [showToast, setShowToast] = useState(false);
    const [dataToast, setDataToast] = useState({title: '', content: '', type: 'success'});
    const toggleShowToast = () => setShowToast(!showToast);

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


    useEffect(() => {
        const fetchSettings = async () => {
            setSettingsLoading(true);
            try {
                const data = await apiFetch({
                    path: "/plugin-starter/v1/options",
                    method: 'GET'
                });
                if (data) {
                    setSettings(data);
                }
            } catch (error) {
                console.error("Error fetching settings:", error);
                setDataToast({
                    title: __("Error", "plugin-starter"),
                    content: __("Error fetching settings", "plugin-starter"),
                    type: 'danger'
                });
                setShowToast(true);
            } finally {
                setSettingsLoading(false);
            }
        };
        fetchSettings();
    }, [settingsReload]);


    const handleSubmit = async (section, values) => {
        try {
            const result = await apiFetch({
                path: "/plugin-starter/v1/options",
                method: 'POST',
                data: { plugin_starter_options: { ...settings, [section]: values } }
            });
            if (result.success) {
                setSettingsReload(Math.random());
                setDataToast({
                    title: __("Success", "plugin-starter"),
                    content: __("Settings saved successfully!!!", "plugin-starter"),
                    type: 'success'
                });
                setShowToast(true);

            } else {
                setDataToast({
                    title: __("Error", "plugin-starter"),
                    content: __("Error saving settings. Please try again.", "plugin-starter"),
                    type: 'danger'
                });
                setShowToast(true);
            }
        } catch (error) {
            console.error("Error saving settings:", error);
            setDataToast({
                title: __("Error", "plugin-starter"),
                content: __("Error saving settings. Please try again.", "plugin-starter"),
                type: 'danger'
            });
            setShowToast(true);
        } finally {
            setSettingsReload(prev => prev + 1);
        }
    };

    const handleReset = async (section) => {
        try {
            const result = await apiFetch({
                path: "/plugin-starter/v1/options/reset-settings",
                method: 'POST',
                data: { name: section }
            });
            if (result.success) {
                setSettingsReload(Math.random());
                setDataToast({
                    title: __("Success", "plugin-starter"),
                    content: __("Settings reset successfully!", "plugin-starter"),
                    type: 'success'
                });
                setShowToast(true);
            } else {
                setDataToast({
                    title: __("Error", "plugin-starter"),
                    content: __("Error resetting settings. Please try again.", "plugin-starter"),
                    type: 'danger'
                });
                setShowToast(true);
            }
        } catch (error) {
            console.error("Error resetting settings:", error);
            setDataToast({
                title: __("Error", "plugin-starter"),
                content: __("Error resetting settings. Please try again.", "plugin-starter"),
                type: 'danger'
            });
            setShowToast(true);
        } finally {
            setSettingsReload(prev => prev + 1);
        }
    };

    return (
        <Layout sidebarPosition="left" sidebar={sidebar}> 
            {/* {console.log('Current settings:', settings)} */}
            <BreadcrumbControl menu={menuData} url={location.pathname} className='mb-4 border rounded-0 p-2' />
            <Outlet 
                context={{ settings, settingsLoading, handleSubmit, handleReset, setSettingsReload }} 
            />


            <ToastContainer
                className="p-3"
                position='top-end'
                style={{ zIndex: 1 }}
            >
                <Toast 
                    bg={dataToast.type}
                    show={showToast} 
                    onClose={toggleShowToast}
                    delay={3000}
                    autohide
                >
                    <Toast.Header>
                        <strong className="me-auto">{dataToast.title}</strong>
                        {/* <small>11 mins ago</small> */}
                    </Toast.Header>
                    <Toast.Body className="text-white">{dataToast.content}</Toast.Body>
                </Toast>
            </ToastContainer>
        </Layout>
    );
};

export default Settings;