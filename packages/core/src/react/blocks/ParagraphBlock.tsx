import type { Element } from 'html-react-parser';
import { isBlockByName } from '../../dom';
import type { IBlock } from '../components';
import { defaultElement, useBlock, useBlockAttributes } from './hooks';
import type { IBlockAttributes } from './types';

export interface ParagraphBlockProps extends IBlockAttributes {
	dropCap?: boolean;
}

export interface IParagraphBlock extends IBlock<ParagraphBlockProps> {}

export function ParagraphBlock({
	domNode: node = defaultElement,
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
