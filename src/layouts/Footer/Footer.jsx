import { __ } from "@wordpress/i18n";
import logo from '../../assets/images/logo.svg';
import Details from '../../data/details.json';
export default function Footer() {
    return (
        <>               
            <div className="plugin-starter-footer pb-3">
                <div className="container">
                    <div className="row align-items-center justify-content-between">
                        <div className="col-lg-6 text-center text-lg-start product-by">
                            <div className="d-flex align-items-center gap-2 justify-content-center justify-content-lg-start">
                                <img src={logo} alt="" width="30" height="30" />
                                <span>{Details?.name}</span>
                            </div>
                        </div>
                        <div className="col-lg-6 mt-3 mt-lg-0 text-center text-lg-end product-version">
                            {Details?.version} {__( 'Core', "mos-faqs" )}
                        </div>
                    </div>                       
                </div>
            </div>    
        </>
    )
}