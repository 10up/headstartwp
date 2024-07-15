'use client';

import { isBlockByName } from '../../dom';
import { DEFAULT_BLOCK_ELEMENT } from '../../dom/parseBlockAttributes';
import { IBlock } from '../components';
import { useBlock, useBlockAttributes } from './hooks';
import { IBlockAttributes } from './types';

export interface ListBlockProps extends IBlockAttributes {
	ordered: boolean;
}

export interface IListBlock extends IBlock<ListBlockProps> {}

export function ListBlock({
	domNode: node = DEFAULT_BLOCK_ELEMENT,
	children,
	component: Component,
	style,
}: IListBlock) {
	const { name, className, attributes } = useBlock<ListBlockProps>(node);
	const blockAttributes = useBlockAttributes(node);

	return (
		<Component
			name={name}
			domNode={node}
			className={className}
			htmlAnchor={node.attribs.id || ''}
			ordered={!!attributes.ordered}
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
export namespace ListBlock {
	export const defaultProps = {
		test: (node) => {
			return isBlockByName(node, 'core/list');
		},
	};
}
