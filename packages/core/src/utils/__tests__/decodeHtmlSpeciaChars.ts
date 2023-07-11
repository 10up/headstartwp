import { decodeHtmlSpeciaChars } from '../decodeHtmlSpeciaChars';

describe('decodeHtmlSpeciaChars', () => {
	it('decodes html entities', () => {
		expect(decodeHtmlSpeciaChars('&#8217;Hello&#8217;')).toBe('’Hello’');
		expect(decodeHtmlSpeciaChars('&#8217;Hi &#038; Hello&#8217;')).toBe('’Hi & Hello’');
		expect(decodeHtmlSpeciaChars('&#8220;Hi &#038; Hello&#8221;&#8211;Bye')).toBe(
			'“Hi & Hello”–Bye',
		);
		expect(decodeHtmlSpeciaChars('&quot;Hi &amp; Hello&quot;&#8230;Bye')).toBe(
			'"Hi & Hello"…Bye',
		);

		expect(decodeHtmlSpeciaChars('&quot;&lt;Hi &amp; Hello&gt;&quot;&#8230;Bye')).toBe(
			'"<Hi & Hello>"…Bye',
		);
	});
});
