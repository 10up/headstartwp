import { Element } from 'html-react-parser';
import { isBlock } from '../../dom';
import { IBlock } from '../components';
import { defaultElement, useBlock, useBlockAttributes } from './hooks';
import { IBlockAttributes } from './types';

export interface VerseBlockProps extends IBlockAttributes {}

export interface IVerseBlock extends IBlock<VerseBlockProps> {}

export function VerseBlock({
	domNode: node = defaultElement,
	component: Component,
	children,
	style,
}: IVerseBlock) {
	const { className, name } = useBlock<VerseBlockProps>(node);
	const blockAttributes = useBlockAttributes(node);

	return (
		<Component
			name={name}
			domNode={node}
			className={className || ''}
			attributes={blockAttributes}
			htmlAnchor={node.attribs.id || ''}
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
export namespace VerseBlock {
	export const defaultProps = {
		test: (node: Element) => isBlock(node, { tagName: 'pre', className: 'wp-block-verse' }),
	};
}
