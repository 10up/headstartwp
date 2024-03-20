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

export type ImagePrimitiveValue = {
	id: number;
	url: string;
	alt: string;
};

export interface ImagePrimitive extends Omit<MediaReplaceFlow, 'onSelect'> {
	name: string;
	title?: string;
	value?: ImagePrimitiveValue;
	onPrimitiveSelect?: (
		name: string,
		value: Parameters<MediaReplaceFlow['onSelect']>['0'],
		setAttributes: SetAttributes,
		attributes: Attributes,
	) => void;
}

export interface RichTextPrimitive<T extends keyof HTMLElementTagNameMap>
	extends Omit<RichText.Props<T>, 'onChange' | 'value'> {
	name: string;
	value?: string;
	onPrimitiveChange?: (
		name: string,
		value: string,
		setAttributes: SetAttributes,
		attributes: Attributes,
	) => void;
}
