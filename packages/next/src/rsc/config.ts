import { HeadstartWPRoute } from './types';
import { prepareQuery } from './data/queries/prepareQuery';

/**
 * Loads the right config based on route params
 *
 * @param routeParams The next.js route params
 *
 * @returns
 */
export function loadHeadstartWPConfig(routeParams: HeadstartWPRoute['params']) {
	const { config } = prepareQuery({ routeParams });

	return config;
}
