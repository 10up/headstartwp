import React from 'react';
import RichText from '@headstartwp/blocks-primitives/rich-text';
import type { GutenbergBlock } from '@headstartwp/blocks-primitives';

type BlockAttributes = {
	button_label: string;
};

interface ButtonProps extends GutenbergBlock<BlockAttributes> {
	/**
	 * Is this the principal call to action on the page?
	 */
	primary?: boolean;

	/**
	 * How large should the button be?
	 */
	size?: 'small' | 'medium' | 'large';

	/**
	 * Optional click handler
	 */
	onClick?: () => void;
}

export const Button = ({ primary = false, size = 'medium', attributes, ...props }: ButtonProps) => {
	const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
	return (
		<RichText
			name="button_label"
			tagName="button"
			type="button"
			placeholder="Type a label for you button"
			value={attributes.button_label}
			className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
			{...props}
		/>
	);
};
