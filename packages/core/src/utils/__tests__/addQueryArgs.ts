import { addQueryArgs } from '../url';

describe('addQueryArgs', () => {
	const url = 'https://example.com/';
	test('it adds query args properly', () => {
		expect(addQueryArgs(url, { test: 'test' })).toBe('https://example.com/?test=test');
		expect(addQueryArgs(url, { test: 'test', test2: false })).toBe(
			'https://example.com/?test=test&test2=false',
		);
		expect(addQueryArgs(url, { test: 'test', test2: undefined })).toBe(
			'https://example.com/?test=test',
		);
		expect(addQueryArgs(url, { test: 'test', test2: null })).toBe(
			'https://example.com/?test=test&test2=',
		);
		expect(addQueryArgs(url, { ids: [12, 23, 34] })).toBe(
			'https://example.com/?ids%5B0%5D=12&ids%5B1%5D=23&ids%5B2%5D=34',
		);
		expect(addQueryArgs(url, { object: { nested: 'nested-value' } })).toBe(
			'https://example.com/?object%5Bnested%5D=nested-value',
		);
		expect(addQueryArgs(`${url}?test=test`, { test: 'test2' })).toBe(
			'https://example.com/?test=test2',
		);
	});
});
