'use client';

import type { Element, Text } from 'html-react-parser';
import { isBlock } from '../../dom';
import { IBlock } from '../components';
import { useBlock, useBlockAttributes } from './hooks';
import { IBlockAttributes } from './types';
import { DEFAULT_BLOCK_ELEMENT } from '../../dom/parseBlockAttributes';

/**
 * The interface for components rendered by {@link AudioBlock}
 */
export interface AudioBlockProps extends IBlockAttributes {
	/**
	 * The audio source URL.
	 */
	src: string;

	/**
	 * Whether the audio should be autoplayable
	 */
	autoplay?: boolean;

	/**
	 * Audio caption
	 */
	caption?: string;

	/**
	 * Whether the audio should be played in a loop
	 */
	loop?: boolean;

	/**
	 * Whether to preload the audio or not
	 */
	preload?: string;
}

/**
 * The interface for the {@link AudioBlock} component.
 */
export interface IAudioBlock extends IBlock<AudioBlockProps> {}

/**
 * The AudioBlock components implements block parsing for the Audio block.
 *
 * This component must be used within a {@link BlocksRenderer} component.
 *
 * ```tsx
 * <BlocksRenderer html={html}>
 * 	<AudioBlock component={DebugComponent} />
 * </BlocksRenderer>
 * ```
 *
 * @category Blocks
 *
 * @param props Component properties
 *
 */
export function AudioBlock({
	domNode: node = DEFAULT_BLOCK_ELEMENT,
	children,
	component: Component,
	style,
}: IAudioBlock) {
	const { name, className } = useBlock(node);
	const blockAttributes = useBlockAttributes(node);

	const audio = node.firstChild as Element;
	const figcaption = node.lastChild as Element;
	const caption = (figcaption.firstChild as Text).data;
	const audioAttributes = audio.attribs;

	return (
		<Component
			name={name}
			domNode={node}
			className={className}
			src={audioAttributes.src}
			caption={caption}
			autoplay={!!audioAttributes.autoplay}
			loop={!!audioAttributes.loop}
			preload={audioAttributes.preload}
			attributes={blockAttributes}
			style={style}
		>
			{children}
		</Component>
	);
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace AudioBlock {
	export const defaultProps = {
		test: (node: Element) => isBlock(node, { tagName: 'figure', className: 'wp-block-audio' }),
	};
}
