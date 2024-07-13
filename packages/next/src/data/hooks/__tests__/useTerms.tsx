import {
	setHeadstartWPConfig,
	type TaxonomyArchiveParams,
	type TermEntity,
} from '@headstartwp/core';
import { renderHook } from '@testing-library/react';
import * as React from 'react';
import { expectTypeOf } from 'expect-type';
import { DataFetchingProvider, SettingsProvider } from '@headstartwp/core/react';
import { useTerms } from '../useTerms';

const config = {
	sourceUrl: 'https://js1.10up.com',
	useWordPressPlugin: true,
};

describe('useTerms types', () => {
	beforeAll(() => {
		setHeadstartWPConfig(config);
	});

	const wrapper = ({ children }) => {
		return (
			<DataFetchingProvider swrConfig={{ provider: () => new Map() }} data={{}}>
				<SettingsProvider settings={config}>{children}</SettingsProvider>
			</DataFetchingProvider>
		);
	};

	it('allows overriding types', () => {
		interface Genre extends TermEntity {
			editor: string;
		}

		interface GenreParams extends TaxonomyArchiveParams {
			editor: string;
		}

		const { result } = renderHook(() => useTerms<Genre, GenreParams>({ editor: 'sdasd' }), {
			wrapper,
		});

		expectTypeOf(result.current.data?.terms).toMatchTypeOf<
			| Array<{
					editor: string;
			  }>
			| undefined
		>();
	});
});
