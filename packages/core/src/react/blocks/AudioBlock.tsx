import { Element, Text } from 'html-react-parser';
import { isBlock } from '../../dom';
import { IBlock } from '../components';
import { useBlock } from './hooks';
import { IBlockAttributes } from './types';

export interface AudioBlockProps extends IBlockAttributes {
	src: string;
	autoplay?: boolean;
	caption?: string;
	loop?: boolean;
	preload?: string;
}

export interface IAudioBlock extends IBlock<AudioBlockProps> {}

export const AudioBlock = ({ domNode: node, children, component: Component }: IAudioBlock) => {
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
};

AudioBlock.defaultProps = {
	test: (node) => isBlock(node, { tagName: 'figure', className: 'wp-block-audio' }),
};
