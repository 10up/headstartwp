import { HeadlessConfig } from '../src/types';

export function setHeadlessConfig(config: HeadlessConfig) {
	global.__10up__HEADLESS_CONFIG = config;
}
