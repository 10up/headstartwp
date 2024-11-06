// @ts-expect-error
import NextImage from 'next/image';
import { ImagePrimitive } from '../shared/types.js';
import { RawImage } from '../shared/raw-image.js';

export const Image = ({ value, size, ...props }: ImagePrimitive) => {
	if (typeof value === 'undefined') {
		return null;
	}

	const imageSize = size ? value.sizes[size] ?? value : value;

	const { url, width, height } = imageSize;
	const { alt } = value;

	if (!width || !height) {
		return <RawImage value={value} size={size} {...props} />;
	}

	return <NextImage src={url} width={width} height={height} alt={alt} />;
};
