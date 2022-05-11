import { Element } from 'html-react-parser';
import { isBlock } from '../../dom';
import { BlockProps } from '../components';
import { useBlock } from './hooks';
import { IBlockAttributes } from './types';

export interface GutenberFileProps extends IBlockAttributes {
	id?: number;
	href?: string;
	showDownloadButton: boolean;
}

export interface FileBlockBlockProps extends Omit<BlockProps, 'test'> {
	domNode: Element;
	className?: string;
	component: React.FC<GutenberFileProps>;
}

export const FileBlock = ({
	domNode: node,
	children,
	component: Component,
}: FileBlockBlockProps) => {
	const { name, className, attributes } = useBlock<GutenberFileProps>(node);

	return (
		<Component
			name={name}
			className={className}
			htmlAnchor={node.attribs.id || ''}
			id={attributes.id}
			href={attributes.href}
			showDownloadButton={!!attributes.showDownloadButton}
		>
			{children}
		</Component>
	);
};

FileBlock.defaultProps = {
	test: (node) => {
		return isBlock(node, { tagName: 'div', className: 'wp-block-file' });
	},
};
