import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './edit';
import save from './save';
import './style.scss';
registerBlockType( metadata.name, {
	"attributes": {
		"numberOfItems": {
			"type": "number",
			"default": 3
		},
		"columns": {
			"type": "number",
			"default": 1
		},
		"displayDate": {
			"type": "boolean",
			"default": true
		},
		"displayExcerpt": {
			"type": "boolean",
			"default": true
		},
		"displayThumbnail": {
			"type": "boolean",
			"default": true
		},
		"displayAuthorInfo": {
			"type": "boolean",
			"default": true
		},
		"showAvatar": {
			"type": "boolean",
			"default": true
		}, 
		"avatarSize": {
			"type": "number",
			"default": 48
		},
		"showBio": {
			"type": "boolean",
			"default": true
		}
	},
    edit: Edit,
	save,
} );