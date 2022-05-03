import PropTypes from 'prop-types';
import Footer from './Footer';
import Header from './Header';
import { MainContent } from './MainContent';

const Layout = ({ children }) => {
	return (
		<div>
			<Header />
			<MainContent>{children}</MainContent>
			<Footer />
		</div>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;
