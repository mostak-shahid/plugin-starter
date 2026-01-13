import { __ } from "@wordpress/i18n";
import apiFetch from '@wordpress/api-fetch';
import { useEffect, useState } from 'react';
import {PluginCard} from "../../components";
import Details from '../../data/details.json';
import './Dashboard.scss';
// import {
//     Card,
//     CardHeader,
//     CardBody,
// } from '@wordpress/components';
import { Typography, Card, Col, Row  } from '@douyinfe/semi-ui';
export default function Dashboard() {
    const { Text, Paragraph, Title } = Typography;
    const [plugins, setPlugins] = useState([]);
    const [pluginsLoading, setPluginsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchPlugins = async () => {
        try {
            // const response = await apiFetch({ path: 'https://raw.githubusercontent.com/mostak-shahid/update/refs/heads/master/plugin-details.json' });
            const response = await apiFetch({ path: `/plugin-starter/v1/plugins` });
            // 
            setPlugins(response.plugins);
        } catch (error) {
            setError('Error fetching plugin data:', error);
        } finally {
            setPluginsLoading(false);
        }
        };
        fetchPlugins();
    }, []);
    
    return (
        <div className="plugin-starter-settings container mx-auto p-6">
            <Card
                className="mb-6"
            >
                <Title heading={2}>{__(`Welcome to ${Details?.name}`, "plugin-starter")}</Title>
                <Paragraph>
                    {__("Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste mollitia voluptates molestiae nihil! Atque repellendus, nulla, aut magni in, sunt optio labore commodi at ipsa voluptatibus provident eveniet perferendis consequuntur.", "plugin-starter")}
                </Paragraph>
                <Paragraph>
                    {__("Plugin Starter is an all-in-one toolkit to enhance your WooCommerce store. This is a highly effective plugin developed for assisting online businesses in improving sales and profits.", "plugin-starter")}
                </Paragraph>
            </Card>
            <Row type="flex" gutter={[24,24]}>
                <Col lg={16}>
                    <Card 
                        title={__("Features", "plugin-starter")}
                        className="dashboard-features-card mb-6"
                    >
                        {/* {Object.values(settingsMenu).map((feature, index) => (
                            <div className="feature" key={index}>
                                <Title heading={4}>{feature?.title}</Title>
                                <Paragraph>{feature?.description}</Paragraph>
                            </div>
                        ))} */}
                        {/* {settingsMenu.map((feature) => (
                            <div className="feature" key={feature.itemKey}>
                                <Title heading={4}>{feature.text}</Title>
                                {feature.description && (
                                    <Paragraph>{feature.description}</Paragraph>
                                )}
                            </div>
                        ))} */}
                        <Paragraph>login details, as a time line</Paragraph>
                        <Paragraph>Traffic Log</Paragraph>
                        <Paragraph>LLM Bot Tracker</Paragraph>
                    </Card>
                    <Card 
                        title={__("Extend Your Website", "plugin-starter")}
                        className=""
                    >
                        <Row type="flex" gutter={[16, 24]}>
                            {
                                pluginsLoading 
                                ? 
                                <div>                                    
                                    loading...
                                </div>
                                : <>
                                {/* {Object.entries(plugins).map(([slug, plugin]) => ( 
                                    <div className="col-lg-6">
                                        <PluginCard 
                                            key={slug} 
                                            image={plugin.image} 
                                            name={plugin.name} 
                                            intro={plugin.intro} 
                                            plugin_source={plugin.source} 
                                            plugin_slug={slug} 
                                            plugin_file={plugin.file} 
                                            download_url={plugin.download}
                                        /> 
                                    </div> 
                                    ))
                                } */}
                                {plugins.map((plugin, index) => ( 
                                    <Col lg={12} key={index}>
                                        {/* {console.log(plugin)} */}
                                        <PluginCard 
                                            key={plugin.slug} 
                                            image={plugin.icons['1x']} 
                                            name={plugin.name} 
                                            intro={plugin.short_description} 
                                            plugin_source='internal'
                                            plugin_slug={plugin.slug} 
                                            plugin_file={`${plugin.file}/${plugin.slug}`} 
                                            download_url={plugin.download_link}
                                            version={plugin.version}
                                        /> 
                                    </Col> 
                                    ))
                                }
                                </>
                            }
                        </Row>
                    </Card>
                </Col>
                <Col lg={8}>
                    <Card 
                        className="mb-6"
                        title={__("VIP Priority Support", "plugin-starter")}
                    >
                        <Paragraph>
                            {__("Faster and exclusive support service designed for VIP assistance and benefits.", "plugin-starter")}                                    
                        </Paragraph>
                        <Text link={{ href: 'https://semi.design/', target:"_blank" }}>{__("Support", "plugin-starter")}</Text>
                    </Card>

                    <Card 
                        className="mb-6"
                        title={__("Help Center", "plugin-starter")}
                    >
                        <Paragraph>
                            {__("Faster and exclusive support service designed for VIP assistance and benefits.", "plugin-starter")}                                    
                        </Paragraph>
                        <Text link={{ href: 'https://semi.design/', target:"_blank" }}>{__("Help", "plugin-starter")}</Text>
                    </Card>
                    
                    <Card 
                        className="mb-6"
                        title={__("Join the Community", "plugin-starter")}  
                    >                   
                        <Paragraph>
                            {__("Got a question about the plugin, want to share your awesome project or just say hi? Join our wonderful community!", "plugin-starter")}                                    
                        </Paragraph>
                        <Text link={{ href: 'https://semi.design/', target:"_blank" }}>
                            {__("Join", "plugin-starter")}
                        </Text>                            
                    </Card>
                    <Card
                        title={__("Rate Us", "plugin-starter")} 
                    >
                        <Paragraph>
                            {__("We love to hear from you, we would appreciate every single review.", "plugin-starter")}                                    
                        </Paragraph>
                        <Text link={{ href: 'https://semi.design/', target:"_blank" }}>
                            {__("Rate", "plugin-starter")}
                        </Text>                            
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
