import { isBlock } from '../../dom';
import { IBlock } from '../components';
import { useBlock, useBlockAttributes } from './hooks';
import { Align, Colors, IBlockAttributes } from './types';

export interface MediaTextBlockProps extends IBlockAttributes {
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

export interface IMediaTextBlock extends IBlock<MediaTextBlockProps> {}
export function MediaTextBlock({ domNode: node, children, component: Component }: IMediaTextBlock) {
	const { name, className, attributes } = useBlock<MediaTextBlockProps>(node);
	const { colors, blockStyle, align } = useBlockAttributes(node);

	return (
		<Component
			name={name}
			domNode={node}
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
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace MediaTextBlock {
	export const defaultProps = {
		test: (node) => {
			return isBlock(node, { tagName: 'div', className: 'wp-block-media-text' });
		},
	};
}
