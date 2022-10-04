import { addHookData, HookState } from '../utils';

const sampleThemeJson = {
	settings: {},
};

const sampleYoast = {
	title: 'test',
	description: 'test',
};
const sampleResult = {
	yoast_head: 'this should be removed',
	yoast_head_json: sampleYoast,
	'theme.json': sampleThemeJson,
};

const samplePageInfo = {
	totalItems: 1,
	totalPages: 1,
	page: 1,
};

describe('addHookData', () => {
	it('[non-array] transforms the data properly and remove extra stuff', () => {
		const hookStates: HookState[] = [
			{
				key: 'first-key',
				data: {
					queriedObject: {},
					result: { ...sampleResult },
					pageInfo: { ...samplePageInfo },
				},
			},
		];
		expect(addHookData(hookStates, {})).toMatchObject({
			props: {
				fallback: {
					'first-key': {
						result: {
							yoast_head: null,
							yoast_head_json: null,
							'theme.json': null,
						},
						pageInfo: samplePageInfo,
					},
				},
				seo: {
					yoast_head_json: sampleYoast,
				},
				themeJSON: sampleThemeJson,
			},
		});
	});

	it('[array] transforms the data properly and remove extra stuff', () => {
		const hookStates: HookState[] = [
			{
				key: 'first-key',
				data: {
					queriedObject: {},
					result: [{ ...sampleResult }, { ...sampleResult }, { ...sampleResult }],
					pageInfo: samplePageInfo,
				},
			},
		];

		expect(addHookData(hookStates, {})).toMatchObject({
			props: {
				fallback: {
					'first-key': {
						result: [
							{
								yoast_head: null,
								yoast_head_json: null,
								'theme.json': null,
							},
							{
								yoast_head: null,
								yoast_head_json: null,
								'theme.json': null,
							},
							{
								yoast_head: null,
								yoast_head_json: null,
								'theme.json': null,
							},
						],
						pageInfo: samplePageInfo,
					},
				},
				seo: {
					yoast_head_json: sampleYoast,
				},
				themeJSON: sampleThemeJson,
			},
		});
	});
});
