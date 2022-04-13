import { FC, ReactNode } from 'react';

interface RawLinkProps {
	href: string;
	children: ReactNode;
}

export const RawLink: FC<RawLinkProps> = ({ children, href, ...props }) => {
	return (
		<a href={href} {...props}>
			{children}
		</a>
	);
};
