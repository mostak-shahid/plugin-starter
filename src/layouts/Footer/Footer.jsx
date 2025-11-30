import { __ } from "@wordpress/i18n";
import Details from '../../data/details.json';
export default function Footer() {
    return (
        <>               
            <div className="plugin-starterfooter pb-3">
                <div className="container">
                    <div className="row align-items-center justify-content-between">
                        <div className="col-lg-6 mb-3 mb-lg-0 product-by">
                            <div className="d-flex align-items-center gap-2">                                
                                <img src={`${plugin_starter_ajax_obj.image_url}logo.svg`} alt="" width="30" height="30" />
                                <span>{Details?.name}</span>
                            </div>
                        </div>
                        <div className="col-lg-6 text-end product-version">
                            {Details?.version} {__( 'Core', "plugin-starter" )}
                        </div>
                    </div>                       
                </div>
            </div>    
        </>
    )
}