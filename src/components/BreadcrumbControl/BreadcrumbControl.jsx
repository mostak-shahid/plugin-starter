
import { __ } from "@wordpress/i18n";
import { useMemo } from "react";
import * as Bootstrap from 'react-bootstrap';
const { Card, Breadcrumb } = Bootstrap;

const generateBreadcrumbs = (pathname, menuData) => {
    const breadcrumbs = [
        { name: __("Home", "plugin-starter"), href: '#/', path: '/' }
    ];

    const findInMenu = (items, path, parentCrumbs = []) => {
        for (const item of items) {
            if (!item.url || item.url === '#' || item.url.startsWith('http')) continue;
            if (path === item.url || path.startsWith(item.url + '/')) {
                const currentCrumbs = [...parentCrumbs, { name: item.text, path: item.url, href: item.url }];
                if (path === item.url) return currentCrumbs;
                if (item.sub && item.sub.length > 0) {
                    const subResult = findInMenu(item.sub, path, currentCrumbs);
                    if (subResult) return subResult;
                }
                return currentCrumbs;
            }
            if (item.sub && item.sub.length > 0) {
                const subResult = findInMenu(item.sub, path, [...parentCrumbs, { name: item.text, path: item.url, href: item.url }]);
                if (subResult) return subResult;
            }
        }
        return null;
    };

    const foundCrumbs = findInMenu(menuData, pathname);
    if (foundCrumbs && foundCrumbs.length > 0) {
        breadcrumbs.push(...foundCrumbs);
    }
    return breadcrumbs;
};

const BreadcrumbControl = ({ menu=[], url='', className='', style = {} }) => {
    const breadcrumbItems = useMemo(() => {
        if (!menu || menu.length === 0) return [];
        return generateBreadcrumbs(url, menu);
    }, [url, menu]);

    if (breadcrumbItems.length === 0) return null;

    return (
        <div className={`mb-4 border rounded-0 p-2 ${className}`} style={style}>
            <Breadcrumb>
                {breadcrumbItems.map((item, index) => (
                    <Breadcrumb.Item 
                        key={index} 
                        href={item.href}
                        active={index === breadcrumbItems.length - 1}
                    >
                        {item.name}
                    </Breadcrumb.Item>
                ))}
            </Breadcrumb>
        </div>
    );
};

export default BreadcrumbControl;
