import { wpKsesPost } from '../wpKsesPost';

describe('wp_kses_post', () => {
	it('properly sanitizes html', () => {
		expect(
			wpKsesPost(
				'<div class="class-name">This Will Become a p tag</div><div>This Will Become a p tag</div>',
			),
		).toBe(
			'<div class="class-name">This Will Become a p tag</div><div>This Will Become a p tag</div>',
		);
		expect(wpKsesPost('<p>Hello World</p>')).toBe('<p>Hello World</p>');
		expect(wpKsesPost('<p class="test">Hello World</p>')).toBe(
			'<p class="test">Hello World</p>',
		);
		expect(wpKsesPost('<p><script>alert("danger");</script>Hello World</p>')).toBe(
			'<p>Hello World</p>',
		);
		expect(wpKsesPost('<p><script>alert("</script>Hello World</p>')).toBe('<p>Hello World</p>');
	});

	it('respects the allowhtml tags', () => {
		expect(wpKsesPost('<p>Hello World</p>', { p: [] })).toBe('<p>Hello World</p>');
		expect(wpKsesPost('<div><div class="test"</div><p>Hello World</p></div>', { p: [] })).toBe(
			'<p>Hello World</p>',
		);
		expect(wpKsesPost('<p><iframe></iframe>Hello World</p>', { p: [] })).toBe(
			'<p>Hello World</p>',
		);
		expect(
			wpKsesPost(
				'<p class="test"><iframe class="test" src="http://example.com"></iframe>Hello World</p>',
				{
					p: ['class'],
					iframe: ['src'],
				},
			),
		).toBe('<p class="test"><iframe src="http://example.com"></iframe>Hello World</p>');
	});

	it('supports json in attributes', () => {
		const json_object = { post_id: 1, slug: 'test', link: 'https://example.com' };
		expect(
			wpKsesPost(
				`<p data-post='${JSON.stringify(json_object)}'>Hello World</p>`,
				{
					p: ['data-post'],
				},
				{
					onTag(tag, html, options) {
						if (options.isWhite && tag === 'p') {
							return html;
						}

						return undefined;
					},
				},
			),
		).toBe(`<p data-post='${JSON.stringify(json_object)}'>Hello World</p>`);
	});

	it('supports json in script tags', () => {
		const json_object = { post_id: 1, slug: 'test', link: 'https://example.com' };
		expect(
			wpKsesPost(`<script type="text/json-block">${JSON.stringify(json_object)}</script>`, {
				script: ['type'],
			}),
		).toBe(`<script type="text/json-block">${JSON.stringify(json_object)}</script>`);
	});

	it('allows whiltelisted css properties', () => {
		expect(
			wpKsesPost('<div style="color:var(--blue); --white:#ffffff; flex-basis:100px;" />'),
		).toBe('<div style="color:var(--blue); --white:#ffffff; flex-basis:100px;" />');

		expect(wpKsesPost('<div style="-white:#ffffff;" />')).toBe('<div style />');
	});

	it('allows svg tags when svg is true', () => {
		expect(
			wpKsesPost(
				'<p class="test">Hello, World! <svg><path d="M0 0h24v24H0z" fill="none" /></svg></p>',
				undefined,
				{ svg: true },
			),
		).toBe(
			'<p class="test">Hello, World! <svg><path d="M0 0h24v24H0z" fill="none" /></svg></p>',
		);
	});

	it('removes svg tags when svg is false', () => {
		expect(
			wpKsesPost(
				'<p class="test">Hello, World! <svg><path d="M0 0h24v24H0z" fill="none" /></svg></p>',
				undefined,
				{ svg: false },
			),
		).toBe('<p class="test">Hello, World! </p>');
	});

	it('allows svg tags when svg is not set', () => {
		expect(
			wpKsesPost(
				'<p class="test">Hello, World! <svg><path d="M0 0h24v24H0z" fill="none" /></svg></p>',
			),
		).toBe(
			'<p class="test">Hello, World! <svg><path d="M0 0h24v24H0z" fill="none" /></svg></p>',
		);
	});

	it('allows removes insecure use elements from svg tags', () => {
		expect(
			wpKsesPost(
				'<p class="test">Hello, World! <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 25 25"><use xlink:href="#a" x="5" fill="#1A374D"/><circle id="a" cx="5" cy="5" r="5"/><use xlink:href="defs.svg#icon-1"/></svg></p>',
			),
		).toBe(
			'<p class="test">Hello, World! <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewbox="0 0 25 25"><use xlink:href="#a" x="5" fill="#1A374D" /><circle id="a" cx="5" cy="5" r="5" /><use /></svg></p>',
		);
	});

	it('passes the original onIgnoreTagAttr callback when using the SVG sanitizer', () => {
		const onIgnoreTagAttr = jest.fn();
		wpKsesPost('<p class="test" testAttrNotOnList="true">Hello World</p>', undefined, {
			onIgnoreTagAttr,
			svg: true,
		});
		expect(onIgnoreTagAttr).toHaveBeenCalled();
	});

	// https://github.com/10up/headstartwp/issues/459
	it('supports anchor tags target and rel', () => {
		expect(
			wpKsesPost(
				'<a href="https://example.com" target="_blank" rel="noreferrer noopener nofollow">Hello World</a>',
			),
		).toBe(
			'<a href="https://example.com" target="_blank" rel="noreferrer noopener nofollow">Hello World</a>',
		);
	});
});
