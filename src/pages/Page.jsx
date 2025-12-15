import { __ } from "@wordpress/i18n";

import { Row, Col, Select, Typography,  Input, Skeleton, Switch, Button } from '@douyinfe/semi-ui';
import React, {Suspense} from 'react';
import { useMenu } from '../contexts/MenuContext';
import withForm from './withForm';
import { BackgroundControl, BoxShadowControl, ColorPickerControl, FontControl, SkeletonPlaceholder, TextShadowControl } from '../components';
import {
    GradientPicker,
} from '@wordpress/components';
const RemoteLoginForm = React.lazy(() => import("pluginstarterpro/LoginForm"));
const Page = ({handleChange}) => {
    const {
        settingData,
        settingLoading
    } = useMenu();
    const { Title, Text, Paragraph } = Typography;
    return (
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
                            <Select 
                                className="w-full"
                                placeholder={__("Action type", "plugin-starter")} 
                                value={ settingData?.tools.delete_data_on }
                                //delete, unstall, none
                                optionList={ [
                                    { label: 'None', value: 'none' },
                                    { label: 'Delete', value: 'delete' },
                                    { label: 'Unstall', value: 'unstall' },
                                ] }
                                onChange={ ( changedValue ) => handleChange('tools.delete_data_on', changedValue ) }
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
                            <BackgroundControl
                                defaultValues={settingData?.page?.background}
                                name="page.background"
                                handleChange={handleChange}
                            />  
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
                            <BoxShadowControl
                                value={settingData?.page?.boxshadow}
                                onChange={(value) => handleChange('page.boxshadow', value)}
                                // className="border-start border-end border-bottom"
                            />  
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
                            <ColorPickerControl                                
                                defaultValue={settingData?.page?.color}
                                handleChange={(value) => handleChange('page.color', value)}
                                mode='color'
                                label={__("Color", "plugin-starter")}
                            />  
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
                            <ColorPickerControl                                
                                defaultValue={settingData?.page?.gradient}
                                handleChange={(value) => handleChange('page.gradient', value)}
                                mode='gradient'
                                label={__("Gradient", "plugin-starter")}
                            />  
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
                            <ColorPickerControl                                
                                defaultValue={settingData?.page?.gradient}
                                handleChange={(value) => handleChange('page.gradient', value)}
                                mode='both'
                                label={__("Color & Gradient", "plugin-starter")}
                            />  
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
                            <FontControl 
                                defaultValues={settingData?.page?.font}
                                name='page.font' 
                                handleChange={handleChange}
                                options = {["font-size", "font-weight", "font-style", "font-variant", "font-stretch", "text-align", "text-decoration", "text-transform" ]}
                            />  
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
                            <TextShadowControl 
                                value={settingData?.page?.textshadow}
                                onChange={(value) => handleChange('page.textshadow', value)}/>  
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
    )
}
export default withForm(Page, 'page'); 