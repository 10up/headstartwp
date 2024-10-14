import { withSiteContext } from '../withSiteContext';

describe('withSiteContext', () => {
	it('adds site to params', () => {
		expect(withSiteContext({ params: { id: 1 } }, 'site1')).toEqual({
			params: { id: 1, site: 'site1' },
		});
		expect(withSiteContext({ params: { id: 1, site: 'site2' } }, 'site1')).toEqual({
			params: { id: 1, site: 'site1' },
		});
	});
});
