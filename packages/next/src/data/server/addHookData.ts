import {
	AppEntity,
	Entity,
	FetchResponse,
	PostEntity,
	removeFieldsFromPostRelatedData,
} from '@headstartwp/core';
import type { Redirect } from 'next';

export type HookState<T> = {
	key: string;
	data: T;
	isMainQuery: boolean;
};

export type NextJSProps<P> = {
	props?: P;
	redirect?: Redirect;
	revalidate?: number | boolean;
	notFound?: boolean;
};

function hasYoastTags(data: Entity): data is PostEntity {
	return (
		typeof (data as PostEntity).yoast_head !== 'undefined' &&
		typeof (data as PostEntity).yoast_head_json !== 'undefined'
	);
}

function isAppEntity(data: Entity): data is AppEntity {
	return typeof (data as AppEntity).settings !== 'undefined';
}

/**
 * The `addHookData` function is responsible for collecting all of the results from the `fetchHookData` function calls
 * and prepares the shape of the data to match what the frameworks expects (such as setting initial values for SWR and collecting SEO data).
 *
 * ## Usage
 *
 * ```ts
 * export async function getServerSideProps(context) {
 *	try {
 * 		const usePostsHook = await fetchHookData(usePosts.fetcher(),context);
 *		const useAppSettingsHook = await fetchHookData(useAppSettings.fetcher(),context);
 *		return addHookData([usePostsHook, useAppSettingsHook], {});
 *	} catch (e) {
 *		return handleError(e, context);
 *	}
 * }
 * ```
 *
 * @param hookStates An array of resolved promises from {@link fetchHookData}
 * @param nextProps Any additional props to pass to Next.js page routes.
 *
 * @category Next.js Data Fetching Utilities
 */
export function addHookData<P = { [key: string]: any }>(
	hookStates: HookState<FetchResponse<Entity | Entity[]>>[],
	nextProps: NextJSProps<P>,
) {
	const { props = {}, ...rest } = nextProps;
	const fallback = {};
	let seo_json = {};
	let seo = '';
	let themeJSON = {};

	const validHookStates = hookStates.filter(Boolean);
	const mainQuery = validHookStates.find((hookState) => hookState.isMainQuery);
	const appSettings = validHookStates.find(
		(hookState) => !Array.isArray(hookState.data.result) && isAppEntity(hookState.data.result),
	);

	// the seo should come from main query if there is any
	if (mainQuery) {
		if (mainQuery.data.queriedObject.search?.yoast_head_json) {
			seo_json = { ...mainQuery.data.queriedObject.search?.yoast_head_json };
			delete mainQuery.data.queriedObject.search?.yoast_head_json;
		} else if (mainQuery.data.queriedObject.author?.yoast_head_json) {
			seo_json = { ...mainQuery.data.queriedObject.author?.yoast_head_json };
			delete mainQuery.data.queriedObject.author?.yoast_head_json;
		} else if (mainQuery.data.queriedObject.term?.yoast_head_json) {
			seo_json = { ...mainQuery.data.queriedObject.term?.yoast_head_json };
			delete mainQuery.data.queriedObject.term?.yoast_head_json;
		} else if (Array.isArray(mainQuery.data.result) && mainQuery.data.result.length > 0) {
			if (mainQuery.data.result[0]?.yoast_head_json) {
				seo_json = { ...mainQuery.data.result[0].yoast_head_json };
				delete mainQuery.data.result[0].yoast_head_json;
			}
		} else if (!Array.isArray(mainQuery.data.result) && hasYoastTags(mainQuery.data.result)) {
			seo_json = { ...mainQuery.data.result.yoast_head_json };
			delete mainQuery.data.result.yoast_head_json;
		}
		if (mainQuery.data.queriedObject.search?.yoast_head) {
			seo = mainQuery.data.queriedObject.search?.yoast_head;
			delete mainQuery.data.queriedObject.search?.yoast_head;
		} else if (mainQuery.data.queriedObject.author?.yoast_head) {
			seo = mainQuery.data.queriedObject.author?.yoast_head;
			delete mainQuery.data.queriedObject.author?.yoast_head;
		} else if (mainQuery.data.queriedObject.term?.yoast_head) {
			seo = mainQuery.data.queriedObject.term?.yoast_head;
			delete mainQuery.data.queriedObject.term?.yoast_head;
		} else if (
			Array.isArray(mainQuery.data.result) &&
			mainQuery.data.result.length > 0 &&
			mainQuery.data.result[0]?.yoast_head &&
			hasYoastTags(mainQuery.data.result[0])
		) {
			seo = mainQuery.data.result[0].yoast_head;
		} else if (!Array.isArray(mainQuery.data.result) && hasYoastTags(mainQuery.data.result)) {
			seo = mainQuery.data.result.yoast_head ?? '';
		}
	}

	const appEntity = appSettings?.data.result;
	if (appEntity && !Array.isArray(appEntity) && isAppEntity(appEntity)) {
		themeJSON = { ...appEntity['theme.json'] };
	}

	// process the rest of data to optimize payload and pick seo object if there isn't a main query
	validHookStates.forEach((hookState) => {
		const { key, data } = hookState;

		const foundSeoJson = Object.keys(seo_json).length > 0;
		const foundSeo = seo.length > 0;

		// we want to keep only one yoast_head_json object and remove everything else to reduce
		// hydration costs
		if (Array.isArray(data.result) && data.result.length > 0) {
			data.result = data.result.map((post) => {
				let cleanedUpPost = { ...post };

				if (post?._embedded) {
					cleanedUpPost = removeFieldsFromPostRelatedData(
						['yoast_head_json', 'yoast_head'],
						post as PostEntity,
					);
				}

				if (post?.yoast_head_json) {
					if (!foundSeoJson) {
						seo_json = { ...post.yoast_head_json };
					}

					delete cleanedUpPost.yoast_head_json;
				}

				if (post?.yoast_head) {
					if (!foundSeo) {
						seo = post.yoast_head;
					}

					delete cleanedUpPost.yoast_head;
				}

				return cleanedUpPost;
			});
		} else if (!Array.isArray(data.result)) {
			if (data.result?.yoast_head_json) {
				if (!foundSeoJson) {
					seo_json = { ...data.result.yoast_head_json };
				}
				delete data.result.yoast_head_json;
			}

			if (data.result?.yoast_head) {
				if (!foundSeo) {
					seo = data.result.yoast_head;
				}

				delete data.result.yoast_head;
			}

			if (data.result?.['theme.json']) {
				data.result['theme.json'] = null;
			}

			if (data.result?._embedded) {
				data.result = removeFieldsFromPostRelatedData(
					['yoast_head_json', 'yoast_head'],
					data.result as PostEntity,
				);
			}
		}

		fallback[key] = data;
	});

	return {
		...rest,
		props: {
			...props,
			seo: {
				yoast_head_json: seo_json,
				yoast_head: seo,
			},
			themeJSON,
			fallback,
		},
	};
}
