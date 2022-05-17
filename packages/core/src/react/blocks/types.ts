import { Element } from 'html-react-parser';
import { ReactNode } from 'react';

export interface Colors {
	backgroundColorSlug: string;
	backgroundColor: string;
	gradientSlug: string;
	gradient: string;
	textColorSlug: string;
	textColor: string;
	linkColorSlug: string;
	linkColor: string;
}

export type Align = 'none' | 'left' | 'center' | 'right' | 'wide' | 'full';

export type Style = {
	spacing: Spacing;
	typography: Typography;
	border: Border;
};

export interface Typography {
	fontSize: {
		slug: string;
		value: string;
	};
	style: {
		lineHeight?: string;
		fontSize?: string;
		textTransform?: string;
		letterSpacing?: string;
	};
}

export type Spacing = {
	padding: {
		top: string;
		bottom: string;
		left: string;
		right: string;
	};
	margin: {
		top: string;
		bottom: string;
		left: string;
		right: string;
	};
	blockGap: string;
};

export interface GutenbergBlockProps {
	name: string;
	className: string;
	children?: ReactNode | undefined;
}

export type Border = {
	radius?: string;
	width?: string;
	style?: string;
};

export interface IBlockAttributes {
	name: string;
	className?: string;
	domNode?: Element;
	htmlAnchor?: string;
	children?: ReactNode;
}

export interface BlockAttributes extends Colors {
	align: Align;
	style: Partial<Style>;
	width: string;
	typography: Typography;
}
