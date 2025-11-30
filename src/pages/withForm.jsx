
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageInfo from "../components/PageInfo/PageInfo";
import { useMain } from "../contexts/MainContext";
import { formDataPost, setNestedValue, urlToArr,  } from "../lib/Helpers"; // Import utility function
import Details from '../data/details.json';

import { Layout, Typography,  Toast, Card, Button, Space,} from '@douyinfe/semi-ui';
import { IconSave, IconRefresh } from '@douyinfe/semi-icons';


import VerticalMenuControl from "../components/VerticalMenuControl/VerticalMenuControl";

import { Logo } from '../lib/Illustrations';
import BreadcrumbControl from "../components/BreadcrumbControl/BreadcrumbControl";


const withForm = (OriginalComponent, sectionPath = null) => {   
    const { Header, Footer, Sider, Content } = Layout;
    const { Title, Text, Paragraph } = Typography;  

    function NewComponent() {
        const {
            settingData, 
            setSettingData,
            settingLoading,
            setSettingLoading,
            settingsMenu,
            settingReload,
            setSettingReload
        } = useMain();
        const [ saving, setSaving ] = useState(false);
        const [ resetting, setResetting ] = useState(false);

        const urlArr = urlToArr();

        const location = useLocation();
        
        const OPTIONS_API_URL = "/plugin-starter/v1/options";

        useEffect(() => {
            const basePath = '/plugin-starter/v1';        
            const fetchSettingData = async () => {
                try {
                    const response = await apiFetch({
                        path: `${basePath}/options`,
                        headers: { 'X-WP-Nonce': plugin_starter_ajax_obj.api_nonce }
                    });
                    setSettingData(response);
                    setSettingLoading(false)
                } catch (error) {
                    console.log(error);
                }
            };
        
            fetchSettingData();
        }, [settingReload]);

        // Handle changes from child components
        const handleChange = (fieldPath, value) => {
            // console.log("Field changed:", fieldPath, "New value:", value);
            setSettingData(prev => {
                const updatedOptions = setNestedValue(prev, fieldPath, value);
                return { ...updatedOptions }; // Ensure React detects the update
            });
        };
        const handleSave = async () => {
            setSaving(true);
            try {
                const result = await apiFetch({
                    path: OPTIONS_API_URL,
                    method: 'POST',
                    data: { plugin_starter_options: settingData },
                    headers: {
                        'X-WP-Nonce': plugin_starter_ajax_obj.api_nonce
                    }
                });
                // console.log(result);
                if (result.success) {
                    // window.scrollTo(0, 0);
                    setSettingReload(Math.random);
                    Toast.success({
						content: __("Settings saved successfully!!!", "plugin-starter"),
						duration: 3,
                        theme: 'light',
                        right: 15,
					});
                } else {
                    Toast.error({
						content: __("Error saving settings. Please try again.", "plugin-starter"),
						duration: 3,
                        theme: 'light',
					});
                }
                
            } catch (error) {
                console.error("Error saving settings:", error);
                Toast.error({
                    content: __("Error saving settings. Please try again.", "plugin-starter"),
                    duration: 3,
                    theme: 'light',
                });
            } finally {
                setSaving(false);
            }
        };
        const handleReset = async () => {
            const confirmation = window.confirm(__( "Are you sure you want to proceed?", "plugin-starter" ));
            let result;
            if (confirmation) {       
                setResetting(true);        
                try {
                    result = await formDataPost('plugin_starter_reset_settings', {name:sectionPath});
                    // console.log(result); 
                    if (result.success) {
                        setSettingReload(Math.random);   
                    }
                } catch (error) {
                    setResetError(error.message);
                } finally {
                    setResetting(false);    
                }
            }
        };
        const [settingsBodyHeight, setHeight] = useState();
        useEffect(() => {
            function updateVH() {
                const plugin_starter_height = document.body.scrollHeight
                ? document.body.scrollHeight
                : window.innerHeight; // fallback
                // const appliedHeight = vh - 69;
                setHeight(plugin_starter_height - 130);
                // console.log("document.body.scrollHeight:", document.body.scrollHeight);
            }

            updateVH();

            // Listen to resize & viewport changes
            window.visualViewport?.addEventListener("resize", updateVH);
            window.visualViewport?.addEventListener("scroll", updateVH);

            return () => {
                window.visualViewport?.removeEventListener("resize", updateVH);
                window.visualViewport?.removeEventListener("scroll", updateVH);
            };
        }, []);
        
        const headerContent = {
                logo: <Logo width={36} height={36} />,
                text: Details?.name,
        };
        return (
            <>
                <div className="plugin-startersettings container mx-auto px-4">
                    <Layout>
                        <Sider>
                            <VerticalMenuControl 
                                items={settingsMenu}
                                breakpoint={960}
                                headerContent={headerContent}
                            />
                        </Sider>
                        <Content style={{ padding: 24, minHeight: settingsBodyHeight, backgroundColor: 'var(--semi-color-bg-4)'}}>    
                            <BreadcrumbControl />
                            <Card 
                                title={
                                    <PageInfo url={location.pathname} />
                                }
                                style={{ borderRadius: 0 }}
                                // headerExtraContent={
                                //     <Text link>
                                //         More
                                //     </Text>
                                // }
                                footerLine={ sectionPath?true:false }
                                // footerStyle={{ display: 'flex', justifyContent: 'flex-end' }}
                                footer={ sectionPath ?
                                    <Space>
                                        <Button 
                                            theme="solid"
                                            type="primary"
                                            icon={<IconSave />}
                                            loading={saving} 
                                            onClick={handleSave} 
                                            style={{ marginRight: 14 }}
                                        >                                
                                            {
                                                saving ? __( "Saving...", "plugin-starter" ) : __( "Save", "plugin-starter" )
                                            }
                                        </Button>
                                        <Button 
                                            theme="solid"
                                            type="danger"
                                            icon={<IconRefresh />}
                                            loading={resetting} 
                                            onClick={handleReset} 
                                            style={{ marginRight: 14 }}
                                        >                                
                                            {
                                                resetting ? __( "Resetting...", "plugin-starter" ) : __( "Reset", "plugin-starter" )
                                            }
                                        </Button>
                                    </Space> : ''
                                }
                            >
                                <OriginalComponent handleChange={handleChange} />
                            </Card>
                        </Content>
                    </Layout>
                
                    
                </div>
            </>
        )
    }
    return NewComponent;    
}
export default withForm;