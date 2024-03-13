import { RichText as GutenbergRichText } from '@wordpress/block-editor';
import { RichTextPrimitive } from '#shared/types.js';
import { useBlockPrimitiveProps } from './block.js';

const RichText = <T extends keyof HTMLElementTagNameMap>({
	onPrimitiveChange,
	...rest
}: RichTextPrimitive<T>) => {
	const { attributes, setAttributes } = useBlockPrimitiveProps();

	const defaultOnPrimitive = () => {};
	const _onPrimitiveChange = onPrimitiveChange ?? defaultOnPrimitive;

	const onChange = (value) => _onPrimitiveChange(attributes, setAttributes, value);

	return <GutenbergRichText onChange={onChange} {...rest} />;
};

export default RichText;
