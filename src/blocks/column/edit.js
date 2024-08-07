import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import './editor.scss';
export default function Edit() {
	return (
		<div { ...useBlockProps() }>
			{/* <p  className='mos-placeholder-text'>Type / to choose a block</p> */}
			<InnerBlocks />
		</div>
	);
}
