import { useAppSettings } from '@headstartwp/next';
import { css } from '@linaria/core';
import { Link } from '../Link';

const footerLinksStyles = css`
	display: block;
	padding: 0;
	li {
		list-style-type: none;
		float: left;
		margin-right: 20px;
	}

	a {
		color: #f2f2f2;
		&:hover {
			text-decoration: none;
		}
	}
`;

export const FooterLinks = () => {
	const { data, loading } = useAppSettings();

	if (loading) {
		return null;
	}

	return (
		<ul className={footerLinksStyles}>
			<li>
				<Link href={data?.settings?.privacy_policy_url || '/'}>Privacy Policy</Link>
			</li>
			<li>
				<Link href="/">Terms of Use</Link>
			</li>
		</ul>
	);
};
