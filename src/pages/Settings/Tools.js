import { __ } from "@wordpress/i18n";
import { useState, useEffect } from '@wordpress/element';
import { useOutletContext } from 'react-router-dom';
import { Row, Col, Form, Button} from 'react-bootstrap';
import { Popover } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch'; // Added missing apiFetch import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, faTrash } from '@fortawesome/free-solid-svg-icons';
import ToastControl from "../../components/ToastControl/ToastControl";

const Tools = () => {
    // Added fallback destructuring for setSettingsReload to prevent reference errors
    const { settings, settingsLoading, handleChange, setSettingsReload } = useOutletContext();
    const [processing, setProcessing] = useState(false);

    // Popover visibility state
    const [popoverVisible, setPopoverVisible] = useState(false);
    const toggleVisible = () => {
        if (!processing) {
            setPopoverVisible((state) => !state);
        }
    };

    // Toast configuration states
    const [showToast, setShowToast] = useState(false);
    const [dataToast, setDataToast] = useState({ title: '', content: '', type: 'success' });
    const toggleShowToast = () => setShowToast(!showToast);

    // Executed when user confirms 'Yes' inside the popover
    const handleConfirmReset = async () => {
        setPopoverVisible(false); // Close the popover immediately on decision
        setProcessing(true);

        try {
            const result = await apiFetch({
                path: "/plugin-starter/v1/options/reset-settings-all",
                method: "POST",
            });

            if (result.success) {
                setSettingsReload?.(Math.random());
                setDataToast({
                    title: __("Success", "plugin-starter"),
                    content: __("Settings reset successfully!", "plugin-starter"),
                    type: 'success'
                });
                setShowToast(true);
            } else {
                throw new Error("Reset failed");
            }
        } catch (error) {
            setDataToast({
                title: __("Error", "plugin-starter"),
                content: __("Error resetting settings.", "plugin-starter"),
                type: 'danger'
            });
            setShowToast(true);
        } finally {
            setProcessing(false);
            setSettingsReload?.(Math.random());
        }
    };

    return (
        <>
            <div className="setting-unit py-4">
                <Row>
                    <Col lg={6}>
                        <h6 className="h6">
                            {__("Hide Plugin", "plugin-starter")}
                        </h6>
                        <p>
                            {__("Hide this plugin from plugin list.", "plugin-starter")}
                        </p>
                    </Col>

                    <Col lg={6}>
                        <Form.Group>
                            <Form.Check
                                id="utilities-tools-hide_plugin"
                                type="switch"
                                label={settings?.utilities?.tools?.hide_plugin ? __('No', 'plugin-starter') : __("Yes", 'plugin-starter')}
                                onChange={(e) => handleChange('utilities.tools.hide_plugin', e.target.checked)}
                                checked={settings?.utilities?.tools?.hide_plugin ? true : false}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </div>

            {plugin_starter_ajax_obj?.isPro &&
                <div className="setting-unit py-4">
                    <Row>
                        <Col lg={6}>
                            <h6 className="h6">
                                {__("Self Defense", "plugin-starter")}
                            </h6>
                            <p>
                                {__("Password requirement for Deactivation.", "plugin-starter")}
                            </p>
                        </Col>

                        <Col lg={6}>
                            <Form.Group>
                                <Form.Check
                                    id="utilities-tools-self_defense"
                                    type="switch"
                                    label={settings?.utilities?.tools?.self_defense ? __('Disable', 'plugin-starter') : __("Enable", 'plugin-starter')}
                                    onChange={(e) => handleChange('utilities.tools.self_defense', e.target.checked)}
                                    checked={settings?.utilities?.tools?.self_defense ? true : false}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </div>
            }
            {plugin_starter_ajax_obj?.isPro &&
                <div className="setting-unit py-4">
                    <Row>
                        <Col lg={6}>
                            <h6 className="h6">
                                {__("Delete all plugin data upon", "plugin-starter")}
                            </h6>
                            <p>
                                {__("Plugin data management.", "plugin-starter")}
                            </p>
                        </Col>

                        <Col lg={6}>
                            <Form.Group>
                                <Form.Select
                                    value={settings?.utilities?.tools?.delete_data_on || ''}
                                    onChange={(e) => handleChange('utilities.tools.delete_data_on', e.target.value)}
                                >
                                    <option value="">Open this select menu</option>
                                    {[
                                        { label: __("None", "plugin-starter"), value: "none" },
                                        { label: __("Delete", "plugin-starter"), value: "delete" },
                                        { label: __("Deactivate", "plugin-starter"), value: "deactivate" },
                                    ].map(({ value, label }) => (
                                        <option key={value} value={value}>{label}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                </div>
            }

            <div className="setting-unit py-4">
                <Row className="alugn-items-start">
                    <Col lg={6}>
                        <h6 className="h6">
                            {__("Reset Plugin", "plugin-starter")}
                        </h6>
                        <p>
                            {__("Reset Plugin to it's default settings", "plugin-starter")}
                        </p>
                    </Col>

                    <Col lg={6} style={{ position: 'relative' }}>
                        <div className="popover-container">
                        <Button
                            variant="outline-danger"
                            onClick={toggleVisible}
                            disabled={processing}
                        >
                            {processing
                                ? <FontAwesomeIcon icon={faSync} className='fa-spin' />
                                : <FontAwesomeIcon icon={faTrash} />
                            }
                            <span className='ms-2'>
                                {processing ? __("Resetting...", "plugin-starter") : __("Reset All", "plugin-starter")}
                            </span>

                        </Button>

                            {/* WordPress Component Popover */}
                            {popoverVisible && (
                                <Popover
                                    onFocusOutside={() => setPopoverVisible(false)}
                                    // variant="unstyled"
                                    className="mt-2"
                                    // style={{ paddingLeft: 'calc(var(--bs-gutter-x) * .5)' }}
                                >
                                    <div className="p-3" style={{width: '250px'}}>
                                        <p className="mb-3 text-dark">
                                            {__("Are you sure you want to reset all settings? This action cannot be undone.", "plugin-starter")}
                                        </p>
                                        <div className="d-flex justify-content-end gap-2">
                                            <Button
                                                size="sm"
                                                variant="light"
                                                onClick={() => setPopoverVisible(false)}
                                            >
                                                {__("No", "plugin-starter")}
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="danger"
                                                onClick={handleConfirmReset}
                                            >
                                                {__("Yes", "plugin-starter")}
                                            </Button>
                                        </div>
                                    </div>
                                </Popover>
                            )}

                        </div>
                    </Col>
                </Row>
            </div>                    
            <ToastControl
                show={showToast}
                onClose={toggleShowToast}
                data={dataToast}
            />
        </>
    );
};

export default Tools;

