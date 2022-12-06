import { Element } from 'html-react-parser';
import { isBlockByName } from '../../dom';
import { IBlock } from '../components';
import { useBlock, useBlockAttributes } from './hooks';
import { IBlockAttributes } from './types';

export interface ParagraphBlockProps extends IBlockAttributes {
	dropCap?: boolean;
}

export interface IParagraphBlock extends IBlock<ParagraphBlockProps> {}

export function ParagraphBlock({
	domNode: node,
	component: Component,
	children,
	style,
}: IParagraphBlock) {
	const { className, name, attributes } = useBlock<ParagraphBlockProps>(node);
	const blockAttributes = useBlockAttributes(node);

	return (
		<Component
			name={name}
			domNode={node}
			className={className || ''}
			attributes={blockAttributes}
			dropCap={attributes?.dropCap || false}
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
export namespace ParagraphBlock {
	export const defaultProps = {
		test: (node: Element) => isBlockByName(node, 'core/paragraph'),
	};
}
