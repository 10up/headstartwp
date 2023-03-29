import { isBlock } from '../../dom';
import { IBlock } from '../components';
import { defaultElement, useBlock, useBlockAttributes } from './hooks';
import { IBlockAttributes } from './types';

export interface QuoteBlockProps extends IBlockAttributes {}

export interface IQuoteBlock extends IBlock<QuoteBlockProps> {}

export function QuoteBlock({
	domNode: node = defaultElement,
	children,
	component: Component,
	style,
}: IQuoteBlock) {
	const { name, className } = useBlock<QuoteBlockProps>(node);
	const blockAttributes = useBlockAttributes(node);

	return (
		<Component
			name={name}
			domNode={node}
			className={className}
			attributes={blockAttributes}
			htmlAnchor={node.attribs.id || ''}
			style={style}
		>
			{children}
		</Component>
	);
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace QuoteBlock {
	export const defaultProps = {
		test: (node) => {
			return isBlock(node, { tagName: 'blockquote', className: 'wp-block-quote' });
		},
	};
}
