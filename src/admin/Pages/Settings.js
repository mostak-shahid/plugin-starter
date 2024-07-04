// import React, { useEffect, useState } from 'react';
// import { Card, Col, Container, Row } from 'react-bootstrap';
// const useEffect = wp.element.useState;
// const useState = wp.element.useState;
// import Logo from '../assets/images/logo.svg';
import { Button, Notice } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
const nonce = document.getElementById('nonce-field');
export default function Settings(props) {

    // const [option1, setOption1] = useState('');
    const [options, setOptions] = useState({});
    const [loading,setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [image, setImage] = useState(null);
    const [mediaId, setMediaId] = useState(null);


    useEffect(() => {
        /**
         * Initialize the options fields with the data received from the REST API
         * endpoint provided by the plugin.
         */
        wp.apiFetch({path: '/plugin_starter/v1/options'}).
        then(data => {
                let options = {};
                //Set the new values of the options in the state
                // setOption1(data['plugin_option_1'])
                // setOption2(data['plugin_option_2'])
                setOptions(data['plugin_starter_options'])
            },
        );
    }, []);
    useEffect(() => {
        if (Object.keys(options).length) {
            setLoading(false);
        }
    }, [options]);

    const updateField = (path, value) => {
        const keys = path.split('.');
        let tempData = { ...options };

        keys.reduce((acc, key, index) => {
            if (index === keys.length - 1) {
                acc[key] = value;
            } else {
                if (!acc[key]) acc[key] = {};
                return acc[key];
            }
        }, tempData);

        setOptions(tempData);

        console.log(options);

        /*wp.apiFetch({
            path: '/plugin_starter/v1/options',
            method: 'POST',
            data: {
                'plugin_starter_options': options
            },
        }).then(data => {
            console.log('Options saved successfully!');
        });*/
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(options);
        wp.apiFetch({
            path: '/plugin_starter/v1/options',
            method: 'POST',
            data: {
                'plugin_starter_options': options
            },
        }).then(data => {
            alert('Options saved successfully!');
        });
    };
    const ALLOWED_MEDIA_TYPES = ['image'];
    const handleSelect = (path, media) => {
        //console.log('selected media:', media);
        // setMediaId(media.id);
        // setImage(media);
        updateField(path + '.url', media.url);
        updateField(path + '.thumbnail', media.sizes.thumbnail.url);
        updateField(path + '.id', media.id);
        // setImage('');
    };
    return (
        <section className="settings-page-wrap">
            <Container fluid="fluid">
                <div className="content-part">
                    <Row className="justify-content-lg-center">
                        <Col className="col-lg-8">
                            <div className="settings-box">
                                <div className="d-flex">
                                    <div className="nav-area">
                                        <ul className="options-menu d-flex flex-column">
                                            <li>
                                                <a href="#" className="plugin-starter-nav-tab nav-tab-active">Banner</a>
                                                <ul>
                                                    <li><a href="#">Product Page</a></li>
                                                    <li><a href="#">Shop Page</a></li>
                                                    <li><a href="#">Checkout Page</a></li>
                                                    <li><a href="#">Cart Page</a></li>
                                                </ul>
                                            </li>
                                            <li className="mt-auto">
                                                <a href="#" className="plugin-starter-nav-tab">Settings</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="options-area d-flex flex-column">
                                        {/* {console.log(Object.keys(options).length)} */}
                                        {/* {console.log(loading)} */}
                                        {/* <Card>
                                            <Card.Header>Card Header</Card.Header>
                                            <Card.Title>Card Title</Card.Title>
                                            <Card.Subtitle>Card Subtitle</Card.Subtitle>
                                            <Card.Body>Card Body</Card.Body>
                                            <Card.Link>Card Link</Card.Link>
                                            <Card.Text>Card Text</Card.Text>
                                            <Card.Img src={Logo} />
                                            <Card.Footer>Card Footer</Card.Footer>
                                        </Card> */}  
                                            {
                                            loading
                                            ?<div className="page-loader" />
                                            :<>
                                            <form onSubmit={handleSubmit}>
                                                <div className="options">
                                                
                                                    {console.log(options)}
                                                    {error && (
                                                        <Notice status="error" onRemove={() => setError('')}>
                                                            {error}
                                                        </Notice>
                                                    )}
                                                    {success && (
                                                        <Notice status="success" onRemove={() => setSuccess('')}>
                                                            {success}
                                                        </Notice>
                                                    )}
                                                    <div className="plugin-starter-setting-unit">
                                                        <div className="switch-setting-unit">
                                                            <div className="title-wrap">
                                                                <label>
                                                                    <span>{__('Switch option', 'plugin-starter')}</span>
                                                                    <span className="hints-css hint--bottom" aria-label={__('Here is some hint.', 'plugin-starter')}><i className="dashicons dashicons-editor-help"></i></span>
                                                                </label>
                                                                <div className="description"><p>{__('You can also add some description here.', 'plugin-starter')}</p></div>
                                                            </div>
                                                            <div className="position-relative switcher">
                                                                <label htmlFor="plugin_starter_option_check">
                                                                    <input 
                                                                    id="plugin_starter_option_check"
                                                                    type="checkbox" 
                                                                    value="1"
                                                                    checked={options?.plugin_starter_option_check}
                                                                    onChange = {(event) => updateField('plugin_starter_option_check', event.target.checked)}
                                                                    />
                                                                        <em data-on="on" data-off="off"></em>
                                                                        <span></span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* plugin-starter-setting-unit plugin-starter-setting-sub-unit */}
                                                    
                                                    {/* <TextControl
                                                        label="Shop Page Banner Width"
                                                        value={options?._shop_page?._banner_width}
                                                        onChange={(value) => updateField('_shop_page._banner_width', value)}
                                                    />                                          */}
                                                    
                                                    
                                                </div>                                      
                                                
                                                <div className="save-button mt-auto">
                                                    <Button isPrimary type="submit" className="button button-primary">
                                                    {__('Save settings', 'plugin-starter')}
                                                    </Button>
                                                </div>
                                            
                                            </form>
                                        </>
                                        }

                                        
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </section>
    )
}
