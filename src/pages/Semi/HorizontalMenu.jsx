import { __ } from "@wordpress/i18n";
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Nav,
    Space,
    SideSheet,
    Button,
    Badge,
} from '@douyinfe/semi-ui';
import {
    IconStar,
    IconSetting,
    IconMenu,
    IconHome,
    IconMember,
    IconBookStroked,
    IconHelpCircleStroked,
    IconUserGroup,
    IconEdit,
    IconHorn,
    IconBellStroked,
    IconSun,
    IconMoon,
} from '@douyinfe/semi-icons';
import { Logo, MegaphoneStroked } from '../../lib/Illustrations';

const items = [
    { itemKey: 'welcome', text: 'Welcome', icon: <IconHome />, url: '/semi/welcome' },
    { itemKey: 'settings', text: 'Settings', icon: <IconSetting />, url: '/semi/settings' },
    { itemKey: 'feedback', text: 'Feedback', icon: <IconStar />, url: '/semi/feedback' },
    { itemKey: 'free-vs-pro', text: 'Free vs Pro', icon: <IconMember />, url: '/semi/free-vs-pro' },
    {
        itemKey: 'union-management',
        text: 'Union Management',
        icon: <IconUserGroup />,
        url: '/semi/union-management',
        items: [
            { itemKey: 'announcement-settings', text: 'Announcement Settings', url: '/semi/union-management/announcement-settings' },
            { itemKey: 'union-query', text: 'Union Query', url: '/semi/union-management/union-query' },
            { itemKey: 'entry-information', text: 'Entry Information', url: '/semi/union-management/entry-information' },
        ],
    },
    {
        itemKey: 'approve-management',
        text: 'Approval Management',
        icon: <IconEdit />,
        url: '/semi/approve-management',
        items: [
            { itemKey: 'check-in-review', text: 'Check-in Review', url: '/semi/approve-management/check-in-review' },
            {
                itemKey: 'operation-management',
                text: 'Operations Management',
                url: '/semi/approve-management/operation-management',
                items: [
                    { itemKey: 'personnel-management', text: 'Personnel Management', url: '/semi/approve-management/operation-management/personnel-management' },
                    { itemKey: 'personnel-change', text: 'Personnel Change', url: '/semi/approve-management/operation-management/personnel-change' },
                ],
            },
            {
                itemKey: 'product-management',
                text: 'Product Management',
                url: '/semi/approve-management/product-management',
                items: [
                    { itemKey: 'personnel-management', text: 'Personnel Management', url: '/semi/approve-management/product-management/personnel-management' },
                    { itemKey: 'personnel-change', text: 'Personnel Change', url: '/semi/approve-management/product-management/personnel-change' },
                ],
            },
        ],
    },
    {
        text: 'Task Platform',
        icon: <IconSetting />,
        itemKey: 'job',
        url: '/semi/job',
        items: [
            { itemKey: 'task-management', text: 'Task Management', url: '/semi/job/task-management' },
            { itemKey: 'user-task-query', text: 'User Task Query', url: '/semi/job/user-task-query' },
        ],
    },
];

import Details from '../../data/details.json';

