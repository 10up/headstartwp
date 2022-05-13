import { isBlock } from '../../dom';
import { IBlock } from '../components';
import { useBlock, useBlockAttributes } from './hooks';
import { Align, IBlockAttributes, Typography } from './types';

export interface QuoteBlockProps extends IBlockAttributes {
	typography?: Typography;
	align?: Align;
	blockStyle?: string;
}

export interface IQuoteBlock extends IBlock<QuoteBlockProps> {}

export const QuoteBlock = ({ domNode: node, children, component: Component }: IQuoteBlock) => {
	const { name, className } = useBlock<QuoteBlockProps>(node);
	const { align, typography, blockStyle } = useBlockAttributes(node);

	return (
		<Component
			name={name}
			domNode={node}
			className={className}
			align={align}
			typography={typography}
			blockStyle={blockStyle}
			htmlAnchor={node.attribs.id || ''}
		>
			{children}
		</Component>
	);
};

QuoteBlock.defaultProps = {
	test: (node) => {
		return isBlock(node, { tagName: 'blockquote', className: 'wp-block-quote' });
	},
};
