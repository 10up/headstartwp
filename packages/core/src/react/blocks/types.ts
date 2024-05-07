import type { Element } from 'html-react-parser';
import type { ReactNode } from 'react';

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
	supportsFontStyle: boolean;
	supportsCustomFontSize: boolean;
	supportsFontWeight: boolean;
	supportsLetterSpacing: boolean;
	supportsLineHeight: boolean;
	supportsTextDecoration: boolean;
	supportsTextTransform: boolean;
	lineHeight?: string;
	textTransform?: string;
	letterSpacing?: string;
}

export type Spacing = {
	supportsPadding: boolean;
	padding: {
		top: string;
		bottom: string;
		left: string;
		right: string;
	};
	supportsMargin: boolean;
	margin: {
		top: string;
		bottom: string;
		left: string;
		right: string;
	};
	supportsBlockGap: boolean;
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
	style?: Record<string, string>;
	domNode?: Element;
	htmlAnchor?: string;
	children?: ReactNode;

	attributes?: {
		align: Align;
		blockStyle?: string;
		border: Border;
		colors: Colors;
		typography: Typography;
		width?: string;
		spacing: Spacing;
	};
}

export interface IDataWPBlock {
	[key: string]: unknown;
}

export interface BlockAttributes extends Colors {
	align: Align;
	style: Partial<Style>;
	width: string;
	typography: Typography;
}
