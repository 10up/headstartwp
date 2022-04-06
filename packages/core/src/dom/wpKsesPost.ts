/* eslint-disable no-param-reassign, @typescript-eslint/no-use-before-define */
import sanitize, { getDefaultWhiteList } from 'xss';
import type { IWhiteList } from 'xss';

export type allowedTagsType = string[];

/**
 * Sanitize HTML content by the wp_kses_post() requirements
 *
 * @see https://codex.wordpress.org/Function_Reference/wp_kses_post
 * @returns Sanitized string of HTML.
 */
export const wpKsesPost = (content: string, allowList?: IWhiteList | undefined): string => {
	if (typeof allowList === 'undefined') {
		allowList = ksesAllowedList;
	}

	return sanitize(content, {
		whiteList: allowList,
		stripIgnoreTag: true,
		stripIgnoreTagBody: true,
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
