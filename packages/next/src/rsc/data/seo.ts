import {
	getHeadstartWPConfig,
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
		alternates: {
			canonical: convertUrl(yoast.canonical, hostUrl, sourceUrl),
		},
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
	};
}

export function prepareSEOMetadata(
	data: PostEntity | QueriedObject,
	_config: HeadlessConfig = {},
): Metadata {
	const config = _config ?? getHeadstartWPConfig();
	const { integrations } = config;
	const isYoastIntegrationEnabled = !!integrations?.yoastSEO?.enable;

	let metadata: Metadata = {};
	let yoastMetadata: Metadata = {};

	if (isPostEntity(data)) {
		if (data.yoast_head_json && isYoastIntegrationEnabled) {
			yoastMetadata = fromYoastToMetadata(data.yoast_head_json, config);
		} else {
			metadata = {
				title: data.title.rendered,
			};
		}
	} else if (data.author) {
		if (data.author.yoast_head_json && isYoastIntegrationEnabled) {
			yoastMetadata = fromYoastToMetadata(data.author.yoast_head_json, config);
		} else {
			metadata = {
				title: data.author.name,
			};
		}
	} else if (data.search) {
		if (data.search.yoast_head_json && isYoastIntegrationEnabled) {
			yoastMetadata = fromYoastToMetadata(data.search.yoast_head_json, config);
		} else {
			metadata = {
				title: `Searching for ${data.search.searchedValue}`,
			};
		}
	} else if (data.term) {
		if (data.term.yoast_head_json && isYoastIntegrationEnabled) {
			yoastMetadata = fromYoastToMetadata(data.term.yoast_head_json, config);
		} else {
			metadata = {
				title: data.term.name,
			};
		}
	}

	return merge([metadata, yoastMetadata]);
}
