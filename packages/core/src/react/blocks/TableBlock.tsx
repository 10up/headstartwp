import { isBlock } from '../../dom';
import { IBlock } from '../components';
import { useBlock, useBlockAttributes } from './hooks';
import { IBlockAttributes } from './types';

export interface TableBlockProps extends IBlockAttributes {
	hasFixedLayout?: boolean;
}

export interface ITableBlock extends IBlock<TableBlockProps> {}

export function TableBlock({ domNode: node, children, component: Component }: ITableBlock) {
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
