import parse, { HTMLReactParserOptions } from 'html-react-parser';
import { wpKsesPost } from '../../dom';

export async function parseSeo(seo: string, options: HTMLReactParserOptions = { trim: true }) {
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
