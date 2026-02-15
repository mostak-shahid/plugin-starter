import { useState, useEffect } from 'react';
import { Nav, Collapse } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

export default function VerticalMenuControl({ items = [], breakpoint, headerContent, footerContent, className = "" }) {
    const navigate = useNavigate();
    const location = useLocation();

    const [isCollapse, setIsCollapse] = useState(false);
    const [openKeys, setOpenKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);

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

    const handleSelect = (itemKey) => {
        if (!itemKey) return;
        const found = findItemByKey(items, itemKey);

        if (found?.items?.length) {
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
    };

    const toggleSubmenu = (itemKey) => {
        if (isCollapse) return;
        setOpenKeys(prev => 
            prev.includes(itemKey) 
                ? prev.filter(k => k !== itemKey)
                : [...prev, itemKey]
        );
    };

    const renderMenuItems = (menuItems, level = 0) => {
        return menuItems.map((item) => {
            const hasSubmenu = item.items && item.items.length > 0;
            const isOpen = openKeys.includes(item.itemKey);
            const isActive = selectedKeys.includes(item.itemKey);

            if (hasSubmenu) {
                return (
                    <div key={item.itemKey} className="nav-item">
                        <button
                            className={`nav-link d-flex align-items-center justify-content-between w-100 ${isActive ? 'active' : ''}`}
                            onClick={() => toggleSubmenu(item.itemKey)}
                            aria-expanded={isOpen}
                            style={{ 
                                padding: isCollapse ? '0.5rem 0.75rem' : '0.5rem 1rem',
                                border: 'none',
                                background: 'transparent',
                                cursor: 'pointer',
                                color: isActive ? 'var(--bs-primary)' : 'inherit',
                                fontSize: isCollapse ? '0' : 'inherit'
                            }}
                        >
                            <span className="d-flex align-items-center gap-2" style={{ justifyContent: isCollapse ? 'center' : 'flex-start' }}>
                                <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                                <Collapse in={!isCollapse}>
                                    <span>{item.text}</span>
                                </Collapse>
                            </span>
                            <Collapse in={!isCollapse}>
                                <span className={`dropdown-toggle ${isOpen ? 'show' : ''}`}></span>
                            </Collapse>
                        </button>
                        <Collapse in={isOpen && !isCollapse}>
                            <div>
                                <Nav className={`flex-column ${level > 0 ? 'ps-3' : ''}`}>
                                    {renderMenuItems(item.items, level + 1)}
                                </Nav>
                            </div>
                        </Collapse>
                    </div>
                );
            }

            return (
                <Nav.Item key={item.itemKey}>
                    <Nav.Link
                        eventKey={item.itemKey}
                        onClick={() => handleSelect(item.itemKey)}
                        active={isActive}
                        className="d-flex align-items-center"
                        style={{ 
                            padding: isCollapse ? '0.5rem 0.75rem' : '0.5rem 1rem',
                            justifyContent: isCollapse ? 'center' : 'flex-start'
                        }}
                    >
                        <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                        <Collapse in={!isCollapse}>
                            <span className="ms-2">{item.text}</span>
                        </Collapse>
                    </Nav.Link>
                </Nav.Item>
            );
        });
    };

    return (
        <div 
            className={`d-flex flex-column ${className}`} 
            style={{ 
                height: '100%',
                width: isCollapse ? '60px' : '250px',
                transition: 'width 0.2s ease',
                overflow: 'hidden'
            }}
        >
            {headerContent && (
                <div 
                    className="p-3 border-bottom d-flex align-items-center" 
                    style={{ justifyContent: isCollapse ? 'center' : 'flex-start', minHeight: '60px' }}
                >
                    <Collapse in={!isCollapse}>
                        <div>{headerContent}</div>
                    </Collapse>
                </div>
            )}
            
            <Nav 
                variant="pills" 
                className="flex-column flex-grow-1" 
                activeKey={selectedKeys[0]}
                onSelect={handleSelect}
            >
                {renderMenuItems(items)}
            </Nav>

            {footerContent && (
                <div 
                    className="mt-auto p-3 border-top d-flex align-items-center" 
                    style={{ justifyContent: isCollapse ? 'center' : 'flex-start' }}
                >
                    <Collapse in={!isCollapse}>
                        <div className="w-100">{footerContent}</div>
                    </Collapse>
                </div>
            )}

            <div className="p-2 border-top">
                <button 
                    className="btn btn-sm btn-outline-secondary w-100 d-flex align-items-center justify-content-center"
                    onClick={() => setIsCollapse(!isCollapse)}
                    title={isCollapse ? 'Expand Menu' : 'Collapse Menu'}
                >
                    <span style={{ transform: isCollapse ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                        ‹
                    </span>
                    <Collapse in={!isCollapse}>
                        <span className="ms-2">Collapse</span>
                    </Collapse>
                </button>
            </div>
        </div>
    );
}
