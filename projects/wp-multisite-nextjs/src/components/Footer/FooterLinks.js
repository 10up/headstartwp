import { useAppSettings } from '@headstartwp/next';
import { Link } from '../Link';

export const FooterLinks = () => {
	const { data, loading } = useAppSettings();

	if (loading) {
		return null;
	}

	return (
		<ul className="footer-links">
			<li>
				<Link href={data?.settings?.privacy_policy_url || '/'}>Privacy Policy</Link>
			</li>
			<li>
				<Link href="/">Terms of Use</Link>
			</li>
		</ul>
	);
};
