'use client';

import { removeSourceUrl } from '@headstartwp/core';
import { useSettings } from '@headstartwp/core/react';
import { FC } from 'react';
import NextLink from 'next/link.js';

type LinkProps = React.ComponentProps<typeof NextLink>;

export const Link: FC<LinkProps> = ({ children, href, ...props }) => {
	const settings = useSettings();

	if (typeof settings === 'undefined') {
		throw new Error('The Link component must be used within the SettingsProvider');
	}

	const link =
		typeof href === 'string'
			? removeSourceUrl({
					link: href,
					backendUrl: settings.sourceUrl || '',
					publicUrl: settings.hostUrl ?? '/',
				})
			: href;

	return (
		<NextLink href={link} {...props}>
			{children}
		</NextLink>
	);
};
