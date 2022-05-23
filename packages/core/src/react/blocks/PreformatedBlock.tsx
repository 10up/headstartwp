import { Element } from 'html-react-parser';
import { isBlock } from '../../dom';
import { IBlock } from '../components';
import { useBlock, useBlockAttributes } from './hooks';
import { Colors, IBlockAttributes, Typography } from './types';

export interface PreformattedBlockProps extends IBlockAttributes {
	colors?: Colors;
	typography?: Typography;
}

export interface IPreformattedBlock extends IBlock<PreformattedBlockProps> {}

export function PreformattedBlock({
	domNode: node,
	component: Component,
	children,
}: IPreformattedBlock) {
	const { className, name } = useBlock<PreformattedBlockProps>(node);
	const { colors, typography } = useBlockAttributes(node);

	return (
		<Component
			name={name}
			domNode={node}
			className={className || ''}
			colors={colors}
			typography={typography}
			htmlAnchor={node.attribs.id || ''}
		>
			{children}
		</Component>
	);
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace PreformattedBlock {
	export const defaultProps = {
		test: (node: Element) =>
			isBlock(node, { tagName: 'pre', className: 'wp-block-preformatted' }),
	};
}
