import { styled } from '@linaria/react';

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
