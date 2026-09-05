/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { Hero } from '@headstartwp/component-library/hero';
import { UniversalBlockRenderer } from '@headstartwp/block-primitives/renderer';

/**
 * Edit component.
 * See https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-edit-save/#edit
 *
 * @param {object}   props                  The block props.
 * @param {object}   props.attributes       Block attributes.
 * @param {string}   props.attributes.title Custom title to be displayed.
 * @param {string}   props.className        Class name for the block.
 * @param {Function} props.setAttributes    Sets the value for block attributes.
 * @returns {Function} Render the edit screen
 */
const ExampleBlockEdit = () => {
	const blockProps = useBlockProps();

	return (
		<div {...blockProps}>
			<UniversalBlockRenderer component={Hero} />
		</div>
	);
};
export default ExampleBlockEdit;
