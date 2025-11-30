import { __ } from "@wordpress/i18n";
import {BackgroundControl, ColorPickerControl, SkeletonPlaceholder} from '../components';
import { useMain } from '../contexts/MainContext';
import withForm from '../pages/withForm';
import { Row, Col, Typography, Select, Input, Skeleton, } from '@douyinfe/semi-ui';
const CustomizerRedesignBackground = ({handleChange}) => {
    const {
        settingData,
        settingLoading
    } = useMain();
    const { Title, Text, Paragraph } = Typography;
    return (

        <>
            {/* {console.log(settingData)} */}
            <div className="setting-unit py-4">
                <Row type="flex" gutter={[24, 24]}>
                    <Col xs={24} lg={12} xl={14}>
                        <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingLoading} active>
                            <Title heading={4}>{__("Background type", "plugin-starter")}</Title>
                            <Paragraph>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</Paragraph>
                        </Skeleton>
                    </Col>    
                    {
                        // color, gradient, image, video
                        !settingLoading &&                               
                        <Col xs={24} lg={12} xl={10}>    
                            <Select 
                                className="w-full"
                                placeholder={__("Background type", "plugin-starter")} 
                                optionList={[
                                    { label: 'Image', value: 'image' },
                                    { label: 'Gradient', value: 'gradient' },
                                    { label: 'Video', value: 'video' },
                                ]}
                                onChange={ ( changedValue ) => handleChange('customizer.redesign.background.type', changedValue ) }
                                value={ settingData?.customizer?.redesign?.background?.type }
                            />
                        
                        </Col>
                    }
                </Row>
            </div>

{
                settingData?.customizer?.redesign?.background?.type === 'image' &&
            
                    <div className="setting-unit py-4">
                        <Row type="flex" gutter={[24, 24]}>
                            <Col xs={24} lg={12} xl={14}>
                                <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingLoading} active>
                                    <Title heading={4}>{__("Background Image", "plugin-starter")}</Title>
                                    <Paragraph>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</Paragraph>
                                </Skeleton>
                            </Col>    
                            {
                                !settingLoading &&                               
                                <Col xs={24} lg={12} xl={10}>
                                    <BackgroundControl
                                        options={[
                                            "image",
                                            "color",
                                            "position",
                                            "size",
                                            "repeat",
                                            "origin",
                                            "clip",
                                            "attachment",
                                        ]}
                                        defaultValues={settingData?.customizer?.redesign?.background?.background}
                                        name="customizer.redesign.background.background"
                                        handleChange={handleChange}
                                    />                         
                                </Col>
                            }
                        </Row>
                    </div>
            }
            {
                settingData?.customizer?.redesign?.background?.type === 'gradient' &&
                    <div className="setting-unit py-4">
                        <Row type="flex" gutter={[24, 24]}>
                            <Col xs={24} lg={12} xl={14}>
                                <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingLoading} active>
                                    <Title heading={4}>{__("Background Gradient", "plugin-starter")}</Title>
                                    <Paragraph>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</Paragraph>
                                </Skeleton>
                            </Col>    
                            {
                                !settingLoading &&                               
                                <Col xs={24} lg={12} xl={10}>
                                    <ColorPickerControl
                                        defaultValue={settingData?.customizer?.redesign?.background?.background?.color}
                                        handleChange={(value) => handleChange('customizer.redesign.background.background.color', value)}
                                        mode='gradient'
                                    />                        
                                </Col>
                            }
                        </Row>
                    </div>
            }
            {
                settingData?.customizer?.redesign?.background?.type === 'video' &&                
                    <div className="setting-unit py-4">
                        <Row type="flex" gutter={[24, 24]}>
                            <Col xs={24} lg={12} xl={14}>
                                <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingLoading} active>
                                    <Title heading={4}>{__("Background Video", "plugin-starter")}</Title>
                                    <Paragraph>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</Paragraph>
                                </Skeleton>
                            </Col>    
                            {
                                !settingLoading &&                               
                                <Col xs={24} lg={12} xl={10}>
                                    <Input 
                                        placeholder={__("Youtube or Vimeo video URL", "plugin-starter")}
                                        type="url"
                                        showClear 
                                        defaultValue='click to clear'
                                        value={settingData?.customizer?.redesign?.background?.video}
                                        onChange={(value) => handleChange('customizer.redesign.background.video', value)}
                                    />                         
                                </Col>
                            }
                        </Row>
                    </div>                    
            }
            <div className="setting-unit pt-4">
                <Row type="flex" gutter={[24, 24]}>                    
                    <Col xs={24} lg={12} xl={14}>
                        <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingLoading} active>
                            <Title heading={4}>{__("Background Overlay", "plugin-starter")}</Title>
                            <Paragraph>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</Paragraph>
                        </Skeleton>
                    </Col>    
                    {
                        !settingLoading &&                                                       
                        <Col xs={24} lg={12} xl={10}>
                            <ColorPickerControl
                                defaultValue={settingData?.customizer?.redesign?.background?.overlay}
                                handleChange={(value) => handleChange('customizer.redesign.background.overlay', value)}
                                mode='color'
                            />                           
                        </Col>
                    }
                </Row>
            </div>
        </>
    )
}
export default withForm(CustomizerRedesignBackground, 'customizer.redesign.background');