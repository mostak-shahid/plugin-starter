import { __ } from "@wordpress/i18n";
import React, {useState, useMemo} from 'react';
import { useMain } from '../contexts/MainContext';
import withForm from './withForm';
import { 
    ToggleControl,
} from '@wordpress/components';
const Two_FA_Email = ({handleChange}) => {
    const {
        settingData,
        settingLoading
    } = useMain();
    const [emails, setEmails] = useState('');
    const [selected, setSelected] = useState([]);
    const [ processing, setProcessing ] = useState('normal');
    const handleButtonClick = () => {
        setProcessing('processing');
        // Simulate an async operation (e.g., form submission)
        setTimeout(() => {
            setProcessing('done');
            // Reset to normal state after a short delay
            setTimeout(() => {
                setProcessing('normal');
            }, 2000);
        }, 3000);
    }
    return (
        <>
            <div className="setting-unit border-bottom py-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Email OTP", "plugin-starter")}</h4>
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
                                onChange={(value) => handleChange('two_fa_authentication.email.enabled', value)}
                                checked={ settingData?.two_fa_authentication?.email?.enabled }
                            />      
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
export default withForm(Two_FA_Email, 'two_fa_authentication.email');