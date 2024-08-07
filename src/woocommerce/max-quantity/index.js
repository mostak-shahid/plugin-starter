// import { BlockConfiguration, registerBlockType } from '@wordpress/blocks';
import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './edit';
import './editor.scss'; // see https://www.npmjs.com/package/@wordpress/scripts#using-css

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType( metadata.name, {
	...metadata,
	/**
	 * @see ./edit.js
	 */
	edit: Edit,
} );
// registerBlockType( metadata.name, {	
// 	edit : () => {return (
// 		<div>Still Working</div>
// 	)}
// });
