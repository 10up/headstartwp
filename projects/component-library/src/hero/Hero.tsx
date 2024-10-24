import type { GutenbergBlock, ImagePrimitiveValue } from '@headstartwp/block-primitives';
import Image from '@headstartwp/block-primitives/image';
import RichText from '@headstartwp/block-primitives/rich-text';
import { a } from './test.ts';
import { containerStyle, titleStyle } from './style.css.ts';

export type HeroAttributes = {
	title: string;
	content: string;
	image: ImagePrimitiveValue;
};

export const Hero = ({ attributes }: GutenbergBlock<HeroAttributes>) => {
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
		</div>
	);
};
