import Image from 'next/image';
import { Element } from 'html-react-parser';

export type ImageBlockProps = {
	domNode: Element;
};

/**
 * The Image Block converts a image node into a next/image component
 *
 * @param props Image Block Props
 * @param props.domNode The domNode element
 *
 * @returns The next/image component
 */
export const ImageBlock = ({ domNode }: ImageBlockProps) => {
	const { src, alt, className, width, height } = domNode.attribs;

	const layout = width && height ? 'intrinsic' : 'fill';

	return (
		<Image
			className={className}
			src={src}
			alt={alt}
			width={width}
			height={height}
			layout={layout}
		/>
	);
};
