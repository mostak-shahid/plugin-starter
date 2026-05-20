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
        <div className="max-w-4xl mx-auto my-6 p-4">
            {/* Main Navigation Header */}
            <header className="border-b border-gray-200 pb-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">My Custom Dashboard</h1>
                <nav className="flex space-x-4">
                    <a 
                        href="#home" 
                        className={`px-3 py-2 rounded-md text-sm font-medium transition ${currentTab === 'home' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                        Home
                    </a>
                    <a 
                        href="#settings" 
                        className={`px-3 py-2 rounded-md text-sm font-medium transition ${currentTab === 'settings' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                        Settings
                    </a>
                    <a 
                        href="#feedback" 
                        className={`px-3 py-2 rounded-md text-sm font-medium transition ${currentTab === 'feedback' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
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
