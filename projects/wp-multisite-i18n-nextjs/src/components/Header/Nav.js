import { Menu } from '@headstartwp/core/react';
import { useMenu } from '@headstartwp/next';

export const Nav = () => {
	const { data, loading, error } = useMenu('primary');

	if (loading || error) {
		return null;
	}

	return <Menu items={data} className="site-nav" />;
};
