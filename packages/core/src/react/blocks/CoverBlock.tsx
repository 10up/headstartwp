import { Element } from 'html-react-parser';
import { isBlock } from '../../dom';
import { BlockProps } from '../components';
import { useBlockAttributes } from '../hooks/useBlockAttributes';
import { BlockAttributes, GutenbergBlockProps } from './types';

export interface GutenbergCoverBlockProps
	extends GutenbergBlockProps,
		Pick<BlockAttributes, 'color' | 'align' | 'dimensions' | 'styles'> {
	isRepeatedBackground?: boolean;
}

export interface CoverBlockProps extends Omit<BlockProps, 'test'> {
	domNode: Element;
	className?: string;
	component: React.FC<GutenbergCoverBlockProps>;
}

export const CoverBlock = ({ domNode: node, children, component: Component }: CoverBlockProps) => {
	const { className, color, dimensions, styles } = useBlockAttributes(node);
	const attrs = node.attribs['data-wp-block'];
	console.log(JSON.parse(attrs));

	return (
		<Component
			name="core/cover"
			className={className}
			attribs={node.attribs}
			color={color}
			dimensions={dimensions}
			styles={styles}
		>
			{children}
		</Component>
	);
};

CoverBlock.defaultProps = {
	test: (node) => isBlock(node, { tagName: 'div', className: 'wp-block-cover' }),
};
