import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import {
    Form,
    Row,
    Col,
    Skeleton,
    Button,
    Typography,
    Toast,
} from "@douyinfe/semi-ui";
import { IconRefresh, IconCopy } from "@douyinfe/semi-icons";
import { useOutletContext } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { SkeletonPlaceholder } from "../../components";
import ActionButtons from "./ActionButtons";

const { Title, Paragraph } = Typography;

/* ----------------------------------
   Clipboard helper
----------------------------------- */
const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value).then(() => {
        Toast.success("Copied to clipboard");
    });
};

const Tools = () => {
    const {
        settings,
        settingsLoading,
        handleSubmit,
        handleReset,
        setSettingsReload,
    } = useOutletContext();

    const [hasChanges, setHasChanges] = useState(false);
    const [processing, setProcessing] = useState(false);

    const formApi = useRef(null);
    const settingsOld = useRef(null);

    /* ----------------------------------
       Submit
    ----------------------------------- */
    const onSubmit = (values) => {
        handleSubmit("tools", values);
    };

    /* ----------------------------------
       Detect changes
    ----------------------------------- */
    const handleValuesChange = (values) => {
        if (settingsOld.current?.tools) {
            const isChanged =
                JSON.stringify(values) !==
                JSON.stringify(settingsOld.current.tools);
            setHasChanges(isChanged);
        }
    };

    /* ----------------------------------
       Sync form when settings load
    ----------------------------------- */
    useEffect(() => {
        if (settings?.tools) {
            settingsOld.current = { ...settings };

            formApi.current?.setValues({
                ...settings.tools,
                text: "Your text to copy",
            });

            setHasChanges(false);
        }
    }, [settings]);

    /* ----------------------------------
       Reset handler
    ----------------------------------- */
    const handleClick = async () => {
        const confirmation = window.confirm(
            __("Are you sure you want to proceed?", "plugin-starter")
        );

        if (!confirmation) return;

        setProcessing(true);

        try {
            const result = await apiFetch({
                path: "/plugin-starter/v1/options/reset-settings-all",
                method: "POST",
            });

            if (result.success) {
                Toast.success({
                    content: __("Settings reset successfully!", "plugin-starter"),
                    theme: "light",
                });
            } else {
                throw new Error("Reset failed");
            }
        } catch (error) {
            Toast.error({
                content: __("Error resetting settings.", "plugin-starter"),
                theme: "light",
            });
        } finally {
            setProcessing(false);
            setSettingsReload?.(Math.random());
        }
    };

    return (
        <>
            {!settingsLoading && settings?.tools && (
                <Form
                    getFormApi={(api) => (formApi.current = api)}
                    initValues={{
                        ...settings.tools,
                        text: "Your text to copy",
                    }}
                    onSubmit={onSubmit}
                    onValueChange={handleValuesChange}
                    labelPosition="left"
                    labelWidth="150px"
                >
                    {/* -------------------------
                       Self Defense section
                    -------------------------- */}
                    <div className="setting-unit py-4">
                        <Row gutter={[24, 24]}>
                            <Col xs={24} lg={12} xl={14}>
                                <Skeleton
                                    placeholder={<SkeletonPlaceholder />}
                                    loading={settingsLoading}
                                    active
                                >
                                    <Title heading={4}>
                                        {__(
                                            "Self Defense",
                                            "plugin-starter"
                                        )}
                                    </Title>
                                    <Paragraph>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    </Paragraph>
                                </Skeleton>
                            </Col>

                            <Col xs={24} lg={12} xl={10}>
                                <Form.Switch 
                                    field='self-defense' 
                                    noLabel
                                />
                            </Col>
                        </Row>
                    </div>
                    {/* -------------------------
                       Delete data section
                    -------------------------- */}
                    <div className="setting-unit py-4">
                        <Row gutter={[24, 24]}>
                            <Col xs={24} lg={12} xl={14}>
                                <Skeleton
                                    placeholder={<SkeletonPlaceholder />}
                                    loading={settingsLoading}
                                    active
                                >
                                    <Title heading={4}>
                                        {__(
                                            "Delete all the plugin data upon",
                                            "plugin-starter"
                                        )}
                                    </Title>
                                    <Paragraph>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    </Paragraph>
                                </Skeleton>
                            </Col>

                            <Col xs={24} lg={12} xl={10}>
                                <Form.Select
                                    noLabel
                                    field="delete_data_on"
                                    optionList={[
                                        { label: "None", value: "none" },
                                        { label: "Delete", value: "delete" },
                                        { label: "Uninstall", value: "uninstall" },
                                    ]}
                                />
                            </Col>
                        </Row>
                    </div>

                    {/* -------------------------
                       Reset section
                    -------------------------- */}
                    <div className="setting-unit pt-4">
                        <Row gutter={[24, 24]} align="middle">
                            <Col xs={24} lg={12} xl={14}>
                                <Title heading={4}>
                                    {__("Reset Plugin", "plugin-starter")}
                                </Title>
                                <Paragraph>
                                    Enable/Disable "Scripts" functionalities
                                </Paragraph>
                            </Col>

                            <Col xs={24} lg={12} xl={10}>
                                <Button
                                    type="danger"
                                    icon={<IconRefresh />}
                                    loading={processing}
                                    onClick={handleClick}
                                >
                                    {processing
                                        ? __("Resetting...", "plugin-starter")
                                        : __("Reset All", "plugin-starter")}
                                </Button>
                            </Col>
                        </Row>
                    </div>

                    {/* -------------------------
                       Deactivate Plugin URL section
                    -------------------------- */}
                    <div className="setting-unit pt-4">
                        <Row gutter={[24, 24]} align="middle">
                            <Col xs={24} lg={12} xl={14}>
                                <Title heading={4}>Deactivate Plugin URL</Title>
                                <Paragraph>
                                    Enable/Disable "Scripts" functionalities
                                </Paragraph>
                            </Col>

                            <Col xs={24} lg={12} xl={10}>
                                <Form.Input
                                    noLabel
                                    field="text"
                                    readOnly
                                    suffix={
                                        <Button
                                            theme="borderless"
                                            icon={<IconCopy />}
                                            onClick={() =>
                                                copyToClipboard(
                                                    formApi.current?.getValue("text")
                                                )
                                            }
                                        />
                                    }
                                />
                            </Col>
                        </Row>
                    </div>

                    {/* -------------------------
                       Save / Reset buttons
                    -------------------------- */}
                    <ActionButtons
                        hasChanges={hasChanges}
                        section="tools"
                        handleReset={handleReset}
                    />
                </Form>
            )}
        </>
    );
};

export default Tools;
