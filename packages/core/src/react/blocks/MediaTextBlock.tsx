import { Element } from 'html-react-parser';
import { isBlock } from '../../dom';
import { BlockProps } from '../components';
import { useBlock, useBlockAttributes } from './hooks';
import { Align, Colors, IBlockAttributes } from './types';

export interface GutenberMediaTextProps extends IBlockAttributes {
	align: Align;
	blockStyle?: string;
	colors?: Colors;
	mediaPosition?: 'left' | 'right';
	mediaId?: number;
	mediaType?: 'image' | 'video';
	mediaSizeSlug?: string;
	mediaWidth?: number;
	imageFill: boolean;
	focalPoint?: {
		x: string | number;
		y: string | number;
	};
	verticalAlignment?: 'top' | 'center' | 'bottom';
}

export interface MediaTextBlockBlockProps extends Omit<BlockProps, 'test'> {
	domNode: Element;
	className?: string;
	component: React.FC<GutenberMediaTextProps>;
}

export const MediaTextBlock = ({
	domNode: node,
	children,
	component: Component,
}: MediaTextBlockBlockProps) => {
	const { name, className, attributes } = useBlock<GutenberMediaTextProps>(node);
	const { colors, blockStyle, align } = useBlockAttributes(node);

	return (
		<Component
			name={name}
			className={className}
			htmlAnchor={node.attribs.id || ''}
			align={align}
			colors={colors}
			blockStyle={blockStyle}
			mediaId={attributes.mediaId}
			mediaPosition={attributes.mediaPosition}
			mediaType={attributes.mediaType}
			mediaSizeSlug={attributes.mediaSizeSlug}
			mediaWidth={attributes.mediaWidth}
			imageFill={!!attributes.imageFill}
			focalPoint={attributes.focalPoint}
			verticalAlignment={attributes.verticalAlignment}
		>
			{children}
		</Component>
	);
};

MediaTextBlock.defaultProps = {
	test: (node) => {
		return isBlock(node, { tagName: 'div', className: 'wp-block-media-text' });
	},
};
