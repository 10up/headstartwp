import { EndpointParams, Entity, FetchResponse } from '@headstartwp/core';
import { FetchHookOptions, useSettings } from '@headstartwp/core/react';
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
	const { query, locale, defaultLocale, isPreview } = useRouter();
	const { integrations, preview } = useSettings();

	const path = convertToPath(Array.isArray(query.path) ? query.path : [query.path || '']);

	if ((locale || defaultLocale) && integrations?.polylang?.enable) {
		params.lang = locale ?? defaultLocale;
	}

	if (preview?.alternativeAuthorizationHeader && isPreview) {
		if (!options.fetchStrategyOptions) {
			options.fetchStrategyOptions = {};
		}

		options.fetchStrategyOptions.alternativePreviewAuthorizationHeader = true;
	}

	return { params, path, options };
}
