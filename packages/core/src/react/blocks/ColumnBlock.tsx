import { Element } from 'html-react-parser';
import { isBlock } from '../../dom';
import { BlockProps } from '../components';
import { useBlockAttributes } from '../hooks/useBlockAttributes';
import { BlockAttributes, GutenbergBlockProps } from './types';

export interface GutenbergColumnBlockProps
	extends GutenbergBlockProps,
		Pick<BlockAttributes, 'dimensions' | 'color' | 'width'> {}

export interface ColumnBlockProps extends Omit<BlockProps, 'test'> {
	className?: string;
	component: React.FC<GutenbergColumnBlockProps>;
}

export const ColumnBlock = ({ domNode, children, component: Component }: ColumnBlockProps) => {
	// node is not undefined at this point
	const node = domNode as Element;

	const { className, dimensions, color, width } = useBlockAttributes(node);

	return (
		<Component
			name="core/column"
			className={className}
			attribs={node.attribs}
			dimensions={dimensions}
			color={color}
			width={width}
		>
			{children}
		</Component>
	);
};

ColumnBlock.defaultProps = {
	test: (node) => isBlock(node, { tagName: 'div', className: 'wp-block-column' }),
};
