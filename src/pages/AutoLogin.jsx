import { __ } from "@wordpress/i18n";
import React, {useState, useMemo} from 'react';
import { useMain } from '../contexts/MainContext';
import withForm from './withForm';
import { 
    ToggleControl,    
} from '@wordpress/components';
const AutoLogin = ({handleChange}) => {
    const {
        settingData,
        settingLoading
    } = useMain();
    return (
        <>
            <div className="setting-unit py-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Enable Auto Login", "plugin-starter")}</h4>
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
                                onChange={(value) => handleChange('auto_login.settings.enabled', value)}
                                checked={ settingData?.auto_login?.settings?.enabled }
                            />      
                        </div>
                    }
                </div>
            </div>

        </>
    )
}
export default withForm(AutoLogin, 'auto_login.settings');