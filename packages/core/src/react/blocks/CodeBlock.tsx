import { Element } from 'html-react-parser';
import { isBlock } from '../../dom';
import { BlockProps } from '../components';
import { useBlock } from './hooks';
import { useBlockAttributes } from './hooks/useBlockAttributes';
import { Colors, IBlockAttributes, Spacing, Typography } from './types';

export interface GutenbergCodeBlockProps extends IBlockAttributes {
	colors: Colors;
	typography: Typography;
	spacing: Spacing;
}

export interface CodeBlockProps extends Omit<BlockProps, 'test'> {
	domNode: Element;
	className?: string;
	component: React.FC<GutenbergCodeBlockProps>;
}

export const CodeBlock = ({ domNode: node, children, component: Component }: CodeBlockProps) => {
	const { name, className } = useBlock(node);
	const { colors, typography, spacing } = useBlockAttributes(node);

	return (
		<Component
			name={name}
			className={className}
			colors={colors}
			typography={typography}
			spacing={spacing}
		>
			{children}
		</Component>
	);
};

CodeBlock.defaultProps = {
	test: (node) => isBlock(node, { tagName: 'pre', className: 'wp-block-code' }),
};
