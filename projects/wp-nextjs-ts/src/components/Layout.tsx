import { FC } from 'react';
import Footer from './Footer/index';
import Header from './Header/index';
import { MainContent } from './MainContent';

const Layout: FC = ({ children }) => {
	return (
		<div>
			<Header />
			<MainContent>{children}</MainContent>
			<Footer />
		</div>
	);
};

export default Layout;
