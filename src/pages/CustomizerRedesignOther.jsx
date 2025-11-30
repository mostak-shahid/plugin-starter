import { __ } from "@wordpress/i18n";
import FontControl from "../components/FontControl/FontControl";
import { useMain } from '../contexts/MainContext';
import withForm from '../pages/withForm';
import { 
    ToggleControl,
    SelectControl,
} from '@wordpress/components';
const CustomizerRedesignOther = ({handleChange}) => {
    const {
        settingData,
        settingLoading
    } = useMain();
    return (
        <>
            <div className="setting-unit border-bottom py-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Disable Remember Me?", "plugin-starter")}</h4>
                        }
                        {
                            settingLoading 
                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                        }
                    </div>    
                    {
                        !settingLoading &&                               
                        <div className="col-auto">
                            <ToggleControl
                                __nextHasNoMarginBottom
                                onChange={(newValue) => handleChange('customizer.redesign.other.disable_remember_me', newValue)}
                                checked={settingData?.customizer?.redesign?.other?.disable_remember_me}
                            /> 
                        </div>
                    }
                </div>
            </div>
            <div className="setting-unit border-bottom py-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Disable Register Link?", "plugin-starter")}</h4>
                        }
                        {
                            settingLoading 
                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                        }
                    </div>    
                    {
                        !settingLoading &&                               
                        <div className="col-auto">
                            <ToggleControl
                                __nextHasNoMarginBottom
                                onChange={(newValue) => handleChange('customizer.redesign.other.disable_register_link', newValue)}
                                checked={settingData?.customizer?.redesign?.other?.disable_register_link}
                            /> 
                        </div>
                    }
                </div>
            </div>
            <div className="setting-unit border-bottom py-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Disable Lost Password?", "plugin-starter")}</h4>
                        }
                        {
                            settingLoading 
                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                        }
                    </div>    
                    {
                        !settingLoading &&                               
                        <div className="col-auto">
                            <ToggleControl
                                __nextHasNoMarginBottom
                                onChange={(newValue) => handleChange('customizer.redesign.other.disable_lost_password', newValue)}
                                checked={settingData?.customizer?.redesign?.other?.disable_lost_password}
                            /> 
                        </div>
                    }
                </div>
            </div>
            <div className="setting-unit border-bottom py-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Disable Privacy policy", "plugin-starter")}</h4>
                        }
                        {
                            settingLoading 
                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                        }
                    </div>    
                    {
                        !settingLoading &&                               
                        <div className="col-auto">
                            <ToggleControl
                                __nextHasNoMarginBottom
                                onChange={(newValue) => handleChange('customizer.redesign.other.disable_privacy_policy', newValue)}
                                checked={settingData?.customizer?.redesign?.other?.disable_privacy_policy}
                            /> 
                        </div>
                    }
                </div>
            </div>
            <div className="setting-unit border-bottom py-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Disable Back to Website?", "plugin-starter")}</h4>
                        }
                        {
                            settingLoading 
                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                        }
                    </div>    
                    {
                        !settingLoading &&                               
                        <div className="col-auto">
                            <ToggleControl
                                __nextHasNoMarginBottom
                                onChange={(newValue) => handleChange('customizer.redesign.other.disable_back_to_website', newValue)}
                                checked={settingData?.customizer?.redesign?.other?.disable_back_to_website}
                            /> 
                        </div>
                    }
                </div>
            </div>
            <div className="setting-unit border-bottom py-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Login By", "plugin-starter")}</h4>
                        }
                        {
                            settingLoading 
                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                        }
                    </div>    
                    {
                        !settingLoading &&                               
                        <div className="col-lg-5">  
                            <SelectControl
                                // label="Size"
                                value={ settingData?.customizer?.other?.login_by }
                                options={ [
                                    { label: __("Both", "plugin-starter"), value: 'both' },
                                    { label: __("Username", "plugin-starter"), value: 'username' },
                                    { label: __("Email", "plugin-starter"), value: 'email' },
                                    { label: __("Phone Number (Pro)", "plugin-starter"), value: 'phone',disabled: true },
                                ] }
                                onChange={ ( newSize ) => handleChange('customizer.other.login_by', newSize ) }
                                __next40pxDefaultSize
                                __nextHasNoMarginBottom
                            />                       
                        </div>
                    }
                </div>
            </div>
            <div className="setting-unit pt-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Password Fields on registration page", "plugin-starter")}</h4>
                        }
                        {
                            settingLoading 
                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                        }
                    </div>    
                    {
                        !settingLoading &&                               
                        <div className="col-auto">
                            <ToggleControl
                                __nextHasNoMarginBottom
                                onChange={(newValue) => handleChange('customizer.other.registered_with_password', newValue)}
                                checked={settingData?.customizer?.other?.registered_with_password}
                            /> 
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
export default withForm(CustomizerRedesignOther, 'customizer.redesign.other');