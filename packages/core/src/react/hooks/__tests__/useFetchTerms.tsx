import { expectTypeOf } from 'expect-type';
import { TaxonomyArchiveParams, TermEntity } from '../../../data';
import { useFetchTerms } from '../useFetchTerms';

describe('useFetchTerms types', () => {
	it('allows overriding types', () => {
		interface Genre extends TermEntity {
			editor: string;
		}

		interface GenreParams extends TaxonomyArchiveParams {
			editor: string;
		}

		expectTypeOf(
			useFetchTerms<Genre, GenreParams>({ editor: 'sdasd' }).data?.terms,
		).toMatchTypeOf<
			| Array<{
					editor: string;
			  }>
			| undefined
		>();
	});
});
