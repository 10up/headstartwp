import React, { FC } from 'react';

interface RawLinkProps {
	href: string;
	children: React.ReactNode;
}

export const RawLink: FC<RawLinkProps> = ({ children, href, ...props }) => {
	return (
		<a href={href} {...props}>
			{children}
		</a>
	);
};
