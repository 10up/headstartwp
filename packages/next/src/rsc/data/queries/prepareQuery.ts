import { HeadlessConfig, getSiteByHost } from '@headstartwp/core';
import { convertToPath } from '../../../data/convertToPath';

import type { NextQueryProps } from './types';

export function prepareQuery<P>(
	query: NextQueryProps<P>,
	_config: HeadlessConfig | undefined = undefined,
) {
	const { routeParams, ...rest } = query;

	const path = routeParams?.path ?? '';
	const siteConfig = routeParams?.site ? getSiteByHost(routeParams?.site) : null;

	if (routeParams?.site && !siteConfig) {
		// improve this
		throw new Error('Sub site not found');
	}

	const config = siteConfig ?? _config;

	const pathname = Array.isArray(path) ? convertToPath(path) : path;

	return {
		...rest,
		path: pathname,
		config,
	};
}
