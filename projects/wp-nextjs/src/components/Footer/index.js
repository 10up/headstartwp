import { styled } from '@linaria/react';
import { FooterLinks } from './FooterLinks';

const StyledFooter = styled.footer`
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

const Footer = () => {
	return (
		<StyledFooter>
			<FooterLinks />
			<div>
				<p>Copyright &copy; 10up {new Date().getFullYear()}. All Rights Reserved</p>
			</div>
			<div />
		</StyledFooter>
	);
};

export default Footer;
