'use client';

import { isBlock } from '../../dom';
import { DEFAULT_BLOCK_ELEMENT } from '../../dom/parseBlockAttributes';
import { IBlock } from '../components';
import { useBlock } from './hooks';
import { useBlockAttributes } from './hooks/useBlockAttributes';
import { IBlockAttributes } from './types';

export interface ColumnBlockProps extends IBlockAttributes {}

export interface IColumnBlock extends IBlock<ColumnBlockProps> {}

export function ColumnBlock({
	domNode: node = DEFAULT_BLOCK_ELEMENT,
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
