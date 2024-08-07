import {
	AlignmentToolbar,
	BlockControls, InnerBlocks, InspectorControls, useBlockProps
} from '@wordpress/block-editor';
import {
	PanelBody,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import './editor.scss';
export default function Edit({attributes, setAttributes}) {
	const { backgroundType, alignment } = attributes;
	//console.log(attributes);
	return (
		<>
			<InspectorControls>
				<PanelBody>
					<ToggleGroupControl 
						label="my label" 
						value={backgroundType}
						onChange={ ( value ) =>
							setAttributes( { backgroundType: value } )
						}
						>
						<ToggleGroupControlOption value="color" label="Color" />
						<ToggleGroupControlOption value="image" label="Image" />
						<ToggleGroupControlOption value="gradient" label="Gradient" />
						<ToggleGroupControlOption value="video" label="Video" />
					</ToggleGroupControl>
				</PanelBody>
			</InspectorControls>
			{
				<BlockControls>
					<AlignmentToolbar
						value={ alignment }
						onChange={ ( value ) =>
							setAttributes( { alignment: value } )
						}
					/>
				</BlockControls>
			}
			<section { ...useBlockProps() }>
				<InnerBlocks />
			</section>
		</>
	);
}
