import { FC } from 'react';
import { LinkProps } from '#shared/types.js';

const Link: FC<LinkProps> = ({ className, value }) => {
	if (typeof value === 'undefined') {
		return null;
	}

	return (
		<a
			href={value.url}
			className={className}
			title={value.title}
			target={value.opensInNewTab ? '_blank' : '_self'}
			rel="noreferrer"
		>
			{value.text ?? value.text}
		</a>
	);
};

export default Link;
