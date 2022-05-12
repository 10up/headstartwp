import { Element } from 'html-react-parser';
import { isBlock } from '../../dom';
import { IBlock } from '../components';
import { useBlock, useBlockAttributes } from './hooks';
import { Colors, IBlockAttributes, Spacing, Typography } from './types';

export interface VerseBlockProps extends IBlockAttributes {
	colors?: Colors;
	typography?: Typography;
	spacing?: Spacing;
}

export interface IVerseBlock extends IBlock<VerseBlockProps> {}

export const VerseBlock = ({ domNode: node, component: Component, children }: IVerseBlock) => {
	const { className, name } = useBlock<VerseBlockProps>(node);
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
