import { styled } from '@linaria/react';
import { FC } from 'react';

const StyledMain = styled.main`
	padding: 20px;
`;

export const MainContent: FC = ({ children }) => {
	return (
		<div>
			<section>
				<StyledMain role="main">{children}</StyledMain>
			</section>
		</div>
	);
};
