import { Element } from 'html-react-parser';
import { getAttributes, isBlock } from '../../dom';
import { BlockProps } from '../components';
import { useBlockAttributes } from '../hooks/useBlockAttributes';
import { BlockAttributes, GutenbergBlockProps } from './types';

export interface GutenbergCodeBlockProps
	extends GutenbergBlockProps,
		Pick<BlockAttributes, 'color' | 'typography' | 'dimensions'> {}

export interface CodeBlockProps extends Omit<BlockProps, 'test'> {
	className?: string;
	component: React.FC<GutenbergCodeBlockProps>;
}

export const CodeBlock = ({ domNode, children, component: Component }: CodeBlockProps) => {
	// node is not undefined at this point
	const node = domNode as Element;
	const attributes = getAttributes(node.attribs);

	const { color, typography, dimensions } = useBlockAttributes(node);

	return (
		<Component
			name="core/code"
			className={attributes.className}
			attribs={attributes}
			color={color}
			typography={typography}
			dimensions={dimensions}
		>
			{children}
		</Component>
	);
};

CodeBlock.defaultProps = {
	test: (node) => isBlock(node, { tagName: 'pre', className: 'wp-block-code' }),
};
