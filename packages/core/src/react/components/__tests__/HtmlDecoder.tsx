import * as React from 'react';
import { render } from '@testing-library/react';
import { HtmlDecoder } from '../HtmlDecoder';

describe('HtmlDecoder', () => {
	it('decodes entities', () => {
		const { container } = render(
			<HtmlDecoder html="Hello world! &#8211; foo bar &#8211; &#8216;\@£#?,&#8217;\[]" />,
		);

		expect(container.firstChild).toMatchInlineSnapshot(
			`Hello world! – foo bar – ‘\\@£#?,’\\[]`,
		);
	});

	it('does not render arbitrary markup', () => {
		const { container } = render(<HtmlDecoder html="This is a <span>title</span>" />);
		expect(container).toMatchInlineSnapshot(`
      <div>
        This is a title
      </div>
    `);
	});
});
