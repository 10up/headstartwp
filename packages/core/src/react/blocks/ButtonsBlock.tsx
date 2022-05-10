import { Element } from 'html-react-parser';
import { isBlock } from '../../dom';
import { BlockProps } from '../components';
import { useBlock, useBlockAlign } from './hooks';
import { Align, IBlockAttributes } from './types';

export interface GutenbergButtonsBlockProps extends IBlockAttributes {
	align: Align;
}

export interface ButtonsBlockProps extends Omit<BlockProps, 'test'> {
	domNode: Element;
	className?: string;
	component: React.FC<GutenbergButtonsBlockProps>;
}

export const ButtonsBlock = ({
	domNode: node,
	children,
	component: Component,
}: ButtonsBlockProps) => {
	const { name, className } = useBlock(node);
	const align = useBlockAlign(node);

	return (
		<Component name={name} domNode={node} className={className} align={align}>
			{children}
		</Component>
	);
};

ButtonsBlock.defaultProps = {
	test: (node) => isBlock(node, { tagName: 'div', className: 'wp-block-buttons' }),
};
