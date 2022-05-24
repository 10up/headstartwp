import { isBlock } from '../../dom';
import { IBlock } from '../components';
import { useBlock, useBlockAttributes } from './hooks';
import { Align, Colors, IBlockAttributes, Typography } from './types';

export interface TableBlockProps extends IBlockAttributes {
	typography?: Typography;
	align?: Align;
	blockStyle?: string;
	colors?: Colors;
	hasFixedLayout?: boolean;
}

export interface ITableBlock extends IBlock<TableBlockProps> {}

export function TableBlock({ domNode: node, children, component: Component }: ITableBlock) {
	const { name, className, attributes } = useBlock<TableBlockProps>(node);
	const { align, typography, blockStyle, colors } = useBlockAttributes(node);

	return (
		<Component
			name={name}
			domNode={node}
			className={className}
			align={align}
			typography={typography}
			blockStyle={blockStyle}
			colors={colors}
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
