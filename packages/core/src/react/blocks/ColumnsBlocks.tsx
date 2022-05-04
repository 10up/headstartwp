import { Element } from 'html-react-parser';
import { isBlock } from '../../dom';
import { BlockProps } from '../components';
import { useBlockAttributes } from '../hooks/useBlockAttributes';
import { BlockAttributes, GutenbergBlockProps } from './types';

export interface GutenbergColumnsBlockProps
	extends GutenbergBlockProps,
		Pick<BlockAttributes, 'dimensions' | 'color' | 'styles'> {}

export interface ColumnsBlockProps extends Omit<BlockProps, 'test'> {
	className?: string;
	component: React.FC<GutenbergColumnsBlockProps>;
}

export const ColumnsBlock = ({ domNode, children, component: Component }: ColumnsBlockProps) => {
	// node is not undefined at this point
	const node = domNode as Element;

	const { className, dimensions, color, styles } = useBlockAttributes(node);

	return (
		<Component
			name="core/columns"
			className={className}
			attribs={node.attribs}
			dimensions={dimensions}
			color={color}
			styles={styles}
		>
			{children}
		</Component>
	);
};

ColumnsBlock.defaultProps = {
	test: (node) => isBlock(node, { tagName: 'div', className: 'wp-block-columns' }),
};
