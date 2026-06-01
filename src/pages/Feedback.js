import { useState, useEffect } from '@wordpress/element';
import {Card, Button} from 'react-bootstrap';
import { Layout } from '../layouts';
import {HorizontalMultiLevelNavbar, VerticalMultiLevelNavbar} from '../components/Menu/Menu';
const Feedback = () => {
    const [ProContactForm, setProContactForm] = useState(null);

    useEffect(() => {
        // Check if the Pro version has loaded its global component hook
        if (window.PluginStarterProComponents && window.PluginStarterProComponents.ContactForm) {
            setProContactForm(() => window.PluginStarterProComponents.ContactForm);
        }
        // console.log('Feedback component mounted. ProContactForm available:', !!window.PluginStarterProComponents?.ContactForm);
    }, []);

    return (        
        <Layout sidebarPosition="none" fluid={true}>  
            {ProContactForm ? (
                // If Pro is active, render the Pro Form component
                <ProContactForm />
            ) : (
                // Fallback layout if only Free is active
                <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-md">
                    <p className="text-sm text-amber-800 font-medium">Pro Feature Only</p>
                    <p className="text-sm text-amber-700 mt-1">
                        Please upgrade to the Pro Version to access the integrated contact and diagnostics desk.
                    </p>
                </div>
            )}   
        </Layout>
    );
};
export default Feedback;