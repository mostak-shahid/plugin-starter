import { __ } from "@wordpress/i18n";

import { Row, Col, Form, Typography, Skeleton } from '@douyinfe/semi-ui';
import React, { Suspense, useEffect, useRef } from 'react';
import { useMenu } from '../../contexts/MenuContext';
import withForm from '../withForm';
import { BackgroundControl, BoxShadowControl, ColorPickerControl, FontControl, MediaUploaderControl, MultiColorControl, SkeletonPlaceholder, TextShadowControl, UnitControl } from '../../components';
const units = [
    { value: 'px', label: 'px' },
    // { value: '%', label: '%' },
    // { value: 'em', label: 'em' },
    // { value: 'rem', label: 'rem' },
    // { value: 'vw', label: 'vw' },
];
const RemoteLoginForm = React.lazy(() => import("pluginstarterpro/LoginForm"));
const Page_2 = ({handleChange}) => {
    const {
        settingData,
        settingLoading
    } = useMenu();
    const { Title, Paragraph } = Typography;
    const formApiRef = useRef(null);

    // Update form values when settingData changes
    useEffect(() => {
        if (formApiRef.current && settingData && !settingLoading) {
            formApiRef.current.setValues(settingData);
        }
    }, [settingData, settingLoading]);

    // Helper to sync custom control changes with form and parent
    const syncFormValue = (fieldPath, value) => {
        if (formApiRef.current) {
            formApiRef.current.setValue(fieldPath, value);
        }
        if (handleChange) {
            handleChange(fieldPath, value);
        }
    };

    return (
        <Form
            key={settingLoading ? 'loading' : JSON.stringify(settingData)}
            initValues={settingData || {}}
            getFormApi={(formApi) => {
                formApiRef.current = formApi;
            }}
            layout="vertical"
            onValueChange={(values, changedValue) => {
                // Sync form changes with parent handleChange
                if (handleChange && changedValue) {
                    Object.keys(changedValue).forEach(field => {
                        handleChange(field, changedValue[field]);
                    });
                }
            }}
        >
            {({ formState, formApi, values }) => (
                <>
                    {/* {console.log('settingData in tools page', settingData)} */}
                    <div className="setting-unit py-4">
                        <Row type="flex" gutter={[24, 24]}>
                            <Col xs={24} lg={12} xl={14}>
                                <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingLoading} active>
                                    <Title heading={4}>{__("Delete all the plugin data upon", "plugin-starter")}</Title>
                                    <Paragraph>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</Paragraph>
                                </Skeleton>
                            </Col>    
                            {
                                !settingLoading &&                               
                                <Col xs={24} lg={12} xl={10}>
                                    <Form.Select 
                                        field="tools.delete_data_on"
                                        className="w-full"
                                        placeholder={__("Action type", "plugin-starter")} 
                                        optionList={ [
                                            { label: 'None', value: 'none' },
                                            { label: 'Delete', value: 'delete' },
                                            { label: 'Unstall', value: 'unstall' },
                                        ] }
                                    />
                                </Col>
                            }
                        </Row>
                    </div>
                    <div className="setting-unit py-4">
                        <Row type="flex" gutter={[24, 24]}>
                            <Col xs={24} lg={12} xl={14}>
                                <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingLoading} active>
                                    <Title heading={4}>{__("BackgroundControl", "plugin-starter")}</Title>
                                    <Paragraph>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</Paragraph>
                                </Skeleton>
                            </Col>    
                            {
                                !settingLoading &&                               
                                <Col xs={24} lg={12} xl={10}>
                                    <Form.Slot field="page.background">
                                        <BackgroundControl
                                            defaultValues={settingData?.page?.background}
                                            name="page.background"
                                            handleChange={(name, value) => syncFormValue(name, value)}
                                        />  
                                    </Form.Slot>
                                </Col>
                            }
                        </Row>
                    </div>
                    <div className="setting-unit py-4">
                        <Row type="flex" gutter={[24, 24]}>
                            <Col xs={24} lg={12} xl={14}>
                                <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingLoading} active>
                                    <Title heading={4}>{__("BoxShadowControl", "plugin-starter")}</Title>
                                    <Paragraph>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</Paragraph>
                                </Skeleton>
                            </Col>    
                            {
                                !settingLoading &&                               
                                <Col xs={24} lg={12} xl={10}>
                                    <Form.Slot field="page.boxshadow">
                                        <BoxShadowControl
                                            value={settingData?.page?.boxshadow}
                                            onChange={(value) => syncFormValue('page.boxshadow', value)}
                                            // className="border-start border-end border-bottom"
                                        />  
                                    </Form.Slot>
                                </Col>
                            }
                        </Row>
                    </div>
                    <div className="setting-unit py-4">
                        <Row type="flex" gutter={[24, 24]}>
                            <Col xs={24} lg={12} xl={14}>
                                <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingLoading} active>
                                    <Title heading={4}>{__("Color", "plugin-starter")}</Title>
                                    <Paragraph>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</Paragraph>
                                </Skeleton>
                            </Col>    
                            {
                                !settingLoading &&                               
                                <Col xs={24} lg={12} xl={10}>
                                    <Form.Slot field="page.color">
                                        <ColorPickerControl                                
                                            defaultValue={settingData?.page?.color}
                                            handleChange={(value) => syncFormValue('page.color', value)}
                                            mode='color'
                                            label={__("Color", "plugin-starter")}
                                        />  
                                    </Form.Slot>
                                </Col>
                            }
                        </Row>
                    </div>
                    <div className="setting-unit py-4">
                        <Row type="flex" gutter={[24, 24]}>
                            <Col xs={24} lg={12} xl={14}>
                                <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingLoading} active>
                                    <Title heading={4}>{__("Gradient", "plugin-starter")}</Title>
                                    <Paragraph>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</Paragraph>
                                </Skeleton>
                            </Col>    
                            {
                                !settingLoading &&                               
                                <Col xs={24} lg={12} xl={10}>
                                    <Form.Slot field="page.gradient">
                                        <ColorPickerControl                                
                                            defaultValue={settingData?.page?.gradient}
                                            handleChange={(value) => syncFormValue('page.gradient', value)}
                                            mode='gradient'
                                            label={__("Gradient", "plugin-starter")}
                                        />  
                                    </Form.Slot>
                                </Col>
                            }
                        </Row>
                    </div>
                    <div className="setting-unit py-4">
                        <Row type="flex" gutter={[24, 24]}>
                            <Col xs={24} lg={12} xl={14}>
                                <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingLoading} active>
                                    <Title heading={4}>{__("Color & Gradient", "plugin-starter")}</Title>
                                    <Paragraph>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</Paragraph>
                                </Skeleton>
                            </Col>    
                            {
                                !settingLoading &&                               
                                <Col xs={24} lg={12} xl={10}>
                                    <Form.Slot field="page.gradient_both">
                                        <ColorPickerControl                                
                                            defaultValue={settingData?.page?.gradient}
                                            handleChange={(value) => syncFormValue('page.gradient', value)}
                                            mode='both'
                                            label={__("Color & Gradient", "plugin-starter")}
                                        />  
                                    </Form.Slot>
                                </Col>
                            }
                        </Row>
                    </div>
                    <div className="setting-unit py-4">
                        <Row type="flex" gutter={[24, 24]}>
                            <Col xs={24} lg={12} xl={14}>
                                <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingLoading} active>
                                    <Title heading={4}>{__("FontControl", "plugin-starter")}</Title>
                                    <Paragraph>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</Paragraph>
                                </Skeleton>
                            </Col>    
                            {
                                !settingLoading &&                               
                                <Col xs={24} lg={12} xl={10}>
                                    <Form.Slot field="page.font">
                                        <FontControl 
                                            defaultValues={settingData?.page?.font}
                                            name='page.font' 
                                            handleChange={(name, value) => syncFormValue(name, value)}
                                        />  
                                    </Form.Slot>
                                </Col>
                            }
                        </Row>
                    </div>
                    <div className="setting-unit py-4">
                        <Row type="flex" gutter={[24, 24]}>
                            <Col xs={24} lg={12} xl={14}>
                                <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingLoading} active>
                                    <Title heading={4}>{__("TextShadowControl", "plugin-starter")}</Title>
                                    <Paragraph>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</Paragraph>
                                </Skeleton>
                            </Col>    
                            {
                                !settingLoading &&                               
                                <Col xs={24} lg={12} xl={10}>
                                    <Form.Slot field="page.textshadow">
                                        <TextShadowControl 
                                            value={settingData?.page?.textshadow}
                                            onChange={(value) => syncFormValue('page.textshadow', value)}
                                        />  
                                    </Form.Slot>
                                </Col>
                            }
                        </Row>
                    </div>
                    <div className="setting-unit py-4">
                        <Row type="flex" gutter={[24, 24]}>
                            <Col xs={24} lg={12} xl={14}>
                                <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingLoading} active>
                                    <Title heading={4}>{__("MultiColorControl", "plugin-starter")}</Title>
                                    <Paragraph>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</Paragraph>
                                </Skeleton>
                            </Col>    
                            {
                                !settingLoading &&                               
                                <Col xs={24} lg={12} xl={10}>
                                    <Form.Slot field="page.multicolor">
                                        <MultiColorControl 
                                            options={['primary', 'secondary', 'tertiary']}
                                            defaultValues={settingData?.page?.multicolor}
                                            name='page.multicolor'
                                            handleChange={(name, value) => syncFormValue(name, value)}
                                        />  
                                    </Form.Slot>
                                </Col>
                            }
                        </Row>
                    </div>
                    <div className="setting-unit py-4">
                        <Row type="flex" gutter={[24, 24]}>
                            <Col xs={24} lg={12} xl={14}>
                                <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingLoading} active>
                                    <Title heading={4}>{__("MediaUploaderControl", "plugin-starter")}</Title>
                                    <Paragraph>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</Paragraph>
                                </Skeleton>
                            </Col>    
                            {
                                !settingLoading &&                               
                                <Col xs={24} lg={12} xl={10}>
                                    <Form.Slot field="page.media_uploader">
                                        <MediaUploaderControl 
                                            data={settingData?.page?.media_uploader} 
                                            name={'page.media_uploader'}
                                            handleChange={(name, value) => syncFormValue(name, value)}
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
                                    </Form.Slot>
                                </Col>
                            }
                        </Row>
                    </div>
                    <div className="setting-unit py-4">
                        <Row type="flex" gutter={[24, 24]}>
                            <Col xs={24} lg={12} xl={14}>
                                <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingLoading} active>
                                    <Title heading={4}>{__("UnitControl", "plugin-starter")}</Title>
                                    <Paragraph>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</Paragraph>
                                </Skeleton>
                            </Col>    
                            {
                                !settingLoading &&                               
                                <Col xs={24} lg={12} xl={10}>
                                    <Form.Slot field="page.unitcontrol">
                                        <UnitControl
                                            label={__('UnitControl', 'plugin-starter')}
                                            onChange={(value) => syncFormValue('page.unitcontrol', value)}
                                            value={settingData?.page?.unitcontrol}
                                            units={units}
                                            className="w-full"
                                        />
                                    </Form.Slot>
                                </Col>
                            }
                        </Row>
                    </div>
                    {plugin_starter_ajax_obj.isPro &&            
                        <div className="setting-unit py-4">
                            <Row type="flex" gutter={[24, 24]}>
                                <Col xs={24} lg={12} xl={14}>
                                    <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingLoading} active>
                                        <Title heading={4}>{__("This is from pro", "plugin-starter")}</Title>
                                        <Paragraph>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</Paragraph>
                                    </Skeleton>
                                </Col>    
                                {
                                    !settingLoading &&                               
                                    <Col xs={24} lg={12} xl={10}>
                                        <Suspense fallback={<div>{__("Loading remote component...", "plugin-starter")}</div>}>
                                            <RemoteLoginForm settingData={settingData} />
                                        </Suspense>
                                    </Col>
                                }
                            </Row>
                        </div>                            
                    }
                </>
            )}
        </Form>
    )
}
export default withForm(Page_2, 'page'); 