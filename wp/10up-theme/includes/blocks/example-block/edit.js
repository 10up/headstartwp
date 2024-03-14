/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
// eslint-disable-next-line import/no-unresolved
import RichText from '@headstartwp/blocks-primitives/rich-text';
// eslint-disable-next-line import/no-unresolved
import Block from '@headstartwp/blocks-primitives/block';

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
const ExampleBlockEdit = (props) => {
	const { attributes, setAttributes } = props;
	const { title } = attributes;

	const blockProps = useBlockProps();

	return (
		<div {...blockProps}>
			<Block attributes={attributes} setAttributes={setAttributes}>
				<RichText
					className="wp-block-example-block__title"
					tagName="h2"
					placeholder={__('Custom Title')}
					name="title"
					value={title}
				/>
			</Block>
		</div>
	);
};
export default ExampleBlockEdit;
