import { __ } from '@wordpress/i18n';
import { useEffect, useState } from 'react';
import './MediaUploaderControl.scss';
import { Dashicon } from '@wordpress/components';

import { Row, Col, Typography, Select, Input, InputGroup, Skeleton, Avatar, Button } from '@douyinfe/semi-ui';
export default function MediaUploaderControl({ data={}, name, handleChange, options={}, className='' }) {    
    const [media, setMedia] = useState({});

    useEffect(()=> {
        setMedia(data)
    },[data])
    const runUploader = (event) => {
        let frame
        event.preventDefault()

        // If the media frame already exists, reopen it.
        if (frame) {
            frame.open()
            return
        }

        // Create a new media frame
        frame = wp.media({
            title: options?.frame?.title || __("Select or Upload Image", "plugin-starter"),
            button: {
                text: options?.buttons?.select || __("Use this image", "plugin-starter"),
            },
            multiple: false, // Set to true to allow multiple files to be selected
            library: options?.library || {type: 'image'},
        })
        frame.on("open", function() {
			let selection = frame.state().get('selection');
			let attachment = wp.media.attachment(media?.id);
			selection.add(attachment ? [attachment] : []);
			/*
			let ids = []; // array of IDs of previously selected files. You're gonna build it dynamically
			ids.forEach(function(id) {
			  let attachment = wp.media.attachment(id);
			  selection.add(attachment ? [attachment] : []);
			}); // would be probably a good idea to check if it is indeed a non-empty array
			*/
		});
        frame.on("select", function(){
            var media = frame.state().get("selection").first().toJSON();
            // console.log(media);
            var thumbnail = (media?.sizes?.thumbnail?.url)?media.sizes.thumbnail.url:(media?.sizes?.full?.url)?media.sizes.full.url:media.thumb.src;
            setMedia({id:media.id, url:media.url, thumbnail:thumbnail});
            handleChange(name, {id:media.id, url:media.url, thumbnail:thumbnail});
        });	

        // Finally, open the modal on click
        frame.open()
    }
    const removeImage  = (event) => {
        event.preventDefault();
        setMedia({id:0, url:''});
        handleChange(name, {id:0, url:'', thumbnail:''});
    }
    return (
        <>
            {/* {console.log(data)} */}
            <div className={`plugin-starter-media-uploader-unit ${className}`}>
                <Row type="flex" gutter={[16, 16]} align='middle' className="media-uploader">
                    <Col xs={12}>
                        { media?.url && media?.id ?                     
                            <div className="file-name background-primary with-close-button">
                                <img className="uploaded-image" src={media?.thumbnail} onClick={runUploader} />                                
                                <Dashicon className="plugin-starter-remove-image text-danger" onClick={removeImage} icon="remove" />
                            </div> : 
                            <div className="file-name background-primary d-flex align-items-center justify-content-center" onClick={runUploader}>
                                <div className="no-media-wrap">
                                    <div className="img-wrap">
                                        <Dashicon icon="cloud-upload" />
                                    </div>  
                                    <div className="text-wrap">
                                        <span className="title">{__("Upload Media", "plugin-starter")}</span>
                                        <span className="sub-title">{__("Use the upload button", "plugin-starter")} <br/> {__("and select media  ", "plugin-starter")}</span>
                                    </div> 

                                </div>
                            </div>
                        }
                    </Col>
                    <Col xs={12}>
                        <div className="file-detail">
                            <InputGroup>
                                <Button
                                    theme="solid"
                                    type="primary"
                                    onClick={ runUploader }
                                >
                                    {options?.buttons?.upload || __("Upload Image", "plugin-starter")}
                                </Button>    
                                <Button
                                    theme="solid"
                                    type="secondary"
                                    onClick={ removeImage }
                                    className='ml-2'
                                >
                                    {options?.buttons?.remove || __("Remove Image", "plugin-starter")}
                                </Button>                                           
                            </InputGroup>    
                            <div className="file-link mt-2">                                                                     
                                <Input
                                    value={ media?.url? media.url:'' }
                                    readonly={true}
                                    // onChange={ ( value ) => setClassName( value ) }
                                />
                                <input type="hidden" value={media?.id? media.id:''} readOnly/>
                                {
                                    options?.message?.info && 
                                    <div className="input-help mt-small"  dangerouslySetInnerHTML={{__html: options.message.info}} />
                                }                                    
                            </div>         
                        </div> 
                    </Col>                   
                </Row>
            </div>
        </>        
    )
}
/*
// Uses
<MediaUploaderControl 
    data={settingData?.elements?.advanced?.media_uploader} 
    name='elements.advanced.media_uploader' 
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
*/