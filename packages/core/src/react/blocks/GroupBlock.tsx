import { Element } from 'html-react-parser';
import { isBlockByName } from '../../dom';
import { BlockProps } from '../components';
import { useBlock, useBlockAttributes } from './hooks';
import { Align, Colors, IBlockAttributes, Spacing } from './types';

export interface GutenberGroupProps extends IBlockAttributes {
	spacing?: Spacing;
	align?: Align;
	blockStyle?: string;
	colors?: Colors;
	tagName?: string;
}

export interface GroupBlockProps extends Omit<BlockProps, 'test'> {
	domNode: Element;
	className?: string;
	component: React.FC<GutenberGroupProps>;
}

export const GroupBlock = ({ domNode: node, children, component: Component }: GroupBlockProps) => {
	const { name, className, attributes } = useBlock<GutenberGroupProps>(node);
	const { align, spacing, blockStyle, colors } = useBlockAttributes(node);

	return (
		<Component
			name={name}
			className={className}
			align={align}
			blockStyle={blockStyle}
			colors={colors}
			htmlAnchor={node.attribs.id || ''}
			spacing={spacing}
			tagName={attributes.tagName}
		>
			{children}
		</Component>
	);
};

GroupBlock.defaultProps = {
	test: (node) => {
		return isBlockByName(node, 'core/group');
	},
};
