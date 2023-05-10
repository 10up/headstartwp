import { isBlockByName } from '@headstartwp/core';
import { IBlock } from '../components';
import { defaultElement, useBlock, useBlockAttributes } from './hooks';
import { IBlockAttributes } from './types';

export interface GroupBlockProps extends IBlockAttributes {
	tagName?: string;
	layout?: {
		type?: string;
		allowOrientation?: boolean;
		justifyContent?: 'left' | 'center' | 'right' | 'space-between';
	};
}

export interface IGroupBlock extends IBlock<GroupBlockProps> {}

export function GroupBlock({
	domNode: node = defaultElement,
	children,
	component: Component,
	style,
}: IGroupBlock) {
	const { name, className, attributes } = useBlock<GroupBlockProps>(node);
	const blockAttributes = useBlockAttributes(node);

	return (
		<Component
			name={name}
			domNode={node}
			className={className}
			htmlAnchor={node.attribs.id || ''}
			tagName={attributes.tagName}
			layout={attributes.layout}
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
export namespace GroupBlock {
	export const defaultProps = {
		test: (node) => {
			return isBlockByName(node, 'core/group');
		},
	};
}