export default function HorizontalMenu() {
    const navigate = useNavigate();
    const location = useLocation();

    const BREAKPOINT = 960;
    const [isCollapse, setIsCollapse] = useState(window.innerWidth <= BREAKPOINT);
    const [menuVisible, setMenuVisible] = useState(false);
    const [newsVisible, setNewsVisible] = useState(false);
    const [darkmode, setDarkmode] = useState(false);

    const [openKeys, setOpenKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);

    useEffect(() => {
        const handleResize = () => {
            setIsCollapse(window.innerWidth <= BREAKPOINT);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    
    const switchMode = () => {
        const body = document.body;
        if (body.hasAttribute('theme-mode')) {
            body.removeAttribute('theme-mode');
        } else {
            body.setAttribute('theme-mode', 'dark');
        }
        setDarkmode(!darkmode);
    };

    const headerContent = {
        logo: <Logo width={36} height={36} />,
        text: Details?.name,
    };

    const footerContent = (
        <Space align='center'>  
            <Badge count={Details?.version} theme='light' countStyle={{padding: 8, height: 'auto'}} />    
            <Button theme='outline' icon={darkmode?<IconSun />:<IconMoon />} aria-label="Mode" onClick={switchMode} />
            <Button theme='outline' icon={<IconBookStroked />} aria-label="Screenshot" />
            <Button theme='outline' icon={<IconHelpCircleStroked />} aria-label="Screenshot" />
            <Badge count={5}>
                <Button theme='outline' icon={<IconBellStroked />} onClick={() => setNewsVisible(true)} aria-label="Screenshot" />
            </Badge>
        </Space>
    );

    useEffect(() => {
        const path = location.pathname;
        const active = findActiveKeys(items, path);
        setSelectedKeys([active.selected]);
        setOpenKeys(active.openKeys);
    }, [location.pathname]);

    const findActiveKeys = (menuItems, path, parents = []) => {
        for (const item of menuItems) {
            if (item.url === path) {
                return { selected: item.itemKey, openKeys: parents };
            }
            if (item.items) {
                const result = findActiveKeys(item.items, path, [...parents, item.itemKey]);
                if (result.selected) return result;
            }
        }
        return { selected: '', openKeys: [] };
    };

    const findItemByKey = (menuItems, key) => {
        for (const item of menuItems) {
            if (item.itemKey === key) return item;
            if (item.items) {
                const result = findItemByKey(item.items, key);
                if (result) return result;
            }
        }
        return null;
    };

    // --- Accordion utilities ---
    const findParentKeys = (menuItems, targetKey, parents = []) => {
        for (const item of menuItems) {
            if (item.itemKey === targetKey) return parents;
            if (item.items) {
                const found = findParentKeys(item.items, targetKey, [...parents, item.itemKey]);
                if (found.length > 0) return found;
            }
        }
        return [];
    };

    const isSameLevel = (a, b) => {
        if (a.length !== b.length) return false;
        return a.every((v, i) => v === b[i]);
    };

    // --- Shared handlers (horizontal stays as-is, vertical gets accordion) ---
    const handleOpenChange = (data, mode = 'horizontal') => {
        const keys = Array.isArray(data) ? data : data?.openKeys || [];

        if (mode === 'vertical') {
            // Accordion per level
            if (keys.length > openKeys.length) {
                const newlyOpenedKey = keys.find((k) => !openKeys.includes(k));
                const parentKeys = findParentKeys(items, newlyOpenedKey);
                const filteredKeys = openKeys.filter((k) => {
                    const parentOfK = findParentKeys(items, k);
                    return !isSameLevel(parentOfK, parentKeys);
                });
                setOpenKeys([...filteredKeys, newlyOpenedKey]);
            } else {
                setOpenKeys(keys);
            }
        } else {
            // Normal horizontal menu
            setOpenKeys(keys);
        }
    };

    const handleSelect = (data, mode = 'horizontal') => {
        const itemKey = data?.itemKey;
        if (!itemKey) return;

        const found = findItemByKey(items, itemKey);

        if (mode === 'vertical' && found?.items?.length) {
            const isOpen = openKeys.includes(itemKey);
            const parentKeys = findParentKeys(items, itemKey);

            setOpenKeys((prev) => {
                const filtered = prev.filter((k) => {
                    const parentOfK = findParentKeys(items, k);
                    return !isSameLevel(parentOfK, parentKeys);
                });
                return isOpen ? filtered : [...filtered, itemKey];
            });
        } else if (found?.url) {
            navigate(found.url);
        }

        setSelectedKeys([itemKey]);
        setMenuVisible(false);
    };

    return (
        <>
            {!isCollapse ? (
                // --- Desktop (Horizontal) ---
                <Nav
                    mode="horizontal"
                    items={items}
                    selectedKeys={selectedKeys}
                    openKeys={openKeys}
                    onOpenChange={(data) => handleOpenChange(data, 'horizontal')}
                    onSelect={(data) => handleSelect(data, 'horizontal')}
                    header={headerContent}
                    footer={footerContent}
                />
            ) : (
                // --- Mobile Header ---
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 16px',
                        backgroundColor: 'var(--semi-color-bg-1)',
                        borderBottom: '1px solid var(--semi-color-border)',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {headerContent.logo}
                        <span style={{ marginLeft: 8, fontWeight: 600 }}>
                            {headerContent.text}
                        </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {footerContent}
                        <Button
                            icon={<IconMenu />}
                            type="tertiary"
                            onClick={() => setMenuVisible(true)}
                        />
                    </div>
                </div>
            )}

            {/* --- SideSheet (Vertical / Accordion Menu on Mobile) --- */}
            <SideSheet
                placement="right"
                visible={menuVisible}
                onCancel={() => setMenuVisible(false)}
                title={__("Menu", "plugin-starter")}
                closeOnEsc={true}
            >
                <Nav
                    mode="vertical"
                    items={items}
                    selectedKeys={selectedKeys}
                    openKeys={openKeys}
                    onOpenChange={(data) => handleOpenChange(data, 'vertical')}
                    onSelect={(data) => handleSelect(data, 'vertical')}
                    footer={{ collapseButton: false }}
                    style={{ width: '100%', height: '100%', borderRight: 'none' }}
                />
            </SideSheet>

            {/* --- What's New SideSheet --- */}
            <SideSheet
                placement="right"
                visible={newsVisible}
                onCancel={() => setNewsVisible(false)}
                title={__("What's New?", "plugin-starter")}
                closeOnEsc={true}
            >
                <p>Feature updates and news content go here...</p>
            </SideSheet>
        </>
    );
}
