import { getPathName } from '../handleError';

describe('getPathName', () => {
	test('it removes multisite path', () => {
		expect(getPathName('/_sites/site.com:3300/path/name/')).toBe('/path/name/');
		expect(getPathName('/_sites/site.com/path/name')).toBe('/path/name');
		expect(getPathName('/_sites/site.com:3300/path/name')).toBe('/path/name');
		expect(getPathName('/_sites/site1.localhost:3300/path/name')).toBe('/path/name');
		expect(getPathName('/_sites/site.com:3300/path/name?q=sa')).toBe('/path/name?q=sa');
		expect(getPathName('/_sites/site1.localhost:3300/path/name?q=sa&q2=sa')).toBe(
			'/path/name?q=sa&q2=sa',
		);
		expect(getPathName('/_sites/site1.localhost:3300/')).toBe('/');
	});

	test('it does do anything for valid pathnames', () => {
		expect(getPathName('/path/name')).toBe('/path/name');
		expect(getPathName('/path/name?q=sa')).toBe('/path/name?q=sa');
		expect(getPathName('/path/name?q=sa&q2=sa')).toBe('/path/name?q=sa&q2=sa');
		expect(getPathName('/')).toBe('/');
	});
});
