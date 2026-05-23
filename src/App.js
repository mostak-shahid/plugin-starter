import { useState, useEffect } from '@wordpress/element';
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import {Alert} from 'react-bootstrap';
import Home from './components/Home';
import Settings from './components/Settings';
import Feedback from './components/Feedback';

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
export default function App() {
    const [darkmode, setDarkmode] = useState(false);
    // useEffect(() => {
    //     const fetchSettingTheme = async () => {
    //         try {
    //             const params = new URLSearchParams({
    //                 id: plugin_starter_ajax_obj.get_current_user_id,
    //             });
    //             const theme = await apiFetch({
    //                 path: `/plugin-starter/v1/get-settings-theme?${params.toString()}`,
    //                 method: 'GET'
    //             });
    //             const isDark = theme === 'dark' || (theme && theme.value === 'dark');
    //             setDarkmode(isDark);
    //             document.documentElement.setAttribute('data-bs-theme', isDark ? 'dark' : 'light');
    //         } catch (err) {
    //             console.error('API error:', err);
    //         }
    //     };
    //     fetchSettingTheme();
    // }, []);
    useEffect(() => {
        document.documentElement.setAttribute('data-bs-theme', darkmode ? 'dark' : 'light');
    }, []);
    // 1. Initialize state by checking the existing URL hash, defaulting to 'home'
    const [currentTab, setCurrentTab] = useState(() => {
        const hash = window.location.hash.replace('#', '');
        return ['home', 'settings', 'feedback'].includes(hash) ? hash : 'home';
    });

    // 2. Listen for URL hash changes (handles browser Back/Forward buttons smoothly)
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace('#', '');
            if (['home', 'settings', 'feedback'].includes(hash)) {
                setCurrentTab(hash);
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    // 3. Helper to determine which view component to inject
    const renderContent = () => {
        switch (currentTab) {
            case 'settings': return <Settings />;
            case 'feedback': return <Feedback />;
            case 'home':
            default:
                return <Home />;
        }
    };

    return (
        <div className="plugin-starter-settings-container">
            {!plugin_starter_ajax_obj?.isPro &&
                <Alert variant='info' className='rounded-0 mb-0'>
                    {__('You\'re currently using the Free plan. ', 'plugin-starter')}
                    {__('Some settings and features are only available in ', 'plugin-starter')}
                    <a href={plugin_starter_ajax_obj?.proURL} target="_blank" rel="noopener noreferrer">{__('the Pro version.', 'plugin-starter')}</a>
                </Alert>
            }
            {/* Main Navigation Header */}
            <header className="plugin-starter-header border-bottom py-2">
                Logo & Horizontal Menu (can be a separate component)
            </header>

            {/* Dynamic Dashboard Viewport */}
            <main className="plugin-starter-content p-4">
                {renderContent()}
            </main>
        </div>
    );
}
