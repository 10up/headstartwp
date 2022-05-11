import { Element } from 'html-react-parser';
import { isBlock } from '../../dom';
import { BlockProps } from '../components';
import { useBlock, useBlockAttributes } from './hooks';
import { Colors, IBlockAttributes, Typography } from './types';

export interface GutenberPreformattedBlockProps extends IBlockAttributes {
	colors?: Colors;
	typography?: Typography;
}

export interface PreformattedBlockProps extends Omit<BlockProps, 'test'> {
	domNode: Element;
	className?: string;
	component: React.FC<GutenberPreformattedBlockProps>;
}

export const PreformattedBlock = ({
	domNode: node,
	component: Component,
	children,
}: PreformattedBlockProps) => {
	const { className, name } = useBlock<GutenberPreformattedBlockProps>(node);
	const { colors, typography } = useBlockAttributes(node);

	return (
		<Component
			name={name}
			domNode={node}
			className={className || ''}
			colors={colors}
			typography={typography}
			htmlAnchor={node.attribs.id || ''}
		>
			{children}
		</Component>
	);
};

PreformattedBlock.defaultProps = {
	test: (node: Element) => isBlock(node, { tagName: 'pre', className: 'wp-block-preformatted' }),
};
