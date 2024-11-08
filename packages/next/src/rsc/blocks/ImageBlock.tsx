import { domToReact, Element, isBlockByName } from '@headstartwp/core';
import { BlockFC, BlockProps } from '@headstartwp/core/react';
import { ImageComponent } from '../../components/ImageComponent';

type ImageBlockAttributes = {
	width?: number;
	height?: number;
	sizeSlug?: string;
	linkDestination?: string;
	src: string;
	alt?: string;
};

export const ImageBlock: BlockFC<BlockProps<ImageBlockAttributes>> = ({
	domNode: node,
	children,
	style,
	block,
}) => {
	if (typeof node === 'undefined') {
		return null;
	}

	if (typeof block === 'undefined') {
		return domToReact([node]);
	}

	const { name, className, attributes } = block;

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
	const imageWidth = width ?? imgNodeWidth;
	const imageHeight = height ?? imgNodeHeight;

	return (
		<ImageComponent
			name={name}
			domNode={node}
			className={className}
			src={src}
			alt={alt}
			width={imageWidth ? Number(imageWidth) : undefined}
			height={imageHeight ? Number(imageHeight) : undefined}
			style={style}
		>
			{children}
		</ImageComponent>
	);
};

ImageBlock.test = (node) => {
	return isBlockByName(node, 'core/image');
};
