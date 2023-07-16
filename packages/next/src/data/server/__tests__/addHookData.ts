import { FetchResponse } from '@headstartwp/core';
import { addHookData, HookState } from '../addHookData';

const sampleThemeJson = {
	settings: {},
};

const sampleYoast = {
	title: 'test',
	description: 'test',
};
const sampleResult = {
	id: 0,
	yoast_head: 'this should be removed',
	yoast_head_json: sampleYoast,
};

const appSettingsResult = {
	settings: {},
	'theme.json': sampleThemeJson,
};

const samplePageInfo = {
	totalItems: 1,
	totalPages: 1,
	page: 1,
};

describe('addHookData', () => {
	it('[non-array] transforms the data properly and remove extra stuff', () => {
		const hookStates: HookState<
			FetchResponse<typeof sampleResult | typeof appSettingsResult>
		>[] = [
			{
				key: 'first-key',
				data: {
					queriedObject: {},
					result: { ...sampleResult },
					pageInfo: { ...samplePageInfo },
				},
				isMainQuery: true,
			},
			{
				key: 'second-key',
				data: {
					queriedObject: {},
					result: { ...appSettingsResult },
					pageInfo: { ...samplePageInfo },
				},
				isMainQuery: false,
			},
		];
		expect(addHookData(hookStates, {})).toStrictEqual({
			props: {
				fallback: {
					'first-key': {
						result: {
							id: 0,
						},
						queriedObject: {},
						pageInfo: samplePageInfo,
					},
					'second-key': {
						queriedObject: {},
						pageInfo: samplePageInfo,
						result: { ...appSettingsResult, 'theme.json': null },
					},
				},
				seo: {
					yoast_head: sampleResult.yoast_head,
					yoast_head_json: sampleYoast,
				},
				themeJSON: { ...sampleThemeJson },
			},
		});
	});

	it('[array] transforms the data properly and remove extra stuff', () => {
		const hookStates: HookState<FetchResponse<(typeof sampleResult)[]>>[] = [
			{
				key: 'first-key',
				data: {
					queriedObject: {},
					result: [{ ...sampleResult }, { ...sampleResult }, { ...sampleResult }],
					pageInfo: samplePageInfo,
				},
				isMainQuery: false,
			},
		];

		expect(addHookData(hookStates, {})).toStrictEqual({
			props: {
				fallback: {
					'first-key': {
						queriedObject: {},
						result: [{ id: 0 }, { id: 0 }, { id: 0 }],
						pageInfo: samplePageInfo,
					},
				},
				seo: {
					yoast_head: sampleResult.yoast_head,
					yoast_head_json: sampleYoast,
				},
				themeJSON: {},
			},
		});
	});
});
