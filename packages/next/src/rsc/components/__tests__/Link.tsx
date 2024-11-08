import { render } from '@testing-library/react';
import React from 'react';
import { SettingsProvider } from '@headstartwp/core/react';
import { Link } from '../Link';

describe('Link', () => {
	it('shound replace internal links with next/link', () => {
		const { container } = render(
			<SettingsProvider
				settings={{
					sourceUrl: 'http://wpadmin.com',
					hostUrl: 'http://domain.com',
				}}
			>
				<Link href="http://wpadmin.com/post-name" />
			</SettingsProvider>,
		);

		expect(container).toMatchSnapshot();
	});
});
