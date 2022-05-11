import { Element } from 'html-react-parser';
import { isBlock } from '../../dom';
import { BlockProps } from '../components';
import { useBlock } from './hooks';
import { useBlockAttributes } from './hooks/useBlockAttributes';
import { Colors, IBlockAttributes, Spacing } from './types';

export interface GutenbergColumnsBlockProps extends IBlockAttributes {
	colors: Colors;
	spacing: Spacing;
	blockStyle: string;
}

export interface ColumnsBlockProps extends Omit<BlockProps, 'test'> {
	domNode: Element;
	className?: string;
	component: React.FC<GutenbergColumnsBlockProps>;
}

export const ColumnsBlock = ({
	domNode: node,
	children,
	component: Component,
}: ColumnsBlockProps) => {
	const { name, className } = useBlock(node);
	const { spacing, colors, blockStyle } = useBlockAttributes(node);

	return (
		<Component
			name={name}
			domNode={node}
			className={className}
			colors={colors}
			spacing={spacing}
			blockStyle={blockStyle}
		>
			{children}
		</Component>
	);
};

ColumnsBlock.defaultProps = {
	test: (node) => isBlock(node, { tagName: 'div', className: 'wp-block-columns' }),
};
