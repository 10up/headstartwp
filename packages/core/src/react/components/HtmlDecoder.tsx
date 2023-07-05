import { FC } from 'react';
import parse from 'html-react-parser';
import { stripTags } from '../../dom';

export interface HtmlDecodeProps {
	/**
	 * The string with html entities to decode
	 *
	 * ```jsx
	 * <HtmlDecoder
	 *		value="Hello world! &#8211; foo bar &#8211;"
	 * />,
	 * ```
	 */
	html: string;
}

/**
 * The `HtmlDecoder` simply decodes html entities
 *
 * Any actual html markup gets stripped before decoding html entities. If you need to render HTML use {@link SafeHtml}
 *
 * ## Usage
 *
 * ```jsx
 * <HtmlDecoder
 *		html="Hello world! &#8211; foo bar &#8211;"
 * />,
 * ```
 *
 * @param props Component properties
 *
 * @category React Components
 */
export const HtmlDecoder: FC<HtmlDecodeProps> = ({ html }) => {
	return <>{parse(stripTags(html))}</>;
};
