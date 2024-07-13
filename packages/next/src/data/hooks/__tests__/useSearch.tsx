import { setHeadstartWPConfig, type PostEntity, type PostsArchiveParams } from '@headstartwp/core';
import { renderHook } from '@testing-library/react';
import * as React from 'react';
import { expectTypeOf } from 'expect-type';
import { SettingsProvider } from '@headstartwp/core/react';
import { useSearch } from '../useSearch';

const config = {
	sourceUrl: 'https://js1.10up.com',
	useWordPressPlugin: true,
};

const wrapper = ({ children }) => {
	return <SettingsProvider settings={config}>{children}</SettingsProvider>;
};

describe('useSearch types', () => {
	beforeAll(() => {
		setHeadstartWPConfig(config);
	});

	it('allows overriding types', () => {
		interface Book extends PostEntity {
			isbn: string;
		}

		interface BookParams extends PostsArchiveParams {
			isbn: string;
		}

		const { result } = renderHook(() => useSearch<Book, BookParams>({ isbn: 'sdasd' }), {
			wrapper,
		});

		expectTypeOf(result.current.data?.posts).toMatchTypeOf<
			| Array<{
					isbn: string;
			  }>
			| undefined
		>();
	});
});
