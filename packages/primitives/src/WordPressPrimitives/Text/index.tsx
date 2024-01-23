import { useCallback } from 'react';
import { RichText } from '@wordpress/block-editor';
import { useDispatch } from '@wordpress/data';
import { TextPrimitive } from '../../Primitives/Text';

const ALLOWED_RICH_TEXT_FORMATS = [
	'core/bold',
	'core/italic',
	'core/superscript',
	'core/subscript',
	'core/paragraph',
];

export const Text = ({
	as = 'div',
	className,
	value,
	editorPlaceholder,
	editorAttributeName,
	editorClientId,
	editorValue = value,
}: TextPrimitive) => {
	const { updateBlockAttributes } = useDispatch('core/block-editor');
	const handleOnChange = useCallback(
		(updatedValue) => {
			if (!editorAttributeName) {
				return;
			}
			updateBlockAttributes(editorClientId, { [editorAttributeName]: updatedValue });
		},
		[editorAttributeName, editorClientId, updateBlockAttributes],
	);

	return (
		<RichText
			allowedFormats={ALLOWED_RICH_TEXT_FORMATS}
			className={className}
			onChange={handleOnChange}
			placeholder={editorPlaceholder}
			tagName={as}
			value={editorValue}
		/>
	);
};
