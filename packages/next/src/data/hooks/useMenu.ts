import { FetchHookOptions, useFetchMenu } from '@10up/headless-core/react';
import { AppEntity, FetchResponse } from '@10up/headless-core';

/**
 * The useMenu hooks. Returns a Menu object.
 *
 * **Important**: This hook depends on {@link useAppSettings}. If you want to enable SSR;SSG for
 * this hook you will need to fetch app settings on the server side.
 *
 * ## Usage
 *
 * ### Basic usage
 *
 * ```tsx
 * export const Nav = () => {
 * 	const { data, loading, error } = useMenu('primary-menu');
 *
 * 	// handle loading, error states
 *
 * 	return <Menu items={data} css={navStyles} />;
 * }
 * ```
 *
 * ### Re-fetching client-side on focus and/or mount
 * If you are fetching app settings on the server, you can enable re-fetching on focus and/or mount
 * to ensure menus are always up-to date even when using SSG/ISR.
 *
 * ```tsx
 * export const Nav = () => {
 * 	const { data, loading, error } = useMenu('primary-menu', {
 *		revalidateOnFocus: true,
 *		revalidateOnMount: true,
 * 	});
 *
 *	// handle loading, error states
 *
 * 	return <Menu items={data} css={navStyles} />;
 * }
 * ```
 *
 * @param menuLocation The slug of the menu location you want to fetch
 * @param options SWR configuration options
 *
 * @category Data Fetching Hooks
 */
export function useMenu(
	menuLocation: string,
	options: FetchHookOptions<FetchResponse<AppEntity>> = {},
) {
	return useFetchMenu(menuLocation, options);
}
