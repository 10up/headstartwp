import { Element } from 'html-react-parser';
import { isBlockByName } from '../../dom';
import { BlockProps } from '../components';
import { useBlock, useBlockAttributes } from './hooks';
import { BlockAttributes, GutenbergBlockProps } from './types';

export interface GutenberParagraphBlockProps
	extends GutenbergBlockProps,
		Partial<Pick<BlockAttributes, 'align' | 'typography' | 'backgroundColor' | 'textColor'>> {
	dropCap?: boolean;
}

export interface ParagraphBlockProps extends Omit<BlockProps, 'test'> {
	domNode: Element;
	className?: string;
	component: React.FC<GutenberParagraphBlockProps>;
}

export const ParagraphBlock = ({
	domNode: node,
	component: Component,
	children,
}: ParagraphBlockProps) => {
	const { className, name } = useBlock(node);
	const { align, colors, typography } = useBlockAttributes(node);

	return (
		<Component
			name={name}
			className={className || ''}
			align={align}
			backgroundColor={colors?.backgroundColor || ''}
			textColor={colors?.textColor}
			typography={typography}
		>
			{children}
		</Component>
	);
};

ParagraphBlock.defaultProps = {
	test: (node: Element) => isBlockByName(node, 'core/paragraph'),
};
