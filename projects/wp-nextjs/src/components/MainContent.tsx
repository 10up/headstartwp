import React, { ReactNode } from 'react';

type MainContentProps = {
	children: ReactNode;
};

export const MainContent = ({ children }: MainContentProps) => {
	return (
		<div>
			<section>
				<main role="main" className="main-content">
					{children}
				</main>
			</section>
		</div>
	);
};
