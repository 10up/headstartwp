import { isTwitterEmbed } from '@headstartwp/core';
import { IBlock, IBlockAttributes } from '@headstartwp/core/react';
import Script from 'next/script.js';

/**
 * Renders a twitter embed
 *
 * #### Usage
 *
 * ```tsx
 * import { BlocksRenderer } from "@headstartwp/core/react";
 * import { TwitterBlock } from "@headstartwp/next";
 *
 * <BlocksRenderer html={html}>
 * 	<TwitterBlock />
 * </BlocksRenderer>
 * ```
 *
 * @param props Link Block Props
 * @param props.domNode The domNode element
 * @param props.children Children prop
 *
 * @category React Components
 */
export function TwitterBlock({ children }: Omit<IBlock<IBlockAttributes>, 'component'>) {
	return (
		<>
			<Script src="https://platform.twitter.com/widgets.js" strategy="lazyOnload" />

			{children}
		</>
	);
}

TwitterBlock.test = (node) => isTwitterEmbed(node);
