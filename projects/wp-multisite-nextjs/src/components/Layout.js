import Footer from './Footer';
import Header from './Header';
import { MainContent } from './MainContent';

const Layout = ({ children }) => {
	return (
		<div>
			<Header />
			<MainContent>{children}</MainContent>
			<Footer />
		</div>
	);
};

export default Layout;
