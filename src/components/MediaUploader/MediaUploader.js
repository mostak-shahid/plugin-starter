import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
// import removeMedia from '../../assets/images/removeMedia.svg';
// import uploadMedia from '../../assets/images/uploadMedia.svg';
import {Button} from 'react-bootstrap';

// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Import the specific solid home icon
import { faCloudArrowUp, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import './MediaUploader.css';
export default function MediaUploader({ 
    defaultValues, 
    name, 
    onChange = () => {}, 
    options={} 
}) {    
    const [media, setMedia] = useState({});

    useEffect(()=> {
        setMedia(defaultValues)
    },[defaultValues])
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
            var thumbnail = (media.sizes.thumbnail.url)?media.sizes.thumbnail.url:media.url;
            // console.log(media);
            setMedia(media);
            // setMedia({id:media.id, url:media.url});
            onChange(media);
        });	

        // Finally, open the modal on click
        frame.open()
    }
    const removeImage  = (event) => {
        event.preventDefault();
        setMedia({});
        onChange({});
    }
    return (
        <>
            <div className="plugin-starter-media-uploader-unit">
                <div className="media-uploader p-2 bg-white border rounded-2">
                    { media?.url && media?.id ?                     
                        <div className="file-name with-close-button position-relative">
                            <img 
                                className="uploaded-image w-100 img-fluid" 
                                src={media?.sizes?.thumbnail?.url? media.sizes.thumbnail.url:media.url} onClick={runUploader} 
                            />
                            <FontAwesomeIcon 
                                className="remove-image-icon position-absolute text-danger" 
                                icon={faCircleXmark} 
                                onClick={removeImage} 
                            />
                        </div> : 
                        <div className="file-name file-name-without-image d-flex align-items-center justify-content-center py-4 border rounded-2" onClick={runUploader}>
                            <div className="no-media-wrap text-center">
                                <div className="img-wrap">
                                    {/* <img className="uploaded-image" src={uploadMedia} /> */}
                                    <FontAwesomeIcon className="uploaded-image-icon" icon={faCloudArrowUp} />
                                </div>  
                                <div className="text-wrap">
                                    <span className="title">{__("Upload Media", "plugin-starter")}</span>
                                    <span className="sub-title">{__("Use the upload button", "plugin-starter")} <br/> {__("and select media  ", "plugin-starter")}</span>
                                </div> 

                            </div>
                        </div>
                    }
                    <div className="file-detail mt-2">
                        <div className="button-wrapper d-flex gap-2">
                            <Button
                                variant="primary"
                                className='w-100'
                                onClick={runUploader}
                            >
                                {options?.buttons?.upload || __("Upload Media", "plugin-starter")}
                            </Button>   
                            <Button
                                variant="danger"
                                className='w-100'
                                onClick={removeImage}
                            >
                                {options?.buttons?.remove || __("Remove", "plugin-starter")}
                            </Button>                            
                        </div>
                    </div>                    
                </div>
            </div>
        </>        
    )
}
/*
// Uses
<MediaUploader 
    defaultValues={settingData?.elements?.advanced?.media_uploader} 
    name='elements.advanced.media_uploader' 
    onChange={onChange}
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