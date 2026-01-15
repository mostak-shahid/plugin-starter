import { __ } from "@wordpress/i18n";
import { Form, Button, Card, Typography, Row, Col, Skeleton } from '@douyinfe/semi-ui';
import { useOutletContext } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import ActionButtons from "./ActionButtons";
import { SkeletonPlaceholder } from "../../components";

import AceEditor from "react-ace";
// Load modes and theme
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
const { Title, Paragraph } = Typography;

const More = () => {
    const { settings, settingsLoading, handleSubmit, handleReset } = useOutletContext();
    const [hasChanges, setHasChanges] = useState(false);
    const settingsOld = useRef(null);

    const onSubmit = (values) => {
        handleSubmit('more', values);
    };

    const handleValuesChange = (values) => {
        if (settingsOld.current && settings.more) {
            const isChanged = JSON.stringify(values) !== JSON.stringify(settingsOld.current.more);
            setHasChanges(isChanged);
        }
    };

    useEffect(() => {
        if (settings && settings.more) {
            settingsOld.current = { ...settings };
            setHasChanges(false);
        }
    }, [settings]);
    return (
<>
            {/* {console.log(settings.more)} */}
            {!settingsLoading && (
                <Form
                    initValues={settings.more}
                    onSubmit={onSubmit}
                    onValueChange={handleValuesChange}
                    // style={{ maxWidth: '600px' }}
                    labelPosition="left"
                    labelWidth="150px"
                >
                    <div className="setting-unit py-4">
                        <Row type="flex" gutter={[24, 24]}>
                            <Col xs={24} lg={12} xl={14}>
                                <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                                    <Title heading={4}>{__("Enable Scripts", "authpress")}</Title>
                                    <Paragraph>{__("Enable/Disable \"Scripts\" functionalities", "authpress")}</Paragraph>
                                </Skeleton>
                            </Col>    
                            {
                                !settingsLoading &&                               
                                <Col xs={24} lg={12} xl={10}>
                                    <Form.Switch 
                                        field='enable_scripts'
                                        noLabel
                                    />   
                                </Col>
                            }
                        </Row>
                    </div>
                    <div className="setting-unit py-4">
                        <Row type="flex" gutter={[24, 24]}>
                            <Col xs={24} lg={12} xl={14}>
                                <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                                    <Title heading={4}>{__("CSS Editor", "authpress")}</Title>
                                    <Paragraph>{__("Add any custom CSS code if necessary", "authpress")}</Paragraph>
                                </Skeleton>
                            </Col>    
                            {
                                !settingsLoading &&                               
                                <Col xs={24}>
                                    <AceEditor
                                        mode="css"
                                        theme="monokai"
                                        value={settings?.more?.css}
                                        onChange={(value) => handleChange("more.css", value)}
                                        name="css-editor"
                                        width="100%"
                                        height="200px"
                                        editorProps={{ $blockScrolling: true }}
                                    />
                                </Col>
                            }
                        </Row>
                    </div>
                    <div className="setting-unit py-4">
                        <Row type="flex" gutter={[24, 24]}>
                            <Col xs={24} lg={12} xl={14}>
                                <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                                    <Title heading={4}>{__("JavaScript Editor", "authpress")}</Title>
                                    <Paragraph>{__("Add any custom JS code if necessary", "authpress")}</Paragraph>
                                </Skeleton>
                            </Col>    
                            {
                                !settingsLoading &&                               
                                <Col xs={24}>
                                    <AceEditor
                                        mode="javascript"
                                        theme="monokai"
                                        value={settings?.more?.js}
                                        onChange={(value) => handleChange("more.js", value)}
                                        name="js-editor"
                                        width="100%"
                                        height="200px"
                                        editorProps={{ $blockScrolling: true }}
                                    />
                                </Col>
                            }
                        </Row>
                    </div>
                    <div className="setting-unit py-4">
                        <Row type="flex" gutter={[24, 24]}>
                            <Col xs={24} lg={12} xl={14}>
                                <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                                    <Title heading={4}>{__("Header Code", "authpress")}</Title>
                                    <Paragraph>{__("This code will be placed inside <head> tag", "authpress")}</Paragraph>
                                </Skeleton>
                            </Col>    
                            {
                                !settingsLoading &&                               
                                <Col xs={24}>
                                    <AceEditor
                                        mode="html"
                                        theme="monokai"
                                        value={settings?.more?.header_content}
                                        onChange={(value) => handleChange("more.header_content", value)}
                                        name="html-editor-1"
                                        width="100%"
                                        height="200px"
                                        editorProps={{ $blockScrolling: true }}
                                    />
                                </Col>
                            }
                        </Row>
                    </div>
                    <div className="setting-unit pt-4">
                        <Row type="flex" gutter={[24, 24]}>
                            <Col xs={24} lg={12} xl={14}>
                                <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                                    <Title heading={4}>{__("Footer Code", "authpress")}</Title>
                                    <Paragraph>{__("This code will be placed inside <body> tag", "authpress")}</Paragraph>
                                </Skeleton>
                            </Col>    
                            {
                                !settingsLoading &&                               
                                <Col xs={24}>
                                    <AceEditor
                                        mode="html"
                                        theme="monokai"
                                        value={settings?.more?.footer_content}
                                        onChange={(value) => handleChange("more.footer_content", value)}
                                        name="html-editor-2"
                                        width="100%"
                                        height="200px"
                                        editorProps={{ $blockScrolling: true }}
                                    />
                                </Col>
                            }
                        </Row>
                    </div>

                    <ActionButtons hasChanges={hasChanges} section='array' handleReset={handleReset} />
                </Form>
            )}
        </>
    );
};

export default More;