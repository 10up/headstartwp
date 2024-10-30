import type {
	GutenbergBlock,
	ImagePrimitiveValue,
	LinkPrimitiveValue,
} from '@headstartwp/block-primitives';
import Image from '@headstartwp/block-primitives/image';
import RichText from '@headstartwp/block-primitives/rich-text';
import Link from '@headstartwp/block-primitives/link';
import InnerBlocks from '@headstartwp/block-primitives/inner-blocks';
import { containerStyle, titleStyle, linkStyle, innerBlocksStyle } from './style.css';

export type HeroAttributes = {
	title: string;
	content: string;
	image: ImagePrimitiveValue;
	link: LinkPrimitiveValue;
};

export const Hero = ({ attributes, children }: GutenbergBlock<HeroAttributes>) => {
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
			<Link name="link" value={attributes.link} className={linkStyle} />

			<InnerBlocks className={innerBlocksStyle}>{children}</InnerBlocks>
		</div>
	);
};
