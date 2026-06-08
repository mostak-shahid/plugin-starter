import { __ } from "@wordpress/i18n";
import { useOutletContext } from 'react-router-dom';
import {Row, Col, Form, FloatingLabel, InputGroup } from 'react-bootstrap';
const BasicInputs = () => {
   const { settings, settingsLoading, handleChange } = useOutletContext();

    return (
        <>
            <div className="setting-unit py-4">
                <Row>
                    <Col lg={6}>
                        
                            <h4 className="h4">{__("Text Input", "plugin-starter")}</h4>
                            <p>{__("Lorem", "plugin-starter")}</p>
                        
                    </Col>
                    {
                        !settingsLoading &&
                        <Col lg={6}>
                            <Form.Group>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                    type="text"                                     
                                    value={settings?.inputs?.basic_inputs?.text || ''}
                                    onChange={(e) => handleChange('inputs.basic_inputs.text', e.target.value)}
                                />
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                        </Col>
                    }
                </Row>
            </div>
            <div className="setting-unit py-4">
                <Row>
                    <Col lg={6}>
                        
                            <h4 className="h4">{__("Textarea", "plugin-starter")}</h4>
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
                        
                            <h4 className="h4">{__("Radio", "plugin-starter")}</h4>
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
                        <h4 className="h4">{__("Select", "plugin-starter")}</h4>
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
                                            {'value':'select-1', 'level':'Select 1'}, 
                                            {'value':'select-2', 'level':'Select 2'},
                                            {'value':'select-3', 'level':'Select 3'},
                                            {'value':'select-4', 'level':'Select 4'},
                                            {'value':'select-5', 'level':'Select 5'},
                                            {'value':'select-6', 'level':'Select 6'},
                                            {'value':'select-7', 'level':'Select 7'},
                                            {'value':'select-8', 'level':'Select 8'},
                                        ].map(({value, level}) => (
                                        <option 
                                            value={value}
                                        >
                                            {level}
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
                        
                            <h4 className="h4">{__("Input Group + Number", "plugin-starter")}</h4>
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
                        
                            <h4 className="h4">{__("Range", "plugin-starter")}</h4>
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
                        
                            <h4 className="h4">{__("Color", "plugin-starter")}</h4>
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
                        
                            <h4 className="h4">{__("Checkbox", "plugin-starter")}</h4>
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
                        
                            <h4 className="h4">{__("Switch", "plugin-starter")}</h4>
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
                        
                            <h4 className="h4">{__("Date", "plugin-starter")}</h4>
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
                        
                            <h4 className="h4">{__("Time", "plugin-starter")}</h4>
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
                        
                            <h4 className="h4">{__("Datetime", "plugin-starter")}</h4>
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