import { useState, useEffect } from '@wordpress/element';
import { __ } from "@wordpress/i18n";
import apiFetch from '@wordpress/api-fetch';

const ImportExport = () => {
    const [importData, setImportData] = useState('');
    const [processingImport, setProcessingImport] = useState(false);
    const [processingExport, setProcessingExport] = useState(false);
    const [fileList, setFileList] = useState([]);

    const handleExport = async() => {
        setProcessingExport(true);
        try {
            const data = await apiFetch({
                path: "/plugin-starter/v1/options",
                method: 'GET'
            });
            if (data) {
                // setSettings(data);
                const blob = new Blob([JSON.stringify(data, null, 2)], {
                    type: 'application/json',
                });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'plugin-starter-settings.json';
                link.click();
            }
        } catch (error) {
            console.error("Error fetching settings:", error);
        } finally {
            setProcessingExport(false);
        }        
        // toast.success(__('Settings exported successfully', 'plugin-starter'));
    };
    

    // Handle file upload with Semi Design Upload
    const handleFileChange = ({ fileList, currentFile }) => {
        setFileList(fileList);
        
        if (currentFile && currentFile.fileInstance) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const content = event.target.result;
                    JSON.parse(content); // Validate JSON
                    setImportData(content);
                    // toast.success(__('File loaded successfully', 'plugin-starter'));
                } catch (err) {
                    // toast.error(__('Invalid JSON file', 'plugin-starter'));
                    setFileList([]);
                    setImportData('');
                }
            };
            reader.readAsText(currentFile.fileInstance);
        }
    };

    // Handle file removal
    const handleRemove = () => {
        setImportData('');
        setFileList([]);
    };

    // Submit imported JSON
    const handleImport = async () => {
        setProcessingImport(true);
        console.log(importData);
        try {
            const parsed = JSON.parse(importData);
            const response = await apiFetch({
                path: '/plugin-starter/v1/options/import-settings',
                method: 'POST',
                data: parsed,
            });

            if (response.success) {
                setProcessingImport(false);
                setFileList([]);
                setImportData('');
                Notification.success({
                    title: __("Success", "plugin-starter"),
                    content: __("Settings imported successfully!", "plugin-starter"),
                    duration: 3,
                    position: 'topRight',
                });
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                // toast.error(__('Import failed', 'plugin-starter'));
                setProcessingImport(false);
            }
        } catch (e) {
            // toast.error(__('Invalid JSON content', 'plugin-starter'));
            console.log(e);
            setProcessingImport(false);
        } finally {
            setProcessingImport(false);
        }
    };
    return (
        <></>
    );
};

export default ImportExport;