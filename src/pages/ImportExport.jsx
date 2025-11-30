import { __ } from "@wordpress/i18n";
import apiFetch from '@wordpress/api-fetch';
import { useState } from 'react';
import { useMain } from '../contexts/MainContext';
import withForm from '../pages/withForm';
import { Row, Col, Typography, Skeleton, Button, Upload, Space, Toast, } from '@douyinfe/semi-ui';
import { IconDownload, IconUpload, IconTickCircle } from '@douyinfe/semi-icons';
import { SkeletonPlaceholder } from '../components';
const ImportExport = ({handleChange}) => {
    const {
        settingData,
        settingLoading,
        setSettingReload
    } = useMain();
    const { Title, Text, Paragraph } = Typography;
    const [importData, setImportData] = useState('');
    const [processingImport, setProcessingImport] = useState(false);
    const [processingExport, setProcessingExport] = useState(false);
    const [fileList, setFileList] = useState([]);

    const handleExport = () => {
        const blob = new Blob([JSON.stringify(settingData, null, 2)], {
            type: 'application/json',
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'plugin-startersettings.json';
        link.click();
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
                path: '/plugin-starter/v1/settings',
                method: 'POST',
                data: parsed,
            });

            if (response.success) {
                // toast.success(__('Settings imported successfully!', 'plugin-starter'));
                Toast.success({
                    content: __("Settings imported successfully!", "plugin-starter"),
                    duration: 3,
                    theme: 'light',
                    right: 15,
                });
                setTimeout(() => {
                    setProcessingImport(false);
                    setSettingReload(Math.random()); // Trigger reload
                    setFileList([]);
                    setImportData('');
                }, 1000);
            } else {
                // toast.error(__('Import failed', 'plugin-starter'));
                setProcessingImport(false);
            }
        } catch (e) {
            // toast.error(__('Invalid JSON content', 'plugin-starter'));
            console.log(e);
            setProcessingImport(false);
        }
    };
    return (
        <>
            <div className="setting-unit border-bottom py-4">
                <Row type="flex" gutter={[24, 24]}>
                    <Col xs={24} lg={12} xl={14}>
                        <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingLoading} active>
                            <Title heading={4}>{__("Export Settings", "plugin-starter")}</Title>
                            <Paragraph>{__("Export your current settings", "plugin-starter")}</Paragraph>
                        </Skeleton>
                    </Col>    
                    {
                        !settingLoading &&                               
                        <Col xs={24} lg={12} xl={10}>
                            <Button     
                                type="primary" 
                                icon={<IconDownload />}                  
                                onClick={handleExport}
                            >
                                {__( "Export Settings", "plugin-starter" )}
                            </Button>
                        </Col>
                    }
                </Row>
            </div>
            <div className="setting-unit pt-4">
                <Row type="flex" gutter={[24, 24]}>
                    <Col xs={24} lg={12} xl={14}>
                        <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingLoading} active>
                            <Title heading={4}>{__("Import Settings", "plugin-starter")}</Title>
                            <Paragraph>{__("Description", "plugin-starter")}</Paragraph>
                        </Skeleton>
                    </Col>    
                    {
                        !settingLoading &&                               
                        <Col xs={24} lg={12} xl={10}>
                            <Space vertical spacing='tight' align='start'>
                                <Upload
                                    accept="application/json,.json"
                                    action=""
                                    fileList={fileList}
                                    onChange={handleFileChange}
                                    onRemove={handleRemove}
                                    beforeUpload={() => false}
                                    maxSize={5120}
                                    limit={1}
                                >
                                    <Button icon={<IconUpload />}>
                                        {__("Select JSON File", "plugin-starter")}
                                    </Button>
                                </Upload>
                                {importData &&
                                    <Button
                                        icon={ !processingImport ? <IconTickCircle /> : null}
                                        onClick={handleImport}
                                        disabled={!processingImport}
                                        loading={processingImport}
                                        type="primary"
                                    >
                                        {processingImport
                                            ? __("Processing...", "plugin-starter")
                                            : __("Import Settings", "plugin-starter")
                                        }
                                    </Button>
                                }
                            </Space>
                            <div>

                                {/* Hidden textarea with the JSON content */}
                                <textarea
                                    style={{ display: 'none' }}
                                    value={importData}
                                    readOnly
                                ></textarea>
                            </div>
                        </Col>
                    }
                </Row>
            </div>
        </>
    )
}
export default withForm(ImportExport);