import { convertUrl } from '../Yoast';

describe('convertUrl', () => {
	it('works without trainling slash', () => {
		expect(
			convertUrl(
				'https://backendurl.com/test',
				'https://publicurl.com',
				'https://backendurl.com/test',
			),
		).toBe('https://publicurl.com');

		// a subsite on test.com/site1
		expect(
			convertUrl(
				'https://backendurl.com/site1/post-name-1',
				'https://publicurl.com',
				'https://backendurl.com/site1',
			),
		).toBe('https://publicurl.com/post-name-1');

		// front-end with subdomain
		expect(
			convertUrl(
				'https://backendurl.com/site1/post-name-1',
				'https://site1.publicurl.com',
				'https://backendurl.com/site1',
			),
		).toBe('https://site1.publicurl.com/post-name-1');
	});

	it('root works with trailing slash', () => {
		expect(
			convertUrl(
				'https://backendurl.com/test/',
				'https://publicurl.com',
				'https://backendurl.com/test',
			),
		).toBe('https://publicurl.com/');

		// a subsite on test.com/site1
		expect(
			convertUrl(
				'https://backendurl.com/site1/post-name-1/',
				'https://publicurl.com',
				'https://backendurl.com/site1',
			),
		).toBe('https://publicurl.com/post-name-1/');

		// front-end with subdomain
		expect(
			convertUrl(
				'https://backendurl.com/site1/post-name-1/',
				'https://site1.publicurl.com',
				'https://backendurl.com/site1',
			),
		).toBe('https://site1.publicurl.com/post-name-1/');
	});

	it('external url returns external url', () => {
		expect(
			convertUrl(
				'https://external.com/test',
				'https://test.test.com',
				'https://test.com/test',
			),
		).toBe('https://external.com/test');
	});
});
