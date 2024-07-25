import {
	EndpointParams,
	FrameworkError,
	HeadlessConfig,
	getHeadstartWPConfig,
	getSiteByHost,
} from '@headstartwp/core';
import deepmerge from 'deepmerge';
import { convertToPath } from '../../../data/convertToPath';

import type { NextQueryProps } from './types';

const { all: merge } = deepmerge;

export function prepareQuery<P extends EndpointParams>(
	query: NextQueryProps<P>,
	_config: HeadlessConfig | undefined = undefined,
) {
	const { routeParams, handleError = true, params: originalParams, ...rest } = query;

	const path = routeParams?.path ?? '';
	const site = decodeURIComponent(routeParams?.site ?? '');

	const rootConfig = getHeadstartWPConfig();
	const isPolylangEnabled = rootConfig.integrations?.polylang?.enable;

	// eslint-disable-next-line no-nested-ternary
	const siteConfig = routeParams?.site
		? routeParams.lang && !isPolylangEnabled
			? getSiteByHost(site, routeParams.lang)
			: getSiteByHost(site)
		: null;

	if (routeParams?.site && !siteConfig) {
		throw new FrameworkError(
			`Sub site not found, make sure to add ${routeParams?.site} to headstartwp.config.js`,
		);
	}

	const options = merge<NextQueryProps<P>['options']>([
		{
			cache: 'no-store',
		},
		rest.options ?? {},
	]);

	const config = siteConfig ?? (_config || rootConfig);
	const pathname = Array.isArray(path) ? convertToPath(path) : path;

	const params: typeof originalParams =
		typeof originalParams !== 'undefined' ? { ...originalParams } : {};

	if (routeParams?.lang && isPolylangEnabled) {
		const supportedLocales = rootConfig.i18n?.locales ?? [];
		if (!supportedLocales.includes(routeParams.lang)) {
			throw new FrameworkError(
				'Unsuported lang, make sure you add all desired locales to `config.i18n.locales`',
			);
		}
		params.lang = routeParams.lang;
	}

	return {
		...rest,
		params,
		options,
		path: pathname,
		config: config ?? getHeadstartWPConfig(),
		handleError,
	};
}
