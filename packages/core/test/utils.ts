import { HeadlessConfig } from '../src/provider/types';

export function setHeadlessConfig(config: HeadlessConfig) {
	global.__10up__HEADLESS_CONFIG = config;
}
