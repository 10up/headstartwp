import { Menu } from '@10up/headless-core';
import { useMenu } from '@10up/headless-next';

const Header = () => {
	const { loading, data } = useMenu('primary');
	return (
		<header>
			<h1>Header</h1>
			{!loading && <Menu items={data} />}
		</header>
	);
};

export default Header;
