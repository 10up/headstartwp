import Link from 'next/link';
import { Element } from 'html-react-parser';
import { ReactNode } from 'react';
import { removeSourceUrl } from '@10up/headless-core/utils';
import { useSettings } from '@10up/headless-core/react';
import { getAttributes, isAnchorTag } from '@10up/headless-core';

export type LinkBlockProps = {
	domNode: Element;
	children?: ReactNode;
};

/**
 * The Link Block converts a anchor tag node into a next/link component if it's an internal link
 *
 * ## Usage
 *
 * ```tsx
 * import { BlocksRenderer } from "@10up/headless-core/react";
 * import { LinkBlock } from "@10up/headless-next";
 *
 * <BlocksRenderer html={html}>
 * 	<LinkBlock />
 * </BlocksRenderer>
 * ```
 *
 * @param props Link Block Props
 * @param props.domNode The domNode element
 * @param props.children Children prop
 *
 * @returns The next/link component
 *
 * @category React Components
 */
export function LinkBlock({ domNode, children }: LinkBlockProps) {
	const { href, rel, className } = getAttributes(domNode.attribs);
	const settings = useSettings();
	const link = removeSourceUrl({ link: href, backendUrl: settings.sourceUrl || '' });
	const Component = typeof settings.linkComponent === 'function' ? settings.linkComponent : Link;

	return (
		<Component href={link}>
			{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
			<a rel={rel} className={className}>
				{children}
			</a>
		</Component>
	);
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace LinkBlock {
	export const defaultProps = {
		test: (node) => isAnchorTag(node, { isInternalLink: true }),
	};
}
