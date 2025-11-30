import { __ } from '@wordpress/i18n';
import { useEffect, useState } from 'react';
import ColorPickerControl from '../ColorPickerControl/ColorPickerControl';
const LinkColor = ({options, defaultValues = {}, name, handleChange}) => {
    // Initialize selected values with defaultValues
    const [values, setValues] = useState(defaultValues);

    const updateValue = (option, value) => {
        const updated = { ...values, [option]: value };
        setValues(updated);
        handleChange(name, updated);
    };
    return (
        <>
            <div className="border-wrapper d-flex flex-wrap align-items-center gap-2 ">
                {options.map((option) => (
                    <div key={option} className={`from-group from-group-${option}`}>
                        {/* color → color picker */}
                        {
                            <ColorPickerControl
                                defaultValue={values[option] || "#000000"}
                                handleChange={(value) => updateValue(option, value)}
                                mode='color'
                                label={`${option.charAt(0).toUpperCase() + option.slice(1)} Color`}
                            /> 
                        }
                    </div>
                ))}
            </div>
        </>
    );
}
export default LinkColor;