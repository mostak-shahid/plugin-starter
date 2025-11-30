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
import { UNITS, COLORS, DEFAULT_BORDER, FONT_SIZES } from '../lib/Constants';
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
const ComponentsAdvancedWordpress = ({handleChange}) => {
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
                            : <h4>{__("AlignmentMatrixControl", "plugin-starter")}</h4>
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
                            <AlignmentMatrixControl
                                value={ alignment }
                                onChange={ setAlignment }
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
                            : <h4>{__("AnglePickerControl", "plugin-starter")}</h4>
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
                            <AnglePickerControl
                                value={ angle }
                                onChange={ setAngle }
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
                            : <h4>{__("BorderBoxControl", "plugin-starter")}</h4>
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
                            <BorderBoxControl
                                __next40pxDefaultSize
                                colors={ colors }
                                label={ __( 'Borders' ) }
                                onChange={ onBorderChange }
                                value={ borders }
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
                            : <h4>{__("BorderControl", "plugin-starter")}</h4>
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
                            <BorderControl
                                __next40pxDefaultSize
                                colors={ colors }
                                label={ __( 'Border' ) }
                                onChange={ setBorder }
                                value={ border }
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
                            : <h4>{__("BoxControl", "plugin-starter")}</h4>
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
                            <BoxControl
                                __next40pxDefaultSize
                                values={ values }
                                onChange={ setValues }
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
                            : <h4>{__("DatePicker", "plugin-starter")}</h4>
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
                            <DatePicker currentDate={ selectedDate } onChange={ setSelectedDate } />
                            <hr/>
                            <DateTimePicker
                                currentDate={ selectedDate }
                                onChange={ setSelectedDate }
                                is12Hour={ true }
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
                            : <h4>{__("ColorIndicator", "plugin-starter")}</h4>
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
                            <ColorIndicator colorValue={color} />                  
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
                            : <h4>{__("ColorPalette", "plugin-starter")}</h4>
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
                            <ColorPalette
                                colors={ colors }
                                value={ color }
                                onChange={ ( color ) => setColor( color ) }
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
                            : <h4>{__("ColorPicker", "plugin-starter")}</h4>
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
                            <ColorPicker
                                color={color}
                                onChange={setColor}
                                enableAlpha
                                defaultValue="#000"
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
                            : <h4>{__("GradientPicker", "plugin-starter")}</h4>
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
                            <GradientPicker
                                value={ gradient }
                                onChange={ ( currentGradient ) => setGradient( currentGradient ) }
                                gradients={ [
                                    {
                                    name: 'JShine',
                                    gradient:
                                        'linear-gradient(135deg,#12c2e9 0%,#c471ed 50%,#f64f59 100%)',
                                    slug: 'jshine',
                                    },
                                    {
                                    name: 'Moonlit Asteroid',
                                    gradient:
                                        'linear-gradient(135deg,#0F2027 0%, #203A43 0%, #2c5364 100%)',
                                    slug: 'moonlit-asteroid',
                                    },
                                    {
                                    name: 'Rastafarie',
                                    gradient:
                                        'linear-gradient(135deg,#1E9600 0%, #FFF200 0%, #FF0000 100%)',
                                    slug: 'rastafari',
                                    },
                                ] }
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
                            : <h4>{__("GradientPicker", "plugin-starter")}</h4>
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
                            <MenuGroup label="Settings">
                                <MenuItem>Setting 1</MenuItem>
                                <MenuItem>Setting 2</MenuItem>
                            </MenuGroup>   
                            <hr/>
                            <FontSizePicker
                                __next40pxDefaultSize
                                fontSizes={ fontSizes }
                                value={ fontSize }
                                fallbackFontSize={ fallbackFontSize }
                                onChange={ ( newFontSize ) => {
                                    setFontSize( newFontSize );
                                } }
                            />     
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
export default withForm(ComponentsAdvancedWordpress);