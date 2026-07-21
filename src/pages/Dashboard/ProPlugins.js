import { useState, useEffect } from '@wordpress/element';
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";

export default function ProPlugins() {

    const [plugins, setPlugins] = useState([]);
    if (plugin_starter_ajax_obj?.isPro === '1') {
        useEffect(() => {
            const fetchPlugins = async () => {
                try {
                    const results = await apiFetch({
                        path: `/plugin-starter-pro/v1/plugins`,
                        method: 'GET'
                    });
                    console.log(results);
                    setPlugins(results.plugins)
                } catch (err) {
                    console.error('API error:', err);
                }
            };
            fetchPlugins();
        }, []);
    }
    const [ProPluginCard, setProPluginCard] = useState(null);

    
        useEffect(() => {
            // Check if the Pro version has loaded its global component hook
            if (window.PluginStarterProComponents && window.PluginStarterProComponents.PluginCard) {
                setProPluginCard(() => window.PluginStarterProComponents.PluginCard);
            }
        }, []);
    return (
        <div>
        
                        <div className='container'>
                            <div className='row'>
                                {ProPluginCard && plugins.map((plugin) => (
                                    <div className='col-6 mb-3' key={plugin.slug}>
                                        <ProPluginCard
                                            image={plugin.icons['2x']}
                                            name={plugin.name}
                                            short_description={plugin.short_description}
                                            author={plugin.author}
                                            plugin_source='internal'
                                            plugin_slug={plugin.slug}
                                            plugin_file={`${plugin.slug}/${plugin.slug}.php`}
                                            download_url={plugin.download_link}
                                            version={plugin.version}
                                            rating={plugin.rating}
                                            num_ratings={plugin.num_ratings}
                                            active_installs={plugin.active_installs}
                                            tested={plugin.tested}
                                        />
                                    </div>
                                ))}
        
                            </div>
                        </div>
        </div>
    )
}
