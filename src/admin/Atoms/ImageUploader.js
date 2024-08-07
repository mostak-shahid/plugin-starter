import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState } from 'react';
import { Col, Image, Row } from 'react-bootstrap';
export default function ImageUploader({className, data, updateField, path}) {    
    const [media, setMedia] = useState({...data});
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
            title: __('Select or Upload Media Of Your Chosen Persuasion', 'plugin-starter'),
            button: {
                text: __('Use this media', 'plugin-starter'),
            },
            multiple: false, // Set to true to allow multiple files to be selected
            library: {type: 'image'},
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
            var image = frame.state().get("selection").first().toJSON();
            var thumbnail = (image.sizes.thumbnail.url)?image.sizes.thumbnail.url:image.url;
            // console.log(image);
            setMedia(image);
            updateField(path, image);
        });	

        // Finally, open the modal on click
        frame.open()
    }
    const removeImage  = (event) => {
        event.preventDefault();
        updateField(path, []);
        setMedia([]);
    }
    return (
        // <div className="media-uploader-unit">
        <div 
            className={
                [
                    'media-uploader-unit',
                    className
                ].join( ' ' )
            }
        >
            <div className="media-uploader">
                <Row className="align-items-center">
                    <Col className='col-6'>
                        { Object.keys(media).length ?                     
                            <div className="file-name with-close-button">
                                <Image src={media?.sizes?.thumbnail?.url? media.sizes.thumbnail.url:media.url} />
                                <span className="plugin-starter-remove-image" onClick={removeImage}>{__('Remove Image', 'plugin-starter')}</span>
                            </div> : 
                            <div className="file-name">
                                <Image src="/wp-content/plugins/plugin-starter/admin/images/no_image_available.png" />
                            </div>
                        }
                    </Col>
                    <Col className='col-6'>
                        <div className="file-detail">
                            <div className="upload-help-text"><p dangerouslySetInnerHTML={{__html: 'Size: Optional <br> File Support: jpg, .jpeg, . gif, or .png.'}} /></div>
                            <Button isPrimary type="button" className="button button-primary" onClick={runUploader}>
                                {__('Upload Image', 'plugin-starter')}
                            </Button>
                        </div>
                    </Col>
                </Row>
                {/* {console.log(media)} */}
                {/* {console.log(data)} */}
                {/* {console.log(Object.keys(media).length)} */}
                
            </div>
        </div>
    )
}
