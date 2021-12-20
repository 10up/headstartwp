import Link from 'next/link';
import { Element } from 'html-react-parser';
import { PropsWithChildren } from 'react';

export type LinkBlockProps = PropsWithChildren<{
	domNode: Element;
}>;

/**
 * The Image Block converts a image node into a next/image component
 *
 * @param props Link Block Props
 * @param props.domNode The domNode element
 * @param props.children Children prop
 *
 * @returns The next/link component
 */
export const LinkBlock = ({ domNode, children }) => {
	const { href } = domNode.attribs;

	// transform href link

	return <Link href={href}>{children}</Link>;
};
