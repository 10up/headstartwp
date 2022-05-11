import { Element } from 'html-react-parser';
import { isBlockByName } from '../../dom';
import { BlockProps } from '../components';
import { useBlock, useBlockAttributes } from './hooks';
import { Colors, IBlockAttributes, Typography } from './types';

export interface GutenbergListProps extends IBlockAttributes {
	colors?: Colors;
	typography?: Typography;
	ordered: boolean;
}

export interface ListBlockProps extends Omit<BlockProps, 'test'> {
	domNode: Element;
	className?: string;
	component: React.FC<GutenbergListProps>;
}

export const ListBlock = ({ domNode: node, children, component: Component }: ListBlockProps) => {
	const { name, className, attributes } = useBlock<GutenbergListProps>(node);
	const { typography, colors } = useBlockAttributes(node);

	return (
		<Component
			name={name}
			className={className}
			colors={colors}
			htmlAnchor={node.attribs.id || ''}
			typography={typography}
			ordered={!!attributes.ordered}
		>
			{children}
		</Component>
	);
};

ListBlock.defaultProps = {
	test: (node) => {
		return isBlockByName(node, 'core/list');
	},
};
