import { Element, Text } from 'html-react-parser';
import { isBlock } from '../../dom';
import { IBlock } from '../components';
import { useBlock, useBlockAttributes } from './hooks';
import { Align, Border, Colors, IBlockAttributes, Typography } from './types';

export interface PullQuoteBlockProps extends IBlockAttributes {
	typography?: Typography;
	align?: Align;
	blockStyle?: string;
	border?: Border;
	colors?: Colors;
	quote: string;
	cite: string;
	borderColor?: string;
}

export interface IPullQuotekBlock extends IBlock<PullQuoteBlockProps> {}

export function PullQuoteBlock({
	domNode: node,
	children,
	component: Component,
}: IPullQuotekBlock) {
	const { name, className, attributes } = useBlock<PullQuoteBlockProps>(node);
	const { align, typography, colors, border } = useBlockAttributes(node);

	const blockquote = node.firstChild as Element;
	const paragraph = blockquote.firstChild as Element;
	const cite = blockquote.lastChild as Element;

	const quote = (paragraph.firstChild as Text).data;
	const citeText = (cite.lastChild as Text).data;

	return (
		<Component
			name={name}
			domNode={node}
			className={className}
			align={align}
			typography={typography}
			colors={colors}
			border={border}
			htmlAnchor={node.attribs.id || ''}
			quote={quote}
			cite={citeText}
			borderColor={attributes.borderColor || ''}
		>
			{children}
		</Component>
	);
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace PullQuoteBlock {
	export const defaultProps = {
		test: (node) => {
			return isBlock(node, { tagName: 'figure', className: 'wp-block-pullquote' });
		},
	};
}
