import { getHeadstartWPConfig, setHeadstartWPConfig } from '@headstartwp/core';
import { prepareQuery } from '../prepareQuery';

describe('prepareQuery', () => {
	beforeAll(() => {
		setHeadstartWPConfig({
			sites: [
				{
					sourceUrl: 'https://backend1.com',
					hostUrl: 'https://site1.com',
				},
				{
					sourceUrl: 'https://backend2.com',
					hostUrl: 'https://site2.com',
				},
			],
		});
	});

	it('converts path to string', () => {
		expect(
			prepareQuery({ routeParams: { path: ['2020', '05', '07', 'post-name'] } }),
		).toMatchObject({
			path: '/2020/05/07/post-name',
		});

		expect(prepareQuery({ routeParams: { path: '/2020/05/07/post-name' } })).toMatchObject({
			path: '/2020/05/07/post-name',
		});
	});

	it('default headers to no-store', () => {
		expect(prepareQuery({})).toMatchObject({
			options: {
				headers: {
					cache: 'no-store',
				},
			},
		});
	});

	it('gets site config based on site param', () => {
		expect(
			prepareQuery({
				routeParams: { site: 'site1.com' },
			}),
		).toMatchObject({
			config: {
				sourceUrl: 'https://backend1.com',
				hostUrl: 'https://site1.com',
			},
		});

		expect(
			prepareQuery({
				routeParams: { site: 'site2.com' },
			}),
		).toMatchObject({
			config: {
				sourceUrl: 'https://backend2.com',
				hostUrl: 'https://site2.com',
			},
		});

		expect(
			prepareQuery({
				routeParams: { site: 'site2.com', path: ['post-name'] },
			}),
		).toMatchObject({
			path: '/post-name',
			config: {
				sourceUrl: 'https://backend2.com',
				hostUrl: 'https://site2.com',
			},
		});

		// this one should throw
		expect(() =>
			prepareQuery({
				routeParams: { site: 'site3.com', path: ['post-name'] },
			}),
		).toThrow('Sub site not found, make sure to add site3.com to headstartwp.config.js');
	});
});

describe('prepareQuery with lang and multisite', () => {
	beforeAll(() => {
		setHeadstartWPConfig({
			sites: [
				{
					sourceUrl: 'https://backend1.com',
					hostUrl: 'https://site1.com',
					locale: 'en',
				},
				{
					sourceUrl: 'https://backend2.com',
					hostUrl: 'https://site1.com',
					locale: 'pt',
				},
			],
		});
	});

	it('gets site correctly based on lang and host', () => {
		expect(
			prepareQuery({
				routeParams: { site: 'site1.com', lang: 'pt' },
			}),
		).toMatchObject({
			config: {
				sourceUrl: 'https://backend2.com',
				hostUrl: 'https://site1.com',
			},
		});

		expect(
			prepareQuery({
				routeParams: { site: 'site1.com', lang: 'en' },
			}),
		).toMatchObject({
			config: {
				sourceUrl: 'https://backend1.com',
				hostUrl: 'https://site1.com',
			},
		});
	});
});

describe('prepareQuery with lang and polylang', () => {
	beforeAll(() => {
		setHeadstartWPConfig({
			sourceUrl: 'https://backend1.com',
			hostUrl: 'https://site1.com',
			integrations: {
				polylang: {
					enable: true,
				},
			},
			i18n: {
				locales: ['en', 'pt'],
				defaultLocale: 'en',
			},
		});
	});

	it('prepares params correctly', () => {
		expect(
			prepareQuery(
				{
					routeParams: { lang: 'pt' },
				},
				getHeadstartWPConfig(),
			),
		).toMatchObject({
			config: {
				sourceUrl: 'https://backend1.com',
				hostUrl: 'https://site1.com',
			},
			params: {
				lang: 'pt',
			},
		});
	});

	it('throws for unsuported locales', () => {
		expect(() =>
			prepareQuery(
				{
					routeParams: { lang: 'br' },
				},
				getHeadstartWPConfig(),
			),
		).toThrow(
			'Unsuported lang, make sure you add all desired locales to `config.i18n.locales`',
		);
	});
});
