import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import { useState, useEffect } from 'react';
import * as Bootstrap from 'react-bootstrap';
const { Card, Toast } = Bootstrap;
import { FullWidthLayout } from '../../layouts';
import { IconSetting, IconListView, IconUser, IconTemplate, IconCloud, IconPlusCircle, IconLikeThumb, IconHelpCircle, IconLikeHeart, IconUserAdd, IconSend, } from '@douyinfe/semi-icons';
import { Outlet, useLocation } from 'react-router-dom';
import menuItems from '../../data/menu.json';
import { getMenu } from '../../data/menu.js';
import { BreadcrumbControl, PageInfo, VerticalMenuControl } from "../../components";
import { Logo } from '../../lib/Illustrations';
import Details from '../../data/details.json';
import './Settings.scss';

const Settings = () => {
    const [settings, setSettings] = useState({});
    const [settingsLoading, setSettingsLoading] = useState(false);
    const [settingsReload, setSettingsReload] = useState(0);
    const location = useLocation();
    const [toast, setToast] = useState(null);

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

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleSubmit = async (section, values) => {
        try {
            const result = await apiFetch({
                path: "/plugin-starter/v1/options",
                method: 'POST',
                data: { plugin_starter_options: { ...settings, [section]: values } }
            });
            if (result.success) {
                setSettingsReload(Math.random());
                showToast(__("Settings saved successfully!!!", "plugin-starter"), 'success');
            } else {
                showToast(__("Error saving settings. Please try again.", "plugin-starter"), 'error');
            }
        } catch (error) {
            console.error("Error saving settings:", error);
            showToast(__("Error saving settings. Please try again.", "plugin-starter"), 'error');
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
                setSettingsReload(Math.random());
                showToast(__("Settings reset successfully!", "plugin-starter"), 'success');
            } else {
                showToast(__("Error resetting settings. Please try again.", "plugin-starter"), 'error');
            }
        } catch (error) {
            console.error("Error resetting settings:", error);
            showToast(__("Error resetting settings. Please try again.", "plugin-starter"), 'error');
        }
    };

    const [proItems, setProItems] = useState([]);
    const [remoteItems, setRemoteItems] = useState([]);

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
    
    useEffect(() => {
        if (plugin_starter_ajax_obj?.extraMenuItems) {
            setRemoteItems(plugin_starter_ajax_obj.extraMenuItems);
        }
    }, []);

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

    const menuData = getMenu({menuItems:menuItems, proItems: proItems, remoteItems:remoteItems});
    
    const menuItemsWithIcons = menuData.map(item => ({
        ...item,
        icon: iconMap[item.itemKey] || <IconSetting />
    }));

    const headerContent = {
        logo: <Logo width={36} height={36} />,
        text: Details?.name,
    };

    const footerContent = (
        <div className="d-flex flex-column gap-2">
            <a href="https://mostak-shahid.github.io/plugin/plugin-starter/vip-priority-support/" target="_blank" rel="noopener noreferrer">✉️ {__("VIP Priority Support", "plugin-starter")}</a>
            <a href="https://mostak-shahid.github.io/plugin/plugin-starter/docs/" target="_blank" rel="noopener noreferrer">❓ {__("Help Center", "plugin-starter")}</a>
            <a href="https://www.facebook.com/mospressbd" target="_blank" rel="noopener noreferrer">👥 {__("Join the Community", "plugin-starter")}</a>
            <a href="https://wordpress.org/support/plugin/plugin-starter/reviews/?filter=5#new-post" target="_blank" rel="noopener noreferrer">❤️ {__("Rate Us", "plugin-starter")}</a>
        </div>
    );
    
    const sidebar = (
        <VerticalMenuControl 
            items={menuItemsWithIcons}
            breakpoint={960}
            footerContent={footerContent}
            className="settings-page-menu"
        />
    );

    return (
        <FullWidthLayout sidebar={sidebar} sidebarPosition="left">
            <div className="ps-3 pe-3 pt-3">
                {toast && (
                    <div className={`toast-container position-fixed top-0 end-0 m-3 ${toast.type === 'error' ? 'text-bg-danger' : 'text-bg-success'}`}>
                        <div className="toast show">
                            <div className="toast-body">{toast.message}</div>
                        </div>
                    </div>
                )}
                <BreadcrumbControl menu={menuItemsWithIcons} url={location.pathname} />
                <Card className="mb-4 rounded-0">
                    <Card.Header>
                        <PageInfo menu={menuItemsWithIcons} url={location.pathname} />
                    </Card.Header>
                    <Card.Body className="p-0">
                        <Outlet context={{ settings, settingsLoading, handleSubmit, handleReset, setSettingsReload }} />
                    </Card.Body>
                </Card>
            </div>
        </FullWidthLayout>
    );
};

export default Settings;
