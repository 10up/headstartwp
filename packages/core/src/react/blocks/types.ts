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
	attribs: Element['attribs'];
	children?: ReactNode | undefined;
}
