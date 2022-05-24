import { isBlock } from '../../dom';
import { IBlock } from '../components';
import { useBlock } from './hooks';
import { useBlockAttributes } from './hooks/useBlockAttributes';
import { IBlockAttributes, Align, Spacing } from './types';

export interface CoverBlockProps extends IBlockAttributes {
	overlayColor: string;
	spacing: Spacing;
	hasParallax: boolean;
	isRepeated: boolean;
	id: number;
	dimRatio: number;
	isDark: boolean;
	align: Align;
	url: string;
	minHeight: number;
	focalPoint?: {
		x: string | number;
		y: string | number;
	};
}

export interface ICoverBlock extends IBlock<CoverBlockProps> {}

export function CoverBlock({ domNode: node, children, component: Component }: ICoverBlock) {
	const { name, className, attributes } = useBlock<CoverBlockProps>(node);
	const { spacing, align } = useBlockAttributes(node);

	return (
		<Component
			name={name}
			domNode={node}
			className={className}
			overlayColor={attributes.overlayColor}
			spacing={spacing}
			id={attributes.id}
			dimRatio={attributes.dimRatio}
			isDark={attributes.isDark}
			align={align}
			url={attributes.url}
			minHeight={attributes.minHeight}
			hasParallax={!!attributes.hasParallax}
			isRepeated={!!attributes.isRepeated}
			focalPoint={attributes.focalPoint}
		>
			{children}
		</Component>
	);
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace CoverBlock {
	export const defaultProps = {
		test: (node) => isBlock(node, { tagName: 'div', className: 'wp-block-cover' }),

		/**
		 * Exclude all direct children except the paragraph inner block
		 *
		 * @param node The dom node
		 * @returns
		 */
		exclude: (node) => {
			const isDirectChild =
				node?.parent?.attribs &&
				node.parent.attribs.class.split(' ').includes('wp-block-cover');

			return (
				isDirectChild &&
				!node.attribs.class.split(' ').includes('wp-block-cover__inner-container')
			);
		},
	};
}
