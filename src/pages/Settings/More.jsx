import { __ } from "@wordpress/i18n";
import * as Bootstrap from 'react-bootstrap';
const { Card, Form, Row, Col } = Bootstrap;
import { useOutletContext } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import ActionButtons from "./ActionButtons";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

const More = () => {
    const { settings, settingsLoading, handleSubmit, handleReset } = useOutletContext();
    const [hasChanges, setHasChanges] = useState(false);
    const settingsOld = useRef(null);
    const [formData, setFormData] = useState({
        enable_scripts: false,
        css: '',
        js: '',
        header_content: '',
        footer_content: ''
    });

    useEffect(() => {
        if (settings && settings.more) {
            settingsOld.current = { ...settings };
            setFormData({
                enable_scripts: settings.more.enable_scripts || false,
                css: settings.more.css || '',
                js: settings.more.js || '',
                header_content: settings.more.header_content || '',
                footer_content: settings.more.footer_content || ''
            });
            setHasChanges(false);
        }
    }, [settings]);

    const handleChange = (field, value) => {
        setFormData(prev => {
            const newData = { ...prev, [field]: value };
            if (settingsOld.current && settingsOld.current.more) {
                const isChanged = JSON.stringify(newData) !== JSON.stringify(settingsOld.current.more);
                setHasChanges(isChanged);
            }
            return newData;
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit('more', formData);
    };

    return (
        <>
            {!settingsLoading && (
                <form onSubmit={onSubmit}>
                    <div className="py-4">
                        <Row className="g-4">
                            <Col xs={24} lg={12} xl={14}>
                                <h4>{__("Enable Scripts", "plugin-starter")}</h4>
                                <p className="text-muted">{__("Enable/Disable 'Scripts' functionalities", "plugin-starter")}</p>
                            </Col>    
                            <Col xs={24} lg={12} xl={10}>
                                <Form.Check 
                                    type="switch"
                                    checked={formData.enable_scripts}
                                    onChange={(e) => handleChange('enable_scripts', e.target.checked)}
                                    label={formData.enable_scripts ? 'Enabled' : 'Disabled'}
                                />
                            </Col>
                        </Row>
                    </div>

                    <div className="py-4 border-top">
                        <Row className="g-4">
                            <Col xs={24} lg={12} xl={14}>
                                <h4>{__("CSS Editor", "plugin-starter")}</h4>
                                <p className="text-muted">{__("Add any custom CSS code if necessary", "plugin-starter")}</p>
                            </Col>    
                            <Col xs={24}>
                                <AceEditor
                                    mode="css"
                                    theme="monokai"
                                    value={formData.css}
                                    onChange={(value) => handleChange('css', value)}
                                    name="css-editor"
                                    width="100%"
                                    height="200px"
                                    editorProps={{ $blockScrolling: true }}
                                />
                            </Col>
                        </Row>
                    </div>

                    <div className="py-4 border-top">
                        <Row className="g-4">
                            <Col xs={24} lg={12} xl={14}>
                                <h4>{__("JavaScript Editor", "plugin-starter")}</h4>
                                <p className="text-muted">{__("Add any custom JS code if necessary", "plugin-starter")}</p>
                            </Col>    
                            <Col xs={24}>
                                <AceEditor
                                    mode="javascript"
                                    theme="monokai"
                                    value={formData.js}
                                    onChange={(value) => handleChange('js', value)}
                                    name="js-editor"
                                    width="100%"
                                    height="200px"
                                    editorProps={{ $blockScrolling: true }}
                                />
                            </Col>
                        </Row>
                    </div>

                    <div className="py-4 border-top">
                        <Row className="g-4">
                            <Col xs={24} lg={12} xl={14}>
                                <h4>{__("Header Code", "plugin-starter")}</h4>
                                <p className="text-muted">{__("This code will be placed inside <head> tag", "plugin-starter")}</p>
                            </Col>    
                            <Col xs={24}>
                                <AceEditor
                                    mode="html"
                                    theme="monokai"
                                    value={formData.header_content}
                                    onChange={(value) => handleChange('header_content', value)}
                                    name="html-editor-1"
                                    width="100%"
                                    height="200px"
                                    editorProps={{ $blockScrolling: true }}
                                />
                            </Col>
                        </Row>
                    </div>

                    <div className="pt-4 border-top">
                        <Row className="g-4">
                            <Col xs={24} lg={12} xl={14}>
                                <h4>{__("Footer Code", "plugin-starter")}</h4>
                                <p className="text-muted">{__("This code will be placed inside <body> tag", "plugin-starter")}</p>
                            </Col>    
                            <Col xs={24}>
                                <AceEditor
                                    mode="html"
                                    theme="monokai"
                                    value={formData.footer_content}
                                    onChange={(value) => handleChange('footer_content', value)}
                                    name="html-editor-2"
                                    width="100%"
                                    height="200px"
                                    editorProps={{ $blockScrolling: true }}
                                />
                            </Col>
                        </Row>
                    </div>

                    <ActionButtons hasChanges={hasChanges} section='more' handleReset={handleReset} />
                </form>
            )}
        </>
    );
};

export default More;
