import { expectTypeOf } from 'expect-type';
import { TaxonomyArchiveParams, TermEntity, fetchTerms } from '../..';

describe('fetchTerms types', () => {
	it('allows overriding types', async () => {
		interface Genre extends TermEntity {
			editor: string;
		}

		interface GenreParams extends TaxonomyArchiveParams {
			editor: string;
		}

		const { data } = await fetchTerms<Genre, GenreParams>({ params: { editor: 'sdasd' } });

		expectTypeOf(data?.terms).toMatchTypeOf<
			| Array<{
					editor: string;
			  }>
			| undefined
		>();
	});
});
