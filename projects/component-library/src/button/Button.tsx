import React from 'react';
import RichText from '@headstartwp/blocks-primitives/rich-text';

interface ButtonProps {
	/**
	 * Is this the principal call to action on the page?
	 */
	primary?: boolean;
	/**
	 * How large should the button be?
	 */
	size?: 'small' | 'medium' | 'large';
	/**
	 * Button contents
	 */
	label: string;
	/**
	 * Optional click handler
	 */
	onClick?: () => void;
}

export const Button = ({ primary = false, size = 'medium', label, ...props }: ButtonProps) => {
	const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
	return (
		<RichText
			name="button-label"
			tagName="button"
			type="button"
			placeholder="Type a label for you button"
			value={label}
			className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
			{...props}
		/>
	);
};
