import { isBlock } from '../../dom';
import { IBlock } from '../components';
import { useBlock, useBlockAlign } from './hooks';
import { Align, IBlockAttributes } from './types';

export interface ButtonsBlockProps extends IBlockAttributes {
	align: Align;
}

export interface IButtonsBlock extends IBlock<ButtonsBlockProps> {}

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
