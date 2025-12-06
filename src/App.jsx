import React, { Suspense, useState, useEffect } from "react";
import { __ } from "@wordpress/i18n";
import { MenuProvider } from "./contexts/MenuContext";
import { baseMenu } from "./data/baseMenu";
import YourMenuRenderer from "./YourMenuRenderer";

const ProMenuComponent = React.lazy(() => import("pluginstarterpro/MenuItems"));
const RemoteLoginForm = React.lazy(() => import("pluginstarterpro/LoginForm"));

export default function App() {
    const [proItems, setProItems] = useState([]);
    const [remoteItems, setRemoteItems] = useState([]);

    // Load MF remote menu array (NOT the React component)
    useEffect(() => {
        if (plugin_starter_ajax_obj?.isPro) {
            import("pluginstarterpro/MenuItems")
                .then((mod) => {
                    setProItems(mod.default || []);
                })
                .catch(() => {
                    console.warn("Pro menu could not be loaded.");
                    setProItems([]);
                });
        }
    }, []);

    // Optional: load remote injected menu items
    useEffect(() => {
        if (plugin_starter_ajax_obj?.extraMenuItems) {
            setRemoteItems(plugin_starter_ajax_obj.extraMenuItems);
        }
    }, []);

    return (
        <MenuProvider baseMenu={baseMenu} proItems={proItems} remoteItems={remoteItems}>
            <YourMenuRenderer />
            {plugin_starter_ajax_obj?.isPro &&
                <Suspense fallback={<div>{__("Loading remote component...", "plugin-starter")}</div>}>
                    <RemoteLoginForm />
                </Suspense>
            }
        </MenuProvider>
    );
}
