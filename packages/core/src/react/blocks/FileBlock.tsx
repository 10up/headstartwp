import { isBlock } from '../../dom';
import { IBlock } from '../components';
import { useBlock, useBlockAttributes } from './hooks';
import { IBlockAttributes } from './types';

export interface FileBlockProps extends IBlockAttributes {
	id?: number;
	href?: string;
	showDownloadButton: boolean;
}

export interface IFileBlock extends IBlock<FileBlockProps> {}

export function FileBlock({ domNode: node, children, component: Component }: IFileBlock) {
	const { name, className, attributes } = useBlock<FileBlockProps>(node);
	const blockAttributes = useBlockAttributes(node);

	return (
		<Component
			name={name}
			domNode={node}
			className={className}
			htmlAnchor={node.attribs.id || ''}
			id={attributes.id}
			href={attributes.href}
			showDownloadButton={!!attributes.showDownloadButton}
			attributes={blockAttributes}
		>
			{children}
		</Component>
	);
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace FileBlock {
	export const defaultProps = {
		test: (node) => {
			return isBlock(node, { tagName: 'div', className: 'wp-block-file' });
		},
	};
}
