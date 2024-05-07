import type { HTMLReactParserOptions } from 'html-react-parser';
import parse from 'html-react-parser';
import { wpKsesPost } from '../../dom';

export function parseSeo(seo: string, options: HTMLReactParserOptions = { trim: true }) {
	return parse(
		wpKsesPost(seo, {
			title: [],
			meta: ['name', 'content', 'property'],
			link: ['rel', 'href', 'hreflang'],
			script: ['type', 'class'],
		}),
		options,
	);
}
