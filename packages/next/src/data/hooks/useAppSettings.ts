import { AppEntity, EndpointParams, FetchResponse } from '@10up/headless-core';
import { useFetchAppSettings, FetchHookOptions } from '@10up/headless-core/react';

/**
 * The useAppSettings hook
 *
 * ## Usage
 *
 * ```tsx
 * const { data, loading, error } = useAppSettings();
 *
 * // check loading and error states
 * ```
 *
 * ### Server-Side-Rendering or Static-Site-Generation
 *
 * ```tsx
 * export async function getServerSideProps(context) {
 * 	const useAppSettingsData = await fetchHookData(useAppSettings.fetcher(), context);
 * 	return addHookData([useAppSettingsData], {});
 * }
 * ```
 *
 * **Important**: You most likely want to fetch app settings on every route so
 * that you can access global settings and menus in your pages & components
 *
 * @param params The parameters accepted by the hook
 * @param options Options for the SWR configuration
 *
 * @category Data Fetching Hooks
 */
export function useAppSettings<
	T extends AppEntity = AppEntity,
	P extends EndpointParams = EndpointParams,
>(params: P | {} = {}, options: FetchHookOptions<FetchResponse<T>> = {}) {
	return useFetchAppSettings<T, P>(params, options);
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace useAppSettings {
	export const { fetcher } = useFetchAppSettings;
}
