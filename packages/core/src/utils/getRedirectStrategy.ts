import headlessConfig from '../headless.config';

export function getRedirectStrategy() {
	return headlessConfig?.redirectStrategy || 'none';
}
