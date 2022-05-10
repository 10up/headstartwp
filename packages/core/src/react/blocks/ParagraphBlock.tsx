import { Element } from 'html-react-parser';
import { isBlockByName } from '../../dom';
import { BlockProps } from '../components';
import { useBlock, useBlockAttributes } from './hooks';
import { Align, Colors, IBlockAttributes, Typography } from './types';

export interface GutenberParagraphBlockProps extends IBlockAttributes {
	dropCap?: boolean;
	align?: Align;
	colors?: Colors;
	typography?: Typography;
}

export interface ParagraphBlockProps extends Omit<BlockProps, 'test'> {
	domNode: Element;
	className?: string;
	component: React.FC<GutenberParagraphBlockProps>;
}

export const ParagraphBlock = ({
	domNode: node,
	component: Component,
	children,
}: ParagraphBlockProps) => {
	const { className, name } = useBlock(node);
	const { align, colors, typography } = useBlockAttributes(node);

	return (
		<Component
			name={name}
			domNode={node}
			className={className || ''}
			align={align}
			colors={colors}
			typography={typography}
		>
			{children}
		</Component>
	);
};

ParagraphBlock.defaultProps = {
	test: (node: Element) => isBlockByName(node, 'core/paragraph'),
};
