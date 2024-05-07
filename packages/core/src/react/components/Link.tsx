import type { FC } from 'react';

interface RawLinkProps {
	href: string;
}

export const RawLink: FC<RawLinkProps> = ({ children, href, ...props }) => {
	return (
		<a href={href} {...props}>
			{children}
		</a>
	);
};
