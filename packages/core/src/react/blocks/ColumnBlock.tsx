import { isBlock } from '../../dom';
import { IBlock } from '../components';
import { useBlock } from './hooks';
import { useBlockAttributes } from './hooks/useBlockAttributes';
import { Colors, IBlockAttributes, Spacing } from './types';

export interface ColumnBlockProps extends IBlockAttributes {
	colors: Colors;
	spacing: Spacing;
	width?: string;
}

export interface IColumnBlock extends IBlock<ColumnBlockProps> {}

export const ColumnBlock = ({ domNode: node, children, component: Component }: IColumnBlock) => {
	const { className, name } = useBlock(node);
	const { spacing, colors, width } = useBlockAttributes(node);

	return (
		<Component
			name={name}
			domNode={node}
			className={className}
			spacing={spacing}
			colors={colors}
			width={width}
		>
			{children}
		</Component>
	);
};

ColumnBlock.defaultProps = {
	test: (node) => isBlock(node, { tagName: 'div', className: 'wp-block-column' }),
};
