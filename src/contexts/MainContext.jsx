import { __ } from '@wordpress/i18n';
// import axios from "axios";
import { createContext, useContext, useState } from "react";
// import { extractJSONFromHTML } from "../lib/Helpers";
// import menuData from "../data/pages.json"; // Load menu JSON
const MainContext = createContext();
const settingsMenu = {
    "base_input": { 
        "title": __( "Base Input", "plugin-starter" ), 
        "description": __( "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam quisquam non velit recusandae maxime, soluta labore id dignissimos tenetur, vitae nesciunt? Aspernatur nemo velit veniam adipisci obcaecati impedit alias, officiis hic ratione perspiciatis, quo molestiae expedita? Aliquam, quam dolorem? Similique enim minus error tempore necessitatibus dolorum quidem modi maiores suscipit.", "plugin-starter" ), 
        "url":"/settings/base_input"
    },
    'array_input': {
        "title": __( "Array Input", "plugin-starter" ),
        "description": __( "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam quisquam non velit recusandae maxime, soluta labore id dignissimos tenetur, vitae nesciunt? Aspernatur nemo velit veniam adipisci obcaecati impedit alias, officiis hic ratione perspiciatis, quo molestiae expedita? Aliquam, quam dolorem? Similique enim minus error tempore necessitatibus dolorum quidem modi maiores suscipit.", "plugin-starter" ), 
        "url":"/settings/array_input",
    },
    "components": { 
        "title": __( "Components", "plugin-starter" ), 
        "url":"/settings/components",      
        "sub": {
            "basic" : {
                "title": __( "Basic", "plugin-starter" ),                
                "url":"/settings/components/basic",
            },
            "advanced" : {
                "title": __( "Advanced", "plugin-starter" ),
                "url":"/settings/components/advanced",
                "sub": {
                    "advanced-1" : {
                        "title": __( "Advanced 1", "plugin-starter" ),                
                        "url":"/settings/components/advanced/advanced-1",
                    },
                    "advanced-2" : {
                        "title": __( "Advanced 2", "plugin-starter" ),
                        "url":"/settings/components/advanced/advanced-2",                        
                    }
                }
            }
        }
    },
    "import_export": { 
        "title": __( "Import & Expport", "plugin-starter" ), 
        "description": __( "Import and Export your settings.", "plugin-starter" ), 
        "url":"/settings/import_export"
    },
    "more": { 
        "title": __( "More", "plugin-starter" ), 
        "description": __( "Adding more features to your Store.", "plugin-starter" ), 
        "url":"/settings/more"
    },
    "feedback": { 
        "title": __( "Feedback", "plugin-starter" ), 
        "description": __( "We\'re constantly enhancing our product, and your feedback is key to staying ahead of the curve and delivering a stronger, more reliable security solution for you.", "plugin-starter" ), 
        "url":"/settings/feedback"
    },
};


export const MainProvider = ({ children }) => {
    const [settingData, setSettingData] = useState({});
    const [settingLoading, setSettingLoading] = useState(true);
    const [settingReload, setSettingReload] = useState(true);
    return (
        <MainContext.Provider
            value={{
                settingData, 
                setSettingData,
                settingLoading,
                setSettingLoading,
                settingsMenu,
                settingReload, 
                setSettingReload
            }}
        >
            {children}
            {/* {console.log('settingData from contex API', settingData)} */}
        </MainContext.Provider>
    );
};

export const useMain = () => useContext(MainContext);
