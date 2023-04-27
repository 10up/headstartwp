import type { TaxonomyArchiveParams, TermEntity } from '@headstartwp/core';
import { renderHook } from '@testing-library/react';
import { expectTypeOf } from 'expect-type';
import { useTerms } from '../useTerms';

describe('useTerms types', () => {
	it('allows overriding types', () => {
		interface Genre extends TermEntity {
			editor: string;
		}

		interface GenreParams extends TaxonomyArchiveParams {
			editor: string;
		}

		const { result } = renderHook(() => useTerms<Genre, GenreParams>({ editor: 'sdasd' }));

		expectTypeOf(result.current.data?.terms).toMatchTypeOf<
			| Array<{
					editor: string;
			  }>
			| undefined
		>();
	});
});
