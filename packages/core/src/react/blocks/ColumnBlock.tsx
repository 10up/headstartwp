import { isBlock } from '../../dom';
import type { IBlock } from '../components';
import { defaultElement, useBlock } from './hooks';
import { useBlockAttributes } from './hooks/useBlockAttributes';
import type { IBlockAttributes } from './types';

export interface ColumnBlockProps extends IBlockAttributes {}

export interface IColumnBlock extends IBlock<ColumnBlockProps> {}

export function ColumnBlock({
	domNode: node = defaultElement,
	children,
	component: Component,
	style,
}: IColumnBlock) {
	const { className, name } = useBlock(node);
	const blockAttributes = useBlockAttributes(node);

	return (
		<Component
			name={name}
			domNode={node}
			className={className}
			attributes={blockAttributes}
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
export namespace ColumnBlock {
	export const defaultProps = {
		test: (node) => isBlock(node, { tagName: 'div', className: 'wp-block-column' }),
	};
}
