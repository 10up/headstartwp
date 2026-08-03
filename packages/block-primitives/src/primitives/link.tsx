import React, { FC } from 'react';
// @ts-expect-error
import NextLink from 'next/link';
import { removeSourceUrl } from '@headstartwp/core';
import { LinkProps } from '#shared/types.js';

export const Link: FC<LinkProps> = ({
	className,
	value,
	replace,
	prefetch,
	scroll,
	linkSettings,
}) => {
	if (typeof value === 'undefined') {
		return null;
	}

	const link =
		typeof linkSettings !== 'undefined'
			? removeSourceUrl({
					link: value.url,
					backendUrl: linkSettings.sourceUrl || '',
					publicUrl: linkSettings.hostUrl ?? '/',
				})
			: value.url;

	return (
		<NextLink
			href={link}
			className={className}
			title={value.title}
			target={value.opensInNewTab ? '_blank' : '_self'}
			rel="noreferrer"
			replace={replace}
			prefetch={prefetch}
			scroll={scroll}
		>
			{value.text ?? value.text}
		</NextLink>
	);
};
