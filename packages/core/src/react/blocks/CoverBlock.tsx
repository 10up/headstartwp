import { isBlock, isImageTag } from '../../dom';
import { IBlock } from '../components';
import { useBlock } from './hooks';
import { useBlockAttributes } from './hooks/useBlockAttributes';
import { IBlockAttributes, Align, Spacing } from './types';

export interface CoverBlockProps extends IBlockAttributes {
	overlayColor: string;
	spacing: Spacing;
	hasParallax: boolean;
	isRepeated: boolean;
	id: number;
	dimRatio: number;
	isDark: boolean;
	align: Align;
	url: string;
	minHeight: number;
	focalPoint?: {
		x: string | number;
		y: string | number;
	};
}

export interface ICoverBlock extends IBlock<CoverBlockProps> {}

export const CoverBlock = ({ domNode: node, children, component: Component }: ICoverBlock) => {
	const { name, className, attributes } = useBlock<CoverBlockProps>(node);
	const { spacing, align } = useBlockAttributes(node);

	return (
		<Component
			name={name}
			domNode={node}
			className={className}
			overlayColor={attributes.overlayColor}
			spacing={spacing}
			id={attributes.id}
			dimRatio={attributes.dimRatio}
			isDark={attributes.isDark}
			align={align}
			url={attributes.url}
			minHeight={attributes.minHeight}
			hasParallax={!!attributes.hasParallax}
			isRepeated={!!attributes.isRepeated}
			focalPoint={attributes.focalPoint}
		>
			{children}
		</Component>
	);
};

CoverBlock.defaultProps = {
	test: (node) => isBlock(node, { tagName: 'div', className: 'wp-block-cover' }),
	exclude: (node) => isImageTag(node) || node.name === 'video',
};
