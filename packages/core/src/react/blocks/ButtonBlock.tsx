import { Element, Text } from 'html-react-parser';
import { isBlock } from '../../dom';
import { IBlock } from '../components';
import { Align, Border, Colors, IBlockAttributes, Typography } from './types';

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
	 * The colors object
	 */
	colors?: Colors;

	/**
	 * The link placeholer text
	 */
	placeholder?: string;

	/**
	 * The border object
	 */
	border?: Border;

	/**
	 * The block style
	 */
	blockStyle?: string;

	/**
	 * The typography object
	 */
	typography?: Typography;

	/**
	 * The align value
	 */
	align: Align;

	/**
	 * The width value
	 */
	width?: string;
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
export function ButtonBlock({ domNode: node, children, component: Component }: IButtonBlock) {
	const { className, name } = useBlock(node);
	const { align, blockStyle, border, colors, typography, width } = useBlockAttributes(node);

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
			align={align}
			colors={colors}
			border={border}
			typography={typography}
			width={width}
			blockStyle={blockStyle}
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
