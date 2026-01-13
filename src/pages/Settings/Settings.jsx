import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import { useState } from 'react';
import { Layout, Nav, Button, Toast } from '@douyinfe/semi-ui';
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
import settingsData from '../../data/settings.json';
import menuData from '../../data/menu.json';

const { Header, Sider, Content } = Layout;

const Settings = () => {
    const [settings, setSettings] = useState(settingsData);
    const navigate = useNavigate();
    const location = useLocation();

    // Shared handleSubmit function
    const handleSubmit = async (section, values) => {
        console.log(section, values);
        setSettings(prev => ({
            ...prev,
            [section]: values
        }));
        
        // console.log('Settings saved:', { section, values, fullSettings: { ...settings, [section]: values } });
        
        // Toast.success({
        //     content: `${section.charAt(0).toUpperCase() + section.slice(1)} settings saved successfully!`,
        //     duration: 3,
        // });
        try {
            const result = await apiFetch({
                path: "/plugin-starter/v1/options",
                method: 'POST',
                data: { plugin_starter_options: { ...settings, [section]: values } },
                // headers: {
                //     'X-WP-Nonce': plugin_starter_ajax_obj.api_nonce
                // }
            });
            // console.log(result);
            if (result.success) {
                // window.scrollTo(0, 0);
                // setSettingReload(Math.random);
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
            // setSaving(false);
        }
    };

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
                {/* Pass settings and handleSubmit to child routes */}
                <Outlet context={{ settings, handleSubmit }} />
            </Content>
        </FullWidthLayout>
    );
};

export default Settings;