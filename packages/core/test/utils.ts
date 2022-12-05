import { HeadlessConfig } from '../src/types';

export function setHeadlessConfig(config: HeadlessConfig) {
	// @ts-expect-error
	global.__10up__HEADLESS_CONFIG = config;
}
