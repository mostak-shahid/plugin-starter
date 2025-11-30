import { __ } from "@wordpress/i18n";
import React from "react";
import { useMain } from "../contexts/MainContext";
import withForm from "../pages/withForm";
import { Col, Row, Skeleton } from "@douyinfe/semi-ui";

const layouts = ["default-login", "default-login-left", "default-login-right"];

// -------------------------
// CORRECT PRESETS (FORM MOVED INSIDE redesign)
// -------------------------
const preset1 = {
    customizer: {
        redesign: {
            templates: "default-login",
            form: {
                wrapper: { position: "center" },
            },
        },
    },
};

const preset2 = {
    customizer: {
        redesign: {
            templates: "default-login-left",
            form: {
                wrapper: { position: "left" },
            },
        },
    },
};

const preset3 = {
    customizer: {
        redesign: {
            templates: "default-login-right",
            form: {
                wrapper: { position: "right" },
            },
        },
    },
};

// -------------------------
// SAFE DEEP MERGE
// -------------------------
const deepMerge = (target, source) => {
    if (typeof source !== "object" || source === null) return source;
    if (typeof target !== "object" || target === null) return source;

    const output = { ...target };

    Object.keys(source).forEach((key) => {
        output[key] =
            key in target ? deepMerge(target[key], source[key]) : source[key];
    });

    return output;
};

const CustomizerRedesignTemplate = ({ handleChange }) => {
    const { settingData, setSettingData, settingLoading } = useMain();

    const onClick = (template) => {
        let preset = null;

        if (template === "default-login") preset = preset1;
        if (template === "default-login-left") preset = preset2;
        if (template === "default-login-right") preset = preset3;

        if (preset) {
            const updated = deepMerge(settingData, preset);
            setSettingData(updated);
            handleChange("customizer.redesign.templates", template);
        }
    };

    return (
        <div className="setting-unit pt-4">
            {!settingLoading ? (                
                <Row type="flex" gutter={[24, 24]}>
                    {layouts.map((template) => {
                        const active =
                            settingData?.customizer?.redesign?.templates === template;

                        return (
                            <Col xs={24} lg={12} xl={8} key={template}>
                                <img
                                    src={`${plugin_starter_ajax_obj.image_url}${template}.png`}
                                    alt={template}
                                    onClick={() => onClick(template)}
                                    style={{
                                        cursor: "pointer",
                                        width: "100%",
                                        border: "5px solid",
                                        borderColor: active
                                            ? "var(--semi-color-success)"
                                            : "var(--semi-color-info)",
                                    }}
                                />
                            </Col>
                        );
                    })}
                </Row>
                
            ) : (
                <Row type="flex" gutter={[24, 24]}>
                    {[...Array(3)].map((_, i) => (
                        <Col xs={24} lg={12} xl={8} key={i}>
                            <Skeleton.Image style={{ width: "100%", height: 130 }} active />
                        </Col>
                    ))}
                </Row>
            )
            }
        </div>
    );
};

export default withForm(
    CustomizerRedesignTemplate,
    "customizer.redesign.templates"
);
