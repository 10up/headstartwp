import { render } from '@testing-library/react';
import React from 'react';
import { BlocksRenderer } from '@headstartwp/core/react';
import { getHeadstartWPConfig, setHeadstartWPConfig } from '@headstartwp/core';
import { LinkBlock } from '../LinkBlock';

describe('LinkBlock', () => {
	it('shound replace internal links with next/link', () => {
		setHeadstartWPConfig({
			sourceUrl: 'http://wpadmin.com',
			hostUrl: 'http://domain.com',
		});

		const { container } = render(
			<BlocksRenderer
				html="<div class='content'><a href='http://wpadmin.com/post-name'>This is an internal link</a>></div>"
				settings={getHeadstartWPConfig()}
			>
				<LinkBlock />
			</BlocksRenderer>,
		);

		expect(container).toMatchSnapshot();
	});
});
