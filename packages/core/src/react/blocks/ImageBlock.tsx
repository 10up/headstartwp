import { Element } from 'html-react-parser';
import { isBlockByName } from '../../dom';
import { IBlock } from '../components';
import { useBlock } from './hooks';
import { useBlockAttributes } from './hooks/useBlockAttributes';
import { IBlockAttributes } from './types';

export interface ImageBlockProps extends IBlockAttributes {
	width?: number;
	height?: number;
	sizeSlug?: string;
	linkDestination?: string;
	src: string;
	alt?: string;
}

export interface IImageBlock extends IBlock<ImageBlockProps> {}

export function ImageBlock({ domNode: node, children, component: Component, style }: IImageBlock) {
	const { name, className, attributes } = useBlock<ImageBlockProps>(node);
	const blockAttributes = useBlockAttributes(node);

	const hasFigureNode = (node.firstChild as Element).name === 'figure';

	const { width, height } = attributes;
	let imgNode;

	if (hasFigureNode) {
		const figureNode = node.children[0] as Element;

		if (figureNode.children[0]) {
			imgNode = figureNode.children[0] as Element;
		}
	} else {
		imgNode = node.children[0] as Element;
	}

	const { src, alt, width: imgNodeWidth, height: imgNodeHeight } = imgNode.attribs;

	return (
		<Component
			name={name}
			domNode={node}
			className={className}
			src={src}
			alt={alt}
			attributes={blockAttributes}
			width={width || Number(imgNodeWidth)}
			height={height || Number(imgNodeHeight)}
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
export namespace ImageBlock {
	export const defaultProps = {
		test: (node) => {
			return isBlockByName(node, 'core/image');
		},
	};
}
