import PropTypes from 'prop-types';
import Header from './Header';

const Layout = ({ children }) => {
	return (
		<div id="page" className="site">
			<a className="skip-link screen-reader-text" href="#content">
				Skip to content
			</a>
			<Header />
			<div id="content" className="site-content">
				<section id="primary" className="content-area">
					<main id="main" className="site-main" role="main">
						{children}
					</main>
				</section>
			</div>
		</div>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;
