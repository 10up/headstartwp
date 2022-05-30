import { Element } from 'html-react-parser';
import {
	getAlignStyle,
	getBlockStyle,
	getInlineStyles,
	getWidthStyles,
	getTypographyStyles,
	getColorStyles,
} from '../utils';

const createNodeWithClass = (className: string) => {
	return new Element('div', { class: className });
};

const createNodeWithStyle = (style: string) => {
	return new Element('div', { style });
};

describe('getAlignStyle', () => {
	it('gets the align style properly', () => {
		expect(getAlignStyle(createNodeWithClass('alignleft'))).toBe('left');
		expect(getAlignStyle(createNodeWithClass('wp-block-button alignleft'))).toBe('left');
		expect(getAlignStyle(createNodeWithClass('wp-block-button asdas asdas as alignleft'))).toBe(
			'left',
		);
		expect(
			getAlignStyle(createNodeWithClass('wp-block-button asdas asdas as alignlefts')),
		).toBe('none');

		expect(getAlignStyle(createNodeWithClass('wp-block-button alignright'))).toBe('right');
		expect(getAlignStyle(createNodeWithClass('wp-block-button asdasd alignright'))).toBe(
			'right',
		);

		expect(getAlignStyle(createNodeWithClass('wp-block-button aligncenter'))).toBe('center');
		expect(getAlignStyle(createNodeWithClass('wp-block-button aligncenter asdasd'))).toBe(
			'center',
		);

		expect(getAlignStyle(createNodeWithClass('wp-block-button alignwide'))).toBe('wide');
		expect(getAlignStyle(createNodeWithClass('wp-block-button alignwide asdasd'))).toBe('wide');

		expect(getAlignStyle(createNodeWithClass('wp-block-button alignfull'))).toBe('full');
		expect(getAlignStyle(createNodeWithClass('wp-block-button alignfull asdasd'))).toBe('full');
	});
});

describe('getBlockStyle', () => {
	it('gets the block style properly', () => {
		expect(getBlockStyle(createNodeWithClass('wp-block-button'))).toBe('none');
		expect(getBlockStyle(createNodeWithClass('wp-block-button is-style-outline'))).toBe(
			'outline',
		);
		expect(getBlockStyle(createNodeWithClass('wp-block-button is-style-fill'))).toBe('fill');

		expect(getBlockStyle(createNodeWithClass('wp-block-button ais-style-fill'))).toBe('none');
	});
});

describe('getColorStyles', () => {
	it('gets the color styles properly', () => {
		expect(
			getColorStyles(createNodeWithClass('has-text-color has-orange-color')),
		).toMatchObject({
			textColor: 'orange',
		});
		expect(
			getColorStyles(
				createNodeWithClass(
					'has-text-color has-orange-color has-background has-black-background-color',
				),
			),
		).toMatchObject({
			textColor: 'orange',
			backgroundColor: 'black',
		});

		expect(
			getColorStyles(
				createNodeWithClass(
					'has-text-color has-orange-color has-background has-black-background-color has-link-color has-red-link-color',
				),
			),
		).toMatchObject({
			textColor: 'orange',
			backgroundColor: 'black',
			linkColor: 'red',
		});
	});
});

describe('getInlineStyles', () => {
	it('converts inline styles to object properly', () => {
		expect(
			getInlineStyles(createNodeWithStyle('border-size: 10px; padding-top:20px;')),
		).toEqual({
			borderSize: '10px',
			paddingTop: '20px',
		});
		expect(
			getInlineStyles(
				createNodeWithStyle('margin: 0 2px 10px 10px; padding-top:20px; color: #f3f3f3;'),
			),
		).toEqual({
			paddingTop: '20px',
			margin: '0 2px 10px 10px',
			color: '#f3f3f3',
		});

		expect(getInlineStyles(new Element('div', {}))).toEqual(false);
	});
});

describe('getWidthStyles', () => {
	it('gets the width styles properly', () => {
		expect(
			getWidthStyles(createNodeWithClass('has-custom-width wp-block-button__width-75')),
		).toEqual('75');
	});
});

describe('getTypographyStyles', () => {
	it('gets the typography styles properly', () => {
		expect(
			getTypographyStyles(createNodeWithClass('has-custom-font-size has-large-font-size')),
		).toEqual({
			fontSize: 'large',
			style: {
				fontSize: '',
				lineHeight: '',
			},
		});
		expect(
			getTypographyStyles(createNodeWithClass('has-custom-font-size has-large-font-size')),
		).toEqual({
			fontSize: 'large',
			style: {
				fontSize: '',
				lineHeight: '',
			},
		});
		const node = new Element('div', {
			class: 'has-custom-font-size',
			style: 'font-size: 24px',
		});
		expect(getTypographyStyles(node)).toEqual({
			fontSize: '',
			style: { fontSize: '24px', lineHeight: '' },
		});
	});
});
