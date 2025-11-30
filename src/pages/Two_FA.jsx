import { __ } from "@wordpress/i18n";
import React, {useState, useMemo} from 'react';
import { useMain } from '../contexts/MainContext';
import withForm from './withForm';
import { 
    ToggleControl,    
    MenuGroup, 
    MenuItem,
} from '@wordpress/components';
const Two_FA = ({handleChange}) => {
    const {
        settingData,
        settingLoading
    } = useMain();
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    const [open, setOpen] = useState(null);
    return (
        <>
            <div className="setting-unit border-bottom py-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Enable Two FA", "plugin-starter")}</h4>
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
                                onChange={(value) => handleChange('two_fa_authentication.settings.enabled', value)}
                                checked={ settingData?.two_fa_authentication?.settings?.enabled }
                            />      
                        </div>
                    }
                </div>
            </div>

        </>
    )
}
export default withForm(Two_FA, 'two_fa_authentication.settings');