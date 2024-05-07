import { isBlock } from '../../dom';
import type { IBlock } from '../components';
import { defaultElement, useBlock, useBlockAttributes } from './hooks';
import type { IBlockAttributes } from './types';

export interface MediaTextBlockProps extends IBlockAttributes {
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

export function MediaTextBlock({
	domNode: node = defaultElement,
	children,
	component: Component,
	style,
}: IMediaTextBlock) {
	const { name, className, attributes } = useBlock<MediaTextBlockProps>(node);
	const blockAttributes = useBlockAttributes(node);

	return (
		<Component
			name={name}
			domNode={node}
			className={className}
			htmlAnchor={node.attribs.id || ''}
			mediaId={attributes.mediaId}
			mediaPosition={attributes.mediaPosition}
			mediaType={attributes.mediaType}
			mediaSizeSlug={attributes.mediaSizeSlug}
			mediaWidth={attributes.mediaWidth}
			imageFill={!!attributes.imageFill}
			focalPoint={attributes.focalPoint}
			verticalAlignment={attributes.verticalAlignment}
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
export namespace MediaTextBlock {
	export const defaultProps = {
		test: (node) => {
			return isBlock(node, { tagName: 'div', className: 'wp-block-media-text' });
		},
	};
}
