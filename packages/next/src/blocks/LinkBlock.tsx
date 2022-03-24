import Link from 'next/link';
import { Element } from 'html-react-parser';
import { PropsWithChildren } from 'react';
import { removeSourceUrl } from '@10up/headless-core/utils';
import { useSettings } from '@10up/headless-core';

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
	const { href, rel } = domNode.attribs;
	const settings = useSettings();
	const link = removeSourceUrl({ link: href, backendUrl: settings.sourceUrl || '' });
	const Component = typeof settings.linkComponent === 'function' ? settings.linkComponent : Link;

	return (
		<Component href={link}>
			{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
			<a rel={rel}>{children}</a>
		</Component>
	);
};
