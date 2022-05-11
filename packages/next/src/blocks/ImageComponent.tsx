import Image from 'next/image';

import { ImageBlockProps } from '@10up/headless-core/react';

export const ImageComponent = ({ src, alt, width, height, children }: ImageBlockProps) => {
	if (!width || !height) {
		return children;
	}
	if (!src) {
		return children;
	}

	return <Image src={src} alt={alt} width={width} height={height} layout="intrinsic" />;
};
