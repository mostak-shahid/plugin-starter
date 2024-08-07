import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import React from 'react';
import ImageUploader from '../Atoms/ImageUploader';
import SettingsTitle from '../Molecules/SettingsTitle';
export default function ImageTemplate({data, setData}) {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const updateField = ( path, value ) => {
		const keys = path.split( '.' );
		const tempData = { ...data };

		keys.reduce( ( acc, key, index ) => {
			if ( index === keys.length - 1 ) {
				acc[ key ] = value;
			} else {
				if ( ! acc[ key ] ) acc[ key ] = {};
				return acc[ key ];
			}
		}, tempData );

		setData( tempData );
		console.log(data);
		console.log(tempData);

		/*wp.apiFetch( {
			path: '/plugin_starter/v1/options',
			method: 'POST',
			data: {
				plugin_starter_api_settings: tempData,
			},
		} ).then( ( data ) => {
			// setSuccess('Options saved successfully!');
			const toastId = 'uqvfw-toast-id';
			
		} );*/
	};
    return (
        <div className="options">
            <div className="plugin-starter-setting-unit">
                <div className="image-setting-unit">
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
                    <ImageUploader className="position-relative mt-2" data={data.banner_internal_image} updateField={updateField} path="banner_internal_image" />
                    
                </div>
            </div>
        </div>
    )
}
