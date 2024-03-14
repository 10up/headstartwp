import camelcase from '../camelcase';

describe('camecase', () => {
	it('works with general strings', () => {
		expect(camelcase('foo-bar')).toBe('fooBar');
		expect(camelcase('foo-bar-baz')).toBe('fooBarBaz');
		expect(camelcase('foo--bar')).toBe('fooBar');
		expect(camelcase('--foo-bar')).toBe('fooBar');
		expect(camelcase('--foo--bar')).toBe('fooBar');
		expect(camelcase('FOO-BAR')).toBe('fooBar');
		expect(camelcase('FOÈ-BAR')).toBe('foèBar');
		expect(camelcase('-foo-bar-')).toBe('fooBar');
		expect(camelcase('--foo--bar--')).toBe('fooBar');
		expect(camelcase('foo.bar')).toBe('fooBar');
		expect(camelcase('foo..bar')).toBe('fooBar');
		expect(camelcase('..foo..bar..')).toBe('fooBar');
		expect(camelcase('foo_bar')).toBe('fooBar');
		expect(camelcase('__foo__bar__')).toBe('fooBar');
		expect(camelcase('foo bar')).toBe('fooBar');
		expect(camelcase('  foo  bar  ')).toBe('fooBar');
		expect(camelcase('-')).toBe('');
		expect(camelcase(' - ')).toBe('');
		expect(camelcase('margin-top')).toBe('marginTop');
		expect(camelcase('height')).toBe('height');
		expect(camelcase('padding-top')).toBe('paddingTop');
		expect(camelcase('border-block-end-color')).toBe('borderBlockEndColor');
		expect(camelcase('@font-feature-values')).toBe('@fontFeatureValues');
	});
});
