import { __ } from "@wordpress/i18n";
import { useOutletContext } from 'react-router-dom';
import {Row, Col, Form } from 'react-bootstrap';
import MultiSelect from "../../components/MultiSelect/MultiSelect";
import MediaUploader from "../../components/MediaUploader/MediaUploader";

const OPTIONS = [
    {'value':'option-1', 'label':'Option 1'}, 
    {'value':'option-2', 'label':'Option 2'},
    {'value':'option-3', 'label':'Option 3'},
    {'value':'option-4', 'label':'Option 4'},
    {'value':'option-5', 'label':'Option 5'},
    {'value':'option-6', 'label':'Option 6'},
    {'value':'option-7', 'label':'Option 7'},
    {'value':'option-8', 'label':'Option 8'},
];
const ComplexInputs = () => {
   const { settings, settingsLoading, handleChange } = useOutletContext();
    return (
        <>
            {console.log('settings', settings)}
            <div className="setting-unit py-4">
                <Row>
                    <Col lg={6}>                        
                            <h4 className="h4">{__("Multi Select", "plugin-starter")}</h4>
                            <p>{__("Lorem", "plugin-starter")}</p>                        
                    </Col>
                    {
                        !settingsLoading &&
                        <Col lg={6}>                            
                            <MultiSelect
                                name="complex_inputs.multiselect"
                                options={OPTIONS}
                                defaultValues={settings?.complex_inputs?.multiselect?.map(p => p.value) || []}
                                onChange={(optioned) => {
                                    // Filter the local OPTIONS array based on selected values
                                    const optionedProducts = OPTIONS.filter(opt => optioned.includes(opt.value));
                                    handleChange('complex_inputs.multiselect', optionedProducts);
                                }}
                                placeholder="Select multiselect"
                            />
                        </Col>
                    }
                </Row>
            </div>     
            <div className="setting-unit py-4">
                <Row>
                    <Col lg={6}>                        
                            <h4 className="h4">{__("Multi Select", "plugin-starter")}</h4>
                            <p>{__("Lorem", "plugin-starter")}</p>                        
                    </Col>
                    {
                        !settingsLoading &&
                        <Col lg={6}>                            
                            <MediaUploader
                                name="complex_inputs.media"
                                data={settings?.complex_inputs?.media}
                                onChange={(name, value) => handleChange(name, value)}
                            />
                        </Col>
                    }
                </Row>
            </div>              
        </>
    );
};

export default ComplexInputs;