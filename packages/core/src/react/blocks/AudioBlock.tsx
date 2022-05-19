import type { Element, Text } from 'html-react-parser';
import { isBlock } from '../../dom';
import { IBlock } from '../components';
import { useBlock } from './hooks';
import { IBlockAttributes } from './types';

/**
 * The interface for components rendered by [[AudioBlock]].
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
 * The interface for the [[AudioBlock]] component.
 */
export interface IAudioBlock extends IBlock<AudioBlockProps> {}

/**
 * The AudioBlock components implements block parsing for the Audio block.
 *
 * This component must be used within a [[BlocksRenderer]] component.
 *
 * ```tsx
 * <BlocksRenderer html={html}>
 * 	<AudioBlock component={DebugComponent} />
 * </BlocksRenderer>
 * ```
 *
 * @category React Components Blocks
 *
 * @param props Component properties
 *
 */
export function AudioBlock({ domNode: node, children, component: Component }: IAudioBlock) {
	const { name, className } = useBlock(node);

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
		>
			{children}
		</Component>
	);
}

AudioBlock.defaultProps = {
	test: (node: Element) => isBlock(node, { tagName: 'figure', className: 'wp-block-audio' }),
};
