import { Element } from 'html-react-parser';
import { isBlock } from '../../dom';
import { BlockProps } from '../components';
import { useBlock } from './hooks';
import { useBlockAttributes } from './hooks/useBlockAttributes';
import { Colors, IBlockAttributes, Spacing } from './types';

export interface GutenbergCoverBlockProps extends IBlockAttributes {
	colors: Colors;
	spacing: Spacing;
	isRepeated?: boolean;
	id: number;
	dimRatio: number;
	isDark: boolean;
}

export interface CoverBlockProps extends Omit<BlockProps, 'test'> {
	domNode: Element;
	className?: string;
	component: React.FC<GutenbergCoverBlockProps>;
}

export const CoverBlock = ({ domNode: node, children, component: Component }: CoverBlockProps) => {
	const { name, className, attributes } = useBlock<GutenbergCoverBlockProps>(node);
	const { colors, spacing } = useBlockAttributes(node);

	return (
		<Component
			name={name}
			className={className}
			colors={colors}
			spacing={spacing}
			id={attributes.id}
			dimRatio={attributes.dimRatio}
			isDark={attributes.isDark}
		>
			{children}
		</Component>
	);
};

CoverBlock.defaultProps = {
	test: (node) => isBlock(node, { tagName: 'div', className: 'wp-block-cover' }),
};
