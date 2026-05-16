import { __ } from "@wordpress/i18n";
import { Row, Col, Skeleton, Typography, Radio } from '@douyinfe/semi-ui';
import { useOutletContext } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import ActionButtons from "./ActionButtons";
import { SkeletonPlaceholder, BackgroundControl, BoxShadowControl, ColorPickerControl, FontControl, MediaUploaderControl, MultiColorControl, TextShadowControl, UnitControl } from "../../components";

const { Title, Paragraph } = Typography;
const ComponentsFree = () => {
    const { settings, settingsLoading, handleSubmit, handleReset } = useOutletContext();
    const [hasChanges, setHasChanges] = useState(false);
    const settingsOld = useRef(null);
    
    const [formData, setFormData] = useState({
        background: {},
        boxshadow: {
            enabled: false,
            inset: false,
        },
        colorpicker: '',
        gradient: '',
        font: {
            enabled: false,
        },
        media_uploader: {},
        multicolor: {},
        textshadow: {
            enabled: false,
        },
        unitcontrol: '',
    });

    const onSubmit = () => {
        handleSubmit('components.free', formData);
    };

    const handleFieldChange = (field, value) => {
        setFormData(prev => {
            const newFormData = { ...prev, [field]: value };
            if (settingsOld.current?.components?.free) {
                const isChanged = JSON.stringify(newFormData) !== JSON.stringify(settingsOld.current.components.free);
                setHasChanges(isChanged);
            }
            return newFormData;
        });
    };

    useEffect(() => {
        if (settings && settings.components && settings.components.free) {
            settingsOld.current = { ...settings };
            setFormData({
                background: settings.components.free.background || {},
                boxshadow: settings.components.free.boxshadow || {
                    enabled: false,
                    inset: false,
                },
                colorpicker: settings.components.free.colorpicker || '',
                gradient: settings.components.free.gradient || '',
                font: settings.components.free.font || {
                    enabled: false,
                },
                media_uploader: settings.components.free.media_uploader || {},
                multicolor: settings.components.free.multicolor || {},
                textshadow: settings.components.free.textshadow || {
                    enabled: false,
                },
                unitcontrol: settings.components.free.unitcontrol || '',
            });
            setHasChanges(false);
        }
    }, [settings]);

    return (
        <>
            <div className="setting-unit py-4">
                <Row type="flex" gutter={[24, 24]}>
                    <Col xs={24} lg={12} xl={14}>
                        <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                            <Title heading={4}>{__("Background Control", "plugin-starter")}</Title>
                            <Paragraph>{__("Control background settings", "plugin-starter")}</Paragraph>
                        </Skeleton>
                    </Col>    
                    {
                        !settingsLoading &&                               
                        <Col xs={24} lg={12} xl={10}>
                            <BackgroundControl
                                defaultValues={formData.background}
                                name="background"
                                handleChange={handleFieldChange}
                            />
                        </Col>
                    }
                </Row>
            </div>

            <div className="setting-unit py-4">
                <Row type="flex" gutter={[24, 24]}>
                    <Col xs={24} lg={12} xl={14}>
                        <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                            <Title heading={4}>{__("Box Shadow Control", "plugin-starter")}</Title>
                            <Paragraph>{__("Control box shadow settings", "plugin-starter")}</Paragraph>
                        </Skeleton>
                    </Col>    
                    {
                        !settingsLoading &&                               
                        <Col xs={24} lg={12} xl={10}>
                            <BoxShadowControl
                                value={formData.boxshadow}
                                onChange={(value) => handleFieldChange('boxshadow', value)}
                            />
                        </Col>
                    }
                </Row>
            </div>

            <div className="setting-unit py-4">
                <Row type="flex" gutter={[24, 24]}>
                    <Col xs={24} lg={12} xl={14}>
                        <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                            <Title heading={4}>{__("Color Picker Control", "plugin-starter")}</Title>
                            <Paragraph>{__("Pick a color or gradient", "plugin-starter")}</Paragraph>
                        </Skeleton>
                    </Col>    
                    {
                        !settingsLoading &&                               
                        <Col xs={24} lg={12} xl={10}>
                            <ColorPickerControl
                                defaultValue={formData.colorpicker}
                                onChange={(value) => handleFieldChange('colorpicker', value)}
                                mode="both"
                                label={__("Select Color", "plugin-starter")}
                            />
                        </Col>
                    }
                </Row>
            </div>

            <div className="setting-unit py-4">
                <Row type="flex" gutter={[24, 24]}>
                    <Col xs={24} lg={12} xl={14}>
                        <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                            <Title heading={4}>{__("Font Control", "plugin-starter")}</Title>
                            <Paragraph>{__("Control font settings", "plugin-starter")}</Paragraph>
                        </Skeleton>
                    </Col>    
                    {
                        !settingsLoading &&                               
                        <Col xs={24} lg={12} xl={10}>
                            <FontControl
                                defaultValues={formData.font}
                                name="font"
                                onChange={handleFieldChange}
                            />
                        </Col>
                    }
                </Row>
            </div>

            <div className="setting-unit py-4">
                <Row type="flex" gutter={[24, 24]}>
                    <Col xs={24} lg={12} xl={14}>
                        <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                            <Title heading={4}>{__("Media Uploader Control", "plugin-starter")}</Title>
                            <Paragraph>{__("Upload media files", "plugin-starter")}</Paragraph>
                        </Skeleton>
                    </Col>    
                    {
                        !settingsLoading &&                               
                        <Col xs={24} lg={12} xl={10}>
                            <MediaUploaderControl
                                data={formData.media_uploader}
                                name="media_uploader"
                                onChange={handleFieldChange}
                                options={{
                                    frame: {
                                        title: __("Select or Upload Image", "plugin-starter"),
                                    },
                                    library: { type: 'image' },
                                    buttons: {
                                        upload: __("Upload Image", "plugin-starter"),
                                        remove: __("Remove", "plugin-starter"),
                                        select: __("Use this image", "plugin-starter"),
                                    },
                                }}
                            />
                        </Col>
                    }
                </Row>
            </div>

            <div className="setting-unit py-4">
                <Row type="flex" gutter={[24, 24]}>
                    <Col xs={24} lg={12} xl={14}>
                        <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                            <Title heading={4}>{__("Multi Color Control", "plugin-starter")}</Title>
                            <Paragraph>{__("Pick multiple colors", "plugin-starter")}</Paragraph>
                        </Skeleton>
                    </Col>    
                    {
                        !settingsLoading &&                               
                        <Col xs={24} lg={12} xl={10}>
                            <MultiColorControl
                                options={["primary", "secondary", "accent"]}
                                defaultValues={formData.multicolor}
                                name="multicolor"
                                handleChange={handleFieldChange}
                            />
                        </Col>
                    }
                </Row>
            </div>

            <div className="setting-unit py-4">
                <Row type="flex" gutter={[24, 24]}>
                    <Col xs={24} lg={12} xl={14}>
                        <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                            <Title heading={4}>{__("Text Shadow Control", "plugin-starter")}</Title>
                            <Paragraph>{__("Control text shadow settings", "plugin-starter")}</Paragraph>
                        </Skeleton>
                    </Col>    
                    {
                        !settingsLoading &&                               
                        <Col xs={24} lg={12} xl={10}>
                            <TextShadowControl
                                value={formData.textshadow}
                                onChange={(value) => handleFieldChange('textshadow', value)}
                            />
                        </Col>
                    }
                </Row>
            </div>

            <div className="setting-unit py-4">
                <Row type="flex" gutter={[24, 24]}>
                    <Col xs={24} lg={12} xl={14}>
                        <Skeleton placeholder={<SkeletonPlaceholder />} loading={settingsLoading} active>
                            <Title heading={4}>{__("Unit Control", "plugin-starter")}</Title>
                            <Paragraph>{__("Control unit values", "plugin-starter")}</Paragraph>
                        </Skeleton>
                    </Col>    
                    {
                        !settingsLoading &&                               
                        <Col xs={24} lg={12} xl={10}>
                            <UnitControl
                                label={__("Width", "plugin-starter")}
                                value={formData.unitcontrol}
                                onChange={(value) => handleFieldChange('unitcontrol', value)}
                                units={[
                                    { value: 'px', label: 'px' },
                                    { value: '%', label: '%' },
                                    { value: 'em', label: 'em' },
                                    { value: 'rem', label: 'rem' },
                                ]}
                                min={0}
                                step={1}
                            />
                        </Col>
                    }
                </Row>
            </div>

            <ActionButtons hasChanges={hasChanges} section='components.free' handleReset={handleReset} handleSubmit={onSubmit} />
        </>
    );
};

export default ComponentsFree;