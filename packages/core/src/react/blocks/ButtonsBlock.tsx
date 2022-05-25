import { isBlock } from '../../dom';
import { IBlock } from '../components';
import { useBlock, useBlockAlign } from './hooks';
import { Align, IBlockAttributes } from './types';

export interface ButtonsBlockProps extends IBlockAttributes {
	/**
	 * The align value
	 */
	align: Align;
}

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
export function ButtonsBlock({ domNode: node, children, component: Component }: IButtonsBlock) {
	const { name, className } = useBlock(node);
	const align = useBlockAlign(node);

	return (
		<Component name={name} domNode={node} className={className} align={align}>
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
