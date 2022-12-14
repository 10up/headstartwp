import { Fragment } from 'react';
import { removeSourceUrl } from '@10up/headless-core';
import { useSettings } from '@10up/headless-core/react';
import Head from 'next/head';
import parse from 'html-react-parser';

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
		return (
			<Head>
				{parse(
					// TODO: Not really a fan of this url replacement...
					seo?.yoast_head.replace(/"(https?:\/[^"]+)"/g, (_match, link) => {
						if (
							link.match(
								new RegExp(
									`^${sourceUrl}/((wp-(json|admin|content|includes))|feed|comments|xmlrpc)`,
								),
							)
						) {
							return link;
						}

						return convertUrl(link, hostUrl, sourceUrl);
					}),
				)}
			</Head>
		);
	}

	return (
		<Head>
			{seo?.yoast_head_json?.title && <title>{seo.yoast_head_json.title}</title>}
			{seo?.yoast_head_json?.description && (
				<meta name="description" content={seo.yoast_head_json.description} />
			)}
			{seo?.yoast_head_json?.canonical && (
				<link
					rel="canonical"
					href={convertUrl(seo.yoast_head_json.canonical, hostUrl, sourceUrl)}
				/>
			)}
			{seo && seo.yoast_head_json && seo.yoast_head_json.robots && (
				<>
					<meta
						name="robots"
						content={Object.values(seo.yoast_head_json.robots).join(', ')}
					/>
					{seo.hide_on_google_news ? (
						<meta name="Googlebot-News" content="noindex" />
					) : null}
				</>
			)}

			{/* OG Meta Tags */}
			{seo && seo.yoast_head_json && seo.yoast_head_json.og_locale && (
				<meta property="og:locale" content={seo.yoast_head_json.og_locale} />
			)}
			{seo && seo.yoast_head_json && seo.yoast_head_json.og_type && (
				<meta property="og:type" content={seo.yoast_head_json.og_type} />
			)}
			{seo && seo.yoast_head_json && seo.yoast_head_json.og_title && (
				<meta property="og:title" content={seo.yoast_head_json.og_title} />
			)}
			{seo && seo.yoast_head_json && seo.yoast_head_json.og_description && (
				<meta property="og:description" content={seo.yoast_head_json.og_description} />
			)}
			{seo && seo.yoast_head_json && seo.yoast_head_json.og_url && (
				<meta
					property="og:url"
					content={convertUrl(seo.yoast_head_json.og_url, hostUrl, sourceUrl)}
				/>
			)}
			{seo && seo.yoast_head_json && seo.yoast_head_json.og_site_name && (
				<meta property="og:site_name" content={seo.yoast_head_json.og_site_name} />
			)}
			{seo && seo.yoast_head_json && seo.yoast_head_json.og_image && (
				<>
					<meta property="og:image" content={seo.yoast_head_json.og_image[0].url} />
					<meta
						property="og:image:secure_url"
						content={seo.yoast_head_json.og_image[0].url}
					/>
					<meta
						property="og:image:width"
						content={seo.yoast_head_json.og_image[0].width}
					/>
					<meta
						property="og:image:height"
						content={seo.yoast_head_json.og_image[0].height}
					/>
				</>
			)}
			{seo && seo.yoast_head_json && seo.yoast_head_json.article_modified_time && (
				<meta
					property="article:modified_time"
					content={seo.yoast_head_json.article_modified_time}
				/>
			)}

			{/* Twitter Meta Tags */}
			{seo && seo.yoast_head_json && seo.yoast_head_json.twitter_card && (
				<meta name="twitter:card" content={seo.yoast_head_json.twitter_card} />
			)}
			{seo && seo.yoast_head_json && seo.yoast_head_json.twitter_title && (
				<meta name="twitter:title" content={seo.yoast_head_json.twitter_title} />
			)}
			{seo && seo.yoast_head_json && seo.yoast_head_json.twitter_description && (
				<meta
					name="twitter:description"
					content={seo.yoast_head_json.twitter_description}
				/>
			)}
			{seo && seo.yoast_head_json && seo.yoast_head_json.twitter_image && (
				<meta name="twitter:image" content={seo.yoast_head_json.twitter_image} />
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
