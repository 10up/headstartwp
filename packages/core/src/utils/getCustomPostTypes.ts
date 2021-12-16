// @ts-ignore
import headlessConfig from '@10up/wp-nextjs/headless.config';

export function getCustomPostTypes() {
	return headlessConfig?.customPostTypes || [];
}
