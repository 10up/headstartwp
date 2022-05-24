import { isBlockByName } from '../../dom';
import { IBlock } from '../components';
import { useBlock, useBlockAttributes } from './hooks';
import { Align, Colors, IBlockAttributes, Spacing } from './types';

export interface GroupBlockProps extends IBlockAttributes {
	spacing?: Spacing;
	align?: Align;
	blockStyle?: string;
	colors?: Colors;
	tagName?: string;
	layout?: {
		type?: string;
		allowOrientation?: boolean;
		justifyContent?: 'left' | 'center' | 'right' | 'space-between';
	};
}

export interface IGroupBlock extends IBlock<GroupBlockProps> {}

export function GroupBlock({ domNode: node, children, component: Component }: IGroupBlock) {
	const { name, className, attributes } = useBlock<GroupBlockProps>(node);
	const { align, spacing, blockStyle, colors } = useBlockAttributes(node);

	return (
		<Component
			name={name}
			domNode={node}
			className={className}
			align={align}
			blockStyle={blockStyle}
			colors={colors}
			htmlAnchor={node.attribs.id || ''}
			spacing={spacing}
			tagName={attributes.tagName}
			layout={attributes.layout}
		>
			{children}
		</Component>
	);
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace GroupBlock {
	export const defaultProps = {
		test: (node) => {
			return isBlockByName(node, 'core/group');
		},
	};
}
