import { PropsWithChildren } from 'react';

interface RawLinkProps {
	href: string;
}

export const RawLink = ({ children, href, ...props }: PropsWithChildren<RawLinkProps>) => {
	return (
		<a href={href} {...props}>
			{children}
		</a>
	);
};
