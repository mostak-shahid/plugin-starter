// import '@coreui/icons/css/all.css';
// import '@wordpress/components/build-style/style.css';
import { __ } from "@wordpress/i18n";
import React, {useState} from 'react';
import { useMain } from '../contexts/MainContext';
import withForm from '../pages/withForm';
import { 
    AlignmentMatrixControl, 
    AnglePickerControl, 
    BorderBoxControl, 
    BorderControl, 
    BoxControl, 
    DatePicker, 
    DateTimePicker, 
    ColorIndicator, 
    ColorPalette, 
    ColorPicker, 
    GradientPicker, 
    MenuGroup, 
    MenuItem,
    FontSizePicker,
    __experimentalNavigation as Navigation,
    __experimentalNavigationGroup as NavigationGroup,
    __experimentalNavigationItem as NavigationItem,
    __experimentalNavigationMenu as NavigationMenu,
} from '@wordpress/components';
import ColorPickerControl from '../components/ColorPickerControl/ColorPickerControl';

const colors = [
    { name: 'Blue 20', color: '#72aee6' },
    { name: 'Pink Flare', color: '#E1C0C8' },
    { name: 'Carissma', color: '#EA88A8' },
    { name: 'Ash', color: '#A09998' },
];
const fontSizes = [
    {
        name: __( 'Small' ),
        slug: 'small',
        size: 12,
    },
    {
        name: __( 'Big' ),
        slug: 'big',
        size: 26,
    },
];
const fallbackFontSize = 16;
const ComponentsAdvancedCustom = ({handleChange}) => {
    const {
        settingData,
        settingLoading
    } = useMain();
    const [ alignment, setAlignment ] = useState( 'center center' );
    const [ angle, setAngle ] = useState( 0 );
        const defaultBorder = {
        color: '#72aee6',
        style: 'dashed',
        width: '1px',
    };
    const [ borders, setBorders ] = useState( {
        top: defaultBorder,
        right: defaultBorder,
        bottom: defaultBorder,
        left: defaultBorder,
    } );
    const onBorderChange = ( newBorders ) => setBorders( newBorders );
    const [ border, setBorder ] = useState();
    const [ values, setValues ] = useState( {
        top: '50px',
        left: '10%',
        right: '10%',
        bottom: '50px',
    } );
    const [ selectedDate, setSelectedDate ] = useState(new Date());
    const [ color, setColor ] = useState ( '#72aee6' );
    const [ gradient, setGradient ] = useState( null );
    const [ fontSize, setFontSize ] = useState( 12 );
    return (
        <>
            <div className="setting-unit border-bottom py-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Color Picker", "plugin-starter")}</h4>
                        }
                        {
                            settingLoading 
                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                        }
                    </div>    
                    {
                        !settingLoading &&                               
                        <div className="col-lg-5">
                            <ColorPickerControl
                                defaultValue={settingData?.components?.advanced?.custom?.color_picker}
                                handleChange={(value) => handleChange('components.advanced.custom.color_picker', value)}
                                mode='color'
                            />                          
                        </div>
                    }
                </div>
            </div>
            <div className="setting-unit border-bottom py-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Gradient Picker", "plugin-starter")}</h4>
                        }
                        {
                            settingLoading 
                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                        }
                    </div>    
                    {
                        !settingLoading &&                               
                        <div className="col-lg-5">
                            <ColorPickerControl
                                defaultValue={settingData?.components?.advanced?.custom?.gradient_picker}
                                handleChange={(value) => handleChange('components.advanced.custom.gradient_picker', value)}
                                mode='gradient'
                            />                          
                        </div>
                    }
                </div>
            </div>
            <div className="setting-unit border-bottom py-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Color & Gradient Picker", "plugin-starter")}</h4>
                        }
                        {
                            settingLoading 
                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                        }
                    </div>    
                    {
                        !settingLoading &&                               
                        <div className="col-lg-5">
                            <ColorPickerControl
                                defaultValue={settingData?.components?.advanced?.custom?.color_gradient_picker}
                                handleChange={(value) => handleChange('components.advanced.custom.color_gradient_picker', value)}
                                mode='both'
                            />                          
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
export default withForm(ComponentsAdvancedCustom);