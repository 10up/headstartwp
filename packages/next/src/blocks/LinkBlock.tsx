import Link from 'next/link.js';
import { removeSourceUrl } from '@headstartwp/core/utils';
import { IBlock, IBlockAttributes, useSettings } from '@headstartwp/core/react';
import { getAttributes, isAnchorTag } from '@headstartwp/core';

export interface LinkBlockProps extends IBlockAttributes {
	href: string;
	rel: string;
}

/**
 * The Link Block converts a anchor tag node into a next/link component if it's an internal link
 *
 * #### Usage
 *
 * ```tsx
 * import { BlocksRenderer } from "@headstartwp/core/react";
 * import { LinkBlock } from "@headstartwp/next";
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
export function LinkBlock({ domNode, children }: Omit<IBlock<LinkBlockProps>, 'component'>) {
	// Links might not always be an actual block since it can be just regular links
	const { href, rel, className } = getAttributes(domNode?.attribs ?? {});

	const settings = useSettings();
	const link = removeSourceUrl({
		link: href,
		backendUrl: settings.sourceUrl || '',
		publicUrl: settings.hostUrl ?? '/',
	});

	const Component = typeof settings.linkComponent === 'function' ? settings.linkComponent : Link;

	return (
		<Component href={link} rel={rel} className={className}>
			{children}
		</Component>
	);
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace LinkBlock {
	export const defaultProps = {
		test: (node, site) => isAnchorTag(node, { isInternalLink: true }, site),
	};
}
