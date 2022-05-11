import { Element } from 'html-react-parser';
import { isBlock } from '../../dom';
import { BlockProps } from '../components';
import { useBlock, useBlockAttributes } from './hooks';
import { Align, Colors, IBlockAttributes, Typography } from './types';

export interface GutenberTableProps extends IBlockAttributes {
	typography?: Typography;
	align?: Align;
	blockStyle?: string;
	colors?: Colors;
	hasFixedLayout?: boolean;
}

export interface TableBlockBlockProps extends Omit<BlockProps, 'test'> {
	domNode: Element;
	className?: string;
	component: React.FC<GutenberTableProps>;
}

export const TableBlock = ({
	domNode: node,
	children,
	component: Component,
}: TableBlockBlockProps) => {
	const { name, className, attributes } = useBlock<GutenberTableProps>(node);
	const { align, typography, blockStyle, colors } = useBlockAttributes(node);

	return (
		<Component
			name={name}
			className={className}
			align={align}
			typography={typography}
			blockStyle={blockStyle}
			colors={colors}
			htmlAnchor={node.attribs.id || ''}
			hasFixedLayout={!!attributes.hasFixedLayout}
		>
			{children}
		</Component>
	);
};

TableBlock.defaultProps = {
	test: (node) => {
		return isBlock(node, { tagName: 'figure', className: 'wp-block-table' });
	},
};
