import { PropsWithChildren } from 'react';

interface RawLinkProps {
	href: string;
	children: React.ReactNode;
}

export const RawLink = ({ children, href, ...props }: PropsWithChildren<RawLinkProps>) => {
	return (
		<a href={href} {...props}>
			{children}
		</a>
	);
};
