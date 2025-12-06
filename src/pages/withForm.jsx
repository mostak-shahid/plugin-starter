
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageInfo from "../components/PageInfo/PageInfo";
import { useMain } from "../contexts/MainContext";
import { formDataPost, setNestedValue, urlToArr, useSettingsBodyHeight } from "../lib/Helpers"; // Import utility function

import Details from '../data/details.json';

import { Layout, Typography,  Toast, Card, Button, Space, Nav} from '@douyinfe/semi-ui';
import { IconSave, IconRefresh,
    IconHelpCircle,
    IconLikeHeart,
    IconUserAdd,
    IconSend,
    IconCreditCard,
    IconHistogram,
} from '@douyinfe/semi-icons';


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
        
        const settingsBodyHeight = useSettingsBodyHeight();

        const location = useLocation();
        
        const OPTIONS_API_URL = "/plugin-starter/v1/options";

        useEffect(() => {      
            const fetchSettingData = async () => {
                try {
                    const response = await apiFetch({
                        path: OPTIONS_API_URL,
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
        
        const headerContent = {
            logo: <Logo width={36} height={36} />,
            text: Details?.name,
        };
        const footerContent = (
            <>
                {/* Your bottom menu */}
                <Nav 
                    items= {[
                        {
                            itemKey: "vip",
                            text: __("VIP Priority Support", "plugin-starter"),
                            url: "https://mostak-shahid.github.io/plugin/plugin-starter/vip-priority-support/",
                            target: "_blank",
                            icon: <IconSend />
                        },
                        {
                            itemKey: "help",
                            text: __("Help Center", "plugin-starter"),
                            url: "https://mostak-shahid.github.io/plugin/plugin-starter/docs/",
                            target: "_blank",
                            icon: <IconHelpCircle />
                        },
                        {
                            itemKey: "community",
                            text: __("Join the Community", "plugin-starter"),
                            url: "https://www.facebook.com/groups/wpastra",
                            icon: <IconUserAdd />
                        },
                        {
                            itemKey: "rate",
                            text: __("Rate Us", "plugin-starter"),
                            url: "https://wordpress.org/support/plugin/plugin-starter/reviews/?filter=5#new-post",
                            target: "_blank",
                            icon: <IconLikeHeart />
                        },
                    ]}
                    onSelect={(data) => footerContentHandleSelect(data.selectedItems[0])}
                    style={{ padding: 0, marginBottom: 0, border: 'none' }}
                />

                {/* Collapse Button */}
                {/* <Nav.Footer collapseButton={true} /> */}
            </>
        );
        const footerContentHandleSelect = (item) => {
            console.log(item)
            if (!item || !item.url) {
                return;
            }

            // Open in new tab if target is "_blank"
            if (item.target === '_blank') {
                window.open(item.url, '_blank');
            } else {
                // Default: same tab navigation
                window.location.href = item.url;
            }
        };
        

        // 1. Add a sub-item programmatically
        settingsMenu.find(item => item.itemKey === "page")?.items.push({
            itemKey: "page-3",
            text: __("Page 3", "plugin-starter"),
            description: __("Page 3", "plugin-starter"),
            url: "/settings/page/page-3",
        });
        // 2. Add a new top-level item (anywhere you want)
        // Add at the end:
        settingsMenu.push({
            itemKey: "support",
            text: __("Support", "plugin-starter"),
            description: __("Documentation & help resources", "plugin-starter"),
            url: "/settings/support",
            icon: <IconHelpCircle />,
        });
        // Add at a specific index:
        settingsMenu.splice(3, 0, {
            itemKey: "pricing",
            text: __("Pricing", "plugin-starter"),
            description: __("View pricing and upgrade options", "plugin-starter"),
            url: "/settings/pricing",
            icon: <IconCreditCard />,
        });
        if (window.plugin_starter_ajax_obj?.isPro) {
            settingsMenu.push({
                itemKey: "analytics",
                text: __("Analytics", "plugin-starter"),
                description: __("Advanced insights", "plugin-starter"),
                url: "/settings/analytics",
                icon: <IconHistogram />,
            });
        }

        return (
            <>
                <div className="plugin-starter-settings container mx-auto px-4">
                    <Layout>
                        <Sider>
                            <VerticalMenuControl 
                                items={settingsMenu}
                                breakpoint={960}
                                headerContent={headerContent}
                                footerContent={footerContent}
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