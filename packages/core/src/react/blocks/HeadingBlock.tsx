import { isBlockByName } from '../../dom';
import { IBlock } from '../components';
import { useBlock, useBlockAttributes } from './hooks';
import { Align, Colors, IBlockAttributes, Typography } from './types';

export interface HeadingBlockProps extends IBlockAttributes {
	level: number;
	colors?: Colors;
	typography?: Typography;
	align?: Align;
}

export interface IHeadingBlock extends IBlock<HeadingBlockProps> {}

export const HeadingBlock = ({ domNode: node, children, component: Component }: IHeadingBlock) => {
	const { name, className, attributes } = useBlock<HeadingBlockProps>(node);
	const { align, colors, typography } = useBlockAttributes(node);

	const level = attributes.level ?? Number(node.tagName.replace('h', ''));

	return (
		<Component
			name={name}
			domNode={node}
			className={className}
			level={level}
			align={align}
			colors={colors}
			typography={typography}
		>
			{children}
		</Component>
	);
};

HeadingBlock.defaultProps = {
	test: (node) => {
		return isBlockByName(node, 'core/heading');
	},
};
