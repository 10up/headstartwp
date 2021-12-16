import parse, { HTMLReactParserOptions, Element } from 'html-react-parser';
import wp_kses_post, { ksesAllowedAttributes, ksesAllowedTags } from '../../utils/wpKsesPost';

const options: HTMLReactParserOptions = {
	replace: (domNode) => {
		if (domNode instanceof Element && domNode.attribs) {
			// ...
		}
	},
};

export const BlocksRenderer = ({ html }: { html: string }) => {
	const cleanedHTML = wp_kses_post(html, ksesAllowedTags, ksesAllowedAttributes);

	return parse(cleanedHTML, options);
};
