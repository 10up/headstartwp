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
				{/* React 19's ReactNode includes bigint/Promise, which the narrower
				    intrinsic-element children type (used by linaria's styled.main) doesn't
				    accept — cast here since this component never actually receives one. */}
				<StyledMain role="main">{children as Exclude<ReactNode, bigint>}</StyledMain>
			</section>
		</div>
	);
};
