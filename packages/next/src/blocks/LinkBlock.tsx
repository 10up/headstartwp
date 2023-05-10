import Link from 'next/link';
import { removeSourceUrl } from '@headstartwp/core/utils';
import { IBlock, IBlockAttributes, useBlock, useSettings } from '@headstartwp/react';
import { isAnchorTag } from '@headstartwp/core';

export interface LinkBlockProps extends IBlockAttributes {
	href: string;
	rel: string;
}

/**
 * The Link Block converts a anchor tag node into a next/link component if it's an internal link
 *
 * ## Usage
 *
 * ```tsx
 * import { BlocksRenderer } from "@headstartwp/react";
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
	const { attributes, className } = useBlock<LinkBlockProps>(domNode);

	const settings = useSettings();
	const link = removeSourceUrl({
		link: attributes.href,
		backendUrl: settings.sourceUrl || '',
		publicUrl: settings.hostUrl ?? '/',
	});

	const Component = typeof settings.linkComponent === 'function' ? settings.linkComponent : Link;

	return (
		<Component href={link} rel={attributes.rel} className={className}>
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
