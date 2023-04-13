import { parseSeo } from '../parseSeo';

describe('parseSeo', () => {
	it('parses SEO', async () => {
		const result = await parseSeo(
			'<title>Title</title><meta name="Name" property="Property" content="Content" /><link rel="Rel" href="Href" hreflang="Hreflang" /><script type="Type" class="Class">{}</script>',
		);
		expect(result).toMatchInlineSnapshot(`
      [
        <title>
          Title
        </title>,
        <meta
          content="Content"
          name="Name"
          property="Property"
        />,
        <link
          href=""
          hrefLang="Hreflang"
          rel="Rel"
        />,
        <script
          className="Class"
          dangerouslySetInnerHTML={
            {
              "__html": "{}",
            }
          }
          type="Type"
        />,
      ]
    `);
	});
});
