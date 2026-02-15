import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";

import * as Bootstrap from 'react-bootstrap';
const { Modal, Row, Col, Button, Badge, Offcanvas } = Bootstrap;

import { HorizontalMenuControl } from "./components";
import { Logo } from './lib/Illustrations';
import Details from './data/details.json';

import './App.scss';
// import ArrayInputs from './pages/Settings/ArrayInputs';

const year = new Date().getFullYear();

const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const BasicInputs = lazy(() => import('./pages/Settings/BasicInputs'));
const ArrayInputs = lazy(() => import('./pages/Settings/ArrayInputs'));
const Settings = lazy(() => import('./pages/Settings/Settings'));
const ImportExport = lazy(() => import('./pages/Settings/ImportExport'));
const More = lazy(() => import('./pages/Settings/More'));
const Tools = lazy(() => import('./pages/Settings/Tools'));
const LogsTable = lazy(() => import('./pages/Settings/Logs/LogsTable'));
const LogsCharts = lazy(() => import('./pages/Settings/Logs/LogsCharts'));
const Feedback = lazy(() => import('./pages/Feedback'));
const FreeVsPro = lazy(() => import('./pages/FreeVsPro'));
const BoxedNoSidebar = lazy(() => import('./pages/Layouts/BoxedNoSidebar'));
const BoxedLeftSidebar = lazy(() => import('./pages/Layouts/BoxedLeftSidebar'));
const BoxedRightSidebar = lazy(() => import('./pages/Layouts/BoxedRightSidebar'));
const FullWidthNoSidebar = lazy(() => import('./pages/Layouts/FullWidthNoSidebar'));
const FullWidthLeftSidebar = lazy(() => import('./pages/Layouts/FullWidthLeftSidebar'));
const FullWidthRightSidebar = lazy(() => import('./pages/Layouts/FullWidthRightSidebar'));

