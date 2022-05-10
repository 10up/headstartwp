import { Element } from 'html-react-parser';
import { ReactNode } from 'react';

export interface Colors {
	backgroundColor: string;
	gradient: string;
	textColor: string;
	linkColor: string;
}

export type Align = 'none' | 'left' | 'center' | 'right' | 'wide' | 'full';

export type Style = {
	spacing: Spacing;
	typography: Typography;
	border: Border;
};

export interface Typography {
	fontSize?: string;
	style: {
		lineHeight: string;
		fontSize: string;
	};
}

export type Spacing = {
	paddingTop: string;
	paddingBottom: string;
	paddingLeft: string;
	paddingRight: string;
};

export interface GutenbergBlockProps {
	name: string;
	className: string;
	children?: ReactNode | undefined;
}

export type Border = {
	borderRadius: string;
};

export interface IBlockAttributes {
	name: string;
	className?: string;
	domNode?: Element;
}

export interface BlockAttributes extends Colors {
	align: Align;
	style: Partial<Style>;
	width: string;
	typography: Typography;
}
