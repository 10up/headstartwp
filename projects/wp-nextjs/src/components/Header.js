import { useMenu } from '@10up/headless-next';

const Nav = () => {
	const { data } = useMenu('primary');

	return (
		<ul>
			{data.map((item) => {
				return <li key={item.id}>{item.title}</li>;
			})}
		</ul>
	);
};

const Header = () => {
	const { loading } = useMenu('primary');
	return (
		<header>
			<h1>Header</h1>
			{!loading && <Nav />}
		</header>
	);
};

export default Header;
