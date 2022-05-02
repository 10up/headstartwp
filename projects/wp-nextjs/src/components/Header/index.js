import { css } from '@emotion/react';
import { Icons } from './Icons';
import { Logo } from './Logo';
import { Nav } from './Nav';

const headerStyles = css`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 75px;
	background-color: #fff;
	border-bottom: 1px solid #e0e0e0;

	font-family: Roboto;

	> div,
	> ul {
		width: 400px;
	}
`;

const Header = () => {
	return (
		<header role="banner" css={headerStyles}>
			<Nav />
			<Logo />
			<Icons />
		</header>
	);
};

export default Header;
