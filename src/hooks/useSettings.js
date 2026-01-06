import { useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';

export const useSettings = () => {
    const [settings, setSettings] = useState({});
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    const loadSettings = async () => {
        try {
            setLoading(true);
            const response = await apiFetch({
                path: '/plugin-starter/v1/settings',
                method: 'GET'
            });

            if (response.success) {
                setSettings(response.data);
            }
        } catch (error) {
            console.error('Error loading settings:', error);
            setMessage({
                text: __('Failed to load settings.', 'plugin-starter'),
                type: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    const saveSettings = async (data) => {
        try {
            setSaving(true);
            setMessage({ text: '', type: '' });

            const response = await apiFetch({
                path: '/plugin-starter/v1/settings',
                method: 'POST',
                data: data
            });

            if (response.success) {
                setSettings(response.data);
                setMessage({
                    text: response.message || __('Settings saved successfully.', 'plugin-starter'),
                    type: 'success'
                });
                
                // Clear message after 3 seconds
                setTimeout(() => {
                    setMessage({ text: '', type: '' });
                }, 3000);
            }
        } catch (error) {
            console.error('Error saving settings:', error);
            setMessage({
                text: error.message || __('Failed to save settings.', 'plugin-starter'),
                type: 'error'
            });
        } finally {
            setSaving(false);
        }
    };

    const resetSection = async (section) => {
        try {
            setSaving(true);
            setMessage({ text: '', type: '' });

            const response = await apiFetch({
                path: `/plugin-starter/v1/settings/reset/${section}`,
                method: 'POST'
            });

            if (response.success) {
                setSettings(response.data);
                setMessage({
                    text: response.message || __('Section reset successfully.', 'plugin-starter'),
                    type: 'success'
                });
                
                // Reload to update form
                window.location.reload();
            }
        } catch (error) {
            console.error('Error resetting section:', error);
            setMessage({
                text: error.message || __('Failed to reset section.', 'plugin-starter'),
                type: 'error'
            });
        } finally {
            setSaving(false);
        }
    };

    const resetAll = async () => {
        try {
            setSaving(true);
            setMessage({ text: '', type: '' });

            const response = await apiFetch({
                path: '/plugin-starter/v1/settings/reset-all',
                method: 'POST'
            });

            if (response.success) {
                setSettings(response.data);
                setMessage({
                    text: response.message || __('All settings reset successfully.', 'plugin-starter'),
                    type: 'success'
                });
                
                // Reload to update form
                window.location.reload();
            }
        } catch (error) {
            console.error('Error resetting all settings:', error);
            setMessage({
                text: error.message || __('Failed to reset all settings.', 'plugin-starter'),
                type: 'error'
            });
        } finally {
            setSaving(false);
        }
    };

    return {
        settings,
        loading,
        saving,
        message,
        loadSettings,
        saveSettings,
        resetSection,
        resetAll
    };
};