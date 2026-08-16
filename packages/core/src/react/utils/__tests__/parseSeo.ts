import { parseSeo } from '../parseSeo';

describe('parseSeo', () => {
	it('parses SEO', () => {
		const result = parseSeo(
			'<title>Title</title><meta name="Name" property="Property" content="Content" /><link rel="Rel" href="Href" hreflang="Hreflang" /><script type="Type" class="Class">{}</script>',
		);
		expect(result).toMatchInlineSnapshot(`
      [
        {
          "$$typeof": Symbol(react.transitional.element),
          "_owner": null,
          "_store": {},
          "key": "0",
          "props": {
            "children": "Title",
          },
          "type": "title",
        },
        {
          "$$typeof": Symbol(react.transitional.element),
          "_owner": null,
          "_store": {},
          "key": "1",
          "props": {
            "children": undefined,
            "content": "Content",
            "name": "Name",
            "property": "Property",
          },
          "type": "meta",
        },
        {
          "$$typeof": Symbol(react.transitional.element),
          "_owner": null,
          "_store": {},
          "key": "2",
          "props": {
            "children": undefined,
            "href": "",
            "hrefLang": "Hreflang",
            "rel": "Rel",
          },
          "type": "link",
        },
        {
          "$$typeof": Symbol(react.transitional.element),
          "_owner": null,
          "_store": {},
          "key": "3",
          "props": {
            "children": undefined,
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
