import { __ } from "@wordpress/i18n";
import FontControl from '../components/FontControl/FontControl';
import LinkColor from '../components/LinkColor/LinkColor';
import BoxShadowControl from '../components/BoxShadowControl/BoxShadowControl';
import TextShadowControl from '../components/TextShadowControl/TextShadowControl';
import { useMain } from '../contexts/MainContext';
import withForm from '../pages/withForm';
import { UNITS, COLORS } from '../lib/Constants';
import { 
    BorderBoxControl,
    BoxControl,
    SelectControl,
    __experimentalUnitControl as UnitControl, 
} from '@wordpress/components';
const CustomizerRedesignButton = ({handleChange}) => {
    const {
        settingData,
        settingLoading
    } = useMain();
    return (
        <>
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
                                defaultValues={settingData?.customizer?.redesign?.button?.font}
                                name='customizer.redesign.button.font' 
                                handleChange={handleChange}
                                options = {["font-size", "font-weight", "font-style", "font-variant", "font-stretch", "text-align", "text-decoration", "text-transform" ]}
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
                            : <h4>{__("Background", "plugin-starter")}</h4>
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
                            <LinkColor
                                name='customizer.redesign.button.background'
                                options={['normal', 'hover', 'active']}
                                defaultValues={settingData?.customizer?.redesign?.button?.background}
                                handleChange={handleChange}
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
                            : <h4>{__("Text", "plugin-starter")}</h4>
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
                            <LinkColor
                                name='customizer.redesign.button.color'
                                options={['normal', 'hover', 'active']}
                                defaultValues={settingData?.customizer?.redesign?.button?.color}
                                handleChange={handleChange}
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
                                label={__("", "plugin-starter")}
                                values={ settingData?.customizer?.redesign?.button?.padding }
                                onChange={ (value) => handleChange('customizer.redesign.button.padding', value) }
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
                                values={ settingData?.customizer?.redesign?.button?.margin }
                                onChange={ (value) => handleChange('customizer.redesign.button.margin', value) }
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
                                value={ settingData?.customizer?.redesign?.button?.border }
                                onChange={(value) => handleChange('customizer.redesign.button.border', value)}
                                
                            />
                            <UnitControl 
                                label={ __( 'Radius', 'plugin-starter' ) }
                                __next40pxDefaultSize 
                                onChange={(value) => handleChange('customizer.redesign.button.border_radius', value)}
                                value={ settingData?.customizer?.redesign?.button?.border_radius }
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
                                value={settingData?.customizer?.redesign?.button?.boxshadow}
                                onChange={(value) => handleChange('customizer.redesign.button.boxshadow', value)}
                                // className="border-start border-end border-bottom"
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
                            : <h4>{__("Text Shadow", "plugin-starter")}</h4>
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
                                <TextShadowControl
                                    value={settingData?.customizer?.redesign?.button?.textshadow}
                                    onChange={(textShadow) => handleChange("customizer.redesign.button.textshadow",textShadow)}
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
                            : <h4>{__("Button Size", "plugin-starter")}</h4>
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
                            <SelectControl
                                // label="Size"
                                value={settingData?.customizer?.redesign?.button?.size}
                                options={ [
                                    { label: __('Auto','plugin-starter'), value: 'auto' },
                                    { label: __('Full Width','plugin-starter'), value: 'full' },
                                ] }
                                onChange={ ( newValue ) => handleChange('customizer.redesign.button.size', newValue ) }
                                __next40pxDefaultSize
                                __nextHasNoMarginBottom
                            />                       
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
export default withForm(CustomizerRedesignButton, 'customizer.redesign.button');