import Link from 'next/link.js';
import { removeSourceUrl } from '@headstartwp/core/utils';
import { BlockFC, BlockProps, IDataWPBlock } from '@headstartwp/core/react';
import { getAttributes, HeadlessConfig, isAnchorTag } from '@headstartwp/core';
import React from 'react';

interface LinkBlockProps extends BlockProps<IDataWPBlock> {
	children?: React.ReactNode;
}

/**
 * The Link Block converts a anchor tag node into a next/link component if it's an internal link
 *
 * #### Usage
 *
 * ```tsx
 * import { BlocksRenderer } from "@headstartwp/core/react";
 * import { LinkBlock } from "@headstartwp/next/app";
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
export const LinkBlock: BlockFC<LinkBlockProps> = ({ domNode, children, blockContext }) => {
	const settings =
		typeof blockContext?.settings !== 'undefined'
			? blockContext.settings
			: ({} as HeadlessConfig);

	// Links might not always be an actual block since it can be just regular links
	const { href, rel, className } = getAttributes(domNode?.attribs ?? {});

	const link = removeSourceUrl({
		link: href,
		backendUrl: settings.sourceUrl || '',
		publicUrl: settings.hostUrl ?? '/',
	});

	return (
		<Link href={link} rel={rel} className={className}>
			{children}
		</Link>
	);
};

LinkBlock.test = (node, site) => isAnchorTag(node, { isInternalLink: true }, site);
