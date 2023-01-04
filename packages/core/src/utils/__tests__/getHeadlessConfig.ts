import type { HeadlessConfig } from '../../types';
import { getHeadlessConfig, getSiteByHost } from '../getHeadlessConfig';
import { setHeadlessConfig } from '../../../test/utils';

describe('getHeadlessConfig', () => {
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
		setHeadlessConfig(headlessConfig);
	});

	it('returns the headless config', () => {
		expect(getHeadlessConfig()).toMatchObject(headlessConfig);
	});

	it('sets host for sites if host is not set and hostUrl is', () => {
		expect(getHeadlessConfig()?.sites?.[0]?.host).toBe('site1.com');
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
		setHeadlessConfig(headlessConfig);
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
