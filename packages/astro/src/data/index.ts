import {
	getWPUrl,
	FilterDataOptions,
	AbstractFetchStrategy,
	Entity,
	EndpointParams,
} from '@10up/headless-core';

export interface FetchHookDataOptions {
	params?: any;
	filterData?: FilterDataOptions;
}

export async function fetchHookData(
	fetchStrategy: AbstractFetchStrategy<Entity, EndpointParams>,
	options: FetchHookDataOptions = {},
) {
	const wpURL = getWPUrl();
	const params = options?.params || {};
	const filterDataOptions = options?.filterData || { method: 'ALLOW', fields: ['*'] };

	fetchStrategy.setBaseURL(wpURL);

	const path = '';

	const urlParams = fetchStrategy.getParamsFromURL(path);
	const finalParams = { _embed: true, ...urlParams, ...params };
	const endpointUrlForKey = fetchStrategy.buildEndpointURL(finalParams);

	const data = await fetchStrategy.fetcher(
		fetchStrategy.buildEndpointURL(finalParams),
		finalParams,
	);

	return { key: endpointUrlForKey, data: fetchStrategy.filterData(data, filterDataOptions) };
}
