import { GutenbergBlock, ImagePrimitiveValue } from '@headstartwp/blocks-primitives';
import Image from '@headstartwp/blocks-primitives/image';
import RichText from '@headstartwp/blocks-primitives/rich-text';

export type HeroAttributes = {
	title: string;
	content: string;
	image: ImagePrimitiveValue;
};

export const Hero = ({ attributes }: GutenbergBlock<HeroAttributes>) => {
	return (
		<div>
			<RichText name="title" tagName="h2" placeholder="The title" value={attributes.title} />

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
