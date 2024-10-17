import { ImagePrimitive } from '../shared/types.js';

const Image = ({ value }: ImagePrimitive) => {
	if (typeof value === 'undefined') {
		return null;
	}

	const { url, alt } = value;

	return <img src={url} alt={alt ?? ''} />;
};

export default Image;
