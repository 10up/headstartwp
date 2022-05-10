import { Element, Text } from 'html-react-parser';
import { isBlock } from '../../dom';
import { BlockProps } from '../components';
import { useBlock } from './hooks';
import { GutenbergBlockProps } from './types';

export interface GutenbergAudioProps extends GutenbergBlockProps {
	src: string;
	autoplay?: boolean;
	caption?: string;
	loop?: boolean;
	preload?: string;
}

export interface AudioBlockProps extends Omit<BlockProps, 'test'> {
	domNode: Element;
	className?: string;
	component: React.FC<GutenbergAudioProps>;
}

export const AudioBlock = ({ domNode: node, children, component: Component }: AudioBlockProps) => {
	const { name, className } = useBlock(node);

	const audio = node.firstChild as Element;
	const figcaption = node.lastChild as Element;
	const caption = (figcaption.firstChild as Text).data;
	const audioAttributes = audio.attribs;

	return (
		<Component
			name={name}
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
