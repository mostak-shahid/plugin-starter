import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './edit';
import save from './save';
import './style.scss';
registerBlockType( metadata.name, {
	"attributes": {
		"alignment": {
            "type": 'string',
            "default": 'none',
        },
		"backgroundType": {
			"type": "string",
            "default": "color"
		},
		"backgroundColor": {
			"type": "string",
            "default": ""
		},
		"backgroundImage": {
			"type": "string",
            "default": ""
		},
		"backgroundPosition": {
			"type": "string",
            "default": ""
		},
		"backgroundSize": {
			"type": "string",
            "default": ""
		},
		"backgroundRepeat": {
			"type": "string",
            "default": ""
		},
		"backgroundOrigin": {
			"type": "string",
            "default": ""
		},
		"backgroundClip": {
			"type": "string",
            "default": ""
		},
		"backgroundAttachment": {
			"type": "string",
            "default": ""
		},
		"backgroundVideoURL": {
			"type": "string",
            "default": ""
		},
		"backgroundVideoMp4": {
			"type": "string",
            "default": ""
		},
		"backgroundVideoOgv": {
			"type": "string",
            "default": ""
		},
		"backgroundVideoWebm": {
			"type": "string",
            "default": ""
		},
		"backgroundOverlay": {
			"type": "string",
            "default": ""
		},
		"backgroundOverlayOpacity": {
			"type": "string",
            "default": ""
		},
	},
	supports: {
		align: ['wide', 'full']
	},
	edit: Edit,
	save,
} );
