'use client';

import { isBlock } from '../../dom';
import { DEFAULT_BLOCK_ELEMENT } from '../../dom/parseBlockAttributes';
import { IBlock } from '../components';
import { useBlock } from './hooks';
import { useBlockAttributes } from './hooks/useBlockAttributes';
import { IBlockAttributes } from './types';

/**
 * The interface for components rendered by {@link CodeBlock}
 */
export interface CodeBlockProps extends IBlockAttributes {}

/**
 * The interface for the {@link CodeBlock} component.
 */
export interface ICodeBlock extends IBlock<CodeBlockProps> {}

/**
 * The CodeBlock component implements block parsing for the core/code block.
 *
 * This component must be used within a {@link BlocksRenderer} component.
 *
 * ```tsx
 * <BlocksRenderer html={html}>
 * 	<CodeBlock component={DebugComponent} />
 * </BlocksRenderer>
 * ```
 *
 * @category Blocks
 *
 * @param props Component properties
 */
export function CodeBlock({
	domNode: node = DEFAULT_BLOCK_ELEMENT,
	children,
	component: Component,
	style,
}: ICodeBlock) {
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
export namespace CodeBlock {
	export const defaultProps = {
		test: (node) => isBlock(node, { tagName: 'pre', className: 'wp-block-code' }),
	};
}
