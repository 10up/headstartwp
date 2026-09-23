import { Logo } from './Logo';
import { Nav } from './Nav';
import { Search } from './Search';

const Header = () => {
	return (
		<header role="banner" className="site-header">
			<Nav />
			<Logo />
			<Search />
		</header>
	);
};

export default Header;
