import React from 'react';
import { RichText as GutenbergRichText } from '@wordpress/block-editor';
import { RichTextPrimitive } from '#shared/types.js';
import { useBlockPrimitiveProps } from './hooks/useBlockPrimitiveProps.js';

export const RichText = <T extends keyof HTMLElementTagNameMap>({
	onPrimitiveChange,
	name,
	value,
	...rest
}: RichTextPrimitive<T>) => {
	const { attributes, setAttributes } = useBlockPrimitiveProps();

	const defaultOnPrimitive = (_name, _value, _setAttributes) =>
		_setAttributes({ [_name]: _value });
	const _onPrimitiveChange = onPrimitiveChange ?? defaultOnPrimitive;

	const onChange = (value) => {
		if (attributes) {
			_onPrimitiveChange(name, value, setAttributes, attributes);
		}
	};

	return (
		<GutenbergRichText
			onChange={onChange}
			value={!attributes ? '' : attributes[name] ?? value}
			{...rest}
		/>
	);
};
