import { useState, useEffect } from '@wordpress/element';

export default function Feedback() {
    const [ProForm, setProForm] = useState(null);

    useEffect(() => {
        // Check if the Pro version has loaded its global component hook
        if (window.MyPluginProComponents && window.MyPluginProComponents.ContactForm) {
            setProForm(() => window.MyPluginProComponents.ContactForm);
        }
        console.log('Feedback component mounted. ProForm available:', !!window.MyPluginProComponents?.ContactForm);
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-800 mb-2">User Feedback</h2>
            
            {ProForm ? (
                // If Pro is active, render the Pro Form component
                <ProForm />
            ) : (
                // Fallback layout if only Free is active
                <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-md">
                    <p className="text-sm text-amber-800 font-medium">Pro Feature Only</p>
                    <p className="text-sm text-amber-700 mt-1">
                        Please upgrade to the Pro Version to access the integrated contact and diagnostics desk.
                    </p>
                </div>
            )}
        </div>
    );
}
