import { isBlock } from '../../dom';
import { IBlock } from '../components';
import { useBlock, useBlockAttributes } from './hooks';
import { IBlockAttributes } from './types';

export interface ButtonsBlockProps extends IBlockAttributes {}

/**
 * The interface for the {@link ButtonsBlock} component.
 */
export interface IButtonsBlock extends IBlock<ButtonsBlockProps> {}

/**
 * The ButtonsBlock component implements block parsing for the Buttons block.
 *
 * This component must be used within a {@link BlocksRenderer} component.
 *
 * ```tsx
 * <BlocksRenderer html={html}>
 * 	<ButtonsBlock component={DebugComponent} />
 * </BlocksRenderer>
 * ```
 *
 * @category Blocks
 *
 * @param props Component properties
 */
export function ButtonsBlock({
	domNode: node,
	children,
	component: Component,
	style,
}: IButtonsBlock) {
	const { name, className } = useBlock(node);
	const blockAttributes = useBlockAttributes(node);

	return (
		<Component
			name={name}
			domNode={node}
			className={className}
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
export namespace ButtonsBlock {
	export const defaultProps = {
		test: (node) => isBlock(node, { tagName: 'div', className: 'wp-block-buttons' }),
	};
}
