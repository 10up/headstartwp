import { setHeadstartWPConfig, type PostEntity, type PostsArchiveParams } from '@headstartwp/core';
import { renderHook } from '@testing-library/react';
import { expectTypeOf } from 'expect-type';
import * as React from 'react';
import { SettingsProvider } from '@headstartwp/core/react';
import { useAuthorArchive } from '../useAuthorArchive';

const config = {
	sourceUrl: 'https://js1.10up.com',
	useWordPressPlugin: true,
};

describe('useAuthorArchive types', () => {
	beforeAll(() => {
		setHeadstartWPConfig(config);
	});

	const wrapper = ({ children }) => {
		return <SettingsProvider settings={config}>{children}</SettingsProvider>;
	};

	it('allows overriding types', () => {
		interface Book extends PostEntity {
			isbn: string;
		}

		interface BookParams extends PostsArchiveParams {
			isbn: string;
		}

		const { result } = renderHook(() => useAuthorArchive<Book, BookParams>({ isbn: 'sdasd' }), {
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
