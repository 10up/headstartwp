import { Element } from 'html-react-parser';
import { useBlock } from '../blocks/hooks';
import { BlockProps } from './BlocksRenderer';

/**
 * The props the React components passed to Block must implement
 */
export interface BlockComponentProps {
	/**
	 * Block name
	 */
	name: string;

	/**
	 * An record containing the block attributes
	 */
	attributes: Record<string, any>;
	className: string;
}

interface BlockRendererProps extends BlockProps {
	domNode: Element;
	blockImpl: React.FC<BlockComponentProps>;
}

/**
 * The Block components provides an quick and easy way to replace a block markup with a react component
 *
 * @param props The Block Props
 * @param props.domNode The DOM node to render
 * @param props.children The children of the block
 * @param props.blockImpl The react component to render
 *
 * @returns
 */
export const Block = ({ blockImpl: BlockComponent, domNode, children }: BlockRendererProps) => {
	const { name, attributes, className } = useBlock(domNode);

	if (!BlockComponent) {
		throw new Error('You must provide a block component through the blockImpl prop');
	}

	return (
		<BlockComponent name={name} attributes={attributes} className={className}>
			{children}
		</BlockComponent>
	);
};
