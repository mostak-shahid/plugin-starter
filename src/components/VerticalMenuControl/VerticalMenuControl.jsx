import { useState, useEffect } from 'react';
import { Nav } from '@douyinfe/semi-ui';
import { useNavigate, useLocation } from 'react-router-dom';

import { IllustrationIdle, Illustration404, Logo } from '../../lib/Illustrations';

import Details from '../../data/details.json';
export default function VerticalMenuControl({items=[], breakpoint, headerContent}) {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [isCollapse, setIsCollapse] = useState(window.innerWidth <= breakpoint);
    const [openKeys, setOpenKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);

    useEffect(() => {
        const handleResize = () => setIsCollapse(window.innerWidth <= breakpoint);
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
            header = {headerContent}
            footer={{ collapseButton: breakpoint?true:false }}
            style={{height: '100%'}}
        />
    );
}
