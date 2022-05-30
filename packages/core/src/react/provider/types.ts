import React, { ReactNode } from 'react';
import type { HeadlessConfig } from '../../types';
import type { IImageBlock } from '../blocks/ImageBlock';

export type SettingsContextProps = {
	linkComponent?: ReactNode;
	imageComponent?: React.FC<IImageBlock>;
} & HeadlessConfig;

export type SettingsPropertiesComplete = SettingsProperties & {
	color?: SettingsProperties['color'];
	layout?: SettingsProperties['layout'];
	spacing?: SettingsProperties['spacing'];
	typography?: SettingsProperties['typography'];
	border?: SettingsProperties['border'];
	custom?: SettingsProperties['custom'];
};
export type StylesPropertiesComplete = StylesProperties & {
	border?: SettingsProperties['border'];
	color?: SettingsProperties['color'];
	spacing?: SettingsProperties['spacing'];
	typography?: SettingsProperties['typography'];
};
export type StylesPropertiesAndElementsComplete = StylesProperties & {
	border?: SettingsProperties['border'];
	color?: SettingsProperties['color'];
	spacing?: SettingsProperties['spacing'];
	typography?: SettingsProperties['typography'];
	elements?: StylesElementsPropertiesComplete;
};

export interface WpThemeJSON {
	/**
	 * JSON schema URI for theme.json.
	 */
	$schema?: string;
	/**
	 * Version of theme.json to use.
	 */
	version: 2;
	/**
	 * Settings for the block editor and individual blocks. These include things like:
	 * - Which customization options should be available to the user.
	 * - The default colors, font sizes... available to the user.
	 * - CSS custom properties and class names used in styles.
	 * - And the default layout of the editor (widths and available alignments).
	 */
	settings?: SettingsProperties & {
		color?: SettingsProperties['color'];
		layout?: SettingsProperties['layout'];
		spacing?: SettingsProperties['spacing'];
		typography?: SettingsProperties['typography'];
		border?: SettingsProperties['border'];
		custom?: SettingsProperties['custom'];
		/**
		 * Settings defined on a per-block basis.
		 */
		blocks?: {
			'core/archives'?: SettingsPropertiesComplete;
			'core/audio'?: SettingsPropertiesComplete;
			'core/block'?: SettingsPropertiesComplete;
			'core/button'?: SettingsPropertiesComplete;
			'core/buttons'?: SettingsPropertiesComplete;
			'core/calendar'?: SettingsPropertiesComplete;
			'core/categories'?: SettingsPropertiesComplete;
			'core/code'?: SettingsPropertiesComplete;
			'core/column'?: SettingsPropertiesComplete;
			'core/columns'?: SettingsPropertiesComplete;
			'core/comment-author-name'?: SettingsPropertiesComplete;
			'core/comment-author-avatar'?: SettingsPropertiesComplete;
			'core/comment-content'?: SettingsPropertiesComplete;
			'core/comment-date'?: SettingsPropertiesComplete;
			'core/comment-edit-link'?: SettingsPropertiesComplete;
			'core/comment-reply-link'?: SettingsPropertiesComplete;
			'core/comment-template'?: SettingsPropertiesComplete;
			'core/comments-query-loop'?: SettingsPropertiesComplete;
			'core/cover'?: SettingsPropertiesComplete;
			'core/embed'?: SettingsPropertiesComplete;
			'core/file'?: SettingsPropertiesComplete;
			'core/freeform'?: SettingsPropertiesComplete;
			'core/gallery'?: SettingsPropertiesComplete;
			'core/group'?: SettingsPropertiesComplete;
			'core/heading'?: SettingsPropertiesComplete;
			'core/home-link'?: SettingsPropertiesComplete;
			'core/html'?: SettingsPropertiesComplete;
			'core/image'?: SettingsPropertiesComplete;
			'core/latest-comments'?: SettingsPropertiesComplete;
			'core/latest-posts'?: SettingsPropertiesComplete;
			'core/list'?: SettingsPropertiesComplete;
			'core/loginout'?: SettingsPropertiesComplete;
			'core/media-text'?: SettingsPropertiesComplete;
			'core/missing'?: SettingsPropertiesComplete;
			'core/more'?: SettingsPropertiesComplete;
			'core/navigation'?: SettingsPropertiesComplete;
			'core/navigation-link'?: SettingsPropertiesComplete;
			'core/nextpage'?: SettingsPropertiesComplete;
			'core/page-list'?: SettingsPropertiesComplete;
			'core/paragraph'?: SettingsPropertiesComplete;
			'core/post-author'?: SettingsPropertiesComplete;
			'core/post-comments'?: SettingsPropertiesComplete;
			'core/post-comments-count'?: SettingsPropertiesComplete;
			'core/post-comments-form'?: SettingsPropertiesComplete;
			'core/post-comments-link'?: SettingsPropertiesComplete;
			'core/post-content'?: SettingsPropertiesComplete;
			'core/post-date'?: SettingsPropertiesComplete;
			'core/post-excerpt'?: SettingsPropertiesComplete;
			'core/post-featured-image'?: SettingsPropertiesComplete;
			'core/post-navigation-link'?: SettingsPropertiesComplete;
			'core/post-template'?: SettingsPropertiesComplete;
			'core/post-terms'?: SettingsPropertiesComplete;
			'core/post-title'?: SettingsPropertiesComplete;
			'core/preformatted'?: SettingsPropertiesComplete;
			'core/pullquote'?: SettingsPropertiesComplete;
			'core/query'?: SettingsPropertiesComplete;
			'core/query-pagination'?: SettingsPropertiesComplete;
			'core/query-pagination-next'?: SettingsPropertiesComplete;
			'core/query-pagination-numbers'?: SettingsPropertiesComplete;
			'core/query-pagination-previous'?: SettingsPropertiesComplete;
			'core/query-title'?: SettingsPropertiesComplete;
			'core/quote'?: SettingsPropertiesComplete;
			'core/rss'?: SettingsPropertiesComplete;
			'core/search'?: SettingsPropertiesComplete;
			'core/separator'?: SettingsPropertiesComplete;
			'core/shortcode'?: SettingsPropertiesComplete;
			'core/site-logo'?: SettingsPropertiesComplete;
			'core/site-tagline'?: SettingsPropertiesComplete;
			'core/site-title'?: SettingsPropertiesComplete;
			'core/social-link'?: SettingsPropertiesComplete;
			'core/social-links'?: SettingsPropertiesComplete;
			'core/spacer'?: SettingsPropertiesComplete;
			'core/table'?: SettingsPropertiesComplete;
			'core/table-of-contents'?: SettingsPropertiesComplete;
			'core/tag-cloud'?: SettingsPropertiesComplete;
			'core/template-part'?: SettingsPropertiesComplete;
			'core/term-description'?: SettingsPropertiesComplete;
			'core/text-columns'?: SettingsPropertiesComplete;
			'core/verse'?: SettingsPropertiesComplete;
			'core/video'?: SettingsPropertiesComplete;
			'core/widget-area'?: SettingsPropertiesComplete;
			'core/legacy-widget'?: SettingsPropertiesComplete;
			'core/widget-group'?: SettingsPropertiesComplete;
		};
	};
	/**
	 * Organized way to set CSS properties. Styles in the top-level will be added in the `body` selector.
	 */
	styles?: StylesProperties & {
		border?: unknown;
		color?: unknown;
		spacing?: unknown;
		typography?: unknown;
		/**
		 * Styles defined on a per-element basis using the element's selector.
		 */
		elements?: {
			link?: StylesPropertiesComplete;
			h1?: StylesPropertiesComplete;
			h2?: StylesPropertiesComplete;
			h3?: StylesPropertiesComplete;
			h4?: StylesPropertiesComplete;
			h5?: StylesPropertiesComplete;
			h6?: StylesPropertiesComplete;
		};
		/**
		 * Styles defined on a per-block basis using the block's selector.
		 */
		blocks?: {
			'core/archives'?: StylesPropertiesAndElementsComplete;
			'core/audio'?: StylesPropertiesAndElementsComplete;
			'core/block'?: StylesPropertiesAndElementsComplete;
			'core/button'?: StylesPropertiesAndElementsComplete;
			'core/buttons'?: StylesPropertiesAndElementsComplete;
			'core/calendar'?: StylesPropertiesAndElementsComplete;
			'core/categories'?: StylesPropertiesAndElementsComplete;
			'core/code'?: StylesPropertiesAndElementsComplete;
			'core/column'?: StylesPropertiesAndElementsComplete;
			'core/columns'?: StylesPropertiesAndElementsComplete;
			'core/comment-author-name'?: StylesPropertiesAndElementsComplete;
			'core/comment-author-avatar'?: StylesPropertiesAndElementsComplete;
			'core/comment-content'?: StylesPropertiesAndElementsComplete;
			'core/comment-date'?: StylesPropertiesAndElementsComplete;
			'core/comment-edit-link'?: StylesPropertiesAndElementsComplete;
			'core/comment-reply-link'?: StylesPropertiesAndElementsComplete;
			'core/comment-template'?: StylesPropertiesAndElementsComplete;
			'core/comments-query-loop'?: StylesPropertiesAndElementsComplete;
			'core/cover'?: StylesPropertiesAndElementsComplete;
			'core/embed'?: StylesPropertiesAndElementsComplete;
			'core/file'?: StylesPropertiesAndElementsComplete;
			'core/freeform'?: StylesPropertiesAndElementsComplete;
			'core/gallery'?: StylesPropertiesAndElementsComplete;
			'core/group'?: StylesPropertiesAndElementsComplete;
			'core/heading'?: StylesPropertiesAndElementsComplete;
			'core/home-link'?: StylesPropertiesAndElementsComplete;
			'core/html'?: StylesPropertiesAndElementsComplete;
			'core/image'?: StylesPropertiesAndElementsComplete;
			'core/latest-comments'?: StylesPropertiesAndElementsComplete;
			'core/latest-posts'?: StylesPropertiesAndElementsComplete;
			'core/list'?: StylesPropertiesAndElementsComplete;
			'core/loginout'?: StylesPropertiesAndElementsComplete;
			'core/media-text'?: StylesPropertiesAndElementsComplete;
			'core/missing'?: StylesPropertiesAndElementsComplete;
			'core/more'?: StylesPropertiesAndElementsComplete;
			'core/navigation'?: StylesPropertiesAndElementsComplete;
			'core/navigation-link'?: StylesPropertiesAndElementsComplete;
			'core/nextpage'?: StylesPropertiesAndElementsComplete;
			'core/page-list'?: StylesPropertiesAndElementsComplete;
			'core/paragraph'?: StylesPropertiesAndElementsComplete;
			'core/post-author'?: StylesPropertiesAndElementsComplete;
			'core/post-comments'?: StylesPropertiesAndElementsComplete;
			'core/post-comments-count'?: StylesPropertiesAndElementsComplete;
			'core/post-comments-form'?: StylesPropertiesAndElementsComplete;
			'core/post-comments-link'?: StylesPropertiesAndElementsComplete;
			'core/post-content'?: StylesPropertiesAndElementsComplete;
			'core/post-date'?: StylesPropertiesAndElementsComplete;
			'core/post-excerpt'?: StylesPropertiesAndElementsComplete;
			'core/post-featured-image'?: StylesPropertiesAndElementsComplete;
			'core/post-navigation-link'?: StylesPropertiesAndElementsComplete;
			'core/post-template'?: StylesPropertiesAndElementsComplete;
			'core/post-terms'?: StylesPropertiesAndElementsComplete;
			'core/post-title'?: StylesPropertiesAndElementsComplete;
			'core/preformatted'?: StylesPropertiesAndElementsComplete;
			'core/pullquote'?: StylesPropertiesAndElementsComplete;
			'core/query'?: StylesPropertiesAndElementsComplete;
			'core/query-pagination'?: StylesPropertiesAndElementsComplete;
			'core/query-pagination-next'?: StylesPropertiesAndElementsComplete;
			'core/query-pagination-numbers'?: StylesPropertiesAndElementsComplete;
			'core/query-pagination-previous'?: StylesPropertiesAndElementsComplete;
			'core/query-title'?: StylesPropertiesAndElementsComplete;
			'core/quote'?: StylesPropertiesAndElementsComplete;
			'core/rss'?: StylesPropertiesAndElementsComplete;
			'core/search'?: StylesPropertiesAndElementsComplete;
			'core/separator'?: StylesPropertiesAndElementsComplete;
			'core/shortcode'?: StylesPropertiesAndElementsComplete;
			'core/site-logo'?: StylesPropertiesAndElementsComplete;
			'core/site-tagline'?: StylesPropertiesAndElementsComplete;
			'core/site-title'?: StylesPropertiesAndElementsComplete;
			'core/social-link'?: StylesPropertiesAndElementsComplete;
			'core/social-links'?: StylesPropertiesAndElementsComplete;
			'core/spacer'?: StylesPropertiesAndElementsComplete;
			'core/table'?: StylesPropertiesAndElementsComplete;
			'core/table-of-contents'?: StylesPropertiesAndElementsComplete;
			'core/tag-cloud'?: StylesPropertiesAndElementsComplete;
			'core/template-part'?: StylesPropertiesAndElementsComplete;
			'core/term-description'?: StylesPropertiesAndElementsComplete;
			'core/text-columns'?: StylesPropertiesAndElementsComplete;
			'core/verse'?: StylesPropertiesAndElementsComplete;
			'core/video'?: StylesPropertiesAndElementsComplete;
			'core/widget-area'?: StylesPropertiesAndElementsComplete;
			'core/legacy-widget'?: StylesPropertiesAndElementsComplete;
			'core/widget-group'?: StylesPropertiesAndElementsComplete;
		};
	};
	/**
	 * Additional metadata for custom templates defined in the templates folder.
	 */
	customTemplates?: {
		/**
		 * Filename, without extension, of the template in the templates folder.
		 */
		name: string;
		/**
		 * Title of the template, translatable.
		 */
		title: string;
		/**
		 * List of post types that can use this custom template.
		 */
		postTypes?: string[];
	}[];
	/**
	 * Additional metadata for template parts defined in the parts folder.
	 */
	templateParts?: {
		/**
		 * Filename, without extension, of the template in the parts folder.
		 */
		name: string;
		/**
		 * Title of the template, translatable.
		 */
		title?: string;
		/**
		 * The area the template part is used for. Block variations for `header` and `footer` values exist and will be used when the area is set to one of those.
		 */
		area?: string;
	}[];
}

