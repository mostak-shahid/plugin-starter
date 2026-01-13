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

export default function VerticalMenu() {
    const navigate = useNavigate();
    const location = useLocation();

    const BREAKPOINT = 960;
    const [isCollapse, setIsCollapse] = useState(window.innerWidth <= BREAKPOINT);
    const [openKeys, setOpenKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);

    useEffect(() => {
        const handleResize = () => setIsCollapse(window.innerWidth <= BREAKPOINT);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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

    // ✅ Accordion behavior per level
    const handleOpenChange = (data) => {
        const keys = Array.isArray(data) ? data : data?.openKeys || [];

        // Determine which menu level changed
        if (keys.length > openKeys.length) {
            // A new key was opened
            const newlyOpenedKey = keys.find((k) => !openKeys.includes(k));
            const parentKeys = findParentKeys(items, newlyOpenedKey);

            // Remove siblings at the same level as the newly opened key
            const filteredKeys = openKeys.filter((k) => {
                const parentOfK = findParentKeys(items, k);
                return !isSameLevel(parentOfK, parentKeys);
            });

            setOpenKeys([...filteredKeys, newlyOpenedKey]);
        } else {
            // A key was closed
            setOpenKeys(keys);
        }
    };

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

    const handleSelect = (data) => {
        const itemKey = data?.itemKey;
        if (!itemKey) return;
        const found = findItemByKey(items, itemKey);

        if (found?.items?.length) {
            const isOpen = openKeys.includes(itemKey);
            const parentKeys = findParentKeys(items, itemKey);

            // Close siblings and toggle the selected one
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
    };

    return (
        <Nav
            isCollapsed={isCollapse}
            items={items}
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onOpenChange={handleOpenChange}
            onSelect={handleSelect}
            onCollapseChange={setIsCollapse}
            footer={{ collapseButton: true }}
            style={{ height: '100%' }}
        />
    );
}
