import { useState, useEffect } from 'react';
import { Nav } from '@douyinfe/semi-ui';
import {
    IconStar,
    IconUser,
    IconUserGroup,
    IconSetting,
    IconEdit,
} from '@douyinfe/semi-icons';
import { useNavigate, useLocation } from 'react-router-dom';

const items = [
    { itemKey: 'user', text: 'User Management', icon: <IconUser />, url: '/semi/user' },
    { itemKey: 'union', text: 'Union Center', icon: <IconStar />, url: '/semi/union' },
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

export default function VerticalMenu() {
    const navigate = useNavigate();
    const location = useLocation();

    const BREAKPOINT = 960;
    const [isCollapse, setIsCollapse] = useState(window.innerWidth <= BREAKPOINT);
    
    const [openKeys, setOpenKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);

    // Handle responsive
    useEffect(() => {
        const handleResize = () => {
            setIsCollapse(window.innerWidth <= BREAKPOINT);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Find active keys based on route
    useEffect(() => {
        const path = location.pathname;
        const active = findActiveKeys(items, path);
        setSelectedKeys([active.selected]);
        setOpenKeys(active.openKeys);
    }, [location.pathname]);

    // Find active keys recursively
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

    // Find item by key
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

    // Handle open/close (submenu toggle)
    const handleOpenChange = (data) => {
        // Ensure we always work with an array
        const keys = Array.isArray(data) ? data : (data?.openKeys || []);
        setOpenKeys(keys);
    };

    // Handle click/select
    const handleSelect = (data) => {
        const itemKey = data?.itemKey;
        if (!itemKey) return;

        const found = findItemByKey(items, itemKey);
        
        if (found?.items && found.items.length > 0) {
            // It's a parent with submenu: toggle open state
            setOpenKeys((prev) => {
                // Ensure prev is always an array
                const prevKeys = Array.isArray(prev) ? prev : [];
                return prevKeys.includes(itemKey)
                    ? prevKeys.filter((k) => k !== itemKey)
                    : [...prevKeys, itemKey];
            });
        } else if (found?.url) {
            // It's a leaf: navigate
            navigate(found.url);
        }
        setSelectedKeys([itemKey]);
    };

    return (
        <Nav
            isCollapsed={isCollapse}
            items={items}
            selectedKeys={selectedKeys}
            openKeys={Array.isArray(openKeys) ? openKeys : []}
            onOpenChange={handleOpenChange}
            onSelect={handleSelect}
            onCollapseChange={(collapsed) => setIsCollapse(collapsed)}
            footer={{ collapseButton: true }}
            style={{height: '100%'}}
        />
    );
}