import { convertUrl } from '../Yoast';

describe('convertUrl', () => {
	it('root works without trailing slash', () => {
		expect(
			convertUrl('https://test.com/test', 'https://test.test.com', 'https://test.com/test'),
		).toBe('https://test.test.com/');
	});

	it('root works with trailing slash', () => {
		expect(
			convertUrl('https://test.com/test/', 'https://test.test.com', 'https://test.com/test'),
		).toBe('https://test.test.com/');
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
