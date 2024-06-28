import { useSettings } from '../provider';
import { BlockRendererProps, BaseBlocksRenderer } from './BaseBlocksRenderer';

/**
 * The `BlocksRenderer` components provides an easy way to convert HTML markup into corresponding
 * React components.
 *
 * The `BlocksRenderer` component takes in arbitrary html markup and receives a list of react components
 * as children that allows replacing dom nodes with React Components.
 *
 * The html prop is sanitized through {@link wpKsesPost} so it's safe for rendering arbitrary html markup.
 *
 * The children components must implement the {@link BlockProps} interface
 *
 * #### Usage
 *
 * ##### Usage with the test function
 *
 * ```jsx
 * <BlocksRenderer html={html}>
 *  <MyLinkBlock test={(node) => isAnchorTag(node, { isInternalLink: true })} />
 * </BlocksRenderer>
 * ```
 *
 * ##### Usage with classList and tagName props
 *
 * ```jsx
 * <BlocksRenderer html={html}>
 *   <MyLinkBlock tagName="a" classList="my-special-anchor" />
 * </BlocksRenderer>
 * ```
 *
 * @param props Component properties
 *
 * @category React Components
 */
export function BlocksRenderer({ children, ...props }: BlockRendererProps) {
	const settings = useSettings();

	return (
		<BaseBlocksRenderer {...props} settings={settings}>
			{children}
		</BaseBlocksRenderer>
	);
}
