import { useAppSettings } from '@10up/headless-next';
import { css } from '@emotion/react';
import { Link } from './Link';

const footerStyles = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 60px;
	width: 100%;
	background: #333;
	color: #fff;
	padding: 0 20px;
	box-sizing: border-box;

	a {
		color: #fff;
	}

	> ul,
	> div {
		width: 400px;
	}
`;

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

const FooterLinks = () => {
	const {
		data: { settings },
	} = useAppSettings();

	return (
		<ul css={footerLinksStyles}>
			<li>
				<Link href={settings.privacy_policy_url}>Privacy Policy</Link>
			</li>
			<li>
				<Link href="/">Terms of Use</Link>
			</li>
		</ul>
	);
};

const Footer = () => {
	return (
		<footer css={footerStyles}>
			<FooterLinks />
			<div>
				<p>Copyright &copy; 10up {new Date().getFullYear()}. All Rights Reserved</p>
			</div>
			<div />
		</footer>
	);
};

export default Footer;
