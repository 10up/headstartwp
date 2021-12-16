import headlessConfig from '../headless.config';

export function getCustomPostTypes() {
	return headlessConfig?.customPostTypes || [];
}
