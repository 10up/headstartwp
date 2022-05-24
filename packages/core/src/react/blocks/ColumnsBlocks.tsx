import { isBlock } from '../../dom';
import { IBlock } from '../components';
import { useBlock } from './hooks';
import { useBlockAttributes } from './hooks/useBlockAttributes';
import { Colors, IBlockAttributes, Spacing } from './types';

export interface ColumnsBlockProps extends IBlockAttributes {
	colors: Colors;
	spacing: Spacing;
	blockStyle: string;
}

export interface IColumnsBlock extends IBlock<ColumnsBlockProps> {}

export function ColumnsBlock({ domNode: node, children, component: Component }: IColumnsBlock) {
	const { name, className } = useBlock(node);
	const { spacing, colors, blockStyle } = useBlockAttributes(node);

	return (
		<Component
			name={name}
			domNode={node}
			className={className}
			colors={colors}
			spacing={spacing}
			blockStyle={blockStyle}
		>
			{children}
		</Component>
	);
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace ColumnsBlock {
	export const defaultProps = {
		test: (node) => isBlock(node, { tagName: 'div', className: 'wp-block-columns' }),
	};
}
