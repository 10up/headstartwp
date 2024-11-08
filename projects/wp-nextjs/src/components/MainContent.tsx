import { styled } from '@linaria/react';

import React, { ReactNode } from 'react';

const StyledMain = styled.main`
	padding: 20px;
`;

type MainContentProps = {
	children: ReactNode;
};

export const MainContent = ({ children }: MainContentProps) => {
	return (
		<div>
			<section>
				<StyledMain role="main">{children}</StyledMain>
			</section>
		</div>
	);
};
