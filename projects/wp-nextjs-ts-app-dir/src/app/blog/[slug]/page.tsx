import type { Metadata } from 'next';
import parse, { HTMLReactParserOptions, Element, domToReact } from 'html-react-parser';

async function getData(params: { slug: string }) {
	const res = await fetch(`https://js1.10up.com/wp-json/wp/v2/pages?slug=${params.slug}`);

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}

	return res.json();
}

// Very basic example of how to use html-react-parser to replace a block with custom React components.
// POC with https://github.com/Automattic/vip-block-data-api would be nice.
// <BlockRender> currently does not work as @headstartwp/core exports components that are not server side compatible.
const options: HTMLReactParserOptions = {
	replace: (domNode) => {
		if (
			domNode instanceof Element &&
			domNode.attribs &&
			domNode.attribs['data-wp-block-name'] &&
			domNode.attribs['data-wp-block-name'] === 'core/columns'
		) {
			delete domNode.attribs.class;
			return (
				<div {...domNode.attribs} className="flex gap-4 bg-green-500 p-4">
					{domToReact(domNode.children, options)}
				</div>
			);
		}

		if (
			domNode instanceof Element &&
			domNode.attribs &&
			domNode.attribs['data-wp-block-name'] &&
			domNode.attribs['data-wp-block-name'] === 'core/column'
		) {
			delete domNode.attribs.class;
			return (
				<div {...domNode.attribs} className="bg-green-400 p-2">
					{domToReact(domNode.children, options)}
				</div>
			);
		}

		return domNode;
	},
};

export default async function Page({ params }: { params: { slug: string } }) {
	const data = await getData(params);

	return (
		<main>
			<h1 className="text-3xl font-semibold">{data[0].title.rendered}</h1>
			<div className="mt-4">{parse(data[0].content.rendered, options)}</div>
		</main>
	);
}

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> {
	const data = await getData(params);

	return {
		title: data[0].title.rendered,
	};
}

export async function generateStaticParams() {
	const posts = await fetch('https://js1.10up.com/wp-json/wp/v2/pages').then((res) => res.json());

	return posts.map((post: { slug: string }) => ({
		slug: post.slug,
	}));
}
