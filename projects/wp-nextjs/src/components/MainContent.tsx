import { styled } from '@linaria/react';
import PropTypes from 'prop-types';
import { PropsWithChildren } from 'react';

const StyledMain = styled.main`
	padding: 20px;
`;

export const MainContent = ({ children }: PropsWithChildren<{}>) => {
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
