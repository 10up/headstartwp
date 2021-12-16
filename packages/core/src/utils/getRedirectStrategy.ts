// @ts-ignore
import headlessConfig from '@10up/wp-nextjs/headless.config';

export function getRedirectStrategy() {
	return headlessConfig?.redirectStrategy || 'none';
}
