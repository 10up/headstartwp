import { EndpointParams, Entity, FetchResponse } from '@10up/headless-core';
import { FetchHookOptions, useSettings } from '@10up/headless-core/react';
import { useRouter } from 'next/router';
import { convertToPath } from '../convertToPath';

/**
 * Prepares params and options for useFetch hooks
 *
 * @param _params The fetch params
 * @param options The fetch options
 * @returns
 */
export function usePrepareFetch<T extends Entity | Entity[], P extends EndpointParams>(
	_params: Partial<P> = {},
	options: FetchHookOptions<FetchResponse<T>> = {},
) {
	const params = { ..._params };
	const { query, locale } = useRouter();
	const { integrations } = useSettings();

	const path = convertToPath(Array.isArray(query.path) ? query.path : [query.path || '']);

	if (locale && integrations?.polylang?.enable) {
		params.lang = locale;
	}

	return { params, path, options };
}
