import { Element } from 'html-react-parser';
import { getAttributes, isBlock } from '../../dom';
import { BlockProps } from '../components';
import { BlockAttributes, GutenbergBlockProps } from './types';

export interface GutenbergButtonsBlockProps
	extends GutenbergBlockProps,
		Pick<BlockAttributes, 'align'> {}

export interface ButtonsBlockProps extends Omit<BlockProps, 'test'> {
	className?: string;
	component: React.FC<GutenbergButtonsBlockProps>;
}

export const ButtonsBlock = ({ domNode, children, component: Component }: ButtonsBlockProps) => {
	// node is not undefined at this point
	const node = domNode as Element;

	const attributes = getAttributes(node.attribs);

	return (
		<Component name="core/buttons" className={attributes.className} attribs={attributes}>
			{children}
		</Component>
	);
};

ButtonsBlock.defaultProps = {
	test: (node) => isBlock(node, { tagName: 'div', className: 'wp-block-buttons' }),
};
