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
