import { Element, Text } from 'html-react-parser';
import { getAttributes, isBlock } from '../../dom';
import { BlockProps } from '../components';
import { BlockAttributes, GutenbergBlockProps } from './types';

export interface GutenbergAudioProps extends GutenbergBlockProps, BlockAttributes {
	src: string;
	autoplay?: boolean;
	caption?: string;
	loop?: boolean;
	preload?: string;
}

export interface AudioBlockProps extends Omit<BlockProps, 'test'> {
	className?: string;
	component: React.FC<GutenbergAudioProps>;
}

export const AudioBlock = ({ domNode, children, component: Component }: AudioBlockProps) => {
	// node is not undefined at this point
	const node = domNode as Element;

	const audio = node.firstChild as Element;
	const figcaption = node.lastChild as Element;
	const caption = (figcaption.firstChild as Text).data;
	const audioAttributes = getAttributes(audio.attribs);
	const attributes = getAttributes(node.attribs);

	return (
		<Component
			name="core/audio"
			className={attributes.className}
			attribs={attributes}
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
