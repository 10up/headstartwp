import { style } from '@vanilla-extract/css';

export const containerStyle = style({
	background: 'blue',
});

export const titleStyle = style({
	fontSize: '2rem',
	fontWeight: 'bold',
});

export const linkStyle = style({
	color: 'red',
	textDecoration: 'none',
	display: 'block',
	':hover': {
		textDecoration: 'underline',
	},
});

export const innerBlocksStyle = style({
	marginTop: '1rem',
	padding: '1rem',
	background: 'white',
	border: '1px solid black',
});
