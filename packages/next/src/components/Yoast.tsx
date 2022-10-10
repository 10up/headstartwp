import { getHostUrl, getWPUrl, removeSourceUrl } from '@10up/headless-core';
import Head from 'next/head';

function convertUrl(url: string) {
	return `${getHostUrl()}${removeSourceUrl({ link: url, backendUrl: getWPUrl() })}`;
}

/**
 * The Yoast component renders the Yoast SEO meta tags.
 * This component is automatically rendered by {@link HeadlessApp} so you don't have to manually render it.
 *
 * @param props Component props. Expects a single `seo` prop
 *
 * @category React Components
 */
export function Yoast({ seo }) {
	return (
		<Head>
			{seo?.yoast_head_json?.title && <title>{seo.yoast_head_json.title}</title>}
			{seo?.yoast_head_json?.description && (
				<meta name="description" content={seo.yoast_head_json.description} />
			)}
			{seo?.yoast_head_json?.canonical && (
				<link rel="canonical" href={convertUrl(seo.yoast_head_json.canonical)} />
			)}
			{seo && seo.yoast_head_json && seo.yoast_head_json.robots && (
				<>
					<meta
						name="robots"
						content={`${seo.yoast_head_json.robots.index}, ${seo.yoast_head_json.robots.follow}`}
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
				<meta property="og:url" content={convertUrl(seo.yoast_head_json.og_url)} />
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
			{/* JSON-LD Schema */}
			{seo && seo.yoast_head_json && seo.yoast_head_json.schema && (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(seo.yoast_head_json.schema),
					}}
				/>
			)}
		</Head>
	);
}
