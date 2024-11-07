import type {
	UniversalBlock,
	ImagePrimitiveValue,
	LinkPrimitiveValue,
} from '@headstartwp/block-primitives';
import { Image } from '@headstartwp/block-primitives/image';
import { RichText } from '@headstartwp/block-primitives/rich-text';
import { Link } from '@headstartwp/block-primitives/link';
import { InnerBlocks } from '@headstartwp/block-primitives/inner-blocks';
import { FC } from 'react';
import { containerStyle, titleStyle, linkStyle, innerBlocksStyle } from './style.css';

/**
 * This is the Universal Block's attributes, i.e the attributes coming from the Gutenberg block
 */
export type HeroAttributes = {
	title: string;
	content: string;
	image: ImagePrimitiveValue;
	link: LinkPrimitiveValue;
};

/**
 * This is the Hero component's props
 *
 * It extends UniversalBlock's interface and adds the HeroAttributes, you may add more props that are not attributes,
 * i.e any props that ar enot controlled by the Gutenberg block itself
 */
export interface HeroProps extends UniversalBlock<HeroAttributes> {}

export const Hero: FC<HeroProps> = ({ attributes, children, settings }) => {
	return (
		<div className={containerStyle}>
			<RichText
				name="title"
				tagName="h2"
				placeholder="The title"
				value={attributes.title}
				className={titleStyle}
			/>

			<RichText
				name="content"
				tagName="p"
				placeholder="Description"
				value={attributes.content}
			/>

			<Image
				name="image"
				value={attributes.image}
				accept={['image/jpg']}
				mediaURL={attributes?.image?.url ?? ''}
				allowedTypes={['image/jpg']}
			/>

			{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
			<Link
				name="link"
				value={attributes.link}
				className={linkStyle}
				linkSettings={{ sourceUrl: settings?.sourceUrl, hostUrl: settings?.hostUrl }}
			/>

			<InnerBlocks allowedBlocks={['core/list']} className={innerBlocksStyle}>
				{children}
			</InnerBlocks>
		</div>
	);
};
