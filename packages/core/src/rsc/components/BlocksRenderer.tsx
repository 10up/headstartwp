import { BlockRendererProps, BaseBlocksRenderer } from '../../react/components/BaseBlocksRenderer';

/**
 * Server-only version of BlocksRenderer
 *
 * @param props Component properties
 *
 * @category React Server Components
 */
export async function BlocksRenderer({ children, ...props }: BlockRendererProps) {
	return <BaseBlocksRenderer {...props}>{children}</BaseBlocksRenderer>;
}
