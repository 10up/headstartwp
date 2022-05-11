import { Element } from 'html-react-parser';
import { isBlock } from '../../dom';
import { BlockProps } from '../components';
import { useBlock, useBlockAttributes } from './hooks';
import { Align, Colors, IBlockAttributes } from './types';

export interface GutenbergSeparatorProps extends IBlockAttributes {
	align?: Align;
	blockStyle?: string;
	colors?: Colors;
}

export interface SeparatorBlockProps extends Omit<BlockProps, 'test'> {
	domNode: Element;
	className?: string;
	component: React.FC<GutenbergSeparatorProps>;
}

export const SeparatorBlock = ({
	domNode: node,
	children,
	component: Component,
}: SeparatorBlockProps) => {
	const { name, className } = useBlock<GutenbergSeparatorProps>(node);
	const { align, blockStyle, colors } = useBlockAttributes(node);

	return (
		<Component
			name={name}
			domNode={node}
			className={className}
			align={align}
			blockStyle={blockStyle}
			colors={colors}
			htmlAnchor={node.attribs.id || ''}
		>
			{children}
		</Component>
	);
};

SeparatorBlock.defaultProps = {
	test: (node) => {
		return isBlock(node, { tagName: 'hr', className: 'wp-block-separator' });
	},
};
