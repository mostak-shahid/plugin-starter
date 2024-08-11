import { __ } from '@wordpress/i18n';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Card from '../Molecules/Card';
import imageSupport from '../assets/images/get-5-star-support.svg';
import imageJoin from '../assets/images/join-the-community.svg';
import imageRate from '../assets/images/rate-us.svg';
// import imageWelcomeFeature from '../assets/images/welcome-feature-image.svg';
// import imageWelcomeHeader from '../assets/images/welcome-plugin-starter.svg';



export default function Home() {
    return (
        <section className="settings-page-wrap">
            <Container fluid="fluid">
                <div className="content-part">
                    <Row>
                        <Col className="col-lg-8 col-12 left-content mb-4 mb-lg-0">
                            <Card
                            // className="custom-class"      
                            header = {{
                                imgBox: {
                                    className: 'gap-4',
                                    title: __('Welcome to Plugin starter', 'plugin-starter'),
                                    content: __('We designed Plugin starter to be intuitive but we do recommend learning how it works by Checking our comprehensive documentation and watching the video below. Enjoy your time with Spectra!', 'plugin-starter'),
                                    // img: imageWelcomeHeader
                                }
                            }}
                            body = {{
                                // html: `<div class="text-center"><img class="img-fluid" src="${imageWelcomeFeature}" /></div>`
                                html: `<div class="text-center">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum recusandae doloremque voluptatibus beatae dolorem, mollitia vitae illum est similique? Minus mollitia totam fugit magnam iste fugiat illo ab numquam reprehenderit possimus aspernatur commodi non est deleniti laborum ipsam incidunt tempore molestias beatae quo consectetur dolorem necessitatibus, odio placeat. Voluptates est temporibus minus placeat reiciendis quis dignissimos labore hic, ipsum cumque, iusto, ut ullam perspiciatis deleniti dolor debitis dolorem doloribus culpa quisquam. Voluptatibus enim consectetur ipsam ipsa soluta laborum laudantium recusandae nostrum odit expedita consequatur, dolores nisi id dolore sequi voluptas ex. Perspiciatis aliquam eum fugit doloremque sunt laborum ipsa cumque, ipsum reiciendis repellat consequatur molestias animi dolorum nobis quas blanditiis explicabo corporis cum laboriosam nostrum aperiam est corrupti distinctio ullam. Tempore labore delectus debitis, laborum, et ut saepe deserunt dicta perspiciatis voluptatem quaerat praesentium facilis, qui a! Aut atque obcaecati nihil maxime ea labore modi, repudiandae laboriosam, eaque nulla recusandae?</div>`
                            }}
                            footer = {{
                                cta: {
                                    content: __('Enjoyed Plugin starter ? Please leave us a rating. We really appreciate your support!', 'plugin-starter'),
                                    btn: [
                                        {
                                            'url': '#',
                                            'title': __('Create New Page', 'plugin-starter'),
                                            'className': 'theme-button-solid theme-button-solid-blue',
                                        },
                                        {
                                            'url': '#',
                                            'title': __('Visit Our Website', 'plugin-starter')
                                        },
                                    ]
                                }
                            }}
                            />
                        </Col>
                        <Col className="col-lg-4 col-12 right-content">
                            <Card
                            // className="custom-class"      
                            body = {{
                                imgBox: {
                                    className: 'gap-3',
                                    title: __('Get 5-star Support', 'plugin-starter'),
                                    content: __('Need some help? Our awesome support team is here to help you with any question you have.', 'plugin-starter'),
                                    img: imageSupport,
                                    btn: [
                                        {
                                            'url': '#',
                                            'title': __('Get Support', 'plugin-starter')
                                        }
                                    ]
                                }
                            }}
                            />
                            <Card
                            // className="custom-class"      
                            body = {{
                                imgBox: {
                                    className: 'gap-3',
                                    title: __('Join the Community', 'plugin-starter'),
                                    content: __('Got a question about the plugin, want to share your awesome project or just say hi? Join our wonderful community!'),
                                    img: imageJoin,
                                    btn: [
                                        {
                                            'url': '#',
                                            'title': __('Get Support', 'plugin-starter')
                                        }
                                    ]
                                }
                            }}
                            />
                            <Card
                            // className="custom-class"      
                            body = {{
                                imgBox: {
                                    className: 'gap-3',
                                    title: __('Rate Us', 'plugin-starter'),
                                    content: __('We love to hear from you, we would appreciate your every single review.', 'plugin-starter'),
                                    img: imageRate,
                                    btn: [
                                        {
                                            'url': '#',
                                            'title': __('Get Support', 'plugin-starter')
                                        }
                                    ]
                                }
                            }}
                            />
                            
                        </Col>
                    </Row>
                </div>
            </Container>
        </section>
    )
};
