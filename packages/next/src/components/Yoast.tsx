import { createElement, Fragment } from 'react';
import { removeSourceUrl } from '@10up/headless-core';
import { useSettings } from '@10up/headless-core/react';
import Head from 'next/head';
import parse, {
	attributesToProps,
	DOMNode,
	domToReact,
	Element,
	HTMLReactParserOptions,
	Text,
} from 'html-react-parser';

function convertUrl(url: string, hostUrl: string, sourceUrl: string) {
	return `${hostUrl}${removeSourceUrl({ link: url, backendUrl: sourceUrl })}`;
}

type Props = {
	seo: {
		yoast_head_json: Record<string, any>;
		yoast_head?: string;
		hide_on_google_news: boolean;
	};

	/**
	 * If true, will make the Yoast component use the `yoast_head` raw html to populate meta tags
	 * instead of `yoast_head_json`.
	 *
	 * `yoast_head` is the default and preferable option.
	 */
	useHtml?: boolean;
};

/**
 * Checks if the dom node is of type Text
 *
 * @param domNode The DOMNode object
 *
 * @returns
 */
function isTextElement(domNode: DOMNode): domNode is Text {
	return domNode.type === 'text';
}

/**
 * The Yoast component renders the Yoast SEO meta tags.
 * This component is automatically rendered by {@link HeadlessApp} so you don't have to manually render it.
 *
 * @param props Component props. Expects a single `seo` prop
 *
 * @category React Components
 */
export function Yoast({ seo, useHtml = false }: Props) {
	const { hostUrl = '', sourceUrl = '' } = useSettings();

	if (seo.yoast_head && useHtml) {
		const options: HTMLReactParserOptions = {
			trim: true,
			// eslint-disable-next-line react/no-unstable-nested-components
			replace: (domNode) => {
				if (domNode instanceof Element) {
					const { name } = domNode;
					const props = attributesToProps(domNode.attribs);

					if (props.rel === 'canonical') {
						props.name = 'canonical';
						props.href = convertUrl(props.href, hostUrl, sourceUrl);
					}

					if (props.property === 'og:url') {
						props.content = convertUrl(props.content, hostUrl, sourceUrl);
					}

					if (
						props.type === 'application/ld+json' &&
						domNode.firstChild &&
						isTextElement(domNode.firstChild)
					) {
						domNode.firstChild.data = domNode.firstChild.data.replace(
							new RegExp(sourceUrl, 'g'),
							hostUrl,
						);
					}

					const key =
						(props.name || props.property) ?? JSON.stringify({ name, ...props });

					if (domNode.children.length > 0) {
						return createElement(
							name,
							{ ...props, key },
							domToReact(domNode.children, options),
						);
					}

					return createElement(name, { ...props, key });
				}

				return domNode;
			},
		};

		return <Head>{parse(seo.yoast_head, options)}</Head>;
	}

	return (
		<Head>
			{seo?.yoast_head_json?.title && <title key="title">{seo.yoast_head_json.title}</title>}
			{seo?.yoast_head_json?.description && (
				<meta
					key="description"
					name="description"
					content={seo.yoast_head_json.description}
				/>
			)}
			{seo?.yoast_head_json?.canonical && (
				<link
					key="canonical"
					rel="canonical"
					href={convertUrl(seo.yoast_head_json.canonical, hostUrl, sourceUrl)}
				/>
			)}
			{seo && seo.yoast_head_json && seo.yoast_head_json.robots && (
				<>
					<meta
						key="robots"
						name="robots"
						content={Object.values(seo.yoast_head_json.robots).join(', ')}
					/>
					{seo.hide_on_google_news ? (
						<meta key="Googlebot-News" name="Googlebot-News" content="noindex" />
					) : null}
				</>
			)}

			{/* OG Meta Tags */}
			{seo && seo.yoast_head_json && seo.yoast_head_json.og_locale && (
				<meta
					key="og:locale"
					property="og:locale"
					content={seo.yoast_head_json.og_locale}
				/>
			)}
			{seo && seo.yoast_head_json && seo.yoast_head_json.og_type && (
				<meta key="og:type" property="og:type" content={seo.yoast_head_json.og_type} />
			)}
			{seo && seo.yoast_head_json && seo.yoast_head_json.og_title && (
				<meta key="og:title" property="og:title" content={seo.yoast_head_json.og_title} />
			)}
			{seo && seo.yoast_head_json && seo.yoast_head_json.og_description && (
				<meta
					key="og:description"
					property="og:description"
					content={seo.yoast_head_json.og_description}
				/>
			)}
			{seo && seo.yoast_head_json && seo.yoast_head_json.og_url && (
				<meta
					key="og:url"
					property="og:url"
					content={convertUrl(seo.yoast_head_json.og_url, hostUrl, sourceUrl)}
				/>
			)}
			{seo && seo.yoast_head_json && seo.yoast_head_json.og_site_name && (
				<meta
					key="og:site_name"
					property="og:site_name"
					content={seo.yoast_head_json.og_site_name}
				/>
			)}
			{seo && seo.yoast_head_json && seo.yoast_head_json.og_image && (
				<>
					<meta
						key="og:image"
						property="og:image"
						content={seo.yoast_head_json.og_image[0].url}
					/>
					<meta
						key="og:image:secure_url"
						property="og:image:secure_url"
						content={seo.yoast_head_json.og_image[0].url}
					/>
					<meta
						key="og:image:width"
						property="og:image:width"
						content={seo.yoast_head_json.og_image[0].width}
					/>
					<meta
						key="og:image:height"
						property="og:image:height"
						content={seo.yoast_head_json.og_image[0].height}
					/>
				</>
			)}
			{seo && seo.yoast_head_json && seo.yoast_head_json.article_modified_time && (
				<meta
					key="article:modified_time"
					property="article:modified_time"
					content={seo.yoast_head_json.article_modified_time}
				/>
			)}

			{/* Twitter Meta Tags */}
			{seo && seo.yoast_head_json && seo.yoast_head_json.twitter_card && (
				<meta
					key="twitter:card"
					name="twitter:card"
					content={seo.yoast_head_json.twitter_card}
				/>
			)}
			{seo && seo.yoast_head_json && seo.yoast_head_json.twitter_title && (
				<meta
					key="twitter:title"
					name="twitter:title"
					content={seo.yoast_head_json.twitter_title}
				/>
			)}
			{seo && seo.yoast_head_json && seo.yoast_head_json.twitter_description && (
				<meta
					key="twitter:description"
					name="twitter:description"
					content={seo.yoast_head_json.twitter_description}
				/>
			)}
			{seo && seo.yoast_head_json && seo.yoast_head_json.twitter_image && (
				<meta
					key="twitter:image"
					name="twitter:image"
					content={seo.yoast_head_json.twitter_image}
				/>
			)}
			{seo &&
				seo.yoast_head_json &&
				seo.yoast_head_json.twitter_misc &&
				Object.entries(seo.yoast_head_json.twitter_misc).map(([label, data], index) => (
					<Fragment key={`twitter-${label}-${data}`}>
						<meta name={`twitter:label${index + 1}`} content={label} />
						<meta name={`twitter:data${index + 1}`} content={String(data)} />
					</Fragment>
				))}
			{/* JSON-LD Schema */}
			{seo && seo.yoast_head_json && seo.yoast_head_json.schema && (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(seo.yoast_head_json.schema).replace(
							new RegExp(sourceUrl, 'g'),
							hostUrl,
						),
					}}
				/>
			)}
		</Head>
	);
}
