import { Element } from 'html-react-parser';
import { isBlock } from '../../dom';
import { BlockProps } from '../components';
import { useBlock } from './hooks';
import { useBlockAttributes } from './hooks/useBlockAttributes';
import { Colors, IBlockAttributes, Spacing } from './types';

export interface GutenbergColumnBlockProps extends IBlockAttributes {
	colors: Colors;
	spacing: Spacing;
	width?: string;
}

export interface ColumnBlockProps extends Omit<BlockProps, 'test'> {
	domNode: Element;
	className?: string;
	component: React.FC<GutenbergColumnBlockProps>;
}

export const ColumnBlock = ({
	domNode: node,
	children,
	component: Component,
}: ColumnBlockProps) => {
	const { className, name } = useBlock(node);
	const { spacing, colors, width } = useBlockAttributes(node);

	return (
		<Component
			name={name}
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
