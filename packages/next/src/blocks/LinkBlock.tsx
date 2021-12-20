import Link from 'next/link';
import { Element } from 'html-react-parser';
import { PropsWithChildren } from 'react';
// eslint-disable-next-line
import { removeSourceUrl } from '@10up/headless-core/utils';
import { getWPUrl } from '@10up/headless-core';

export type LinkBlockProps = PropsWithChildren<{
	domNode: Element;
}>;

/**
 * The Link Block converts a image node into a next/link component
 *
 * @param props Link Block Props
 * @param props.domNode The domNode element
 * @param props.children Children prop
 *
 * @returns The next/link component
 */
export const LinkBlock = ({ domNode, children }) => {
	const { href } = domNode.attribs;
	const link = removeSourceUrl({ link: href, backendUrl: getWPUrl() });
	return <Link href={link}>{children}</Link>;
};
