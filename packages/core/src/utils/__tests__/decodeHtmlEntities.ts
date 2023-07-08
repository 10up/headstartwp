import { decodeHtmlEntities } from '../decodeHtmlEntities';

describe('decodeHtmlEntities', () => {
	it('decodes html entities', () => {
		expect(decodeHtmlEntities('&#8217;Hello&#8217;')).toBe('’Hello’');
		expect(decodeHtmlEntities('&#8217;Hi &#038; Hello&#8217;')).toBe('’Hi & Hello’');
		expect(decodeHtmlEntities('&#8220;Hi &#038; Hello&#8221;&#8211;Bye')).toBe(
			'“Hi & Hello”–Bye',
		);
		expect(decodeHtmlEntities('&quot;Hi &amp; Hello&quot;&#8230;Bye')).toBe('"Hi & Hello"…Bye');
	});
});
