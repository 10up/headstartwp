import type { Graph } from 'schema-dts';

export type YoastJSON = {
	title: string;
	description: string;
	robots: {
		index: 'index' | 'noindex';
		follow: 'follow' | 'nofollow';
		'max-snippet'?: number;
		'max-image-preview'?: 'none' | 'standard' | 'large';
		'max-video-preview'?: string | number;
	};
	canonical: string;
	og_locale?: string;
	og_type?:
		| 'article'
		| 'book'
		| 'music.song'
		| 'music.album'
		| 'music.playlist'
		| 'music.radio_station'
		| 'profile'
		| 'website'
		| 'video.tv_show'
		| 'video.other'
		| 'video.movie'
		| 'video.episode';
	og_title?: string;
	og_description?: string;
	og_image?: {
		width?: number;
		height?: number;
		size?: string;
		path?: string;
		alt?: string;
		pixels?: number;
		id?: string;
		url: string;
	};
	og_url?: string;
	og_site_name?: string;
	article_publisher?: string;
	article_author?: string;
	article_published_time?: string;
	article_modified_time?: string;
	author?: string;
	twitter_card?: string;
	twitter_creator?: string;
	twitter_site?: string;
	twitter_misc?: Record<string, string>;
	schema?: Graph;
	status?: number;
};
