import type { ReactElement } from 'react';
import { parseSeo } from '../parseSeo';

describe('parseSeo', () => {
	it('parses SEO', () => {
		const result = parseSeo(
			'<title>Title</title><meta name="Name" property="Property" content="Content" /><link rel="Rel" href="Href" hreflang="Hreflang" /><script type="Type" class="Class">{}</script>',
		) as ReactElement<Record<string, unknown>>[];

		// Jest 29's pretty-format does not recognise React 19 elements
		// (Symbol(react.transitional.element)), so snapshot the element shape instead.
		expect(result.map(({ type, props }) => ({ type, props }))).toMatchInlineSnapshot(`
      [
        {
          "props": {
            "children": "Title",
          },
          "type": "title",
        },
        {
          "props": {
            "children": null,
            "content": "Content",
            "name": "Name",
            "property": "Property",
          },
          "type": "meta",
        },
        {
          "props": {
            "children": null,
            "href": "",
            "hrefLang": "Hreflang",
            "rel": "Rel",
          },
          "type": "link",
        },
        {
          "props": {
            "children": null,
            "className": "Class",
            "dangerouslySetInnerHTML": {
              "__html": "{}",
            },
            "type": "Type",
          },
          "type": "script",
        },
      ]
    `);
	});
});
