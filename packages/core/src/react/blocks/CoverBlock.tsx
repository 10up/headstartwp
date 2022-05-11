import { Element } from 'html-react-parser';
import { isBlock } from '../../dom';
import { BlockProps } from '../components';
import { useBlock } from './hooks';
import { useBlockAttributes } from './hooks/useBlockAttributes';
import { IBlockAttributes, Align, Spacing } from './types';

export interface GutenbergCoverBlockProps extends IBlockAttributes {
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

export interface CoverBlockProps extends Omit<BlockProps, 'test'> {
	domNode: Element;
	className?: string;
	component: React.FC<GutenbergCoverBlockProps>;
}

export const CoverBlock = ({ domNode: node, children, component: Component }: CoverBlockProps) => {
	const { name, className, attributes } = useBlock<GutenbergCoverBlockProps>(node);
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
};
