import { isBlock } from '../../dom';
import type { IBlock } from '../components';
import { defaultElement, useBlock, useBlockAttributes } from './hooks';
import type { IBlockAttributes } from './types';

export interface SpacerBlockProps extends IBlockAttributes {
	height?: string;
}

export interface ISpacerBlock extends IBlock<SpacerBlockProps> {}

export function SpacerBlock({
	domNode: node = defaultElement,
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
