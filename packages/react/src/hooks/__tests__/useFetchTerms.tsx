import { renderHook } from '@testing-library/react';
import { expectTypeOf } from 'expect-type';
import { TaxonomyArchiveParams, TermEntity } from '@headstartwp/core';
import { useFetchTerms } from '../useFetchTerms';

describe('useFetchTerms types', () => {
	it('allows overriding types', () => {
		interface Genre extends TermEntity {
			editor: string;
		}

		interface GenreParams extends TaxonomyArchiveParams {
			editor: string;
		}

		const { result } = renderHook(() => useFetchTerms<Genre, GenreParams>({ editor: 'sdasd' }));

		expectTypeOf(result.current.data?.terms).toMatchTypeOf<
			| Array<{
					editor: string;
			  }>
			| undefined
		>();
	});
});
