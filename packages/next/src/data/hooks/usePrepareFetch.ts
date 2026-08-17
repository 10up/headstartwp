import { EndpointParams, Entity, FetchResponse } from '@headstartwp/core';
import { FetchHookOptions, useSettings } from '@headstartwp/core/react';
import { useParams } from 'next/navigation.js';
import { convertToPath } from '../convertToPath';

/**
 * Prepares params and options for useFetch hooks.
 *
 * v2 reads the route from `useParams()` (app router) rather than `useRouter()` from
 * `next/router` (pages router). The shapes line up: what the pages router exposed as
 * `router.query.path` is the `[...path]` catch-all segment, which `useParams()` returns
 * directly — the same `routeParams` the server-side `prepareQuery` takes.
 *
 * Two behaviours from v1 do not carry over, because the app router has no client-side
 * equivalent:
 *
 * - **Locale.** The pages router had built-in i18n (`router.locale` / `defaultLocale`); the app
 *   router does not. Polylang's language now comes from the `lang` route segment, matching what
 *   `prepareQuery` does server-side.
 * - **Preview.** `router.isPreview` has no client counterpart — draft mode is readable only on
 *   the server via `draftMode()` from `next/headers`. Preview fetching in v2 happens
 *   server-side (see `queryPost`). A client component that genuinely needs the alternative
 *   preview auth header can still set it explicitly through
 *   `options.fetchStrategyOptions.alternativePreviewAuthorizationHeader`.
 *
 * @param _params The fetch params
 * @param options The fetch options
 *
 * @returns The prepared params, path and options
 */
export function usePrepareFetch<T extends Entity | Entity[], P extends EndpointParams>(
	_params: Partial<P> = {},
	options: FetchHookOptions<FetchResponse<T>> = {},
) {
	const params = { ..._params };
	// `useParams()` returns null when there is no matching route segment.
	const routeParams = (useParams() ?? {}) as Record<string, string | string[] | undefined>;
	const { integrations } = useSettings();

	const rawPath = routeParams.path;
	const path = convertToPath(Array.isArray(rawPath) ? rawPath : [rawPath ?? '']);

	if (integrations?.polylang?.enable) {
		const rawLang = routeParams.lang;
		const lang = Array.isArray(rawLang) ? rawLang[0] : rawLang;

		if (lang) {
			params.lang = lang;
		}
	}

	return { params, path, options };
}
