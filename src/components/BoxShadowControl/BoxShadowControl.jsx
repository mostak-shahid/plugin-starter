import { __ } from '@wordpress/i18n';
import {useState} from 'react';
import {ColorPickerControl, UnitControl} from '../../components';
import { Switch, Space, Typography } from '@douyinfe/semi-ui';
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
                <Space align='center'>
                    <Switch 
                        aria-label={__('Enable Box Shadow', 'plugin-starter')}
                        checked={shadow.enabled}
                        onChange={(enabled) => update('enabled', enabled)}
                    />
                    <Typography.Title heading={6} style={{ margin: 8 }}>
                        {shadow.enabled ? 'Enasbled' : 'Disabled'}
                    </Typography.Title>
                </Space>
        
                {/* <ToggleControl
                    label={__('Enable Box Shadow', 'plugin-starter')}
                    checked={!!shadow.enabled}
                    onChange={(enabled) => update('enabled', enabled)}
                /> */}
            </div> 
            {shadow.enabled && (
                <>
                    <div className="row">
                        <div className="col-6">
                            {/* <UnitControl 
                                label={__('Width', 'authpress')}
                                onChange={(value) => handleChange('customizer.redesign.logo.width', value)}
                                value={settingData?.customizer?.redesign?.logo?.width}
                                units={units}
                            /> */}
                            <UnitControl
                                label={__('Horizontal Offset (px)', 'plugin-starter')}
                                onChange={(x) => update('x', x)}
                                value={shadow.x}
                                units={units}
                            />
                        </div>
                        <div className="col-6">
                            <UnitControl
                                label={__('Vertical Offset (px)', 'plugin-starter')}
                                onChange={(y) => update('y', y)}
                                value={shadow.y}
                                units={units}
                            />
                        </div>
                        <div className="col-6">
                            <UnitControl
                                label={__('Blur (px)', 'plugin-starter')}
                                onChange={(blur) => update('blur', blur)}
                                value={shadow.blur}
                                units={units}
                            />
                        </div>
                        <div className="col-6">
                            <UnitControl
                                label={__('Spread (px)', 'plugin-starter')}
                                onChange={(spread) => update('spread', spread)}
                                value={shadow.spread}
                                units={units}
                            />
                        </div>
                    </div>
                    <div className='row align-items-end'>
                        <div className="col-6">
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
                                checked={shadow.inset}
                                onChange={(enabled) => update('inset', enabled)}
                            />
                            {/* <ToggleControl
                                label={__('Inset', 'plugin-starter')}
                                checked={!!shadow.inset}
                                onChange={(inset) => update('inset', inset)}                            
                            /> */}
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