import { Element, Text } from 'html-react-parser';
import { isBlock } from '../../dom';
import { IBlock } from '../components';
import { IBlockAttributes } from './types';

import { useBlock } from './hooks';
import { useBlockAttributes } from './hooks/useBlockAttributes';

/**
 * The interface for components rendered by {@link ButtonBlock}
 */
export interface ButtonBlockProps extends IBlockAttributes {
	/**
	 * The button url
	 */
	url?: string;

	/**
	 * The title of the link
	 */
	title?: string;

	/**
	 * The button text
	 */
	text?: string;

	/**
	 * The link target
	 */
	linkTarget?: string;

	/**
	 * The link rel
	 */
	rel?: string;

	/**
	 * The link placeholder text
	 */
	placeholder?: string;
}

export interface IButtonBlock extends IBlock<ButtonBlockProps> {}

/**
 * The ButtonBlock component implements block parsing for the Button block.
 *
 * This component must be used within a {@link BlocksRenderer} component.
 *
 * ```tsx
 * <BlocksRenderer html={html}>
 * 	<ButtonBlock component={DebugComponent} />
 * </BlocksRenderer>
 * ```
 *
 * @category Blocks
 *
 * @param props Component properties
 *
 */
export function ButtonBlock({
	domNode: node,
	children,
	component: Component,
	style,
}: IButtonBlock) {
	const { className, name } = useBlock(node);
	const blockAttributes = useBlockAttributes(node);

	const anchor = node.firstChild as Element;
	const text = (anchor.firstChild as Text).data;

	return (
		<Component
			name={name}
			domNode={node}
			className={className}
			url={anchor.attribs.href}
			title={anchor.attribs.title}
			linkTarget={anchor.attribs.target}
			rel={anchor.attribs.rel}
			placeholder={anchor.attribs.placeholder}
			text={text}
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
export namespace ButtonBlock {
	export const defaultProps = {
		test: (node) => isBlock(node, { tagName: 'div', className: 'wp-block-button' }),
	};
}
