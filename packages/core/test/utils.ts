import { HeadlessConfig } from '../src/provider/types';

export function setHeadlessConfig(config: HeadlessConfig) {
	// @ts-expect-error
	global.__10up__HEADLESS_CONFIG = config;
}
