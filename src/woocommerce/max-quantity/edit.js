/**
 * External dependencies
 */
import { useWooBlockProps } from '@woocommerce/block-templates';

/**
 *  📝We prefix modules with __experimental when they are still at an early
 *  stage of development and subject to breaking changes.
 *
 */
import {
	__experimentalNumberControl as NumberControl,
	__experimentalUseProductEntityProp as useProductEntityProp,
} from '@woocommerce/product-editor';

/**
 *  📝We will need __ since we want to be able to support translations
 *  in our labels
 */
import { __, sprintf } from '@wordpress/i18n';

//wp-content/plugins/plugin-starter/src/min-quantity/edit.tsx
//Add the following lines to your min - quantity block edit.tsx file, inside the Edit function:

import { useValidation } from '@woocommerce/product-editor';
import { useEffect } from 'react';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 */
export default function Edit( { attributes } ) {
	console.log(attributes);
	/**
	 * React hook that is used to mark the block wrapper element.
	 * It provides all the necessary props like the class name.
	 *
	 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
	 */
	const blockProps = useWooBlockProps( attributes );
	/**
	 *  📝 Note that by passing the "meta_data." prefix to the useProductEntityProp
	 *  parameter, we can automatically persist fields in the postmeta table.
	 *
	 */
	const [ value, setValue ] =
		useProductEntityProp( 'meta_data.max_qty' );

	const [ minQty ] = useProductEntityProp( 'meta_data.min_qty' );

	const { error, validate } = useValidation(
		'meta_data.max_qty',

		async function validator() {
			const valueParsed = parseFloat( value || '' );
			const minQtyParsed = parseFloat( minQty || '' );
			if ( valueParsed < minQtyParsed ) {
				return sprintf(
					// translators: %d is the minimum value of the number input.
					__( 'Value must be greater than %d', 'plugin-starter' ),
					minQtyParsed
				);
			}
		},

		[ value, minQty ]
	);

	useEffect( () => {
		validate();
	}, [ value, minQty ] );

	/**
	 * It is important to pass the blockProps to the root div: that way, the div
	 * will contain all props that are required to identify it as
	 *  a block, and also CSS classes.
	 *
	 */
	return (
		<div { ...blockProps }>
			<NumberControl
				label={ __( 'Maximum Quantity', 'plugin-starter' ) }
				error={ error }
				value={ value || '' }
				onChange={ setValue }
			/>
		</div>
	);
}
