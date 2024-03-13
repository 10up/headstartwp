import type { RichText } from '@wordpress/block-editor';

export interface RichTextPrimitive<T extends keyof HTMLElementTagNameMap>
	extends Omit<RichText.Props<T>, 'onChange'> {
	onPrimitiveChange?: (
		attributes: Record<string, any>,
		setAttributes: (attributes: Record<string, any>) => void,
		value: string,
	) => void;
}
