import { AppEntity, FetchResponse } from '@10up/headless-core';
import { HookResponse, useFetchAppSettings } from '@10up/headless-core/react';
import { SWRConfiguration } from 'swr';

export interface useAppSettingsResponse extends HookResponse {
	data?: AppEntity;
}

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
export function useAppSettings(
	params = {},
	options: SWRConfiguration<FetchResponse<AppEntity>> = {},
): useAppSettingsResponse {
	return useFetchAppSettings(params, options);
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace useAppSettings {
	export const { fetcher } = useFetchAppSettings;
}
