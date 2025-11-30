import { __ } from '@wordpress/i18n';
import {
    ToggleControl,
    __experimentalUnitControl as UnitControl, 
} from '@wordpress/components';
import {useState} from 'react';
import ColorPickerControl from '../ColorPickerControl/ColorPickerControl';
import { Switch } from '@douyinfe/semi-ui';
const units = [
    { value: 'px', label: 'px' },
    // { value: '%', label: '%' },
    // { value: 'em', label: 'em' },
    // { value: 'rem', label: 'rem' },
    // { value: 'vw', label: 'vw' },
];
const BoxShadowControl = ({ value = {}, onChange, className='' }) => {
    const [shadow, setShadow] = useState(value);

    const update = (key, val) => {
        const newShadow = { ...shadow, [key]: val };
        setShadow(newShadow);
        onChange(newShadow);
    };

    return (
        <div className={`box-shadow-wrapper ${className}`}>
            <div className="d-flex justify-content-end mb-2">
                <Switch 
                    aria-label={__('Enable Box Shadow', 'plugin-starter')}
                    checked={!!shadow.enabled}
                    onChange={(enabled) => update('enabled', enabled)}
                />
        
                <ToggleControl
                    label={__('Enable Box Shadow', 'plugin-starter')}
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
                            <UnitControl
                                __next40pxDefaultSize 
                                label={__('Spread (px)', 'plugin-starter')}
                                value={shadow.spread}
                                onChange={(spread) => update('spread', spread)}
                                min={-50}
                                max={50}
                                units={units}
                                className='mb-2'
                            />
                        </div>
                    </div>
                    <div className='row align-items-end'>
                        <div className="col-6">
                            <label className="form-label">{__('color', 'plugin-starter')}</label>
                            <ColorPickerControl
                                defaultValue={shadow.color || "#000000"}
                                handleChange={(color) => update('color', color)}
                                mode='color'
                                label={__('Shadow Color', 'plugin-starter')}
                            /> 
                        </div>
                        <div className="col-6">
                            <Switch 
                                aria-label={__('Inset', 'plugin-starter')}
                                checked={!!shadow.inset}
                                onChange={(enabled) => update('inset', enabled)}
                            />
                            <ToggleControl
                                label={__('Inset', 'plugin-starter')}
                                checked={!!shadow.inset}
                                onChange={(inset) => update('inset', inset)}                            
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default BoxShadowControl;
// Usage Example

// <BoxShadowControl
//     value={attributes.boxShadow}
//     onChange={(boxShadow) => setAttributes({ boxShadow })}
// />