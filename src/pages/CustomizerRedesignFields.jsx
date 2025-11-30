import { __ } from "@wordpress/i18n";
import { useMain } from '../contexts/MainContext';
import withForm from '../pages/withForm';
import FontControl from "../components/FontControl/FontControl";
import ColorPickerControl from '../components/ColorPickerControl/ColorPickerControl';
import BoxShadowControl from '../components/BoxShadowControl/BoxShadowControl';
import { 
    __experimentalUnitControl as UnitControl, 
    BoxControl,
    SelectControl,
    BorderBoxControl,
    __experimentalInputControl as InputControl,
    Panel, 
    PanelBody, 
    PanelRow,
    ToggleControl
} from '@wordpress/components';
import { UNITS, COLORS, DEFAULT_BORDER, FONT_SIZES } from '../lib/Constants';
const CustomizerRedesignFields = ({handleChange}) => {
    const {
        settingData,
        settingLoading
    } = useMain();
    return (
        <>
            {/* {console.log(settingData?.customizer?.redesign?.logo)} */}
            <div className="setting-unit border-bottom py-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Width", "plugin-starter")}</h4>
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
                            <UnitControl 
                                __next40pxDefaultSize 
                                onChange={(value) => handleChange('customizer.redesign.fields.width', value)}
                                value={settingData?.customizer?.redesign?.fields?.width}
                                units={UNITS}
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
                            : <h4>{__("Height", "plugin-starter")}</h4>
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
                            <UnitControl 
                                __next40pxDefaultSize 
                                onChange={(value) => handleChange('customizer.redesign.fields.height', value)}
                                value={settingData?.customizer?.redesign?.fields?.height}
                                units={UNITS}
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
                            : <h4>{__("Font", "plugin-starter")}</h4>
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
                            <FontControl 
                                defaultValues={settingData?.customizer?.redesign?.fields?.font}
                                name='customizer.redesign.fields.font' 
                                handleChange={handleChange}
                                options = {["color", "font-size", "font-weight", "font-style", "font-variant", "font-stretch", "text-align", "text-decoration", "text-transform" ]}
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
                            : <h4>{__("Border", "plugin-starter")}</h4>
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
                                label={ __( 'Borders', 'plugin-starter' ) }
                                __next40pxDefaultSize
                                colors={ COLORS }
                                value={ settingData?.customizer?.redesign?.fields?.border }
                                onChange={(value) => handleChange('customizer.redesign.fields.border', value)}
                                
                            />
                            <UnitControl 
                                label={ __( 'Radius', 'plugin-starter' ) }
                                __next40pxDefaultSize 
                                onChange={(value) => handleChange('customizer.redesign.fields.border_radius', value)}
                                value={ settingData?.customizer?.redesign?.fields?.border_radius }
                                units={UNITS}
                                min="0"
                                style={{marginTop: '10px'}}
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
                            : <h4>{__("Padding", "plugin-starter")}</h4>
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
                                values={settingData?.customizer?.redesign?.fields?.padding}
                                onChange={ (value) => handleChange('customizer.redesign.fields.padding', value) }
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
                            : <h4>{__("Margin", "plugin-starter")}</h4>
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
                                values={settingData?.customizer?.redesign?.fields?.margin}
                                onChange={ (value) => handleChange('customizer.redesign.fields.margin', value) }
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
                            : <h4>{__("Background Color", "plugin-starter")}</h4>
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
                            <ColorPickerControl
                                defaultValue={settingData?.customizer?.redesign?.fields?.background_color}
                                handleChange={(value) => handleChange('customizer.redesign.fields.background_color', value)}
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
                            : <h4>{__("Box Shadow", "plugin-starter")}</h4>
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
                            <BoxShadowControl
                                value={settingData?.customizer?.redesign?.fields?.boxshadow}
                                onChange={(value) => handleChange('customizer.redesign.fields.boxshadow"', value)}
                                // className="border-start border-end border-bottom"
                            />                        
                        </div>
                    }
                </div>
            </div>
            <div className="setting-unit pt-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Label", "plugin-starter")}</h4>
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
                            <FontControl 
                                defaultValues={settingData?.customizer?.redesign?.fields?.label_font}
                                name='customizer.redesign.fields.label_font' 
                                handleChange={handleChange}
                                options = {["color", "font-size", "font-weight", "font-style", "font-variant", "font-stretch", "text-align", "text-decoration", "text-transform" ]}
                            />  
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
export default withForm(CustomizerRedesignFields, 'customizer.redesign.fields');