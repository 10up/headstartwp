import { removeSourceUrl } from '@headstartwp/core';
import { useSettings } from '@headstartwp/react';
import NextLink from 'next/link';
import { FC } from 'react';

export const Link: FC<{ href: string; rel?: string }> = ({ href, rel, children }) => {
	const settings = useSettings();
	const link = removeSourceUrl({ link: href, backendUrl: settings.sourceUrl || '' });

	return (
		<NextLink href={link} rel={rel}>
			{children}
		</NextLink>
	);
};

Link.defaultProps = {
	rel: '',
};
