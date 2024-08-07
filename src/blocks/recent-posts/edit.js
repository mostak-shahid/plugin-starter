import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	__experimentalNumberControl as NumberControl,
	PanelBody,
	PanelRow
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import './editor.scss';
export default function Edit({attributes, setAttributes}) {
	const { 
		numberOfItems, 
		columns, 
		displayExcerpt, 
		displayDate, 
		displayThumbnail, 
		displayAuthorInfo, 
		showAvatar, 
		avatarSize, 
		showBio 
	} = attributes;
	const blockProps = useBlockProps();
	const posts = useSelect( ( select ) => {
		return select( 'core' ).getEntityRecords( 'postType', 'post', {
			'per_page': numberOfItems
		});
	}, [numberOfItems] );
	//console.log(numberOfItems);
	return (
		<>
		<InspectorControls>
			<PanelBody title={ __( 'Content Settings', 'author-plugin' ) }>
				<PanelRow>
					<p><strong>Number of posts: </strong></p>
					<NumberControl
						min={ 1 }
						max={ 10 }
						value={ numberOfItems }
						onChange={ ( value ) =>
							setAttributes( { numberOfItems: value } )
						}
					/>
				</PanelRow>
			</PanelBody>
		</InspectorControls>
		<div { ...blockProps }>
			{/* <ServerSideRender
				block="create-block/plugin-starter-recent-post"
                attributes={ attributes }
            /> */}
			<ul>
			{ ! posts && 'Loading...' }
			{ posts && posts.length === 0 && '<li>No Posts</li>' }
			{ posts && posts.length > 0 && posts.map( ( post ) => {					
				return (
					<li key={ post.id }>
						<a href="{post.link}">{post.title.rendered}</a>
					</li>
				)
			})}
			</ul>
		</div>
		</>
	);
}
