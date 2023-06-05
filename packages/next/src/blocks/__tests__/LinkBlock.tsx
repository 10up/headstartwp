import { render } from '@testing-library/react';
import React from 'react';
import { BlocksRenderer, SettingsProvider } from '@headstartwp/core/react';
import { getHeadstartWPConfig, setHeadstartWPConfig } from '@headstartwp/core';
import { LinkBlock } from '../LinkBlock';

describe('LinkBlock', () => {
	setHeadstartWPConfig({
		sourceUrl: 'http://www.backend.com',
	});

	it('converts links to Next Link component', () => {
		const { container } = render(
			<SettingsProvider settings={getHeadstartWPConfig()}>
				<BlocksRenderer html="<div><a href='http://www.backend.com/internal-page'>this is an internal link</a></div>">
					<LinkBlock />
				</BlocksRenderer>
			</SettingsProvider>,
		);
		expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <a
          class=""
          href="/internal-page"
        >
          this is an internal link
        </a>
      </div>
    `);
	});
});
