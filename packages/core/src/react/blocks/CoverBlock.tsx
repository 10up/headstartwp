import { isBlock } from '../../dom';
import { IBlock } from '../components';
import { defaultElement, useBlock } from './hooks';
import { useBlockAttributes } from './hooks/useBlockAttributes';
import { IBlockAttributes } from './types';

export interface CoverBlockProps extends IBlockAttributes {
	overlayColor: string;
	hasParallax: boolean;
	isRepeated: boolean;
	id: number;
	dimRatio: number;
	isDark: boolean;
	url: string;
	minHeight: number;
	focalPoint?: {
		x: string | number;
		y: string | number;
	};
}

export interface ICoverBlock extends IBlock<CoverBlockProps> {}

export function CoverBlock({
	domNode: node = defaultElement,
	children,
	component: Component,
	style,
}: ICoverBlock) {
	const { name, className, attributes } = useBlock<CoverBlockProps>(node);
	const blockAttributes = useBlockAttributes(node);

	return (
		<Component
			name={name}
			domNode={node}
			className={className}
			overlayColor={attributes.overlayColor}
			id={attributes.id}
			dimRatio={attributes.dimRatio}
			isDark={attributes.isDark}
			url={attributes.url}
			minHeight={attributes.minHeight}
			hasParallax={!!attributes.hasParallax}
			isRepeated={!!attributes.isRepeated}
			focalPoint={attributes.focalPoint}
			attributes={blockAttributes}
			style={style}
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
