import type { RichText } from '@wordpress/block-editor';

export interface RichTextPrimitive<T extends keyof HTMLElementTagNameMap>
	extends Omit<RichText.Props<T>, 'onChange' | 'value'> {
	name: string;
	value?: string;
	onPrimitiveChange?: (
		name: string,
		value: string,
		setAttributes: (attributes: Record<string, any>) => void,
		attributes: Record<string, any>,
	) => void;
}
