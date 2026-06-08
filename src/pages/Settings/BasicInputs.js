import { __ } from "@wordpress/i18n";
import { useOutletContext } from 'react-router-dom';
import { useRef, useState, useEffect } from '@wordpress/element';
import {Row, Col, Form, FloatingLabel, InputGroup } from 'react-bootstrap';
const BasicInputs = () => {
   const { settings, settingsLoading, handleChange, handleSubmit, handleReset } = useOutletContext();

    return (
        <>
            {console.log('settings', settings)}
            <div className="setting-unit py-4">
                <Row>
                    <Col lg={6}>
                        
                            <h4 className="h4">{__("Text Input", "authguard")}</h4>
                            <p>{__("Lorem", "authguard")}</p>
                        
                    </Col>
                    {
                        !settingsLoading &&
                        <Col lg={6}>
                            <Form.Group>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                    type="text"                                     
                                    value={settings?.basic?.text || ''}
                                    onChange={(value) => handleChange(settings, 'basic.text', value)}
                                />
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                        </Col>
                    }
                </Row>
            </div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>  
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Example textarea</Form.Label>
                <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlSelect">
                <Form.Label>Example Select</Form.Label>                
                <Form.Select aria-label="Default select example">
                    <option>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlCheckboxes">
                <Form.Label>Example Checkboxes and Radios</Form.Label>                
                {['checkbox', 'radio'].map((type) => (
                    <div key={`default-${type}`} className="mb-3">
                        <Form.Check // prettier-ignore
                            type={type}
                            id={`default-${type}`}
                            label={`default ${type}`}
                        />

                        <Form.Check
                            disabled
                            type={type}
                            label={`disabled ${type}`}
                            id={`disabled-default-${type}`}
                        />
                    </div>
                ))}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlSwitch">
                <Form.Label>Example switch</Form.Label>                
                <Form.Check // prettier-ignore
                    type="switch"
                    id="custom-switch"
                    label="Check this switch"
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlRange">
                <Form.Label>Example Range</Form.Label>                
                <Form.Range />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInputGroup">
                <Form.Label>Input Group</Form.Label>                
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <Form.Control
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <Form.Control
                        placeholder="Recipient's username"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        />
                        <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
                    </InputGroup>
            </Form.Group>
                   
        </>
    );
};

export default BasicInputs;