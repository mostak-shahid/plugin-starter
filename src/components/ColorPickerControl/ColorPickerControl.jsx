import { useState } from 'react';
import { GRADIENTS, COLORS } from '../../lib/Constants';
import {
    ColorIndicator, 
    ColorPalette, 
    GradientPicker,
    Popover,
    TabPanel,
} from '@wordpress/components';
import { 
    Button, 
    // Popover
    Typography, 
} from '@douyinfe/semi-ui';
import './ColorPickerControl.scss';

export default function ColorPickerControl({ defaultValue, handleChange, mode = 'both', label='', className='' }) {
    const [ isOpen, setIsOpen ] = useState(false);

    // dynamically choose which tabs to show
    const availableTabs = [];
    if (mode === 'color' || mode === 'both') {
        availableTabs.push({ name: 'color', title: 'Color', className: 'tab-color' });
    }
    if (mode === 'gradient' || mode === 'both') {
        availableTabs.push({ name: 'gradient', title: 'Gradient', className: 'tab-gradient' });
    }
    const PopoverContent = (
        <TabPanel
            className="color-gradient-tabs p-2"
            activeClass="active-tab"
            tabs={ availableTabs }
        >
            { ( tab ) => (
                <>
                    { tab.name === 'color' && (
                        <ColorPalette
                            colors={ COLORS }
                            value={ defaultValue }
                            onChange={ ( color ) => handleChange(color) }
                            enableAlpha={ true }
                            asButtons={ true }
                        /> 
                    ) }
                    { tab.name === 'gradient' && (
                        <GradientPicker
                            value={ defaultValue }
                            onChange={ ( newGradient ) => handleChange(newGradient) }
                            gradients={ GRADIENTS }
                        />
                    ) }
                </>
            ) }
        </TabPanel>
    );
    return (
        <div className={`color-picker-control ${className}`}>
            {label && <label className='font-semibold block'><Typography.Text>{label}</Typography.Text></label>}
            <Button
                block
                type="secondary"
                onClick={ () => setIsOpen(!isOpen) }
                // style={ { border: '1px solid #ccc', color: '#ccc', gap: '10px', boxShadow: 'none', width: '100%' } }
            >                                   
                <ColorIndicator colorValue={ defaultValue } /> 
                {label && <span className="color-picker-label ml-2 font-bold">{ label }</span>}
            </Button>   
            {/* <Popover visible={isOpen} content={PopoverContent} trigger="custom"/> */}

            { isOpen && (
                <Popover className="color-picker-popover" onClose={ () => setIsOpen(false) }>
                    <TabPanel
                        className="color-gradient-tabs"
                        activeClass="active-tab"
                        tabs={ availableTabs }
                    >
                        { ( tab ) => (
                            <>
                                { tab.name === 'color' && (
                                    <ColorPalette
                                        colors={ COLORS }
                                        value={ defaultValue }
                                        onChange={ ( color ) => handleChange(color) }
                                        enableAlpha={ true }
                                        asButtons={ true }
                                    /> 
                                ) }
                                { tab.name === 'gradient' && (
                                    <GradientPicker
                                        value={ defaultValue }
                                        onChange={ ( newGradient ) => handleChange(newGradient) }
                                        gradients={ GRADIENTS }
                                    />
                                ) }
                            </>
                        ) }
                    </TabPanel>
                </Popover>
            ) }
        </div> 
    );
}
