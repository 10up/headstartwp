import { isExternalUrl } from '..';

describe('isExternalUrl', () => {
	it('checks for mailto links', () => {
		expect(isExternalUrl('mailto:email@domain.com')).toBe(true);
		expect(
			isExternalUrl(
				'mailto:email@domain.com?subject=The%20subject&body=This%20is%20a%20message%20body',
			),
		).toBe(true);
		expect(isExternalUrl('mailto:name1@mail.com,name2@mail.com')).toBe(true);
	});

	it('checks for tel and sms links', () => {
		expect(isExternalUrl('tel:1-562-867-5309')).toBe(true);
		expect(
			isExternalUrl(
				'sms:+18664504185&body=Hi%2520there%252C%2520I%2527d%2520like%2520to%2520place%2520an%2520order%2520for...',
			),
		).toBe(true);
	});

	it('checks for absolute urls', () => {
		expect(isExternalUrl('http://url.com')).toBe(true);
		expect(isExternalUrl('https://url.com')).toBe(true);
	});

	it('returns false for relative (internal) urls', () => {
		expect(isExternalUrl('/post-name')).toBe(false);
		expect(isExternalUrl('/page-name')).toBe(false);
	});
});
