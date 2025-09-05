import { __ } from '@wordpress/i18n';
import { useEffect, useState } from 'react';
import removeMedia from '../../assets/images/removeMedia.svg';
import uploadMedia from '../../assets/images/uploadMedia.svg';
import './MediaUploader.scss';
export default function MediaUploader({ data, name, handleChange, options={} }) {    
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
            var image = frame.state().get("selection").first().toJSON();
            var thumbnail = (image.sizes.thumbnail.url)?image.sizes.thumbnail.url:image.url;
            // console.log(image);
            setMedia({id:image.id, url:image.url});
            handleChange(name, {id:image.id, url:image.url});
        });	

        // Finally, open the modal on click
        frame.open()
    }
    const removeImage  = (event) => {
        event.preventDefault();
        setMedia({id:0, url:''});
        handleChange(name, {id:0, url:''});
    }
    return (
        <>
            {/* {console.log(data)} */}
            <div className="plugin-starter-media-uploader-unit">
                <div className="media-uploader row align-items-center">
                    <div className="col-6">
                        { media?.url && media?.id ?                     
                            <div className="file-name background-primary with-close-button">
                                <img className="uploaded-image" src={media?.sizes?.thumbnail?.url? media.sizes.thumbnail.url:media.url} onClick={runUploader} />
                                <img className="plugin-starter-remove-image" onClick={removeImage} src={removeMedia} alt="" />
                            </div> : 
                            <div className="file-name background-primary d-flex align-items-center justify-content-center" onClick={runUploader}>
                                <div className="no-media-wrap">
                                    <div className="img-wrap">
                                        <img className="uploaded-image" src={uploadMedia} />
                                    </div>  
                                    <div className="text-wrap">
                                        <span className="title">{__("Upload Image", "plugin-starter")}</span>
                                        <span className="sub-title">{__("Use the upload button", "plugin-starter")} <br/> {__("and select media  ", "plugin-starter")}</span>
                                    </div> 

                                </div>
                            </div>
                        }
                    </div>
                    <div className="col-6">
                        <div className="file-detail">
                            <div className="button-wrapper d-flex flex-column gap-2">
                                <button type="button" className="button button-primary" onClick={runUploader}>
                                    {options?.buttons?.upload || __("Upload Image", "plugin-starter")}
                                </button>                        
                                <button type="button" className="button button-secondary" onClick={removeImage}>
                                    {options?.buttons?.remove || __("Remove", "plugin-starter")}
                                </button>  
                                <div className="file-link">
                                    <label>                                    
                                        <input type="text" value={media?.url? media.url:''} readOnly style={{maxWidth: '100%'}} />
                                        <input type="hidden" value={media?.id? media.id:''} readOnly/>
                                        {
                                            options?.message?.info && 
                                            <div className="input-help mt-small"  dangerouslySetInnerHTML={{__html: options.message.info}} />
                                        }
                                    </label>
                                </div>                                                  
                            </div>
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