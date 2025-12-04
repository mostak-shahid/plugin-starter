import React, { useEffect, useState } from 'react'
import { __ } from "@wordpress/i18n";
import { useMain } from '../contexts/MainContext';
import withForm from '../pages/withForm';
import apiFetch from "@wordpress/api-fetch";
import { formDataPost, setNestedValue, urlToArr } from "../lib/Helpers"; // Import utility function
import { Row, Col, Select, Typography,  Input, Skeleton, Switch, Button } from '@douyinfe/semi-ui';
import { IconRefresh } from '@douyinfe/semi-icons';
import { SkeletonPlaceholder } from '../components';
const Tools = ({handleChange}) => {
    const {
        settingData,
        settingLoading,
        setSettingReload,
    } = useMain();
    const { Title, Text, Paragraph } = Typography;
    const [processing, setProcessing] = useState(false); // normal, processing, done
    const handleClick = async () => {
        const confirmation = window.confirm(__( "Are you sure you want to proceed?", "plugin-starter" ));
        let result;
        if (confirmation) { 
            setProcessing(true);
            try {
                result = await formDataPost('plugin_starter_reset_all_settings', {}); 
                if (result.success) {
                    setSettingReload(Math.random);   
                }
            } catch (error) {
                console.log(error.message);
            } finally {
                setProcessing(false);
            }
        }
    };
    return (
        <>
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
            <div className="setting-unit pt-4">
                <Row type="flex" gutter={[24, 24]}>
                    <Col xs={24} lg={12} xl={14}>
                        <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingLoading} active>
                            <Title heading={4}>{__("Reset Plugin", "plugin-starter")}</Title>
                            <Paragraph>{__("Enable/Disable \"Scripts\" functionalities", "plugin-starter")}</Paragraph>
                        </Skeleton>
                    </Col>    
                    {
                        !settingLoading &&                               
                        <Col xs={24} lg={12} xl={10}>
                            <Button 
                                theme="solid"
                                type="danger"
                                icon={<IconRefresh />}
                                loading={processing} 
                                onClick={handleClick} 
                            >                                
                                {
                                    processing ? __( "Reseting...", "plugin-starter" ) : __( "Reset All", "plugin-starter" )
                                }
                            </Button>
                        </Col>
                    }
                </Row>
            </div>
        </>
    )
}
export default withForm(Tools, 'tools');