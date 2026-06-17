import { __ } from "@wordpress/i18n";
import { useOutletContext } from 'react-router-dom';
import {Row, Col, Form, FloatingLabel, InputGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
const BasicInputs = () => {
   const { settings, settingsDetails, settingsLoading, handleChange } = useOutletContext();

    return (
        <>
            <div className="setting-unit py-4">
                    <Row>
                        <Col lg={6}>                        
                            {
                                settingsLoading 
                                ? 
                                <>
                                    <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                </>
                                : 
                                <>
                                    {settingsDetails?.inputs?.basic_inputs?.text?.title && 
                                        <h6 className="h6">
                                            {settingsDetails?.inputs?.basic_inputs?.text?.title}
                                            {settingsDetails?.inputs?.basic_inputs?.text?.hint &&
                                                <OverlayTrigger overlay={<Tooltip>{settingsDetails.inputs.basic_inputs.text.hint}</Tooltip>}>
                                                    <FontAwesomeIcon icon={faQuestionCircle}/>
                                                </OverlayTrigger>                                            
                                            }
                                        </h6>
                                    }
                                    {settingsDetails?.inputs?.basic_inputs?.text?.intro && 
                                        <p>{settingsDetails?.inputs?.basic_inputs?.text?.intro}</p> 
                                    }
                                </>
                            }               
                        </Col>

                        <Col lg={6}>
                        {
                            !settingsLoading &&

                            <Form.Group>
                                {settingsDetails?.inputs?.basic_inputs?.text?.before &&  
                                    <Form.Label htmlFor="inputs-basic-inputs-text">{settingsDetails.inputs.basic_inputs.text.before}</Form.Label>
                                }
                                <Form.Control 
                                    id="inputs-basic-inputs-text"
                                    type="text"                                     
                                    value={settings?.inputs?.basic_inputs?.text || ''}
                                    onChange={(e) => handleChange('inputs.basic_inputs.text', e.target.value)}
                                />
                                {settingsDetails?.inputs?.basic_inputs?.text?.after &&                                
                                    <Form.Text className="text-muted">{settingsDetails.inputs.basic_inputs.text.after}</Form.Text>
                                }
                            </Form.Group>
                        }
                        </Col>

                    </Row>
                
            </div>
            <div className="setting-unit py-4">
                <Row>
                    <Col lg={6}>
                        
                            <h6 className="h6">{__("Textarea", "plugin-starter")}</h6>
                            <p>{__("Lorem", "plugin-starter")}</p>
                        
                    </Col>
                    {
                        !settingsLoading &&
                        <Col lg={6}>                            
                            <Form.Group>
                                <Form.Control 
                                    as="textarea" 
                                    rows={3} 
                                    value={settings?.inputs?.basic_inputs?.textarea || ''}
                                    onChange={(e) => handleChange('inputs.basic_inputs.textarea', e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    }
                </Row>
            </div>
            <div className="setting-unit py-4">
                <Row>
                    <Col lg={6}>
                        
                            <h6 className="h6">{__("Radio", "plugin-starter")}</h6>
                            <p>{__("Lorem", "plugin-starter")}</p>
                        
                    </Col>
                    {
                        !settingsLoading &&
                        <Col lg={6}>                            
                            <Form.Group>           
                                {[1,2,3,4,5,6,7,8].map((n) => (
                                    <Form.Check
                                        inline
                                        name="basic-radio"
                                        type='radio'
                                        id={`radio-${n}`}
                                        label={`radio-${n}`}
                                        value={`radio-${n}`}
                                        onChange={(e) => handleChange('inputs.basic_inputs.radio', e.target.value)}
                                        checked={`radio-${n}` == settings?.inputs?.basic_inputs?.radio ? true : false}
                                    />
                                ))}
                            </Form.Group>
                        </Col>
                    }
                </Row>
            </div>
            <div className="setting-unit py-4">
                <Row>
                    <Col lg={6}>                        
                        <h6 className="h6">{__("Select", "plugin-starter")}</h6>
                        <p>{__("Lorem", "plugin-starter")}</p>                        
                    </Col>
                    {
                        !settingsLoading &&
                        <Col lg={6}>
                            <Form.Group>              
                                <Form.Select 
                                    aria-label="Default select example"
                                    value={settings?.inputs?.basic_inputs?.select || ''}
                                    onChange={(e) => handleChange('inputs.basic_inputs.select', e.target.value)}
                                >
                                    <option value="">Open this select menu</option>
                                    {
                                        [
                                            {'value':'select-1', 'label':'Select 1'}, 
                                            {'value':'select-2', 'label':'Select 2'},
                                            {'value':'select-3', 'label':'Select 3'},
                                            {'value':'select-4', 'label':'Select 4'},
                                            {'value':'select-5', 'label':'Select 5'},
                                            {'value':'select-6', 'label':'Select 6'},
                                            {'value':'select-7', 'label':'Select 7'},
                                            {'value':'select-8', 'label':'Select 8'},
                                        ].map(({value, label}) => (
                                        <option 
                                            value={value}
                                        >
                                            {label}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    }
                </Row>
            </div>
            <div className="setting-unit py-4">
                <Row>
                    <Col lg={6}>
                        
                            <h6 className="h6">{__("Input Group + Number", "plugin-starter")}</h6>
                            <p>{__("Lorem", "plugin-starter")}</p>
                        
                    </Col>
                    {
                        !settingsLoading &&
                        <Col lg={6}>
                            <Form.Group>                                      
                                <InputGroup>
                                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                    <Form.Control
                                        type="number"
                                        placeholder="Number"
                                        aria-label="Number"
                                        aria-describedby="basic-addon1"
                                        value={settings?.inputs?.basic_inputs?.number || ''}
                                        onChange={(e) => handleChange('inputs.basic_inputs.number', e.target.value)}
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Col>
                    }
                </Row>
            </div>
            <div className="setting-unit py-4">
                <Row>
                    <Col lg={6}>
                        
                            <h6 className="h6">{__("Range", "plugin-starter")}</h6>
                            <p>{__("Lorem", "plugin-starter")}</p>
                        
                    </Col>
                    {
                        !settingsLoading &&
                        <Col lg={6}>
                            <Form.Group>  
                                <Form.Range
                                    value={settings?.inputs?.basic_inputs?.number || ''}
                                    onChange={(e) => handleChange('inputs.basic_inputs.number', e.target.value)}                                
                                />                    
                            </Form.Group>
                        </Col>
                    }
                </Row>
            </div>
            <div className="setting-unit py-4">
                <Row>
                    <Col lg={6}>
                        
                            <h6 className="h6">{__("Color", "plugin-starter")}</h6>
                            <p>{__("Lorem", "plugin-starter")}</p>
                        
                    </Col>
                    {
                        !settingsLoading &&
                        <Col lg={6}>
                            <Form.Group>                                      
                                <Form.Control
                                    type="color"
                                    value={settings?.inputs?.basic_inputs?.color || ''}
                                    onChange={(e) => handleChange('inputs.basic_inputs.color', e.target.value)}
                                    title="Choose your color"
                                />
                            </Form.Group>
                        </Col>
                    }
                </Row>
            </div>
            <div className="setting-unit py-4">
                <Row>
                    <Col lg={6}>
                        
                            <h6 className="h6">{__("Checkbox", "plugin-starter")}</h6>
                            <p>{__("Lorem", "plugin-starter")}</p>
                        
                    </Col>
                    {
                        !settingsLoading &&
                        <Col lg={6}>
                            <Form.Group>
                                <Form.Check 
                                    id="checkbox-1"
                                    type="checkbox" 
                                    label="Check me out" 
                                    onChange={(e) => handleChange('inputs.basic_inputs.checkbox', e.target.checked)}
                                    checked={settings?.inputs?.basic_inputs?.checkbox ? true : false}

                                />
                            </Form.Group>  
                        </Col>
                    }
                </Row>
            </div> 
            <div className="setting-unit py-4">
                <Row>
                    <Col lg={6}>
                        
                            <h6 className="h6">{__("Switch", "plugin-starter")}</h6>
                            <p>{__("Lorem", "plugin-starter")}</p>
                        
                    </Col>
                    {
                        !settingsLoading &&
                        <Col lg={6}>
                            <Form.Group>
                                <Form.Check 
                                    id="switch-1"
                                    type="switch" 
                                    label="Check me out" 
                                    onChange={(e) => handleChange('inputs.basic_inputs.switch', e.target.checked)}
                                    checked={settings?.inputs?.basic_inputs?.switch ? true : false}

                                />
                            </Form.Group>  
                        </Col>
                    }
                </Row>
            </div> 
            <div className="setting-unit py-4">
                <Row>
                    <Col lg={6}>
                        
                            <h6 className="h6">{__("Date", "plugin-starter")}</h6>
                            <p>{__("Lorem", "plugin-starter")}</p>
                        
                    </Col>
                    {
                        !settingsLoading &&
                        <Col lg={6}>
                            <Form.Group>
                                <Form.Control 
                                    type="date"                                     
                                    value={settings?.inputs?.basic_inputs?.date || ''}
                                    onChange={(e) => handleChange('inputs.basic_inputs.date', e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    }
                </Row>
            </div>
            <div className="setting-unit py-4">
                <Row>
                    <Col lg={6}>
                        
                            <h6 className="h6">{__("Time", "plugin-starter")}</h6>
                            <p>{__("Lorem", "plugin-starter")}</p>
                        
                    </Col>
                    {
                        !settingsLoading &&
                        <Col lg={6}>
                            <Form.Group>
                                <Form.Control 
                                    type="time"                                     
                                    value={settings?.inputs?.basic_inputs?.time || ''}
                                    onChange={(e) => handleChange('inputs.basic_inputs.time', e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    }
                </Row>
            </div>
            <div className="setting-unit py-4">
                <Row>
                    <Col lg={6}>
                        
                            <h6 className="h6">{__("Datetime", "plugin-starter")}</h6>
                            <p>{__("Lorem", "plugin-starter")}</p>
                        
                    </Col>
                    {
                        !settingsLoading &&
                        <Col lg={6}>
                            <Form.Group>
                                <Form.Control 
                                    type="datetime-local"                                     
                                    value={settings?.inputs?.basic_inputs?.datetime || ''}
                                    onChange={(e) => handleChange('inputs.basic_inputs.datetime', e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    }
                </Row>
            </div>                   
        </>
    );
};

export default BasicInputs;