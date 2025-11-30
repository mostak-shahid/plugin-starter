import { __ } from "@wordpress/i18n";
import {MediaUploaderControl, UnitControl, SkeletonPlaceholder, } from '../components';
import { useMain } from '../contexts/MainContext';
import withForm from '../pages/withForm';
import { useState } from 'react';

import { Row, Col, Typography,  Input, Skeleton, Switch } from '@douyinfe/semi-ui';

const CustomizerRedesignLogo = ({handleChange}) => {
    const [switchChecked, setSwitchChecked] = useState(false);
    const {
        settingData,
        settingLoading
    } = useMain();
    const units = [
        { value: 'px', label: 'px' },
        { value: '%', label: '%' },
        { value: 'em', label: 'em' },
        { value: 'rem', label: 'rem' },
        { value: 'vw', label: 'vw' },
    ];
    const { Title, Text, Paragraph } = Typography;
    return (
        <>
            {/* {console.log(settingData?.customizer?.redesign?.logo)} */}
            <div className="setting-unit pt-4">
                <Row type="flex" gutter={[24, 24]}>
                    <Col xs={24} lg={12} xl={14}>
                        <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingLoading} active>
                            <Title heading={4}>{__("Hide logo", "plugin-starter")}</Title>
                            <Paragraph>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</Paragraph>
                        </Skeleton>
                    </Col>    
                    {
                        !settingLoading &&                               
                        <Col xs={24} lg={12} xl={10}>
                            <Switch 
                                onChange={(value, element) => handleChange('customizer.redesign.logo.disabled', value)}
                                checked={ Boolean(settingData?.customizer?.redesign?.logo?.disabled) }
                            />                       
                        </Col>
                    }
                </Row>
            </div>
            <div className="setting-unit py-4">
                <Row type="flex" gutter={[24, 24]}>
                    <Col xs={24} lg={12} xl={14}>
                        <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingLoading} active>
                            <Title heading={4}>{__("Upload Logo", "plugin-starter")}</Title>
                            <Paragraph>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</Paragraph>
                        </Skeleton>
                    </Col>    
                    {
                        !settingLoading &&                               
                        <Col xs={24} lg={12} xl={10}>
                            <MediaUploaderControl 
                                data={settingData?.customizer?.redesign?.logo?.image} 
                                name='customizer.redesign.logo.image' 
                                handleChange={handleChange}
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
                        </Col>
                    }
                </Row>
            </div>
            <div className="setting-unit py-4">
                <Row type="flex" gutter={[24, 24]}>
                    <Col xs={24} lg={12} xl={14}>
                        <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingLoading} active>
                            <Title heading={4}>{__("Logo Size", "plugin-starter")}</Title>
                            <Paragraph>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</Paragraph>
                        </Skeleton>
                    </Col>    
                    {
                        !settingLoading &&                               
                        <Col xs={24} lg={12} xl={10}>
                            <Row type="flex" gutter={[16, 16]}>
                                <Col xs={12}>
                                    <UnitControl 
                                        label={__('Width', 'plugin-starter')}
                                        onChange={(value) => handleChange('customizer.redesign.logo.width', value)}
                                        value={settingData?.customizer?.redesign?.logo?.width}
                                        units={units}
                                    />
                                </Col>
                                <Col xs={12}>
                                    <UnitControl 
                                        label={__('Height', 'plugin-starter')}
                                        onChange={(value) => handleChange('customizer.redesign.logo.height', value)}
                                        value={settingData?.customizer?.redesign?.logo?.height}
                                        units={units}
                                    />
                                </Col>
                            </Row>                     
                        </Col>
                    }
                </Row>
            </div>
            <div className="setting-unit py-4">
                <Row type="flex" gutter={[24, 24]}>
                    <Col xs={24} lg={12} xl={14}>
                        <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingLoading} active>
                            <Title heading={4}>{__("Space below", "plugin-starter")}</Title>
                            <Paragraph>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</Paragraph>
                        </Skeleton>
                    </Col>    
                    {
                        !settingLoading &&                               
                        <Col xs={24} lg={12} xl={10}>
                            <UnitControl 
                                onChange={(value) => handleChange('customizer.redesign.logo.space', value)}
                                value={settingData?.customizer?.redesign?.logo?.space}
                                units={units}
                            />                                                   
                        </Col>
                    }
                </Row>
            </div>
            <div className="setting-unit pt-4">
                <Row type="flex" gutter={[24, 24]}>
                    <Col xs={24} lg={12} xl={14}>
                        <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingLoading} active>
                            <Title heading={4}>{__("Logo URL", "plugin-starter")}</Title>
                            <Paragraph>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</Paragraph>
                        </Skeleton>
                    </Col>    
                    {
                        !settingLoading &&                               
                        <Col xs={24} lg={12} xl={10}>
                            <Input
                                type="url"
                                value={settingData?.customizer?.redesign?.logo?.url}
                                onChange={(value) => handleChange('customizer.redesign.logo.url', value)}
                            />
                        </Col>
                    }
                </Row>
            </div>
        </>
    )
}
export default withForm(CustomizerRedesignLogo, 'customizer.redesign.logo');