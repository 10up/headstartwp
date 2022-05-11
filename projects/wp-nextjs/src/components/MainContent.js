import PropTypes from 'prop-types';

export const MainContent = ({ children }) => {
	return (
		<div id="content" className="site-content">
			<section id="primary" className="content-area">
				<main role="main">{children}</main>
			</section>
		</div>
	);
};

MainContent.propTypes = {
	children: PropTypes.node.isRequired,
};
