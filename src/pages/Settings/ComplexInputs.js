import { __ } from "@wordpress/i18n";
import { useOutletContext } from 'react-router-dom';
import {Row, Col, Form } from 'react-bootstrap';
import MultiSelect from "../../components/MultiSelect/MultiSelect";
import MediaUploader from "../../components/MediaUploader/MediaUploader";
import RepeatableField from "../../components/RepeatableField/RepeatableField";
import SortableAccordion from "../../components/SortableAccordion/SortableAccordion";

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
                            <h6 className="h6">{__("Multi Select", "plugin-starter")}</h6>
                            <p>{__("Lorem", "plugin-starter")}</p>                        
                    </Col>
                    {
                        !settingsLoading &&
                        <Col lg={6}>                            
                            <MultiSelect
                                name="inputs.complex_inputs.multiselect"
                                options={OPTIONS}
                                defaultValues={settings?.inputs?.complex_inputs?.multiselect?.map(p => p.value) || []}
                                onChange={(optioned) => {
                                    // Filter the local OPTIONS array based on selected values
                                    const optionedItems = OPTIONS.filter(opt => optioned.includes(opt.value));
                                    handleChange('inputs.complex_inputs.multiselect', optionedItems);
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
                            <h6 className="h6">{__("MediaUploader", "plugin-starter")}</h6>
                            <p>{__("Lorem", "plugin-starter")}</p>                        
                    </Col>
                    {
                        !settingsLoading &&
                        <Col lg={6}>                            
                            <MediaUploader
                                name="inputs.complex_inputs.media"
                                defaultValues={settings?.inputs?.complex_inputs?.media}
                                onChange={(value) => {
                                    // console.log(value);
                                    handleChange('inputs.complex_inputs.media', value);
                                }}
                            />
                        </Col>
                    }
                </Row>
            </div> 
            <div className="setting-unit py-4">
                <Row>
                    <Col lg={6}>                        
                            <h6 className="h6">{__("RepeatableField", "plugin-starter")}</h6>
                            <p>{__("Lorem", "plugin-starter")}</p>                        
                    </Col>
                    {
                        !settingsLoading &&
                        <Col lg={6}>                            
                            <RepeatableField
                                name="inputs.complex_inputs.repeater"
                                defaultValues={settings?.inputs?.complex_inputs?.repeater}
                                onChange={(value) => {
                                    // console.log(value);
                                    handleChange('inputs.complex_inputs.repeater', value);
                                }}
                            />
                        </Col>
                    }
                </Row>
            </div> 
            <div className="setting-unit py-4">
                <Row>
                    <Col lg={6}>                        
                            <h6 className="h6">{__("SortableAccordion", "plugin-starter")}</h6>
                            <p>{__("Lorem", "plugin-starter")}</p>                        
                    </Col>
                    {
                        !settingsLoading &&
                        <Col lg={6}>                            
                            <SortableAccordion
                                name='elements.advanced.addresses'
                                options={{
                                    addButton: 'Add New Field',
                                    titlePrefix: 'Address',
                                    enabler: true,
                                }}
                                fields={[
                                    { type: "input", name: "title", placeholder: "Address 1", className: "input-field", label: "Address 1" },
                                    { type: "textarea", name: "note", placeholder: "Note", className: "textarea-field", label: "Note" },
                                    { type: "checkbox", name: "enable", placeholder: "Enable", className: "checkbox-field", label: "Enable" },
                                    { type: "radio", name: "gender", className: "radio-field",  label: "Gender", options: [{ key: "male", value: "Male" }, { key: "female", value: "Female" }] },
                                    { type: "select", name: "country", className: "select-field", options: [{ key: "us", value: "United States" }, { key: "ca", value: "Canada" }] },
                                    { type: "multi-select", name: "languages", className: "multi-select-field", options: [{ key: "en", value: "English" }, { key: "fr", value: "French" }] },
                                    { type: "checkbox-group", name: "hobbies", className: "checkbox-group-field", options: [{ key: "reading", value: "Reading" }, { key: "sports", value: "Sports" }] }
                                ]} 
                                defaultValues={settings?.inputs?.complex_inputs?.sortableaccordion}
                                onChange={(value) => {
                                    // console.log(value);
                                    handleChange('inputs.complex_inputs.sortableaccordion', value);
                                }}
                            />
                        </Col>
                    }
                </Row>
            </div>              
        </>
    );
};

export default ComplexInputs;