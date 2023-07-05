import { FC } from 'react';
import parse from 'html-react-parser';
import type { IWhiteList } from 'xss';
import { wpKsesPost } from '../../dom';

export interface SafeHtmlProps {
	/**
	 * The HTML string to be rendered.
	 *
	 * ```jsx
	 * <SafeHtml html="<div><p>hello world</p> div content</div>" />
	 * ```
	 */
	html: string;

	/**
	 * The allow list for the parser
	 *
	 * ```jsx
	 * <SafeHtml
	 *		html="<div><p>hello world</p> div content</div>"
	 *		ksesAllowList={{ div: [] }}
	 * />
	 * ```
	 */
	ksesAllowList?: IWhiteList;
}

/**
 * The `SafeHtml` component provides an easy way to safely render HTML
 *
 * The html prop is sanitized through {@link wpKsesPost} so it's safe for rendering arbitrary html markup.
 *
 * ## Usage
 *
 * ```jsx
 * <SafeHtml html="<div><p>hello world</p> div content</div>" />
 * ```
 *
 * @param props Component properties
 *
 * @category React Components
 */
export const SafeHtml: FC<SafeHtmlProps> = ({ html, ksesAllowList }) => {
	return <>{parse(wpKsesPost(html, ksesAllowList))}</>;
};
