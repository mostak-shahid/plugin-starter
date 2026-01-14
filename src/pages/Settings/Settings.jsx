import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import { useState, useEffect } from 'react';
import { Layout, Nav, Card, Toast } from '@douyinfe/semi-ui';
import {FullWidthLayout} from '../../layouts';
import { 
  IconSetting, 
  IconListView, 
  IconUser, 
  IconTemplate,
  IconCloud,
  IconPlusCircle,
  IconLikeThumb 
} from '@douyinfe/semi-icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import menuItems from '../../data/menu.json';
import { getMenu } from '../../data/menu.js';
import PageInfo from "../../components/PageInfo/PageInfo"

const { Header, Sider, Content } = Layout;

const Settings = () => {
    const [settings, setSettings] = useState({});
    const [settingsLoading, setSettingsLoading] = useState(false);
    const [settingsReload, setSettingsReload] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

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
                // setSettings(prev => ({
                //     ...prev,
                //     [section]: values
                // }));
                Toast.success({
                    content: __("Settings saved successfully!!!", "plugin-starter"),
                    duration: 3,
                    theme: 'light',
                    right: 15,
                });
            } else {
                Toast.error({
                    content: __("Error saving settings. Please try again.", "plugin-starter"),
                    duration: 3,
                    theme: 'light',
                });
            }
        } catch (error) {
            console.error("Error saving settings:", error);
            Toast.error({
                content: __("Error saving settings. Please try again.", "plugin-starter"),
                duration: 3,
                theme: 'light',
            });
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
            console.log(result);
            if (result.success) {
                // const data = await apiFetch({
                //     path: "/plugin-starter/v1/options",
                //     method: 'GET'
                // });
                // setSettings(data);
                Toast.success({
                    content: __("Settings reset successfully!", "plugin-starter"),
                    duration: 3,
                    theme: 'light',
                    right: 15,
                });
            } else {
                Toast.error({
                    content: __("Error resetting settings. Please try again.", "plugin-starter"),
                    duration: 3,
                    theme: 'light',
                });
            }
        } catch (error) {
            console.error("Error resetting settings:", error);
            Toast.error({
                content: __("Error resetting settings. Please try again.", "plugin-starter"),
                duration: 3,
                theme: 'light',
            });
        } finally {
            setSettingsReload(prev => prev + 1);
        }
    };


    const [proItems, setProItems] = useState([]);
    const [remoteItems, setRemoteItems] = useState([]);

    // Load MF remote menu array (NOT the React component)
    useEffect(() => {
        if (plugin_starter_ajax_obj?.isPro) {
            import("pluginstarterpro/MenuItems")
                .then((mod) => {
                    setProItems(mod.default || []);
                })
                .catch(() => {
                    console.warn("Pro menu could not be loaded.");
                    setProItems([]);
                });
        }
    }, []);
    
    // Optional: load remote injected menu items
    useEffect(() => {
        if (plugin_starter_ajax_obj?.extraMenuItems) {
            setRemoteItems(plugin_starter_ajax_obj.extraMenuItems);
        }
    }, []);

    // Icon mapping
    const iconMap = {
        'page': <IconUser />,
        'layouts': <IconTemplate />,
        'basic-inputs': <IconSetting />,
        'array-inputs': <IconListView />,
        'import-export': <IconCloud />,
        'more': <IconPlusCircle />,
        'tools': <IconSetting />,
        'feedback': <IconLikeThumb />
    };

    // Get menu data from menu.js
    const menuData = getMenu({menuItems:menuItems, proItems: proItems, remoteItems:remoteItems});
    
    // Add icons to menu items
    const menuItemsWithIcons = menuData.map(item => ({
        ...item,
        icon: iconMap[item.itemKey] || <IconSetting />
    }));

    // Get currently selected keys from URL path
    const getSelectedKeys = () => {
        const pathSegments = location.pathname.split('/').filter(Boolean);
        // Remove 'settings' from the path and join remaining segments
        const relevantPath = pathSegments.slice(1).join('-');
        return [relevantPath];
    };

    // Get open keys for nested menus
    const getOpenKeys = () => {
        const pathSegments = location.pathname.split('/').filter(Boolean);
        const openKeys = [];
        
        // Build open keys from path segments
        if (pathSegments.includes('page')) {
            openKeys.push('page');
        }
        if (pathSegments.includes('layouts')) {
            openKeys.push('layouts');
            if (pathSegments.includes('boxed')) {
                openKeys.push('layouts-boxed');
            }
            if (pathSegments.includes('fullwidth')) {
                openKeys.push('layouts-fullwidth');
            }
        }
        
        return openKeys;
    };

    const handleSelect = (data) => {
        // Navigate to the URL from menu item
        const selectedItem = findMenuItem(menuItemsWithIcons, data.itemKey);
        if (selectedItem && selectedItem.url) {
        navigate(selectedItem.url);
        }
    };

    // Helper function to find menu item by key
    const findMenuItem = (items, key) => {
        for (const item of items) {
            if (item.itemKey === key) return item;
            if (item.items) {
                const found = findMenuItem(item.items, key);
                if (found) return found;
            }
        }
        return null;
    };
    
    const sidebar = (
        <>
            <Nav
                // isCollapsed={collapsed}
                items={menuItemsWithIcons}
                selectedKeys={getSelectedKeys()}
                defaultOpenKeys={getOpenKeys()}
                onSelect={handleSelect}
                footer={{
                    collapseButton: true,
                }}
                style={{height: '100%'}}
            />
        </>
    );

    return (
        <FullWidthLayout sidebar={sidebar} sidebarPosition="left">
            <Content>
                <Card 
                    // title={
                    //     <PageInfo url={location.pathname} />
                    // }
                    title="Title"
                    headerLine={true}
                >
                    <Outlet context={{ settings, settingsLoading, handleSubmit, handleReset }} />
                </Card>
            </Content>
        </FullWidthLayout>
    );
};

export default Settings;