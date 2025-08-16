import { __ } from '@wordpress/i18n';
import { useEffect, useState } from 'react';
import MediaUploader from '../MediaUploader/MediaUploader'
const Background = ({defaultValues, options = [], name = "checkbox-group", type = '', handleChange, hasMedia='0'}) => {
    // Initialize selected values with defaultValues
    const [background, setBackground] = useState([]);
    useEffect(() => {
        setBackground(defaultValues);
    }, [defaultValues]); // Include all dependencies
    return (
        <>
            <div className="background-wrapper">
                {console.log(options)}
                {
                    options.map((option, index) => (
                        option == 'color' ? 
                            <input 
                                className="form-control"
                                type="color"
                                // value={settingData?.base_input?.color_input}
                                // onChange={(e) => handleChange('base_input.color_input', e.target.value)}
                            />
                        : option == 'position' ? 
                        <div className="unit position-unit">
                                <label class="form-label">{__("Background position", "plugin-starter")}</label>
                                <select 
                                    className="form-select"
                                    // value={settingData?.elements?.basic?.select_field} 
                                    // onChange={(e) => handleChange('elements.basic.select_field', e.target.value)}
                                >
                                    <option value="">{`Select ${option}`}</option>
                                    <option value="left top">left top</option>
                                    <option value="left center">left center</option>
                                    <option value="left bottom">left bottom</option>
                                    <option value="right top">right top</option>
                                    <option value="right center">right center</option>
                                    <option value="right bottom">right bottom</option>
                                    <option value="center top">center top</option>
                                    <option value="center center">center center</option>
                                    <option value="center bottom">center bottom</option>
                                </select> 
                            </div>
                        : option == 'size' ? 
                        <div className="unit size-unit">
                                <label class="form-label">{__("Backgroundx size", "plugin-starter")}</label>
                                <select 
                                    className="form-select"
                                    // value={settingData?.elements?.basic?.select_field} 
                                    // onChange={(e) => handleChange('elements.basic.select_field', e.target.value)}
                                >
                                    <option value="">{`Select ${option}`}</option>
                                    <option value="auto">auto</option>
                                    <option value="cover">cover</option>
                                    <option value="contain">contain</option>
                                    <option value="initial">initial</option>
                                    <option value="inherit">inherit</option>
                                </select> 
                            </div>
                        : option == 'repeat' ? 
                        <div className="unit repeat-unit">
                                <label class="form-label">{__("Background repeat", "plugin-starter")}</label>
                                <select 
                                    className="form-select"
                                    // value={settingData?.elements?.basic?.select_field} 
                                    // onChange={(e) => handleChange('elements.basic.select_field', e.target.value)}
                                >
                                    <option value="">{`Select ${option}`}</option>
                                    <option value="repeat">repeat</option>
                                    <option value="repeat-x">repeat-x</option>
                                    <option value="repeat-y">repeat-y</option>
                                    <option value="no-repeat">no-repeat</option>
                                    <option value="initial">initial</option>
                                    <option value="inherit">inherit</option>
                                </select> 
                            </div>
                        : option == 'origin' ? 
                        <div className="unit origin-unit">
                                <label class="form-label">{__("Background origin", "plugin-starter")}</label>
                                <select 
                                    className="form-select"
                                    // value={settingData?.elements?.basic?.select_field} 
                                    // onChange={(e) => handleChange('elements.basic.select_field', e.target.value)}
                                >
                                    <option value="">{`Select ${option}`}</option>
                                    <option value="padding-box">padding-box</option>
                                    <option value="border-box">border-box</option>
                                    <option value="content-box">content-box</option>
                                    <option value="initial">initial</option>
                                    <option value="inherit">inherit</option>
                                </select> 
                            </div>
                        : option == 'clip' ? 
                        <div className="unit clip-unit">
                                <label class="form-label">{__("Background clip", "plugin-starter")}</label>
                                <select 
                                    className="form-select"
                                    // value={settingData?.elements?.basic?.select_field} 
                                    // onChange={(e) => handleChange('elements.basic.select_field', e.target.value)}
                                >
                                    <option value="">{`Select ${option}`}</option>
                                    <option value="padding-box">padding-box</option>
                                    <option value="border-box">border-box</option>
                                    <option value="content-box">content-box</option>
                                    <option value="initial">initial</option>
                                    <option value="inherit">inherit</option>
                                </select> 
                            </div>
                        : option == 'attachment' ? 
                        <div className="unit attachment-unit">
                                <label class="form-label">{__("Background attachment", "plugin-starter")}</label>
                                <select 
                                    className="form-select"
                                    // value={settingData?.elements?.basic?.select_field} 
                                    // onChange={(e) => handleChange('elements.basic.select_field', e.target.value)}
                                >
                                    <option value="">{`Select ${option}`}</option>
                                    <option value="scroll">scroll</option>
                                    <option value="fixed">fixed</option>
                                    <option value="local">local</option>
                                    <option value="initial">initial</option>
                                    <option value="inherit">inherit</option>
                                </select> 
                            </div>
                        : option == 'image' ? 
                            <MediaUploader 
                                // data={settingData?.components?.advanced?.media_uploader} 
                                // name='components.advanced.media_uploader' 
                                handleChange={handleChange}
                                options = {{
                                    frame:{
                                        title: __("Select or Upload Image", "plugin-starter"),
                                    },
                                    library: {type: 'image'},
                                    buttons: {
                                        upload: __("Upload Image", "plugin-starter"),
                                        remove: __("Remove", "plugin-starter"),
                                        select: __("Use this image", "plugin-starter")                                            
                                    }
                                }}
                            />
                        :''
                    ))
                }  
            </div>
        </>
    );    
}
export default Background;