/* eslint-disable no-param-reassign, @typescript-eslint/no-use-before-define */
import sanitize, { getDefaultWhiteList } from 'xss';
import type { IWhiteList, IFilterXSSOptions } from 'xss';
import { isHrefValueClean, linkingSVGElements, svgAllowList, svgHtmlAllowList } from './svg';

interface IWpKsesPostOptions extends IFilterXSSOptions {
	svg?: boolean;
}

/**
 * Sanitize HTML content by the wp_kses_post() requirements
 *
 * #### Usage
 *
 * ```tsx
 * import { wpKsesPost } from '@headstartwp/core';
 * wpKsesPost(html);
 * ```
 *
 * @param content The content to sanitize.
 * @param allowList Optional. The list of allowed HTML tags and attributes. If not set, the default allow list will be used.
 * @param options Optional. IWpKsesPostOptions.
 *
 * @see https://codex.wordpress.org/Function_Reference/wp_kses_post
 *
 * @category DOM Helpers
 *
 * @returns Sanitized string of HTML.
 */
export const wpKsesPost = (
	content: string,
	allowList?: IWhiteList,
	options?: IWpKsesPostOptions,
): string => {
	if (typeof allowList === 'undefined') {
		allowList = { ...ksesAllowedList };
	}

	options = options || {};
	const newOptions: IWpKsesPostOptions = { ...options };
	const allowSVG = options?.svg ?? true;

	// If we're supporting SVG.
	if (allowSVG) {
		// Merge in the allow list for SVG.
		allowList = {
			...allowList,
			...svgAllowList,
		};

		// merge svg html allow list with allowList
		Object.keys(svgHtmlAllowList).forEach((tag) => {
			if (typeof allowList === 'undefined') {
				return;
			}
			allowList[tag] = [...(allowList[tag] ?? []), ...(svgHtmlAllowList[tag] ?? [])];
		});

		// Handle the unknown SVG attributes.
		newOptions.onIgnoreTagAttr = (tag, name, value, isWhiteAttr) => {
			// Only do this check for allowed SVG elements.
			if (Object.keys(svgAllowList).includes(tag)) {
				// If it's a linking attribute, check if it's safe.
				if (linkingSVGElements.includes(name)) {
					return isHrefValueClean(value, tag === 'use')
						? `${name}="${value}"`
						: undefined;
				}

				// If it's a xmlns attribute allow it
				if (name.startsWith('xmlns')) {
					return `${name}="${value}"`;
				}

				return undefined;
			}

			// Pass through to the default handler if one is set and it's not running on an allowed SVG element.
			return options?.onIgnoreTagAttr?.(tag, name, value, isWhiteAttr);
		};
	}

	return sanitize(content, {
		allowList,
		stripIgnoreTag: true,
		stripIgnoreTagBody: true,
		css: {
			whiteList: cssAllowList,
			onIgnoreAttr: (name, value) => {
				// if it's a css variable
				if (/^--[a-zA-Z0-9-_]+$/.test(name)) {
					return `${name}:${value}`;
				}
				return undefined;
			},
		},
		...newOptions,
	});
};

const cssAllowList = {
	background: true,
	'background-color': true,
	'background-image': true,
	'background-position': true,
	'background-size': true,
	'background-attachment': true,
	'background-blend-mode': true,

	border: true,
	'border-radius': true,
	'border-width': true,
	'border-color': true,
	'border-style': true,
	'border-right': true,
	'border-right-color': true,
	'border-right-style': true,
	'border-right-width': true,
	'border-bottom': true,
	'border-bottom-color': true,
	'border-bottom-left-radius': true,
	'border-bottom-right-radius': true,
	'border-bottom-style': true,
	'border-bottom-width': true,
	'border-left': true,
	'border-left-color': true,
	'border-left-style': true,
	'border-left-width': true,
	'border-top': true,
	'border-top-color': true,
	'border-top-left-radius': true,
	'border-top-right-radius': true,
	'border-top-style': true,
	'border-top-width': true,

	'border-spacing': true,
	'border-collapse': true,
	'caption-side': true,

	columns: true,
	'column-count': true,
	'column-fill': true,
	'column-gap': true,
	'column-rule': true,
	'column-span': true,
	'column-width': true,

	color: true,
	filter: true,
	font: true,
	'font-family': true,
	'font-size': true,
	'font-style': true,
	'font-variant': true,
	'font-weight': true,
	'letter-spacing': true,
	'line-height': true,
	'text-align': true,
	'text-decoration': true,
	'text-indent': true,
	'text-transform': true,

	height: true,
	'min-height': true,
	'max-height': true,

	width: true,
	'min-width': true,
	'max-width': true,

	margin: true,
	'margin-right': true,
	'margin-bottom': true,
	'margin-left': true,
	'margin-top': true,
	'margin-block-start': true,
	'margin-block-end': true,
	'margin-inline-start': true,
	'margin-inline-end': true,

	padding: true,
	'padding-right': true,
	'padding-bottom': true,
	'padding-left': true,
	'padding-top': true,
	'padding-block-start': true,
	'padding-block-end': true,
	'padding-inline-start': true,
	'padding-inline-end': true,

	flex: true,
	'flex-basis': true,
	'flex-direction': true,
	'flex-flow': true,
	'flex-grow': true,
	'flex-shrink': true,
	'flex-wrap': true,

	gap: true,
	'row-gap': true,

	'grid-template-columns': true,
	'grid-auto-columns': true,
	'grid-column-start': true,
	'grid-column-end': true,
	'grid-column-gap': true,
	'grid-template-rows': true,
	'grid-auto-rows': true,
	'grid-row-start': true,
	'grid-row-end': true,
	'grid-row-gap': true,
	'grid-gap': true,

	'justify-content': true,
	'justify-items': true,
	'justify-self': true,
	'align-content': true,
	'align-items': true,
	'align-self': true,

	clear: true,
	cursor: true,
	direction: true,
	float: true,
	'list-style-type': true,
	'object-fit': true,
	'object-position': true,
	overflow: true,
	'vertical-align': true,
	display: true,

	'list-style': true,
	'list-style-image': true,
};

const commonAttributes = [
	'class',
	'aria-describedby',
	'aria-details',
	'aria-label',
	'aria-labelledby',
	'aria-hidden',
	'id',
	'style',
	'role',
	'data-*',
	'data-wp-block',
	'data-wp-block-name',
];

const defaultAllowList = getDefaultWhiteList();

for (const tag of Object.keys(defaultAllowList)) {
	if (typeof defaultAllowList[tag] !== 'undefined' && Array.isArray(defaultAllowList[tag])) {
		defaultAllowList[tag] = [...(defaultAllowList[tag] ?? []), ...commonAttributes];
	}
}

/**
 * Default Allowed HTML Attributes
 *
 * @see https://codex.wordpress.org/Function_Reference/wp_kses_post
 *
 * @returns Array of allowed attributes for tags.
 */
export const ksesAllowedList: IWhiteList = {
	...defaultAllowList,
	a: [...(defaultAllowList.a ?? []), 'download', 'hreflang', 'referrerpolicy', 'rel', 'target'],
	ol: [...(defaultAllowList.ol ?? []), 'start', 'reversed', 'type'],
	img: [...(defaultAllowList.img ?? []), 'srcset', 'sizes', 'loading'],
	iframe: [
		...commonAttributes,
		'allow',
		'allowfullscreen',
		'allowpaymentrequest',
		'csp',
		'height',
		'loading',
		'name',
		'referrerpolicy',
		'sandbox',
		'src',
		'srcdoc',
		'width',
		'title',
	],
};
