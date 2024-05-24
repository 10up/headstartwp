import type { ReactNode } from 'react';

import { removeSourceUrl } from '@headstartwp/core';
import { useSettings } from '@headstartwp/core/react';
import NextLink from 'next/link';

type LinkProps = {
	href: string;
	rel?: string;
	target?: '_blank' | '_self';
	children: ReactNode;
};

export const Link = ({ href, rel = '', children, target = '_self' }: LinkProps) => {
	const settings = useSettings();
	const link = removeSourceUrl({ link: href, backendUrl: settings.sourceUrl || '' });

	return (
		<NextLink href={link} rel={rel} target={target}>
			{children}
		</NextLink>
	);
};