export type ThemeJSON = Pick<WpThemeJSON, 'styles' | 'settings'>;

export interface SettingsProperties {
	/**
	 * Setting that enables ui tools.
	 */
	appearanceTools?: boolean;
	/**
	 * Settings related to borders.
	 */
	border?: {
		/**
		 * Allow users to set custom border colors.
		 */
		color?: boolean;
		/**
		 * Allow users to set custom border radius.
		 */
		radius?: boolean;
		/**
		 * Allow users to set custom border styles.
		 */
		style?: boolean;
		/**
		 * Allow users to set custom border widths.
		 */
		width?: boolean;
	};
	/**
	 * Settings related to colors.
	 */
	color?: {
		/**
		 * Allow users to set background colors.
		 */
		background?: boolean;
		/**
		 * Allow users to select custom colors.
		 */
		custom?: boolean;
		/**
		 * Allow users to create custom duotone filters.
		 */
		customDuotone?: boolean;
		/**
		 * Allow users to create custom gradients.
		 */
		customGradient?: boolean;
		/**
		 * Allow users to choose colors from the default gradients.
		 */
		defaultGradients?: boolean;
		/**
		 * Allow users to choose colors from the default palette.
		 */
		defaultPalette?: boolean;
		/**
		 * Duotone presets for the duotone picker.
		 * Doesn't generate classes or properties.
		 */
		duotone?: {
			/**
			 * Name of the duotone preset, translatable.
			 */
			name: string;
			/**
			 * Kebab-case unique identifier for the duotone preset.
			 */
			slug: string;
			/**
			 * List of colors from dark to light.
			 */
			colors: string[];
		}[];
		/**
		 * Gradient presets for the gradient picker.
		 * Generates a single class (`.has-{slug}-background`) and custom property (`--wp--preset--gradient--{slug}`) per preset value.
		 */
		gradients?: {
			/**
			 * Name of the gradient preset, translatable.
			 */
			name: string;
			/**
			 * Kebab-case unique identifier for the gradient preset.
			 */
			slug: string;
			/**
			 * CSS gradient string.
			 */
			gradient: string;
		}[];
		/**
		 * Allow users to set link colors.
		 */
		link?: boolean;
		/**
		 * Color palette presets for the color picker.
		 * Generates three classes (`.has-{slug}-color`, `.has-{slug}-background-color`, and `.has-{slug}-border-color`) and a single custom property (`--wp--preset--color--{slug}`) per preset value.
		 */
		palette?: {
			/**
			 * Name of the color preset, translatable.
			 */
			name: string;
			/**
			 * Kebab-case unique identifier for the color preset.
			 */
			slug: string;
			/**
			 * CSS hex or rgb(a) string.
			 */
			color: string;
		}[];
		/**
		 * Allow users to set text colors.
		 */
		text?: boolean;
	};
	/**
	 * Settings related to layout.
	 */
	layout?: {
		/**
		 * Sets the max-width of the content.
		 */
		contentSize?: string;
		/**
		 * Sets the max-width of wide (`.alignwide`) content.
		 */
		wideSize?: string;
	};
	/**
	 * Settings related to spacing.
	 */
	spacing?: {
		/**
		 * Enables `--wp--style--block-gap` to be generated from styles.spacing.blockGap.
		 * A value of `null` instead of `false` further disables layout styles from being generated.
		 */
		blockGap?: boolean | null;
		/**
		 * Allow users to set a custom margin.
		 */
		margin?: boolean;
		/**
		 * Allow users to set a custom padding.
		 */
		padding?: boolean;
		/**
		 * List of units the user can use for spacing values.
		 */
		units?: string[];
	};
	/**
	 * Settings related to typography.
	 */
	typography?: {
		/**
		 * Allow users to set custom font sizes.
		 */
		customFontSize?: boolean;
		/**
		 * Allow users to set custom font styles.
		 */
		fontStyle?: boolean;
		/**
		 * Allow users to set custom font weights.
		 */
		fontWeight?: boolean;
		/**
		 * Allow users to set custom letter spacing.
		 */
		letterSpacing?: boolean;
		/**
		 * Allow users to set custom line height.
		 */
		lineHeight?: boolean;
		/**
		 * Allow users to set custom text decorations.
		 */
		textDecoration?: boolean;
		/**
		 * Allow users to set custom text transforms.
		 */
		textTransform?: boolean;
		/**
		 * Enable drop cap.
		 */
		dropCap?: boolean;
		/**
		 * Font size presets for the font size selector.
		 * Generates a single class (`.has-{slug}-color`) and custom property (`--wp--preset--font-size--{slug}`) per preset value.
		 */
		fontSizes?: {
			/**
			 * Name of the font size preset, translatable.
			 */
			name?: string;
			/**
			 * Kebab-case unique identifier for the font size preset.
			 */
			slug?: string;
			/**
			 * CSS font-size value, including units.
			 */
			size?: string;
		}[];
		/**
		 * Font family presets for the font family selector.
		 * Generates a single custom property (`--wp--preset--font-family--{slug}`) per preset value.
		 */
		fontFamilies?: {
			/**
			 * Name of the font family preset, translatable.
			 */
			name?: string;
			/**
			 * Kebab-case unique identifier for the font family preset.
			 */
			slug?: string;
			/**
			 * CSS font-family value.
			 */
			fontFamily?: string;
		}[];
	};
	/**
	 * Generate custom CSS custom properties of the form `--wp--custom--{key}--{nested-key}: {value};`. `camelCased` keys are transformed to `kebab-case` as to follow the CSS property naming schema. Keys at different depth levels are separated by `--`, so keys should not include `--` in the name.
	 */
	custom?: {
		[k: string]: string | number | SettingsCustomAdditionalProperties;
	};
	[k: string]: unknown;
}
export interface SettingsCustomAdditionalProperties {
	[k: string]: string | number | SettingsCustomAdditionalProperties;
}
export interface StylesProperties {
	/**
	 * Border styles.
	 */
	border?: {
		/**
		 * Sets the `border-color` CSS property.
		 */
		color?: string;
		/**
		 * Sets the `border-radius` CSS property.
		 */
		radius?: string;
		/**
		 * Sets the `border-style` CSS property.
		 */
		style?: string;
		/**
		 * Sets the `border-width` CSS property.
		 */
		width?: string;
	};
	/**
	 * Color styles.
	 */
	color?: {
		/**
		 * Sets the `background-color` CSS property.
		 */
		background?: string;
		/**
		 * Sets the `background` CSS property.
		 */
		gradient?: string;
		/**
		 * Sets the `color` CSS property.
		 */
		text?: string;
	};
	/**
	 * Spacing styles.
	 */
	spacing?: {
		/**
		 * Sets the `--wp--style--block-gap` CSS custom property when settings.spacing.blockGap is true.
		 */
		blockGap?: string;
		/**
		 * Margin styles.
		 */
		margin?: {
			/**
			 * Sets the `margin-top` CSS property.
			 */
			top?: string;
			/**
			 * Sets the `margin-right` CSS property.
			 */
			right?: string;
			/**
			 * Sets the `margin-bottom` CSS property.
			 */
			bottom?: string;
			/**
			 * Sets the `margin-left` CSS property.
			 */
			left?: string;
		};
		/**
		 * Padding styles.
		 */
		padding?: {
			/**
			 * Sets the `padding-top` CSS property.
			 */
			top?: string;
			/**
			 * Sets the `padding-right` CSS property.
			 */
			right?: string;
			/**
			 * Sets the `padding-bottom` CSS property.
			 */
			bottom?: string;
			/**
			 * Sets the `padding-left` CSS property.
			 */
			left?: string;
		};
	};
	/**
	 * Typography styles.
	 */
	typography?: {
		/**
		 * Sets the `font-family` CSS property.
		 */
		fontFamily?: string;
		/**
		 * Sets the `font-size` CSS property.
		 */
		fontSize?: string;
		/**
		 * Sets the `font-style` CSS property.
		 */
		fontStyle?: string;
		/**
		 * Sets the `font-weight` CSS property.
		 */
		fontWeight?: string;
		/**
		 * Sets the `letter-spacing` CSS property.
		 */
		letterSpacing?: string;
		/**
		 * Sets the `line-height` CSS property.
		 */
		lineHeight?: string;
		/**
		 * Sets the `text-decoration` CSS property.
		 */
		textDecoration?: string;
		/**
		 * Sets the `text-transform` CSS property.
		 */
		textTransform?: string;
	};
	[k: string]: unknown;
}
export interface StylesElementsPropertiesComplete {
	link?: StylesPropertiesComplete;
	h1?: StylesPropertiesComplete;
	h2?: StylesPropertiesComplete;
	h3?: StylesPropertiesComplete;
	h4?: StylesPropertiesComplete;
	h5?: StylesPropertiesComplete;
	h6?: StylesPropertiesComplete;
}
