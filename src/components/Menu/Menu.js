import { useState, useEffect } from '@wordpress/element';
import {
    Navbar,
    Nav,
    NavDropdown,
    Collapse
} from 'react-bootstrap';

import { useLocation } from 'react-router-dom';
import './Menu.css';

const pathPrefix = 'admin.php?page=plugin-starter#'; // Adjust this if your app is served from a different base path

/**
 * =========================================================
 * Helper Functions
 * =========================================================
 */

function isMenuActive(item, currentPath) {

    return item.url === currentPath;

}

function hasActiveChild(item, currentPath) {

    if (!item.items) {
        return false;
    }

    return item.items.some((child) => {

        if (child.url === currentPath) {
            return true;
        }

        return hasActiveChild(child, currentPath);

    });

}

/**
 * =========================================================
 * Horizontal Dropdown Component
 * =========================================================
 */

function HorizontalDropdown({
    item,
    depth = 0,
    currentPath
}) {

    const [show, setShow] = useState(false);

    const [isMobile, setIsMobile] = useState(false);

    const active = isMenuActive(item, currentPath);

    const hasActive = hasActiveChild(item, currentPath);

    useEffect(() => {

        const handleResize = () => {

            setIsMobile(window.innerWidth < 992);

        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {

            window.removeEventListener('resize', handleResize);

        };

    }, []);

    /**
     * -----------------------------------------
     * Simple Item
     * -----------------------------------------
     */

    if (!item.items) {

        return (

            <NavDropdown.Item
                href={pathPrefix + item.url}
                className={active ? 'current' : ''}
            >

                {item.icon && `${item.icon} `}
                {item.text}

            </NavDropdown.Item>

        );

    }

    /**
     * -----------------------------------------
     * Dropdown Item
     * -----------------------------------------
     */

    return (

        <div
            className={`
                multi-level-dropdown
                depth-${depth}
                ${hasActive ? 'wp-has-current-submenu' : ''}
            `}

            onMouseEnter={() => {

                if (!isMobile) {
                    setShow(true);
                }

            }}

            onMouseLeave={() => {

                if (!isMobile) {
                    setShow(false);
                }

            }}
        >

            <NavDropdown

                title={
                    <>
                        {item.icon && `${item.icon} `}
                        {item.text}
                    </>
                }

                show={show}

                onToggle={(nextShow) => {

                    if (isMobile) {
                        setShow(nextShow);
                    }

                }}

                drop={
                    isMobile
                        ? 'down'
                        : depth > 0
                            ? 'end'
                            : 'down'
                }

                className={`
                    ${depth > 0 ? 'dropdown-submenu' : ''}
                    ${active ? 'current' : ''}
                `}
            >

                {item.items.map((child) => (

                    <HorizontalDropdown
                        key={child.itemKey}
                        item={child}
                        depth={depth + 1}
                        currentPath={currentPath}
                    />

                ))}

            </NavDropdown>

        </div>

    );

}

/**
 * =========================================================
 * Horizontal Multi Level Navbar
 * =========================================================
 */

export function HorizontalMultiLevelNavbar({MenuItems}) {

    const location = useLocation();

    const currentPath = location.pathname;

    return (

        <>

            <Navbar
                expand="lg"
                className="plugin-starter-horizontal-navbar" 
                style={{ backgroundColor: 'var(--bs-body-bg)' }}
            >

                <div className="container-fluid">

                    <Navbar.Brand href="/">
                        My App
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="main-navbar" />

                    <Navbar.Collapse id="main-navbar">

                        <Nav className="me-auto">

                            {MenuItems.map((item) => {

                                const active = isMenuActive(
                                    item,
                                    currentPath
                                );

                                const hasActive = hasActiveChild(
                                    item,
                                    currentPath
                                );

                                /**
                                 * ---------------------------------
                                 * Normal Menu Item
                                 * ---------------------------------
                                 */

                                if (!item.items) {

                                    return (

                                        <Nav.Link
                                            key={item.itemKey}
                                            href={item.url}
                                            className={active ? 'current' : ''}
                                        >

                                            {item.icon && `${item.icon} `}
                                            {item.text}

                                        </Nav.Link>

                                    );

                                }

                                /**
                                 * ---------------------------------
                                 * Dropdown Menu Item
                                 * ---------------------------------
                                 */

                                return (

                                    <HorizontalDropdown
                                        key={item.itemKey}
                                        item={item}
                                        currentPath={currentPath}
                                    />

                                );

                            })}

                        </Nav>

                    </Navbar.Collapse>

                </div>

            </Navbar>

        </>

    );

}

/**
 * =========================================================
 * Vertical Menu Item
 * =========================================================
 */

function VerticalMenuItem({
    item,
    depth = 0,
    currentPath
}) {

    const active = isMenuActive(item, currentPath);

    const hasActive = hasActiveChild(item, currentPath);

    /**
     * Auto Open Active Parent
     */

    const [open, setOpen] = useState(hasActive);

    useEffect(() => {

        if (hasActive) {
            setOpen(true);
        }

    }, [hasActive]);

    /**
     * -----------------------------------------
     * Simple Item
     * -----------------------------------------
     */

    if (!item.items) {

        return (

            <Nav.Link
                href={pathPrefix + item.url}
                className={`
                    vertical-menu-link
                    ${active ? 'current' : ''}
                `}
                style={{
                    paddingLeft: `${depth * 20 + 16}px`,
                }}
            >

                {item.icon && `${item.icon} `}
                {item.text}

            </Nav.Link>

        );

    }

    /**
     * -----------------------------------------
     * Parent Item
     * -----------------------------------------
     */

    return (

        <div
            className={`
                vertical-menu-wrapper
                ${hasActive ? 'wp-has-current-submenu wp-menu-open' : ''}
            `}
        >

            <div
                className="vertical-menu-parent"
                onClick={() => setOpen(!open)}
                style={{
                    paddingLeft: `${depth * 20 + 16}px`,
                }}
            >

                <span>
                    {item.icon && `${item.icon} `}
                    {item.text}
                </span>

                <span>
                    {open ? '−' : '+'}
                </span>

            </div>

            <Collapse in={open}>

                <div>

                    {item.items.map((child) => (

                        <VerticalMenuItem
                            key={child.itemKey}
                            item={child}
                            depth={depth + 1}
                            currentPath={currentPath}
                        />

                    ))}

                </div>

            </Collapse>

        </div>

    );

}

/**
 * =========================================================
 * Vertical Multi Level Navbar
 * =========================================================
 */

export function VerticalMultiLevelNavbar({MenuItems}) {

    const location = useLocation();

    const currentPath = location.pathname;

    return (

        <Navbar
            className="plugin-starter-navbar plugin-starter-vertical-navbar flex-column align-items-start vertical-navbar"
            style={{ backgroundColor: 'var(--bs-body-bg)' }}
        >

            <Navbar.Brand className="px-3 py-3">
                My App
            </Navbar.Brand>

            <Nav className="flex-column w-100">

                {MenuItems.map((item) => (

                    <VerticalMenuItem
                        key={item.itemKey}
                        item={item}
                        currentPath={currentPath}
                    />

                ))}

            </Nav>

        </Navbar>

    );

}