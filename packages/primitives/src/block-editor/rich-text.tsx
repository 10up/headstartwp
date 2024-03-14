import { RichText as GutenbergRichText } from '@wordpress/block-editor';
import { RichTextPrimitive } from '#shared/types.js';
import { useBlockPrimitiveProps } from './block.js';

const RichText = <T extends keyof HTMLElementTagNameMap>({
	onPrimitiveChange,
	name,
	value,
	...rest
}: RichTextPrimitive<T>) => {
	const { attributes, setAttributes } = useBlockPrimitiveProps();

	const defaultOnPrimitive = (_name, _value, _setAttributes) =>
		_setAttributes({ [_name]: _value });
	const _onPrimitiveChange = onPrimitiveChange ?? defaultOnPrimitive;

	const onChange = (value) => _onPrimitiveChange(name, value, setAttributes, attributes);

	return <GutenbergRichText onChange={onChange} value={attributes[name] ?? value} {...rest} />;
};

export default RichText;
