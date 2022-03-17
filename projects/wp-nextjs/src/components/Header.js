import { Menu } from '@10up/headless-core';
import { useMenu } from '@10up/headless-next';

/**
 * You can optionally pass a ItemWrapper component to the Menu component to customize rendering of items
 *
 * @param {*} props - props passed to the component
 * @returns
 */
// eslint-disable-next-line react/prop-types
const MenuWrapper = ({ className, depth, children }) => {
	if (depth === 0) {
		return (
			<nav>
				<ul className={className}>{children}</ul>;
			</nav>
		);
	}

	return <ul className={className}>{children}</ul>;
};

/**
 * You can optionally pass a MenuWrapper component to the Menu component to customize rendering of the each menu wrapper
 *
 * @param {*} props - props passed to the component
 * @returns
 */
// eslint-disable-next-line react/prop-types
const ItemWrapper = ({ className, children }) => {
	return (
		<li className={className}>
			<div className="menu-item">{children}</div>
		</li>
	);
};

const Header = () => {
	const { loading, data } = useMenu('primary', {
		// these settings will re-render menu client side to ensure it always have the latest items
		revalidateOnMount: true,
		revalidateOnFocus: true,
	});

	return (
		<header>
			<h1>Header</h1>
			{!loading && <Menu items={data} menuWrapper={MenuWrapper} itemWrapper={ItemWrapper} />}
		</header>
	);
};

export default Header;
