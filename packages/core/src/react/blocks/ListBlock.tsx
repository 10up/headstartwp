import { isBlockByName } from '../../dom';
import { IBlock } from '../components';
import { useBlock, useBlockAttributes } from './hooks';
import { Colors, IBlockAttributes, Typography } from './types';

export interface ListBlockProps extends IBlockAttributes {
	colors?: Colors;
	typography?: Typography;
	ordered: boolean;
}

export interface IListBlock extends IBlock<ListBlockProps> {}

export function ListBlock({ domNode: node, children, component: Component }: IListBlock) {
	const { name, className, attributes } = useBlock<ListBlockProps>(node);
	const { typography, colors } = useBlockAttributes(node);

	return (
		<Component
			name={name}
			domNode={node}
			className={className}
			colors={colors}
			htmlAnchor={node.attribs.id || ''}
			typography={typography}
			ordered={!!attributes.ordered}
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
