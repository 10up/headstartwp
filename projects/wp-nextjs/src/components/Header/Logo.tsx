import { useAppSettings } from '@headstartwp/next';

export const Logo = () => {
	const { data, loading } = useAppSettings();

	if (loading) {
		return null;
	}

	return (
		<div className="site-logo">
			<span>{data?.settings?.site_name || 'Brand Logo'}</span>
		</div>
	);
};
