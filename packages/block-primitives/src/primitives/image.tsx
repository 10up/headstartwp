// @ts-expect-error
import NextImage from 'next/image';
import { ImagePrimitive } from '../shared/types.js';

export const Image = ({ value, size }: ImagePrimitive) => {
	if (typeof value === 'undefined') {
		return null;
	}

	const imageSize = size ? value.sizes[size] ?? value : value;

	const { url, width, height } = imageSize;
	const { alt } = value;

	return <NextImage src={url} width={width} height={height} alt={alt} />;
};