const HorizontalMenuItems = [
    { itemKey: 'dashboard', text: 'Dashboard', icon: '🏠', url: '/' },
    { 
        itemKey: 'layouts', 
        text: 'Layouts', 
        icon: '📐',
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
    { itemKey: 'settings', text: 'Settings', icon: '⚙️', url: '/settings' },
    { itemKey: 'feedback', text: 'Feedback', icon: '⭐', url: '/feedback' },
    ...(!plugin_starter_ajax_obj?.isPro ? [{ itemKey: 'free-vs-pro', text: 'Free vs Pro', icon: '👤', url: '/free-vs-pro' }] : []),
];

function App() {
    const [darkmode, setDarkmode] = useState(false);
    const [newsVisible, setNewsVisible] = useState(false);
    const [newsItems, setNewsItems] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [activeNews, setActiveNews] = useState(null);

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

    const truncateText = (text, wordLimit = 15) => {
        const words = text.split(/\s+/);
        if (words.length <= wordLimit) return text;
        return words.slice(0, wordLimit).join(' ') + '...';
    };

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('https://raw.githubusercontent.com/mostak-shahid/update/refs/heads/master/plugin-news.json');
                const data = await response.json();
                setNewsItems(data);
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };
        fetchNews();
    }, []);

    return (
        <div className="plugin-starter-settings-container">
            {!plugin_starter_ajax_obj?.isPro && (
                <div className="alert alert-info mb-0 d-flex align-items-center rounded-0" role="alert">
                    <span className="me-2">{__('You\'re currently using the Free plan. ', 'plugin-starter')}</span>
                    <span className="me-2">{__('Some settings and features are only available in ', 'plugin-starter')}</span>
                    <a href="https://semi.design" target="_blank" rel="noopener noreferrer" className="alert-link">
                        {__('Pro version.', 'plugin-starter')}
                    </a>
                </div>
            )}
            
            <header className="plugin-starter-header border-bottom">
                <HorizontalMenuControl
                    items={HorizontalMenuItems}
                    breakpoint="960"
                    headerContent={{
                        logo: <Logo width={36} height={36} />,
                        text: Details?.name,
                    }}
                    footerContent={(
                        <div className="d-flex align-items-center gap-2">
                            <Button variant="outline-secondary" aria-label="Mode" onClick={switchingMode}>
                                {darkmode ? '☀️' : '🌙'}
                            </Button>
                            <Button variant="outline-secondary" aria-label={__("Documentation", 'plugin-starter')} onClick={() => window.open('https://wordpress.org/support/plugin/plugin-starter/', '_blank')}>
                                📄
                            </Button>
                            <Button variant="outline-secondary" aria-label={__("Help Center", 'plugin-starter')} onClick={() => window.open('https://wordpress.org/support/plugin/plugin-starter/reviews/?filter=5#new-post', '_blank')}>
                                ⭐
                            </Button>
                            <div className="position-relative">
                                <Button variant="outline-secondary" onClick={() => setNewsVisible(true)} aria-label="News">
                                    🔔
                                </Button>
                                {newsItems.length > 0 && (
                                    <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle">
                                        {newsItems.length}
                                    </Badge>
                                )}
                            </div>
                        </div>
                    )}
                />
            </header>

            <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/layouts">
                        <Route index element={<Navigate to="boxed/nosidebar" replace />} />
                        <Route path="boxed/nosidebar" element={<BoxedNoSidebar />} />
                        <Route path="boxed/left-sidebar" element={<BoxedLeftSidebar />} />
                        <Route path="boxed/right-sidebar" element={<BoxedRightSidebar />} />
                        <Route path="full/nosidebar" element={<FullWidthNoSidebar />} />
                        <Route path="full/left-sidebar" element={<FullWidthLeftSidebar />} />
                        <Route path="full/right-sidebar" element={<FullWidthRightSidebar />} />
                    </Route>
                    <Route path="/settings" element={<Settings />}>
                        <Route index element={<Navigate to="basic-inputs" replace />} />
                        <Route path="basic-inputs" element={<BasicInputs />} />
                        <Route path="array-inputs" element={<ArrayInputs />} />
                        <Route path="import-export" element={<ImportExport />} />
                        <Route path="more" element={<More />} />
                        <Route path="logs" element={<Navigate to="table" replace />} />
                        <Route path="logs/table" element={<LogsTable />} />
                        <Route path="logs/analytics" element={<LogsCharts />} />
                        <Route path="tools" element={<Tools />} />
                    </Route>
                    <Route path="feedback" element={<Feedback />} />
                    <Route path="free-vs-pro" element={<FreeVsPro />} />
                </Routes>
            </Suspense>

            <footer className="p-3 w-100" style={{ borderTop: '1px solid #dee2e6', backgroundColor: 'var(--bs-body-bg)' }}>
                <Row className="align-items-center justify-content-between">
                    <Col xs={24} lg={12} className="text-center text-lg-start mb-2 mb-lg-0">
                        <span>{__(`Copyright © ${year} `, 'plugin-starter')}</span>
                        <a href={Details?.authorURI} target="_blank" rel="noopener noreferrer">{Details?.author}. </a>
                        <span>{__(` All Rights Reserved.`, 'plugin-starter')}</span>
                    </Col>
                    <Col xs={24} lg={12} className="text-center text-lg-end">
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
            </footer>

            <Offcanvas
                placement="end"
                show={newsVisible}
                onHide={() => setNewsVisible(false)}
                title={__("What's New?", "plugin-starter")}
            >
                {newsItems.length === 0 ? (
                    <p className="p-3">{__("Loading news...", "plugin-starter")}</p>
                ) : (
                    <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                        {newsItems.map((item) => (
                            <div key={item.id} style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #dee2e6' }}>
                                <h5 className="mb-2">{item.title}</h5>
                                {item?.tags && item.tags.length > 0 && (
                                    <div className="mb-2">
                                        <div className="d-flex flex-wrap gap-1">
                                            {item.tags.map((tag, index) => (
                                                <Badge key={index} bg="warning" text="dark">{tag}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <div className="mb-2">
                                    <p className="text-muted mb-2">{truncateText(item.news)}</p>
                                    <Button
                                        variant="link"
                                        size="sm"
                                        onClick={() => {
                                            setActiveNews(item);
                                            setModalVisible(true);
                                        }}
                                    >
                                        {__("Read more", "plugin-starter")}
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Offcanvas>

            <Modal
                show={modalVisible}
                onHide={() => setModalVisible(false)}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{activeNews?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {activeNews?.tags?.length > 0 && (
                        <div className="mb-3">
                            <div className="d-flex flex-wrap gap-1">
                                {activeNews.tags.map((tag, index) => (
                                    <Badge key={index} bg="warning" text="dark">{tag}</Badge>
                                ))}
                            </div>
                        </div>
                    )}
                    <p className="mb-0">{activeNews?.news}</p>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default App;
