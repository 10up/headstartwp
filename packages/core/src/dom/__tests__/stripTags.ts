import { stripTags } from '../stripTags';

describe('stripTags', () => {
	test('it strips tags', () => {
		expect(stripTags('<div>test</div>')).toBe('test');
		expect(stripTags('<div>test <p>test</p></div>')).toBe('test test');
		expect(stripTags('<div><p><script>alert()</script>hello world</p></div>')).toBe(
			'alert()hello world',
		);
	});
});
