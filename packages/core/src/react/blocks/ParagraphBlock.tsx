import { Element } from 'html-react-parser';
import { isBlockByName } from '../../dom';
import { IBlock } from '../components';
import { useBlock, useBlockAttributes } from './hooks';
import { Align, Colors, IBlockAttributes, Typography } from './types';

export interface ParagraphBlockProps extends IBlockAttributes {
	dropCap?: boolean;
	align?: Align;
	colors?: Colors;
	typography?: Typography;
}

export interface IParagraphBlock extends IBlock<ParagraphBlockProps> {}

export const ParagraphBlock = ({
	domNode: node,
	component: Component,
	children,
}: IParagraphBlock) => {
	const { className, name, attributes } = useBlock<ParagraphBlockProps>(node);
	const { align, colors, typography } = useBlockAttributes(node);

	return (
		<Component
			name={name}
			domNode={node}
			className={className || ''}
			align={align}
			colors={colors}
			typography={typography}
			dropCap={attributes?.dropCap || false}
		>
			{children}
		</Component>
	);
};

ParagraphBlock.defaultProps = {
	test: (node: Element) => isBlockByName(node, 'core/paragraph'),
};
