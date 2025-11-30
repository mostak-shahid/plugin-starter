import { __ } from '@wordpress/i18n';
import {
    PanelBody,
    RangeControl,
    ColorPalette,
    ToggleControl,
    __experimentalUnitControl as UnitControl, 
} from '@wordpress/components';
import {useState} from 'react';
import ColorPickerControl from '../ColorPickerControl/ColorPickerControl';
const units = [
    { value: 'px', label: 'px' },
    // { value: '%', label: '%' },
    // { value: 'em', label: 'em' },
    // { value: 'rem', label: 'rem' },
    // { value: 'vw', label: 'vw' },
];
const TextShadowControl = ({ value = {}, onChange, className='' }) => {
    const [shadow, setShadow] = useState(value);

    const update = (key, val) => {
        const newShadow = { ...shadow, [key]: val };
        setShadow(newShadow);
        onChange(newShadow);
    };

    return (
        <div className={`box-shadow-wrapper ${className}`}>
            <div className="d-flex justify-content-end mb-2">                
                <ToggleControl
                    label={__('Enable Text Shadow', 'plugin-starter')}
                    checked={!!shadow.enabled}
                    onChange={(enabled) => update('enabled', enabled)}
                />
            </div> 
            
            {shadow.enabled && (
                <>
                    <div className="row">
                        <div className="col-6">
                            <UnitControl
                                __next40pxDefaultSize 
                                label={__('Horizontal Offset (px)', 'plugin-starter')}
                                value={shadow.x}
                                onChange={(x) => update('x', x)}
                                min={-50}
                                max={50}
                                units={units}
                                className='mb-2'
                            />
                        </div>
                        <div className="col-6">
                            <UnitControl
                                __next40pxDefaultSize 
                                label={__('Vertical Offset (px)', 'plugin-starter')}
                                value={shadow.y}
                                onChange={(y) => update('y', y)}
                                min={-50}
                                max={50}
                                units={units}
                                className='mb-2'
                            />
                        </div>
                        <div className="col-6">
                            <UnitControl
                                __next40pxDefaultSize 
                                label={__('Blur (px)', 'plugin-starter')}
                                value={shadow.blur}
                                onChange={(blur) => update('blur', blur)}
                                min={0}
                                max={100}
                                units={units}
                                className='mb-2'
                            />
                        </div>
                        <div className="col-6">
                            <div className="">
                                <label className="form-label">{__('color', 'plugin-starter')}</label>
                                <ColorPickerControl
                                    defaultValue={shadow.color || "#000000"}
                                    handleChange={(color) => update('color', color)}
                                    mode='color'
                                    label={__('Shadow Color', 'plugin-starter')}
                                /> 
                            </div>
                        </div>
                    </div>
                    
                </>
            )}
        </div>
    );
};

export default TextShadowControl;
//Usage Example
{/* <TextShadowControl
    value={attributes.textShadow}
    onChange={(textShadow) => setAttributes({ textShadow })}
/> */}