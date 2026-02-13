import { __ } from "@wordpress/i18n";
import apiFetch from '@wordpress/api-fetch';
import { useEffect, useState } from 'react';
import { PluginCard } from "../../components";
import Details from '../../data/details.json';
import './Dashboard.scss';
import { FullWidthLayout } from '../../layouts';
import * as Bootstrap from 'react-bootstrap';
const { Card, Row, Col } = Bootstrap;

export default function Dashboard() {
    const [plugins, setPlugins] = useState([]);
    const [pluginsLoading, setPluginsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlugins = async () => {
            try {
                const response = await apiFetch({ path: `/plugin-starter/v1/plugins` });
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
        <FullWidthLayout>
            <div className="">
                <Card className="mb-4 rounded-0">
                    <Card.Body>
                        <h2 className="mb-3">{__(`Welcome to ${Details?.name}`, "plugin-starter")}</h2>
                        <p className="mb-2">
                            {__("Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste mollitia voluptates molestiae nihil! Atque repellendus, nulla, aut magni in, sunt optio labore commodi at ipsa voluptatibus provident eveniet perferendis consequuntur.", "plugin-starter")}
                        </p>
                        <p className="mb-0">
                            {__("Plugin Starter is an all-in-one toolkit to enhance your WooCommerce store. This is a highly effective plugin developed for assisting online businesses in improving sales and profits.", "plugin-starter")}
                        </p>
                    </Card.Body>
                </Card>

                <Row className="g-4">
                    <Col lg={8}>
                        <Card className="dashboard-features-card mb-4 rounded-0">
                            <Card.Header>{__("Features", "plugin-starter")}</Card.Header>
                            <Card.Body>
                                <p className="mb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto blanditiis repudiandae quod, aliquam laborum dolores aliquid dolorem alias ratione facere ab enim unde et, tempore repellendus molestias quaerat neque, reiciendis voluptate quas necessitatibus. Tenetur quos laudantium, magnam totam excepturi id incidunt aspernatur corporis ducimus pariatur omnis dolorum minus explicabo iusto veniam inventore cupiditate provident eum laborum. Quibusdam rem neque maiores fugiat, unde similique saepe expedita natus dolor est pariatur tempore excepturi soluta maxime voluptate facere cupiditate fugit modi enim accusantium? Dignissimos magni, ut, sit deserunt eaque in ea modi autem cum, ex beatae similique aperiam obcaecati eius eligendi perferendis quasi.</p>
                                <p className="mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi modi libero repellat optio dolor sunt in ipsam dicta numquam quas magnam nam quidem praesentium vitae quod earum, qui iusto consectetur repellendus exercitationem eligendi tempore tenetur commodi labore! Tempora aspernatur ducimus odit nihil rem veniam dignissimos a officia id, voluptate perspiciatis!</p>
                                <p className="mb-0">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum, rerum labore? Doloribus eaque exercitationem eligendi odio! Maiores voluptatum soluta voluptatem distinctio quos blanditiis consectetur ea?</p>
                            </Card.Body>
                        </Card>

                        <Card className="mb-4 rounded-0">
                            <Card.Header>{__("Extend Your Website", "plugin-starter")}</Card.Header>
                            <Card.Body>
                                <Row className="g-3">
                                    {pluginsLoading ? (
                                        <div>loading...</div>
                                    ) : (
                                        plugins.map((plugin, index) => (
                                            plugin?.slug !== 'plugin-starter' && (
                                                <Col lg={12} key={index}>
                                                    <PluginCard 
                                                        image={plugin.icons['1x']} 
                                                        name={plugin.name} 
                                                        intro={plugin.short_description} 
                                                        author={plugin.author}
                                                        plugin_source='internal'
                                                        plugin_slug={plugin.slug} 
                                                        plugin_file={`${plugin.file}/${plugin.slug}`} 
                                                        download_url={plugin.download_link}
                                                        version={plugin.version}
                                                        rating={plugin.rating}
                                                        num_ratings={plugin.num_ratings}
                                                        active_installs={plugin.active_installs}
                                                        tested={plugin.tested}
                                                    /> 
                                                </Col> 
                                            )
                                        ))
                                    )}
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={4}>
                        <Card className="mb-4 rounded-0">
                            <Card.Header>{__("VIP Priority Support", "plugin-starter")}</Card.Header>
                            <Card.Body>
                                <p className="mb-2">{__("Faster and exclusive support service designed for VIP assistance and benefits.", "plugin-starter")}</p>
                                <a href="https://semi.design/" target="_blank" rel="noopener noreferrer">{__("Support", "plugin-starter")}</a>
                            </Card.Body>
                        </Card>

                        <Card className="mb-4 rounded-0">
                            <Card.Header>{__("Help Center", "plugin-starter")}</Card.Header>
                            <Card.Body>
                                <p className="mb-2">{__("Faster and exclusive support service designed for VIP assistance and benefits.", "plugin-starter")}</p>
                                <a href="https://semi.design/" target="_blank" rel="noopener noreferrer">{__("Help", "plugin-starter")}</a>
                            </Card.Body>
                        </Card>
                        
                        <Card className="mb-4 rounded-0">
                            <Card.Header>{__("Join the Community", "plugin-starter")}</Card.Header>
                            <Card.Body>
                                <p className="mb-2">{__("Got a question about the plugin, want to share your awesome project or just say hi? Join our wonderful community!", "plugin-starter")}</p>
                                <a href="https://semi.design/" target="_blank" rel="noopener noreferrer">{__("Join", "plugin-starter")}</a>
                            </Card.Body>
                        </Card>

                        <Card className="rounded-0">
                            <Card.Header>{__("Rate Us", "plugin-starter")}</Card.Header>
                            <Card.Body>
                                <p className="mb-2">{__("We love to hear from you, we would appreciate every single review.", "plugin-starter")}</p>
                                <a href="https://semi.design/" target="_blank" rel="noopener noreferrer">{__("Rate", "plugin-starter")}</a>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </FullWidthLayout>
    );
}
