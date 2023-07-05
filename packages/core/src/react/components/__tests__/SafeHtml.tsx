import * as React from 'react';
import { render } from '@testing-library/react';
import { SafeHtml } from '../SafeHtml';

describe('SafeHtml', () => {
	it('renders entities', () => {
		const { container } = render(
			<SafeHtml html="Hello world! &#8211; foo bar &#8211; &#8216;\@£#?,&#8217;\[]" />,
		);

		expect(container.firstChild).toMatchInlineSnapshot(
			`Hello world! – foo bar – ‘\\@£#?,’\\[]`,
		);
	});

	it('renders arbitraty markup', () => {
		const { container } = render(<SafeHtml html="This is a <span>title</span>" />);
		expect(container).toMatchInlineSnapshot(`
      <div>
        This is a 
        <span>
          title
        </span>
      </div>
    `);
	});
});
