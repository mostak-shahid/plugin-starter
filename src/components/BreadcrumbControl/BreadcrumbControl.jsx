import React, { useMemo, useEffect, useState } from 'react';
import { Breadcrumb } from '@douyinfe/semi-ui';
import { useMain } from "../../contexts/MainContext";

const BreadcrumbControl = () => {
    const { settingsMenu } = useMain();
    
    // Get current path from window.location.hash
    const getCurrentPath = () => {
        const hash = window.location.hash;
        return hash.replace(/^#?\/?/, '');
    };

    const [currentPath, setCurrentPath] = useState(getCurrentPath());

    // Listen to hash changes
    useEffect(() => {
        const handleHashChange = () => {
            setCurrentPath(getCurrentPath());
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const routes = useMemo(() => {
        const path = currentPath;
        const segments = path.split('/').filter(Boolean);

        if (segments.length === 0) {
            return [
                {
                    name: 'Home',
                    href: '#/',
                    path: '/'
                }
            ];
        }

        const items = [
            {
                name: 'Home',
                href: '#/',
                path: '/'
            }
        ];
        
        let buildPath = '';
        let currentMenu = settingsMenu;

        for (let i = 0; i < segments.length; i++) {
            buildPath += `/${segments[i]}`;
            
            // Find matching item in current menu level
            const menuItem = currentMenu?.find(item => {
                const itemPath = item.url.replace(/^#?\/?/, '');
                return itemPath === buildPath.replace(/^\//, '') || 
                       itemPath.endsWith(segments[i]);
            });

            if (menuItem) {
                items.push({
                    name: menuItem.text,
                    href: `#${menuItem.url}`,
                    path: menuItem.url,
                    // icon: menuItem.icon
                });

                // Update current menu to nested items if they exist
                currentMenu = menuItem.items;
            } else {
                // If no menu item found, use segment as fallback
                items.push({
                    name: segments[i].split(/[-_]/).map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' '),
                    href: `#${buildPath}`,
                    path: buildPath
                });
            }
        }

        return items;
    }, [currentPath, settingsMenu]);

    const handleClick = (item, e) => {
        e.preventDefault();
        if (item.href && item.href !== '#/') {
            window.location.hash = item.href.replace(/^#/, '');
        } else {
            window.location.hash = '/';
        }
    };

    return (
        <Breadcrumb 
            routes={routes}
            onClick={handleClick}
            style={{ marginBottom: '20px' }}
        />
    );
};

export default BreadcrumbControl;