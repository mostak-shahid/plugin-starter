import { __ } from "@wordpress/i18n";
import {IconSetting,IconLikeThumb,IconCloud,IconPlusCircle,IconUser,} from '@douyinfe/semi-icons';
export const baseMenu = [
    {
        itemKey: "page",
        text: __("Page", "plugin-starter"),
        description: __("Page", "plugin-starter"),
        url: "/settings/page",
        icon: <IconUser />,
        items: [
            {
                itemKey: "page-1",
                text: __("Page 1", "plugin-starter"),
                description: __("Page 1", "plugin-starter"),
                url: "/settings/page/page-1",
            },
            {
                itemKey: "page-2",
                text: __("Page 2", "plugin-starter"),
                description: __("Page 2", "plugin-starter"),
                url: "/settings/page/page-2",
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
