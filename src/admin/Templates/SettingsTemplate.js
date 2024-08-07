import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import React from 'react';
import SettingsTitle from '../Molecules/SettingsTitle';
export default function SettingsTemplate({data, setData}) {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const updateField = (path, value) => {
        const keys = path.split('.');
        let tempData = { ...data };

        keys.reduce((acc, key, index) => {
            if (index === keys.length - 1) {
                acc[key] = value;
            } else {
                if (!acc[key]) acc[key] = {};
                return acc[key];
            }
        }, tempData);

        setData(tempData);

        console.log(data);

        /*wp.apiFetch({
            path: '/plugin_starter/v1/options',
            method: 'POST',
            data: {
                'plugin_starter_options': options
            },
        }).then(data => {
            setSuccess('Options saved successfully!');
        });*/
    };
    return (
        <div className="options">                                                
            {console.log(data)}
            
            <div className="plugin-starter-setting-unit">
                <div className="switch-setting-unit">
                    <SettingsTitle
                        title={ __(
                            'Switch option',
                            'plugin-starter'
                        ) }
                        hint ={ __(
                            'Enable banner option for shop page.',
                            'plugin-starter'
                        ) }
                        description = {'<p>' + __('Choose a banner for the shop page that best aligns with your current marketing goals and target audience.', 'plugin-starter')  + '</p>'}
                    />
                    <div className="position-relative switcher">
                        <label htmlFor="plugin_starter_option_check">
                            <input 
                            id="plugin_starter_option_check"
                            type="checkbox" 
                            value="1"
                            checked={data?.plugin_starter_option_check}
                            onChange = {(event) => updateField('plugin_starter_option_check', event.target.checked)}
                            />
                                <em data-on="on" data-off="off"></em>
                                <span></span>
                        </label>
                    </div>
                </div>
            </div>
            {/* plugin-starter-setting-unit plugin-starter-setting-sub-unit */}
            
            {/* <TextControl
                label="Shop Page Banner Width"
                value={options?._shop_page?._banner_width}
                onChange={(value) => updateField('_shop_page._banner_width', value)}
            />                                          */}
            
            
        </div> 
    )
}
