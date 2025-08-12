
import { __ } from "@wordpress/i18n";
import axios from "axios";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MultiLevelListGroup from "../components/MultiLevelListGroup/MultiLevelListGroup";
import PageInfo from "../components/PageInfo/PageInfo";
import { useMain } from "../contexts/MainContext";
import { formDataPost, setNestedValue, urlToArr } from "../lib/Helpers"; // Import utility function
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
const withForm = (OriginalComponent) => {     
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
        const [saveLoading, setSaveLoading] = useState(false)
        const [saveError, setSaveError] = useState(null)

        const [showToast, setShowToast] = useState(false)

        const [resetLoading, setResetLoading] = useState(false)
        const [resetError, setResetError] = useState(null)

        const [resetAllLoading, setResetAllLoading] = useState(false)
        const [resetAllError, setResetAllError] = useState(null)
        
        const [processing, setProcessing] = useState(false)

        const urlArr = urlToArr();

        const location = useLocation();
        
        const OPTIONS_API_URL = "/wp-json/plugin-starter/v1/options";

        useEffect(() => {
            const baseURL = '/wp-json/plugin-starter/v1';        
            const fetchSettingData = async () => {
                try {
                    const response = await axios.get(`${baseURL}/options`, {headers: {'X-WP-Nonce': plugin_starter_ajax_obj.api_nonce }});
                    setSettingData(response.data);
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
        const handleSave = () => {
            setProcessing(true);
            setSaveLoading(true);
            setSaveError(null);
            axios.post(
                OPTIONS_API_URL, 
                {'plugin_starter_options': settingData},
                {
                    headers: {
                        'X-WP-Nonce': plugin_starter_ajax_obj.api_nonce,
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(response => {
                window.scrollTo(0, 0);
                // console.log("Settings saved successfully:", response.data);
                setSaveLoading(false)        
                setProcessing(false)
                setShowToast(true)
                
            })
            .catch(
                error => console.error("Error saving settings:", error)
            );
        };
       const handleReset = async (name) => {
            // console.log(name)
            const confirmation = window.confirm(__( "Are you sure you want to proceed?", "plugin-starter" ));
            let result;
            if (confirmation) {       
                setProcessing(true);     
                setResetLoading(true);
                setResetError(null);            
                try {
                    result = await formDataPost('plugin_starter_reset_settings', {name:name}); 
                    setSettingReload(Math.random);
                } catch (error) {
                    setResetError(error.message);
                } finally {
                    setResetLoading(false);
                    setProcessing(false);
                }
            }
        };
        const handleResetAll = async () => {
            const confirmation = window.confirm(__( "Are you sure you want to proceed?", "plugin-starter" ));
            let result;
            if (confirmation) {       
                setProcessing(true);     
                setResetAllLoading(true);
                setResetAllError(null);         
                try {
                    result = await formDataPost('plugin_starter_reset_all_settings', {}); 
                    setSettingReload(Math.random);
                } catch (error) {
                    setResetError(error.message);
                } finally {
                    setProcessing(false);     
                    setResetAllLoading(false);
                }
            }
        };
        useEffect(() => {
        }, [])
        return (
            <>
                <ToastContainer
                    className="p-3"
                    // position="end"
                    style={{ zIndex: 9999, top:'43px', right:0 }}
                >
                    <Toast 
                        bg="success"
                        onClose={() => setShowToast(false)} 
                        show={showToast} 
                        delay={3000} 
                        autohide
                    >
                        <Toast.Header>
                            <strong className="me-auto">{__('Saved',"plugin-starter")}</strong>
                        </Toast.Header>
                        <Toast.Body>
                            {__(
                                'All changes have been applied correctly, ensuring your preferences are now in effect.',                                                        
                                "plugin-starter"
                            )}
                        </Toast.Body>
                    </Toast>
                </ToastContainer>
                <div className="plugin-starter-settings">
                    <div className="container">
                        <div className="row g-0">
                            <div className="col-lg-3 d-none d-lg-block">
                                <div className="plugin-starter-sidebar card mt-0 py-3 rounded-0" style={{marginRight:'-1px', height: "100%"}}>                            
                                    <MultiLevelListGroup  data={settingsMenu}/>
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="card mt-0 rounded-0" style={{height: "100%"}}>
                                    <PageInfo url={location.pathname} />
                                    <div className="card-body">        
                                        <OriginalComponent handleChange={handleChange} />
                                    </div>
                                    {/* {console.log(location.pathname)} */}
                                    {
                                        (location.pathname!='/settings/feedback' && location.pathname!='/settings/import_export') && 
                                            <div className="card-footer d-flex gap-2">
                                                <button 
                                                    type="button" 
                                                    className="button button-primary" 
                                                    onClick={handleSave}
                                                    disabled={processing}
                                                >
                                                    {
                                                        saveLoading ? __( "Saving...", "plugin-starter" ) : __( "Save Changes", "plugin-starter" )
                                                    }
                                                </button>
                                                {/* <button 
                                                    className="button button-secondary"
                                                    data-menu={`${urlArr[0]}.${ urlArr[urlArr.length-1]}`}
                                                    onClick={() => handleReset(`${urlArr[0]}.${ urlArr[urlArr.length-1]}`)}
                                                    disabled={processing}
                                                >
                                                    {resetLoading ? __( "Resetting...", "plugin-starter" ) : __( "Reset Settings", "plugin-starter" )}
                                                </button> */}
                                                <button 
                                                    className="button button-secondary"
                                                    onClick={handleResetAll}
                                                    disabled={processing}
                                                >
                                                    {resetAllLoading ? __( "Resetting...", "plugin-starter" ) : __( "Reset", "plugin-starter" )}
                                                </button>

                                                {resetAllError && <div className="plugin-starter-error">{resetAllError}</div>}
                                                {resetError && <div className="plugin-starter-error">{resetError}</div>}
                                                {saveError && <div className="plugin-starter-error">{saveError}</div>}
                                            </div>
                                    }
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return NewComponent;    
}
export default withForm;