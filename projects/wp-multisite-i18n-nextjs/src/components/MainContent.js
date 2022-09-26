import { styled } from '@linaria/react';
import PropTypes from 'prop-types';

const StyledMain = styled.main`
	padding: 20px;
`;

export const MainContent = ({ children }) => {
	return (
		<div>
			<section>
				<StyledMain role="main">{children}</StyledMain>
			</section>
		</div>
	);
};

MainContent.propTypes = {
	children: PropTypes.node.isRequired,
};
