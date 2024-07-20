import {
	AuthorEntity,
	getHeadstartWPConfig,
	SearchEntity,
	TermEntity,
	type Entity,
	type HeadlessConfig,
	type PostEntity,
	type QueriedObject,
	type YoastJSON,
} from '@headstartwp/core';
import deepmerge from 'deepmerge';
import type { Metadata } from 'next';
import { convertUrl } from '../../utils/convertUrl';

const { all: merge } = deepmerge;

function isPostEntity(data: Entity | QueriedObject): data is PostEntity {
	return (
		typeof (data as PostEntity).yoast_head !== 'undefined' &&
		typeof (data as PostEntity).yoast_head_json !== 'undefined' &&
		typeof (data as PostEntity).title !== 'undefined'
	);
}

export function fromYoastToMetadata(yoast: YoastJSON, config: HeadlessConfig = {}): Metadata {
	const { hostUrl = '', sourceUrl = '' } = config;

	return {
		title: yoast.title,
		description: yoast.description,
		robots: {
			index: yoast.robots.index === 'index',
			follow: yoast.robots.follow === 'follow',
			'max-snippet': yoast.robots['max-snippet'],
			'max-image-preview': yoast.robots['max-image-preview'],
			'max-video-preview': yoast.robots['max-video-preview'],
		},
		alternates: yoast.canonical
			? {
					canonical: convertUrl(yoast.canonical, hostUrl, sourceUrl),
				}
			: undefined,
		authors: yoast.author ? [{ name: yoast.author }] : [],
		openGraph: {
			locale: yoast.og_locale,
			type: typeof yoast.og_type !== 'undefined' ? yoast.og_type : 'website',
			siteName: yoast.og_site_name,
			title: yoast.og_title,
			url: yoast.og_url ? convertUrl(yoast.og_url, hostUrl, sourceUrl) : undefined,
			description: yoast.og_description,
			images: yoast.og_image,
		},
		twitter: {
			creator: yoast.twitter_creator,
			card: yoast.twitter_card,
			title: yoast.twitter_title,
			description: yoast.twitter_description,
			images: yoast.twitter_image,
		},
	};
}

function getMetadataForPostEntity(post: PostEntity, config: HeadlessConfig): Metadata {
	const { hostUrl = '', sourceUrl = '' } = config;

	return {
		title: post.title.rendered,
		alternates: {
			canonical: convertUrl(post.link, hostUrl, sourceUrl),
		},
	};
}

function getMetadataForAuthorEntity(author: AuthorEntity, config: HeadlessConfig): Metadata {
	const { hostUrl = '', sourceUrl = '' } = config;

	return {
		title: `${author.name} Archives`,
		alternates: {
			canonical: convertUrl(author.url, hostUrl, sourceUrl),
		},
	};
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getMetatadataForSearchEntity(search: SearchEntity, config: HeadlessConfig): Metadata {
	return {
		title: `Searching for ${search.searchedValue}`,
	};
}

function getMetatadataForTermEntity(term: TermEntity, config: HeadlessConfig): Metadata {
	const { hostUrl = '', sourceUrl = '' } = config;

	return {
		title: `${term.name} Archives`,
		alternates: {
			canonical: convertUrl(term.link, hostUrl, sourceUrl),
		},
	};
}

export function prepareSEOMetadata(
	data: PostEntity | QueriedObject,
	_config: HeadlessConfig = {},
): { metatada: Metadata; schema?: string } {
	const config = _config ?? getHeadstartWPConfig();
	const { integrations } = config;
	const isYoastIntegrationEnabled = !!integrations?.yoastSEO?.enable;
	const { hostUrl = '', sourceUrl = '' } = config;

	let metadata: Metadata = {};
	let yoastMetadata: Metadata = {};
	let jsonLd: YoastJSON['schema'];

	if (isPostEntity(data)) {
		if (data.yoast_head_json && isYoastIntegrationEnabled) {
			yoastMetadata = fromYoastToMetadata(data.yoast_head_json, config);
			jsonLd = data.yoast_head_json.schema;
		} else {
			metadata = getMetadataForPostEntity(data, config);
		}
	} else if (data.author) {
		if (data.author.yoast_head_json && isYoastIntegrationEnabled) {
			yoastMetadata = fromYoastToMetadata(data.author.yoast_head_json, config);
			jsonLd = data.author.yoast_head_json.schema;
		} else {
			metadata = getMetadataForAuthorEntity(data.author, config);
		}
	} else if (data.search) {
		if (data.search.yoast_head_json && isYoastIntegrationEnabled) {
			yoastMetadata = fromYoastToMetadata(data.search.yoast_head_json, config);
			jsonLd = data.search.yoast_head_json.schema;
		} else {
			metadata = getMetatadataForSearchEntity(data.search, config);
		}
	} else if (data.term) {
		if (data.term.yoast_head_json && isYoastIntegrationEnabled) {
			yoastMetadata = fromYoastToMetadata(data.term.yoast_head_json, config);
			jsonLd = data.term.yoast_head_json.schema;
		} else {
			metadata = getMetatadataForTermEntity(data.term, config);
		}
	}

	return {
		metatada: merge([metadata, yoastMetadata]),
		schema: jsonLd
			? JSON.stringify(jsonLd).replace(new RegExp(sourceUrl, 'g'), hostUrl)
			: undefined,
	};
}
