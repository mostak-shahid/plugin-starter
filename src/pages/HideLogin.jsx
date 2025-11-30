import { __ } from "@wordpress/i18n";
import React, {useState, useMemo} from 'react';
import { useMain } from '../contexts/MainContext';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import withForm from './withForm';
import { formDataPost, setNestedValue, urlToArr } from "../lib/Helpers"; // Import utility function
import { 
    Flex, 
    FlexBlock, 
    FlexItem,
    Button,
    __experimentalInputControl as InputControl,
} from '@wordpress/components';
import { 
    envelope, 
    rotateRight, 
    check, 
} from '@wordpress/icons'; // Example icon
import MultiSelectControl from "../components/MultiSelectControl/MultiSelectControl";
const HideLogin = ({handleChange}) => {
    const {
        settingData,
        settingLoading,
        setSettingReload,
    } = useMain();
    const [emails, setEmails] = useState('');
    const [ processing, setProcessing ] = useState('normal');
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState('');
    const changeLoginLink = async () => {
        setProcessing('processing');        
        try {
            const result = await formDataPost('plugin_starter_set_login_url', {login_url:settingData?.hide_login?.login_url});
            console.log(result); 
            if (result.success) {
                setProcessing('done');
                setTimeout(() => {
                    setProcessing('done');
                    // Reset to normal state after a short delay
                    setTimeout(() => {
                        setProcessing('normal');
                    }, 2000);
                }, 3000);
                setSettingReload(Math.random);  
                setMessage(result?.data?.message);
                setShowToast(true);
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setProcessing('normal');    
        }
    }
    const sendEmail = async () => {
        console.log(emails),
        setProcessing('processing');        
        try {
            const result = await formDataPost('plugin_starter_send_email_login_url', {emails:emails});
            console.log(result); 
            if (result.success) {
                setProcessing('done');
                
                setTimeout(() => {
                    setProcessing('done');
                    // Reset to normal state after a short delay
                    setTimeout(() => {
                        setProcessing('normal');
                    }, 2000);
                }, 3000);

                setEmails('');
                setSettingReload(Math.random);  
                setMessage(result?.data?.message);
                setShowToast(true);
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setProcessing('normal');    
        }
    }
    return (
        <>
            <ToastContainer
                className="p-3"
                // position="end"
                style={{ zIndex: 9999, top:'43px', right:0 }}
            >
                <Toast 
                    bg="success"
                    onClose={() => setShowToast(false)} 
                    show={showToast} 
                    delay={3000} 
                    autohide
                >
                    <Toast.Body>
                        <strong className="me-auto text-white">{message}</strong>
                    </Toast.Body>
                    {/* <Toast.Header>
                        <strong className="me-auto">{message}</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">
                        {__(
                            'All changes have been applied correctly, ensuring your preferences are now in effect.',                                                        
                            "plugin-starter"
                        )}
                    </Toast.Body> */}
                </Toast>
            </ToastContainer>
            <div className="setting-unit border-bottom py-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Login URL", "plugin-starter")}</h4>
                        }
                        {
                            settingLoading 
                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                        }
                    </div>    
                    {
                        !settingLoading &&  
                        <div className="col-lg-5">                             
                            <Flex className="input-group-plugin-starter" style={{marginBottom: '8px'}}>
                                <FlexItem className="input-group-text">
                                    <span>{plugin_starter_ajax_obj.home_url}/</span>
                                </FlexItem>
                                <FlexBlock>                                    
                                    <InputControl
                                        __next40pxDefaultSize
                                        type="text"                                        
                                        value={ settingData?.hide_login?.login_url }
                                        onChange={ ( value ) => handleChange('hide_login.login_url', value) }
                                    />
                                </FlexBlock>
                            </Flex>
                            <Button
                                isDestructive={ processing=='processing'?true:false } // Red button
                                isBusy={ processing!='normal'?true:false  } // Show loading indicator
                                disabled={ processing!='normal'?true:false } // Disable the button
                                isPressed={ false } // Appear pressed, Become black  
                                icon={ processing=='processing'?rotateRight:processing=='done'?check:envelope} // Button icon
                                iconPosition="left" // Icon position (left, right)
                                iconSize={ 20 } // Icon size
                                size="medium" // Button size (small, medium, large)
                                // style={{height: '100%'}} // Custom styles
                                className={processing=='processing'?'button-processing':'' } // Custom class name (button-processing)                  
                                variant="primary"
                                onClick={ changeLoginLink }
                            >
                                {
                                    processing == 'processing' ? __( "Saving...", "plugin-starter" ) : __( "Save", "plugin-starter" )
                                }
                            </Button> 
                        </div>
                    }
                </div>
            </div>
            <div className="setting-unit pt-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Send Email", "plugin-starter")}</h4>
                        }
                        {
                            settingLoading 
                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "plugin-starter")}</p>
                        }
                    </div>    
                    {
                        !settingLoading &&                               
                        <div className="col-lg-5">
                            <InputControl
                                __next40pxDefaultSize
                                type="text"
                                placeholder={ __( "Enter email addresses separated by commas", "plugin-starter" ) }
                                value={ emails }
                                onChange={ ( value ) => setEmails(value) }
                                style={{marginBottom: '8px'}}
                            />
                            <Button
                                isDestructive={ processing=='processing'?true:false } // Red button
                                isBusy={ processing!='normal'?true:false  } // Show loading indicator
                                disabled={ processing!='normal'?true:false } // Disable the button
                                isPressed={ false } // Appear pressed, Become black  
                                icon={ processing=='processing'?rotateRight:processing=='done'?check:envelope} // Button icon
                                iconPosition="left" // Icon position (left, right)
                                iconSize={ 20 } // Icon size
                                size="medium" // Button size (small, medium, large)
                                // style={{height: '100%'}} // Custom styles
                                className={processing=='processing'?'button-processing':'' } // Custom class name (button-processing)                  
                                variant="primary"
                                onClick={ sendEmail }
                            >
                                {
                                    processing == 'processing' ? __( "Sending...", "plugin-starter" ) : __( "Send", "plugin-starter" )
                                }
                            </Button> 
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
export default withForm(HideLogin);