import PropTypes from 'prop-types';
import Header from './Header';
import { MainContent } from './MainContent';

const Layout = ({ children }) => {
	return (
		<div id="page" className="site">
			<a className="skip-link screen-reader-text" href="#content">
				Skip to content
			</a>
			<Header />

			<MainContent>{children}</MainContent>
		</div>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;
