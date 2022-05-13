import { isBlock } from '../../dom';
import { IBlock } from '../components';
import { useBlock, useBlockAttributes } from './hooks';
import { Align, Colors, IBlockAttributes } from './types';

export interface SeparatorBlockProps extends IBlockAttributes {
	align?: Align;
	blockStyle?: string;
	colors?: Colors;
}

export interface ISeparatorBlock extends IBlock<SeparatorBlockProps> {}

export const SeparatorBlock = ({
	domNode: node,
	children,
	component: Component,
}: ISeparatorBlock) => {
	const { name, className } = useBlock<SeparatorBlockProps>(node);
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
