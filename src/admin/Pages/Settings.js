import { Button, Notice } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
    NavLink,
    useLocation
} from "react-router-dom";

import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ImageTemplate from '../Templates/ImageTemplate';
import SettingsTemplate from '../Templates/SettingsTemplate';
const nonce = document.getElementById('nonce-field');
function useQuery() {
	const { search } = useLocation();
	return React.useMemo( () => new URLSearchParams( search ), [ search ] );
}
export default function Settings({data, setData}) {
    const query = useQuery();    
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(options);
        wp.apiFetch({
            path: '/plugin_starter/v1/options',
            method: 'POST',
            data: {
                'plugin_starter_options': data
            },
        }).then(data => {
            setSuccess('Options saved successfully!');
            /*
            const toastId = 'plugin-starter-toast-id';
			if ( ! toast.isActive( toastId ) ) {
				toast.success( __( 'Changes applied.', 'upgrade-store' ), {
					toastId,
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'colored',
					// transition: Bounce,
				} );
			}
            */
        });
    };
    const MENU = [
		{
			'name': __('Posts', 'plugin-starter'),
			'slug': 'posts',
			'children': [
				{
					'name': __('Draft', 'plugin-starter'),
					'slug': 'draft-posts',
				},
				{
					'name': __('Trash', 'plugin-starter'),
					'slug': 'trash-posts',
				},
				{
					'name': __('Scheduled', 'plugin-starter'),
					'slug': 'scheduled-posts',
				},
			],
		},
		{
			'name': __('Elements', 'plugin-starter'),
			'slug': 'elements'
		},
		{
			'name': __('Image', 'plugin-starter'),
			'slug': 'image'
		},
		{
			'name': __('Settings', 'plugin-starter'),
			'slug': 'settings'
		},
	];
    return (
        <section className="settings-page-wrap">
            <Container fluid="fluid">
                <div className="content-part">
                    <Row className="justify-content-lg-center">
                        <Col className="col-lg-8">
                            <div className="notices-box">
                                {error && (
                                    <Notice status="error" onRemove={() => setError('')}>
                                        {error}
                                    </Notice>
                                )}
                                {success && (
                                    <Notice status="success" onRemove={() => setSuccess('')}>
                                        {success}
                                    </Notice>
                                )}
                            </div>
                            <div className="settings-box">
                                <div className="d-flex">
                                    <div className="nav-area">
                                        <ul className="options-menu d-flex flex-column">
                                            {MENU.map((item, index) => (
                                                // console.log(item.name)
                                                <li key={index}>
                                                    <NavLink
                                                        to={`?page=plugin-starter&path=${item.slug}`}
                                                        className={ ( { isActive } ) =>
                                                            [
                                                                'plugin-starter-nav-tab',
                                                                `${item.slug}-link`,
                                                                isActive && query.get( 'path' ) === item.slug
                                                                    ? 'nav-tab-active-link'
                                                                    : '',

                                                                item?.children?.length && 
                                                                    item.children.map((item, index) => (
                                                                        query.get( 'path' ) === item.slug ? ' nav-tab-active-link ':' '
                                                                            // ' nav-tab-active-link ' : ''
                                                                            // console.log(item.slug)
                                                                            // console.log(query.get( 'path' ))
                                                                    ))
                                                                    
                                                            ].join( ' ' )
                                                        }
                                                    >
                                                        {item.name}
                                                    </NavLink>
                                                    {
                                                        item?.children?.length && 
                                                        <ul>
                                                            {item.children.map((item, index) => (
                                                                <li>
                                                                    <NavLink
                                                                        to={`?page=plugin-starter&path=${item.slug}`}
                                                                        className={ ( { isActive } ) =>
                                                                            [
                                                                                'plugin-starter-nav-tab',
                                                                                `${item.slug}-link`,
                                                                                isActive && query.get( 'path' ) === item.slug
                                                                                    ? 'nav-tab-active-link'
                                                                                    : '',
                                                                            ].join( ' ' )
                                                                        }
                                                                    >
                                                                        {item.name}
                                                                    </NavLink>
                                                                </li>

                                                            ))}
                                                        </ul>
                                                    }
                                                    
                                                </li>
                                            ))} 
                                        </ul>
                                    </div>
                                    <div className="options-area">
                                        {query.get( 'path' ) === 'posts' ?
                                            <form>
                                                This section is for posts
                                            </form>:
                                                <form className="d-flex flex-column h-100" onSubmit={handleSubmit}>  
                                                {
                                                    query.get( 'path' ) === 'image' &&
                                                    <ImageTemplate data={data} setData={setData} />
                                                } 
                                                {
                                                    query.get( 'path' ) === 'settings' &&
                                                    <SettingsTemplate data={data} setData={setData}/>
                                                }                                  
                                                
                                                <div className="save-button mt-auto">
                                                    <Button isPrimary type="submit" className="button button-primary">
                                                    {__('Save settings', 'plugin-starter')}
                                                    </Button>
                                                </div>                                            
                                            </form> 
                                        }
                                                                                   
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
            {/* {console.log(typeof data)}
            {console.log(Object.keys(data))}
            {console.log(Object.values(data))}
            {console.log(Object.entries(data))} */}
        </section>
    )
}
