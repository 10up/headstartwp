import { Element } from 'html-react-parser';
import { isBlock } from '../../dom';
import { BlockProps } from '../components';
import { useBlock } from './hooks';
import { IBlockAttributes } from './types';
import { getInlineStyles } from './utils';

export interface GutenbergSpacerProps extends IBlockAttributes {
	height?: string;
}

export interface SpacerBlockProps extends Omit<BlockProps, 'test'> {
	domNode: Element;
	className?: string;
	component: React.FC<GutenbergSpacerProps>;
}

export const SpacerBlock = ({
	domNode: node,
	children,
	component: Component,
}: SpacerBlockProps) => {
	const { name, className } = useBlock<GutenbergSpacerProps>(node);
	const style = getInlineStyles(node);
	const height = style ? style.height : '';
	return (
		<Component
			name={name}
			domNode={node}
			className={className}
			htmlAnchor={node.attribs.id || ''}
			height={height}
		>
			{children}
		</Component>
	);
};

SpacerBlock.defaultProps = {
	test: (node) => {
		return isBlock(node, { tagName: 'div', className: 'wp-block-spacer' });
	},
};
