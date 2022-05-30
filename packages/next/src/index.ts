/**
 * Test comment
 *
 * @packageDocumentation
 */
import getConfig from 'next/config';

if (typeof window === 'undefined') {
	const { serverRuntimeConfig } = getConfig();

	if (serverRuntimeConfig && serverRuntimeConfig.headlessConfig) {
		global.__10up__HEADLESS_CONFIG = serverRuntimeConfig.headlessConfig;
	}
}

export * from './data/index';
export * from './components/index';
export * from './handlers/index';
export * from './blocks/index';
