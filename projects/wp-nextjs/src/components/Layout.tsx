import type { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';
import { MainContent } from './MainContent';

type LayoutProps = {
	children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
	return (
		<div>
			<Header />
			<MainContent>{children}</MainContent>
			<Footer />
		</div>
	);
};

export default Layout;
