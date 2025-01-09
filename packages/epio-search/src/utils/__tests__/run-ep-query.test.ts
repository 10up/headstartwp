import { runEPQuery } from '../run-ep-query';
import { get } from '../../api';
import { EPSearchParams, EPHitMap, EPPost } from '../../types';

jest.mock('../../api');

describe('runEPQuery', () => {
	const mockGet = get as jest.MockedFunction<typeof get>;

	const searchState: EPSearchParams = {
		searchTerm: 'test',
		per_page: 10,
	};

	const endpoint = '/search';

	const hitMap: EPHitMap = (hit) => {
		return hit._source as EPPost;
	};

	const mockResponse = {
		took: 0,
		timed_out: false,
		_shards: {
			total: 0,
			successful: 0,
			skipped: 0,
			failed: 0,
		},
		hits: {
			max_score: 0,
			total: { value: 2 },
			hits: [
				{ _id: '1', _source: { post_id: 1, title: 'Post 1' } },
				{ _id: '2', _source: { post_id: 2, title: 'Post 2' } },
			],
		},
	};

	beforeEach(() => {
		mockGet.mockResolvedValue(mockResponse);
	});

	it('should return results and totalResults', async () => {
		const { results, totalResults } = await runEPQuery(searchState, endpoint, hitMap);

		expect(results).toEqual([
			{ post_id: 1, title: 'Post 1' },
			{ post_id: 2, title: 'Post 2' },
		]);
		expect(totalResults).toBe(2);
	});

	it('should filter out undefined values from searchState', async () => {
		const searchStateWithUndefined: EPSearchParams = {
			searchTerm: 'test',
			post_type: undefined,
		};

		await runEPQuery(searchStateWithUndefined, endpoint, hitMap);

		expect(mockGet).toHaveBeenCalledWith({ search: 'test' }, endpoint);
	});

	it('should handle empty response', async () => {
		mockGet.mockResolvedValueOnce({
			took: 0,
			timed_out: false,
			_shards: {
				total: 0,
				successful: 0,
				skipped: 0,
				failed: 0,
			},
			hits: { total: { value: 0 }, hits: [], max_score: 0 },
		});

		const { results, totalResults } = await runEPQuery(searchState, endpoint, hitMap);

		expect(results).toEqual([]);
		expect(totalResults).toBe(0);
	});
});
