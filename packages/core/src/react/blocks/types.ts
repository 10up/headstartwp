import { Element } from 'html-react-parser';
import { ReactNode } from 'react';

export type ColorBlockProps = {
	background: boolean;
	backgroundColor: string;
	gradients: boolean;
	gradientColor: string;
	link: boolean;
	linkColor: string;
	text: boolean;
	textColor: string;
};

export type AlignBlockProps = 'none' | 'left' | 'center' | 'right' | 'wide' | 'full';
export type TypographyBlockProps = {
	fontSize: string;
	lineHeight: string;
};

export interface GutenbergBlockProps {
	className: string;
	attribs: Element['attribs'];
	children?: ReactNode | undefined;
}

export type BlockAttributes = {
	align?: AlignBlockProps;
	styles?: string;
	color?: ColorBlockProps;
	width?: number;
	typography?: TypographyBlockProps;
};
