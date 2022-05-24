import { isBlock } from '../../dom';
import { IBlock } from '../components';
import { useBlock } from './hooks';
import { useBlockAttributes } from './hooks/useBlockAttributes';
import { Colors, IBlockAttributes, Spacing, Typography } from './types';

export interface CodeBlockProps extends IBlockAttributes {
	colors: Colors;
	typography: Typography;
	spacing: Spacing;
}

export interface ICodeBlock extends IBlock<CodeBlockProps> {}

export function CodeBlock({ domNode: node, children, component: Component }: ICodeBlock) {
	const { name, className } = useBlock(node);
	const { colors, typography, spacing } = useBlockAttributes(node);

	return (
		<Component
			name={name}
			domNode={node}
			className={className}
			colors={colors}
			typography={typography}
			spacing={spacing}
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
