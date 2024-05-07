import { isInternalLink } from '..';
import type { HeadlessConfig } from '../../types';

jest.mock('../config', () => {
	return {
		getWPUrl: () => 'https://backendurl.com',
	};
});

describe('isInternalLink', () => {
	it('returns true for internal links', () => {
		expect(isInternalLink('https://backendurl.com/post-name')).toBe(true);

		expect(isInternalLink('https://backendurl.com/parent/post-name')).toBe(true);

		expect(isInternalLink('https://backendurl.com/parent/post-name?query=1')).toBe(true);

		expect(isInternalLink('https://backendurl.com/2022/10/20/post-name')).toBe(true);

		expect(isInternalLink('https://backendurl.com/')).toBe(true);

		expect(isInternalLink('https://backendurl.com')).toBe(true);
	});

	it('returns false for non-internal links', () => {
		expect(isInternalLink('https://externalurl.com/post-name')).toBe(false);

		expect(isInternalLink('https://externalurl.com/parent/post-name')).toBe(false);

		expect(isInternalLink('https://externalurl.com/parent/post-name?query=1')).toBe(false);

		expect(isInternalLink('https://externalurl.com/2022/10/20/post-name')).toBe(false);

		expect(isInternalLink('https://externalurl.com/')).toBe(false);

		expect(isInternalLink('https://externalurl.com')).toBe(false);
	});

	it('returns false for wp-admin and related paths', () => {
		expect(isInternalLink('https://backendurl.com/wp-admin')).toBe(false);
		expect(isInternalLink('https://backendurl.com/wp-admin/post.php')).toBe(false);
		expect(isInternalLink('https://backendurl.com/wp-admin/edit.php')).toBe(false);
		expect(isInternalLink('https://backendurl.com/wp-register.php')).toBe(false);
		expect(isInternalLink('https://backendurl.com/wp-login.php')).toBe(false);
	});

	it('returns true for internal links of subsites', () => {
		const site: HeadlessConfig = {
			sourceUrl: 'https://backendurl.com/site1',
		};

		expect(isInternalLink('https://backendurl.com/site1/', site)).toBe(true);
		expect(isInternalLink('https://backendurl.com/site2/', site)).toBe(false);
	});
});
