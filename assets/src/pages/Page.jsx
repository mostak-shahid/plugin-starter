import { __ } from "@wordpress/i18n";

import { Row, Col, Select, Typography,  Input, Skeleton, Switch, Button } from '@douyinfe/semi-ui';
import React, { useState, useEffect, Suspense  } from 'react';
import { BackgroundControl, BoxShadowControl, ColorPickerControl, FontControl, MediaUploaderControl, MultiColorControl, SkeletonPlaceholder, TextShadowControl, UnitControl } from '../components';
const units = [
    { value: 'px', label: 'px' },
    // { value: '%', label: '%' },
    // { value: 'em', label: 'em' },
    // { value: 'rem', label: 'rem' },
    // { value: 'vw', label: 'vw' },
];
const RemoteLoginForm = React.lazy(() => import("pluginstarterpro/LoginForm"));
const RemoteRegistrationForm = React.lazy(() => import("pluginstarterpro/RegistrationForm"));
const RemoteNewsSideSheet = React.lazy(() => import("pluginstarterpro/NewsSideSheet"));
const Page = () => {
    const settingLoading = false;
    const settingData = {};
    const { Title, Text, Paragraph } = Typography;

    const [newsVisible, setNewsVisible] = useState(true);
    const [newsCurrentPage, setNewsCurrentPage] = useState(1);
    const handleNewsVisible = (visible) => {
        setNewsVisible(visible);
        if (visible) {
            setNewsCurrentPage(1);
        }
    };
    return (
        <>
            <p>The below item is from pro</p>
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
                                    <RemoteRegistrationForm settingData={settingData} />
                                </Suspense>
                            </Col>
                        }
                    </Row>
                </div>                            
            }
            {/* <RemoteNewsSideSheet newsVisible={newsVisible} handleNewsVisible={setNewsVisible} /> */}
            <p>The avobe item is from pro</p>

        </>
    )
}
export default Page; 