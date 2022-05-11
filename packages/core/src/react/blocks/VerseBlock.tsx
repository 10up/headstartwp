import { Element } from 'html-react-parser';
import { isBlock } from '../../dom';
import { BlockProps } from '../components';
import { useBlock, useBlockAttributes } from './hooks';
import { Colors, IBlockAttributes, Spacing, Typography } from './types';

export interface GutenberVerseBlockProps extends IBlockAttributes {
	colors?: Colors;
	typography?: Typography;
	spacing?: Spacing;
}

export interface VerseBlockProps extends Omit<BlockProps, 'test'> {
	domNode: Element;
	className?: string;
	component: React.FC<GutenberVerseBlockProps>;
}

export const VerseBlock = ({ domNode: node, component: Component, children }: VerseBlockProps) => {
	const { className, name } = useBlock<GutenberVerseBlockProps>(node);
	const { colors, typography, spacing } = useBlockAttributes(node);

	return (
		<Component
			name={name}
			domNode={node}
			className={className || ''}
			colors={colors}
			typography={typography}
			spacing={spacing}
			htmlAnchor={node.attribs.id || ''}
		>
			{children}
		</Component>
	);
};

VerseBlock.defaultProps = {
	test: (node: Element) => isBlock(node, { tagName: 'pre', className: 'wp-block-verse' }),
};
