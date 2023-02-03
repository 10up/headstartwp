import type { TaxonomyArchiveParams, TermEntity } from '@10up/headless-core';
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

		expectTypeOf(useTerms<Genre, GenreParams>({ editor: 'sdasd' }).data?.terms).toMatchTypeOf<
			| Array<{
					editor: string;
			  }>
			| undefined
		>();
	});
});
