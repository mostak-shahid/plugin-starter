import { __ } from '@wordpress/i18n';
// import apiFetch from "@wordpress/api-fetch";
import { createContext, useContext, useState } from "react";

import {
    IconWrench,
    IconEyeClosedSolid,
    IconKey,
    IconSetting,
    IconLikeThumb,
    IconCloud,
    IconPlusCircle,
    IconUser,
    IconUserSetting,
} from '@douyinfe/semi-icons';

const MainContext = createContext();
const settingsMenu = [
    {
        itemKey: "customizer",
        text: __("Customizer", "plugin-starter"),
        description: __(
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam quisquam non velit recusandae maxime, soluta labore id dignissimos tenetur, vitae nesciunt? Aspernatur nemo velit veniam adipisci obcaecati impedit alias, officiis hic ratione perspiciatis, quo molestiae expedita? Aliquam, quam dolorem? Similique enim minus error tempore necessitatibus dolorum quidem modi maiores suscipit.",
            "plugin-starter"
        ),
        url: "/settings/customizer",
        icon: <IconWrench />,
        items: [
        {
            itemKey: "redesign",
            text: __("Redesign", "plugin-starter"),
            description: null,
            url: "/settings/customizer/redesign",
            icon: null,
            items: [
            {
                itemKey: "templates",
                text: __("Default Templates", "plugin-starter"),
                description: __("Choose Theme", "plugin-starter"),
                url: "/settings/customizer/redesign/templates",
            },
            {
                itemKey: "background",
                text: __("Background", "plugin-starter"),
                description: null,
                url: "/settings/customizer/redesign/background",
            },
            {
                itemKey: "logo",
                text: __("Logo", "plugin-starter"),
                description: __("Customize Your Logo Section", "plugin-starter"),
                url: "/settings/customizer/redesign/logo",
            },
            {
                itemKey: "form",
                text: __("Form", "plugin-starter"),
                description: null,
                url: "/settings/customizer/redesign/form",
            },
            {
                itemKey: "fields",
                text: __("Fields", "plugin-starter"),
                description: null,
                url: "/settings/customizer/redesign/fields",
            },
            {
                itemKey: "button",
                text: __("Button", "plugin-starter"),
                description: null,
                url: "/settings/customizer/redesign/button",
            },
            {
                itemKey: "other",
                text: __("Other", "plugin-starter"),
                description: null,
                url: "/settings/customizer/redesign/other",
            },
            ],
        },
        ],
    },

    {
        itemKey: "hide_login",
        text: __("Hide Login", "plugin-starter"),
        description: __("Hide your login page", "plugin-starter"),
        url: "/settings/hide_login",
        icon: <IconEyeClosedSolid />,
    },

    {
        itemKey: "two_fa_authentication",
        text: __("2FA Authentication", "plugin-starter"),
        description: __(
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam quisquam non velit recusandae maxime, soluta labore id dignissimos tenetur, vitae nesciunt? Aspernatur nemo velit veniam adipisci obcaecati impedit alias, officiis hic ratione perspiciatis, quo molestiae expedita? Aliquam, quam dolorem? Similique enim minus error tempore necessitatibus dolorum quidem modi maiores suscipit.",
        "plugin-starter"
        ),
        url: "/settings/two_fa_authentication",
        icon: <IconKey />,
    },

    {
        itemKey: "captcha",
        text: __("Captcha", "plugin-starter"),
        description: __("Captcha Settings", "plugin-starter"),
        url: "/settings/captcha",
        icon: <IconUserSetting />,
    },

    {
        itemKey: "auto_login",
        text: __("Auto Login", "plugin-starter"),
        description: __("Auto Login", "plugin-starter"),
        url: "/settings/auto_login",
        icon: <IconUser />,
        items: [
        {
            itemKey: "link_login",
            text: __("Link Login", "plugin-starter"),
            description: __("Link Login", "plugin-starter"),
            url: "/settings/auto_login/link_login",
        },
        {
            itemKey: "settings",
            text: __("Settings", "plugin-starter"),
            description: __("Auto Login Settings", "plugin-starter"),
            url: "/settings/auto_login/settings",
        },
        ],
    },

    {
        itemKey: "import_export",
        text: __("Import & Expport", "plugin-starter"),
        description: __("Import and Export your settings.", "plugin-starter"),
        url: "/settings/import_export",
        icon: <IconCloud />,
    },

    {
        itemKey: "more",
        text: __("More", "plugin-starter"),
        description: __("Adding more features to your Store.", "plugin-starter"),
        url: "/settings/more",
        icon: <IconPlusCircle />,
    },

    {
        itemKey: "tools",
        text: __("Tools", "plugin-starter"),
        description: __("Adding more features to your Store.", "plugin-starter"),
        url: "/settings/tools",
        icon: <IconSetting />,
    },

    {
        itemKey: "feedback",
        text: __("Feedback", "plugin-starter"),
        description: __(
        "We're constantly enhancing our product, and your feedback is key to staying ahead of the curve and delivering a stronger, more reliable security solution for you.",
        "plugin-starter"
        ),
        url: "/feedback",
        icon: <IconLikeThumb />,
    },
];


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
