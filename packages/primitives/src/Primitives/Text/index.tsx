interface EditorPrimitive {
	className?: string;
	editorAttributeName?: string;
	editorClientId?: string;
	editorPlaceholder?: string;
	editorValue?: any;
	value?: any;
}

export interface TextPrimitive extends EditorPrimitive {
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'cite' | 'div';
}

export const Text: React.FunctionComponent<TextPrimitive> = ({
	as: Tag = 'span',
	className,
	value,
}) => {
	if (!value) {
		return null;
	}

	if (typeof value === 'string') {
		// TODO: sanitize html
		return <Tag className={className} dangerouslySetInnerHTML={{ __html: value }} />;
	}

	return <Tag className={className}>{value}</Tag>;
};
