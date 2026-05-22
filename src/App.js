import { useState, useEffect } from '@wordpress/element';
import Home from './components/Home';
import Settings from './components/Settings';
import Feedback from './components/Feedback';

export default function App() {
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
        <div className="container">
            {/* Main Navigation Header */}
            <header className="border-b border-gray-200 pb-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">My Custom Dashboard</h1>
                <nav className="flex space-x-4">
                    <a 
                        href="#home" 
                        className={`link-underline link-underline-opacity-0 p-2 ${currentTab === 'home' ? 'text-bg-primary' : 'text-bg-secondary'}`}
                    >
                        Home
                    </a>
                    <a 
                        href="#settings" 
                        className={`link-underline link-underline-opacity-0 p-2 ${currentTab === 'settings' ? 'text-bg-primary' : 'text-bg-secondary'}`}
                    >
                        Settings
                    </a>
                    <a 
                        href="#feedback" 
                        className={`link-underline link-underline-opacity-0 p-2 ${currentTab === 'feedback' ? 'text-bg-primary' : 'text-bg-secondary'}`}
                    >
                        Feedback
                    </a>
                </nav>
            </header>

            {/* Dynamic Dashboard Viewport */}
            <main>
                {renderContent()}
            </main>
        </div>
    );
}
