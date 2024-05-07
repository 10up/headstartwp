import { isBlock } from '../../dom';
import type { IBlock } from '../components';
import { defaultElement, useBlock, useBlockAttributes } from './hooks';
import type { IBlockAttributes } from './types';

export interface TableBlockProps extends IBlockAttributes {
	hasFixedLayout?: boolean;
}

export interface ITableBlock extends IBlock<TableBlockProps> {}

export function TableBlock({
	domNode: node = defaultElement,
	children,
	component: Component,
	style,
}: ITableBlock) {
	const { name, className, attributes } = useBlock<TableBlockProps>(node);
	const blockAttributes = useBlockAttributes(node);

	return (
		<Component
			name={name}
			domNode={node}
			className={className}
			attributes={blockAttributes}
			htmlAnchor={node.attribs.id || ''}
			hasFixedLayout={!!attributes.hasFixedLayout}
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
export namespace TableBlock {
	export const defaultProps = {
		test: (node) => {
			return isBlock(node, { tagName: 'figure', className: 'wp-block-table' });
		},
	};
}
