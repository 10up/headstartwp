import { Element } from 'html-react-parser';
import { isBlockByName } from '../../dom';
import { BlockProps } from '../components';
import { useBlock, useBlockAttributes } from './hooks';
import { Align, Colors, IBlockAttributes, Typography } from './types';

export interface GutenbergHeadingProps extends IBlockAttributes {
	level: number;
	colors?: Colors;
	typography?: Typography;
	align?: Align;
}

export interface HeadingBlockBlockProps extends Omit<BlockProps, 'test'> {
	domNode: Element;
	className?: string;
	component: React.FC<GutenbergHeadingProps>;
}

export const HeadingBlock = ({
	domNode: node,
	children,
	component: Component,
}: HeadingBlockBlockProps) => {
	const { name, className, attributes } = useBlock<GutenbergHeadingProps>(node);
	const { align, colors, typography } = useBlockAttributes(node);

	const level = attributes.level ?? Number(node.tagName.replace('h', ''));

	return (
		<Component
			name={name}
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
