import { HeadlessConfig } from '@headstartwp/core';
import type { Dropdown } from '@wordpress/components';

export type Attributes = Record<string, any>;
export type SetAttributes = (attributes: Attributes) => void;

/**
 * Props for Gutenberg's RichText and InnerBlocks components.
 *
 * `@wordpress/block-editor` ships no type declarations for its root export --
 * its `build-types` folder only covers `components` and `utils`. The namespace
 * types these interfaces used to extend came from
 * `@types/wordpress__block-editor`, which targets the WP 6.x generation and is
 * no longer installed.
 *
 * These list the props this library actually passes through. An index
 * signature is deliberately NOT used: `Omit<T, K>` over a type with one
 * collapses `keyof T` to `string`, discarding every declared property and
 * making them all `unknown`.
 */
export interface GutenbergRichTextProps<T extends keyof HTMLElementTagNameMap> {
	tagName?: T;
	value?: string;
	onChange?: (value: string) => void;
	placeholder?: string;
	className?: string;
	identifier?: string;
	allowedFormats?: string[];
	withoutInteractiveFormatting?: boolean;
	preserveWhiteSpace?: boolean;
	disableLineBreaks?: boolean;
	onReplace?: (blocks: unknown[]) => void;
	onMerge?: (forward: boolean) => void;
	onRemove?: (forward: boolean) => void;
	onSplit?: (value: string, isOriginal?: boolean) => unknown;
}

export interface GutenbergInnerBlocksProps {
	allowedBlocks?: string[];
	template?: unknown[];
	templateLock?: 'all' | 'insert' | 'contentOnly' | false;
	templateInsertUpdatesSelection?: boolean;
	renderAppender?: false | (() => React.ReactNode);
	orientation?: 'horizontal' | 'vertical';
	placeholder?: React.ReactNode;
	defaultBlock?: Record<string, unknown>;
	directInsert?: boolean;
}

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
	popoverProps?: React.ComponentProps<typeof Dropdown>['popoverProps'];
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

	/**
	 * The image title
	 */
	title: string;

	/**
	 * The width of the image
	 */
	width: number;

	/**
	 * The height of the image
	 */
	height: number;

	sizes: Record<string, { url: string; width: number; height: number; orientantion: string }>;
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
	 * Which size to use
	 */
	size?: string;

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
	extends Omit<GutenbergRichTextProps<T>, 'onChange' | 'value'> {
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

// copied from 10up block components

export interface LinkPrimitiveValue {
	url: string;
	opensInNewTab?: boolean;
	title?: string;
	text?: string;
	type?: string;
	kind?: string;
}

export interface LinkProps {
	name: string;
	value?: LinkPrimitiveValue;
	placeholder?: string;
	className?: string;
	replace?: boolean;
	scroll?: boolean;
	prefetch?: boolean | null;
	linkSettings?: {
		sourceUrl?: string;
		hostUrl?: string;
	};
}

export interface InnerBlocksProps extends GutenbergInnerBlocksProps {
	children?: React.ReactNode;
	className?: string;
}

export interface UniversalBlock<T extends Record<string, any> = Record<string, any>> {
	children?: React.ReactNode;
	attributes: {
		[k in keyof T]: T[k];
	};
	settings?: HeadlessConfig;
	themeJSON?: Record<string, any>;
}
