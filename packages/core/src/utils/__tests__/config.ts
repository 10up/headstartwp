import type { HeadlessConfig } from '../../types';
import {
	getCustomPostTypes,
	getCustomTaxonomies,
	getHeadstartWPConfig,
	getSiteByHost,
	setHeadstartWPConfig,
} from '../config';

describe('getHeadstartWPConfig', () => {
	const headlessConfig: HeadlessConfig = {
		sourceUrl: 'https://sourceurl.com',
		hostUrl: 'https://publicurl.com',
		sites: [
			{
				sourceUrl: 'https://sourceurl.com/site1',
				hostUrl: 'https://site1.com',
			},
		],
	};

	beforeAll(() => {
		setHeadstartWPConfig(headlessConfig);
	});

	it('returns the headless config', () => {
		expect(getHeadstartWPConfig()).toMatchObject(headlessConfig);
	});

	it('sets host for sites if host is not set and hostUrl is', () => {
		expect(getHeadstartWPConfig()?.sites?.[0]?.host).toBe('site1.com');
	});

	it('returns the default customTaxonomies', () => {
		expect(getCustomTaxonomies()).toStrictEqual([
			{ endpoint: '/wp-json/wp/v2/categories', restParam: 'categories', slug: 'category' },
			{
				endpoint: '/wp-json/wp/v2/tags',
				restParam: 'tags',
				rewrite: 'tag',
				slug: 'post_tag',
			},
		]);
	});

	it('returns the default customPostTypes', () => {
		expect(getCustomPostTypes()).toStrictEqual([
			{ endpoint: '/wp-json/wp/v2/pages', single: '/', slug: 'page' },
			{ archive: '/blog', endpoint: '/wp-json/wp/v2/posts', single: '/', slug: 'post' },
		]);
	});

	it('accepts an array for customTaxonomies', () => {
		setHeadstartWPConfig({
			...headlessConfig,
			customTaxonomies: [
				{
					slug: 'genre',
					endpoint: '/wp-json/wp/v2/genre',
				},
			],
		});

		expect(getCustomTaxonomies()).toStrictEqual([
			{
				slug: 'genre',
				endpoint: '/wp-json/wp/v2/genre',
			},
			{ endpoint: '/wp-json/wp/v2/categories', restParam: 'categories', slug: 'category' },
			{
				endpoint: '/wp-json/wp/v2/tags',
				restParam: 'tags',
				rewrite: 'tag',
				slug: 'post_tag',
			},
		]);
	});

	it('accepts an array for customPostTypes', () => {
		setHeadstartWPConfig({
			...headlessConfig,
			customPostTypes: [
				{
					slug: 'book',
					endpoint: '/wp-json/wp/v2/book',
					single: '/book',
					archive: '/books',
				},
			],
		});

		expect(getCustomPostTypes()).toStrictEqual([
			{
				slug: 'book',
				endpoint: '/wp-json/wp/v2/book',
				single: '/book',
				archive: '/books',
			},
			{ endpoint: '/wp-json/wp/v2/pages', single: '/', slug: 'page' },
			{ archive: '/blog', endpoint: '/wp-json/wp/v2/posts', single: '/', slug: 'post' },
		]);
	});

	it('accepts a function for customTaxonomies', () => {
		setHeadstartWPConfig({
			...headlessConfig,
			customTaxonomies: (defaultTaxonomies) => {
				return [
					...defaultTaxonomies.map((taxonomy) => ({
						...taxonomy,
						matchArchivePath: true,
					})),
				];
			},
		});

		expect(getHeadstartWPConfig()?.customTaxonomies?.[0]?.matchArchivePath).toBe(true);
		expect(getHeadstartWPConfig()?.customTaxonomies?.[1]?.matchArchivePath).toBe(true);
	});

	it('accepts a function for customPostTypes', () => {
		setHeadstartWPConfig({
			...headlessConfig,
			customPostTypes: (defaultPostTypes) => {
				return [
					...defaultPostTypes.map((postType) => ({
						...postType,
						matchSinglePath: false,
					})),
				];
			},
		});

		expect(getHeadstartWPConfig()?.customPostTypes?.[0]?.matchSinglePath).toBe(false);
		expect(getHeadstartWPConfig()?.customPostTypes?.[1]?.matchSinglePath).toBe(false);
	});
});

describe('getSiteByHost', () => {
	const headlessConfig: HeadlessConfig = {
		sourceUrl: 'https://sourceurl.com',
		hostUrl: 'https://publicurl.com',
		sites: [
			{
				sourceUrl: 'https://sourceurl.com/site1',
				hostUrl: 'https://site1.com',
				locale: 'en',
			},
			{
				sourceUrl: 'https://sourceurl.com/site2',
				host: 'site2.com',
				hostUrl: 'https://site2.com',
				locale: 'es',
			},
		],
	};

	beforeAll(() => {
		setHeadstartWPConfig(headlessConfig);
	});

	it('finds sites by host even if host is not set but hostUrl is', () => {
		expect(getSiteByHost('site1.com')?.sourceUrl).toBe('https://sourceurl.com/site1');

		expect(getSiteByHost('site2.com')?.sourceUrl).toBe('https://sourceurl.com/site2');
	});

	it('also accepts URLs', () => {
		expect(getSiteByHost('https://site1.com')?.sourceUrl).toBe('https://sourceurl.com/site1');
	});

	it('takes into account the locale', () => {
		expect(getSiteByHost('https://site1.com', 'en')?.sourceUrl).toBe(
			'https://sourceurl.com/site1',
		);

		expect(getSiteByHost('site2.com', 'es')?.sourceUrl).toBe('https://sourceurl.com/site2');

		expect(getSiteByHost('site2.com', 'en')).toBeNull();
		expect(getSiteByHost('site1.com', 'es')).toBeNull();
	});
});
