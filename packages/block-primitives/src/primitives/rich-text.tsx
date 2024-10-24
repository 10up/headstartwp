import type { RichTextPrimitive } from '#shared/types.ts';

const RichText = <T extends keyof HTMLElementTagNameMap>({
	tagName,
	className,
	value,
}: RichTextPrimitive<T>) => {
	if (typeof value !== 'string') {
		return null;
	}

	const Tag: keyof HTMLElementTagNameMap = tagName ?? 'div';

	return <Tag className={className} dangerouslySetInnerHTML={{ __html: value }} />;
};

export default RichText;
