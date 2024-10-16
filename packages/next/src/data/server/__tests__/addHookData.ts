import { FetchResponse, YoastJSON } from '@headstartwp/core';
import { addHookData, HookState } from '../addHookData';

const sampleThemeJson = {
	settings: {},
};

const sampleYoast = {
	title: 'test',
	description: 'test',
	robots: {
		index: 'index',
		follow: 'follow',
	},
	canonical: 'https://example.com',
} satisfies YoastJSON;

const sampleResult = {
	id: 0,
	_embedded: {
		author: [
			{
				id: 1,
				yoast_head: 'this should be removed',
				yoast_head_json: sampleYoast,
			},
		],
		'wp:featuredmedia': [
			{
				id: 2,
				yoast_head: 'this should be removed',
				yoast_head_json: sampleYoast,
			},
		],
		'wp:term': [
			[{ id: 3, yoast_head: 'this should be removed', yoast_head_json: sampleYoast }],
			[{ id: 4, yoast_head: 'this should be removed', yoast_head_json: sampleYoast }],
		],
	},
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
				hostOrSlug: 'mainsite',
			},
			{
				key: 'second-key',
				data: {
					queriedObject: {},
					result: { ...appSettingsResult },
					pageInfo: { ...samplePageInfo },
				},
				isMainQuery: false,
				hostOrSlug: 'site2',
			},
		];
		expect(addHookData(hookStates, {})).toStrictEqual({
			props: {
				__headstartwp_site: 'mainsite',
				fallback: {
					'first-key': {
						result: {
							id: 0,
							_embedded: {
								author: [
									{
										id: 1,
									},
								],
								'wp:featuredmedia': [{ id: 2 }],
								'wp:term': [[{ id: 3 }], [{ id: 4 }]],
							},
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
				hostOrSlug: 'site2',
			},
		];

		const expectedPostEmbeddedResult = {
			author: [
				{
					id: 1,
				},
			],
			'wp:featuredmedia': [{ id: 2 }],
			'wp:term': [[{ id: 3 }], [{ id: 4 }]],
		};

		expect(addHookData(hookStates, {})).toStrictEqual({
			props: {
				__headstartwp_site: 'site2',
				fallback: {
					'first-key': {
						queriedObject: {},
						result: [
							{
								id: 0,
								_embedded: expectedPostEmbeddedResult,
							},
							{
								id: 0,
								_embedded: expectedPostEmbeddedResult,
							},
							{
								id: 0,
								_embedded: expectedPostEmbeddedResult,
							},
						],
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
