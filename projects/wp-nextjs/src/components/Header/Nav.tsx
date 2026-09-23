import { Menu } from '@headstartwp/core/react';
import { useMenu } from '@headstartwp/next';

export const Nav = () => {
	const { data } = useMenu('primary');

	if (!data) {
		return null;
	}

	return <Menu items={data} className="site-nav" />;
};
