import PropTypes from 'prop-types';
import { removeSourceUrl } from '@10up/headless-core';
import { useSettings } from '@10up/headless-core/react';
import NextLink from 'next/link';

export const Link = ({ href, rel, children }) => {
	const settings = useSettings();
	const link = removeSourceUrl({ link: href, backendUrl: settings.sourceUrl || '' });

	return (
		<NextLink href={link} rel={rel}>
			{children}
		</NextLink>
	);
};

Link.propTypes = {
	href: PropTypes.string.isRequired,
	rel: PropTypes.string,
	children: PropTypes.node.isRequired,
};

Link.defaultProps = {
	rel: '',
};
