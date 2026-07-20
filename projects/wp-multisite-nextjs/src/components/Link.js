import { removeSourceUrl } from '@headstartwp/core';
import { useSettings } from '@headstartwp/core/react';
import NextLink from 'next/link';

export const Link = ({ href, rel = '', children }) => {
	const settings = useSettings();
	const link = removeSourceUrl({ link: href, backendUrl: settings.sourceUrl || '' });

	return (
		<NextLink href={link} rel={rel}>
			{children}
		</NextLink>
	);
};
