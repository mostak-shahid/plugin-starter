import { useState, useEffect } from '@wordpress/element';
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import { Outlet, useLocation } from 'react-router-dom';
import {Card, Button, Nav} from 'react-bootstrap';
// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Import the specific solid home icon
import { faHome, faGear, faHeadphones, faCircleQuestion, faCircleUser, faStar } from '@fortawesome/free-solid-svg-icons';

import { Layout } from '../../layouts';
import {VerticalMultiLevelNavbar} from '../../components/Menu/Menu';
import menuItems from '../../data/menu.json';
import { getMenu } from '../../data/menu.js';
import {setNestedValue} from '../../lib/Helpers.js';
import BreadcrumbControl from '../../components/BreadcrumbControl/BreadcrumbControl';
import ToastControl from '../../components/ToastControl/ToastControl.js';
import { PageInfo } from '../../components/index.js';
const Settings = () => {

    const [settings, setSettings] = useState({});
    const [settingsLoading, setSettingsLoading] = useState(false);
    const [settingsReload, setSettingsReload] = useState(0);

    const location = useLocation();

    const [proItems, setProItems] = useState([]);
    const [remoteItems, setRemoteItems] = useState([]);


    const [saving, setSaving] = useState(false);
    const [reseating, setReseating] = useState(false);

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
        // 'page': <FontAwesomeIcon icon={faHome} />,
        'inputs': <FontAwesomeIcon icon={faHome} />,
        // 'basic-inputs': <FontAwesomeIcon icon={faGear} />,
        // 'array-inputs': <FontAwesomeIcon icon={faWebAwesome} />,
        // 'import-export': <FontAwesomeIcon icon={faWebAwesome} />,
        // 'more': <FontAwesomeIcon icon={faWebAwesome} />,
        // 'tools': <FontAwesomeIcon icon={faHome} />,
        // 'feedback': <FontAwesomeIcon icon={faComment} />,
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
                            <FontAwesomeIcon icon={faCircleUser} />
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


    const handleChange = (fieldPath, value) => {
        // console.log("Field changed:", fieldPath, "New value:", value);
        setSettings(prev => {
            const updatedOptions = setNestedValue(prev, fieldPath, value);
            return { ...updatedOptions }; // Ensure React detects the update
        });
    };

    // const handleSubmit = async (section, values) => {
    const handleSubmit = async () => {
        try {
            setSaving(true);
            const result = await apiFetch({
                path: "/plugin-starter/v1/options",
                method: 'POST',
                // data: { plugin_starter_options: { ...settings, [section]: values } }
                data: { plugin_starter_options: settings }
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
            setSaving(false);
        }
    };

    const handleReset = async (section) => {
        try {
            setReseating(true);
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
            setReseating(false)
        }
    };

    return (
        <Layout sidebarPosition="left" sidebar={sidebar} fluid={true}> 
            {/* {console.log(settingsReload)} */}
            {/* {console.log('Current settings:', settings)} */}
            <BreadcrumbControl menu={menuData} url={location.pathname} className='mb-3 border rounded-0 py-2 px-3' />
            <div className='mb-3 border rounded-0 p-3'>
                <PageInfo menu={menuData} url={location.pathname} />
            </div>
            <div className='px-3 border'>
                <Outlet 
                    context={{ settings, settingsLoading, handleChange, setSettingsReload }} 
                />
                {console.log(location.pathname)}
                {
                    (
                        location.pathname !== '/settings/utilities/import_export'
                        && location.pathname !== '/settings/utilities/logs/table'
                    ) 
                        &&
                        <div className="d-flex align-items-center gap-2 mb-3">            
                            <Button 
                                variant="primary"
                                onClick={handleSubmit}
                                disabled={saving}
                            >
                                {saving?__('Saving', 'plugin-starter'):__('Save', 'plugin-starter')}
                            </Button>
                            <Button 
                                variant="danger"
                                disabled={reseating}
                                onClick={()=>handleReset(location.pathname.split('/').filter(Boolean).slice(1).join('.'))}
                            >
                                {reseating?__('Reseting', 'plugin-starter'):__('Reset', 'plugin-starter')}
                                {/* {path.split('/').filter(Boolean).slice(1).join('.')} */}
                                {/* {result = path.replace(/^\/[^\/]+\//, '').replace(/\//g, '.');} */}
                                {/* {console.log(location.pathname.split('/').filter(Boolean).slice(1).join('.'))} */}
                            </Button>
                        </div>
                }
            </div>
            <ToastControl 
                show={showToast}
                onClose={toggleShowToast}
                data={dataToast}
            />
        </Layout>
    );
};

export default Settings;