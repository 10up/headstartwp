import { isBlock } from '../../dom';
import type { IBlock } from '../components';
import { defaultElement, useBlock, useBlockAttributes } from './hooks';
import type { IBlockAttributes } from './types';

export interface SeparatorBlockProps extends IBlockAttributes {}

export interface ISeparatorBlock extends IBlock<SeparatorBlockProps> {}

export function SeparatorBlock({
	domNode: node = defaultElement,
	children,
	component: Component,
	style,
}: ISeparatorBlock) {
	const { name, className } = useBlock<SeparatorBlockProps>(node);
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
export namespace SeparatorBlock {
	export const defaultProps = {
		test: (node) => {
			return isBlock(node, { tagName: 'hr', className: 'wp-block-separator' });
		},
	};
}
