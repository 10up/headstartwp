import type { RichText } from '@wordpress/block-editor';
import type { DropdownProps } from '@wordpress/components/build-types/dropdown/types.js';

export type Attributes = Record<string, any>;
export type SetAttributes = (attributes: Attributes) => void;

export type MediaReplaceFlow = {
	mediaURL: string;
	mediaId?: number;
	mediaIds?: number[];
	allowedTypes: string[];
	accept: string[] | string;
	onError?: (err: string) => void;
	onSelect: (media: ImagePrimitiveValue) => void;
	onSelectURL?: (newUrl: string) => void;
	onToggleFeaturedImage?: () => void;
	useFeaturedImage?: () => void;
	onFilesUpload?: (files: any) => void;
	name?: string | React.ReactNode;
	createNotice?: () => void;
	removeNotice?: () => void;
	children?: React.ReactNode;
	multiple?: boolean;
	addToGallery?: boolean;
	handleUpload?: boolean;
	popoverProps?: DropdownProps['popoverProps'];
};

/**
 * Represents an image stored with {@link ImagePrimitive}
 */
export type ImagePrimitiveValue = {
	/**
	 * Image ID
	 */
	id: number;

	/**
	 * Image URL
	 */
	url: string;

	/**
	 * Image alt text
	 */
	alt: string;
};

/**
 * The ImagePrimitive interface
 */
export interface ImagePrimitive extends Omit<MediaReplaceFlow, 'onSelect'> {
	/**
	 * The name of the attribute where image data should be stored
	 */
	name: string;

	/**
	 * The name/label of the toolbar control
	 */
	title?: string;

	/**
	 * The actual value
	 */
	value?: ImagePrimitiveValue;

	/**
	 * Optional custom onSelect handler
	 *
	 * @param name The name of the attribute
	 * @param media The media object
	 * @param setAttributes The setAttributes handler
	 * @param attributes The attributes object
	 *
	 */
	onPrimitiveSelect?: (
		name: string,
		media: Parameters<MediaReplaceFlow['onSelect']>['0'],
		setAttributes: SetAttributes,
		attributes: Attributes,
	) => void;
}

export interface RichTextPrimitive<T extends keyof HTMLElementTagNameMap>
	extends Omit<RichText.Props<T>, 'onChange' | 'value'> {
	/**
	 * The name of the attribute where image data should be stored
	 */
	name: string;

	/**
	 * The actual value
	 */
	value?: string;

	/**
	 * Optional custom onSelect handler
	 *
	 * @param name The name of the attribute
	 * @param value The value
	 * @param setAttributes The setAttributes handler
	 * @param attributes The attributes object
	 *
	 */
	onPrimitiveChange?: (
		name: string,
		value: string,
		setAttributes: SetAttributes,
		attributes: Attributes,
	) => void;
}

export interface GutenbergBlock<T extends Record<string, unknown>> {
	attributes: {
		[k in keyof T]: T[k];
	};
}
