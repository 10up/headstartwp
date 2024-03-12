import { useSWRConfig } from '@headstartwp/core/react';

export const seoKey = '@seo';

/**
 * The useSeo hook. Returns the current SEO object
 *
 * #### Usage
 *
 * ```tsx
 * const seo = useSeo();
 * ```
 *
 * @param format how to return the seo object. Defaults to 'json'
 *
 * @category Data Fetching Hooks
 */
function useSeo(format: 'json'): Record<string, any> | null;
function useSeo(format: 'html'): string | null;
function useSeo(): Record<string, any> | null;
function useSeo(format?: 'json' | 'html') {
	const { fallback } = useSWRConfig();

	if (typeof fallback[seoKey] === 'undefined') {
		return null;
	}

	if (format === 'json' || typeof format === 'undefined') {
		return fallback[seoKey]?.yoast_head_json as Record<string, any>;
	}

	return fallback[seoKey]?.yoast_head as string;
}

export { useSeo };
