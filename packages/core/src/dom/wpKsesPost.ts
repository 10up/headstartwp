/* eslint-disable no-param-reassign, @typescript-eslint/no-use-before-define */
import sanitize, { getDefaultWhiteList, IFilterXSSOptions } from 'xss';
import type { IWhiteList } from 'xss';

/**
 * Sanitize HTML content by the wp_kses_post() requirements
 *
 * ## Usage
 *
 * ```tsx
 * import { wpKsesPost } from '@10up/headless-core';
 * wpKsesPost(html);
 * ```
 *
 * @param content The content to sanitize.
 * @param allowList Optional. The list of allowed HTML tags and attributes. If not set, the default allow list will be used.
 * @param options Optional. IFilterXSSOptions.
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
	options?: IFilterXSSOptions,
): string => {
	if (typeof allowList === 'undefined') {
		allowList = ksesAllowedList;
	}

	return sanitize(content, {
		whiteList: allowList,
		stripIgnoreTag: true,
		stripIgnoreTagBody: true,
		...(options || {}),
	});
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
		// @ts-expect-error
		defaultAllowList[tag] = [...defaultAllowList[tag], ...commonAttributes];
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
