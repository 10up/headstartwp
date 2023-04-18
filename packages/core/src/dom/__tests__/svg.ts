import { isHrefValueClean } from '../svg';

describe('isHrefValueClean', () => {
	it('properly catches problematic links for URLs', () => {
		// eslint-disable-next-line no-script-url
		expect(isHrefValueClean('javascript:alert(2)')).toBeFalsy();
		expect(isHrefValueClean('#test')).toBeTruthy();
		expect(
			isHrefValueClean(
				"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' onload='alert(88)'%3E%3C/svg%3E",
			),
		).toBeFalsy();
		expect(isHrefValueClean('javascript&#9;:alert(document.domain)')).toBeFalsy();
		expect(isHrefValueClean("javascrip&#9;t:alert('0xd0ff9')")).toBeFalsy();
		expect(
			isHrefValueClean(
				'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
			),
		).toBeTruthy();
		expect(isHrefValueClean('https://example.org/test.png')).toBeTruthy();
		expect(isHrefValueClean('http://example.org/test.png')).toBeTruthy();
	});

	it('properly catches problematic links for <use> elements', () => {
		// eslint-disable-next-line no-script-url
		expect(isHrefValueClean('javascript:alert(2)', true)).toBeFalsy();
		expect(isHrefValueClean('#test', true)).toBeTruthy();
		expect(
			isHrefValueClean(
				"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' onload='alert(88)'%3E%3C/svg%3E",
				true,
			),
		).toBeFalsy();
		expect(isHrefValueClean('javascript&#9;:alert(document.domain)', true)).toBeFalsy();
		expect(isHrefValueClean("javascrip&#9;t:alert('0xd0ff9')", true)).toBeFalsy();
		expect(
			isHrefValueClean(
				'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
				true,
			),
		).toBeTruthy();
		expect(isHrefValueClean('https://example.org/test.png', true)).toBeFalsy();
		expect(isHrefValueClean('http://example.org/test.png', true)).toBeFalsy();
	});
});
