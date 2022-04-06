import { Menu } from '@10up/headless-core/react';
import { useMenu } from '@10up/headless-next';
import Link from 'next/link';

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

/**
 * The Menu component also accepts a LinkWrapper component to customize rendering of links.
 * Note if you specify your own LinkComponent to the Settings provider
 * you do not need to pass your own LinkWrapper unless you want to do something custom (like rendering additional stuff around your link)
 *
 * @param {*} props - props passed to the component
 *
 * @returns
 */
// eslint-disable-next-line react/prop-types
const LinkWrapper = ({ href, depth, children }) => {
	return (
		<Link href={href}>
			{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
			<a>
				{children} <strong>(Level {depth})</strong>
			</a>
		</Link>
	);
};

const Header = () => {
	const { data } = useMenu('primary', {
		// these settings will re-render menu client side to ensure it always have the latest items
		revalidateOnMount: true,
		revalidateOnFocus: true,
	});

	return (
		<header>
			{data && (
				<Menu
					items={data}
					menuWrapper={MenuWrapper}
					itemWrapper={ItemWrapper}
					linkWrapper={LinkWrapper}
				/>
			)}
		</header>
	);
};

export default Header;
