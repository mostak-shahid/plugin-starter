import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import './editor.scss';
const MOS_TEMPLATE = [
	// ["core/image", {}],
	// ["core/heading", {placeholder: "Giveway Title"}],
	// ["core/paragraph", {placeholder: "Giveway Description"}],
	// Custom block for Social Media!
	['create-block/plugin-starter-column'],
	// ["core/button", {placeholder: "Call to Action"}],
]
const ALLOWED_BLOCKS = ['create-block/plugin-starter-column'];
export default function Edit() {
	return (
		<div { ...useBlockProps() }>
			<InnerBlocks template={MOS_TEMPLATE} allowedBlocks={ ALLOWED_BLOCKS }/> {/*templateLock="all/insert"*/}
		</div>
	);
}
