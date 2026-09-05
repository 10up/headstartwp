import { Menu } from '@headstartwp/core/react';
import { useMenu } from '@headstartwp/next';

export const Nav = () => {
	const { data, loading, error } = useMenu('primary', {
		// these settings will re-render menu client side to ensure
		// it always have the latest items
		revalidateOnMount: true,
		revalidateOnFocus: true,
	});

	if (loading || error) {
		return null;
	}

	return <Menu items={data} className="site-nav" />;
};
