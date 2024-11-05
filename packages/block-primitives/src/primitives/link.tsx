import { FC } from 'react';
// @ts-expect-error
import NextLink from 'next/link';
import { LinkProps } from '#shared/types.js';

export const Link: FC<LinkProps> = ({ className, value, replace, prefetch, scroll }) => {
	if (typeof value === 'undefined') {
		return null;
	}

	return (
		<NextLink
			href={value.url}
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
