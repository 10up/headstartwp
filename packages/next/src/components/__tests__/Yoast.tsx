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
});
