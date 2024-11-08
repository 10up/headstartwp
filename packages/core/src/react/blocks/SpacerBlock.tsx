'use client';

import { isBlock } from '../../dom';
import { DEFAULT_BLOCK_ELEMENT } from '../../dom/parseBlockAttributes';
import { IBlock } from '../components';
import { useBlock, useBlockAttributes } from './hooks';
import { IBlockAttributes } from './types';

export interface SpacerBlockProps extends IBlockAttributes {
	height?: string;
}

export interface ISpacerBlock extends IBlock<SpacerBlockProps> {}

export function SpacerBlock({
	domNode: node = DEFAULT_BLOCK_ELEMENT,
	children,
	component: Component,
	style,
}: ISpacerBlock) {
	const { name, className } = useBlock<SpacerBlockProps>(node);
	const blockAttributes = useBlockAttributes(node);

	const height = style ? style.height : '';
	return (
		<Component
			name={name}
			domNode={node}
			className={className}
			htmlAnchor={node.attribs.id || ''}
			height={height}
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
export namespace SpacerBlock {
	export const defaultProps = {
		test: (node) => {
			return isBlock(node, { tagName: 'div', className: 'wp-block-spacer' });
		},
	};
}
