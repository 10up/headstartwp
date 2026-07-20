import React from 'react';
import { ImagePrimitive } from './types.js';

export const RawImage = ({ value, size }: ImagePrimitive) => {
	if (typeof value === 'undefined') {
		return null;
	}

	const imageSize = size ? value.sizes[size] ?? value : value;

	const { url, width, height } = imageSize;
	const { alt } = value;

	return <img src={url} width={width} height={height} alt={alt} />;
};
