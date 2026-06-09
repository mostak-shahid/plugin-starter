import { useState, useEffect } from '@wordpress/element';
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import { Routes, Route, Navigate } from 'react-router-dom';
import {Alert, Button, Container, Row, Col, Badge} from 'react-bootstrap';

// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Import the specific solid home icon
import { faHome, faStar, faGear, faTableColumns,faWebAwesome,faSun,faMoon,faGraduationCap,faComment,faBell } from '@fortawesome/free-solid-svg-icons';

import {useSettingsBodyHeight} from './lib/Helpers';
import { Logo } from './lib/Illustrations';
import Details from './data/details.json';
import {HorizontalMultiLevelNavbar} from './components/Menu/Menu';

import { Dashboard, Settings, ImportExport, Feedback, FreeVsPro } from './pages';
import NotFound from './NotFound'

import {
    BasicInputs, 
    ArrayInputs,
    ComplexInputs,
    BoxedLeftSidebar,
    BoxedNoSidebar,
    BoxedRightSidebar,
    FullWidthLeftSidebar,
    FullWidthNoSidebar,
    FullWidthRightSidebar,
} from './pages';

const HorizontalMenuItems = [
    { itemKey: 'dashboard', text: 'Dashboard', icon: <FontAwesomeIcon icon={faHome} />, url: '/' },
    { 
        itemKey: 'layouts', 
        text: 'Layouts', 
        icon: <FontAwesomeIcon icon={faTableColumns} />,
        url: '/layouts',
        items: [
            { itemKey: 'about', text: 'About', url: '/about' },
            { itemKey: 'contact', text: 'Contact', url: '/contact' },
            { itemKey: 'layouts-boxed', text: 'Boxed Layouts', url: '/layouts/boxed',
                items: [
                    { itemKey: 'layouts-boxed-nosidebar', text: 'No Sidebar', url: '/layouts/boxed/nosidebar' },
                    { itemKey: 'layouts-boxed-left-sidebar', text: 'Left Sidebar', url: '/layouts/boxed/left-sidebar' },
                    { itemKey: 'layouts-boxed-right-sidebar', text: 'Right Sidebar', url: '/layouts/boxed/right-sidebar' },
                ] 
            },
            { itemKey: 'layouts-full', text: 'Full Layouts', url: '/layouts/full',
                items: [
                    { itemKey: 'layouts-full-nosidebar', text: 'No Sidebar', url: '/layouts/full/nosidebar' },
                    { itemKey: 'layouts-full-left-sidebar', text: 'Left Sidebar', url: '/layouts/full/left-sidebar' },
                    { itemKey: 'layouts-full-right-sidebar', text: 'Right Sidebar', url: '/layouts/full/right-sidebar' },
                ] 
            },
        ] 
    },
    { itemKey: 'settings', text: 'Settings', icon: <FontAwesomeIcon icon={faGear} />, url: '/settings' },
    { itemKey: 'feedback', text: 'Feedback', icon: <FontAwesomeIcon icon={faComment} />, url: '/feedback' },
    ...(!plugin_starter_ajax_obj?.isPro ? [{ itemKey: 'free-vs-pro', text: 'Free vs Pro', icon: <FontAwesomeIcon icon={faWebAwesome} />, url: '/free-vs-pro' }] : []),
];
const year = new Date().getFullYear();
export default function App() {
    const [darkmode, setDarkmode] = useState(false);
    useEffect(() => {
        const fetchSettingTheme = async () => {
            try {
                const params = new URLSearchParams({
                    id: plugin_starter_ajax_obj.get_current_user_id,
                });
                const theme = await apiFetch({
                    path: `/plugin-starter/v1/get-settings-theme?${params.toString()}`,
                    method: 'GET'
                });
                const isDark = theme === 'dark' || (theme && theme.value === 'dark');
                setDarkmode(isDark);
                document.documentElement.setAttribute('data-bs-theme', isDark ? 'dark' : 'light');
            } catch (err) {
                console.error('API error:', err);
            }
        };
        fetchSettingTheme();
    }, []);

    const switchingMode = async () => {
        const switchMode = !darkmode;
        setDarkmode(switchMode);
        document.documentElement.setAttribute('data-bs-theme', switchMode ? 'dark' : 'light');
        try {
            const params = new URLSearchParams({
                id: plugin_starter_ajax_obj.get_current_user_id,
                settings_theme: switchMode ? 'dark' : 'light',
            });
            await apiFetch({
                path: `/plugin-starter/v1/set-settings-theme?${params.toString()}`,
            });
        } catch (error) {
            console.error("Error fetching settings data:", error);
        }
    };


    const [ProPluginNews, setProPluginNews] = useState(null);
    useEffect(() => {
        // Check if the Pro version has loaded its global component hook
        if (window.PluginStarterProComponents && window.PluginStarterProComponents.PluginNews) {
            setProPluginNews(() => window.PluginStarterProComponents.PluginNews);
        }
        // console.log('Feedback component mounted. ProPluginNews available:', !!window.PluginStarterProComponents?.PluginNews);
    }, []);
    const [newsItems, setNewsItems] = useState([]);
    const [newsVisible, setNewsVisible] = useState(false);
    if (plugin_starter_ajax_obj?.isPro === '1') {
        useEffect(() => {
            const fetchNews = async () => {
                try {
                    // Sends data directly to the native WordPress custom REST API endpoint
                    const response = await apiFetch({
                        path: '/plugin-starter-pro/v1/news',
                        method: 'GET'
                    });
                    setNewsItems(response);
                } catch (error) {
                    console.error("Error fetching news:", error);
                }
            };
            fetchNews();
        }, []); 
    }

    return (
        <div className="plugin-starter-settings-container">
            {!plugin_starter_ajax_obj?.isPro &&
                <div className="plugin-starter-promote-banner">
                    <Alert variant='info' className='rounded-0 mb-0'>
                        {__('You\'re currently using the Free plan. ', 'plugin-starter')}
                        {__('Some settings and features are only available in ', 'plugin-starter')}
                        <a className="link-underline link-underline-opacity-0"  href={plugin_starter_ajax_obj?.proURL} target="_blank" rel="noopener noreferrer">{__('the Pro version.', 'plugin-starter')}</a>
                    </Alert>
                </div>
            }
            {/* Main Navigation Header */}
            <header className="plugin-starter-header border-bottom">               
                <HorizontalMultiLevelNavbar 
                    MenuItems={HorizontalMenuItems} 
                    headerContent={{
                        logo: <Logo width={36} height={36} />,
                        text: Details?.name,
                    }}
                    footerContent={(
                        <div className="header-icon-menu d-flex align-items-center gap-2 pe-2">
                            <Button 
                                variant="outline-secondary" 
                                size="sm"
                                aria-label="Mode" 
                                onClick={switchingMode}
                            >
                                {darkmode ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
                            </Button>
                            <Button 
                                variant="outline-secondary" 
                                size="sm"
                                aria-label={__("Documentation", 'plugin-starter')} 
                                onClick={() => window.open('https://wordpress.org/support/plugin/plugin-starter/', '_blank')}
                            >
                                <FontAwesomeIcon icon={faGraduationCap} />
                            </Button>
                            <Button 
                                variant="outline-secondary" 
                                size="sm"
                                aria-label={__("Help Center", 'plugin-starter')} 
                                onClick={() => window.open('https://wordpress.org/support/plugin/plugin-starter/reviews/', '_blank')}
                            >
                                <FontAwesomeIcon icon={faStar} />
                            </Button>
                            {plugin_starter_ajax_obj?.isPro &&
                                <div className="position-relative">
                                    <Button 
                                        variant="outline-secondary" 
                                        size="sm"
                                        onClick={() => setNewsVisible(true)} aria-label="News"
                                    >
                                        <FontAwesomeIcon icon={faBell} />
                                    </Button>
                                    {newsItems.length > 0 && (
                                        <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle">
                                            {newsItems.length > 99 ? '99+' : newsItems.length}
                                        </Badge>
                                    )}
                                </div>
                            }
                        </div>
                    )}
                />
            </header>
            {/* Dynamic Dashboard Viewport */}
            <main className="plugin-starter-content">
                {ProPluginNews && <ProPluginNews showOffcanvas={newsVisible} setShowOffcanvas={setNewsVisible} />}

                <Routes>
                    <Route path="/" element={<Dashboard />} />

                    <Route path="/layouts">
                        <Route index element={<Navigate to="boxed/nosidebar" replace />} />
                        <Route path="boxed/nosidebar" element={<BoxedNoSidebar />} />
                        <Route path="boxed/left-sidebar" element={<BoxedLeftSidebar />} />
                        <Route path="boxed/right-sidebar" element={<BoxedRightSidebar />} />
                        <Route path="full/nosidebar" element={<FullWidthNoSidebar />} />
                        <Route path="full/left-sidebar" element={<FullWidthLeftSidebar />} />
                        <Route path="full/right-sidebar" element={<FullWidthRightSidebar />} />
                    </Route>           
                    {/* <Route path="/settings" element={<Settings />} /> */}
                    <Route path="/settings" element={<Settings />}>
                        <Route index element={<Navigate to="inputs/basic_inputs" replace />} />
                        <Route path="inputs" element={<Navigate to="basic_inputs" replace />} />
                        
                        <Route path="inputs/basic_inputs" element={<BasicInputs />} />
                        <Route path="inputs/array_inputs" element={<ArrayInputs />} />
                        <Route path="inputs/complex_inputs" element={<ComplexInputs />} />

                        <Route path="utilities" element={<Navigate to="import_export" replace />} />
                        <Route path="utilities/import_export" element={<ImportExport />} />
                    </Route>

                    <Route path="/feedback" element={<Feedback />} />
                    <Route path="/free-vs-pro" element={<FreeVsPro />} />
                    {/* <Route path="*" element={<Navigate replace to="/" />} /> */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>


            <footer className="plugin-starter-footer border-top" style={{ backgroundColor: 'var(--bs-body-bg)' }}>
                <Container fluid={true}>
                    <Row className="align-items-center justify-content-between py-3">
                        <Col xs={12} lg={6} className="text-center text-lg-start mb-2 mb-lg-0">
                            <span>{__(`Copyright © ${year} `, 'plugin-starter')}</span>
                            <a href={Details?.authorURI} target="_blank" rel="noopener noreferrer">{Details?.author}.</a>
                            <span>{__(` All Rights Reserved.`, 'plugin-starter')}</span>
                        </Col>
                        <Col xs={12} lg={6} className="text-center text-lg-end">
                            <div className="d-flex align-items-center justify-content-lg-end gap-2 flex-wrap">
                                {plugin_starter_ajax_obj?.isPro === '1' ? (
                                    <>
                                        <Badge bg="warning" text="dark">{__( 'Pro', "plugin-starter" )}</Badge>
                                        <Badge bg="info">{plugin_starter_ajax_obj?.proVersion}</Badge>
                                    </>
                                ) : (
                                    <>
                                        <Badge bg="secondary">{__( 'Free', "plugin-starter" )}</Badge>
                                        <Badge bg="info">{Details?.version}</Badge>
                                    </>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
    );
}
