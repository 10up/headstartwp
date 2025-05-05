import { setHeadstartWPConfig } from '@headstartwp/core';
import { getSiteFromContext } from '../getSiteFromContext';

describe('getSiteFromContext', () => {
	it('returns settings if no site is provided', () => {
		const ctx = { params: { site: 'site2' } };
		setHeadstartWPConfig({
			useWordPressPlugin: true,
			sites: [
				{
					slug: 'site1',
					hostUrl: 'http://site1.localhost:3001',
					sourceUrl: 'http://sourceUrl1.com',
					redirectStrategy: '404',
				},
				{
					slug: 'site2',
					hostUrl: 'http://site2.localhost:3001',
					sourceUrl: 'http://sourceUrl2.com',
					redirectStrategy: '404',
				},
			],
		});
		expect(getSiteFromContext(ctx).slug).toBe('site2');
	});
});
