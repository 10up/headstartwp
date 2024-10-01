import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css';

export const container = style({
	backgroundColor: vars.color.brand,
	color: vars.color.white,
	padding: vars.space.medium,
});
