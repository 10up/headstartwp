import { FooterLinks } from './FooterLinks';

const Footer = () => {
	return (
		<footer className="site-footer">
			<FooterLinks />
			<div>
				<p>Copyright &copy; 10up {new Date().getFullYear()}. All Rights Reserved</p>
			</div>
			<div />
		</footer>
	);
};

export default Footer;
