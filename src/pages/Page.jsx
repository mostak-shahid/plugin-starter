import { __ } from "@wordpress/i18n";

import { Row, Col, Select, Typography,  Input, Skeleton, Switch, Button } from '@douyinfe/semi-ui';
import React, {Suspense} from 'react';
import { useMain } from '../contexts/MainContext';
import withForm from './withForm';
import { SkeletonPlaceholder } from '../components';
const RemoteLoginForm = React.lazy(() => import("pluginstarterpro/LoginForm"));
const Page = ({handleChange}) => {
    const {
        settingData,
        settingLoading
    } = useMain();
    const { Title, Text, Paragraph } = Typography;
    return (
        <>
            {console.log('settingData in tools page', settingData)}
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
export default withForm(Page, 'tools'); 
// export default withForm(Tools, 'tools.something');