import { expectTypeOf } from 'expect-type';

import { PostSearchEntity, SearchParams, TermSearchEntity, fetchSearch } from '../..';

describe('fetchSearch', () => {
	it('returns empty results instead of throwing if not found', async () => {
		const { data } = await fetchSearch({ params: { search: 'not-found' } });

		expect(() => data).not.toThrow();
		expect(data?.searchResults.length).toBe(0);
	});

	it('no params returns default search', async () => {
		const { data } = await fetchSearch({ params: { per_page: 5 } });

		expect(() => data).not.toThrow();
		expect(data.searchResults).toHaveLength(5);
	});

	it('searches for posts properly', async () => {
		const { data } = await fetchSearch({
			path: '/Debug',
			params: { per_page: 2, type: 'post', subtype: 'post,page' },
		});

		expect(data?.searchResults.length).toBeGreaterThanOrEqual(1);
		expect(data?.queriedObject.search?.subtype).toBe('post,page');
		expect(data?.queriedObject.search?.searchedValue).toBe('Debug');
	});

	it('searches for terms properly', async () => {
		const { data } = await fetchSearch({
			path: '/headless',
			params: { per_page: 2, type: 'term', subtype: ['category', 'post_tag'] },
		});

		expect(data?.searchResults.length).toBeGreaterThanOrEqual(1);
		expect(data?.searchResults.find((r) => r.title === 'headless')).toBeTruthy();
		expect(data?.queriedObject.search?.subtype).toStrictEqual(['category', 'post_tag']);
		expect(data?.queriedObject.search?.searchedValue).toBe('headless');
	});

	it('reads param from the url and sets isMainQuery flag', async () => {
		let result = await fetchSearch({ path: '/ipsum' });

		expect(result.data?.queriedObject.search?.searchedValue).toBe('ipsum');
		expect(result.isMainQuery).toBe(true);

		result = await fetchSearch({ params: { search: 'lorem' } });

		expect(result.data?.queriedObject.search?.searchedValue).toBe('lorem');
		expect(result.isMainQuery).toBe(false);
	});
});

describe('fetchSearch types', () => {
	it('allows overriding types', async () => {
		interface MyPostSearchEntity extends PostSearchEntity {
			custom_field: string;
		}

		interface MySearchParams extends SearchParams {
			custom_field: string;
		}

		type MyPostSearchType = MyPostSearchEntity | TermSearchEntity;

		const { data } = await fetchSearch<MyPostSearchType, MySearchParams>({
			params: { custom_field: 'sdasd' },
		});

		expectTypeOf(data.searchResults).toMatchTypeOf<
			| Array<
					| {
							custom_field: string;
					  }
					| TermSearchEntity
			  >
			| undefined
		>();
	});
});
