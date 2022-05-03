import PropTypes from 'prop-types';

export const MainContent = ({ children }) => {
	return (
		<div>
			<section>
				<main role="main">{children}</main>
			</section>
		</div>
	);
};

MainContent.propTypes = {
	children: PropTypes.node.isRequired,
};
